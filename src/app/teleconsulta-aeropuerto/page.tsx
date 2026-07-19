// src/app/teleconsulta-aeropuerto/page.tsx
//
// Cubre un momento puntual y genuinamente distinto de /teleconsulta-turistas:
// enfermarte el dia de tu vuelo, durante una escala corta en Buenos Aires, o
// necesitar que un medico evalue si podes viajar. Menciona Ezeiza y
// Aeroparque en el mismo contenido en lugar de crear una pagina por
// aeropuerto (series el mismo momento con el mismo texto salvo el nombre).

import type { Metadata } from "next";
import Script from "next/script";
import { Video, Plane, FileCheck2, Clock3 } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/teleconsulta-aeropuerto";

export const metadata: Metadata = {
  title: "Médico online antes de viajar | Ezeiza y Aeroparque",
  description:
    "¿Te enfermaste antes de tu vuelo o durante una escala en Buenos Aires? Hablá con un médico matriculado por videollamada en Ezeiza, Aeroparque o donde estés, y obtené certificado si corresponde.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Médico online antes de viajar | DocYa",
    description:
      "Teleconsulta médica antes de tu vuelo o durante una escala en Buenos Aires, en Ezeiza o Aeroparque.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Médico online antes de viajar | DocYa",
    description: "Teleconsulta antes de un vuelo o durante una escala en Buenos Aires.",
  },
};

const FAQS = [
  {
    question: "¿Sirve si me enfermo el mismo día de mi vuelo?",
    answer:
      "Sí, podés pedir la teleconsulta desde tu casa, el hotel o el aeropuerto antes de embarcar, para que el médico evalúe tu cuadro con el tiempo que tengas disponible.",
  },
  {
    question: "¿Pueden darme un certificado médico si mi aerolínea lo pide?",
    answer:
      "Si el médico lo considera pertinente después de evaluar tu consulta, puede emitir un certificado con firma digital al finalizar la videollamada. La decisión final sobre qué documentación acepta depende de cada aerolínea.",
  },
  {
    question: "¿Funciona si tengo una escala corta en Ezeiza o Aeroparque?",
    answer:
      "Sí, mientras tengas conexión a internet en la sala de espera o el hotel de aeropuerto podés pedir la teleconsulta sin salir de la terminal.",
  },
  {
    question: "¿Atienden en hoteles de aeropuerto cerca de Ezeiza o Aeroparque?",
    answer:
      "Sí, es un caso frecuente en pasajeros con escalas largas o vuelos de madrugada que se alojan cerca del aeropuerto la noche anterior.",
  },
  {
    question: "¿Qué hago si es una emergencia real antes de embarcar?",
    answer:
      "La teleconsulta no reemplaza una emergencia. Si tenés un cuadro grave, avisá al personal de la aerolínea o del aeropuerto y llamá al 911 o al 107 (SAME), o dirigite al servicio médico del propio aeropuerto.",
  },
];

export default function TeleconsultaAeropuertoPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Médico online antes de viajar, Ezeiza y Aeroparque",
    alternateName: [
      "Médico online para turistas en Ezeiza",
      "Médico online para turistas en Aeroparque",
      "Teleconsulta para viajeros en Buenos Aires",
    ],
    description:
      "Teleconsulta médica por videollamada para pasajeros que se enferman antes de un vuelo o durante una escala en Buenos Aires.",
    url: PATH,
    areaServedName: "Aeropuerto Internacional Ezeiza y Aeroparque Jorge Newbery, Buenos Aires",
    areaServedType: "Place",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-teleconsulta-aeropuerto"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Médico online antes de viajar", href: PATH },
        ]}
      />

      <SeoHero
        badge="Ezeiza y Aeroparque"
        title="¿Te enfermaste antes de"
        titleHighlight="tu vuelo?"
        description="Pedí una teleconsulta desde tu casa, tu hotel o la sala de espera del aeropuerto. Un médico matriculado te atiende por videollamada y, si corresponde, te emite un certificado antes de embarcar."
        primaryCta={{ label: "Pedir teleconsulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "¿Sos turista de visita en Argentina?", href: "/teleconsulta-turistas" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir teleconsulta" />

      <section className="py-6">
        <div className="mx-auto w-full max-w-3xl px-6">
          <div className="glass-card rounded-3xl border-l-4 p-6 md:p-8" style={{ borderLeftColor: "#ef4444" }}>
            <p className="font-semibold text-foreground">¿Es una emergencia?</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
              Si tenés un cuadro grave antes de embarcar, avisá de inmediato al personal de la aerolínea o
              del aeropuerto y llamá al <strong>911</strong> o al <strong>107 (SAME)</strong>. Ezeiza y
              Aeroparque cuentan con servicio médico propio para emergencias dentro de la terminal.
            </p>
          </div>
        </div>
      </section>

      <SeoContentSection
        heading="El peor momento para enfermarte es antes de un vuelo"
        paragraphs={[
          "Ya sea que salgas desde Ezeiza en un vuelo internacional o desde Aeroparque en cabotaje, enfermarte horas antes de embarcar es distinto a enfermarte en cualquier otro momento del viaje: tenés un horario fijo, poco margen para buscar una guardia y, muchas veces, una aerolínea que puede pedirte un certificado si te ve con síntomas visibles. La teleconsulta te conecta con un médico matriculado sin salir de tu casa, tu hotel o la sala de espera.",
          "Lo mismo pasa si tu vuelo tiene una escala en Buenos Aires y te sentís mal durante esas horas de conexión: no conocés la ciudad, no tenés tiempo de salir del aeropuerto y necesitás resolverlo rápido. Pedís la teleconsulta desde la terminal o el hotel de aeropuerto, y seguís con tu próximo vuelo.",
        ]}
      />

      <BenefitsGrid
        heading="Por qué pedir tu teleconsulta antes de viajar"
        items={[
          {
            icon: <Video size={22} />,
            title: "Sin salir de la terminal",
            description: "Resolvés la consulta por videollamada desde la sala de espera o el hotel de aeropuerto.",
          },
          {
            icon: <Clock3 size={22} />,
            title: "Se adapta a tu horario",
            description: "Pedís la teleconsulta con el tiempo que tengas disponible antes de embarcar.",
          },
          {
            icon: <FileCheck2 size={22} />,
            title: "Certificado si corresponde",
            description: "Si el médico lo considera pertinente, emite un certificado con firma digital al finalizar la consulta.",
          },
          {
            icon: <Plane size={22} />,
            title: "Ezeiza, Aeroparque o en tránsito",
            description: "Funciona igual en cualquiera de los dos aeropuertos de Buenos Aires, o en cualquier escala del país.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-teleconsulta-aeropuerto"
        title="Preguntas frecuentes antes de viajar"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Doctor para turistas en Argentina", href: "/teleconsulta-turistas", description: "¿Estás de visita en el país?" },
          { label: "Teleconsulta en toda Argentina", href: "/teleconsulta-argentina", description: "Ver cobertura por provincia" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="¿Te enfermaste antes de tu vuelo?"
        subtitle="Pedí tu teleconsulta desde la terminal o tu hotel. Un médico matriculado te atiende por videollamada."
        ctaLabel="Pedir teleconsulta"
      />

      <Script
        id="ld-service-teleconsulta-aeropuerto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
