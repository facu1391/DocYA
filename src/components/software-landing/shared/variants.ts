// src/components/software-landing/shared/variants.ts
// Constantes compartidas por la landing de Docya Software (docya.com.ar/software).
// Paleta propia, independiente de la marca DocYa (--brand) para diferenciar
// el producto B2B de desarrollo del producto de salud al paciente.

export const SITE_URL = "https://www.docya.com.ar";
export const SOFTWARE_PATH = "/software";

// El isotipo de navegación vive dentro del proyecto para que siempre conserve
// su transparencia, recorte y colores, sin depender de transformaciones
// externas de Cloudinary.
export const SOFTWARE_LOGO_PATH = "/software/docya-software-mark.png";
export const SOFTWARE_LOGO = `${SITE_URL}${SOFTWARE_LOGO_PATH}`;

export const CONTACT_EMAIL = "soporte@docya.com.ar";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Inicio", href: "#software-inicio" },
  { label: "Servicios", href: "#software-servicios" },
  { label: "Soluciones", href: "#software-soluciones" },
  { label: "Para Partners", href: "#software-partners" },
  { label: "Proceso", href: "#software-proceso" },
  { label: "Contacto", href: "#software-contacto" },
];

export const EASE_OUT: [number, number, number, number] = [0.5, 0, 0, 1];

// Design tokens exclusivos de /software. Se inyectan como CSS custom
// properties en el wrapper de layout.tsx y todos los componentes de esta
// carpeta los consumen via Tailwind arbitrary values, p.ej. bg-[var(--sw-bg)].
// Esto evita tocar los tokens globales (--brand, --hero-bg, etc.) usados por
// el resto del sitio.
export const SOFTWARE_THEME_VARS: Record<string, string> = {
  "--sw-bg": "#07111F",
  "--sw-bg2": "#0D1B2A",
  "--sw-blue": "#137CBD",
  "--sw-teal": "#00B8D9",
  "--sw-deep": "#0B2B5B",
  "--sw-text": "#F8FAFC",
  "--sw-subtle": "#94A3B8",
  "--sw-border": "rgba(248,250,252,0.1)",
  "--sw-border-strong": "rgba(248,250,252,0.2)",
  "--sw-teal-10": "rgba(0,184,217,0.1)",
  "--sw-teal-15": "rgba(0,184,217,0.15)",
  "--sw-teal-30": "rgba(0,184,217,0.3)",
  "--sw-blue-10": "rgba(19,124,189,0.1)",
};
