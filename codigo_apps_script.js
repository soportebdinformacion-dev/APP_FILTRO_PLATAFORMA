/**
 * CÓDIGO GOOGLE APPS SCRIPT - EXTRACCIÓN COMPLETA DE TODAS LAS COLUMNAS
 * Base de datos: DASH_EMPADRONAMIENTO / Pestaña: dashboard
 * Campaña: Cosecha de Arándanos 2026
 */

function doGet() {
  // ID de tu hoja de cálculo DASH_EMPADRONAMIENTO (BD_EMPADRONAMIENTO_2026)
  var spreadsheetId = "1eGrz1am48_579m7mJ24Yqq8ldbwkMlzgH8cqLq81AXs"; 
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("dashboard");
  
  if (!sheet) {
    // Salvaguarda: si no encuentra la pestaña "dashboard", lee la primera disponible
    sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];
  }
  
  // Obtiene el rango completo con datos
  var data = sheet.getDataRange().getValues();
  var rows = [];
  
  // Empezamos en i = 2 porque en tu archivo la fila 1 está vacía/inicial y la fila 2 contiene las cabeceras reales
  // data[i][1] corresponde a la columna B (DNI)
  for (var i = 2; i < data.length; i++) {
    // Si la fila no tiene DNI o está vacía, nos la saltamos
    if (!data[i][1] || data[i][1] === "") continue; 
    
    rows.push({
      dni: data[i][1] ? data[i][1].toString() : "",
      tipo_registro: data[i][2] || "N/A",
      nombre: data[i][3] || "",
      nacimiento: data[i][4] ? formatearFecha(data[i][4]) : "N/A",
      edad: data[i][5] || "N/A",
      sexo: data[i][6] || "N/A",
      hijos: data[i][7] !== undefined ? data[i][7] : 0,
      celular: data[i][8] ? data[i][8].toString() : "",
      whatsapp: data[i][9] ? data[i][9].toString() : "",
      conoces: data[i][10] || "N/A",
      referencias: data[i][11] || "N/A",
      tipo_trabajo: data[i][12] || "CAMPO",
      modalidad: data[i][13] || "N/A",
      experiencia: data[i][14] || "N/A",
      departamento: data[i][15] || "",
      provincia: data[i][16] || "",
      distrito: data[i][17] || "",
      zona: data[i][18] || "",
      disponibilidad: data[i][19] || "N/A",
      dni_texto: data[i][20] ? data[i][20].toString() : "",
      total_kg: data[i][21] || 0,
      rango_dias: data[i][22] || "0 días",
      categorizacion: data[i][23] || "PERSONAL NUEVO",
      total_dias_laborados: data[i][24] || 0,
      evento_registro: data[i][25] || "N/A"
    });
  }
  
  // Retorna los datos como un JSON estructurado consumible por el HTML
  return ContentService.createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*"); // Permite el acceso seguro desde la app
}

/**
 * Función auxiliar para dar formato legible a los objetos Fecha de Google Sheets
 */
function formatearFecha(fecha) {
  if (fecha instanceof Date) {
    return Utilities.formatDate(fecha, Session.getScriptTimeZone(), "dd/MM/yyyy");
  }
  return fecha;
}

// Configuración CORS requerida por navegadores modernos
function doOptions() {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*");
}