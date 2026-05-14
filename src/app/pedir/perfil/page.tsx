"use client";
import { Suspense } from "react";
import PerfilScreen from "@/components/pedir/PerfilScreen";
export default function PerfilPage() {
  return <Suspense fallback={null}><PerfilScreen /></Suspense>;
}
