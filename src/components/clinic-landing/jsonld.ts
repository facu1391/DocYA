// src/components/clinic-landing/jsonld.ts
import { SITE_URL } from "./shared/variants";

export function buildClinicSoftwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DocYa Clinic",
    applicationCategory: "MedicalApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/clinic`,
    description:
      "Plataforma de gestion inteligente para consultorios y clinicas: historia clinica con IA, turnos, WhatsApp inteligente, teleconsultas, sala de espera con llamado de pacientes, recetas digitales, certificados, ordenes medicas y contabilidad.",
    provider: {
      "@type": "Organization",
      name: "DocYa",
      url: SITE_URL,
    },
  };
}

export function buildClinicBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "DocYa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "DocYa Clinic", item: `${SITE_URL}/clinic` },
    ],
  };
}
