import Link from "next/link";
import { PartyPopper, MailCheck, Clock, ArrowRight } from "lucide-react";
import DownloadAppPublic from "@/components/landing-public/DownloadAppPublic";
import ConfettiCelebration from "@/components/utils/ConfettiCelebration";

export const metadata = {
  title: "¡Gracias!",
  description: "Registro enviado. Revisá tu correo para activar tu cuenta.",
  alternates: { canonical: "/gracias" },
  robots: { index: false, follow: false, nocache: true },
  openGraph: { title: "¡Gracias!", description: "Registro enviado.", url: "/gracias" },
};

type SP = Record<string, string | string[] | undefined>;

export default async function Gracias({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;

  const celebra = sp?.celebra;
  const fire =
    (typeof celebra === "string" && celebra === "1") ||
    (Array.isArray(celebra) && celebra.includes("1"));

  const audParam = sp?.aud;
  const isPaciente =
    (typeof audParam === "string" && audParam.toLowerCase() === "paciente") ||
    (Array.isArray(audParam) && audParam.map((s) => s.toLowerCase()).includes("paciente"));

  const copy = isPaciente
    ? {
        badge: "Registro enviado",
        p1: (
          <>
            <strong>Revisá tu correo para activar tu cuenta</strong>. Si no ves el mensaje en unos
            minutos, mirá en <strong>Spam</strong> o <strong>Promociones</strong>. Una vez
            activada, ya podés usar DocYa para solicitar atención.
          </>
        ),
        c1_t: "Activá tu cuenta",
        c1_p: (
          <>
            Abrí el email de <strong>confirmación</strong> y seguí el enlace para activar tu
            usuario. Si no llega, revisá <strong>Spam</strong> y <strong>Promociones</strong>.
          </>
        ),
        c2_t: "Perfil listo",
        c2_p: (
          <>
            Verificamos tus <strong>datos básicos</strong> y tu <strong>zona de cobertura</strong>.
            Si necesitamos algo más, nos contactamos por email.
          </>
        ),
        c3_t: "Descargá la app",
        c3_p: (
          <>
            Activá tu cuenta y empezá a disfrutar la experiencia DocYa desde tu celular, con acceso
            rápido a profesionales verificados y seguimiento de tus consultas.
          </>
        ),
        ctas: (
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <p className="text-base md:text-lg font-semibold text-foreground">
                Descargá la app y empezá a disfrutar la experiencia DocYa
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Tené tu cuenta siempre a mano, pedí atención en minutos y seguí toda tu experiencia
                desde la app.
              </p>
            </div>
            <DownloadAppPublic />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/" className="btn-outline-primary">
                Volver al inicio
              </Link>
            </div>
          </div>
        ),
        help: (
          <>
            ¿Necesitás ayuda con tu registro? Escribinos a{" "}
            <a href="mailto:soporte@docya.com.ar" className="link-primary">
              soporte@docya.com.ar
            </a>
            .
          </>
        ),
      }
    : {
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
            usuario. Si no llega, revisá <strong>Spam</strong> y <strong>Promociones</strong>.
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
            <Link href="/faqs" className="btn-outline-primary">
              Ver FAQs
            </Link>
            <Link href="/ingresos" className="btn-primary">
              Ver calculadora de ingresos
            </Link>
          </div>
        ),
        help: (
          <>
            ¿Tenés una urgencia con tu registro? Escribinos a{" "}
            <a href="mailto:soporte@docya.com.ar" className="link-primary">
              soporte@docya.com.ar
            </a>
            .
          </>
        ),
      };

  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <ConfettiCelebration fire={!!fire} />

      <section className="relative border-b border-[var(--nav-border)]">
        <div className="brand-glow pointer-events-none absolute inset-0" />
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="badge">{copy.badge}</span>
            </div>
            <h1 className="mt-3 inline-flex items-center justify-center gap-3 text-3xl font-semibold md:text-5xl">
              ¡Gracias por registrarte!
              <PartyPopper className="h-7 w-7 text-[var(--brand)]" />
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              {copy.p1}
            </p>
          </div>
        </div>
      </section>

      <section className="container py-10 md:py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <article className="surface rounded-2xl border p-6">
            <MailCheck className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">{copy.c1_t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{copy.c1_p}</p>
          </article>

          <article className="surface rounded-2xl border p-6">
            <Clock className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">{copy.c2_t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{copy.c2_p}</p>
          </article>

          <article className="surface rounded-2xl border p-6">
            <ArrowRight className="h-5 w-5 text-[var(--brand)]" />
            <h3 className="mt-3 font-semibold">{copy.c3_t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{copy.c3_p}</p>
          </article>
        </div>

        {copy.ctas}

        <p className="mt-6 text-center text-xs text-muted-foreground">{copy.help}</p>
      </section>
    </main>
  );
}
