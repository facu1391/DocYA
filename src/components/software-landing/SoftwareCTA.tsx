// src/components/software-landing/SoftwareCTA.tsx
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";

export default function SoftwareCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--sw-bg)] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_50%_0%,rgba(0,184,217,0.16),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-[var(--sw-border)] bg-[var(--sw-bg2)]/60 p-10 text-center sm:p-16">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--sw-text)] sm:text-4xl">
              ¿Tu cliente necesita algo que Atlassian no ofrece de forma estándar?
            </h2>
            <p className="mt-5 max-w-xl text-lg text-[var(--sw-subtle)]">
              Contanos el problema. Evaluaremos la viabilidad técnica y diseñaremos una
              solución adaptada a su entorno.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#software-contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--sw-blue)] to-[var(--sw-teal)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--sw-teal-30)] transition-all duration-300 hover:brightness-110"
              >
                Agendar una reunión
              </a>
              <a
                href="#software-contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--sw-border-strong)] bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--sw-text)] transition-all duration-300 hover:bg-white/10"
              >
                Enviar una consulta
              </a>
            </div>
            <p className="mt-6 text-xs text-[var(--sw-subtle)]">
              También trabajamos bajo acuerdos de confidencialidad y modalidad
              white-label.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
