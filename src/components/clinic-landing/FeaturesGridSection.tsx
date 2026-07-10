// src/components/clinic-landing/FeaturesGridSection.tsx
import {
  Calendar,
  ClipboardList,
  FileCheck2,
  FileSignature,
  MessageCircle,
  Sparkles,
  Video,
  Wallet,
} from "lucide-react";
import ScrollReveal from "./shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";
import { ANCHORS } from "./shared/variants";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Historia Clínica IA",
    text: "Dictado por voz que se convierte en evolución clínica lista para firmar.",
  },
  {
    icon: Calendar,
    title: "Turnos",
    text: "Agenda inteligente con disponibilidad por profesional y recordatorios.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp IA",
    text: "Agenda, confirma y recuerda turnos automáticamente.",
  },
  {
    icon: Video,
    title: "Teleconsultas",
    text: "Video-consulta integrada con historia clínica y estudios en simultáneo.",
  },
  {
    icon: FileSignature,
    title: "Recetas Digitales",
    text: "Vademécum, firma digital y verificación por QR.",
  },
  {
    icon: FileCheck2,
    title: "Certificados",
    text: "Ausentismo, escolar y constancia de atención en segundos.",
  },
  {
    icon: ClipboardList,
    title: "Órdenes Médicas",
    text: "Laboratorio, imágenes y derivaciones con catálogos prearmados.",
  },
  {
    icon: Wallet,
    title: "Contabilidad",
    text: "Ingresos, egresos y liquidaciones sin planillas aparte.",
  },
];

export default function FeaturesGridSection() {
  return (
    <section id={ANCHORS.funcionalidades} className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Funcionalidades"
          title="Todo lo que necesita tu consultorio"
          subtitle="Sin planillas sueltas, sin apps separadas."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <ScrollReveal key={title} delay={(i % 4) * 0.06} y={16}>
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
