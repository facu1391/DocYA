import {
  ClipboardPlus,
  FileHeart,
  FolderHeart,
  QrCode,
  Stethoscope,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const benefits = [
  {
    icon: QrCode,
    title: "Certificados digitales con QR verificable",
    description:
      "Certificados laborales, escolares o de reposo emitidos por el profesional cuando corresponda. Incluyen QR para verificar su autenticidad online.",
    badge: "QR verificable",
    className: "md:col-span-2 lg:col-span-7",
    featured: true,
  },
  {
    icon: FileHeart,
    title: "Recetas médicas digitales",
    description:
      "Recibí tu receta médica digital después de la consulta, cuando corresponda.",
    badge: null,
    className: "lg:col-span-5",
    featured: false,
  },
  {
    icon: ClipboardPlus,
    title: "Órdenes médicas",
    description:
      "Si necesitás estudios o análisis, el profesional puede emitir la orden correspondiente.",
    badge: null,
    className: "lg:col-span-4",
    featured: false,
  },
  {
    icon: Stethoscope,
    title: "Evaluación médica y tratamiento",
    description:
      "Un médico evalúa tus síntomas, realiza el diagnóstico e indica el tratamiento que corresponda.",
    badge: null,
    className: "lg:col-span-4",
    featured: false,
  },
  {
    icon: FolderHeart,
    title: "Todo guardado en DocYa",
    description:
      "Tu historial de consultas, recetas, certificados y órdenes médicas queda organizado y disponible desde tu cuenta para que puedas consultarlo cuando lo necesites.",
    badge: null,
    className: "md:col-span-2 lg:col-span-4",
    featured: false,
  },
] as const;

export default function ConsultaCompletaSection() {
  return (
    <section
      aria-labelledby="consulta-completa-title"
      className="relative overflow-hidden border-y border-border/50 bg-secondary/30 py-20 md:py-28 dark:bg-secondary/10"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--brand)]/10 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <div className="badge-trusted mx-auto mb-5 w-fit">
            <Stethoscope size={16} aria-hidden />
            Atención médica completa
          </div>
          <h2 id="consulta-completa-title" className="section-title mb-4 text-center">
            Todo lo que podés resolver en una consulta
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">
            Atención médica completa, sin perder horas en una guardia.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {benefits.map(({ icon: Icon, title, description, badge, className, featured }, index) => (
            <ScrollReveal key={title} delay={index * 0.06} className={className}>
              <article
                className={`glass-card group flex h-full min-h-[220px] flex-col rounded-3xl p-6 transition-all md:p-7 ${
                  featured ? "border-[var(--brand)]/40 bg-[var(--brand)]/[0.07]" : ""
                }`}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand)]/12 text-[var(--brand)] transition-transform duration-300 group-hover:scale-105">
                    <Icon size={24} aria-hidden />
                  </div>
                  {badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--brand)]/35 bg-[var(--brand)]/12 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[var(--brand)]">
                      <QrCode size={14} aria-hidden />
                      {badge}
                    </span>
                  )}
                </div>
                <h3 className="mb-3 text-xl font-extrabold leading-tight text-foreground md:text-2xl">
                  {title}
                </h3>
                <p className="m-0 text-base leading-relaxed text-text-muted">
                  {description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.18} className="mt-8 md:mt-10">
          <div className="rounded-3xl border border-[var(--brand)]/25 bg-[var(--brand)]/[0.08] px-5 py-6 text-center md:px-8">
            <p className="m-0 text-xl font-extrabold text-foreground md:text-2xl">
              Una consulta. Todo resuelto. Todo en DocYa.
            </p>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-text-muted md:text-base">
              Diagnóstico · Recetas digitales · Certificados con QR · Órdenes médicas · Historial médico
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
