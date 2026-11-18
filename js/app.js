/* ============================================================
   Rastro Edu — Gestão Escolar
   JavaScript Application
   ============================================================ */

const RastroEdu = (() => {
  'use strict';

  // ── State ──
  let charts = {};
  let currentPage = 'dashboard';

  // ── Data Keys ──
  const KEYS = {
    alunos: 'rastro_alunos',
    cantina: 'rastro_cantina',
    frequencia: 'rastro_frequencia',
    movimentos: 'rastro_movimentos',
    config: 'rastro_config',
    theme: 'rastro_theme',
    color: 'rastro_color',
  };

  // ── Helpers ──
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function uuid() {
    return 'xxxx-xxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));
  }

  function today() {
    return new Date().toISOString().split('T')[0];
  }

  function formatDate(d) {
    if (!d) return '-';
    const parts = d.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  function getData(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
  }

  function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function getConfig() {
    try { return JSON.parse(localStorage.getItem(KEYS.config)) || {}; }
    catch { return {}; }
  }

  function setConfig(cfg) {
    localStorage.setItem(KEYS.config, JSON.stringify(cfg));
  }

  // ── Toast ──
  function toast(message, type = 'success') {
    const container = $('#toast-container');
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle',
    };
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;
    container.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 3500);
  }

  // ── Modal ──
  function abrirModal(id) {
    $(`#${id}`).classList.add('show');
  }

  function fecharModal(id) {
    $(`#${id}`).classList.remove('show');
  }

  // ── Sample Data ──
  function gerarDadosExemplo() {
    const nomes = [
      'Ana Clara Silva', 'Pedro Henrique Souza', 'Maria Eduarda Costa',
      'João Victor Oliveira', 'Isabela Santos', 'Lucas Gabriel Lima',
      'Sofia Martins', 'Arthur Rodrigues', 'Laura Ferreira', 'Miguel Alves',
      'Valentina Nascimento', 'Davi Pereira', 'Helena Carvalho', 'Bernardo Gomes',
      'Alice Ribeiro', 'Gabriel Araújo', 'Manuela Barbosa', 'Rafael Moreira',
      'Julia Fernandes', 'Enzo Vieira', 'Lara Monteiro', 'Nicolas Teixeira',
      'Cecília Rocha', 'Heitor Mendes', 'Beatriz Cardoso', 'Théo Castro',
      'Lívia Correia', 'Samuel Dias', 'Marina Lopes', 'Lorenzo Freitas',
    ];

    const turmas = ['6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B'];
    const turnos = ['Manhã', 'Tarde', 'Integral'];
    const responsaveis = [
      'Carlos Silva', 'Fernanda Souza', 'Roberto Costa', 'Luciana Oliveira',
      'Marcos Santos', 'Patrícia Lima', 'Anderson Martins', 'Cristina Rodrigues',
      'Felipe Ferreira', 'Adriana Alves', 'Ricardo Nascimento', 'Juliana Pereira',
      'Eduardo Carvalho', 'Tatiana Gomes', 'Bruno Ribeiro', 'Camila Araújo',
      'Gustavo Barbosa', 'Daniela Moreira', 'Thiago Fernandes', 'Renata Vieira',
      'Rodrigo Monteiro', 'Priscila Teixeira', 'Leandro Rocha', 'Mariana Mendes',
      'Fábio Cardoso', 'Vanessa Castro', 'Diego Correia', 'Carla Dias',
      'André Lopes', 'Simone Freitas',
    ];

    // Alunos
    const alunos = nomes.map((nome, i) => ({
      id: uuid(),
      matricula: `2025${String(i + 1).padStart(4, '0')}`,
      nome,
      turma: turmas[i % turmas.length],
      turno: turnos[i % turnos.length],
      nascimento: `200${8 + (i % 5)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      responsavel: responsaveis[i],
      telefone: `(85) 9${String(8000 + i * 73).padStart(4, '0')}-${String(1000 + i * 37).padStart(4, '0')}`,
      email: `${responsaveis[i].toLowerCase().replace(/ /g, '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}@email.com`,
      obs: '',
    }));
    setData(KEYS.alunos, alunos);

    // Cantina
    const itens = [
      { nome: 'Arroz', categoria: 'Alimento', quantidade: 45, minimo: 10, unidade: 'kg' },
      { nome: 'Feijão', categoria: 'Alimento', quantidade: 30, minimo: 8, unidade: 'kg' },
      { nome: 'Macarrão', categoria: 'Alimento', quantidade: 25, minimo: 10, unidade: 'pct' },
      { nome: 'Leite', categoria: 'Bebida', quantidade: 60, minimo: 20, unidade: 'L' },
      { nome: 'Suco Concentrado', categoria: 'Bebida', quantidade: 15, minimo: 5, unidade: 'L' },
      { nome: 'Açúcar', categoria: 'Alimento', quantidade: 12, minimo: 5, unidade: 'kg' },
      { nome: 'Óleo de Soja', categoria: 'Alimento', quantidade: 8, minimo: 3, unidade: 'L' },
      { nome: 'Sal', categoria: 'Alimento', quantidade: 5, minimo: 2, unidade: 'kg' },
      { nome: 'Farinha de Trigo', categoria: 'Alimento', quantidade: 20, minimo: 8, unidade: 'kg' },
      { nome: 'Copo Descartável', categoria: 'Descartável', quantidade: 3, minimo: 5, unidade: 'cx' },
      { nome: 'Guardanapo', categoria: 'Descartável', quantidade: 2, minimo: 4, unidade: 'cx' },
      { nome: 'Detergente', categoria: 'Limpeza', quantidade: 6, minimo: 3, unidade: 'L' },
      { nome: 'Prato Descartável', categoria: 'Descartável', quantidade: 4, minimo: 3, unidade: 'cx' },
      { nome: 'Colher Descartável', categoria: 'Descartável', quantidade: 1, minimo: 3, unidade: 'cx' },
      { nome: 'Frutas (Banana)', categoria: 'Alimento', quantidade: 50, minimo: 20, unidade: 'un' },
    ];

    const cantinaData = itens.map((item, i) => ({
      id: uuid(),
      codigo: `CAN${String(i + 1).padStart(3, '0')}`,
      ...item,
      obs: '',
    }));
    setData(KEYS.cantina, cantinaData);

    // Frequência (últimos 20 dias úteis)
    const freq = [];
    const baseDate = new Date();
    let diasGerados = 0;
    let d = new Date(baseDate);

    while (diasGerados < 20) {
      d.setDate(d.getDate() - 1);
      const dow = d.getDay();
      if (dow === 0 || dow === 6) continue;
      const dateStr = d.toISOString().split('T')[0];

      alunos.forEach((aluno, aIdx) => {
        // Some students have higher absence rates (risk of evasion)
        let absentChance = 0.1;
        if (aIdx < 3) absentChance = 0.4; // High risk
        if (aIdx >= 3 && aIdx < 6) absentChance = 0.28; // Medium risk

        let status = 'presente';
        const rand = Math.random();
        if (rand < absentChance) {
          status = rand < absentChance * 0.3 ? 'justificada' : 'ausente';
        }

        freq.push({
          alunoId: aluno.id,
          data: dateStr,
          status,
        });
      });
      diasGerados++;
    }
    setData(KEYS.frequencia, freq);

    // Movimentos (últimos registros)
    const movs = [];
    const tiposMov = ['entrada', 'saida'];
    const motivos = {
      entrada: ['Compra mensal', 'Doação recebida', 'Reposição de estoque'],
      saida: ['Uso diário', 'Preparo de refeição', 'Uso na cozinha'],
    };

    for (let m = 0; m < 25; m++) {
      const item = cantinaData[Math.floor(Math.random() * cantinaData.length)];
      const tipo = tiposMov[Math.floor(Math.random() * 2)];
      const dMov = new Date();
      dMov.setDate(dMov.getDate() - Math.floor(Math.random() * 15));
      movs.push({
        id: uuid(),
        itemId: item.id,
        itemNome: item.nome,
        tipo,
        quantidade: Math.floor(Math.random() * 10) + 1,
        data: dMov.toISOString().split('T')[0],
        motivo: motivos[tipo][Math.floor(Math.random() * 3)],
      });
    }
    movs.sort((a, b) => b.data.localeCompare(a.data));
    setData(KEYS.movimentos, movs);

    // Config
    setConfig({
      nomeEscola: 'Escola Municipal Exemplo',
      cnpj: '00.000.000/0001-00',
      endereco: 'Rua da Educação, 123 - Fortaleza/CE',
      telefone: '(85) 3000-0000',
      email: 'contato@escola.edu.br',
      diretor: 'Maria da Silva',
    });

    toast('Dados de exemplo carregados com sucesso!', 'success');
  }

  // ── Init ──
  function init() {
    // Load sample data if empty
    if (!localStorage.getItem(KEYS.alunos)) {
      gerarDadosExemplo();
    }

    // Apply saved theme
    const savedTheme = localStorage.getItem(KEYS.theme) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    $$('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === savedTheme));

    // Apply saved color
    const savedColor = localStorage.getItem(KEYS.color);
    if (savedColor) {
      document.documentElement.style.setProperty('--primary', savedColor);
      $$('.color-btn').forEach(b => b.classList.toggle('active', b.dataset.color === savedColor));
    }

    // Set today's date
    const dateEl = $('#topbar-date');
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('pt-BR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    $('#freq-data').value = today();

    // Load config into form
    loadConfigForm();

    bindEvents();
    navigateTo('dashboard');
  }

  // ── Events ──
  function bindEvents() {
    // Sidebar navigation
    $$('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.page);
      });
    });

    // Toggle sidebar
    $('#btn-toggle-sidebar').addEventListener('click', () => {
      $('#sidebar').classList.toggle('collapsed');
    });

    // Logout
    $('#btn-logout').addEventListener('click', () => {
      $('#app').classList.add('hidden');
      $('#login-screen').classList.remove('hidden');
    });

    // ── Alunos ──
    $('#btn-add-aluno').addEventListener('click', () => {
      resetFormAluno();
      $('#modal-aluno-title').innerHTML = '<i class="fas fa-user-graduate"></i> Novo Aluno';
      abrirModal('modal-aluno');
    });

    $('#btn-salvar-aluno').addEventListener('click', salvarAluno);

    $('#search-alunos').addEventListener('input', (e) => {
      renderAlunos(e.target.value);
    });

    // ── Cantina ──
    $('#btn-add-item').addEventListener('click', () => {
      resetFormItem();
      $('#modal-item-title').innerHTML = '<i class="fas fa-box"></i> Novo Item';
      abrirModal('modal-item');
    });

    $('#btn-salvar-item').addEventListener('click', salvarItem);

    $('#btn-registrar-movimento').addEventListener('click', () => {
      populateMovItemSelect();
      $('#mov-data').value = today();
      abrirModal('modal-movimento');
    });

    $('#btn-salvar-movimento').addEventListener('click', salvarMovimento);

    $('#search-cantina').addEventListener('input', (e) => {
      renderCantina(e.target.value);
    });

    // ── Frequência ──
    $('#btn-salvar-frequencia').addEventListener('click', salvarFrequencia);
    $('#btn-todos-presentes').addEventListener('click', todosPresentes);
    $('#freq-turma-filter').addEventListener('change', renderFrequencia);
    $('#freq-data').addEventListener('change', renderFrequencia);

    // ── Config ──
    $('#form-config').addEventListener('submit', (e) => {
      e.preventDefault();
      salvarConfig();
    });

    // Theme
    $$('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(KEYS.theme, theme);
        $$('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Re-render charts with updated colors
        updateDashboard();
        toast(`Tema ${theme === 'dark' ? 'escuro' : 'claro'} ativado`, 'info');
      });
    });

    // Color
    $$('.color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        document.documentElement.style.setProperty('--primary', color);
        localStorage.setItem(KEYS.color, color);
        $$('.color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateDashboard();
        toast('Cor principal atualizada', 'info');
      });
    });

    // Data management
    $('#btn-export-data').addEventListener('click', exportData);
    $('#btn-import-data').addEventListener('click', () => $('#file-import').click());
    $('#file-import').addEventListener('change', importData);
    $('#btn-reset-data').addEventListener('click', () => {
      if (confirm('Isso irá substituir todos os dados atuais por dados de exemplo. Continuar?')) {
        gerarDadosExemplo();
        navigateTo(currentPage);
      }
    });

    // Close modals on overlay click
    $$('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('show');
      });
    });
  }

  // ── Navigation ──
  function navigateTo(page) {
    currentPage = page;

    // Update nav
    $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));

    // Update pages
    $$('.page').forEach(p => p.classList.remove('active'));
    $(`#page-${page}`).classList.add('active');

    // Update title
    const titles = {
      dashboard: 'Painel',
      alunos: 'Alunos',
      frequencia: 'Frequência',
      cantina: 'Cantina',
      relatorios: 'Relatórios',
      config: 'Configurações',
    };
    $('#page-title').textContent = titles[page] || page;

    // Render page data
    switch (page) {
      case 'dashboard': updateDashboard(); break;
      case 'alunos': renderAlunos(); break;
      case 'frequencia': populateTurmaFilter(); renderFrequencia(); break;
      case 'cantina': renderCantina(); renderMovimentos(); break;
      case 'config': loadConfigForm(); break;
    }
  }

  // ============================================================
  // DASHBOARD
  // ============================================================
  function updateDashboard() {
    const alunos = getData(KEYS.alunos);
    const freq = getData(KEYS.frequencia);
    const cantina = getData(KEYS.cantina);
    const todayStr = today();

    // Stats
    $('#stat-total-alunos').textContent = alunos.length;

    // Today's presence
    const freqHoje = freq.filter(f => f.data === todayStr);
    const presentesHoje = freqHoje.filter(f => f.status === 'presente' || f.status === 'justificada').length;
    const percPresenca = freqHoje.length > 0 ? Math.round((presentesHoje / freqHoje.length) * 100) : 0;
    $('#stat-presenca-hoje').textContent = freqHoje.length > 0 ? `${percPresenca}%` : 'N/A';

    // Low stock
    const lowStock = cantina.filter(item => item.quantidade <= item.minimo);
    $('#stat-estoque-baixo').textContent = lowStock.length;

    // Evasion risk (>25% absences in last 20 days)
    const riskStudents = getStudentsAtRisk(alunos, freq);
    $('#stat-risco-evasao').textContent = riskStudents.length;

    // ── Charts ──
    renderChartFrequenciaSemanal(freq, alunos);
    renderChartPresencaStatus(freq, alunos);
    renderChartCantinaConsumo(cantina);
    renderAlerts(lowStock, riskStudents);
  }

  function getStudentsAtRisk(alunos, freq) {
    const results = [];
    alunos.forEach(aluno => {
      const alunoFreq = freq.filter(f => f.alunoId === aluno.id);
      if (alunoFreq.length === 0) return;
      const ausencias = alunoFreq.filter(f => f.status === 'ausente').length;
      const taxa = ausencias / alunoFreq.length;
      if (taxa >= 0.25) {
        results.push({ ...aluno, taxa: Math.round(taxa * 100), ausencias, totalDias: alunoFreq.length });
      }
    });
    results.sort((a, b) => b.taxa - a.taxa);
    return results;
  }

  function renderChartFrequenciaSemanal(freq, alunos) {
    const ctx = $('#chart-frequencia-semanal');
    if (charts.freqSemanal) charts.freqSemanal.destroy();

    // Get last 10 unique dates
    const dates = [...new Set(freq.map(f => f.data))].sort().slice(-10);
    const presData = dates.map(d => {
      const dayFreq = freq.filter(f => f.data === d);
      const pres = dayFreq.filter(f => f.status === 'presente' || f.status === 'justificada').length;
      return dayFreq.length > 0 ? Math.round((pres / dayFreq.length) * 100) : 0;
    });
    const ausData = dates.map(d => {
      const dayFreq = freq.filter(f => f.data === d);
      const aus = dayFreq.filter(f => f.status === 'ausente').length;
      return dayFreq.length > 0 ? Math.round((aus / dayFreq.length) * 100) : 0;
    });

    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();

    charts.freqSemanal = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates.map(d => formatDate(d)),
        datasets: [
          {
            label: 'Presença %',
            data: presData,
            borderColor: primary,
            backgroundColor: primary + '20',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
          },
          {
            label: 'Ausência %',
            data: ausData,
            borderColor: '#dc2626',
            backgroundColor: '#dc262620',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: {
          y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } },
        },
      },
    });
  }

  function renderChartPresencaStatus(freq, alunos) {
    const ctx = $('#chart-presenca-status');
    if (charts.presStatus) charts.presStatus.destroy();

    const presente = freq.filter(f => f.status === 'presente').length;
    const ausente = freq.filter(f => f.status === 'ausente').length;
    const justificada = freq.filter(f => f.status === 'justificada').length;

    charts.presStatus = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Presentes', 'Ausentes', 'Justificadas'],
        datasets: [{
          data: [presente, ausente, justificada],
          backgroundColor: ['#059669', '#dc2626', '#d97706'],
          borderWidth: 2,
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-card').trim(),
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });
  }

  function renderChartCantinaConsumo(cantina) {
    const ctx = $('#chart-cantina-consumo');
    if (charts.cantinaConsumo) charts.cantinaConsumo.destroy();

    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const sorted = [...cantina].sort((a, b) => a.quantidade - b.quantidade).slice(0, 10);

    charts.cantinaConsumo = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sorted.map(i => i.nome),
        datasets: [{
          label: 'Quantidade',
          data: sorted.map(i => i.quantidade),
          backgroundColor: sorted.map(i =>
            i.quantidade <= i.minimo ? '#dc2626' :
            i.quantidade <= i.minimo * 1.5 ? '#d97706' : primary
          ),
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } },
      },
    });
  }

  function renderAlerts(lowStock, riskStudents) {
    const list = $('#alerts-list');
    list.innerHTML = '';

    riskStudents.slice(0, 3).forEach(s => {
      const li = document.createElement('li');
      li.className = 'alert-item alert-danger';
      li.innerHTML = `<i class="fas fa-user-times"></i>
        <span><strong>${s.nome}</strong> — ${s.taxa}% de ausências (${s.ausencias}/${s.totalDias} dias)</span>`;
      list.appendChild(li);
    });

    lowStock.forEach(item => {
      const li = document.createElement('li');
      li.className = 'alert-item alert-warning';
      li.innerHTML = `<i class="fas fa-box-open"></i>
        <span><strong>${item.nome}</strong> — Estoque: ${item.quantidade} ${item.unidade} (mín: ${item.minimo})</span>`;
      list.appendChild(li);
    });

    if (list.children.length === 0) {
      list.innerHTML = '<li class="alert-item alert-success"><i class="fas fa-check-circle"></i><span>Nenhum alerta no momento. Tudo em ordem!</span></li>';
    }
  }

  // ============================================================
  // ALUNOS
  // ============================================================
  function renderAlunos(search = '') {
    let alunos = getData(KEYS.alunos);
    const freq = getData(KEYS.frequencia);

    if (search) {
      const s = search.toLowerCase();
      alunos = alunos.filter(a =>
        a.nome.toLowerCase().includes(s) || a.matricula.toLowerCase().includes(s)
      );
    }

    const tbody = $('#tbody-alunos');
    tbody.innerHTML = '';

    alunos.forEach(aluno => {
      const alunoFreq = freq.filter(f => f.alunoId === aluno.id);
      const presencas = alunoFreq.filter(f => f.status === 'presente' || f.status === 'justificada').length;
      const percFreq = alunoFreq.length > 0 ? Math.round((presencas / alunoFreq.length) * 100) : 100;

      let freqBadge = 'badge-success';
      if (percFreq < 75) freqBadge = 'badge-danger';
      else if (percFreq < 85) freqBadge = 'badge-warning';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aluno.matricula}</td>
        <td><strong>${aluno.nome}</strong></td>
        <td>${formatTurma(aluno.turma)}</td>
        <td>${aluno.turno}</td>
        <td>${aluno.responsavel || '-'}</td>
        <td><span class="badge ${freqBadge}">${percFreq}%</span></td>
        <td class="actions-cell">
          <button class="btn-icon" title="Editar" onclick="RastroEdu.editarAluno('${aluno.id}')">
            <i class="fas fa-pen"></i>
          </button>
          <button class="btn-icon text-danger" title="Excluir" onclick="RastroEdu.excluirAluno('${aluno.id}')">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    if (alunos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted" style="padding:2rem;">Nenhum aluno encontrado.</td></tr>';
    }
  }

  function formatTurma(code) {
    const map = {
      '6A': '6º A', '6B': '6º B', '7A': '7º A', '7B': '7º B',
      '8A': '8º A', '8B': '8º B', '9A': '9º A', '9B': '9º B',
    };
    return map[code] || code;
  }

  function resetFormAluno() {
    $('#aluno-id').value = '';
    $('#aluno-nome').value = '';
    $('#aluno-matricula').value = '';
    $('#aluno-turma').value = '';
    $('#aluno-turno').value = '';
    $('#aluno-nascimento').value = '';
    $('#aluno-responsavel').value = '';
    $('#aluno-telefone').value = '';
    $('#aluno-email').value = '';
    $('#aluno-obs').value = '';
  }

  function salvarAluno() {
    const nome = $('#aluno-nome').value.trim();
    const matricula = $('#aluno-matricula').value.trim();
    const turma = $('#aluno-turma').value;
    const turno = $('#aluno-turno').value;

    if (!nome || !matricula || !turma || !turno) {
      toast('Preencha todos os campos obrigatórios!', 'error');
      return;
    }

    const alunos = getData(KEYS.alunos);
    const id = $('#aluno-id').value;

    const aluno = {
      id: id || uuid(),
      matricula,
      nome,
      turma,
      turno,
      nascimento: $('#aluno-nascimento').value,
      responsavel: $('#aluno-responsavel').value.trim(),
      telefone: $('#aluno-telefone').value.trim(),
      email: $('#aluno-email').value.trim(),
      obs: $('#aluno-obs').value.trim(),
    };

    if (id) {
      const idx = alunos.findIndex(a => a.id === id);
      if (idx >= 0) alunos[idx] = aluno;
      toast('Aluno atualizado com sucesso!', 'success');
    } else {
      alunos.push(aluno);
      toast('Aluno cadastrado com sucesso!', 'success');
    }

    setData(KEYS.alunos, alunos);
    fecharModal('modal-aluno');
    renderAlunos();
  }

  function editarAluno(id) {
    const alunos = getData(KEYS.alunos);
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return;

    $('#aluno-id').value = aluno.id;
    $('#aluno-nome').value = aluno.nome;
    $('#aluno-matricula').value = aluno.matricula;
    $('#aluno-turma').value = aluno.turma;
    $('#aluno-turno').value = aluno.turno;
    $('#aluno-nascimento').value = aluno.nascimento || '';
    $('#aluno-responsavel').value = aluno.responsavel || '';
    $('#aluno-telefone').value = aluno.telefone || '';
    $('#aluno-email').value = aluno.email || '';
    $('#aluno-obs').value = aluno.obs || '';

    $('#modal-aluno-title').innerHTML = '<i class="fas fa-user-graduate"></i> Editar Aluno';
    abrirModal('modal-aluno');
  }

  function excluirAluno(id) {
    if (!confirm('Tem certeza que deseja excluir este aluno?')) return;
    let alunos = getData(KEYS.alunos);
    alunos = alunos.filter(a => a.id !== id);
    setData(KEYS.alunos, alunos);

    // Remove frequency records
    let freq = getData(KEYS.frequencia);
    freq = freq.filter(f => f.alunoId !== id);
    setData(KEYS.frequencia, freq);

    toast('Aluno excluído com sucesso!', 'success');
    renderAlunos();
  }

  // ============================================================
  // FREQUÊNCIA
  // ============================================================
  function populateTurmaFilter() {
    const select = $('#freq-turma-filter');
    const current = select.value;
    select.innerHTML = '<option value="">Todas</option>';
    const turmas = ['6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B'];
    turmas.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = formatTurma(t);
      select.appendChild(opt);
    });
    select.value = current;
  }

  function renderFrequencia() {
    const alunos = getData(KEYS.alunos);
    const freq = getData(KEYS.frequencia);
    const data = $('#freq-data').value;
    const turmaFilter = $('#freq-turma-filter').value;

    let filteredAlunos = alunos;
    if (turmaFilter) {
      filteredAlunos = alunos.filter(a => a.turma === turmaFilter);
    }

    const tbody = $('#tbody-frequencia');
    tbody.innerHTML = '';

    filteredAlunos.forEach(aluno => {
      const existing = freq.find(f => f.alunoId === aluno.id && f.data === data);
      const status = existing ? existing.status : '';

      const tr = document.createElement('tr');
      tr.dataset.alunoId = aluno.id;
      tr.innerHTML = `
        <td>${aluno.matricula}</td>
        <td><strong>${aluno.nome}</strong></td>
        <td>${formatTurma(aluno.turma)}</td>
        <td>
          <div class="freq-status-group">
            <button class="freq-btn ${status === 'presente' ? 'active-presente' : ''}"
              data-status="presente" onclick="RastroEdu.setFreqStatus(this)">
              <i class="fas fa-check"></i> P
            </button>
            <button class="freq-btn ${status === 'ausente' ? 'active-ausente' : ''}"
              data-status="ausente" onclick="RastroEdu.setFreqStatus(this)">
              <i class="fas fa-times"></i> F
            </button>
            <button class="freq-btn ${status === 'justificada' ? 'active-justificada' : ''}"
              data-status="justificada" onclick="RastroEdu.setFreqStatus(this)">
              <i class="fas fa-file-alt"></i> J
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    if (filteredAlunos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted" style="padding:2rem;">Nenhum aluno encontrado para esta turma.</td></tr>';
    }

    // Render risk list
    renderRiskList(alunos, freq);
  }

  function setFreqStatus(btn) {
    const group = btn.closest('.freq-status-group');
    group.querySelectorAll('.freq-btn').forEach(b => {
      b.className = 'freq-btn';
    });
    btn.classList.add(`active-${btn.dataset.status}`);
  }

  function todosPresentes() {
    $$('#tbody-frequencia .freq-status-group').forEach(group => {
      group.querySelectorAll('.freq-btn').forEach(b => b.className = 'freq-btn');
      group.querySelector('[data-status="presente"]').classList.add('active-presente');
    });
    toast('Todos marcados como presentes', 'info');
  }

  function salvarFrequencia() {
    const data = $('#freq-data').value;
    if (!data) {
      toast('Selecione uma data!', 'error');
      return;
    }

    const freq = getData(KEYS.frequencia);
    const rows = $$('#tbody-frequencia tr[data-aluno-id]');
    let saved = 0;

    rows.forEach(row => {
      const alunoId = row.dataset.alunoId;
      const activeBtn = row.querySelector('.freq-btn[class*="active-"]');
      if (!activeBtn) return;

      const status = activeBtn.dataset.status;
      const existIdx = freq.findIndex(f => f.alunoId === alunoId && f.data === data);

      if (existIdx >= 0) {
        freq[existIdx].status = status;
      } else {
        freq.push({ alunoId, data, status });
      }
      saved++;
    });

    setData(KEYS.frequencia, freq);
    toast(`Frequência salva para ${saved} alunos!`, 'success');
    renderFrequencia();
  }

  function renderRiskList(alunos, freq) {
    const riskStudents = getStudentsAtRisk(alunos, freq);
    const list = $('#risk-list');
    list.innerHTML = '';

    if (riskStudents.length === 0) {
      list.innerHTML = '<li class="text-muted text-center" style="padding:1rem;">Nenhum aluno em risco no momento.</li>';
      return;
    }

    riskStudents.forEach(s => {
      const li = document.createElement('li');
      li.className = 'risk-item';
      li.innerHTML = `
        <div class="risk-info">
          <span class="risk-name">${s.nome}</span>
          <span class="risk-detail">${formatTurma(s.turma)} • ${s.ausencias} faltas em ${s.totalDias} dias</span>
        </div>
        <span class="risk-percent">${s.taxa}%</span>
      `;
      list.appendChild(li);
    });
  }

  // ============================================================
  // CANTINA
  // ============================================================
  function renderCantina(search = '') {
    let cantina = getData(KEYS.cantina);

    if (search) {
      const s = search.toLowerCase();
      cantina = cantina.filter(item =>
        item.nome.toLowerCase().includes(s) || item.categoria.toLowerCase().includes(s)
      );
    }

    const tbody = $('#tbody-cantina');
    tbody.innerHTML = '';

    cantina.forEach(item => {
      let statusBadge = 'badge-success';
      let statusText = 'Normal';
      if (item.quantidade <= item.minimo) {
        statusBadge = 'badge-danger';
        statusText = 'Crítico';
      } else if (item.quantidade <= item.minimo * 1.5) {
        statusBadge = 'badge-warning';
        statusText = 'Atenção';
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.codigo}</td>
        <td><strong>${item.nome}</strong></td>
        <td>${item.categoria}</td>
        <td>${item.quantidade}</td>
        <td>${item.unidade}</td>
        <td>${item.minimo}</td>
        <td><span class="badge ${statusBadge}">${statusText}</span></td>
        <td class="actions-cell">
          <button class="btn-icon" title="Editar" onclick="RastroEdu.editarItem('${item.id}')">
            <i class="fas fa-pen"></i>
          </button>
          <button class="btn-icon text-danger" title="Excluir" onclick="RastroEdu.excluirItem('${item.id}')">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    if (cantina.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted" style="padding:2rem;">Nenhum item encontrado.</td></tr>';
    }
  }

  function resetFormItem() {
    $('#item-id').value = '';
    $('#item-nome').value = '';
    $('#item-codigo').value = '';
    $('#item-categoria').value = '';
    $('#item-unidade').value = '';
    $('#item-quantidade').value = '';
    $('#item-minimo').value = '';
    $('#item-obs').value = '';
  }

  function salvarItem() {
    const nome = $('#item-nome').value.trim();
    const categoria = $('#item-categoria').value;
    const unidade = $('#item-unidade').value;
    const quantidade = parseFloat($('#item-quantidade').value);
    const minimo = parseFloat($('#item-minimo').value);

    if (!nome || !categoria || !unidade || isNaN(quantidade) || isNaN(minimo)) {
      toast('Preencha todos os campos obrigatórios!', 'error');
      return;
    }

    const cantina = getData(KEYS.cantina);
    const id = $('#item-id').value;

    const item = {
      id: id || uuid(),
      codigo: $('#item-codigo').value.trim() || `CAN${String(cantina.length + 1).padStart(3, '0')}`,
      nome,
      categoria,
      unidade,
      quantidade,
      minimo,
      obs: $('#item-obs').value.trim(),
    };

    if (id) {
      const idx = cantina.findIndex(i => i.id === id);
      if (idx >= 0) cantina[idx] = item;
      toast('Item atualizado com sucesso!', 'success');
    } else {
      cantina.push(item);
      toast('Item cadastrado com sucesso!', 'success');
    }

    setData(KEYS.cantina, cantina);
    fecharModal('modal-item');
    renderCantina();
  }

  function editarItem(id) {
    const cantina = getData(KEYS.cantina);
    const item = cantina.find(i => i.id === id);
    if (!item) return;

    $('#item-id').value = item.id;
    $('#item-nome').value = item.nome;
    $('#item-codigo').value = item.codigo;
    $('#item-categoria').value = item.categoria;
    $('#item-unidade').value = item.unidade;
    $('#item-quantidade').value = item.quantidade;
    $('#item-minimo').value = item.minimo;
    $('#item-obs').value = item.obs || '';

    $('#modal-item-title').innerHTML = '<i class="fas fa-box"></i> Editar Item';
    abrirModal('modal-item');
  }

  function excluirItem(id) {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;
    let cantina = getData(KEYS.cantina);
    cantina = cantina.filter(i => i.id !== id);
    setData(KEYS.cantina, cantina);
    toast('Item excluído com sucesso!', 'success');
    renderCantina();
  }

  // ── Movimentos ──
  function populateMovItemSelect() {
    const cantina = getData(KEYS.cantina);
    const select = $('#mov-item');
    select.innerHTML = '<option value="">Selecione o item...</option>';
    cantina.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = `${item.nome} (${item.quantidade} ${item.unidade})`;
      select.appendChild(opt);
    });
  }

  function salvarMovimento() {
    const itemId = $('#mov-item').value;
    const tipo = $('#mov-tipo').value;
    const quantidade = parseFloat($('#mov-quantidade').value);
    const data = $('#mov-data').value || today();
    const motivo = $('#mov-motivo').value.trim();

    if (!itemId || !quantidade || quantidade <= 0) {
      toast('Preencha todos os campos obrigatórios!', 'error');
      return;
    }

    const cantina = getData(KEYS.cantina);
    const item = cantina.find(i => i.id === itemId);
    if (!item) {
      toast('Item não encontrado!', 'error');
      return;
    }

    if (tipo === 'saida' && item.quantidade < quantidade) {
      toast(`Estoque insuficiente! Disponível: ${item.quantidade} ${item.unidade}`, 'error');
      return;
    }

    // Update quantity
    item.quantidade = tipo === 'entrada'
      ? item.quantidade + quantidade
      : item.quantidade - quantidade;

    setData(KEYS.cantina, cantina);

    // Save movement
    const movs = getData(KEYS.movimentos);
    movs.unshift({
      id: uuid(),
      itemId: item.id,
      itemNome: item.nome,
      tipo,
      quantidade,
      data,
      motivo,
    });
    setData(KEYS.movimentos, movs);

    fecharModal('modal-movimento');
    toast(`${tipo === 'entrada' ? 'Entrada' : 'Saída'} registrada: ${quantidade} ${item.unidade} de ${item.nome}`, 'success');
    renderCantina();
    renderMovimentos();
  }

  function renderMovimentos() {
    const movs = getData(KEYS.movimentos).slice(0, 20);
    const list = $('#movements-list');
    list.innerHTML = '';

    if (movs.length === 0) {
      list.innerHTML = '<li class="text-muted text-center" style="padding:1rem;">Nenhum movimento registrado.</li>';
      return;
    }

    movs.forEach(mov => {
      const li = document.createElement('li');
      li.className = `movement-item ${mov.tipo}`;
      const icon = mov.tipo === 'entrada' ? 'fa-arrow-down' : 'fa-arrow-up';
      li.innerHTML = `
        <div class="mov-icon"><i class="fas ${icon}"></i></div>
        <div class="mov-info">
          <span class="mov-name">${mov.itemNome}</span>
          <span class="mov-detail">${formatDate(mov.data)} • ${mov.motivo || '-'}</span>
        </div>
        <span class="mov-qty">${mov.tipo === 'entrada' ? '+' : '-'}${mov.quantidade}</span>
      `;
      list.appendChild(li);
    });
  }

  // ============================================================
  // RELATÓRIOS
  // ============================================================
  function gerarRelatorio(tipo) {
    const output = $('#report-output');
    const card = $('#report-output-card');
    const title = $('#report-title');
    card.style.display = 'block';

    const alunos = getData(KEYS.alunos);
    const freq = getData(KEYS.frequencia);
    const cantina = getData(KEYS.cantina);
    const movs = getData(KEYS.movimentos);
    const cfg = getConfig();

    let html = `<div style="text-align:center;margin-bottom:1rem;">
      <strong>${cfg.nomeEscola || 'Rastro Edu'}</strong><br>
      <small>${cfg.endereco || ''}</small><br>
      <small>Gerado em: ${new Date().toLocaleString('pt-BR')}</small>
    </div>`;

    switch (tipo) {
      case 'frequencia-mensal':
        title.innerHTML = '<i class="fas fa-calendar-alt"></i> Relatório de Frequência Mensal';
        html += '<h4>Frequência por Aluno</h4>';
        html += '<table><thead><tr><th>Matrícula</th><th>Nome</th><th>Turma</th><th>Presenças</th><th>Faltas</th><th>Justificadas</th><th>% Freq.</th></tr></thead><tbody>';
        alunos.forEach(a => {
          const af = freq.filter(f => f.alunoId === a.id);
          const p = af.filter(f => f.status === 'presente').length;
          const aus = af.filter(f => f.status === 'ausente').length;
          const j = af.filter(f => f.status === 'justificada').length;
          const perc = af.length > 0 ? Math.round(((p + j) / af.length) * 100) : 100;
          html += `<tr><td>${a.matricula}</td><td>${a.nome}</td><td>${formatTurma(a.turma)}</td><td>${p}</td><td>${aus}</td><td>${j}</td><td><strong>${perc}%</strong></td></tr>`;
        });
        html += '</tbody></table>';
        break;

      case 'evasao':
        title.innerHTML = '<i class="fas fa-user-slash"></i> Relatório de Risco de Evasão';
        const risk = getStudentsAtRisk(alunos, freq);
        html += `<h4>Alunos em Risco (${risk.length} identificados)</h4>`;
        if (risk.length > 0) {
          html += '<table><thead><tr><th>Matrícula</th><th>Nome</th><th>Turma</th><th>Faltas</th><th>Total Dias</th><th>% Ausência</th><th>Responsável</th></tr></thead><tbody>';
          risk.forEach(s => {
            html += `<tr><td>${s.matricula}</td><td><strong>${s.nome}</strong></td><td>${formatTurma(s.turma)}</td><td>${s.ausencias}</td><td>${s.totalDias}</td><td style="color:#dc2626;font-weight:700;">${s.taxa}%</td><td>${s.responsavel || '-'}</td></tr>`;
          });
          html += '</tbody></table>';
          html += '<h4>Recomendações</h4><ul>';
          html += '<li>Contatar os responsáveis dos alunos com mais de 30% de ausências.</li>';
          html += '<li>Agendar reunião com a diretoria para plano de ação preventiva.</li>';
          html += '<li>Verificar possíveis causas: bullying, dificuldades financeiras, transporte, etc.</li>';
          html += '</ul>';
        } else {
          html += '<p>Nenhum aluno em risco de evasão no período analisado.</p>';
        }
        break;

      case 'cantina-mensal':
        title.innerHTML = '<i class="fas fa-utensils"></i> Relatório de Consumo da Cantina';
        html += '<h4>Estado do Estoque</h4>';
        html += '<table><thead><tr><th>Código</th><th>Item</th><th>Categoria</th><th>Qtd Atual</th><th>Mín.</th><th>Unidade</th><th>Status</th></tr></thead><tbody>';
        cantina.forEach(item => {
          const status = item.quantidade <= item.minimo ? '<span style="color:#dc2626;font-weight:700;">CRÍTICO</span>' :
            item.quantidade <= item.minimo * 1.5 ? '<span style="color:#d97706;font-weight:700;">ATENÇÃO</span>' :
            '<span style="color:#059669;">Normal</span>';
          html += `<tr><td>${item.codigo}</td><td>${item.nome}</td><td>${item.categoria}</td><td>${item.quantidade}</td><td>${item.minimo}</td><td>${item.unidade}</td><td>${status}</td></tr>`;
        });
        html += '</tbody></table>';

        html += '<h4>Últimos Movimentos</h4>';
        html += '<table><thead><tr><th>Data</th><th>Item</th><th>Tipo</th><th>Qtd</th><th>Motivo</th></tr></thead><tbody>';
        movs.slice(0, 15).forEach(m => {
          const tipoLabel = m.tipo === 'entrada'
            ? '<span style="color:#059669;">Entrada</span>'
            : '<span style="color:#dc2626;">Saída</span>';
          html += `<tr><td>${formatDate(m.data)}</td><td>${m.itemNome}</td><td>${tipoLabel}</td><td>${m.quantidade}</td><td>${m.motivo || '-'}</td></tr>`;
        });
        html += '</tbody></table>';
        break;

      case 'geral':
        title.innerHTML = '<i class="fas fa-school"></i> Relatório Geral';
        const riskGeral = getStudentsAtRisk(alunos, freq);
        const lowStockGeral = cantina.filter(i => i.quantidade <= i.minimo);
        const totalFreq = freq.length;
        const totalPres = freq.filter(f => f.status === 'presente' || f.status === 'justificada').length;
        const percGeralFreq = totalFreq > 0 ? Math.round((totalPres / totalFreq) * 100) : 0;

        html += '<h4>Indicadores Gerais</h4>';
        html += '<table>';
        html += `<tr><td><strong>Total de Alunos</strong></td><td>${alunos.length}</td></tr>`;
        html += `<tr><td><strong>Taxa de Frequência Geral</strong></td><td>${percGeralFreq}%</td></tr>`;
        html += `<tr><td><strong>Alunos em Risco de Evasão</strong></td><td>${riskGeral.length}</td></tr>`;
        html += `<tr><td><strong>Itens em Estoque Crítico</strong></td><td>${lowStockGeral.length}</td></tr>`;
        html += `<tr><td><strong>Total de Itens na Cantina</strong></td><td>${cantina.length}</td></tr>`;
        html += `<tr><td><strong>Movimentos Registrados</strong></td><td>${movs.length}</td></tr>`;
        html += '</table>';

        html += '<h4>Distribuição por Turma</h4>';
        html += '<table><thead><tr><th>Turma</th><th>Alunos</th><th>% Freq. Média</th></tr></thead><tbody>';
        const turmas = ['6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B'];
        turmas.forEach(t => {
          const turmaAlunos = alunos.filter(a => a.turma === t);
          if (turmaAlunos.length === 0) return;
          const turmaFreqs = turmaAlunos.map(a => {
            const af = freq.filter(f => f.alunoId === a.id);
            const p = af.filter(f => f.status === 'presente' || f.status === 'justificada').length;
            return af.length > 0 ? (p / af.length) * 100 : 100;
          });
          const avg = Math.round(turmaFreqs.reduce((s, v) => s + v, 0) / turmaFreqs.length);
          html += `<tr><td>${formatTurma(t)}</td><td>${turmaAlunos.length}</td><td>${avg}%</td></tr>`;
        });
        html += '</tbody></table>';
        break;
    }

    output.innerHTML = html;
    card.scrollIntoView({ behavior: 'smooth' });
  }

  // ============================================================
  // CONFIG
  // ============================================================
  function loadConfigForm() {
    const cfg = getConfig();
    $('#cfg-nome-escola').value = cfg.nomeEscola || '';
    $('#cfg-cnpj').value = cfg.cnpj || '';
    $('#cfg-endereco').value = cfg.endereco || '';
    $('#cfg-telefone').value = cfg.telefone || '';
    $('#cfg-email').value = cfg.email || '';
    $('#cfg-diretor').value = cfg.diretor || '';
  }

  function salvarConfig() {
    setConfig({
      nomeEscola: $('#cfg-nome-escola').value.trim(),
      cnpj: $('#cfg-cnpj').value.trim(),
      endereco: $('#cfg-endereco').value.trim(),
      telefone: $('#cfg-telefone').value.trim(),
      email: $('#cfg-email').value.trim(),
      diretor: $('#cfg-diretor').value.trim(),
    });
    toast('Configurações salvas com sucesso!', 'success');
  }

  function exportData() {
    const data = {
      alunos: getData(KEYS.alunos),
      cantina: getData(KEYS.cantina),
      frequencia: getData(KEYS.frequencia),
      movimentos: getData(KEYS.movimentos),
      config: getConfig(),
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rastro-edu-backup-${today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Dados exportados com sucesso!', 'success');
  }

  function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (data.alunos) setData(KEYS.alunos, data.alunos);
        if (data.cantina) setData(KEYS.cantina, data.cantina);
        if (data.frequencia) setData(KEYS.frequencia, data.frequencia);
        if (data.movimentos) setData(KEYS.movimentos, data.movimentos);
        if (data.config) setConfig(data.config);
        toast('Dados importados com sucesso!', 'success');
        navigateTo(currentPage);
      } catch {
        toast('Erro ao importar: arquivo inválido!', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  // ── Public API ──
  return {
    init,
    abrirModal,
    fecharModal,
    editarAluno,
    excluirAluno,
    editarItem,
    excluirItem,
    setFreqStatus,
    gerarRelatorio,
  };
})();

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => {
  // Login is handled by form submit event inside init
  // Bind login form immediately
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('login-user').value;
      const pass = document.getElementById('login-pass').value;
      if (user === 'admin' && pass === '1234') {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        RastroEdu.init();
      } else {
        // Simple alert fallback
        alert('Usuário ou senha incorretos!');
      }
    });
  }
});
