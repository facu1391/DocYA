"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LocalVideoTrack, RemoteTrack, Room, RoomEvent, Track } from "livekit-client";

type DemoRole = "doctor" | "patient";
type Status = "Lista" | "Conectando" | "Conectado" | "Reconectando" | "Desconectado" | "Error";

export default function PedirLiveKitDemoPage() {
  const [role, setRole] = useState<DemoRole>("patient");
  const roomRef = useRef<Room | null>(null);
  const remoteRef = useRef<HTMLDivElement>(null);
  const localRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("Lista");
  const [joined, setJoined] = useState(false);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [notice, setNotice] = useState("");
  const [audioBlocked, setAudioBlocked] = useState(false);

  const attachRemote = useCallback((track: RemoteTrack) => {
    const element = track.attach();
    if (track.kind === Track.Kind.Video) element.className = "h-full w-full object-cover";
    else element.className = "hidden";
    element.setAttribute("playsinline", "true");
    remoteRef.current?.appendChild(element);
  }, []);

  const detachRemote = useCallback((track: RemoteTrack) => {
    track.detach().forEach((element) => element.remove());
  }, []);

  const attachLocal = useCallback((room: Room) => {
    localRef.current?.replaceChildren();
    const track = room.localParticipant.getTrackPublication(Track.Source.Camera)?.track;
    if (track instanceof LocalVideoTrack) {
      const element = track.attach();
      element.className = "h-full w-full object-cover -scale-x-100";
      element.muted = true;
      element.setAttribute("playsinline", "true");
      localRef.current?.appendChild(element);
    }
  }, []);

  useEffect(() => {
    setRole(new URLSearchParams(window.location.search).get("role") === "doctor" ? "doctor" : "patient");
    return () => { void roomRef.current?.disconnect(true); };
  }, []);

  async function join() {
    setStatus("Conectando");
    setNotice("");
    try {
      const response = await fetch(`/api/livekit-poc-token?role=${role}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "No se pudo obtener el token local");
      const room = new Room({ adaptiveStream: true, dynacast: true, disconnectOnPageLeave: true });
      roomRef.current = room;
      room
        .on(RoomEvent.TrackSubscribed, attachRemote)
        .on(RoomEvent.TrackUnsubscribed, detachRemote)
        .on(RoomEvent.LocalTrackPublished, () => attachLocal(room))
        .on(RoomEvent.Reconnecting, () => setStatus("Reconectando"))
        .on(RoomEvent.Reconnected, () => setStatus("Conectado"))
        .on(RoomEvent.Disconnected, () => { setStatus("Desconectado"); setJoined(false); });
      await room.connect(data.ws_url, data.token);
      await Promise.all([
        room.localParticipant.setMicrophoneEnabled(true),
        room.localParticipant.setCameraEnabled(true),
      ]);
      attachLocal(room);
      setJoined(true);
      setStatus("Conectado");
      try { await room.startAudio(); } catch { setAudioBlocked(true); }
    } catch (error) {
      await roomRef.current?.disconnect(true);
      roomRef.current = null;
      setStatus("Error");
      setNotice(error instanceof Error ? error.message : "Error de conexión");
    }
  }

  async function leave() {
    await roomRef.current?.disconnect(true);
    roomRef.current = null;
    remoteRef.current?.replaceChildren();
    localRef.current?.replaceChildren();
    setJoined(false);
    setStatus("Desconectado");
  }

  async function toggleMic() {
    const next = !mic;
    await roomRef.current?.localParticipant.setMicrophoneEnabled(next);
    setMic(next);
  }

  async function toggleCamera() {
    const next = !camera;
    await roomRef.current?.localParticipant.setCameraEnabled(next);
    setCamera(next);
    if (next && roomRef.current) attachLocal(roomRef.current);
    else localRef.current?.replaceChildren();
  }

  async function switchCamera() {
    const track = roomRef.current?.localParticipant.getTrackPublication(Track.Source.Camera)?.track;
    if (!(track instanceof LocalVideoTrack)) return;
    try {
      const current = track.mediaStreamTrack.getSettings().facingMode;
      await track.restartTrack({ facingMode: current === "environment" ? "user" : "environment" });
      if (roomRef.current) attachLocal(roomRef.current);
    } catch { setNotice("El WebView/navegador no permitió cambiar la cámara."); }
  }

  return (
    <main className="min-h-[100dvh] bg-[#06161d] p-3 text-white">
      <div className="mx-auto flex min-h-[calc(100dvh-24px)] max-w-5xl flex-col gap-3">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0d1e25] px-4 py-3">
          <div><p className="text-xs font-black uppercase tracking-widest text-[#25d7c8]">DocYa local PoC</p><h1 className="font-black">{role === "doctor" ? "Médico" : "Paciente"}</h1></div>
          <p className="text-sm font-bold">{status}</p>
        </header>
        <section className="relative min-h-[55dvh] flex-1 overflow-hidden rounded-3xl border border-white/10 bg-black">
          <div ref={remoteRef} className="absolute inset-0" />
          {!joined && <div className="absolute inset-0 z-10 grid place-items-center bg-[#07141a] p-6 text-center"><div><div className="text-5xl">📹</div><h2 className="mt-4 text-xl font-black">Prueba LiveKit</h2><p className="mt-2 text-sm text-white/60">No usa consultas, pagos ni datos productivos.</p><button onClick={join} disabled={status === "Conectando"} className="mt-6 rounded-full bg-[#25d7c8] px-7 py-3 font-black text-[#04232a]">{status === "Conectando" ? "Conectando…" : "Ingresar"}</button></div></div>}
          <div ref={localRef} className="absolute bottom-3 right-3 z-20 h-36 w-28 overflow-hidden rounded-2xl border-2 border-[#25d7c8] bg-[#102730]" />
          {audioBlocked && <button onClick={async () => { await roomRef.current?.startAudio(); setAudioBlocked(false); }} className="absolute left-1/2 top-3 z-30 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-2 font-black text-black">Activar audio</button>}
        </section>
        <section className="grid grid-cols-4 gap-2 rounded-2xl bg-[#0d1e25] p-3">
          <Button label={mic ? "Silenciar" : "Micrófono"} onClick={toggleMic} disabled={!joined} />
          <Button label={camera ? "Apagar cámara" : "Cámara"} onClick={toggleCamera} disabled={!joined} />
          <Button label="Cambiar" onClick={switchCamera} disabled={!joined || !camera} />
          <Button label="Salir" onClick={leave} disabled={!joined} danger />
        </section>
        <section className="grid grid-cols-4 gap-2">{["Receta", "Certificado", "Orden", "Evolución"].map((name) => <button key={name} onClick={() => setNotice(`Demo: abrir ${name}`)} className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-xs font-bold">{name}</button>)}</section>
        {notice && <p className="rounded-xl bg-[#102730] p-3 text-center text-sm">{notice}</p>}
      </div>
    </main>
  );
}

function Button({ label, onClick, disabled, danger = false }: { label: string; onClick: () => void | Promise<void>; disabled: boolean; danger?: boolean }) {
  return <button onClick={onClick} disabled={disabled} className={`rounded-xl px-2 py-3 text-xs font-black disabled:opacity-30 ${danger ? "bg-red-500/20 text-red-200" : "bg-white/10"}`}>{label}</button>;
}
