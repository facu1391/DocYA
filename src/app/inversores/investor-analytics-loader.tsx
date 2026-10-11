"use client";

import dynamic from "next/dynamic";
import styles from "./analytics.module.css";

const InvestorAnalytics = dynamic(() => import("./investor-analytics"), {
  ssr: false,
  loading: () => (
    <section id="metricas" className={styles.section} aria-busy="true">
      <div className={styles.container}>
        <div className={styles.heading}><div><p>TRACCIÓN REAL</p><h2>Una plataforma que <span>ya atiende.</span></h2></div><span className={styles.source}>Cargando indicadores de DocYa…</span></div>
      </div>
    </section>
  ),
});

export default function InvestorAnalyticsLoader() {
  return <InvestorAnalytics />;
}
