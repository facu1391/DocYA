// src/components/clinic-landing/DocYaAppSection.tsx
"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Camera,
  ClipboardList,
  FileText,
  FlaskConical,
  FolderOpen,
  HeartPulse,
  Moon,
  Pill,
  Video,
} from "lucide-react";
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
                className="flex h-full flex-col bg-gradient-to-b from-white via-[#fbfffd] to-[#edf9f6]"
              >
                <div className="flex items-center justify-between px-6 pb-3 pt-5 text-sm font-black text-slate-950">
                  <span>9:21</span>
                  <span className="rounded-full bg-slate-950 px-2 py-0.5 text-[10px] text-white">75</span>
                </div>

                <motion.div variants={fadeUpItem} className="flex items-center justify-between px-6">
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg shadow-teal-500/20" style={{ background: "var(--brand)" }}>
                      <HeartPulse className="h-6 w-6" />
                    </span>
                    <div className="leading-none">
                      <p className="text-[22px] font-black tracking-[-0.04em] text-slate-900">DocYa</p>
                      <p className="mt-0.5 rounded-sm px-1.5 py-0.5 text-center text-[8px] font-black uppercase tracking-[0.34em] text-white" style={{ background: "var(--brand)" }}>
                        App
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-base font-black text-slate-900 shadow-xl shadow-slate-900/10">
                      M
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-lg">
                      <Moon className="h-4 w-4" />
                    </span>
                  </div>
                </motion.div>

                <motion.div variants={fadeUpItem} className="px-6 pt-8">
                  <h3 className="text-[32px] font-black leading-[0.98] tracking-[-0.05em] text-slate-950">
                    Buenas noches,<br />
                    <span style={{ color: "var(--brand)" }}>Martin!</span>
                  </h3>
                  <p className="mt-5 max-w-[190px] text-[15px] font-bold leading-relaxed text-slate-500">
                    Tenes tu salud y tus turnos siempre a mano.
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeUpItem}
                  className="mx-5 mt-7 rounded-[2rem] border border-teal-200/70 bg-white/78 p-5 shadow-[0_24px_70px_rgba(20,184,166,.14)]"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl shadow-teal-500/25" style={{ background: "var(--brand)" }}>
                    <Calendar className="h-7 w-7" />
                  </span>
                  <p className="mt-6 text-[22px] font-black leading-tight tracking-[-0.04em] text-slate-950">
                    Tenes un turno
                  </p>
                  <p className="text-[22px] font-black leading-tight tracking-[-0.04em] text-slate-950">
                    <span style={{ color: "var(--brand)" }}>manana</span> a las{" "}
                    <span style={{ color: "var(--brand)" }}>11:00</span>
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-black shadow-lg" style={{ color: "var(--brand)" }}>
                      DG
                    </span>
                    <div>
                      <p className="text-[13px] font-black leading-tight text-slate-950">Dra. Guada Murcia</p>
                      <p className="mt-0.5 text-[11px] font-bold text-slate-500">Profesional vinculado</p>
                    </div>
                  </div>
                  <div className="mt-5 rounded-full px-5 py-3 text-center text-base font-black text-white shadow-lg shadow-teal-500/20" style={{ background: "var(--brand)" }}>
                    Ver turno
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUpItem}
                  className="mt-auto grid grid-cols-5 border-t border-slate-200/80 bg-white/92 px-3 pb-4 pt-3"
                >
                  {[
                    { icon: HeartPulse, label: "Inicio", active: true },
                    { icon: Calendar, label: "Turnos" },
                    { icon: FileText, label: "Docs" },
                    { icon: ClipboardList, label: "Historia" },
                    { icon: FolderOpen, label: "Estudios" },
                  ].map(({ icon: Icon, label, active }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 text-[9px] font-black"
                      style={{ color: active ? "var(--brand)" : "#64748b" }}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                      {active && <span className="h-1 w-7 rounded-full" style={{ background: "var(--brand)" }} />}
                    </div>
                  ))}
                </motion.div>
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
