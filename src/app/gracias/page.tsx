import Link from "next/link";
import { PartyPopper, MailCheck, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "¡Gracias! | DocYa Pro",
  description: "Recibimos tu postulación. Te contactamos a la brevedad.",
};

export default function Gracias() {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      {/* Hero */}
      <section className="border-b border-[var(--nav-border)] relative">
        <div className="absolute inset-0 pointer-events-none brand-glow" />
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="badge">Postulación enviada</span>
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-semibold inline-flex items-center justify-center gap-3">
              ¡Gracias por postularte!
              <PartyPopper className="h-7 w-7 text-[var(--brand)]" />
            </h1>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Recibimos tu información. Te vamos a escribir al email que nos dejaste para coordinar
              los próximos pasos.
            </p>
          </div>
        </div>
      </section>

      {/* Próximos pasos + CTAs */}
      <section className="container py-10 md:py-14">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          <article className="surface rounded-2xl p-6 border">
            <MailCheck className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">Confirmación por email</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Si no lo ves en unos minutos, revisá <strong>Spam</strong> o <strong>Promociones</strong>.
            </p>
          </article>

          <article className="surface rounded-2xl p-6 border">
            <Clock className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">Validación de datos</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Verificamos matrícula, zona de cobertura y disponibilidad declarada.
            </p>
          </article>

          <article className="surface rounded-2xl p-6 border">
            <ArrowRight className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">Próximo paso</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Te enviaremos acceso a la app de profesionales y los pasos para activar tu cuenta.
            </p>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/faqs" className="btn-outline-primary">
            Ver FAQs
          </Link>
          <Link href="/ingresos" className="btn-primary">
            Ver calculadora de ingresos
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          ¿Tenés una urgencia con tu registro? Escribinos a{" "}
          <a href="mailto:soporte@docya.com.ar" className="link-primary">
            soporte@docya.com.ar
          </a>.
        </p>
      </section>
    </main>
  );
}
