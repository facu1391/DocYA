"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const linkCls = (href: string) =>
    `hover:text-[var(--primary)] ${
      pathname === href ? "text-[var(--primary)]" : "text-white"
    }`;

  return (
    <header className="w-full border-b bg-[var(--nav-bg)] border-[var(--nav-border)]">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo light/dark */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-[150px] dark:hidden">
            <Image src="/logo-pro-dark.png" alt="DocYa Pro" fill className="object-contain" priority />
          </div>
          <div className="relative h-10 w-[150px] hidden dark:block">
            <Image src="/logo-pro-light.png" alt="DocYa Pro" fill className="object-contain" priority />
          </div>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {/* Anclas internas que siguen en la home */}
          <Link href="/#beneficios" className="text-white hover:text-[var(--primary)]">
            Beneficios
          </Link>
          <Link href="/#como-funciona" className="text-white hover:text-[var(--primary)]">
            Cómo funciona
          </Link>

          {/* Páginas nuevas */}
          <Link href="/calculadora" className={linkCls("/calculadora")}>
            Calculadora
          </Link>
          <Link href="/faqs" className={linkCls("/faqs")}>
            FAQs
          </Link>

          <Link href="/registro" className="text-white hover:text-[var(--primary)]">
            Registrate
          </Link>

          {/* Toggle modo oscuro/claro */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white hover:bg-white/10"
            aria-label="Cambiar tema"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
