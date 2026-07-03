"use client";
import { Suspense } from "react";
import FiltroScreen from "@/components/pedir/FiltroScreen";
export default function FiltroPage() {
  return <Suspense fallback={null}><FiltroScreen /></Suspense>;
}
