"use client";
import { Suspense } from "react";
import PagoResultadoScreen from "@/components/pedir/PagoResultadoScreen";

export default function PagoResultadoPage() {
  return (
    <Suspense fallback={null}>
      <PagoResultadoScreen />
    </Suspense>
  );
}
