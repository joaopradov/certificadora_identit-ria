
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Usuário temporário apenas para desenvolvimento
let usuarioTeste;

async function prepararUsuarioTeste() {
  const senhaHash = await bcrypt.hash("ELLP@Teste2026", 12);

  usuarioTeste = {
    id: 1,
    nome: "Coordenação ELLP",
    email: "coordenacao@exemplo.com",
    senha: senhaHash,
    perfil: "Coordenacao"
  };
}

const login = async (req, res) => {
  try {
    const { email, senha } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof senha !== "string" ||
      !email.trim() ||
      !senha
    ) {
      return res.status(400).json({
        mensagem: "Informe e-mail e senha."
      });
    }

    if (!usuarioTeste) {
      return res.status(503).json({
        mensagem: "Autenticação indisponível."
      });
    }

    const emailValido =
      usuarioTeste.email === email.trim().toLowerCase();

    // Comparar a senha com o hash armazenado
    const senhaValida = await bcrypt.compare(
      senha,
      usuarioTeste.senha
    );

    if (!emailValido || !senhaValida) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos."
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não configurado.");
    }

    // Gerar token de autenticação
    const token = jwt.sign(
      {
        id: usuarioTeste.id,
        perfil: usuarioTeste.perfil
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      usuario: {
        id: usuarioTeste.id,
        nome: usuarioTeste.nome,
        email: usuarioTeste.email,
        perfil: usuarioTeste.perfil
      },
      token
    });

  } catch (error) {
    console.error("Erro no login:", error.message);

    return res.status(500).json({
      mensagem: "Erro interno ao realizar login."
    });
  }
};

module.exports = {
  login,
  prepararUsuarioTeste
};
