// src/app/certificado-medico-laboral/page.tsx
//
// Profundiza el angulo laboral del hub /certificado-medico-online (que
// cubre laboral, escolar y reposo en una sola pagina general). Tambien
// cubre "certificado medico para el trabajo" via alternateName, en lugar
// de crear una pagina aparte para ese sinonimo.

import type { Metadata } from "next";
import Script from "next/script";
import { Briefcase, FileCheck2, Clock3, ShieldCheck } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/certificado-medico-laboral";

export const metadata: Metadata = {
  title: "Certificado médico laboral",
  description:
    "Certificado médico laboral para justificar una ausencia al trabajo, con firma digital de un médico matriculado. Por teleconsulta o a domicilio.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Certificado médico laboral | DocYa",
    description:
      "Certificado médico laboral con firma digital, emitido tras una consulta real por teleconsulta o a domicilio.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificado médico laboral | DocYa",
    description: "Para justificar una ausencia al trabajo, con firma digital.",
  },
};

const FAQS = [
  {
    question: "¿El certificado laboral es válido para presentar a mi empleador?",
    answer:
      "Sí, incluye los datos y la firma digital del médico matriculado que evaluó tu situación, con la información habitual para justificar una ausencia laboral ante recursos humanos.",
  },
  {
    question: "¿Sirve para trabajadores autónomos o monotributistas?",
    answer:
      "Sí, cualquier persona que necesite un respaldo médico de su ausencia, sea en relación de dependencia o autónomo, puede solicitar el certificado tras la consulta.",
  },
  {
    question: "¿Cuántos días de reposo puede indicar el certificado?",
    answer:
      "Eso lo determina el médico según tu cuadro en el momento de la consulta; no es un dato que se define de antemano ni un trámite automático.",
  },
  {
    question: "¿Tengo un plazo para presentarlo en mi trabajo?",
    answer:
      "El certificado queda disponible en la app apenas termina la consulta, así que podés descargarlo y enviarlo a tu empleador el mismo día que faltás.",
  },
  {
    question: "¿Puedo pedirlo por teleconsulta o necesito una visita a domicilio?",
    answer:
      "Podés elegir cualquiera de las dos modalidades: si tu cuadro no requiere examen físico, alcanza con una teleconsulta; si preferís una evaluación presencial, podés pedir una visita a domicilio.",
  },
];

export default function CertificadoMedicoLaboralPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Certificado médico laboral",
    alternateName: ["Certificado médico para el trabajo", "Certificado médico para justificar ausencia laboral"],
    description:
      "Emisión de certificado médico laboral con firma digital, tras una consulta real por teleconsulta o a domicilio con un médico matriculado.",
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-certificado-laboral"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Certificado médico online", href: "/certificado-medico-online" },
          { label: "Certificado médico laboral", href: PATH },
        ]}
      />

      <SeoHero
        badge="Válido para presentar ante tu empleador"
        title="Certificado médico"
        titleHighlight="laboral"
        description="Consultá con un médico por teleconsulta o a domicilio y obtené tu certificado laboral con firma digital para justificar la ausencia al trabajo."
        primaryCta={{ label: "Pedir consulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Ver otros certificados", href: "/certificado-medico-online" }}
      />

      <DifferentiatorBanner ctaLabel="Solicitar certificado laboral" />

      <SeoContentSection
        heading="Cómo conseguir un certificado médico laboral"
        paragraphs={[
          "El certificado laboral se emite después de que un médico matriculado evalúa tu situación, ya sea por teleconsulta o en una visita a domicilio. No es un documento automático: siempre hay una consulta real de por medio en la que el profesional determina si corresponde reposo o justificación de la ausencia.",
          "Una vez terminada la consulta, el certificado queda disponible en la app con firma digital, listo para descargar y enviar a tu empleador o al área de recursos humanos, sin depender de trámites adicionales ni de la firma en papel.",
        ]}
      />

      <BenefitsGrid
        heading="Qué incluye el certificado laboral"
        items={[
          {
            icon: <Briefcase size={22} />,
            title: "Justificación válida ante RRHH",
            description: "Incluye los datos habituales para presentar en tu trabajo o ante el área de personal.",
          },
          {
            icon: <FileCheck2 size={22} />,
            title: "Firma digital verificable",
            description: "El certificado queda firmado digitalmente por el médico matriculado que te atendió.",
          },
          {
            icon: <Clock3 size={22} />,
            title: "Disponible el mismo día",
            description: "Se genera en la app apenas termina la consulta, sin demoras administrativas.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Emitido tras una consulta real",
            description: "Siempre después de que un médico evalúa tu cuadro, no es un trámite automático.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-certificado-laboral"
        title="Preguntas frecuentes sobre el certificado médico laboral"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Certificado médico escolar", href: "/certificado-medico-escolar", description: "Para justificar la inasistencia a clase" },
          { label: "Teleconsulta particular", href: "/teleconsulta-particular", description: "Sin obra social ni prepaga" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="Pedí tu certificado médico laboral"
        subtitle="Consultá por teleconsulta o a domicilio y obtené el certificado con firma digital al finalizar."
        ctaLabel="Solicitar consulta"
      />

      <Script
        id="ld-service-certificado-laboral"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
