// API real: conversa com o back-end (Node + Express) do projeto.
// As rotas do back-end ficam sob o prefixo /api (veja backend/src/app.js).
// Este arquivo "traduz" o que o back-end devolve para o formato que as telas esperam.
import { clearSession, getToken } from './session.js';

// Endereço da API, já com o prefixo /api. Pode ser trocado no arquivo .env
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');

async function request(caminho, { method = 'GET', body, blob = false, semRedirect = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Verifique se o back-end está rodando.');
  }

  if (!resposta.ok) {
    // Token expirado ou inválido: limpa a sessão e volta para o login.
    if (resposta.status === 401 && token && !semRedirect) {
      clearSession();
      if (typeof window !== 'undefined') window.location.assign('/login');
      throw new Error('Sua sessão expirou. Entre novamente.');
    }
    let mensagem = `Erro ${resposta.status}`;
    try {
      const erro = await resposta.json();
      // O back-end devolve as mensagens no campo "mensagem".
      mensagem = erro.mensagem || erro.message || erro.erro || erro.error || mensagem;
    } catch {
      /* resposta sem JSON */
    }
    throw new Error(mensagem);
  }
  if (blob) return resposta.blob();
  if (resposta.status === 204) return null;
  return resposta.json();
}

// ---------- ajustes de formato ----------
const semCamposDeTela = ({ id, totalAlunos, escolaNome, ...resto }) => resto;

// O back-end exige escolaId como NÚMERO; o formulário guarda como texto.
const corpoAluno = (d) => ({
  nome: d.nome,
  escolaId: Number(d.escolaId),
  serie: d.serie,
  dataEntrada: d.dataEntrada,
  situacao: d.situacao || 'Ativo',
});

const nomesDasEscolas = (escolas) => Object.fromEntries(escolas.map((e) => [e.id, e.nome]));

const httpApi = {
  // ---------- autenticação ----------
  async login(email, senha) {
    const dados = await request('/auth/login', {
      method: 'POST',
      body: { email, senha },
      semRedirect: true,
    });
    return {
      token: dados.token,
      usuario: dados.usuario || { email, nome: email.split('@')[0] },
    };
  },

  // ---------- dashboard ----------
  // O back-end devolve { indicadores, ultimasEscolas }. Os textos de apoio dos
  // cartões (em convênio, instituições, cartas) são calculados com as listas.
  async getDashboard() {
    const [dash, escolas, alunos, documentos] = await Promise.all([
      request('/dashboard'),
      request('/escolas'),
      request('/alunos'),
      request('/documentos'),
    ]);
    const ind = dash.indicadores || {};
    const ativos = alunos.filter((a) => a.situacao === 'Ativo');
    const pendentes = documentos.filter((d) => d.status === 'Pendente');
    return {
      totalEscolas: ind.escolasParticipantes ?? 0,
      escolasEmConvenio: escolas.filter((e) => e.situacao === 'Em convênio').length,
      totalAlunos: ind.alunosAtendidos ?? 0,
      instituicoesComAlunos: new Set(ativos.map((a) => a.escolaId)).size,
      documentosPendentes: ind.documentosPendentes ?? 0,
      cartasAEnviar: pendentes.filter((d) => d.tipo === 'Carta convite').length,
      ultimasEscolas: dash.ultimasEscolas || [],
    };
  },

  // ---------- escolas ----------
  // O back-end não devolve a quantidade de alunos; contamos pelos alunos ativos.
  async listEscolas() {
    const [escolas, alunos] = await Promise.all([request('/escolas'), request('/alunos')]);
    const contagem = {};
    alunos
      .filter((a) => a.situacao === 'Ativo')
      .forEach((a) => {
        contagem[a.escolaId] = (contagem[a.escolaId] || 0) + 1;
      });
    return escolas.map((e) => ({ ...e, totalAlunos: contagem[e.id] || 0 }));
  },
  getEscola: (id) => request(`/escolas/${id}`),
  async createEscola(dados) {
    const r = await request('/escolas', { method: 'POST', body: semCamposDeTela(dados) });
    return r.escola;
  },
  async updateEscola(id, dados) {
    const r = await request(`/escolas/${id}`, { method: 'PUT', body: semCamposDeTela(dados) });
    return r.escola;
  },

  // ---------- alunos ----------
  async listAlunos(escolaId) {
    const [alunos, escolas] = await Promise.all([
      request(escolaId ? `/alunos/escola/${escolaId}` : '/alunos'),
      request('/escolas'),
    ]);
    const nomes = nomesDasEscolas(escolas);
    return alunos.map((a) => ({ ...a, escolaNome: nomes[a.escolaId] || '—' }));
  },
  getAluno: (id) => request(`/alunos/${id}`),
  async createAluno(dados) {
    const r = await request('/alunos', { method: 'POST', body: corpoAluno(dados) });
    return r.aluno;
  },
  async updateAluno(id, dados) {
    const r = await request(`/alunos/${id}`, { method: 'PUT', body: corpoAluno(dados) });
    return r.aluno;
  },
  deleteAluno: (id) => request(`/alunos/${id}`, { method: 'DELETE' }),

  // ---------- documentos ----------
  async listDocumentos(escolaId) {
    const [documentos, escolas] = await Promise.all([
      request(escolaId ? `/documentos/escola/${escolaId}` : '/documentos'),
      request('/escolas'),
    ]);
    const nomes = nomesDasEscolas(escolas);
    return documentos
      .map((d) => ({ ...d, escolaNome: nomes[d.escolaId] || '—' }))
      .sort((a, b) => b.data.localeCompare(a.data));
  },
  // O back-end registra a carta como "Pendente" e devolve o PDF gerado com PDFKit.
  async gerarCarta({ escolaId, data, assinatura }) {
    const blob = await request('/documentos/gerar-carta', {
      method: 'POST',
      body: { escolaId: Number(escolaId), data, assinatura },
      blob: true,
    });
    return { documento: { arquivo: 'carta_convite.pdf' }, blob };
  },
};

export default httpApi;
