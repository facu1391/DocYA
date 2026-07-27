// src/components/software-landing/SoftwareServices.tsx
import { Check } from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";
import { services } from "./data";

export default function SoftwareServices() {
  return (
    <section id="software-servicios" className="bg-[var(--sw-bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Servicios" title="Desarrollo especializado para Atlassian" />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={(index % 2) * 0.1}>
              <article className="group h-full rounded-2xl border border-[var(--sw-border)] bg-[var(--sw-bg2)] p-8 transition-all duration-300 hover:border-[var(--sw-teal-30)] hover:bg-white/[0.04]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--sw-deep)]/50 transition-colors duration-300 group-hover:bg-[var(--sw-deep)]">
                  <service.icon size={22} className="text-[var(--sw-teal)]" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[var(--sw-text)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--sw-subtle)]">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-[var(--sw-border)] pt-6">
                  {service.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-start gap-2.5 text-sm text-[var(--sw-subtle)]"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-[var(--sw-blue)]" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
