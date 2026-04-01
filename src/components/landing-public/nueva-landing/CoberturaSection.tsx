// src/components/landing-public/nueva-landing/CoberturaSection.tsx
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import CoberturaDynamic from "./CoberturaDynamic";

type Zona = {
  id: number;
  nombre: string;
  detalle: string;
};

async function getZonas(): Promise<{ activas: Zona[]; proximas: Zona[] }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/zonas-cobertura`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error("Error fetching zonas");
    }

    return res.json();
  } catch {
    return { activas: [], proximas: [] };
  }
}

export default async function CoberturaSection() {
  const { activas, proximas } = await getZonas();

  return (
    <section id="cobertura" className="py-32">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <ScrollReveal>
          <div className="relative mx-auto" style={{ maxWidth: 380 }}>
            <div className="glass-card rounded-3xl p-0" style={{ position: "relative" }}>
              <Image
                src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774897108/Dise%C3%B1o_sin_t%C3%ADtulo_25_fyhkln.png"
                alt="Mapa de Cobertura DocYa"
                width={380}
                height={520}
                className="h-auto w-full rounded-3xl"
              />
            </div>

            <CoberturaDynamic />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="section-title mb-4">
            Dónde estamos{" "}
            <span className="highlight-text">disponibles</span>
          </h2>

          <p className="text-text-muted mb-8 text-xl leading-relaxed">
            Hoy operamos en Buenos Aires y alrededores. Estamos creciendo rápido.
          </p>

          <div className="mb-4 flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "#0AE6C7", boxShadow: "0 0 10px #0AE6C7" }}
            />
            <h4 className="text-lg font-bold">DISPONIBLE AHORA</h4>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {activas.map((zona) => (
              <div
                key={zona.id}
                className="glass-card p-5"
                style={{ borderColor: "rgba(10, 230, 199, 0.18)" }}
              >
                <h5 className="mb-1 font-bold">{zona.nombre}</h5>
                <p className="text-text-muted m-0 text-xs">{zona.detalle}</p>
              </div>
            ))}
          </div>

          <div className="mb-4 flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.45)" }}
            />
            <h4 className="text-text-muted text-lg font-bold">PRÓXIMAMENTE</h4>
          </div>

          <div className="mb-8 flex flex-wrap gap-3 opacity-60">
            {proximas.map((zona) => (
              <span key={zona.id} className="badge text-sm">
                {zona.nombre}
              </span>
            ))}
          </div>

          <div
            className="rounded-r-2xl px-6 py-5"
            style={{
              background: "rgba(0, 210, 255, 0.08)",
              borderLeft: "4px solid #0AE6C7",
            }}
          >
            <p className="m-0 text-base leading-relaxed">
              ¿Querés que lleguemos a tu ciudad?
              <br />
              <strong>
                <a href="#" style={{ color: "var(--primary)" }} className="hover:underline">
                  Sumate como embajador y ayudanos a expandir DocYa.
                </a>
              </strong>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}