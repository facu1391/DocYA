// src/components/landing-public/nueva-landing/GeoSection.tsx
import Image from "next/image";
import { CheckCircle2, MapPin, Clock, Smartphone } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  { icon: CheckCircle2, label: "Asignación automática" },
  { icon: MapPin, label: "Geolocalización en tiempo real" },
  { icon: Clock, label: "Menor tiempo de llegada" },
  { icon: Smartphone, label: "Experiencia simple, rápida y moderna" },
];

export default function GeoSection() {
  return (
    <section id="geolocalizacion" className="dark-section py-32">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <ScrollReveal delay={0.1}>
          <h2 className="section-title mb-4">
            El médico más cercano,{" "}
            <span className="highlight-text">directo a tu domicilio</span>
          </h2>

          <p className="text-text-muted mb-8 text-xl leading-relaxed">
            DocYa utiliza geolocalización inteligente para ubicar al profesional disponible
            más cercano a tu domicilio y asignarlo automáticamente, reduciendo tiempos de
            espera y mejorando la rapidez de atención.
          </p>

          <ul className="flex flex-col gap-5">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-4 text-lg font-medium">
                <Icon size={24} style={{ color: "var(--accent)" }} className="shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="glass-card w-full overflow-hidden rounded-[20px] p-0"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774879044/Captura_de_pantalla_2026-03-30_105623_lkgxo2.png"
              alt="Mapa seguimiento médico"
              width={600}
              height={338}
              className="h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}