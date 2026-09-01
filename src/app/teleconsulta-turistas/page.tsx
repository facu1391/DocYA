// src/app/teleconsulta-turistas/page.tsx
//
// Cubre la intencion "doctor/medico para turistas en Argentina": alguien que
// se enferma de viaje, lejos de su medico de cabecera y sin conocer las
// guardias locales. Es un angulo genuinamente distinto de
// /teleconsulta-argentina (que habla en general de cobertura nacional) y de
// las paginas por ciudad turistica (que hablan de una localidad puntual):
// esta pagina es el hub que conecta ambas para quien busca en terminos de
// "estoy de viaje, necesito un medico ya", sin importar en que provincia.

import type { Metadata } from "next";
import Script from "next/script";
import { Video, Globe, Wallet, ShieldCheck } from "lucide-react";
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

const PATH = "/teleconsulta-turistas";

export const metadata: Metadata = {
  title: "Doctor para turistas en Argentina | Teleconsulta médica",
  description:
    "¿Te enfermaste de viaje por Argentina? Hablá con un médico matriculado por videollamada desde cualquier provincia, sin obra social local. Receta y certificado si corresponde.",
  alternates: {
    canonical: PATH,
    languages: {
      "es-AR": PATH,
      en: "/medical-care-tourists-argentina",
    },
  },
  openGraph: {
    title: "Doctor para turistas en Argentina | DocYa",
    description:
      "Teleconsulta médica para turistas en cualquier provincia de Argentina. Médico matriculado por videollamada, pago particular.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doctor para turistas en Argentina | DocYa",
    description: "Teleconsulta médica para turistas, en cualquier provincia del país.",
  },
};

const FAQS = [
  {
    question: "¿Necesito obra social o prepaga argentina para pedir la teleconsulta?",
    answer:
      "No. La teleconsulta se paga de forma particular desde la app, sin necesidad de tener una cobertura médica argentina.",
  },
  {
    question: "¿Atienden a turistas extranjeros de visita en el país?",
    answer:
      "Sí, mientras tengas conexión a internet podés pedir la teleconsulta desde cualquier provincia de Argentina, seas residente o estés de visita.",
  },
  {
    question: "¿Funciona solo en Buenos Aires o en cualquier provincia donde esté viajando?",
    answer:
      "Funciona en las 24 provincias del país, con el mismo precio y el mismo proceso, ya sea que estés en una ciudad grande o en un destino turístico del interior.",
  },
  {
    question: "¿Pueden darme una receta o un certificado si estoy de viaje?",
    answer:
      "Sí, si el médico lo considera pertinente después de evaluar tu consulta, emite la receta o el certificado con firma digital al finalizar la videollamada.",
  },
  {
    question: "¿Qué tipo de consultas resuelve un turista por teleconsulta?",
    answer:
      "Cuadros que no requieren examen físico presencial: indigestión, alergias, golpes de calor, gripe, dolor de cabeza, renovación de una medicación habitual, entre otros. Si el médico considera que necesitás atención presencial, te lo indica en la misma consulta.",
  },
];

