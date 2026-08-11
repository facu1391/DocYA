import Link from "next/link";
import { ShieldCheck, Lock, Database, Cookie, Scale } from "lucide-react";

export const metadata = {
  title: "Política de Privacidad | DocYa Pro",
  alternates: { canonical: "/legal/pro/privacidad" },
  description:
    "Cómo recolectamos, usamos y protegemos los datos personales en DocYa Pro conforme a la ley argentina.",
};

export default function Privacidad() {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      {/* Hero centrado */}
      <section className="border-b border-[var(--nav-border)] relative">
        <div className="absolute inset-0 pointer-events-none brand-glow" />

        <div className="container py-10 md:py-12">
          {/* ✅ wrapper centrado FIX */}
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <span className="badge">Última actualización: 27/09/2025</span>
              </div>
              <h1 className="mt-4 text-2xl md:text-4xl font-semibold">
                Política de Privacidad — DocYa Pro
              </h1>
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Protegemos tus datos personales conforme a la{" "}
                <strong>Ley 25.326</strong> (Argentina). Acá explicamos qué
                información recolectamos y cómo la usamos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido + TOC */}
      <section className="container py-10 md:py-14">
        {/* ✅ wrapper centrado FIX */}
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* TOC (desktop) */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="surface rounded-2xl p-4 sticky top-24">
                <p className="text-sm font-semibold text-[var(--brand)]">
                  En esta página
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li><a className="link-primary hover:underline" href="#datos">1. Datos que recolectamos</a></li>
                  <li><a className="link-primary hover:underline" href="#finalidades">2. Finalidades del tratamiento</a></li>
                  <li><a className="link-primary hover:underline" href="#base-legal">3. Base legal</a></li>
                  <li><a className="link-primary hover:underline" href="#conservacion">4. Conservación y seguridad</a></li>
                  <li><a className="link-primary hover:underline" href="#cesion">5. Cesión a terceros</a></li>
                  <li><a className="link-primary hover:underline" href="#derechos">6. Derechos de titulares</a></li>
                  <li><a className="link-primary hover:underline" href="#cookies">7. Cookies y analíticas</a></li>
                  <li><a className="link-primary hover:underline" href="#cambios">8. Cambios en esta política</a></li>
                  <li><a className="link-primary hover:underline" href="#contacto">9. Contacto</a></li>
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
              {/* Resumen */}
              <div className="glass border rounded-2xl p-4 md:p-5 flex items-start gap-3 not-prose">
                <ShieldCheck className="h-5 w-5 text-[var(--brand)] mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  En <strong>DocYa Pro</strong> aplicamos medidas técnicas y
                  organizativas para proteger tus datos. Tratamos la información
                  de forma lícita, leal y transparente.
                </p>
              </div>

              <h2 id="datos" className="scroll-mt-24">1. Datos que recolectamos</h2>
              <ul>
                <li><strong>Identificación:</strong> nombre, apellido, DNI.</li>
                <li><strong>Profesionales:</strong> matrícula, especialidad, zona y disponibilidad.</li>
                <li><strong>Contacto:</strong> email y teléfono.</li>
                <li><strong>Pagos:</strong> datos bancarios para acreditaciones.</li>
                <li><strong>Uso:</strong> métricas, calificaciones y soporte.</li>
              </ul>

              <h2 id="finalidades" className="scroll-mt-24">2. Finalidades del tratamiento</h2>
              <ul>
                <li>Verificar identidad y credenciales.</li>
                <li>Asignar pacientes.</li>
                <li>Gestionar pagos y facturación.</li>
                <li>Mejorar la plataforma y prevenir fraudes.</li>
                <li>Comunicación operativa.</li>
              </ul>

              <h2 id="base-legal" className="scroll-mt-24">3. Base legal</h2>
              <p>
                Tratamos datos con tu <strong>consentimiento</strong>, para la
                ejecución de la <strong>relación contractual</strong> y el
                cumplimiento de <strong>obligaciones legales</strong>.
              </p>

              <h2 id="conservacion" className="scroll-mt-24">4. Conservación y seguridad</h2>
              <p>
                Usamos servidores seguros y controles de acceso. Conservamos los
                datos el tiempo necesario según las finalidades y la normativa
                vigente.
              </p>

              <div className="surface rounded-xl p-4 not-prose flex items-start gap-3 my-6">
                <Lock className="h-5 w-5 text-[var(--brand)] mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Ningún sistema es infalible, pero revisamos periódicamente
                  nuestros controles de seguridad.
                </p>
              </div>

              <h2 id="cesion" className="scroll-mt-24">5. Cesión a terceros</h2>
              <p>
                No compartimos datos sin consentimiento, salvo obligación legal
                o proveedores necesarios bajo acuerdos de confidencialidad.
              </p>

              <h2 id="derechos" className="scroll-mt-24">6. Derechos de titulares</h2>
              <p>
                Podés ejercer derechos de acceso, rectificación, actualización y
                supresión.
              </p>

              <div
                className="surface border-l-4 rounded-r-xl p-4 not-prose my-6"
                style={{ borderColor: "var(--brand)" }}
              >
                <div className="flex items-start gap-3">
                  <Database className="h-5 w-5 text-[var(--brand)] mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Escribinos a{" "}
                      <a href="mailto:soporte@docya.com.ar" className="link-primary">
                        soporte@docya.com.ar
                      </a>
                    </p>
                    <p className="mt-2">
                      Autoridad de aplicación:{" "}
                      <a
                        href="https://www.argentina.gob.ar/aaip"
                        target="_blank"
                        rel="noreferrer"
                        className="link-primary"
                      >
                        AAIP
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <h2 id="cookies" className="scroll-mt-24">7. Cookies</h2>
              <p>
                Usamos cookies técnicas y analíticas para mejorar la experiencia.
              </p>

              <div className="glass border rounded-2xl p-4 not-prose flex items-start gap-3 my-6">
                <Cookie className="h-5 w-5 text-[var(--brand)] mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Cuando usemos cookies opcionales pediremos consentimiento.
                </p>
              </div>

              <h2 id="cambios" className="scroll-mt-24">8. Cambios</h2>
              <p>Podemos actualizar esta política indicando la fecha vigente.</p>

              <h2 id="contacto" className="scroll-mt-24">9. Contacto</h2>
              <p>
                Privacidad:{" "}
                <a href="mailto:soporte@docya.com.ar">soporte@docya.com.ar</a>
              </p>

              <hr />

              <div className="not-prose flex flex-wrap items-center gap-3">
                <Link href="/legal/pro/terminos" className="btn-outline-primary">
                  Ver Términos y Condiciones
                </Link>
                <Link href="/registro" className="btn-primary">
                  Registrarme como profesional
                </Link>
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Scale className="h-4 w-4" />
                  <span>Transparencia y seguridad como pilares.</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
