// src/components/landing-public/nueva-landing/IASection.tsx
"use client";

import Image from "next/image";
import { CheckCircle2, Clock, AlertTriangle, Map } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n/context";

const featureIcons = [CheckCircle2, AlertTriangle, Clock, Map];

export default function IASection() {
  const { t } = useI18n();
  const features = featureIcons.map((icon, i) => ({ icon, label: t.ia.badges[i] }));
  return (
    <section id="ia" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand)]/5 blur-[100px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <ScrollReveal>
          <div
            className="relative mx-auto h-[650px] w-[320px] max-w-full"
          >
            <Image
              src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1776467625/Green_Minimalist_Q_A_Phone_Chatting_Instagram_Story_1_cjt2p0.png"
              alt={t.ia.altImage}
              fill
              className="object-cover"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="badge-trusted mb-4 w-fit">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-[var(--brand)]"></span>
            {t.ia.badges[4]}
          </div>

          <h2 className="section-title mb-4">
            {t.ia.title}{" "}
            <span className="highlight-text">{t.ia.titleHighlight}</span>
          </h2>

          <p className="text-text-muted mb-8 max-w-lg text-xl leading-relaxed">
            {t.ia.description}
          </p>

          <div className="mb-10 flex flex-col gap-6">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[var(--brand)]">
                  <Icon size={16} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{label}</h4>
                  <p className="text-sm text-text-muted">
                    {t.ia.pasoValidado}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-r-2xl border-l-4 border-[var(--brand)] bg-[var(--brand)]/10 px-6 py-5">
            <strong className="mb-1 block text-lg text-[var(--brand)]">
              {t.ia.calloutTitle}
            </strong>
            <span className="text-sm font-medium text-foreground">
              {t.ia.calloutDescription}
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
