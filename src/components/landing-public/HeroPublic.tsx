"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/common/ConfirmModal";
import InfoModal from "@/components/common/InfoModal";
import { proGateCopy, appDownloadCopy } from "@/components/common/confirmCopy";
import LoadingSplash from "@/components/common/LoadingSplash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { src: "/hero-public1.jpg", text: "Atención médica en tu hogar, rápida y confiable." },
  { src: "/hero-public2.jpg", text: "Profesionales verificados disponibles las 24 hs." },
  { src: "/hero-public3.jpg", text: "Tu salud y la de tu familia, en las mejores manos." },
  { src: "/hero-public4.jpg", text: "Cuidamos de vos donde estés. Sin esperas." },
];

export default function HeroPublic() {
  const [open, setOpen] = useState(false);
  const [openApp, setOpenApp] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <section className="relative w-full bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        loop
        speed={650}
        slidesPerView={1}
        autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        className="w-full hero-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[68vh] md:h-[78vh]">
              <Image
                src={slide.src}
                alt="Atención médica a domicilio"
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/15" />
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                <div className="max-w-4xl">
                  <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight drop-shadow">
                    {slide.text}
                  </h1>
                  <p className="mt-4 text-white/90 text-base sm:text-lg md:text-xl drop-shadow">
                    Conectá con profesionales en minutos, sin salir de casa.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {/* CTA Pro (igual que antes) */}
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="btn-primary cursor-pointer"
                      disabled={loading}
                    >
                      Sumate como profesional
                    </button>

                    {/* NUEVO: CTA Paciente */}
                    <button
                      type="button"
                      onClick={() => router.push("/registro/paciente")}
                      className="btn-primary cursor-pointer"
                      aria-label="Registrate como paciente en DocYa"
                    >
                      Registrate como paciente
                    </button>

                    {/* Descargar app */}
                    <button
                      type="button"
                      onClick={() => setOpenApp(true)}
                      className="btn-outline-primary cursor-pointer"
                      aria-label="Descargar la app"
                    >
                      Descargar app
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <LoadingSplash
        show={loading}
        message="Abriendo Profesionales…"
        autoHideMs={2500}
        onHide={() => setLoading(false)}
      />

      <ConfirmModal
        open={open}
        onOpenChange={setOpen}
        title={proGateCopy.title}
        description={proGateCopy.description}
        confirmText={proGateCopy.confirmText}
        cancelText={proGateCopy.cancelText}
        onConfirm={() => {
          setOpen(false);
          setLoading(true);
          setTimeout(() => router.push("/profesionales"), 2000);
        }}
        onCancel={() => setOpen(false)}
      />

      <InfoModal
        open={openApp}
        onOpenChange={setOpenApp}
        title={appDownloadCopy.title}
        description={appDownloadCopy.description}
        actionText={appDownloadCopy.confirmText}
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
      `}</style>
    </section>
  );
}
