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
    "md:p-0 md:rounded-none md:border-0 md:bg-transparent md:text-white/75 " +
    "inline-block rounded-full border px-3 py-1.5 text-white/85 hover:text-white " +
    "border-white/10 hover:bg-white/10 transition";

  const sectionTitleCls =
    "text-[13px] font-semibold uppercase tracking-[0.16em] text-white/85 md:text-left text-center";

  return (
    <footer
      role="contentinfo"
      className="border-t border-white/10 bg-[#07141d] text-gray-300"
    >
      <div className="container py-12 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div
            className={[
              "grid gap-8 md:gap-10",
              isPublicAudience
                ? "md:grid-cols-[1.2fr_1fr_1fr_0.9fr]"
                : "md:grid-cols-2 lg:grid-cols-4",
            ].join(" ")}
          >
            <div className="text-center md:text-left">
              <Link href="/" aria-label="Ir a la Home" className="inline-block">
                <div className="relative mx-auto h-9 w-[150px] dark:hidden md:mx-0">
                  <Image src={LOGOS.light} alt={LOGOS.alt} fill className="object-contain" />
                </div>
                <div className="relative mx-auto hidden h-9 w-[150px] dark:block md:mx-0">
                  <Image src={LOGOS.dark} alt={LOGOS.alt} fill className="object-contain" />
                </div>
              </Link>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-white/60 md:mx-0">
                {isPublicAudience ? publicCopy : proCopy}
              </p>

              <ul className="mt-5 flex items-center justify-center gap-3 md:justify-start">
                <li>
                  <a
                    href="https://www.linkedin.com/company/docya"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#0AE6C7] transition hover:border-[#0AE6C7]/40 hover:bg-white/10 hover:brightness-110"
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
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#0AE6C7] transition hover:border-[#0AE6C7]/40 hover:bg-white/10 hover:brightness-110"
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
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#0AE6C7] transition hover:border-[#0AE6C7]/40 hover:bg-white/10 hover:brightness-110"
                  >
                    <Facebook className="h-4.5 w-4.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:soporte@docya.com.ar"
                    aria-label="Email"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#0AE6C7] transition hover:border-[#0AE6C7]/40 hover:bg-white/10 hover:brightness-110"
                  >
                    <Mail className="h-4.5 w-4.5" />
                  </a>
                </li>
              </ul>
            </div>

            {!isPublicAudience && (
              <div className="border-white/10 pt-6 text-center md:border-0 md:pt-0 md:text-left border-t">
                <h4 className={sectionTitleCls}>Producto</h4>
                <ul className="mt-3 flex flex-wrap justify-center gap-2 text-sm md:block md:space-y-2">
                  <li><Link href="/ingresos" className={chipLinkCls}>Ingresos</Link></li>
                  <li><Link href="/faqs" className={chipLinkCls}>FAQs</Link></li>
                  <li><Link href="/contacto" className={chipLinkCls}>Contacto</Link></li>
                  <li><Link href="/registro" className={chipLinkCls}>Registrate</Link></li>
                </ul>
              </div>
            )}

            <div className="border-white/10 pt-6 text-center md:border-0 md:pt-0 md:text-left border-t">
              <h4 className={sectionTitleCls}>Legal</h4>
              <ul className="mt-3 flex flex-wrap justify-center gap-2 text-sm md:block md:space-y-2">
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

            <div className="border-white/10 pt-6 text-center md:border-0 md:pt-0 md:text-left border-t">
              <h4 className={sectionTitleCls}>Contacto</h4>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex justify-center gap-2 text-white/75 md:justify-start">
                  <Mail className="h-4 w-4 text-[#0AE6C7]" />
                  <a href="mailto:soporte@docya.com.ar" className="transition hover:text-[#0AE6C7]">
                    soporte@docya.com.ar
                  </a>
                </li>
                <li className="flex justify-center gap-2 text-white/75 md:justify-start">
                  <Phone className="h-4 w-4 text-[#0AE6C7]" />
                  <a
                    href="https://wa.me/5491168700607"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-[#0AE6C7]"
                  >
                    +54 9 11 6870-0607
                  </a>
                </li>
                <li className="flex justify-center gap-2 text-white/75 md:justify-start">
                  <MapPin className="h-4 w-4 text-[#0AE6C7]" />
                  <span className="text-white/60">CABA</span>
                </li>
              </ul>
            </div>

            {isPublicAudience && (
              <div className="border-white/10 flex items-center justify-center pt-6 text-center border-t md:border-0 md:pt-0">
                <div className="relative h-20 w-full max-w-[180px]">
                  <Image
                    src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1775043651/logosisa_dxtx66.png"
                    alt="Logo SISA"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 text-center text-xs text-white/55">
              <p>
                © {year} <span className="text-white">{brandName}</span> — Todos los derechos reservados.
              </p>
              <span className="hidden opacity-40 sm:block">•</span>
              <Link href={`${legalBase}/privacidad`} className="transition hover:text-[#0AE6C7]">
                Privacidad
              </Link>
              <Link href={`${legalBase}/terminos`} className="transition hover:text-[#0AE6C7]">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
