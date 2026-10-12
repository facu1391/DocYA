"use client";
import Image from "next/image";
import { ShieldCheck, Stethoscope, Video } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import styles from "./home-conversion.module.css";
export default function Hero() {
  const { locale } = useI18n();
  const en = locale === "en";
  return <header id="inicio" className={styles.hero}><div className={styles.heroGrid}><div>
    <span className={styles.eyebrow}><ShieldCheck size={16} aria-hidden />{en ? "REGISTERED MEDICAL PROFESSIONALS" : "PROFESIONALES MATRICULADOS"}</span>
    <h1>{en ? "Need a doctor?" : "¿Necesitás un médico?"}<br /><span>{en ? "DocYa finds one for you." : "DocYa lo busca por vos."}</span></h1>
    <p className={styles.lead}>{en ? "Medical care at home or by video, without booking an appointment. Registered professionals and tracking from your phone." : "Atención médica a domicilio o por videollamada, sin turnos. Profesionales matriculados y seguimiento desde tu celular."}</p>
    <div className={styles.actions}><a className={styles.homeButton} href="/pedir"><Stethoscope size={20} aria-hidden />{en ? "Doctor at home" : "Médico a domicilio"}</a><a className={styles.videoButton} href="/pedir?tipo=teleconsulta"><Video size={20} aria-hidden />{en ? "Teleconsultation" : "Teleconsulta"}</a></div>
    <p className={styles.caption}>{en ? "Request care in a few steps, wherever you are." : "Solicitá atención en pocos pasos, desde donde estés."}</p>
    <div className={styles.heroCoverage}><span>{en ? "Home visits in CABA" : "Domicilio en CABA"}</span><span>{en ? "Video consultations in Argentina" : "Teleconsulta en Argentina"}</span></div>
    <p className={styles.small}>{en ? "Subject to location and professional availability. Not an emergency service." : "Según zona y disponibilidad de profesionales. No es un servicio de emergencias."}</p>
  </div><figure className={styles.heroPhone}><Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774886286/Screenshot_20260330-105015-portrait_ihblq7.png" alt={en ? "Real DocYa patient app screen searching for a nearby professional" : "Pantalla real de DocYa Paciente buscando un profesional cercano"} width={320} height={650} sizes="(max-width: 760px) 220px, 280px" priority /><figcaption>{en ? "Real DocYa app screen" : "Así se ve DocYa en tu celular"}</figcaption></figure></div></header>;
}