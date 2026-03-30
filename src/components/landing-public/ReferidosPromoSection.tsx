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

const items = [
  {
    icon: QrCode,
    title: "Link y QR propio",
    desc: "Compartí DocYa de forma simple con tus contactos, redes o WhatsApp.",
  },
  {
    icon: BarChart3,
    title: "Seguimiento real",
    desc: "Visualizá tus referidos, consultas realizadas y ganancias acumuladas.",
  },
  {
    icon: Gift,
    title: "Ganancias por consulta",
    desc: "Recibí beneficios por cada consulta válida generada desde tu enlace.",
  },
];

export default function ReferidosPromoSection() {
  return (
    <section className="relative py-16 md:py-20 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: cubicBezier(0.22, 1, 0.36, 1) }}
          className="mx-auto w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,179,166,0.10),rgba(255,255,255,0.03),rgba(0,179,166,0.08))] shadow-[0_10px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="absolute left-1/2 top-0 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-[var(--brand)]/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-16 bottom-8 h-[180px] w-[180px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -right-16 top-12 h-[180px] w-[180px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="relative grid items-center gap-8 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/25 bg-[var(--brand)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand)]">
                  <Sparkles className="h-4 w-4" />
                  Nuevo programa
                </div>

                <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
                  Ganá dinero
                  <br className="hidden sm:block" /> recomendando{" "}
                  <span className="text-[var(--brand)]">DocYa</span>
                </h2>

                <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-gray-300">
                  Si conocés personas que puedan necesitar atención médica a
                  domicilio, ahora también podés compartir DocYa y obtener
                  beneficios por cada consulta válida generada desde tu enlace.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/referidos"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-6 py-3.5 text-sm font-bold text-[var(--brand-foreground)] transition-all duration-300 hover:-translate-y-[1px] hover:brightness-110"
                  >
                    Más información
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/referidos#registro"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                  >
                    Quiero sumarme
                  </Link>
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
                        className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-md"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--brand)]/20 bg-[var(--brand)]/10 text-[var(--brand)]">
                            <Icon className="h-5 w-5" />
                          </div>

                          <div>
                            <h3 className="text-base md:text-lg font-bold text-white">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-gray-400">
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
                  className="mt-5 rounded-2xl border border-[var(--brand)]/15 bg-[var(--brand)]/10 p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.20em] text-[var(--brand)]">
                    Oportunidad
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-200">
                    Compartí una solución de salud real, con una experiencia
                    clara y un panel donde podés ver tus resultados.
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