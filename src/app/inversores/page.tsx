import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, FileHeart, MapPin, Network, Video } from "lucide-react";
import Footer from "@/components/layouts/Footer";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import DomicilioVideo from "@/components/landing-public/nueva-landing/DomicilioVideo";
import InvestorAnalyticsLoader from "./investor-analytics-loader";
import styles from "./investors.module.css";
import InvestorLanguageSwitch from "./investor-language-switch";
import { translateInvestor, type InvestorLocale } from "@/lib/i18n/investors";

const assets = {
  logo: "https://res.cloudinary.com/dqsacd9ez/image/upload/v1788908618/docyanuevo_f1ukcy.png",
  app: "https://res.cloudinary.com/dqsacd9ez/image/upload/v1774886286/Screenshot_20260330-105015-portrait_ihblq7.png",
  tracking: "https://res.cloudinary.com/dqsacd9ez/image/upload/v1776468713/Captura_de_pantalla_2026-04-09_144113-portrait_vagywd.png",
  ai: "https://res.cloudinary.com/dqsacd9ez/image/upload/v1776467625/Green_Minimalist_Q_A_Phone_Chatting_Instagram_Story_1_cjt2p0.png",
  expansion: "https://res.cloudinary.com/dqsacd9ez/image/upload/v1774897108/Dise%C3%B1o_sin_t%C3%ADtulo_25_fyhkln.png",
};

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };
async function pageLocale(searchParams: PageProps['searchParams']): Promise<InvestorLocale> {
  return (await searchParams).lang === 'en' ? 'en' : 'es';
}
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const locale = await pageLocale(searchParams);
  const t = (text: string) => translateInvestor(locale, text);
  const url = locale === 'en' ? '/inversores?lang=en' : '/inversores';
  return {
    title: t('DocYa para inversores | Plataforma de salud bajo demanda'),
    description: t('Construido en Argentina, pensado para Latinoamérica. DocYa conecta pacientes con médicos disponibles para atención a domicilio y teleconsulta.'),
    alternates: { canonical: url, languages: { es: '/inversores', en: '/inversores?lang=en' } },
    openGraph: {
      title: t('DocYa | La salud, bajo demanda'),
      description: t('Producto real, tracción y un marketplace de atención médica. Conocé la oportunidad de inversión en DocYa.'),
      url, type: 'website', locale: locale === 'en' ? 'en_US' : 'es_AR',
    },
    twitter: { card: 'summary_large_image', title: t('DocYa | La salud, bajo demanda'), description: t('Construimos la plataforma de salud bajo demanda de Latinoamérica.') },
  };
}

const steps = [
  { number: "01", title: "Solicitás", copy: "Pedís atención a domicilio o una teleconsulta desde DocYa.", src: "/inversores/solicitud.png", alt: "DocYa Paciente busca un profesional cerca del domicilio" },
  { number: "02", title: "DocYa conecta", copy: "Ubicación y disponibilidad conectan la solicitud con el profesional.", src: "/inversores/conexion.png", alt: "Captura de DocYa Pro: solicitud con motivo, ubicación y opción de aceptar" },
  { number: "03", title: "Recibís atención", copy: "El médico acepta. En domicilio, seguís su llegada en tiempo real.", src: "/inversores/seguimiento.png", alt: "Captura de DocYa con seguimiento del médico en camino" },
];

