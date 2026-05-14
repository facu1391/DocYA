"use client";

import { Suspense } from "react";
import PedirHome from "@/components/pedir/PedirHome";

export default function PedirPage() {
  return (
    <Suspense fallback={null}>
      <PedirHome />
    </Suspense>
  );
}
