import Image from "next/image";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const institutions = [
  {
    title: "Registro institucional",
    description:
      "DocYa se encuentra registrada en el Ministerio de Salud de la Nacion (ID 0259).",
    logo:
      "https://res.cloudinary.com/dqsacd9ez/image/upload/v1776466341/Dise%C3%B1o_sin_t%C3%ADtulo_31_zqxiuz.png",
    alt: "Logo del Ministerio de Salud de la Nacion",
    icon: BadgeCheck,
    imageClassName: "h-16 w-auto md:h-20",
  },
  {
    title: "Validacion profesional",
    description: "Todos nuestros profesionales estan validados en SISA.",
    logo:
      "https://res.cloudinary.com/dqsacd9ez/image/upload/v1775043651/logosisa_dxtx66.png",
    alt: "Logo de SISA",
    icon: ShieldCheck,
    imageClassName: "h-14 w-auto md:h-16",
  },
];

export default function InstitutionalSupportSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 pointer-events-none brand-glow" />
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="badge-trusted mx-auto mb-4 w-fit">
              <ShieldCheck size={16} />
              Confianza institucional
            </div>
            <h2 className="section-title mb-4">
              Respaldo para pacientes y{" "}
              <span className="highlight-text">profesionales</span>
            </h2>
            <p className="text-text-muted text-lg leading-relaxed md:text-xl">
              Sumamos tecnologia, trazabilidad y procesos de validacion para que
              cada atencion tenga respaldo real.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {institutions.map(
            ({ title, description, logo, alt, icon: Icon, imageClassName }, index) => (
              <ScrollReveal key={title} delay={index * 0.1}>
                <article className="glass-card h-full p-8 md:p-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand)]/10 text-[var(--brand)]">
                    <Icon size={28} />
                  </div>
                  <div className="mb-6 rounded-2xl border border-border/70 bg-white/85 px-6 py-5 shadow-sm dark:bg-white">
                    <Image
                      src={logo}
                      alt={alt}
                      width={320}
                      height={120}
                      className={`${imageClassName} object-contain`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{title}</h3>
                  <p className="text-text-muted mt-3 text-base leading-7 md:text-lg">
                    {description}
                  </p>
                </article>
              </ScrollReveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
