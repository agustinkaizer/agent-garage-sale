# Dale a tu agente la capacidad de vender todo lo que tenés sin uso

*Read this in [English](README.en.md).*

Todos tenemos cosas juntando polvo en casa. Esta skill le enseña a tu agente de IA
(Claude, Codex, Cursor, el que uses) a vendértelas.

La armé vendiendo mis propias cosas: ~80 objetos, más de un millón de pesos vendido.
Las comisiones de cada canal las medí publicación por publicación, y los errores del
camino están escritos, porque son la parte que más enseña.

Qué le enseña a tu agente, por arriba:

- A armar el excel de inventario con tus productos desde fotos, con precios de
  referencia de mercado.
- A navegar Facebook Marketplace: publicar avisos, editarlos, renovarlos, marcar
  vendidos.
- A encontrar el subreddit indicado para lo que vendés, leer las reglas de cada sub
  para que no te baneen, y armar el post.
- A publicar en grupos de Facebook sin infringir sus reglas ni gatillar el filtro de
  spam.
- A decidir cuándo conviene MercadoLibre y a qué precio, con las comisiones reales de
  cada categoría.
- A usar Correo Argentino (MiCorreo) para generar envíos de a tandas: interpreta los
  datos que te manda cada comprador y arma el archivo que el portal acepta.
- Y más: qué permisos darle y cuáles no, cómo escribir avisos honestos, qué
  verificar antes de cada publicación.

No hace falta que sepas nada de IA: la skill está escrita para que la lea tu agente y
él te guíe a vos.

## Cómo empezar

Copiale esto a tu agente:

> Leé https://github.com/agustinkaizer/agent-garage-sale — empezá por el `AGENTS.md` — y
> guiame paso a paso para vender las cosas que tengo sin uso. Nunca usé estas
> herramientas: decime qué instalar y qué permisos dar, de a un paso por vez.

Tu agente lee la skill y te va llevando por las cuatro fases.

Si usás Claude Code, la podés dejar instalada (ver [`skill/`](skill/)) y arrancar
cuando quieras con `/agent-garage-sale`.

## Las cuatro fases

| Fase | Qué pasa | Guía |
|---|---|---|
| **1. Setup** | Tu agente te dice qué instalar (control del navegador, acceso a Google Sheets) y qué permisos darle — y cuáles no | [`metodo/01-setup.md`](metodo/01-setup.md) |
| **2. Catalogar** | Le sacás fotos a tus cosas; el agente arma el inventario en Google Sheets con precios de referencia | [`metodo/02-catalogar.md`](metodo/02-catalogar.md) |
| **3. Publicar** | Cada cosa va al canal que conviene según su precio; el agente redacta y carga los avisos, vos los aprobás | [`metodo/03-publicar.md`](metodo/03-publicar.md) |
| **4. Envíos** | Le reenviás al agente los datos que te pasa cada comprador; él arma el CSV de carga masiva que acepta MiCorreo | [`metodo/04-envios.md`](metodo/04-envios.md) |

## Lo que aprendí con plata real

Esto es lo que me funcionó a mí. No hay nada acá que necesite algo que vos no tengas.

