// src/components/software-landing/SoftwareProblems.tsx
import { Workflow, Plug2, LineChart, CodeXml } from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";

const problems = [
  {
    icon: Workflow,
    title: "Procesos específicos que Jira no cubre",
    description:
      "Flujos particulares de cada organización que exceden la configuración estándar disponible.",
  },
  {
    icon: Plug2,
    title: "Integraciones con sistemas internos",
    description:
      "Necesidad de conectar Atlassian con ERPs, CRMs y plataformas propias sin una solución nativa.",
  },
  {
    icon: LineChart,
    title: "Reportes y métricas insuficientes",
    description:
      "Falta de visibilidad ejecutiva sobre SLA, tiempos de respuesta y cumplimiento por cliente o equipo.",
  },
  {
    icon: CodeXml,
    title: "Equipos Atlassian sin capacidad de desarrollo Forge",
    description:
      "Consultoras y equipos internos que detectan la necesidad, pero no cuentan con desarrolladores disponibles.",
  },
];

export default function SoftwareProblems() {
  return (
    <section className="bg-[var(--sw-bg2)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="El desafío"
          title="Cuando las funciones estándar no alcanzan"
          description="Muchas empresas necesitan procesos que no pueden resolverse únicamente con la configuración nativa de Jira."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <ScrollReveal key={problem.title} delay={index * 0.1}>
              <div className="h-full rounded-2xl border border-[var(--sw-border)] bg-[var(--sw-bg)] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--sw-deep)]/60">
                  <problem.icon size={20} className="text-[var(--sw-teal)]" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-[var(--sw-text)]">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sw-subtle)]">
                  {problem.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="mx-auto mt-16 max-w-3xl text-center text-xl font-medium text-[var(--sw-text)]">
            Docya Software convierte esas necesidades en aplicaciones seguras,
            mantenibles y adaptadas al proceso real de cada organización.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
