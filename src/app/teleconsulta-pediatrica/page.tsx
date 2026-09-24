import type { Metadata } from "next";
import Script from "next/script";
import { Baby, ClipboardList, FileCheck2, ShieldCheck, Video } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/teleconsulta-pediatrica";
const TITLE = "Teleconsulta Pediátrica | Consulta Médica para Niños | DocYa";
const DESCRIPTION =
  "Solicitá una consulta médica online para un niño o una niña. Cargá sus datos y realizá una teleconsulta pediátrica por videollamada según disponibilidad profesional.";

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
    question: "¿Cómo solicito una consulta médica online para un niño?",
    answer:
      "La persona adulta responsable inicia la solicitud, activa la opción de consulta pediátrica y completa los datos del niño o de la niña, junto con el motivo de atención. La consulta se realiza por videollamada cuando un profesional acepta el caso, según disponibilidad.",
  },
  {
    question: "¿Qué datos del niño o de la niña tengo que cargar?",
    answer:
      "La plataforma solicita nombre y apellido, documento, fecha de nacimiento, sexo y vínculo con la persona responsable. Es importante que la información corresponda al menor que recibirá la atención.",
  },
  {
    question: "¿Un adulto debe participar de la teleconsulta pediátrica?",
    answer:
      "Sí. La solicitud y la atención de una persona menor de edad deben contar con la participación de su madre, padre, tutor o adulto responsable.",
  },
  {
    question: "¿Todos los problemas de salud infantiles pueden resolverse por videollamada?",
    answer:
      "No. El profesional evalúa si la modalidad virtual es adecuada o si el niño necesita examen físico, estudios, atención presencial o una guardia. Ante una emergencia, hay que comunicarse con el servicio de emergencias local.",
  },
  {
    question: "¿La consulta incluye receta o certificado escolar?",
    answer:
      "No están garantizados. Luego de evaluar al niño o a la niña, el profesional decide si corresponde emitir una receta, una orden, un certificado escolar u otra documentación y la emite a nombre del menor atendido.",
  },
  {
    question: "¿La teleconsulta pediátrica necesita turno?",
    answer:
      "DocYa funciona bajo demanda y no requiere reservar un turno tradicional. La posibilidad de realizar la consulta depende de que un profesional disponible acepte la solicitud.",
  },
];

export default function TeleconsultaPediatricaPage() {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Teleconsulta pediátrica",
    alternateName: [
      "Consulta médica online para niños",
      "Pediatra online",
      "Consulta pediátrica por videollamada",
    ],
    description: DESCRIPTION,
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
    inLanguage: "es-AR",
    audience: "Familias y personas adultas responsables de niños y adolescentes",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-teleconsulta-pediatrica"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Teleconsulta pediátrica", href: PATH },
        ]}
      />

      <SeoHero
        badge="Atención médica para niños por videollamada"
        title="Teleconsulta pediátrica"
        titleHighlight="online"
        description="Solicitá una consulta médica para un niño o una niña desde DocYa. La persona responsable carga sus datos y, cuando un profesional acepta el caso, la atención continúa por videollamada."
        descriptionNote="La atención está sujeta a disponibilidad. El profesional determina si el caso puede evaluarse a distancia o requiere atención presencial."
        primaryCta={{ label: "Solicitar consulta pediátrica", href: "/pedir" }}
        secondaryCta={{ label: "Conocer la teleconsulta", href: "/teleconsulta" }}
      />

      <DifferentiatorBanner
        title="Los datos clínicos y documentos corresponden al menor atendido."
        subtitle="La solicitud la realiza un adulto responsable, pero debe cargar la información del niño o de la niña que recibirá la atención."
        ctaLabel="Solicitar atención"
      />

      <SeoContentSection
        heading="Consulta médica online para niños y adolescentes"
        paragraphs={[
          "Una teleconsulta pediátrica permite que el niño o la niña participe de una evaluación médica por videollamada acompañado por una persona adulta responsable. Esta modalidad puede servir para recibir orientación profesional cuando el motivo de consulta puede valorarse a distancia.",
          "La videollamada no reemplaza siempre el examen presencial. Durante la atención, el profesional analiza los síntomas y antecedentes informados y decide si es posible continuar de forma virtual o si corresponde acudir a un consultorio, solicitar estudios o dirigirse a una guardia.",
        ]}
      />

      <BenefitsGrid
        heading="Cómo pedir una teleconsulta pediátrica en DocYa"
        items={[
          {
            icon: <Baby size={22} />,
            title: "Indicá que la consulta es pediátrica",
            description: "Activá la opción correspondiente al solicitar atención para un menor de edad.",
          },
          {
            icon: <ClipboardList size={22} />,
            title: "Completá los datos del menor",
            description:
              "Ingresá su nombre, documento, fecha de nacimiento, sexo y el vínculo del responsable.",
          },
          {
            icon: <Video size={22} />,
            title: "Participen de la videollamada",
            description:
              "El niño o la niña debe estar acompañado por la persona adulta responsable durante la atención.",
          },
          {
            icon: <FileCheck2 size={22} />,
            title: "Recibí las indicaciones profesionales",
            description:
              "El médico define cómo continuar y si corresponde emitir documentación a nombre del menor.",
          },
        ]}
      />

      <SeoContentSection
        heading="Qué puede evaluar el profesional por videollamada"
        paragraphs={[
          "La consulta virtual permite conversar sobre el motivo de atención, observar al niño mediante video y revisar la información que aporta el adulto responsable. La pertinencia de esta modalidad depende de la edad, los síntomas y la posibilidad de obtener datos suficientes a distancia.",
          "DocYa conecta a la familia con un profesional, pero no garantiza un diagnóstico, tratamiento, receta ni certificado específicos. Cada decisión clínica se toma después de evaluar el caso. Los cuadros graves o con signos de alarma requieren atención de emergencia y no deben esperar una teleconsulta.",
        ]}
      />

      <BenefitsGrid
        heading="Atención pediátrica con información correcta"
        items={[
          {
            icon: <ShieldCheck size={22} />,
            title: "Adulto responsable presente",
            description: "La persona responsable solicita la consulta y acompaña al menor durante la videollamada.",
          },
          {
            icon: <Baby size={22} />,
            title: "Paciente infantil identificado",
            description: "Los datos cargados permiten identificar al niño o a la niña que recibe la atención.",
          },
          {
            icon: <FileCheck2 size={22} />,
            title: "Documentación a nombre del menor",
            description: "Si el profesional la considera indicada, se emite para el paciente pediátrico evaluado.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-teleconsulta-pediatrica"
        title="Preguntas frecuentes sobre la consulta pediátrica online"
        items={FAQS}
      />

      <RelatedLinks
        title="Otras formas de atención e información útil"
        links={[
          {
            label: "Pediatra a domicilio",
            href: "/pediatra-a-domicilio",
            description: "Atención pediátrica presencial según cobertura",
          },
          {
            label: "Teleconsulta médica",
            href: "/teleconsulta",
            description: "Información general sobre consultas por videollamada",
          },
          {
            label: "Telemedicina",
            href: "/telemedicina",
            description: "Cómo funciona la atención médica a distancia",
          },
          {
            label: "Teleconsulta en Argentina",
            href: "/teleconsulta-argentina",
            description: "Alcance de la atención virtual",
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
        heading="¿Necesitás una consulta médica para un niño?"
        subtitle="Iniciá la solicitud como adulto responsable, activá la opción pediátrica y completá los datos del menor que recibirá la atención."
        ctaLabel="Solicitar consulta pediátrica"
      />

      <Script
        id="ld-service-teleconsulta-pediatrica"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
