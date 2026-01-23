"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Power, MapPin, Sparkles, CreditCard } from "lucide-react";

const IMAGENES = [
  { src: "/how/experiencia1.png", alt: "Login DocYa Pro" },
  { src: "/how/experiencia2.png", alt: "Mapa y disponibilidad" },
  { src: "/how/experiencia3.png", alt: "Solicitud del paciente" },
  { src: "/how/experiencia4.png", alt: "Consulta en curso" },
];

const HIGHLIGHTS = [
  { icon: <Power className="h-4 w-4" />, text: "Disponible con un toque" },
  { icon: <MapPin className="h-4 w-4" />, text: "Geolocalización en tiempo real" },
  { icon: <Sparkles className="h-4 w-4" />, text: "Asignación automática" },
  { icon: <CreditCard className="h-4 w-4" />, text: "Cobrás desde la app" },
];

export default function ExperienciaDocYa() {
  return (
    <section
      className="
        relative py-16 md:py-20
        bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]
      "
    >
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      {/* ✅ CAMBIO: wrapper centrado (antes era "container") */}
      <div className="mx-auto w-full max-w-6xl px-4 relative">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          Conocé la experiencia DocYa
        </h2>

        <div className="mt-8 md:mt-10">
          <div
            className="
              surface rounded-3xl p-3 md:p-5
              shadow-[0_12px_40px_rgba(0,0,0,0.18)]
              max-w-[1200px] mx-auto
            "
          >
            <Swiper
              modules={[Autoplay, Pagination, A11y, Keyboard]}
              slidesPerView={1}
              loop
              keyboard={{ enabled: true }}
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true }}
              className="exp-swiper"
            >
              {IMAGENES.map((img, i) => (
                <SwiperSlide key={img.src}>
                  <div className="relative exp-frame rounded-2xl overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      className="object-contain bg-[color-mix(in_srgb,var(--brand)_4%,transparent)]"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <ul className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-2.5 md:gap-3.5">
            {HIGHLIGHTS.map((h) => (
              <li
                key={String(h.text)}
                className="
                  inline-flex items-center gap-2
                  rounded-full border
                  px-3.5 py-2 text-sm
                  text-[var(--brand)]
                  bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                  border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                  shadow-sm
                "
              >
                {h.icon}
                <span className="whitespace-nowrap">{h.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
