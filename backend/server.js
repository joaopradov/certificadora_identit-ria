
require("dotenv").config();

const app = require("./src/app");

const {
  prepararUsuarioTeste
} = require("./src/controllers/authController");

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não configurado no .env");
    }

    await prepararUsuarioTeste();

    app.listen(PORT, () => {
      console.log(`Servidor ELLP rodando na porta ${PORT}`);
      console.log("Autenticação de teste preparada.");
    });

  } catch (error) {
    console.error("Erro ao iniciar:", error.message);
    process.exit(1);
  }
}

iniciarServidor();
