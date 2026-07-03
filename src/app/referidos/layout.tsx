// src/app/referidos/layout.tsx
import type { Metadata } from "next";
import ScrollToTopButton from "@/components/fab/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Partner DocYa | DocYa",
  description:
    "Sumate al programa Partner DocYa y generá ingresos compartiendo salud.",
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