'use strict';

// ── MAPEAMENTOS ──────────────────────────────────────────────
const CAT_LABEL = {
    DEPRESSAO: 'Depressão', ANSIEDADE: 'Ansiedade', ASSEDIO: 'Assédio',
    BULLYING: 'Bullying', VIOLENCIA_PSICOLOGICA: 'Violência Psicológica',
    PEDIDO_AJUDA: 'Pedido de Ajuda'
};
const CAT_BADGE = {
    DEPRESSAO: 'rosa', ANSIEDADE: 'azul', ASSEDIO: 'vermelho',
    BULLYING: 'vermelho', VIOLENCIA_PSICOLOGICA: 'roxo', PEDIDO_AJUDA: 'verde'
};
const STATUS_LABEL = {
    ABERTO: 'Aberto', TRIAGEM: 'Em triagem',
    EM_EXECUCAO: 'Em atendimento', RESOLVIDO: 'Resolvido', ENCERRADO: 'Encerrado'
};
const STATUS_CLASS = {
    ABERTO: 'aberto', TRIAGEM: 'triagem',
    EM_EXECUCAO: 'em-atendimento', RESOLVIDO: 'resolvido', ENCERRADO: 'encerrado'
};
const PRIO_LABEL  = { BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta', URGENTE: 'Urgente' };
const PRIO_CLASS  = { BAIXA: 'baixa', MEDIA: 'media', ALTA: 'alta', URGENTE: 'urgente' };

// ── ESTADO ───────────────────────────────────────────────────
let telaAtual    = 'tela-login';
let modalProtoId = null;

// ── NAVEGAÇÃO ────────────────────────────────────────────────
function ir(id) {
    document.getElementById(telaAtual)?.classList.remove('ativa');
    const alvo = document.getElementById(id);
    if (!alvo) return;
    alvo.classList.add('ativa');
    alvo.querySelector('.corpo')?.scrollTo(0, 0);
    telaAtual = id;
    // Carrega dados ao entrar em certas telas
    if (id === 'tela-home')      carregarHome();
    if (id === 'tela-dashboard') carregarDashboard();
}

// ── API HELPERS ──────────────────────────────────────────────
async function GET(url)         { const r = await fetch(url); return r.ok ? r.json() : null; }
async function POST(url, body)  { const r = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }); return r.ok ? r.json() : null; }
async function PATCH(url, body) { const r = await fetch(url, { method:'PATCH',headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }); return r.ok ? r.json() : null; }

// ── LOGIN ────────────────────────────────────────────────────
function doLogin() {
    const email = document.getElementById('login-email').value.trim();
    const senha = document.getElementById('login-senha').value.trim();
    if (!email || !senha) { toast('⚠️ Preencha e-mail e senha.'); return; }
    // Autenticação simulada (back-end não tem auth ainda)
    ir('tela-home');
    toast('✅ Bem-vindo(a)!');
}

// ── HOME — CASOS RECENTES ────────────────────────────────────
async function carregarHome() {
    const el = document.getElementById('lista-home');
    if (!el) return;
    el.innerHTML = '<p class="msg-carregando">Carregando...</p>';
    const dados = await GET('/solicitacoes');
    if (!dados || dados.length === 0) {
        el.innerHTML = '<p class="msg-vazia">Nenhuma solicitação cadastrada.</p>';
        return;
    }
    // Mostra as 3 mais recentes
    el.innerHTML = dados.slice(-3).reverse().map(s => `
      <div class="card-caso" onclick="verHistorico(${s.protocolo})">
        <div class="caso-esq">
          <span class="badge ${CAT_BADGE[s.categoria] || 'cinza'}">${CAT_LABEL[s.categoria] || s.categoria}</span>
          <p class="caso-desc">${cortar(s.descricao, 55)}</p>
          <span class="caso-data">Prazo: ${s.prazo || '—'}</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
          <span class="status-pill ${STATUS_CLASS[s.status] || ''}">${STATUS_LABEL[s.status] || s.status}</span>
          <span style="color:#8aa49e">›</span>
        </div>
      </div>
    `).join('');
}