- **Reddit fue donde más vendí.** Un solo post-catálogo en r/Mercadoreddit se
  viralizó y me trajo gente lista para comprar:
  [el post sigue vivo acá](https://www.reddit.com/r/Mercadoreddit/comments/1vlsjjz/).
- **Facebook Marketplace también vende** (5 ventas en esta tanda): 0% de comisión y
  retiro gratis.
- **Para ropa y zapatillas, el número uno indiscutido es
  [Extra](https://extra.com.ar/)**, la app argentina de ropa usada.
- **MercadoLibre solo de ~$100.000 para arriba.** Entre la comisión y el envío que
  pagás vos, en un producto de $50.000 tendrías que recargar +50% para no perder.
  Medido ítem por ítem en [`docs/economia-canales.md`](docs/economia-canales.md).
- **Los grupos de Facebook venden nicho pero arriesgan la cuenta**: pocos grupos,
  textos distintos, espaciados, y los posts se escriben a mano.
- **El correo te cobra por el volumen de la caja** cuando supera al peso real: unas
  botas que declaré "30×30×30 ponele" me salían $15.000 en vez de $8.100.
- **Honestidad como política**: sin comprobante no digo "original", los defectos se
  declaran, y nada de fotos generadas con IA.

Los errores están contados con causa raíz en [`docs/errores.md`](docs/errores.md):
el aviso que casi borro por "duplicado" sin serlo, el post basura que quedó publicado
en un grupo de 21.900 personas, el CSV que el portal me rechazó.

## Las plantillas, listas para copiar

Dos planillas de Google Sheets con todo armado. Le das "Hacer una copia" y ya es
tuya, no instalás nada:

- **Inventario de venta** (fase 2):
  **➜ [Hacé tu copia acá](https://docs.google.com/spreadsheets/d/1myEUJybKG5mf3KnBohoozAplT0vTH85NYoYs0YCFsBA/copy)**:
  las 19 columnas del método con fórmulas (ID automático, precio en US$, % de ahorro
  contra el precio de nuevo) y desplegables editables en la pestaña `Listas`.
- **Envíos masivos de Correo Argentino** (fase 4):
  **➜ [Hacé tu copia acá](https://docs.google.com/spreadsheets/d/1JH2lfuyrKisimnl1fenU0CQxVX6iEBXoYEjhTUwqv8o/copy)**

### La planilla de envíos

La copia trae las fórmulas, los desplegables validados, la lista oficial de
sucursales y un menú **📦 Correo Argentino** con dos botones: **Descargar CSV de
envíos** y **🧹 Limpiar todo (dejar como nueva)** para arrancar la próxima tanda de
cero. El Apps Script viaja con tu copia; el código está en
[`apps-script/Code.gs`](apps-script/Code.gs) para que lo leas antes de autorizarlo
(no usa servicios externos).

Qué resuelve:

- **Chequeo automático por fila**: valida los 21 campos oficiales (medidas, límites,
  provincia y sucursal contra las listas, email, celular sin 0 ni 15, la regla
  sucursal-XOR-domicilio) y marca `✅ OK` o `⚠️` con lo que falta.
- **El CSV sale con `;`**, como exige Correo. Nunca uses Archivo → Descargar → CSV de
  Google Sheets, que separa con comas.
- **Te avisa cuando pagás por volumen** (peso aforado mayor al real).
- `numero_orden` solo numérico: el portal rechaza el archivo entero si lleva guiones
  (me pasó).

El flujo: le pasás a tu agente los mensajes de tus compradores tal cual llegaron
(texto o capturas) y él carga una fila por paquete. Vos apretás el botón y subís el
archivo en MiCorreo → Nuevo envío → Paquetería → Masivo.

> Uso [MiCorreo / Paq.ar](https://micorreo.correoargentino.com.ar/) porque es más
> barato que despachar por ventanilla. ¿Por qué no cubro Andreani u otros correos?
> Porque Correo Argentino me funcionó de punta a punta (5 envíos reales, CSV aceptado
> por el portal) y no hizo falta buscar más. Si preferís otro correo, la fase 4 no
> aplica tal cual, pero el resto del método sí.

## Qué hay adentro

```
AGENTS.md                        ← el punto de entrada para tu agente
CLAUDE.md                        ← lo importa (si usás Claude Code, se carga solo)
metodo/
  01-setup.md … 04-envios.md     ← las cuatro fases, escritas para el agente
docs/
  economia-canales.md            ← cuánto deja cada canal, medido
  calculadora-canal.md           ← "¿dónde publico esto?": la cuenta, lista para hacer
  aprendizajes-plataformas.md    ← los gotchas de automatizar Facebook, ML y Sheets
  aprendizajes-envios.md         ← los gotchas del formato de Correo Argentino
  errores.md                     ← los errores, con causa raíz
skill/                           ← la versión instalable (Claude Code y afines)
apps-script/Code.gs              ← los botones de la planilla de envíos
```

## Seguí el proyecto

La historia de esta venta la conté en
[este tuit](https://x.com/agustinanfosso/status/2087281874636767248), que también se
viralizó. Voy a subir un tutorial en video del método completo a mi canal de YouTube;
cuando esté, el link va a aparecer acá.

- YouTube: [@agustinanfosso](https://www.youtube.com/@agustinanfosso)
- X / Twitter: [@agustinanfosso](https://x.com/agustinanfosso)

## Disclaimer

Proyecto independiente, sin afiliación con Correo Argentino, Meta, MercadoLibre,
Reddit ni Extra. Las tarifas y comisiones citadas las medí en agosto de 2026 y van a
cambiar; el método para medirlas está documentado. El formato del CSV lo verifiqué
contra los archivos oficiales y con importaciones reales; si algo cambia, mandá un
issue o PR.

## Licencia

MIT — ver [LICENSE](LICENSE).
