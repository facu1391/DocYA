// src/components/landing-public/ReferidosPromoSection.tsx
"use client";

import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import {
  Gift,
  QrCode,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const itemIcons = [QrCode, BarChart3, Gift];

export default function ReferidosPromoSection() {
  const { t } = useI18n();

  const items = t.referidos.cards.map((card: { title: string; description: string }, i: number) => ({
    icon: itemIcons[i],
    title: card.title,
    desc: card.description,
  }));
  return (
    <section className="relative overflow-hidden bg-[var(--hero-bg)] py-16 md:py-20 dark:bg-[var(--hero-bg-dark)]">
      <div className="pointer-events-none absolute inset-0 brand-glow" />

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: cubicBezier(0.22, 1, 0.36, 1) }}
          className="mx-auto w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(10,230,199,0.10),rgba(255,255,255,0.92),rgba(0,166,206,0.10))] shadow-[0_14px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(10,230,199,0.08),rgba(255,255,255,0.02),rgba(0,166,206,0.08))] dark:shadow-[0_14px_60px_rgba(0,0,0,0.22)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-0 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-[var(--brand)]/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-8 h-[180px] w-[180px] rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 top-12 h-[180px] w-[180px] rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative grid items-center gap-8 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--brand)_35%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand)]">
                  <Sparkles className="h-4 w-4" />
                  {t.referidos.badge}
                </div>

                <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-5xl dark:text-white">
                  {t.referidos.titleStart}
                  <br className="hidden sm:block" />{t.referidos.titleMid}
                  <span className="highlight-text">{t.referidos.titleHighlight}</span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-white/75">
                  {t.referidos.description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/referidos"
                    className="btn-primary inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold"
                  >
                    {t.referidos.cta1}
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/referidos#registro"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all duration-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    {t.referidos.cta2}
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {t.referidos.chips.map((chip: string) => (
                    <span key={chip} className="badge">{chip}</span>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-2xl lg:max-w-none">
                <div className="grid gap-4">
                  {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.08,
                          ease: cubicBezier(0.22, 1, 0.36, 1),
                        }}
                        className="rounded-2xl border border-slate-200/80 bg-white/65 p-5 backdrop-blur-md dark:border-white/10 dark:bg-black/20"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--brand)_25%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)]">
                            <Icon className="h-5 w-5" />
                          </div>

                          <div>
                            <h3 className="text-base font-bold text-slate-900 md:text-lg dark:text-white">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-white/65">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.18,
                    ease: cubicBezier(0.22, 1, 0.36, 1),
                  }}
                  className="mt-5 rounded-2xl border border-[color-mix(in_srgb,var(--brand)_18%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.20em] text-[var(--brand)]">
                    {t.referidos.oportunidadLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-white/80">
                    {t.referidos.oportunidadText}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
