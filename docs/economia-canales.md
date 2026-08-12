# La economía real de cada canal

Medida con ventas reales en agosto de 2026, liquidando ~80 objetos usados (zapatillas,
figuras de colección, tecnología, fotografía) en Argentina. Los porcentajes y tarifas
van a cambiar; el **método de medirlos** — publicar y mirar lo que la plataforma dice
que vas a cobrar — no.

## Resumen

| | Comisión | Envío | Retiro en persona | Alcance | Riesgo |
|---|---|---|---|---|---|
| **Facebook Marketplace** | 0% | — | Sí, gratis | Alto y local | Bajo |
| **Grupos de Facebook** | 0% | — | Sí, gratis | Alto en nicho | **Medio-alto** (la cuenta) |
| **Reddit** | 0% | A cargo del comprador | Sí | Medio | Bajo |
| **MercadoLibre** | 12,7%–16% | **$15.000–$21.500, lo paga el vendedor** | **Bloqueado** | Alto | Bajo |

**Para productos de menos de $100.000, Facebook gana por goleada.** MercadoLibre solo
tiene sentido de ahí para arriba, donde el envío se diluye contra el precio.

## MercadoLibre, en detalle

### La comisión depende de la categoría

Medido publicación por publicación en el "Resumen estimado de cargos":

| Categoría | Cargo por vender | Envío observado |
|---|---|---|
| Ropa y Accesorios > Calzado > Zapatillas | **12,70%** | $19.720 – $21.520 |
| Juguetes > Figuras de Acción | **13,50%** | $14.940 – $17.420 |
| Audio > Auriculares | **15,50%** | $14.940 |
| Celulares > Cargadores | **16,00%** | $14.940 |
| Cámaras > Trípodes | **16,00%** | $15.440 |
| Videojuegos > Joysticks | **16,00%** | $15.440 |

Dos cosas que cambian el cálculo completo:

1. **El envío gratis es prácticamente obligatorio y lo paga el vendedor.** Crece con el
   precio y el volumen del paquete (las cajas de zapatillas son las más caras).
2. **El retiro en persona está bloqueado** ("esta publicación no tiene disponible la
   opción de retiro en persona y solo podrá enviarse por Mercado Envíos"). En Facebook
   el retiro es gratis; en ML no existe.

### El recargo necesario crece cuanto más barato es el producto

Como el envío es casi fijo, para netear el precio objetivo hay que despejar
`X − comisión·X − envío = precio_objetivo`:

| Precio objetivo | Precio a publicar | Recargo |
|---|---|---|
| $500.000 | $603.000 | +21% |
| $140.000 | $185.000 | +32% |
| $120.000 | ~$162.000 | +35% |
| $50.000 | ~$75.000 | **+50%** |

En mi tanda, los ítems de $120.000 para arriba netearon casi exacto; **todo el
hueco (≈$50.000 sobre $1.130.000) quedó en los ítems de $50.000–$70.000**, donde el
tope de recargo que acepté (+35%) no cubre el envío.

### Las recomendaciones de ML que cuestan plata

El panel de vendedores (`vendedores.mercadolibre.com.ar/publicaciones`, la fuente de
verdad del neto real) sugiere mejoras. No todas son gratis:

- **"Agregá cuotas"** → entre 5% y 19% de comisión extra. No.
- **"Programa Despegue"** (visibilidad) → requiere dejar $45.000 en garantía. Decisión
  del humano, nunca del agente.
- **Objetivos de calidad** (completar ficha, fotos, título) → gratis. Sí.

### La fórmula estimada no reemplaza al resumen de cargos

Mi plan asumía envío fijo de $13.000 y comisión fija de 16%. Los dos supuestos
estaban mal. **Cada precio se verifica contra el "Resumen estimado de cargos" antes de
publicar**; la fórmula sirve para planificar, no para publicar.

## Reddit

Un solo post-catálogo en un sub de compraventa: **12.000 visitas, costo cero, y el
canal que más ventas cerró**. El post se viralizó y los compradores llegaban con los
precios ya vistos
([sigue vivo acá](https://www.reddit.com/r/Mercadoreddit/comments/1vlsjjz/)).
Requisitos típicos del sub: precio en el título, flair obligatorio, todo listado con
precios en el cuerpo, prohibido "precio por privado", karma y antigüedad mínimos.

## Extra (ropa y zapatillas)

[Extra](https://extra.com.ar/) es la app argentina de compraventa de ropa usada. Para
ropa y zapatillas fue el número uno de mi experiencia. No está en la tabla de
arriba porque no la medí publicación por publicación como a MercadoLibre: la
comisión y el envío se verifican en la app al publicar.

## Grupos de Facebook

Costo cero, alcance de decenas de miles en nicho, pero **es el único canal que arriesga
la cuenta**: el patrón "mismo texto en muchos grupos el mismo día" activa el filtro de
spam, y el castigo es la restricción de Marketplace. Reglas anti-spam en
[la fase 3](../metodo/03-publicar.md#grupos-de-facebook).
