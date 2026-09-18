"use client";

import { Suspense } from "react";
import QrPaymentScreen from "@/components/pedir/QrPaymentScreen";

export default function QrPaymentPage() {
  return <Suspense fallback={null}><QrPaymentScreen /></Suspense>;
}
