// src/app/faqs/page.tsx
import FAQs from "@/components/sections/FAQs";
import { faqs } from "@/components/sections/faqs-data";
import Script from "next/script";

export const metadata = {
  title: "Preguntas frecuentes",
  description: "Respuestas rápidas sobre pagos, disponibilidad, requisitos y más.",
  alternates: { canonical: "/faqs" },
  openGraph: {
    title: "Preguntas frecuentes",
    description: "Respuestas rápidas.",
    url: "/faqs",
  },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };

  return (
    <>
      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQs />
    </>
  );
}