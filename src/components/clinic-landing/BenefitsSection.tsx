// src/components/clinic-landing/BenefitsSection.tsx
import { Check } from "lucide-react";
import ScrollReveal from "./shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";

const BENEFITS = [
  "Atendé más pacientes",
  "Reducí tareas administrativas",
  "Automatizá turnos",
  "Mejorá la experiencia del paciente",
  "Toda la información en un solo lugar",
];

export default function BenefitsSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Beneficios" title="Menos gestión, más medicina" />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {BENEFITS.map((benefit, i) => (
            <ScrollReveal
              key={benefit}
              delay={i * 0.06}
              y={16}
              className={i === BENEFITS.length - 1 ? "sm:col-span-2" : undefined}
            >
              <div className="glass-card flex items-center gap-4 p-5">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "var(--brand)" }}
                >
                  <Check className="h-4.5 w-4.5 text-white" />
                </span>
                <p className="font-semibold text-foreground">{benefit}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
