// src/components/contact/ContactSidebar.tsx
import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactSidebar() {
  return (
    <aside className="lg:col-span-4">
      <div className="surface sticky top-24 rounded-3xl border p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] space-y-5">
        <div>
          <span className="badge">Canales</span>
          <h3 className="mt-3 text-lg font-semibold">Canales directos</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Elegí la vía más cómoda para contactarte con el equipo.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border
              text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
              bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]"
          >
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
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border
              text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
              bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]"
          >
            <Phone className="h-5 w-5" />
          </span>
          <div className="text-sm">
            <p className="font-medium">WhatsApp</p>
            <a
              href="https://wa.me/5491168700607"
              target="_blank"
              rel="noreferrer"
              className="link-primary"
            >
              +54 9 11 6870-0607
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border
              text-[var(--brand)] border-[color-mix(in_srgb,var(--brand)_45%,transparent)]
              bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]"
          >
            <MapPin className="h-5 w-5" />
          </span>
          <div className="text-sm">
            <p className="font-medium">Base</p>
            <p className="text-muted-foreground">CABA — Palermo / Belgrano</p>
          </div>
        </div>

        <div className="pt-2">
          <Link href="/registro" className="btn-primary inline-flex w-full justify-center h-11">
            Postulate ahora <MessageCircle className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}