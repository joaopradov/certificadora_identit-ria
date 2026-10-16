
const PDFDocument = require("pdfkit");

function gerarCartaConvite(escola, data, assinatura, res) {
  const pdf = new PDFDocument({
    size: "A4",
    margin: 60
  });

  // Configurar resposta como PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="carta_convite.pdf"'
  );

  pdf.pipe(res);

  // Cabeçalho
  pdf.fontSize(12)
    .text("UNIVERSIDADE TECNOLÓGICA FEDERAL DO PARANÁ", {
      align: "center"
    });

  pdf.moveDown(0.5);

  pdf.fontSize(11)
    .text("Projeto de Extensão ELLP", {
      align: "center"
    });

  pdf.moveDown(2);

  // Título
  pdf.fontSize(16)
    .text("CARTA-CONVITE", {
      align: "center",
      underline: true
    });

  pdf.moveDown(2);

  // Destinatário
  pdf.fontSize(12)
    .text(`À direção da ${escola.nome},`);

  pdf.moveDown();

  // Corpo da carta
  const mensagem =
    "Temos o prazer de convidar esta instituição para " +
    "participar das atividades do projeto de extensão ELLP, " +
    "que aproxima crianças e adolescentes do ambiente " +
    "universitário por meio de oficinas e atividades educativas.\n\n" +
    "Esperamos contar com a participação da escola e " +
    "colocamo-nos à disposição para esclarecer qualquer dúvida.";

  pdf.text(mensagem, {
    align: "justify",
    lineGap: 5
  });

  pdf.moveDown(2);

  // Data
  const dataFormatada = new Date(
    data + "T12:00:00"
  ).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  pdf.text(`Cornélio Procópio, ${dataFormatada}.`, {
    align: "right"
  });

  pdf.moveDown(3);

  // Assinatura
  pdf.text(assinatura, {
    align: "center"
  });

  pdf.moveDown(0.3);

  pdf.fontSize(10)
    .text("Projeto de Extensão ELLP", {
      align: "center"
    });

  pdf.end();
}

module.exports = {
  gerarCartaConvite
};
