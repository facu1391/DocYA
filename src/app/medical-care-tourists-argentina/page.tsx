// src/app/medical-care-tourists-argentina/page.tsx
//
// Version en ingles de /teleconsulta-turistas, pensada para que alguien
// busque en Google en ingles ("medical care for tourists in argentina",
// "online doctor argentina") y encuentre una pagina real en su idioma, no
// una traduccion automatica. El toggle de idioma del sitio (I18nProvider)
// es client-side y Google no lo indexa, asi que esto tiene que ser una URL
// propia con su propio SEO. Cruzada por hreflang con /teleconsulta-turistas.

import type { Metadata } from "next";
import Script from "next/script";
import { Video, Globe, Wallet, ShieldCheck } from "lucide-react";
import { buildServiceJsonLd } from "@/lib/seo/schema";
import { getLocationsByType } from "@/data/teleconsulta-locations";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";

const PATH = "/medical-care-tourists-argentina";
const ES_PATH = "/teleconsulta-turistas";

export const metadata: Metadata = {
  title: "Medical Care for Tourists in Argentina | Online Doctor",
  description:
    "Got sick while traveling in Argentina? Talk to a licensed doctor by video call from any province, no local health insurance needed. Prescriptions and medical certificates when applicable.",
  alternates: {
    canonical: PATH,
    languages: {
      "es-AR": ES_PATH,
      en: PATH,
    },
  },
  openGraph: {
    title: "Medical Care for Tourists in Argentina | DocYa",
    description:
      "Online doctor by video call for tourists anywhere in Argentina. No local health insurance needed, licensed physicians.",
    url: PATH,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Care for Tourists in Argentina | DocYa",
    description: "Online doctor by video call, available in every province of Argentina.",
  },
};

const FAQS = [
  {
    question: "Do I need Argentine health insurance to request a video call?",
    answer:
      "No. You pay for the consultation directly in the app, with no need for local health insurance or a national ID number.",
  },
  {
    question: "Do you attend foreign tourists visiting the country?",
    answer:
      "Yes, as long as you have an internet connection you can request a video call from any of Argentina's 23 provinces, whether you live here or you're just visiting.",
  },
  {
    question: "Does it work only in Buenos Aires, or wherever I'm traveling?",
    answer:
      "It works in all 23 provinces of the country, with the same price and process, whether you're in a big city or a remote tourist destination.",
  },
  {
    question: "Can I get a prescription or a medical certificate while traveling?",
    answer:
      "Yes, if the doctor considers it appropriate after evaluating your case, they issue the prescription or certificate with a digital signature at the end of the video call.",
  },
  {
    question: "What kind of issues can be solved through a video call?",
    answer:
      "Cases that don't require a physical exam: stomach issues, allergies, heat exhaustion, flu-like symptoms, headaches, or renewing a regular medication, among others. If the doctor thinks you need in-person care, they'll tell you during the same consultation.",
  },
];

