"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  LocalVideoTrack,
  RemoteTrack,
  Room,
  RoomEvent,
  Track,
} from "livekit-client";

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
};

export default function LiveKitWebViewPocPage() {
  const params = useParams<{ consultationId: string }>();
  const roomRef = useRef<Room | null>(null);
  const remoteMediaRef = useRef<HTMLDivElement | null>(null);
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<ConnectionLabel>("Lista para ingresar");
  const [role, setRole] = useState<"doctor" | "patient" | null>(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [needsAudioTap, setNeedsAudioTap] = useState(false);

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
        .on(RoomEvent.Reconnecting, () => setStatus("Reconectando"))
        .on(RoomEvent.Reconnected, () => setStatus("Conectado"))
        .on(RoomEvent.Disconnected, () => {
          setStatus("Desconectado");
          setJoined(false);
        });

      await room.connect(body.ws_url, body.token);
      setRole(body.role);
      await Promise.all([
        room.localParticipant.setMicrophoneEnabled(true),
        room.localParticipant.setCameraEnabled(true),
      ]);
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
          </div>
          <div className="text-right text-sm">
            <p className="font-bold">{status}</p>
            <p className="text-white/55">{role === "doctor" ? "Médico" : role === "patient" ? "Paciente" : "Sin conectar"}</p>
          </div>
        </header>

        <section className="relative min-h-[52dvh] flex-1 overflow-hidden rounded-3xl border border-white/10 bg-black">
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
        </section>

        <section className="grid grid-cols-4 gap-2 rounded-2xl border border-white/10 bg-[#0d1e25] p-3">
          <Control label={micEnabled ? "Silenciar" : "Micrófono"} icon={micEnabled ? "🎙️" : "🔇"} onClick={toggleMic} disabled={!joined} />
          <Control label={cameraEnabled ? "Apagar cámara" : "Cámara"} icon={cameraEnabled ? "📷" : "🚫"} onClick={toggleCamera} disabled={!joined} />
          <Control label="Cambiar" icon="🔄" onClick={switchCamera} disabled={!joined || !cameraEnabled} />
          <Control label="Salir" icon="📵" onClick={leave} disabled={!joined} danger />
        </section>

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
