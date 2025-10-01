
"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
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

export default function HeroFullBleed() {
  return (
    <section className="relative w-full bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
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
              <div className="relative w-full h-[68vh] md:h-[78vh]">
                <Image
                  src={s.src}
                  alt={s.kind === "headline" ? s.title : "DocYa Pro"}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/15" />

                <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                  <div className="max-w-4xl">
                    {s.kind === "headline" && (
                      <>
                        <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight drop-shadow">
                          {s.title}
                        </h1>
                        <p className="mt-4 text-white/90 text-base sm:text-lg md:text-xl drop-shadow">
                          {s.subtitle}
                        </p>
                      </>
                    )}

                    {s.kind === "paragraph" && (
                      <>
                        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow">
                          {s.title}
                        </h2>
                        <p className="mt-4 text-white/90 text-base sm:text-lg md:text-xl drop-shadow">
                          {s.paragraph}
                        </p>
                      </>
                    )}

                    {s.kind === "bullets" && (
                      <>
                        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow">
                          {s.title}
                        </h2>
                        <ul className="mt-5 grid gap-2 text-left max-w-xl mx-auto">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-white/95">
                              <Check className="mt-0.5 h-5 w-5 text-[var(--brand)] shrink-0" />
                              <span className="text-base sm:text-lg drop-shadow">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <Link href="/registro" className="btn-primary">
                        Registrate como profesional <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container mx-auto px-6">
        <p className="text-center text-sm text-muted-foreground py-6">
          Atención inicial en CABA (Palermo y Belgrano) — expansión nacional.
        </p>
      </div>

      {/* Estilos del paginador scopeados al componente */}
      <style jsx>{`
        /* Variables de Swiper aplicadas SOLO a este carrusel */
        .hero-swiper {
          --swiper-theme-color: var(--brand);
          --swiper-pagination-bullet-inactive-color: color-mix(in srgb, var(--brand) 35%, transparent);
          --swiper-pagination-bullet-inactive-opacity: 0.75;
          --swiper-pagination-bullet-size: 8px;
          --swiper-pagination-bullet-horizontal-gap: 5px;
        }
        .hero-swiper :global(.swiper-pagination) {
          bottom: 14px;
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
        /* Por si alguna hoja agrega flechas, las forzamos a ocultarse */
        .hero-swiper :global(.swiper-button-prev),
        .hero-swiper :global(.swiper-button-next) {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
