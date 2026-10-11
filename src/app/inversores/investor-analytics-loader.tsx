"use client";

import dynamic from "next/dynamic";

const InvestorAnalytics = dynamic(() => import("./investor-analytics"), {
  ssr: false,
  loading: () => (
    <section id="metricas" className="bg-[var(--background)] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm text-text-muted">Cargando indicadores de DocYa…</p>
      </div>
    </section>
  ),
});

export default function InvestorAnalyticsLoader() {
  return <InvestorAnalytics />;
}
