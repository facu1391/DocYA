"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { Baby, ChevronRight, ClipboardPlus, Gift, HeartPulse, Home, Stethoscope, UserRound, Video } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { PatientReferralSummary } from "@/lib/pedir/patientReferrals";
import styles from "./PatientHomeDashboard.module.css";
import shimmer from "./TextShimmer.module.css";

type Service = "medico" | "enfermero" | "teleconsulta";
type Props = {
  name: string;
  dark: boolean;
  locale: "es" | "en";
  prices: Partial<Record<Service, { monto: number }>>;
  pricesLoading: boolean;
  referralsEnabled: boolean;
  referralSummary: PatientReferralSummary | null;
  onService: (service: Service, pediatrics?: boolean) => void;
  onReferral: () => void;
  help: ReactNode;
};

export default function PatientHomeDashboard({ name, dark, locale, prices, pricesLoading, referralsEnabled, referralSummary, onService, onReferral, help }: Props) {
  const es = locale === "es";
  const [pediatricsOpen, setPediatricsOpen] = useState(false);
  const money = (amount?: number) => amount ? `$${amount.toLocaleString("es-AR")}` : pricesLoading ? (es ? "Consultando…" : "Loading…") : (es ? "Ver tarifa al solicitar" : "Check price when requesting");
  const services = [
    { id: "medico" as const, title: es ? "Médico" : "Doctor", description: es ? "Atención médica a domicilio" : "Medical care at home", icon: Stethoscope, glow: "#13b8a6", color: dark ? "#36c5b5" : "#08796d", tint: dark ? "#102d31" : "#eff8f5" },
    { id: "enfermero" as const, title: es ? "Enfermería" : "Nursing", description: es ? "Cuidados y atención en casa" : "Nursing care at home", icon: HeartPulse, glow: "#8b5cf6", color: dark ? "#b59af7" : "#6d42b4", tint: dark ? "#22283b" : "#f5f1fc" },
    { id: "teleconsulta" as const, title: es ? "Teleconsulta" : "Online doctor", description: es ? "Consultá con un médico online" : "Speak to a doctor online", icon: Video, glow: "#0eafe5", color: dark ? "#66c9f1" : "#0877a3", tint: dark ? "#112b3b" : "#eef7fc" },
    { id: "pediatria" as const, title: es ? "Pediatría" : "Pediatrics", description: es ? "Para chicos y adolescentes" : "Care for children and teens", icon: Baby, glow: "#ec4899", color: dark ? "#f49cc6" : "#b73a78", tint: dark ? "#2e2637" : "#fdf0f6" },
  ];
  const pediatricMinimum = prices.medico?.monto && prices.teleconsulta?.monto ? Math.min(prices.medico.monto, prices.teleconsulta.monto) : undefined;
  const vars = {
    "--home-surface": dark ? "#0c232b" : "#ffffff",
    "--home-line": dark ? "#28414a" : "#d6e2e5",
    "--home-text": dark ? "#e9f2f2" : "#142e35",
    "--home-muted": dark ? "#a5b9bd" : "#586e76",
    "--home-accent": dark ? "#4fc8b8" : "#08796d",
    "--home-hover": dark ? "#14313a" : "#f4f9f8",
    "--home-nav": dark ? "#081b23" : "#ffffff",
    "--home-glow-strength": dark ? "32%" : "15%",
  } as CSSProperties;

  return <div className={styles.dashboard} style={vars}>
    <section className={styles.welcome} aria-labelledby="patient-welcome">
      <h1 id="patient-welcome">{es ? `Hola, ${name}` : `Hi, ${name}`}</h1>
      <p>{es ? "¿Qué necesitás hoy?" : "What do you need today?"}</p>
    </section>

    <section aria-labelledby="patient-services" id="servicios" className={styles.services}>
      <div className={styles.sectionHeading}><h2 id="patient-services">{es ? "Pedí atención" : "Request care"}</h2><span>{es ? "Tarifas en pesos argentinos" : "Prices in Argentine pesos"}</span></div>
      <div className={styles.grid}>
        {services.map(service => {
          const pediatric = service.id === "pediatria";
          const amount = pediatric ? pediatricMinimum : prices[service.id as Service]?.monto;
          const Icon = service.icon;
          return <article key={service.id} className={styles.service} style={{ "--service-color": service.color, "--service-tint": service.tint, "--service-glow": service.glow, "--service-icon-fill": dark ? service.glow : service.tint, "--service-icon-ink": dark ? "#ffffff" : service.color } as CSSProperties}>
            <div className={styles.serviceTop}><span className={styles.serviceIcon}><Icon size={29} strokeWidth={1.8} aria-hidden="true" /></span><span className={styles.serviceMode}>{pediatric ? (es ? "Online o en casa" : "Online or at home") : service.id === "teleconsulta" ? "Online" : (es ? "A domicilio" : "At home")}</span></div>
            <h3>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
            <div className={styles.servicePrice}><small>{pediatric && amount ? (es ? "Desde" : "From") : es ? "Tarifa vigente" : "Current price"}</small><strong>{pediatric && !amount && !pricesLoading ? (es ? "Ver modalidades" : "View options") : money(amount)}</strong></div>
            <button type="button" data-service={service.id} className={styles.serviceAction} onClick={() => pediatric ? setPediatricsOpen(true) : onService(service.id as Service)}>{pediatric ? (es ? "Elegir modalidad" : "Choose care") : (es ? "Solicitar" : "Request")}<ChevronRight size={17} aria-hidden="true" /></button>
          </article>;
        })}
      </div>
      <p className={styles.priceNote}>{es ? "Confirmás la tarifa vigente antes de pagar o solicitar la atención." : "You confirm the current price before paying or requesting care."}</p>
    </section>

    <Link href="/pedir/consultas" className={styles.history}>
      <span className={styles.historyIcon}><ClipboardPlus size={25} strokeWidth={1.7} aria-hidden="true" /></span>
      <span><strong className={`${shimmer.title}${dark ? ` ${shimmer.dark}` : ""}`}>{es ? "Mi historial de atención" : "My care history"}</strong><small>{es ? "Consultas, recetas, certificados y órdenes médicas" : "Consultations, prescriptions, certificates, and medical orders"}</small></span>
      <ChevronRight size={21} aria-hidden="true" />
    </Link>

    <section className={styles.help} aria-label={es ? "Ayuda para tu atención" : "Help with your care"}>{help}</section>

    {referralsEnabled && <button type="button" className={styles.referral} onClick={onReferral}>
      <span className={styles.referralIcon}><Gift size={24} aria-hidden="true" /></span>
      <span><strong>{referralSummary && referralSummary.available_rewards_count > 0 ? (es ? `Tenés ${referralSummary.available_rewards_count} teleconsulta${referralSummary.available_rewards_count === 1 ? "" : "s"} gratis` : `${referralSummary.available_rewards_count} free online consultation${referralSummary.available_rewards_count === 1 ? "" : "s"} available`) : (es ? "Invitá amigos" : "Invite friends")}</strong>
        <small>{referralSummary ? referralSummary.available_rewards_count > 0 ? (es ? "Usala al solicitar tu próxima teleconsulta" : "Use it for your next online consultation") : (es ? `${referralSummary.progress_in_cycle} de ${referralSummary.referrals_per_reward} · Conocé tus beneficios` : `${referralSummary.progress_in_cycle} of ${referralSummary.referrals_per_reward} · View your benefits`) : (es ? "Conocé el programa de referidos de DocYa" : "Explore DocYa’s referral program")}</small></span><ChevronRight size={20} aria-hidden="true" />
    </button>}

    <nav className={styles.bottomNav} aria-label={es ? "Navegación de pacientes" : "Patient navigation"}>
      <Link href="/pedir" aria-current="page"><Home size={23} aria-hidden="true" /><span>{es ? "Inicio" : "Home"}</span></Link>
      <Link href="/pedir/consultas"><ClipboardPlus size={23} aria-hidden="true" /><span>{es ? "Mis consultas" : "My consultations"}</span></Link>
      <Link href="/pedir/perfil"><UserRound size={23} aria-hidden="true" /><span>{es ? "Perfil" : "Profile"}</span></Link>
    </nav>

    <Dialog open={pediatricsOpen} onOpenChange={setPediatricsOpen}>
      <DialogContent style={{ background: dark ? "#0c232b" : "#ffffff", color: dark ? "#e9f2f2" : "#142e35", borderColor: dark ? "#28414a" : "#d6e2e5", borderRadius: 22 }}>
        <DialogTitle>{es ? "Atención pediátrica" : "Pediatric care"}</DialogTitle>
        <DialogDescription style={{ color: dark ? "#a5b9bd" : "#586e76" }}>{es ? "Elegí cómo querés que atendamos al niño o adolescente. La ubicación y los datos del paciente se completan en el siguiente paso." : "Choose how you would like the child or teen to receive care. You will enter the location and patient details in the next step."}</DialogDescription>
        {(["teleconsulta", "medico"] as const).map(id => <button key={id} type="button" className={styles.pediatricOption} style={{ borderColor: dark ? "#3e4456" : "#d6e2e5" }} onClick={() => { setPediatricsOpen(false); onService(id, true); }}>
          {id === "teleconsulta" ? <Video size={23} aria-hidden="true" /> : <Home size={23} aria-hidden="true" />}<span><strong>{id === "teleconsulta" ? (es ? "Pediatra online" : "Online pediatrician") : (es ? "Pediatra en casa" : "Pediatrician at home")}</strong><small>{money(prices[id]?.monto)}</small></span><ChevronRight size={19} aria-hidden="true" />
        </button>)}
      </DialogContent>
    </Dialog>
  </div>;
}
