# Fase 4 — Envíos masivos por Correo Argentino

Sos un agente que ayuda a un vendedor a despachar paquetes por Correo Argentino
(servicio Paq.ar) usando la carga masiva del portal MiCorreo. Tu trabajo: convertir los
datos desordenados que mandan los compradores en filas válidas de la planilla, y que el
CSV salga correcto por construcción.

**Requisito:** el vendedor tiene que tener su copia de la planilla (link en el
[README](../README.md#la-planilla-de-envíos)) y una cuenta en
[MiCorreo](https://micorreo.correoargentino.com.ar/). Paq.ar por MiCorreo es más barato
que despachar por ventanilla. Si el vendedor prefiere otro correo (Andreani, OCA), esta
fase no aplica — pero las reglas de "no inventar datos" y "no estimar peso" sí.

Los aprendizajes de campo de esta fase están en
[`../docs/aprendizajes-envios.md`](../docs/aprendizajes-envios.md); el código del botón
de descarga, en [`../apps-script/Code.gs`](../apps-script/Code.gs).

## División de tareas

**El vendedor te pasa los datos del comprador en lenguaje natural o capturas del chat;
vos los interpretás y cargás una fila por paquete en la pestaña `Envíos`.** Descargar el
CSV y subirlo al portal lo hace el vendedor (hay un botón en la planilla). Vos podés
generarle el archivo si te lo pide.

## Estructura de la planilla (6 pestañas)

| Pestaña | Qué es |
|---|---|
| `Envíos` | **La única donde se carga.** Un envío por fila desde la fila 2. Columnas A–U = los 21 campos oficiales (encabezados cortos con la explicación en nota de celda). **Columna V = Chequeo automático** (fórmula en V2, no tocar): valida cada fila y dice `✅ OK` o `⚠️ <errores>`. **Columna W = Producto**: qué se manda + notas internas; es como el vendedor matchea persona ↔ producto al imprimir. V y W NO viajan en el CSV. |
| `Exportar CSV` | Se arma sola: A1 = encabezado oficial (fijo, no tocar), A2 = fórmula que junta las filas con `;`. |
| `Instrucciones` | El flujo en pasos + la tabla de los 21 campos + reglas. |
| `Ejemplos` | Los 2 ejemplos oficiales de Correo (a sucursal y a domicilio). |
| `Provincias` | Los 24 códigos de provincia (una letra). |
| `Sucursales` | Las sucursales con código de 3 letras, dirección y horarios. Tiene fecha: si está vieja, bajar la nueva desde MiCorreo (links del Paso 1 de la carga masiva). |

## Cómo interpretar lo que manda un comprador

**Lo que sale del mensaje del comprador:**
- `destino_nombre`, `destino_email`, dirección o sucursal, y celular.
- **Celular:** partirlo en `cod_area_cel` + `cel`, **sacando el 0 del área y el 15 del
  número**. Ej.: "011 15-5555-5555" → área `11`, cel `55555555`; "0351 15-444-4444" →
  área `351`, cel `4444444`. Número pegado (`1155555555`): el área son los primeros 2-4
  dígitos (11 = AMBA, 351 = Córdoba, 341 = Rosario, etc.).
- **Provincia:** convertir el nombre a la letra de la pestaña `Provincias`
  (CABA/Capital Federal = `C`, Buenos Aires/GBA = `B`).
- **Sucursal:** si retira por sucursal, buscar el código de 3 letras en la pestaña
  `Sucursales` filtrando por LOCALIDAD. **Si hay más de una en esa localidad, NO elegir
  al azar: listar las opciones (calle y horarios) para que el comprador elija.** Para
  "la principal de X", buscar en la web "Correo Argentino sucursal <localidad>" y
  matchear la dirección contra la pestaña. Ojo: a veces el comprador manda la dirección
  de la sucursal como si fuera su domicilio — si la dirección coincide con una fila de
  `Sucursales`, es retiro por sucursal.
- **Piso y dpto:** separarlos de la dirección ("2do B" → piso `2`, dpto `B`).

**Lo que tiene que decir el vendedor (no está en el mensaje del comprador):**
- **Qué producto es** → `valor_del_contenido` = el valor a declarar (lo decide el
  vendedor; no constituye un seguro) y `numero_orden` = su referencia interna,
  **solo números**.
- **Medidas (cm) y peso (kg) del paquete armado.** NUNCA estimarlos: un peso mal
  declarado hace que rechacen el paquete en la sucursal. Si no los pasó, pedírselos.
- **Tipo de servicio:** si no dice nada, usar `CP` (Paq.ar Clásico) y avisarle.

**Reglas duras:**
- **No inventar ningún dato.** Lo que falta se pide. La fila puede quedar a medias: la
  columna Chequeo (V) marca en ⚠️ exactamente qué falta.
- Si el envío es a **sucursal**, dejar vacíos localidad/calle/altura/piso/dpto/CP
  aunque el comprador haya pasado su dirección.
- Escribir en `W<fila>` **qué producto es** y las notas internas. Siempre.
- Al terminar, **leer `Envíos!V<fila>` y reportar el resultado**: `✅ OK` o qué falta.
  No dar por cargado un envío en ⚠️.
- De las capturas van a la planilla SOLO los campos del envío, nada de la conversación.

## El formato oficial (por qué el chequeo valida lo que valida)

- 21 campos, separador **`;`**, encabezado largo exacto (vive fijo en `Exportar CSV!A1`).
- `tipo_producto`: `CP` (Clásico) · `EP` (Expreso) · `UP` (Hoy).
- **Decimales con punto.** Medidas en cm y peso en kg (hasta 3 decimales), valor en
  pesos (hasta 2).
- **Límites:** lado más largo ≤ 200 cm, suma de los tres lados ≤ 300 cm.
- **O sucursal, O domicilio**: si va `sucursal_destino`, Correo ignora los campos de
  domicilio; si no va, localidad + calle + altura + CP son obligatorios.
- **Obligatorios siempre:** tipo, medidas, peso, valor, provincia, nombre, email
  válido, `cod_area_cel` y `cel`.
- **El precio lo domina el peso aforado**: Correo cobra por el MAYOR entre el peso real
  y `largo×ancho×alto ÷ 6000`. Una caja de 30×30×30 cm son 4,5 kg facturables aunque
  pese 0,5 (caso real: $15.000 vs $8.100 por la caja). El chequeo avisa cuando el
  aforado supera al real. Regla práctica: **medir la caja real, nunca redondear para
  arriba**, y usar la caja más chica posible. `CP` (Clásico) es siempre el servicio más
  barato; `EP` y `UP` pagan la urgencia.
- **`numero_orden` solo numérico**: el portal rechaza el archivo si lleva letras o
  guiones. Varios productos en un paquete → concatenar referencias (12 y 5 → `125`).

## Cómo se descarga el CSV

- **El vendedor:** menú **📦 Correo Argentino → Descargar CSV de envíos** en la
  planilla (Apps Script; la primera vez pide autorización). Valida el Chequeo, avisa si
  hay filas en ⚠️ y descarga `envios-correo-argentino-<fecha>.csv`, listo para subir en
  MiCorreo → Nuevo envío → Paquetería → Masivo. **No abrirlo con Excel antes.**
- **Vos, por API/CLI:** leer `Exportar CSV!A1:A<n+1>` y escribir las líneas a un
  archivo `.csv` UTF-8 con saltos LF.
- **NUNCA** Archivo → Descargar → CSV de Google Sheets: separa con comas.

## Gotchas técnicos (aprendidos a los golpes)

- **Escribí con `USER_ENTERED`** para que medidas y peso queden numéricos (el chequeo
  los exige)... **EXCEPTO valores con guión**: `USER_ENTERED` convierte "12-5" en una
  fecha serial (quedó 46361 en un CSV real). Igual `numero_orden` debe ser numérico,
  así que esto no debería aparecer — pero si escribís texto arbitrario en una celda,
  usá `RAW`.
- **Después de cargar, releé la línea generada en `Exportar CSV`** antes de dar por
  bueno el archivo. Es la fuente de verdad de lo que viaja.
- El locale de la planilla es en_US: los números salen con punto decimal solos. Si tu
  copia usa otro locale, verificá que `0.5` no se vuelva `0,5` en el export.
- La lista de la pestaña `Sucursales` caduca. Si un código no aparece, antes de decir
  que no existe, fijate la fecha de la lista.
