import type { Metadata } from "next";
import Script from "next/script";
import { ClipboardList, FileCheck2, ScanLine, Stethoscope } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoContentSection from "@/components/seo/SeoContentSection";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import SeoFinalCta from "@/components/seo/SeoFinalCta";
import SeoHero from "@/components/seo/SeoHero";
import { buildServiceJsonLd } from "@/lib/seo/schema";

const PATH = "/orden-medica-online";

export const metadata: Metadata = {
  title: "Orden médica online después de una consulta",
  description: "Consultá con un médico online. Si la evaluación lo justifica, el profesional puede indicar estudios y emitir una orden médica digital.",
  alternates: { canonical: PATH },
  openGraph: { title: "Orden médica online con evaluación profesional | DocYa", description: "El médico evalúa tu caso y decide si corresponde indicar estudios o emitir una orden.", url: PATH, type: "website" },
  twitter: { card: "summary_large_image", title: "Orden médica online | DocYa", description: "Consulta médica y orden digital únicamente cuando está clínicamente indicada." },
};

const FAQS = [
  { question: "¿Puedo comprar una orden médica?", answer: "No. DocYa permite solicitar una consulta médica. El profesional evalúa tu caso y solo emite una orden cuando considera que un estudio o una derivación están indicados." },
  { question: "¿La orden está garantizada al pagar?", answer: "No. El pago corresponde a la consulta y no garantiza la emisión de documentos. La indicación depende exclusivamente del criterio médico." },
  { question: "¿Qué tipo de estudios puede indicar el médico?", answer: "Según el caso, el profesional puede indicar análisis de laboratorio, estudios por imágenes o una derivación. También puede considerar necesaria una evaluación presencial antes de indicar estudios." },
  { question: "¿Puedo pedirla sin obra social?", answer: "Sí, podés solicitar una consulta particular sin obra social ni prepaga. La cobertura o autorización posterior del estudio depende de cada prestador y financiador." },
  { question: "¿Una institución está obligada a aceptar la orden?", answer: "Cada laboratorio, centro de diagnóstico u obra social puede tener requisitos propios. Verificá con la institución receptora la documentación y autorizaciones necesarias." },
];

export default function OrdenMedicaOnlinePage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`, name: "Consulta médica online por orden de estudios",
    alternateName: ["Consulta por orden médica", "Consulta online para indicación de estudios"],
    description: "Consulta con un médico matriculado, quien evalúa el caso y determina si corresponde emitir una orden médica.",
    url: PATH, areaServedName: "Argentina", areaServedType: "Country",
  });

  return <>
    <Breadcrumbs jsonLdId="ld-breadcrumb-orden-medica" items={[{ label: "Inicio", href: "/" }, { label: "Orden médica online", href: PATH }]} />
    <SeoHero
      badge="Indicación sujeta a criterio médico"
      title="Orden médica online"
      titleHighlight="después de una consulta"
      description="Hablá con un médico por videollamada. Si la evaluación lo justifica, el profesional puede indicar estudios y emitir una orden digital."
      primaryCta={{ label: "Pedir consulta médica", href: "/pedir" }}
      secondaryCta={{ label: "Conocer la teleconsulta", href: "/medico-online" }}
    />
    <DifferentiatorBanner ctaLabel="Pedir consulta" title="La orden médica no es un producto ni un trámite automático." subtitle="Primero se realiza una consulta y el profesional decide qué indicación corresponde." />
    <SeoContentSection heading="Cómo solicitar una evaluación por una orden médica" paragraphs={[
      "Al iniciar la consulta, explicá tus síntomas, antecedentes y el motivo por el que considerás que necesitás un estudio. El médico evalúa la información disponible y determina el paso clínico adecuado.",
      "Si corresponde, puede indicar estudios y emitir una orden médica digital. También puede recomendar una consulta presencial, una derivación o atención urgente cuando la teleconsulta no sea suficiente. Solicitar la consulta no garantiza que se emita una orden.",
    ]} />
    <BenefitsGrid heading="Qué puede ocurrir después de la evaluación" items={[
      { icon: <ClipboardList size={22} />, title: "Análisis de laboratorio", description: "El profesional puede solicitar determinaciones específicas cuando estén indicadas." },
      { icon: <ScanLine size={22} />, title: "Estudios por imágenes", description: "Puede indicar una radiografía, ecografía u otro estudio según la evaluación." },
      { icon: <Stethoscope size={22} />, title: "Derivación o consulta presencial", description: "Algunos casos requieren examen físico o evaluación por otra especialidad." },
      { icon: <FileCheck2 size={22} />, title: "Documento digital", description: "Si se emite, la orden queda vinculada a la atención médica realizada." },
    ]} />
    <SeoContentSection heading="Antes de presentar la orden" paragraphs={[
      "Consultá con el laboratorio, centro de diagnóstico, obra social o prepaga cuáles son sus requisitos. La autorización, cobertura y aceptación dependen de esas instituciones y del estudio indicado.",
      "Una orden no reemplaza la atención de urgencia. Si presentás síntomas graves o de aparición súbita, recurrí al servicio de emergencias de tu localidad.",
    ]} />
    <SeoFaqSection title="Preguntas frecuentes sobre órdenes médicas" items={FAQS} />
    <RelatedLinks title="Servicios relacionados" links={[
      { label: "Médico online", href: "/medico-online", description: "Consulta por videollamada desde Argentina" },
      { label: "Teleconsulta", href: "/teleconsulta", description: "Cómo funciona la atención online" },
      { label: "Receta médica online", href: "/receta-medica-online", description: "Prescripción solo cuando corresponde" },
      { label: "Certificado médico online", href: "/certificado-medico-online", description: "Emisión sujeta a evaluación" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Para situaciones que requieren evaluación presencial" },
    ]} />
    <SeoFinalCta heading="Solicitá una consulta médica" subtitle="El profesional evaluará tu caso y determinará si necesitás estudios, una derivación o atención presencial." ctaLabel="Pedir consulta" />
    <Script id="ld-service-orden-medica" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
  </>;
}
