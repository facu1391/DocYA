// src/components/referidos/landing/ReferidosLandingNavbar.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ReferidosLandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#070d14]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/referidos" aria-label="Ir a Partner DocYa">
          <Image
            src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png"
            alt="Partner DocYa"
            width={100}
            height={32}
            className="h-8 w-auto object-contain"
            unoptimized
          />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/referidos/login"
            className="text-sm font-semibold px-5 py-2.5 rounded-full border border-white/[0.12] text-slate-300 hover:text-white hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300 hover:-translate-y-px"
          >
            Iniciar sesión
          </Link>

          <a
            href="#registro"
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:-translate-y-px"
          >
            Ser partner
          </a>
        </div>
      </div>
    </motion.header>
  );
}
