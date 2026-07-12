// src/components/seo/RelatedLinks.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedLinksProps {
  title: string;
  links: { label: string; href: string; description?: string }[];
}

export default function RelatedLinks({ title, links }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h2 className="section-title text-2xl md:text-3xl mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="surface group flex items-center justify-between gap-3 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand)_40%,transparent)]"
            >
              <div>
                <span className="font-semibold">{link.label}</span>
                {link.description && (
                  <p className="text-sm text-text-muted mt-0.5">{link.description}</p>
                )}
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
  );
}
