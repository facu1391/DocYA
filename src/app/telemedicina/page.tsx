import type { Metadata } from "next";
import Script from "next/script";
import {
  ClipboardList,
  FileCheck2,
  Laptop2,
  Stethoscope,
  Video,
} from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/telemedicina";
const TITLE = "Telemedicina en Argentina | Consulta Médica Online | DocYa";
const DESCRIPTION =
  "Conocé cómo funciona la telemedicina en DocYa: solicitá atención médica online bajo demanda y realizá una consulta por videollamada con un profesional.";

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
    question: "¿Qué es la telemedicina?",
    answer:
      "La telemedicina es una modalidad de atención que utiliza herramientas digitales para conectar a pacientes y profesionales de la salud a distancia. Puede incluir orientación, evaluación y seguimiento por videollamada, siempre según el criterio del profesional.",
  },
  {
    question: "¿Cómo funciona la telemedicina en DocYa?",
    answer:
      "El paciente carga su solicitud en la plataforma con el motivo de consulta. Cuando un profesional toma el caso, la atención continúa por videollamada. Es un servicio bajo demanda y no requiere reservar un turno tradicional; la atención está sujeta a disponibilidad profesional.",
  },
  {
    question: "¿Telemedicina y teleconsulta son lo mismo?",
    answer:
      "La telemedicina es el concepto amplio de atención de salud a distancia. La teleconsulta es una de sus formas: una consulta entre paciente y profesional realizada por videollamada.",
  },
  {
    question: "¿Todos los casos pueden atenderse de forma virtual?",
    answer:
      "No. El profesional evalúa si la consulta puede continuar de manera virtual o si hace falta una atención presencial, estudios complementarios o una guardia. Ante una emergencia, hay que comunicarse con el servicio de emergencias local.",
  },
  {
    question: "¿La consulta garantiza una receta, orden o certificado?",
    answer:
      "No. Luego de evaluar el caso, el profesional decide si corresponde emitir una receta, una orden médica, un certificado u otra indicación. La solicitud de atención no garantiza la emisión de documentación.",
  },
  {
    question: "¿Qué necesito para una consulta por telemedicina?",
    answer:
      "Necesitás un celular o una computadora con cámara, micrófono y conexión a internet, además de completar los datos solicitados por la plataforma para la atención.",
  },
];

