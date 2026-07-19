/**
 * CÓDIGO GOOGLE APPS SCRIPT - CONEXIÓN SEGURA ULTRA-RESPONSIVA
 * Base de datos: BD_EMPADRONAMIENTO_2026 / Pestaña: dashboard
 */

function doGet(e) {
  var spreadsheetId = "1eGrz1am48_579m7mJ24Yqq8ldbwkMlzgH8cqLq81AXs"; 
  var ss = SpreadsheetApp.openById(spreadsheetId);
  
  // Buscar pestaña "dashboard", si no existe toma la primera por seguridad
  var sheet = ss.getSheetByName("dashboard");
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }
  
  var data = sheet.getDataRange().getValues();
  var rows = [];
  
  // Iniciar en i = 1 para saltar la fila de las cabeceras principales
  for (var i = 1; i < data.length; i++) {
    // Saltamos filas vacías para optimizar el peso del JSON transferido
    if (!data[i][0] && !data[i][8]) continue; 
    
    rows.push({
      nombre: data[i][0] ? data[i][0].toString().toUpperCase().trim() : "SIN NOMBRE",
      sexo: data[i][1] ? data[i][1].toString().trim() : "N/A",
      celular: data[i][2] ? data[i][2].toString().trim() : "",
      whatsapp: data[i][3] ? data[i][3].toString().trim() : "",
      tipo_trabajo: data[i][4] ? data[i][4].toString().toUpperCase().trim() : "CAMPO",
      modalidad: data[i][5] ? data[i][5].toString().toUpperCase().trim() : "N/A",
      experiencia: data[i][6] ? data[i][6].toString().toUpperCase().trim() : "NINGUNO",
      zona: data[i][7] ? data[i][7].toString().toUpperCase().trim() : "N/A",
      dni: data[i][8] ? data[i][8].toString().trim() : "N/A",
      categorizacion: data[i][9] ? data[i][9].toString().toUpperCase().trim() : "SIN CATEGORIA",
      total_dias_laborados: data[i][10] !== "" ? data[i][10].toString().trim() : "0",
      evento_registro: data[i][11] ? data[i][11].toString().toUpperCase().trim() : "N/A"
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET");
}
