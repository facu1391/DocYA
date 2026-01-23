"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  CreditCard,
  MessageSquareWarning,
  ShieldCheck,
  X,
  Smartphone,
  Sparkles,
} from "lucide-react";
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

export default function TerminosClient() {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const toc = [
    { id: "servicio", label: "1. Qué ofrece DocYa" },
    { id: "alcance", label: "2. Alcance y elegibilidad" },
    { id: "cuenta", label: "3. Cuenta y uso responsable" },
    { id: "solicitudes", label: "4. Solicitudes y tiempos" },
    { id: "precios", label: "5. Precios, pagos y reembolsos" },
    { id: "responsabilidad", label: "6. Responsabilidad" },
    { id: "conducta", label: "7. Conducta y prohibiciones" },
    { id: "calificaciones", label: "8. Calificaciones" },
    { id: "propiedad", label: "9. Propiedad intelectual" },
    { id: "cambios", label: "10. Cambios y jurisdicción" },
    { id: "contacto", label: "11. Contacto" },
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
        title="Términos y Condiciones — DocYa"
        subtitle="Reglas claras para usar DocYa como paciente o familiar."
        lastUpdate="27/09/2025"
        toc={toc}
      >
        <div className="glass border rounded-2xl p-4 md:p-5 flex items-start gap-3 not-prose">
          <ShieldCheck className="h-5 w-5 text-[var(--brand)] mt-0.5" />
          <p className="text-sm text-muted-foreground">
            DocYa conecta pacientes con profesionales de la salud para{" "}
            <strong>atención a domicilio</strong>. No es un servicio de emergencias ni reemplaza la
            relación profesional–paciente.
          </p>
        </div>

        <h2 id="servicio" className="scroll-mt-24">1. Qué ofrece DocYa</h2>
        <p>
          DocYa es un intermediario tecnológico que facilita el encuentro entre pacientes y
          profesionales independientes (médicos/as y enfermeros/as). Gestionamos la asignación,
          comunicaciones y cobro, pero <strong>no prestamos servicios médicos</strong>.
        </p>

        <h2 id="alcance" className="scroll-mt-24">2. Alcance y elegibilidad</h2>
        <ul>
          <li>
            El servicio está destinado a personas mayores de 18 años. Para menores, debe solicitarlo
            un adulto responsable presente en el domicilio.
          </li>
          <li>La cobertura es por zonas habilitadas y puede variar.</li>
        </ul>

        <h2 id="cuenta" className="scroll-mt-24">3. Cuenta y uso responsable</h2>
        <ul>
          <li>Debés brindar datos veraces y mantenerlos actualizados.</li>
          <li>Usá la app de forma respetuosa; no presiones al profesional ni solicites prácticas ilícitas.</li>
        </ul>

        <h2 id="solicitudes" className="scroll-mt-24">4. Solicitudes y tiempos</h2>
        <div className="surface rounded-xl p-4 not-prose flex items-start gap-3 my-4">
          <Clock className="h-5 w-5 text-[var(--brand)] mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Los tiempos mostrados son <strong>estimados</strong> y pueden variar por tránsito,
            distancia y disponibilidad. Podés cancelar antes de que el profesional esté en camino
            sin costo.
          </p>
        </div>

        <h2 id="precios" className="scroll-mt-24">5. Precios, pagos y reembolsos</h2>
        <ul>
          <li>Verás el precio total antes de confirmar. Los montos pueden actualizarse.</li>
          <li>Los pagos se procesan de forma segura; recibirás comprobantes digitales.</li>
          <li>Si no puede completarse la atención por causas ajenas al paciente, se evaluará reembolso o reprogramación.</li>
        </ul>

        <div className="surface rounded-xl p-4 not-prose flex items-start gap-3 my-4">
          <CreditCard className="h-5 w-5 text-[var(--brand)] mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Medicación, estudios y materiales no están incluidos salvo que se indique expresamente.
          </p>
        </div>

        <h2 id="responsabilidad" className="scroll-mt-24">6. Responsabilidad</h2>
        <p>
          El/la profesional es responsable por la atención brindada. DocYa no asume responsabilidad
          por diagnósticos o resultados clínicos. En urgencias o síntomas graves, comunicarse con el{" "}
          <strong>911</strong>.
        </p>

        <div className="surface border-l-4 rounded-r-xl p-4 not-prose my-6" style={{ borderColor: "var(--brand)" }}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-[var(--brand)] mt-0.5" />
            <p className="text-sm text-muted-foreground">
              DocYa no atiende emergencias. Si hay riesgo vital, llamá al 911 inmediatamente.
            </p>
          </div>
        </div>

        <h2 id="conducta" className="scroll-mt-24">7. Conducta y prohibiciones</h2>
        <ul>
          <li>Prohibido hostigar, discriminar, ofrecer pagos fuera de la app o solicitar actos contrarios a la ética.</li>
          <li>Podemos suspender cuentas ante incumplimientos o fraudes.</li>
        </ul>

        <h2 id="calificaciones" className="scroll-mt-24">8. Calificaciones</h2>
        <p>Podrás calificar la atención. Las reseñas deben ser honestas y respetuosas.</p>

        <h2 id="propiedad" className="scroll-mt-24">9. Propiedad intelectual</h2>
        <p>La app, marcas y contenidos son propiedad de DocYa o sus licenciantes.</p>

        <h2 id="cambios" className="scroll-mt-24">10. Cambios y jurisdicción</h2>
        <p>
          Podemos actualizar estos términos. Se rigen por las leyes de la República Argentina;
          fuero: Ciudad Autónoma de Buenos Aires.
        </p>

        <h2 id="contacto" className="scroll-mt-24">11. Contacto</h2>
        <p>
          Consultas legales: <a href="mailto:soporte@docya.com.ar">soporte@docya.com.ar</a>
        </p>

        <hr />

        <div className="not-prose flex flex-wrap items-center gap-3">
          <Link href="/legal/pacientes/privacidad" className="btn-outline-primary">
            Ver Privacidad
          </Link>

          <button onClick={() => setOpen(true)} className="btn-primary">
            Descargar app
          </button>

          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquareWarning className="h-4 w-4" />
            <span>Soporte ante cualquier inconveniente.</span>
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

