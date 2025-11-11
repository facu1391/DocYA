"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Stethoscope } from "lucide-react";
import ConfirmModal from "@/components/common/ConfirmModal";
import { proGateCopy } from "@/components/common/confirmCopy";
import LoadingSplash from "@/components/common/LoadingSplash";

export default function FloatingCTA() {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Hooks SIEMPRE en el tope (sin returns antes)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Reglas de visibilidad
  const HIDDEN_ROUTES = ["/registro", "/gracias"];
  const shouldHide = HIDDEN_ROUTES.some((p) => pathname.startsWith(p));
  const isPublicAudience = pathname === "/" || pathname.startsWith("/legal/pacientes");

  // Si debe ocultarse, no se renderiza NADA (pero los hooks ya corrieron)
  if (shouldHide) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed z-[50] right-4 md:right-5"
          style={{
            bottom: isMobile
              ? "max(1.25rem, env(safe-area-inset-bottom))"
              : "max(1.25rem, env(safe-area-inset-bottom))",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
        >
          <motion.span
            className="absolute inset-0 -z-10 rounded-full"
            initial={{ scale: 0.9, opacity: 0.6, boxShadow: "0 0 0 0 rgba(0,179,166,0.35)" }}
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                "0 0 0 0 rgba(0,179,166,0.35)",
                "0 0 0 18px rgba(0,179,166,0)",
                "0 0 0 0 rgba(0,179,166,0)",
              ],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />

          <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
            {isPublicAudience ? (
              <button
                type="button"
                onClick={() => setOpenConfirm(true)}
                aria-label="Ver sección para profesionales"
                className="inline-flex items-center rounded-full h-11 px-5 shadow-lg cursor-pointer bg-[var(--brand)] text-[var(--brand-foreground)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgb(0_179_166_/_0.3)]"
                disabled={loading}
              >
                Sumate como profesional
                <Stethoscope className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <Link
                href="/registro"
                aria-label="Registrarme como profesional"
                className="inline-flex items-center rounded-full h-11 px-5 shadow-lg bg-[var(--brand)] text-[var(--brand-foreground)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgb(0_179_166_/_0.3)]"
              >
                Súmate
                <Send className="ml-2 h-4 w-4" />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <LoadingSplash
        show={loading}
        message="Abriendo Profesionales…"
        autoHideMs={2500}
        onHide={() => setLoading(false)}
      />

      <ConfirmModal
        open={openConfirm}
        onOpenChange={setOpenConfirm}
        title={proGateCopy.title}
        description={proGateCopy.description}
        confirmText={proGateCopy.confirmText}
        cancelText={proGateCopy.cancelText}
        onConfirm={() => {
          setOpenConfirm(false);
          setLoading(true);
          setTimeout(() => router.push("/profesionales"), 2000);
        }}
        onCancel={() => setOpenConfirm(false)}
      />
    </>
  );
}
