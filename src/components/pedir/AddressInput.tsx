"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

const PLACES_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

type PlaceResult = {
  formatted_address?: string;
  geometry?: {
    location?: { lat: () => number; lng: () => number };
  };
  address_components?: { long_name: string; types: string[] }[];
};

type AutocompleteInstance = {
  addListener: (e: "place_changed", fn: () => void) => void;
  getPlace: () => PlaceResult;
};

type GWin = Window & {
  google?: {
    maps?: {
      places?: {
        Autocomplete?: new (
          el: HTMLInputElement,
          opts: { fields: string[]; componentRestrictions?: { country: string }; types?: string[] }
        ) => AutocompleteInstance;
      };
    };
  };
};

type Props = {
  value: string;
  onChange: (val: string) => void;
  onPlaceSelect?: (direccion: string, lat?: number, lng?: number, provincia?: string) => void;
  placeholder?: string;
  dark?: boolean;
  style?: React.CSSProperties;
};

export default function AddressInput({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Escribí tu dirección...",
  dark = true,
  style,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const acRef    = useRef<AutocompleteInstance | null>(null);
  const bound    = useRef(false);

  const border  = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const bg      = dark ? "rgba(255,255,255,0.06)" : "#f8fafc";
  const textCol = dark ? "#e2f0f0" : "#0f172a";

  useEffect(() => {
    if (bound.current || !inputRef.current) return;

    let attempts = 0;
    const MAX = 20;

    const bind = () => {
      const Autocomplete = (window as GWin).google?.maps?.places?.Autocomplete;
      if (!Autocomplete || !inputRef.current) {
        attempts++;
        if (attempts < MAX) window.setTimeout(bind, 300);
        return;
      }

      acRef.current = new Autocomplete(inputRef.current, {
        fields: ["formatted_address", "geometry", "address_components"],
        componentRestrictions: { country: "ar" },
        types: ["address"],
      });

      acRef.current.addListener("place_changed", () => {
        const place = acRef.current?.getPlace();
        const addr  = place?.formatted_address ?? inputRef.current?.value ?? "";
        const lat   = place?.geometry?.location?.lat();
        const lng   = place?.geometry?.location?.lng();
        const provincia = place?.address_components?.find(c => c.types.includes("administrative_area_level_1"))?.long_name;
        onChange(addr);
        onPlaceSelect?.(addr, lat, lng, provincia);
      });

      bound.current = true;
    };

    bind();
  }, [onChange, onPlaceSelect]);

  // Cargar SDK si no está cargado
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!PLACES_KEY) return;
    if ((window as GWin).google?.maps?.places) return;
    if (document.getElementById("gplaces-sdk")) return;
    const s = document.createElement("script");
    s.id  = "gplaces-sdk";
    s.src = `https://maps.googleapis.com/maps/api/js?key=${PLACES_KEY}&libraries=places&loading=async&language=es&region=AR`;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  return (
    <div style={{ position: "relative", ...style }}>
      <MapPin
        size={18}
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#00b3a6",
          pointerEvents: "none",
        }}
      />
      <input
        ref={inputRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        style={{
          width: "100%",
          background: bg,
          border: `1px solid ${border}`,
          borderRadius: 14,
          padding: "14px 14px 14px 44px",
          color: textCol,
          fontSize: 15,
          outline: "none",
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}
