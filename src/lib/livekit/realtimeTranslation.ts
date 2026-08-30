import { LocalAudioTrack, Room, RoomEvent, Track } from "livekit-client";

export type TranslationStatus = "preparing" | "active" | "reconnecting" | "unavailable";
export type TranslationSegment = {
  consultation_id: number;
  segment_id: string;
  sequence: number;
  speaker_role: "doctor" | "patient";
  source_language: string;
  target_language: string;
  original_text: string;
  translated_text: string;
  started_at: string;
  ended_at: string;
  audio_start_ms: number;
  audio_end_ms: number;
  finalization_reason: "semantic_vad" | "silence_window" | "max_duration" | "manual";
};

type SegmentationConfig = {
  silence_threshold: number;
  silence_duration_ms: number;
  minimum_segment_ms: number;
  maximum_segment_ms: number;
};

type Metrics = {
  firstPartialMs: number | null;
  firstTranslationMs: number | null;
  lastFinalizationMs: number | null;
  audioSecondsSent: number;
  droppedAudioChunks: number;
  errors: number;
  reconnects: number;
  inputSampleRate: number | null;
};

type Options = {
  room: Room;
  apiBase: string;
  apiToken: string;
  consultationId: number;
  role: "doctor" | "patient";
  patientLanguage: "en" | "pt-br";
  clientKind: "web" | "webview";
  segmentation: SegmentationConfig;
  onStatus: (status: TranslationStatus, message?: string) => void;
  onPartial: (original: string, translated: string) => void;
  onFinal: (segment: TranslationSegment, remote: boolean) => void;
  onMetrics: (metrics: Metrics) => void;
};

const TOPIC = "docya.translation.final.v1";

function localMicrophoneTrack(room: Room): LocalAudioTrack {
  const publication = room.localParticipant.getTrackPublication(Track.Source.Microphone);
  const track = publication?.track;
  if (!(track instanceof LocalAudioTrack)) throw new Error("LocalAudioTrack no disponible");
  return track;
}

export class RealtimeTranslationController {
  private pc: RTCPeerConnection | null = null;
  private events: RTCDataChannel | null = null;
  private audioContext: AudioContext | null = null;
  private worklet: AudioWorkletNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private sessionId = "";
  private sequence = 0;
  private original = "";
  private translated = "";
  private segmentStartedAt = 0;
  private lastVoiceAt = 0;
  private silenceTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectAttempt = 0;
  private stopped = false;
  private sessionStartedAt = performance.now();
  private sessionAudioBaseline = 0;
  private metrics: Metrics = {
    firstPartialMs: null, firstTranslationMs: null, lastFinalizationMs: null,
    audioSecondsSent: 0, droppedAudioChunks: 0, errors: 0, reconnects: 0,
    inputSampleRate: null,
  };

  constructor(private options: Options) {}

  async start() {
    this.stopped = false;
    this.options.onStatus("preparing");
    if (!window.AudioWorkletNode || !window.RTCPeerConnection) {
      this.options.onStatus("unavailable", "AudioWorklet o WebRTC no disponible");
      return;
    }
    const track = localMicrophoneTrack(this.options.room);
    // Esta es la unica fuente. No se llama getUserMedia y no se clona el track.
    await this.startPcmMetrics(track.mediaStreamTrack);
    await this.openOpenAiSidecar(track.mediaStreamTrack);
    this.options.room.on(RoomEvent.DataReceived, this.onDataReceived);
    this.options.onStatus("active");
  }

