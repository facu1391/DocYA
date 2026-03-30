// src/app/referidos/layout.tsx
import type { Metadata } from "next";
import ScrollToTopButton from "@/components/fab/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Referidos | DocYa",
  description:
    "Sumate al programa de referidos de DocYa y ganá dinero compartiendo salud.",
};

export default function ReferidosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070d14] text-white">
      {children}
      <ScrollToTopButton />
    </div>
  );
}