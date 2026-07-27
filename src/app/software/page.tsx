// src/app/software/page.tsx
import type { Metadata } from "next";
import SoftwareHero from "@/components/software-landing/SoftwareHero";
import SoftwareProblems from "@/components/software-landing/SoftwareProblems";
import SoftwareServices from "@/components/software-landing/SoftwareServices";
import SoftwarePartners from "@/components/software-landing/SoftwarePartners";
import SoftwareSolutions from "@/components/software-landing/SoftwareSolutions";
import SoftwareProcess from "@/components/software-landing/SoftwareProcess";
import SoftwareCommercialModels from "@/components/software-landing/SoftwareCommercialModels";
import SoftwareExperience from "@/components/software-landing/SoftwareExperience";
import SoftwareTechnology from "@/components/software-landing/SoftwareTechnology";
import SoftwareCTA from "@/components/software-landing/SoftwareCTA";
import SoftwareContactForm from "@/components/software-landing/SoftwareContactForm";
import {
  buildSoftwareBreadcrumbJsonLd,
  buildSoftwareServiceJsonLd,
} from "@/components/software-landing/jsonld";
import { SOFTWARE_LOGO } from "@/components/software-landing/shared/variants";

export const metadata: Metadata = {
  title: {
    absolute: "Docya Software | Desarrollo de aplicaciones para Atlassian",
  },
  description:
    "Desarrollo de aplicaciones, add-ons, integraciones, automatizaciones y dashboards personalizados para Jira, Jira Service Management y Confluence.",
  alternates: { canonical: "/software" },
  openGraph: {
    title: "Docya Software | Desarrollo de aplicaciones para Atlassian",
    description:
      "Desarrollo de aplicaciones, add-ons, integraciones, automatizaciones y dashboards personalizados para Jira, Jira Service Management y Confluence.",
    url: "/software",
    images: [{ url: SOFTWARE_LOGO, width: 1200, height: 630, alt: "Docya Software" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Docya Software | Desarrollo de aplicaciones para Atlassian",
    description:
      "Desarrollo de aplicaciones, add-ons, integraciones, automatizaciones y dashboards personalizados para Jira, Jira Service Management y Confluence.",
    images: [SOFTWARE_LOGO],
  },
};

export default function SoftwarePage() {
  const serviceJsonLd = buildSoftwareServiceJsonLd();
  const breadcrumbJsonLd = buildSoftwareBreadcrumbJsonLd();

  return (
    <>
      <SoftwareHero />
      <SoftwareProblems />
      <SoftwareServices />
      <SoftwarePartners />
      <SoftwareSolutions />
      <SoftwareProcess />
      <SoftwareCommercialModels />
      <SoftwareExperience />
      <SoftwareTechnology />
      <SoftwareCTA />
      <SoftwareContactForm />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
