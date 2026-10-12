# DocYa IA pública: implementación simple

Actualizado el 12/10/2026 según la instrucción del usuario de simplificar los controles.

La landing reutiliza `PedirAsistente` mediante un adaptador público. Los valores
por defecto y la ruta `/chat-ia` del paciente registrado conservan su comportamiento.
El nuevo ingreso `/chat-ia/public/message` utiliza el mismo modelo, conocimiento,
tarifas e implementación de respuesta. Agrega un contexto de alcance limitado a
preguntas sobre los servicios y funcionamiento de DocYa.

## Controles del backend

- 10 solicitudes por minuto por IP; configurable mediante
  `CHAT_IA_PUBLIC_REQUESTS_PER_MINUTE`.
- Contador atómico PostgreSQL compartido entre réplicas, con expiración de dos
  minutos. La dirección IP se transforma en HMAC con ventana temporal y no se guarda.
- Hasta 8 mensajes de contexto, 1200 caracteres por mensaje y 512 tokens de salida.
- Contexto total (sistema + mensajes) de hasta 20000 bytes UTF-8.
- El endpoint no utiliza Authorization, cookies ni credenciales de pacientes.
- No dispone de herramientas privadas, acceso a historias clínicas ni documentos.
- Las métricas existentes reciben sólo identificadores anónimos y consumo, nunca
  el contenido de las conversaciones. Ante indisponibilidad de los contadores se
  rechaza la solicitud pública; el chat registrado sigue independiente.

No hay CAPTCHA, Turnstile, registro obligatorio, cuota total por visitante ni
presupuesto global. El límite de frecuencia es temporal: tras esperar puede
continuarse la conversación. No requiere nuevas claves ni servicios externos.

En Railway se usa X-Real-IP, sobrescrito con la IP remota del cliente por el proxy
perimetral. En otros despliegues se usa request.client; su proxy debe configurarse
para entregar una dirección de cliente fiable, sin aceptar encabezados arbitrarios.

El modo público no brinda evaluación clínica. Explica servicios, precios, cobertura,
recetas, certificados y órdenes según evaluación y criterio del profesional.
Si se mencionan señales de emergencia mantiene la indicación de emergencias.
Los botones llevan a los flujos actuales /pedir y /pedir?tipo=teleconsulta.
