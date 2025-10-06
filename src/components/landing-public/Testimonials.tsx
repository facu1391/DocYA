
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { motion, cubicBezier } from "framer-motion";
import { Star, CheckCircle2, Quote } from "lucide-react";

type TItem = {
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
};

const testimonials: TItem[] = [
  {
    name: "Lucía",
    role: "Paciente",
    location: "Palermo",
    rating: 5,
    text: "El médico llegó en 20 minutos. Muy amable y profesional. Me resolvió todo en casa.",
  },
  {
    name: "Carlos",
    role: "Hijo de paciente",
    location: "Belgrano",
    rating: 5,
    text: "Excelente servicio para mi mamá. Rápido, seguro y con seguimiento.",
  },
  {
    name: "Mariana",
    role: "Paciente",
    location: "Recoleta",
    rating: 5,
    text: "Me atendieron sin complicaciones y emitieron receta digital al instante.",
  },
  {
    name: "Federico",
    role: "Paciente",
    location: "Caballito",
    rating: 5,
    text: "Ideal cuando no podés moverte de casa. Volvería a usarlo.",
  },
];

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < value ? "h-4 w-4 fill-[var(--brand)] text-[var(--brand)]" : "h-4 w-4 text-muted-foreground"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-20 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]" aria-labelledby="testi-title">
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      <div className="container relative">
        <motion.header
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        >
          <h2 id="testi-title" className="text-3xl md:text-4xl font-bold">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="mt-3 text-muted-foreground">
            Experiencias reales que respaldan la confianza en DocYa.
          </p>
        </motion.header>

        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 4200 }}
          pagination={{ clickable: true }}
          loop
          className="max-w-4xl mx-auto mt-10 exp-swiper"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={t.name}>
              <motion.article
                className="surface mx-4 rounded-2xl p-7 md:p-8 border relative overflow-hidden"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, ease: cubicBezier(0.22, 1, 0.36, 1), delay: i * 0.02 }}
              >
                <Quote
                  aria-hidden
                  className="absolute -top-3 -left-3 h-14 w-14 rotate-12 opacity-10 text-[var(--brand)]"
                />

                <div className="flex flex-col gap-4 md:gap-5">
                  <p className="text-base md:text-lg leading-relaxed">“{t.text}”</p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        aria-hidden
                        className="h-10 w-10 rounded-full flex items-center justify-center font-semibold text-[var(--brand)] border bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]"
                      >
                        {t.name.charAt(0)}
                      </div>

                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold">{t.name}</span>
                          <CheckCircle2 className="h-4 w-4 text-[var(--brand)]" aria-label="Perfil verificado" />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {t.role} · {t.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Stars value={t.rating} />
                      <span className="text-xs text-muted-foreground">(4.9/5)</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        >
          <span className="badge">Satisfacción promedio 4.9/5</span>
          <span className="badge">NPS 91</span>
          <span className="badge">Atención objetivo &lt; 35 min</span>
        </motion.div>
      </div>

      <style jsx>{`
        .exp-swiper .swiper-pagination-bullet {
          background: color-mix(in srgb, var(--brand) 35%, transparent);
          opacity: 0.6;
        }
        .exp-swiper .swiper-pagination-bullet-active {
          background: var(--brand);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
