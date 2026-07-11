import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ClinicNav from "@/components/clinic-landing/ClinicNav";
import ClinicHero from "@/components/clinic-landing/ClinicHero";
import { buildClinicBreadcrumbJsonLd, buildClinicSoftwareJsonLd } from "@/components/clinic-landing/jsonld";

const HowItWorksSection = dynamic(() => import("@/components/clinic-landing/HowItWorksSection"), { ssr: true });
const TimeSavedSection = dynamic(() => import("@/components/clinic-landing/TimeSavedSection"), { ssr: true });
const WhatsAppAISection = dynamic(() => import("@/components/clinic-landing/WhatsAppAISection"), { ssr: true });
const TeleconsultaSceneSection = dynamic(
  () => import("@/components/clinic-landing/TeleconsultaSceneSection"),
  { ssr: true }
);
const DocYaAppSection = dynamic(() => import("@/components/clinic-landing/DocYaAppSection"), { ssr: true });
const ArgentinaGlobeSection = dynamic(
  () => import("@/components/clinic-landing/ArgentinaGlobeSection"),
  { ssr: true }
);
const EcosystemSection = dynamic(() => import("@/components/clinic-landing/EcosystemSection"), { ssr: true });
const BenefitsSection = dynamic(() => import("@/components/clinic-landing/BenefitsSection"), { ssr: true });
const BeforeAfterSection = dynamic(() => import("@/components/clinic-landing/BeforeAfterSection"), { ssr: true });
const FeaturesGridSection = dynamic(() => import("@/components/clinic-landing/FeaturesGridSection"), { ssr: true });
const ClinicFinalCTA = dynamic(() => import("@/components/clinic-landing/ClinicFinalCTA"), { ssr: true });
const ClinicFooter = dynamic(() => import("@/components/clinic-landing/ClinicFooter"), { ssr: true });

export const metadata: Metadata = {
  title: "DocYa Clinic - Software de gestion inteligente para consultorios y clinicas",
  description:
    "La plataforma inteligente para consultorios y clinicas: historia clinica con IA, WhatsApp inteligente, teleconsultas, recetas digitales, certificados y contabilidad. Todo en un solo lugar.",
  alternates: { canonical: "/clinic" },
  openGraph: {
    title: "DocYa Clinic - Gestion clinica inteligente",
    description:
      "Historia clinica con IA, WhatsApp inteligente, teleconsultas, recetas digitales, certificados y contabilidad. Todo en un solo lugar.",
    url: "/clinic",
  },
};

export default function ClinicPage() {
  const softwareJsonLd = buildClinicSoftwareJsonLd();
  const breadcrumbJsonLd = buildClinicBreadcrumbJsonLd();

  return (
    <main className="font-[family-name:var(--font-poppins)]">
      <ClinicNav />
      <ClinicHero />
      <HowItWorksSection />
      <TimeSavedSection />
      <WhatsAppAISection />
      <TeleconsultaSceneSection />
      <DocYaAppSection />
      <ArgentinaGlobeSection />
      <EcosystemSection />
      <BenefitsSection />
      <BeforeAfterSection />
      <FeaturesGridSection />
      <ClinicFinalCTA />
      <ClinicFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
