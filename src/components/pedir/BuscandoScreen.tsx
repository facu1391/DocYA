"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Stethoscope, Video, HeartPulse, Clock, MapPin,
  CheckCircle2, XCircle, PhoneCall, X, Loader2,
  UserCheck, Navigation,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE!;

type Estado = "pendiente" | "aceptada" | "en_camino" | "en_domicilio" | "en_curso" | "finalizada" | "cancelada" | string;
type ConsultaData = {
  estado: Estado;
  medico_id?: number;
  medico_nombre?: string;
  medico_matricula?: string;
  eta?: number;
  mp_status?: string;
  video_url?: string;
  daily_room_url?: string;
};

const TIPO_CONFIG: Record<string, { label: string; icon: typeof Stethoscope; color: string }> = {
  medico:       { label: "Médico a domicilio",    icon: Stethoscope, color: "#00b3a6" },
  teleconsulta: { label: "Teleconsulta",           icon: Video,       color: "#818cf8" },
  enfermero:    { label: "Enfermería a domicilio", icon: HeartPulse,  color: "#f472b6" },
};

const ESTADO_CONFIG: Record<string, { titulo: string; sub: string; color: string; icono: typeof CheckCircle2 }> = {
  pendiente:    { titulo: "Buscando profesional...",    sub: "Estamos encontrando el más cercano para vos",  color: "#fbbf24", icono: Clock },
  aceptada:     { titulo: "Profesional asignado",       sub: "Ya confirmó y está en camino",                 color: "#00b3a6", icono: UserCheck },
  en_camino:    { titulo: "Profesional en camino",      sub: "Ya está yendo hacia tu domicilio",             color: "#00b3a6", icono: Navigation },
  en_domicilio: { titulo: "El profesional llegó",       sub: "Está en la puerta de tu domicilio",            color: "#2dd4bf", icono: CheckCircle2 },
  en_curso:     { titulo: "Consulta en curso",          sub: "El profesional está atendiendo",               color: "#818cf8", icono: Stethoscope },
  finalizada:   { titulo: "Consulta finalizada",        sub: "Esperamos que te hayas sentido mejor",         color: "#4ade80", icono: CheckCircle2 },
  cancelada:    { titulo: "Consulta cancelada",         sub: "No se realizó ningún cobro",                   color: "#f87171", icono: XCircle },
};

