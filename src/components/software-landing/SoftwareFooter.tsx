// src/components/software-landing/SoftwareFooter.tsx
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import {
  CONTACT_EMAIL,
  NAV_LINKS,
  SOFTWARE_LOGO_PATH,
  SOFTWARE_PATH,
} from "./shared/variants";

const SERVICE_LINKS = [
  { label: "Aplicaciones personalizadas", href: "#software-servicios" },
  { label: "Integraciones empresariales", href: "#software-servicios" },
  { label: "Dashboards y SLA Analytics", href: "#software-servicios" },
  { label: "Automatización de procesos", href: "#software-servicios" },
  { label: "Inteligencia artificial", href: "#software-servicios" },
  { label: "Soporte y mantenimiento", href: "#software-servicios" },
];

export default function SoftwareFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--sw-border)] bg-[var(--sw-bg2)]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[var(--sw-teal-30)] bg-[var(--sw-bg)] shadow-[0_0_24px_var(--sw-teal-15)]">
                <Image
                  src={SOFTWARE_LOGO_PATH}
                  alt="Docya Software logo"
                  width={48}
                  height={48}
                  className="h-full w-full scale-110 object-contain"
                />
              </div>
              <span className="text-lg font-semibold text-[var(--sw-text)]">Docya Software</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--sw-subtle)]">
              Desarrollo de aplicaciones, integraciones y automatizaciones
              personalizadas para Jira, Jira Service Management y Confluence.
              También trabajamos como equipo técnico white-label para Atlassian
              Solution Partners.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/docya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Docya"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--sw-border)] text-[var(--sw-subtle)] transition-colors hover:border-[var(--sw-teal-30)] hover:text-[var(--sw-teal)]"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-sm text-[var(--sw-subtle)] transition-colors hover:text-[var(--sw-teal)]"
              >
                <Mail size={16} />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--sw-text)]">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--sw-subtle)] transition-colors hover:text-[var(--sw-teal)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--sw-text)]">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--sw-subtle)] transition-colors hover:text-[var(--sw-teal)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--sw-border)] pt-8 text-xs text-[var(--sw-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Docya Software. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={`${SOFTWARE_PATH}/aviso-legal`} className="hover:text-[var(--sw-teal)]">
              Aviso legal
            </Link>
            <Link href={`${SOFTWARE_PATH}/politica-de-privacidad`} className="hover:text-[var(--sw-teal)]">
              Política de privacidad
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-[var(--sw-subtle)]/70">
          Atlassian, Jira, Jira Service Management y Confluence son marcas
          comerciales de Atlassian y no implican afiliación ni respaldo oficial.
        </p>
      </div>
    </footer>
  );
}
