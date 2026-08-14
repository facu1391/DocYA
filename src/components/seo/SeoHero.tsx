// src/components/seo/SeoHero.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SeoHeroProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
  descriptionNote?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function SeoHero({
  badge,
  title,
  titleHighlight,
  description,
  descriptionNote,
  primaryCta,
  secondaryCta,
}: SeoHeroProps) {
  return (
    <header className="relative overflow-hidden pt-6 pb-16 md:pb-20">
      <div
        className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,210,255,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          className="badge-trusted mb-6 w-fit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles size={16} />
          {badge}
        </motion.div>

        <motion.h1
          className="hero-title mb-4 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {title} {titleHighlight && <span className="highlight-text">{titleHighlight}</span>}
        </motion.h1>

        <motion.p
          className={`text-xl text-text-muted max-w-2xl leading-relaxed ${descriptionNote ? "mb-2" : "mb-8"}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {description}
        </motion.p>

        {descriptionNote && (
          <motion.p
            className="mb-8 max-w-2xl text-sm leading-relaxed text-text-muted/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {descriptionNote}
          </motion.p>
        )}

        <motion.div
          className="flex flex-wrap gap-4 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a
            href={primaryCta.href}
            className="btn-primary rounded-full px-8 py-4 h-auto text-lg font-bold"
            style={{ background: "linear-gradient(90deg, #00b3a6, #2dd4bf)", boxShadow: "0 8px 24px rgba(0,179,166,0.4)" }}
          >
            {primaryCta.label}
          </a>
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className="btn-outline-primary rounded-full px-8 py-4 h-auto text-lg font-bold"
            >
              {secondaryCta.label}
            </a>
          )}
        </motion.div>
      </div>
    </header>
  );
}
