// src/components/software-landing/SoftwareCommercialModels.tsx
import { Package, RefreshCcw, Users } from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";

const models = [
  {
    icon: Package,
    title: "Proyecto cerrado",
    description:
      "Para desarrollos con alcance y entregables definidos. Incluye análisis, desarrollo, pruebas e implementación.",
  },
  {
    icon: RefreshCcw,
    title: "Desarrollo más suscripción",
    description:
      "Pago inicial por construcción y una licencia mensual o anual por uso, mantenimiento y actualizaciones.",
  },
  {
    icon: Users,
    title: "Equipo dedicado",
    description:
      "Bolsa de horas o capacidad mensual para partners y empresas con necesidades recurrentes.",
  },
];

export default function SoftwareCommercialModels() {
  return (
    <section className="bg-[var(--sw-bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Modelo comercial" title="Modalidades flexibles para cada proyecto" />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {models.map((model, index) => (
            <ScrollReveal key={model.title} delay={index * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-[var(--sw-border)] bg-[var(--sw-bg2)] p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--sw-deep)]/60">
                  <model.icon size={20} className="text-[var(--sw-teal)]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[var(--sw-text)]">{model.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--sw-subtle)]">
                  {model.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <a
              href="#software-contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--sw-blue)] to-[var(--sw-teal)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--sw-teal-30)] transition-all duration-300 hover:brightness-110"
            >
              Solicitar una propuesta
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
