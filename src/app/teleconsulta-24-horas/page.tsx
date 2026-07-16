// src/app/teleconsulta-24-horas/page.tsx
//
// Cubre la disponibilidad horaria de la teleconsulta a nivel nacional,
// distinta de /medico-a-domicilio-24-horas (que es solo CABA, atencion
// presencial). Util para quien no tiene guardia medica cerca a la noche.

import type { Metadata } from "next";
import Script from "next/script";
import { Clock3, Video, CalendarDays, ShieldCheck } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/teleconsulta-24-horas";

export const metadata: Metadata = {
  title: "Teleconsulta las 24 horas",
  description:
    "Teleconsulta médica disponible las 24 horas, todos los días del año, en toda Argentina. Hablá con un médico matriculado por videollamada a cualquier hora.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Teleconsulta las 24 horas | DocYa",
    description:
      "Teleconsulta médica disponible las 24 horas, todos los días del año, en toda Argentina.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleconsulta las 24 horas | DocYa",
    description: "De madrugada, fines de semana y feriados, desde cualquier provincia.",
  },
};

const FAQS = [
  {
    question: "¿Hay teleconsulta de madrugada?",
    answer:
      "Sí, tenemos médicos matriculados disponibles también de madrugada. La app te muestra si hay un profesional libre para tomar tu videollamada en ese momento.",
  },
  {
    question: "¿Atienden fines de semana y feriados?",
    answer:
      "Sí, la teleconsulta funciona los 365 días del año, incluidos fines de semana y feriados, en cualquier provincia del país.",
  },
  {
    question: "¿Sirve si no tengo guardia médica disponible en mi ciudad?",
    answer:
      "Sí, es uno de los casos más frecuentes: en muchas localidades del interior no hay guardia médica accesible de noche, y la teleconsulta permite hablar con un médico matriculado igual.",
  },
  {
    question: "¿Cuánto tardo en conectarme con un médico de noche?",
    answer:
      "Habitualmente en minutos, aunque puede variar levemente según la disponibilidad de profesionales de guardia en ese horario puntual.",
  },
  {
    question: "¿Puedo pedir una receta o certificado a la madrugada?",
    answer:
      "Sí, si el médico lo considera pertinente después de evaluar tu situación, puede emitir la receta o el certificado con firma digital al finalizar la videollamada, sea cual sea el horario.",
  },
];

export default function Teleconsulta24HorasPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Teleconsulta las 24 horas",
    alternateName: ["Teleconsulta nocturna", "Teleconsulta de madrugada", "Médico online 24 horas"],
    description:
      "Teleconsulta médica por videollamada disponible las 24 horas, los 365 días del año, para pacientes de toda Argentina.",
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-teleconsulta-24-horas"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Teleconsulta las 24 horas", href: PATH },
        ]}
      />

      <SeoHero
        badge="Todos los días, a cualquier hora"
        title="Teleconsulta"
        titleHighlight="las 24 horas"
        description="Hablá con un médico matriculado por videollamada a cualquier hora del día, en cualquier provincia de Argentina, sin turno previo."
        primaryCta={{ label: "Pedir teleconsulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Prefiero que venga a mi casa", href: "/medico-a-domicilio-24-horas" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir teleconsulta" />

      <SeoContentSection
        heading="Teleconsulta disponible a cualquier hora, en todo el país"
        paragraphs={[
          "Muchas localidades del interior del país no tienen guardia médica accesible de noche o en feriados, y trasladarse a la ciudad más cercana con atención puede tomar horas. La teleconsulta resuelve eso: un médico matriculado te atiende por videollamada a cualquier hora, sin importar en qué provincia estés.",
          "El proceso es el mismo sin importar el horario: pedís la teleconsulta desde la app, indicás el motivo de consulta, y un médico disponible te contacta por videollamada. Si tu cuadro necesita una evaluación presencial, te lo indica en la misma consulta.",
        ]}
      />

      <BenefitsGrid
        heading="Disponibilidad todos los días, a toda hora"
        items={[
          {
            icon: <Clock3 size={22} />,
            title: "Disponible de madrugada",
            description: "Médicos matriculados de guardia también fuera del horario habitual.",
          },
          {
            icon: <Video size={22} />,
            title: "Sin salir de tu casa",
            description: "La consulta es por videollamada, sin necesidad de trasladarte a ningún lado.",
          },
          {
            icon: <CalendarDays size={22} />,
            title: "Fines de semana y feriados",
            description: "La teleconsulta funciona los 365 días del año, en cualquier provincia.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Médicos matriculados de guardia",
            description: "La guardia nocturna tiene la misma exigencia que cualquier otro horario.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-teleconsulta-24-horas"
        title="Preguntas frecuentes sobre la teleconsulta las 24 horas"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Disponible en toda Argentina" },
          { label: "Teleconsulta en toda Argentina", href: "/teleconsulta-argentina", description: "Cobertura por provincia" },
          { label: "Médico a domicilio las 24 horas", href: "/medico-a-domicilio-24-horas", description: "Atención presencial en CABA a cualquier hora" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="¿Necesitás un médico ahora, sea la hora que sea?"
        subtitle="Pedí tu teleconsulta desde la app, disponible los 365 días del año, en cualquier provincia."
        ctaLabel="Pedir teleconsulta"
      />

      <Script
        id="ld-service-teleconsulta-24-horas"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
