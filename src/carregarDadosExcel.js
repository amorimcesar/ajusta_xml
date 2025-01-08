const ExcelJS = require("exceljs");

async function carregarDadosExcel(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0];

  const dados = {};
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const nomeProduto = row.getCell(1).value.trim();
    const codigoProduto = row.getCell(2).value;
    dados[nomeProduto] = codigoProduto;
  });

  return dados;
}

module.exports = carregarDadosExcel;
