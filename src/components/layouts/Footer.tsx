// src/components/layouts/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  // público = home + legales para pacientes
  const isPublicAudience = pathname === "/" || pathname.startsWith("/legal/pacientes");
  const legalBase = isPublicAudience ? "/legal/pacientes" : "/legal/pro";

  const publicCopy =
    "Atención médica y de enfermería a domicilio. Profesionales verificados, tiempos rápidos y pagos seguros.";
  const proCopy =
    "Conectamos profesionales de la salud con pacientes a domicilio. Flexibilidad, herramientas digitales y pagos claros.";

  const LOGOS = isPublicAudience
    ? { light: "/logo_puclic-dark.png", dark: "/logo_puclic-light.png", alt: "DocYa" }
    : { light: "/logo-pro-dark.png", dark: "/logo-pro-light.png", alt: "DocYa Pro" };

  const brandName = isPublicAudience ? "DocYa" : "DocYa Pro";

  const chipLinkCls =
    "md:p-0 md:rounded-none md:border-0 md:bg-transparent md:text-current " +
    "inline-block rounded-full border px-3 py-1.5 text-white/90 hover:text-white " +
    "border-white/10 hover:bg-white/10 transition";

  const sectionTitleCls = "text-sm font-semibold text-white md:text-left text-center";

  return (
    <footer
      role="contentinfo"
      className="border-t bg-[var(--footer-bg)] border-[var(--footer-border)] text-gray-300"
    >
      <div className="container py-10 md:py-12">
        {/* ✅ Wrapper centrado FIX */}
        <div className="mx-auto w-full max-w-6xl px-4">
          {/* Top grid */}
          <div
            className={[
              "grid gap-8 md:gap-10",
              isPublicAudience
                ? "md:grid-cols-[1.2fr_1fr_1fr]"
                : "md:grid-cols-2 lg:grid-cols-4",
            ].join(" ")}
          >
            {/* Marca + redes */}
            <div className="md:text-left text-center">
              <Link href="/" aria-label="Ir a la Home" className="inline-block">
                {/* logo claro */}
                <div className="relative h-9 w-[150px] mx-auto md:mx-0 dark:hidden">
                  <Image src={LOGOS.light} alt={LOGOS.alt} fill className="object-contain" />
                </div>
                {/* logo oscuro */}
                <div className="relative h-9 w-[150px] mx-auto md:mx-0 hidden dark:block">
                  <Image src={LOGOS.dark} alt={LOGOS.alt} fill className="object-contain" />
                </div>
              </Link>

              <p className="mt-3 text-sm text-gray-400 md:max-w-sm mx-auto md:mx-0">
                {isPublicAudience ? publicCopy : proCopy}
              </p>

              {/* Social */}
              <ul className="mt-4 flex items-center justify-center md:justify-start gap-3">
                <li>
                  <a
                    href="https://www.linkedin.com/company/docya"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border
                               border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                               bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                               text-[var(--brand)] hover:brightness-110 transition"
                  >
                    <Linkedin className="h-4.5 w-4.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/docya.argentina"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border
                               border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                               bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                               text-[var(--brand)] hover:brightness-110 transition"
                  >
                    <Instagram className="h-4.5 w-4.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/docya"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border
                               border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                               bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                               text-[var(--brand)] hover:brightness-110 transition"
                  >
                    <Facebook className="h-4.5 w-4.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:soporte@docya.com.ar"
                    aria-label="Email"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border
                               border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                               bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]
                               text-[var(--brand)] hover:brightness-110 transition"
                  >
                    <Mail className="h-4.5 w-4.5" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Producto (solo Pro) */}
            {!isPublicAudience && (
              <div className="md:text-left text-center md:border-0 border-t border-[var(--footer-border)] pt-6 md:pt-0">
                <h4 className={sectionTitleCls}>Producto</h4>
                <ul className="mt-3 flex md:block flex-wrap justify-center gap-2 md:space-y-2 text-sm">
                  <li><Link href="/ingresos" className={chipLinkCls}>Ingresos</Link></li>
                  <li><Link href="/faqs" className={chipLinkCls}>FAQs</Link></li>
                  <li><Link href="/contacto" className={chipLinkCls}>Contacto</Link></li>
                  <li><Link href="/registro" className={chipLinkCls}>Registrate</Link></li>
                </ul>
              </div>
            )}

            {/* Legal */}
            <div className="md:text-left text-center md:border-0 border-t border-[var(--footer-border)] pt-6 md:pt-0">
              <h4 className={sectionTitleCls}>Legal</h4>
              <ul className="mt-3 flex md:block flex-wrap justify-center gap-2 md:space-y-2 text-sm">
                <li>
                  <Link href={`${legalBase}/terminos`} className={chipLinkCls}>
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href={`${legalBase}/privacidad`} className={chipLinkCls}>
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="md:text-left text-center md:border-0 border-t border-[var(--footer-border)] pt-6 md:pt-0">
              <h4 className={sectionTitleCls}>Contacto</h4>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex md:justify-start justify-center gap-2">
                  <Mail className="h-4 w-4 text-[var(--brand)]" />
                  <a href="mailto:soporte@docya.com.ar" className="hover:text-[var(--brand)] transition">
                    soporte@docya.com.ar
                  </a>
                </li>
                <li className="flex md:justify-start justify-center gap-2">
                  <Phone className="h-4 w-4 text-[var(--brand)]" />
                  <a
                    href="https://wa.me/5491168700607"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--brand)] transition"
                  >
                    +54 9 11 6870-0607
                  </a>
                </li>
                <li className="flex md:justify-start justify-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--brand)]" />
                  <span className="text-gray-400">CABA</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t border-[var(--footer-border)] pt-6">
            <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3 text-center text-xs">
              <p>
                © {year} <span className="text-white">{brandName}</span> — Todos los derechos reservados.
              </p>
              <span className="hidden sm:block opacity-40">•</span>
              <Link href={`${legalBase}/privacidad`} className="hover:text-[var(--brand)] transition">
                Privacidad
              </Link>
              <Link href={`${legalBase}/terminos`} className="hover:text-[var(--brand)] transition">
                Términos
              </Link>
            </div>
          </div>
        </div>
        {/* /wrapper centrado */}
      </div>
    </footer>
  );
}
