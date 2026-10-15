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
          <h2 id="scale-title">{t("Una plataforma diseñada para crecer", "A platform designed to grow")} <span>{t("sin límites geográficos.", "across geographies.")}</span></h2>
          <p className={styles.description}>{t("Una red de profesionales independientes y tecnología digital permite expandir DocYa sin construir sanatorios ni consultorios propios. Cada nuevo mercado requiere demanda, médicos disponibles, operación local y cumplimiento regulatorio.", "A network of independent professionals and digital technology enables DocYa to expand without building its own hospitals or clinics. Each new market requires demand, available physicians, local operations and regulatory compliance.")}</p>
        </ScrollReveal>
        <div className={styles.scaleGrid}>
          <ScrollReveal y={16}><article className={`${styles.card} ${styles.reference}`}>
            <Building2 size={24} aria-hidden="true" />
            <p className={styles.kicker}>{t("REFERENCIA PRELIMINAR", "PRELIMINARY REFERENCE")}</p>
            <strong>150–200</strong>
            <h3>{t("Un sanatorio reconocido de CABA", "An established hospital in Buenos Aires City")}</h3>
            <p>{t("Consultas diarias de clínica médica. Dato aportado por el equipo, pendiente de validación.", "Daily general medicine consultations. Team-provided figure, pending validation.")}</p>
          </article></ScrollReveal>
          {[300, 500, 1000].map((daily, i) => <ScrollReveal key={daily} y={16} delay={(i + 1) * .05}><article className={styles.card}>
            <Network size={24} aria-hidden="true" />
            <p className={styles.kicker}>{t("ESCENARIO HIPOTÉTICO · DOCYA", "HYPOTHETICAL SCENARIO · DOCYA")}</p>
            <strong>{daily.toLocaleString(locale === "en" ? "en-US" : "es-AR")}</strong>
            <h3>{t("Consultas diarias a escala nacional", "Daily consultations at national scale")}</h3>
            <p>{t("Potencial ilustrativo de una red distribuida. No es el volumen actual ni una meta garantizada.", "Illustrative potential of a distributed network. Not current volume or a guaranteed target.")}</p>
          </article></ScrollReveal>)}
        </div>
        <p className={styles.note}>{t("Referencia contextual, no una comparación equivalente entre modelos asistenciales. Crecer exige ampliar la demanda y la disponibilidad de médicos, manteniendo la calidad asistencial y los requisitos de cada jurisdicción.", "Contextual reference, not an equivalent comparison between healthcare delivery models. Growth requires expanding demand and physician availability while maintaining quality of care and meeting each jurisdiction’s requirements.")}</p>
      </div>
    </section>

    <InvestorRevenueSimulator locale={locale} />

  </>;
}
