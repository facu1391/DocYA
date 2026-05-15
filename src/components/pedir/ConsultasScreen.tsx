"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  HeartPulse,
  Home,
  Loader2,
  MapPin,
  RefreshCw,
  Stethoscope,
  UserCheck,
  Video,
  XCircle,
} from "lucide-react";
import { usePedirTheme } from "./theme";

const API = process.env.NEXT_PUBLIC_API_BASE!;

type PedirUser = { id: string; full_name: string; email: string; perfil_completo: boolean };

type HistoriaConsulta = {
  consulta_id?: number | string;
  id?: number | string;
  fecha_consulta?: string;
  creado_en?: string;
  motivo?: string;
  estado?: string;
  medico?: string;
  medico_nombre?: string;
  tipo?: string;
  tipo_profesional?: string;
  historia_clinica?: string | Record<string, unknown> | null;
  fecha_nota?: string | null;
};

type ConsultaActiva = {
  activa?: boolean;
  id?: number | string;
  estado?: string;
  motivo?: string;
  direccion?: string;
  tipo?: string;
  medico_nombre?: string;
  medico_matricula?: string;
  canal_atencion?: string;
  video_url?: string | null;
  daily_room_url?: string | null;
};

function estadoMeta(estado?: string) {
  const key = (estado || "pendiente").toLowerCase();
  if (key === "finalizada") return { label: "Finalizada", color: "#22c55e", Icon: CheckCircle2 };
  if (key.includes("cancelada") || key === "pago_no_autorizado") return { label: key === "pago_no_autorizado" ? "Pago no autorizado" : "Cancelada", color: "#f87171", Icon: XCircle };
  if (key === "aceptada") return { label: "Profesional asignado", color: "#38bdf8", Icon: UserCheck };
  if (key === "en_camino") return { label: "En camino", color: "#2dd4bf", Icon: MapPin };
  if (key === "en_domicilio") return { label: "En domicilio", color: "#14b8a6", Icon: Home };
  if (key === "en_curso" || key === "en_videollamada") return { label: "En curso", color: "#818cf8", Icon: Activity };
  return { label: "Pendiente", color: "#fbbf24", Icon: Loader2 };
}

function tipoMeta(tipo?: string) {
  const key = (tipo || "").toLowerCase();
  if (key === "teleconsulta") return { label: "Teleconsulta", Icon: Video, color: "#818cf8" };
  if (key === "enfermero") return { label: "Enfermeria", Icon: HeartPulse, color: "#f472b6" };
  return { label: "Medico a domicilio", Icon: Stethoscope, color: "#00b3a6" };
}

function parseHistoria(raw: HistoriaConsulta["historia_clinica"]) {
  if (!raw) return null;
  if (typeof raw === "object") return raw;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed as Record<string, unknown> : null;
  } catch {
    return null;
  }
}

function textValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function fechaCorta(value?: string | null) {
  if (!value) return "-";
  const raw = value.toString();
  const iso = raw.includes("T") ? raw.split("T")[0] : raw.split(" ")[0];
  return iso || raw;
}

