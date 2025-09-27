
// src/app/legal/terminos/page.tsx
export default function Terminos() {
  return (
    <main className="container mx-auto px-4 py-16 prose prose-neutral dark:prose-invert max-w-3xl">
      <h1>Términos y Condiciones — DocYa Pro</h1>
      <p><strong>Última actualización:</strong> 27/09/2025</p>

      <p>
        Bienvenido/a a <strong>DocYa Pro</strong>. Al registrarte y utilizar la plataforma,
        aceptás estos términos y condiciones.
      </p>

      <h2>1. Objeto del servicio</h2>
      <p>
        DocYa Pro es una plataforma que conecta profesionales de la salud (médicos y
        enfermeros) con pacientes que solicitan atención a domicilio. Facilitamos la
        vinculación, logística de asignación y procesamiento de pagos, pero <strong>no
        prestamos servicios médicos</strong> ni sustituimos la relación profesional–paciente.
      </p>

      <h2>2. Requisitos del profesional</h2>
      <ul>
        <li>Ser mayor de edad y poseer matrícula profesional habilitante en Argentina.</li>
        <li>Brindar datos verídicos y mantenerlos actualizados.</li>
        <li>Cumplir la normativa sanitaria y estándares éticos aplicables.</li>
      </ul>

      <h2>3. Funcionamiento y pagos</h2>
      <ul>
        <li>El paciente abona <strong>$30.000 ARS</strong> por consulta.</li>
        <li>Comisión DocYa: <strong>20%</strong>.</li>
        <li>Ingreso neto del profesional: <strong>$24.000 ARS</strong> por consulta.</li>
        <li>Acreditación semanal en la cuenta informada por el profesional.</li>
      </ul>

      <h2>4. Responsabilidad</h2>
      <p>
        El/la profesional es responsable exclusivo/a de la atención brindada. DocYa Pro no
        asume responsabilidad por diagnósticos, tratamientos o resultados. Ante urgencias
        graves, el paciente debe comunicarse con el <strong>911</strong> u otro servicio de
        emergencias.
      </p>

      <h2>5. Conducta y suspensión</h2>
      <p>
        DocYa Pro podrá suspender o dar de baja cuentas por incumplimientos, fraudes, uso
        indebido, o calificaciones reiteradamente negativas, sin derecho a indemnización.
      </p>

      <h2>6. Modificaciones</h2>
      <p>
        Podemos actualizar estos términos. El uso continuado de la plataforma implica la
        aceptación de las nuevas condiciones.
      </p>

      <h2>7. Jurisdicción y ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la República Argentina. Para cualquier
        conflicto, será competente la justicia ordinaria de la Ciudad Autónoma de Buenos Aires.
      </p>

      <h2>8. Contacto</h2>
      <p>
        Consultas legales: <a href="mailto:soporte@docya.com.ar">soporte@docya.com.ar</a>
      </p>

      <hr />
      <p className="text-sm text-muted-foreground">
        <em>Este texto es un borrador orientativo y no reemplaza asesoría legal profesional.</em>
      </p>
    </main>
  );
}

