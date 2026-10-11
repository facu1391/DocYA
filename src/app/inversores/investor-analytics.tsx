"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, CheckCircle2, Repeat2, Stethoscope, UsersRound } from "lucide-react";
import styles from "./analytics.module.css";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || "https://docya-railway-production.up.railway.app").replace(/\/$/, "");
const REFRESH_MS = 60_000;
// Historical reference supplied by DocYa for this landing. Never label these as
// live, completed consultations, or active doctors.
const REFERENCE_DATE = "8 de octubre de 2026";
const HISTORICAL = {
  patients: 1200, consultations: 450, doctors: 161, recurringPatients: 58,
  monthly: [
    { mes: "2026-06", total: 17 },
    { mes: "2026-07", total: 36 },
    { mes: "2026-08", total: 109 },
    { mes: "2026-09", total: 196 },
  ],
};
type Metrics = {
  pacientes: number;
  medicos_registrados: number;
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
  return ["pacientes", "medicos_registrados", "pacientes_recurrentes", "consultas_finalizadas", "domicilio", "teleconsulta"].every((key) => count(data[key])) &&
    Array.isArray(data.mensual) && data.mensual.every((month: unknown) => {
      if (!month || typeof month !== "object") return false;
      const row = month as Record<string, unknown>;
      return typeof row.mes === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(row.mes) && count(row.total) && count(row.domicilio) && count(row.teleconsulta);
    });
}

function formatMonth(month: string) {
  return new Date(month + "-01T12:00:00").toLocaleDateString("es-AR", { month: "short" });
}

export default function InvestorAnalytics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    let active = true;
    let controller: AbortController | null = null;
    const load = async () => {
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller?.abort(), 8_000);
      try {
        const response = await fetch(API_BASE + "/monitoreo/inversores/resumen", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Metrics unavailable");
        const data: unknown = await response.json();
        if (!isMetrics(data)) throw new Error("Invalid metrics");
        if (!active) return;
        const date = data.actualizado_en ? new Date(data.actualizado_en) : new Date();
        setMetrics(data);
        setUpdatedAt(Number.isNaN(date.getTime()) ? new Date() : date);
        setError(false);
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
    { value: metrics.pacientes, label: "Pacientes registrados", note: "Cuentas de pacientes", icon: UsersRound },
    { value: metrics.consultas_finalizadas, label: "Consultas finalizadas", note: "Atenciones completadas", icon: CheckCircle2 },
    { value: metrics.medicos_registrados, label: "Médicos registrados", note: "No equivale a médicos activos", icon: Stethoscope },
    { value: metrics.pacientes_recurrentes, label: "Pacientes recurrentes", note: "Más de una consulta finalizada", icon: Repeat2 },
  ] : [
    { value: HISTORICAL.patients, label: "Pacientes registrados", note: "Referencia histórica", icon: UsersRound },
    { value: HISTORICAL.consultations, label: "Consultas reportadas", note: "Referencia histórica", icon: CheckCircle2 },
    { value: HISTORICAL.doctors, label: "Médicos registrados", note: "No equivale a médicos activos", icon: Stethoscope },
    { value: HISTORICAL.recurringPatients, label: "Pacientes recurrentes", note: "Referencia histórica", icon: Repeat2 },
  ];
  const monthly = metrics ? metrics.mensual : HISTORICAL.monthly;
  const source = metrics
    ? (error ? "Últimos datos recibidos · actualización pendiente" : "Estadísticas actualizadas automáticamente")
    : "Referencia histórica · " + REFERENCE_DATE;

  return (
    <section id="metricas" className={styles.section} aria-label="Tracción y estadísticas de DocYa">
      <div className={styles.container}>
        <div className={styles.heading}><div><p>TRACCIÓN REAL</p><h2>Una plataforma que <span>ya atiende.</span></h2></div><span className={styles.source}><i className={metrics && !error ? styles.liveDot : styles.referenceDot} aria-hidden="true" />{source}</span></div>
        <div className={styles.metrics}>
          {cards.map(({ value, label, note, icon: Icon }) => <article key={label}><div className={styles.metricTop}><Icon size={19} aria-hidden="true" /><span>{metrics ? "REGISTRO ACTUAL" : "8 OCT 2026"}</span></div><strong>{value.toLocaleString("es-AR")}</strong><h3>{label}</h3><p>{note}</p></article>)}
        </div>
        <div className={styles.chartRow}>
          <div className={styles.chartCopy}><span className={styles.chartIcon}><ArrowUpRight size={23} aria-hidden="true" /></span><h3>{metrics ? "Actividad mensual" : "Un producto en crecimiento."}</h3><p>{metrics ? "Consultas finalizadas por mes. Actividad registrada, sin proyecciones." : "17 consultas en junio. 196 en septiembre. Evolución histórica reportada por DocYa."}</p><span className={styles.chartPeriod}>{metrics ? "Serie mensual del registro de DocYa" : "Junio — septiembre 2026"}</span></div>
          <div className={styles.chart} role="img" aria-label={monthly.length ? monthly.map((month) => formatMonth(month.mes) + ": " + month.total + " consultas").join("; ") : "Sin consultas finalizadas con fecha en la serie mensual"}>
            {monthly.length ? <ResponsiveContainer width="100%" height="100%"><AreaChart data={monthly} margin={{ top: 15, right: 12, left: -15, bottom: 0 }}><defs><linearGradient id="investorGrowthFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#36d6c2" stopOpacity={.25} /><stop offset="100%" stopColor="#36d6c2" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#ffffff0c" /><XAxis dataKey="mes" tickFormatter={formatMonth} axisLine={false} tickLine={false} tick={{ fill: "#98b0bc", fontSize: 11 }} /><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#98b0bc", fontSize: 10 }} width={40} /><Tooltip labelFormatter={(value) => formatMonth(String(value))} formatter={(value) => [value, "Consultas"]} contentStyle={{ background: "#0d2835", border: "1px solid #234856", borderRadius: 10, color: "#f2f8fa", fontSize: 12 }} /><Area dataKey="total" name="Consultas" type="linear" stroke="#36d6c2" strokeWidth={3} fill="url(#investorGrowthFill)" isAnimationActive={false} dot={{ r: 4, fill: "#36d6c2", stroke: "#071b25", strokeWidth: 3 }} /></AreaChart></ResponsiveContainer> : <p className={styles.emptyChart}>No hay actividad mensual fechada para mostrar.</p>}
          </div>
        </div>
        <p className={styles.footnote}>{metrics ? `Pacientes registrados: cuentas con rol paciente. Médicos registrados: perfiles médicos, sin contar otros profesionales. Recurrencia: cuentas con más de una consulta finalizada. Consultas finalizadas: ${metrics.teleconsulta.toLocaleString("es-AR")} teleconsultas y ${metrics.domicilio.toLocaleString("es-AR")} a domicilio. ` : "Cifras históricas de referencia facilitadas por DocYa al " + REFERENCE_DATE + ". Las consultas reportadas no se desglosan aquí por estado. "}{updatedAt && "Actualizado: " + updatedAt.toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" }) + ". "}{!metrics && error && "La actualización automática no está disponible en este momento."}</p>
      </div>
    </section>
  );
}
