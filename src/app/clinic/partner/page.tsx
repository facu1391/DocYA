import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PartnerNav from "@/components/clinic-landing/partner/PartnerNav";
import PartnerHero from "@/components/clinic-landing/partner/PartnerHero";
import ClinicFooter from "@/components/clinic-landing/ClinicFooter";
import { buildPartnerBreadcrumbJsonLd } from "@/components/clinic-landing/partner/jsonld";

const PartnerHowItWorksSection = dynamic(
  () => import("@/components/clinic-landing/partner/PartnerHowItWorksSection"),
  { ssr: true }
);
const PartnerEarningsSection = dynamic(
  () => import("@/components/clinic-landing/partner/PartnerEarningsSection"),
  { ssr: true }
);
const PartnerDashboardSection = dynamic(
  () => import("@/components/clinic-landing/partner/PartnerDashboardSection"),
  { ssr: true }
);
const PartnerBenefitsSection = dynamic(
  () => import("@/components/clinic-landing/partner/PartnerBenefitsSection"),
  { ssr: true }
);
const PartnerFaqSection = dynamic(
  () => import("@/components/clinic-landing/partner/PartnerFaqSection"),
  { ssr: true }
);
const PartnerApplyForm = dynamic(
  () => import("@/components/clinic-landing/partner/PartnerApplyForm"),
  { ssr: true }
);
const PartnerFinalCTA = dynamic(
  () => import("@/components/clinic-landing/partner/PartnerFinalCTA"),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "Partners DocYa Clinic - Sumá médicos y generá ingresos recurrentes",
  description:
    "Sumate al programa de Partners de DocYa Clinic: das de alta médicos con una prueba gratuita, hacés seguimiento desde tu propio panel y generás una comisión mensual mientras sigan siendo clientes.",
  alternates: { canonical: "/clinic/partner" },
  openGraph: {
    title: "Partners DocYa Clinic - Generá ingresos recurrentes",
    description:
      "Das de alta médicos con una prueba gratuita, hacés seguimiento desde tu panel y cobrás una comisión mensual mientras sigan siendo clientes.",
    url: "/clinic/partner",
  },
};

export default function ClinicPartnerPage() {
  const breadcrumbJsonLd = buildPartnerBreadcrumbJsonLd();

  return (
    <main className="font-[family-name:var(--font-poppins)]">
      <PartnerNav />
      <PartnerHero />
      <PartnerHowItWorksSection />
      <PartnerEarningsSection />
      <PartnerDashboardSection />
      <PartnerBenefitsSection />
      <PartnerFaqSection />
      <PartnerApplyForm />
      <PartnerFinalCTA />
      <ClinicFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
