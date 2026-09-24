import type { Metadata } from "next";
import Script from "next/script";
import { Baby, ClipboardList, FileCheck2, Home, MapPin } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/pediatra-a-domicilio";
const TITLE = "Pediatra a Domicilio | Consulta Médica para Niños | DocYa";
const DESCRIPTION =
  "Solicitá atención médica pediátrica a domicilio para un niño o una niña. Servicio sujeto a cobertura geográfica y disponibilidad profesional en DocYa.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQS = [
  {
    question: "¿Cómo solicito atención pediátrica a domicilio?",
    answer:
      "La persona adulta responsable inicia el pedido, selecciona atención a domicilio, activa la opción de consulta pediátrica y completa los datos del niño o de la niña y la dirección. La asignación depende de la cobertura y de la disponibilidad profesional.",
  },
  {
    question: "¿En qué zonas se puede pedir un médico para niños a domicilio?",
    answer:
      "La cobertura presencial se informa al ingresar la dirección en la plataforma. Actualmente el servicio de médico a domicilio se concentra en CABA y la posibilidad de asignación depende de los profesionales disponibles en la zona.",
  },
  {
    question: "¿Qué diferencia hay con una teleconsulta pediátrica?",
    answer:
      "La atención a domicilio permite una evaluación presencial en la dirección indicada. La teleconsulta se realiza por videollamada y puede solicitarse desde distintos puntos del país, siempre según disponibilidad profesional.",
  },
  {
    question: "¿La visita garantiza una receta o certificado escolar?",
    answer:
      "No. El profesional evalúa al menor y decide si corresponde emitir una receta, una orden, un certificado escolar u otra documentación. Cuando corresponde, se emite a nombre del niño o de la niña atendida.",
  },
  {
    question: "¿Qué hago si el niño tiene una emergencia?",
    answer:
      "DocYa no reemplaza un servicio de emergencias. Ante dificultad respiratoria, pérdida de conocimiento, convulsiones, signos de gravedad u otra emergencia, hay que comunicarse de inmediato con el servicio de emergencias local.",
  },
  {
    question: "¿Se puede solicitar sin turno previo?",
    answer:
      "Sí. El pedido se realiza bajo demanda desde la plataforma, pero la aceptación y la visita dependen de la cobertura geográfica y de la disponibilidad de profesionales al momento de solicitarla.",
  },
];

