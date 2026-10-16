
const express = require("express");
const router = express.Router();

const alunoController = require("../controllers/alunoController");

// Listar todos os alunos
router.get("/", alunoController.listarAlunos);

// Listar alunos de uma escola específica
router.get(
  "/escola/:escolaId",
  alunoController.listarAlunosPorEscola
);

// Consultar aluno pelo ID
router.get("/:id", alunoController.buscarAlunoPorId);

// Cadastrar novo aluno
router.post("/", alunoController.cadastrarAluno);

// Atualizar aluno
router.put("/:id", alunoController.atualizarAluno);

// Deletar aluno
router.delete("/:id", alunoController.excluirAluno);


module.exports = router;
