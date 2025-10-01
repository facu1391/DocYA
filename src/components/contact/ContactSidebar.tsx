import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-4">
      <div className="surface rounded-2xl p-6 sticky top-24 space-y-5">
        <h3 className="font-semibold text-lg">Canales directos</h3>

        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border
                            text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                            bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]">
            <Mail className="h-5 w-5" />
          </span>
          <div className="text-sm">
            <p className="font-medium">Email</p>
            <a href="mailto:soporte@docya.com.ar" className="link-primary">
              soporte@docya.com.ar
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border
                            text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                            bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]">
            <Phone className="h-5 w-5" />
          </span>
          <div className="text-sm">
            <p className="font-medium">WhatsApp</p>
            <a
              href="https://wa.me/5491112345678"
              target="_blank"
              rel="noreferrer"
              className="link-primary"
            >
              +54 9 11 1234-5678
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border
                            text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
                            bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]">
            <MapPin className="h-5 w-5" />
          </span>
          <div className="text-sm">
            <p className="font-medium">Base</p>
            <p className="text-muted-foreground">CABA — Palermo / Belgrano</p>
          </div>
        </div>

        <div className="pt-2">
          <Link href="/registro" className="btn-primary w-full inline-flex justify-center">
            Postulate ahora <MessageCircle className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
