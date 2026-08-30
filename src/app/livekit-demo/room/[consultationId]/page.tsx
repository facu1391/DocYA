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
  RealtimeTranslationController,
  TranslationSegment,
  TranslationStatus,
} from "@/lib/livekit/realtimeTranslation";

const API = process.env.NEXT_PUBLIC_API_BASE!;

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
  translation_api_token?: string;
  translation_segmentation?: {
    silence_threshold: number;
    silence_duration_ms: number;
    minimum_segment_ms: number;
    maximum_segment_ms: number;
  };
};

type QualityLabel = "Verificando conexión" | "Conexión excelente" | "Conexión buena" | "Conexión inestable" | "Reconectando";

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
  const remoteMediaRef = useRef<HTMLDivElement | null>(null);
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<ConnectionLabel>("Lista para ingresar");
  const [role, setRole] = useState<"doctor" | "patient" | null>(null);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState<number | null>(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [needsAudioTap, setNeedsAudioTap] = useState(false);
  const [qualityEnabled, setQualityEnabled] = useState(false);
  const [localQuality, setLocalQuality] = useState<QualityLabel>("Verificando conexión");
  const [remoteQuality, setRemoteQuality] = useState<QualityLabel>("Verificando conexión");
  const translationRef = useRef<RealtimeTranslationController | null>(null);
  const [translationStatus, setTranslationStatus] = useState<TranslationStatus>("unavailable");
  const [translationMessage, setTranslationMessage] = useState("");
  const [partialOriginal, setPartialOriginal] = useState("");
  const [partialTranslated, setPartialTranslated] = useState("");
  const [segments, setSegments] = useState<TranslationSegment[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [translationMetrics, setTranslationMetrics] = useState<Record<string, number | null>>({});
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
    await translationRef.current?.stop();
    translationRef.current = null;
    await roomRef.current?.disconnect(true);
    roomRef.current = null;
    remoteMediaRef.current?.replaceChildren();
    localVideoRef.current?.replaceChildren();
    setJoined(false);
    setStatus("Desconectado");
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden && roomRef.current) {
        void roomRef.current.startAudio().catch(() => setNeedsAudioTap(true));
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      void roomRef.current?.disconnect(true);
    };
  }, []);

  async function join() {
    if (joined || status === "Conectando") return;
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const ticket = hash.get("ticket");
    if (!ticket) {
      setStatus("Error");
      setMessage("Falta el ticket seguro de ingreso.");
      return;
    }

    setStatus("Conectando");
    setMessage("");
    try {
      const response = await fetch(`${API}/livekit-webview-poc/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket }),
      });
      const body = (await response.json()) as TokenResponse & { detail?: string };
      if (!response.ok) throw new Error(body.detail || "No se pudo autorizar la demo");
      setQualityEnabled(Boolean(body.connection_quality_ui_enabled));

      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
        disconnectOnPageLeave: true,
      });
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
      setRole(body.role);
      if (body.role === "doctor") {
        setPatientName(body.patient_name || "Paciente");
        setPatientAge(body.patient_age ?? null);
      }
      await Promise.all([
        room.localParticipant.setMicrophoneEnabled(true),
        room.localParticipant.setCameraEnabled(true),
      ]);
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
      await roomRef.current?.disconnect(true);
      roomRef.current = null;
      setStatus("Error");
      setMessage(error instanceof Error ? error.message : "Error de conexión");
    }
  }

  async function toggleMic() {
    const next = !micEnabled;
    await roomRef.current?.localParticipant.setMicrophoneEnabled(next);
    setMicEnabled(next);
  }

  async function toggleCamera() {
    const next = !cameraEnabled;
    await roomRef.current?.localParticipant.setCameraEnabled(next);
    setCameraEnabled(next);
    if (next && roomRef.current) attachLocalVideo(roomRef.current);
    if (!next) localVideoRef.current?.replaceChildren();
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

  return (
    <main className="min-h-[100dvh] bg-[#06161d] p-3 text-[#e5f6f8] sm:p-5">
      <div className="mx-auto flex min-h-[calc(100dvh-24px)] max-w-5xl flex-col gap-3">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0d1e25] px-4 py-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#25d7c8]">Teleconsulta DocYa</p>
            <h1 className="font-black">Consulta #{params.consultationId}</h1>
            {role === "doctor" && patientName && (
              <p className="mt-1 text-sm font-semibold text-white/75">
                Paciente: {patientName}{patientAge !== null ? ` · ${patientAge} años` : ""}
              </p>
            )}
          </div>
          <div className="text-right text-sm">
            <p className="font-bold">{status}</p>
            <p className="text-white/55">{role === "doctor" ? "Médico" : role === "patient" ? "Paciente" : "Sin conectar"}</p>
          </div>
        </header>

        <section className="relative min-h-[52dvh] flex-1 overflow-hidden rounded-3xl border border-white/10 bg-black">
          {qualityEnabled && joined && (
            <div className="absolute left-3 top-3 z-30 rounded-xl bg-black/65 px-3 py-2 text-xs backdrop-blur">
              <p className={localQuality === "Conexión inestable" || localQuality === "Reconectando" ? "text-amber-300" : "text-emerald-300"}>Vos · {localQuality}</p>
              <p className="mt-1 text-white/75">{role === "doctor" ? "Paciente" : "Médico"} · {remoteQuality}</p>
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
          <div ref={localVideoRef} className="absolute bottom-3 right-3 z-20 h-32 w-24 overflow-hidden rounded-2xl border-2 border-[#25d7c8]/70 bg-[#102730] shadow-2xl sm:h-44 sm:w-32" />
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

        <section className="grid grid-cols-4 gap-2 rounded-2xl border border-white/10 bg-[#0d1e25] p-3">
          <Control label={micEnabled ? "Silenciar" : "Micrófono"} icon={micEnabled ? "🎙️" : "🔇"} onClick={toggleMic} disabled={!joined} />
          <Control label={cameraEnabled ? "Apagar cámara" : "Cámara"} icon={cameraEnabled ? "📷" : "🚫"} onClick={toggleCamera} disabled={!joined} />
          <Control label="Cambiar" icon="🔄" onClick={switchCamera} disabled={!joined || !cameraEnabled} />
          <Control label="Salir" icon="📵" onClick={leave} disabled={!joined} danger />
        </section>

        {(translationStatus !== "unavailable" || translationMessage) && (
          <section className="rounded-2xl border border-cyan-300/15 bg-[#0d1e25] p-3">
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

        {message && <p className="rounded-xl bg-[#102730] px-4 py-3 text-center text-sm text-white/75">{message}</p>}
      </div>
    </main>
  );
}

function Control({ label, icon, onClick, disabled, danger = false }: { label: string; icon: string; onClick: () => void | Promise<void>; disabled: boolean; danger?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`rounded-xl px-2 py-3 text-xs font-black disabled:opacity-35 sm:text-sm ${danger ? 'bg-red-500/20 text-red-200' : 'bg-white/7 text-white'}`}>
      <span className="block text-lg">{icon}</span>{label}
    </button>
  );
}
