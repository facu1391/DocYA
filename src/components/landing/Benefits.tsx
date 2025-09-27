
const items = [
  { t: "Ganá más en menos tiempo", d: "Ingresos por consulta y acreditación semanal." },
  { t: "Horarios flexibles", d: "Elegís cuándo y dónde estar disponible." },
  { t: "Sin trámites", d: "Nosotros nos ocupamos de la logística." },
  { t: "Reputación online", d: "Más estrellas = más consultas." },
  { t: "Recetas/certificados digitales", d: "Emití desde la plataforma." },
];

export default function Benefits() {
  return (
    <section className="container py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">Beneficios exclusivos</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.t} className="rounded-2xl border p-6">
            <h3 className="text-lg font-semibold">{it.t}</h3>
            <p className="text-sm text-muted-foreground mt-2">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
