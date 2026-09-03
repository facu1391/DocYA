"use client";

import { useEffect, useRef, useState } from "react";

type Props = { lat: number; lng: number; height?: number };

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

const DOCYA_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#102a31" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9bb4b8" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#102a31" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#31535a" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#16383e" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#7fa5a7" }] },
  { featureType: "poi.business", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#24454c" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#18343a" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#c3d4d5" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#237e78" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#175c59" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#1a3940" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#071f29" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#4f8994" }] },
];

function waitForGoogleMaps(onReady: () => void, onUnavailable: () => void) {
  if (window.google?.maps?.Map) {
    onReady();
    return () => undefined;
  }

  if (!MAPS_KEY) {
    onUnavailable();
    return () => undefined;
  }

  if (!document.getElementById("gplaces-sdk")) {
    const script = document.createElement("script");
    script.id = "gplaces-sdk";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places&loading=async&language=es&region=AR`;
    script.async = true;
    document.head.appendChild(script);
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    if (window.google?.maps?.Map) {
      window.clearInterval(timer);
      onReady();
    } else if (++attempts >= 50) {
      window.clearInterval(timer);
      onUnavailable();
    }
  }, 200);

  return () => window.clearInterval(timer);
}

export default function MapView({ lat, lng, height = 180 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const position = { lat, lng };

    const renderMap = () => {
      if (!containerRef.current) return;
      setUnavailable(false);

      if (!mapRef.current) {
        mapRef.current = new window.google.maps.Map(containerRef.current, {
          center: position,
          zoom: 15,
          styles: DOCYA_MAP_STYLES,
          backgroundColor: "#102a31",
          disableDefaultUI: true,
          clickableIcons: false,
          gestureHandling: "none",
          keyboardShortcuts: false,
        });

        markerRef.current = new window.google.maps.Marker({
          map: mapRef.current,
          position,
          title: "Tu ubicación",
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#00b3a6",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 4,
            scale: 11,
          },
        });
      } else {
        mapRef.current.setCenter(position);
        markerRef.current?.setPosition(position);
      }
    };

    return waitForGoogleMaps(renderMap, () => setUnavailable(true));
  }, [lat, lng]);

  return (
    <div
      className="docya-location-map"
      aria-label="Mapa de tu ubicación"
      style={{
        position: "relative",
        marginTop: 14,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid rgba(0,179,166,0.28)",
        background: "#102a31",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.025)",
        height,
      }}
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {unavailable && (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: 20, color: "#9bb4b8", background: "#102a31", textAlign: "center", fontSize: 13 }}>
          Vista previa del mapa no disponible
        </div>
      )}
    </div>
  );
}
