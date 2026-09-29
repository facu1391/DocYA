import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  FileCheck2,
  House,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Stethoscope,
  Video,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo funciona DocYa",
  description:
    "Conocé cómo pedir atención médica a domicilio o una teleconsulta en DocYa, en tiempo real y sin turno previo.",
  alternates: { canonical: "/como-funciona" },
};

const steps = [
  {
    icon: ClipboardList,
    title: "Contanos qué necesitás",
    text: "Elegís médico a domicilio o teleconsulta, indicás el motivo y confirmás los datos de atención.",
  },
  {
    icon: Stethoscope,
    title: "Avisamos en tiempo real",
    text: "La solicitud se notifica a profesionales disponibles. Para domicilio, priorizamos a quienes pueden atender cerca de tu ubicación.",
  },
  {
    icon: BadgeCheck,
    title: "Un profesional acepta",
    text: "Cuando un médico toma la consulta te avisamos enseguida y podés seguir el estado desde DocYa.",
  },
  {
    icon: ShieldCheck,
    title: "Atención y seguimiento",
    text: "El profesional realiza la atención y, si corresponde, deja la documentación médica asociada a tu consulta.",
  },
];

const documents = [
  "Recetas médicas digitales",
  "Certificados digitales con QR verificable",
  "Órdenes de estudios o derivaciones",
  "Indicaciones y seguimiento clínico",
];

export default function ComoFuncionaPage() {
  return (
    <main className="overflow-hidden bg-[#061b20] text-white">
      <section className="relative isolate border-b border-white/10 bg-[radial-gradient(circle_at_75%_20%,rgba(18,207,192,.24),transparent_30%),radial-gradient(circle_at_8%_80%,rgba(51,112,255,.18),transparent_34%),#061b20] px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-xs font-bold tracking-wide text-teal-200">
            <span className="h-2 w-2 rounded-full bg-teal-300" /> ATENCIÓN MÉDICA EN TIEMPO REAL
          </span>
          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Pedir atención médica con DocYa es simple
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            Solicitás desde la app o la web. Avisamos a profesionales disponibles y te informamos cuando uno acepta tu consulta.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/pedir" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#20cbbc] px-6 py-4 font-bold text-[#042128] transition hover:bg-[#43dfd0]">
              Pedir atención ahora <ArrowRight size={19} />
            </Link>
            <a href="#paso-a-paso" className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-4 font-semibold text-white transition hover:bg-white/10">
              Ver cómo funciona
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:grid-cols-3">
        <InfoCard icon={<House size={23} />} title="Médico a domicilio" text="Para una atención presencial en tu domicilio, dentro de las zonas de cobertura disponibles." />
        <InfoCard icon={<Video size={23} />} title="Teleconsulta" text="Hablá por videollamada con un médico desde donde estés. Es ideal para orientación, recetas, certificados, órdenes y seguimiento, según evaluación profesional." />
        <InfoCard icon={<MapPin size={23} />} title="Te mantenemos informado" text="Ves el estado de tu solicitud y recibís avisos cuando el profesional acepta o está en camino." />
      </section>

      <section id="paso-a-paso" className="border-y border-white/10 bg-[#08252b] px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm font-extrabold uppercase tracking-[.18em] text-teal-300">Paso a paso</p>
          <h2 className="mt-3 text-center text-3xl font-extrabold sm:text-4xl">¿Qué pasa cuando pedís una consulta?</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="rounded-3xl border border-white/10 bg-white/[.045] p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-300/15 text-teal-300">
                    <Icon size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold tracking-widest text-teal-300">PASO {index + 1}</p>
                    <h3 className="mt-1 text-lg font-bold">{title}</h3>
                    <p className="mt-2 leading-6 text-white/70">{text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:py-20">
        <article className="rounded-3xl border border-teal-300/25 bg-teal-300/[.07] p-7 sm:p-9">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-300/15 text-teal-300"><RotateCcw /></div>
          <h2 className="mt-5 text-2xl font-extrabold">¿Y si nadie acepta?</h2>
          <p className="mt-3 leading-7 text-white/75">
            Si no logramos asignar un profesional a tu solicitud, gestionamos el reintegro del pago. No pagás una consulta que no fue aceptada.
          </p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/[.045] p-7 sm:p-9">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/15 text-violet-300"><FileCheck2 /></div>
          <h2 className="mt-5 text-2xl font-extrabold">¿Qué se puede resolver?</h2>
          <ul className="mt-4 space-y-3 text-white/75">
            {documents.map((document) => <li key={document} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />{document}</li>)}
          </ul>
          <div className="mt-6 rounded-2xl border border-teal-300/20 bg-teal-300/[.07] p-4">
            <p className="font-semibold text-teal-100">Documentación médica digital y verificable</p>
            <p className="mt-1 text-sm leading-6 text-white/70">Los certificados incluyen código QR para verificar su autenticidad, junto con los datos, la firma y la matrícula del profesional que atendió.</p>
          </div>
          <p className="mt-4 text-sm leading-6 text-white/70">DocYa es una plataforma registrada ante el Ministerio de Salud de la Nación, identificador 0259.</p>
          <p className="mt-5 text-sm leading-6 text-white/55">La emisión de documentación queda siempre sujeta a la evaluación del profesional tratante.</p>
        </article>
      </section>

      <section className="border-t border-white/10 bg-[linear-gradient(115deg,#0a3f43,#073037)] px-5 py-16 text-center">
        <h2 className="text-3xl font-extrabold">¿Necesitás atención ahora?</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/75">Ingresá, elegí el tipo de atención y hacé tu solicitud. Te acompañamos durante todo el proceso.</p>
        <Link href="/pedir" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-[#083136] transition hover:bg-teal-50">
          Entrar y pedir ahora <ArrowRight size={19} />
        </Link>
      </section>
    </main>
  );
}

function InfoCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
      <div className="text-teal-300">{icon}</div>
      <h2 className="mt-3 font-bold">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-white/65">{text}</p>
    </article>
  );
}
