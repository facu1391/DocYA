
"use client";

import { ReactNode } from "react";

type TocItem = { id: string; label: string };

export default function LegalLayout({
  title,
  subtitle,
  lastUpdate,
  toc,
  children,
}: {
  title: string;
  subtitle?: string;
  lastUpdate: string; // ej. "27/09/2025"
  toc: TocItem[];
  children: ReactNode;
}) {
  return (
    <main className="bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      {/* Hero */}
      <section className="border-b border-[var(--nav-border)] relative">
        <div className="absolute inset-0 pointer-events-none brand-glow" />
        <div className="container py-10 md:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <span className="badge">Última actualización: {lastUpdate}</span>
            </div>
            <h1 className="mt-4 text-2xl md:text-4xl font-semibold">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contenido + TOC */}
      <section className="container py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 grid gap-10 lg:grid-cols-12">
          {/* TOC desktop */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="surface rounded-2xl p-4 sticky top-24">
              <p className="text-sm font-semibold text-[var(--brand)]">En esta página</p>
              <ul className="mt-3 space-y-2 text-sm">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a className="link-primary hover:underline" href={`#${t.id}`}>
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Artículo */}
          <article
            className="
              lg:col-span-9
              prose prose-neutral dark:prose-invert max-w-none
              prose-a:text-[var(--brand)] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-headings:text-foreground
              prose-li:marker:text-[var(--brand)]
              lg:pl-2 xl:pl-4
            "
          >
            {children}
          </article>
        </div>
      </section>
    </main>
  );
}
