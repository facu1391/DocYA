// src/components/software-landing/SoftwareSolutions.tsx
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";
import { solutions } from "./data";

export default function SoftwareSolutions() {
  return (
    <section id="software-soluciones" className="bg-[var(--sw-bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Soluciones" title="Soluciones que podemos construir" />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <ScrollReveal key={solution.title} delay={(index % 6) * 0.06}>
              <div className="flex h-full items-center gap-4 rounded-xl border border-[var(--sw-border)] bg-[var(--sw-bg2)] p-5 transition-colors duration-300 hover:border-[var(--sw-teal-30)]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--sw-deep)]/60">
                  <solution.icon size={18} className="text-[var(--sw-teal)]" />
                </div>
                <span className="text-sm font-medium leading-snug text-[var(--sw-text)]">
                  {solution.title}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-[var(--sw-subtle)]">
            Cada desarrollo se diseña según los procesos, permisos, volumen de usuarios y
            necesidades de seguridad del cliente.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
