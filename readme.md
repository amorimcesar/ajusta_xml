# Sistema de Processamento de XMLs com Substituição de Códigos

Este é um sistema em Node.js para processar arquivos XML, substituindo códigos de produtos (`<cProd>*****</cProd>`) com base em uma planilha Excel. O sistema lê os arquivos XML de uma pasta, faz a substituição dos códigos e salva os arquivos processados em uma subpasta.

## Funcionalidades

### Leitura de Planilha Excel

- Carrega os dados de uma planilha Excel (`produtos.xlsx`) contendo os nomes e códigos dos produtos.

### Processamento de XMLs

- Lê arquivos XML de uma pasta (`/xmls`).
- Substitui a tag `<cProd>*****</cProd>` pelo código correto, baseado no nome do produto na tag `<xProd>`.

### Validações

- Ignora arquivos XML vazios.
- Ignora arquivos XML com estrutura inválida ou incompleta.
- Gera um log de erros (`log_erros.txt`) para arquivos com problemas.

### Organização

- Separa o código em módulos para melhor organização e manutenção.

## Pré-requisitos

Antes de executar o sistema, certifique-se de ter instalado:

- Node.js (versão 16 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Como Usar

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2. Instale as Dependências

No diretório do projeto, execute:

```bash
npm install
```

Isso instalará as dependências necessárias, como `exceljs`, `xml2js` e `string-similarity`.

### 3. Prepare os Arquivos

- Coloque a planilha `produtos.xlsx` na raiz do projeto.
- Coloque os arquivos XML na pasta `/xmls`.

## Estrutura do Projeto

```plaintext
/meu-projeto
│
├── /src
│   ├── main.js                 # Ponto de entrada do script
│   ├── carregarDadosExcel.js   # Função para carregar dados do Excel
│   ├── processarXML.js         # Função para processar XML
│   ├── utils.js                # Funções utilitárias
│   └── logger.js               # Funções para log de erros
│
├── /xmls                       # Pasta contendo os arquivos XML
│   ├── processados             # Subpasta para os arquivos processados
│   └── log_erros.txt           # Arquivo de log de erros
│
├── produtos.xlsx               # Planilha de produtos
│
└── README.md                   # Este arquivo
```

### 4. Execute o Sistema

No terminal, execute:

```bash
node src/main.js
```

### 5. Verifique os Resultados

- Os arquivos XML processados serão salvos na pasta `/xmls/processados`.
- Erros serão registrados no arquivo `/xmls/log_erros.txt`.

## Exemplo de Planilha (`produtos.xlsx`)

A planilha deve ter duas colunas:

| Nome do Produto                         | Código |
| --------------------------------------- | ------ |
| AMACIANTE ROUPA CONC DOWNY 1,350ML MIST | 12345  |
| SABONETE DOVE ORIGINAL 90G              | 67890  |

## Exemplo de XML

### Antes do Processamento

```xml
<nfeProc>
  <NFe>
    <infNFe>
      <det>
        <prod>
          <cProd>*****</cProd>
          <xProd>AMACIANTE ROUPA CONC DOWNY 1,350ML MIST</xProd>
        </prod>
      </det>
    </infNFe>
  </NFe>
</nfeProc>
```

### Após o Processamento

```xml
<nfeProc>
  <NFe>
    <infNFe>
      <det>
        <prod>
          <cProd>12345</cProd>
          <xProd>AMACIANTE ROUPA CONC DOWNY 1,350ML MIST</xProd>
        </prod>
      </det>
    </infNFe>
  </NFe>
</nfeProc>
```

## Log de Erros

O sistema gera um arquivo de log (`log_erros.txt`) na pasta `/xmls` com os seguintes tipos de erros:

### Arquivo XML vazio:

```plaintext
Arquivo XML vazio: ./xmls/nota1.xml
```

### Estrutura XML inválida ou incompleta:

```plaintext
Estrutura XML inválida ou incompleta: ./xmls/nota2.xml | Série: 2 | Número: 263833
```

## Estrutura do Código

O código está organizado em módulos:

- `main.js`: Ponto de entrada do sistema.
- `carregarDadosExcel.js`: Lê os dados da planilha Excel.
- `processarXML.js`: Processa os arquivos XML.
- `utils.js`: Funções utilitárias, como a comparação de strings.
- `logger.js`: Funções para registro de erros.
