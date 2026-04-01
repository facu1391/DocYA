// src/components/landing/HeroCreative.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import ConfirmModal from "@/components/common/ConfirmModal";
import { appDownloadCopy } from "@/components/common/confirmCopy";
import "swiper/css";
import "swiper/css/pagination";

type Slide =
  | { src: string; kind: "headline"; title: string; subtitle: string }
  | { src: string; kind: "paragraph"; title: string; paragraph: string }
  | { src: string; kind: "bullets"; title: string; bullets: string[] };

const SLIDES: Slide[] = [
  {
    src: "/hero/hero1.jpg",
    kind: "headline",
    title: "Médicos y enfermeros a domicilio en minutos",
    subtitle:
      "La app que conecta médicos y enfermeros con pacientes gracias a la geolocalización en tiempo real.",
  },
  {
    src: "/hero/hero2.jpg",
    kind: "paragraph",
    title: "Conectá con pacientes a domicilio",
    paragraph:
      "Conectá con pacientes a domicilio en minutos. Elegí horarios y zonas. Ingreso por consulta: $30.000",
  },
  {
    src: "/hero/hero3.jpg",
    kind: "bullets",
    title: "Crecé con tu reputación",
    bullets: [
      "Horarios flexibles y por zona",
      "Mapa en tiempo real para llegar al domicilio",
      "Emití recetas y certificados digitales",
    ],
  },
];

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.docya.paciente";

const APP_STORE_URL =
  "https://apps.apple.com/ar/app/docya/id6753604975";

type Platform = "android" | "ios" | "unknown";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";

  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);

  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && (navigator.maxTouchPoints ?? 0) > 1);

  if (isAndroid) return "android";
  if (isIOS) return "ios";
  return "unknown";
}

export default function HeroCreative() {
  const [openApp, setOpenApp] = useState(false);
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const handleDownloadApp = () => {
    const url =
      platform === "ios"
        ? APP_STORE_URL
        : platform === "android"
          ? PLAY_STORE_URL
          : PLAY_STORE_URL;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative w-full overflow-hidden bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="pointer-events-none absolute inset-0 brand-glow" />

      <div className="relative w-full">
        <Swiper
          modules={[Autoplay, Pagination, A11y]}
          loop
          speed={650}
          slidesPerView={1}
          autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          className="w-full hero-swiper"
        >
          {SLIDES.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-[72vh] w-full md:h-[84vh]">
                <Image
                  src={s.src}
                  alt={s.kind === "headline" ? s.title : "DocYa Pro"}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#02070d]/80 via-[#02070d]/45 to-[#02070d]/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#02070d]/70 via-[#02070d]/20 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                  <div className="max-w-5xl">
                    <span className="badge mb-5 inline-flex">
                      DocYa Pro
                    </span>

                    {s.kind === "headline" && (
                      <>
                        <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-white drop-shadow sm:text-4xl md:text-6xl">
                          {s.title}
                        </h1>
                        <p className="mx-auto mt-5 max-w-3xl text-base text-white/90 drop-shadow sm:text-lg md:text-xl">
                          {s.subtitle}
                        </p>
                      </>
                    )}

                    {s.kind === "paragraph" && (
                      <>
                        <h2 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-white drop-shadow sm:text-4xl md:text-5xl">
                          {s.title}
                        </h2>
                        <p className="mx-auto mt-5 max-w-3xl text-base text-white/90 drop-shadow sm:text-lg md:text-xl">
                          {s.paragraph}
                        </p>
                      </>
                    )}

                    {s.kind === "bullets" && (
                      <>
                        <h2 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-white drop-shadow sm:text-4xl md:text-5xl">
                          {s.title}
                        </h2>
                        <ul className="mx-auto mt-6 grid max-w-2xl gap-3 text-left">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-3 text-white/95">
                              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_12%,transparent)]">
                                <Check className="h-4 w-4 text-[var(--brand)]" />
                              </span>
                              <span className="text-base drop-shadow sm:text-lg">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <Link href="/registro" className="btn-primary h-11 px-5">
                        Registrate como profesional <ArrowRight className="h-4 w-4" />
                      </Link>

                      <Link
                        href="#"
                        className="btn-outline-primary h-11 px-5"
                        aria-label="Descargar la app"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenApp(true);
                        }}
                      >
                        Descargar app
                      </Link>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                      <span className="badge">Horarios flexibles</span>
                      <span className="badge">Cobertura por zonas</span>
                      <span className="badge">Ingresos semanales</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4">
        <p className="py-6 text-center text-sm text-muted-foreground">
          Atención médica y de enfermería a domicilio en todo el país.
        </p>
      </div>

      <ConfirmModal
        open={openApp}
        onOpenChange={setOpenApp}
        title={appDownloadCopy.title}
        description={appDownloadCopy.description}
        confirmText={appDownloadCopy.confirmText}
        cancelText={appDownloadCopy.cancelText}
        onConfirm={() => {
          setOpenApp(false);
          handleDownloadApp();
        }}
        onCancel={() => setOpenApp(false)}
      />

      <style jsx>{`
        .hero-swiper {
          --swiper-theme-color: var(--brand);
          --swiper-pagination-bullet-inactive-color: color-mix(in srgb, var(--brand) 35%, transparent);
          --swiper-pagination-bullet-inactive-opacity: 0.75;
          --swiper-pagination-bullet-size: 8px;
          --swiper-pagination-bullet-horizontal-gap: 5px;
        }
        .hero-swiper :global(.swiper-pagination) {
          bottom: 16px;
        }
        .hero-swiper :global(.swiper-pagination-bullet) {
          background: var(--swiper-pagination-bullet-inactive-color);
          opacity: var(--swiper-pagination-bullet-inactive-opacity);
        }
        .hero-swiper :global(.swiper-pagination-bullet-active) {
          background: var(--swiper-theme-color);
          opacity: 1;
          transform: scale(1.15);
        }
        .hero-swiper :global(.swiper-button-prev),
        .hero-swiper :global(.swiper-button-next) {
          display: none !important;
        }
      `}</style>
    </section>
  );
}