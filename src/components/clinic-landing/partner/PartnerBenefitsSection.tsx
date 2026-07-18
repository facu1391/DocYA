// src/components/clinic-landing/partner/PartnerBenefitsSection.tsx
import { Check } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";
import SectionHeading from "../shared/SectionHeading";

const BENEFITS = [
  "Sin costo ni inversión para vos",
  "No necesitás vender software: el médico prueba solo",
  "Vos elegís a qué médicos sumar",
  "DocYa te da soporte para cerrar cada consultorio",
  "Todo el seguimiento en un solo panel",
  "Cobrás mientras el médico siga siendo cliente",
];

export default function PartnerBenefitsSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Beneficios" title="Menos venta, más resultado" />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {BENEFITS.map((benefit, i) => (
            <ScrollReveal key={benefit} delay={i * 0.06} y={16}>
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
