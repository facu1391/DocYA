"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ConnectionQuality,
  LocalVideoTrack,
  RemoteTrack,
  Room,
  RoomEvent,
  Track,
} from "livekit-client";
import {
  Camera,
  CameraOff,
  MessageCircle,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  ShieldCheck,
  SwitchCamera,
  Volume2,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import {
  RealtimeTranslationController,
  TranslationSegment,
  TranslationStatus,
} from "@/lib/livekit/realtimeTranslation";

const API = process.env.NEXT_PUBLIC_API_BASE!;
const DOCYA_LOGO_URL = "https://res.cloudinary.com/dqsacd9ez/image/upload/v1788908618/docyanuevo_f1ukcy.png";

type ConnectionLabel =
  | "Lista para ingresar"
  | "Conectando"
  | "Conectado"
  | "Reconectando"
  | "Desconectado"
  | "Error";

type TokenResponse = {
  ws_url: string;
  token: string;
  room: string;
  role: "doctor" | "patient";
  identity: string;
  patient_name?: string;
  patient_age?: number | null;
  connection_quality_ui_enabled?: boolean;
  translation_available?: boolean;
  translation_language?: "en" | "pt-br";
  patient_phone?: string | null;
  translation_api_token?: string;
  translation_segmentation?: {
    silence_threshold: number;
    silence_duration_ms: number;
    minimum_segment_ms: number;
    maximum_segment_ms: number;
  };
};

type QualityLabel = "Verificando conexión" | "Conexión excelente" | "Conexión buena" | "Conexión inestable" | "Reconectando";

type MedicalSummary = {
  motivo: string;
  sintomas_y_evolucion: string;
  antecedentes_y_medicacion: string;
  hallazgos_relevantes: string;
  diagnostico_o_impresion: string;
  indicaciones_y_seguimiento: string;
  alertas: string;
};

function translationClientKind(): "web" | "webview" {
  const ua = navigator.userAgent;
  const iosWebView = /iPhone|iPad|iPod/i.test(ua) && !/Safari/i.test(ua);
  const androidWebView = /; wv\)/i.test(ua) || /Version\/\d+\.\d+ Chrome/i.test(ua);
  const bridgedWebView = Boolean((window as Window & { ReactNativeWebView?: unknown }).ReactNativeWebView);
  return iosWebView || androidWebView || bridgedWebView ? "webview" : "web";
}

