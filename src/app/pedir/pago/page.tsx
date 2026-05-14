"use client";
import { Suspense } from "react";
import PagoScreen from "@/components/pedir/PagoScreen";
export default function PagoPage() {
  return <Suspense fallback={null}><PagoScreen /></Suspense>;
}
