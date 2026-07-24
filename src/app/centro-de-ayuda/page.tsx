// src/app/centro-de-ayuda/page.tsx
//
// Hub del Centro de Ayuda: enlaza a cada categoria
// (/centro-de-ayuda/[categoria]) y a los articulos mas buscados. Pensado
// para escalar: cuando se sumen categorias o articulos nuevos al data file
// (src/data/help-articles.ts), aparecen solos aca sin tocar este archivo.

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import Link from "next/link";
import { House, Video, Thermometer, FileText, Info, ArrowRight } from "lucide-react";
import {
  HELP_ARTICLES,
  HELP_CATEGORIES,
  getArticlesByCategory,
  helpArticlePath,
  type HelpCategorySlug,
} from "@/data/help-articles";
import { buildItemListJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/centro-de-ayuda";

const CATEGORY_ICON: Record<HelpCategorySlug, ReactNode> = {
  "medico-a-domicilio": <House size={22} />,
  teleconsulta: <Video size={22} />,
  sintomas: <Thermometer size={22} />,
  certificados: <FileText size={22} />,
  "sobre-docya": <Info size={22} />,
};

export const metadata: Metadata = {
  title: "Centro de Ayuda DocYa",
  description:
    "Guía de salud de DocYa: respuestas claras sobre cuándo pedir un médico a domicilio, cuándo alcanza una teleconsulta, síntomas frecuentes y certificados médicos.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Centro de Ayuda DocYa",
    description:
      "Respuestas claras sobre médico a domicilio, teleconsulta, síntomas frecuentes y certificados médicos.",
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Centro de Ayuda DocYa",
    description: "Guía de salud con respuestas claras a las dudas más frecuentes.",
  },
};

export default function CentroDeAyudaPage() {
  const itemListJsonLd = buildItemListJsonLd({
    id: `${PATH}#articulos`,
    items: HELP_ARTICLES.map((article) => ({
      name: article.title,
      url: helpArticlePath(article),
    })),
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-centro-de-ayuda"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Centro de Ayuda", href: PATH },
        ]}
      />

      <SeoHero
        badge="Guía de salud DocYa"
        title="Centro de"
        titleHighlight="Ayuda"
        description="Respuestas claras a las dudas más frecuentes antes de pedir un médico: cuándo conviene una visita a domicilio, cuándo alcanza una teleconsulta y qué hacer ante síntomas puntuales."
        primaryCta={{ label: "Pedir consulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Ver preguntas frecuentes", href: "/faqs" }}
      />

      <DifferentiatorBanner
        title="Esto es orientación general, no un diagnóstico."
        subtitle="Para evaluar tu situación puntual, pedí una teleconsulta o un médico a domicilio."
      />

      <SeoContentSection
        heading="Qué vas a encontrar acá"
        paragraphs={[
          "El Centro de Ayuda de DocYa reúne, por categoría, las preguntas que más se repiten antes de pedir una consulta: cuándo conviene un médico a domicilio, cuándo alcanza con una teleconsulta, qué hacer frente a síntomas frecuentes, y cómo funcionan los certificados médicos. Cada artículo responde una pregunta puntual, sin vueltas.",
          "Es contenido de orientación general: no reemplaza la evaluación de un médico ni una emergencia. Si tu situación necesita atención ahora, pedí la consulta directamente desde la app; si hay signos de gravedad, comunicate con el 911 o acudí a una guardia.",
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <h2 className="section-title text-2xl md:text-3xl mb-3 text-center">Categorías</h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-10">
            Elegí un tema para ver todos los artículos relacionados.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HELP_CATEGORIES.map((category) => {
              const count = getArticlesByCategory(category.slug).length;
              return (
                <Link
                  key={category.slug}
                  href={`/centro-de-ayuda/${category.slug}`}
                  className="glass-card group flex h-full flex-col rounded-3xl p-6 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-[var(--brand)] mb-4">
                    {CATEGORY_ICON[category.slug]}
                  </div>
                  <h3 className="font-semibold text-lg mb-1.5">{category.name}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">{category.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)]">
                    {count === 1 ? "1 artículo" : `${count} artículos`}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <RelatedLinks
        title="Servicios de DocYa"
        links={[
          { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Pedilo ahora en tu barrio" },
          { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Disponible en toda Argentina" },
          { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
          { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
          { label: "Preguntas frecuentes", href: "/faqs", description: "Sobre pagos, coberturas y más" },
          { label: "Contacto", href: "/contacto", description: "¿Tenés otra duda? Escribinos" },
        ]}
      />

      <SeoFinalCta
        heading="¿Necesitás un médico ahora?"
        subtitle="Pedí una teleconsulta o una visita a domicilio desde la app y un profesional matriculado te atiende."
        ctaLabel="Pedir consulta"
      />

      <Script
        id="ld-itemlist-centro-de-ayuda"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </>
  );
}
