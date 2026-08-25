"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";
import { Check, ChevronDown, Search } from "lucide-react";

type Props = {
  country: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  value: string;
  onChange: (value: string) => void;
  background: string;
  border: string;
  color: string;
  muted: string;
};

const displayNames = new Intl.DisplayNames(["es"], { type: "region" });

function flagEmoji(country: CountryCode) {
  return country.replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

function searchable(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function normalizePhoneNumber(value: string, country: CountryCode): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const digits = trimmed.replace(/\D/g, "");
  // En Argentina el formulario pide el celular sin 0 ni 15. El 9 forma parte
  // del E.164 móvil, aunque no se ingrese en el número nacional.
  if (country === "AR" && digits.length === 10) {
    const mobile = parsePhoneNumberFromString(`+549${digits}`);
    if (mobile?.isValid()) return mobile.number;
  }

  const parsed = parsePhoneNumberFromString(trimmed.startsWith("+") ? trimmed : digits, country);
  return parsed?.isValid() ? parsed.number : null;
}

export default function InternationalPhoneInput({
  country,
  onCountryChange,
  value,
  onChange,
  background,
  border,
  color,
  muted,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 320 });
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const countries = useMemo(() => getCountries().map(code => ({
    code,
    name: displayNames.of(code) || code,
    callingCode: getCountryCallingCode(code),
  })).sort((a, b) => a.name.localeCompare(b.name, "es")), []);

  const filtered = useMemo(() => {
    const term = searchable(query).replace(/^\+/, "");
    if (!term) return countries;
    return countries.filter(item =>
      searchable(item.name).includes(term) ||
      item.code.toLowerCase().includes(term) ||
      item.callingCode.includes(term)
    );
  }, [countries, query]);

  const placeholder = useMemo(() => {
    const example = getExampleNumber(country, examples);
    if (!example) return "Número nacional";
    const national = example.nationalNumber;
    return country === "AR" && national.startsWith("9") ? national.slice(1) : national;
  }, [country]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target) && !menuRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const positionMenu = () => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(rect.width, 420);
      setMenuPosition({
        top: rect.bottom + 8,
        left: Math.min(rect.left, window.innerWidth - width - 12),
        width,
      });
    };
    positionMenu();
    window.addEventListener("resize", positionMenu);
    window.addEventListener("scroll", positionMenu, true);
    return () => {
      window.removeEventListener("resize", positionMenu);
      window.removeEventListener("scroll", positionMenu, true);
    };
  }, [open]);

  return (
    <div ref={rootRef} style={{ position: "relative", width: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(108px, auto) 1fr", gap: 10 }}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => { setOpen(current => !current); setQuery(""); }}
          style={{ minHeight: 50, border: `1px solid ${border}`, borderRadius: 14, background, color, padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}
        >
          <span style={{ fontSize: 20, lineHeight: 1 }}>{flagEmoji(country)}</span>
          <span>+{getCountryCallingCode(country)}</span>
          <ChevronDown size={14} color={muted} />
        </button>
        <input
          type="tel"
          aria-label="Número de teléfono nacional"
          inputMode="tel"
          autoComplete="tel-national"
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
          style={{ minWidth: 0, width: "100%", minHeight: 50, boxSizing: "border-box", border: `1px solid ${border}`, borderRadius: 14, background, color, padding: "14px 16px", outline: "none", fontSize: 15, fontFamily: "inherit" }}
        />
      </div>

      {open && typeof document !== "undefined" && createPortal(
        <div ref={menuRef} role="listbox" style={{ position: "fixed", zIndex: 9999, top: menuPosition.top, left: menuPosition.left, width: menuPosition.width, maxHeight: 330, overflow: "hidden", border: `1px solid ${border}`, borderRadius: 16, background, color, boxShadow: "0 18px 50px rgba(0,0,0,.3)" }}>
          <div style={{ position: "relative", padding: 10, borderBottom: `1px solid ${border}` }}>
            <Search size={16} color={muted} style={{ position: "absolute", left: 23, top: "50%", transform: "translateY(-50%)" }} />
            <input
              autoFocus
              value={query}
              onChange={event => setQuery(event.target.value)}
              onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}
              placeholder="Buscar país, ISO o prefijo"
              style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${border}`, borderRadius: 11, background, color, padding: "10px 12px 10px 38px", outline: "none", fontFamily: "inherit" }}
            />
          </div>
          <div style={{ maxHeight: 270, overflowY: "auto", padding: 6 }}>
            {filtered.map(item => (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={country === item.code}
                onClick={() => { onCountryChange(item.code); onChange(""); setOpen(false); }}
                style={{ width: "100%", border: 0, borderRadius: 10, background: country === item.code ? "rgba(0,179,166,.14)" : "transparent", color, padding: "10px 11px", display: "grid", gridTemplateColumns: "28px 1fr auto 18px", alignItems: "center", gap: 8, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
              >
                <span style={{ fontSize: 19 }}>{flagEmoji(item.code)}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 13, fontWeight: 700 }}>{item.name}</span>
                  <span style={{ display: "block", fontSize: 10, color: muted, marginTop: 2 }}>{item.code}</span>
                </span>
                <span style={{ fontSize: 13, color: muted }}>+{item.callingCode}</span>
                {country === item.code ? <Check size={15} color="#00b3a6" /> : null}
              </button>
            ))}
            {filtered.length === 0 && <p style={{ color: muted, fontSize: 13, textAlign: "center", padding: 18 }}>No encontramos ese país.</p>}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
