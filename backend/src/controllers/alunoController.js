const { escolas } = require("./escolaController");

const alunos = [
  {
    id: 1,
    nome: "Ana Clara Ferreira",
    escolaId: 1,
    serie: "6º ano",
    dataEntrada: "2026-03-12",
    situacao: "Ativo"
  },
  {
    id: 2,
    nome: "Bruno Henrique Costa",
    escolaId: 1,
    serie: "7º ano",
    dataEntrada: "2026-03-12",
    situacao: "Ativo"
  },
  {
    id: 3,
    nome: "Camila Oliveira",
    escolaId: 1,
    serie: "5º ano",
    dataEntrada: "2026-04-25",
    situacao: "Ativo"
  }
];

// Listar todos os alunos
const listarAlunos = (req, res) => {
  return res.status(200).json(alunos);
};

// CAdastrar aluno
const cadastrarAluno = (req, res) => {
  const {
    nome,
    escolaId,
    serie,
    dataEntrada,
    situacao = "Ativo"
  } = req.body;

  // Validar campos obrigatórios
  if (
    typeof nome !== "string" ||
    !nome.trim() ||
    typeof serie !== "string" ||
    !serie.trim() ||
    typeof dataEntrada !== "string" ||
    !dataEntrada
  ) {
    return res.status(400).json({
      mensagem: "Preencha os campos obrigatórios."
    });
  }

  // Validar o ID da escola
  if (
    !Number.isInteger(escolaId) ||
    escolaId <= 0
  ) {
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

  // Validar a situação
  if (!["Ativo", "Inativo"].includes(situacao)) {
    return res.status(400).json({
      mensagem: "Situação do aluno inválida."
    });
  }

  // Validar o formato da data
  const formatoData = /^\d{4}-\d{2}-\d{2}$/;

  if (
    !formatoData.test(dataEntrada) ||
    Number.isNaN(Date.parse(dataEntrada)) ||
    new Date(dataEntrada).toISOString().slice(0, 10) !== dataEntrada
  ) {
    return res.status(400).json({
      mensagem: "Data inválida. Utilize AAAA-MM-DD."
    });
  }

  // Gerar o próximo ID
  const novoId = alunos.length
    ? Math.max(...alunos.map(aluno => aluno.id)) + 1
    : 1;

  const novoAluno = {
    id: novoId,
    nome: nome.trim(),
    escolaId,
    serie: serie.trim(),
    dataEntrada,
    situacao
  };

  alunos.push(novoAluno);

  return res.status(201).json({
    mensagem: "Aluno cadastrado com sucesso!",
    aluno: novoAluno
  });
};

//Buscar aluno ID
const buscarAlunoPorId = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "ID do aluno inválido."
    });
  }

  const aluno = alunos.find(
    (aluno) => aluno.id === id
  );

  if (!aluno) {
    return res.status(404).json({
      mensagem: "Aluno não encontrado."
    });
  }

  return res.status(200).json(aluno);
};

//Listar Aluno Escola
const listarAlunosPorEscola = (req, res) => {
  const escolaId = Number(req.params.escolaId);

  if (!Number.isInteger(escolaId) || escolaId <= 0) {
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

  const alunosDaEscola = alunos.filter(
    (aluno) => aluno.escolaId === escolaId
  );

  return res.status(200).json(alunosDaEscola);
};


// Atualizar aluno
const atualizarAluno = (req, res) => {
  const id = Number(req.params.id);

  // Validar o ID do aluno
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "ID do aluno inválido."
    });
  }

  // Verificar se o aluno existe
  const aluno = alunos.find(
    (aluno) => aluno.id === id
  );

  if (!aluno) {
    return res.status(404).json({
      mensagem: "Aluno não encontrado."
    });
  }

  const {
    nome,
    escolaId,
    serie,
    dataEntrada,
    situacao
  } = req.body || {};

  // Validar campos obrigatórios
  if (
    typeof nome !== "string" ||
    !nome.trim() ||
    typeof serie !== "string" ||
    !serie.trim() ||
    typeof dataEntrada !== "string" ||
    !dataEntrada ||
    !Number.isInteger(escolaId) ||
    escolaId <= 0
  ) {
    return res.status(400).json({
      mensagem: "Preencha os campos obrigatórios corretamente."
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

  // Validar situação do aluno
  if (!["Ativo", "Inativo"].includes(situacao)) {
    return res.status(400).json({
      mensagem: "Situação do aluno inválida."
    });
  }

  // Validar data
  const formatoData = /^\d{4}-\d{2}-\d{2}$/;

  if (
    !formatoData.test(dataEntrada) ||
    Number.isNaN(Date.parse(dataEntrada)) ||
    new Date(dataEntrada).toISOString().slice(0, 10) !== dataEntrada
  ) {
    return res.status(400).json({
      mensagem: "Data inválida. Utilize AAAA-MM-DD."
    });
  }

  // Atualizar as informações
  Object.assign(aluno, {
    nome: nome.trim(),
    escolaId,
    serie: serie.trim(),
    dataEntrada,
    situacao
  });

  return res.status(200).json({
    mensagem: "Aluno atualizado com sucesso!",
    aluno
  });
};

// Deletar aluno
const excluirAluno = (req, res) => {
  const id = Number(req.params.id);

  // Validar o ID
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: "ID do aluno inválido."
    });
  }

  // Localizar o aluno
  const indice = alunos.findIndex(
    (aluno) => aluno.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      mensagem: "Aluno não encontrado."
    });
  }

  // Remover aluno da lista temporária
  alunos.splice(indice, 1);

  return res.status(200).json({
    mensagem: "Aluno excluído com sucesso!"
  });
};



module.exports = {
  listarAlunos,
  cadastrarAluno,
  buscarAlunoPorId,
  listarAlunosPorEscola,
  atualizarAluno,
  excluirAluno,
  alunos
};