export default async function InvestorsPage({ searchParams }: PageProps) {
  const locale = await pageLocale(searchParams);
  const t = (text: string) => translateInvestor(locale, text);
  const contact = 'mailto:soporte@docya.com.ar?subject=' + encodeURIComponent(locale === 'en' ? 'Investment in DocYa' : 'Inversión en DocYa');
  const founderContact = 'mailto:soporte@docya.com.ar?subject=' + encodeURIComponent(locale === 'en' ? 'Contact DocYa founder' : 'Contacto al fundador de DocYa');
  return (
    <div className={styles.page} lang={locale}>
      <a className={styles.skipLink} href="#contenido-inversores">{t("Ir al contenido")}</a>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label={t("Navegación de inversores")}>
          <Link href="/" aria-label={t("DocYa, inicio")}><Image src={assets.logo} alt={t("DocYa")} width={144} height={44} priority className={styles.logo} /></Link>
          <div className={styles.navLinks}><a href="#producto">{t("Producto")}</a><a href="#metricas">{t("Tracción")}</a><a href="#modelo">{t("Modelo")}</a><a href="#equipo">{t("Equipo")}</a></div>
          <div className={styles.navActions}><InvestorLanguageSwitch locale={locale} /><a href={contact} className={styles.navCta}>{t("Conversemos")} <ArrowRight size={15} aria-hidden="true" /></a></div>
        </nav>
      </header>
      <main id="contenido-inversores">
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}><span className={styles.dot} />{t("DOCYA · SALUD BAJO DEMANDA")}</p>
              <h1>{t("Pedir un médico debería ser tan fácil como")} <span>{t("pedir un Uber.")}</span></h1>
              <p className={styles.heroSubtitle}>{t("Estamos construyendo la plataforma de salud bajo demanda de Latinoamérica.")}</p>
              <p className={styles.heroDescription}>{t("DocYa conecta pacientes con médicos disponibles mediante geolocalización, asignación inteligente e inteligencia artificial. Atención a domicilio o por teleconsulta, desde una sola plataforma.")}</p>
            </div>
            <figure className={styles.heroVisual}>
              <div className={styles.visualOrbit} aria-hidden="true" />
              <Image src={assets.tracking} alt={t("DocYa permite seguir la llegada del médico en el mapa")} width={320} height={650} priority sizes="(max-width: 640px) 38vw, 220px" className={styles.trackingPhone} />
              <Image src={assets.app} alt={t("Pantalla original de DocYa Paciente buscando un médico cercano")} width={320} height={650} priority sizes="(max-width: 640px) 49vw, 280px" className={styles.mainPhone} />
              <figcaption><MapPin size={14} aria-hidden="true" /><span>{t("Tu ubicación. Un médico disponible. Una conexión real.")}</span></figcaption>
            </figure>
            <div className={styles.heroActions}>
              <p className={styles.heroPromise}>{t("Sin turnos. Sin salas de espera. Atención bajo demanda.")}</p>
              <div className={styles.actions}><a href="#metricas" className={styles.primary}>{t("Conocer la oportunidad")} <ArrowDown size={17} aria-hidden="true" /></a><a href={founderContact} className={styles.secondary}>{t("Contactar al fundador")} <ArrowRight size={17} aria-hidden="true" /></a></div>
              <p className={styles.smallNote}>{t("Disponibilidad según zona y profesionales conectados.")}</p>
            </div>
          </div>
        </section>

        <InvestorAnalyticsLoader locale={locale} />

        <section id="producto" className={styles.product}>
          <div className={styles.container}>
            <ScrollReveal y={16} className={styles.sectionIntro}><p className={styles.eyebrow}>{t("EL PRODUCTO, EN ACCIÓN")}</p><h2>{t("De pedir un médico a recibir atención,")} <span>{t("en unos pocos pasos.")}</span></h2></ScrollReveal>
            <div className={styles.steps}>
              {steps.map((step, index) => <ScrollReveal key={step.number} y={18} delay={index * .06}><article className={styles.step}><div className={styles.stepHeading}><span>{step.number}</span><h3>{t(step.title)}</h3></div><p>{t(step.copy)}</p><div className={styles.stepPhone}><Image src={step.src} alt={t(step.alt)} width={320} height={650} sizes="(max-width: 640px) 180px, 210px" /></div></article></ScrollReveal>)}
            </div>
            <p className={styles.productNote}>{t("Capturas originales del producto. Los precios y condiciones vigentes se informan al solicitar atención.")}</p>
          </div>
        </section>

        <section id="tecnologia" className={styles.technology}>
          <div className={styles.container}>
            <ScrollReveal y={16} className={styles.sectionIntro}><p className={styles.eyebrow}>{t("TECNOLOGÍA PROPIA")}</p><h2>{t("Más que telemedicina.")}<br /><span>{t("Una infraestructura tecnológica de salud.")}</span></h2></ScrollReveal>
            <div className={styles.technologyGrid}>
              <article className={styles.geoFeature}>
                <div className={styles.featureCopy}><span className={styles.featureLabel}>{t("COORDINACIÓN EN TIEMPO REAL")}</span><h3>{t("Del mapa a la puerta.")}</h3><p>{t("Geolocalización y seguimiento del profesional durante la visita.")}</p><div className={styles.capabilityLine}><Network size={18} aria-hidden="true" /><span>{t("Matching y asignación según ubicación y disponibilidad.")}</span></div></div>
                <DomicilioVideo vertical label={t("Animación del proceso de asignación del médico disponible más cercano y su recorrido hacia el domicilio del paciente")} />
              </article>
              <article className={styles.aiFeature}>
                <div className={styles.featureCopy}><Image src="/docya-ai-icon.png" alt={t("DocYa IA")} width={48} height={48} /><h3>{t("Orientación con IA.")}</h3><p>{t("Ayuda al paciente a entender el servicio y elegir cómo solicitar atención.")}</p><span className={styles.caution}>{t("La decisión clínica corresponde al profesional.")}</span></div>
                <Image src={assets.ai} alt={t("Recurso original de DocYa con la experiencia del asistente virtual")} width={320} height={650} sizes="(max-width: 640px) 170px, 210px" className={styles.aiPhone} />
              </article>
              <article className={styles.clinicalFeature}><FileHeart size={27} aria-hidden="true" /><div><h3>{t("La consulta deja un registro.")}</h3><p>{t("Historia clínica y documentos organizados en DocYa. Recetas, órdenes y certificados según evaluación médica.")}</p></div><div className={styles.clinicalTags}><span><Video size={15} aria-hidden="true" />{t("Teleconsulta")}</span><span><Check size={15} aria-hidden="true" />{t("Historia clínica")}</span><span><FileHeart size={15} aria-hidden="true" />{t("Documentación")}</span></div></article>
            </div>
          </div>
        </section>

        <section id="modelo" className={styles.business}>
          <div className={styles.container}>
            <div className={styles.businessGrid}>
              <ScrollReveal y={16}><p className={styles.eyebrow}>{t("EL MODELO DE NEGOCIO")}</p><h2>{t("Un marketplace")}<br /><span>{t("diseñado para escalar.")}</span></h2><p className={styles.businessDescription}>{t("El paciente paga por consulta. El profesional independiente atiende. DocYa conecta y coordina el servicio.")}</p><p className={styles.smallNote}>{t("Cada nueva ciudad requiere red profesional, demanda y operación local. El modelo permite expandirse sin construir hospitales propios.")}</p></ScrollReveal>
              <ScrollReveal y={16} delay={.08}><div className={styles.moneyFlow} aria-label={t("Distribución base: 80 por ciento para el profesional y 20 por ciento de comisión para DocYa")}><div className={styles.flowStart}><span>{t("Paciente")}</span><strong>{t("Paga por consulta")}</strong><ArrowDown size={20} aria-hidden="true" /></div><div className={styles.splitBar}><span /><span /></div><div className={styles.splitNumbers}><div><strong>80<span>%</span></strong><p>{t("Profesional")}</p><small>{t("Atención médica")}</small></div><div><strong>20<span>%</span></strong><p>{t("DocYa")}</p><small>{t("Comisión de intermediación")}</small></div></div><p className={styles.splitNote}>{t("Reparto base según términos vigentes, antes de otros conceptos aplicables. El GMV es el total transaccionado; la comisión es ingreso de DocYa. Los costos operativos determinan la rentabilidad.")}</p></div></ScrollReveal>
            </div>
            <div className={styles.clinicNote}><span>{t("Un ecosistema conectado")}</span><p>{t("DocYa Clinic complementa el marketplace con herramientas para la práctica clínica.")}</p><Link href="/clinic">{t("Conocer DocYa Clinic")} <ArrowRight size={15} aria-hidden="true" /></Link></div>
          </div>
        </section>

        <section id="expansion" className={styles.expansion}>
          <div className={styles.container}>
            <div className={styles.expansionGrid}>
              <figure className={styles.regionVisual}><Image src={assets.expansion} alt={t("Ilustración de Argentina utilizada en la landing oficial de DocYa")} width={540} height={960} sizes="(max-width: 760px) 320px, 450px" /><figcaption>{t("Representación visual de la visión nacional.")}<br />{t("Los puntos no indican zonas de cobertura operativa.")}</figcaption></figure>
              <div><p className={styles.eyebrow}>{t("VISIÓN DE EXPANSIÓN")}</p><h2>{t("Construido en Argentina.")}<br /><span>{t("Pensado para Latinoamérica.")}</span></h2><ol className={styles.roadmap}>
                <li><span className={styles.activeStage}>{t("HOY · OPERATIVO")}</span><h3>{t("Atención domiciliaria en CABA")}</h3><p>{t("Una red local de profesionales, con disponibilidad según zona y momento.")}</p></li>
                <li><span className={styles.activeStage}>{t("HOY · OPERATIVO")}</span><h3>{t("Teleconsulta en Argentina")}</h3><p>{t("Atención por videollamada desde cualquier lugar del país, según disponibilidad.")}</p></li>
                <li><span>{t("PRÓXIMA ETAPA")}</span><h3>{t("Ampliar la cobertura nacional")}</h3><p>{t("Fortalecer la red y desarrollar operaciones locales antes de llegar a nuevas ciudades.")}</p></li>
                <li><span>{t("VISIÓN FUTURA")}</span><h3>{t("Mercados latinoamericanos")}</h3><p>{t("Expansión progresiva, adaptada a los requisitos regulatorios de cada país.")}</p></li>
              </ol></div>
            </div>
          </div>
        </section>

        <section id="equipo" className={styles.team}>
          <div className={styles.container}><div className={styles.teamGrid}><div><p className={styles.eyebrow}>{t("EQUIPO FUNDADOR")}</p><h2>{t("Producto y operación.")}<br /><span>{t("Criterio clínico.")}</span></h2></div><div className={styles.founders}><article><span className={styles.founderPortrait}><Image src="/inversores/nahun-menem.jpeg" alt="Nahun Menem" width={112} height={112} className={styles.founderPhoto} /></span><div><h3>{t("Nahun Menem")}</h3><p>{t("Fundador y CEO")}</p></div></article><article><span className={styles.founderPortrait}><Image src="/inversores/guadalupe-murcia-gonzalez.jpeg" alt="Guadalupe Murcia González" width={112} height={112} className={styles.founderPhoto} /></span><div><h3>{t("Guadalupe Murcia González")}</h3><p>{t("Cofundadora y directora médica")}</p></div></article></div></div></div>
        </section>

        <section className={styles.closing}><div className={styles.container}><div className={styles.closeInner}><Image src={assets.logo} alt={t("DocYa")} width={144} height={44} /><p className={styles.eyebrow}>{t("CONSTRUYAMOS LO QUE VIENE")}</p><h2>{t("Estamos construyendo una nueva forma de")} <span>{t("acceder a la salud.")}</span></h2><p>{t("DocYa combina tecnología, profesionales de la salud y un modelo bajo demanda para transformar el acceso a la atención médica en Latinoamérica.")}</p><a className={styles.primary} href={contact}>{t("Conversemos sobre inversión")} <ArrowRight size={18} aria-hidden="true" /></a><Link href="/contacto" className={styles.contactLink}>{t("También podés escribirnos desde nuestro formulario")}</Link></div></div></section>
      </main>
      <Footer audience="public" locale={locale} />
    </div>
  );
}
