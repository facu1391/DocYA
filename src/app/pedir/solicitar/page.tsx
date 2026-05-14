"use client";

import { Suspense } from "react";
import SolicitarScreen from "@/components/pedir/SolicitarScreen";

export default function SolicitarPage() {
  return (
    <Suspense fallback={null}>
      <SolicitarScreen />
    </Suspense>
  );
}
