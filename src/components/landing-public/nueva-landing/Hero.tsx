// src/components/landing-public/nueva-landing/Hero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope, Bot, House, Video } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function Hero() {
  const { t } = useI18n();
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

      <div className="w-full max-w-[1200px] mx-auto px-6 py-10 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        <div>
          <motion.div
            className="badge-trusted mb-6 w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShieldCheck size={16} aria-hidden="true" />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            className="hero-title mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {t.hero.title}{" "}
            <span className="highlight-text">{t.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            className="text-base lg:text-lg text-text-muted mb-6 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            aria-label={t.hero.tiemposAtencion}
          >
            <div className="flex items-center gap-3 border-l-2 border-[var(--brand)] pl-3 py-1 min-w-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[var(--brand)]">
                <House size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-text-muted">{t.hero.domicilioTitulo}</p>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <strong className="text-2xl leading-none text-foreground">{t.hero.domicilioTiempo}</strong>
                  <span className="text-xs text-text-muted">{t.hero.domicilioDescripcion}</span>
                </div>
                <p className="mt-1 text-[11px] font-medium text-[var(--brand)]">{t.hero.domicilioCobertura}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-l-2 border-[var(--brand)] pl-3 py-1 min-w-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/10 text-[var(--brand)]">
                <Video size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-text-muted">{t.hero.teleconsultaTitulo}</p>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <strong className="text-2xl leading-none text-foreground">{t.hero.teleconsultaTiempo}</strong>
                  <span className="text-xs text-text-muted">{t.hero.teleconsultaDescripcion}</span>
                </div>
                <p className="mt-1 text-[11px] font-medium text-[var(--brand)]">{t.hero.teleconsultaCobertura}</p>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="mb-6 max-w-xl text-[11px] leading-relaxed text-text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {t.hero.tiemposAclaracion}
          </motion.p>

          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <a
                href="/pedir"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold rounded-full w-full sm:w-fit"
                style={{ background: "linear-gradient(90deg, #00b3a6, #2dd4bf)", color: "#fff", textDecoration: "none", boxShadow: "0 8px 24px rgba(0,179,166,0.4)" }}
              >
                {t.hero.solicitarAhora}
              </a>
              <a
                href="#descargar"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full w-full sm:w-fit"
                style={{ border: "1.5px solid rgba(255,255,255,0.2)", color: "inherit", textDecoration: "none", backdropFilter: "blur(4px)" }}
              >
                {t.hero.descargarApp}
              </a>
            </div>
            <div className="flex gap-4 flex-wrap">
              <a href="#" className="inline-block hover:-translate-y-0.5 transition-transform">
                <Image
                  src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg"
                  alt={t.hero.altAppStore}
                  width={160}
                  height={48}
                  className="h-12 w-auto"
                />
              </a>
              <a href="#" className="inline-block hover:-translate-y-0.5 transition-transform">
                <Image
                  src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467963/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM_cbr148.svg"
                  alt={t.hero.altGooglePlay}
                  width={160}
                  height={48}
                  className="h-12 w-auto"
                />
              </a>
            </div>

            <p className="max-w-xl text-xs leading-relaxed text-text-muted">
              {t.hero.confianza}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-border/50 pt-5">
              <div className="flex items-center gap-2 text-sm font-medium text-text-muted">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                {t.hero.medicosMatriculados}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-text-muted">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                {t.hero.datosEncriptados}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative w-[280px] h-[569px] sm:w-[320px] sm:h-[650px]">
            <div className="w-full h-full rounded-[40px] overflow-hidden relative z-20">
              <Image
                src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774886286/Screenshot_20260330-105015-portrait_ihblq7.png"
                alt={t.hero.altPantalla}
                fill
                className="object-cover"
                priority
              />
            </div>

            <motion.div
              className="floating-card"
              style={{ top: "15%", right: "-25%", boxShadow: "0 10px 30px rgba(0, 179, 166, 0.15)" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)]/10">
                <Stethoscope size={16} className="text-[var(--brand)]" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">{t.hero.draNombre}</div>
                <div className="text-[10px] text-[var(--brand)] font-semibold">{t.hero.enCamino}</div>
              </div>
            </motion.div>

            <motion.div
              className="floating-card"
              style={{ bottom: "20%", left: "-25%", boxShadow: "0 10px 30px rgba(58, 134, 255, 0.15)" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                <Bot size={16} className="text-blue-500" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">{t.hero.analisisCompletado}</div>
                <div className="text-[10px] text-text-muted">{t.hero.preDiagnostico}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
