// src/app/software/layout.tsx
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import SoftwareNav from "@/components/software-landing/SoftwareNav";
import SoftwareFooter from "@/components/software-landing/SoftwareFooter";
import { SOFTWARE_THEME_VARS } from "@/components/software-landing/shared/variants";

export const metadata: Metadata = {
  title: {
    default: "Docya Software | Desarrollo de aplicaciones para Atlassian",
    template: "%s | Docya Software",
  },
};

export default function SoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-sans"
      style={SOFTWARE_THEME_VARS as CSSProperties}
    >
      <SoftwareNav />
      <main className="bg-[var(--sw-bg)]">{children}</main>
      <SoftwareFooter />
    </div>
  );
}
