
export default function Requirements() {
  return (
    <section className="container py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">Requisitos y zonas</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6">
          <h3 className="font-semibold">¿A quién buscamos?</h3>
          <ul className="list-disc ml-5 mt-3 text-sm text-muted-foreground space-y-2">
            <li>Médicos jóvenes, residentes o con experiencia.</li>
            <li>Enfermeros con ganas de flexibilidad e ingresos extra.</li>
            <li>Vocación por atención domiciliaria y trato cercano.</li>
          </ul>
        </div>
        <div className="rounded-2xl border p-6">
          <h3 className="font-semibold">Zonas de inicio</h3>
          <p className="text-sm text-muted-foreground mt-2">
            CABA (Palermo y Belgrano). Próxima expansión a más barrios y provincias.
          </p>
        </div>
      </div>
    </section>
  );
}
