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
    className: "lg:col-span-4",
    featured: true,
  },
  {
    icon: FileHeart,
    title: "Recetas médicas digitales",
    description:
      "Recibí tu receta médica digital después de la consulta, cuando corresponda.",
    badge: null,
    className: "lg:col-span-4",
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
    className: "lg:col-span-6",
    featured: false,
  },
  {
    icon: FolderHeart,
    title: "Todo guardado en DocYa",
    description:
      "Tu historial de consultas, recetas, certificados y órdenes médicas queda organizado y disponible desde tu cuenta para que puedas consultarlo cuando lo necesites.",
    badge: null,
    className: "lg:col-span-6",
    featured: true,
  },
] as const;

export default function ConsultaCompletaSection() {
  return (
    <section
      aria-labelledby="consulta-completa-title"
      className="py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <ScrollReveal className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
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

        <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-12">
          {benefits.map(({ icon: Icon, title, description, badge, className, featured }, index) => (
            <ScrollReveal key={title} delay={index * 0.06} className={className}>
              <article
                className={`group flex h-full items-start gap-4 border-t py-6 md:gap-5 md:py-7 ${
                  featured ? "border-[var(--brand)]/40" : "border-border/70"
                }`}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-[var(--brand)] transition-transform duration-300 group-hover:scale-105"
                  style={{ background: "rgba(10, 230, 199, 0.1)" }}
                >
                  <Icon size={24} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold leading-snug text-foreground md:text-xl">
                      {title}
                    </h3>
                    {badge && (
                      <span className="badge-trusted shrink-0">
                        <QrCode size={13} aria-hidden />
                        {badge}
                      </span>
                    )}
                  </div>
                  <p className="m-0 text-sm leading-relaxed text-text-muted md:text-base">
                    {description}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.18} className="mt-5 border-t border-border/70 pt-8 text-center md:mt-8 md:pt-10">
          <div>
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
