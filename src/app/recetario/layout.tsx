import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300","400","500","600","700","800"] });

export const metadata: Metadata = {
  title: "DocYa Recetas",
  description: "Sistema de recetas mÃƒÂ©dicas digitales",
};

export default function RecetarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className={outfit.className}>{children}</section>
  );
}
