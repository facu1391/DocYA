// src/components/landing-public/nueva-landing/TeleconsultaSection.tsx
"use client";

import Link from "next/link";
import { CheckCircle2, Video } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n/context";

export default function TeleconsultaSection() {
  const { t } = useI18n();
  return (
    <section
      id="teleconsulta"
      className="py-32 bg-secondary/50 dark:bg-secondary/10 border-y border-border/50"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        {/* Texto primero en mobile, segundo en desktop */}
        <ScrollReveal className="order-2 md:order-1">
          <div className="badge-trusted mb-4 w-fit">
            <Video size={16} />
            {t.teleconsulta.badge}
          </div>
          <h2 className="section-title mb-4">
            {t.teleconsulta.title}{" "}
            <span className="highlight-text">{t.teleconsulta.titleHighlight}</span>
          </h2>

          <p className="text-text-muted mb-8 text-xl leading-relaxed">
            {t.teleconsulta.description}
          </p>

          <ul className="flex flex-col gap-4">
            {t.teleconsulta.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle2
                  size={22}
                  className="shrink-0"
                  style={{ color: "var(--primary)" }}
                />
                <span className="text-lg font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/medico-online"
            className="mt-8 inline-flex items-center rounded-full border border-[var(--brand)]/40 px-5 py-3 font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)]/10"
          >
            Conocé cómo funciona el médico online
          </Link>
        </ScrollReveal>

        {/* Card visual */}
        <ScrollReveal delay={0.15} className="order-1 md:order-2">
          <div
            className="glass-card flex flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl p-10 shadow-2xl"
            style={{
              background:
                "radial-gradient(ellipse at 60% 20%, rgba(0,210,255,0.10) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(58,134,255,0.08) 0%, transparent 60%)",
            }}
          >
            {/* Ícono */}
            <div
              className="flex h-24 w-24 items-center justify-center rounded-3xl shadow-xl"
              style={{
                background: "linear-gradient(135deg, rgba(0,210,255,0.18) 0%, rgba(10,230,199,0.22) 100%)",
                border: "1px solid rgba(10,230,199,0.25)",
              }}
            >
              <Video size={44} style={{ color: "var(--primary)" }} />
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
                {t.teleconsulta.cardTitle}
              </p>
              <p className="mt-1 text-text-muted">{t.teleconsulta.cardSubtitle}</p>
            </div>

            {/* Badge */}
            <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/80 px-5 py-3 shadow backdrop-blur-md">
              <div className="rounded-full p-2" style={{ background: "rgba(10,230,199,0.12)", color: "var(--primary)" }}>
                <Video size={18} />
              </div>
              <div>
                <p className="m-0 text-sm font-bold leading-tight">{t.teleconsulta.cardAvailable}</p>
                <p className="m-0 text-xs text-text-muted">{t.teleconsulta.cardDoctors}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
