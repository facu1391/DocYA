import Link from "next/link";
import { Globe2 } from "lucide-react";
import type { InvestorLocale } from "@/lib/i18n/investors";
import styles from "./investors.module.css";

export default function InvestorLanguageSwitch({ locale }: { locale: InvestorLocale }) {
  const english = locale === "en";
  return (
    <Link href={english ? "/inversores" : "/inversores?lang=en"} scroll={false} className={styles.languageSwitch} hrefLang={english ? "es" : "en"} aria-label={english ? "Switch to Spanish" : "Cambiar a inglés"}>
      <Globe2 size={16} aria-hidden="true" />
      <span lang={english ? "es" : "en"}>{english ? "Español" : "English"}</span>
    </Link>
  );
}
