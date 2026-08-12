import type { Metadata } from "next";
import Script from "next/script";
import { Clock3, FileText, Globe2, ShieldCheck, Video } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoContentSection from "@/components/seo/SeoContentSection";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import SeoFinalCta from "@/components/seo/SeoFinalCta";
import SeoHero from "@/components/seo/SeoHero";
import { buildServiceJsonLd } from "@/lib/seo/schema";

const PATH = "/medico-online";

export const metadata: Metadata = {
  title: "Médico online por videollamada en Argentina",
  description:
    "Hablá con un médico online por videollamada desde cualquier provincia de Argentina. Consulta médica online particular, sin obra social y con profesionales matriculados.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Médico online por videollamada en Argentina | DocYa",
    description:
      "Consulta médica online con profesionales matriculados, disponible desde cualquier provincia de Argentina.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Médico online en Argentina | DocYa",
    description: "Hablá con un médico por videollamada desde cualquier provincia.",
  },
};

const FAQS = [
  {
    question: "¿Puedo hablar con un médico online desde cualquier provincia?",
    answer:
      "Sí. La consulta por videollamada está disponible en toda Argentina. Solo necesitás un celular o computadora con cámara y una conexión estable a internet.",
  },
  {
    question: "¿Necesito obra social para pedir una consulta médica online?",
    answer:
      "No. Podés pagar la consulta de forma particular, sin obra social ni prepaga. El importe se muestra antes de confirmar el pedido.",
  },
  {
    question: "¿La atención es inmediata?",
    answer:
      "La solicitud se envía a los médicos disponibles en ese momento. La conexión suele producirse en minutos, aunque el tiempo puede variar según la disponibilidad profesional y la demanda.",
  },
  {
    question: "¿Qué puede resolver un médico por videollamada?",
    answer:
      "Puede evaluar consultas generales, síntomas que no requieren examen físico inmediato, seguimientos y dudas sobre tratamientos. Si necesitás atención presencial o una guardia, el profesional te lo indicará.",
  },
  {
    question: "¿Puede emitir receta, certificado u orden médica?",
    answer:
      "Sí, cuando corresponda según la evaluación médica. Los documentos no son automáticos: el profesional decide si están clínicamente indicados después de la consulta.",
  },
  {
    question: "¿Un médico online reemplaza una emergencia?",
    answer:
      "No. Ante dolor intenso en el pecho, dificultad para respirar, pérdida de conocimiento, signos de ACV u otra emergencia, llamá al 107 o al servicio de emergencias de tu localidad.",
  },
];

export default function MedicoOnlinePage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Médico online por videollamada",
    alternateName: [
      "Consulta médica online",
      "Médico por videollamada",
      "Consulta médica virtual",
    ],
    description:
      "Consulta médica online por videollamada con profesionales matriculados, disponible para pacientes de toda Argentina.",
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-medico-online"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Médico online", href: PATH },
        ]}
      />

      <SeoHero
        badge="Consulta médica online en toda Argentina"
        title="Hablá con un"
        titleHighlight="médico online"
        description="Consultá por videollamada con un médico matriculado desde cualquier provincia, sin trasladarte y sin necesidad de obra social o prepaga."
        primaryCta={{ label: "Hablar con un médico", href: "/pedir" }}
        secondaryCta={{ label: "Consulta particular", href: "/teleconsulta-particular" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir consulta online" />

      <SeoContentSection
        heading="Consulta médica online por videollamada"
        paragraphs={[
          "Cuando necesitás orientación médica y el cuadro no requiere una evaluación física inmediata, podés hablar con un médico online desde tu celular o computadora. Indicás el motivo de consulta, confirmás el pedido y la solicitud llega a profesionales matriculados disponibles para atender por videollamada.",
          "El servicio tiene alcance nacional: funciona en Buenos Aires, Córdoba, Santa Fe, Mendoza, Tucumán, Salta, la Patagonia y cualquier otra localidad de Argentina con conexión a internet. No necesitás vivir cerca de un consultorio ni trasladarte a otra ciudad para hacer una consulta general.",
        ]}
      />

      <BenefitsGrid
        heading="Cómo te atiende un médico online en DocYa"
        items={[
          {
            icon: <Globe2 size={22} />,
            title: "Disponible en todo el país",
            description: "Podés conectarte desde cualquiera de las 23 provincias y la Ciudad de Buenos Aires.",
          },
          {
            icon: <Video size={22} />,
            title: "Consulta por videollamada",
            description: "Hablás cara a cara con el profesional desde un celular o una computadora con cámara.",
          },
          {
            icon: <Clock3 size={22} />,
            title: "Sin turno programado",
            description: "La solicitud se envía a médicos disponibles en ese momento; el tiempo depende de la demanda.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Profesionales matriculados",
            description: "Los médicos que atienden en DocYa están verificados antes de recibir consultas.",
          },
          {
            icon: <FileText size={22} />,
            title: "Documentación si corresponde",
            description: "El médico puede indicar recetas, certificados u órdenes después de evaluarte.",
          },
        ]}
      />

      <SeoContentSection
        heading="Cuándo elegir una consulta online y cuándo ir a una guardia"
        paragraphs={[
          "La consulta médica online es útil para cuadros leves o moderados, dudas sobre síntomas, seguimiento de tratamientos y situaciones que el profesional puede evaluar mediante entrevista y video. También puede orientarte sobre los pasos siguientes si necesitás estudios o atención presencial.",
          "No reemplaza una emergencia. Si hay dificultad respiratoria, dolor fuerte en el pecho, pérdida de conocimiento, convulsiones, sangrado importante o signos de ACV, contactá inmediatamente al servicio de emergencias de tu zona.",
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-medico-online"
        title="Preguntas frecuentes sobre el médico online"
        items={FAQS}
      />

      <RelatedLinks
        title="Elegí la opción que necesitás"
        links={[
          { label: "Teleconsulta particular", href: "/teleconsulta-particular", description: "Pago particular, sin obra social" },
          { label: "Atención online según disponibilidad", href: "/teleconsulta-24-horas", description: "Consultas nocturnas, fines de semana y feriados" },
          { label: "Cobertura nacional", href: "/teleconsulta-argentina", description: "Médico online en todas las provincias" },
          { label: "Consulta por videollamada", href: "/teleconsulta", description: "Cómo funciona la modalidad" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Cuando el médico la indica" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Luego de una evaluación real" },
        ]}
      />

      <RelatedLinks
        title="Médico online en las principales regiones"
        links={[
          { label: "Buenos Aires", href: "/teleconsulta/buenos-aires", description: "Provincia y conurbano" },
          { label: "Córdoba", href: "/teleconsulta/cordoba", description: "Capital, sierras e interior" },
          { label: "Santa Fe", href: "/teleconsulta/santa-fe", description: "Rosario, capital e interior" },
          { label: "Mendoza", href: "/teleconsulta/mendoza", description: "Gran Mendoza y localidades" },
          { label: "Tucumán", href: "/teleconsulta/tucuman", description: "Atención por videollamada" },
          { label: "Salta", href: "/teleconsulta/salta", description: "Consulta online desde la provincia" },
          { label: "San Juan", href: "/teleconsulta/san-juan", description: "Capital, valles e interior" },
          { label: "La Rioja", href: "/teleconsulta/la-rioja", description: "Capital, Chilecito e interior" },
        ]}
      />

      <SeoFinalCta
        heading="¿Necesitás hablar con un médico?"
        subtitle="Pedí una consulta online desde cualquier provincia y conectate por videollamada con un profesional matriculado."
        ctaLabel="Pedir médico online"
      />

      <Script
        id="ld-service-medico-online"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
