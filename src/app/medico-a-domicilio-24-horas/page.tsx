// src/app/medico-a-domicilio-24-horas/page.tsx
//
// Cubre la intencion de disponibilidad horaria: "medico a domicilio 24
// horas", de noche, madrugada, fines de semana y feriados. Es distinta de
// /medico-a-domicilio-urgente (que responde a la gravedad del cuadro, no al
// horario), asi que no se fusionan en una sola pagina.

import type { Metadata } from "next";
import Script from "next/script";
import { Clock3, Moon, CalendarDays, ShieldCheck } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/medico-a-domicilio-24-horas";

export const metadata: Metadata = {
  title: "Médico a domicilio las 24 horas",
  description:
    "Médico a domicilio disponible las 24 horas, todos los días del año: noche, madrugada, fines de semana y feriados. Sin turno previo, en CABA.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Médico a domicilio las 24 horas | DocYa",
    description:
      "Médico a domicilio disponible las 24 horas, todos los días del año, incluidas noches, madrugadas y feriados.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Médico a domicilio las 24 horas | DocYa",
    description: "Noche, madrugada, fines de semana y feriados, sin turno previo.",
  },
};

const FAQS = [
  {
    question: "¿Atienden de madrugada?",
    answer:
      "Sí, tenemos profesionales de guardia también de madrugada. La disponibilidad puede variar según la demanda del momento, pero la app te muestra siempre si hay un médico libre para asignar tu pedido.",
  },
  {
    question: "¿Atienden domingos y feriados?",
    answer:
      "Sí, la atención a domicilio funciona los 365 días del año, incluidos domingos y feriados, sin necesidad de coordinar nada con anticipación.",
  },
  {
    question: "¿La consulta es más cara de noche o en feriados?",
    answer:
      "El precio se muestra en la app antes de confirmar el pedido, así sabés exactamente cuánto vas a pagar sin sorpresas, sea cual sea el horario.",
  },
  {
    question: "¿Cuánto tarda en llegar un médico de madrugada?",
    answer:
      "El tiempo puede variar un poco respecto del horario diurno según la cantidad de profesionales de guardia en ese momento, pero seguís el estado del pedido en tiempo real desde la app.",
  },
  {
    question: "¿En qué se diferencia de ir a una guardia de hospital?",
    answer:
      "No necesitás trasladarte ni esperar en una sala de espera: el médico va a tu domicilio y podés seguir el pedido en tiempo real. Para emergencias que pongan en riesgo la vida, siempre hay que llamar al servicio de emergencias.",
  },
];

export default function MedicoADomicilio24HorasPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Médico a domicilio las 24 horas",
    alternateName: [
      "Médico a domicilio de noche",
      "Médico a domicilio los fines de semana",
      "Médico a domicilio en feriados",
    ],
    description:
      "Atención médica a domicilio disponible las 24 horas, los 365 días del año, incluidas noches, madrugadas, fines de semana y feriados.",
    url: PATH,
    areaServedName: "Ciudad Autónoma de Buenos Aires",
    areaServedType: "City",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-medico-24-horas"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Médico a domicilio las 24 horas", href: PATH },
        ]}
      />

      <SeoHero
        badge="Todos los días, a cualquier hora"
        title="Médico a domicilio"
        titleHighlight="las 24 horas"
        description="Pedí un médico matriculado a tu domicilio a cualquier hora del día: de noche, de madrugada, un fin de semana o un feriado, sin turno previo."
        primaryCta={{ label: "Solicitar médico ahora", href: "/pedir" }}
        secondaryCta={{ label: "Prefiero una teleconsulta", href: "/teleconsulta-24-horas" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir médico ahora" />

      <SeoContentSection
        heading="Atención médica a domicilio a cualquier hora del día"
        paragraphs={[
          "Muchos cuadros de salud no eligen horario: aparecen a la noche, un domingo o durante un feriado largo, justo cuando el médico de cabecera no está disponible y la alternativa parece ser esperar horas en la guardia de un hospital. DocYa tiene profesionales matriculados de guardia todos los días del año, en cualquier franja horaria, para que puedas resolver la consulta sin salir de tu casa.",
          "El proceso es el mismo sin importar la hora: pedís el médico desde la app, indicás el motivo de consulta y tu domicilio, y el sistema asigna el pedido al profesional disponible más cercano. Vas viendo el estado en tiempo real, desde que un médico acepta el pedido hasta que llega a tu puerta.",
        ]}
      />

      <BenefitsGrid
        heading="Disponibilidad todos los días, a toda hora"
        items={[
          {
            icon: <Moon size={22} />,
            title: "Turnos nocturnos y de madrugada",
            description: "Profesionales de guardia disponibles fuera del horario habitual de consultorio.",
          },
          {
            icon: <CalendarDays size={22} />,
            title: "Fines de semana y feriados",
            description: "La atención a domicilio funciona los 365 días del año, sin excepción.",
          },
          {
            icon: <Clock3 size={22} />,
            title: "Sin esperar en la guardia",
            description: "Seguís el pedido en tiempo real desde la app en lugar de esperar en una sala.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Profesionales matriculados",
            description: "La guardia nocturna y de feriados tiene la misma exigencia que cualquier otro horario.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-medico-24-horas"
        title="Preguntas frecuentes sobre el médico a domicilio las 24 horas"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Médico a domicilio urgente", href: "/medico-a-domicilio-urgente", description: "Para cuadros agudos que necesitan atención prioritaria" },
          { label: "Teleconsulta las 24 horas", href: "/teleconsulta-24-horas", description: "Atención por videollamada a cualquier hora" },
          { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Elegí tu barrio" },
          { label: "Médico a domicilio particular", href: "/medico-a-domicilio-particular", description: "Sin obra social ni prepaga" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="¿Necesitás un médico a cualquier hora?"
        subtitle="Pedilo desde la app, las 24 horas, los 365 días del año, sin turno previo."
      />

      <Script
        id="ld-service-medico-24-horas"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