export default function TelemedicinaPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Servicio de telemedicina de DocYa",
    alternateName: ["Atención médica virtual", "Consulta por telemedicina"],
    description: DESCRIPTION,
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
    inLanguage: "es-AR",
    audience: "Pacientes que solicitan atención médica a distancia",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-telemedicina"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Telemedicina", href: PATH },
        ]}
      />

      <SeoHero
        badge="Atención médica virtual"
        title="Telemedicina online con médicos"
        titleHighlight="en Argentina"
        description="Solicitá atención desde la plataforma y realizá una consulta médica por videollamada cuando un profesional tome el caso, sin reservar un turno tradicional."
        descriptionNote="La disponibilidad depende de los profesionales conectados. Cada médico evalúa si el caso puede resolverse a distancia y qué indicaciones corresponden."
        primaryCta={{ label: "Solicitar atención online", href: "/pedir" }}
        secondaryCta={{ label: "Conocer la teleconsulta", href: "/teleconsulta" }}
      />

      <DifferentiatorBanner
        title="Telemedicina bajo demanda, sin un turno tradicional."
        subtitle="Cargás tu solicitud en DocYa y, cuando un profesional la acepta, la consulta continúa por videollamada."
        ctaLabel="Solicitar atención"
      />

      <SeoContentSection
        heading="Qué es la telemedicina y para qué sirve"
        paragraphs={[
          "La telemedicina aplica tecnología digital a la atención de salud a distancia. Permite que un paciente converse con un profesional, explique su motivo de consulta y reciba una evaluación por videollamada sin compartir el mismo espacio físico.",
          "No reemplaza automáticamente la atención presencial. Su utilidad depende del motivo de consulta, de la información disponible y del criterio clínico. Si el profesional necesita realizar un examen físico, solicitar estudios o indicar una guardia, lo comunica durante la atención.",
        ]}
      />

      <BenefitsGrid
        heading="Cómo se realiza una consulta por telemedicina en DocYa"
        subtitle="Un recorrido digital pensado para conectar al paciente con un profesional, manteniendo la decisión clínica en manos del médico."
        items={[
          {
            icon: <ClipboardList size={22} />,
            title: "1. Cargás la solicitud",
            description:
              "Ingresás tus datos y el motivo de consulta para que el profesional conozca la situación inicial.",
          },
          {
            icon: <Stethoscope size={22} />,
            title: "2. Un profesional toma el caso",
            description:
              "La solicitud queda disponible para profesionales habilitados, de acuerdo con su disponibilidad.",
          },
          {
            icon: <Video size={22} />,
            title: "3. Se realiza la videollamada",
            description:
              "Paciente y profesional conversan a distancia para evaluar el motivo de consulta.",
          },
          {
            icon: <FileCheck2 size={22} />,
            title: "4. El médico define los pasos",
            description:
              "Según el caso, indica cómo continuar y decide si corresponde emitir documentación médica.",
          },
        ]}
      />

      <SeoContentSection
        heading="Atención médica virtual con límites claros"
        paragraphs={[
          "La atención médica virtual puede ser útil para consultas generales, orientación y determinados seguimientos. La posibilidad de resolver el caso a distancia no se define de antemano: depende de la evaluación individual que realiza el profesional durante la videollamada.",
          "DocYa facilita el encuentro digital entre paciente y médico, pero no garantiza diagnósticos, tratamientos ni documentos específicos. Las recetas, órdenes y certificaciones se emiten únicamente cuando el profesional considera que están clínicamente justificadas.",
        ]}
      />

      <BenefitsGrid
        heading="Qué necesitás para acceder"
        items={[
          {
            icon: <Laptop2 size={22} />,
            title: "Un dispositivo conectado",
            description: "Podés ingresar desde un celular o una computadora con conexión a internet.",
          },
          {
            icon: <Video size={22} />,
            title: "Cámara y micrófono",
            description: "La consulta se realiza por videollamada para facilitar la comunicación con el profesional.",
          },
          {
            icon: <ClipboardList size={22} />,
            title: "Información del paciente",
            description: "Completá los datos solicitados y describí el motivo de atención de la forma más clara posible.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-telemedicina"
        title="Preguntas frecuentes sobre telemedicina"
        items={FAQS}
      />

      <RelatedLinks
        title="Más información sobre atención médica online"
        links={[
          {
            label: "Médico online",
            href: "/medico-online",
            description: "Cómo consultar con un profesional por videollamada",
          },
          {
            label: "Teleconsulta",
            href: "/teleconsulta",
            description: "Conocé el servicio de consulta médica virtual",
          },
          {
            label: "Teleconsulta en Argentina",
            href: "/teleconsulta-argentina",
            description: "Información sobre el alcance geográfico del servicio",
          },
          {
            label: "Receta médica online",
            href: "/receta-medica-online",
            description: "Cuándo puede corresponder una receta digital",
          },
          {
            label: "Orden médica online",
            href: "/orden-medica-online",
            description: "Evaluación profesional y emisión de órdenes",
          },
          {
            label: "Certificado médico online",
            href: "/certificado-medico-online",
            description: "Información sobre certificados en consultas virtuales",
          },
        ]}
      />

      <SeoFinalCta
        heading="¿Querés solicitar atención médica online?"
        subtitle="Cargá tu solicitud en DocYa. Cuando un profesional tome el caso, podrás realizar la consulta por videollamada."
        ctaLabel="Solicitar atención online"
      />

      <Script
        id="ld-service-telemedicina"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
