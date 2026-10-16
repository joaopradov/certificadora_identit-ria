
const express = require("express");
const router = express.Router();

const escolaController = require("../controllers/escolaController");

// Listar escolas
router.get("/", escolaController.listarEscolas);

// Cadastrar escola
router.post("/", escolaController.cadastrarEscola);

// Buscar escola por ID
router.get("/:id", escolaController.buscarEscolaPorId);

// Atualizar escola
router.put("/:id", escolaController.atualizarEscola);

// Excluir escola
router.delete("/:id", escolaController.excluirEscola);

module.exports = router;
