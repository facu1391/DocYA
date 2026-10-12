# Acceso público de DocYa IA: cambios mínimos propuestos

Estado: el usuario decidió dejar el chat público pendiente el 12/10/2026; el launcher público no se habilita hasta
contar con protección del backend. No se modifica el chat del paciente registrado.

Reutilizar el prompt, conocimiento, modelo y función existentes de `/chat-ia`.
El visitante no recibe ni usa credenciales de pacientes. No hay acceso a historias
clínicas, consultas individuales ni datos privados.

Agregar un ingreso público separado con controles previos a invocar el mismo chat:
- sesión anónima firmada y de corta duración, emitida sólo tras desafío antibot;
- validación del desafío en servidor, por ejemplo Cloudflare Turnstile;
- límites persistentes por sesión y por origen de red (hash temporal, nunca IP
  cruda), para que cambiar el UUID del navegador no eluda el control;
- 5 solicitudes/minuto, 20 mensajes/día por visitante; límites configurables;
- tope global diario configurable, bloqueo sin invocar al proveedor al agotarse;
- máximo 8 mensajes de historial, 1.200 caracteres por mensaje y 512 tokens
  de salida; reutilizar reglas de emergencia e instrucciones actuales;
- conservar sólo contadores, identificadores pseudónimos y consumo; no mensajes;
- si el proveedor o el control no están disponibles, informar y ofrecer WhatsApp.

El chat privado conserva su ruta y comportamiento actuales. Las métricas ya
existentes pueden recibir los eventos del ingreso público sin conservar contenido.
Para producción se requieren las claves del desafío y la configuración de los
límites. Ningún secreto se incluye en código cliente.
