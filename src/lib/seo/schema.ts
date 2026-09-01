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

interface ArticleJsonLdInput {
  id: string;
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}

export function buildArticleJsonLd({
  id,
  headline,
  description,
  url,
  datePublished = "2026-07-24",
  dateModified,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${SITE_URL}${id}`,
    headline,
    name: headline,
    description,
    url: `${SITE_URL}${url}`,
    inLanguage: "es-AR",
    datePublished,
    dateModified: dateModified || datePublished,
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: "DocYa",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "DocYa",
      url: SITE_URL,
    },
  };
}

interface ItemListJsonLdInput {
  id: string;
  items: { name: string; url: string }[];
}

export function buildItemListJsonLd({ id, items }: ItemListJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${id}`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
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
  inLanguage?: string;
  audience?: string;
}

export function buildServiceJsonLd({
  id,
  name,
  alternateName,
  description,
  url,
  areaServedName,
  areaServedType = "Place",
  inLanguage,
  audience,
}: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}${id}`,
    name,
    alternateName,
    description,
    url: `${SITE_URL}${url}`,
    ...(inLanguage ? { inLanguage } : {}),
    ...(audience ? { audience: { "@type": "Audience", audienceType: audience } } : {}),
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
