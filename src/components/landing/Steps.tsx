// src/components/landing/Steps.tsx
"use client";

import { ClipboardCheck, Clock, Stethoscope } from "lucide-react";

const steps = [
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: "Registrate y validá tu matrícula",
    desc: "Completá tus datos y subí la documentación. Te avisamos cuando esté aprobada.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Activá disponibilidad y zona",
    desc: "Elegí franjas horarias y barrios. Podés pausar/activar con un toque.",
  },
  {
    icon: <Stethoscope className="h-6 w-6" />,
    title: "Atendé y cobrá",
    desc: "Recibí solicitudes, navegá con mapa y cobrales desde la app.",
  },
];

export default function Steps() {
  return (
    <section className="relative bg-[var(--hero-bg)] py-16 md:py-20 dark:bg-[var(--hero-bg-dark)]">
      <div className="pointer-events-none absolute inset-0 brand-glow" />

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge">Proceso simple</span>
          <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
            ¿Cómo funciona?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            En pocos pasos podés sumarte, definir tu disponibilidad y empezar a atender.
          </p>
        </div>

        <ol className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="surface rounded-3xl border p-6 shadow-[0_8px_28px_rgba(0,0,0,0.14)] transition-all hover:-translate-y-1 md:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)]">
                  {s.icon}
                </span>

                <span className="badge">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}