"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock, MapPin, Database, Cookie, X, Smartphone, Sparkles } from "lucide-react";
import LegalLayout from "@/components/legal/LegalLayout";

const PLAY_URL = "https://play.google.com";
const APPSTORE_URL = "https://www.apple.com/app-store/";

type Platform = "android" | "ios" | "unknown";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";

  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);

  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && (navigator.maxTouchPoints ?? 0) > 1);

  if (isAndroid) return "android";
  if (isIOS) return "ios";
  return "unknown";
}

export default function PrivacidadClient() {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const toc = [
    { id: "datos", label: "1. Datos que recolectamos" },
    { id: "finalidades", label: "2. Finalidades" },
    { id: "base-legal", label: "3. Bases legales" },
    { id: "seguridad", label: "4. Conservación y seguridad" },
    { id: "terceros", label: "5. Cesión a terceros" },
    { id: "derechos", label: "6. Tus derechos" },
    { id: "cookies", label: "7. Cookies" },
    { id: "menores", label: "8. Menores de edad" },
    { id: "cambios", label: "9. Cambios y contacto" },
  ];

  const stores = useMemo(() => {
    const items = [
      { key: "play", label: "Google Play", href: PLAY_URL, variant: "primary" as const },
      { key: "appstore", label: "App Store", href: APPSTORE_URL, variant: "outline" as const },
    ];

    if (platform === "ios") return [items[1], items[0]];
    if (platform === "android") return [items[0], items[1]];
    return items;
  }, [platform]);

  const recommended =
    platform === "ios" ? "App Store" : platform === "android" ? "Google Play" : null;

  return (
    <>
      <LegalLayout
        title="Política de Privacidad — DocYa (Público)"
        subtitle="Tratamiento de datos personales conforme Ley 25.326 (Argentina)."
        lastUpdate="27/09/2025"
        toc={toc}
      >
        <div className="glass border rounded-2xl p-4 md:p-5 flex items-start gap-3 not-prose">
          <ShieldCheck className="h-5 w-5 text-[var(--brand)] mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Priorizamos la transparencia y la seguridad. Tratamos la información de forma lícita, leal,
            limitada a los fines informados y con medidas razonables de protección.
          </p>
        </div>

        <h2 id="datos" className="scroll-mt-24">1. Datos que recolectamos</h2>
        <ul>
          <li><strong>Identificación y contacto:</strong> nombre, apellido, email, teléfono.</li>
          <li><strong>Ubicación aproximada:</strong> para asignar profesionales cercanos <em>(geolocalización o dirección ingresada)</em>.</li>
          <li><strong>Datos de salud mínimos:</strong> motivo de la consulta y antecedentes relevantes que decidas informar para la atención.</li>
          <li><strong>Pagos:</strong> datos necesarios para procesar la transacción (a través de proveedores).</li>
          <li><strong>Uso:</strong> logs técnicos y métricas para estabilidad y seguridad.</li>
        </ul>

        <h2 id="finalidades" className="scroll-mt-24">2. Finalidades</h2>
        <ul>
          <li>Asignar profesionales y coordinar la visita.</li>
          <li>Procesar pagos y emitir comprobantes.</li>
          <li>Mejorar la plataforma y prevenir fraudes.</li>
          <li>Comunicar novedades operativas y de soporte.</li>
        </ul>

        <h2 id="base-legal" className="scroll-mt-24">3. Bases legales</h2>
        <p>Consentimiento, ejecución del servicio solicitado y cumplimiento de obligaciones legales.</p>

        <h2 id="seguridad" className="scroll-mt-24">4. Conservación y seguridad</h2>
        <div className="surface rounded-xl p-4 not-prose flex items-start gap-3 my-4">
          <Lock className="h-5 w-5 text-[var(--brand)] mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Aplicamos cifrado en tránsito, controles de acceso y revisiones periódicas. Conservamos los
            datos por el tiempo necesario para prestar el servicio y cumplir normas aplicables.
          </p>
        </div>

        <h2 id="terceros" className="scroll-mt-24">5. Cesión a terceros</h2>
        <p>
          Compartimos datos solo con proveedores necesarios (pagos, mensajería, hosting) bajo acuerdos
          de confidencialidad. El/la profesional que atiende accede a la información estrictamente necesaria.
        </p>

        <h2 id="derechos" className="scroll-mt-24">6. Tus derechos</h2>
        <div className="surface rounded-xl p-4 not-prose flex items-start gap-3 my-4">
          <Database className="h-5 w-5 text-[var(--brand)] mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p>
              Podés ejercer acceso, rectificación, actualización y supresión escribiendo a{" "}
              <a className="link-primary" href="mailto:soporte@docya.com.ar">soporte@docya.com.ar</a>.
              Podríamos solicitar verificación de identidad.
            </p>
            <p className="mt-2">
              Autoridad de aplicación:{" "}
              <a className="link-primary" href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noreferrer">
                Agencia de Acceso a la Información Pública
              </a>.
            </p>
          </div>
        </div>

        <h2 id="cookies" className="scroll-mt-24">7. Cookies</h2>
        <div className="glass border rounded-2xl p-4 not-prose flex items-start gap-3 my-4">
          <Cookie className="h-5 w-5 text-[var(--brand)] mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Usamos cookies técnicas y de medición. Cuando usemos cookies opcionales te pediremos
            consentimiento. Podés gestionarlas en tu navegador.
          </p>
        </div>

        <h2 id="menores" className="scroll-mt-24">8. Menores de edad</h2>
        <p>La solicitud debe hacerla un adulto responsable presente durante la visita.</p>

        <h2 id="cambios" className="scroll-mt-24">9. Cambios y contacto</h2>
        <p>
          Publicaremos actualizaciones en esta página. Contacto:{" "}
          <a href="mailto:soporte@docya.com.ar">soporte@docya.com.ar</a>
        </p>

        <hr />

        <div className="not-prose flex flex-wrap items-center gap-3">
          <Link href="/legal/pacientes/terminos" className="btn-outline-primary">
            Ver Términos y Condiciones
          </Link>

          <button onClick={() => setOpen(true)} className="btn-primary">
            Descargar app
          </button>

          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Servicio por zonas habilitadas.</span>
          </div>
        </div>
      </LegalLayout>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="surface rounded-2xl max-w-sm w-full p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <Smartphone className="h-6 w-6 text-[var(--brand)]" />
              <h3 className="font-semibold text-lg">Descargar DocYa</h3>
            </div>

            {recommended ? (
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-[var(--brand)]" />
                Recomendado para tu dispositivo:{" "}
                <span className="text-foreground">{recommended}</span>
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Elegí la tienda según tu dispositivo.
              </p>
            )}

            <div className="mt-5 flex flex-col gap-3">
              {stores.map((s, idx) => {
                const isFirst = idx === 0;
                const cls = s.variant === "primary" ? "btn-primary" : "btn-outline-primary";

                return (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${cls} text-center`}
                  >
                    {s.label}
                    {isFirst && recommended ? " (recomendado)" : ""}
                  </a>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Si estás en una computadora, elegí una tienda o abrilo desde tu teléfono.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
