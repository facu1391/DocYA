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
    <section className="relative py-16 md:py-20 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          ¿Cómo funciona?
        </h2>

        <ol className="mt-8 grid gap-6 max-w-5xl mx-auto md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="surface rounded-2xl p-6 md:p-7 border shadow-[0_8px_28px_rgba(0,0,0,0.14)] transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border text-[var(--brand)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]">
                  {s.icon}
                </span>

                <span className="badge">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
