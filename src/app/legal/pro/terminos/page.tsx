import Link from "next/link";
import { AlertTriangle, ShieldCheck, Scale, FileText } from "lucide-react";

export const metadata = {
  title: "Términos y Condiciones | DocYa Pro",
  description:
    "Términos que regulan el uso de DocYa Pro para profesionales de la salud en Argentina.",
};

export default function Terminos() {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      {/* Hero centrado */}
      <section className="border-b border-[var(--nav-border)] relative">
        <div className="absolute inset-0 pointer-events-none brand-glow" />
        <div className="container py-10 md:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="badge">Última actualización: 27/09/2025</span>
            </div>
            <h1 className="mt-4 text-2xl md:text-4xl font-semibold">
              Términos y Condiciones — DocYa Pro
            </h1>
            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Reglas claras para usar la plataforma como profesional. Leé todo con
              atención; el uso implica aceptación.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido + TOC */}
      <section className="container py-10 md:py-14">
        {/* Wrapper centrado con gutters */}
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 grid gap-10 lg:grid-cols-12">
          {/* TOC (solo desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="surface rounded-2xl p-4 sticky top-24">
              <p className="text-sm font-semibold text-[var(--brand)]">En esta página</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a className="link-primary hover:underline" href="#objeto">1. Objeto del servicio</a></li>
                <li><a className="link-primary hover:underline" href="#requisitos">2. Requisitos del profesional</a></li>
                <li><a className="link-primary hover:underline" href="#pagos">3. Funcionamiento y pagos</a></li>
                <li><a className="link-primary hover:underline" href="#responsabilidad">4. Responsabilidad</a></li>
                <li><a className="link-primary hover:underline" href="#conducta">5. Conducta y suspensión</a></li>
                <li><a className="link-primary hover:underline" href="#modificaciones">6. Modificaciones</a></li>
                <li><a className="link-primary hover:underline" href="#jurisdiccion">7. Jurisdicción y ley aplicable</a></li>
                <li><a className="link-primary hover:underline" href="#contacto">8. Contacto</a></li>
              </ul>
            </div>
          </aside>

          {/* Artículo */}
          <article
            className="
              lg:col-span-9
              prose prose-neutral dark:prose-invert max-w-none
              prose-a:text-[var(--brand)] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-headings:text-foreground
              prose-li:marker:text-[var(--brand)]
              lg:pl-2 xl:pl-4
            "
          >
            {/* Resumen importante */}
            <div className="glass border rounded-2xl p-4 md:p-5 flex items-start gap-3 not-prose">
              <ShieldCheck className="h-5 w-5 text-[var(--brand)] mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Bienvenido/a a <strong>DocYa Pro</strong>. Al registrarte y utilizar la plataforma,
                aceptás estos términos y condiciones.
              </p>
            </div>

            <h2 id="objeto" className="scroll-mt-24">1. Objeto del servicio</h2>
            <p>
              DocYa Pro es una plataforma que conecta profesionales de la salud (médicos y
              enfermeros) con pacientes que solicitan atención a domicilio. Facilitamos la
              vinculación, logística de asignación y procesamiento de pagos, pero <strong>no
              prestamos servicios médicos</strong> ni sustituimos la relación profesional–paciente.
            </p>

            <h2 id="requisitos" className="scroll-mt-24">2. Requisitos del profesional</h2>
            <ul>
              <li>Ser mayor de edad y poseer matrícula profesional habilitante en Argentina.</li>
              <li>Brindar datos verídicos y mantenerlos actualizados.</li>
              <li>Cumplir la normativa sanitaria y estándares éticos aplicables.</li>
            </ul>

            <h2 id="pagos" className="scroll-mt-24">3. Funcionamiento y pagos</h2>
            <ul>
              <li>El paciente abona <strong>$30.000 ARS</strong> por consulta.</li>
              <li>Comisión DocYa: <strong>20%</strong>.</li>
              <li>Ingreso neto del profesional: <strong>$24.000 ARS</strong> por consulta.</li>
              <li>Acreditación semanal en la cuenta informada por el profesional.</li>
            </ul>

            {/* Nota de importes */}
            <div className="surface rounded-xl p-4 not-prose flex items-start gap-3 my-6">
              <FileText className="h-5 w-5 text-[var(--brand)] mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Los importes indicados son de referencia y pueden actualizarse. Los valores
                vigentes se informarán en la app y comunicaciones oficiales.
              </p>
            </div>

            <h2 id="responsabilidad" className="scroll-mt-24">4. Responsabilidad</h2>
            <p>
              El/la profesional es responsable exclusivo/a de la atención brindada. DocYa Pro no
              asume responsabilidad por diagnósticos, tratamientos o resultados. Ante urgencias
              graves, el paciente debe comunicarse con el <strong>911</strong> u otro servicio de
              emergencias.
            </p>

            {/* Callout de urgencias */}
            <div className="surface border-l-4 rounded-r-xl p-4 not-prose my-6" style={{ borderColor: "var(--brand)" }}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-[var(--brand)] mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  <strong>Importante:</strong> la plataforma no gestiona emergencias. Si detectás
                  signos de gravedad, indicá al paciente contactarse con el 911.
                </p>
              </div>
            </div>

            <h2 id="conducta" className="scroll-mt-24">5. Conducta y suspensión</h2>
            <p>
              DocYa Pro podrá suspender o dar de baja cuentas por incumplimientos, fraudes, uso
              indebido, o calificaciones reiteradamente negativas, sin derecho a indemnización.
            </p>

            <h2 id="modificaciones" className="scroll-mt-24">6. Modificaciones</h2>
            <p>
              Podemos actualizar estos términos. El uso continuado de la plataforma implica la
              aceptación de las nuevas condiciones.
            </p>

            <h2 id="jurisdiccion" className="scroll-mt-24">7. Jurisdicción y ley aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República Argentina. Para cualquier
              conflicto, será competente la justicia ordinaria de la Ciudad Autónoma de Buenos Aires.
            </p>

            <h2 id="contacto" className="scroll-mt-24">8. Contacto</h2>
            <p>
              Consultas legales:{" "}
              <a href="mailto:soporte@docya.com.ar">soporte@docya.com.ar</a>
            </p>

            <hr />

            {/* CTAs finales */}
            <div className="not-prose flex flex-wrap items-center gap-3">
              <Link href="/legal/pro/privacidad" className="btn-outline-primary">
                Ver Política de Privacidad
              </Link>
              <Link href="/registro" className="btn-primary">
                Registrarme como profesional
              </Link>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Scale className="h-4 w-4" />
                <span>Leé también nuestras políticas de datos y conducta.</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