export default function MedicalCareTouristsPage() {
  const ciudades = getLocationsByType("ciudad");

  const serviceJsonLd = buildServiceJsonLd({
    id: `${PATH}#service`,
    name: "Medical Care for Tourists in Argentina",
    alternateName: ["Online Doctor Argentina", "Doctor for Tourists Argentina", "Video Call Doctor Argentina"],
    description:
      "Online medical consultations by video call for tourists and travelers anywhere in Argentina, paid per visit.",
    url: PATH,
    areaServedName: "Argentina",
    areaServedType: "Country",
  });

  return (
    <>
      <Breadcrumbs
        jsonLdId="ld-breadcrumb-medical-care-tourists"
        items={[
          { label: "Home", href: "/" },
          { label: "Medical Care for Tourists", href: PATH },
        ]}
      />

      <SeoHero
        badge="Online doctor for tourists in Argentina"
        title="Got sick while traveling?"
        titleHighlight="Talk to a doctor now"
        description="No matter which province you're in: request a video call from the app and a licensed doctor will see you, no local health insurance and no need to know the nearest clinic."
        primaryCta={{ label: "Request a video call", href: "/pedir" }}
        secondaryCta={{ label: "Ver versión en español", href: ES_PATH }}
      />

      <DifferentiatorBanner
        ctaLabel="Request a video call"
        title="No local health insurance needed."
        subtitle="Request a video call and pay per visit, directly in the app."
      />

      <section className="py-6">
        <div className="mx-auto w-full max-w-3xl px-6">
          <div className="glass-card rounded-3xl border-l-4 p-6 md:p-8" style={{ borderLeftColor: "#ef4444" }}>
            <p className="font-semibold text-foreground">Is this an emergency?</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
              This service is for issues that are not life-threatening. If you have chest pain, severe
              difficulty breathing, heavy bleeding, loss of consciousness, or any other potentially serious
              condition, do not use the app: call <strong>911</strong> or <strong>107 (SAME)</strong>, or go
              to the nearest hospital or emergency room.
            </p>
          </div>
        </div>
      </section>

      <SeoContentSection
        heading="Getting sick while traveling shouldn't ruin your trip"
        paragraphs={[
          "When you get sick far from home, the hardest part is usually not knowing where to turn: you don't have a regular doctor nearby, you don't know which clinic to trust, and you don't know how long you'll have to wait. A video call solves that uncertainty: you request it from the app, a licensed doctor sees you over video, and you get back to your trip.",
          "This works both for international visitors and for Argentines traveling to another province: it doesn't depend on having local or national health insurance, you simply pay per visit in the app. And unlike looking for an unfamiliar clinic in a place you're only passing through, the process is exactly the same whether you're in Buenos Aires, Patagonia, or northern Argentina.",
        ]}
      />

      <BenefitsGrid
        heading="Why use DocYa if you get sick while traveling"
        items={[
          {
            icon: <Video size={22} />,
            title: "Don't lose a day of your trip",
            description: "Solve the consultation by video call from your accommodation, without searching for an unfamiliar clinic.",
          },
          {
            icon: <Globe size={22} />,
            title: "Anywhere in the country",
            description: "The service covers all 23 provinces of Argentina, with the same process in each one.",
          },
          {
            icon: <Wallet size={22} />,
            title: "Pay per visit, no local insurance",
            description: "No Argentine health insurance required: you pay for the consultation directly in the app.",
          },
          {
            icon: <ShieldCheck size={22} />,
            title: "Licensed physicians",
            description: "The same verified doctors that attend patients across the country, wherever you're starting from.",
          },
        ]}
      />

      <SeoFaqSection
        jsonLdId="ld-faq-medical-care-tourists"
        title="Frequently asked questions from travelers"
        items={FAQS}
      />

      <RelatedLinks
        title="Popular tourist destinations we cover"
        links={ciudades.map((location) => ({
          label: location.name,
          href: `/teleconsulta/${location.slug}`,
          description: `Online doctor in ${location.name}`,
        }))}
      />

      <RelatedLinks
        title="Medical care in Buenos Aires and more"
        links={[
          { label: "Doctor in Buenos Aires", href: "/doctor-in-buenos-aires", description: "Compare a house call with an online consultation" },
          { label: "Medical care in English", href: "/english-speaking-doctor-buenos-aires", description: "English patient flow and optional real-time AI translation" },
          { label: "Doctor at your hotel in Buenos Aires", href: "/doctor-at-hotel-buenos-aires", description: "Private house calls at hotels and temporary accommodation" },
          { label: "Versión en español", href: ES_PATH, description: "Ver esta página en español" },
          { label: "Coverage by province (Spanish)", href: "/teleconsulta-argentina", description: "Full list of provinces" },
          { label: "Contact", href: "/contacto", description: "Have another question? Write to us" },
        ]}
      />

      <SeoFinalCta
        heading="Feeling sick during your trip to Argentina?"
        subtitle="A licensed doctor will see you by video call, no appointment and no travel needed."
        ctaLabel="Request a video call"
      />

      <Script
        id="ld-service-medical-care-tourists"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
