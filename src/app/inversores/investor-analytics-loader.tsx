"use client";

import dynamic from "next/dynamic";
import styles from "./analytics.module.css";
import { translateInvestor, type InvestorLocale } from "@/lib/i18n/investors";

function createAnalytics(locale: InvestorLocale) {
  const t = (text: string) => translateInvestor(locale, text);
  return dynamic(() => import("./investor-analytics"), {
  ssr: false,
  loading: () => (
    <section id="metricas" className={styles.section} aria-busy="true">
      <div className={styles.container}>
        <div className={styles.heading}><div><p>{t("TRACCIÓN REAL")}</p><h2>{t("Una plataforma que")} <span>{t("ya atiende.")}</span></h2></div><span className={styles.source}>{t("Cargando indicadores de DocYa…")}</span></div>
      </div>
    </section>
  ),
});
}

const analytics = { es: createAnalytics("es"), en: createAnalytics("en") };

export default function InvestorAnalyticsLoader({ locale = "es" }: { locale?: InvestorLocale }) {
  const InvestorAnalytics = analytics[locale];
  return <InvestorAnalytics locale={locale} />;
}
