"use client";

import Image from "next/image";
import {
  Pill,
  Clock,
  CheckCircle,
  History,
  Stethoscope,
  ChevronRight,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n/context";

const featureIcons = [Pill, Stethoscope, Clock, CheckCircle, History];

export default function PastilleroSection() {
  const { t } = useI18n();
  const features = featureIcons.map((icon, i) => ({ icon, text: t.pastillero.features[i] }));
  return (
    <section id="pastillero" className="relative overflow-hidden py-32 text-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
        }}
      />

      <div className="pointer-events-none absolute right-0 top-0 z-0 h-96 w-96 rounded-full bg-[#14B8A6]/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-96 w-96 rounded-full bg-[#14B8A6]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <ScrollReveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#14B8A6]/20 px-3 py-1.5 text-sm font-semibold text-[#14B8A6]">
                <Pill size={16} />
                <span>{t.pastillero.badge}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
                {t.pastillero.title}<span className="text-[#14B8A6]">{t.pastillero.titleHighlight}</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mb-8 max-w-lg text-xl text-gray-300">
                {t.pastillero.description}
              </p>
            </ScrollReveal>

            <div className="mb-10 flex flex-col gap-4">
              {features.map(({ icon: Icon, text }, i) => (
                <ScrollReveal key={text} delay={0.3 + i * 0.05}>
                  <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#14B8A6]/20 text-[#14B8A6]">
                      <Icon size={20} />
                    </div>
                    <p className="mt-1.5 font-medium text-gray-200">{text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.6}>
              <div className="mb-10 rounded-2xl border border-[#14B8A6]/20 bg-gradient-to-r from-[#14B8A6]/10 to-transparent p-6 backdrop-blur-md">
                <div className="mb-2 flex items-center gap-3">
                  <Stethoscope className="text-[#14B8A6]" size={24} />
                  <h4 className="text-lg font-bold">{t.pastillero.calloutTitle}</h4>
                </div>
                <p className="text-sm text-gray-300">
                  {t.pastillero.calloutDescription}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.7}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#descargar"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#14B8A6] px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-[#119e8e] hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                >
                  {t.pastillero.cta1}
                  <ChevronRight size={20} />
                </a>
                <a
                  href="#consulta"
                  className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  {t.pastillero.cta2}
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3} className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[650px]">
              <div className="absolute inset-8 rounded-full bg-[#14B8A6]/20 blur-[80px]" />
              <Image
                src="/landing/pastillero-preview.png"
                alt={t.pastillero.altImage}
                width={1294}
                height={816}
                className="relative h-auto w-full drop-shadow-[0_30px_70px_rgba(0,0,0,0.35)]"
              />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.8} className="mt-28 border-t border-white/10 pt-16 text-center">
          <p className="text-3xl font-light italic text-gray-300">
            &quot;{t.pastillero.quote}{" "}
            <span className="relative inline-block font-bold text-white">
              {t.pastillero.quoteHighlight}
              <span className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-[#14B8A6]/50" />
            </span>
            &quot;
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
