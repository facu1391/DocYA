// src/components/referidos/landing/MapLeaflet.tsx
"use client";

import { useEffect, useRef } from "react";
import type * as Leaflet from "leaflet";

const MARKERS = [
  { lat: -34.6037, lng: -58.3816, label: "CABA / GBA", active: true },
  { lat: -32.9442, lng: -60.6505, label: "Rosario", active: false },
  { lat: -31.4135, lng: -64.1811, label: "Córdoba", active: false },
  { lat: -32.8908, lng: -68.8272, label: "Mendoza", active: false },
  { lat: -26.8083, lng: -65.2176, label: "Tucumán", active: false },
];

type LeafletIconDefaultWithPrototype = typeof Leaflet.Icon.Default & {
  prototype: {
    _getIconUrl?: unknown;
  };
};

export default function MapLeaflet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current || !containerRef.current) return;
    mountedRef.current = true;

    let map: Leaflet.Map | null = null;

    async function init() {
      const L = await import("leaflet");

      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      const DefaultIcon = L.Icon.Default as LeafletIconDefaultWithPrototype;
      delete DefaultIcon.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!containerRef.current) return;

      map = L.map(containerRef.current, {
        center: [-34.6, -58.8],
        zoom: 5,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19, opacity: 0.45 }
      ).addTo(map);

      L.circle([-34.6037, -58.3816], {
        radius: 35000,
        color: "#14b8a6",
        fillColor: "#14b8a6",
        fillOpacity: 0.1,
        weight: 1.5,
        opacity: 0.6,
      }).addTo(map);

      MARKERS.forEach((marker) => {
        if (!map) return;

        const m = L.marker([marker.lat, marker.lng]).addTo(map);
        m.bindTooltip(marker.label, {
          permanent: false,
          direction: "top",
          offset: [0, -14],
          className: "leaflet-docya-tooltip",
        });
      });
    }

    void init();

    return () => {
      if (map) map.remove();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}