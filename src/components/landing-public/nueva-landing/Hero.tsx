// src/components/landing-public/nueva-landing/Hero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Stethoscope, Bot } from "lucide-react";

export default function Hero() {
  return (
    <header id="inicio" className="min-h-screen flex items-center relative pt-20 overflow-hidden">
      <div
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,210,255,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(58,134,255,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
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
            className="text-xl text-text-muted mb-8 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Consultá GRATIS con inteligencia artificial médica y, si lo necesitás, recibí
            atención en tu domicilio con asignación rápida del profesional más cercano.
          </motion.p>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <a
              href="#descargar"
              className="btn-primary inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-full w-fit"
            >
              Descargar App
            </a>
            <div className="flex gap-4 flex-wrap">
              <a href="#" className="inline-block hover:-translate-y-0.5 transition-transform">
                <Image
                  src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg"
                  alt="Descargar en App Store"
                  width={160}
                  height={48}
                  className="h-12 w-auto"
                />
              </a>
              <a href="#" className="inline-block hover:-translate-y-0.5 transition-transform">
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
          className="flex justify-center relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative w-[320px] h-[650px]">
            <div className="w-full h-full rounded-[40px] overflow-hidden relative z-20">
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
              <Stethoscope size={18} className="text-primary" />
              <span>Médico en camino</span>
            </motion.div>

            <motion.div
              className="floating-card"
              style={{ bottom: "25%", left: "-20%" }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            >
              <Bot size={18} className="text-primary" />
              <span>IA evaluando...</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}