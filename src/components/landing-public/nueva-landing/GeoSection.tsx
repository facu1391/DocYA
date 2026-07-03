// src/components/landing-public/nueva-landing/GeoSection.tsx
"use client";

import Image from "next/image";
import { CheckCircle2, MapPin, Clock, Smartphone } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n/context";

const featureIcons = [CheckCircle2, MapPin, Clock, Smartphone];

export default function GeoSection() {
  const { t } = useI18n();
  const features = featureIcons.map((icon, i) => ({ icon, label: t.geo.features[i] }));
  return (
    <section id="geolocalizacion" className="dark-section py-32">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <ScrollReveal delay={0.1}>
          <h2 className="section-title mb-4">
            {t.geo.title}{" "}
            <span className="highlight-text">{t.geo.titleHighlight}</span>
          </h2>

          <p className="text-text-muted mb-8 text-xl leading-relaxed">
            {t.geo.description}
          </p>

          <ul className="flex flex-col gap-5">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-4 text-lg font-medium">
                <Icon size={24} style={{ color: "var(--accent)" }} className="shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative mx-auto h-[650px] w-[320px] max-w-full overflow-hidden rounded-[32px] border border-white/10">
            <Image
              src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1776468713/Captura_de_pantalla_2026-04-09_144113-portrait_vagywd.png"
              alt={t.geo.altImage}
              fill
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
