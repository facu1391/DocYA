
"use client";

import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import type { ReactNode } from "react";

/* ====== Íconos de stores ====== */
function GooglePlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 512 512" aria-hidden>
      <path fill="#32bbff" d="M325.5 238.9 92.4 6.3C86.9.9 79.1-1.3 71.7.7 64.2 2.7 58.5 8.3 56.5 15.8 56 18 55.7 20.3 55.7 22.6V489.4c0 8.3 4.7 15.9 12.1 19.5 7.4 3.6 16.3 2.8 23-2l234.7-179.4 74.8-56.6-74.8-31.9z"/>
      <path fill="#00c1a5" d="M436.3 200.6 362 168.6 325.5 238.9l74.8 31.9 36.6-70.2c3.7-7.2 3.3-15.9-.6-23z"/>
      <path fill="#ffdf00" d="m362 168.6-53.8-22.9-215.8-91.8c-4.1-1.7-8.6-2-12.9-.8l242.9 185.8L362 168.6z"/>
      <path fill="#ff3a55" d="m79.5 459.2 228.7-97.3 53.1-22.6-69.8-53.9L79.5 459.2z"/>
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 384 512" aria-hidden>
      <path fill="currentColor" d="M318.7 268.6c-.4-44.5 19.8-78.2 60.2-102.6-22.6-33-57.1-51.1-101.2-54.2-42.6-3-89.7 24.8-106.7 24.8-17.5 0-62.7-24.1-96.9-24.1C22.8 112.5-2 169.4 0 222.8c2.4 56.3 32.7 118.8 57.3 158.1 25.3 40.5 49.5 76.5 84.7 75 34.3-1.4 47.3-24.4 88.8-24.4 41.5 0 53.2 24.4 89.8 23.6 37.2-.7 60.8-40.6 85.9-81.3 26.9-43.9 38.1-86.7 38.5-88.9-1-.4-73.5-28.2-75.3-116.3zM251.2 91.7c19.3-23.4 32.1-56.1 28.5-89.7-27.6 1.1-60.9 19-80.7 42.4-17.8 21-33.1 54.5-29 86.7 31.2 2.4 62.6-15.9 81.2-39.4z"/>
    </svg>
  );
}

/* ====== Tipado de acciones ====== */
type StoreAction =
  | { kind: "store-google"; href: string }
  | { kind: "store-apple"; href: string };

type LinkAction = {
  kind: "link";
  href: string;
  label: string;
  variant?: "primary" | "outline";
  icon?: ReactNode;
};

type Action = StoreAction | LinkAction;

function StoreBadge({ type, href }: { type: "google" | "apple"; href: string }) {
  const isGoogle = type === "google";
  return (
    <Link
      href={href}
      className="
        group inline-flex items-center gap-3 rounded-full px-5 py-3
        bg-white text-[var(--brand)] font-semibold border
        border-[color-mix(in_srgb,var(--brand)_25%,transparent)]
        shadow-sm hover:shadow-md transition
      "
      aria-label={isGoogle ? "Descargar en Google Play" : "Descargar en App Store"}
    >
      <span
        className="
          inline-flex items-center justify-center rounded-full h-9 w-9
          bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
          border border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
          text-[var(--brand)]
        "
      >
        {isGoogle ? <GooglePlayIcon /> : <AppleIcon />}
      </span>
      <div className="flex flex-col leading-tight text-left">
        <span className="text-xs opacity-70">Disponible en</span>
        <span className="text-sm sm:text-base">{isGoogle ? "Google Play" : "App Store"}</span>
      </div>
    </Link>
  );
}

/* ====== Componente genérico ====== */
export default function CtaBand({
  id = "cta",
  title,
  subtitle,
  actions = [],
  badges = [],
}: {
  id?: string;
  title: string;
  subtitle?: string;
  actions?: Action[];
  badges?: string[];
}) {
  return (
    <section id={id} className="relative overflow-hidden bg-[var(--brand)]">
      {/* Fondo (z-0) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(1200px_400px_at_50%_-20%,color-mix(in_srgb,var(--brand)_25%,transparent),transparent)]" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand)_85%,#043d3d)_0%,#062b2d_100%)] dark:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand)_75%,#052425)_0%,#041a1c_100%)]" />

      {/* Contenido (z-10) */}
      <div className="relative z-10 container px-6 py-20 md:py-24 text-center text-white">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            className="mt-3 text-base md:text-lg opacity-95 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.05, ease: cubicBezier(0.22, 1, 0.36, 1) }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Acciones */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        >
          {actions.map((a, i) => {
            if (a.kind === "store-google") return <StoreBadge key={i} type="google" href={a.href} />;
            if (a.kind === "store-apple") return <StoreBadge key={i} type="apple" href={a.href} />;
            // link
            const variant = a.variant ?? "primary";
            return (
              <Link
                key={i}
                href={a.href}
                className={variant === "primary" ? "btn-primary h-11 px-5" : "btn-outline-primary h-11 px-5 bg-white/10 text-white border-white/20 hover:bg-white/15"}
              >
                {a.icon}
                {a.icon ? <span className="ml-1.5">{a.label}</span> : a.label}
              </Link>
            );
          })}
        </motion.div>

        {/* Badges */}
        {badges.length > 0 && (
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: cubicBezier(0.22, 1, 0.36, 1) }}
          >
            {badges.map((b, i) => (
              <span
                key={i}
                className="badge bg-white/10 text-white border-white/20"
              >
                {b}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Ornamentos (z-0) */}
      <div
        className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full opacity-20 blur-2xl z-0"
        style={{ background: "radial-gradient(closest-side, white, transparent)" }}
      />
      <div
        className="pointer-events-none absolute -top-16 -left-24 h-60 w-60 rounded-full opacity-10 blur-2xl z-0"
        style={{ background: "radial-gradient(closest-side, white, transparent)" }}
      />
    </section>
  );
}
