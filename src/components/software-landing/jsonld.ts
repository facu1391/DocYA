// src/components/software-landing/jsonld.ts
import { SITE_URL, SOFTWARE_LOGO, SOFTWARE_PATH } from "./shared/variants";

export function buildSoftwareServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Docya Software",
    url: `${SITE_URL}${SOFTWARE_PATH}`,
    logo: SOFTWARE_LOGO,
    image: SOFTWARE_LOGO,
    description:
      "Desarrollo de aplicaciones, integraciones, automatizaciones y dashboards personalizados para Jira, Jira Service Management y Confluence, incluyendo modalidad white-label para Atlassian Solution Partners.",
    areaServed: "Worldwide",
    knowsAbout: [
      "Atlassian Forge",
      "Jira",
      "Jira Service Management",
      "Confluence",
      "Integraciones empresariales",
      "Inteligencia artificial aplicada",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "DocYa",
      url: SITE_URL,
    },
  };
}

export function buildSoftwareBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "DocYa", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Docya Software",
        item: `${SITE_URL}${SOFTWARE_PATH}`,
      },
    ],
  };
}
