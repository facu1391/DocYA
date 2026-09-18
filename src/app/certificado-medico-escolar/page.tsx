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
      "Si el profesional emite un certificado, incluye sus datos y firma digital. Consultá con el colegio los requisitos para presentarlo.",
  },
  {
    question: "¿Necesito llevar a mi hijo a una consulta presencial?",
    answer:
      "No necesariamente. Podés elegir una visita a domicilio si preferís una evaluación presencial, o una teleconsulta si el cuadro no requiere examen físico.",
  },
  {
    question: "¿Puedo pedirlo por teleconsulta?",
    answer:
      "Podés solicitar una teleconsulta si el cuadro permite una evaluación por video. El médico decide si corresponde emitir un certificado escolar.",
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
        description="Solicitá una consulta por una inasistencia escolar. El profesional evalúa al paciente y puede emitir un certificado si corresponde."
        primaryCta={{ label: "Pedir consulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Ver otros certificados", href: "/certificado-medico-online" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir consulta médica" />

      <SeoContentSection
        heading="Cómo conseguir un certificado médico escolar"
        paragraphs={[
          "Cuando un chico falta al colegio por un cuadro de salud, muchas instituciones piden un certificado médico que respalde la inasistencia. El certificado se emite después de que un médico matriculado evalúa la situación, ya sea en una consulta pediátrica a domicilio o por teleconsulta si el cuadro no requiere examen físico.",
          "Ante una inasistencia por motivos de salud, podés pedir una consulta. Si el profesional emite un certificado con firma digital, queda disponible en Mis consultas > Documentos > Certificados.",
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
          { label: "Centro de Ayuda DocYa", href: "/centro-de-ayuda/certificados", description: "Más dudas sobre certificados médicos" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="Pedí el certificado escolar de tu hijo"
        subtitle="Solicitá una consulta; el médico decidirá si corresponde emitir el certificado."
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