export default function PediatraADomicilioPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Atención pediátrica a domicilio",
    alternateName: [
      "Pediatra a domicilio",
      "Médico para niños a domicilio",
      "Consulta pediátrica en casa",
    ],
    description: DESCRIPTION,
    url: PATH,
    areaServedName: "Ciudad Autónoma de Buenos Aires",
    areaServedType: "City",
    inLanguage: "es-AR",
    audience: "Familias y personas adultas responsables de niños y adolescentes",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-pediatra-domicilio"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Pediatra a domicilio", href: PATH },
        ]}
      />

      <SeoHero
        badge="Atención médica infantil en el domicilio"
        title="Pediatra a domicilio para"
        titleHighlight="niños y adolescentes"
        description="Solicitá atención médica pediátrica en tu domicilio desde DocYa. La persona responsable carga los datos del menor y la dirección donde necesita la visita."
        descriptionNote="La cobertura y la asignación dependen de la ubicación y de la disponibilidad profesional. DocYa no reemplaza a un servicio de emergencias."
        primaryCta={{ label: "Solicitar atención a domicilio", href: "/pedir" }}
        secondaryCta={{ label: "Ver teleconsulta pediátrica", href: "/teleconsulta-pediatrica" }}
      />

      <DifferentiatorBanner
        title="Atención presencial solicitada por un adulto responsable."
        subtitle="Completá los datos reales del niño o de la niña para que la consulta y cualquier documento que corresponda queden asociados al paciente correcto."
        ctaLabel="Solicitar visita"
      />

      <SeoContentSection
        heading="Consulta médica para niños en el domicilio"
        paragraphs={[
          "La atención pediátrica a domicilio permite solicitar una evaluación presencial para un niño o una niña en la dirección informada por su responsable. Puede ser una alternativa cuando el traslado resulta difícil y existe cobertura profesional en la zona.",
          "El adulto responsable describe el motivo de consulta y carga los datos del menor. Si un profesional acepta el pedido, realiza la visita y determina los pasos a seguir después de examinar al paciente. La solicitud no garantiza una asignación inmediata ni un resultado clínico específico.",
        ]}
      />

      <BenefitsGrid
        heading="Cómo pedir atención pediátrica a domicilio"
        items={[
          {
            icon: <Baby size={22} />,
            title: "Seleccioná consulta pediátrica",
            description: "Indicá que la persona que recibirá la atención es un niño o una niña.",
          },
          {
            icon: <ClipboardList size={22} />,
            title: "Cargá los datos del menor",
            description:
              "Completá su identificación, fecha de nacimiento, sexo y tu vínculo como responsable.",
          },
          {
            icon: <MapPin size={22} />,
            title: "Ingresá la dirección",
            description: "La plataforma utiliza la ubicación para verificar la cobertura del pedido presencial.",
          },
          {
            icon: <Home size={22} />,
            title: "Esperá la aceptación",
            description:
              "La visita se coordina cuando un profesional disponible en la zona toma la solicitud.",
          },
        ]}
      />

      <SeoContentSection
        heading="Evaluación presencial y criterio profesional"
        paragraphs={[
          "Durante la visita, el profesional puede conversar con el responsable, revisar los antecedentes informados y examinar al menor. Con esa evaluación decide las indicaciones y si es necesario derivar a un centro de salud, solicitar estudios o recomendar otro nivel de atención.",
          "Las recetas, órdenes y certificaciones no se emiten de forma automática. Si el profesional considera que alguna documentación está justificada, debe quedar a nombre del niño o de la niña que fue evaluada, no del adulto que realizó la solicitud.",
        ]}
      />

      <BenefitsGrid
        heading="Aspectos importantes antes de pedir la visita"
        items={[
          {
            icon: <MapPin size={22} />,
            title: "Cobertura según ubicación",
            description: "La plataforma confirma si el pedido puede realizarse en la dirección ingresada.",
          },
          {
            icon: <Baby size={22} />,
            title: "Menor acompañado",
            description: "La madre, el padre, tutor o responsable debe estar presente durante la consulta.",
          },
          {
            icon: <FileCheck2 size={22} />,
            title: "Documentación solo si corresponde",
            description: "La emisión depende de la evaluación y del criterio del profesional que realiza la visita.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-pediatra-domicilio"
        title="Preguntas frecuentes sobre pediatra a domicilio"
        items={FAQS}
      />

      <RelatedLinks
        title="Servicios e información relacionados"
        links={[
          {
            label: "Teleconsulta pediátrica",
            href: "/teleconsulta-pediatrica",
            description: "Consulta médica para niños por videollamada",
          },
          {
            label: "Médico a domicilio en CABA",
            href: "/medico-a-domicilio-caba",
            description: "Cobertura general del servicio presencial",
          },
          {
            label: "Médico a domicilio particular",
            href: "/medico-a-domicilio-particular",
            description: "Atención sin obra social ni prepaga",
          },
          {
            label: "Teleconsulta médica",
            href: "/teleconsulta",
            description: "Información general sobre atención por video",
          },
          {
            label: "Certificado médico escolar",
            href: "/certificado-medico-escolar",
            description: "Cuándo puede corresponder su emisión",
          },
          {
            label: "Receta médica online",
            href: "/receta-medica-online",
            description: "Información sobre recetas digitales",
          },
        ]}
      />

      <SeoFinalCta
        heading="¿Necesitás atención médica para un niño en casa?"
        subtitle="Ingresá la dirección, activá la opción pediátrica y completá los datos del menor para consultar la cobertura disponible."
        ctaLabel="Solicitar atención a domicilio"
      />

      <Script
        id="ld-service-pediatra-domicilio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
