"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  backHref?: string;
  badge?: ReactNode;
  dark?: boolean;
};

export default function PedirHeader({ backHref = "/pedir", badge, dark = true }: Props) {
  const logo = dark
    ? "https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png"
    : "https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logo_1_svfdye.png";
  const border = "rgba(0,179,166,0.2)";
  const muted  = "rgba(255,255,255,0.55)";

  return (
    <header style={{ borderBottom: `1px solid ${border}`, background: dark ? "rgba(11,26,34,0.95)" : "rgba(240,244,248,0.95)", backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50, padding: "0 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center", gap: 14 }}>
        <Link href={backHref} style={{ color: muted, display: "flex", alignItems: "center", flexShrink: 0 }}>
          <ArrowLeft size={22} />
        </Link>
        <Image src={logo} alt="DocYa" width={80} height={26} style={{ height: 26, width: "auto" }} />
        {badge && <div style={{ marginLeft: "auto" }}>{badge}</div>}
      </div>
    </header>
  );
}
