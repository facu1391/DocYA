// src/components/landing-public/nueva-landing/Hero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Stethoscope, Bot } from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/ar/app/docya/id6753604975";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.docya.paciente";

export default function Hero() {
  return (
    <header className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div
        className="pointer-events-none absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,210,255,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(58,134,255,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <motion.div
            className="badge mb-6 w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={16} />
            Consultas con IA 100% GRATIS
          </motion.div>

          <motion.h1
            className="hero-title mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Un médico en tu casa,{" "}
            <span className="highlight-text">sin esperas</span>
          </motion.h1>

          <motion.p
            className="text-text-muted mb-8 max-w-lg text-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Consultá GRATIS con inteligencia artificial médica y, si lo necesitás,
            recibí atención en tu domicilio con asignación rápida del profesional más cercano.
          </motion.p>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <a
              href="#descargar"
              className="btn-primary inline-flex w-fit items-center justify-center rounded-full px-10 py-4 text-lg font-bold"
            >
              Descargar App
            </a>

            <div className="flex flex-wrap gap-4">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:-translate-y-0.5"
              >
                <Image
                  src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg"
                  alt="Descargar en App Store"
                  width={160}
                  height={48}
                  className="h-12 w-auto"
                />
              </a>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:-translate-y-0.5"
              >
                <Image
                  src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467963/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM_cbr148.svg"
                  alt="Disponible en Google Play"
                  width={160}
                  height={48}
                  className="h-12 w-auto"
                />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative h-[650px] w-[320px] max-w-full">
            <div className="relative z-20 h-full w-full overflow-hidden rounded-[40px]">
              <Image
                src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774886286/Screenshot_20260330-105015-portrait_ihblq7.png"
                alt="Pantalla principal de DocYa"
                fill
                className="object-cover"
                priority
              />
            </div>

            <motion.div
              className="floating-card"
              style={{ top: "20%", right: "-15%" }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Stethoscope size={18} style={{ color: "var(--primary)" }} />
              <span>Médico en camino</span>
            </motion.div>

            <motion.div
              className="floating-card"
              style={{ bottom: "25%", left: "-20%" }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            >
              <Bot size={18} style={{ color: "var(--primary)" }} />
              <span>IA evaluando...</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}