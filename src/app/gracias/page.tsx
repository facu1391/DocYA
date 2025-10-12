
import Link from "next/link";
import { PartyPopper, MailCheck, Clock, ArrowRight } from "lucide-react";
import ConfettiCelebration from "@/components/utils/ConfettiCelebration";

export const metadata = {
  title: "¡Gracias! | DocYa Pro",
  description:
    "Registro enviado. Revisá tu correo para activar tu cuenta. Te avisaremos del lanzamiento.",
};

export default function Gracias({
  searchParams,
}: {
  searchParams: { celebra?: string };
}) {
  const fire = searchParams?.celebra === "1";

  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      {/* Dispara confetti si venís de registro exitoso */}
      <ConfettiCelebration fire={fire} />

      {/* Hero */}
      <section className="border-b border-[var(--nav-border)] relative">
        <div className="absolute inset-0 pointer-events-none brand-glow" />
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="badge">Registro enviado</span>
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-semibold inline-flex items-center justify-center gap-3">
              ¡Gracias por registrarte!
              <PartyPopper className="h-7 w-7 text-[var(--brand)]" />
            </h1>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              <strong>Revisá tu correo para activar tu cuenta</strong>. Si no ves el mensaje en unos minutos,
              mirá en <strong>Spam</strong> o <strong>Promociones</strong>. Te avisaremos cuando sea el
              lanzamiento para que empieces a atender con DocYa Pro.
            </p>
          </div>
        </div>
      </section>

      {/* Próximos pasos + CTAs (tu contenido actual) */}
      <section className="container py-10 md:py-14">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          <article className="surface rounded-2xl p-6 border">
            <MailCheck className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">Activá tu cuenta</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Abrí el email de <strong>confirmación</strong> y seguí el enlace para activar tu usuario.
              Si no llega, revisá <strong>Spam</strong>/<strong>Promociones</strong>.
            </p>
          </article>

          <article className="surface rounded-2xl p-6 border">
            <Clock className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">Validación de datos</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Verificamos <strong>matrícula</strong>, <strong>DNI</strong> y <strong>zona</strong>.
              Te contactaremos si necesitamos algo más.
            </p>
          </article>

          <article className="surface rounded-2xl p-6 border">
            <ArrowRight className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">Siguiente paso</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Te avisaremos por email cuando <strong>lancemos</strong> para que ingreses a la app
              de profesionales y completes la activación final.
            </p>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/faqs" className="btn-outline-primary">Ver FAQs</Link>
          <Link href="/ingresos" className="btn-primary">Ver calculadora de ingresos</Link>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          ¿Tenés una urgencia con tu registro? Escribinos a{" "}
          <a href="mailto:soporte@docya.com.ar" className="link-primary">soporte@docya.com.ar</a>.
        </p>
      </section>
    </main>
  );
}
