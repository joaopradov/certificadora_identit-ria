
const express = require("express");
const cors = require("cors");

const escolaRoutes = require("./routes/escolaRoutes");
const alunoRoutes = require("./routes/alunoRoutes");
const documentoRoutes = require("./routes/documentoRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const autenticar = require("./middlewares/authMiddleware");


const app = express();

app.use(cors());
app.use(express.json());


// Rota de verificação (pública)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    mensagem: "API do ELLP funcionando!"
  });
});

// Autenticação (pública)
app.use("/api/auth", authRoutes);

// Rotas protegidas
app.use("/api/escolas", autenticar, escolaRoutes);
app.use("/api/alunos", autenticar, alunoRoutes);
app.use("/api/documentos", autenticar, documentoRoutes);
app.use("/api/dashboard", autenticar, dashboardRoutes);



module.exports = app;
