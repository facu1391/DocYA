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
import GoogleReviewModal, { useGoogleReviewPrompt } from "./GoogleReviewModal";
import PacienteChat from "./PacienteChat";
import NoDoctorAvailableModal from "./NoDoctorAvailableModal";
import PatientAppCard from "./PatientAppCard";
import { useI18n } from "@/lib/i18n/context";
import {
  clearRetryDraft,
  paymentStatusMessage,
  readRetryDraft,
  RETRY_REQUEST_HANDOFF_KEY,
  type RetryRequestDraft,
  type RetryService,
} from "@/lib/pedir/retryRequest";
import styles from "./BuscandoScreen.module.css";
import { patientFetch } from "@/lib/pedir/session";
import { consultationPaymentState } from "@/lib/pedir/consultationPaymentState";

const API = process.env.NEXT_PUBLIC_API_BASE!;
const SEARCH_WINDOW_SECONDS = 10 * 60;

type Estado =
  | "pendiente" | "aceptada" | "en_camino" | "en_domicilio"
  | "en_curso" | "en_videollamada" | "asignada" | "buscando_medico"
  | "finalizada" | "cancelada" | "cancelada_paciente" | "cancelada_sin_medico"
  | "pago_no_autorizado" | string;

type ConsultaData = {
  estado: Estado;
  medico_id?: number;
  paciente_uuid?: string;
  medico_nombre?: string;
  medico_matricula?: string;
  medico_foto_perfil?: string;
  tiempo_estimado_min?: number;
  distancia_km?: number;
  medico_lat?: number;
  medico_lng?: number;
  mp_status?: string;
  mp_preautorizado?: boolean;
  mp_capturado?: boolean;
  metodo_pago?: string;
  creado_en?: string;
  video_url?: string;
  daily_room_url?: string;
  paciente_nombre?: string;
  motivo?: string;
  direccion?: string;
  tipo?: string;
  expira_en?: string;
  expires_at?: string;
  segundos_restantes?: number;
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

const notify = (message: string) => {
  if (typeof window !== "undefined") window.alert(message);
};

export default function BuscandoScreen() {
  const { t } = useI18n();
  const router = useRouter();
  const params = useSearchParams();
  const consultaId = params.get("consulta_id") ?? "";
  const tipo       = params.get("tipo") ?? "medico";

  const [data, setData]             = useState<ConsultaData | null>(null);
  const [cancelando, setCancelando] = useState(false);
  const [dots, setDots]             = useState(".");
  const [countdown, setCountdown]   = useState(SEARCH_WINDOW_SECONDS);
  const [rating, setRating]         = useState(0);
  const [ratingEnviado, setRatingEnviado] = useState(false);
  const [user, setUser]             = useState<PedirUser | null>(null);
  const [sharingAccess, setSharingAccess] = useState(false);
  const [noDoctorModalOpen, setNoDoctorModalOpen] = useState(false);
  const [retryBusy, setRetryBusy] = useState(false);
  const [retryDraft, setRetryDraft] = useState<RetryRequestDraft | null>(null);
  const [homePrice, setHomePrice] = useState<number | null>(null);
  const [teleconsultPrice, setTeleconsultPrice] = useState<number | null>(null);

  const pollRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollInFlightRef = useRef(false);
  const pollBackoffUntilRef = useRef(0);
  const dotsRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const canceledByPatientRef = useRef(false);
  const noDoctorPromptShownRef = useRef(false);

  const {
    bg, surface, brandBorder: border, text, muted, headerBg, logo,
    softPanel, softPanelBorder, inactiveStep, inactiveStepBg,
    inactiveStepBorder, inactiveText, doneText,
  } = usePedirTheme();

  const compartirAcceso = async (role: "paciente" | "acompanante") => {
    if (!user?.access_token || !consultaId || sharingAccess) return;
    setSharingAccess(true);
    try {
      const res = await fetch(`${API}/teleconsultas/${consultaId}/shared-access`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.access_token}` },
        body: JSON.stringify({ role }),
      });
      const access = await res.json();
      if (!res.ok) throw new Error(access.detail || "No pudimos generar el acceso");
      const text = `DocYa: ingresá a tu teleconsulta con ${access.doctor_name}. Este acceso es temporal: ${access.url}`;
      if (navigator.share) await navigator.share({ title: "Acceso a teleconsulta DocYa", text, url: access.url });
      else { await navigator.clipboard.writeText(access.url); alert("Enlace copiado. Podés enviárselo por WhatsApp."); }
    } catch (error) { alert(error instanceof Error ? error.message : "No pudimos generar el acceso"); }
    finally { setSharingAccess(false); }
  };

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

  useEffect(() => {
    if (!user?.id || !consultaId) return;
    const draft = readRetryDraft();
    if (draft?.ownerId === user.id && draft.sourceConsultationId === consultaId) {
      setRetryDraft(draft);
    }
  }, [consultaId, user]);

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch(`${API}/tarifas/consulta-medico`, { cache: "no-store" }).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`${API}/tarifas/teleconsulta`, { cache: "no-store" }).then(r => r.ok ? r.json() : null).catch(() => null),
    ]).then(([home, video]) => {
      if (!alive) return;
      const homeAmount = Number(home?.monto);
      const videoAmount = Number(video?.monto);
      if (Number.isFinite(homeAmount) && homeAmount > 0) setHomePrice(Math.round(homeAmount));
      if (Number.isFinite(videoAmount) && videoAmount > 0) setTeleconsultPrice(Math.round(videoAmount));
    });
    return () => { alive = false; };
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
    if (pollInFlightRef.current || Date.now() < pollBackoffUntilRef.current) return;
    pollInFlightRef.current = true;
    try {
      const url = esTeleconsulta
        ? `${API}/teleconsultas/${consultaId}?paciente_uuid=${encodeURIComponent(user!.id)}`
        : `${API}/consultas/${consultaId}`;
      const res = await patientFetch(url, {
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
      if (res.status === 503) {
        const retrySeconds = Number(res.headers.get("retry-after") ?? "8");
        pollBackoffUntilRef.current = Date.now() + retrySeconds * 1000;
        return;
      }
      if (!res.ok) return;
      const d = await res.json();
      if (esTeleconsulta && ["preparando_pago", "pago_pendiente"].includes(d.estado)) {
        const paymentResponse = await patientFetch(`${API}/consultas/${consultaId}/estado`, {
          headers: { Authorization: `Bearer ${user!.access_token}` }, cache: "no-store",
        }).catch(() => null);
        if (paymentResponse?.ok) {
          const payment = await paymentResponse.json();
          d.mp_status = payment.mp_status;
          d.mp_preautorizado = payment.mp_preautorizado;
          d.mp_capturado = payment.mp_capturado;
        }
      }
      setData(d);
      const segundosServidor = Number(d.segundos_restantes);
      const vencimiento = d.expires_at ?? d.expira_en;
      const segundosPorFecha = vencimiento
        ? Math.max(0, Math.ceil((new Date(vencimiento).getTime() - Date.now()) / 1000))
        : Number.NaN;
      const restantes = Number.isFinite(segundosServidor)
        ? segundosServidor
        : segundosPorFecha;
      if (Number.isFinite(restantes)) {
        setCountdown(Math.min(SEARCH_WINDOW_SECONDS, Math.max(0, restantes)));
      }
      if (ESTADOS_TERMINADOS.includes(d.estado)) {
        if (pollRef.current) clearInterval(pollRef.current);
        if (countRef.current) clearInterval(countRef.current);
        // Limpiar localStorage al finalizar o cancelar
        localStorage.removeItem("docya_consulta_activa");
      }
      if (d.estado !== "pendiente" && d.estado !== "buscando_medico" && countRef.current) {
        clearInterval(countRef.current);
      }
    } catch {}
    finally { pollInFlightRef.current = false; }
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
    canceledByPatientRef.current = true;
    if (retryDraft?.sourceConsultationId === consultaId) {
      clearRetryDraft();
      setRetryDraft(null);
    }
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
  }, [consultaId, esTeleconsulta, fetchEstado, retryDraft, user]);

  const abrirReintento = useCallback(async (service: RetryService) => {
    if (retryBusy || !user?.id || !user.access_token || !retryDraft || retryDraft.ownerId !== user.id || retryDraft.sourceConsultationId !== consultaId) {
      notify("No pudimos recuperar los datos de esta solicitud. Volvé al inicio para pedir atención.");
      return;
    }
    setRetryBusy(true);
    try {
      const activeRes = await fetch(`${API}/pacientes/${encodeURIComponent(user.id)}/consulta_en_curso`, {
        headers: { Authorization: `Bearer ${user.access_token}` },
        cache: "no-store",
      });
      if (!activeRes.ok) throw new Error("No pudimos verificar si ya tenés otra consulta activa. Intentá de nuevo.");
      const active = await activeRes.json();
      if (active?.activa === true) {
        const activeId = String(active.consulta_id ?? "");
        const activeType = active.canal_atencion === "teleconsulta" ? "teleconsulta" : (active.tipo || "medico");
        if (activeId) router.replace(`/pedir/buscando?consulta_id=${encodeURIComponent(activeId)}&tipo=${encodeURIComponent(activeType)}`);
        throw new Error("Ya tenés una consulta activa. Abrimos su seguimiento para evitar crear otra solicitud.");
      }

      sessionStorage.setItem(RETRY_REQUEST_HANDOFF_KEY, JSON.stringify({
        ...retryDraft,
        targetType: service,
        previousPaymentStatus: data?.mp_status ?? "",
      }));
      const nextParams = new URLSearchParams({ tipo: service, retry: consultaId });
      if (retryDraft.categoriaConsulta === "pediatria") nextParams.set("pediatria", "1");
      if (retryDraft.paraOtraPersona) nextParams.set("recipient", "other");
      router.push(`/pedir/solicitar?${nextParams.toString()}`);
    } catch (error) {
      if (!(error instanceof Error && error.message.includes("Abrimos su seguimiento"))) {
        notify(error instanceof Error ? error.message : "No pudimos preparar una nueva solicitud.");
      }
    } finally {
      setRetryBusy(false);
    }
  }, [consultaId, data?.mp_status, retryBusy, retryDraft, router, user]);

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
  const googleReview = useGoogleReviewPrompt(
    consultaId,
    esFin && (esTeleconsulta || tipo === "medico"),
  );
  const esCancelado = ["cancelada", "cancelada_paciente", "cancelada_sin_medico", "pago_no_autorizado"].includes(estado);
  const noSeEncontroMedico = tipo === "medico" && !data?.medico_id && estado !== "pago_no_autorizado" &&
    ["cancelada", "cancelada_sin_medico", "expirada", "sin_profesionales", "sin_medicos"].includes(estado) &&
    countdown <= 0 && !canceledByPatientRef.current && !!retryDraft &&
    retryDraft.ownerId === user?.id && retryDraft.sourceConsultationId === consultaId &&
    !!user?.id && data?.paciente_uuid === user.id;

  useEffect(() => {
    if (noSeEncontroMedico && !noDoctorPromptShownRef.current) {
      noDoctorPromptShownRef.current = true;
      setNoDoctorModalOpen(true);
    }
  }, [noSeEncontroMedico]);
  const tieneCreditoTransferencia = data?.mp_status === "transfer_credit_available";
  const esPendiente = estado === "pendiente" || estado === "buscando_medico";
  const paymentState = consultationPaymentState(data);
  const esMedicoEnCamino = ["aceptada", "asignada", "en_camino"].includes(estado);
  const mostrarDescargaApp = !esTeleconsulta && esMedicoEnCamino;
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
    if (paymentState) return paymentState.title;
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
    if (paymentState) return paymentState.description;
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

      <main className={styles.layout}>
        <section className={`${styles.scene} ${esTeleconsulta ? styles.video : ""}`} aria-label={tipoCfg.label}>
          <div className={styles.sceneTop}><span className={styles.badge}>{tipoCfg.label}</span><span>#{consultaId}</span></div>
          <div className={styles.visual} aria-hidden="true">
            <div className={`${styles.ring} ${esPendiente ? styles.pulsing : ""}`} />
            <div className={`${styles.ring} ${styles.ringTwo} ${esPendiente ? styles.pulsing : ""}`} />
            <div className={styles.orbit} />
            <div className={styles.centerIcon}>
              {esFin ? <CheckCircle2 size={48} /> : esCancelado ? <XCircle size={48} /> : esTeleconsulta ? <Video size={48} /> : <MapPin size={48} />}
            </div>
          </div>
          <div className={styles.sceneCopy}>
            <span className={styles.eyebrow}>DOCYA · {tipoCfg.label}</span>
            <h2>{estadoTitulo}</h2>
            <p>{estadoSub}</p>
            {!esTeleconsulta && data?.direccion && <div className={styles.address}><MapPin size={18} /><span>{data.direccion}</span></div>}
            {esTeleconsulta && <div className={styles.address}><Video size={18} /><span>{t.buscando.tipos.teleconsulta}</span></div>}
          </div>
        </section>
        <section className={styles.panel} aria-label={estadoTitulo}>

        {paymentState && <div role="status" style={{ display: "grid", gap: 16, padding: 20 }}>
          <p style={{ color: muted, lineHeight: 1.6, margin: 0 }}>{paymentState.description}</p>
          {paymentState.kind === "rejected" && <Link href={`/pedir/solicitar?tipo=${encodeURIComponent(tipo)}`} onClick={() => localStorage.removeItem("docya_consulta_activa")} style={{ padding: 16, borderRadius: 14, background: "#00b3a6", color: "#fff", textAlign: "center", textDecoration: "none", fontWeight: 700 }}>Volver a solicitar atención</Link>}
          <a href={`https://wa.me/5491168700607?text=${encodeURIComponent(`Hola DocYa, necesito ayuda con el pago de mi consulta #${consultaId}.`)}`} target="_blank" rel="noreferrer" style={{ color: text, textAlign: "center", padding: 12 }}>Necesito ayuda con mi pago</a>
        </div>}

        {/* ── STEPPER ── */}
        {!esCancelado && !paymentState && (
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
        <div className={styles.status} style={{ textAlign: "center", marginBottom: 32 }}>
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

        {mostrarDescargaApp && <PatientAppCard variant="tracking" nursing={tipo === "enfermero"} />}

        {hasProf && user?.id && user.access_token && !esFin && !esCancelado && (
          <PacienteChat
            consultaId={consultaId}
            pacienteId={user.id}
            token={user.access_token}
            profesional={medicoNombre}
          />
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
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - countdown / SEARCH_WINDOW_SECONDS)}`}
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
            <button onClick={() => compartirAcceso("paciente")} disabled={sharingAccess} style={{ width: "100%", marginTop: 10, padding: "13px", borderRadius: 14, border: "1px solid rgba(45,212,191,.45)", background: "rgba(45,212,191,.08)", color: "#5eead4", fontWeight: 800 }}>
              {sharingAccess ? "Generando acceso..." : `Compartir acceso con ${data?.paciente_nombre || "el paciente"}`}
            </button>
            <button onClick={() => compartirAcceso("acompanante")} disabled={sharingAccess} style={{ width: "100%", marginTop: 8, padding: "11px", borderRadius: 14, border: "1px solid rgba(255,255,255,.16)", background: "transparent", color: muted, fontWeight: 750 }}>
              Entrar también como acompañante
            </button>
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

        {esFin && <PatientAppCard variant="completed" />}

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

        </section>
      </main>
      <GoogleReviewModal open={googleReview.open} onClose={googleReview.close} />
      <NoDoctorAvailableModal
        open={noDoctorModalOpen && noSeEncontroMedico}
        homePrice={homePrice}
        teleconsultPrice={teleconsultPrice}
        paymentNotice={paymentStatusMessage(data?.mp_status ?? "", retryDraft?.metodoPago ?? "")}
        busy={retryBusy}
        onRetry={abrirReintento}
        onClose={() => setNoDoctorModalOpen(false)}
      />
    </div>
  );
}
