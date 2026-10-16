
const escolas = [
  {
    id: 1,
    nome: "Escola Municipal Monteiro Lobato",
    tipo: "Escola pública",
    cidade: "Cornélio Procópio",
    endereco: "",
    telefone: "",
    email: "",
    situacao: "Ativa",
    representante: {
      nome: "Marta Souza",
      cargo: "Diretora",
      telefone: "",
      email: ""
    }
  },
  {
    id: 2,
    nome: "Colégio Estadual Dom Pedro II",
    tipo: "Escola pública",
    cidade: "Bandeirantes",
    endereco: "",
    telefone: "",
    email: "",
    situacao: "Em convênio",
    representante: {
      nome: "João Ribeiro",
      cargo: "Diretor",
      telefone: "",
      email: ""
    }
  },
  {
    id: 3,
    nome: "ONG Futuro Digital",
    tipo: "ONG",
    cidade: "Cornélio Procópio",
    endereco: "",
    telefone: "",
    email: "",
    situacao: "Ativa",
    representante: {
      nome: "Carla Mendes",
      cargo: "Representante",
      telefone: "",
      email: ""
    }
  }
];

// Listar todas as escolas
const listarEscolas = (req, res) => {
  return res.status(200).json(escolas);
};


const cadastrarEscola = (req, res) => {
  const {
    nome,
    tipo,
    cidade,
    endereco,
    telefone,
    email,
    situacao,
    representante
  } = req.body;

  // Validação dos campos obrigatórios
  if (
    !nome ||
    !tipo ||
    !cidade ||
    !situacao ||
    !representante ||
    !representante.nome
  ) {
    return res.status(400).json({
      mensagem: "Preencha os campos obrigatórios."
    });
  }

  const situacoesValidas = [
    "Ativa",
    "Em convênio",
    "Pendente",
    "Inativa"
  ];

  if (!situacoesValidas.includes(situacao)) {
    return res.status(400).json({
      mensagem: "Situação da escola inválida."
    });
  }

  // Gerar um ID para a nova escola
  const novoId = escolas.length
    ? Math.max(...escolas.map(escola => escola.id)) + 1
    : 1;

  const novaEscola = {
    id: novoId,
    nome,
    tipo,
    cidade,
    endereco,
    telefone,
    email,
    situacao,
    representante
  };

  // Adicionar ao armazenamento temporário
  escolas.push(novaEscola);

  return res.status(201).json({
    mensagem: "Escola cadastrada com sucesso!",
    escola: novaEscola
  });
};


const buscarEscolaPorId = (req, res) => {
  const id = Number(req.params.id);

  // Validar o ID recebido
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "ID inválido."
    });
  }

  // Procurar a escola na lista
  const escola = escolas.find(
    (escola) => escola.id === id
  );

  // Verificar se a escola existe
  if (!escola) {
    return res.status(404).json({
      mensagem: "Escola não encontrada."
    });
  }

  return res.status(200).json(escola);
};


const atualizarEscola = (req, res) => {
  const id = Number(req.params.id);

  // Verificar se o ID é válido
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "ID inválido."
    });
  }

  // Encontrar a escola cadastrada
  const escola = escolas.find(
    (escola) => escola.id === id
  );

  if (!escola) {
    return res.status(404).json({
      mensagem: "Escola não encontrada."
    });
  }

  const {
    nome,
    tipo,
    cidade,
    endereco,
    telefone,
    email,
    situacao,
    representante
  } = req.body;

  // Validar os campos obrigatórios
  if (
    !nome ||
    !tipo ||
    !cidade ||
    !situacao ||
    !representante ||
    typeof representante !== "object" ||
    Array.isArray(representante) ||
    !representante.nome
  ) {
    return res.status(400).json({
      mensagem: "Preencha os campos obrigatórios."
    });
  }

  const situacoesValidas = [
    "Ativa",
    "Em convênio",
    "Pendente",
    "Inativa"
  ];

  if (!situacoesValidas.includes(situacao)) {
    return res.status(400).json({
      mensagem: "Situação da escola inválida."
    });
  }

  // Atualizar as informações
  Object.assign(escola, {
    nome,
    tipo,
    cidade,
    endereco,
    telefone,
    email,
    situacao,
    representante
  });

  return res.status(200).json({
    mensagem: "Escola atualizada com sucesso!",
    escola
  });
};

// Deletar escola
const excluirEscola = (req, res) => {
  const id = Number(req.params.id);

  // Validar o ID da escola
  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "ID da escola inválido."
    });
  }

  // Localizar a escola
  const indice = escolas.findIndex(
    (escola) => escola.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Escola não encontrada."
    });
  }

  // Consultar alunos vinculados
  const { alunos } = require("./alunoController");

  const possuiAlunos = alunos.some(
    (aluno) => aluno.escolaId === id
  );

  // Consultar documentos vinculados
  const { documentos } = require("./documentoController");

  const possuiDocumentos = documentos.some(
    (documento) => documento.escolaId === id
  );

  // Impedir exclusão se houver vínculos
  if (possuiAlunos || possuiDocumentos) {
    return res.status(409).json({
      mensagem:
        "Não é possível excluir uma escola com alunos ou documentos vinculados."
    });
  }

  // Excluir a escola
  escolas.splice(indice, 1);

  return res.status(200).json({
    mensagem: "Escola excluída com sucesso!"
  });
};




module.exports = {
  listarEscolas,
  cadastrarEscola,
  buscarEscolaPorId,
  atualizarEscola,
  excluirEscola,
  escolas
};