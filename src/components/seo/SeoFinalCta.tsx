// src/components/seo/SeoFinalCta.tsx
"use client";

import ScrollReveal from "@/components/landing-public/nueva-landing/ScrollReveal";

interface SeoFinalCtaProps {
  heading: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function SeoFinalCta({
  heading,
  subtitle,
  ctaLabel = "Solicitar ahora",
  ctaHref = "/pedir",
}: SeoFinalCtaProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,179,166,0.18) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <ScrollReveal>
          <h2 className="section-title mb-4">{heading}</h2>
          <p className="text-text-muted mx-auto mb-10 max-w-xl text-lg leading-relaxed">
            {subtitle}
          </p>
          <a
            href={ctaHref}
            className="btn-primary inline-flex rounded-full px-10 py-4 h-auto text-lg font-bold"
            style={{ background: "linear-gradient(90deg, #00b3a6, #2dd4bf)", boxShadow: "0 8px 24px rgba(0,179,166,0.4)" }}
          >
            {ctaLabel}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
