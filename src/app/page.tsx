// src/app/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/landing-public/nueva-landing/Hero";
import WhatsAppSupportButton from "@/components/fab/WhatsAppSupportButton";

import HomeConversion from "@/components/landing-public/nueva-landing/HomeConversion";

const SITE_URL = "https://www.docya.com.ar";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const medicalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#medico-a-domicilio`,
    name: "Médico a domicilio",
    alternateName: [
      "Doctor a domicilio",
      "Atención médica en casa",
      "Teleconsulta médica",
      "Enfermería a domicilio",
      "Médico a domicilio particular",
      "Médico a domicilio sin obra social",
      "Teleconsulta particular",
      "Receta médica online",
      "Certificado médico online",
      "Doctor in Buenos Aires for tourists",
      "Medical consultation with real-time AI translation in English and Portuguese",
    ],
    description:
      "DocYa conecta pacientes con profesionales verificados para atención médica a domicilio, teleconsulta y enfermería.",
    provider: {
      "@type": "MedicalOrganization",
      name: "DocYa",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
    serviceType: [
      "Médico a domicilio",
      "Teleconsulta médica",
      "Teleconsulta para turistas con traducción por IA en inglés y portugués",
      "Enfermería a domicilio",
    ],
    url: SITE_URL,
    potentialAction: {
      "@type": "ReserveAction",
      target: `${SITE_URL}/pedir`,
    },
  };

  return (
    <>
      <Script
        id="ld-home-medical-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalServiceJsonLd) }}
      />
      <Hero />
      <HomeConversion />
      <WhatsAppSupportButton />
    </>
  );
}
