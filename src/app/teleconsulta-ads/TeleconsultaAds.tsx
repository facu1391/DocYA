"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Video } from "lucide-react";
import { saveLandingJourney, sendLandingEvent } from "@/lib/marketing/adsLanding";

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

  return <main className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-6 py-12 md:grid-cols-2 md:py-20">
    <div>
      <p className="badge-trusted mb-6 w-fit"><Video size={17} aria-hidden="true" /> Teleconsulta DocYa</p>
      <h1 className="hero-title mb-5">Consultá con un <span className="highlight-text">médico online.</span></h1>
      <p className="mb-6 text-lg leading-relaxed text-text-muted">Hablá por videollamada con un profesional desde donde estés en Argentina, según disponibilidad.</p>
      <p className="mb-5 text-lg font-semibold">{price === null ? "Consultá la tarifa al solicitar" : `${new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price)} ARS por teleconsulta`}</p>
      <Link href="/pedir" onClick={recordClick} className="btn-primary inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl px-6 font-semibold sm:w-auto">
        Pedir teleconsulta <ArrowRight size={18} aria-hidden="true" />
      </Link>
      <p className="mt-4 text-sm text-text-muted">Si es una emergencia, llamá al 107 o al 911, o acudí a una guardia.</p>
    </div>
    <Image src="/how/teleconsulta.webp" alt="Videollamada médica en DocYa" width={580} height={580} className="mx-auto h-auto max-h-[480px] w-full object-contain" />
  </main>;
}
