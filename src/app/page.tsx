// src/app/page.tsx
import Hero from "@/components/landing-public/nueva-landing/Hero";
import InstitutionalSupportSection from "@/components/landing-public/nueva-landing/InstitutionalSupportSection";
import IASection from "@/components/landing-public/nueva-landing/IASection";
import GeoSection from "@/components/landing-public/nueva-landing/GeoSection";
import DomicilioSection from "@/components/landing-public/nueva-landing/DomicilioSection";
import ResolucionSection from "@/components/landing-public/nueva-landing/ResolucionSection";
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
      <InstitutionalSupportSection />
      <IASection />
      <GeoSection />
      <DomicilioSection />
      <ResolucionSection />
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
