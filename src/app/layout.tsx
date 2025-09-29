
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"; // 👈 importás el provider
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocYa Pro — Sumate como profesional",
  description: "Conectá con pacientes a domicilio. Elegí horarios y zonas. Ingresos semanales.",
  openGraph: {
    title: "DocYa Pro — Sumate como profesional",
    description: "Conectá con pacientes a domicilio. Elegí horarios y zonas.",
    images: ["/og.png"], // poné un og en /public/og.png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
           <Navbar />
          {children}
           <Footer />
        <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}