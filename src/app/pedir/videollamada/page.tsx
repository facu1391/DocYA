"use client";
import { Suspense } from "react";
import VideoLlamadaScreen from "@/components/pedir/VideoLlamadaScreen";
export default function VideoLlamadaPage() {
  return <Suspense fallback={null}><VideoLlamadaScreen /></Suspense>;
}
