// src/components/clinic-landing/partner/PartnerHowItWorksSection.tsx
import { UserPlus, Sparkles, LineChart, Wallet } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";
import SectionHeading from "../shared/SectionHeading";
import { PARTNER_ANCHORS } from "./anchors";

const STEPS = [
  {
    icon: UserPlus,
    title: "Sumás al médico",
    text: "Cargás sus datos desde tu panel y le das de alta 5 días de prueba gratis en DocYa Clinic. No hace falta tarjeta ni pago.",
  },
  {
    icon: Sparkles,
    title: "Prueba sin fricción",
    text: "El médico recibe sus credenciales al instante y empieza a usar historia clínica con IA, turnos, WhatsApp y recetas digitales.",
  },
  {
    icon: LineChart,
    title: "Vos hacés seguimiento",
    text: "Tu panel te muestra el estado de cada médico: en prueba, por vencer, pago pendiente o ya activo como cliente.",
  },
  {
    icon: Wallet,
    title: "Se convierte y cobrás",
    text: "Cuando el consultorio empieza a pagar la suscripción, generás una comisión todos los meses que se mantenga como cliente.",
  },
];

export default function PartnerHowItWorksSection() {
  return (
    <section id={PARTNER_ANCHORS.comoFunciona} className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Así funciona"
          title="De sumar un médico a cobrar tu comisión"
          subtitle="Cuatro pasos. El resto — cobro, soporte y activación — lo maneja DocYa."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <ScrollReveal key={title} delay={i * 0.08} y={16}>
              <div className="glass-card h-full p-6">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                  >
                    <Icon className="h-5 w-5" style={{ color: "var(--brand)" }} />
                  </div>
                  <span className="text-sm font-bold" style={{ color: "var(--brand)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