export default function LiveKitWebViewPocPage() {
  const params = useParams<{ consultationId: string }>();
  const roomRef = useRef<Room | null>(null);
  const ticketRef = useRef<string | null>(null);
  const joiningRef = useRef(false);
  const joinEpochRef = useRef(0);
  const remoteMediaRef = useRef<HTMLDivElement | null>(null);
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<ConnectionLabel>("Lista para ingresar");
  const [role, setRole] = useState<"doctor" | "patient" | null>(null);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState<number | null>(null);
  const [patientPhone, setPatientPhone] = useState("");
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [joined, setJoined] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [needsAudioTap, setNeedsAudioTap] = useState(false);
  const [qualityEnabled, setQualityEnabled] = useState(false);
  const [localQuality, setLocalQuality] = useState<QualityLabel>("Verificando conexión");
  const [remoteQuality, setRemoteQuality] = useState<QualityLabel>("Verificando conexión");
  const translationRef = useRef<RealtimeTranslationController | null>(null);
  const translationApiTokenRef = useRef("");
  const [translationStatus, setTranslationStatus] = useState<TranslationStatus>("unavailable");
  const [translationMessage, setTranslationMessage] = useState("");
  const [partialOriginal, setPartialOriginal] = useState("");
  const [partialTranslated, setPartialTranslated] = useState("");
  const [segments, setSegments] = useState<TranslationSegment[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [translationMetrics, setTranslationMetrics] = useState<Record<string, number | null>>({});
  const [medicalSummary, setMedicalSummary] = useState<MedicalSummary | null>(null);
  const [summaryDisclaimer, setSummaryDisclaimer] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const poorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recoveryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const qualityText = useCallback((quality: ConnectionQuality): QualityLabel => {
    if (quality === ConnectionQuality.Excellent) return "Conexión excelente";
    if (quality === ConnectionQuality.Good) return "Conexión buena";
    if (quality === ConnectionQuality.Poor || quality === ConnectionQuality.Lost) return "Conexión inestable";
    return "Verificando conexión";
  }, []);

  const updateLocalQuality = useCallback((quality: ConnectionQuality) => {
    if (quality === ConnectionQuality.Lost) {
      if (poorTimerRef.current) clearTimeout(poorTimerRef.current);
      setLocalQuality("Reconectando");
      setMessage("Se perdió temporalmente la conexión. Estamos intentando reconectarte.");
      return;
    }
    if (quality === ConnectionQuality.Poor) {
      if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
      if (!poorTimerRef.current) poorTimerRef.current = setTimeout(() => {
        setLocalQuality("Conexión inestable");
        setMessage("Tu conexión a Internet está inestable. La calidad del audio o video puede verse afectada. Si es posible, acercate a una red Wi-Fi o conectate a una red más estable.");
        poorTimerRef.current = null;
      }, 7000);
      return;
    }
    if (poorTimerRef.current) { clearTimeout(poorTimerRef.current); poorTimerRef.current = null; }
    if (!recoveryTimerRef.current) recoveryTimerRef.current = setTimeout(() => {
      setLocalQuality(qualityText(quality));
      setMessage("");
      recoveryTimerRef.current = null;
    }, 3000);
  }, [qualityText]);

  const attachTrack = useCallback((track: RemoteTrack) => {
    const element = track.attach();
    element.dataset.livekitTrackSid = track.sid ?? "";
    if (track.kind === Track.Kind.Video) {
      element.className = "h-full w-full object-cover";
    } else {
      element.setAttribute("playsinline", "true");
      element.autoplay = true;
    }
    remoteMediaRef.current?.appendChild(element);
  }, []);

  const detachTrack = useCallback((track: RemoteTrack) => {
    track.detach().forEach((element) => element.remove());
  }, []);

  const attachLocalVideo = useCallback((room: Room) => {
    localVideoRef.current?.replaceChildren();
    const publication = room.localParticipant.getTrackPublication(Track.Source.Camera);
    const track = publication?.track;
    if (track instanceof LocalVideoTrack) {
      const element = track.attach();
      element.className = "h-full w-full object-cover -scale-x-100";
      element.muted = true;
      element.setAttribute("playsinline", "true");
      localVideoRef.current?.appendChild(element);
    }
  }, []);

  const leave = useCallback(async () => {
    joinEpochRef.current++;
    joiningRef.current = false;
    const room = roomRef.current;
    const translation = translationRef.current;
    roomRef.current = null;
    translationRef.current = null;
    room?.removeAllListeners();
    await translation?.stop();
    await room?.disconnect(true);
    remoteMediaRef.current?.replaceChildren();
    localVideoRef.current?.replaceChildren();
    setJoined(false);
    setStatus("Desconectado");
  }, []);

  useEffect(() => {
    let stopped = false;
    let inFlight = false;
    const checkRoom = async () => {
      const ticket = ticketRef.current || new URLSearchParams(window.location.hash.slice(1)).get("ticket");
      if (!ticket || inFlight || stopped) return;
      inFlight = true;
      try {
        const res = await fetch(`${API}/livekit-webview-poc/room-status`, {
          method: "POST", signal: AbortSignal.timeout(8000),
          headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ticket }),
        });
        if (!res.ok || stopped) return;
        const data = await res.json();
        if (stopped) return;
        if (data.active === false) {
          await leave();
          setMessage("La teleconsulta finalizó.");
        } else if (data.video_provider === "daily" && typeof data.room_url === "string" && data.room_url.startsWith("https://")) {
          await leave();
          if (!stopped) window.location.replace(data.room_url);
        }
      } catch {
        // A failed status poll must never interrupt a working media connection.
      } finally { inFlight = false; }
    };
    const timer = setInterval(checkRoom, 5000);
    return () => { stopped = true; clearInterval(timer); };
  }, [leave]);

  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden && roomRef.current) {
        void roomRef.current.startAudio().catch(() => setNeedsAudioTap(true));
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      joinEpochRef.current++;
      joiningRef.current = false;
      document.removeEventListener("visibilitychange", onVisibility);
      void translationRef.current?.stop();
      const room = roomRef.current;
      roomRef.current = null;
      room?.removeAllListeners();
      void room?.disconnect(true);
    };
  }, []);

  useEffect(() => {
    // Report SDK facts only, never tokens or clinical information.
    const report = () => {
      const room = roomRef.current;
      const state = status === "Conectado" ? "connected" : status === "Reconectando" ? "reconnecting" :
        status === "Conectando" ? "connecting" : status === "Error" ? "error" : "disconnected";
      window.parent.postMessage({
        type: "docya-video-media", consultationId: String(params.consultationId),
        media: {
          connection_state: state,
          microphone_published: Boolean(room?.localParticipant.isMicrophoneEnabled),
          remote_audio_subscribed: Boolean(room && Array.from(room.remoteParticipants.values()).some(participant =>
            Array.from(participant.audioTrackPublications.values()).some(publication => publication.isSubscribed && !publication.isMuted))),
        },
      }, "*");
    };
    report();
    const timer = setInterval(report, 15000);
    return () => clearInterval(timer);
  }, [status, params.consultationId]);

  async function join() {
    if (joined || joiningRef.current) return;
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const ticket = ticketRef.current || hash.get("ticket");
    ticketRef.current = ticket;
    if (!ticket) {
      setStatus("Error");
      setMessage("Falta el ticket seguro de ingreso.");
      return;
    }

    const epoch = ++joinEpochRef.current;
    let joinRoom: Room | null = null;
    joiningRef.current = true;
    setStatus("Conectando");
    setMessage("");
    try {
      await roomRef.current?.disconnect(true);
      roomRef.current = null;
      const response = await fetch(`${API}/livekit-webview-poc/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket }),
        signal: AbortSignal.timeout(20000),
      });
      const body = (await response.json()) as TokenResponse & { detail?: string };
      if (!response.ok) throw new Error(body.detail || "No se pudo autorizar la demo");
      if (epoch !== joinEpochRef.current) return;
      setQualityEnabled(Boolean(body.connection_quality_ui_enabled));
      translationApiTokenRef.current = body.translation_api_token || "";

      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
        disconnectOnPageLeave: true,
      });
      joinRoom = room;
      roomRef.current = room;
      room
        .on(RoomEvent.TrackSubscribed, attachTrack)
        .on(RoomEvent.TrackUnsubscribed, detachTrack)
        .on(RoomEvent.LocalTrackPublished, () => attachLocalVideo(room))
        .on(RoomEvent.ConnectionQualityChanged, (quality, participant) => {
          if (!body.connection_quality_ui_enabled) return;
          if (participant === room.localParticipant) updateLocalQuality(quality);
          else setRemoteQuality(qualityText(quality));
        })
        .on(RoomEvent.Reconnecting, () => setStatus("Reconectando"))
        .on(RoomEvent.Reconnected, () => setStatus("Conectado"))
        .on(RoomEvent.Disconnected, () => {
          setStatus("Desconectado");
          setJoined(false);
        });

      await room.connect(body.ws_url, body.token);
      if (epoch !== joinEpochRef.current) return;
      setRole(body.role);
      if (body.role === "doctor") {
        setPatientName(body.patient_name || "Paciente");
        setPatientAge(body.patient_age ?? null);
        setPatientPhone(body.patient_phone || "");
      }
      await room.localParticipant.setMicrophoneEnabled(true);
      try {
        await room.localParticipant.setCameraEnabled(true);
      } catch {
        setCameraEnabled(false);
        setMessage("La cámara no está disponible. Podés continuar con audio.");
      }
      if (epoch !== joinEpochRef.current) return;
      setMicEnabled(true);
      if (
        body.translation_available && body.translation_language &&
        body.translation_api_token && body.translation_segmentation
      ) {
        const controller = new RealtimeTranslationController({
          room,
          apiBase: API,
          apiToken: body.translation_api_token,
          consultationId: Number(params.consultationId),
          role: body.role,
          patientLanguage: body.translation_language,
          clientKind: translationClientKind(),
          segmentation: body.translation_segmentation,
          onStatus: (next, detail) => { setTranslationStatus(next); setTranslationMessage(detail || ""); },
          onPartial: (original, translated) => { setPartialOriginal(original); setPartialTranslated(translated); },
          onFinal: (segment) => {
            setPartialOriginal("");
            setPartialTranslated("");
            setSegments((current) =>
              current.some((item) => item.segment_id === segment.segment_id) ? current : [...current, segment]
            );
          },
          onMetrics: (metrics) => setTranslationMetrics(metrics as unknown as Record<string, number | null>),
        });
        translationRef.current = controller;
        void controller.start().catch((error) => {
          setTranslationStatus("unavailable");
          setTranslationMessage(error instanceof Error ? error.message : "Traducción no disponible");
        });
      }
      attachLocalVideo(room);
      setJoined(true);
      setStatus("Conectado");
      window.history.replaceState(null, "", window.location.pathname);
      try {
        await room.startAudio();
      } catch {
        setNeedsAudioTap(true);
      }
    } catch (error) {
      await joinRoom?.disconnect(true);
      if (epoch !== joinEpochRef.current) return;
      roomRef.current = null;
      setStatus("Error");
      setMessage(error instanceof Error ? error.message : "Error de conexión");
    } finally {
      if (epoch === joinEpochRef.current) joiningRef.current = false;
      else {
        joinRoom?.removeAllListeners();
        await joinRoom?.disconnect(true);
      }
    }
  }

  async function toggleMic() {
    const next = !micEnabled;
    await roomRef.current?.localParticipant.setMicrophoneEnabled(next);
    setMicEnabled(next);
    if (next && translationRef.current) {
      void translationRef.current.resumeAfterMicrophoneEnabled().catch(() => {
        setTranslationStatus("reconnecting");
        setTranslationMessage("Reanudando traducción. La videollamada continúa normalmente.");
      });
    }
  }

  async function toggleCamera() {
    const next = !cameraEnabled;
    await roomRef.current?.localParticipant.setCameraEnabled(next);
    setCameraEnabled(next);
    if (next && roomRef.current) attachLocalVideo(roomRef.current);
    if (!next) localVideoRef.current?.replaceChildren();
  }

  async function prioritizeAudio() {
    if (!cameraEnabled) return;
    await roomRef.current?.localParticipant.setCameraEnabled(false);
    setCameraEnabled(false);
    localVideoRef.current?.replaceChildren();
    setMessage("Cámara pausada para priorizar el audio. Podés volver a activarla cuando la conexión mejore.");
  }

  async function switchCamera() {
    const room = roomRef.current;
    const publication = room?.localParticipant.getTrackPublication(Track.Source.Camera);
    const track = publication?.track;
    if (!(track instanceof LocalVideoTrack)) {
      setMessage("No hay una cámara activa para cambiar.");
      return;
    }
    try {
      const current = track.mediaStreamTrack.getSettings().facingMode;
      await track.restartTrack({ facingMode: current === "environment" ? "user" : "environment" });
      if (room) attachLocalVideo(room);
    } catch {
      setMessage("Este navegador/WebView no permite cambiar de cámara.");
    }
  }

  async function activateAudio() {
    try {
      await roomRef.current?.startAudio();
      setNeedsAudioTap(false);
      setMessage("");
    } catch {
      setNeedsAudioTap(true);
      setMessage("Tocá Activar audio para escuchar al otro participante.");
    }
  }

  function messagePatient() {
    const phone = patientPhone.replace(/\D/g, "");
    if (!phone) return;
    const message = encodeURIComponent(
      `Hola ${patientName || ""}, soy tu médico de DocYa. Tuvimos un inconveniente de conexión durante la teleconsulta #${params.consultationId}.`,
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  async function generateSummary() {
    if (!translationApiTokenRef.current || summaryLoading) return;
    setSummaryLoading(true);
    setSummaryError("");
    try {
      const response = await fetch(`${API}/teleconsultations/${params.consultationId}/translation/summary`, {
        method: "POST",
        headers: { Authorization: `Bearer ${translationApiTokenRef.current}` },
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.detail || "No se pudo generar el resumen");
      setMedicalSummary(body.summary?.content || null);
      setSummaryDisclaimer(body.summary?.disclaimer || "");
    } catch (error) {
      setSummaryError(error instanceof Error ? error.message : "No se pudo generar el resumen");
    } finally {
      setSummaryLoading(false);
    }
  }

  return (
    <main className="min-h-[100dvh] bg-[#04151c] px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-[max(12px,env(safe-area-inset-top))] text-[#e5f6f8] sm:p-5">
      <div className="mx-auto flex min-h-[calc(100dvh-24px)] max-w-5xl flex-col gap-3">
        <header className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#071c23] px-4 py-3">
          <Image src={DOCYA_LOGO_URL} alt="DocYa" width={142} height={46} priority className="h-auto w-[112px] object-contain sm:w-[142px]" />
          <div className="min-w-0 flex-1 text-center">
            {role === "doctor" && patientName ? (
              <>
                <p className="truncate text-sm font-extrabold sm:text-base">{patientName}</p>
                {patientAge !== null && <p className="text-xs text-white/60">{patientAge} años</p>}
              </>
            ) : (
              <p className="text-sm font-extrabold">Teleconsulta</p>
            )}
            <p className="text-[11px] text-white/45">Consulta #{params.consultationId}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-black/30 px-3 py-2 text-xs font-bold">
            <span className={`h-2 w-2 rounded-full ${status === "Conectado" ? "bg-emerald-400" : status === "Error" ? "bg-red-400" : "bg-amber-300"}`} />
            <span>{status}</span>
          </div>
        </header>

        <section className="relative min-h-[52dvh] flex-1 overflow-hidden rounded-3xl border border-white/10 bg-black">
          {qualityEnabled && joined && (
            <div className="absolute left-3 top-3 z-30 rounded-xl bg-black/65 px-3 py-2 text-xs backdrop-blur">
              <p className={localQuality === "Conexión inestable" || localQuality === "Reconectando" ? "text-amber-300" : "text-emerald-300"}>Vos · {localQuality}</p>
              <p className="mt-1 text-white/75">{role === "doctor" ? "Paciente" : "Médico"} · {remoteQuality}</p>
              {role === "patient" && localQuality === "Conexión inestable" && cameraEnabled && <button type="button" onClick={() => void prioritizeAudio()} className="mt-2 rounded-lg bg-amber-300 px-2.5 py-1.5 text-[11px] font-black text-black">Priorizar audio</button>}
            </div>
          )}
          <div ref={remoteMediaRef} className="absolute inset-0 [&>audio]:hidden" />
          {!joined && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-[#07141a] p-6 text-center">
              <div>
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#25d7c8]/15 text-3xl">📹</div>
                <h2 className="text-xl font-black">Sala de videollamada DocYa</h2>
                <p className="mt-2 max-w-md text-sm text-white/60">Al ingresar, el navegador solicitará acceso a cámara y micrófono.</p>
                <button onClick={join} className="mt-6 rounded-full bg-[#25d7c8] px-7 py-3 font-black text-[#04232a] disabled:opacity-50" disabled={status === "Conectando"}>
                  {status === "Conectando" ? "Conectando…" : "Ingresar a la sala"}
                </button>
              </div>
            </div>
          )}
          <div ref={localVideoRef} aria-label="Vista previa de tu cámara" className="absolute right-3 top-3 z-20 h-32 w-24 overflow-hidden rounded-2xl border-2 border-[#25d7c8]/70 bg-[#102730] shadow-2xl sm:h-44 sm:w-32" />
          {joined && role === "patient" && <a href={`https://wa.me/5491168700607?text=${encodeURIComponent(`Hola, necesito ayuda durante la teleconsulta #${params.consultationId}.`)}`} target="_blank" rel="noreferrer" aria-label="Contactar a soporte por WhatsApp" className="absolute bottom-3 left-3 z-30 rounded-full bg-[#25d366] px-4 py-2 text-xs font-black text-white shadow-lg">WhatsApp soporte</a>}
          {needsAudioTap && (
            <button
              className="absolute left-1/2 top-3 z-30 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-2 text-sm font-black text-black"
              onClick={async () => {
                await roomRef.current?.startAudio();
                setNeedsAudioTap(false);
              }}
            >
              Activar audio
            </button>
          )}
          {joined && (partialOriginal || partialTranslated || segments.length > 0) && (() => {
            const latest = segments[segments.length - 1];
            const original = partialOriginal || latest?.original_text || "";
            const translated = partialTranslated || latest?.translated_text || "";
            const speaker = partialOriginal || partialTranslated
              ? role
              : latest?.speaker_role;
            return (
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-30 pr-28 sm:bottom-5 sm:left-5 sm:right-5 sm:pr-40">
                <div className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-black/75 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-5 sm:py-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-300">
                    {speaker === "doctor" ? "Médico" : "Paciente"}{partialOriginal || partialTranslated ? " · escuchando…" : ""}
                  </p>
                  {original && <p className="mt-1 line-clamp-2 text-xs text-white/65 sm:text-sm">{original}</p>}
                  <p className="mt-1 line-clamp-3 text-base font-black leading-snug text-cyan-100 sm:text-xl">{translated || "…"}</p>
                </div>
              </div>
            );
          })()}
        </section>

        <section aria-label="Controles de la videollamada" className="grid grid-cols-4 gap-2 rounded-2xl border border-white/10 bg-[#0d1e25] p-3">
          <CallControl label={micEnabled ? "Silenciar" : "Activar micrófono"} icon={micEnabled ? Mic : MicOff} onClick={toggleMic} disabled={!joined} />
          <CallControl label={cameraEnabled ? "Apagar cámara" : "Activar cámara"} icon={cameraEnabled ? Camera : CameraOff} onClick={toggleCamera} disabled={!joined} />
          <CallControl label="Cambiar cámara" icon={SwitchCamera} onClick={switchCamera} disabled={!joined || !cameraEnabled} />
          <CallControl label="Audio" icon={Volume2} onClick={activateAudio} disabled={!joined} />
        </section>

        {joined && role === "doctor" && (
          <section aria-label="Acciones de la teleconsulta" className="grid grid-cols-[1fr_1fr_0.9fr] gap-2">
            <button type="button" onClick={() => setToolsOpen(true)} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1b3038] px-2 text-xs font-extrabold text-white sm:text-sm">
              <ShieldCheck size={17} /> Herramientas
            </button>
            <button type="button" onClick={() => setContactOpen(true)} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#073944] px-2 text-xs font-extrabold text-[#25d7c8] sm:text-sm">
              <Phone size={17} /> Contactar
            </button>
            <button type="button" onClick={() => void leave()} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-red-500/20 px-2 text-xs font-extrabold text-red-200 sm:text-sm">
              <PhoneOff size={17} /> Salir
            </button>
          </section>
        )}

        {joined && role === "patient" && (
          <button type="button" onClick={() => void leave()} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-red-500/20 px-4 text-sm font-extrabold text-red-200">
            <PhoneOff size={17} /> Salir de la teleconsulta
          </button>
        )}

        {(translationStatus !== "unavailable" || translationMessage) && (
          <section id="translation-panel" className="rounded-2xl border border-cyan-300/15 bg-[#0d1e25] p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-cyan-200">🌐 {translationStatus === "active" ? "Traducción activa" : translationStatus === "preparing" ? "Preparando traducción" : translationStatus === "reconnecting" ? "Reconectando traducción" : "Traducción no disponible"}</p>
              {segments.length > 0 && (
                <button
                  type="button"
                  onClick={() => setHistoryOpen((open) => !open)}
                  className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1.5 text-xs font-bold text-cyan-100"
                >
                  {historyOpen ? "Ocultar historial" : `Ver historial (${segments.length})`}
                </button>
              )}
            </div>
            {translationMessage && <p className="mt-2 text-xs text-amber-200">{translationMessage}</p>}
            {historyOpen && (
              <div className="mt-3 max-h-64 space-y-2 overflow-y-auto">
                {segments.map((segment) => (
                  <article key={segment.segment_id} className="rounded-xl bg-black/20 p-3">
                    <p className="text-[10px] font-black tracking-widest text-emerald-300">{segment.speaker_role === "doctor" ? "MÉDICO" : "PACIENTE"}</p>
                    <p className="mt-1 text-sm text-white/65">{segment.original_text}</p>
                    <p className="mt-1 text-base font-bold text-cyan-100">{segment.translated_text}</p>
                  </article>
                ))}
              </div>
            )}
            {process.env.NODE_ENV !== "production" && Object.keys(translationMetrics).length > 0 && (
              <details className="mt-3 text-[10px] text-white/45"><summary>Métricas experimentales</summary><pre className="mt-2 overflow-x-auto">{JSON.stringify(translationMetrics, null, 2)}</pre></details>
            )}
          </section>
        )}

        {role === "doctor" && segments.length > 0 && (
          <section className="rounded-2xl border border-emerald-300/15 bg-[#0d1e25] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-emerald-200">🩺 Resumen para el médico</p>
                <p className="mt-1 text-xs text-white/55">Se guarda como borrador editable de esta consulta.</p>
              </div>
              {!medicalSummary && (
                <button type="button" onClick={generateSummary} disabled={summaryLoading}
                  className="rounded-full bg-emerald-300 px-4 py-2 text-xs font-black text-[#06241f] disabled:opacity-50">
                  {summaryLoading ? "Generando…" : "Generar resumen"}
                </button>
              )}
            </div>
            {summaryError && <p className="mt-3 text-xs text-amber-200">{summaryError}</p>}
            {medicalSummary && (
              <div className="mt-4 space-y-3">
                {Object.entries({
                  "Motivo": medicalSummary.motivo,
                  "Síntomas y evolución": medicalSummary.sintomas_y_evolucion,
                  "Antecedentes y medicación": medicalSummary.antecedentes_y_medicacion,
                  "Hallazgos relevantes": medicalSummary.hallazgos_relevantes,
                  "Diagnóstico o impresión": medicalSummary.diagnostico_o_impresion,
                  "Indicaciones y seguimiento": medicalSummary.indicaciones_y_seguimiento,
                  "Alertas": medicalSummary.alertas,
                }).filter(([, value]) => value).map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-black/20 p-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-emerald-300">{label}</p>
                    <p className="mt-1 text-sm text-white/85">{value}</p>
                  </div>
                ))}
                <p className="text-[11px] leading-relaxed text-amber-100/75">{summaryDisclaimer}</p>
              </div>
            )}
          </section>
        )}

        {message && <p className="rounded-xl bg-[#102730] px-4 py-3 text-center text-sm text-white/75">{message}</p>}

        {contactOpen && role === "doctor" && (
          <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setContactOpen(false); }} className="fixed inset-0 z-[100] flex items-end justify-center bg-black/65 p-3 backdrop-blur-sm sm:items-center">
            <section role="dialog" aria-modal="true" aria-labelledby="contact-title" className="w-full max-w-lg rounded-t-[28px] border border-white/10 bg-[#0d2028] p-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-[28px]">
              <div className="mx-auto mb-4 h-1 w-11 rounded-full bg-white/35 sm:hidden" />
              <div className="flex items-center justify-between gap-3">
                <h2 id="contact-title" className="text-lg font-black">Contactar al paciente</h2>
                <button type="button" onClick={() => setContactOpen(false)} aria-label="Cerrar" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80"><X size={19} /></button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/60">Si tenés problemas con la videollamada, podés seguir en contacto por otro medio. La teleconsulta continúa activa.</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <a href={patientPhone ? `tel:${patientPhone}` : undefined} aria-disabled={!patientPhone} onClick={(event) => { if (!patientPhone) event.preventDefault(); }} className={`flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-3 text-center text-sm font-extrabold text-white ${patientPhone ? "" : "pointer-events-none opacity-40"}`}>
                  <Phone size={18} /> Llamar por teléfono
                </a>
                <button type="button" onClick={messagePatient} disabled={!patientPhone} className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#20c96b] px-3 text-center text-sm font-extrabold text-[#04232a] disabled:opacity-40">
                  <MessageCircle size={18} /> Abrir WhatsApp
                </button>
              </div>
              {!patientPhone && <p className="mt-3 text-xs text-amber-200/80">No hay un teléfono cargado para esta cuenta de paciente.</p>}
            </section>
          </div>
        )}

        {toolsOpen && role === "doctor" && (
          <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setToolsOpen(false); }} className="fixed inset-0 z-[100] flex items-end justify-center bg-black/65 p-3 backdrop-blur-sm sm:items-center">
            <section role="dialog" aria-modal="true" aria-labelledby="tools-title" className="w-full max-w-lg rounded-t-[28px] border border-white/10 bg-[#0d2028] p-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-[28px]">
              <div className="mx-auto mb-4 h-1 w-11 rounded-full bg-white/35 sm:hidden" />
              <div className="flex items-center justify-between gap-3">
                <h2 id="tools-title" className="text-lg font-black">Herramientas de la consulta</h2>
                <button type="button" onClick={() => setToolsOpen(false)} aria-label="Cerrar" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80"><X size={19} /></button>
              </div>
              <div className="mt-4 grid gap-3">
                <button type="button" onClick={() => { setToolsOpen(false); setHistoryOpen(true); document.getElementById("translation-panel")?.scrollIntoView({ behavior: "smooth", block: "center" }); }} disabled={segments.length === 0} className="flex min-h-12 items-center justify-between rounded-2xl bg-white/5 px-4 text-left text-sm font-bold disabled:opacity-40">
                  <span>Ver transcripción</span><span className="text-white/50">{segments.length ? `${segments.length} fragmentos` : "No disponible"}</span>
                </button>
                <button type="button" onClick={() => { setToolsOpen(false); void generateSummary(); }} disabled={!translationApiTokenRef.current || summaryLoading || Boolean(medicalSummary)} className="flex min-h-12 items-center justify-between rounded-2xl bg-white/5 px-4 text-left text-sm font-bold disabled:opacity-40">
                  <span>{summaryLoading ? "Generando resumen…" : "Generar resumen de consulta"}</span><span className="text-white/50">{medicalSummary ? "Generado" : "Borrador"}</span>
                </button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/45">Las herramientas disponibles dependen de la configuración de esta teleconsulta.</p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function CallControl({ label, icon: Icon, onClick, disabled }: { label: string; icon: LucideIcon; onClick: () => void | Promise<void>; disabled: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} className="flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-2xl px-1 py-2 text-[11px] font-extrabold text-white transition hover:bg-white/5 disabled:opacity-35 sm:text-xs">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-black/35"><Icon size={21} strokeWidth={2.2} /></span>
      <span className="max-w-full text-center leading-tight">{label}</span>
    </button>
  );
}
