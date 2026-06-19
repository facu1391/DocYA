"use client";

import {
  CheckCircle2,
  FileCheck2,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import {
  SiAppstore,
  SiGooglemaps,
  SiGoogleplay,
  SiMercadopago,
  SiOpenai,
  SiWhatsapp,
} from "react-icons/si";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n/context";

const platformIcons = [SiOpenai, SiWhatsapp, SiGooglemaps, SiMercadopago, SiAppstore, SiGoogleplay];
const platformLabels = ["OpenAI", "WhatsApp", "Google Maps", "Mercado Pago", "App Store", "Google Play"];

export default function TrustStack() {
  const { t } = useI18n();

  const platforms = platformIcons.map((icon, i) => ({
    icon,
    label: platformLabels[i],
    detail: t.trust.plataformas[i],
  }));

  return (
    <section className="dark-section py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ScrollReveal className="min-w-0">
            <div className="h-full min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-2xl md:p-9">
              <div className="badge-trusted mb-5 w-fit">
                <HeartHandshake size={16} />
                {t.trust.ecosistemaBadge}
              </div>

              <h2 className="section-title mb-4 text-white">
                {t.trust.ecosistemaTitle}
                <span className="highlight-text">{t.trust.ecosistemaTitleHighlight}</span>
              </h2>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/70">
                {t.trust.ecosistemaDescription}
              </p>

              <div className="tech-marquee-mask" aria-label={t.trust.plataformasAria}>
                <div className="tech-marquee-track">
                  {[0, 1].map((loop) => (
                    <div
                      key={loop}
                      className="flex shrink-0 gap-3"
                      aria-hidden={loop === 1}
                    >
                      {platforms.map(({ icon: Icon, label, detail }) => (
                        <div
                          key={`${loop}-${label}`}
                          className="w-[190px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:-translate-y-1 hover:border-[var(--brand)]/40 hover:bg-white/[0.06]"
                        >
                          <Icon
                            className="mb-4 h-7 w-7 text-[var(--brand)]"
                            aria-hidden
                          />
                          <p className="mb-1 text-sm font-bold text-white">{label}</p>
                          <p className="m-0 text-xs leading-snug text-white/55">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="min-w-0">
            <div className="h-full rounded-3xl border border-[var(--brand)]/20 bg-[var(--brand)]/10 p-7 shadow-2xl md:p-9">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand)]/15 text-[var(--brand)]">
                <ShieldCheck size={30} />
              </div>

              <h3 className="mb-3 text-3xl font-bold text-white">
                {t.trust.seguridadTitle}
              </h3>

              <p className="mb-8 text-base leading-relaxed text-white/70">
                {t.trust.seguridadDescription}
              </p>

              <ul className="flex flex-col gap-4">
                {t.trust.seguridadItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]"
                      aria-hidden
                    />
                    <span className="text-base font-semibold leading-snug text-white/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                <FileCheck2 className="h-5 w-5 shrink-0 text-[var(--brand)]" />
                <p className="m-0 text-sm font-medium text-white/75">
                  {t.trust.bottomNote}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
