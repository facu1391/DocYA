// src/app/certificado-medico-online/page.tsx
//
// Cubre "certificado medico online". Intencion distinta a receta: quien
// busca esto necesita un documento para presentar ante un empleador,
// colegio o institucion, no medicacion.

import type { Metadata } from "next";
import Script from "next/script";
import { FileCheck2, Briefcase, GraduationCap, Home } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/certificado-medico-online";

export const metadata: Metadata = {
  title: "Certificado médico online",
  description:
    "Certificado médico laboral, escolar o de reposo, emitido por un médico matriculado tras una teleconsulta o visita a domicilio. Sin obra social ni turno previo.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Certificado médico online | DocYa",
    description:
      "Certificado médico laboral, escolar o de reposo, emitido por un médico matriculado tras una consulta.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificado médico online | DocYa",
    description: "Certificado laboral, escolar o de reposo, con firma digital.",
  },
};

const FAQS = [
  {
    question: "¿El certificado médico online sirve para presentar en mi trabajo?",
    answer:
      "Sí, el certificado incluye los datos y la firma digital del médico matriculado que te atendió, con la información necesaria para justificar la ausencia laboral.",
  },
  {
    question: "¿Puedo pedir un certificado escolar para mi hijo?",
    answer:
      "Sí, es uno de los motivos más frecuentes de consulta, especialmente combinado con controles pediátricos a domicilio.",
  },
  {
    question: "¿Necesito que un médico me revise antes de emitir el certificado?",
    answer:
      "Sí. El certificado se emite después de una consulta real, por teleconsulta o a domicilio, en la que el médico evalúa tu situación y determina si corresponde reposo o justificación.",
  },
  {
    question: "¿Puedo pedirlo sin obra social?",
    answer:
      "Sí, podés pagar la consulta de forma particular y obtener el certificado sin necesidad de estar afiliado a una obra social o prepaga.",
  },
  {
    question: "¿Cuánto tarda en emitirse el certificado?",
    answer:
      "Se genera desde la app apenas termina la consulta, ya sea por teleconsulta o después de la visita a domicilio.",
  },
];

export default function CertificadoMedicoOnlinePage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Certificado médico online",
    alternateName: [
      "Certificado médico laboral online",
      "Certificado médico escolar online",
      "Certificado médico para el trabajo",
      "Constancia médica",
    ],
    description:
      "Emisión de certificados médicos (laboral, escolar o de reposo) tras una consulta por teleconsulta o a domicilio con un médico matriculado.",
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-certificado-online"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Certificado médico online", href: PATH },
        ]}
      />

      <SeoHero
        badge="Firma digital de médico matriculado"
        title="Certificado médico"
        titleHighlight="online"
        description="Consultá con un médico por teleconsulta o a domicilio y obtené tu certificado laboral, escolar o de reposo con firma digital."
        primaryCta={{ label: "Pedir consulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Ver cómo funciona", href: "/#como-funciona" }}
      />

      <DifferentiatorBanner ctaLabel="Solicitar certificado" />

      <SeoContentSection
        heading="Cómo conseguir un certificado médico online"
        paragraphs={[
          "El certificado médico se emite después de una consulta real: un médico matriculado evalúa tu situación por teleconsulta o en una visita a domicilio y, si corresponde, genera el certificado con firma digital desde la app. No es un trámite automático, siempre hay una evaluación médica de por medio.",
          "Es uno de los motivos de consulta más frecuentes junto con la receta médica online: certificados laborales para justificar una ausencia, escolares para chicos que no pueden ir a clase, o de reposo domiciliario después de una consulta por un cuadro puntual.",
        ]}
      />

      <BenefitsGrid
        heading="Tipos de certificado que podés solicitar"
        items={[
          {
            icon: <Briefcase size={22} />,
            title: "Certificado laboral",
            description: "Para justificar una ausencia al trabajo por motivos de salud.",
          },
          {
            icon: <GraduationCap size={22} />,
            title: "Certificado escolar",
            description: "Para justificar la ausencia de un chico o adolescente a clase.",
          },
          {
            icon: <Home size={22} />,
            title: "Reposo domiciliario",
            description: "Cuando el médico indica reposo en casa después de la consulta.",
          },
          {
            icon: <FileCheck2 size={22} />,
            title: "Firma digital",
            description: "Cada certificado queda firmado digitalmente por el médico matriculado.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-certificado-online"
        title="Preguntas frecuentes sobre el certificado médico online"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Certificado médico laboral", href: "/certificado-medico-laboral", description: "Para justificar una ausencia al trabajo" },
          { label: "Certificado médico escolar", href: "/certificado-medico-escolar", description: "Para justificar la inasistencia a clase" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Teleconsulta particular", href: "/teleconsulta-particular", description: "Atención por videollamada, sin obra social" },
          { label: "Médico a domicilio particular", href: "/medico-a-domicilio-particular", description: "Sin obra social ni prepaga" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="Pedí tu certificado médico online"
        subtitle="Consultá por teleconsulta o a domicilio y obtené el certificado con firma digital al finalizar."
        ctaLabel="Solicitar consulta"
      />

      <Script
        id="ld-service-certificado-online"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
