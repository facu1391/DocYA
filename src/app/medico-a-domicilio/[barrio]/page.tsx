// src/app/medico-a-domicilio/[barrio]/page.tsx
//
// Plantilla unica para las paginas de "medico a domicilio" por barrio de
// CABA. El contenido de cada barrio vive en src/data/caba-neighborhoods.ts;
// este archivo solo define la estructura visual y el SEO tecnico
// (metadata, JSON-LD, generateStaticParams). Para agregar un barrio nuevo
// no hace falta tocar este archivo, alcanza con sumarlo al data file.
//
// La URL publica es /medico-a-domicilio-{barrio} (con guion, sin slash);
// el rewrite que la mapea a esta ruta esta en next.config.ts.

import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Clock3, ShieldCheck, Stethoscope, FileText, Pill, Video } from "lucide-react";
import {
  CABA_NEIGHBORHOODS,
  getNeighborhoodBySlug,
  getNearbyNeighborhoods,
} from "@/data/caba-neighborhoods";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const SITE_URL = "https://www.docya.com.ar";

interface PageParams {
  barrio: string;
}

export function generateStaticParams() {
  return CABA_NEIGHBORHOODS.map((neighborhood) => ({ barrio: neighborhood.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { barrio } = await params;
  const neighborhood = getNeighborhoodBySlug(barrio);
  if (!neighborhood) return {};

  const path = `/medico-a-domicilio-${neighborhood.slug}`;
  const title = `Médico a domicilio en ${neighborhood.name}`;

  return {
    title,
    description: neighborhood.seoDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | DocYa`,
      description: neighborhood.seoDescription,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | DocYa`,
      description: neighborhood.seoDescription,
    },
  };
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { barrio } = await params;
  const neighborhood = getNeighborhoodBySlug(barrio);
  if (!neighborhood) notFound();

  const path = `/medico-a-domicilio-${neighborhood.slug}`;
  const nearby = getNearbyNeighborhoods(neighborhood);

  const serviceJsonLd = buildServiceJsonLd({
    id: `${path}#service`,
    name: `Médico a domicilio en ${neighborhood.name}`,
    alternateName: [
      `Doctor a domicilio ${neighborhood.name}`,
      `Médico a domicilio ${neighborhood.name} CABA`,
    ],
    description: neighborhood.seoDescription,
    url: path,
    areaServedName: `${neighborhood.name}, Ciudad Autónoma de Buenos Aires`,
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId={`ld-breadcrumb-${neighborhood.slug}`}
        items={[
          { label: "Inicio", href: "/" },
          { label: "Médico a domicilio CABA", href: "/medico-a-domicilio-caba" },
          { label: neighborhood.name, href: path },
        ]}
      />

      <SeoHero
        badge={`Zona ${neighborhood.zone} de CABA`}
        title="Médico a domicilio en"
        titleHighlight={neighborhood.name}
        description={`Pedí un médico matriculado a tu casa u oficina en ${neighborhood.name}. Sin obra social ni prepaga: pagás solo cuando lo necesitás.`}
        primaryCta={{ label: "Solicitar médico ahora", href: "/pedir" }}
        secondaryCta={{ label: "Prefiero una teleconsulta", href: "/#teleconsulta" }}
      />

      <DifferentiatorBanner />

      <SeoContentSection
        heading={`Cómo es la atención médica a domicilio en ${neighborhood.name}`}
        paragraphs={neighborhood.intro}
      />

      {neighborhood.landmarks.length > 0 && (
        <section className="pb-10">
          <div className="mx-auto w-full max-w-3xl px-6">
            <p className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
              Zonas de referencia que cubrimos en {neighborhood.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {neighborhood.landmarks.map((landmark) => (
                <span key={landmark} className="badge text-sm">
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <BenefitsGrid
        heading={`Por qué pedir tu médico a domicilio en ${neighborhood.name} con DocYa`}
        items={[
          {
            icon: <Clock3 size={22} />,
            title: "Llega en el día",
            description: `Coordinamos la visita con el médico disponible más cercano a tu domicilio en ${neighborhood.name}, sin turno previo.`,
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Profesionales matriculados",
            description: "Todos los médicos que atienden en la app están verificados y matriculados en la Ciudad de Buenos Aires.",
          },
          {
            icon: <Video size={22} />,
            title: "Alternativa por teleconsulta",
            description: `Si preferís no esperar la visita, podés resolver la consulta por videollamada desde ${neighborhood.name} o donde estés.`,
          },
        ]}
      />

      <BenefitsGrid
        heading="Qué incluye la consulta"
        subtitle={`Cada visita a domicilio en ${neighborhood.name} incluye, según lo que necesites:`}
        items={[
          {
            icon: <Stethoscope size={22} />,
            title: "Examen clínico completo",
            description: "Evaluación presencial, diagnóstico e indicaciones de tratamiento.",
          },
          {
            icon: <Pill size={22} />,
            title: "Receta digital",
            description: "Si corresponde, el médico te emite la receta al instante desde la app.",
          },
          {
            icon: <FileText size={22} />,
            title: "Certificado médico",
            description: "Certificado de reposo, laboral o escolar cuando la consulta lo justifique.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId={`ld-faq-${neighborhood.slug}`}
        title={`Preguntas frecuentes sobre médico a domicilio en ${neighborhood.name}`}
        items={neighborhood.faqs}
      />

      <RelatedLinks
        title={nearby.length > 0 ? `Médico a domicilio en barrios cercanos a ${neighborhood.name}` : "Explorá otros barrios de CABA"}
        links={[
          ...nearby.map((n) => ({
            label: n.name,
            href: `/medico-a-domicilio-${n.slug}`,
            description: `Médico a domicilio en ${n.name}`,
          })),
          { label: "Ver todos los barrios de CABA", href: "/medico-a-domicilio-caba", description: "Listado completo" },
        ]}
      />

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Teleconsulta médica", href: "/#teleconsulta", description: "Atención por videollamada" },
          { label: "Médico a domicilio particular", href: "/medico-a-domicilio-particular", description: "Sin obra social ni prepaga" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Cobertura y medios de pago", href: "/#cobertura", description: "Cómo funciona el pago" },
          { label: "Centro de Ayuda DocYa", href: "/centro-de-ayuda/medico-a-domicilio", description: "Cuándo llamar al médico, qué atiende y más" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading={`¿Necesitás un médico a domicilio en ${neighborhood.name}?`}
        subtitle="Pedilo desde la app y un profesional matriculado te atiende en tu casa, sin turno previo."
      />

      <Script
        id={`ld-service-${neighborhood.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}

export const dynamicParams = false;
