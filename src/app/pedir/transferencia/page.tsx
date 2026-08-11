"use client";

import { Suspense } from "react";
import TransferenciaScreen from "@/components/pedir/TransferenciaScreen";

export default function TransferenciaPage() {
  return <Suspense fallback={null}><TransferenciaScreen /></Suspense>;
}
