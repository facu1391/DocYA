"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, CheckCircle2, Repeat2, Stethoscope, UsersRound } from "lucide-react";
import styles from "./analytics.module.css";
import { translateInvestor, type InvestorLocale } from "@/lib/i18n/investors";
import { closedMonths, isPatientGrowth, patientMonths, type PatientDay } from "./analytics-data";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || "https://docya-railway-production.up.railway.app").replace(/\/$/, "");
const REFRESH_MS = 60_000;
// Historical reference supplied by DocYa for this landing. Never label these as
// live, completed consultations, or active doctors.
const REFERENCE_DATE = "8 de octubre de 2026";
const HISTORICAL = {
  patients: 1200, consultations: 450, recurringPatients: 58,
  monthly: [
    { mes: "2026-06", total: 17 },
    { mes: "2026-07", total: 36 },
    { mes: "2026-08", total: 109 },
    { mes: "2026-09", total: 196 },
  ],
};
type Metrics = {
  pacientes: number;
  medicos_habilitados: number;
  pacientes_recurrentes: number;
  consultas_finalizadas: number;
  domicilio: number;
  teleconsulta: number;
  mensual: Array<{ mes: string; total: number; domicilio: number; teleconsulta: number }>;
  actualizado_en?: string;
};

function isMetrics(value: unknown): value is Metrics {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  const count = (n: unknown) => typeof n === "number" && Number.isFinite(n) && n >= 0 && Number.isInteger(n);
  return ["pacientes", "medicos_habilitados", "pacientes_recurrentes", "consultas_finalizadas", "domicilio", "teleconsulta"].every((key) => count(data[key])) &&
    Array.isArray(data.mensual) && data.mensual.every((month: unknown) => {
      if (!month || typeof month !== "object") return false;
      const row = month as Record<string, unknown>;
      return typeof row.mes === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(row.mes) && count(row.total) && count(row.domicilio) && count(row.teleconsulta);
    });
}

function formatMonth(month: string, locale: InvestorLocale) {
  return new Date(month + "-01T12:00:00").toLocaleDateString(locale === "en" ? "en-US" : "es-AR", { month: "short" });
}

