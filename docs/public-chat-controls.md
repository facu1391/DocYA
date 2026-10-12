# Acceso público de DocYa IA: cambios mínimos propuestos

Estado: nuevo pedido del 12/10/2026. Autorización para los controles de backend
solicitada y pendiente. La sección visual está preparada en `PublicAISection.tsx`,
pero no se incorpora a la landing ni se habilita el acceso hasta contar con
protección del backend. No se modifica el chat del paciente registrado.

Reutilizar el prompt, conocimiento, modelo y función existentes de `/chat-ia`.
El visitante no recibe ni usa credenciales de pacientes. No hay acceso a historias
clínicas, consultas individuales ni datos privados.

Agregar un ingreso público separado con controles previos a invocar el mismo chat:
- sesión anónima firmada y de corta duración, emitida sólo tras desafío antibot;
- validación del desafío en servidor, por ejemplo Cloudflare Turnstile;
- límites persistentes por sesión y por origen de red (hash temporal, nunca IP
  cruda), para que cambiar el UUID del navegador no eluda el control;
- hasta 5 mensajes por sesión anónima, configurable desde backend;
- límites de frecuencia por sesión y red, tolerantes a redes compartidas;
- tope global diario configurable, bloqueo sin invocar al proveedor al agotarse;
- máximo 8 mensajes de historial, 1.200 caracteres por mensaje y 512 tokens
  de salida; reutilizar reglas de emergencia e instrucciones actuales;
- conservar sólo contadores, identificadores pseudónimos y consumo; no mensajes;
- si el proveedor o el control no están disponibles, informar y ofrecer WhatsApp.

El chat privado conserva su ruta y comportamiento actuales. Las métricas ya
existentes pueden recibir los eventos del ingreso público sin conservar contenido.
Para producción se requieren las claves del desafío y la configuración de los
límites. Ningún secreto se incluye en código cliente.

El control de presupuesto debe reservar el costo máximo de cada solicitud antes
de invocar al proveedor, de forma atómica, para que solicitudes concurrentes no
superen el límite. Los contadores deben persistir entre reinicios y réplicas.
La clave de firma y las claves antibot se configuran en producción. Si faltan,
el acceso público debe permanecer cerrado.

El modo público no debe leer tokens de pacientes del navegador. Sus acciones
redirigen a los flujos actuales `/pedir` y `/pedir?tipo=teleconsulta`; no puede
seleccionar médicos, emitir documentos ni acceder a datos privados.
