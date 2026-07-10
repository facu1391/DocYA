// src/components/clinic-landing/BeforeAfterSection.tsx
"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import SectionHeading from "./shared/SectionHeading";
import { fadeUpItem, staggerContainer } from "./shared/variants";

const BEFORE = [
  "Escribir historias clínicas manualmente",
  "Llamadas constantes para coordinar turnos",
  "Estudios en papel",
  "Pacientes que olvidan sus turnos",
  "Procesos lentos y desconectados",
];

const AFTER = [
  "La IA redacta la evolución",
  "WhatsApp agenda automáticamente",
  "Estudios digitales, siempre a mano",
  "Recordatorios automáticos",
  "Todo integrado en un solo lugar",
];

export default function BeforeAfterSection() {
  return (
    <section className="dark-section py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Antes y después" title="El cambio se nota desde el primer día" dark />

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white/50">Antes</h3>
            <ul className="space-y-3">
              {BEFORE.map((item) => (
                <motion.li key={item} variants={fadeUpItem} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15">
                    <X className="h-3.5 w-3.5 text-red-400" />
                  </span>
                  <span className="text-white/70">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--brand)" }}>
              Después
            </h3>
            <ul className="space-y-3">
              {AFTER.map((item) => (
                <motion.li key={item} variants={fadeUpItem} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "color-mix(in srgb, var(--brand) 20%, transparent)" }}
                  >
                    <Check className="h-3.5 w-3.5" style={{ color: "var(--brand)" }} />
                  </span>
                  <span className="text-white">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
