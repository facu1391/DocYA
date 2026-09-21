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
  title: "Certificado médico online con evaluación médica",
  description:
    "Solicitá una consulta médica online o a domicilio. Un médico matriculado evalúa tu caso y, solo si corresponde, emite un certificado médico digital.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Certificado médico online | DocYa",
    description:
      "Solicitá una consulta médica. Un profesional evalúa tu caso y puede emitir un certificado si corresponde.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificado médico online | DocYa",
    description: "Consulta médica con evaluación profesional y certificado digital si corresponde.",
  },
};

const FAQS = [
  {
    question: "¿Sirve un certificado médico online para el trabajo?",
    answer:
      "Si el médico considera que corresponde emitirlo, el certificado para trabajo incluye sus datos y firma digital. Consultá con tu empleador qué requisitos de presentación solicita.",
  },
  {
    question: "¿Puedo pedir un certificado escolar para mi hijo?",
    answer:
      "Podés solicitar una consulta por ese motivo. El profesional evalúa al paciente y decide si corresponde emitir un certificado escolar.",
  },
  {
    question: "¿Necesito que un médico me revise antes de emitir el certificado?",
    answer:
      "Sí. El certificado se emite después de una consulta real, por teleconsulta o a domicilio, en la que el médico evalúa tu situación y determina si corresponde reposo o justificación.",
  },
  {
    question: "¿Puedo pedirlo sin obra social?",
    answer:
      "Sí, podés pedir una consulta particular sin obra social ni prepaga. La emisión del certificado depende de la evaluación médica.",
  },
  {
    question: "¿Dónde encuentro el certificado si el médico lo emite?",
    answer:
      "Los documentos emitidos quedan en Mis consultas, dentro de la sección Documentos y la pestaña Certificados. Desde allí podés abrir el archivo disponible.",
  },
  {
    question: "¿El certificado está garantizado?",
    answer: "No. DocYa permite solicitar una consulta; solo el médico que te evalúa decide si corresponde emitir un certificado.",
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
      "Consulta médica por teleconsulta o a domicilio. Tras evaluar al paciente, el profesional puede emitir un certificado médico si corresponde.",
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
        badge="Consulta con médico matriculado"
        title="Certificado médico online"
        titleHighlight="con evaluación médica"
        description="Solicitá una consulta por teleconsulta o a domicilio. El médico evalúa tu caso y, si corresponde, puede emitir un certificado digital."
        primaryCta={{ label: "Pedir consulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Ver cómo funciona", href: "/#como-funciona" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir consulta médica" />

      <SeoContentSection
        heading="Cómo conseguir un certificado médico online"
        paragraphs={[
          "El certificado médico se emite después de una consulta real: un médico matriculado evalúa tu situación por teleconsulta o en una visita a domicilio y, si corresponde, genera el certificado con firma digital desde la app. No es un trámite automático, siempre hay una evaluación médica de por medio.",
          "Un certificado médico es un documento emitido por un profesional tras evaluar a un paciente. Podés pedir una consulta particular desde DocYa, indicar el motivo y elegir teleconsulta o visita a domicilio según tu necesidad. El médico decide si corresponde documentar una ausencia laboral, escolar o un reposo.",
        ]}
      />

      <SeoContentSection
        heading="Certificado médico digital después de la consulta"
        paragraphs={[
          "Si el profesional emite un certificado, el documento queda disponible en Mis consultas, dentro de Documentos > Certificados, para abrirlo desde la app. La firma digital y los datos del médico constan en el documento.",
          "Para un certificado médico para trabajo, explicá el motivo de la consulta y los requisitos que te pida tu empleador. La aceptación del documento depende de quien lo recibe; DocYa no garantiza su emisión ni su aceptación.",
        ]}
      />

      <BenefitsGrid
        heading="Tipos de certificado que podés solicitar"
        items={[
          {
            icon: <Briefcase size={22} />,
            title: "Certificado laboral",
            description: "Puede emitirse para documentar una ausencia al trabajo si la evaluación lo justifica.",
          },
          {
            icon: <GraduationCap size={22} />,
            title: "Certificado escolar",
            description: "Puede documentar una inasistencia escolar si el profesional lo considera indicado.",
          },
          {
            icon: <Home size={22} />,
            title: "Reposo domiciliario",
            description: "Solo cuando el médico indica reposo después de evaluar al paciente.",
          },
          {
            icon: <FileCheck2 size={22} />,
            title: "Firma digital",
            description: "El certificado emitido incluye la firma digital del médico matriculado.",
          },
        ]}
      />

      <SeoFaqSection
        title="Preguntas frecuentes sobre el certificado médico online"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Certificado médico laboral", href: "/certificado-medico-laboral", description: "Para justificar una ausencia al trabajo" },
          { label: "Certificado médico escolar", href: "/certificado-medico-escolar", description: "Para justificar la inasistencia a clase" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Si el profesional la indica" },
          { label: "Orden médica online", href: "/orden-medica-online", description: "Estudios indicados después de una consulta" },
          { label: "Teleconsulta particular", href: "/teleconsulta-particular", description: "Atención por videollamada, sin obra social" },
          { label: "Médico a domicilio particular", href: "/medico-a-domicilio-particular", description: "Sin obra social ni prepaga" },
          { label: "Centro de Ayuda DocYa", href: "/centro-de-ayuda/certificados", description: "Más dudas sobre certificados médicos" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="Solicitá una consulta médica"
        subtitle="Contale al profesional qué necesitás. Si corresponde clínicamente, podrá emitir el certificado."
        ctaLabel="Pedir consulta"
      />

      <Script
        id="ld-service-certificado-online"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
