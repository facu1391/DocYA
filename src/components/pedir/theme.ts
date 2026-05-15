"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const LOGO_DARK = "https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png";
const LOGO_LIGHT = "https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logo_1_svfdye.png";

export function usePedirTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = mounted ? resolvedTheme !== "light" : true;

  return {
    dark,
    setTheme,
    logo: dark ? LOGO_DARK : LOGO_LIGHT,
    bg: dark ? "#0b1a22" : "#f5f7fa",
    homeBg: dark ? "#0b1a22" : "#f0f4f8",
    cardBg: dark ? "rgba(255,255,255,0.05)" : "#ffffff",
    surface: dark
      ? "linear-gradient(135deg, rgba(0,179,166,0.08) 0%, rgba(11,26,34,0.97) 60%)"
      : "linear-gradient(135deg, rgba(0,179,166,0.06) 0%, rgba(255,255,255,0.96) 60%)",
    headerBg: dark ? "rgba(11,26,34,0.95)" : "rgba(245,247,250,0.95)",
    videoChromeBg: dark ? "rgba(3,16,26,0.95)" : "rgba(245,247,250,0.95)",
    videoBarBg: dark ? "rgba(3,16,26,0.97)" : "rgba(255,255,255,0.97)",
    overlayBg: dark ? "rgba(7,27,34,0.9)" : "rgba(245,247,250,0.92)",
    border: dark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.10)",
    brandBorder: dark ? "rgba(0,179,166,0.22)" : "rgba(0,179,166,0.24)",
    text: dark ? "#e2f0f0" : "#0f172a",
    muted: dark ? "rgba(255,255,255,0.55)" : "#64748b",
    inputBg: dark ? "rgba(255,255,255,0.06)" : "#f8fafc",
    softPanel: dark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.035)",
    softPanelBorder: dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
    inactiveStep: dark ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.22)",
    inactiveStepBg: dark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.04)",
    inactiveStepBorder: dark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.10)",
    inactiveText: dark ? "rgba(255,255,255,0.25)" : "rgba(15,23,42,0.35)",
    doneText: dark ? "rgba(255,255,255,0.6)" : "rgba(15,23,42,0.58)",
    titleStart: dark ? "#e2f0f0" : "#0f172a",
  };
}
