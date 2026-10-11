"use client";
import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CheckCircle2, MapPin, UsersRound, Video } from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import SectionHeading from "@/components/clinic-landing/shared/SectionHeading";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || "https://docya-railway-production.up.railway.app").replace(/\/$/, "");
const REFRESH_MS = 60_000;
const CHART_COLORS = ["#00b3a6", "#39b9e6", "#8b7cf6", "#f5a64a", "#ee7183", "#5eaf78"];

type InvestorMetrics = {
  pacientes: number;
  consultas_finalizadas: number;
  domicilio: number;
  teleconsulta: number;
  mensual: Array<{ mes: string; total: number; domicilio: number; teleconsulta: number }>;
  provincias: Array<{ provincia: string; total: number; domicilio: number; teleconsulta: number }>;
  provincias_mensual: Array<{ mes: string; provincia: string; total: number }>;
  actualizado_en: string;
};

function formatCompact(value: number) {
  return new Intl.NumberFormat("es-AR", { notation: value >= 10_000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value);
}

function formatMonth(value: string) {
  const date = new Date(`${value}-01T12:00:00`);
  return date.toLocaleDateString("es-AR", { month: "short", year: "2-digit" });
}

export default function InvestorAnalytics() {
  const [metrics, setMetrics] = useState<InvestorMetrics | null>(null);
  const [error, setError] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(`${API_BASE}/monitoreo/inversores/resumen`, { cache: "no-store" });
        if (!response.ok) throw new Error(`metrics:${response.status}`);
        const data = await response.json() as InvestorMetrics;
        if (!active) return;
        setMetrics(data);
        setUpdatedAt(data.actualizado_en ? new Date(data.actualizado_en) : new Date());
        setError(false);
      } catch {
        if (active) setError(true);
      }
    };
    void load();
    const timer = window.setInterval(() => void load(), REFRESH_MS);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const monthly = metrics?.mensual ?? [];
  const provinces = metrics?.provincias ?? [];
  const provinceNames = useMemo(() => {
    const selected = provinces.filter((item) => item.provincia !== "Sin provincia informada").slice(0, 5);
    return selected.map((item) => item.provincia);
  }, [provinces]);
  const provinceTrend = useMemo(() => {
    const byMonth = new Map<string, Record<string, number>>();
    for (const item of metrics?.provincias_mensual ?? []) {
      const current = byMonth.get(item.mes) ?? { mes: item.mes };
      current[item.provincia] = Number(item.total || 0);
      byMonth.set(item.mes, current);
    }
    return Array.from(byMonth.values()).sort((a, b) => String(a.mes).localeCompare(String(b.mes)));
  }, [metrics]);
  const modality = metrics ? [
    { name: "A domicilio", value: Number(metrics.domicilio || 0) },
    { name: "Teleconsulta", value: Number(metrics.teleconsulta || 0) },
  ] : [];

  const cards = [
    { label: "Pacientes registrados", value: metrics?.pacientes, icon: UsersRound, note: "Cuentas de pacientes" },
    { label: "Consultas finalizadas", value: metrics?.consultas_finalizadas, icon: CheckCircle2, note: "Atenciones completadas" },
    { label: "A domicilio", value: metrics?.domicilio, icon: MapPin, note: "Consultas finalizadas" },
    { label: "Por teleconsulta", value: metrics?.teleconsulta, icon: Video, note: "Consultas finalizadas" },
  ];

  return (
    <section id="metricas" className="bg-[var(--background)] px-6 py-24 md:py-28">
      <SectionHeading eyebrow="Actividad de la red" title="La evolución de DocYa, con datos del backend." subtitle="Indicadores agregados de pacientes y consultas finalizadas. Las tarjetas se actualizan automáticamente cada minuto." />
      <div className="mx-auto mt-12 max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted">
          <span className="inline-flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${error ? "bg-amber-500" : metrics ? "animate-pulse bg-emerald-500" : "bg-slate-400"}`} />{error ? "No se pudo actualizar. Se muestran los últimos datos recibidos." : metrics ? "Conectado al backend DocYa" : "Cargando métricas…"}</span>
          {updatedAt && <span>Última actualización: {updatedAt.toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" })}</span>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ label, value, icon: Icon, note }, index) => <ScrollReveal key={label} delay={index * .04}><article className="glass-card rounded-3xl p-5"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-[var(--brand)]"><Icon className="h-5 w-5" /></span><span className="rounded-full bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand)]">En vivo</span></div><p className="mt-5 text-xs font-semibold uppercase tracking-wider text-text-muted">{label}</p><p className="mt-1 text-3xl font-bold tabular-nums text-foreground">{value == null ? <span className="inline-block h-8 w-20 animate-pulse rounded bg-slate-200 dark:bg-white/10" /> : formatCompact(value)}</p><p className="mt-1 text-xs text-text-muted">{note}</p></article></ScrollReveal>)}
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
          <article className="glass-card min-w-0 rounded-3xl p-5 md:p-7"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[var(--brand)]">Crecimiento de actividad</p><h3 className="mt-2 text-xl font-semibold text-foreground">Consultas finalizadas por mes</h3><p className="mt-1 text-sm text-text-muted">Últimos 12 meses, separadas por modalidad.</p></div><div className="mt-6 h-[300px] w-full">{monthly.length ? <ResponsiveContainer width="100%" height="100%"><AreaChart data={monthly} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}><defs><linearGradient id="investorHomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00b3a6" stopOpacity={.32} /><stop offset="95%" stopColor="#00b3a6" stopOpacity={0} /></linearGradient><linearGradient id="investorVideoFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#39b9e6" stopOpacity={.28} /><stop offset="95%" stopColor="#39b9e6" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="currentColor" strokeOpacity={.08} vertical={false} /><XAxis dataKey="mes" tickFormatter={formatMonth} tick={{ fontSize: 11, fill: "#718096" }} axisLine={false} tickLine={false} /><YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#718096" }} axisLine={false} tickLine={false} /><Tooltip labelFormatter={(value) => formatMonth(String(value))} contentStyle={{ borderRadius: 14, border: "1px solid rgba(0,0,0,.08)", background: "var(--card)", color: "var(--foreground)" }} /><Legend /><Area type="monotone" dataKey="domicilio" name="A domicilio" stroke="#00b3a6" strokeWidth={2.5} fill="url(#investorHomeFill)" /><Area type="monotone" dataKey="teleconsulta" name="Teleconsulta" stroke="#39b9e6" strokeWidth={2.5} fill="url(#investorVideoFill)" /></AreaChart></ResponsiveContainer> : <ChartEmpty error={error} />}</div></article>
          <article className="glass-card min-w-0 rounded-3xl p-5 md:p-7"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[var(--brand)]">Composición de la red</p><h3 className="mt-2 text-xl font-semibold text-foreground">Modalidad de atención</h3><p className="mt-1 text-sm text-text-muted">Distribución histórica de consultas finalizadas.</p></div><div className="relative mt-4 h-[250px]">{metrics && metrics.consultas_finalizadas > 0 ? <><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={modality} dataKey="value" nameKey="name" innerRadius={68} outerRadius={98} paddingAngle={4} stroke="none">{modality.map((item, index) => <Cell key={item.name} fill={index === 0 ? "#00b3a6" : "#39b9e6"} />)}</Pie><Tooltip contentStyle={{ borderRadius: 14, border: "1px solid rgba(0,0,0,.08)", background: "var(--card)", color: "var(--foreground)" }} /></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-3xl font-bold tabular-nums text-foreground">{formatCompact(metrics.consultas_finalizadas)}</span><span className="text-xs text-text-muted">finalizadas</span></div></> : <ChartEmpty error={error} />}</div><div className="flex justify-center gap-5 text-sm"><span className="flex items-center gap-2 text-text-muted"><i className="h-2.5 w-2.5 rounded-full bg-[#00b3a6]" />Domicilio</span><span className="flex items-center gap-2 text-text-muted"><i className="h-2.5 w-2.5 rounded-full bg-[#39b9e6]" />Teleconsulta</span></div></article>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
          <article className="glass-card min-w-0 rounded-3xl p-5 md:p-7"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[var(--brand)]">Cobertura observada</p><h3 className="mt-2 text-xl font-semibold text-foreground">Consultas finalizadas por provincia</h3><p className="mt-1 text-sm text-text-muted">Distribución acumulada según provincia informada en la solicitud.</p></div><div className="mt-6 h-[330px]">{provinces.length ? <ResponsiveContainer width="100%" height="100%"><BarChart data={provinces.slice(0, 8)} layout="vertical" margin={{ top: 2, right: 12, left: 4, bottom: 2 }}><CartesianGrid stroke="currentColor" strokeOpacity={.08} horizontal={false} /><XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#718096" }} axisLine={false} tickLine={false} /><YAxis type="category" dataKey="provincia" width={112} tick={{ fontSize: 11, fill: "#718096" }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: 14, border: "1px solid rgba(0,0,0,.08)", background: "var(--card)", color: "var(--foreground)" }} /><Bar dataKey="total" name="Finalizadas" radius={[0, 8, 8, 0]}>{provinces.slice(0, 8).map((item, index) => <Cell key={item.provincia} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}</Bar></BarChart></ResponsiveContainer> : <ChartEmpty error={error} />}</div></article>
          <article className="glass-card min-w-0 rounded-3xl p-5 md:p-7"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[var(--brand)]">Expansión geográfica</p><h3 className="mt-2 text-xl font-semibold text-foreground">Crecimiento mensual por provincia</h3><p className="mt-1 text-sm text-text-muted">Consultas finalizadas por mes en las cinco provincias con mayor volumen.</p></div><div className="mt-6 h-[330px]">{provinceTrend.length && provinceNames.length ? <ResponsiveContainer width="100%" height="100%"><LineChart data={provinceTrend} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}><CartesianGrid stroke="currentColor" strokeOpacity={.08} vertical={false} /><XAxis dataKey="mes" tickFormatter={formatMonth} tick={{ fontSize: 11, fill: "#718096" }} axisLine={false} tickLine={false} /><YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#718096" }} axisLine={false} tickLine={false} /><Tooltip labelFormatter={(value) => formatMonth(String(value))} contentStyle={{ borderRadius: 14, border: "1px solid rgba(0,0,0,.08)", background: "var(--card)", color: "var(--foreground)" }} /><Legend />{provinceNames.map((name, index) => <Line key={name} type="monotone" dataKey={name} name={name} stroke={CHART_COLORS[index % CHART_COLORS.length]} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />)}</LineChart></ResponsiveContainer> : <ChartEmpty error={error} />}</div></article>
        </div>
        <p className="mx-auto mt-5 max-w-5xl text-center text-xs leading-relaxed text-text-muted">Datos agregados del backend DocYa. “Pacientes” cuenta usuarios con rol paciente; las atenciones se cuentan cuando su estado es finalizado. La cobertura provincial refleja únicamente consultas con provincia informada. Actualización periódica; las métricas no representan una certificación independiente.</p>
      </div>
    </section>
  );
}

function ChartEmpty({ error }: { error: boolean }) {
  return <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-[var(--border)] px-6 text-center text-sm text-text-muted">{error ? "No se pudieron cargar los datos. Se reintentará automáticamente." : "Esperando datos del backend…"}</div>;
}


