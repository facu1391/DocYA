// components/layouts/FooterChrome.tsx
"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/Footer";
import FloatingCTA from "@/components/fab/FloatingCTA";
import FloatingPacienteCTA from "@/components/fab/FloatingPacienteCTA";
import ScrollToTopButton from "@/components/fab/ScrollToTopButton";

export default function FooterChrome() {
  const pathname = usePathname();

  const hideOnReferidos = pathname?.startsWith("/referidos");

  if (hideOnReferidos) return null;

  return (
    <>
      <Footer />
      <FloatingCTA />
      <FloatingPacienteCTA />
      <ScrollToTopButton />
    </>
  );
}