"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Video } from "lucide-react";
import WhatsAppSupportButton from "@/components/fab/WhatsAppSupportButton";
import { saveLandingJourney, sendLandingEvent } from "@/lib/marketing/adsLanding";

const steps = [
  {
    title: "Pedís atención",
    description: "Contás qué necesitás y elegís cómo pagar.",
  },
  {
    title: "Buscamos un médico",
    description: "Ves el estado de la búsqueda en pantalla. La espera depende de la disponibilidad.",
  },
  {
    title: "Entrás a la videollamada",
    description: "Cuando el profesional acepta, te conectás desde DocYa.",
  },
];

export default function TeleconsultaAds() {
  const visit = useRef<{ id: string; sent: Promise<boolean> } | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  function getVisit() {
    if (!visit.current && typeof crypto.randomUUID === "function") {
      const id = crypto.randomUUID();
      visit.current = { id, sent: sendLandingEvent("entry", id) };
    }
    return visit.current;
  }

  useEffect(() => {
    getVisit();
    const api = process.env.NEXT_PUBLIC_API_BASE;
    if (!api) return;
    const controller = new AbortController();
    fetch(`${api}/tarifas/teleconsulta`, { cache: "no-store", signal: controller.signal, referrerPolicy: "no-referrer" })
      .then(response => response.ok ? response.json() : null)
      .then(data => { const amount = Number(data?.monto); if (Number.isFinite(amount) && amount > 0) setPrice(amount); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  function recordClick() {
    const journey = getVisit();
    if (!journey) return;
    saveLandingJourney(journey.id);
    void journey.sent.then(ready => ready && sendLandingEvent("click", journey.id));
  }

  return <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 px-6 py-10 md:grid-cols-2 md:gap-12 md:py-16">
    <div className="order-1">
      <p className="badge-trusted mb-6 w-fit"><Video size={17} aria-hidden="true" /> Teleconsulta DocYa</p>
      <h1 className="hero-title mb-4">Hablá con un médico online, <span className="highlight-text">sin turno</span></h1>
      <p className="mb-5 text-lg leading-relaxed text-text-muted">Pedí una teleconsulta y DocYa busca en ese momento un médico disponible. Cuando acepta, entrás a la videollamada desde tu celular, estés donde estés en Argentina.</p>
      <p className="mb-5 text-lg font-semibold">{price === null ? "Consultá la tarifa al solicitar" : `${new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price)} ARS por teleconsulta`}</p>
      <Link href="/pedir" onClick={recordClick} className="btn-primary inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl px-6 font-semibold sm:w-auto">
        Pedir teleconsulta <ArrowRight size={18} aria-hidden="true" />
      </Link>
      <p className="mt-3 text-sm text-text-muted">Médicos matriculados · Sin obra social ni prepaga</p>
      <section className="mt-6 max-w-lg rounded-2xl border border-current/10 px-4 py-4 sm:px-5" aria-labelledby="ads-certificado">
        <h2 id="ads-certificado" className="mb-1 text-base font-semibold">¿Necesitás un certificado médico?</h2>
        <p className="text-sm leading-relaxed text-text-muted">Contale al médico qué necesitás durante la videollamada. Si corresponde, puede emitir un certificado digital después de evaluarte.</p>
        <Link href="/certificado-medico-online" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4">
          Cómo funciona el certificado médico online <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </section>
      <p className="mt-4 text-sm text-text-muted">Si es una emergencia, llamá al 107 o al 911, o acudí a una guardia.</p>
    </div>
    <Image src="/how/teleconsulta.webp" alt="Videollamada médica en DocYa" width={580} height={580} className="order-3 mx-auto h-auto max-h-[480px] w-full object-contain md:order-2" />
    <section className="order-2 md:order-3 md:col-span-2" aria-labelledby="ads-como-funciona">
      <h2 id="ads-como-funciona" className="mb-4 text-2xl font-semibold">Cómo funciona</h2>
      <ol className="grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex items-start gap-3 rounded-xl border border-current/10 p-4">
            <span aria-hidden="true" className="highlight-text font-semibold">{index + 1}.</span>
            <div>
              <h3 className="mb-1 font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
    <WhatsAppSupportButton adsLanding />
  </div>;
}