export default function TeleconsultaTuristasPage() {
  const ciudades = getLocationsByType("ciudad");

  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Doctor para turistas en Argentina",
    alternateName: [
      "Médico para turistas Argentina",
      "Doctor online para turistas",
      "Atención médica para turistas en Argentina",
    ],
    description:
      "Teleconsulta médica para turistas y viajeros en cualquier provincia de Argentina, con pago particular.",
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-teleconsulta-turistas"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Doctor para turistas en Argentina", href: PATH },
        ]}
      />

      <SeoHero
        badge="Doctor online para turistas en Argentina"
        title="¿Te enfermaste de viaje?"
        titleHighlight="Hablá con un médico ya"
        description="No importa en qué provincia estés: pedí una teleconsulta desde la app y un médico matriculado te atiende por videollamada, sin necesidad de obra social local ni conocer la guardia de la zona."
        primaryCta={{ label: "Pedir teleconsulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Ver cobertura por provincia", href: "/teleconsulta-argentina" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir teleconsulta" />

      <section className="py-6">
        <div className="mx-auto w-full max-w-3xl px-6">
          <div className="glass-card rounded-3xl border-l-4 p-6 md:p-8" style={{ borderLeftColor: "#ef4444" }}>
            <p className="font-semibold text-foreground">¿Es una emergencia?</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
              La teleconsulta es para cuadros que no ponen en riesgo tu vida. Si tenés dolor en el pecho,
              dificultad para respirar, una hemorragia importante, pérdida de conocimiento o cualquier otro
              cuadro que pueda ser grave, no uses la app: llamá al <strong>911</strong> o al{" "}
              <strong>107 (SAME)</strong>, o dirigite a la guardia o el hospital más cercano.
            </p>
          </div>
        </div>
      </section>

      <SeoContentSection
        heading="Enfermarte de viaje no debería arruinarte el viaje"
        paragraphs={[
          "Cuando te enfermás lejos de tu casa, lo más habitual es no saber a quién recurrir: no tenés médico de cabecera en la zona, no conocés qué guardia queda cerca ni cuánto vas a esperar, y perder medio día de tu viaje en eso es justamente lo que querés evitar. La teleconsulta resuelve esa incertidumbre: pedís la consulta desde la app, un médico matriculado te atiende por videollamada y seguís con tu viaje.",
          "Esto sirve tanto para argentinos que viajan a otra provincia como para visitantes extranjeros: no depende de tener una obra social o prepaga argentina, se paga de forma particular desde la app. Y a diferencia de buscar una guardia desconocida en un lugar donde estás de paso, la teleconsulta es el mismo proceso estés en Buenos Aires, en la Patagonia o en el norte del país.",
        ]}
      />

      <BenefitsGrid
        heading="Por qué usar DocYa si te enfermás de viaje"
        items={[
          {
            icon: <Video size={22} />,
            title: "No perdés tu día de viaje",
            description: "Resolvés la consulta por videollamada desde tu alojamiento, sin ir a buscar una guardia que no conocés.",
          },
          {
            icon: <Globe size={22} />,
            title: "En cualquier provincia del país",
            description: "El servicio cubre las 24 provincias de Argentina, con el mismo proceso en cada una.",
          },
          {
            icon: <Wallet size={22} />,
            title: "Pago particular, sin obra social local",
            description: "No necesitás una cobertura médica argentina: pagás la consulta directamente en la app.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Médicos matriculados",
            description: "Los mismos profesionales verificados que atienden en todo el país, sin importar tu punto de partida.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-teleconsulta-turistas"
        title="Preguntas frecuentes de turistas y viajeros"
        items={FAQS}
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
          { label: "English version", href: "/medical-care-tourists-argentina", description: "Read this page in English" },
          { label: "Doctor in Buenos Aires (English)", href: "/doctor-in-buenos-aires", description: "Atención presencial u online para visitantes" },
          { label: "Doctor en hotel de Buenos Aires (English)", href: "/doctor-at-hotel-buenos-aires", description: "Visita médica en alojamientos de CABA" },
          { label: "Médico online antes de viajar", href: "/teleconsulta-aeropuerto", description: "Ezeiza, Aeroparque o en escala" },
          { label: "Teleconsulta en toda Argentina", href: "/teleconsulta-argentina", description: "Ver cobertura por provincia" },
          { label: "Cómo funciona la teleconsulta", href: "/teleconsulta", description: "Funcionamiento general del servicio" },
          { label: "Teleconsulta particular", href: "/teleconsulta-particular", description: "Sin obra social ni prepaga" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="¿Te enfermaste de viaje por Argentina?"
        subtitle="Pedí tu teleconsulta desde la app y seguí con tu viaje. Un médico matriculado te atiende por videollamada."
        ctaLabel="Pedir teleconsulta"
      />

      <Script
        id="ld-service-teleconsulta-turistas"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
