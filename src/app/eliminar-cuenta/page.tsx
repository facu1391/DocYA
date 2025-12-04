
// src/app/eliminar-cuenta/page.tsx
import Link from "next/link";
import {
  Trash2,
  Mail,
  ShieldCheck,
  Clock,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";

export const metadata = {
  title: "Eliminación de cuenta – DocYa",
  description:
    "Cómo solicitar la eliminación de tu cuenta y los datos asociados en DocYa.",
  alternates: { canonical: "/eliminar-cuenta" },
  openGraph: {
    title: "Eliminación de cuenta – DocYa",
    description:
      "Pasos para solicitar la eliminación de tu cuenta y los datos asociados.",
    url: "/eliminar-cuenta",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      {/* Hero */}
      <section className="border-b border-[var(--nav-border)] relative">
        <div className="absolute inset-0 pointer-events-none brand-glow" />
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge inline-flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-[var(--brand)]" />
              Eliminación de cuenta
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-semibold">
              ¿Querés eliminar tu cuenta de DocYa?
            </h1>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Podés solicitar la eliminación de tu cuenta y de los datos
              asociados enviándonos un correo. A continuación te contamos cómo
              hacerlo y qué información incluir.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="container py-10 md:py-14">
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
          {/* Card principal */}
          <article className="surface rounded-2xl border p-6 md:p-7 space-y-4">
            <header className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg md:text-xl font-semibold">
                  Paso a paso para solicitar la eliminación
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  La eliminación no se hace desde la app todavía. Por ahora
                  gestionamos cada pedido manualmente para validar tu identidad
                  y proteger tus datos.
                </p>
              </div>
            </header>

            <ol className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li>
                <strong>1.&nbsp;Escribí un correo a:</strong>{" "}
                <a
                  href="mailto:soporte@docya.com.ar?subject=Eliminar%20cuenta"
                  className="link-primary"
                >
                  soporte@docya.com.ar
                </a>
              </li>
              <li>
                <strong>2.&nbsp;Asunto del correo:</strong> <br />
                <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs mt-1">
                  <Trash2 className="h-3 w-3" />
                  <span>Asunto: Eliminar cuenta</span>
                </span>
              </li>
              <li>
                <strong>3.&nbsp;Incluí estos datos en el mensaje:</strong>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Nombre y apellido.</li>
                  <li>Correo con el que te registraste en DocYa.</li>
                  <li>Teléfono de contacto (opcional, por si necesitamos validación).</li>
                  <li>
                    Si sos <strong>paciente</strong> o{" "}
                    <strong>profesional de la salud</strong>.
                  </li>
                  <li>
                    Una confirmación clara, por ejemplo:{" "}
                    <em>
                      “Solicito la eliminación definitiva de mi cuenta de
                      DocYa y de los datos asociados, salvo aquellos que la
                      normativa obligue a conservar.”
                    </em>
                  </li>
                </ul>
              </li>
            </ol>

            <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50/70 dark:bg-amber-900/20 px-3 py-3 text-xs text-amber-900 dark:text-amber-100">
              <HelpCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Si escribís desde una cuenta de email distinta a la que usaste
                para registrarte, podríamos pedirte información adicional para
                verificar tu identidad antes de avanzar con la baja.
              </p>
            </div>
          </article>

          {/* Card lateral info / plazos */}
          <aside className="glass rounded-2xl border p-5 space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[var(--brand)] mt-0.5" />
              <p>
                Tratamos tu solicitud de eliminación conforme a nuestra{" "}
                <Link
                  href="/legal/pacientes/privacidad"
                  className="link-primary"
                >
                  Política de Privacidad
                </Link>
                . La prioridad es proteger tu información y evitar accesos no
                autorizados.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-[var(--brand)] mt-0.5" />
              <p>
                Una vez recibido el correo, revisaremos tu pedido y te
                responderemos por email cuando la baja esté procesada. El plazo
                puede variar según la cantidad de solicitudes y requisitos
                legales aplicables.
              </p>
            </div>

            <p className="text-xs">
              En algunos casos podemos conservar cierta información de forma
              limitada (por ejemplo, registros contables u obligaciones legales)
              pero nunca será utilizada con fines comerciales una vez que
              pediste la eliminación de tu cuenta.
            </p>
          </aside>
        </div>

        {/* Footer de la página */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          <p className="text-xs text-muted-foreground">
            ¿Tenés dudas adicionales? Escribinos a{" "}
            <a href="mailto:soporte@docya.com.ar" className="link-primary">
              soporte@docya.com.ar
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
