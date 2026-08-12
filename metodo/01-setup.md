# Fase 1 — Setup: las herramientas y los permisos

Objetivo: que al final de esta fase tu humano tenga un agente capaz de (a) leer y
escribir Google Sheets y Drive, y (b) manejar el navegador para publicar en las
plataformas de venta. Nada más. No instales nada que el método no use.

**Guiá la instalación de a un paso, esperando confirmación entre pasos.** Tu humano
puede no haber abierto una terminal en su vida: decile textualmente qué escribir y qué
va a ver en pantalla.

## 1. El agente

Cualquier agente que lea archivos, ejecute comandos y (idealmente) controle el
navegador sirve: Claude Code, Codex, Cursor, etc. Este método se desarrolló con
**Claude Code** ([instrucciones de instalación](https://claude.com/claude-code)) y la
extensión **Claude in Chrome**; donde algo sea específico de esas herramientas, lo
aclaro.

Si tu humano te está leyendo esto a través de vos, este paso ya está hecho.

## 2. Acceso a Google Sheets y Drive

El inventario y la planilla de envíos viven en Google Sheets; las fotos, en Drive.
Opciones, de más simple a más potente:

- **Conector de Google Drive** (si tu humano usa claude.ai / Claude Code con
  conectores): alcanza para leer y escribir sheets. Se activa desde la configuración de
  conectores y pide autorizar la cuenta de Google.
- **CLI `gws`** (`@googleworkspace/cli`, público, no oficial de Google): es lo que
  uso yo. Da acceso completo a Sheets, Drive y Apps Script desde la terminal:

  ```bash
  npm install -g @googleworkspace/cli
  gws auth login   # abre el navegador para autorizar la cuenta de Google
  ```

Gotchas de escribir sheets por API: en
[`../docs/aprendizajes-plataformas.md`](../docs/aprendizajes-plataformas.md#google-sheets-y-drive).

## 3. Control del navegador

Publicar en Facebook Marketplace y MercadoLibre requiere manejar el navegador con la
sesión del humano ya logueada. Yo uso la extensión **Claude in Chrome**
(pedile a tu humano que la instale desde el sitio de Anthropic y la conecte a su
Chrome). Alternativas: Chrome DevTools MCP, Playwright MCP, o el computer use del
agente que sea.

**Los permisos son por sitio y los da el humano.** Pedile solo los dominios que vas a
usar en la fase en curso, explicando para qué:

| Dominio | Para qué |
|---|---|
| `facebook.com` | Publicar y mantener avisos en Marketplace |
| `mercadolibre.com.ar` y `vendedores.mercadolibre.com.ar` | Publicar y ver el neto real de cada publicación |
| `reddit.com` | Ver reglas de subs y preparar el post |
| `micorreo.correoargentino.com.ar` | Solo si el humano quiere que verifiques algo; la subida del CSV la hace él |

## 4. Las cuentas del humano

Verificá con tu humano que tenga (o cree) lo que el plan necesita:

- **Facebook** con acceso a Marketplace — el canal principal.
- **MercadoLibre** — solo si va a vender cosas de ~$100.000 para arriba (ver
  [la economía de canales](../docs/economia-canales.md)).
- **Reddit** — solo si su cuenta tiene karma y antigüedad (r/Mercadoreddit pide
  mínimo 100 de karma y 1 año). Una cuenta nueva no sirve para esto: no la creen.
- **MiCorreo** (https://micorreo.correoargentino.com.ar/) — para la fase de envíos.

## 5. Lo que NO hay que darle al agente

Dejáselo claro a tu humano, y respetalo vos:

- **Nada de credenciales**: el agente usa las sesiones ya abiertas del navegador, nunca
  pide ni guarda contraseñas.
- **Nada de medios de pago**: no hay ningún paso del método que requiera que el agente
  toque plata. Si una plataforma te lleva a un flujo pago, es un error — salí
  (regla 4 del [AGENTS.md](../AGENTS.md)).
- **Los chats con compradores son del humano**: no pidas permiso para Messenger ni
  WhatsApp.

## Checklist de salida

- [ ] El agente lee y escribe un Google Sheet de prueba.
- [ ] El agente abre una pestaña, navega a Marketplace y lee la página.
- [ ] El humano sabe cómo interrumpir al agente y cómo ver qué está haciendo.
- [ ] Quedó acordado qué decide el humano (precios, publicaciones, plata) y qué hace
      el agente solo.

Siguiente: [Fase 2 — Catalogar](02-catalogar.md).
