# Verificación de Google Ads en pacientes

Implementación preparada para el push autorizado, manteniendo flags apagados; sin migración ni activación productiva. ID fijo `AW-18548149251`; label oficial de Compra (1), recibido del titular el 2/11/2026: `8vk7COvc2bAdEIOYuYxF`. El backend lo tiene como predeterminado, con flags de medición/exportación apagados. Configuración/tablas/endpoints y límites: `DOCYA-RAILWAY-main/docs/google-ads-measurement.md` en el repositorio hermano. Monitoreo incluye la pantalla administrativa de lectura Marketing → Google Ads.

## Qué verificar antes de habilitar

1. Ejecutar frontend y API de staging con `NEXT_PUBLIC_MARKETING_ENABLED=true` y `MARKETING_TRACKING_ENABLED=true`, tras aprobar y aplicar el SQL **en staging**. Mantener `MARKETING_GOOGLE_EXPORT_APPROVED=false`; el label oficial ya está configurado, pero ese flag bloquea los eventos.
2. Abrir una sesión nueva. Sin elegir y luego al rechazar: Network sin `googletagmanager.com/gtag/js`, sin solicitudes a Google Ads ni `/marketing/visits`. Navegar y pedir atención debe seguir disponible.
3. En una landing pública, la franja se ve debajo del encabezado, dentro del contenido y sin superponerse. Cerrar con X no acepta: no carga Google y no insiste al recargar durante esa sesión. Rechazar queda recordado. En el pie y en Privacidad → Cookies, “Preferencias de privacidad” permite cambiar de elección. No debe aparecer automáticamente al entrar directo a `/pedir` o pantallas privadas.
4. Aceptar: una etiqueta AW, consentimiento `ad_storage`/`ad_user_data` concedido, `analytics_storage`/`ad_personalization` denegado. La etiqueta está en el iframe neutral `/ads-measurement`, no en el documento del paciente. No se envía una conversión con exportación desactivada o label explícitamente vacío.
5. Retirar consentimiento: desaparece el iframe, se borra prueba/GCLID local y se revoca visita en backend. Probar con red caída y luego restaurada: se reintenta retiro sin conservar GCLID en la cola de revocación.

## Acción oficial y Tag Assistant

- La acción oficial recibida es Compra (1), destino `AW-18548149251/8vk7COvc2bAdEIOYuYxF`. Confirmar ARS y valor dinámico del cobro; el `1.0` y el ID vacío del ejemplo no se usan. Revisar recuento de todas las compras para consultas pagadas repetidas según el objetivo del negocio; no duplicar la misma acción mediante importación GA4/GTM.
- Abrir [Google Tag Assistant](https://tagassistant.google.com/) y conectar a la URL de staging autorizada. Inspeccionar también el iframe neutral. Verificar consentimiento, una sola carga AW y ausencia de eventos positivos antes del cobro.
- Con label oficial y envío habilitado **solo en staging**, usar medios de prueba de Mercado Pago: una preautorización no genera evento; captura real confirmada en el backend sí. Transferencia solo tras aprobación manual real; QR solo acreditado. No simular confirmaciones en producción ni cambiar estados productivos para esta prueba.
- La conversión debe incluir únicamente `send_to`, UUID de `transaction_id`, importe y `currency=ARS`, además de configuración neutral y datos técnicos normales del proveedor. Comprobar Network: sin URL del flujo clínico, referrer, datos personales, motivo, diagnóstico ni documentos. Nunca introducir información clínica en UTM.
- Recargar/reabrir: mismo UUID en reintentos; comprobar deduplicación en la acción de Google. El callback solo indica despacho; no prueba aceptación. Verificar también el informe de conversiones de Google, que puede tardar en actualizar.
- Probar atribución con una campaña/clic de prueba autorizado y GCLID válido: el iframe sin acceso a cookies del padre es una medida de aislamiento deliberada y puede limitar atribución de Google. **La compatibilidad y atribución efectiva están pendientes de esta prueba real**. Si Google necesita acceso incompatible con el aislamiento, mantener exportación deshabilitada y revisar arquitectura; no exponer el flujo clínico como solución rápida.
- Reembolsar en staging: el evento local pasa a reembolsado/neto cero; si fue despachado, requiere retractación. El envío de ajustes a Google aún no está implementado: no interpretar su informe como neto conciliado.

## Pruebas automatizadas reproducibles

```powershell
node --experimental-strip-types --test tests/marketing-measurement.test.mjs tests/patient-session.test.mjs tests/consultation-payment-state.test.mjs
npx tsc --noEmit
npx eslint src/lib/marketing/measurement.ts src/components/marketing/AdvertisingMeasurement.tsx src/app/ads-measurement/route.ts
```

Con Chrome y `puppeteer-core` ya disponibles, iniciar una vista local separada:

```powershell
$env:NEXT_PUBLIC_MARKETING_ENABLED='true'
$env:NEXT_PUBLIC_API_BASE='https://marketing-preview.invalid'
node node_modules/next/dist/bin/next dev --port 3131
# En otra terminal:
node tests/marketing-browser.cjs
```

El test intercepta API y proveedor; usa el label oficial sin enviar ningún evento a Google. Comprueba ausencia de medición sin consentimiento, cerrar sin aceptar, rechazo recordado, franja dentro del contenido, etiqueta única, aislamiento del DOM clínico, bloqueo sin configuración de envío, UUID estable, importe dinámico, revocación y ausencia de desbordamiento en móvil. No usar esta URL de API ficticia en una compilación destinada a publicar.

Para verificar compilación sin ejecutar el postbuild que regenera sitemap: `node node_modules/next/dist/bin/next build`. No publicar artefactos de QA con variables ficticias.

## Producción pendiente

Aprobación del usuario para migración y activación, validación real de etiqueta/atribución y revisión de políticas sanitarias. El label oficial ya está recibido/configurado y el push de código fue autorizado, manteniendo la medición apagada. Posteriormente integrar gasto real de Google Ads API y ajustes de reembolsos. El push no aplica SQL ni habilita flags.
