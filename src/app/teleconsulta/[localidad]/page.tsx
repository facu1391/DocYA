// src/app/teleconsulta/[localidad]/page.tsx
//
// Plantilla unica para las paginas de teleconsulta por provincia y por
// ciudad turistica. El contenido de cada localidad vive en
// src/data/teleconsulta-locations.ts; este archivo solo define la
// estructura visual y el SEO tecnico (metadata, JSON-LD,
// generateStaticParams). Para agregar una localidad nueva no hace falta
// tocar este archivo, alcanza con sumarla al data file.
//
// A diferencia de /medico-a-domicilio/[barrio] (solo visita presencial en
// CABA), esta pagina solo puede prometer teleconsulta (videollamada): nunca
// describir una visita presencial fuera de CABA.

import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Clock3, ShieldCheck, Stethoscope, FileText, Pill, Video } from "lucide-react";
import {
  TELECONSULTA_LOCATIONS,
  getLocationBySlug,
  getRelatedLocations,
} from "@/data/teleconsulta-locations";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

interface PageParams {
  localidad: string;
}

export function generateStaticParams() {
  return TELECONSULTA_LOCATIONS.map((location) => ({ localidad: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { localidad } = await params;
  const location = getLocationBySlug(localidad);
  if (!location) return {};

  const path = `/teleconsulta/${location.slug}`;
  const title =
    location.type === "provincia"
      ? `Teleconsulta médica en ${location.name}`
      : `Teleconsulta médica en ${location.name}`;

  return {
    title,
    description: location.seoDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | DocYa`,
      description: location.seoDescription,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | DocYa`,
      description: location.seoDescription,
    },
  };
}

export default async function TeleconsultaLocationPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { localidad } = await params;
  const location = getLocationBySlug(localidad);
  if (!location) notFound();

  const path = `/teleconsulta/${location.slug}`;
  const related = getRelatedLocations(location);
  const isProvincia = location.type === "provincia";

  const serviceJsonLd = buildServiceJsonLd({
    id: `${path}#service`,
    name: `Teleconsulta médica en ${location.name}`,
    alternateName: [
      `Médico online en ${location.name}`,
      `Consulta médica online en ${location.name}`,
    ],
    description: location.seoDescription,
    url: path,
    areaServedName: `${location.region}, Argentina`,
    areaServedType: isProvincia ? "AdministrativeArea" : "City",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId={`ld-breadcrumb-${location.slug}`}
        items={[
          { label: "Inicio", href: "/" },
          { label: "Teleconsulta en toda Argentina", href: "/teleconsulta-argentina" },
          { label: location.name, href: path },
        ]}
      />

      <SeoHero
        badge={isProvincia ? `Teleconsulta en ${location.region}` : `Teleconsulta en ${location.region}`}
        title="Teleconsulta médica en"
        titleHighlight={location.name}
        description={`Hablá con un médico matriculado por videollamada en ${location.name}. Mismo precio y misma calidad de atención que en el resto del país.`}
        primaryCta={{ label: "Pedir teleconsulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Ver cómo funciona", href: "/teleconsulta" }}
      />

      <DifferentiatorBanner ctaLabel="Pedir teleconsulta" />

      <SeoContentSection
        heading={`Cómo funciona la teleconsulta en ${location.name}`}
        paragraphs={location.intro}
      />

      {location.highlights.length > 0 && (
        <section className="pb-10">
          <div className="mx-auto w-full max-w-3xl px-6">
            <p className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
              Zonas donde ya nos consultan en {location.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {location.highlights.map((highlight) => (
                <span key={highlight} className="badge text-sm">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <BenefitsGrid
        heading={`Por qué pedir tu teleconsulta en ${location.name} con DocYa`}
        items={[
          {
            icon: <Video size={22} />,
            title: "Sin viajar ni hacer fila",
            description: `Resolvés la consulta por videollamada desde donde estés en ${location.name}, sin trasladarte a un centro de salud.`,
          },
          {
            icon: <Clock3 size={22} />,
            title: "En minutos",
            description: "Pedís la teleconsulta desde la app y un médico disponible te contacta por videollamada.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Profesionales matriculados",
            description: "Todos los médicos que atienden en la app están verificados y matriculados.",
          },
        ]}
      />

      <BenefitsGrid
        heading="Qué incluye la consulta"
        subtitle={`Cada teleconsulta en ${location.name} incluye, según lo que necesites:`}
        items={[
          {
            icon: <Stethoscope size={22} />,
            title: "Evaluación clínica por videollamada",
            description: "El médico evalúa tu cuadro, te orienta y te indica cómo proceder.",
          },
          {
            icon: <Pill size={22} />,
            title: "Receta digital",
            description: "Si corresponde, el médico te emite la receta al instante desde la app.",
          },
          {
            icon: <FileText size={22} />,
            title: "Certificado médico",
            description: "Certificado laboral, escolar o de reposo cuando la consulta lo justifique.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId={`ld-faq-${location.slug}`}
        title={`Preguntas frecuentes sobre teleconsulta en ${location.name}`}
        items={location.faqs}
      />

      {related.length > 0 && (
        <RelatedLinks
          title={
            isProvincia
              ? `Teleconsulta en provincias y ciudades cercanas a ${location.name}`
              : `Teleconsulta en otros destinos cerca de ${location.name}`
          }
          links={related.map((item) => ({
            label: item.name,
            href: `/teleconsulta/${item.slug}`,
            description: `Teleconsulta en ${item.name}`,
          }))}
        />
      )}

      <RelatedLinks
        title="Servicios relacionados"
        links={[
          { label: "Médico online en Argentina", href: "/medico-online", description: "Consulta por videollamada desde cualquier provincia" },
          { label: "Doctor para turistas en Argentina", href: "/teleconsulta-turistas", description: "¿Te enfermaste de viaje?" },
          { label: "Teleconsulta en toda Argentina", href: "/teleconsulta-argentina", description: "Ver todas las provincias" },
          { label: "Cómo funciona la teleconsulta", href: "/teleconsulta", description: "Funcionamiento general del servicio" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Centro de Ayuda DocYa", href: "/centro-de-ayuda/teleconsulta", description: "Cuándo alcanza una teleconsulta y más" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading={`¿Necesitás una teleconsulta en ${location.name}?`}
        subtitle="Un médico matriculado te atiende por videollamada, sin turno previo ni traslado."
        ctaLabel="Pedir teleconsulta"
      />

      <Script
        id={`ld-service-${location.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}

export const dynamicParams = false;
