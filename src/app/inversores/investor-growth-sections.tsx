import { Building2, Network } from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import type { InvestorLocale } from "@/lib/i18n/investors";
import InvestorRevenueSimulator from "./investor-revenue-simulator";
import base from "./investors.module.css";
import styles from "./growth.module.css";

export default function InvestorGrowthSections({ locale }: { locale: InvestorLocale }) {
  const t = (es: string, en: string) => locale === "en" ? en : es;

  return <>
    <section id="potencial-escala" className={styles.section} aria-labelledby="scale-title">
      <div className={base.container}>
        <ScrollReveal y={16} className={base.sectionIntro}>
          <p className={base.eyebrow}>{t("POTENCIAL DE ESCALA", "SCALING POTENTIAL")}</p>
          <h2 id="scale-title">{t("Si una sola institución atiende cientos de pacientes por día,", "If a single institution cares for hundreds of patients a day,")} <span>{t("imaginá el potencial de una red médica nacional.", "imagine the potential of a national medical network.")}</span></h2>
          <p className={styles.description}>{t("La demanda de atención médica ya existe. DocYa busca conectar pacientes y profesionales en todo el país, sin necesidad de construir sanatorios ni consultorios propios.", "Demand for medical care already exists. DocYa aims to connect patients and professionals across the country without building its own hospitals or clinics.")}</p>
        </ScrollReveal>
        <div className={styles.scaleGrid}>
          <ScrollReveal y={16}><article className={`${styles.card} ${styles.reference}`}>
            <Building2 size={24} aria-hidden="true" />
            <p className={styles.kicker}>{t("REFERENCIA DE DEMANDA", "DEMAND REFERENCE")}</p>
            <h3>{t("Cientos de consultas diarias", "Hundreds of daily consultations")}</h3>
            <p>{t("Una sola institución médica de CABA puede concentrar este volumen de atención.", "A single medical institution in Buenos Aires City can concentrate this volume of care.")}</p>
          </article></ScrollReveal>
          {[300, 500, 1000].map((daily, i) => <ScrollReveal key={daily} y={16} delay={(i + 1) * .05}><article className={styles.card}>
            <Network size={24} aria-hidden="true" />
            <p className={styles.kicker}>{t("ESCENARIO NACIONAL HIPOTÉTICO", "HYPOTHETICAL NATIONAL SCENARIO")}</p>
            <strong>{daily.toLocaleString(locale === "en" ? "en-US" : "es-AR")}</strong>
            <p className={styles.dailyLabel}>{t("consultas por día", "consultations per day")}</p>
            <div className={styles.monthlyVolume}><strong>{(daily * 30).toLocaleString(locale === "en" ? "en-US" : "es-AR")}</strong><span>{t("consultas por mes", "consultations per month")}</span></div>
          </article></ScrollReveal>)}
        </div>
        <p className={styles.note}>{t("Escenarios hipotéticos de crecimiento nacional. Las consultas hospitalarias no son directamente equivalentes a la demanda capturable por DocYa.", "Hypothetical national growth scenarios. Hospital consultations are not directly equivalent to demand DocYa can capture.")}</p>
      </div>
    </section>

    <InvestorRevenueSimulator locale={locale} />

  </>;
}
