// @ts-nocheck
var PRINT_OPTIONS = {
  'size': 7,               // Tamanho do papel. 0 = carta, 1 = tablóide, 2 = Ofício, 3 = declaração, 4 = executivo, 5 = fólio, 6 = A3, 7 = A4, 8 = A5, 9 = B4, 10 = B
  'fzr': false,            // repetir cabeçalhos de linha
  'portrait': true,        // false = paisagem
  'fitw': true,            // ajustar a janela ou tamanho real
  'gridlines': false,      // mostrar linhas de grade
  'printtitle': false,
  'sheetnames': false,
  'pagenum': 'UNDEFINED',  // CENTRO = mostrar números de página / UNDEFINED = não mostrar
  'attachment': false
}

var PDF_OPTS = objectToQueryString(PRINT_OPTIONS);

function onOpen(e) {
  SpreadsheetApp.getUi().createMenu('PDF').addItem('Gerar PDF', 'Pdf').addToUi();
}

function Pdf() {

  SpreadsheetApp.flush();
  
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("PLANILHA1");
  var range = guia.getRange("A1:I23").activate();

  var gid = guia.getSheetId();
  
  var printRange = objectToQueryString({
    'c1': range.getColumn() - 1,
    'r1': range.getRow() - 1,
    'c2': range.getColumn() + range.getWidth() - 1,
    'r2': range.getRow() + range.getHeight() - 1
  });
  
  var url = planilha.getUrl().replace(/edit$/, '') + 'export?format=pdf' + PDF_OPTS + printRange + "&gid=" + gid;

  var htmlTemplate = HtmlService.createTemplateFromFile('Abrirpdf');
  htmlTemplate.url = url;
  SpreadsheetApp.getUi().showModalDialog(htmlTemplate.evaluate().setHeight(10).setWidth(100), 'Gerando PDF');
}
function objectToQueryString(obj) {
  return Object.keys(obj).map(function(key) {
    return Utilities.formatString('&%s=%s', key, obj[key]);
  }).join('');
  
  
}
