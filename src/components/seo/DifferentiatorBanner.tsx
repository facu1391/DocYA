// src/components/seo/DifferentiatorBanner.tsx
"use client";

import { ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/landing-public/nueva-landing/ScrollReveal";

interface DifferentiatorBannerProps {
  ctaHref?: string;
  ctaLabel?: string;
}

export default function DifferentiatorBanner({
  ctaHref = "/pedir",
  ctaLabel = "Solicitar ahora",
}: DifferentiatorBannerProps) {
  return (
    <section className="py-6">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <ScrollReveal>
          <div className="glass-card flex flex-col md:flex-row items-center gap-6 md:gap-10 rounded-3xl p-8 md:p-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-[var(--brand)]">
              <ShieldCheck size={28} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg md:text-xl font-semibold leading-snug">
                No necesitás obra social ni prepaga.
              </p>
              <p className="text-text-muted mt-1">
                Solicitá un médico a domicilio o una teleconsulta y pagá solo cuando lo necesites.
              </p>
            </div>
            <a href={ctaHref} className="btn-primary rounded-full px-6 py-3 h-auto shrink-0 font-bold">
              {ctaLabel}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
