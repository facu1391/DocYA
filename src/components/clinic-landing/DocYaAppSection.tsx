// src/components/clinic-landing/DocYaAppSection.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, Camera, FileText, FlaskConical, Pill, Video } from "lucide-react";
import PhoneFrame from "./shared/PhoneFrame";
import ScrollReveal from "./shared/ScrollReveal";
import { fadeUpItem, staggerContainer } from "./shared/variants";

const APP_CARDS = [
  { icon: Calendar, label: "Próximos turnos" },
  { icon: FileText, label: "Historia clínica" },
  { icon: Pill, label: "Recetas" },
  { icon: FlaskConical, label: "Estudios médicos" },
  { icon: Camera, label: "Subir estudios antes de la consulta" },
  { icon: Video, label: "Teleconsultas" },
];

const FLOATING = [
  { icon: Calendar, label: "Turno confirmado", cls: "-left-8 top-4" },
  { icon: Pill, label: "Receta lista", cls: "-right-10 top-1/3" },
  { icon: FileText, label: "Historia al día", cls: "-left-4 bottom-6" },
];

export default function DocYaAppSection() {
  return (
    <section className="dark-section py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <ScrollReveal>
            <span className="badge-trusted">DocYa App</span>
            <h2 className="section-title mt-4 text-white">
              Tus pacientes también forman parte del ecosistema
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Mientras el médico usa <strong className="text-white">DocYa Clinic</strong>, el paciente usa{" "}
              <strong className="text-white">DocYa App</strong>. Toda la información se sincroniza
              automáticamente entre las dos plataformas, sin que nadie tenga que hacer nada.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {APP_CARDS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-white/70">
                  <Icon className="h-4 w-4 shrink-0" style={{ color: "var(--brand)" }} />
                  {label}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="relative mx-auto flex justify-center py-4">
            <PhoneFrame>
              <motion.div
                variants={staggerContainer(0.12, 0.2)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex h-full flex-col gap-2.5 p-4 pt-9"
              >
                {APP_CARDS.map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    variants={fadeUpItem}
                    className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "color-mix(in srgb, var(--brand) 14%, transparent)" }}
                    >
                      <Icon className="h-4 w-4" style={{ color: "var(--brand)" }} />
                    </span>
                    <span className="text-xs font-medium leading-tight text-slate-700">{label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </PhoneFrame>

            <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
              {FLOATING.map(({ icon: Icon, label, cls }, i) => (
                <motion.div
                  key={label}
                  className={`floating-card ${cls}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                >
                  <motion.span
                    className="flex items-center gap-2"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    <Icon className="h-4 w-4" style={{ color: "var(--brand)" }} />
                    {label}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
