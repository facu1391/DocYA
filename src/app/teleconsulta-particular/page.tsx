// src/app/teleconsulta-particular/page.tsx
//
// Cubre: "teleconsulta particular", "teleconsulta sin obra social",
// "teleconsulta sin prepaga" y "medico online particular". Este ultimo
// termino no tiene pagina propia: es sinonimo de teleconsulta y se
// resuelve aca para no competir por la misma intencion con dos paginas.

import type { Metadata } from "next";
import Script from "next/script";
import { Video, Clock3, ShieldCheck, Wallet } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/teleconsulta-particular";

export const metadata: Metadata = {
  title: "Teleconsulta particular, sin obra social ni prepaga",
  description:
    "Teleconsulta médica particular por videollamada, sin obra social ni prepaga. Hablá con un médico matriculado en minutos desde donde estés.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Teleconsulta particular, sin obra social ni prepaga | DocYa",
    description:
      "Teleconsulta médica particular por videollamada, sin obra social ni prepaga. Hablá con un médico en minutos.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleconsulta particular | DocYa",
    description: "Médico online particular, sin obra social ni prepaga.",
  },
};

const FAQS = [
  {
    question: "¿Puedo pedir una teleconsulta sin obra social?",
    answer:
      "Sí. La teleconsulta particular se paga directamente en la app, sin necesidad de tener obra social ni prepaga.",
  },
  {
    question: "¿Atienden teleconsultas sin prepaga?",
    answer:
      "Sí, es el caso más habitual: pagás la consulta de forma particular y, si tu prepaga reintegra teleconsultas, te damos el comprobante para el reembolso.",
  },
  {
    question: "¿Es lo mismo un médico online que una teleconsulta?",
    answer:
      "Sí, son la misma modalidad: hablás con un médico matriculado por videollamada desde la app, sin necesidad de trasladarte.",
  },
  {
    question: "¿Cuánto tarda en conectarme un médico por teleconsulta?",
    answer:
      "Habitualmente en minutos. Pedís la teleconsulta desde la app y un médico disponible te contacta por videollamada.",
  },
  {
    question: "¿Qué tipo de consultas se pueden resolver por teleconsulta?",
    answer:
      "Consultas generales, seguimiento de tratamientos, dudas sobre medicación, certificados y recetas cuando el cuadro no requiere un examen físico presencial. Si el médico considera que necesitás una visita a domicilio, te lo indica en la misma consulta.",
  },
];

export default function TeleconsultaParticularPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Teleconsulta médica particular",
    alternateName: [
      "Teleconsulta sin obra social",
      "Teleconsulta sin prepaga",
      "Médico online particular",
    ],
    description:
      "Consulta médica por videollamada con pago particular, sin necesidad de obra social ni prepaga.",
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-teleconsulta-particular"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Teleconsulta particular", href: PATH },
        ]}
      />

      <SeoHero
        badge="Médico online, sin obra social ni prepaga"
        title="Teleconsulta"
        titleHighlight="particular"
        description="Hablá con un médico matriculado por videollamada y pagá la consulta de forma particular, sin depender de una obra social o prepaga."
        primaryCta={{ label: "Pedir teleconsulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Prefiero que venga a mi casa", href: "/medico-a-domicilio-particular" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir teleconsulta" />

      <SeoContentSection
        heading="Médico online particular, sin trámites previos"
        paragraphs={[
          "Si no tenés obra social, o la tenés pero no querés depender de una autorización o un turno, podés resolver muchas consultas por teleconsulta particular: hablás con un médico matriculado por videollamada, pagás desde la app y listo.",
          "Es una alternativa a la consulta a domicilio para los casos que no requieren un examen físico presencial: seguimiento de un tratamiento, dudas sobre medicación, una receta que necesitás renovar o un certificado. Si el médico considera que tu caso necesita una visita, te lo indica en la misma consulta y podés pedir un médico a domicilio particular a continuación.",
          "La consulta médica online particular está disponible desde cualquier provincia de Argentina. El valor se informa antes de confirmar y no necesitás presentar credencial, autorización ni derivación para solicitarla.",
        ]}
      />

      <BenefitsGrid
        heading="Por qué elegir la teleconsulta particular con DocYa"
        items={[
          {
            icon: <Video size={22} />,
            title: "Por videollamada, desde donde estés",
            description: "No necesitás trasladarte: la consulta es por video desde tu celular o computadora.",
          },
          {
            icon: <Clock3 size={22} />,
            title: "Conexión en minutos",
            description: "Un médico disponible te contacta por videollamada poco después de confirmar el pedido.",
          },
          {
            icon: <Wallet size={22} />,
            title: "Precio particular, sin sorpresas",
            description: "Ves el costo de la teleconsulta antes de confirmar el pedido.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Médicos matriculados",
            description: "La misma exigencia que en la consulta a domicilio: profesionales verificados.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-teleconsulta-particular"
        title="Preguntas frecuentes sobre teleconsulta particular"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Médico online", href: "/medico-online", description: "Consulta por videollamada en toda Argentina" },
          { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Disponible en toda Argentina" },
          { label: "Médico a domicilio particular", href: "/medico-a-domicilio-particular", description: "Sin obra social ni prepaga" },
          { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Elegí tu barrio" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="Pedí tu teleconsulta particular"
        subtitle="Sin obra social ni prepaga. Hablás con un médico matriculado por videollamada en minutos."
        ctaLabel="Pedir teleconsulta"
      />

      <Script
        id="ld-service-teleconsulta-particular"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
