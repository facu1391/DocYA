"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const isPublicLanding = pathname === "/";

  const publicCopy =
    "Atención médica y de enfermería a domicilio. Profesionales verificados, tiempos rápidos y pagos seguros.";
  const proCopy =
    "Conectamos profesionales de la salud con pacientes a domicilio. Flexibilidad, herramientas digitales y pagos claros.";

  const LOGOS = isPublicLanding
    ? { light: "/logo_puclic-dark.png", dark: "/logo_puclic-light.png", alt: "DocYa" }
    : { light: "/logo-pro-dark.png", dark: "/logo-pro-light.png", alt: "DocYa Pro" };

  const brandName = isPublicLanding ? "DocYa" : "DocYa Pro";

  return (
    <footer role="contentinfo" className="border-t bg-[var(--footer-bg)] border-[var(--footer-border)] text-gray-300">
      <div className="container py-12">
        <div className={`grid gap-10 ${isPublicLanding ? "md:grid-cols-[1.2fr_1fr_1fr]" : "md:grid-cols-2 lg:grid-cols-4"}`}>
          {/* Marca + redes */}
          <div>
            <Link href="/" aria-label="Ir a la Home" className="inline-block">
              {/* visible en modo claro */}
              <div className="relative h-9 w-[150px] dark:hidden">
                <Image src={LOGOS.light} alt={LOGOS.alt} fill className="object-contain" />
              </div>
              {/* visible en modo oscuro */}
              <div className="relative h-9 w-[150px] hidden dark:block">
                <Image src={LOGOS.dark} alt={LOGOS.alt} fill className="object-contain" />
              </div>
            </Link>

            <p className="mt-3 text-sm text-gray-400 max-w-sm">
              {isPublicLanding ? publicCopy : proCopy}
            </p>

            {/* Social */}
            <ul className="mt-4 flex items-center gap-3">
              <li>
                <a
                  href="https://www.linkedin.com/company/docya"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] hover:brightness-110 transition"
                >
                  <Linkedin className="h-4.5 w-4.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/docya"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] hover:brightness-110 transition"
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] hover:brightness-110 transition"
                >
                  <Facebook className="h-4.5 w-4.5" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:soporte@docya.com.ar"
                  aria-label="Email"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--brand)_45%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)] hover:brightness-110 transition"
                >
                  <Mail className="h-4.5 w-4.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Producto (solo NO landing) */}
          {!isPublicLanding && (
            <div>
              <h4 className="text-sm font-semibold text-white">Producto</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/ingresos" className="hover:text-[var(--brand)] transition">Ingresos</Link></li>
                <li><Link href="/faqs" className="hover:text-[var(--brand)] transition">FAQs</Link></li>
                <li><Link href="/contacto" className="hover:text-[var(--brand)] transition">Contacto</Link></li>
                <li><Link href="/registro" className="hover:text-[var(--brand)] transition">Registrate</Link></li>
              </ul>
            </div>
          )}

          {/* Legal (siempre) */}
          <div>
            <h4 className="text-sm font-semibold text-white">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/legal/terminos" className="hover:text-[var(--brand)] transition">Términos y Condiciones</Link></li>
              <li><Link href="/legal/privacidad" className="hover:text-[var(--brand)] transition">Política de Privacidad</Link></li>
            </ul>
          </div>

          {/* Contacto (siempre) */}
          <div>
            <h4 className="text-sm font-semibold text-white">Contacto</h4>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-[var(--brand)]" />
                <a href="mailto:soporte@docya.com.ar" className="hover:text-[var(--brand)] transition">soporte@docya.com.ar</a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-[var(--brand)]" />
                <a href="tel:+5491112345678" className="hover:text-[var(--brand)] transition">+54 9 11 1234-5678</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-[var(--brand)]" />
                <span className="text-gray-400">CABA — Palermo / Belgrano</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-[var(--footer-border)] pt-6">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-4 text-center">
            <p className="text-xs">
              © {year} <span className="text-white">{brandName}</span> — Todos los derechos reservados.
            </p>
            <span className="opacity-40 hidden sm:block">•</span>
            <div className="flex items-center gap-4 text-xs">
              <Link href="/legal/privacidad" className="hover:text-[var(--brand)] transition">Privacidad</Link>
              <Link href="/legal/terminos" className="hover:text-[var(--brand)] transition">Términos</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
