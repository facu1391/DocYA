// src/app/teleconsulta-argentina/page.tsx
//
// Cubre la intencion de cobertura geografica nacional: gente que busca
// confirmar si el servicio llega a su provincia. Distinta de /teleconsulta
// (hub generico) porque el foco del contenido es la cobertura por region,
// no el funcionamiento general del servicio.

import type { Metadata } from "next";
import Script from "next/script";
import { Globe, Video, ShieldCheck, Wallet } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import { getLocationsByType } from "@/data/teleconsulta-locations";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/teleconsulta-argentina";

export const metadata: Metadata = {
  title: "Teleconsulta en toda Argentina",
  description:
    "Teleconsulta médica disponible en todas las provincias de Argentina. Mismo precio y misma calidad de atención, vivas donde vivas.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Teleconsulta en toda Argentina | DocYa",
    description:
      "Teleconsulta médica disponible en todas las provincias de Argentina, con médicos matriculados.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleconsulta en toda Argentina | DocYa",
    description: "Mismo precio y misma calidad de atención en cualquier provincia.",
  },
};

const FAQS = [
  {
    question: "¿La teleconsulta funciona si vivo fuera de CABA?",
    answer:
      "Sí. La teleconsulta está disponible para pacientes de cualquier provincia de Argentina, a diferencia de la visita a domicilio, que hoy cubrimos únicamente en CABA.",
  },
  {
    question: "¿Atienden en todas las provincias por igual?",
    answer:
      "Sí, la calidad y el proceso de la consulta son los mismos sin importar la provincia desde la que te conectes: un médico matriculado te atiende por videollamada.",
  },
  {
    question: "¿El precio cambia según la provincia?",
    answer:
      "No, el precio de la teleconsulta es el mismo en todo el país y se muestra en la app antes de confirmar el pedido.",
  },
  {
    question: "¿Puedo recibir receta o certificado si vivo en el interior?",
    answer:
      "Sí, si el médico lo considera pertinente después de evaluar tu situación, emite la receta o el certificado con firma digital, sin importar en qué provincia estés.",
  },
  {
    question: "¿Qué necesito para conectarme desde otra provincia?",
    answer:
      "Solo un celular o computadora con cámara y conexión a internet. Pedís la teleconsulta desde la app igual que en cualquier otra ciudad del país.",
  },
];

export default function TeleconsultaArgentinaPage() {
  const provincias = getLocationsByType("provincia");
  const ciudades = getLocationsByType("ciudad");

  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Teleconsulta en toda Argentina",
    alternateName: ["Teleconsulta en el interior del país", "Médico online en todas las provincias"],
    description:
      "Teleconsulta médica por videollamada disponible en todas las provincias de Argentina, con el mismo precio y la misma calidad de atención.",
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-teleconsulta-argentina"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Teleconsulta en toda Argentina", href: PATH },
        ]}
      />

      <SeoHero
        badge="Cobertura en todas las provincias"
        title="Teleconsulta en"
        titleHighlight="toda Argentina"
        description="Hablá con un médico matriculado por videollamada vivas donde vivas: la teleconsulta llega a todas las provincias del país, con el mismo precio y la misma calidad."
        primaryCta={{ label: "Pedir teleconsulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Ver cómo funciona", href: "/teleconsulta" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir teleconsulta" />

      <SeoContentSection
        heading="Teleconsulta disponible en todo el país"
        paragraphs={[
          "A diferencia de la visita a domicilio, que hoy cubrimos únicamente en la Ciudad de Buenos Aires, la teleconsulta no depende de tu ubicación: cualquier persona con conexión a internet, viva en la provincia que viva, puede pedir una teleconsulta y hablar con un médico matriculado por videollamada.",
          "Esto es especialmente útil para quienes viven en localidades sin guardia médica cercana o con poca oferta de especialistas, y para quienes prefieren resolver una consulta general, un seguimiento o la renovación de una receta sin tener que trasladarse a un centro de salud.",
        ]}
      />

      <BenefitsGrid
        heading="Cobertura nacional, sin diferencias por provincia"
        items={[
          {
            icon: <Globe size={22} />,
            title: "Cobertura en todas las provincias",
            description: "La teleconsulta funciona en cualquier punto de Argentina con conexión a internet.",
          },
          {
            icon: <Video size={22} />,
            title: "Misma calidad en todo el país",
            description: "El proceso y la exigencia con los médicos son los mismos sin importar la provincia.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Médicos matriculados",
            description: "Todos los profesionales que atienden por teleconsulta están verificados.",
          },
          {
            icon: <Wallet size={22} />,
            title: "Precio único",
            description: "El precio de la teleconsulta no cambia según la provincia desde la que te conectes.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-teleconsulta-argentina"
        title="Preguntas frecuentes sobre la teleconsulta en Argentina"
        items={FAQS}
      />

      <RelatedLinks
        title="Teleconsulta por provincia"
        links={provincias.map((location) => ({
          label: location.name,
          href: `/teleconsulta/${location.slug}`,
          description: `Teleconsulta en ${location.name}`,
        }))}
      />

      <RelatedLinks
        title="Teleconsulta en destinos turísticos"
        links={ciudades.map((location) => ({
          label: location.name,
          href: `/teleconsulta/${location.slug}`,
          description: `Teleconsulta en ${location.name}`,
        }))}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Doctor para turistas en Argentina", href: "/teleconsulta-turistas", description: "¿Te enfermaste de viaje?" },
          { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Cómo funciona el servicio" },
          { label: "Teleconsulta las 24 horas", href: "/teleconsulta-24-horas", description: "Disponible a cualquier hora" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="Pedí tu teleconsulta desde cualquier provincia"
        subtitle="Un médico matriculado te atiende por videollamada, vivas donde vivas en el país."
        ctaLabel="Pedir teleconsulta"
      />

      <Script
        id="ld-service-teleconsulta-argentina"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
