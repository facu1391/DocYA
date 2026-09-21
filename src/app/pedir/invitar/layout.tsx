import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true, nocache: true },
};

export default function InvitarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