// ── NOVA SOLICITAÇÃO ─────────────────────────────────────────
async function enviarSolicitacao() {
    const categoria  = document.getElementById('nova-categoria')?.value;
    const prioridade = document.querySelector('input[name="prioridade"]:checked')?.value;
    const localizacao= document.getElementById('nova-local')?.value.trim() || '';
    const descricao  = document.getElementById('nova-desc')?.value.trim();
    const anonimo    = document.getElementById('anonimo-toggle')?.checked || false;

    if (!categoria)  { toast('⚠️ Selecione a categoria.');  return; }
    if (!prioridade) { toast('⚠️ Selecione a prioridade.'); return; }
    if (!descricao)  { toast('⚠️ Preencha a descrição.');   return; }

    // ← POST real para o Spring Boot
    const criada = await POST('/solicitacoes', { categoria, prioridade, localizacao, descricao, anonimo });
    if (!criada) { toast('❌ Erro ao enviar. Tente novamente.'); return; }

    // Preenche tela de protocolo com dados reais do back
    document.getElementById('numero-protocolo').textContent = `#${criada.protocolo}`;
    document.getElementById('proto-cat').textContent        = CAT_LABEL[criada.categoria]  || criada.categoria;
    document.getElementById('proto-prio').textContent       = PRIO_LABEL[criada.prioridade] || criada.prioridade;
    document.getElementById('proto-prazo').textContent      = criada.prazo || '—';

    ir('tela-protocolo');
    toast('✅ Solicitação enviada!');
}

function copiarProtocolo() {
    const num = document.getElementById('numero-protocolo')?.textContent || '';
    navigator.clipboard?.writeText(num);
    toast('📋 Protocolo copiado!');
}

// ── CONSULTAR CASO ───────────────────────────────────────────
async function buscarCaso() {
    const val = document.getElementById('busca-protocolo')?.value.trim();
    const card = document.getElementById('card-resultado');
    if (!val || isNaN(Number(val))) { toast('⚠️ Digite um número válido.'); return; }

    // ← GET real para o Spring Boot
    const s = await GET(`/solicitacoes/${val}`);
    if (!s) { card.style.display = 'none'; toast('❌ Protocolo não encontrado.'); return; }

    document.getElementById('res-proto').textContent  = `#${s.protocolo}`;
    const badge = document.getElementById('res-badge');
    badge.textContent = CAT_LABEL[s.categoria] || s.categoria;
    badge.className   = `badge ${CAT_BADGE[s.categoria] || 'cinza'}`;
    const spill = document.getElementById('res-status');
    spill.textContent = STATUS_LABEL[s.status] || s.status;
    spill.className   = `status-pill ${STATUS_CLASS[s.status] || ''}`;
    document.getElementById('res-prazo').textContent  = s.prazo || '—';
    document.getElementById('res-prio').textContent   = PRIO_LABEL[s.prioridade] || s.prioridade;
    document.getElementById('res-local').textContent  = s.localizacao || '—';
    document.getElementById('res-desc').textContent   = `"${s.descricao}"`;

    card.style.display = 'block';
    toast('✅ Caso encontrado!');
}

// ── HISTÓRICO ────────────────────────────────────────────────
function verHistorico(id) {
    // Por enquanto navega para a tela de histórico estático
    // (histórico dinâmico depende de HistoricoStatusModel no back)
    ir('tela-historico');
}

