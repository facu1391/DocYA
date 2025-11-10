
// src/app/gracias/page.tsx
import Link from "next/link";
import { PartyPopper, MailCheck, Clock, ArrowRight } from "lucide-react";
import ConfettiCelebration from "@/components/utils/ConfettiCelebration";

export const metadata = {
  title: "¡Gracias!",
  description: "Registro enviado. Revisá tu correo para activar tu cuenta.",
  alternates: { canonical: "/gracias" },
  robots: { index: false, follow: false, nocache: true },
  openGraph: { title: "¡Gracias!", description: "Registro enviado.", url: "/gracias" },
};

// Next 15: searchParams es Promise<Record<string,string|string[]|undefined>>
type SP = Record<string, string | string[] | undefined>;

export default async function Gracias({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;

  // confetti on success (?celebra=1)
  const celebra = sp?.celebra;
  const fire =
    (typeof celebra === "string" && celebra === "1") ||
    (Array.isArray(celebra) && celebra.includes("1"));

  // modo audiencia (?aud=paciente | pro)
  const audParam = sp?.aud;
  const isPaciente =
    (typeof audParam === "string" && audParam.toLowerCase() === "paciente") ||
    (Array.isArray(audParam) && audParam.map((s) => s.toLowerCase()).includes("paciente"));

  // Textos por audiencia (default = profesionales)
  const copy = isPaciente
    ? {
        badge: "Registro enviado",
        p1: (
          <>
            <strong>Revisá tu correo para activar tu cuenta</strong>. Si no ves el mensaje en
            unos minutos, mirá en <strong>Spam</strong> o <strong>Promociones</strong>. Una vez
            activada, ya podés usar DocYa para solicitar atención.
          </>
        ),
        c1_t: "Activá tu cuenta",
        c1_p: (
          <>
            Abrí el email de <strong>confirmación</strong> y seguí el enlace para activar tu
            usuario. Si no llega, revisá <strong>Spam</strong>/<strong>Promociones</strong>.
          </>
        ),
        c2_t: "Validación de datos",
        c2_p: (
          <>
            Verificamos tus <strong>datos básicos</strong> y tu <strong>zona de cobertura</strong>.
            Si necesitamos algo, nos contactamos por email.
          </>
        ),
        c3_t: "Siguiente paso",
        c3_p: (
          <>
            Luego de activar el correo, podés volver al inicio para conocer más y descargar la app
            cuando esté disponible en tu zona.
          </>
        ),
        // 👇 Solo “Volver al inicio” (sin “Ver FAQs”)
        ctas: (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="btn-primary">Volver al inicio</Link>
          </div>
        ),
        help: (
          <>
            ¿Necesitás ayuda con tu registro? Escribinos a{" "}
            <a href="mailto:soporte@docya.com.ar" className="link-primary">
              soporte@docya.com.ar
            </a>.
          </>
        ),
      }
    : {
        // PROFESIONALES
        badge: "Registro enviado",
        p1: (
          <>
            <strong>Revisá tu correo para activar tu cuenta</strong>. Si no ves el mensaje en unos
            minutos, mirá en <strong>Spam</strong> o <strong>Promociones</strong>. Te avisaremos
            cuando sea el lanzamiento para que empieces a atender con DocYa Pro.
          </>
        ),
        c1_t: "Activá tu cuenta",
        c1_p: (
          <>
            Abrí el email de <strong>confirmación</strong> y seguí el enlace para activar tu
            usuario. Si no llega, revisá <strong>Spam</strong>/<strong>Promociones</strong>.
          </>
        ),
        c2_t: "Validación de datos",
        c2_p: (
          <>
            Verificamos <strong>matrícula</strong>, <strong>DNI</strong> y <strong>zona</strong>.
            Te contactaremos si necesitamos algo más.
          </>
        ),
        c3_t: "Siguiente paso",
        c3_p: (
          <>
            Te avisaremos por email cuando <strong>lancemos</strong> para que ingreses a la app de
            profesionales y completes la activación final.
          </>
        ),
        ctas: (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/faqs" className="btn-outline-primary">Ver FAQs</Link>
            <Link href="/ingresos" className="btn-primary">Ver calculadora de ingresos</Link>
          </div>
        ),
        help: (
          <>
            ¿Tenés una urgencia con tu registro? Escribinos a{" "}
            <a href="mailto:soporte@docya.com.ar" className="link-primary">
              soporte@docya.com.ar
            </a>.
          </>
        ),
      };

  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      {/* Confetti si venís del registro */}
      <ConfettiCelebration fire={!!fire} />

      {/* Hero */}
      <section className="border-b border-[var(--nav-border)] relative">
        <div className="absolute inset-0 pointer-events-none brand-glow" />
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="badge">{copy.badge}</span>
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-semibold inline-flex items-center justify-center gap-3">
              ¡Gracias por registrarte!
              <PartyPopper className="h-7 w-7 text-[var(--brand)]" />
            </h1>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              {copy.p1}
            </p>
          </div>
        </div>
      </section>

      {/* Próximos pasos + CTAs */}
      <section className="container py-10 md:py-14">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          <article className="surface rounded-2xl p-6 border">
            <MailCheck className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">{copy.c1_t}</h3>
            <p className="text-sm text-muted-foreground mt-1">{copy.c1_p}</p>
          </article>

          <article className="surface rounded-2xl p-6 border">
            <Clock className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">{copy.c2_t}</h3>
            <p className="text-sm text-muted-foreground mt-1">{copy.c2_p}</p>
          </article>

          <article className="surface rounded-2xl p-6 border">
            <ArrowRight className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">{copy.c3_t}</h3>
            <p className="text-sm text-muted-foreground mt-1">{copy.c3_p}</p>
          </article>
        </div>

        {copy.ctas}

        <p className="text-center text-xs text-muted-foreground mt-6">{copy.help}</p>
      </section>
    </main>
  );
}
