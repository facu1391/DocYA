"use client";

import type { COBEOptions } from "cobe";
import { Building2, MessageCircle, Smartphone, Stethoscope, Video } from "lucide-react";

import { Globe } from "@/components/ui/globe";
import ScrollReveal from "./shared/ScrollReveal";

const GLOBE_CONFIG: COBEOptions = {
  width: 900,
  height: 900,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: -1.08,
  theta: 0.18,
  dark: 1,
  diffuse: 1.15,
  mapSamples: 18000,
  mapBrightness: 5.5,
  baseColor: [0.035, 0.16, 0.18],
  markerColor: [0.04, 0.9, 0.77],
  glowColor: [0.02, 0.2, 0.21],
  markers: [
    { location: [-34.6037, -58.3816], size: 0.1 },
    { location: [-31.4201, -64.1888], size: 0.075 },
    { location: [-32.9442, -60.6505], size: 0.065 },
    { location: [-32.8895, -68.8458], size: 0.07 },
    { location: [-24.7821, -65.4232], size: 0.06 },
    { location: [-38.9516, -68.0591], size: 0.065 },
    { location: [-43.2991, -65.1023], size: 0.055 },
  ],
};

const NODES = [
  { icon: Building2, label: "Clínicas", position: "left-[2%] top-[12%]" },
  { icon: Stethoscope, label: "Médicos", position: "right-[1%] top-[14%]" },
  { icon: Smartphone, label: "Pacientes", position: "left-[-1%] bottom-[18%]" },
  { icon: MessageCircle, label: "WhatsApp", position: "right-[-2%] bottom-[21%]" },
  { icon: Video, label: "Teleconsulta", position: "left-1/2 bottom-[2%] -translate-x-1/2" },
];

export default function ArgentinaGlobeSection() {
  return (
    <section className="relative overflow-hidden bg-[#071d21] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(0,179,166,0.12),transparent_35%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <ScrollReveal>
          <span className="badge-trusted">DocYa en todo el país</span>
          <h2 className="section-title mt-5 text-white">
            Una plataforma preparada para crecer en todo el país.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Desde consultorios individuales hasta clínicas y sanatorios. DocYa Clinic conecta
            médicos y pacientes desde cualquier lugar de Argentina.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-white/55">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0AE6C7] opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#0AE6C7]" />
            </span>
            Una red que crece con cada profesional
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="relative mx-auto aspect-square w-full max-w-[620px]">
          <div className="absolute inset-[12%] rounded-full border border-[#0AE6C7]/10 shadow-[0_0_90px_rgba(0,179,166,0.16)]" />
          <Globe config={GLOBE_CONFIG} className="inset-[8%] w-[84%]" />

          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 600 600" aria-hidden="true">
            <g fill="none" stroke="rgba(10,230,199,0.22)" strokeWidth="1.2" strokeDasharray="5 7">
              <path d="M118 116 C190 170 220 218 290 286" />
              <path d="M486 120 C410 172 380 218 310 286" />
              <path d="M102 474 C178 420 222 370 286 312" />
              <path d="M500 460 C420 412 378 365 314 310" />
              <path d="M300 556 C300 470 300 390 300 330" />
            </g>
          </svg>

          {NODES.map(({ icon: Icon, label, position }) => (
            <div
              key={label}
              className={`absolute z-10 flex items-center gap-2 rounded-full border border-[#0AE6C7]/20 bg-[#0a272c]/90 px-3 py-2 text-xs font-semibold text-white shadow-[0_12px_35px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-4 sm:text-sm ${position}`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00b3a6]/15 text-[#0AE6C7]">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
