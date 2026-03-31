// src/components/landing-public/nueva-landing/DocYaProCTA.tsx
import { Stethoscope, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function DocYaProCTA() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <ScrollReveal>
          <div
            className="glass-card relative flex flex-wrap items-center justify-between gap-8 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,184,166,0.1) 0%, rgba(10,230,199,0.05) 100%)",
              borderColor: "rgba(20,184,166,0.3)",
            }}
          >
            <div
              className="pointer-events-none absolute left-[-20%] top-[-50%] h-96 w-96 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(20,184,166,0.4) 0%, transparent 70%)",
                filter: "blur(50px)",
                zIndex: 0,
              }}
            />

            <div className="relative z-10">
              <span
                className="badge mb-4 inline-flex"
                style={{
                  borderColor: "#14B8A6",
                  color: "#14B8A6",
                  background: "rgba(20,184,166,0.1)",
                }}
              >
                <Stethoscope size={16} />
                Profesionales
              </span>

              <h3 className="mb-2 text-4xl font-bold leading-tight">
                ¿Sos médico o enfermero?
              </h3>

              <p className="text-text-muted max-w-lg text-lg">
                Descubrí DocYa Pro, atendé pacientes a domicilio y ganá más con total
                flexibilidad y libertad de horarios.
              </p>
            </div>

            <div className="relative z-10">
              <a
                href="/profesionales"
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #14B8A6, #0AE6C7)",
                  color: "#000",
                  boxShadow: "0 4px 15px rgba(20,184,166,0.3)",
                }}
              >
                Conocé DocYa Pro
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}