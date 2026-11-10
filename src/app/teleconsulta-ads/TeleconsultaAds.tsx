"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ClipboardList, FileCheck, Pill, Video } from "lucide-react";
import WhatsAppSupportButton from "@/components/fab/WhatsAppSupportButton";
import { saveLandingJourney, sendLandingEvent } from "@/lib/marketing/adsLanding";

const benefits = [
  { icon: Video, title: "Consulta médica", description: "Conversá en tiempo real con un médico matriculado para que evalúe tus síntomas." },
  { icon: FileCheck, title: "Certificados médicos", description: "El profesional puede emitir un certificado digital si corresponde.", href: "/certificado-medico-online" },
  { icon: Pill, title: "Recetas digitales", description: "Si el profesional indica medicación, puede emitir una receta digital." },
  { icon: ClipboardList, title: "Órdenes de estudios", description: "Si la evaluación lo requiere, el médico puede indicar estudios y emitir la orden." },
];

const steps = [
  {
    title: "Pedís atención",
    description: "Contás qué necesitás y elegís cómo pagar.",
  },
  {
    title: "Hablás con un médico",
    description: "DocYa busca un profesional disponible. Cuando acepta, entrás a la videollamada.",
  },
  {
    title: "Accedés a tus documentos",
    description: "Si el médico emite documentos, podés verlos y descargarlos desde tu cuenta.",
  },
];

const questions = [
  { question: "¿Cómo hago la teleconsulta?", answer: "Entrá en Solicitar teleconsulta ahora y seguí los pasos. Cuando un médico acepte, vas a poder abrir la videollamada desde DocYa." },
  { question: "¿Necesito turno? ¿Cuánto tengo que esperar?", answer: "Podés solicitar atención sin reservar turno. DocYa busca un médico en ese momento y la espera depende de la disponibilidad." },
  { question: "¿Puedo pedir un certificado médico?", answer: "Sí. Explicale al profesional para qué lo necesitás. La emisión depende de su evaluación." },
  { question: "¿Pueden emitir recetas digitales?", answer: "Sí, el médico puede emitir una receta digital si considera que la medicación está indicada para tu caso." },
  { question: "¿Puedo recibir una orden de estudios?", answer: "Sí, el profesional puede emitirla si la necesita para evaluar o seguir tu caso." },
  { question: "¿Dónde quedan mis documentos?", answer: "Ingresá en Mis consultas. Ahí podés consultar el historial y abrir o descargar los documentos que te hayan emitido." },
];

export default function TeleconsultaAds() {
  const visit = useRef<{ id: string; sent: Promise<boolean> } | null>(null);
  const clickRecorded = useRef(false);
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
    if (clickRecorded.current) return;
    clickRecorded.current = true;
    void journey.sent.then(async ready => {
      if (!ready || !await sendLandingEvent("click", journey.id)) clickRecorded.current = false;
    });
  }

  const formattedPrice = price === null ? null : new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    currencyDisplay: "code",
    minimumFractionDigits: 0,
  }).format(price);
  const requestButton = (
    <Link href="/pedir" onClick={recordClick} className="btn-primary inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl px-6 font-semibold sm:w-auto">
      Solicitar teleconsulta ahora <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );

  return <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 px-6 py-10 md:grid-cols-2 md:gap-12 md:py-16">
    <div className="order-1">
      <p className="badge-trusted mb-6 w-fit"><Video size={17} aria-hidden="true" /> Teleconsulta DocYa</p>
      <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">Hablá con un médico online, <span className="highlight-text">sin turnos.</span></h1>
      <p className="mb-4 text-lg leading-relaxed text-text-muted">Atención médica por videollamada en tiempo real, desde cualquier lugar de Argentina. DocYa busca un profesional disponible cuando pedís atención.</p>
      <p className="mb-5 text-sm leading-relaxed text-text-muted">El médico evalúa tus síntomas y puede emitir certificados, recetas digitales u órdenes de estudios cuando corresponda.</p>
      <p className="mb-4 min-h-7 text-lg font-semibold" aria-live="polite">{formattedPrice ? `${formattedPrice} por teleconsulta` : "Consultá la tarifa vigente al solicitar"}</p>
      {requestButton}
      <p className="mt-3 text-sm text-text-muted">Médicos matriculados · Sin obra social ni prepaga</p>
      <p className="mt-4 text-sm text-text-muted">Si es una emergencia, llamá al 107 o al 911, o acudí a una guardia.</p>
    </div>
    <Image src="/how/teleconsulta.webp" alt="Videollamada médica en DocYa" width={580} height={580} sizes="(min-width: 1200px) 550px, (min-width: 768px) 50vw, 85vw" className="order-4 mx-auto h-auto max-h-[440px] w-full object-contain md:order-2" />
    <section className="order-2 md:order-3 md:col-span-2" aria-labelledby="ads-beneficios">
      <h2 id="ads-beneficios" className="mb-4 text-2xl font-semibold">Qué podés resolver en una teleconsulta</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, description, href }) => (
          <li key={title} className="rounded-xl border border-current/10 p-4">
            <Icon size={22} className="mb-3 text-[var(--brand)]" aria-hidden="true" />
            <h3 className="mb-1 font-semibold">{title}</h3>
            <p className="text-sm leading-relaxed text-text-muted">{description}</p>
            {href && <Link href={href} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">Cómo funciona el certificado</Link>}
          </li>
        ))}
      </ul>
    </section>
    <section className="order-3 md:order-4 md:col-span-2" aria-labelledby="ads-como-funciona">
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
      <p className="mt-4 text-sm leading-relaxed text-text-muted">En Mis consultas queda disponible el historial con la información clínica registrada y los documentos emitidos. Podés consultarlos cuando los necesites.</p>
      <div className="mt-5">{requestButton}</div>
    </section>
    <section className="order-5 md:col-span-2" aria-labelledby="ads-preguntas">
      <h2 id="ads-preguntas" className="mb-4 text-2xl font-semibold">Preguntas frecuentes</h2>
      <div className="divide-y divide-current/10 rounded-xl border border-current/10 px-4 sm:px-6">
        {[
          { question: "¿Cuánto cuesta la teleconsulta?", answer: formattedPrice ? `La tarifa vigente es de ${formattedPrice}. Podés revisar el importe antes de pagar.` : "Vas a ver la tarifa vigente en el flujo de solicitud antes de pagar." },
          ...questions,
        ].map(({ question, answer }) => (
          <details key={question} className="py-3">
            <summary className="cursor-pointer py-1 font-semibold">{question}</summary>
            <p className="mt-2 pb-1 text-sm leading-relaxed text-text-muted">{answer}</p>
          </details>
        ))}
      </div>
    </section>
    <WhatsAppSupportButton adsLanding />
  </div>;
}
