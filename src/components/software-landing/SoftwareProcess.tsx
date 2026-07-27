// src/components/software-landing/SoftwareProcess.tsx
import { Search, PenTool, Code2, ShieldCheck, Rocket } from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";

const steps = [
  { icon: Search, title: "Descubrimiento", description: "Analizamos el proceso, los usuarios y el problema actual." },
  {
    icon: PenTool,
    title: "Diseño de solución",
    description: "Definimos alcance, arquitectura, experiencia de usuario y estimación.",
  },
  {
    icon: Code2,
    title: "Desarrollo",
    description:
      "Construimos la aplicación usando Forge, APIs Atlassian y servicios externos cuando sea necesario.",
  },
  {
    icon: ShieldCheck,
    title: "Validación",
    description: "Probamos permisos, seguridad, rendimiento y funcionamiento con casos reales.",
  },
  {
    icon: Rocket,
    title: "Implementación y soporte",
    description: "Instalamos la solución, documentamos su uso y ofrecemos mantenimiento continuo.",
  },
];

export default function SoftwareProcess() {
  return (
    <section id="software-proceso" className="bg-[var(--sw-bg2)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Proceso" title="Del problema a una solución lista para usar" />

        <ol className="relative mt-16 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
          <div
            aria-hidden="true"
            className="absolute left-0 top-6 hidden h-px w-full bg-gradient-to-r from-transparent via-[var(--sw-border-strong)] to-transparent lg:block"
          />
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.1}>
              <li className="relative flex flex-col items-start gap-4 lg:items-center lg:text-center">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--sw-teal-30)] bg-[var(--sw-bg)] text-[var(--sw-teal)]">
                  <step.icon size={20} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--sw-teal)]">
                    Paso {index + 1}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-[var(--sw-text)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sw-subtle)]">
                    {step.description}
                  </p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
