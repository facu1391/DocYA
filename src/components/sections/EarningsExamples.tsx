// src/components/sections/EarningsExamples.tsx
"use client";

import { Card } from "@/components/ui/card";

const ARS = (n: number) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

const NETO_POR_CONSULTA = 30000 * 0.8;

const ESCENARIOS = [
  { label: "8 consultas / semana", semanal: 8 * NETO_POR_CONSULTA },
  { label: "12 consultas / semana", semanal: 12 * NETO_POR_CONSULTA },
  { label: "20 consultas / semana", semanal: 20 * NETO_POR_CONSULTA },
];

export default function EarningsExamples() {
  return (
    <section className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <span className="badge">Ejemplos</span>
          </div>

          <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
            Ejemplos ilustrativos
          </h2>

          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Escenarios estimados con precio de $30.000 y 20% de comisión
            (sin costos). Solo a modo orientativo.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ESCENARIOS.map((s) => {
            const mensual = s.semanal * 4;

            return (
              <Card
                key={s.label}
                className="surface rounded-3xl border p-6 shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
              >
                <p className="text-sm text-muted-foreground">{s.label}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm">Semanal</span>
                  <span className="font-semibold">{ARS(s.semanal)}</span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <span className="text-sm">Mensual (×4)</span>
                  <span className="text-xl font-bold">{ARS(mensual)}</span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Ajustá arriba tus propios costos/retenciones para un cálculo realista.
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}