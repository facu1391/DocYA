// src/components/landing/Trust.tsx
"use client";

import { ShieldCheck, Scale, Lock, BadgeCheck } from "lucide-react";

const items = [
  {
    icon: <BadgeCheck className="h-5 w-5" />,
    title: "Validación profesional",
    desc: "Verificamos matrícula y credenciales antes de habilitar la cuenta.",
  },
  {
    icon: <Scale className="h-5 w-5" />,
    title: "Ley 25.326",
    desc: "Tratamiento de datos personales conforme normativa argentina.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Seguridad",
    desc: "Cifrado en tránsito y controles de acceso para proteger tu info.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Transparencia",
    desc: "Términos claros y comisiones visibles en todo momento.",
  },
];

export default function Trust() {
  return (
    <section className="bg-[var(--hero-bg)] py-14 md:py-16 dark:bg-[var(--hero-bg-dark)]">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="surface rounded-3xl border p-6 md:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge">Respaldo profesional</span>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
              Confianza & respaldo
            </h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it) => (
              <article key={it.title} className="flex gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)]">
                  {it.icon}
                </span>

                <div>
                  <h3 className="font-medium">{it.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}