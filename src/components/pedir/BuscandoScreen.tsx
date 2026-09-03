"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Stethoscope, Video, HeartPulse, Clock, MapPin,
  CheckCircle2, XCircle, PhoneCall, X, Loader2,
  UserCheck, Navigation, Star, RotateCcw, Home,
  AlertCircle, Activity, MessageCircle,
} from "lucide-react";
import { usePedirTheme } from "./theme";
import { useI18n } from "@/lib/i18n/context";

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

const PASOS_DOMICILIO_KEYS = ["pendiente", "aceptada", "en_camino", "en_domicilio", "en_curso", "finalizada"];
const PASOS_TELECONSULTA_KEYS = ["pendiente", "aceptada", "en_videollamada", "finalizada"];

function pasoIndex(estado: string, esTeleconsulta: boolean): number {
  const keys = esTeleconsulta ? PASOS_TELECONSULTA_KEYS : PASOS_DOMICILIO_KEYS;
  const idx = keys.indexOf(estado);
  if (idx !== -1) return idx;
  if (estado === "buscando_medico") return 0;
  if (estado === "asignada") return esTeleconsulta ? 1 : 0;
  if (estado === "en_curso") return esTeleconsulta ? 2 : 4;
  return 0;
}

function nombreProfesional(nombre?: string, esEnfermeria = false): string {
  const nombreLimpio = nombre?.trim() ?? "";
  if (!nombreLimpio) return "";
  if (/^(dr(?:a|\/a)?\.?|enf\.?)\s/i.test(nombreLimpio)) return nombreLimpio;
  return `${esEnfermeria ? "Enf." : "Dr/a"} ${nombreLimpio}`;
}

const ESTADOS_TERMINADOS = ["finalizada", "cancelada", "cancelada_paciente", "cancelada_sin_medico", "pago_no_autorizado"];
const ESTADOS_CRITICOS = ["aceptada", "asignada", "en_camino", "en_domicilio", "en_curso", "en_videollamada"];

