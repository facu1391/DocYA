import type { Metadata } from "next";
import ManualClient from "@/components/manual/ManualClient";

export const metadata: Metadata = {
  title: "Manual de la App | DocYa Pro",
  alternates: { canonical: "/manual" },
  description:
    "Guía paso a paso para profesionales: disponibilidad, recepción de consultas, navegación, inicio/finalización y cierre de jornada.",
};

export default function ManualPage() {
  return <ManualClient />;
}
