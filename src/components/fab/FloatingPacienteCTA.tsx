
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";

export default function FloatingPacienteCTA() {
  const pathname = usePathname();

  // Oculto el CTA cuando ya estás en el registro de pacientes
  if (pathname?.startsWith("/registro/paciente")) return null;

  return (
    <motion.div
      className="fixed z-40"
      style={{
        // respeta safe area (iOS) y lo ubica firmemente abajo-izq.
        left: "max(1.5rem, env(safe-area-inset-left))",
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Link
        href="/registro/paciente"
        aria-label="Registrate como paciente en DocYa"
        className="group inline-flex items-center gap-2 rounded-full px-5 py-3 shadow-lg
                   bg-emerald-600 text-white hover:bg-emerald-700
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <UserPlus className="size-5" />
        <span className="font-medium">Registrate como paciente</span>
        <span className="ml-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs">
          Gratis
        </span>
      </Link>

      {/* halo sutil */}
      <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-500/20" />
    </motion.div>
  );
}
