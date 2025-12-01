
"use client";

import { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function LoginSuccessPage() {
  useEffect(() => {
    const fire = () => {
      confetti({
        particleCount: 140,
        spread: 120,
        origin: { y: 0.6 },
        colors: ["#00B3A6", "#10b981", "#f97316", "#e11d48", "#6366f1"],
      });
    };

    fire();
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 px-6 py-8 shadow-2xl shadow-emerald-900/30 backdrop-blur-xl dark:bg-slate-950/80"
      >
        <div className="flex items-start gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white">
              ¡Tu contraseña fue actualizada con éxito!
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Ya podés ingresar a DocYa Pro con tus nuevas credenciales.
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-300 leading-relaxed">
          Por tu seguridad, te recomendamos no compartir tu contraseña con nadie y
          mantener tu correo actualizado para recuperar el acceso cuando lo
          necesites.
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="text-sm text-slate-300 underline-offset-4 hover:underline"
          >
            Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
