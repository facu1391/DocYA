"use client";

import { motion } from "framer-motion";
import {
  Pill,
  Clock,
  CheckCircle,
  History,
  Stethoscope,
  ChevronRight,
  Check,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  { icon: Pill, text: "Agregá tus medicamentos fácilmente desde la app" },
  { icon: Stethoscope, text: "El médico puede cargar tu tratamiento durante la consulta" },
  { icon: Clock, text: "Recibí recordatorios automáticos en el momento exacto" },
  { icon: CheckCircle, text: "Marcá cada dosis como tomada" },
  { icon: History, text: "Historial completo de tu tratamiento" },
];

export default function PastilleroSection() {
  return (
    <section id="pastillero" className="relative overflow-hidden py-32 text-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
        }}
      />

      <div className="absolute right-0 top-0 z-0 h-96 w-96 rounded-full bg-[#14B8A6]/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 z-0 h-96 w-96 rounded-full bg-[#14B8A6]/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <ScrollReveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#14B8A6]/20 px-3 py-1.5 text-sm font-semibold text-[#14B8A6]">
                <Pill size={16} />
                <span>Pastillero Digital</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
                No te olvides nunca más de <span className="text-[#14B8A6]">tu medicación</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mb-8 max-w-lg text-xl text-gray-300">
                DocYa te acompaña en cada paso de tu tratamiento. Llevá un seguimiento simple, seguro y con recordatorios precisos.
              </p>
            </ScrollReveal>

            <div className="mb-10 flex flex-col gap-4">
              {features.map(({ icon: Icon, text }, i) => (
                <ScrollReveal key={text} delay={0.3 + i * 0.05}>
                  <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#14B8A6]/20 text-[#14B8A6]">
                      <Icon size={20} />
                    </div>
                    <p className="mt-1.5 font-medium text-gray-200">{text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.6}>
              <div className="mb-10 rounded-2xl border border-[#14B8A6]/20 bg-gradient-to-r from-[#14B8A6]/10 to-transparent p-6 backdrop-blur-md">
                <div className="mb-2 flex items-center gap-3">
                  <Stethoscope className="text-[#14B8A6]" size={24} />
                  <h4 className="text-lg font-bold">También durante tu consulta</h4>
                </div>
                <p className="text-sm text-gray-300">
                  El médico puede dejar indicada tu receta directamente en la app durante la consulta, y el sistema configurará los recordatorios automáticamente.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.7}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#descargar"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#14B8A6] px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-[#119e8e] hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                >
                  Empezar a usar DocYa
                  <ChevronRight size={20} />
                </a>
                <a
                  href="#consulta"
                  className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Solicitar médico
                </a>
              </div>
            </ScrollReveal>
          </div>

          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative h-[680px] w-[300px] sm:w-[340px]">
              <div className="absolute inset-0 z-10 flex flex-col overflow-hidden rounded-[45px] border-[10px] border-[#0F2027]/80 bg-[#0A1215] pt-10 shadow-2xl">
                <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-[#0F2027]/80" />

                <div className="border-b border-white/5 bg-white/5 px-6 py-4 backdrop-blur-md">
                  <div className="text-sm font-medium text-gray-400">Mi Tratamiento</div>
                  <div className="mt-1 text-xl font-bold text-white">Hoy, Jueves 19</div>
                </div>

                <div className="relative flex flex-1 flex-col gap-4 overflow-hidden p-5">
                  <motion.div
                    className="rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0d7d71] p-5 shadow-lg shadow-[#14B8A6]/20"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                        <Clock size={16} />
                        14:00 (Ahora)
                      </div>
                      <Pill size={20} className="text-white" />
                    </div>
                    <div className="mb-1 text-lg font-bold text-white">Amoxicilina 500mg</div>
                    <div className="mb-4 text-sm text-white/80">1 comprimido - Con la comida</div>
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 font-bold text-[#14B8A6] shadow-sm transition-colors hover:bg-gray-50">
                      <Check size={18} />
                      Marcar como tomada
                    </button>
                  </motion.div>

                  <div className="pt-2">
                    <h5 className="mb-3 ml-1 text-sm font-semibold text-gray-400">Próximas dosis</h5>
                    <div className="flex flex-col gap-3">
                      {[
                        { time: "20:00", med: "Clonazepam 0.5mg", info: "1 comprimido" },
                        { time: "Mañana, 08:00", med: "Amoxicilina 500mg", info: "1 comprimido" },
                      ].map((item) => (
                        <div key={item.time} className="flex items-center rounded-xl border border-white/10 bg-white/5 p-3">
                          <div className="mr-3 flex h-12 w-12 flex-col items-center justify-center rounded-lg border border-white/5 bg-gray-800">
                            <span className="text-xs font-medium text-gray-400">
                              {item.time.split(",")[0] === "Mañana" ? "A.M." : item.time}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-200">{item.med}</div>
                            <div className="text-xs text-gray-500">{item.info}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -right-12 top-32 z-20 w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)] sm:-right-24 md:w-72"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                animate={{ y: [0, -8, 0] }}
              >
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#14B8A6]/10">
                    <Pill size={20} className="text-[#14B8A6]" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">DocYa</span>
                      <span className="text-xs text-gray-400">AHORA</span>
                    </div>
                    <div className="mb-0.5 text-sm font-bold text-gray-900">Recordatorio de medicación 💊</div>
                    <div className="text-sm text-gray-600">Es hora de tomar tu Amoxicilina 500mg.</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-10 bottom-32 z-20 rounded-2xl border border-[#14B8A6]/30 bg-[#1A2C34] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-md sm:-left-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                animate={{ y: [0, 8, 0] }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-green-500/30 bg-green-500/20">
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                  <div>
                    <div className="mb-0.5 text-sm font-bold text-white">Seguimiento Real</div>
                    <div className="text-xs text-[#14B8A6]">Adherencia del 100%</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <ScrollReveal delay={0.8} className="mt-28 border-t border-white/10 pt-16 text-center">
          <p className="text-3xl font-light italic text-gray-300">
            "DocYa no solo te atiende.{" "}
            <span className="relative inline-block font-bold text-white">
              Te cuida todos los días.
              <span className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-[#14B8A6]/50" />
            </span>
            "
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
