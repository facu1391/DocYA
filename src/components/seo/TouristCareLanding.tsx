import Script from "next/script";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SeoHero from "@/components/seo/SeoHero";
import DifferentiatorBanner from "@/components/seo/DifferentiatorBanner";
import SeoContentSection from "@/components/seo/SeoContentSection";
import BenefitsGrid from "@/components/seo/BenefitsGrid";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import RelatedLinks from "@/components/seo/RelatedLinks";
import SeoFinalCta from "@/components/seo/SeoFinalCta";
import { buildServiceJsonLd, type FaqItem } from "@/lib/seo/schema";

type LinkItem = { label: string; href: string; description: string };
type Benefit = { icon: ReactNode; title: string; description: string };

interface TouristCareLandingProps {
  path: string;
  breadcrumb: string;
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  secondaryCta?: LinkItem;
  contentHeading: string;
  paragraphs: string[];
  benefitsHeading: string;
  benefits: Benefit[];
  faqs: FaqItem[];
  links: LinkItem[];
  finalHeading: string;
  finalSubtitle: string;
  serviceName: string;
  alternateNames: string[];
  serviceDescription: string;
}

export default function TouristCareLanding(props: TouristCareLandingProps) {
  const serviceJsonLd = buildServiceJsonLd({
    id: `${props.path}#service`,
    name: props.serviceName,
    alternateName: props.alternateNames,
    description: props.serviceDescription,
    url: props.path,
    areaServedName: "Buenos Aires, Argentina",
    areaServedType: "City",
    inLanguage: "en",
    audience: "International tourists, travelers and visitors in Buenos Aires",
  });

  return (
    <div lang="en">
      <Breadcrumbs
        jsonLdId={`ld-breadcrumb-${props.path.slice(1)}`}
        items={[{ label: "Home", href: "/" }, { label: props.breadcrumb, href: props.path }]}
      />
      <SeoHero
        badge={props.badge}
        title={props.title}
        titleHighlight={props.titleHighlight}
        description={props.description}
        primaryCta={{ label: "Request medical care", href: "/pedir" }}
        secondaryCta={props.secondaryCta}
      />
      <DifferentiatorBanner
        title="No Argentine health insurance required."
        subtitle="Choose a private house call in Buenos Aires or an online consultation, depending on your needs and availability."
        ctaLabel="Request medical care"
      />
      <section className="py-6">
        <div className="mx-auto w-full max-w-3xl px-6">
          <div className="glass-card rounded-3xl border-l-4 p-6 md:p-8" style={{ borderLeftColor: "#ef4444" }}>
            <p className="font-semibold text-foreground">For emergencies</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
              DocYa is not an emergency service. For chest pain, severe breathing difficulty, heavy bleeding,
              loss of consciousness or another potentially life-threatening condition, call <strong>911</strong>
              or <strong>107 (SAME)</strong>, or go to the nearest emergency department.
            </p>
          </div>
        </div>
      </section>
      <SeoContentSection heading={props.contentHeading} paragraphs={props.paragraphs} />
      <BenefitsGrid heading={props.benefitsHeading} items={props.benefits} />
      <SeoFaqSection
        jsonLdId={`ld-faq-${props.path.slice(1)}`}
        title="Frequently asked questions"
        items={props.faqs}
      />
      <RelatedLinks title="Medical care options for visitors" links={props.links} />
      <SeoFinalCta heading={props.finalHeading} subtitle={props.finalSubtitle} ctaLabel="Request medical care" />
      <Script
        id={`ld-service-${props.path.slice(1)}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </div>
  );
}
