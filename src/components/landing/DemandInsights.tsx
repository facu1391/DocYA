// src/components/landing/DemandInsights.tsx
"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const motivos = [
  { name: "Movilidad reducida", pct: 32 },
  { name: "Adultos mayores", pct: 22 },
  { name: "Post-operatorio", pct: 16 },
  { name: "Control crónico", pct: 15 },
  { name: "Pediatría leve", pct: 15 },
];

const franjas = [
  { name: "Mañana", pct: 30 },
  { name: "Tarde", pct: 45 },
  { name: "Noche", pct: 25 },
];

const COLORS = [
  "var(--brand)",
  "color-mix(in srgb, var(--brand) 75%, transparent)",
  "color-mix(in srgb, var(--brand) 55%, transparent)",
  "color-mix(in srgb, var(--brand) 35%, transparent)",
  "color-mix(in srgb, var(--brand) 20%, transparent)",
];

export default function DemandInsights() {
  return (
    <section className="relative bg-[var(--hero-bg)] py-16 md:py-20 dark:bg-[var(--hero-bg-dark)]">
      <div className="pointer-events-none absolute inset-0 brand-glow" />

      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge">Insights de demanda</span>
          <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
            ¿Por qué se pide médico a domicilio?
          </h2>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="badge">
            Neto por consulta: <strong>$24.000</strong>
          </span>
          <span className="badge">Objetivo de asignación: &lt; 10 min</span>
          <span className="badge">Cobro desde la app</span>
        </div>

        <div
          className="
            mx-auto mt-8 grid max-w-[1100px] gap-6 px-2 md:gap-8
            lg:justify-center lg:[grid-template-columns:repeat(2,minmax(0,520px))]
          "
        >
          <article className="surface h-full rounded-3xl border p-5 md:p-6">
            <h3 className="font-semibold">Motivos principales</h3>

            <div className="mt-2 h-72 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={motivos}
                    dataKey="pct"
                    nameKey="name"
                    innerRadius="55%"
                    outerRadius="85%"
                    paddingAngle={2}
                  >
                    {motivos.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>

                  <Legend verticalAlign="bottom" align="center" />
                  <Tooltip formatter={(v: number) => [`${v}%`, "Participación"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Distribución ilustrativa para comunicación. No representa datos reales en producción.
            </p>
          </article>

          <article className="surface h-full rounded-3xl border p-5 md:p-6">
            <h3 className="font-semibold">¿Cuándo se concentra la demanda?</h3>

            <div className="mt-2 h-72 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={franjas} barSize={36}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v: number) => [`${v}%`, "Demanda"]} />
                  <Bar dataKey="pct" fill="var(--brand)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Estimaciones de ejemplo para fines de diseño/UX.
            </p>
          </article>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <a href="/registro" className="btn-primary h-11 px-5">
            Sumate y empezá a atender
          </a>
        </div>
      </div>
    </section>
  );
}