
"use client";

import { motion, type Variants, cubicBezier } from "framer-motion";
import {
  ShieldCheck,
  Stethoscope,
  FileCheck2,
  Wallet,
  Clock8,
  RadioTower,
} from "lucide-react";

type Benefit = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const benefits: Benefit[] = [
  {
    icon: <Stethoscope className="h-6 w-6" />,
    title: "Atención médica y de enfermería 24/7",
    desc: "Pedí una consulta cuando la necesites. Estamos disponibles todo el día.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Profesionales verificados",
    desc: "Validamos matrícula y credenciales para tu tranquilidad.",
  },
  {
    icon: <FileCheck2 className="h-6 w-6" />,
    title: "Recetas y certificados digitales",
    desc: "Documentación válida y segura, lista para descargar y compartir.",
  },
  {
    icon: <RadioTower className="h-6 w-6" />,
    title: "Cobertura por zonas",
    desc: "Asignación inteligente según cercanía para reducir tiempos de espera.",
  },
  {
    icon: <Clock8 className="h-6 w-6" />,
    title: "Respuesta rápida",
    desc: "Tiempo objetivo promedio menor a 35 minutos en zonas activas.",
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Pagos seguros",
    desc: "Operaciones protegidas y soporte disponible cuando lo necesites.",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

export default function BenefitsPublic() {
  return (
    <section className="relative py-20 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)]">
      <div className="absolute inset-0 pointer-events-none brand-glow" />
      <div className="container relative">
        <motion.h2
          className="text-center text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        >
          Beneficios para vos y tu familia
        </motion.h2>

        <motion.div
          className="
            mt-10 px-2 grid gap-6 md:gap-8
            /* 1 columna en mobile */
            /* en md: 2 columnas de ancho fijo y centradas */
            md:[grid-template-columns:repeat(2,minmax(0,360px))]
            md:justify-center
            /* en lg: 3 columnas centradas */
            lg:[grid-template-columns:repeat(3,minmax(0,360px))]
            /* limitar ancho total y centrar bloque */
            max-w-[1120px] mx-auto
          "
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((b) => (
            <motion.article
              key={b.title}
              variants={item}
              className="surface rounded-2xl p-6 md:p-7 border transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1 group"
            >
              <div className="flex items-start gap-4">
                <span
                  className="
                    inline-flex items-center justify-center rounded-xl h-12 w-12 shrink-0
                    text-[var(--brand)]
                    bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                    border border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                    shadow-sm group-hover:scale-105 transition-transform
                  "
                >
                  {b.icon}
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">{b.title}</h3>
                  <p className="mt-1.5 text-sm md:text-base text-muted-foreground">
                    {b.desc}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        >
          <span className="badge">Profesionales verificados</span>
          <span className="badge">Tiempo objetivo &lt; 35 min</span>
          <span className="badge">Pagos seguros</span>
        </motion.div>
      </div>
    </section>
  );
}
