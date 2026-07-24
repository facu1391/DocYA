// src/app/medico-a-domicilio-caba/page.tsx
//
// Pagina "hub" del cluster de barrios: es la pagina mas fuerte para
// posicionar "medico a domicilio CABA" / "en CABA" / "doctor a domicilio
// CABA", y la que le muestra a Google que las paginas de barrio
// (/medico-a-domicilio-[barrio]) son paginas relacionadas de este tema.

import type { Metadata } from "next";
import Script from "next/script";
import { Clock3, ShieldCheck, MapPin, Stethoscope, FileText, Pill } from "lucide-react";
import { CABA_NEIGHBORHOODS } from "@/data/caba-neighborhoods";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/medico-a-domicilio-caba";

export const metadata: Metadata = {
  title: "Médico a domicilio en CABA",
  description:
    "Médico a domicilio en toda la Ciudad de Buenos Aires. Profesionales matriculados, sin obra social ni prepaga, atención el mismo día por barrio.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Médico a domicilio en CABA | DocYa",
    description:
      "Médico a domicilio en toda la Ciudad de Buenos Aires. Profesionales matriculados, sin obra social ni prepaga.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Médico a domicilio en CABA | DocYa",
    description: "Médico a domicilio en toda la Ciudad de Buenos Aires, sin obra social ni prepaga.",
  },
};

const HUB_FAQS = [
  {
    question: "¿En qué zonas de CABA atiende DocYa?",
    answer:
      "Atendemos en toda la Ciudad Autónoma de Buenos Aires. Algunos barrios ya tienen su propia página con información específica (más abajo), y para el resto igual podés pedir el médico desde la app: se asigna al profesional disponible más cercano a tu domicilio.",
  },
  {
    question: "¿Cuánto tarda en llegar el médico?",
    answer:
      "El tiempo promedio en CABA es de 30 a 60 minutos, según la zona, el horario y la demanda del momento. Vas viendo el estado del pedido en tiempo real desde la app.",
  },
  {
    question: "¿Necesito obra social o prepaga para pedir un médico a domicilio?",
    answer:
      "No. Podés pagar la consulta de forma particular con tarjeta desde la app. Si tu obra social o prepaga reintegra consultas a domicilio, te damos el comprobante correspondiente para que gestiones el reembolso.",
  },
  {
    question: "¿Puedo elegir teleconsulta en vez de que el médico vaya a mi casa?",
    answer:
      "Sí. Si tu consulta se puede resolver por videollamada, podés pedir una teleconsulta y hablar con un médico en minutos desde cualquier punto de CABA.",
  },
  {
    question: "¿Atienden las 24 horas en CABA?",
    answer:
      "Tenemos profesionales disponibles todos los días de la semana, incluidos fines de semana, feriados y horarios nocturnos, sujeto a disponibilidad al momento del pedido.",
  },
];

export default function MedicoADomicilioCabaPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Médico a domicilio en CABA",
    alternateName: [
      "Médico a domicilio en Buenos Aires",
      "Doctor a domicilio CABA",
      "Consulta médica a domicilio CABA",
    ],
    description:
      "DocYa conecta pacientes con médicos matriculados para atención a domicilio en toda la Ciudad Autónoma de Buenos Aires.",
    url: PATH,
    areaServedName: "Ciudad Autónoma de Buenos Aires",
    areaServedType: "City",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-caba"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Médico a domicilio CABA", href: PATH },
        ]}
      />

      <SeoHero
        badge="Toda la Ciudad de Buenos Aires"
        title="Médico a domicilio en"
        titleHighlight="CABA"
        description="Pedí un médico matriculado a tu casa u oficina en cualquier barrio de la Ciudad. Sin obra social ni prepaga: pagás solo cuando lo necesitás."
        primaryCta={{ label: "Solicitar médico ahora", href: "/pedir" }}
        secondaryCta={{ label: "Prefiero una teleconsulta", href: "/#teleconsulta" }}
      />

      <DifferentiatorBanner />

      <SeoContentSection
        heading="Cómo funciona el médico a domicilio en CABA"
        paragraphs={[
          "Pedís el médico desde la app de DocYa indicando tu domicilio y el motivo de consulta. El sistema asigna el pedido al profesional matriculado disponible más cercano a tu ubicación dentro de la Ciudad, y podés seguir el estado del pedido en tiempo real, desde que un médico lo acepta hasta que está en camino.",
          "No hace falta turno previo ni ser afiliado a ninguna obra social o prepaga: pagás la consulta de forma particular con tarjeta desde la misma app, y si tu cobertura reintegra consultas a domicilio te damos el comprobante para que gestiones el reembolso. Si el cuadro se puede resolver sin que el médico se traslade, también podés optar por una teleconsulta por videollamada.",
        ]}
      />

      <section className="py-10">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass-card rounded-3xl p-6 text-center">
              <Clock3 className="mx-auto mb-3 text-[var(--brand)]" size={28} />
              <p className="text-2xl font-bold">30–60 min</p>
              <p className="text-text-muted text-sm mt-1">Tiempo estimado de atención en CABA</p>
            </div>
            <div className="glass-card rounded-3xl p-6 text-center">
              <ShieldCheck className="mx-auto mb-3 text-[var(--brand)]" size={28} />
              <p className="text-2xl font-bold">100%</p>
              <p className="text-text-muted text-sm mt-1">Médicos matriculados y verificados</p>
            </div>
            <div className="glass-card rounded-3xl p-6 text-center">
              <MapPin className="mx-auto mb-3 text-[var(--brand)]" size={28} />
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-text-muted text-sm mt-1">Disponibilidad todos los días del año</p>
            </div>
          </div>
        </div>
      </section>

      <BenefitsGrid
        heading="Qué incluye la consulta"
        subtitle="Cada visita a domicilio en CABA incluye, según lo que necesites:"
        items={[
          {
            icon: <Stethoscope size={22} />,
            title: "Examen clínico completo",
            description: "Evaluación presencial, diagnóstico e indicaciones de tratamiento.",
          },
          {
            icon: <Pill size={22} />,
            title: "Receta digital",
            description: "Si corresponde, el médico te emite la receta al instante desde la app.",
          },
          {
            icon: <FileText size={22} />,
            title: "Certificado médico",
            description: "Certificado de reposo, laboral o escolar cuando la consulta lo justifique.",
          },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <h2 className="section-title text-2xl md:text-3xl mb-3 text-center">
            Médico a domicilio por barrio
          </h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-10">
            Elegí tu barrio para ver información específica de la zona. Estamos sumando más
            barrios de CABA: si el tuyo todavía no aparece, igual podés pedir el médico desde la
            app, cubrimos toda la Ciudad.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CABA_NEIGHBORHOODS.map((neighborhood) => (
              <a
                key={neighborhood.slug}
                href={`/medico-a-domicilio-${neighborhood.slug}`}
                className="surface flex items-center justify-between gap-3 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand)_40%,transparent)]"
              >
                <div>
                  <span className="font-semibold">{neighborhood.name}</span>
                  <p className="text-sm text-text-muted mt-0.5">Zona {neighborhood.zone}</p>
                </div>
                <MapPin size={18} className="shrink-0 text-[var(--brand)]" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <SeoFaqSection
        jsonLdId="ld-faq-caba"
        title="Preguntas frecuentes sobre médico a domicilio en CABA"
        items={HUB_FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Médico a domicilio las 24 horas", href: "/medico-a-domicilio-24-horas", description: "Noche, madrugada, fines de semana y feriados" },
          { label: "Médico a domicilio urgente", href: "/medico-a-domicilio-urgente", description: "Atención prioritaria para cuadros agudos" },
          { label: "Médico clínico a domicilio", href: "/medico-clinico-a-domicilio", description: "Evaluación clínica general" },
          { label: "Precio del médico a domicilio", href: "/medico-a-domicilio-precio", description: "Cuánto cuesta la consulta" },
          { label: "Médico a domicilio particular", href: "/medico-a-domicilio-particular", description: "Sin obra social ni prepaga" },
          { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Atención por videollamada" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Centro de Ayuda DocYa", href: "/centro-de-ayuda/medico-a-domicilio", description: "Cuándo llamar al médico, qué atiende y más" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="¿Necesitás un médico a domicilio en CABA?"
        subtitle="Pedilo desde la app y un profesional matriculado te atiende en tu casa, sin turno previo."
      />

      <Script
        id="ld-service-caba"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
