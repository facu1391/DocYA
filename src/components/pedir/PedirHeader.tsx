"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { usePedirTheme } from "./theme";

type Props = {
  backHref?: string;
  badge?: ReactNode;
  dark?: boolean;
};

export default function PedirHeader({ backHref = "/pedir", badge, dark: darkOverride }: Props) {
  const theme = usePedirTheme();
  const dark = darkOverride ?? theme.dark;
  const logo = theme.logo;
  const border = "rgba(0,179,166,0.2)";
  const muted  = dark ? theme.muted : "#64748b";

  return (
    <header style={{ borderBottom: `1px solid ${border}`, background: dark ? theme.headerBg : "rgba(245,247,250,0.95)", backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50, padding: "0 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center", gap: 14 }}>
        <Link href={backHref} style={{ color: muted, display: "flex", alignItems: "center", flexShrink: 0 }}>
          <ArrowLeft size={22} />
        </Link>
        <Image src={logo} alt="DocYa" width={156} height={50} style={{ width: 156, height: "auto", maxHeight: 50, objectFit: "contain", display: "block", flexShrink: 0 }} />
        {badge && <div style={{ marginLeft: "auto" }}>{badge}</div>}
      </div>
    </header>
  );
}
