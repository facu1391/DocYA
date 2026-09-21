import type { Metadata } from "next";
import Script from "next/script";
import { ClipboardCheck, FileSignature, Pill, ShieldCheck } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/receta-medica-online";

export const metadata: Metadata = {
  title: "Receta médica online con evaluación profesional",
  description: "Consultá con un médico online. Después de evaluarte, el profesional determina si corresponde emitir una receta médica digital.",
  alternates: { canonical: PATH },
  openGraph: { title: "Receta médica online con evaluación profesional | DocYa", description: "La receta no es automática: primero se realiza una consulta y el médico decide si corresponde indicarla.", url: PATH, type: "website" },
  twitter: { card: "summary_large_image", title: "Receta médica online | DocYa", description: "Consulta médica y receta digital únicamente cuando el profesional la indica." },
};

const FAQS = [
  { question: "¿La receta se emite automáticamente al pagar la consulta?", answer: "No. El pago corresponde a la consulta médica. El profesional evalúa tu situación y decide si corresponde indicar un medicamento y emitir una receta." },
  { question: "¿Puedo consultar para renovar una medicación habitual?", answer: "Sí, podés explicar qué medicación utilizás y por qué necesitás renovarla. El médico revisará tus antecedentes y tu situación actual antes de decidir si corresponde continuarla, modificarla o indicar otra evaluación." },
  { question: "¿Necesito obra social o prepaga?", answer: "No. Podés solicitar una consulta particular. El importe se informa en el flujo de solicitud y la eventual emisión de la receta depende del criterio profesional." },
  { question: "¿Dónde veo la receta si el médico la emite?", answer: "Los documentos emitidos quedan asociados a la consulta dentro de DocYa, desde donde podés abrir el archivo disponible." },
  { question: "¿La farmacia está obligada a aceptar cualquier receta?", answer: "La presentación y aceptación pueden depender del medicamento, la normativa aplicable y los controles de la farmacia. Consultá allí si requiere documentación adicional." },
];

export default function RecetaMedicaOnlinePage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`, name: "Consulta médica online por receta",
    alternateName: ["Consulta por receta digital", "Consulta para renovar medicación"],
    description: "Consulta con un médico matriculado, quien evalúa al paciente y determina si corresponde emitir una receta médica digital.",
    url: PATH, areaServedName: "Argentina", areaServedType: "Country",
  });

  return <>
    <Breadcrumbs jsonLdId="ld-breadcrumb-receta-online" items={[{ label: "Inicio", href: "/" }, { label: "Receta médica online", href: PATH }]} />
    <SeoHero
      badge="Consulta con un médico matriculado"
      title="Receta médica online"
      titleHighlight="con evaluación profesional"
      description="Primero realizás una consulta médica. Después de evaluarte, el profesional determina si corresponde indicar un medicamento y emitir una receta digital."
      primaryCta={{ label: "Pedir consulta médica", href: "/pedir" }}
      secondaryCta={{ label: "Cómo funciona la teleconsulta", href: "/medico-online" }}
    />
    <DifferentiatorBanner ctaLabel="Pedir consulta" title="DocYa no vende recetas ni garantiza su emisión." subtitle="El médico toma la decisión clínica después de evaluar al paciente." />
    <SeoContentSection heading="Cómo funciona una receta médica digital en DocYa" paragraphs={[
      "Solicitás una teleconsulta o una visita a domicilio y explicás el motivo de la consulta. El profesional conversa con vos, revisa la información clínica disponible y define si puede resolver el caso con esa modalidad o si necesitás una evaluación presencial o estudios adicionales.",
      "Si considera que un medicamento está indicado, puede emitir la receta digital desde DocYa. El documento queda asociado a la consulta para que puedas abrirlo. La consulta no asegura una prescripción: también puede ocurrir que el médico recomiende otro abordaje o una atención de mayor complejidad.",
    ]} />
    <BenefitsGrid heading="Qué ocurre durante el proceso" items={[
      { icon: <ClipboardCheck size={22} />, title: "Consulta médica", description: "Contás el motivo y los antecedentes relevantes al profesional." },
      { icon: <ShieldCheck size={22} />, title: "Decisión profesional", description: "El médico determina si corresponde recetar y qué indicación es adecuada." },
      { icon: <FileSignature size={22} />, title: "Documento digital", description: "Si se emite, la receta incluye los datos del profesional y queda asociada a la consulta." },
      { icon: <Pill size={22} />, title: "Sin prescripción automática", description: "No se entrega una receta solo por solicitar o pagar una consulta." },
    ]} />
    <SeoContentSection id="renovar-receta" heading="¿Necesitás renovar una receta?" paragraphs={[
      "Podés pedir una consulta si ya utilizás una medicación y necesitás revisar su continuidad. Informá el nombre del medicamento, cómo lo venís usando y cualquier cambio en tus síntomas o antecedentes. Si tenés una receta anterior o estudios relacionados, tenelos disponibles durante la consulta.",
      "La renovación tampoco es automática. El profesional puede considerar apropiado mantener el tratamiento, ajustar la indicación, pedir controles o recomendar una consulta presencial.",
    ]} />
    <SeoFaqSection title="Preguntas frecuentes sobre recetas online" items={FAQS} />
    <RelatedLinks title="Servicios relacionados" links={[
      { label: "Médico online", href: "/medico-online", description: "Consulta por videollamada en Argentina" },
      { label: "Teleconsulta", href: "/teleconsulta", description: "Conocé el funcionamiento de la modalidad" },
      { label: "Orden médica online", href: "/orden-medica-online", description: "Estudios u otra indicación, si corresponde" },
      { label: "Certificado médico online", href: "/certificado-medico-online", description: "Documento sujeto a evaluación profesional" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Evaluación presencial según cobertura" },
    ]} />
    <SeoFinalCta heading="Consultá con un médico" subtitle="Explicá qué necesitás. El profesional evaluará tu caso y decidirá si corresponde emitir una receta." ctaLabel="Pedir consulta" />
    <Script id="ld-service-receta-online" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
  </>;
}
