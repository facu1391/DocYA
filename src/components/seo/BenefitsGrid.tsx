// src/components/seo/BenefitsGrid.tsx
"use client";

import type { ReactNode } from "react";
import ScrollReveal from "@/components/landing-public/nueva-landing/ScrollReveal";

export interface BenefitItem {
  icon: ReactNode;
  title: string;
  description: string;
}

interface BenefitsGridProps {
  id?: string;
  heading: string;
  subtitle?: string;
  items: BenefitItem[];
}

export default function BenefitsGrid({ id, heading, subtitle, items }: BenefitsGridProps) {
  return (
    <section id={id} className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <ScrollReveal>
          <h2 className="section-title text-2xl md:text-3xl mb-3 text-center">{heading}</h2>
          {subtitle && (
            <p className="text-text-muted text-center max-w-2xl mx-auto mb-10">{subtitle}</p>
          )}
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.06}>
              <div className="glass-card h-full rounded-3xl p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-[var(--brand)] mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1.5">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
