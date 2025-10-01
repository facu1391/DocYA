
// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import FloatingCTA from "@/components/fab/FloatingCTA";
import { Toaster } from "react-hot-toast";

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
  title: "DocYa Pro — Sumate como profesional",
  description: "Conectá con pacientes a domicilio. Elegí horarios y zonas. Ingresos semanales.",
  openGraph: {
    title: "DocYa Pro — Sumate como profesional",
    description: "Conectá con pacientes a domicilio. Elegí horarios y zonas.",
    images: ["/logo-pro-light.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* 👇 activamos la variable de Poppins y Geist Mono + font-sans */}
      <body className={`${poppins.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)] overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <FloatingCTA />
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
