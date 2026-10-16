
const { escolas } = require("./escolaController");
const { alunos } = require("./alunoController");
const { documentos } = require("./documentoController");

// Obter indicadores do Dashboard
const obterDashboard = (req, res) => {

  // Escolas participantes
  const escolasParticipantes = escolas.filter(
    (escola) =>
      escola.situacao === "Ativa" ||
      escola.situacao === "Em convênio"
  ).length;

  // Alunos ativos
  const alunosAtendidos = alunos.filter(
    (aluno) => aluno.situacao === "Ativo"
  ).length;

  // Documentos pendentes
  const documentosPendentes = documentos.filter(
    (documento) => documento.status === "Pendente"
  ).length;

  // Últimas escolas cadastradas
  const ultimasEscolas = [...escolas]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5)
    .map((escola) => ({
      id: escola.id,
      nome: escola.nome,
      cidade: escola.cidade,
      situacao: escola.situacao
    }));

  return res.status(200).json({
    indicadores: {
      escolasParticipantes,
      alunosAtendidos,
      documentosPendentes
    },
    ultimasEscolas
  });
};

module.exports = {
  obterDashboard
};
