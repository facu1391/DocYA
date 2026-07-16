// src/app/receta-medica-online/page.tsx
//
// Cubre la intencion "receta medica online": distinta de "teleconsulta
// particular" porque quien busca esto suele necesitar puntualmente un
// documento (renovar una receta, medicacion cronica), no un chequeo
// general. Por eso tiene pagina propia en vez de fundirse con teleconsulta.

import type { Metadata } from "next";
import Script from "next/script";
import { FileSignature, Clock3, ShieldCheck, Pill } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/receta-medica-online";

export const metadata: Metadata = {
  title: "Receta médica online",
  description:
    "Obtené tu receta médica online con firma digital de un médico matriculado, por teleconsulta o visita a domicilio. Sin obra social ni turno previo.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Receta médica online | DocYa",
    description:
      "Receta médica online con firma digital de un médico matriculado, por teleconsulta o visita a domicilio.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Receta médica online | DocYa",
    description: "Receta con firma digital, emitida por un médico matriculado.",
  },
};

const FAQS = [
  {
    question: "¿La receta médica online es válida en farmacias?",
    answer:
      "Sí. La emite un médico matriculado con firma digital y contiene los mismos datos que una receta en papel, así que es válida para presentar en la farmacia.",
  },
  {
    question: "¿Necesito una consulta médica para obtener la receta?",
    answer:
      "Sí. Un médico tiene que evaluar tu caso antes de emitir la receta, ya sea por teleconsulta o en una visita a domicilio. No emitimos recetas sin que un profesional evalúe la situación.",
  },
  {
    question: "¿Puedo pedir la receta sin obra social?",
    answer:
      "Sí, podés pagar la consulta de forma particular y obtener la receta al finalizar, sin necesidad de estar afiliado a una obra social o prepaga.",
  },
  {
    question: "¿Sirve para renovar la medicación de un tratamiento crónico?",
    answer:
      "Sí, es uno de los motivos de consulta más frecuentes: renovación de recetas de medicación habitual, después de que el médico revisa tu situación actual.",
  },
  {
    question: "¿Cuánto tarda en llegarme la receta?",
    answer:
      "Si la consulta se resuelve por teleconsulta, la recibís al finalizar la videollamada. Si es una visita a domicilio, el médico te la entrega en el momento desde la app.",
  },
];

export default function RecetaMedicaOnlinePage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Receta médica online",
    alternateName: ["Receta digital", "Receta médica digital", "Receta electrónica"],
    description:
      "Emisión de recetas médicas con firma digital, tras una consulta por teleconsulta o a domicilio con un médico matriculado.",
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-receta-online"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Receta médica online", href: PATH },
        ]}
      />

      <SeoHero
        badge="Firma digital de médico matriculado"
        title="Receta médica"
        titleHighlight="online"
        description="Consultá con un médico por teleconsulta o a domicilio y obtené tu receta con firma digital, válida para presentar en la farmacia."
        primaryCta={{ label: "Pedir consulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Ver cómo funciona", href: "/#como-funciona" }}
      />

      <DifferentiatorBanner ctaLabel="Solicitar receta" />

      <SeoContentSection
        heading="Cómo conseguir una receta médica online"
        paragraphs={[
          "Para emitir una receta, un médico matriculado tiene que evaluar tu situación: podés hacerlo por teleconsulta si el caso no requiere examen físico, o pedir una visita a domicilio si preferís una evaluación presencial. En ambos casos la receta queda con firma digital y se genera desde la app al finalizar la consulta.",
          "Es la opción más habitual para quienes necesitan renovar la medicación de un tratamiento crónico, retomar un tratamiento después de una consulta previa, o necesitan una receta puntual sin obra social ni turno previo con su médico de cabecera.",
        ]}
      />

      <BenefitsGrid
        heading="Qué incluye el servicio"
        items={[
          {
            icon: <FileSignature size={22} />,
            title: "Firma digital",
            description: "La receta queda firmada digitalmente por el médico matriculado que te atendió.",
          },
          {
            icon: <Clock3 size={22} />,
            title: "La recibís al finalizar",
            description: "Se genera desde la app apenas termina la consulta, sin demoras administrativas.",
          },
          {
            icon: <Pill size={22} />,
            title: "Válida en farmacias",
            description: "Incluye los mismos datos que una receta en papel para que puedas presentarla sin problema.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Emitida tras una evaluación real",
            description: "Siempre después de que un médico matriculado revisa tu caso, no es un trámite automático.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-receta-online"
        title="Preguntas frecuentes sobre la receta médica online"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Teleconsulta particular", href: "/teleconsulta-particular", description: "Atención por videollamada, sin obra social" },
          { label: "Médico a domicilio particular", href: "/medico-a-domicilio-particular", description: "Sin obra social ni prepaga" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Elegí tu barrio" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="Pedí tu receta médica online"
        subtitle="Consultá por teleconsulta o a domicilio y obtené la receta con firma digital al finalizar."
        ctaLabel="Solicitar consulta"
      />

      <Script
        id="ld-service-receta-online"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
