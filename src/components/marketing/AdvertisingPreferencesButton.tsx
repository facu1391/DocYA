"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/marketing/measurement";
import { useI18n } from "@/lib/i18n/context";

export default function AdvertisingPreferencesButton({className}:{className?:string}) {
  const {locale}=useI18n();
  return <button type="button" className={className} data-ad-preferences
    onClick={()=>window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
    {locale==="en" ? "Privacy preferences" : "Preferencias de privacidad"}
  </button>;
}
