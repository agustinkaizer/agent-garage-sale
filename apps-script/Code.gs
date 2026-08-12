function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📦 Correo Argentino')
    .addItem('Descargar CSV de envíos', 'descargarCsv')
    .addSeparator()
    .addItem('🧹 Limpiar todo (dejar como nueva)', 'limpiarPlanilla')
    .addToUi();
}

function descargarCsv() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const env = ss.getSheetByName('Envíos');
  const exp = ss.getSheetByName('Exportar CSV');

  // El export (pestaña "Exportar CSV") filtra por tipo_producto (col A) no vacío,
  // así que acá se cuenta igual: una fila con datos pero sin col A NO viaja en el CSV.
  const last = env.getLastRow();
  let n = 0;
  const problemas = [];
  if (last >= 2) {
    const data = env.getRange(2, 1, last - 1, 22).getValues(); // A:V
    data.forEach(function (r, i) {
      const conDatos = r.slice(0, 21).some(function (c) { return String(c).trim() !== ''; });
      if (!conDatos) return;
      if (String(r[0]).trim() === '') {
        problemas.push('Fila ' + (i + 2) + ': sin tipo_producto (col A) — NO va a salir en el CSV');
        return;
      }
      n++;
      const chk = String(r[21]);
      if (chk.indexOf('✅') !== 0) problemas.push('Fila ' + (i + 2) + ': ' + (chk || 'sin chequeo'));
    });
  }

  if (n === 0) {
    ui.alert('No hay envíos cargados en la pestaña Envíos.');
    return;
  }
  if (problemas.length > 0) {
    const resp = ui.alert(
      'Hay filas que no pasan el chequeo',
      problemas.join('\n\n') + '\n\nCorreo va a rechazar esas filas. ¿Descargar igual?',
      ui.ButtonSet.YES_NO
    );
    if (resp !== ui.Button.YES) return;
  }

  // El CSV sale de la pestaña "Exportar CSV": encabezado oficial + una línea por envío, con ;
  const lineas = exp.getRange(1, 1, n + 1, 1).getValues()
    .map(function (r) { return String(r[0]); })
    .filter(function (v) { return v.trim() !== ''; });
  const csv = lineas.join('\n') + '\n';

  const fecha = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
  const nombre = 'envios-correo-argentino-' + fecha + '.csv';
  const b64 = Utilities.base64Encode(Utilities.newBlob(csv, 'text/csv', nombre).getBytes());

  const html = HtmlService.createHtmlOutput(
    '<div style="font-family:Arial,sans-serif;padding:12px">' +
    '<p style="margin:0 0 12px"><b>' + n + '</b> envío(s) listos' +
    (problemas.length ? ' <span style="color:#b00">(' + problemas.length + ' con problemas)</span>' : '') + '.</p>' +
    '<a download="' + nombre + '" href="data:text/csv;charset=utf-8;base64,' + b64 + '"' +
    ' style="display:inline-block;padding:12px 20px;background:#FFD200;color:#000;border-radius:8px;' +
    'text-decoration:none;font-weight:bold">⬇ Descargar ' + nombre + '</a>' +
    '<p style="color:#666;font-size:12px;margin:14px 0 0">Subilo tal cual en MiCorreo &rarr; Nuevo envío &rarr; ' +
    'Paquetería &rarr; Masivo &rarr; &quot;Subir&quot;. No lo abras con Excel antes: puede romper el formato.</p>' +
    '</div>'
  ).setWidth(460).setHeight(180);

  ui.showModalDialog(html, 'Exportar CSV para Correo Argentino');
}

// Borra todos los envíos cargados y deja la planilla como recién copiada.
// Solo borra CONTENIDO de Envíos!A2:U y W2:W (los datos y las notas internas).
// No toca: encabezados, la fórmula del Chequeo (V2), formatos, desplegables,
// ni las pestañas Exportar CSV / Instrucciones / Ejemplos / Provincias / Sucursales.
function limpiarPlanilla() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const env = ss.getSheetByName('Envíos');

  // Contar filas con algo cargado en A:U o W
  const last = Math.max(env.getLastRow(), 2);
  const data = env.getRange(2, 1, last - 1, 23).getValues(); // A:W
  let n = 0;
  data.forEach(function (r) {
    const enDatos = r.slice(0, 21).concat([r[22]])
      .some(function (c) { return String(c).trim() !== ''; });
    if (enDatos) n++;
  });

  if (n === 0) {
    ui.alert('La planilla ya está limpia: no hay envíos cargados.');
    return;
  }

  const resp = ui.alert(
    '¿Limpiar la planilla?',
    'Se van a borrar ' + n + ' fila(s) de envíos (datos y columna Producto). ' +
    'Esto no se puede deshacer desde acá (sí desde el historial de versiones de Google Sheets: ' +
    'Archivo → Historial de versiones).\n\n¿Borrar y dejar la planilla como nueva?',
    ui.ButtonSet.YES_NO
  );
  if (resp !== ui.Button.YES) return;

  // El Chequeo (V2) es un BYROW sobre A2:U1000: limpiar ese rango completo
  // garantiza que no quede nada, sin tocar la fórmula.
  env.getRange('A2:U1000').clearContent();
  env.getRange('W2:W1000').clearContent();

  ui.alert('Listo: la planilla quedó como nueva. El Chequeo y el export se recalculan solos.');
}
