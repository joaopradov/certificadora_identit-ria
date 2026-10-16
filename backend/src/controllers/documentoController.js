const { escolas } = require("./escolaController");
const { gerarCartaConvite } = require("../services/cartaConviteService");


const documentos = [
  {
    id: 1,
    escolaId: 1,
    tipo: "Carta convite",
    data: "2026-09-02",
    status: "Assinado",
    arquivo: "carta_convite_monteiro_lobato.pdf"
  },
  {
    id: 2,
    escolaId: 2,
    tipo: "Convênio",
    data: "2026-08-18",
    status: "Assinado",
    arquivo: "convenio_dom_pedro_ii.pdf"
  },
  {
    id: 3,
    escolaId: 3,
    tipo: "Carta convite",
    data: "2026-09-29",
    status: "Enviado",
    arquivo: "carta_convite_futuro_digital.pdf"
  },
  {
    id: 4,
    escolaId: 1,
    tipo: "Convênio",
    data: "2026-10-05",
    status: "Pendente",
    arquivo: null
  }
];

// Listar todos os documentos
const listarDocumentos = (req, res) => {
  return res.status(200).json(documentos);
};

//Cadastrar documentos
const cadastrarDocumento = (req, res) => {
  const {
    escolaId,
    tipo,
    data,
    status = "Pendente",
    arquivo = null
  } = req.body || {};

  // Validar o ID da escola
  if (!Number.isInteger(escolaId) || escolaId <= 0) {
    return res.status(400).json({
      mensagem: "ID da escola inválido."
    });
  }

  // Verificar se a escola existe
  const escolaExiste = escolas.some(
    (escola) => escola.id === escolaId
  );

  if (!escolaExiste) {
    return res.status(404).json({
      mensagem: "Escola não encontrada."
    });
  }

  // Validar o tipo de documento
  const tiposValidos = ["Carta convite", "Convênio"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      mensagem: "Tipo de documento inválido."
    });
  }

  // Validar o status
  const statusValidos = [
    "Pendente",
    "Enviado",
    "Assinado"
  ];

  if (!statusValidos.includes(status)) {
    return res.status(400).json({
      mensagem: "Status do documento inválido."
    });
  }

  // Validar a data
  if (
    typeof data !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data) ||
    !Number.isFinite(Date.parse(data)) ||
    new Date(data).toISOString().slice(0, 10) !== data
  ) {
    return res.status(400).json({
      mensagem: "Data inválida. Utilize AAAA-MM-DD."
    });
  }

  // Validar o arquivo
  if (
    arquivo !== null &&
    (typeof arquivo !== "string" || !arquivo.trim())
  ) {
    return res.status(400).json({
      mensagem: "Nome do arquivo inválido."
    });
  }

  const novoId = documentos.length
    ? Math.max(...documentos.map(doc => doc.id)) + 1
    : 1;

  const novoDocumento = {
    id: novoId,
    escolaId,
    tipo,
    data,
    status,
    arquivo
  };

  documentos.push(novoDocumento);

  return res.status(201).json({
    mensagem: "Documento cadastrado com sucesso!",
    documento: novoDocumento
  });
};

//Consultar documento ID
const buscarDocumentoPorId = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "ID do documento inválido."
    });
  }

  const documento = documentos.find(
    (doc) => doc.id === id
  );

  if (!documento) {
    return res.status(404).json({
      mensagem: "Documento não encontrado."
    });
  }

  return res.status(200).json(documento);
};


//Lista documentos escola
const listarDocumentosPorEscola = (req, res) => {
  const escolaId = Number(req.params.escolaId);

  if (!Number.isSafeInteger(escolaId) || escolaId <= 0) {
    return res.status(400).json({
      mensagem: "ID da escola inválido."
    });
  }

  const escolaExiste = escolas.some(
    (escola) => escola.id === escolaId
  );

  if (!escolaExiste) {
    return res.status(404).json({
      mensagem: "Escola não encontrada."
    });
  }

  const documentosDaEscola = documentos.filter(
    (doc) => doc.escolaId === escolaId
  );

  return res.status(200).json(documentosDaEscola);
};

