// src/app/medico-a-domicilio-particular/page.tsx
//
// Cubre: "medico a domicilio particular", "sin obra social",
// "sin prepaga" y "privado". Son variantes de la misma intencion de
// busqueda, asi que se resuelven con esta unica pagina (no se crea una
// pagina por variante para no canibalizar keywords).

import type { Metadata } from "next";
import Script from "next/script";
import { Wallet, Clock3, ShieldCheck, ReceiptText } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/medico-a-domicilio-particular";

export const metadata: Metadata = {
  title: "Médico a domicilio particular, sin obra social ni prepaga",
  description:
    "Pedí un médico a domicilio particular en CABA, sin obra social ni prepaga. Pagás la consulta con tarjeta desde la app, solo cuando la necesitás.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Médico a domicilio particular, sin obra social ni prepaga | DocYa",
    description:
      "Pedí un médico a domicilio particular en CABA, sin obra social ni prepaga. Pagás la consulta con tarjeta desde la app.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Médico a domicilio particular | DocYa",
    description: "Sin obra social ni prepaga. Pagás la consulta solo cuando la necesitás.",
  },
};

const FAQS = [
  {
    question: "¿Necesito tener obra social para pedir un médico a domicilio?",
    answer:
      "No. Podés pedir la consulta de forma particular aunque no tengas obra social. Pagás con tarjeta desde la app al momento de solicitar el médico.",
  },
  {
    question: "¿Atienden a pacientes sin prepaga?",
    answer:
      "Sí. La mayoría de las consultas que recibimos son de pacientes sin prepaga que prefieren pagar de forma particular en lugar de esperar una autorización o un turno.",
  },
  {
    question: "¿Cómo pago si la consulta es privada?",
    answer:
      "Pagás con tarjeta de crédito o débito directamente desde la app, antes o después de la consulta según el flujo del pedido. No hace falta efectivo.",
  },
  {
    question: "¿Cuánto cuesta una consulta médica a domicilio particular?",
    answer:
      "El precio se muestra en la app antes de confirmar el pedido, así sabés exactamente cuánto vas a pagar antes de que el médico salga hacia tu domicilio.",
  },
  {
    question: "¿Mi obra social o prepaga me puede reintegrar una consulta particular?",
    answer:
      "Muchas coberturas reintegran total o parcialmente las consultas médicas particulares. Te damos el comprobante de la consulta para que lo presentes ante tu obra social o prepaga.",
  },
];

export default function MedicoADomicilioParticularPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Médico a domicilio particular",
    alternateName: [
      "Médico a domicilio sin obra social",
      "Médico a domicilio sin prepaga",
      "Médico a domicilio privado",
    ],
    description:
      "Atención médica a domicilio con pago particular, sin necesidad de obra social ni prepaga.",
    url: PATH,
    areaServedName: "Ciudad Autónoma de Buenos Aires",
    areaServedType: "City",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-medico-particular"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Médico a domicilio particular", href: PATH },
        ]}
      />

      <SeoHero
        badge="Sin obra social ni prepaga"
        title="Médico a domicilio"
        titleHighlight="particular"
        description="Pedí un médico matriculado a tu casa y pagá la consulta de forma particular, sin depender de una obra social o prepaga. Vos elegís cuándo y cuánto pagar."
        primaryCta={{ label: "Solicitar médico ahora", href: "/pedir" }}
        secondaryCta={{ label: "Prefiero una teleconsulta", href: "/teleconsulta-particular" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir médico particular" />

      <SeoContentSection
        heading="Atención médica particular, sin trámites ni autorizaciones"
        paragraphs={[
          "Muchas personas no tienen obra social o prepaga, o la tienen pero prefieren no depender de autorizaciones, cartillas o turnos para algo puntual. DocYa te permite pedir un médico a domicilio de forma particular: elegís el motivo de consulta, confirmás tu domicilio y pagás con tarjeta desde la app, sin ningún trámite previo.",
          "El precio de la consulta se muestra antes de confirmar el pedido, así sabés exactamente cuánto vas a pagar. Si tu obra social o prepaga reintegra consultas particulares, te entregamos el comprobante correspondiente para que gestiones el reembolso por tu cuenta.",
        ]}
      />

      <BenefitsGrid
        heading="Por qué elegir la atención particular con DocYa"
        items={[
          {
            icon: <Wallet size={22} />,
            title: "Precio claro antes de pedir",
            description: "Ves el costo de la consulta antes de confirmar, sin sorpresas ni letra chica.",
          },
          {
            icon: <Clock3 size={22} />,
            title: "Sin turnos ni autorizaciones",
            description: "Pedís el médico cuando lo necesitás, sin depender de una cartilla ni de una autorización previa.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Profesionales matriculados",
            description: "La atención particular es igual de rigurosa: médicos verificados y matriculados en CABA.",
          },
          {
            icon: <ReceiptText size={22} />,
            title: "Comprobante para reembolso",
            description: "Si tu cobertura reintegra consultas particulares, te damos el comprobante que necesitás.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-medico-particular"
        title="Preguntas frecuentes sobre médico a domicilio particular"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Precio del médico a domicilio", href: "/medico-a-domicilio-precio", description: "Cuánto cuesta la consulta" },
          { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Elegí tu barrio" },
          { label: "Médico a domicilio urgente", href: "/medico-a-domicilio-urgente", description: "Atención prioritaria para cuadros agudos" },
          { label: "Teleconsulta particular", href: "/teleconsulta-particular", description: "Atención por videollamada, sin obra social" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="Pedí tu médico a domicilio particular"
        subtitle="Sin obra social ni prepaga. Pagás solo cuando lo necesitás, con el precio claro desde el primer momento."
      />

      <Script
        id="ld-service-medico-particular"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
