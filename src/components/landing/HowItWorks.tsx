
const pasos = [
  "El paciente solicita atención desde la app.",
  "Se descartan urgencias graves (911).",
  "Asignación automática al profesional más cercano.",
  "Ves la ubicación en tiempo real.",
  "Atendés y podés pedir soporte de enfermería.",
  "Cobrás desde la app (acreditación semanal).",
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="container py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">¿Cómo funciona?</h2>
      <ol className="mt-8 grid md:grid-cols-3 gap-6">
        {pasos.map((p, i) => (
          <li key={i} className="rounded-2xl border p-6">
            <span className="text-3xl font-bold">{i + 1}</span>
            <p className="mt-3 text-sm text-muted-foreground">{p}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
