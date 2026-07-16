// src/app/medico-clinico-a-domicilio/page.tsx
//
// Cubre "medico clinico a domicilio": intencion distinta del resto del
// cluster porque especifica la especialidad (clinica medica / medicina
// general), no el horario, el precio o la urgencia. Util para quien
// busca puntualmente un clinico y no, por ejemplo, un pediatra.

import type { Metadata } from "next";
import Script from "next/script";
import { Stethoscope, Users, FileText, Pill } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/medico-clinico-a-domicilio";

export const metadata: Metadata = {
  title: "Médico clínico a domicilio",
  description:
    "Médico clínico matriculado a domicilio para adultos y adultos mayores. Evaluación general, diagnóstico y derivación a especialista si corresponde.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Médico clínico a domicilio | DocYa",
    description:
      "Médico clínico matriculado a domicilio para evaluación general, diagnóstico y tratamiento.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Médico clínico a domicilio | DocYa",
    description: "Evaluación clínica general para adultos y adultos mayores, en tu domicilio.",
  },
};

const FAQS = [
  {
    question: "¿Qué diferencia hay entre un médico clínico y un médico de guardia?",
    answer:
      "En DocYa todos los médicos que atienden a domicilio están matriculados y capacitados para evaluar cuadros generales, igual que un clínico de guardia. La diferencia práctica es que la consulta es en tu domicilio, sin trasladarte ni esperar.",
  },
  {
    question: "¿Un médico clínico atiende adultos mayores?",
    answer:
      "Sí, buena parte de las consultas clínicas a domicilio son controles y seguimiento de adultos mayores: presión, medicación crónica, chequeos generales y cuadros puntuales.",
  },
  {
    question: "¿El médico clínico me puede derivar a un especialista?",
    answer:
      "Sí, si tu cuadro requiere la evaluación de un especialista puntual (cardiólogo, traumatólogo, dermatólogo, entre otros), el clínico te lo indica como parte de la consulta.",
  },
  {
    question: "¿Atiende cualquier síntoma o solo cuadros específicos?",
    answer:
      "El médico clínico evalúa cuadros generales de adultos: fiebre, dolores, síntomas respiratorios o digestivos, control de enfermedades crónicas y chequeos de rutina, entre otros motivos habituales.",
  },
  {
    question: "¿Necesito estudios previos para la consulta?",
    answer:
      "No es necesario. El médico evalúa tu situación en el momento y, si hace falta, te indica qué estudios pedir para completar el diagnóstico.",
  },
];

export default function MedicoClinicoADomicilioPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Médico clínico a domicilio",
    alternateName: ["Clínico médico a domicilio", "Médico generalista a domicilio"],
    description:
      "Atención de médico clínico matriculado a domicilio: evaluación general de adultos y adultos mayores, con derivación a especialista cuando corresponde.",
    url: PATH,
    areaServedName: "Ciudad Autónoma de Buenos Aires",
    areaServedType: "City",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-medico-clinico"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Médico clínico a domicilio", href: PATH },
        ]}
      />

      <SeoHero
        badge="Especialidad clínica médica"
        title="Médico clínico"
        titleHighlight="a domicilio"
        description="Pedí un médico clínico matriculado a tu domicilio para una evaluación general, diagnóstico y tratamiento, o derivación a especialista si corresponde."
        primaryCta={{ label: "Solicitar médico clínico", href: "/pedir" }}
        secondaryCta={{ label: "Prefiero una teleconsulta", href: "/teleconsulta" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir médico clínico" />

      <SeoContentSection
        heading="Qué hace un médico clínico a domicilio"
        paragraphs={[
          "El médico clínico es quien evalúa cuadros generales en adultos: fiebre, dolores, síntomas respiratorios o digestivos, control de presión y de enfermedades crónicas, entre otros motivos de consulta habituales. Es el primer profesional al que conviene consultar cuando no está claro si el cuadro necesita un especialista puntual.",
          "En una consulta a domicilio, el médico clínico hace el mismo examen que haría en un consultorio: evaluación general, diagnóstico, indicaciones de tratamiento y, si corresponde, receta o certificado. Si el cuadro requiere la mirada de un especialista -cardiólogo, traumatólogo, dermatólogo, entre otros- te lo indica como parte de la misma consulta.",
        ]}
      />

      <BenefitsGrid
        heading="Qué incluye la consulta con el médico clínico"
        items={[
          {
            icon: <Stethoscope size={22} />,
            title: "Evaluación clínica completa",
            description: "Examen general, diagnóstico e indicaciones de tratamiento en el momento.",
          },
          {
            icon: <Users size={22} />,
            title: "Para adultos y adultos mayores",
            description: "Consultas generales y seguimiento de tratamientos crónicos en tu domicilio.",
          },
          {
            icon: <FileText size={22} />,
            title: "Deriva a especialista si corresponde",
            description: "Si el cuadro lo requiere, te indica qué especialista consultar a continuación.",
          },
          {
            icon: <Pill size={22} />,
            title: "Receta y certificado",
            description: "Si corresponde, el médico emite receta o certificado al finalizar la consulta.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-medico-clinico"
        title="Preguntas frecuentes sobre el médico clínico a domicilio"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Médico a domicilio urgente", href: "/medico-a-domicilio-urgente", description: "Para cuadros agudos que necesitan atención prioritaria" },
          { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Elegí tu barrio" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="¿Necesitás un médico clínico a domicilio?"
        subtitle="Pedilo desde la app y un profesional matriculado te atiende en tu casa, sin turno previo."
      />

      <Script
        id="ld-service-medico-clinico"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
