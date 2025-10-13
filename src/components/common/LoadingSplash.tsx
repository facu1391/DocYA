"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Props = {
  show: boolean;
  message?: string;
  /** si querés que se cierre solo */
  autoHideMs?: number; // p.ej. 2000
  /** callback cuando se oculta (opcional) */
  onHide?: () => void;
  /** ruta del logo (a color) */
  logoSrc?: string;
};

export default function LoadingSplash({
  show,
  message = "Redirigiendo…",
  autoHideMs,
  onHide,
  logoSrc = "/logo_puclic-light.png",
}: Props) {
  const pathname = usePathname();

  // 1) auto-cierre por tiempo
  useEffect(() => {
    if (!show || !autoHideMs) return;
    const t = setTimeout(() => onHide?.(), autoHideMs);
    return () => clearTimeout(t);
  }, [show, autoHideMs, onHide]);

  // 2) si cambia la ruta, cerramos (evita que quede pegado entre páginas)
  useEffect(() => {
    if (show) onHide?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="docya-splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--hero-bg)]/90 dark:bg-[var(--hero-bg-dark)]/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-3">
            {/* Logo DocYa (a color, sin invert) */}
            <div className="relative h-14 w-[180px]">
              <Image
                src={logoSrc}
                alt="DocYa"
                fill
                className="object-contain"
                priority
              />
            </div>

            <p className="text-sm text-muted-foreground">{message}</p>

            {/* spinner */}
            <div className="mt-1 h-6 w-6 rounded-full border-2 border-[var(--brand)] border-t-transparent animate-spin" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