  private async startPcmMetrics(mediaStreamTrack: MediaStreamTrack) {
    this.audioContext = new AudioContext({ latencyHint: "interactive" });
    await this.audioContext.audioWorklet.addModule("/audio-worklets/translation-pcm-processor.js");
    this.source = this.audioContext.createMediaStreamSource(new MediaStream([mediaStreamTrack]));
    this.worklet = new AudioWorkletNode(this.audioContext, "translation-pcm-processor", {
      processorOptions: { silenceThreshold: this.options.segmentation.silence_threshold },
    });
    // Evita salida audible y feedback; el grafo sigue procesando en WebKit/Chromium.
    const mute = this.audioContext.createGain();
    mute.gain.value = 0;
    this.source.connect(this.worklet).connect(mute).connect(this.audioContext.destination);
    this.worklet.port.onmessage = ({ data }) => {
      if (data.type !== "pcm") return;
      this.metrics.audioSecondsSent = data.totalAudioSeconds;
      this.metrics.inputSampleRate = data.inputSampleRate;
      if (!data.silent) {
        this.lastVoiceAt = performance.now();
        if (!this.segmentStartedAt) this.segmentStartedAt = this.lastVoiceAt;
      }
      this.evaluateFinalization(Boolean(data.silent));
      this.options.onMetrics({ ...this.metrics });
      // El ArrayBuffer transferido queda elegible para GC; nunca se guarda ni se envia al backend.
    };
  }

