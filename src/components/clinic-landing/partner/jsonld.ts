import { SITE_URL } from "../shared/variants";

export function buildPartnerBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "DocYa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "DocYa Clinic", item: `${SITE_URL}/clinic` },
      { "@type": "ListItem", position: 3, name: "Partners", item: `${SITE_URL}/clinic/partner` },
    ],
  };
}
