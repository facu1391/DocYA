// src/components/landing-public/nueva-landing/BeneficiosSection.tsx
import { Bot, Home, Map, Zap, ShieldCheck, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const items = [
  { icon: Bot, label: "IA médica GRATIS integrada" },
  { icon: Home, label: "Atención domiciliaria real" },
  { icon: Map, label: "Geolocalización inteligente" },
  { icon: Zap, label: "Asignación automática del profesional más cercano" },
  { icon: ShieldCheck, label: "Profesionales verificados" },
  { icon: Star, label: "Sistema de calificación" },
];

export default function BeneficiosSection() {
  return (
    <section id="beneficios" className="py-32 text-center">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <ScrollReveal>
          <h2 className="section-title mb-16 text-center">
            ¿Por qué DocYa es{" "}
            <span className="highlight-text">diferente</span>?
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, label }, i) => (
            <ScrollReveal key={label} delay={i * 0.08}>
              <div className="glass-card flex h-full cursor-default flex-col items-center p-8 text-center hover:-translate-y-2">
                <div
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(10, 230, 199, 0.1)", color: "var(--primary)" }}
                >
                  <Icon size={32} />
                </div>
                <h4 className="text-lg font-bold leading-snug">{label}</h4>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}