// ── DASHBOARD ────────────────────────────────────────────────
async function carregarDashboard() {
    const lista = document.getElementById('lista-dashboard');
    if (!lista) return;
    lista.innerHTML = '<p class="msg-carregando">Carregando...</p>';

    // ← GET real para o Spring Boot
    const dados = await GET('/solicitacoes');
    if (!dados) { lista.innerHTML = '<p class="msg-erro">⚠️ Erro de conexão.</p>'; return; }

    // Atualiza contadores
    const contar = (s)   => dados.filter(x => x.status === s).length;
    const contarP = (p)  => dados.filter(x => x.prioridade === p).length;
    document.getElementById('stat-abertos').textContent   = contar('ABERTO');
    document.getElementById('stat-atend').textContent     = contar('EM_EXECUCAO');
    document.getElementById('stat-resolvidos').textContent= contar('RESOLVIDO');
    document.getElementById('stat-urgentes').textContent  = contarP('URGENTE');

    if (dados.length === 0) { lista.innerHTML = '<p class="msg-vazia">Nenhuma solicitação cadastrada.</p>'; return; }

    lista.innerHTML = dados.map(s => `
      <div class="dash-item" data-status="${s.status}" data-prio="${s.prioridade}">
        <div class="dash-topo">
          <div class="dash-topo-esq">
            <span class="dash-proto">#${s.protocolo}</span>
            <span class="prio-dot ${PRIO_CLASS[s.prioridade] || ''}"></span>
          </div>
          <span class="status-pill ${STATUS_CLASS[s.status] || ''}">${STATUS_LABEL[s.status] || s.status}</span>
        </div>
        <span class="badge ${CAT_BADGE[s.categoria] || 'cinza'}">${CAT_LABEL[s.categoria] || s.categoria}</span>
        <p class="dash-desc">${cortar(s.descricao, 75)}</p>
        <div class="dash-rodape">
          <span class="dash-prazo">⏱ Prazo: ${s.prazo || '—'}</span>
          <button class="btn-mini" onclick="abrirModal(${s.protocolo}, '${s.status}')">Atualizar</button>
        </div>
      </div>
    `).join('');
}

// Filtragem local dos cards
function filtrar(el) {
    document.querySelectorAll('.filtro').forEach(b => b.classList.remove('ativo'));
    el.classList.add('ativo');
    const filtro = el.dataset.filtro;
    document.querySelectorAll('.dash-item').forEach(item => {
        if (filtro === 'TODOS') { item.style.display = ''; return; }
        if (filtro === 'URGENTE') {
            item.style.display = item.dataset.prio === 'URGENTE' ? '' : 'none';
        } else {
            item.style.display = item.dataset.status === filtro ? '' : 'none';
        }
    });
}

// ── MODAL ATUALIZAR STATUS ───────────────────────────────────
function abrirModal(id, statusAtual) {
    modalProtoId = id;
    document.getElementById('modal-proto-texto').textContent = `Protocolo #${id}`;
    const sel = document.getElementById('modal-novo-status');
    if (sel) sel.value = statusAtual;
    document.getElementById('modal-status').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('modal-status').classList.add('hidden');
    modalProtoId = null;
}

async function salvarStatus() {
    const status = document.getElementById('modal-novo-status')?.value;
    if (!modalProtoId || !status) return;

    // ← PATCH real para o Spring Boot
    const ok = await PATCH(`/solicitacoes/${modalProtoId}/status`, { status });
    fecharModal();
    if (ok) {
        toast(`✅ Status atualizado: ${STATUS_LABEL[status] || status}`);
        carregarDashboard();
    } else {
        toast('❌ Erro ao atualizar.');
    }
}

// ── FAQ ──────────────────────────────────────────────────────
function toggleFaq(el) {
    const aberto = el.classList.contains('aberto');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('aberto'));
    if (!aberto) el.classList.add('aberto');
}

// ── TOAST ────────────────────────────────────────────────────
let _toastTimer;
function toast(msg) {
    const el = document.getElementById('toast-msg');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => el.classList.add('hidden'), 3000);
}

// ── UTILITÁRIOS ──────────────────────────────────────────────
function cortar(str, max) {
    if (!str) return '';
    return str.length > max ? str.slice(0, max) + '...' : str;
}

// ── FECHAR MODAL CLICANDO FORA ───────────────────────────────
document.getElementById('modal-status')?.addEventListener('click', e => {
    if (e.target.id === 'modal-status') fecharModal();
});

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    console.log('[MentalHealth] Pronto. API: /solicitacoes');
});
