// src/components/clinic-landing/partner/PartnerEarningsSection.tsx
import { RefreshCw, ShieldCheck, Percent } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";
import SectionHeading from "../shared/SectionHeading";
import { PARTNER_ANCHORS } from "./anchors";

const POINTS = [
  {
    icon: RefreshCw,
    title: "Comisión recurrente, no un pago único",
    text: "Mientras el consultorio siga pagando su suscripción a DocYa Clinic, generás una comisión todos los meses. No es una recompensa por única vez.",
  },
  {
    icon: ShieldCheck,
    title: "DocYa cobra por vos",
    text: "No facturás ni perseguís pagos. DocYa gestiona el cobro al consultorio y te acredita la comisión automáticamente cuando se confirma cada pago.",
  },
  {
    icon: Percent,
    title: "Tu porcentaje se acuerda al sumarte",
    text: "Coordinamos tu comisión cuando te das de alta como Partner. Queda fija para vos y no cambia de forma retroactiva sobre lo ya generado.",
  },
];

export default function PartnerEarningsSection() {
  return (
    <section id={PARTNER_ANCHORS.comoGanas} className="dark-section scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Cómo ganás"
          title="Ganás mientras el médico siga siendo cliente"
          subtitle="No vendés software: sumás médicos y cobrás mientras ellos usan DocYa Clinic."
          dark
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, text }, i) => (
            <ScrollReveal key={title} delay={i * 0.1} y={16}>
              <div className="flex h-full flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "color-mix(in srgb, var(--brand) 16%, transparent)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "var(--brand)" }} />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
