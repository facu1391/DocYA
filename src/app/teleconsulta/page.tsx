// src/app/teleconsulta/page.tsx
//
// Pagina "hub" del termino generico "teleconsulta": cubre tambien las
// variantes "teleconsulta online", "teleconsulta medica" y "consulta medica
// online" via alternateName, en lugar de crear una pagina por variante (son
// el mismo termino con distinta redaccion). Es la contraparte nacional de
// /medico-a-domicilio-caba; /teleconsulta-particular sigue cubriendo
// especificamente el angulo de pago sin obra social ni prepaga.

import type { Metadata } from "next";
import Script from "next/script";
import { Video, Clock3, ShieldCheck, Pill } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/teleconsulta";

export const metadata: Metadata = {
  title: "Teleconsulta médica online",
  description:
    "Teleconsulta médica online en toda Argentina. Hablá con un médico matriculado por videollamada en minutos, obtené receta o certificado si corresponde.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Teleconsulta médica online | DocYa",
    description:
      "Teleconsulta médica online en toda Argentina, con médicos matriculados por videollamada.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleconsulta médica online | DocYa",
    description: "Hablá con un médico matriculado por videollamada, en cualquier provincia.",
  },
};

const FAQS = [
  {
    question: "¿La teleconsulta funciona en todo el país?",
    answer:
      "Sí. A diferencia de la visita a domicilio, que hoy cubrimos en CABA, la teleconsulta está disponible para pacientes de cualquier provincia de Argentina.",
  },
  {
    question: "¿Qué necesito para hacer una teleconsulta?",
    answer:
      "Solo un celular o computadora con cámara y conexión a internet. Pedís la teleconsulta desde la app y un médico matriculado te contacta por videollamada.",
  },
  {
    question: "¿Qué diferencia hay entre teleconsulta y médico a domicilio?",
    answer:
      "La teleconsulta es una consulta por videollamada, sin traslado del médico; el médico a domicilio implica una visita presencial. Si tu cuadro se puede resolver sin examen físico, la teleconsulta suele ser más rápida.",
  },
  {
    question: "¿Puedo obtener receta o certificado por teleconsulta?",
    answer:
      "Sí, si el médico lo considera pertinente después de evaluar tu situación, emite la receta o el certificado con firma digital al finalizar la videollamada.",
  },
  {
    question: "¿Cuánto cuesta una teleconsulta?",
    answer:
      "El precio se muestra en la app antes de confirmar el pedido, así sabés exactamente cuánto vas a pagar antes de iniciar la videollamada.",
  },
];

export default function TeleconsultaPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Teleconsulta médica online",
    alternateName: ["Teleconsulta médica", "Consulta médica online", "Médico online"],
    description:
      "Consulta médica por videollamada con médicos matriculados, disponible para pacientes de toda Argentina.",
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-teleconsulta"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Teleconsulta médica online", href: PATH },
        ]}
      />

      <SeoHero
        badge="Disponible en toda Argentina"
        title="Teleconsulta"
        titleHighlight="médica online"
        description="Hablá con un médico matriculado por videollamada desde cualquier provincia del país, en minutos y sin turno previo."
        primaryCta={{ label: "Pedir teleconsulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Prefiero que venga a mi casa", href: "/medico-a-domicilio-caba" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir teleconsulta" />

      <SeoContentSection
        heading="Cómo funciona la teleconsulta médica online"
        paragraphs={[
          "Pedís la teleconsulta desde la app indicando el motivo de consulta, y un médico matriculado disponible te contacta por videollamada. No hace falta turno previo ni estar en una ciudad en particular: la teleconsulta funciona para pacientes de cualquier provincia de Argentina.",
          "Es la opción más rápida para cuadros que no requieren un examen físico presencial: consultas generales, seguimiento de tratamientos, dudas sobre medicación o la necesidad de una receta o un certificado. Si el médico considera que tu caso necesita una evaluación presencial, te lo indica en la misma consulta.",
        ]}
      />

      <BenefitsGrid
        heading="Por qué elegir la teleconsulta con DocYa"
        items={[
          {
            icon: <Video size={22} />,
            title: "Por videollamada, desde cualquier provincia",
            description: "No necesitás estar en CABA: la teleconsulta funciona en todo el país.",
          },
          {
            icon: <Clock3 size={22} />,
            title: "Conexión en minutos",
            description: "Un médico disponible te contacta por videollamada poco después de confirmar el pedido.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Médicos matriculados",
            description: "Todos los profesionales que atienden por teleconsulta están verificados y matriculados.",
          },
          {
            icon: <Pill size={22} />,
            title: "Receta y certificado si corresponde",
            description: "Si el médico lo indica, emite receta o certificado con firma digital al finalizar.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-teleconsulta"
        title="Preguntas frecuentes sobre la teleconsulta médica online"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Teleconsulta particular", href: "/teleconsulta-particular", description: "Sin obra social ni prepaga" },
          { label: "Teleconsulta las 24 horas", href: "/teleconsulta-24-horas", description: "Disponible a cualquier hora" },
          { label: "Teleconsulta en toda Argentina", href: "/teleconsulta-argentina", description: "Cobertura por provincia" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="¿Necesitás hablar con un médico ahora?"
        subtitle="Pedí tu teleconsulta desde la app y hablá con un médico matriculado por videollamada en minutos."
        ctaLabel="Pedir teleconsulta"
      />

      <Script
        id="ld-service-teleconsulta"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
