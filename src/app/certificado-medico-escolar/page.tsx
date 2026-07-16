// src/app/certificado-medico-escolar/page.tsx
//
// Profundiza el angulo escolar del hub /certificado-medico-online. Foco en
// el contexto pediatrico/institucion educativa, distinto del angulo laboral
// de /certificado-medico-laboral.

import type { Metadata } from "next";
import Script from "next/script";
import { GraduationCap, Stethoscope, Clock3, FileCheck2 } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/certificado-medico-escolar";

export const metadata: Metadata = {
  title: "Certificado médico escolar",
  description:
    "Certificado médico escolar para justificar la inasistencia de tu hijo a clase, con firma digital de un médico matriculado. Por teleconsulta o a domicilio.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Certificado médico escolar | DocYa",
    description:
      "Certificado médico escolar con firma digital, emitido tras una consulta pediátrica real.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificado médico escolar | DocYa",
    description: "Para justificar la inasistencia a clase, con firma digital.",
  },
};

const FAQS = [
  {
    question: "¿El certificado escolar sirve para cualquier colegio?",
    answer:
      "Sí, incluye los datos y la firma digital del médico matriculado que evaluó a tu hijo, con la información habitual que piden las instituciones educativas para justificar una inasistencia.",
  },
  {
    question: "¿Necesito llevar a mi hijo a una consulta presencial?",
    answer:
      "No necesariamente. Podés elegir una visita a domicilio si preferís una evaluación presencial, o una teleconsulta si el cuadro no requiere examen físico.",
  },
  {
    question: "¿Puedo pedirlo por teleconsulta?",
    answer:
      "Sí, si el médico considera que el cuadro se puede evaluar por videollamada, emite el certificado escolar al finalizar la consulta, igual que en una visita a domicilio.",
  },
  {
    question: "¿Qué información incluye el certificado?",
    answer:
      "Los datos del médico matriculado, el motivo general de la consulta y los días de inasistencia justificados, con firma digital verificable.",
  },
  {
    question: "¿Sirve también para actividades extracurriculares o deportivas?",
    answer:
      "Sí, además del uso escolar habitual, muchas familias lo usan para justificar la ausencia a actividades deportivas o extracurriculares organizadas por la institución.",
  },
];

export default function CertificadoMedicoEscolarPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Certificado médico escolar",
    alternateName: ["Certificado médico para el colegio", "Justificativo médico escolar"],
    description:
      "Emisión de certificado médico escolar con firma digital, tras una consulta pediátrica real por teleconsulta o a domicilio.",
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-certificado-escolar"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Certificado médico online", href: "/certificado-medico-online" },
          { label: "Certificado médico escolar", href: PATH },
        ]}
      />

      <SeoHero
        badge="Para justificar la inasistencia a clase"
        title="Certificado médico"
        titleHighlight="escolar"
        description="Consultá con un médico por teleconsulta o a domicilio y obtené el certificado escolar de tu hijo con firma digital, listo para presentar en el colegio."
        primaryCta={{ label: "Pedir consulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Ver otros certificados", href: "/certificado-medico-online" }}
      />

      <DifferentiatorBanner ctaLabel="Solicitar certificado escolar" />

      <SeoContentSection
        heading="Cómo conseguir un certificado médico escolar"
        paragraphs={[
          "Cuando un chico falta al colegio por un cuadro de salud, muchas instituciones piden un certificado médico que respalde la inasistencia. El certificado se emite después de que un médico matriculado evalúa la situación, ya sea en una consulta pediátrica a domicilio o por teleconsulta si el cuadro no requiere examen físico.",
          "Es uno de los motivos de consulta más frecuentes junto con los controles pediátricos generales: fiebre, dolor de garganta o cuadros virales que llevan a que el chico falte a clase uno o varios días. El certificado queda disponible en la app con firma digital apenas termina la consulta.",
        ]}
      />

      <BenefitsGrid
        heading="Qué incluye el certificado escolar"
        items={[
          {
            icon: <GraduationCap size={22} />,
            title: "Válido para presentar en el colegio",
            description: "Incluye los datos habituales que piden las instituciones educativas para justificar la ausencia.",
          },
          {
            icon: <Stethoscope size={22} />,
            title: "Tras una evaluación pediátrica real",
            description: "El médico revisa el cuadro del chico antes de emitir cualquier certificado.",
          },
          {
            icon: <Clock3 size={22} />,
            title: "Disponible el mismo día",
            description: "Se genera en la app apenas termina la consulta, ya sea presencial o por videollamada.",
          },
          {
            icon: <FileCheck2 size={22} />,
            title: "Firma digital",
            description: "Cada certificado queda firmado digitalmente por el médico matriculado que atendió.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-certificado-escolar"
        title="Preguntas frecuentes sobre el certificado médico escolar"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Certificado médico laboral", href: "/certificado-medico-laboral", description: "Para justificar una ausencia al trabajo" },
          { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Elegí tu barrio" },
          { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Atención por videollamada" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="Pedí el certificado escolar de tu hijo"
        subtitle="Consultá por teleconsulta o a domicilio y obtené el certificado con firma digital al finalizar."
        ctaLabel="Solicitar consulta"
      />

      <Script
        id="ld-service-certificado-escolar"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
