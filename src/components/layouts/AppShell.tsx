"use client";

import { usePathname } from "next/navigation";
import HeaderChrome from "@/components/layouts/HeaderChrome";
import FooterChrome from "@/components/layouts/FooterChrome";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRecetario = pathname?.startsWith("/recetario");
  const isPedir     = pathname?.startsWith("/pedir");
  const isClinic    = pathname?.startsWith("/clinic");

  if (isRecetario || isPedir || isClinic) {
    return <>{children}</>;
  }

  return (
    <>
      <HeaderChrome />
      <main className="flex-1 bg-[var(--hero-bg)] dark:bg-[var(--hero-bg-dark)] overflow-x-hidden">
        {children}
      </main>
      <FooterChrome />
    </>
  );
}
