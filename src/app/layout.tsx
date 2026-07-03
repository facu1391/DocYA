// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n/context";
import AppShell from "@/components/layouts/AppShell";
import { Toaster } from "react-hot-toast";

const SITE_URL = "https://www.docya.com.ar";
const OG_IMAGE = `${SITE_URL}/og/og-docya.jpg.png`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00B3A6" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DocYa — Médico a domicilio y atención médica online",
    template: "%s | DocYa",
  },
  description:
    "Pedí un médico a domicilio, teleconsulta o enfermería desde DocYa. Profesionales verificados, atención rápida y pagos seguros.",
  keywords: [
    "médico a domicilio",
    "médico a domicilio en Argentina",
    "doctor a domicilio",
    "enfermería a domicilio",
    "atención médica en casa",
    "consulta médica online",
    "teleconsulta médica",
    "certificados médicos digitales",
    "recetas médicas",
    "salud argentina",
    "DocYa",
  ],
  applicationName: "DocYa",
  authors: [{ name: "DocYa" }],
  creator: "DocYa",
  publisher: "DocYa",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "DocYa — Médico a domicilio",
    siteName: "DocYa",
    description:
      "Pedí un médico a domicilio, teleconsulta o enfermería desde DocYa. Profesionales verificados y pagos seguros.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "DocYa — Atención médica y de enfermería a domicilio",
      },
    ],
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocYa — Médico a domicilio",
    description: "Pedí un médico a domicilio, teleconsulta o enfermería desde DocYa. Profesionales verificados y pagos seguros.",
    images: [OG_IMAGE],
    site: "@docya_ar",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/manifest-icon-192.maskable.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/manifest-icon-512.maskable.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-icon-180.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  verification: { google: "IA9D3VR5YU5gYbxeUKHA1nBf7LOCp95uArWq6LBb9Sw" },
  category: "healthcare",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "DocYa",
    url: SITE_URL,
    logo: `${SITE_URL}/logo_puclic-light.png`,
    areaServed: {
      "@type": "Country",
      name: "Argentina",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DocYa",
    url: SITE_URL,
  };

  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        {/* Smart App Banner iOS — muestra "Abrir en DocYa" cuando se abre desde Instagram/Safari */}
        <meta name="apple-itunes-app" content="app-id=6753604975, app-argument=https://www.docya.com.ar/pedir" />
      </head>
      <body className={`${poppins.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <I18nProvider>
            <AppShell>{children}</AppShell>
            <Toaster position="top-right" />
          </I18nProvider>
        </ThemeProvider>

        <Script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </body>
    </html>
  );
}