export default function BuscandoScreen() {
  const { t } = useI18n();
  const router = useRouter();
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

  const TIPO_CONFIG: Record<string, { label: string; icon: typeof Stethoscope; color: string; colorLight: string }> = {
    medico:       { label: t.buscando.tipos.medico,       icon: Stethoscope, color: "#00b3a6", colorLight: "rgba(0,179,166,0.14)" },
    teleconsulta: { label: t.buscando.tipos.teleconsulta, icon: Video,       color: "#818cf8", colorLight: "rgba(129,140,248,0.14)" },
    enfermero:    { label: t.buscando.tipos.enfermeria,   icon: HeartPulse,  color: "#f472b6", colorLight: "rgba(244,114,182,0.14)" },
  };

  const PASOS_DOMICILIO = [
    { key: "pendiente",    label: t.buscando.pasosDomicilio[0], icon: Clock },
    { key: "aceptada",     label: t.buscando.pasosDomicilio[1], icon: UserCheck },
    { key: "en_camino",    label: t.buscando.pasosDomicilio[2], icon: Navigation },
    { key: "en_domicilio", label: t.buscando.pasosDomicilio[3], icon: Home },
    { key: "en_curso",     label: t.buscando.pasosDomicilio[4], icon: Activity },
    { key: "finalizada",   label: t.buscando.pasosDomicilio[5], icon: CheckCircle2 },
  ];

  const PASOS_TELECONSULTA = [
    { key: "pendiente",       label: t.buscando.pasosTeleconsulta[0], icon: Clock },
    { key: "aceptada",        label: t.buscando.pasosTeleconsulta[1], icon: UserCheck },
    { key: "en_videollamada", label: t.buscando.pasosTeleconsulta[2], icon: Video },
    { key: "finalizada",      label: t.buscando.pasosTeleconsulta[3], icon: CheckCircle2 },
  ];

  const tipoCfg        = TIPO_CONFIG[tipo] ?? TIPO_CONFIG.medico;
  const Icon           = tipoCfg.icon;
  const esTeleconsulta = tipo === "teleconsulta";
  const medicoNombre   = nombreProfesional(data?.medico_nombre, tipo === "enfermero");
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
      if (res.status === 404 || res.status === 410) {
        // La consulta pudo haber sido eliminada desde monitoreo. No dejamos
        // al paciente atrapado en un polling infinito por un ID local viejo.
        localStorage.removeItem("docya_consulta_activa");
        if (pollRef.current) clearInterval(pollRef.current);
        if (countRef.current) clearInterval(countRef.current);
        router.replace("/pedir");
        return;
      }
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
  }, [consultaId, esTeleconsulta, router, user]);

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
      const cancelRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(esTeleconsulta ? { Authorization: `Bearer ${user!.access_token}` } : {}),
        },
        body: JSON.stringify({ paciente_uuid: esTeleconsulta ? user!.id : "" }),
      });
      const cancelData = await cancelRes.json().catch(() => ({}));
      if (cancelRes.ok && cancelData.benefit_restored === true) {
        window.alert("Recuperaste tu teleconsulta gratis. Podés usarla cuando quieras.");
      }
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
  const tieneCreditoTransferencia = data?.mp_status === "transfer_credit_available";
  const esPendiente = estado === "pendiente" || estado === "buscando_medico";
  const esMedicoEnCamino = ["aceptada", "asignada", "en_camino"].includes(estado);
  const mostrarAyudaWhatsApp = !esTeleconsulta && (esPendiente || esMedicoEnCamino);
  const whatsappAyudaUrl = `https://wa.me/5491168700607?text=${encodeURIComponent(`Hola DocYa, necesito ayuda con mi consulta #${consultaId}.`)}`;
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
    if (esPendiente)              return `${t.buscando.estadoTitulo.buscando}${dots}`;
    if (estado === "aceptada" || estado === "asignada") return t.buscando.estadoTitulo.asignado;
    if (estado === "en_camino")   return t.buscando.estadoTitulo.enCamino;
    if (estado === "en_domicilio") return t.buscando.estadoTitulo.llego;
    if (estado === "en_curso")    return t.buscando.estadoTitulo.enCurso;
    if (estado === "en_videollamada") return t.buscando.estadoTitulo.salaLista;
    if (esFin)                   return t.buscando.estadoTitulo.finalizada;
    if (estado === "pago_no_autorizado") return t.buscando.estadoTitulo.pagoNoAutorizado;
    if (tieneCreditoTransferencia) return "Tu pago sigue disponible";
    if (esCancelado)             return t.buscando.estadoTitulo.cancelada;
    return t.buscando.estadoTitulo.procesando;
  })();

  const estadoSub = (() => {
    if (esPendiente)              return t.buscando.estadoSub.buscando;
    if (estado === "aceptada" || estado === "asignada") return t.buscando.estadoSub.asignado;
    if (estado === "en_camino")   return t.buscando.estadoSub.enCamino;
    if (estado === "en_domicilio") return t.buscando.estadoSub.llego;
    if (estado === "en_curso")    return t.buscando.estadoSub.enCurso;
    if (estado === "en_videollamada") return t.buscando.estadoSub.salaLista;
    if (esFin)                   return t.buscando.estadoSub.finalizada;
    if (estado === "pago_no_autorizado") return t.buscando.estadoSub.pagoNoAutorizado;
    if (tieneCreditoTransferencia) return "Ningun profesional acepto, pero no perdiste el pago. Podes volver a solicitar sin transferir otra vez.";
    if (esCancelado)             return t.buscando.estadoSub.cancelada;
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
                  ? <img src={data.medico_foto_perfil} alt={medicoNombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <Icon size={28} color={tipoCfg.color} />
                }
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <p style={{ fontWeight: 800, fontSize: 17, margin: 0 }}>{medicoNombre}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, background: `${tipoCfg.color}15`, border: `1px solid ${tipoCfg.color}30`, borderRadius: 8, padding: "2px 8px" }}>
                    <CheckCircle2 size={12} color={tipoCfg.color} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: tipoCfg.color }}>{t.buscando.verificado}</span>
                  </div>
                </div>
                {data?.medico_matricula && (
                  <p style={{ fontSize: 13, color: muted, margin: 0 }}>{t.buscando.mat} {data.medico_matricula}</p>
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
                      <p style={{ fontSize: 11, color: muted, margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{t.buscando.tiempoEstimado}</p>
                      <p style={{ fontSize: 18, fontWeight: 800, margin: 0, color: text }}>{data.tiempo_estimado_min} {t.buscando.min}</p>
                    </div>
                  </div>
                )}
                {!!data.distancia_km && data.distancia_km > 0 && (
                  <div style={{ flex: 1, background: softPanel, border: `1px solid ${softPanelBorder}`, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                    <MapPin size={16} color={tipoCfg.color} />
                    <div>
                      <p style={{ fontSize: 11, color: muted, margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{t.buscando.distancia}</p>
                      <p style={{ fontSize: 18, fontWeight: 800, margin: 0, color: text }}>{data.distancia_km.toFixed(1)} {t.buscando.km}</p>
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
                  {t.buscando.tiempoBusqueda}
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
                    <p style={{ fontSize: 13, color: muted, margin: "6px 0 0" }}>{t.buscando.minutos}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <AlertCircle size={32} color="#fbbf24" style={{ margin: "0 auto 12px" }} />
                <p style={{ fontWeight: 700, fontSize: 16, color: "#fbbf24", marginBottom: 8 }}>
                  {t.buscando.noEncontramos}
                </p>
                <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
                  {tieneCreditoTransferencia
                    ? <>El importe quedo guardado como credito para tu proxima solicitud.</>
                    : <>{t.buscando.noHayProfesionales}<br />{t.buscando.intentaDeNuevo}</>}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── PASOS (mientras pendiente) ── */}
        {esPendiente && (
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "22px 20px", marginBottom: 16 }}>
            <p style={{ fontWeight: 700, fontSize: 11, color: muted, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.8px" }}>{t.buscando.quePasa}</p>
            {[
              { icon: MapPin,    color: "#fbbf24", label: t.buscando.buscamosCercano },
              { icon: PhoneCall, color: tipoCfg.color, label: t.buscando.profesionalAcepta },
              { icon: Navigation, color: "#818cf8", label: esTeleconsulta ? t.buscando.profesionalVideoLlamada : t.buscando.profesionalEnCamino },
            ].map(({ icon: SIcon, color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <SIcon size={18} color={color} />
                </div>
                <p style={{ fontSize: 14, color: muted, lineHeight: 1.4, flex: 1, margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── AYUDA POR WHATSAPP (búsqueda / profesional en camino) ── */}
        {mostrarAyudaWhatsApp && (
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "22px 20px", marginBottom: 16 }}>
            <p style={{ fontWeight: 800, fontSize: 17, margin: "0 0 8px" }}>
              {esPendiente ? t.buscando.ayudaBuscandoTitulo : t.buscando.ayudaEnCaminoTitulo}
            </p>
            <p style={{ color: muted, fontSize: 14, lineHeight: 1.6, margin: "0 0 18px" }}>
              {esPendiente ? t.buscando.ayudaBuscandoTexto : t.buscando.ayudaEnCaminoTexto}
            </p>
            <a
              href={whatsappAyudaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "100%", padding: "14px 16px", borderRadius: 16,
                background: "#25D366", color: "#fff", fontSize: 15,
                fontWeight: 700, textAlign: "center", textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
              }}
            >
              <MessageCircle size={19} />
              {t.buscando.contactarWhatsApp}
            </a>
          </div>
        )}

        {/* ── CARD CUANDO LLEGÓ ── */}
        {estado === "en_domicilio" && (
          <div style={{ background: "rgba(45,212,191,0.08)", border: "1.5px solid rgba(45,212,191,0.30)", borderRadius: 20, padding: "24px 20px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔔</div>
            <p style={{ fontWeight: 800, fontSize: 17, color: "#2dd4bf", marginBottom: 8 }}>
              {t.buscando.profesionalPuerta}
            </p>
            <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
              {t.buscando.abriPuerta}
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
                <p style={{ fontWeight: 700, fontSize: 15, margin: 0, color: "#a5b4fc" }}>{t.buscando.consultaEnCurso}</p>
                <p style={{ fontSize: 13, color: muted, margin: "4px 0 0" }}>{t.buscando.profesionalAtendiendo}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── BOTÓN UNIRSE A VIDEO (teleconsulta) ── */}
        {esTeleconsulta && ["aceptada", "asignada", "en_videollamada", "en_curso"].includes(estado) && (data?.video_url || data?.daily_room_url) && (
          <div style={{ marginBottom: 16 }}>
            <Link
              href={`/pedir/videollamada?consulta_id=${consultaId}&video_url=${encodeURIComponent(data?.video_url || data?.daily_room_url || "")}&medico=${encodeURIComponent(medicoNombre)}`}
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
              {t.buscando.unirmeVideoLlamada}
            </Link>
            <p style={{ fontSize: 12, color: muted, textAlign: "center", marginTop: 10 }}>
              {t.buscando.salaLista}
            </p>
          </div>
        )}

        {/* ── VALORACIÓN (cuando finaliza) ── */}
        {esFin && (
          <div style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: "24px 20px", marginBottom: 16, textAlign: "center" }}>
            <CheckCircle2 size={40} color="#4ade80" style={{ margin: "0 auto 14px" }} />
            <p style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>{t.buscando.consultaCompletada}</p>
            <p style={{ color: muted, fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>
              {t.buscando.graciasDocYa}
            </p>
            {!ratingEnviado ? (
              <>
                <p style={{ fontSize: 13, color: muted, marginBottom: 12, fontWeight: 600 }}>{t.buscando.comoFueAtencion}</p>
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
                {t.buscando.graciasValoracion}
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
                  {estado === "pago_no_autorizado" ? t.buscando.pagoNoAutorizadoCard : t.buscando.consultaCanceladaCard}
                </p>
                <p style={{ fontSize: 13, color: muted, lineHeight: 1.5 }}>
                  {estado === "pago_no_autorizado"
                    ? t.buscando.tarjetaNoAutorizada
                    : t.buscando.consultaCancelada
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
              {t.buscando.cancelarBusqueda}
            </button>
          )}

          {(esFin || esCancelado) && (
            <Link
              href="/pedir"
              style={{ width: "100%", padding: "16px", borderRadius: 16, background: "linear-gradient(90deg, #00b3a6, #2dd4bf)", color: "#fff", fontSize: 15, fontWeight: 700, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <Home size={18} />
              {t.buscando.volverInicio}
            </Link>
          )}

          {esCancelado && (
            <Link
              href="/pedir"
              style={{ width: "100%", padding: "15px", borderRadius: 16, border: `1px solid ${border}`, background: softPanel, color: text, fontSize: 15, fontWeight: 600, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <RotateCcw size={18} />
              {tieneCreditoTransferencia ? "Volver a solicitar con mi pago" : t.buscando.intentarDeNuevo}
            </Link>
          )}
        </div>

      </main>
    </div>
  );
}
