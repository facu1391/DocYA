"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { analyticsConsent } from "@/lib/marketing/analyticsConsent";
import { CONSENT_EVENT, publicMarketingPath } from "@/lib/marketing/measurement";

const ID = "G-4XHELG8M9X";
type GoogleWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

function referral() {
  try {
    const url = new URL(document.referrer);
    if (!["https:", "http:"].includes(url.protocol) || url.hostname.replace(/^www\./, "") === location.hostname.replace(/^www\./, "")) return "";
    return url.origin + "/";
  } catch {
    return "";
  }
}

export default function GoogleAnalytics() {
  const path = usePathname();
  const initialized = useRef(false);
  const previous = useRef("");
  const firstReferrer = useRef<string | undefined>(undefined);

  useEffect(() => {
    const w = window as GoogleWindow;
    firstReferrer.current ??= referral();
    function measure() {
      const allowed = analyticsConsent() === true && publicMarketingPath(path);
      Object.assign(w, { ["ga-disable-" + ID]: !allowed });
      if (!allowed) {
        previous.current = "";
        return;
      }

      if (!initialized.current) {
        w.dataLayer ??= [];
        // Google tag expects an Arguments object in the command queue.
        // eslint-disable-next-line prefer-rest-params
        w.gtag ??= function () { w.dataLayer!.push(arguments); };
        w.gtag("consent", "default", {
          analytics_storage: "granted", ad_storage: "denied",
          ad_user_data: "denied", ad_personalization: "denied",
        });
        w.gtag("js", new Date());
        w.gtag("config", ID, {
          send_page_view: false, allow_google_signals: false,
          allow_ad_personalization_signals: false,
          page_location: location.origin + path, page_referrer: firstReferrer.current,
        });
        const script = document.createElement("script");
        script.async = true;
        script.referrerPolicy = "no-referrer";
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
        document.head.appendChild(script);
        initialized.current = true;
      }

      if (previous.current === path) return;
      w.gtag?.("event", "page_view", {
        send_to: ID, page_location: location.origin + path,
        page_referrer: previous.current ? location.origin + previous.current : firstReferrer.current,
      });
      previous.current = path;
      firstReferrer.current = "";
    }

    measure();
    window.addEventListener(CONSENT_EVENT, measure);
    window.addEventListener("storage", measure);
    window.addEventListener("focus", measure);
    return () => {
      window.removeEventListener(CONSENT_EVENT, measure);
      window.removeEventListener("storage", measure);
      window.removeEventListener("focus", measure);
    };
  }, [path]);

  return null;
}
