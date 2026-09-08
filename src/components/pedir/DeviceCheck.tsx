"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Mic, ShieldCheck } from "lucide-react";
import { usePedirTheme } from "./theme";

export default function DeviceCheck({ onContinue, continueLabel = "Continuar a la sala", onSuccess }: { onContinue?: () => void; continueLabel?: string; onSuccess?: () => void }) {
  const { surface, text, muted, brandBorder } = usePedirTheme();
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const generation = useRef(0);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [embedded, setEmbedded] = useState(false);
  const stop = () => { stream.current?.getTracks().forEach(track => track.stop()); stream.current = null; };
  useEffect(() => {
    setEmbedded(/FBAN|FBAV|Instagram|; wv\)/i.test(navigator.userAgent));
    const details = video.current?.closest("details");
    const close = () => { if (details && !details.open) { generation.current++; stop(); setReady(false); setBusy(false); } };
    details?.addEventListener("toggle", close);
    return () => {
      details?.removeEventListener("toggle", close);
      // Invalidate any permission request that finishes after unmount.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      generation.current++;
      stop();
    };
  }, []);
  async function test() {
    const attempt = ++generation.current;
    stop(); setBusy(true); setReady(false); setMessage("");
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("Unsupported");
      const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } } });
      if (attempt !== generation.current) { media.getTracks().forEach(track => track.stop()); return; }
      stream.current = media;
      if (video.current) { video.current.srcObject = media; await video.current.play().catch(() => {}); }
      if (attempt !== generation.current) return;
      setReady(true);
      onSuccess?.();
      setMessage("Cámara y micrófono disponibles. Confirmá que te ves. Esta prueba no graba ni envía audio o video; revisá el nivel del micrófono también en la sala.");
    } catch (error) {
      if (attempt !== generation.current) return;
      const name = error instanceof Error ? error.name : "";
      setMessage(name === "NotAllowedError" ? "El acceso está bloqueado. Abrí los permisos del sitio junto a la dirección del navegador y permití cámara y micrófono. Revisá también los permisos del navegador en Ajustes del teléfono y volvé a probar."
        : name === "NotFoundError" ? "No encontramos cámara o micrófono. Conectá los dispositivos y volvé a probar."
        : name === "NotReadableError" ? "Otra aplicación puede estar usando la cámara o el micrófono. Cerrá otras videollamadas y volvé a probar."
        : "No pudimos iniciar los dispositivos. Abrí esta página en Safari o Chrome actualizado y volvé a probar.");
    } finally { if (attempt === generation.current) setBusy(false); }
  }
  function finish() { generation.current++; stop(); setReady(false); setBusy(false); onContinue?.(); }
  return <section style={{ background: surface, color: text, border: `1px solid ${brandBorder}`, borderRadius: 24, padding: 24, margin: "20px 0" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Camera size={22} color="#818cf8" /><h2 style={{ fontSize: 19, fontWeight: 800 }}>Prepará tu teleconsulta</h2></div>
    <p style={{ color: muted, lineHeight: 1.6, fontSize: 14, margin: "10px 0" }}>Probá cámara y micrófono antes de hablar con tu médico. Cuando el navegador pregunte, elegí Permitir.</p>
    {embedded && <p role="alert">Estás usando un navegador integrado. Abrí el menú y elegí Abrir en Safari o Chrome para una mejor experiencia.</p>}
    <video ref={video} muted playsInline autoPlay style={{ display: ready ? "block" : "none", width: "100%", maxHeight: 220, borderRadius: 16, background: "#071923", transform: "scaleX(-1)" }} />
    <p role="status" style={{ lineHeight: 1.6, fontSize: 14 }}>{message || (busy ? "Esperando tu respuesta al permiso del navegador…" : "Solo se activan cuando tocás Probar. El permiso de esta página puede ser distinto del que pide la sala.")}</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
      <button type="button" disabled={busy} onClick={test} style={{ border: 0, borderRadius: 12, padding: "13px 18px", background: "#6366f1", color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}><Mic size={17} />{busy ? "Esperando permiso…" : ready ? "Volver a probar" : "Probar cámara y micrófono"}</button>
      {(ready || onContinue || busy) && <button type="button" onClick={finish} style={{ border: `1px solid ${brandBorder}`, borderRadius: 12, padding: "13px 18px", color: text, background: "transparent", cursor: "pointer" }}>{onContinue ? continueLabel : "Cerrar prueba"}</button>}
    </div>
    <p style={{ display: "flex", gap: 6, alignItems: "center", color: muted, fontSize: 12, marginTop: 14 }}><ShieldCheck size={15} />Al cerrar la prueba liberamos los dispositivos.</p>
  </section>;
}
