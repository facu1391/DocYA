"use client";

import { useId, useState } from "react";
import { TrendingUp } from "lucide-react";
import type { InvestorLocale } from "@/lib/i18n/investors";
import { calculateInvestorScenario, investorSimulation as config } from "./growth-config";
import base from "./investors.module.css";
import styles from "./growth.module.css";

export default function InvestorRevenueSimulator({ locale }: { locale: InvestorLocale }) {
  const t = (es: string, en: string) => locale === "en" ? en : es;
  const id = useId();
  const [daily, setDaily] = useState<number>(config.initialDaily);
  const [modality, setModality] = useState<string>(config.modalities[0].id);
  const selected = config.modalities.find(item => item.id === modality) ?? config.modalities[0];
  const result = calculateInvestorScenario(daily, selected.rate);
  const number = (value: number) => value.toLocaleString(locale === "en" ? "en-US" : "es-AR");
  const money = (value: number) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
  const points = Array.from({ length: (config.maxDaily - config.minDaily) / config.step + 1 }, (_, i) => {
    const volume = config.minDaily + i * config.step;
    return { x: 30 + (volume - config.minDaily) / (config.maxDaily - config.minDaily) * 540, y: 200 - volume / config.maxDaily * 170 };
  });
  const active = points[(daily - config.minDaily) / config.step];
  const metrics = [
    [t("Consultas diarias", "Daily consultations"), number(daily)],
    [t("Consultas mensuales", "Monthly consultations"), number(result.monthly)],
    [t("Volumen bruto de operaciones (GMV)", "Gross merchandise volume (GMV)"), money(result.gmv)],
    [t("Comisiones brutas de DocYa · 20%", "DocYa gross commissions · 20%"), money(result.commission)],
    [t("Honorarios profesionales · 80%", "Professional fees · 80%"), money(result.professionalFees)],
  ];

  return <section id="simulador-inversion" className={`${styles.section} ${styles.simulatorSection}`} aria-labelledby={`${id}-title`}>
    <div className={base.container}>
      <div className={base.sectionIntro}><p className={base.eyebrow}>{t("ESCENARIOS, NO PROMESAS", "SCENARIOS, NOT PROMISES")}</p><h2 id={`${id}-title`}>{t("Explorá el potencial económico", "Explore the economic potential")} <span>{t("de DocYa.", "of DocYa.")}</span></h2><p className={styles.description}>{t("Elegí una modalidad y un volumen hipotético. El cálculo supone la misma tarifa para todas las consultas durante 30 días; no representa la mezcla real de servicios.", "Choose a modality and hypothetical volume. Calculations assume the same rate for all consultations over 30 days; they do not represent the actual service mix.")}</p></div>
      <div className={styles.simulator}>
        <div className={styles.controls}>
          <label htmlFor={`${id}-modality`}>{t("Modalidad", "Modality")}</label>
          <select id={`${id}-modality`} value={modality} onChange={e => setModality(e.target.value)}>{config.modalities.map(item => <option key={item.id} value={item.id}>{item[locale]}</option>)}</select>
          <p className={styles.note}>{t("Tarifa de referencia por consulta:", "Reference rate per consultation:")} <strong>{money(selected.rate)}</strong> ARS</p>
          <div className={styles.rangeLabel}><label htmlFor={`${id}-volume`}>{t("Consultas diarias", "Daily consultations")}</label><output htmlFor={`${id}-volume`}>{number(daily)}</output></div>
          <input id={`${id}-volume`} type="range" min={config.minDaily} max={config.maxDaily} step={config.step} value={daily} onChange={e => setDaily(Number(e.target.value))} aria-describedby={`${id}-assumptions`} />
          <div className={styles.rangeEnds}><span>{number(config.minDaily)}</span><span>{number(config.maxDaily)}</span></div>
          <p id={`${id}-assumptions`} className={styles.note}>{t("30 días · 20% comisión DocYa · 80% honorarios profesionales. Importes en pesos argentinos.", "30 days · 20% DocYa commission · 80% professional fees. Amounts in Argentine pesos.")}</p>
          <div className={styles.chart}>
            <p><TrendingUp size={18} aria-hidden="true" />{t("Comisiones mensuales según volumen", "Monthly commissions by volume")}</p>
            <svg viewBox="0 0 600 250" role="img" aria-labelledby={`${id}-chart-title ${id}-chart-desc`}>
              <title id={`${id}-chart-title`}>{t("Relación ilustrativa entre consultas e ingresos por comisiones", "Illustrative relationship between consultations and commission revenue")}</title>
              <desc id={`${id}-chart-desc`}>{t("Con la tarifa seleccionada,", "At the selected rate,")} {number(daily)} {t("consultas diarias generan", "daily consultations generate")} {money(result.commission)} {t("de comisiones brutas mensuales.", "in monthly gross commissions.")}</desc>
              {[30, 115, 200].map(y => <line key={y} x1="30" x2="570" y1={y} y2={y} stroke="currentColor" opacity=".15" />)}
              <polyline points={points.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#36d6c2" strokeWidth="3" />
              <line x1={active.x} x2={active.x} y1={active.y} y2="200" stroke="#36d6c2" strokeDasharray="4 5" opacity=".6" />
              <circle cx={active.x} cy={active.y} r="6" fill="#36d6c2" stroke="#071b25" strokeWidth="2" />
              <text x="30" y="225" fill="currentColor" fontSize="13">{number(config.minDaily)}</text><text x="570" y="225" textAnchor="end" fill="currentColor" fontSize="13">{number(config.maxDaily)}</text>
            </svg>
            <div className={styles.chartValue}>{money(calculateInvestorScenario(config.minDaily, selected.rate).commission)} → {money(calculateInvestorScenario(config.maxDaily, selected.rate).commission)}</div>
            <p className={styles.note}>{t("Escala lineal con tarifa fija; no es una evolución histórica ni una previsión de crecimiento.", "Linear scale at a fixed rate; not historical activity or a growth forecast.")}</p>
          </div>
        </div>
        <div className={styles.results}>
          <p className={styles.kicker}>{t("ESCENARIO MENSUAL · 30 DÍAS", "MONTHLY SCENARIO · 30 DAYS")}</p>
          <dl>{metrics.map(([label, value], i) => <div key={label} className={i === 3 ? styles.commission : undefined}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <p role="status" className={styles.note}>{t("Escenario seleccionado:", "Selected scenario:")} {number(result.monthly)} {t("consultas al mes y", "monthly consultations and")} {money(result.commission)} {t("en comisiones brutas para DocYa.", "in gross commissions for DocYa.")}</p>
        </div>
      </div>
      <p className={styles.note}>{t("Simulación ilustrativa basada en tarifas de referencia. Los resultados no constituyen proyecciones garantizadas. Los ingresos de DocYa se muestran antes de impuestos, comisiones de procesamiento, marketing y otros costos operativos.", "Illustrative simulation based on reference rates. Results are not guaranteed projections. DocYa revenue is shown before taxes, processing fees, marketing and other operating costs.")}</p>
    </div>
  </section>;
}
