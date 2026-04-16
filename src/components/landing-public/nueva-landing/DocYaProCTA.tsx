// src/components/landing-public/nueva-landing/DocYaProCTA.tsx
import { Stethoscope, ArrowRight, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function DocYaProCTA() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <ScrollReveal>
          <div className="relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl">
            {/* Background glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--brand)] opacity-20 blur-[80px]" />

            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-semibold tracking-wide text-white">
                  <Stethoscope size={14} className="text-[var(--brand)]" />
                  RED DOCYA PRO
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <ShieldCheck size={14} className="text-blue-400" /> Profesionales Verificados
                </span>
              </div>

              <h3 className="mb-4 text-3xl md:text-4xl font-bold leading-tight text-white">
                ¿Sos profesional de la salud?
              </h3>

              <p className="text-slate-300 max-w-lg text-lg">
                Únete a la plataforma tecnológica líder. Amplía tu base de pacientes, optimizá tus tiempos y gestioná tus consultas de forma segura con nuestras herramientas digitales exclusivas.
              </p>
            </div>

            <div className="relative z-10 w-full md:w-auto">
              <a
                href="/profesionales"
                className="inline-flex w-full md:w-auto items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-slate-900 transition-transform duration-300 hover:scale-105"
              >
                Conocé DocYa Pro
                <ArrowRight size={20} className="text-slate-900" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}