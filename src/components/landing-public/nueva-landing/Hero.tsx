"use client";
import Image from "next/image";
import { Stethoscope, Video } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import styles from "./home-conversion.module.css";
export default function Hero() {
  const { locale } = useI18n();
  const en = locale === "en";
  return <header id="inicio" className={styles.hero}><div className={styles.heroGrid}><div>
    <h1>{en ? "Need a doctor?" : "¿Necesitás un médico?"}<br /><span>{en ? "DocYa finds one for you." : "DocYa lo busca por vos."}</span></h1>
    <p className={styles.lead}>{en ? "Medical care at home in CABA or by video from anywhere in Argentina. No appointments, right from your phone." : "Atención médica a domicilio en CABA o por teleconsulta desde cualquier lugar de Argentina. Sin turnos y desde tu celular."}</p>
    <div className={styles.actions}><a className={styles.homeButton} href="/pedir"><Stethoscope size={18} aria-hidden />{en ? "Request a doctor at home" : "Pedir médico a domicilio"}</a><a className={styles.videoButton} href="/pedir?tipo=teleconsulta"><Video size={18} aria-hidden />{en ? "Request a teleconsultation" : "Pedir teleconsulta"}</a></div>
    <p className={styles.caption}>{en ? "Professionals with medical registration verified in SISA." : "Profesionales con matrícula verificada en SISA."}</p>
    <p className={styles.small}>{en ? "Subject to location and professional availability. Not an emergency service." : "Según zona y disponibilidad de profesionales. No es un servicio de emergencias."}</p>
  </div><figure className={styles.heroPhone}><Image className={styles.mainPhone} src="/how/solicitar-portrait.png" alt={en ? "Care options in the real DocYa patient app" : "Servicios de atención en la aplicación real DocYa Paciente"} width={1042} height={2048} sizes="(max-width: 760px) 160px, 245px" priority /><Image className={styles.trackingPhone} src="/how/busqueda-medico-portrait.png" alt={en ? "DocYa looking for an available doctor near you" : "DocYa buscando un médico disponible cerca de tu ubicación"} width={1042} height={2048} sizes="(max-width: 760px) 140px, 205px" /><figcaption>{en ? "Real screens from the DocYa app" : "La aplicación real. Del pedido a la atención."}</figcaption></figure></div></header>;
}