  private async openOpenAiSidecar(mediaStreamTrack: MediaStreamTrack) {
    const response = await fetch(
      `${this.options.apiBase}/teleconsultations/${this.options.consultationId}/translation/client-secret`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.options.apiToken}` },
        body: JSON.stringify({
          participant_role: this.options.role,
          client_kind: this.options.clientKind,
          capability: "realtime_translation_v1",
          platform: navigator.userAgent,
        }),
      },
    );
    const body = await response.json();
    if (!response.ok) throw new Error(body.detail || "Traducción no disponible");
    this.sessionId = body.translation_session_id;
    this.sessionStartedAt = performance.now();
    this.sessionAudioBaseline = this.metrics.audioSecondsSent;
    const ephemeral = body.client_secret?.value ?? body.client_secret?.client_secret?.value ?? body.client_secret;
    if (typeof ephemeral !== "string") throw new Error("Secreto efímero inválido");

    const pc = new RTCPeerConnection();
    this.pc = pc;
    // Se agrega el mismo MediaStreamTrack publicado por LiveKit. No abre otro microfono.
    pc.addTrack(mediaStreamTrack, new MediaStream([mediaStreamTrack]));
    const events = pc.createDataChannel("oai-events");
    this.events = events;
    events.onmessage = ({ data }) => this.onOpenAiEvent(JSON.parse(data));
    events.onerror = () => this.failAndReconnect("data_channel_error");
    pc.onconnectionstatechange = () => {
      if (["failed", "disconnected"].includes(pc.connectionState)) this.failAndReconnect("peer_connection_failed");
    };
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    const sdp = await fetch("https://api.openai.com/v1/realtime/translations/calls", {
      method: "POST",
      headers: { Authorization: `Bearer ${ephemeral}`, "Content-Type": "application/sdp" },
      body: offer.sdp,
    });
    if (!sdp.ok) throw new Error(`OpenAI SDP ${sdp.status}`);
    await pc.setRemoteDescription({ type: "answer", sdp: await sdp.text() });
  }

  private onOpenAiEvent(event: { type?: string; delta?: string }) {
    const now = performance.now();
    if (event.type === "session.input_transcript.delta") {
      if (this.metrics.firstPartialMs === null) this.metrics.firstPartialMs = now - this.lastVoiceAt;
      this.original += event.delta || "";
      this.options.onPartial(this.original, this.translated);
    } else if (event.type === "session.output_transcript.delta") {
      if (this.metrics.firstTranslationMs === null) this.metrics.firstTranslationMs = now - this.lastVoiceAt;
      this.translated += event.delta || "";
      this.options.onPartial(this.original, this.translated);
    } else if (event.type === "error") {
      this.failAndReconnect("openai_event_error");
    }
    // session.output_audio.delta se ignora intencionalmente: no hay voz sintetizada.
  }

  private evaluateFinalization(silent: boolean) {
    if (!this.segmentStartedAt || (!this.original && !this.translated)) return;
    const now = performance.now();
    const duration = now - this.segmentStartedAt;
    if (duration >= this.options.segmentation.maximum_segment_ms) {
      void this.finalize("max_duration");
      return;
    }
    if (!silent || duration < this.options.segmentation.minimum_segment_ms) return;
    const remaining = Math.max(0, this.options.segmentation.silence_duration_ms - (now - this.lastVoiceAt));
    if (this.silenceTimer) clearTimeout(this.silenceTimer);
    this.silenceTimer = setTimeout(() => {
      // Una pausa corta nunca finaliza. La ventana configurable deja contexto para negaciones.
      if (performance.now() - this.lastVoiceAt >= this.options.segmentation.silence_duration_ms) {
        void this.finalize("silence_window");
      }
    }, remaining);
  }

  private async finalize(reason: TranslationSegment["finalization_reason"]) {
    if (!this.original.trim() || !this.translated.trim()) return;
    const ended = performance.now();
    const segment: TranslationSegment = {
      consultation_id: this.options.consultationId,
      segment_id: crypto.randomUUID(), sequence: this.sequence++, speaker_role: this.options.role,
      source_language: this.options.role === "doctor" ? "es" : this.options.patientLanguage,
      target_language: this.options.role === "doctor" ? this.options.patientLanguage : "es",
      original_text: this.original.trim(), translated_text: this.translated.trim(),
      started_at: new Date(Date.now() - (ended - this.segmentStartedAt)).toISOString(),
      ended_at: new Date().toISOString(), audio_start_ms: Math.round(this.segmentStartedAt),
      audio_end_ms: Math.round(ended), finalization_reason: reason,
    };
    this.original = ""; this.translated = ""; this.segmentStartedAt = 0;
    this.metrics.lastFinalizationMs = ended - this.lastVoiceAt;
    this.options.onPartial("", "");
    this.options.onFinal(segment, false);
    await Promise.allSettled([
      this.options.room.localParticipant.publishData(new TextEncoder().encode(JSON.stringify(segment)), { reliable: true, topic: TOPIC }),
      fetch(`${this.options.apiBase}/teleconsultations/${this.options.consultationId}/translation/segments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.options.apiToken}` },
        body: JSON.stringify({ ...segment, session_id: this.sessionId, is_final: true }),
      }),
    ]);
  }

  private onDataReceived = (payload: Uint8Array, _participant?: unknown, _kind?: unknown, topic?: string) => {
    if (topic !== TOPIC) return;
    try { this.options.onFinal(JSON.parse(new TextDecoder().decode(payload)), true); } catch { /* paquete ajeno/invalido */ }
  };

  private failAndReconnect(code: string) {
    if (this.stopped || this.reconnectTimer) return;
    this.metrics.errors += 1;
    void this.reportUsage(code);
    this.options.onStatus("reconnecting", "La traducción se interrumpió. La videollamada continúa normalmente.");
    this.pc?.close(); this.pc = null;
    const delay = Math.min(30000, 1000 * 2 ** this.reconnectAttempt++);
    this.reconnectTimer = setTimeout(async () => {
      this.reconnectTimer = null;
      if (this.stopped) return;
      try {
        const track = localMicrophoneTrack(this.options.room);
        await this.openOpenAiSidecar(track.mediaStreamTrack);
        this.metrics.reconnects += 1;
        this.reconnectAttempt = 0;
        this.options.onStatus("active");
      } catch { this.failAndReconnect(code); }
    }, delay);
  }

  async stop() {
    this.stopped = true;
    if (this.silenceTimer) clearTimeout(this.silenceTimer);
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.options.room.off(RoomEvent.DataReceived, this.onDataReceived);
    this.events?.close(); this.pc?.close(); this.source?.disconnect(); this.worklet?.disconnect();
    await this.audioContext?.close();
    await this.reportUsage();
  }

  private async reportUsage(lastErrorCode?: string) {
    const sessionId = this.sessionId;
    if (sessionId) {
      await fetch(
        `${this.options.apiBase}/teleconsultations/${this.options.consultationId}/translation/sessions/${sessionId}/usage`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.options.apiToken}` },
          body: JSON.stringify({
            processed_audio_seconds: Math.max(0, this.metrics.audioSecondsSent - this.sessionAudioBaseline),
            duration_seconds: Math.max(0, (performance.now() - this.sessionStartedAt) / 1000),
            reconnect_count: this.metrics.reconnects,
            error_count: this.metrics.errors,
            last_error_code: lastErrorCode,
          }),
          keepalive: true,
        },
      ).catch(() => undefined);
    }
  }
}
