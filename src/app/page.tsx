// src/app/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/landing-public/nueva-landing/Hero";
import IASection from "@/components/landing-public/nueva-landing/IASection";
import GeoSection from "@/components/landing-public/nueva-landing/GeoSection";
import DomicilioSection from "@/components/landing-public/nueva-landing/DomicilioSection";
import TeleconsultaSection from "@/components/landing-public/nueva-landing/TeleconsultaSection";
import ResolucionSection from "@/components/landing-public/nueva-landing/ResolucionSection";
import PastilleroSection from "@/components/landing-public/nueva-landing/PastilleroSection";
import BeneficiosSection from "@/components/landing-public/nueva-landing/BeneficiosSection";
import TrustStack from "@/components/landing-public/nueva-landing/TrustStack";
import ComoFunciona from "@/components/landing-public/nueva-landing/ComoFunciona";
import CoberturaSection from "@/components/landing-public/nueva-landing/CoberturaSection";
import PreciosSection from "@/components/landing-public/nueva-landing/PreciosSection";
import ReferidosPromoSection from "@/components/landing-public/ReferidosPromoSection";
import DocYaProCTA from "@/components/landing-public/nueva-landing/DocYaProCTA";
import FinalCTA from "@/components/landing-public/nueva-landing/FinalCTA";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";

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
      "Enfermería a domicilio",
    ],
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/pedir`,
      availability: "https://schema.org/InStock",
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
      <IASection />
      <GeoSection />
      <DomicilioSection />
      <TeleconsultaSection />
      <ResolucionSection />
      <PastilleroSection />
      <BeneficiosSection />
      <TrustStack />
      <ComoFunciona />
      <CoberturaSection />
      <DifferentiatorBanner ctaHref="/medico-a-domicilio-particular" ctaLabel="Conocé cómo funciona el pago" />
      <PreciosSection />
      <ReferidosPromoSection />
      <DocYaProCTA />
      <FinalCTA mode="paciente" />
    </>
  );
}
