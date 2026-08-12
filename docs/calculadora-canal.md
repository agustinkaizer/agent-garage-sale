# Calculadora: ¿dónde publico esto?

La cuenta para decidir canal y precio de publicación de cada ítem. Está escrita para
que el agente la haga en el momento; los números de referencia salen de
[`economia-canales.md`](economia-canales.md) y hay que actualizarlos si pasó tiempo.

## Paso 0: el dato que importa

`P` = **lo que el vendedor quiere que le quede en el bolsillo** por este ítem (el
precio del inventario). Todo lo demás se despeja desde ahí.

## Paso 1: Facebook / Reddit / grupos

Precio a publicar = `P`. No hay comisión ni envío (retiro en persona, o envío a cargo
del comprador). **Este es siempre el piso de comparación.**

## Paso 2: ¿vale la pena MercadoLibre además?

En ML el comprador paga `X`, y el vendedor recibe `X − c·X − E`, donde:

- `c` = comisión de la categoría (medido: Zapatillas 12,70% · Figuras 13,50% ·
  Auriculares 15,50% · la mayoría de electrónica 16%)
- `E` = costo de Mercado Envíos, que paga el vendedor (medido: $15.000–$21.500;
  crece con el precio y el volumen del paquete — cajas de zapatillas, lo más caro)

Para netear `P`, el precio a publicar es:

```
X = (P + E) / (1 − c)
```

Ejemplos con `c = 16%` y `E = $15.000`:

| P (lo que querés) | X (a publicar) | Recargo |
|---|---|---|
| $500.000 | $613.000 | +23% |
| $200.000 | $256.000 | +28% |
| $120.000 | $161.000 | +34% |
| $80.000 | $113.000 | +41% |
| $50.000 | $77.000 | **+55%** |

## Paso 3: la decisión

- **X queda dentro de lo que el mercado paga** (comparar con publicaciones similares
  en ML) → publicar en ML **además** de Facebook, con precio `X`.
- **X queda caro contra la competencia** → el ítem se queda solo en
  Facebook/Reddit/grupos. Típicamente pasa debajo de ~$100.000.
- Regla rápida sin calculadora: **menos de $100.000 → Facebook; más → los dos
  canales.**

## Paso 4: verificar (obligatorio)

La fórmula es para decidir, **no para publicar**. Antes de confirmar cada publicación:

1. Cargar el precio `X` en el formulario de ML.
2. Mirar el **"Resumen estimado de cargos"** (o el panel de vendedores): ahí está la
   comisión real de la categoría y el envío real de ese paquete.
3. Si el neto que muestra no es `≥ P`, ajustar `X` y volver a mirar.

Esta verificación me corrigió el plan entero: la comisión supuesta (16%
fijo) y el envío supuesto ($13.000 fijo) estaban los dos mal.

## En Google Sheets

Para tener la cuenta en el inventario, con `P` en una celda (ej. `I6`):

```
=ROUND((I6 + 15000) / (1 - 0.16), -3)
```

Ajustá `15000` y `0.16` a lo medido para esa categoría, y redondeá a un precio
"lindo" (ML muestra $161.000 mejor que $160.714).
