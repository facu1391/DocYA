// src/components/clinic-landing/shared/variants.ts
// Constantes compartidas por toda la landing de DocYa Clinic: anclas de
// navegacion, CTA, logo y curvas de animacion. Todo lo demas importa de aca
// para que nav/secciones nunca queden desincronizados.

export const SITE_URL = "https://www.docya.com.ar";

export const CLINIC_LOGO =
  "https://res.cloudinary.com/dqsacd9ez/image/upload/v1782353919/docyaclinicblanco_snztro.png";

export const ANCHORS = {
  comoFunciona: "como-funciona",
  whatsapp: "whatsapp-ia",
  teleconsulta: "teleconsulta",
  salaDeEspera: "sala-de-espera",
  funcionalidades: "funcionalidades",
} as const;

export const CTA_DEMO_HREF = "/contacto?ref=clinic";

export const EASE_OUT: [number, number, number, number] = [0.5, 0, 0, 1];

export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const fadeUpItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const fadeInItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const scaleInItem = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};
