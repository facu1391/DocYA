// src/app/centro-de-ayuda/[categoria]/[slug]/page.tsx
//
// Plantilla unica para los articulos del Centro de Ayuda. El contenido de
// cada articulo vive en src/data/help-articles.ts; este archivo solo define
// la estructura visual y el SEO tecnico (metadata, JSON-LD,
// generateStaticParams). Para agregar un articulo nuevo no hace falta tocar
// este archivo, alcanza con sumarlo al data file.

import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import {
  HELP_ARTICLES,
  EMERGENCY_NOTE,
  getArticleBySlug,
  getCategoryBySlug,
  getRelatedArticleObjects,
  helpArticlePath,
} from "@/data/help-articles";
import { buildArticleJsonLd } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import SeoContentSection from "@/components/seo/SeoContentSection";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

interface PageParams {
  categoria: string;
  slug: string;
}

export function generateStaticParams() {
  return HELP_ARTICLES.map((article) => ({ categoria: article.category, slug: article.slug }));
}

export const dynamicParams = false;

function resolveArticle(categoria: string, slug: string) {
  const article = getArticleBySlug(slug);
  if (!article || article.category !== categoria) return undefined;
  return article;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { categoria, slug } = await params;
  const article = resolveArticle(categoria, slug);
  if (!article) return {};

  const path = helpArticlePath(article);

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: path,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

export default async function CentroDeAyudaArticuloPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { categoria, slug } = await params;
  const article = resolveArticle(categoria, slug);
  if (!article) notFound();

  const category = getCategoryBySlug(article.category);
  const path = helpArticlePath(article);
  const related = getRelatedArticleObjects(article);
  const showEmergencyNote = article.category !== "sobre-docya" && article.category !== "certificados";

  const articleJsonLd = buildArticleJsonLd({
    id: `${path}#article`,
    headline: article.title,
    description: article.metaDescription,
    url: path,
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId={`ld-breadcrumb-${article.slug}`}
        items={[
          { label: "Inicio", href: "/" },
          { label: "Centro de Ayuda", href: "/centro-de-ayuda" },
          ...(category ? [{ label: category.name, href: `/centro-de-ayuda/${category.slug}` }] : []),
          { label: article.title, href: path },
        ]}
      />

      <SeoHero
        badge={article.badge}
        title={article.heroTitle}
        titleHighlight={article.heroTitleHighlight}
        description={article.heroDescription}
        primaryCta={{ label: article.ctaLabel, href: article.ctaHref || "/pedir" }}
        secondaryCta={
          category ? { label: `Ver ${category.shortName.toLowerCase()}`, href: `/centro-de-ayuda/${category.slug}` } : undefined
        }
      />

      <SeoContentSection heading={article.title} paragraphs={article.intro} />

      {article.highlights && article.highlights.length > 0 && (
        <section className="pb-10">
          <div className="mx-auto w-full max-w-3xl px-6">
            <p className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
              {article.highlightsLabel || "Puntos clave"}
            </p>
            <div className="flex flex-wrap gap-2">
              {article.highlights.map((highlight) => (
                <span key={highlight} className="badge text-sm">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {showEmergencyNote && (
        <section className="pb-4">
          <div className="mx-auto w-full max-w-3xl px-6">
            <div className="surface flex items-start gap-3 rounded-2xl border-amber-400/30 p-5">
              <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-400" />
              <p className="text-sm leading-relaxed text-text-muted">{EMERGENCY_NOTE}</p>
            </div>
          </div>
        </section>
      )}

      <SeoFaqSection
        jsonLdId={`ld-faq-${article.slug}`}
        title="Preguntas frecuentes"
        items={article.faqs}
      />

      {related.length > 0 && (
        <RelatedLinks
          title="Te puede servir también"
          links={related.map((item) => ({
            label: item.title,
            href: helpArticlePath(item),
            description: item.heroDescription,
          }))}
        />
      )}

      <RelatedLinks title="Servicios de DocYa" links={article.relatedServices} />

      <SeoFinalCta
        heading={article.ctaHeading}
        subtitle={article.ctaSubtitle}
        ctaLabel={article.ctaLabel}
        ctaHref={article.ctaHref || "/pedir"}
      />

      <Script
        id={`ld-article-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
