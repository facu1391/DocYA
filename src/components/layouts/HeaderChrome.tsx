// components/layouts/HeaderChrome.tsx
"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layouts/Navbar";

export default function HeaderChrome() {
  const pathname = usePathname();

  const hideOnReferidos = pathname?.startsWith("/referidos");

  if (hideOnReferidos) return null;

  return (
    <Suspense fallback={null}>
      <Navbar />
    </Suspense>
  );
}