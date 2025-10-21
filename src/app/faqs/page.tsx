import FAQs from "@/components/sections/FAQs";
import Script from "next/script";

export const metadata = {
  title: "Preguntas frecuentes",
  description: "Respuestas rápidas sobre pagos, disponibilidad, requisitos y más.",
  alternates: { canonical: "/faqs" },
  openGraph: { title: "Preguntas frecuentes", description: "Respuestas rápidas.", url: "/faqs" },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo se paga la consulta?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El pago es electrónico y seguro desde la app. Recibís comprobante.",
        },
      },
      {
        "@type": "Question",
        name: "¿En qué zonas atienden?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Arrancamos en zonas habilitadas y vamos expandiendo a todo el país.",
        },
      },
    ],
  };

  return (
    <>
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* tu componente */}
      <FAQs />
    </>
  );
}