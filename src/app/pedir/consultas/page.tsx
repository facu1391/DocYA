"use client";

import { Suspense } from "react";
import ConsultasScreen from "@/components/pedir/ConsultasScreen";

export default function ConsultasPage() {
  return (
    <Suspense fallback={null}>
      <ConsultasScreen />
    </Suspense>
  );
}
