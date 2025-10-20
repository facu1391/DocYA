
import Link from "next/link";
import { AlertTriangle, Clock, CreditCard, MessageSquareWarning, ShieldCheck } from "lucide-react";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata = {
  title: "Términos y Condiciones",
  description: "Condiciones para el uso de la app DocYa por parte de pacientes en Argentina.",
  alternates: { canonical: "/legal/pacientes/terminos" },
  openGraph: {
    title: "Términos y Condiciones",
    description: "Reglas claras para usar DocYa como paciente o familiar.",
    url: "/legal/pacientes/terminos",
    type: "article",
  },
};

export default function Page() {
  const toc = [
    { id: "servicio", label: "1. Qué ofrece DocYa" },
    { id: "alcance", label: "2. Alcance y elegibilidad" },
    { id: "cuenta", label: "3. Cuenta y uso responsable" },
    { id: "solicitudes", label: "4. Solicitudes y tiempos" },
    { id: "precios", label: "5. Precios, pagos y reembolsos" },
    { id: "responsabilidad", label: "6. Responsabilidad" },
    { id: "conducta", label: "7. Conducta y prohibiciones" },
    { id: "calificaciones", label: "8. Calificaciones" },
    { id: "propiedad", label: "9. Propiedad intelectual" },
    { id: "cambios", label: "10. Cambios y jurisdicción" },
    { id: "contacto", label: "11. Contacto" },
  ];

  return (
    <LegalLayout
      title="Términos y Condiciones — DocYa (Público)"
      subtitle="Reglas claras para usar DocYa como paciente o familiar."
      lastUpdate="27/09/2025"
      toc={toc}
    >
      {/* Resumen importante */}
      <div className="glass border rounded-2xl p-4 md:p-5 flex items-start gap-3 not-prose">
        <ShieldCheck className="h-5 w-5 text-[var(--brand)] mt-0.5" />
        <p className="text-sm text-muted-foreground">
          DocYa conecta pacientes con profesionales de la salud para <strong>atención a domicilio</strong>.
          No es un servicio de emergencias ni reemplaza la relación profesional–paciente.
        </p>
      </div>

      <h2 id="servicio" className="scroll-mt-24">1. Qué ofrece DocYa</h2>
      <p>
        DocYa es un intermediario tecnológico que facilita el encuentro entre pacientes y
        profesionales independientes (médicos/as y enfermeros/as). Gestionamos la asignación,
        comunicaciones y cobro, pero <strong>no prestamos servicios médicos</strong>.
      </p>

      <h2 id="alcance" className="scroll-mt-24">2. Alcance y elegibilidad</h2>
      <ul>
        <li>El servicio está destinado a personas mayores de 18 años. Para menores, debe solicitarlo un adulto responsable presente en el domicilio.</li>
        <li>La cobertura es por zonas habilitadas y puede variar.</li>
      </ul>

      <h2 id="cuenta" className="scroll-mt-24">3. Cuenta y uso responsable</h2>
      <ul>
        <li>Debés brindar datos veraces y mantenerlos actualizados.</li>
        <li>Usá la app de forma respetuosa; no aceites prácticas ilícitas ni presiones al profesional.</li>
      </ul>

      <h2 id="solicitudes" className="scroll-mt-24">4. Solicitudes y tiempos</h2>
      <div className="surface rounded-xl p-4 not-prose flex items-start gap-3 my-4">
        <Clock className="h-5 w-5 text-[var(--brand)] mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Los tiempos mostrados son <strong>estimados</strong> y pueden variar por tránsito, distancia y disponibilidad.
          Podés cancelar antes de que el profesional esté en camino sin costo.
        </p>
      </div>

      <h2 id="precios" className="scroll-mt-24">5. Precios, pagos y reembolsos</h2>
      <ul>
        <li>Verás el precio total antes de confirmar. Los montos pueden actualizarse y se informan en la app.</li>
        <li>Los pagos se procesan de forma segura; recibirás comprobantes digitales.</li>
        <li>Si el profesional no puede completar la atención por causas ajenas al paciente, se evaluará reembolso o reprogramación.</li>
      </ul>
      <div className="surface rounded-xl p-4 not-prose flex items-start gap-3 my-4">
        <CreditCard className="h-5 w-5 text-[var(--brand)] mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Medicación, estudios y materiales no están incluidos salvo que se indique expresamente.
        </p>
      </div>

      <h2 id="responsabilidad" className="scroll-mt-24">6. Responsabilidad</h2>
      <p>
        El/la profesional es responsable por la atención brindada. DocYa no asume responsabilidad por diagnósticos
        o resultados clínicos. En urgencias o síntomas graves, comunicarse con el <strong>911</strong> o con el
        servicio de emergencias de tu cobertura.
      </p>
      <div className="surface border-l-4 rounded-r-xl p-4 not-prose my-6" style={{ borderColor: "var(--brand)" }}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-[var(--brand)] mt-0.5" />
          <p className="text-sm text-muted-foreground">
            DocYa no atiende emergencias. Si hay riesgo vital, llamá al 911 inmediatamente.
          </p>
        </div>
      </div>

      <h2 id="conducta" className="scroll-mt-24">7. Conducta y prohibiciones</h2>
      <ul>
        <li>Prohibido hostigar, discriminar, ofrecer pagos fuera de la app o solicitar actos contrarios a la ética.</li>
        <li>Podemos suspender cuentas ante incumplimientos o fraudes.</li>
      </ul>

      <h2 id="calificaciones" className="scroll-mt-24">8. Calificaciones</h2>
      <p>Podrás calificar la atención. Las reseñas deben ser honestas y respetuosas.</p>

      <h2 id="propiedad" className="scroll-mt-24">9. Propiedad intelectual</h2>
      <p>La app, marcas y contenidos son propiedad de DocYa o sus licenciantes. No se concede licencia distinta al uso de la app.</p>

      <h2 id="cambios" className="scroll-mt-24">10. Cambios y jurisdicción</h2>
      <p>
        Podemos actualizar estos términos. Se rigen por las leyes de la República Argentina;
        fuero: Ciudad Autónoma de Buenos Aires.
      </p>

      <h2 id="contacto" className="scroll-mt-24">11. Contacto</h2>
      <p>Consultas legales: <a href="mailto:soporte@docya.com.ar">soporte@docya.com.ar</a></p>

      <hr />
      <div className="not-prose flex flex-wrap items-center gap-3">
        <Link href="/legal/pacientes/privacidad" className="btn-outline-primary">Ver Privacidad</Link>
        <Link href="#descargar" className="btn-primary">Descargar app</Link>
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <MessageSquareWarning className="h-4 w-4" />
          <span>Soporte ante cualquier inconveniente.</span>
        </div>
      </div>
    </LegalLayout>
  );
}
