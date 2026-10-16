
const express = require("express");
const router = express.Router();

const documentoController = require(
  "../controllers/documentoController"
);

// Listar todos os documentos
router.get("/", documentoController.listarDocumentos);

// Listar documentos de uma escola
router.get(
  "/escola/:escolaId",
  documentoController.listarDocumentosPorEscola
);

// Consultar documento pelo ID
router.get(
  "/:id",
  documentoController.buscarDocumentoPorId
);

// Cadastrar documento
router.post(
  "/",
  documentoController.cadastrarDocumento
);

// Atualizar documento
router.put("/:id", documentoController.atualizarDocumento);

// Deletar socumento
router.delete("/:id", documentoController.excluirDocumento);

// Gerar Carta COnvite
router.post(
  "/gerar-carta",
  documentoController.gerarCartaConvitePDF
);


module.exports = router;
