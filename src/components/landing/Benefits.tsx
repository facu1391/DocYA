// src/components/landing/Benefits.tsx
"use client";

import type { ReactNode } from "react";
import { Wallet, CalendarClock, Star, FileCheck2 } from "lucide-react";

type Benefit = {
  title: string;
  desc: string;
  icon: ReactNode;
};

const benefits: Benefit[] = [
  {
    title: "Ingresos asegurados",
    desc: "Recibí un pago por cada consulta realizada, con acreditaciones rápidas y transparentes todas las semanas.",
    icon: <Wallet className="h-6 w-6" />,
  },
  {
    title: "Flexibilidad total",
    desc: "Vos decidís cuándo y dónde estar disponible. No más horarios fijos ni trámites complicados.",
    icon: <CalendarClock className="h-6 w-6" />,
  },
  {
    title: "Reputación profesional",
    desc: "Los pacientes califican tu atención. Mientras más estrellas tengas, más consultas recibís.",
    icon: <Star className="h-6 w-6" />,
  },
  {
    title: "Herramientas digitales",
    desc: "Emití recetas, certificados médicos y registrá historias clínicas directamente desde la app.",
    icon: <FileCheck2 className="h-6 w-6" />,
  },
];

export default function Benefits() {
  return (
    <section className="relative bg-[var(--hero-bg)] py-16 md:py-20 dark:bg-[var(--hero-bg-dark)]">
      <div className="pointer-events-none absolute inset-0 brand-glow" />

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge">DocYa Pro</span>
          <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
            Beneficios de ser parte
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Una propuesta pensada para profesionales que quieren más control, más herramientas y una experiencia moderna.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[36rem] gap-6 px-2 md:max-w-none md:justify-center md:[grid-template-columns:repeat(2,minmax(0,36rem))] md:gap-8">
          {benefits.map((b, i) => (
            <article
              key={b.title}
              className="glass-card opacity-0 translate-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] animate-[fade-up_.6s_ease-out_forwards]"
              style={{ animationDelay: `${120 * i}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] shadow-sm">
                  {b.icon}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[var(--brand)] md:text-2xl">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}