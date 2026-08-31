"use client";

import { useEffect, useRef } from "react";

type Props = { lat: number; lng: number; height?: number };

declare global {
  interface Window {
    L?: {
      map: (el: HTMLElement, opts?: object) => LeafletMap;
      tileLayer: (url: string, opts?: object) => LeafletLayer;
      marker: (latlng: [number, number], opts?: object) => LeafletMarker;
      divIcon: (opts: object) => object;
    };
  }
}
interface LeafletMap    { setView: (c: [number, number], z: number) => LeafletMap; addLayer: (l: LeafletLayer | LeafletMarker) => void; remove: () => void; }
interface LeafletLayer  { addTo: (m: LeafletMap) => void; }
interface LeafletMarker { addTo: (m: LeafletMap) => void; }

export default function MapView({ lat, lng, height = 180 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const init = () => {
      const L = window.L;
      if (!L || !containerRef.current) return;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }

      const map = L.map(containerRef.current, { zoomControl: false, attributionControl: true, dragging: false, scrollWheelZoom: false });
      map.setView([lat, lng], 15);

      // OpenStreetMap no requiere una API key. El filtro conserva el estilo oscuro.
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        className: "docya-dark-map-tiles",
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Marcador teal personalizado
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:32px;height:32px;border-radius:999px 999px 999px 4px;background:#00b3a6;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,179,166,0.5);transform:rotate(-45deg)"></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      L.marker([lat, lng], { icon }).addTo(map);

      mapRef.current = map;
    };

    if (window.L) {
      init();
    } else {
      // Cargar Leaflet CSS + JS
      if (!document.getElementById("leaflet-css")) {
        const css = document.createElement("link");
        css.id = "leaflet-css"; css.rel = "stylesheet";
        css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(css);
      }
      if (!document.getElementById("leaflet-js")) {
        const js = document.createElement("script");
        js.id = "leaflet-js";
        js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        js.onload = init;
        document.head.appendChild(js);
      } else {
        const check = setInterval(() => { if (window.L) { clearInterval(check); init(); } }, 100);
      }
    }

    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, [lat, lng]);

  return (
    <div className="docya-location-map" style={{ marginTop: 14, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,179,166,0.2)", height }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      <style jsx global>{`
        .docya-location-map .docya-dark-map-tiles {
          filter: brightness(0.55) invert(1) contrast(1.35) hue-rotate(180deg) saturate(0.65);
        }
        .docya-location-map .leaflet-control-attribution {
          background: rgba(3, 20, 26, 0.72);
          color: rgba(255, 255, 255, 0.65);
          font-size: 8px;
        }
        .docya-location-map .leaflet-control-attribution a { color: #5eead4; }
      `}</style>
    </div>
  );
}
