// src/app/medico-a-domicilio-precio/page.tsx
//
// Cubre la intencion de busqueda de precio ("cuanto sale", "cuanto cuesta").
// Es la unica pagina del cluster centrada en el costo del servicio; no
// duplica /medico-a-domicilio-particular (que habla del pago particular en
// general, no puntualmente del precio).

import type { Metadata } from "next";
import Script from "next/script";
import { Wallet, CreditCard, ReceiptText, ShieldCheck } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/medico-a-domicilio-precio";

export const metadata: Metadata = {
  title: "Precio del médico a domicilio",
  description:
    "Cuánto cuesta un médico a domicilio en CABA: precio visible antes de confirmar el pedido, pago con tarjeta desde la app y comprobante para reembolso.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Precio del médico a domicilio | DocYa",
    description:
      "Precio visible antes de confirmar el pedido, pago con tarjeta desde la app y comprobante para reembolso.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Precio del médico a domicilio | DocYa",
    description: "Sabé cuánto vas a pagar antes de confirmar el pedido.",
  },
};

const FAQS = [
  {
    question: "¿Cuánto cuesta un médico a domicilio?",
    answer:
      "El precio se muestra en la app antes de confirmar el pedido, así sabés exactamente cuánto vas a pagar según el motivo de consulta y tu zona, sin tener que llamar a nadie para cotizar.",
  },
  {
    question: "¿El precio varía según el horario?",
    answer:
      "Puede variar según la franja horaria y la demanda del momento, pero siempre lo ves reflejado en la app antes de confirmar, no se te cobra nada distinto a lo que aceptaste al pedir el médico.",
  },
  {
    question: "¿Cómo pago la consulta?",
    answer:
      "Pagás con tarjeta de crédito o débito directamente desde la app, sin necesidad de efectivo ni de coordinar el pago con el médico en persona.",
  },
  {
    question: "¿Mi obra social o prepaga me puede reintegrar el gasto?",
    answer:
      "Muchas coberturas reintegran total o parcialmente las consultas médicas a domicilio pagadas de forma particular. Te damos el comprobante de la consulta para que gestiones el reembolso.",
  },
  {
    question: "¿Hay costo adicional si necesito receta o certificado?",
    answer:
      "No, la receta o el certificado que el médico emita como parte de la consulta están incluidos en el precio de la visita, no se cobran por separado.",
  },
];

export default function MedicoADomicilioPrecioPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Médico a domicilio con precio claro",
    alternateName: ["Costo del médico a domicilio", "Cuánto sale el médico a domicilio"],
    description:
      "Consultá el precio del médico a domicilio antes de confirmar el pedido, con pago particular desde la app y comprobante para reembolso.",
    url: PATH,
    areaServedName: "Ciudad Autónoma de Buenos Aires",
    areaServedType: "City",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-medico-precio"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Precio del médico a domicilio", href: PATH },
        ]}
      />

      <SeoHero
        badge="Precio claro antes de confirmar"
        title="Cuánto cuesta un"
        titleHighlight="médico a domicilio"
        description="Ves el precio de la consulta antes de confirmar el pedido, pagás con tarjeta desde la app y, si tu cobertura reintegra, te damos el comprobante."
        primaryCta={{ label: "Ver precio en la app", href: "/pedir" }}
        secondaryCta={{ label: "Ver médico a domicilio particular", href: "/medico-a-domicilio-particular" }}
      />

      <DifferentiatorBanner ctaLabel="Ver precio y pedir" />

      <SeoContentSection
        heading="Cómo se calcula el precio del médico a domicilio"
        paragraphs={[
          "El precio de la consulta depende del motivo de consulta y de tu zona, y se muestra en la app antes de que confirmes el pedido: no hay que llamar para cotizar ni esperar un presupuesto aparte. Una vez que aceptás el precio mostrado, ese es el monto que pagás, sin cargos adicionales por horario nocturno, fin de semana o feriado.",
          "El pago se hace con tarjeta de crédito o débito directamente desde la app. Si tu obra social o prepaga reintegra consultas médicas a domicilio pagadas de forma particular, te entregamos el comprobante correspondiente para que gestiones el reembolso por tu cuenta.",
        ]}
      />

      <BenefitsGrid
        heading="Cómo funciona el pago"
        items={[
          {
            icon: <Wallet size={22} />,
            title: "Precio visible antes de pedir",
            description: "Ves el costo exacto de la consulta antes de confirmar el pedido en la app.",
          },
          {
            icon: <CreditCard size={22} />,
            title: "Pago con tarjeta",
            description: "Pagás con tarjeta de crédito o débito desde la misma app, sin efectivo.",
          },
          {
            icon: <ReceiptText size={22} />,
            title: "Comprobante para reembolso",
            description: "Si tu cobertura reintegra consultas particulares, te damos el comprobante que necesitás.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Sin costos ocultos",
            description: "El precio que ves antes de confirmar es el que pagás, sin cargos adicionales sorpresa.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-medico-precio"
        title="Preguntas frecuentes sobre el precio del médico a domicilio"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Médico a domicilio particular", href: "/medico-a-domicilio-particular", description: "Sin obra social ni prepaga" },
          { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Elegí tu barrio" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="Mirá el precio antes de pedir tu médico"
        subtitle="Precio claro desde el primer momento, pagás con tarjeta desde la app."
      />

      <Script
        id="ld-service-medico-precio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
