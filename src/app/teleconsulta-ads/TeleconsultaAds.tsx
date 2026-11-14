"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, ClipboardList, FileCheck, FolderOpen, Pill, Video, Wallet } from "lucide-react";
import WhatsAppSupportButton from "@/components/fab/WhatsAppSupportButton";
import { saveLandingJourney, sendLandingEvent } from "@/lib/marketing/adsLanding";

const benefits = [
  { icon: FileCheck, title: "Certificados médicos", description: "El profesional puede emitir un certificado digital, incluso con indicación de reposo, si corresponde.", href: "/certificado-medico-online" },
  { icon: Pill, title: "Recetas digitales", description: "Si el profesional indica medicación, puede emitir una receta digital." },
  { icon: ClipboardList, title: "Órdenes de estudios", description: "Si la evaluación lo requiere, el médico puede indicar estudios y emitir la orden." },
  { icon: Video, title: "Consulta médica", description: "Conversá en tiempo real con un médico matriculado para que evalúe tus síntomas." },
];

const steps = [
  {
    title: "Solicitás la consulta",
    description: "Ingresás a DocYa, contás qué necesitás y elegís cómo pagar dentro de la plataforma.",
  },
  {
    title: "Te atiende un médico disponible",
    description: "Entrás a la videollamada cuando el profesional acepta tu solicitud.",
  },
  {
    title: "Accedés a tus documentos",
    description: "Si el médico emite documentos, quedan guardados en DocYa para que puedas verlos y descargarlos.",
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

export default function TeleconsultaAds({ certificados = false }: { certificados?: boolean }) {
  const visit = useRef<{ id: string; sent: Promise<boolean> } | null>(null);
  const clickRecorded = useRef(false);
  const heroAction = useRef<HTMLDivElement>(null);
  const [showDock, setShowDock] = useState(false);
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

  useEffect(() => {
    if (!heroAction.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowDock(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(heroAction.current);
    return () => observer.disconnect();
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
    <Link href="/pedir?intencion=teleconsulta" onClick={recordClick} className="btn-primary inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl px-6 font-semibold sm:w-auto">
      Solicitar teleconsulta ahora <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );

  return <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 px-5 pb-32 pt-8 sm:px-6 md:grid-cols-2 md:gap-12 md:py-16">
    <div className="order-1 md:col-start-1 md:row-start-1">
      <p className="badge-trusted mb-6 w-fit"><Video size={17} aria-hidden="true" /> Teleconsulta DocYa</p>
      <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
        {certificados ? <>¿Necesitás un <span className="highlight-text">certificado médico?</span></> : <>Hablá con un médico online, <span className="highlight-text">sin turno.</span></>}
      </h1>
      <p className="mb-3 text-lg font-semibold leading-relaxed">
        {certificados ? "Consultá por videollamada con un médico matriculado, sin turno ni traslados." : "Solicitá una videollamada desde tu celular. DocYa busca un médico matriculado disponible en ese momento."}
      </p>
      <p className="mb-5 leading-relaxed text-text-muted">
        {certificados ? "Contale para qué necesitás el certificado. Si corresponde según su evaluación, el médico puede emitir un certificado digital con QR. Podés descargarlo desde Mis consultas." : "¿Necesitás un certificado, una receta o una orden de estudios? El médico evalúa tu caso y puede emitir los documentos que correspondan."}
      </p>
      <p className="mb-4 min-h-7 text-lg font-semibold" aria-live="polite">{formattedPrice ? `${formattedPrice} por teleconsulta` : "Consultá la tarifa vigente al solicitar"}</p>
      {certificados && <p className="mb-4 text-sm text-text-muted">El precio corresponde a la evaluación médica por videollamada. La emisión del certificado depende del profesional.</p>}
      <div ref={heroAction}>{requestButton}</div>
      <p className="mt-3 text-sm text-text-muted">
        ¿Tenés dudas antes de pagar?{" "}
        <a className="font-semibold underline underline-offset-4" href="https://wa.me/5491168700607?text=Hola%2C%20tengo%20una%20duda%20sobre%20la%20teleconsulta%20que%20vi%20en%20Google." target="_blank" rel="noopener noreferrer">Hablá con nuestro equipo por WhatsApp</a>.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
        {([[Video, "En tiempo real"], [BadgeCheck, "Médicos matriculados"], [Wallet, "Sin obra social"]] as const).map(([BadgeIcon, label]) => {
          return <li key={label} className="inline-flex items-center gap-1.5 rounded-full border border-current/15 px-2.5 py-1.5">
            <BadgeIcon size={15} aria-hidden="true" />{label}
          </li>;
        })}
      </ul>
      <p className="mt-4 text-sm text-text-muted">Si es una emergencia, llamá al 107 o al 911, o acudí a una guardia.</p>
    </div>
    <Image src="/how/teleconsulta.webp" alt="Videollamada médica en DocYa" width={580} height={580} sizes="(min-width: 1200px) 550px, (min-width: 768px) 50vw, 85vw" className="order-4 mx-auto h-auto max-h-[440px] w-full object-contain md:order-2 md:col-start-2 md:row-start-1" />
    {certificados && <section className="order-2 rounded-2xl border border-current/15 bg-current/5 p-5 md:col-span-2" aria-labelledby="cert-confianza">
      <h2 id="cert-confianza" className="mb-4 text-2xl font-semibold">Quién te atiende y cómo verificarlo</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><h3 className="font-semibold">Médicos con matrícula verificada en SISA</h3><p className="mt-1 text-sm text-text-muted">DocYa verifica la matrícula de los médicos que te atienden.</p></div>
        <div><h3 className="font-semibold">Registro de DocYa</h3><p className="mt-1 text-sm text-text-muted">DocYa informa su inscripción ante el Ministerio de Salud de la Nación con el ID 0259.</p><Link className="mt-2 inline-block text-sm underline underline-offset-4" href="/como-funciona">Conocé cómo funciona DocYa</Link></div>
      </div>
    </section>}
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
      <div className="mt-5">{requestButton}</div>
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
      <div className="mt-5">{requestButton}</div>
    </section>
    <section className="order-5 rounded-2xl border border-current/10 bg-current/5 p-5 sm:p-8 md:col-span-2" aria-labelledby="ads-documentos">
      <FolderOpen size={28} className="highlight-text mb-3" aria-hidden="true" />
      <h2 id="ads-documentos" className="mb-2 text-2xl font-semibold">Tus documentos médicos, siempre a mano</h2>
      <p className="max-w-2xl leading-relaxed text-text-muted">En Mis consultas queda disponible el historial con la información clínica registrada. Desde tu cuenta podés consultar y descargar los certificados, recetas y órdenes que el profesional haya emitido.</p>
    </section>
    <section className="order-6 md:col-span-2" aria-labelledby="ads-preguntas">
      <h2 id="ads-preguntas" className="mb-4 text-2xl font-semibold">Preguntas frecuentes</h2>
      <div className="divide-y divide-current/10 rounded-xl border border-current/10 px-4 sm:px-6">
        {[
          { question: "¿Cuánto cuesta la teleconsulta?", answer: formattedPrice ? `La tarifa vigente es de ${formattedPrice}. Podés revisar el importe antes de pagar.` : "Vas a ver la tarifa vigente en el flujo de solicitud antes de pagar." },
          ...(certificados ? [
            { question: "¿El certificado está garantizado?", answer: "La teleconsulta es una evaluación médica. El profesional decide si corresponde emitir un certificado y qué debe indicar." },
            { question: "¿Lo puedo presentar en el trabajo o en una institución?", answer: "Consultá qué requisitos pide quien lo recibe. Durante la videollamada contale al médico para qué necesitás el documento." },
          ] : []),
          ...questions,
          { question: "¿Necesito obra social o prepaga?", answer: "No. Podés solicitar una teleconsulta particular sin obra social ni prepaga." },
          { question: "¿Puedo consultar desde cualquier provincia?", answer: "Sí, podés solicitar atención por videollamada desde cualquier lugar de Argentina, según disponibilidad." },
          { question: "¿Qué pasa si no hay un médico disponible?", answer: "DocYa te muestra el estado de la búsqueda. Si nadie acepta, podés volver a intentar o contactar a soporte si tenés dudas sobre tu solicitud." },
        ].map(({ question, answer }) => (
          <details key={question} className="py-3">
            <summary className="cursor-pointer py-1 font-semibold">{question}</summary>
            <p className="mt-2 pb-1 text-sm leading-relaxed text-text-muted">{answer}</p>
          </details>
        ))}
      </div>
    </section>
    <section className="order-7 rounded-2xl border border-current/10 p-5 sm:p-8 md:col-span-2" aria-labelledby="ads-solicitar">
      <h2 id="ads-solicitar" className="mb-2 text-2xl font-semibold">Solicitá atención cuando la necesites</h2>
      <p className="mb-5 text-text-muted">DocYa busca un médico disponible en el momento. La atención es por videollamada.</p>
      {requestButton}
    </section>
    {showDock && <div className="fixed inset-x-0 bottom-0 z-40 border-t border-current/15 bg-background px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
      <Link href="/pedir?intencion=teleconsulta" onClick={recordClick} className="btn-primary flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-3 font-semibold">
        Solicitar teleconsulta <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>}
    <div className={showDock ? "max-md:[&>a]:bottom-[calc(4.5rem+env(safe-area-inset-bottom))]!" : undefined}>
      <WhatsAppSupportButton adsLanding />
    </div>
  </div>;
}
