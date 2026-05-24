"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Stethoscope, Video, HeartPulse, Clock, MapPin,
  CheckCircle2, XCircle, PhoneCall, X, Loader2,
  UserCheck, Navigation, Star, RotateCcw, Home,
  AlertCircle, Activity,
} from "lucide-react";
import { usePedirTheme } from "./theme";

const API = process.env.NEXT_PUBLIC_API_BASE!;

type Estado =
  | "pendiente" | "aceptada" | "en_camino" | "en_domicilio"
  | "en_curso" | "en_videollamada" | "asignada" | "buscando_medico"
  | "finalizada" | "cancelada" | "cancelada_paciente" | "cancelada_sin_medico"
  | "pago_no_autorizado" | string;

type ConsultaData = {
  estado: Estado;
  medico_id?: number;
  medico_nombre?: string;
  medico_matricula?: string;
  medico_foto_perfil?: string;
  tiempo_estimado_min?: number;
  distancia_km?: number;
  medico_lat?: number;
  medico_lng?: number;
  mp_status?: string;
  mp_preautorizado?: boolean;
  video_url?: string;
  daily_room_url?: string;
  motivo?: string;
  direccion?: string;
  tipo?: string;
};

type PedirUser = { id: string; access_token?: string };

const TIPO_CONFIG: Record<string, { label: string; icon: typeof Stethoscope; color: string; colorLight: string }> = {
  medico:       { label: "Médico a domicilio",    icon: Stethoscope, color: "#00b3a6", colorLight: "rgba(0,179,166,0.14)" },
  teleconsulta: { label: "Teleconsulta",           icon: Video,       color: "#818cf8", colorLight: "rgba(129,140,248,0.14)" },
  enfermero:    { label: "Enfermería a domicilio", icon: HeartPulse,  color: "#f472b6", colorLight: "rgba(244,114,182,0.14)" },
};

// Pasos del flujo para domicilio (médico / enfermero)
const PASOS_DOMICILIO = [
  { key: "pendiente",    label: "Buscando",    icon: Clock },
  { key: "aceptada",     label: "Asignado",    icon: UserCheck },
  { key: "en_camino",    label: "En camino",   icon: Navigation },
  { key: "en_domicilio", label: "Llegó",       icon: Home },
  { key: "en_curso",     label: "Atendiendo",  icon: Activity },
  { key: "finalizada",   label: "Finalizada",  icon: CheckCircle2 },
];

// Pasos para teleconsulta
const PASOS_TELECONSULTA = [
  { key: "pendiente",       label: "Buscando",    icon: Clock },
  { key: "aceptada",        label: "Asignado",    icon: UserCheck },
  { key: "en_videollamada", label: "En sala",     icon: Video },
  { key: "finalizada",      label: "Finalizada",  icon: CheckCircle2 },
];

function pasoIndex(estado: string, esTeleconsulta: boolean): number {
  const pasos = esTeleconsulta ? PASOS_TELECONSULTA : PASOS_DOMICILIO;
  const idx = pasos.findIndex(p => p.key === estado);
  if (idx !== -1) return idx;
  if (estado === "buscando_medico") return 0;
  if (estado === "asignada") return esTeleconsulta ? 1 : 0;
  if (estado === "en_curso") return esTeleconsulta ? 2 : 4;
  return 0;
}

const ESTADOS_TERMINADOS = ["finalizada", "cancelada", "cancelada_paciente", "cancelada_sin_medico", "pago_no_autorizado"];
const ESTADOS_CRITICOS = ["aceptada", "asignada", "en_camino", "en_domicilio", "en_curso", "en_videollamada"];

