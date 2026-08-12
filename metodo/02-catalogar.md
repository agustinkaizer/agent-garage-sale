# Fase 2 — Catalogar: de fotos sueltas a inventario

Objetivo: un Google Sheet donde cada cosa a vender tiene una fila con fotos, condición,
precio de lista, precio mínimo y referencias de mercado. Ese sheet es la fuente de
verdad de todo el proyecto: los avisos, los envíos y la contabilidad salen de ahí.

## El flujo

1. **El humano saca las fotos.** Varias por producto: general, detalles, defectos, y
   —clave en marcas— **etiquetas internas y números de serie**. Las fotos de defectos
   no son opcionales: son las que evitan reclamos.
2. **Una carpeta de Drive por producto.** El agente ordena el volcado de fotos en
   carpetas con el nombre del producto y linkea cada carpeta desde el sheet.
3. **El agente arma la ficha mirando las fotos, no de memoria.** Media docena de
   errores de mi inventario (un joystick de Xbox One que era Series X|S, una
   figura "con accesorios" que no los tenía, unas botas "Timberland" que no eran) se
   detectaron **abriendo la imagen grande**. El thumbnail no alcanza.
4. **El humano pone los precios.** El agente propone en base a referencias; decide el
   humano. Cargá precio de lista y precio mínimo (el piso para negociar, que no va en
   ningún aviso).

## Estructura de sheet que funcionó

**Hay una plantilla lista para copiar** con esta estructura ya armada (fórmulas,
desplegables y notas):
[hacé tu copia acá](https://docs.google.com/spreadsheets/d/1myEUJybKG5mf3KnBohoozAplT0vTH85NYoYs0YCFsBA/copy).

Una pestaña `En venta` (encabezados en la fila 5, datos desde la 6) y una pestaña
`Listas` (opciones de los desplegables y la cotización del dólar en `Listas!B2`).
Columnas de `En venta`:

| Columna | Notas |
|---|---|
| ID | Fórmula autonumerada — es la referencia interna para envíos |
| Artículo | Nombre corto y buscable |
| Categoría | Desplegable (salen de `Listas`) |
| Marca / Modelo | Solo lo verificable en las fotos |
| Condición | Desplegable: Nuevo / Como nuevo / Buen estado / Aceptable |
| Cantidad · Incluye · Moneda | Desplegables |
| Precio lista · Precio mín. | El mínimo es privado, no viaja a los avisos |
| Precio US$ | Fórmula sobre la cotización de `Listas` |
| Estado | Disponible / Reservado / Vendido |
| Entrega | Retiro / Envío / Ambas |
| Fotos | HYPERLINK a la carpeta de Drive |
| Notas | Defectos y aclaraciones — en voz del vendedor |
| Valor nuevo (US$) · Ahorro % · Fuente | La referencia de mercado y el link |

## Precios de referencia

- **Zapatillas**: StockX (precio del talle exacto, sin envío ni impuestos).
- **Tecnología**: MercadoLibre Argentina, la publicación nueva más barata.
- La columna "Ahorro %" contra el precio de nuevo es el mejor argumento de venta que
  existe: mostrala.

## Reglas de esta fase

- **El sheet se comparte con compradores.** Todo lo que va en una celda tiene que estar
  escrito en la voz del vendedor, para que lo lea alguien que está por comprar. Las
  notas internas ("falta confirmar el modelo", "el mínimo es X") van en otro archivo, o
  directamente en columnas que el comprador no ve. Si necesitás pestañas de trabajo
  (resúmenes, borradores de avisos), armalas en **otro** archivo.
- **El humano edita el sheet en paralelo mientras trabajás** — y a veces borra o mueve
  columnas. Leé la fila de encabezados **justo antes de cada escritura** y ubicá las
  columnas por nombre, nunca por letra recordada. A mí una tanda de 27 filas me quedó
  corrida una columna por confiar en un layout leído cinco minutos antes.
- **No cargues como dato lo que no puedas ver.** Si el fabricante no aparece en ninguna
  foto, la ficha dice "sin marca visible" — no adivines el modelo.
- Si aparecen cosas ya publicadas antes (avisos viejos de otra época), **conciliá**:
  cargalas al sheet como registro aunque estén vendidas, así el inventario cierra.

Siguiente: [Fase 3 — Publicar](03-publicar.md).
