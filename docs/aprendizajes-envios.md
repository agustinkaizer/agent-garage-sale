# Aprendizajes: automatizar envíos de Correo Argentino con un agente

Notas de campo del desarrollo de este proyecto, con envíos reales. Los errores están
incluidos a propósito: son la parte más útil.

## Del formato de Correo Argentino

- **El separador es `;` y no es negociable.** El error clásico es exportar desde Google
  Sheets con Archivo → Descargar → CSV, que separa con comas. La solución de esta
  planilla: una pestaña `Exportar CSV` donde una fórmula (`BYROW` + `TEXTJOIN(";")`)
  arma cada línea, y un Apps Script que la baja como archivo.
- **`numero_orden` debe ser numérico.** No está documentado en el instructivo oficial:
  lo descubrí cuando el portal rechazó un archivo con "Número de orden debe ser
  numérico (Fila 6)". Había puesto "12-5" para referenciar dos productos en un
  paquete. Ahora el chequeo de la planilla lo valida.
- **La regla sucursal XOR domicilio es silenciosa.** Si mandás las dos cosas, Correo no
  da error: ignora el domicilio. El chequeo la convirtió en advertencia explícita.
- **El instructivo oficial vive en 3 archivos** que se bajan de la propia pantalla de
  carga masiva de MiCorreo (Paso 1): la plantilla CSV (el encabezado exacto), el xlsx
  de instrucciones y ejemplos, y el xlsx de códigos de sucursales y provincias.
- La plantilla oficial usa saltos de línea LF y ASCII plano. Generé UTF-8 + LF y el
  portal lo aceptó.

## De Google Sheets como backend

- **`USER_ENTERED` interpreta "12-5" como fecha** y lo convierte en un número de serie
  (46361). Si hay que escribir texto con guiones, va `valueInputOption: RAW`. La
  moraleja general: **después de escribir, releer la línea generada** — la fuente de
  verdad es lo que quedó en la celda, no lo que mandaste.
- Una columna de chequeo con `BYROW` + `LAMBDA` + `LET` aguanta bien validaciones
  complejas (COUNTIF contra una lista de 3.756 sucursales incluido) sin arrastrar la
  fórmula fila por fila.
- Los desplegables (`setDataValidation` con `ONE_OF_RANGE`) funcionan bien incluso con
  miles de opciones.
- El locale importa: con en_US los decimales exportan con punto solos. Con locale
  es_AR habría que forzar el formato en la fórmula de export.

## Del Apps Script

- Un script **atado a la planilla** (container-bound) viaja con cada copia del archivo:
  publicar la planilla como "hacer una copia" distribuye también el botón, sin
  instalación. Es la mejor forma de repartir la herramienta.
- La descarga se resuelve con un modal de `HtmlService` y un link `data:` en base64 con
  atributo `download`. No hace falta crear archivos en Drive ni pedir permisos de Drive.
- El menú aparece con `onOpen()`; la primera ejecución pide autorización de Google.

## De trabajar con datos de compradores

- **Los compradores mandan cualquier cosa**: la dirección de la sucursal como si fuera
  su casa, el celular con 0 y 15, "la sucursal principal de X" sin dirección. El mapeo
  a los 21 campos es trabajo del agente, con dos reglas: no inventar nunca un dato que
  falta, y no elegir nunca una sucursal al azar cuando hay varias en la localidad.
- **"La principal de X" se resuelve buscando en la web** ("Correo Argentino sucursal
  <localidad>") y matcheando la dirección contra la lista oficial de sucursales.
- Caso real: un comprador pasó "Av. San Martín 2710, CABA" como dirección de entrega —
  esa dirección ERA la sucursal de Paternal. Si la dirección coincide con una fila de
  la lista de sucursales, es retiro por sucursal.
- **El peso no se estima.** Correo pesa el paquete en la sucursal y lo rechaza si la
  diferencia es grande. Balanza y listo.

## Lo que decidí NO hacer

- **Automatizar la subida al portal MiCorreo.** Login personal, se rompe con cada
  rediseño, y el paso humano (arrastrar un archivo) tarda 10 segundos. El valor está en
  que el archivo sea correcto por construcción, no en el clic final.
