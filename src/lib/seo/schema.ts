// src/lib/seo/schema.ts
// Helpers para armar JSON-LD consistente entre las paginas de SEO programatico
// (barrios de CABA, paginas de intencion "particular", receta/certificado online).

export const SITE_URL = "https://www.docya.com.ar";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbLink {
  label: string;
  href: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbLink[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

interface ServiceJsonLdInput {
  id: string;
  name: string;
  alternateName?: string[];
  description: string;
  url: string;
  areaServedName: string;
  areaServedType?: "City" | "AdministrativeArea" | "Country" | "Place";
}

export function buildServiceJsonLd({
  id,
  name,
  alternateName,
  description,
  url,
  areaServedName,
  areaServedType = "Place",
}: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}${id}`,
    name,
    alternateName,
    description,
    url: `${SITE_URL}${url}`,
    areaServed: {
      "@type": areaServedType,
      name: areaServedName,
    },
    provider: {
      "@type": "MedicalOrganization",
      name: "DocYa",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/pedir`,
      availability: "https://schema.org/InStock",
    },
  };
}
