
// src/app/legal/privacidad/page.tsx
export default function Privacidad() {
  return (
    <main className="container mx-auto px-4 py-16 prose prose-neutral dark:prose-invert max-w-3xl">
      <h1>Política de Privacidad — DocYa Pro</h1>
      <p><strong>Última actualización:</strong> 27/09/2025</p>

      <p>
        En DocYa Pro protegemos tus datos personales conforme a la <strong>Ley 25.326</strong> de
        Protección de Datos Personales (Argentina). Esta política explica qué información
        recolectamos y cómo la usamos.
      </p>

      <h2>1. Datos que recolectamos</h2>
      <ul>
        <li>Identificación: nombre, apellido, DNI.</li>
        <li>Profesionales: matrícula, especialidad, zona de cobertura, disponibilidad.</li>
        <li>Contacto: email y teléfono.</li>
        <li>Pagos: datos bancarios necesarios para acreditaciones.</li>
        <li>Uso: métricas de actividad, calificaciones, registros de soporte.</li>
      </ul>

      <h2>2. Finalidades del tratamiento</h2>
      <ul>
        <li>Verificar identidad y credenciales profesionales.</li>
        <li>Asignar pacientes según disponibilidad y zona.</li>
        <li>Gestionar pagos, facturación y comprobantes.</li>
        <li>Mejorar la plataforma y prevenir fraudes.</li>
        <li>Comunicación operativa y de soporte.</li>
      </ul>

      <h2>3. Base legal</h2>
      <p>
        Tratamos datos con tu consentimiento, para ejecutar la relación contractual y en
        cumplimiento de obligaciones legales vigentes.
      </p>

      <h2>4. Conservación y seguridad</h2>
      <p>
        Almacenamos la información en servidores seguros aplicando medidas técnicas y
        organizativas para prevenir accesos no autorizados, pérdidas o alteraciones.
      </p>

      <h2>5. Cesión a terceros</h2>
      <p>
        No compartimos datos con terceros sin tu consentimiento, salvo por requerimientos
        legales o para procesar pagos y servicios estrictamente necesarios para operar la
        plataforma (bajo acuerdos de confidencialidad).
      </p>

      <h2>6. Derechos de las personas titulares</h2>
      <p>Podés ejercer los derechos de acceso, rectificación, actualización y supresión.</p>
      <p>
        Para hacerlo, escribinos a{" "}
        <a href="mailto:soporte@docya.com.ar">soporte@docya.com.ar</a>. Podremos solicitar
        validación de identidad antes de procesar el pedido.
      </p>

      <h2>7. Cookies y analíticas</h2>
      <p>
        Utilizamos cookies y herramientas de analítica para mejorar la experiencia. Podés
        configurar tu navegador para rechazarlas, aunque algunas funciones podrían verse
        afectadas.
      </p>

      <h2>8. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política. Publicaremos la versión vigente en este sitio,
        indicando la fecha de última actualización.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Consultas sobre privacidad:{" "}
        <a href="mailto:soporte@docya.com.ar">soporte@docya.com.ar</a>
      </p>

      <hr />
      <p className="text-sm text-muted-foreground">
        <em>Este texto es un borrador orientativo y no reemplaza asesoría legal profesional.</em>
      </p>
    </main>
  );
}
