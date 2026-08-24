"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Video, PhoneOff,
  Maximize2, Minimize2, Shield, Clock, User, FileText,
} from "lucide-react";
import { usePedirTheme } from "./theme";
import { useI18n } from "@/lib/i18n/context";

const API = process.env.NEXT_PUBLIC_API_BASE!;

type PedirUser = { id: string; access_token?: string };

export default function VideoLlamadaScreen() {
  const { t } = useI18n();
  const router = useRouter();
  const params = useSearchParams();
  const consultaId = params.get("consulta_id") ?? "";
  const videoUrl   = params.get("video_url") ?? "";
  const medico     = params.get("medico") ?? "";

  const [iframeReady, setIframeReady] = useState(false);
  const [fullscreen,  setFullscreen]  = useState(false);
  const [elapsed,     setElapsed]     = useState(0);
  const [finalizado,  setFinalizado]  = useState(false);
  const [user,        setUser]        = useState<PedirUser | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const { bg, border, text, muted, logo, videoChromeBg, videoBarBg, softPanel } = usePedirTheme();

  // Timer de duración
  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pedir_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  // Polling para detectar fin de la consulta
  const checkEstado = useCallback(async () => {
    if (!consultaId) return;
    if (!user?.id || !user.access_token) return;
    try {
      const url = `${API}/teleconsultas/${consultaId}?paciente_uuid=${encodeURIComponent(user.id)}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      if (!res.ok) return;
      const d = await res.json();
      if (d.estado === "finalizada" || d.estado === "cancelada") {
        if (pollRef.current) clearInterval(pollRef.current);
        if (timerRef.current) clearInterval(timerRef.current);
        setFinalizado(true);
      }
    } catch {}
  }, [consultaId, user]);

  useEffect(() => {
    pollRef.current = setInterval(checkEstado, 5000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [checkEstado]);

  const salir = () => {
    router.push(`/pedir/buscando?consulta_id=${consultaId}&tipo=teleconsulta`);
  };

  if (finalizado) {
    return (
      <div style={{ minHeight: "100vh", background: bg, color: text, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <Image src={logo} alt="DocYa" width={100} height={32} style={{ width: 100, height: "auto", maxHeight: 32, objectFit: "contain", margin: "0 auto 32px", display: "block" }} />
          <div style={{ width: 80, height: 80, borderRadius: 999, background: "rgba(0,179,166,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Video size={36} color="#2dd4bf" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{t.videoLlamada.finalizada}</h1>
          <p style={{ color: muted, fontSize: 16, marginBottom: 8 }}>{t.videoLlamada.duracion} <strong style={{ color: text }}>{fmtTime(elapsed)}</strong></p>
          <p style={{ color: muted, fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
            {t.videoLlamada.gracias}
          </p>
          <button
            onClick={() => router.push("/pedir")}
            style={{ width: "100%", padding: "16px", borderRadius: 16, background: "linear-gradient(90deg, #00b3a6, #2dd4bf)", color: "#fff", fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            {t.videoLlamada.volverInicio}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, display: "flex", flexDirection: "column", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      {!fullscreen && (
        <header style={{ background: videoChromeBg, backdropFilter: "blur(12px)", borderBottom: `1px solid ${border}`, padding: "0 20px", flexShrink: 0 }}>
          <div style={{ maxWidth: 900, margin: "0 auto", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Image src={logo} alt="DocYa" width={80} height={26} style={{ width: 80, height: "auto", maxHeight: 26, objectFit: "contain", display: "block", flexShrink: 0 }} />

            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {/* Médico */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: "rgba(0,179,166,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <User size={16} color="#2dd4bf" />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{medico || t.videoLlamada.profesional}</p>
                  <p style={{ fontSize: 11, color: muted, margin: 0 }}>{t.videoLlamada.medicoVerificado}</p>
                </div>
              </div>

              {/* Timer */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,179,166,0.12)", border: "1px solid rgba(0,179,166,0.25)", borderRadius: 999, padding: "4px 12px" }}>
                <Clock size={13} color="#2dd4bf" />
                <span style={{ fontSize: 14, fontWeight: 700, fontVariantNumeric: "tabular-nums", color: "#2dd4bf" }}>{fmtTime(elapsed)}</span>
              </div>

              {/* Seguro */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: muted }}>
                <Shield size={14} color="#2dd4bf" /> {t.videoLlamada.cifrada}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* AVISO SOBRE DOCUMENTOS EMITIDOS DURANTE LA CONSULTA */}
      {!fullscreen && (
        <div
          role="status"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "10px 20px",
            background: "rgba(20,184,166,0.12)",
            borderBottom: "1px solid rgba(20,184,166,0.25)",
            color: text,
            fontSize: 13,
            lineHeight: 1.45,
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <FileText size={18} color="#2dd4bf" style={{ flexShrink: 0 }} />
          <span>{t.videoLlamada.avisoDocumentos}</span>
        </div>
      )}

      {/* VIDEO */}
      <div style={{ flex: 1, position: "relative", background: "#000" }}>
        {!iframeReady && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: bg, zIndex: 2 }}>
            <div style={{ width: 64, height: 64, borderRadius: 999, background: "rgba(129,140,248,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Video size={30} color="#818cf8" />
            </div>
            <p style={{ color: muted, fontSize: 15 }}>{t.videoLlamada.conectando}</p>
            <p style={{ color: muted, opacity: 0.7, fontSize: 13 }}>{t.videoLlamada.permisos}</p>
          </div>
        )}
        <iframe
          src={videoUrl}
          allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
          style={{ width: "100%", height: "100%", minHeight: fullscreen ? "100vh" : "calc(100vh - 60px - 80px)", border: "none", display: "block" }}
          onLoad={() => setIframeReady(true)}
          title="Videollamada DocYa"
        />
      </div>

      {/* BARRA INFERIOR */}
      {!fullscreen && (
        <div style={{ background: videoBarBg, backdropFilter: "blur(12px)", borderTop: `1px solid ${border}`, padding: "0 20px", flexShrink: 0 }}>
          <div style={{ maxWidth: 900, margin: "0 auto", height: 80, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>

            {/* Nota: los controles de mic/cam/video los maneja el propio SDK de Daily.co dentro del iframe */}
            {/* Solo mostramos fullscreen y salir */}

            <button
              onClick={() => setFullscreen(f => !f)}
              style={{ width: 52, height: 52, borderRadius: 999, border: `1px solid ${border}`, background: softPanel, color: muted, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              title={fullscreen ? t.videoLlamada.salirFullscreen : t.videoLlamada.fullscreen}
            >
              {fullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>

            <button
              onClick={salir}
              style={{ width: 64, height: 64, borderRadius: 999, background: "#ef4444", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 6px 20px rgba(239,68,68,0.45)" }}
              title={t.videoLlamada.salirLlamada}
            >
              <PhoneOff size={26} />
            </button>

            <div style={{ width: 52 }} /> {/* Espaciado simétrico */}
          </div>
        </div>
      )}
    </div>
  );
}
