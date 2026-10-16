
const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {
  // Obter o cabeçalho Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensagem: "Token de autenticação não informado."
    });
  }

  // Verificar o formato Bearer TOKEN
  const partes = authHeader.split(" ");

  if (
    partes.length !== 2 ||
    partes[0] !== "Bearer" ||
    !partes[1]
  ) {
    return res.status(401).json({
      mensagem: "Formato de token inválido."
    });
  }

  const token = partes[1];

  try {
    // Validar assinatura e validade do JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ["HS256"] }
    );

    // Disponibilizar os dados para as próximas rotas
    req.usuario = {
      id: decoded.id,
      perfil: decoded.perfil
    };

    next();

  } catch (error) {
    return res.status(401).json({
      mensagem: "Token inválido ou expirado."
    });
  }
};

module.exports = autenticar;
