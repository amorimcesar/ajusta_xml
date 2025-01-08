const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const { encontrarMelhorCorrespondencia } = require("./utils");
const { logErro } = require("./logger");
const builder = new xml2js.Builder();

async function processarXML(xmlPath, dadosExcel, outputDirPath) {
  const xmlContent = fs.readFileSync(xmlPath, "utf8");

  if (!xmlContent.trim()) {
    logErro(`Arquivo XML vazio: ${xmlPath}`);
    return false;
  }

  const parser = new xml2js.Parser();
  const xmlObj = await parser.parseStringPromise(xmlContent);

  if (!xmlObj.nfeProc || !xmlObj.nfeProc.NFe || !xmlObj.nfeProc.NFe[0].infNFe) {
    const nNF =
      xmlObj.nfeProc?.NFe?.[0]?.infNFe?.[0]?.ide?.[0]?.nNF?.[0] || "N/A";
    const serie =
      xmlObj.nfeProc?.NFe?.[0]?.infNFe?.[0]?.ide?.[0]?.serie?.[0] || "N/A";

    logErro(`Estrutura XML inválida ou incompleta: ${xmlPath}`);
    return false; // Pula o arquivo
  }

  const produtos = xmlObj.nfeProc.NFe[0].infNFe[0].det || [];

  let possuiCProdIncorreto = false;
  produtos.forEach((produto) => {
    if (produto.prod[0].cProd[0] === "*****") {
      possuiCProdIncorreto = true;
    }
  });

  if (!possuiCProdIncorreto) {
    return false;
  }

  produtos.forEach((produto) => {
    const nome = produto.prod[0].xProd[0].trim();
    const codigoAtual = produto.prod[0].cProd[0];

    if (codigoAtual === "*****") {
      const melhorCorrespondencia = encontrarMelhorCorrespondencia(
        nome,
        dadosExcel
      );

      if (melhorCorrespondencia) {
        produto.prod[0].cProd[0] = dadosExcel[melhorCorrespondencia];
      } else {
        console.warn(`Produto não encontrado na planilha: ${nome}`);
      }
    }
  });

  const novoXML = builder.buildObject(xmlObj);
  const novoCaminho = path.join(outputDirPath, path.basename(xmlPath));
  fs.writeFileSync(novoCaminho, novoXML, "utf8");
  console.log(`Arquivo processado: ${novoCaminho}`);
  return true;
}

module.exports = processarXML;
