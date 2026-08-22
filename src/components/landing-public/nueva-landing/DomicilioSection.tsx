// src/components/landing-public/nueva-landing/DomicilioSection.tsx
"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import DomicilioVideo from "./DomicilioVideo";
import { useI18n } from "@/lib/i18n/context";

export default function DomicilioSection() {
  const { t } = useI18n();
  return (
    <section id="domicilio" className="py-32 bg-secondary/50 dark:bg-secondary/10 border-y border-border/50">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <ScrollReveal>
          <DomicilioVideo />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="badge-trusted mb-4 w-fit">
            <ShieldCheck size={16} />
            {t.domicilio.badge}
          </div>
          <h2 className="section-title mb-4">
            {t.domicilio.title}<span className="highlight-text">{t.domicilio.titleHighlight}</span>
          </h2>

          <p className="text-text-muted mb-8 text-xl leading-relaxed">
            {t.domicilio.description}
          </p>

          <ul className="flex flex-col gap-5">
            {t.domicilio.features.map((label) => (
              <li key={label} className="flex items-center gap-4 text-lg font-medium">
                <CheckCircle2 size={24} className="text-[var(--brand)] shrink-0" />
                <span className="text-foreground/90">{label}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
