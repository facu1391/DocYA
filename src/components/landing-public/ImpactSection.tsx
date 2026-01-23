"use client";

import { motion, cubicBezier } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Gauge, Clock, ThumbsUp } from "lucide-react";

type KPI = { label: string; value: string; sub?: string };
type Point = { mes: string; solicitudes: number };

export default function ImpactSection({
  kpis = [
    {
      label: "Ahorro estimado de tiempo",
      value: "~45 min",
      sub: "vs. traslado a guardia (ejemplo)",
    },
    {
      label: "Satisfacción media",
      value: "4,7/5",
      sub: "calificaciones de usuarios (ejemplo)",
    },
    {
      label: "Repetición de uso",
      value: "72%",
      sub: "usuarios que vuelven (ejemplo)",
    },
  ],
  demand = [
    { mes: "Ene", solicitudes: 180 },
    { mes: "Feb", solicitudes: 220 },
    { mes: "Mar", solicitudes: 240 },
    { mes: "Abr", solicitudes: 260 },
    { mes: "May", solicitudes: 300 },
    { mes: "Jun", solicitudes: 320 },
    { mes: "Jul", solicitudes: 340 },
    { mes: "Ago", solicitudes: 360 },
    { mes: "Sep", solicitudes: 390 },
    { mes: "Oct", solicitudes: 420 },
    { mes: "Nov", solicitudes: 440 },
    { mes: "Dic", solicitudes: 480 },
  ],
  disclaimer = "Datos ilustrativos de ejemplo. Reemplazar por métricas/estudios propios.",
}: {
  kpis?: KPI[];
  demand?: Point[];
  disclaimer?: string;
}) {
  return (
    <section className="relative py-16 md:py-20 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      {/* ✅ CAMBIO: wrapper centrado y consistente */}
      <div className="relative mx-auto w-full max-w-6xl px-4">
        {/* título */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        >
          <span className="badge">Comodidad y resultados</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
            ¿Por qué elegir atención a domicilio con DocYa?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Reducí traslados innecesarios, ganá tiempo y recibí atención segura en tu hogar.
          </p>
        </motion.div>

        {/* KPIs */}
        <motion.div
          className="
            mt-8 grid gap-4 sm:gap-5
            sm:grid-cols-2 lg:grid-cols-3
            max-w-5xl mx-auto
          "
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        >
          {kpis.map((kpi, i) => (
            <div
              key={kpi.label}
              className="
                surface rounded-2xl p-5 md:p-6 border
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                transition-all duration-300
              "
            >
              <div className="flex items-start gap-3">
                <span
                  className="
                    inline-flex items-center justify-center h-10 w-10 rounded-xl shrink-0
                    text-[var(--brand)]
                    bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                    border border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                  "
                  aria-hidden
                >
                  {i === 0 && <Clock className="h-5 w-5" />}
                  {i === 1 && <ThumbsUp className="h-5 w-5" />}
                  {i === 2 && <Gauge className="h-5 w-5" />}
                </span>
                <div>
                  <div className="text-2xl font-bold leading-none">{kpi.value}</div>
                  <div className="mt-1 font-medium">{kpi.label}</div>
                  {kpi.sub && <p className="text-sm text-muted-foreground mt-1">{kpi.sub}</p>}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Chart */}
        <motion.div
          className="mt-10 lg:mt-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        >
          <div className="surface rounded-2xl p-4 md:p-6 border">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  Tendencia de solicitudes (últimos 12 meses)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Interés creciente por la atención en casa.
                </p>
              </div>
              <span className="badge">Ejemplo</span>
            </div>

            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demand} barSize={28}>
                  <defs>
                    <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.95} />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.65} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="color-mix(in srgb, var(--foreground) 12%, transparent)"
                  />
                  <XAxis dataKey="mes" tickMargin={8} />
                  <YAxis />
                  <Tooltip
                    cursor={{ fill: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      color: "var(--card-foreground)",
                    }}
                  />
                  <Bar
                    dataKey="solicitudes"
                    fill="url(#barFill)"
                    radius={[8, 8, 4, 4]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">{disclaimer}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
