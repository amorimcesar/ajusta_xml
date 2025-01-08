const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../xmls/log_erros.txt");

function logErro(mensagem) {
  console.warn(mensagem);
  fs.appendFileSync(logFilePath, `${mensagem}\n`, "utf8");
}

module.exports = {
  logErro,
};
