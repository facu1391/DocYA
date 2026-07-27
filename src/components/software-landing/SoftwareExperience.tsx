// src/components/software-landing/SoftwareExperience.tsx
import { Compass, Boxes, Server, Workflow, BrainCircuit, Building2 } from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";

const areas = [
  { icon: Compass, title: "Consultoría Atlassian", description: "Experiencia en consultoría Atlassian." },
  {
    icon: Boxes,
    title: "Jira y JSM",
    description: "Conocimiento profundo de Jira y Jira Service Management.",
  },
  { icon: Server, title: "Backend y APIs", description: "Desarrollo backend y APIs robustas." },
  { icon: Workflow, title: "Automatización", description: "Automatización de procesos complejos." },
  {
    icon: BrainCircuit,
    title: "Inteligencia artificial",
    description: "Inteligencia artificial aplicada a procesos reales.",
  },
  {
    icon: Building2,
    title: "Procesos empresariales",
    description: "Comprensión de procesos empresariales y soporte.",
  },
];

export default function SoftwareExperience() {
  return (
    <section className="bg-[var(--sw-bg2)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experiencia"
          title="Conocimiento técnico y visión funcional"
          description="Docya Software combina experiencia en consultoría Atlassian, desarrollo backend, automatización de procesos e inteligencia artificial aplicada, con una comprensión real de los procesos empresariales y de soporte."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => (
            <ScrollReveal key={area.title} delay={(index % 3) * 0.1}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-[var(--sw-border)] bg-[var(--sw-bg)] p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--sw-deep)]/60">
                  <area.icon size={18} className="text-[var(--sw-teal)]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--sw-text)]">{area.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--sw-subtle)]">
                    {area.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
