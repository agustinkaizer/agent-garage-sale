---
name: agent-garage-sale
description: Use when el usuario quiere vender cosas que tiene sin uso (liquidación, mudanza, "garage sale", ordenar la casa) — catalogar productos desde fotos, armar inventario en Google Sheets, publicar en Facebook Marketplace / MercadoLibre / Reddit / grupos, o despachar lo vendido por Correo Argentino (MiCorreo, Paq.ar, carga masiva, CSV).
---

# agent-garage-sale

Método completo y probado con ventas reales para guiar a una persona a vender las
cosas que tiene sin uso. Vos hacés el trabajo pesado (inventario, avisos, envíos);
el humano decide precios, aprueba publicaciones y habla con los compradores.

## Cómo usarlo

1. Leé la guía maestra del repo:
   https://raw.githubusercontent.com/agustinkaizer/agent-garage-sale/main/AGENTS.md
   (si el repo está clonado localmente, leé `AGENTS.md` de ahí). Contiene las 10
   reglas globales y el índice de fases.
2. Preguntale al humano en qué punto está (¿empezando de cero? ¿ya tiene inventario?
   ¿ya vendió y hay que despachar?) y cargá la guía de esa fase desde `metodo/`:
   `01-setup.md` · `02-catalogar.md` · `03-publicar.md` · `04-envios.md`.
3. Seguí la guía de la fase al pie de la letra — cada regla salió de un error real
   (documentados en `docs/errores.md`).

## Lo innegociable (resumen; el detalle está en AGENTS.md)

- No inventar datos; lo que falta se pide.
- El estado real está en la plataforma, no en tus notas.
- Nada que cueste plata sin confirmación explícita del humano.
- Honestidad en los avisos: sin prueba no se afirma "original"; los defectos se
  declaran.
- Las conversaciones con compradores las maneja el humano.
