"use client";

import { Calculator, XOctagon, TrendingUp, Check } from "lucide-react";

export default function EarningsExplainer() {
  return (
    <section className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      {/* ✅ reemplaza container por wrapper centrado */}
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold">Cómo leer tu proyección</h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            La calculadora muestra estimaciones con valores de referencia. Podés adaptar precios, comisión y costos
            para ver distintos escenarios.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          <article className="surface rounded-2xl p-6 border">
            <header className="flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border
                text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]"
              >
                <Calculator className="h-5 w-5" />
              </span>
              <h3 className="font-semibold">Incluye</h3>
            </header>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-[var(--brand)]" />
                Precio bruto por consulta
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-[var(--brand)]" />
                Comisión DocYa
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-[var(--brand)]" />
                Costos variables y fijos
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-[var(--brand)]" />
                Retenciones estimadas
              </li>
            </ul>
          </article>

          <article className="surface rounded-2xl p-6 border">
            <header className="flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border
                text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]"
              >
                <XOctagon className="h-5 w-5" />
              </span>
              <h3 className="font-semibold">No contempla</h3>
            </header>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Variaciones por distancia/tráfico</li>
              <li>Insumos excepcionales</li>
              <li>Particularidades impositivas individuales</li>
            </ul>
          </article>

          <article className="surface rounded-2xl p-6 border">
            <header className="flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border
                text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]"
              >
                <TrendingUp className="h-5 w-5" />
              </span>
              <h3 className="font-semibold">Tips para mejorar</h3>
            </header>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
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
