// src/app/page.tsx
import Hero from "@/components/landing-public/nueva-landing/Hero";
import IASection from "@/components/landing-public/nueva-landing/IASection";
import GeoSection from "@/components/landing-public/nueva-landing/GeoSection";
import DomicilioSection from "@/components/landing-public/nueva-landing/DomicilioSection";
import TeleconsultaSection from "@/components/landing-public/nueva-landing/TeleconsultaSection";
import ResolucionSection from "@/components/landing-public/nueva-landing/ResolucionSection";
import PastilleroSection from "@/components/landing-public/nueva-landing/PastilleroSection";
import BeneficiosSection from "@/components/landing-public/nueva-landing/BeneficiosSection";
import ComoFunciona from "@/components/landing-public/nueva-landing/ComoFunciona";
import CoberturaSection from "@/components/landing-public/nueva-landing/CoberturaSection";
import PreciosSection from "@/components/landing-public/nueva-landing/PreciosSection";
import ReferidosPromoSection from "@/components/landing-public/ReferidosPromoSection";
import DocYaProCTA from "@/components/landing-public/nueva-landing/DocYaProCTA";
import FinalCTA from "@/components/landing-public/nueva-landing/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <IASection />
      <GeoSection />
      <DomicilioSection />
      <TeleconsultaSection />
      <ResolucionSection />
      <PastilleroSection />
      <BeneficiosSection />
      <ComoFunciona />
      <CoberturaSection />
      <PreciosSection />
      <ReferidosPromoSection />
      <DocYaProCTA />
      <FinalCTA mode="paciente" />
    </>
  );
}
