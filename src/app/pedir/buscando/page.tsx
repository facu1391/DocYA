"use client";
import { Suspense } from "react";
import BuscandoScreen from "@/components/pedir/BuscandoScreen";
export default function BuscandoPage() {
  return <Suspense fallback={null}><BuscandoScreen /></Suspense>;
}
