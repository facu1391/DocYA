// src/components/seo/Breadcrumbs.tsx
import Link from "next/link";
import Script from "next/script";
import { ChevronRight } from "lucide-react";
import { buildBreadcrumbJsonLd, type BreadcrumbLink } from "@/lib/seo/schema";

interface BreadcrumbsProps {
  items: BreadcrumbLink[];
  jsonLdId: string;
}

export default function Breadcrumbs({ items, jsonLdId }: BreadcrumbsProps) {
  const jsonLd = buildBreadcrumbJsonLd(items);

  return (
    <>
      <nav aria-label="Breadcrumb" className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pt-28 pb-2 md:pt-32">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="link-primary transition-colors">
                    {item.label}
                  </Link>
                )}
                {!isLast && <ChevronRight size={14} className="opacity-50" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <Script
        id={jsonLdId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
