
// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocYa Pro — Sumate como profesional",
  description: "Conectá con pacientes a domicilio. Elegí horarios y zonas. Ingresos semanales.",
  openGraph: {
    title: "DocYa Pro — Sumate como profesional",
    description: "Conectá con pacientes a domicilio. Elegí horarios y zonas.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />

          {/* 👇 el wrapper principal ocupa todo y evita huecos antes del footer */}
          <main className="flex-1 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)] overflow-x-hidden">
            {children}
          </main>

          <Footer />
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
