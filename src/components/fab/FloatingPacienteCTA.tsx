"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function FloatingPacienteCTA() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta ancho para ajustar el offset inferior
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (pathname?.startsWith("/registro/paciente")) return null;

  return (
    <motion.div
      className="fixed z-[38]" // ligeramente debajo de otros FABs
      style={{
        left: "max(1.25rem, env(safe-area-inset-left))",
        bottom: isMobile
          ? "max(6.5rem, env(safe-area-inset-bottom))" // + espacio para FABs
          : "max(2rem, env(safe-area-inset-bottom))",
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

      <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-500/20" />
    </motion.div>
  );
}
