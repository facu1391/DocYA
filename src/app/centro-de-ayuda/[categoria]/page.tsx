// src/app/centro-de-ayuda/[categoria]/page.tsx
//
// Listado de articulos de una categoria del Centro de Ayuda. El contenido
// vive en src/data/help-articles.ts; para sumar una categoria nueva alcanza
// con agregarla a HELP_CATEGORIES y sumarle articulos con ese "category".

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  HELP_CATEGORIES,
  getArticlesByCategory,
  getCategoryBySlug,
  helpArticlePath,
} from "@/data/help-articles";
import { buildItemListJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

interface PageParams {
  categoria: string;
}

export function generateStaticParams() {
  return HELP_CATEGORIES.map((category) => ({ categoria: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) return {};

  const path = `/centro-de-ayuda/${category.slug}`;
  const title = `${category.name} | Centro de Ayuda DocYa`;

  return {
    title,
    description: category.description,
    alternates: { canonical: path },
    openGraph: { title, description: category.description, url: path, type: "website" },
    twitter: { card: "summary_large_image", title, description: category.description },
  };
}

// Categorias con paginas comerciales propias a las que conviene enlazar
// directo en vez de duplicar contenido con un articulo nuevo.
const CATEGORY_FEATURED_SERVICES: Partial<Record<string, { label: string; href: string; description?: string }[]>> = {
  certificados: [
    { label: "Certificado médico laboral", href: "/certificado-medico-laboral", description: "Para justificar una ausencia al trabajo" },
    { label: "Certificado médico escolar", href: "/certificado-medico-escolar", description: "Para justificar la inasistencia a clase" },
    { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
  ],
};

export default async function CentroDeAyudaCategoriaPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) notFound();

  const path = `/centro-de-ayuda/${category.slug}`;
  const articles = getArticlesByCategory(category.slug);
  const featuredServices = CATEGORY_FEATURED_SERVICES[category.slug];

  const itemListJsonLd = buildItemListJsonLd({
    id: `${path}#articulos`,
    items: articles.map((article) => ({ name: article.title, url: helpArticlePath(article) })),
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId={`ld-breadcrumb-${category.slug}`}
        items={[
          { label: "Inicio", href: "/" },
          { label: "Centro de Ayuda", href: "/centro-de-ayuda" },
          { label: category.name, href: path },
        ]}
      />

      <SeoHero
        badge="Centro de Ayuda DocYa"
        title={category.name}
        description={category.description}
        primaryCta={{ label: "Pedir consulta ahora", href: "/pedir" }}
        secondaryCta={{ label: "Ver todas las categorías", href: "/centro-de-ayuda" }}
      />

      {articles.length > 0 && (
        <section className="py-10 md:py-14">
          <div className="mx-auto w-full max-w-4xl px-6">
            <div className="space-y-4">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={helpArticlePath(article)}
                  className="surface group flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand)_40%,transparent)]"
                >
                  <div>
                    <span className="font-semibold text-base md:text-lg">{article.title}</span>
                    <p className="text-sm text-text-muted mt-1">{article.heroDescription}</p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-[var(--brand)] transition-transform group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredServices && (
        <RelatedLinks title={`Páginas de ${category.name.toLowerCase()}`} links={featuredServices} />
      )}

      <RelatedLinks
        title="Explorá otras categorías"
        links={HELP_CATEGORIES.filter((item) => item.slug !== category.slug).map((item) => ({
          label: item.name,
          href: `/centro-de-ayuda/${item.slug}`,
          description: item.description,
        }))}
      />

      <SeoFinalCta
        heading="¿Necesitás un médico ahora?"
        subtitle="Pedí una teleconsulta o una visita a domicilio desde la app y un profesional matriculado te atiende."
        ctaLabel="Pedir consulta"
      />

      {articles.length > 0 && (
        <Script
          id={`ld-itemlist-${category.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
    </>
  );
}
