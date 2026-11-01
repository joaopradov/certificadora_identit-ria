# ELLP — Sistema de Controle de Escolas Participantes

Sistema web para centralizar e organizar as informações das instituições participantes do **ELLP**, projeto de extensão da Universidade Tecnológica Federal do Paraná (UTFPR), câmpus Cornélio Procópio.

Projeto desenvolvido na disciplina **Certificadora de Competência Identitária** do curso de Tecnologia em Análise e Desenvolvimento de Sistemas.

> **Status:** em desenvolvimento. Entrega final prevista para 30/11/2026.

## Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Objetivos](#-objetivos)
- [Funcionalidades](#️-funcionalidades)
- [Status do projeto](#-status-do-projeto)
- [Protótipo](#️-protótipo)
- [Tecnologias](#️-tecnologias)
- [Estrutura do repositório](#️-estrutura-do-repositório)
- [Modelo de dados](#-modelo-de-dados)
- [Como executar](#️-como-executar)
- [Front-end: telas e rotas](#️-front-end-telas-e-rotas)
- [Segurança e LGPD](#-segurança-e-lgpd)
- [Equipe](#-equipe)
- [Cronograma](#-cronograma)
- [Próximos passos](#-próximos-passos)
- [Contexto acadêmico](#-contexto-acadêmico)

## 📌 Sobre o projeto

O ELLP é um projeto de extensão da UTFPR Cornélio Procópio, desenvolvido desde 2014, que atende crianças e adolescentes de escolas públicas, organizações não governamentais (ONGs) e creches, apresentando a eles o ambiente universitário.

Para funcionar, o projeto depende de instituições parceiras, e as informações sobre elas (dados da instituição, representantes, alunos atendidos e documentos) ficam dispersas. Isso dificulta saber quais instituições participam, quantos alunos são atendidos e quais documentos estão pendentes.

A proposta é uma aplicação **fullstack** que reúne essas informações em um só lugar, de forma prática, segura e eficiente.

## 🎯 Objetivos

**Objetivo geral:** desenvolver um sistema web para facilitar o gerenciamento das instituições parceiras do ELLP, com mais controle, organização e acessibilidade às informações.

**Objetivos específicos:**

- Centralizar o cadastro das instituições participantes e controlar a situação de participação de cada uma;
- Gerenciar os representantes vinculados às instituições;
- Cadastrar e acompanhar os alunos atendidos, relacionando-os às suas escolas;
- Organizar os documentos (cartas convite e convênios) e acompanhar o status de cada um;
- Automatizar a geração de cartas convite em PDF;
- Disponibilizar indicadores para o acompanhamento das atividades;
- Aplicar, em uma solução prática, os conhecimentos adquiridos ao longo do curso.

## ⚙️ Funcionalidades

**Autenticação**
- Login de usuários autorizados e controle de acesso ao sistema;
- Recuperação de senha (prevista).

**Escolas e representantes**
- Cadastro, consulta e edição de instituições, com contato e localização;
- Controle da situação de participação (ativa, em convênio, pendente ou inativa);
- Busca por nome e filtro por situação;
- Cadastro do representante, vinculado à escola.

**Alunos**
- Cadastro, edição e remoção de alunos;
- Vínculo com a instituição, série e data de entrada no projeto;
- Controle da situação do aluno (ativo ou inativo).

**Documentos**
- Registro de cartas convite e convênios;
- Acompanhamento do status (pendente, enviado ou assinado);
- Geração da carta convite em PDF, com pré-visualização.

**Painel de controle**
- Quantidade de instituições participantes, total de alunos atendidos e documentos pendentes;
- Últimas escolas cadastradas e atalhos para as principais operações.

## 🚧 Status do projeto

| Parte | Situação |
| --- | --- |
| Planejamento | Concluído |
| Protótipo no Figma | Concluído, com 8 telas navegáveis |
| Front-end (React) | Em desenvolvimento: telas do protótipo implementadas, com modo de demonstração |
| Back-end (Node.js + Express) | Em desenvolvimento: CRUD, painel, autenticação com JWT e bcrypt e geração de PDF com PDFKit; dados ainda em memória |
| Banco de dados | Planejado: persistência com Sequelize |
| Integração front-end e back-end | Planejada |
| Testes e implantação | Planejados |

## 🖼️ Protótipo

- **Protótipo navegável:** [abrir no Figma](COLE_AQUI_O_LINK_DO_FIGMA)
- **Imagens das telas:** pasta [`docs/prototipo/`](docs/prototipo/)

O protótipo tem 8 telas: login, início (painel), lista de escolas, cadastro de escola, detalhe da escola, documentos, geração da carta convite e cadastro de aluno. Os dados exibidos são ilustrativos.

## 🛠️ Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Front-end | React, Vite, React Router, JavaScript, HTML5 e CSS3 |
| Back-end | Node.js, Express, JWT, bcrypt, PDFKit e Sequelize |
| Banco de dados | MySQL |
| Ferramentas | Git e GitHub, Figma, Postman e Visual Studio Code |

As tecnologias podem ser ajustadas conforme as necessidades do desenvolvimento.

## 🗂️ Estrutura do repositório

O projeto tem duas partes principais:

- **Front-end:** interface, navegação e interação com os usuários;
- **Back-end:** regras de negócio, autenticação, gerenciamento dos dados, integração com o banco e geração de documentos.

```
.
├── backend/
│   ├── server.js          # inicia o servidor
│   └── src/
│       ├── app.js         # configura a API e conecta as rotas
│       ├── routes/        # caminhos de acesso
│       ├── controllers/   # validação e manipulação dos dados
│       ├── middlewares/   # verificação do token JWT
│       └── services/      # geração da carta convite com PDFKit
├── frontend/
│   └── src/
│       ├── components/    # layout, menu lateral, campos, etiquetas e cartões
│       ├── context/       # AuthContext (login, logout e sessão)
│       ├── hooks/         # useAsync (carregamento de dados)
│       ├── pages/         # uma tela por arquivo
│       ├── services/      # api.js (seletor), mockApi.js, httpApi.js e mockData.js
│       ├── styles/        # global.css (cores e estilos do protótipo)
│       ├── utils/         # formatação de datas
│       ├── App.jsx        # rotas
│       └── main.jsx
├── docs/                  # protótipo e diagramas
└── README.md
```

O back-end é organizado nos módulos autenticação, escolas, alunos, documentos e painel.

## 🧩 Modelo de dados

Modelo conceitual simplificado, que ainda pode mudar:

| Entidade | Principais atributos | Relacionamento |
| --- | --- | --- |
| Usuário | id, e-mail, senha (hash) | Acessa o sistema pela API |
| Escola | id, nome, situação, representante | Tem vários alunos e vários documentos |
| Representante | nome, cargo, telefone, e-mail | Hoje é um objeto dentro da escola; está planejado como entidade própria |
| Aluno | id, nome, escolaId | Pertence a uma escola |
| Documento | id, tipo, status, escolaId, arquivo | Pertence a uma escola |

## ▶️ Como executar

**Pré-requisitos:** [Node.js](https://nodejs.org/) (versão LTS) e Git.

```bash
git clone <URL-do-repositório>
cd <nome-do-repositório>
```

### Front-end

```bash
cd frontend
npm install
cp .env.example .env     # no Windows: copy .env.example .env
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

**Acesso de demonstração:** `admin@ellp.edu.br` / `admin123`

O front-end funciona de duas formas, controladas pelo arquivo `.env`:

| `VITE_USE_MOCK` | O que acontece |
| --- | --- |
| `true` (padrão) | Usa dados de exemplo guardados no navegador. Não precisa do back-end. |
| `false` | Conversa com o back-end em `VITE_API_URL` (padrão `http://localhost:3000`). |

Todas as telas falam apenas com `src/services/api.js`, então trocar de modo não exige mudar nenhuma tela.

### Back-end

```bash
cd backend
npm install
npm start
```

Ajuste o comando de início conforme o `package.json` do back-end.

### Ligando o front-end ao back-end

1. Inicie o back-end.
2. No `.env` do front-end, coloque `VITE_USE_MOCK=false` e confira o endereço em `VITE_API_URL`.
3. No back-end, libere o CORS para `http://localhost:5173` (pacote `cors` do Express).
4. Se as rotas do back-end forem diferentes das listadas abaixo, ajuste os caminhos em `frontend/src/services/httpApi.js`.

Rotas que o front-end espera (**proposta**, a combinar com quem faz o back-end):

| Ação | Método e caminho |
| --- | --- |
| Entrar | `POST /auth/login` com `{ email, senha }` e resposta `{ token, usuario }` |
| Painel | `GET /dashboard` |
| Escolas | `GET /escolas`, `GET /escolas/:id`, `POST /escolas`, `PUT /escolas/:id` |
| Alunos | `GET /alunos?escolaId=`, `GET /alunos/:id`, `POST /alunos`, `PUT /alunos/:id`, `DELETE /alunos/:id` |
| Documentos | `GET /documentos?escolaId=`, `POST /documentos/carta-convite` (devolve o PDF) |

As requisições autenticadas enviam o cabeçalho `Authorization: Bearer <token>`.

O painel espera os campos `totalEscolas`, `escolasEmConvenio`, `totalAlunos`, `instituicoesComAlunos`, `documentosPendentes`, `cartasAEnviar` e `ultimasEscolas` (lista de escolas). A lista de escolas pode trazer `totalAlunos` em cada item.

## 🖥️ Front-end: telas e rotas

| Tela | Rota | Arquivo |
| --- | --- | --- |
| Login | `/login` | `src/pages/Login.jsx` |
| Início | `/` | `src/pages/Dashboard.jsx` |
| Lista de escolas | `/escolas` | `src/pages/Escolas.jsx` |
| Cadastro e edição de escola | `/escolas/nova`, `/escolas/:id/editar` | `src/pages/EscolaForm.jsx` |
| Detalhe da escola (abas) | `/escolas/:id` | `src/pages/EscolaDetalhe.jsx` |
| Lista de alunos | `/alunos` | `src/pages/Alunos.jsx` |
| Cadastro e edição de aluno | `/alunos/novo`, `/alunos/:id/editar` | `src/pages/AlunoForm.jsx` |
| Documentos | `/documentos` | `src/pages/Documentos.jsx` |
| Gerar carta convite | `/documentos/carta` | `src/pages/GerarCarta.jsx` |

Todas as rotas, exceto o login, exigem autenticação (`PrivateRoute`).

**Decisões do front-end**
- **Visual:** cores, fonte (Inter) e componentes seguem o protótipo do Figma. As cores ficam nas variáveis do início de `src/styles/global.css`.
- **Carta convite:** com o back-end, o PDF gerado pelo PDFKit é baixado. No modo de demonstração, o navegador abre a impressão (escolha "Salvar como PDF") e apenas a carta é impressa.
- **Sessão:** o token fica no `localStorage`.

## 🔒 Segurança e LGPD

O sistema gerencia informações de crianças e adolescentes, por isso o projeto segue os princípios da Lei Geral de Proteção de Dados Pessoais (LGPD):

- **Coleta mínima:** o cadastro de aluno pede apenas nome, escola, série e data de entrada;
- **Autenticação:** acesso restrito a usuários autorizados, com token JWT;
- **Senhas:** armazenadas com hash (bcrypt);
- **Restrição de acesso:** os dados só são exibidos a quem estiver autenticado.

## 👥 Equipe

| Integrante | Responsabilidades |
| --- | --- |
| Lívia Pontes Argenton | Planejamento, prototipação, front-end, integração e documentação |
| Raissa Albuquerque Diniz | Contato com o ELLP, levantamento de requisitos e prototipação |
| João Vitor Prado | Modelagem, banco de dados, back-end e integração |

## 📅 Cronograma

| Período | Atividade |
| --- | --- |
| 03/09 – 17/09 | Definição da ideia e planejamento inicial |
| 17/09 – 24/09 | Contato com o ELLP e levantamento de requisitos |
| 24/09 – 01/10 | Definição das funcionalidades e modelagem inicial |
| 01/10 – 08/10 | Prototipação das telas e modelagem do banco de dados |
| 08/10 – 15/10 | Desenvolvimento inicial e preparação do pitch |
| **16/10** | **Pitch e seminário de relatório** |
| 17/10 – 31/10 | Desenvolvimento do back-end e do front-end |
| 01/11 – 10/11 | Integração do sistema |
| 10/11 – 20/11 | Testes e correções |
| 20/11 – 27/11 | Documentação e finalização |
| **30/11** | **Entrega final** |

## 🔭 Próximos passos

- Persistir os dados em banco, com Sequelize, no lugar dos dados em memória;
- Integrar o front-end ao back-end e remover a dependência do modo de demonstração;
- Transformar o representante em entidade própria;
- Definir o armazenamento definitivo dos PDFs e permitir o download dos arquivos na lista de documentos;
- Implementar a recuperação de senha e o tratamento de token expirado;
- Adicionar paginação nas listas;
- Criar testes automatizados e realizar a validação com o ELLP;
- Implantar o sistema.

## 🎓 Contexto acadêmico

Projeto desenvolvido no contexto da **UTFPR — Câmpus Cornélio Procópio**, em parceria com o projeto de extensão **ELLP**, com o objetivo de aplicar os conhecimentos de desenvolvimento fullstack na solução de um problema real de organização e gerenciamento de informações.
