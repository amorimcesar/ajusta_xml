const stringSimilarity = require("string-similarity");

function encontrarMelhorCorrespondencia(nomeProduto, dadosExcel) {
  const nomesPlanilha = Object.keys(dadosExcel);
  const melhorCorrespondencia = stringSimilarity.findBestMatch(
    nomeProduto,
    nomesPlanilha
  );

  if (melhorCorrespondencia.bestMatch.rating >= 0.8) {
    return melhorCorrespondencia.bestMatch.target;
  }

  return null;
}

module.exports = {
  encontrarMelhorCorrespondencia,
};