export default function BuscandoScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const consultaId = params.get("consulta_id") ?? "";
  const tipo       = params.get("tipo") ?? "medico";

  const [data, setData]               = useState<ConsultaData | null>(null);
  const [cancelando, setCancelando]   = useState(false);
  const [dots, setDots]               = useState(".");
  const [countdown, setCountdown]     = useState(300); // 5 minutos
  const pollRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const dotsRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  const dark   = true;
  const bg     = "#071b22";
  const surface = "rgba(255,255,255,0.05)";
  const border = "rgba(255,255,255,0.10)";
  const text   = "#e2f0f0";
  const muted  = "rgba(255,255,255,0.55)";

  const tipoCfg = TIPO_CONFIG[tipo] ?? TIPO_CONFIG.medico;
  const Icon = tipoCfg.icon;

  const fetchEstado = useCallback(async () => {
    if (!consultaId) return;
    try {
      // Para teleconsultas usamos el endpoint específico que devuelve video_url
      const url = tipo === "teleconsulta"
        ? `${API}/teleconsultas/${consultaId}`
        : `${API}/consultas/${consultaId}/estado`;
      const res = await fetch(url);
      if (!res.ok) return;
      const d = await res.json();
      setData(d);
      if (["finalizada", "cancelada", "cancelada_paciente"].includes(d.estado)) {
        if (pollRef.current) clearInterval(pollRef.current);
      }
    } catch (_) {}
  }, [consultaId, tipo]);

  useEffect(() => {
    fetchEstado();
    pollRef.current = setInterval(fetchEstado, 3000);
    dotsRef.current = setInterval(() => setDots(d => d.length >= 3 ? "." : d + "."), 600);
    // Countdown solo en pendiente
    countRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          if (countRef.current) clearInterval(countRef.current);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (dotsRef.current) clearInterval(dotsRef.current);
      if (countRef.current) clearInterval(countRef.current);
    };
  }, [fetchEstado]);

  const cancelar = useCallback(async () => {
    if (!consultaId) return;
    setCancelando(true);
    try {
      await fetch(`${API}/consultas/${consultaId}/cancelar_busqueda`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paciente_uuid: "" }),
      });
      fetchEstado();
    } catch (_) {}
    setCancelando(false);
  }, [consultaId, fetchEstado]);

  const estado = data?.estado ?? "pendiente";
  const estadoCfg = ESTADO_CONFIG[estado] ?? ESTADO_CONFIG.pendiente;
  const EstadoIcon = estadoCfg.icono;
  const esFinalizado = estado === "finalizada";
  const esCancelado  = estado === "cancelada";
  const esPendiente  = estado === "pendiente";

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${border}`, background: "rgba(7,27,34,0.92)", backdropFilter: "blur(12px)", padding: "0 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center", gap: 16 }}>
          <Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png" alt="DocYa" width={80} height={26} style={{ height: 26, width: "auto" }} />
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, background: `${tipoCfg.color}18`, border: `1px solid ${tipoCfg.color}40`, borderRadius: 999, padding: "4px 12px 4px 8px" }}>
            <Icon size={14} color={tipoCfg.color} />
            <span style={{ fontSize: 13, fontWeight: 600, color: tipoCfg.color }}>{tipoCfg.label}</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* ESTADO PRINCIPAL */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 88, height: 88, borderRadius: 999, background: `${estadoCfg.color}15`, border: `2px solid ${estadoCfg.color}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            {esPendiente ? (
              <Loader2 size={40} color={estadoCfg.color} className="animate-spin" />
            ) : (
              <EstadoIcon size={40} color={estadoCfg.color} />
            )}
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 800, marginBottom: 10 }}>
            {estadoCfg.titulo}{esPendiente ? dots : ""}
          </h1>
          <p style={{ color: muted, fontSize: 16 }}>{estadoCfg.sub}</p>
        </div>

        {/* INFO PROFESIONAL */}
        {data?.medico_nombre && !esCancelado && (
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "22px 20px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: `${tipoCfg.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={26} color={tipoCfg.color} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 2 }}>{data.medico_nombre}</p>
                {data.medico_matricula && (
                  <p style={{ fontSize: 13, color: muted }}>Mat. {data.medico_matricula}</p>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: `${tipoCfg.color}15`, border: `1px solid ${tipoCfg.color}30`, borderRadius: 10, padding: "6px 10px" }}>
                <CheckCircle2 size={14} color={tipoCfg.color} />
                <span style={{ fontSize: 12, fontWeight: 600, color: tipoCfg.color }}>Verificado</span>
              </div>
            </div>
            {data.eta && (
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: muted }}>
                <Navigation size={15} color={tipoCfg.color} />
                <span>ETA estimado: <strong style={{ color: text }}>{data.eta} min</strong></span>
              </div>
            )}
          </div>
        )}

        {/* COUNTDOWN (solo en pendiente) */}
        {esPendiente && (
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "20px", marginBottom: 20, textAlign: "center" }}>
            {countdown > 0 ? (
              <>
                <p style={{ fontSize: 13, color: muted, marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Tiempo de búsqueda restante
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {/* Barra de progreso circular */}
                  <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                    <circle
                      cx="36" cy="36" r="30" fill="none"
                      stroke={tipoCfg.color}
                      strokeWidth="5"
                      strokeDasharray={`${2 * Math.PI * 30}`}
                      strokeDashoffset={`${2 * Math.PI * 30 * (1 - countdown / 300)}`}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 1s linear" }}
                    />
                  </svg>
                  <div>
                    <p style={{ fontSize: 36, fontWeight: 800, fontVariantNumeric: "tabular-nums", margin: 0, color: text }}>
                      {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, "0")}
                    </p>
                    <p style={{ fontSize: 12, color: muted, margin: 0 }}>minutos</p>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ padding: "8px 0" }}>
                <p style={{ fontWeight: 700, fontSize: 15, color: "#fbbf24", marginBottom: 6 }}>
                  No encontramos profesionales disponibles
                </p>
                <p style={{ fontSize: 13, color: muted, lineHeight: 1.5 }}>
                  No hay profesionales disponibles en este momento. Intentá de nuevo en unos minutos o elegí otra modalidad.
                </p>
              </div>
            )}
          </div>
        )}

        {/* PASOS (solo en pendiente) */}
        {esPendiente && (
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "22px 20px", marginBottom: 20 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: muted, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.5px" }}>¿Qué pasa ahora?</p>
            {[
              { icon: MapPin,      color: "#fbbf24", text: "Buscamos el profesional más cercano disponible" },
              { icon: PhoneCall,   color: "#00b3a6", text: "El profesional acepta y te lo notificamos" },
              { icon: Navigation,  color: "#818cf8", text: "Va en camino y te informamos el tiempo estimado" },
            ].map(({ icon: SIcon, color, text: t }) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <SIcon size={18} color={color} />
                </div>
                <p style={{ fontSize: 14, color: muted, lineHeight: 1.4, flex: 1 }}>{t}</p>
              </div>
            ))}
          </div>
        )}

        {/* FINALIZADO */}
        {esFinalizado && (
          <div style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 20, padding: "24px 20px", marginBottom: 20, textAlign: "center" }}>
            <CheckCircle2 size={40} color="#4ade80" style={{ margin: "0 auto 12px" }} />
            <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>¡Consulta completada!</p>
            <p style={{ color: muted, fontSize: 14, lineHeight: 1.5 }}>Gracias por usar DocYa. Esperamos que te hayas recuperado pronto.</p>
          </div>
        )}

        {/* BOTÓN UNIRSE A VIDEO (teleconsulta) */}
        {tipo === "teleconsulta" && ["asignada", "en_videollamada"].includes(estado) && (data?.video_url || data?.daily_room_url) && (
          <div style={{ marginBottom: 20 }}>
            <Link
              href={`/pedir/videollamada?consulta_id=${consultaId}&video_url=${encodeURIComponent(data.video_url || data.daily_room_url || "")}&medico=${encodeURIComponent(data?.medico_nombre ?? "")}`}
              style={{ width: "100%", padding: "18px", borderRadius: 18, background: "linear-gradient(90deg, #818cf8, #a78bfa)", color: "#fff", fontSize: 17, fontWeight: 800, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 8px 28px rgba(129,140,248,0.4)" }}
            >
              <Video size={22} />
              Unirse a la videollamada
            </Link>
            <p style={{ fontSize: 12, color: muted, textAlign: "center", marginTop: 10 }}>
              La sala ya está lista — podés entrar cuando quieras
            </p>
          </div>
        )}

        {/* BOTONES */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {esPendiente && (
            <button
              onClick={cancelar}
              disabled={cancelando}
              style={{ width: "100%", padding: "15px", borderRadius: 16, border: "1px solid rgba(239,68,68,0.35)", background: "rgba(239,68,68,0.08)", color: "#f87171", fontSize: 15, fontWeight: 600, cursor: cancelando ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit" }}
            >
              {cancelando ? <Loader2 size={18} className="animate-spin" /> : <X size={18} />}
              Cancelar búsqueda
            </button>
          )}
          {(esFinalizado || esCancelado) && (
            <Link
              href="/pedir"
              style={{ width: "100%", padding: "15px", borderRadius: 16, background: "linear-gradient(90deg, #00b3a6, #2dd4bf)", color: "#fff", fontSize: 15, fontWeight: 700, textAlign: "center", textDecoration: "none", display: "block" }}
            >
              Volver al inicio
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