export default function BuscandoScreen() {
  const params = useSearchParams();
  const consultaId = params.get("consulta_id") ?? "";
  const tipo       = params.get("tipo") ?? "medico";

  const [data, setData]             = useState<ConsultaData | null>(null);
  const [cancelando, setCancelando] = useState(false);
  const [dots, setDots]             = useState(".");
  const [countdown, setCountdown]   = useState(300);
  const [rating, setRating]         = useState(0);
  const [ratingEnviado, setRatingEnviado] = useState(false);
  const [user, setUser]             = useState<PedirUser | null>(null);

  const pollRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const dotsRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    bg, surface, brandBorder: border, text, muted, headerBg, logo,
    softPanel, softPanelBorder, inactiveStep, inactiveStepBg,
    inactiveStepBorder, inactiveText, doneText,
  } = usePedirTheme();

  const tipoCfg        = TIPO_CONFIG[tipo] ?? TIPO_CONFIG.medico;
  const Icon           = tipoCfg.icon;
  const esTeleconsulta = tipo === "teleconsulta";
  const pasos          = esTeleconsulta ? PASOS_TELECONSULTA : PASOS_DOMICILIO;

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pedir_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  // Guardar consulta activa en localStorage para recuperación si el paciente navega atrás
  useEffect(() => {
    if (!consultaId) return;
    localStorage.setItem("docya_consulta_activa", JSON.stringify({ consulta_id: consultaId, tipo }));
    return () => {
      // No limpiamos al desmontar — lo limpia fetchEstado cuando la consulta termina
    };
  }, [consultaId, tipo]);

  // Advertencia al intentar salir en estados críticos
  useEffect(() => {
    const estado = data?.estado ?? "";
    if (!ESTADOS_CRITICOS.includes(estado)) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [data?.estado]);

  const fetchEstado = useCallback(async () => {
    if (!consultaId) return;
    if (esTeleconsulta && (!user?.id || !user.access_token)) return;
    try {
      const url = esTeleconsulta
        ? `${API}/teleconsultas/${consultaId}?paciente_uuid=${encodeURIComponent(user!.id)}`
        : `${API}/consultas/${consultaId}`;
      const res = await fetch(url, {
        headers: esTeleconsulta
          ? { Authorization: `Bearer ${user!.access_token}` }
          : undefined,
      });
      if (!res.ok) return;
      const d = await res.json();
      setData(d);
      if (ESTADOS_TERMINADOS.includes(d.estado)) {
        if (pollRef.current) clearInterval(pollRef.current);
        if (countRef.current) clearInterval(countRef.current);
        // Limpiar localStorage al finalizar o cancelar
        localStorage.removeItem("docya_consulta_activa");
      }
      if (d.estado !== "pendiente" && countRef.current) {
        clearInterval(countRef.current);
      }
    } catch {}
  }, [consultaId, esTeleconsulta, user]);

  useEffect(() => {
    fetchEstado();
    pollRef.current = setInterval(fetchEstado, 3000);
    dotsRef.current = setInterval(() => setDots(d => d.length >= 3 ? "." : d + "."), 600);
    countRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { if (countRef.current) clearInterval(countRef.current); return 0; }
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
    if (esTeleconsulta && (!user?.id || !user.access_token)) return;
    setCancelando(true);
    try {
      const url = esTeleconsulta
        ? `${API}/teleconsultas/${consultaId}/cancelar`
        : `${API}/consultas/${consultaId}/cancelar_busqueda`;
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(esTeleconsulta ? { Authorization: `Bearer ${user!.access_token}` } : {}),
        },
        body: JSON.stringify({ paciente_uuid: esTeleconsulta ? user!.id : "" }),
      });
      localStorage.removeItem("docya_consulta_activa");
      fetchEstado();
    } catch {}
    setCancelando(false);
  }, [consultaId, esTeleconsulta, fetchEstado, user]);

  const enviarRating = useCallback(async (stars: number) => {
    if (!consultaId || ratingEnviado) return;
    setRating(stars);
    setRatingEnviado(true);
    try {
      await fetch(`${API}/consultas/${consultaId}/valorar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estrellas: stars }),
      });
    } catch {}
  }, [consultaId, ratingEnviado]);

  const estado    = data?.estado ?? "pendiente";
  const stepIdx   = pasoIndex(estado, esTeleconsulta);
  const esFin     = estado === "finalizada";
  const esCancelado = ["cancelada", "cancelada_paciente", "cancelada_sin_medico", "pago_no_autorizado"].includes(estado);
  const esPendiente = estado === "pendiente" || estado === "buscando_medico";
  const hasProf   = !!data?.medico_nombre && !esCancelado;

  // Colores por estado
  const estadoColor = (() => {
    if (esFin) return "#4ade80";
    if (esCancelado) return "#f87171";
    if (estado === "en_domicilio") return "#2dd4bf";
    return tipoCfg.color;
  })();

  // Titulo por estado
  const estadoTitulo = (() => {
    if (esPendiente)              return `Buscando profesional${dots}`;
    if (estado === "aceptada" || estado === "asignada") return "¡Profesional asignado!";
    if (estado === "en_camino")   return "Profesional en camino";
    if (estado === "en_domicilio") return "¡El profesional llegó!";
    if (estado === "en_curso")    return "Consulta en curso";
    if (estado === "en_videollamada") return "Sala de video lista";
    if (esFin)                   return "Consulta finalizada";
    if (estado === "pago_no_autorizado") return "Pago no autorizado";
    if (esCancelado)             return "Consulta cancelada";
    return "Procesando...";
  })();

  const estadoSub = (() => {
    if (esPendiente)              return "Estamos encontrando el profesional más cercano para vos";
    if (estado === "aceptada" || estado === "asignada") return "Confirmó la consulta y se está preparando";
    if (estado === "en_camino")   return "Ya está yendo hacia tu domicilio";
    if (estado === "en_domicilio") return "Está en la puerta de tu domicilio";
    if (estado === "en_curso")    return "El profesional está atendiendo en este momento";
    if (estado === "en_videollamada") return "Podés unirte a la videollamada ahora";
    if (esFin)                   return "Esperamos que te hayas sentido mejor";
    if (estado === "pago_no_autorizado") return "El pago con tu tarjeta no fue autorizado";
    if (esCancelado)             return "No se realizó ningún cobro";
    return "";
  })();

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${border}`, background: headerBg, backdropFilter: "blur(14px)", padding: "0 20px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center", gap: 16 }}>
          <Image
            src={logo}
            alt="DocYa" width={80} height={26} style={{ width: 80, height: "auto", maxHeight: 26, objectFit: "contain", display: "block", flexShrink: 0 }}
          />
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, background: tipoCfg.colorLight, border: `1px solid ${tipoCfg.color}40`, borderRadius: 999, padding: "4px 12px 4px 8px" }}>
            <Icon size={14} color={tipoCfg.color} />
            <span style={{ fontSize: 13, fontWeight: 600, color: tipoCfg.color }}>{tipoCfg.label}</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* ── STEPPER ── */}
        {!esCancelado && (
          <div style={{ marginBottom: 36, overflowX: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", minWidth: "max-content", margin: "0 auto", padding: "0 4px" }}>
              {pasos.map((paso, i) => {
                const done    = i < stepIdx;
                const active  = i === stepIdx;
                const PasoIcon = paso.icon;
                const color   = done || active ? tipoCfg.color : inactiveStep;
                return (
                  <div key={paso.key} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 999,
                        background: active ? `${tipoCfg.color}25` : done ? `${tipoCfg.color}15` : inactiveStepBg,
                        border: `2px solid ${active ? tipoCfg.color : done ? `${tipoCfg.color}60` : inactiveStepBorder}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.3s",
                      }}>
                        {active && esPendiente && i === 0
                          ? <Loader2 size={16} color={tipoCfg.color} className="animate-spin" />
                          : <PasoIcon size={16} color={color} />
                        }
                      </div>
                      <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? tipoCfg.color : done ? doneText : inactiveText, whiteSpace: "nowrap" }}>
                        {paso.label}
                      </span>
                    </div>
                    {i < pasos.length - 1 && (
                      <div style={{ width: 40, height: 2, background: done ? tipoCfg.color : inactiveStepBorder, margin: "0 4px", marginBottom: 20, transition: "background 0.3s", flexShrink: 0 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ESTADO PRINCIPAL ── */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 96, height: 96, borderRadius: 999,
            background: `${estadoColor}15`,
            border: `2px solid ${estadoColor}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: `0 0 32px ${estadoColor}20`,
          }}>
            {esPendiente
              ? <Loader2 size={44} color={estadoColor} className="animate-spin" />
              : esFin
                ? <CheckCircle2 size={44} color={estadoColor} />
                : esCancelado
                  ? <XCircle size={44} color={estadoColor} />
                  : estado === "en_domicilio"
                    ? <Home size={44} color={estadoColor} />
                    : estado === "en_videollamada"
                      ? <Video size={44} color={estadoColor} />
                      : estado === "en_curso"
                        ? <Activity size={44} color={estadoColor} />
                        : estado === "en_camino"
                          ? <Navigation size={44} color={estadoColor} />
                          : <UserCheck size={44} color={estadoColor} />
            }
          </div>
          <h1 style={{
            display: "block",
            maxWidth: "100%",
            fontSize: "clamp(22px, 4vw, 28px)",
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: 10,
            color: estadoColor,
            overflowWrap: "anywhere",
            userSelect: "none",
          }}>
            {estadoTitulo}
          </h1>
          <p style={{ color: muted, fontSize: 15, lineHeight: 1.5 }}>{estadoSub}</p>
        </div>

        {/* ── CARD PROFESIONAL (cuando fue asignado) ── */}
        {hasProf && (
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "20px", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Avatar */}
              <div style={{ width: 64, height: 64, borderRadius: 999, background: `${tipoCfg.color}20`, border: `2px solid ${tipoCfg.color}40`, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {data?.medico_foto_perfil
                  ? <img src={data.medico_foto_perfil} alt={data.medico_nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <Icon size={28} color={tipoCfg.color} />
                }
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <p style={{ fontWeight: 800, fontSize: 17, margin: 0 }}>{data?.medico_nombre}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, background: `${tipoCfg.color}15`, border: `1px solid ${tipoCfg.color}30`, borderRadius: 8, padding: "2px 8px" }}>
                    <CheckCircle2 size={12} color={tipoCfg.color} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: tipoCfg.color }}>Verificado</span>
                  </div>
                </div>
                {data?.medico_matricula && (
                  <p style={{ fontSize: 13, color: muted, margin: 0 }}>Mat. {data.medico_matricula}</p>
                )}
              </div>
            </div>

            {/* ETA + distancia */}
            {(data?.tiempo_estimado_min || data?.distancia_km) && (
              <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                {!!data.tiempo_estimado_min && data.tiempo_estimado_min > 0 && (
                  <div style={{ flex: 1, background: softPanel, border: `1px solid ${softPanelBorder}`, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                    <Clock size={16} color={tipoCfg.color} />
                    <div>
                      <p style={{ fontSize: 11, color: muted, margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Tiempo estimado</p>
                      <p style={{ fontSize: 18, fontWeight: 800, margin: 0, color: text }}>{data.tiempo_estimado_min} min</p>
                    </div>
                  </div>
                )}
                {!!data.distancia_km && data.distancia_km > 0 && (
                  <div style={{ flex: 1, background: softPanel, border: `1px solid ${softPanelBorder}`, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                    <MapPin size={16} color={tipoCfg.color} />
                    <div>
                      <p style={{ fontSize: 11, color: muted, margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Distancia</p>
                      <p style={{ fontSize: 18, fontWeight: 800, margin: 0, color: text }}>{data.distancia_km.toFixed(1)} km</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── COUNTDOWN / PENDIENTE ── */}
        {esPendiente && (
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "24px 20px", marginBottom: 16 }}>
            {countdown > 0 ? (
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 12, color: muted, marginBottom: 16, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px" }}>
                  Tiempo de búsqueda restante
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
                  <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
                    <circle cx="40" cy="40" r="34" fill="none" stroke={softPanelBorder} strokeWidth="6" />
                    <circle
                      cx="40" cy="40" r="34" fill="none"
                      stroke={tipoCfg.color}
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - countdown / 300)}`}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 1s linear" }}
                    />
                  </svg>
                  <div>
                    <p style={{ fontSize: 42, fontWeight: 900, fontVariantNumeric: "tabular-nums", margin: 0, lineHeight: 1, color: text }}>
                      {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, "0")}
                    </p>
                    <p style={{ fontSize: 13, color: muted, margin: "6px 0 0" }}>minutos</p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <AlertCircle size={32} color="#fbbf24" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontWeight: 700, fontSize: 16, color: "#fbbf24", marginBottom: 8 }}>
                  No encontramos profesionales disponibles
                </p>
                <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                  No hay profesionales disponibles en este momento.<br />Intentá de nuevo en unos minutos.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── PASOS (mientras pendiente) ── */}
        {esPendiente && (
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "22px 20px", marginBottom: 16 }}>
            <p style={{ fontWeight: 700, fontSize: 11, color: muted, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.8px" }}>¿Qué pasa ahora?</p>
            {[
              { icon: MapPin,    color: "#fbbf24", text: "Buscamos el profesional más cercano disponible" },
              { icon: PhoneCall, color: tipoCfg.color, text: "El profesional acepta y te lo notificamos al instante" },
              { icon: Navigation, color: "#818cf8", text: esTeleconsulta ? "El profesional inicia la videollamada y podés unirte" : "Va en camino y te informamos el tiempo estimado" },
            ].map(({ icon: SIcon, color, text: t }) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <SIcon size={18} color={color} />
                </div>
                <p style={{ fontSize: 14, color: muted, lineHeight: 1.4, flex: 1, margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── CARD CUANDO LLEGÓ ── */}
        {estado === "en_domicilio" && (
          <div style={{ background: "rgba(45,212,191,0.08)", border: "1.5px solid rgba(45,212,191,0.30)", borderRadius: 20, padding: "24px 20px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔔</div>
            <p style={{ fontWeight: 800, fontSize: 17, color: "#2dd4bf", marginBottom: 8 }}>
              El profesional está en la puerta
            </p>
            <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
              Abrí la puerta — el profesional llegó a tu domicilio y está listo para atenderte.
            </p>
          </div>
        )}

        {/* ── CARD EN CURSO ── */}
        {estado === "en_curso" && !esTeleconsulta && (
          <div style={{ background: "rgba(129,140,248,0.08)", border: "1.5px solid rgba(129,140,248,0.25)", borderRadius: 20, padding: "20px", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: "rgba(129,140,248,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Activity size={24} color="#818cf8" />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, margin: 0, color: "#a5b4fc" }}>Consulta en curso</p>
                <p style={{ fontSize: 13, color: muted, margin: "4px 0 0" }}>El profesional está atendiendo en tu domicilio</p>
              </div>
            </div>
          </div>
        )}

        {/* ── BOTÓN UNIRSE A VIDEO (teleconsulta) ── */}
        {esTeleconsulta && ["aceptada", "asignada", "en_videollamada", "en_curso"].includes(estado) && (data?.video_url || data?.daily_room_url) && (
          <div style={{ marginBottom: 16 }}>
            <Link
              href={`/pedir/videollamada?consulta_id=${consultaId}&video_url=${encodeURIComponent(data?.video_url || data?.daily_room_url || "")}&medico=${encodeURIComponent(data?.medico_nombre ?? "")}`}
              style={{
                width: "100%", padding: "18px", borderRadius: 18,
                background: "linear-gradient(90deg, #818cf8, #a78bfa)",
                color: "#fff", fontSize: 17, fontWeight: 800,
                textAlign: "center", textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                boxShadow: "0 8px 28px rgba(129,140,248,0.40)",
              }}
            >
              <Video size={22} />
              Unirme a la videollamada
            </Link>
            <p style={{ fontSize: 12, color: muted, textAlign: "center", marginTop: 10 }}>
              La sala ya está lista — podés entrar cuando quieras
            </p>
          </div>
        )}

        {/* ── VALORACIÓN (cuando finaliza) ── */}
        {esFin && (
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "24px 20px", marginBottom: 16, textAlign: "center" }}>
            <CheckCircle2 size={40} color="#4ade80" style={{ margin: "0 auto 14px" }} />
            <p style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>¡Consulta completada!</p>
            <p style={{ color: muted, fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>
              Gracias por usar DocYa. Tu médico puede haberte enviado recetas o indicaciones.
            </p>
            {!ratingEnviado ? (
              <>
                <p style={{ fontSize: 13, color: muted, marginBottom: 12, fontWeight: 600 }}>¿Cómo fue la atención?</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <button
                      key={s}
                      onClick={() => enviarRating(s)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 4, fontSize: 32, filter: s <= rating ? "none" : "grayscale(1) opacity(0.4)", transition: "filter 0.15s" }}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#fbbf24", fontWeight: 700 }}>
                <Star size={18} fill="#fbbf24" color="#fbbf24" />
                ¡Gracias por tu valoración!
              </div>
            )}
          </div>
        )}

        {/* ── CANCELADA / PAGO NO AUTORIZADO ── */}
        {esCancelado && (
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1.5px solid rgba(239,68,68,0.25)", borderRadius: 20, padding: "20px", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 14 }}>
              <XCircle size={24} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: "#f87171", marginBottom: 6 }}>
                  {estado === "pago_no_autorizado" ? "Pago no autorizado" : "Consulta cancelada"}
                </p>
                <p style={{ fontSize: 13, color: muted, lineHeight: 1.5 }}>
                  {estado === "pago_no_autorizado"
                    ? "Tu tarjeta no fue autorizada por Mercado Pago. No se realizó ningún cobro. Podés intentar con otra tarjeta o usar saldo en cuenta MP."
                    : "La consulta fue cancelada. No se realizó ningún cobro a tu cuenta."
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── BOTONES DE ACCIÓN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {esPendiente && (
            <button
              onClick={cancelar}
              disabled={cancelando}
              style={{ width: "100%", padding: "15px", borderRadius: 16, border: "1px solid rgba(239,68,68,0.35)", background: "rgba(239,68,68,0.08)", color: "#f87171", fontSize: 15, fontWeight: 600, cursor: cancelando ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit", opacity: cancelando ? 0.6 : 1 }}
            >
              {cancelando ? <Loader2 size={18} className="animate-spin" /> : <X size={18} />}
              Cancelar búsqueda
            </button>
          )}

          {(esFin || esCancelado) && (
            <Link
              href="/pedir"
              style={{ width: "100%", padding: "16px", borderRadius: 16, background: "linear-gradient(90deg, #00b3a6, #2dd4bf)", color: "#fff", fontSize: 15, fontWeight: 700, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <Home size={18} />
              Volver al inicio
            </Link>
          )}

          {esCancelado && (
            <Link
              href="/pedir"
              style={{ width: "100%", padding: "15px", borderRadius: 16, border: `1px solid ${border}`, background: softPanel, color: text, fontSize: 15, fontWeight: 600, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <RotateCcw size={18} />
              Intentar de nuevo
            </Link>
          )}
        </div>

      </main>
    </div>
  );
}
