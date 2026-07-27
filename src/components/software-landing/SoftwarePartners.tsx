// src/components/software-landing/SoftwarePartners.tsx
import { Tag, Handshake } from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";

const whiteLabel = [
  "El partner conserva la relación comercial.",
  "Docya Software trabaja como equipo técnico externo.",
  "El desarrollo puede presentarse bajo la marca del partner.",
  "Comunicación y alcance definidos previamente.",
  "Confidencialidad y acuerdos comerciales.",
];

const coDevelopment = [
  "Participación conjunta en reuniones técnicas.",
  "Análisis funcional y técnico.",
  "Desarrollo colaborativo.",
  "Documentación y transferencia de conocimiento.",
  "Soporte después de la implementación.",
];

export default function SoftwarePartners() {
  return (
    <section id="software-partners" className="relative overflow-hidden bg-[var(--sw-bg2)] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-[var(--sw-blue-10)] blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Para Atlassian Solution Partners"
          title="Tu equipo de desarrollo Forge, sin ampliar tu estructura"
          description="Ayudamos a consultoras y Atlassian Solution Partners a entregar desarrollos personalizados para sus clientes, incluso cuando no cuentan con desarrolladores internos disponibles."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <div className="h-full rounded-2xl border border-[var(--sw-border)] bg-[var(--sw-bg)] p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--sw-deep)]/60">
                <Tag size={20} className="text-[var(--sw-teal)]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[var(--sw-text)]">White-label</h3>
              <ul className="mt-6 space-y-3">
                {whiteLabel.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--sw-subtle)]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sw-teal)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="h-full rounded-2xl border border-[var(--sw-border)] bg-[var(--sw-bg)] p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--sw-deep)]/60">
                <Handshake size={20} className="text-[var(--sw-teal)]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[var(--sw-text)]">Co-development</h3>
              <ul className="mt-6 space-y-3">
                {coDevelopment.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--sw-subtle)]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sw-teal)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br from-[var(--sw-blue)] to-[var(--sw-teal)] p-10 text-center sm:p-12">
            <p className="max-w-2xl text-2xl font-bold text-white sm:text-3xl">
              Vos detectás la oportunidad. Nosotros construimos la solución.
            </p>
            <a
              href="#software-contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
            >
              Quiero trabajar con Docya Software
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
