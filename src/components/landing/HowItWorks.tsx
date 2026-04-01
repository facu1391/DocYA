// src/components/landing/HowItWorks.tsx
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
    <section className="relative bg-[var(--hero-bg)] py-16 md:py-20 dark:bg-[var(--hero-bg-dark)]">
      <div className="pointer-events-none absolute inset-0 brand-glow" />

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge">Experiencia profesional</span>
          <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
            Conocé la experiencia DocYa
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Una interfaz simple para activar disponibilidad, recibir solicitudes y gestionar la atención desde el celular.
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <div
            className="
              surface mx-auto max-w-[1200px] rounded-3xl border p-3 shadow-[0_12px_40px_rgba(0,0,0,0.18)] md:p-5
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
                  <div className="relative exp-frame overflow-hidden rounded-2xl">
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

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:mt-8 md:gap-3.5">
            {HIGHLIGHTS.map((h) => (
              <li
                key={String(h.text)}
                className="
                  inline-flex items-center gap-2 rounded-full border
                  border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                  bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                  px-3.5 py-2 text-sm text-[var(--brand)] shadow-sm
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