import { BadgeDollarSign, Clock3, MapPin, UsersRound } from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import type { InvestorLocale } from "@/lib/i18n/investors";
import styles from "./investors.module.css";

export default function InvestorMedicalNetwork({ locale }: { locale: InvestorLocale }) {
  const t = (es: string, en: string) => locale === "en" ? en : es;
  const benefits = [
    { Icon: UsersRound, title: t("Red flexible de profesionales", "A flexible professional network"), text: t("Profesionales independientes que forman parte de una red distribuida de atención.", "Independent professionals forming a distributed healthcare network.") },
    { Icon: BadgeDollarSign, title: t("Honorarios por consulta realizada", "Fees per completed consultation"), text: t("Honorarios médicos vinculados a consultas efectivamente realizadas.", "Physician fees linked to consultations actually completed.") },
    { Icon: Clock3, title: t("Disponibilidad propia", "Self-managed availability"), text: t("Cada profesional gestiona cuándo estar disponible para recibir solicitudes.", "Each professional manages when to be available to receive requests.") },
    { Icon: MapPin, title: t("Expansión geográfica", "Geographic expansion"), text: t("Posibilidad de ampliar cobertura sin incorporar proporcionalmente personal asistencial fijo ni construir establecimientos propios.", "The ability to expand coverage without proportionally adding permanent clinical staff or building owned facilities.") },
  ];

  return <section className={styles.networkModel} aria-labelledby="medical-network-title">
    <ScrollReveal y={16} className={styles.sectionIntro}>
      <h2 id="medical-network-title">{t("Una red médica que crece", "A medical network that grows")} <span>{t("con la demanda", "with demand")}</span></h2>
      <p className={styles.networkDescription}>{t("DocYa trabaja con una red de profesionales independientes, quienes gestionan su disponibilidad y reciben honorarios por cada consulta realizada.", "DocYa works with a network of independent professionals who manage their availability and receive fees for each completed consultation.")}</p>
    </ScrollReveal>
    <div className={styles.networkCards}>{benefits.map(({ Icon, title, text }, i) => <ScrollReveal key={title} y={16} delay={i * .05}><article><Icon size={26} strokeWidth={1.7} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article></ScrollReveal>)}</div>
    <p className={styles.networkClosing}>{t("Nuestro modelo permite ampliar la capacidad de atención mediante una red distribuida de profesionales, con una estructura asistencial predominantemente variable.", "Our model enables care capacity to expand through a distributed professional network, with a predominantly variable care delivery structure.")}</p>
  </section>;
}
