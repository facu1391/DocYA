// src/components/clinic-landing/partner/PartnerDashboardSection.tsx
import {
  LayoutDashboard,
  Wallet,
  UserPlus,
  KeyRound,
  ListChecks,
  History,
} from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";
import SectionHeading from "../shared/SectionHeading";
import { PARTNER_ANCHORS } from "./anchors";

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Estado de cada médico",
    text: "En prueba, por vencer, pago pendiente, activo o suspendido: sabés en qué punto está cada consultorio que sumaste.",
  },
  {
    icon: Wallet,
    title: "Tus comisiones",
    text: "Mirá cada comisión generada y su estado: pendiente, aprobada o pagada. Sin planillas aparte.",
  },
  {
    icon: UserPlus,
    title: "Alta de médicos en minutos",
    text: "Cargás los datos del médico y le das de alta la prueba gratuita de DocYa Clinic al instante, desde el mismo panel.",
  },
  {
    icon: KeyRound,
    title: "Reenvío de acceso",
    text: "¿El médico perdió sus credenciales? Se las reenviás con un click, sin escribirle a soporte.",
  },
  {
    icon: ListChecks,
    title: "Seguimiento de leads",
    text: "Cargá médicos interesados como leads y convertilos a prueba cuando estén listos, sin perder el hilo.",
  },
  {
    icon: History,
    title: "Historial de actividad",
    text: "Cada alta, reenvío y conversión queda registrado por consultorio, para que tengas trazabilidad completa.",
  },
];

export default function PartnerDashboardSection() {
  return (
    <section id={PARTNER_ANCHORS.tuPlataforma} className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Tu plataforma"
          title="Todo tu trabajo de Partner, en un solo panel"
          subtitle="Sin depender de nadie para saber en qué está cada médico que sumaste."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <ScrollReveal key={title} delay={(i % 3) * 0.08} y={16}>
              <div className="glass-card group h-full p-6">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "var(--brand)" }} />
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
