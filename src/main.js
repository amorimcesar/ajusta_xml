const fs = require("fs");
const path = require("path");
const carregarDadosExcel = require("./carregarDadosExcel");
const processarXML = require("./processarXML");
const { logErro } = require("./logger");

const excelFilePath = path.join(__dirname, "../produtos.xlsx");
const xmlDirPath = path.join(__dirname, "../xmls");
const outputDirPath = path.join(xmlDirPath, "processados");

async function main() {
  try {
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }

    fs.writeFileSync(
      path.join(xmlDirPath, "log_erros.txt"),
      "Log de Erros:\n",
      "utf8"
    );

    // Carrega os dados do Excel
    const dadosExcel = await carregarDadosExcel(excelFilePath);

    // Lista todos os arquivos XML na pasta
    const arquivos = fs
      .readdirSync(xmlDirPath)
      .filter((file) => file.endsWith(".xml"));

    if (arquivos.length === 0) {
      console.log("Nenhum arquivo XML encontrado na pasta.");
      return;
    }

    // Processa cada arquivo XML
    for (const arquivo of arquivos) {
      const xmlPath = path.join(xmlDirPath, arquivo);
      await processarXML(xmlPath, dadosExcel, outputDirPath);
    }

    console.log(
      'Processamento concluído. Os arquivos processados estão na pasta "processada".'
    );
  } catch (error) {
    logErro(`Erro durante o processamento: ${error.message}`);
  }
}

main();
