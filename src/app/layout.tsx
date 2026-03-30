// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import HeaderChrome from "@/components/layouts/HeaderChrome";
import FooterChrome from "@/components/layouts/FooterChrome";
import { Toaster } from "react-hot-toast";

const SITE_URL = "https://www.docya.com.ar";
const OG_IMAGE = `${SITE_URL}/og/og-docya.jpg`;

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
    default: "DocYa — Atención médica y de enfermería a domicilio",
    template: "%s | DocYa",
  },
  description:
    "Atención médica y de enfermería a domicilio en todo el país. Profesionales verificados, atención 24/7 y pagos seguros.",
  keywords: [
    "médico a domicilio",
    "enfermería a domicilio",
    "atención médica en casa",
    "consulta médica online",
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
    title: "DocYa — Atención médica a domicilio",
    siteName: "DocYa",
    description:
      "Pedí un médico o enfermero/a a tu hogar, sin esperas. Profesionales verificados y pagos seguros.",
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
    "@type": "Organization",
    name: "DocYa",
    url: SITE_URL,
    logo: `${SITE_URL}/logo_puclic-light.png`,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DocYa",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/buscar?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="es-AR" suppressHydrationWarning>
      <body className={`${poppins.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <HeaderChrome />

          <main className="flex-1 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)] overflow-x-hidden">
            {children}
          </main>

          <FooterChrome />
          <Toaster position="top-right" />
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