//Atualizar documentos
const atualizarDocumento = (req, res) => {
  const id = Number(req.params.id);

  // Validar o ID do documento
  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "ID do documento inválido."
    });
  }

  // Verificar se o documento existe
  const documento = documentos.find(
    (doc) => doc.id === id
  );

  if (!documento) {
    return res.status(404).json({
      mensagem: "Documento não encontrado."
    });
  }

  const {
    escolaId,
    tipo,
    data,
    status,
    arquivo = null
  } = req.body || {};

  // Validar o ID da escola
  if (!Number.isSafeInteger(escolaId) || escolaId <= 0) {
    return res.status(400).json({
      mensagem: "ID da escola inválido."
    });
  }

  // Verificar se a escola existe
  const escolaExiste = escolas.some(
    (escola) => escola.id === escolaId
  );

  if (!escolaExiste) {
    return res.status(404).json({
      mensagem: "Escola não encontrada."
    });
  }

  // Validar tipo de documento
  const tiposValidos = ["Carta convite", "Convênio"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      mensagem: "Tipo de documento inválido."
    });
  }

  // Validar status
  const statusValidos = [
    "Pendente",
    "Enviado",
    "Assinado"
  ];

  if (!statusValidos.includes(status)) {
    return res.status(400).json({
      mensagem: "Status do documento inválido."
    });
  }

  // Validar data
  if (
    typeof data !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data) ||
    !Number.isFinite(Date.parse(data)) ||
    new Date(data).toISOString().slice(0, 10) !== data
  ) {
    return res.status(400).json({
      mensagem: "Data inválida. Utilize AAAA-MM-DD."
    });
  }

  // Validar nome do arquivo
  if (
    arquivo !== null &&
    (typeof arquivo !== "string" || !arquivo.trim())
  ) {
    return res.status(400).json({
      mensagem: "Nome do arquivo inválido."
    });
  }

  // Atualizar o documento
  Object.assign(documento, {
    escolaId,
    tipo,
    data,
    status,
    arquivo
  });

  return res.status(200).json({
    mensagem: "Documento atualizado com sucesso!",
    documento
  });
};

//Excluir documento
const excluirDocumento = (req, res) => {
  const id = Number(req.params.id);

  // Validar o ID
  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "ID do documento inválido."
    });
  }

  // Localizar o documento
  const indice = documentos.findIndex(
    (doc) => doc.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Documento não encontrado."
    });
  }

  // Remover o registro temporário
  documentos.splice(indice, 1);

  return res.status(200).json({
    mensagem: "Documento excluído com sucesso!"
  });
};

// Gerar Carta Convite
const gerarCartaConvitePDF = (req, res) => {
  const { escolaId, data, assinatura } = req.body || {};

  // Validar ID da escola
  if (!Number.isSafeInteger(escolaId) || escolaId <= 0) {
    return res.status(400).json({
      mensagem: "ID da escola inválido."
    });
  }

  // Localizar escola
  const escola = escolas.find(
    (escola) => escola.id === escolaId
  );

  if (!escola) {
    return res.status(404).json({
      mensagem: "Escola não encontrada."
    });
  }

  // Validar data
  if (
    typeof data !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data) ||
    !Number.isFinite(Date.parse(data)) ||
    new Date(data).toISOString().slice(0, 10) !== data
  ) {
    return res.status(400).json({
      mensagem: "Data inválida. Utilize AAAA-MM-DD."
    });
  }

  // Validar assinatura
  if (
    typeof assinatura !== "string" ||
    !assinatura.trim() ||
    assinatura.length > 150
  ) {
    return res.status(400).json({
      mensagem: "Informe uma assinatura válida."
    });
  }

  // Gerar ID do documento
  const novoId = documentos.length
    ? Math.max(...documentos.map(doc => doc.id)) + 1
    : 1;

  // Nome de referência do arquivo
  const nomeArquivo = `carta_convite_${novoId}.pdf`;

  // Registrar documento temporariamente
  const novoDocumento = {
    id: novoId,
    escolaId,
    tipo: "Carta convite",
    data,
    status: "Pendente",
    arquivo: nomeArquivo
  };

  documentos.push(novoDocumento);

  // Gerar e enviar o PDF
  gerarCartaConvite(
    escola,
    data,
    assinatura.trim(),
    res
  );
};



module.exports = {
  listarDocumentos,
  cadastrarDocumento,
  buscarDocumentoPorId,
  listarDocumentosPorEscola,
  atualizarDocumento,
  excluirDocumento,
  gerarCartaConvitePDF,
  documentos
};