export default function ConsultasScreen() {
  const router = useRouter();
  const theme = usePedirTheme();
  const { bg, text, muted, border, brandBorder, surface, headerBg, logo, titleStart } = theme;

  const [user, setUser] = useState<PedirUser | null>(null);
  const [historial, setHistorial] = useState<HistoriaConsulta[]>([]);
  const [activa, setActiva] = useState<ConsultaActiva | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pedir_user");
      if (!raw) {
        router.replace("/pedir");
        return;
      }
      setUser(JSON.parse(raw));
    } catch {
      router.replace("/pedir");
    }
  }, [router]);

  const cargar = useCallback(async (pacienteId: string) => {
    setLoading(true);
    setError("");
    try {
      const [histRes, activaRes] = await Promise.all([
        fetch(`${API}/pacientes/${pacienteId}/historia_clinica`, { cache: "no-store" }),
        fetch(`${API}/pacientes/${pacienteId}/consulta_activa`, { cache: "no-store" }).catch(() => null),
      ]);

      if (!histRes.ok) throw new Error(`No se pudo cargar el historial (${histRes.status})`);
      const histData = await histRes.json();
      setHistorial(Array.isArray(histData) ? histData : []);

      if (activaRes?.ok) {
        const activaData = await activaRes.json();
        setActiva(activaData?.activa ? activaData : null);
      } else {
        setActiva(null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar el historial");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) void cargar(user.id);
  }, [user?.id, cargar]);

  const stats = useMemo(() => {
    const finalizadas = historial.filter(c => (c.estado || "").toLowerCase() === "finalizada").length;
    return { total: historial.length, finalizadas };
  }, [historial]);

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <header style={{ borderBottom: `1px solid ${brandBorder}`, background: headerBg, backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50, padding: "0 18px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", height: 62, display: "flex", alignItems: "center", gap: 14 }}>
          <Link href="/pedir" style={{ color: muted, display: "flex", alignItems: "center", flexShrink: 0 }}>
            <ArrowLeft size={22} />
          </Link>
          <Image src={logo} alt="DocYa" width={86} height={28} style={{ width: 86, height: "auto", maxHeight: 28, objectFit: "contain", display: "block", flexShrink: 0 }} />
          <div style={{ flex: 1 }} />
          <button onClick={() => void cargar(user.id)} style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${border}`, background: "transparent", color: muted, borderRadius: 999, padding: "8px 12px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit" }}>
            <RefreshCw size={15} />
            Actualizar
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 920, margin: "0 auto", padding: "28px 20px 80px" }}>
        <section style={{ position: "relative", overflow: "hidden", borderRadius: 26, border: `1.5px solid ${brandBorder}`, background: surface, padding: "24px 22px", marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ width: 54, height: 54, borderRadius: 18, background: "linear-gradient(135deg, #00b3a6, #2dd4bf)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 8px 24px rgba(0,179,166,0.32)" }}>
              <ClipboardList size={28} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 800, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>Historia clinica</p>
              <h1 style={{ fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 950, lineHeight: 1.08, marginBottom: 10, background: `linear-gradient(90deg, ${titleStart}, #2dd4bf)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Mis consultas
              </h1>
              <p style={{ color: muted, fontSize: 15, lineHeight: 1.55 }}>
                Aca ves tus atenciones finalizadas, el motivo informado, el profesional y la evolucion clinica registrada.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
            <InfoChip label="Consultas" value={String(stats.total)} icon={<FileText size={15} />} color="#2dd4bf" theme={theme} />
            <InfoChip label="Finalizadas" value={String(stats.finalizadas)} icon={<CheckCircle2 size={15} />} color="#22c55e" theme={theme} />
            <InfoChip label="Paciente" value={user.full_name.split(" ")[0] || "Activo"} icon={<UserCheck size={15} />} color="#38bdf8" theme={theme} />
          </div>
        </section>

        {activa && <ActivaCard activa={activa} theme={theme} />}

        {loading ? (
          <div style={{ padding: "60px 0", display: "flex", justifyContent: "center", color: "#2dd4bf" }}>
            <Loader2 size={34} className="animate-spin" />
          </div>
        ) : error ? (
          <EmptyState theme={theme} title="No pudimos cargar tus consultas" text={error} action={<button onClick={() => void cargar(user.id)} style={{ border: "none", borderRadius: 14, background: "linear-gradient(90deg,#00b3a6,#2dd4bf)", color: "#fff", padding: "12px 18px", fontWeight: 800, cursor: "pointer" }}>Reintentar</button>} />
        ) : historial.length === 0 ? (
          <EmptyState theme={theme} title="No hay consultas registradas" text="Cuando tengas atenciones medicas en DocYa, aca vas a ver tu historia clinica en orden cronologico." />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {historial.map((consulta, index) => (
              <ConsultaCard key={`${consulta.consulta_id ?? consulta.id ?? index}`} consulta={consulta} theme={theme} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function InfoChip({ label, value, icon, color, theme }: { label: string; value: string; icon: React.ReactNode; color: string; theme: ReturnType<typeof usePedirTheme> }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${color}30`, background: `${color}12`, color: theme.text, borderRadius: 999, padding: "8px 12px", fontSize: 12, fontWeight: 800 }}>
      <span style={{ color, display: "flex" }}>{icon}</span>
      {label}: {value}
    </div>
  );
}

function ActivaCard({ activa, theme }: { activa: ConsultaActiva; theme: ReturnType<typeof usePedirTheme> }) {
  const meta = estadoMeta(activa.estado);
  const tipo = tipoMeta(activa.tipo);
  const trackingHref = `/pedir/buscando?consulta_id=${activa.id}&tipo=${activa.tipo || "medico"}`;
  return (
    <article style={{ borderRadius: 22, border: `1.5px solid ${meta.color}55`, background: `${meta.color}10`, padding: "18px", marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ width: 46, height: 46, borderRadius: 16, background: `${meta.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <meta.Icon size={24} color={meta.color} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: meta.color, fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>Consulta activa</p>
          <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 6, color: theme.text }}>{meta.label}</h2>
          <p style={{ color: theme.muted, fontSize: 14, lineHeight: 1.45 }}>{activa.motivo || "Tu consulta esta en proceso."}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            <InfoChip label="Tipo" value={tipo.label} icon={<tipo.Icon size={15} />} color={tipo.color} theme={theme} />
            {activa.medico_nombre && <InfoChip label="Profesional" value={activa.medico_nombre} icon={<UserCheck size={15} />} color="#38bdf8" theme={theme} />}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        <Link href={trackingHref} style={{ flex: "1 1 180px", textAlign: "center", borderRadius: 14, background: "linear-gradient(90deg,#00b3a6,#2dd4bf)", color: "#fff", padding: "13px 16px", fontWeight: 850, textDecoration: "none" }}>
          Ver seguimiento
        </Link>
        {(activa.video_url || activa.daily_room_url) && (
          <Link href={`/pedir/videollamada?consulta_id=${activa.id}&video_url=${encodeURIComponent(activa.video_url || activa.daily_room_url || "")}&medico=${encodeURIComponent(activa.medico_nombre || "")}`} style={{ flex: "1 1 180px", textAlign: "center", borderRadius: 14, border: `1px solid ${theme.border}`, color: theme.text, padding: "13px 16px", fontWeight: 850, textDecoration: "none" }}>
            Entrar a videollamada
          </Link>
        )}
      </div>
    </article>
  );
}

function ConsultaCard({ consulta, theme }: { consulta: HistoriaConsulta; theme: ReturnType<typeof usePedirTheme> }) {
  const meta = estadoMeta(consulta.estado);
  const tipo = tipoMeta(consulta.tipo || consulta.tipo_profesional);
  const historia = parseHistoria(consulta.historia_clinica);
  const profesional = consulta.medico || consulta.medico_nombre || "Profesional no asignado";
  const signos = historia?.signos_vitales as Record<string, unknown> | undefined;

  return (
    <article style={{ borderRadius: 22, border: `1px solid ${theme.border}`, background: theme.cardBg, padding: "18px", boxShadow: "0 14px 40px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{ width: 42, height: 42, borderRadius: 999, background: `${meta.color}18`, border: `1px solid ${meta.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <meta.Icon size={22} color={meta.color} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: theme.text, marginBottom: 4 }}>Consulta #{consulta.consulta_id ?? consulta.id ?? "-"}</h3>
              <p style={{ color: theme.muted, fontSize: 14 }}>{profesional}</p>
            </div>
            <span style={{ color: meta.color, background: `${meta.color}14`, borderRadius: 999, padding: "6px 10px", fontSize: 12, fontWeight: 900 }}>{meta.label}</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
            <InfoChip label="Fecha" value={fechaCorta(consulta.fecha_consulta || consulta.creado_en)} icon={<Calendar size={15} />} color="#2dd4bf" theme={theme} />
            <InfoChip label="Tipo" value={tipo.label} icon={<tipo.Icon size={15} />} color={tipo.color} theme={theme} />
            {consulta.fecha_nota && <InfoChip label="Nota" value={fechaCorta(consulta.fecha_nota)} icon={<FileText size={15} />} color="#38bdf8" theme={theme} />}
          </div>

          <ClinicalBlock title="Motivo de consulta" value={consulta.motivo || "-"} theme={theme} />

          {historia && (
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              {signos && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {textValue(signos.ta) && <InfoChip label="TA" value={textValue(signos.ta)} icon={<Activity size={15} />} color="#2dd4bf" theme={theme} />}
                  {textValue(signos.fc) && <InfoChip label="FC" value={textValue(signos.fc)} icon={<Activity size={15} />} color="#818cf8" theme={theme} />}
                  {textValue(signos.temp) && <InfoChip label="Temp" value={`${textValue(signos.temp)} C`} icon={<Activity size={15} />} color="#fbbf24" theme={theme} />}
                  {textValue(signos.sat) && <InfoChip label="SatO2" value={textValue(signos.sat)} icon={<Activity size={15} />} color="#38bdf8" theme={theme} />}
                </div>
              )}
              {textValue(historia.respiratorio) && <ClinicalBlock title="Examen respiratorio" value={textValue(historia.respiratorio)} theme={theme} />}
              {textValue(historia.cardio) && <ClinicalBlock title="Examen cardiovascular" value={textValue(historia.cardio)} theme={theme} />}
              {textValue(historia.abdomen) && <ClinicalBlock title="Examen abdominal" value={textValue(historia.abdomen)} theme={theme} />}
              {textValue(historia.snc) && <ClinicalBlock title="Sistema nervioso central" value={textValue(historia.snc)} theme={theme} />}
              {textValue(historia.diagnostico) && <ClinicalBlock title="Diagnostico" value={textValue(historia.diagnostico)} theme={theme} />}
              {textValue(historia.observacion) && <ClinicalBlock title="Observaciones" value={textValue(historia.observacion)} theme={theme} />}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ClinicalBlock({ title, value, theme }: { title: string; value: string; theme: ReturnType<typeof usePedirTheme> }) {
  return (
    <div style={{ marginTop: 14, borderRadius: 16, border: `1px solid ${theme.brandBorder}`, background: theme.inputBg, padding: "13px 14px" }}>
      <p style={{ color: "#2dd4bf", fontSize: 12, fontWeight: 900, marginBottom: 7 }}>{title}</p>
      <p style={{ color: theme.text, fontSize: 14, lineHeight: 1.48 }}>{value}</p>
    </div>
  );
}

function EmptyState({ theme, title, text, action }: { theme: ReturnType<typeof usePedirTheme>; title: string; text: string; action?: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 24, border: `1px solid ${theme.border}`, background: theme.cardBg, padding: "34px 24px", textAlign: "center" }}>
      <FileText size={48} color={theme.muted} style={{ margin: "0 auto 16px" }} />
      <h2 style={{ fontSize: 20, fontWeight: 900, color: theme.text, marginBottom: 8 }}>{title}</h2>
      <p style={{ color: theme.muted, fontSize: 14, lineHeight: 1.55, maxWidth: 480, margin: "0 auto" }}>{text}</p>
      {action && <div style={{ marginTop: 18 }}>{action}</div>}
    </div>
  );
}