export default function InvestorAnalytics({ locale = "es" }: { locale?: InvestorLocale }) {
  const t = (text: string) => translateInvestor(locale, text);
  const numberLocale = locale === "en" ? "en-US" : "es-AR";
  const monthLabel = (month: string) => formatMonth(month, locale);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [patientDays, setPatientDays] = useState<PatientDay[] | null>(null);
  const [patientError, setPatientError] = useState(false);

  useEffect(() => {
    let active = true;
    let controller: AbortController | null = null;
    const load = async () => {
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller?.abort(), 8_000);
      try {
        const signal = controller.signal;
        const [summary, growth] = await Promise.allSettled([
          (async () => {
            const response = await fetch(API_BASE + "/monitoreo/inversores/resumen", { cache: "no-store", signal });
            if (!response.ok) throw new Error("Metrics unavailable");
            const data: unknown = await response.json();
            if (!isMetrics(data)) throw new Error("Invalid metrics");
            return data;
          })(),
          (async () => {
            const response = await fetch(API_BASE + "/monitoreo/usuarios/crecimiento?dias=400", { cache: "no-store", signal });
            if (!response.ok) throw new Error("Patient growth unavailable");
            const data: unknown = await response.json();
            if (!isPatientGrowth(data)) throw new Error("Invalid patient growth");
            return data.data;
          })(),
        ]);
        if (!active) return;
        if (summary.status === "fulfilled") {
          const data = summary.value;
          const date = data.actualizado_en ? new Date(data.actualizado_en) : new Date();
          setMetrics(data);
          setUpdatedAt(Number.isNaN(date.getTime()) ? new Date() : date);
          setError(false);
        } else setError(true);
        if (growth.status === "fulfilled") {
          setPatientDays(growth.value);
          setPatientError(false);
        } else setPatientError(true);
      } catch {
        if (active) setError(true);
      } finally {
        window.clearTimeout(timeout);
      }
    };
    void load();
    const timer = window.setInterval(() => void load(), REFRESH_MS);
    return () => { active = false; controller?.abort(); window.clearInterval(timer); };
  }, []);

  const cards = metrics ? [
    { value: metrics.pacientes, label: t("Pacientes registrados"), note: t("Cuentas de pacientes"), icon: UsersRound },
    { value: metrics.consultas_finalizadas, label: t("Consultas finalizadas"), note: t("Atenciones completadas"), icon: CheckCircle2 },
    { value: metrics.medicos_habilitados, label: t("Médicos habilitados"), note: t("Perfil y matrícula validados"), icon: Stethoscope },
    { value: metrics.pacientes_recurrentes, label: t("Pacientes recurrentes"), note: t("Más de una consulta finalizada"), icon: Repeat2 },
  ] : [
    { value: HISTORICAL.patients, label: t("Pacientes registrados"), note: t("Referencia histórica"), icon: UsersRound },
    { value: HISTORICAL.consultations, label: t("Consultas reportadas"), note: t("Referencia histórica"), icon: CheckCircle2 },
    { value: null, label: t("Médicos habilitados"), note: t("Esperando datos actualizados"), icon: Stethoscope },
    { value: HISTORICAL.recurringPatients, label: t("Pacientes recurrentes"), note: t("Referencia histórica"), icon: Repeat2 },
  ];
  const monthly = closedMonths(metrics ? metrics.mensual : HISTORICAL.monthly);
  const newPatients = patientMonths(patientDays ?? []);
  const source = metrics
    ? (error ? t("Últimos datos recibidos · actualización pendiente") : t("Estadísticas actualizadas automáticamente"))
    : t("Referencia histórica") + " · " + t(REFERENCE_DATE);

  return (
    <section id="metricas" className={styles.section} aria-label={t("Tracción y estadísticas de DocYa")}>
      <div className={styles.container}>
        <div className={styles.heading}><div><p>{t("TRACCIÓN REAL")}</p><h2>{t("Una plataforma que")} <span>{t("ya atiende.")}</span></h2></div><span className={styles.source}><i className={metrics && !error ? styles.liveDot : styles.referenceDot} aria-hidden="true" />{source}</span></div>
        <div className={styles.metrics}>
          {cards.map(({ value, label, note, icon: Icon }) => <article key={label}><div className={styles.metricTop}><Icon size={19} aria-hidden="true" /><span>{metrics ? t("REGISTRO ACTUAL") : "8 OCT 2026"}</span></div><strong>{value === null ? "—" : value.toLocaleString(numberLocale)}</strong><h3>{label}</h3><p>{note}</p></article>)}
        </div>
        <div className={styles.chartRow}>
          <div className={styles.chartCopy}><span className={styles.chartIcon}><ArrowUpRight size={23} aria-hidden="true" /></span><h3>{metrics ? t("Actividad mensual") : t("Un producto en crecimiento.")}</h3><p>{metrics ? t("Consultas finalizadas por mes. Solo meses cerrados, sin proyecciones.") : t("17 consultas en junio. 196 en septiembre. Evolución histórica reportada por DocYa.")}</p><span className={styles.chartPeriod}>{metrics ? t("El mes en curso se excluye de la comparación") : t("Junio — septiembre 2026")}</span></div>
          <div className={styles.chart} role="img" aria-label={monthly.length ? monthly.map((month) => monthLabel(month.mes) + ": " + month.total + t(" consultas")).join("; ") : t("Sin consultas finalizadas con fecha en la serie mensual")}>
            {monthly.length ? <ResponsiveContainer width="100%" height="100%"><AreaChart data={monthly} margin={{ top: 15, right: 12, left: -15, bottom: 0 }}><defs><linearGradient id="investorGrowthFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#36d6c2" stopOpacity={.25} /><stop offset="100%" stopColor="#36d6c2" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#ffffff0c" /><XAxis dataKey="mes" tickFormatter={monthLabel} axisLine={false} tickLine={false} tick={{ fill: "#98b0bc", fontSize: 11 }} /><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#98b0bc", fontSize: 10 }} width={40} /><Tooltip labelFormatter={(value) => monthLabel(String(value))} formatter={(value) => [value, t("Consultas")]} contentStyle={{ background: "#0d2835", border: "1px solid #234856", borderRadius: 10, color: "#f2f8fa", fontSize: 12 }} /><Area dataKey="total" name={t("Consultas")} type="linear" stroke="#36d6c2" strokeWidth={3} fill="url(#investorGrowthFill)" isAnimationActive={false} dot={{ r: 4, fill: "#36d6c2", stroke: "#071b25", strokeWidth: 3 }} /></AreaChart></ResponsiveContainer> : <p className={styles.emptyChart}>{t("No hay actividad mensual fechada para mostrar.")}</p>}
          </div>
        </div>
        <div className={`${styles.chartRow} ${styles.patientRow}`}>
          <div className={styles.chartCopy}><span className={styles.chartIcon}><UsersRound size={23} aria-hidden="true" /></span><h3>{t("Pacientes nuevos por mes")}</h3><p>{t("Pacientes que se registraron en cada mes. Solo meses cerrados, con datos reales del registro de DocYa.")}</p><span className={styles.chartPeriod}>{patientError ? t("Actualización pendiente · se reintentará automáticamente") : t("Hasta 12 meses cerrados · actualización automática")}</span></div>
          <div className={styles.chart} role="img" aria-label={newPatients.length ? newPatients.map((month) => monthLabel(month.mes) + ": " + month.total + t(" pacientes nuevos")).join("; ") : t("Crecimiento mensual de pacientes nuevos: datos no disponibles")}>
            {newPatients.length ? <ResponsiveContainer width="100%" height="100%"><AreaChart data={newPatients} margin={{ top: 15, right: 12, left: -15, bottom: 0 }}><defs><linearGradient id="investorPatientGrowthFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#65b8f5" stopOpacity={.25} /><stop offset="100%" stopColor="#65b8f5" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#ffffff0c" /><XAxis dataKey="mes" tickFormatter={monthLabel} axisLine={false} tickLine={false} tick={{ fill: "#98b0bc", fontSize: 11 }} /><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#98b0bc", fontSize: 10 }} width={40} /><Tooltip labelFormatter={(value) => new Date(String(value) + "-01T12:00:00").toLocaleDateString(numberLocale, { month: "long", year: "numeric" })} formatter={(value) => [value, t("Pacientes nuevos")]} contentStyle={{ background: "#0d2835", border: "1px solid #234856", borderRadius: 10, color: "#f2f8fa", fontSize: 12 }} /><Area dataKey="total" name={t("Pacientes nuevos")} type="linear" stroke="#65b8f5" strokeWidth={3} fill="url(#investorPatientGrowthFill)" isAnimationActive={false} dot={{ r: 4, fill: "#65b8f5", stroke: "#071b25", strokeWidth: 3 }} /></AreaChart></ResponsiveContainer> : <p className={styles.emptyChart}>{patientError ? t("No se pudieron actualizar los pacientes nuevos. Se reintentará automáticamente.") : patientDays ? t("No hay meses completos de registros para mostrar.") : t("Cargando pacientes nuevos…")}</p>}
          </div>
        </div>
        <p className={styles.footnote}>{!metrics && t("Cifras históricas de referencia facilitadas por DocYa al ") + t(REFERENCE_DATE) + t(". Las consultas reportadas no se desglosan aquí por estado. ")}{updatedAt && t("Actualizado: ") + updatedAt.toLocaleString(numberLocale, { dateStyle: "short", timeStyle: "short" }) + ". "}{!metrics && error && t("La actualización automática no está disponible en este momento.")}</p>
      </div>
    </section>
  );
}
