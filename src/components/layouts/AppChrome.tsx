// src/components/layouts/AppChrome.tsx
"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import FloatingCTA from "@/components/fab/FloatingCTA";

import ScrollToTopButton from "@/components/fab/ScrollToTopButton";

export default function AppChrome() {
  const pathname = usePathname();

  const hideChrome =
    pathname === "/referidos/login" ||
    pathname.startsWith("/referidos/panel") ||
    pathname.startsWith("/referidos/mis-referidos") ||
    pathname.startsWith("/referidos/cobros") ||
    pathname.startsWith("/referidos/link");

  if (hideChrome) return null;

  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <Footer />
      <FloatingCTA />
      <ScrollToTopButton />
    </>
  );
}