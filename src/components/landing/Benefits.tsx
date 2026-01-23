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
    <section className="relative py-16 md:py-20 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          Beneficios de ser parte
        </h2>

        <div className="mt-10 grid gap-6 px-2 max-w-[36rem] mx-auto md:max-w-none md:justify-center md:[grid-template-columns:repeat(2,minmax(0,36rem))] md:gap-8">
          {benefits.map((b, i) => (
            <article
              key={b.title}
              className="glass rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] will-change-transform opacity-0 translate-y-4 animate-[fade-up_.6s_ease-out_forwards]"
              style={{ animationDelay: `${120 * i}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center rounded-xl h-11 w-11 border text-[var(--brand)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)] shadow-sm">
                  {b.icon}
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-[var(--brand)]">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground">
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
