// src/components/software-landing/SoftwareTechnology.tsx
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";
import { technologies } from "./data";

export default function SoftwareTechnology() {
  return (
    <section className="bg-[var(--sw-bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Tecnología" title="Tecnología preparada para entornos empresariales" />

        <ScrollReveal delay={0.15}>
          <ul className="mt-14 flex flex-wrap justify-center gap-3">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-[var(--sw-border)] bg-[var(--sw-bg2)] px-5 py-2.5 text-sm font-medium text-[var(--sw-subtle)] transition-colors duration-300 hover:border-[var(--sw-teal-30)] hover:text-[var(--sw-text)]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
