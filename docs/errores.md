# Los errores que cometí

Cómo se equivoca un agente haciendo trabajo real sobre plataformas ajenas, y qué
controles lo agarran. Este es probablemente el archivo más útil del repo: cada regla
del método salió de uno de estos.

## 1. Estar por borrar un aviso que no era duplicado

**El más grave.** La documentación interna afirmaba con confianza que dos avisos de
zapatillas eran el mismo par duplicado, y que había que borrar uno. Un handoff anterior
decía incluso que el duplicado "ya se había borrado".

Las dos cosas eran falsas: eran **dos pares distintos** fotografiados sobre el mismo
piso (en thumbnail parecían iguales), y el aviso seguía vivo. Si se hubiera confiado en
las notas, se borraba un aviso real.

Se detectó por seguir la regla de verificar antes de actuar: los thumbnails se veían
apenas distintos, se abrió el aviso, y la tercera foto —la etiqueta interna— confirmó
que era otro par.

> **Regla:** antes de borrar un aviso por "duplicado", abrí las fotos grandes. Y si la
> documentación dice que algo ya se hizo, verificalo igual: el estado real está en la
> plataforma.

## 2. Publicar un post basura en un grupo público

**El más visible.** Probando cuál de dos compositores superpuestos estaba activo, se
insertó el carácter `"X"` como prueba de escritura. Al publicar, Facebook publicó el
compositor equivocado: quedó un post que decía solo **"X"** en un grupo de compraventa
de 21.900 miembros. No se pudo borrar por automatización; lo borró el humano a mano.

Dos errores encadenados: **se usó un canal público como banco de pruebas** (la prueba
debió hacerse leyendo el DOM, no escribiendo), y **se insistió demasiado** — el
compositor ya había fallado de ocho formas distintas y se siguió intentando.

> **Regla:** nada de pruebas en interfaces conectadas a canales públicos. Y tres
> fallos seguidos significan que el problema es el enfoque: frenar y hacerlo a mano.

## 3. Confiar en documentación desactualizada

Al retomar una sesión, las notas afirmaban tres cosas falsas: un post de Reddit
figuraba pendiente (ya estaba publicado, con 12.000 visitas, y el humano lo había
editado a mano), un aviso figuraba como duplicado a borrar (ver error 1) y como ya
borrado (seguía vivo).

> **Regla:** el humano también opera sus cuentas por su lado. Antes de actuar sobre
> algo que las notas dan por hecho o pendiente, verificarlo en la plataforma.

## 4. Precios calculados con supuestos en vez de datos

El plan fijaba `precio_ML = (precio + $13.000) / 0,84`, asumiendo envío fijo y
comisión fija del 16%. Al publicar de verdad: envío $15.000–$21.500 y comisión
12,7%–16% **según categoría**. Se agarró porque cada precio se verificaba contra el
"Resumen estimado de cargos" de MercadoLibre antes de publicar.

> **Regla:** las fórmulas sirven para planificar; se publica con lo que la plataforma
> dice que vas a cobrar.

## 5. Caer en el flujo de anuncio pago

Un click por coordenada destinado a "Editar publicación" cayó en "Promocionar
publicación": el flujo de anuncio pago de Meta, con presupuesto diario preseleccionado.
No se gastó nada, pero salir requirió forzar la navegación.

> **Regla:** los botones que cuestan plata están al lado de los que no. Click por
> referencia de elemento, siempre, y verificar el destino.

## 6. Fichas que no coincidían con el producto real

Un joystick catalogado "Xbox One" era de Series X|S (botón Share y USB-C visibles en la
foto). Unas botas "Timberland" no eran originales (etiqueta interna). Una figura
catalogada "con accesorios" no los tenía en ninguna foto. Un colorway mal identificado.
Todos se detectaron **mirando las fotos**, no leyendo las fichas.

> **Regla:** la ficha se escribe mirando las fotos grandes. Lo que no se ve, no se
> afirma.

## 7. Un producto vendido con dos avisos abiertos

Al marcar vendida una figura apareció un segundo aviso del mismo producto, publicado en
una tanda anterior a otro precio. El inventario registraba un solo ítem.

> **Regla:** al marcar vendido, buscar por nombre y cerrar **todos** los avisos del
> producto.

## 8. El CSV rechazado por el portal del correo

La primera importación real a MiCorreo fue rechazada: "Número de orden debe ser
numérico". Había escrito `12-5` para referenciar dos productos en un paquete — y
encima la API de Sheets, con `USER_ENTERED`, lo había convertido en la fecha serial
`46361`. Se corrigió a `125`, se agregó la validación a la planilla, y quedó la regla
de releer la línea generada antes de dar por bueno el archivo.

> **Regla:** el formato se valida por construcción (chequeo en la planilla) y se
> verifica contra lo que quedó escrito, no contra lo que se mandó.

## Qué controles funcionaron, y cuáles faltaron

| Control | Qué agarró |
|---|---|
| Verificar el estado real en la plataforma antes de actuar | Los 3 datos falsos de las notas, incluido el aviso que se iba a borrar |
| Abrir las fotos grandes en vez del thumbnail | Que dos avisos no eran duplicados |
| Mirar las fotos antes de escribir la ficha | El joystick, las botas, la figura |
| Verificar el precio contra el resumen de cargos | La fórmula mal calibrada |
| Releer encabezados del sheet antes de escribir | Columnas corridas por edición en paralelo |
| Leer las reglas del grupo antes de postear | 3 de 4 grupos elegidos eran inservibles |
| Validar el CSV contra el ejemplo oficial | El formato entero del export |

| Control que faltó | Consecuencia |
|---|---|
| No probar en canales públicos | El post "X" en un grupo de 21.900 personas |
| Frenar después de 2–3 intentos fallidos | Ocho intentos con el mismo compositor roto |
| Click por referencia, nunca por coordenada | Caer en el flujo de anuncio pago |
