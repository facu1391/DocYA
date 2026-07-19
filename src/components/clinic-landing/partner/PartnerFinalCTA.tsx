// src/components/clinic-landing/partner/PartnerFinalCTA.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";
import { PARTNER_ANCHORS } from "./anchors";

const CTA_PARTNER_HREF = `#${PARTNER_ANCHORS.postularme}`;

export default function PartnerFinalCTA() {
  return (
    <section className="py-28" style={{ background: "linear-gradient(135deg, #0a272c, #07141d)" }}>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <h2 className="section-title text-white">Sumá tu primer médico esta semana.</h2>
          <p className="mt-5 text-lg text-white/70">
            Contanos quién sos y arrancamos: te damos de alta como Partner y accedés a tu panel.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={CTA_PARTNER_HREF} className="btn-primary h-12 px-6 text-base">
              Quiero ser Partner
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/clinic"
              className="inline-flex h-12 items-center rounded-lg border px-6 text-base font-medium text-white transition hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              Conocer DocYa Clinic
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
