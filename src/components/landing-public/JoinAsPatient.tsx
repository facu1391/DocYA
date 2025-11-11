
"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ShieldCheck, Clock9, HeartPulse, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

export default function JoinAsPatient() {
  return (
    <section className="relative py-16 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      {/* glow sutil */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_20%,#000,transparent)]">
        <div className="absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_srgb,var(--brand)_35%,transparent),transparent)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Cuidarte nunca fue tan fácil</h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mt-3">
            Registrate gratis, encontrá profesionales verificados y recibí atención médica en tu hogar. 
            Rápido, seguro y sin esperas.
          </p>
        </div>

        {/* GRID 3 columnas en desktop */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 items-start max-w-6xl mx-auto">
          {/* Columna izquierda (oculta en mobile) */}
          <ul className="hidden md:flex flex-col gap-4">
            <li className="surface rounded-xl p-4 border flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[var(--brand)] mt-0.5" />
              <div>
                <p className="font-medium">Profesionales verificados</p>
                <p className="text-sm text-muted-foreground">Confianza y calidad en cada consulta.</p>
              </div>
            </li>
            <li className="surface rounded-xl p-4 border flex items-start gap-3">
              <Clock9 className="h-5 w-5 text-[var(--brand)] mt-0.5" />
              <div>
                <p className="font-medium">En minutos, sin esperas</p>
                <p className="text-sm text-muted-foreground">Pedí atención cuando la necesitás.</p>
              </div>
            </li>
            <li className="surface rounded-xl p-4 border flex items-start gap-3">
              <HeartPulse className="h-5 w-5 text-[var(--brand)] mt-0.5" />
              <div>
                <p className="font-medium">En tu casa o donde estés</p>
                <p className="text-sm text-muted-foreground">Médicos y enfermería a domicilio.</p>
              </div>
            </li>
          </ul>

          {/* Columna centro: carrusel */}
          <div className="mx-auto w-full max-w-2xl">
            <div className="relative rounded-2xl border surface shadow-lg overflow-hidden">
              {/* ratio: más alto en mobile para que no corte y nunca desborde */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] overflow-hidden">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  loop
                  className="!w-full !h-full"
                >
                  <SwiperSlide className="!w-full !h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src="/mockup-paciente.png.jpg"
                        alt="App DocYa Paciente - Interior"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 640px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="!w-full !h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src="/mockup-paciente2.png.jpg"
                        alt="App DocYa Paciente - Exterior"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 640px"
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>

          {/* Columna derecha: CTA */}
          <div className="surface rounded-xl p-5 border md:sticky md:top-24">
            <p className="font-semibold">¿Qué podés hacer con DocYa?</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-[var(--brand)]" />
                Pedir atención médica o de enfermería a domicilio
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-[var(--brand)]" />
                Ver disponibilidad en tu zona
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-[var(--brand)]" />
                Chatear y coordinar tu consulta
              </li>
            </ul>

            <Link
              href="/registro/paciente"
              className="btn-primary mt-5 w-full sm:w-auto sm:justify-center justify-center"
            >
              Registrate como paciente
            </Link>

            <p className="text-[11px] text-muted-foreground mt-2 text-center">
              Es gratis y tarda menos de 2 minutos.
            </p>
          </div>
        </div>
      </div>

      {/* bullets del carrusel */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background: color-mix(in srgb, var(--brand) 45%, transparent);
          opacity: 0.75;
        }
        :global(.swiper-pagination-bullet-active) {
          background: var(--brand);
          opacity: 1;
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
