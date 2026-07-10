// src/components/clinic-landing/ClinicFooter.tsx
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { ANCHORS, CLINIC_LOGO, CTA_DEMO_HREF } from "./shared/variants";

const PRODUCT_LINKS = [
  { label: "Cómo funciona", href: `#${ANCHORS.comoFunciona}` },
  { label: "Funcionalidades", href: `#${ANCHORS.funcionalidades}` },
];

const COMPANY_LINKS = [
  { label: "Contacto", href: "/contacto" },
  { label: "DocYa", href: "/" },
];

const socialIconCls =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#0AE6C7] transition hover:border-[#0AE6C7]/40 hover:bg-white/10";

export default function ClinicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="footer-surface">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-start">
          <div>
            <Link href="/clinic" className="inline-flex items-center" aria-label="Ir a DocYa Clinic">
              <Image
                src={CLINIC_LOGO}
                alt="DocYa Clinic"
                width={132}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              La plataforma inteligente para consultorios y clínicas.
            </p>
            <ul className="mt-5 flex items-center gap-3">
              <li>
                <a
                  href="https://www.linkedin.com/company/docya"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={socialIconCls}
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
                  className={socialIconCls}
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
                  className={socialIconCls}
                >
                  <Facebook className="h-4.5 w-4.5" />
                </a>
              </li>
              <li>
                <a href="mailto:soporte@docya.com.ar" aria-label="Email" className={socialIconCls}>
                  <Mail className="h-4.5 w-4.5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/85">Producto</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/70 transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/85">Empresa</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={CTA_DEMO_HREF} className="text-white/70 transition hover:text-white">
                  Solicitar demo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row">
          <p>© {year} DocYa. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/legal/pro/privacidad" className="transition hover:text-[#0AE6C7]">
              Privacidad
            </Link>
            <Link href="/legal/pro/terminos" className="transition hover:text-[#0AE6C7]">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
