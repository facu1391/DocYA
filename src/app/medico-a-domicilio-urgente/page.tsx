// src/app/medico-a-domicilio-urgente/page.tsx
//
// Cubre la intencion de urgencia por gravedad del cuadro ("medico urgente a
// domicilio"), distinta de /medico-a-domicilio-24-horas (que responde a la
// disponibilidad horaria). Esta pagina tambien cumple una funcion de
// seguridad: aclara que para una emergencia real hay que llamar al servicio
// de emergencias, no pedir un domicilio.

import type { Metadata } from "next";
import Script from "next/script";
import { AlertTriangle, Clock3, Stethoscope, ShieldCheck } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/medico-a-domicilio-urgente";

export const metadata: Metadata = {
  title: "Médico a domicilio urgente",
  description:
    "Médico a domicilio urgente para cuadros agudos: fiebre alta, dolores intensos, golpes o alergias. Atención prioritaria, sin turno previo, en CABA.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Médico a domicilio urgente | DocYa",
    description:
      "Atención médica prioritaria a domicilio para cuadros agudos que no pueden esperar un turno.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Médico a domicilio urgente | DocYa",
    description: "Atención prioritaria para cuadros agudos, sin turno previo.",
  },
};

const FAQS = [
  {
    question: "¿Qué se considera una urgencia médica que puede resolverse a domicilio?",
    answer:
      "Cuadros como fiebre alta, dolor abdominal intenso, vómitos persistentes, alergias, golpes o cortes que no comprometen la vida. Un médico a domicilio evalúa la situación y decide el tratamiento o, si hace falta, indica trasladarse a un centro con mayor capacidad.",
  },
  {
    question: "¿Cuándo debo llamar al servicio de emergencias en lugar de pedir un médico a domicilio?",
    answer:
      "Ante síntomas que pueden comprometer la vida -dolor de pecho intenso, dificultad severa para respirar, pérdida de conciencia, sangrado que no para- hay que llamar de inmediato al servicio de emergencias o acudir a una guardia hospitalaria, no pedir un médico a domicilio.",
  },
  {
    question: "¿Cuánto tarda en llegar un médico urgente?",
    answer:
      "Los pedidos marcados como urgentes se priorizan en la asignación. El tiempo exacto depende de la disponibilidad de profesionales en tu zona en ese momento, y lo ves en tiempo real desde la app.",
  },
  {
    question: "¿Atienden urgencias de noche o en fin de semana?",
    answer:
      "Sí, tenemos profesionales de guardia todos los días del año, en cualquier horario, para cuadros agudos que no pueden esperar hasta el día siguiente.",
  },
  {
    question: "¿Qué pasa si el médico considera que el cuadro es más grave de lo que parecía?",
    answer:
      "El médico te lo indica en el momento y te orienta sobre el centro de salud u hospital más adecuado para continuar la atención, además de dejar registrado lo evaluado en la consulta.",
  },
];

export default function MedicoADomicilioUrgentePage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Médico a domicilio urgente",
    alternateName: ["Médico urgente a domicilio", "Atención médica urgente a domicilio"],
    description:
      "Atención médica prioritaria a domicilio para cuadros agudos que requieren evaluación rápida, con derivación a guardia si la situación lo requiere.",
    url: PATH,
    areaServedName: "Ciudad Autónoma de Buenos Aires",
    areaServedType: "City",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-medico-urgente"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Médico a domicilio urgente", href: PATH },
        ]}
      />

      <SeoHero
        badge="Atención prioritaria para cuadros agudos"
        title="Médico a domicilio"
        titleHighlight="urgente"
        description="Pedí un médico matriculado para un cuadro agudo -fiebre alta, dolor intenso, alergia, golpe- y recibí atención prioritaria en tu domicilio."
        primaryCta={{ label: "Pedir médico urgente", href: "/pedir" }}
        secondaryCta={{ label: "Prefiero una teleconsulta", href: "/teleconsulta" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir médico urgente" />

      <SeoContentSection
        heading="Cuándo pedir un médico urgente a domicilio"
        paragraphs={[
          "No toda urgencia médica requiere una guardia hospitalaria. Fiebre alta que no baja, dolor abdominal intenso, vómitos persistentes, una alergia con síntomas incómodos o un golpe que necesita evaluación son cuadros que un médico matriculado puede resolver en tu domicilio, con el mismo criterio clínico que en una guardia pero sin la espera.",
          "Es importante distinguir esto de una emergencia real: si hay dolor de pecho intenso, dificultad severa para respirar, pérdida de conciencia o cualquier síntoma que pueda comprometer la vida, hay que llamar de inmediato al servicio de emergencias o trasladarse a una guardia hospitalaria. Para el resto de los cuadros agudos, pedir un médico urgente a domicilio evita el traslado y la espera.",
        ]}
      />

      <BenefitsGrid
        heading="Cómo funciona la atención urgente"
        items={[
          {
            icon: <AlertTriangle size={22} />,
            title: "Evaluación rápida del cuadro",
            description: "El médico evalúa la gravedad de la situación apenas llega a tu domicilio.",
          },
          {
            icon: <Clock3 size={22} />,
            title: "Prioridad en la asignación",
            description: "Los pedidos urgentes se asignan al médico disponible más cercano lo antes posible.",
          },
          {
            icon: <Stethoscope size={22} />,
            title: "Diagnóstico y tratamiento en el momento",
            description: "Indicaciones, receta o certificado según lo que necesite tu cuadro.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Deriva a guardia si hace falta",
            description: "Si el caso supera lo que se puede resolver a domicilio, te orienta sobre dónde continuar la atención.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-medico-urgente"
        title="Preguntas frecuentes sobre el médico a domicilio urgente"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Médico a domicilio las 24 horas", href: "/medico-a-domicilio-24-horas", description: "Disponibilidad de noche, fines de semana y feriados" },
          { label: "Médico clínico a domicilio", href: "/medico-clinico-a-domicilio", description: "Evaluación clínica general" },
          { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Elegí tu barrio" },
          { label: "Teleconsulta médica", href: "/teleconsulta", description: "Atención por videollamada" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="¿Tenés un cuadro agudo ahora mismo?"
        subtitle="Pedí un médico urgente desde la app y recibí atención prioritaria en tu domicilio."
        ctaLabel="Pedir médico urgente"
      />

      <Script
        id="ld-service-medico-urgente"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
