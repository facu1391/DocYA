// src/components/sections/EarningsExplainer.tsx
"use client";

import { Calculator, XOctagon, TrendingUp, Check } from "lucide-react";

export default function EarningsExplainer() {
  return (
    <section className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <span className="badge">Guía rápida</span>
          </div>

          <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
            Cómo leer tu proyección
          </h2>

          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            La calculadora muestra estimaciones con valores de referencia. Podés adaptar
            precios, comisión y costos para ver distintos escenarios.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-6 md:grid-cols-3">
          <article className="surface rounded-3xl border p-6 shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
            <header className="flex items-center gap-3">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border
                text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]"
              >
                <Calculator className="h-5 w-5" />
              </span>
              <h3 className="font-semibold">Incluye</h3>
            </header>

            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
                Precio bruto por consulta
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
                Comisión DocYa
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
                Costos variables y fijos
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
                Retenciones estimadas
              </li>
            </ul>
          </article>

          <article className="surface rounded-3xl border p-6 shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
            <header className="flex items-center gap-3">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border
                text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]"
              >
                <XOctagon className="h-5 w-5" />
              </span>
              <h3 className="font-semibold">No contempla</h3>
            </header>

            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>Variaciones por distancia/tráfico</li>
              <li>Insumos excepcionales</li>
              <li>Particularidades impositivas individuales</li>
            </ul>
          </article>

          <article className="surface rounded-3xl border p-6 shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
            <header className="flex items-center gap-3">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border
                text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]"
              >
                <TrendingUp className="h-5 w-5" />
              </span>
              <h3 className="font-semibold">Tips para mejorar</h3>
            </header>

            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>Activá franjas pico (tarde/noche) para más asignaciones</li>
              <li>Cubrí zonas con alta demanda cercana</li>
              <li>Mantené calificaciones altas (impacta en prioridad)</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}