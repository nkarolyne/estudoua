
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  var PFX = 'dita-zero-v2:';
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(PFX + k); localStorage.setItem(PFX + k, v); } catch (e) { return null; } }

  /* ───────── Textos dos exemplos ───────── */
  var T = {
    xmlBroken: '<?xml version="1.0" encoding="UTF-8"?>\n<produto id=app-despesas>\n  <nome>App de Despesas</Nome>\n  <versao>2.1</versao>\n  <recurso tipo="principal">Enviar relatório<recurso>\n  <recurso tipo="extra">Anexar recibo</recurso>\n</produto>',
    xmlFixed: '<?xml version="1.0" encoding="UTF-8"?>\n<produto id="app-despesas">\n  <nome>App de Despesas</nome>\n  <versao>2.1</versao>\n  <recurso tipo="principal">Enviar relatório</recurso>\n  <recurso tipo="extra">Anexar recibo</recurso>\n</produto>',
    boxes: '<tarefa>\n  <titulo>Enviar relatório</titulo>\n  <passos>\n    <passo>Abra o app.</passo>\n    <passo>Clique em Enviar.</passo>\n  </passos>\n</tarefa>',
    own: '<?xml version="1.0" encoding="UTF-8"?>\n<!-- Escreva sua nota de versão abaixo desta linha -->\n',
    ownSol: '<?xml version="1.0" encoding="UTF-8"?>\n<!-- Escreva sua nota de versão abaixo desta linha -->\n<notaVersao versao="2.2">\n  <data>10/10/2026</data>\n  <novidades>\n    <item>Agora você pode anexar vários recibos de uma vez.</item>\n    <item>O valor total aparece no topo do relatório.</item>\n  </novidades>\n  <correcao>Relatórios enviados sem internet agora são enviados quando a conexão volta.</correcao>\n</notaVersao>',
    concept: '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE concept PUBLIC "-//OASIS//DTD DITA Concept//EN" "concept.dtd">\n<concept id="relatorio-despesas">\n  <title>Relatório de despesas</title>\n  <shortdesc>O relatório de despesas reúne os gastos de uma viagem ou projeto para aprovação e reembolso.</shortdesc>\n  <conbody>\n    <p>Cada relatório agrupa despesas, como hotel, transporte e alimentação. Depois de enviado, ele segue para o gestor aprovar.</p>\n    <section>\n      <title>Status do relatório</title>\n      <ul>\n        <li><b>Rascunho</b>: você ainda pode editar.</li>\n        <li><b>Enviado</b>: aguardando aprovação.</li>\n        <li><b>Aprovado</b>: o reembolso será pago.</li>\n      </ul>\n    </section>\n  </conbody>\n</concept>',
    task: '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">\n<task id="enviar-relatorio">\n  <title>Enviar um relatório de despesas</title>\n  <shortdesc>Envie o relatório para que seu gestor possa aprovar o reembolso.</shortdesc>\n  <taskbody>\n    <prereq>Todas as despesas precisam ter um recibo anexado.</prereq>\n    <steps>\n      <step>\n        <cmd>Abra o relatório em <uicontrol>Meus relatórios</uicontrol>.</cmd>\n      </step>\n      <step>\n        <cmd>Confira o valor total.</cmd>\n        <info>Se algum valor estiver errado, edite a despesa antes de enviar.</info>\n      </step>\n      <step>\n        <cmd>Clique em <uicontrol>Enviar</uicontrol>.</cmd>\n        <stepresult>O status muda para Enviado.</stepresult>\n      </step>\n    </steps>\n    <result>Seu gestor recebe uma notificação para aprovar.</result>\n  </taskbody>\n</task>',
    ref: '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE reference PUBLIC "-//OASIS//DTD DITA Reference//EN" "reference.dtd">\n<reference id="limites-despesas">\n  <title>Limites por tipo de despesa</title>\n  <shortdesc>Valores máximos aceitos sem aprovação extra do financeiro.</shortdesc>\n  <refbody>\n    <simpletable>\n      <sthead>\n        <stentry>Tipo de despesa</stentry>\n        <stentry>Limite por dia</stentry>\n      </sthead>\n      <strow>\n        <stentry>Hotel</stentry>\n        <stentry>R$ 450</stentry>\n      </strow>\n      <strow>\n        <stentry>Alimentação</stentry>\n        <stentry>R$ 120</stentry>\n      </strow>\n    </simpletable>\n  </refbody>\n</reference>',
    map: '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE map PUBLIC "-//OASIS//DTD DITA Map//EN" "map.dtd">\n<map>\n  <title>Central de Ajuda: Relatório de Despesas</title>\n  <topicref href="conceito-relatorio.dita">\n    <topicref href="tarefa-enviar-relatorio.dita"/>\n    <topicref href="ref-limites.dita"/>\n  </topicref>\n</map>'
  };

  var CODE = {
    'src03': '<task id="enviar-relatorio">\n  <title>Enviar um relatório</title>\n  <shortdesc>Envie para seu gestor aprovar o reembolso.</shortdesc>\n  <taskbody>\n    <steps>\n      <step><cmd>Abra o relatório.</cmd></step>\n      <step><cmd>Confira o valor total.</cmd></step>\n      <step><cmd>Clique em Enviar.</cmd></step>\n    </steps>\n  </taskbody>\n</task>',
    'xml-s1': 'Enviar relatório\nAbra o app.\nClique em Enviar.',
    'xml-s2': '<titulo>Enviar relatório</titulo>\n<passo>Abra o app.</passo>\n<passo>Clique em Enviar.</passo>',
    'xml-s3': '<tarefa>\n  <titulo>Enviar relatório</titulo>\n  <passo>Abra o app.</passo>\n  <passo>Clique em Enviar.</passo>\n</tarefa>',
    'attrs': '<aviso tipo="importante" id="aviso-recibo">\n  Guarde o recibo original.\n</aviso>',
    'decl': '<?xml version="1.0" encoding="UTF-8"?>',
    'comment': '<!-- Revisar este passo quando a tela nova sair -->',
    'doctype': '<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">',
    'skeleton': '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE concept PUBLIC "-//OASIS//DTD DITA Concept//EN" "concept.dtd">\n<concept id="relatorio-despesas">\n  <title>Relatório de despesas</title>\n  <shortdesc>Reúne os gastos de uma viagem para aprovação e reembolso.</shortdesc>\n  <conbody>\n    <p>O conteúdo vem aqui.</p>\n  </conbody>\n</concept>',
    'avisos': '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD DITA Topic//EN" "topic.dtd">\n<topic id="avisos">\n  <title>Avisos reutilizáveis</title>\n  <body>\n    <note id="recibo" type="important">Guarde o recibo original por 5 anos.</note>\n  </body>\n</topic>',
    'conref-use': '<note conref="avisos.dita#avisos/recibo"/>',
    'java-test': 'java -version',
    'path-mac': "echo 'export PATH=\"$HOME/dita-ot/bin:$PATH\"' >> ~/.zshrc",
    'build': 'dita -i guia.ditamap -f html5 -o docs',
    'git-config': 'git config --global user.name "Nicole Karolyne"\ngit config --global user.email "seu-email@exemplo.com"',
    'git-test': 'git --version\ngit config --global user.name',
    'git-a': 'git init\ngit status\ngit add .\ngit commit -m "Adiciona tópicos iniciais"',
    'git-b': 'git switch -c revisao-tarefa\n# agora edite e salve a task no VS Code\ngit add tarefa-enviar-relatorio.dita\ngit commit -m "Melhora o texto dos passos"',
    'git-c': 'git switch main\ngit merge revisao-tarefa\ngit log --oneline',
    'push': 'git remote add origin https://github.com/SEU-USUARIO/central-ajuda-despesas.git\ngit branch -M main\ngit push -u origin main',
    'pr': 'git switch -c revisa-shortdesc\n# edite um shortdesc no VS Code e salve\ngit add .\ngit commit -m "Deixa o shortdesc da tarefa mais direto"\ngit push -u origin revisa-shortdesc',
    'pull': 'git switch main\ngit pull',
    'gloss': '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE glossentry PUBLIC "-//OASIS//DTD DITA Glossary Entry//EN" "glossentry.dtd">\n<glossentry id="reembolso">\n  <glossterm>Reembolso</glossterm>\n  <glossdef>Pagamento que devolve ao funcionário o valor gasto a trabalho.</glossdef>\n</glossentry>',
    'abap-msg': 'MESSAGE e001(zdespesas) WITH lv_limite.',
    'abap-prazo': '* Despesas antigas demais não podem ser enviadas\nIF ls_despesa-data < lv_data_minima.\n  MESSAGE e003(zdespesas) WITH ls_despesa-data lv_prazo.\nENDIF.',
    'readme': '# Central de Ajuda: Relatório de Despesas\n\nProjeto de estudo de documentação estruturada em DITA.\n\n## O que tem aqui\n- 1 concept, 2 tasks e 1 reference\n- Aviso reutilizado com conref\n- Glossário com glossentry\n- Site gerado com DITA-OT (pasta docs/)\n\n## Decisões de conteúdo\n- Separei explicação (concept) de procedimento (task),\n  para cada página ter um só propósito.\n- Avisos que se repetem ficam em avisos.dita e são reutilizados.\n\n## Como gerar o site\ndita -i guia.ditamap -f html5 -o docs\n\n## Ver online\nhttps://SEU-USUARIO.github.io/central-ajuda-despesas/'
  };

  /* ───────── Blocos de código ───────── */
  function codeBlock(wrap, src) {
    wrap.innerHTML = '';
    var pre = document.createElement('pre'); pre.className = 'code';
    if (wrap.getAttribute('data-lines')) pre.innerHTML = src.split('\n').map(function (l, i) { return '<span class="ln">' + (i + 1) + '</span>' + esc(l); }).join('\n');
    else pre.textContent = src;
    var tag = document.createElement('span'); tag.className = 'code-tag'; tag.textContent = wrap.getAttribute('data-tag') || '';
    var btn = document.createElement('button'); btn.className = 'copy'; btn.type = 'button'; btn.textContent = 'Copiar';
    btn.addEventListener('click', function () {
      function selectIt() { var r = document.createRange(); r.selectNodeContents(pre); var s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Selecionado'; }
      try { navigator.clipboard.writeText(src).then(function () { btn.textContent = 'Copiado'; }, selectIt); } catch (e) { selectIt(); }
      setTimeout(function () { btn.textContent = 'Copiar'; }, 1600);
    });
    wrap.appendChild(pre); wrap.appendChild(tag); wrap.appendChild(btn);
  }
  $$('[data-code]').forEach(function (w) { codeBlock(w, CODE[w.getAttribute('data-code')] || ''); });

  /* ───────── Stepper (1-1) ───────── */
  $$('[data-stepper]').forEach(function (el) {
    var keys = el.getAttribute('data-stepper').split(','), caps = el.getAttribute('data-caps').split('|'), i = 0;
    el.innerHTML = '<div class="code-wrap" data-tag="exemplo"></div><p class="stepper-cap"></p><div class="stepper-nav"><button class="btn-ghost" type="button" data-prev>← Anterior</button><button class="btn-ghost" type="button" data-next>Próximo passo →</button><span></span></div>';
    var wrap = $('.code-wrap', el), cap = $('.stepper-cap', el), count = $('.stepper-nav span', el);
    function draw() { codeBlock(wrap, CODE[keys[i]]); cap.textContent = caps[i]; count.textContent = (i + 1) + ' de ' + keys.length; $('[data-prev]', el).disabled = i === 0; $('[data-next]', el).disabled = i === keys.length - 1; }
    $('[data-prev]', el).addEventListener('click', function () { if (i > 0) { i--; draw(); } });
    $('[data-next]', el).addEventListener('click', function () { if (i < keys.length - 1) { i++; draw(); } });
    draw();
  });

  /* ───────── Demo 0-2: texto corrido x estruturado ───────── */
  (function () {
    var box = document.getElementById('demo-struct'), view = $('[data-view]', box), note = $('[data-note]', box);
    var prose = 'Enviar um relatório de despesas. Para que seu gestor aprove o reembolso, você precisa enviar o relatório. Antes, confira se todas as despesas têm recibo. Abra o relatório em Meus relatórios, confira o valor total e clique em Enviar. Atenção: depois de enviado, você não pode mais editar.';
    var parts = [['Título', 'Enviar um relatório de despesas'], ['Resumo', 'Envie o relatório para seu gestor aprovar o reembolso.'], ['Pré-requisito', 'Todas as despesas precisam ter recibo.'], ['Passo 1', 'Abra o relatório em Meus relatórios.'], ['Passo 2', 'Confira o valor total.'], ['Passo 3', 'Clique em Enviar.'], ['Aviso', 'Depois de enviado, você não pode mais editar.']];
    var modes = {
      pessoa: function () { view.innerHTML = '<p class="blob">' + esc(prose) + '</p>'; note.textContent = 'Uma pessoa entende bem. Mas quantos passos são? Onde termina um e começa o outro?'; },
      maquina: function () { view.innerHTML = '<p class="blob machine">' + esc(prose) + '</p>'; note.textContent = 'Para o computador, isto é só uma sequência de ' + prose.length + ' caracteres. Ele não sabe o que é passo, aviso ou título.'; },
      estrutura: function () { view.innerHTML = '<div class="chunks">' + parts.map(function (p) { return '<div class="chunk"><span>' + esc(p[0]) + '</span><div>' + esc(p[1]) + '</div></div>'; }).join('') + '</div>'; note.textContent = 'Cada trecho tem um rótulo. Agora o computador sabe que são 3 passos e 1 aviso, e pode numerar, destacar ou reaproveitar cada parte.'; }
    };
    $$('[data-mode]', box).forEach(function (b) {
      b.addEventListener('click', function () { $$('[data-mode]', box).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); modes[b.getAttribute('data-mode')](); });
    });
    modes.pessoa();
  })();

  /* ───────── Demo 0-3: uma fonte, vários formatos ───────── */
  (function () {
    var D = { title: 'Enviar um relatório', sd: 'Envie para seu gestor aprovar o reembolso.', steps: ['Abra o relatório.', 'Confira o valor total.', 'Clique em Enviar.'] };
    var stage = document.getElementById('out-stage');
    var steps = '<ol class="pv-steps-mini">' + D.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>';
    var views = {
      site: '<div class="o-site"><div class="chrome"><i></i><i></i><i></i></div><div class="pg"><span class="crumb">Ajuda › Despesas › Relatórios</span><h4>' + esc(D.title) + '</h4><p style="color:var(--text-2)">' + esc(D.sd) + '</p>' + steps + '</div></div>',
      pdf: '<div class="o-pdf"><div class="hd"><span>Guia do Usuário · Despesas</span><span>Capítulo 3</span></div><h4>3.2 ' + esc(D.title) + '</h4><p style="color:var(--text-2)">' + esc(D.sd) + '</p>' + steps + '<div class="ft">— 12 —</div></div>',
      app: '<div class="o-app"><div class="scr">Relatório #482 <i aria-hidden="true">?</i></div><div class="fake"></div><div class="fake"></div><div class="tip"><b>' + esc(D.title) + '</b><span>' + esc(D.sd) + '</span><span style="opacity:.75">Toque para ver os 3 passos</span></div><div class="fake"></div></div>'
    };
    function show(k) { stage.innerHTML = views[k]; }
    $$('[data-out]').forEach(function (b) {
      b.addEventListener('click', function () { $$('[data-out]').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); }); show(b.getAttribute('data-out')); });
    });
    show('site');
  })();

  /* ───────── Demo 0-4: blocos ───────── */
  (function () {
    var B = [['O que é um relatório de despesas', 1, 1], ['Enviar um relatório', 1, 0], ['Aprovar um relatório', 0, 1], ['Limites por tipo de despesa', 1, 1], ['Aviso: guarde o recibo', 1, 1], ['Ver relatórios da equipe', 0, 1]];
    var tbody = $('#blocks-tbl tbody'), guides = document.getElementById('guides');
    tbody.innerHTML = B.map(function (b, i) {
      return '<tr><td>' + esc(b[0]) + '</td><td><input type="checkbox" id="blk-' + i + '-a" data-i="' + i + '" data-g="1"' + (b[1] ? ' checked' : '') + ' aria-label="' + esc(b[0]) + ' no guia do funcionário"></td><td><input type="checkbox" id="blk-' + i + '-b" data-i="' + i + '" data-g="2"' + (b[2] ? ' checked' : '') + ' aria-label="' + esc(b[0]) + ' no guia do gestor"></td></tr>';
    }).join('');
    function draw() {
      function list(g) {
        var items = B.filter(function (b) { return b[g]; });
        if (!items.length) return '<p style="color:var(--muted);font-size:14px">Nenhum tópico ainda.</p>';
        return '<ol>' + items.map(function (b) { return '<li>' + esc(b[0]) + (b[1] && b[2] ? '<span class="shared">nos 2 guias</span>' : '') + '</li>'; }).join('') + '</ol>';
      }
      var shared = B.filter(function (b) { return b[1] && b[2]; }).length;
      guides.innerHTML = '<div class="guide"><b>Guia do funcionário</b>' + list(1) + '</div><div class="guide"><b>Guia do gestor</b>' + list(2) + '</div>' +
        '<p class="demo-note" style="grid-column:1/-1">' + shared + ' tópico(s) aparecem nos dois guias, mas foram escritos uma vez só. Corrigiu um? Os dois guias mudam juntos.</p>';
    }
    tbody.addEventListener('change', function (e) { var c = e.target; if (!c.dataset.i) return; B[+c.dataset.i][+c.dataset.g] = c.checked ? 1 : 0; draw(); });
    draw();
  })();

  /* ───────── Demo 1-2: anatomia ───────── */
  (function () {
    var P = [
      ['<', 't', 'Sinal de menor', 'Avisa que começa uma tag. Tudo entre < e > é etiqueta, não texto para o leitor.'],
      ['passo', 't', 'Nome do elemento', 'Diz o que o conteúdo é. Aqui: um passo.'],
      [' ', '', 'Espaço', 'Separa o nome do elemento do atributo.'],
      ['numero', 'a', 'Nome do atributo', 'Uma informação extra sobre o elemento.'],
      ['="1"', 'a', 'Valor do atributo', 'Vem depois do sinal de igual, sempre entre aspas.'],
      ['>', 't', 'Fim da tag de abertura', 'Fecha a etiqueta de abertura. Depois dela vem o conteúdo.'],
      ['Abra o app.', 'x', 'Conteúdo', 'O texto que a pessoa vai ler.'],
      ['</passo>', 't', 'Tag de fechamento', 'O mesmo nome, com uma barra / antes. Diz onde o passo termina.']
    ];
    var a = document.getElementById('anat'), exp = document.getElementById('anat-exp');
    a.innerHTML = P.map(function (p, i) { return '<button type="button" class="' + p[1] + '" data-p="' + i + '" aria-pressed="false">' + esc(p[0]) + '</button>'; }).join('');
    function sel(i) { $$('button', a).forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.p === i)); }); exp.innerHTML = '<b>' + esc(P[i][2]) + '</b><span>' + esc(P[i][3]) + '</span>'; }
    a.addEventListener('click', function (e) { var b = e.target.closest('[data-p]'); if (b) sel(+b.dataset.p); });
    sel(1);
  })();

  /* ───────── XML: leitura e erros ───────── */
  function parse(src) {
    if (!/<[A-Za-z_]/.test(src.replace(/<\?[\s\S]*?\?>/g, '').replace(/<!--[\s\S]*?-->/g, ''))) return { error: { title: 'Ainda não há nenhum elemento. Comece escrevendo a raiz.', raw: '' } };
    var doc = new DOMParser().parseFromString(src, 'application/xml');
    var pe = doc.getElementsByTagName('parsererror')[0];
    if (pe) return { error: friendly(pe.textContent || '') };
    return { doc: doc };
  }
  function friendly(raw) {
    var line = (raw.match(/line\s*(?:number\s*)?:?\s*(\d+)/i) || raw.match(/linha\s*(\d+)/i) || [])[1];
    var hint = 'O XML tem um erro de estrutura.';
    if (/AttValue|quote|aspas|attributes construct|unquoted/i.test(raw)) hint = 'Um atributo está sem aspas. Use nome="valor".';
    else if (/mismatch|does not match|Expected: <\//i.test(raw)) hint = 'Uma tag de fechamento não combina com a de abertura. Confira maiúsculas e a ordem.';
    else if (/Extra content|junk after/i.test(raw)) hint = 'Há conteúdo fora da raiz. Tudo precisa ficar dentro de um único elemento.';
    else if (/Premature end|no element found|EndTag|end of|unclosed|not closed/i.test(raw)) hint = 'Alguma tag ficou sem fechar.';
    else if (/StartTag|invalid element name|not well-formed|Specification mandates/i.test(raw)) hint = 'Há um caractere ou tag inválida. Confira sinais < e > soltos.';
    var clean = raw.replace(/This page contains the following errors:/i, '').replace(/Below is a rendering[\s\S]*/i, '').trim().split('\n')[0];
    return { title: (line ? 'Linha ' + line + ': ' : '') + hint, raw: clean.slice(0, 160) };
  }
  function kids(el, name) { return Array.prototype.filter.call(el.children, function (c) { return !name || c.nodeName === name; }); }
  function kid(el, name) { return kids(el, name)[0] || null; }
  function ownText(el) { return Array.prototype.filter.call(el.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); }).map(function (n) { return n.textContent.trim(); }).join(' '); }

  function treeHTML(el) {
    var attrs = Array.prototype.map.call(el.attributes, function (a) { return ' <span class="at">' + esc(a.name) + '="' + esc(a.value) + '"</span>'; }).join('');
    var t = ownText(el), ch = kids(el);
    return '<li><span class="tg">&lt;' + esc(el.nodeName) + '&gt;</span>' + attrs + (t ? ' <span class="tx">' + esc(t.length > 40 ? t.slice(0, 40) + '…' : t) + '</span>' : '') + (ch.length ? '<ul>' + ch.map(treeHTML).join('') + '</ul>' : '') + '</li>';
  }
  function boxHTML(el, d) {
    var attrs = Array.prototype.map.call(el.attributes, function (a) { return ' <i>' + esc(a.name) + '="' + esc(a.value) + '"</i>'; }).join('');
    var t = ownText(el);
    return '<div class="box d' + (d % 2) + '"><span class="box-tag">' + esc(el.nodeName) + attrs + '</span>' + (t ? '<span class="box-text">' + esc(t) + '</span>' : '') + kids(el).map(function (c) { return boxHTML(c, d + 1); }).join('') + '</div>';
  }

  /* ───────── DITA → prévia ───────── */
  var NOTE = { important: 'Importante', tip: 'Dica', caution: 'Atenção', warning: 'Aviso', note: 'Nota' };
  function render(node, root) {
    if (node.nodeType === 3) return esc(node.textContent);
    if (node.nodeType !== 1) return '';
    var inner = Array.prototype.map.call(node.childNodes, function (n) { return render(n, root); }).join('');
    switch (node.nodeName) {
      case 'title': return node.parentNode === root ? '<h3 class="pv-title">' + inner + '</h3>' : '<h4>' + inner + '</h4>';
      case 'shortdesc': return '<p class="pv-lead">' + inner + '</p>';
      case 'p': return '<p>' + inner + '</p>';
      case 'ul': return '<ul>' + inner + '</ul>';
      case 'ol': return '<ol>' + inner + '</ol>';
      case 'li': return '<li>' + inner + '</li>';
      case 'b': return '<strong>' + inner + '</strong>';
      case 'i': return '<em>' + inner + '</em>';
      case 'uicontrol': return '<span class="pv-ui">' + inner + '</span>';
      case 'codeph': return '<code>' + inner + '</code>';
      case 'section': return '<section class="pv-block">' + inner + '</section>';
      case 'steps': return '<ol class="pv-steps">' + inner + '</ol>';
      case 'step': return '<li>' + inner + '</li>';
      case 'cmd': return '<span class="pv-cmd">' + inner + '</span>';
      case 'info': return '<div class="pv-info">' + inner + '</div>';
      case 'stepresult': return '<div class="pv-stepresult">→ ' + inner + '</div>';
      case 'prereq': return '<div class="pv-block"><span class="pv-label">Antes de começar</span><div>' + inner + '</div></div>';
      case 'context': return '<div class="pv-block">' + inner + '</div>';
      case 'result': return '<div class="pv-block"><span class="pv-label">Resultado</span><div>' + inner + '</div></div>';
      case 'note':
        if (node.getAttribute('conref')) return '<aside class="pv-note">Conteúdo reutilizado de <code>' + esc(node.getAttribute('conref')) + '</code></aside>';
        return '<aside class="pv-note"><strong>' + (NOTE[node.getAttribute('type')] || 'Nota') + ':</strong> ' + inner + '</aside>';
      case 'simpletable': case 'table': return '<table>' + inner + '</table>';
      case 'sthead': return '<tr>' + kids(node, 'stentry').map(function (e) { return '<th>' + esc(e.textContent.trim()) + '</th>'; }).join('') + '</tr>';
      case 'strow': return '<tr>' + inner + '</tr>';
      case 'stentry': return '<td>' + inner + '</td>';
      default: return inner;
    }
  }
  function previewDoc(root) {
    return '<article class="pv"><span class="pv-type">' + esc(root.nodeName) + ' · id="' + esc(root.getAttribute('id') || '') + '"</span>' + Array.prototype.map.call(root.childNodes, function (n) { return render(n, root); }).join('') + '</article>';
  }

  var KNOWN = { 'conceito-relatorio.dita': 'Relatório de despesas', 'tarefa-enviar-relatorio.dita': 'Enviar um relatório de despesas', 'ref-limites.dita': 'Limites por tipo de despesa', 'avisos.dita': 'Avisos reutilizáveis' };
  function tocHTML(el) {
    var refs = kids(el, 'topicref'); if (!refs.length) return '';
    return '<ol>' + refs.map(function (x) {
      var h = x.getAttribute('href') || '', t = x.getAttribute('navtitle') || KNOWN[h];
      return '<li>' + (t ? esc(t) : '<span style="color:var(--err)">⚠ ' + esc(h || 'sem href') + ' não encontrado</span>') + tocHTML(x) + '</li>';
    }).join('') + '</ol>';
  }

  /* ───────── Checagens ───────── */
  function checks(type, doc) {
    var root = doc.documentElement, r = [['XML válido', true]];
    if (type === 'own') {
      var nov = kid(root, 'novidades');
      r.push(['Raiz <notaVersao>', root.nodeName === 'notaVersao']);
      r.push(['Raiz com atributo versao', !!root.getAttribute('versao')]);
      r.push(['Tem <data> preenchida', !!(kid(root, 'data') && kid(root, 'data').textContent.trim())]);
      r.push(['Tem <novidades>', !!nov]);
      r.push(['Pelo menos 2 <item> dentro de <novidades>', !!(nov && kids(nov, 'item').length >= 2)]);
      r.push(['Tem <correcao>', !!kid(root, 'correcao')]);
      return r;
    }
    r.push(['Raiz é <' + type + '>', root.nodeName === type]);
    if (type !== 'map') r.push(['Raiz tem atributo id', !!root.getAttribute('id')]);
    var t = kid(root, 'title');
    r.push(['Tem <title> preenchido', !!(t && t.textContent.trim())]);
    if (type === 'map') {
      var refs = $$('topicref', root);
      r.push(['Aponta para pelo menos 3 tópicos', refs.length >= 3]);
      var bad = refs.filter(function (x) { return !KNOWN[x.getAttribute('href')]; });
      r.push([bad.length ? 'Link quebrado: ' + bad.map(function (b) { return b.getAttribute('href') || '(sem href)'; }).join(', ') : 'Todos os links existem', refs.length > 0 && !bad.length]);
      return r;
    }
    var sd = kid(root, 'shortdesc');
    r.push(['Tem <shortdesc>', !!(sd && sd.textContent.trim())]);
    if (sd) r.push(['Shortdesc com até 200 caracteres', sd.textContent.trim().length <= 200]);
    if (type === 'concept') {
      var cb = kid(root, 'conbody');
      r.push(['Conteúdo dentro de <conbody>', !!cb]);
      r.push(['Desafio: título começa com “O que é”', !!(t && /^o que é/i.test(t.textContent.trim()))]);
      r.push(['Desafio: 4 status na lista', !!(cb && $$('li', cb).length >= 4)]);
      r.push(['Desafio: tem uma <note>', !!(cb && cb.getElementsByTagName('note').length)]);
    }
    if (type === 'task') {
      var tb = kid(root, 'taskbody'), st = tb && kid(tb, 'steps'), steps = st ? kids(st, 'step') : [];
      r.push(['Conteúdo dentro de <taskbody>', !!tb]);
      r.push(['Tem <steps> com passos', steps.length >= 2]);
      r.push(['Cada passo tem exatamente um <cmd>', steps.length > 0 && steps.every(function (s) { return kids(s, 'cmd').length === 1; })]);
      r.push(['Desafio: 4 passos', steps.length >= 4]);
    }
    if (type === 'reference') {
      var rb = kid(root, 'refbody');
      r.push(['Conteúdo dentro de <refbody>', !!rb]);
      r.push(['Tem uma tabela', !!(rb && rb.getElementsByTagName('simpletable').length)]);
      r.push(['Desafio: 3 linhas na tabela', !!(rb && rb.getElementsByTagName('strow').length >= 3)]);
    }
    return r;
  }
  function checksHTML(list) { return list.map(function (c) { return '<li class="' + (c[1] ? 'ok' : '') + '">' + esc(c[0]) + '</li>'; }).join(''); }

  /* ───────── Laboratórios ───────── */
  function lab(id, template, kind, solution) {
    var box = document.getElementById(id), ta = $('textarea', box);
    ta.value = store('lab-' + id) || template;
    function setStatus(el, p, okMsg) {
      if (p.error) { el.className = 'status err'; el.innerHTML = esc(p.error.title) + (p.error.raw ? '<small>' + esc(p.error.raw) + '</small>' : ''); }
      else { el.className = 'status ok'; el.textContent = okMsg; }
    }
    function update() {
      store('lab-' + id, ta.value);
      var p = parse(ta.value);
      if (kind === 'xml' || kind === 'boxes') {
        setStatus($('[data-status]', box), p, '✓ XML válido');
        var tgt = $(kind === 'xml' ? '[data-tree]' : '[data-boxes]', box);
        if (p.error) tgt.innerHTML = '<span class="xtree"><span class="tx">Aparece quando o XML estiver válido.</span></span>';
        else tgt.innerHTML = kind === 'xml' ? '<ul>' + treeHTML(p.doc.documentElement) + '</ul>' : boxHTML(p.doc.documentElement, 0);
        return;
      }
      var ck = $('[data-checks]', box);
      if (kind === 'own') {
        var tr = $('[data-tree]', box);
        if (p.error) { ck.innerHTML = '<li class="">XML válido</li>' + '<li class="" style="color:var(--err)">' + esc(p.error.title) + '</li>'; tr.innerHTML = ''; return; }
        ck.innerHTML = checksHTML(checks('own', p.doc)); tr.innerHTML = '<ul>' + treeHTML(p.doc.documentElement) + '</ul>'; return;
      }
      var pv = $('[data-preview]', box);
      if (p.error) { ck.innerHTML = '<li>XML válido</li>'; pv.innerHTML = '<div class="status err">' + esc(p.error.title) + (p.error.raw ? '<small>' + esc(p.error.raw) + '</small>' : '') + '</div>'; return; }
      ck.innerHTML = checksHTML(checks(kind, p.doc));
      if (kind === 'map') {
        var t = kid(p.doc.documentElement, 'title');
        pv.innerHTML = '<div class="pv"><h3 class="pv-title" style="font-size:19px">' + esc(t ? t.textContent : 'Sem título') + '</h3>' + (tocHTML(p.doc.documentElement) || '<p>Nenhum topicref.</p>') + '</div>';
      } else pv.innerHTML = previewDoc(p.doc.documentElement);
    }
    ta.addEventListener('input', update);
    ta.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && !e.shiftKey && !e.altKey && ta.selectionStart === ta.selectionEnd) {
        e.preventDefault(); var s = ta.selectionStart; ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(s); ta.selectionStart = ta.selectionEnd = s + 2; update();
      }
    });
    $('[data-reset]', box).addEventListener('click', function () { ta.value = template; update(); });
    var sol = $('[data-solve]', box); if (sol) sol.addEventListener('click', function () { ta.value = solution; update(); });
    update();
  }
  lab('lab-boxes', T.boxes, 'boxes');
  lab('lab-xml', T.xmlBroken, 'xml', T.xmlFixed);
  lab('lab-own', T.own, 'own', T.ownSol);
  lab('lab-concept', T.concept, 'concept');
  lab('lab-task', T.task, 'task');
  lab('lab-ref', T.ref, 'reference');
  lab('lab-map', T.map, 'map');

  /* ───────── 2-2: classificação ───────── */
  (function () {
    var S = [
      ['O limite diário de hotel é R$ 450.', 'reference', 'É um dado para consultar.'],
      ['Clique em Enviar para mandar o relatório.', 'task', 'É uma ação: a pessoa vai fazer algo.'],
      ['O reembolso é o pagamento das despesas que você teve a trabalho.', 'concept', 'Explica o que algo é.'],
      ['Código E01: recibo ausente. Código E02: valor acima do limite.', 'reference', 'Uma lista de códigos para consulta.'],
      ['Anexe a foto do recibo e toque em Salvar.', 'task', 'Passos que a pessoa executa.'],
      ['O gestor aprova os relatórios para controlar os gastos da equipe.', 'concept', 'Explica por que algo existe.']
    ];
    var wrap = document.getElementById('sort'), score = document.getElementById('sort-score'), got = {};
    wrap.innerHTML = S.map(function (s, i) {
      return '<div class="sort-row" data-row="' + i + '"><p>“' + esc(s[0]) + '”</p><div class="seg">' + ['concept', 'task', 'reference'].map(function (t) { return '<button type="button" data-t="' + t + '">' + t + '</button>'; }).join('') + '</div><p class="sort-fb" aria-live="polite"></p></div>';
    }).join('');
    function upd() { var n = Object.keys(got).length; score.textContent = n + ' de ' + S.length + ' certas' + (n === S.length ? '. Você já sabe escolher o tipo de tópico!' : ''); }
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-t]'); if (!b) return;
      var row = b.closest('[data-row]'), i = +row.dataset.row, ok = b.dataset.t === S[i][1];
      $$('[data-t]', row).forEach(function (x) { x.classList.remove('right', 'wrong'); });
      b.classList.add(ok ? 'right' : 'wrong');
      $('.sort-fb', row).textContent = ok ? 'Certo. ' + S[i][2] : 'Ainda não. Pergunte: a pessoa quer entender, fazer ou consultar?';
      if (ok) got[i] = 1; else delete got[i];
      upd();
    });
    upd();
  })();

  /* ───────── 2-8: reúso ───────── */
  var rin = document.getElementById('reuse-in');
  function syncReuse() { var v = rin.value.trim() || '(aviso vazio)'; $$('[data-reuse]').forEach(function (s) { s.textContent = v; }); }
  rin.addEventListener('input', syncReuse); syncReuse();

  /* ───────── 3-6: Git simulado ───────── */
  var FILES = ['conceito-relatorio.dita', 'tarefa-enviar-relatorio.dita', 'guia.ditamap'];
  var G = { init: false, tracked: {}, modified: {}, staged: {}, commits: {}, branches: {}, head: 'main', ranStatus: false, branchCommit: false, merged: false };
  var out = document.getElementById('term-out'), inp = document.getElementById('term-input'), hist = [], hi = 0;
  function print(text, cls) { var d = document.createElement('div'); d.className = cls || 'o'; d.textContent = text; out.appendChild(d); out.scrollTop = out.scrollHeight; }
  function hash() { return (Math.random().toString(16).slice(2) + '0000000').slice(0, 7); }
  function log(start) { var a = [], c = start, g = 0; while (c && g++ < 100) { a.push(G.commits[c]); c = G.commits[c].parent; } return a; }
  function isAnc(a, b) { var st = [b], seen = {}; while (st.length) { var c = st.pop(); if (!c || seen[c]) continue; if (c === a) return true; seen[c] = 1; st.push(G.commits[c].parent, G.commits[c].parent2); } return false; }
  function untracked() { return FILES.filter(function (f) { return !G.tracked[f] && !G.staged[f]; }); }
  function modifiedList() { return FILES.filter(function (f) { return G.modified[f] && !G.staged[f]; }); }
  function stagedList() { return FILES.filter(function (f) { return G.staged[f]; }); }
  function commit(msg) {
    var id = hash(); G.commits[id] = { id: id, msg: msg, parent: G.branches[G.head] || null }; G.branches[G.head] = id;
    stagedList().forEach(function (f) { G.tracked[f] = true; delete G.modified[f]; }); G.staged = {};
    if (G.head !== 'main') G.branchCommit = true; return id;
  }
  var HELP = 'Comandos que funcionam aqui:\n  git init · git status · git add <arquivo> · git add .\n  git commit -m "mensagem" · git log --oneline\n  git branch · git switch -c <nome> · git switch <nome>\n  git merge <nome> · ls · pwd · clear\n  edit <arquivo>  → simula uma edição no VS Code';
  function run(line) {
    var cmd = line.trim(); if (!cmd) return; print('$ ' + cmd, 'c');
    var tk = cmd.split(/\s+/);
    if (tk[0] === 'help') return print(HELP);
    if (tk[0] === 'clear') { out.innerHTML = ''; return; }
    if (tk[0] === 'ls') return print(FILES.join('   '));
    if (tk[0] === 'pwd') return print('/Documentos/central-ajuda-despesas');
    if (tk[0] === 'edit' || tk[0] === 'code') {
      var f = tk[1]; if (FILES.indexOf(f) < 0) return print('Arquivo não encontrado. Use ls para ver os nomes.', 'r');
      if (G.tracked[f]) G.modified[f] = true; return print('✎ Você editou e salvou ' + f + ' (simulado).', 'y');
    }
    if (tk[0] !== 'git') return print('Comando não reconhecido. Digite help.', 'r');
    var sub = tk[1];
    if (!sub || sub === '--version') return print('git version 2.47.0');
    if (sub === 'config') return print('Configuração salva.', 'g');
    if (sub === 'init') { if (G.init) return print('O repositório já existe.'); G.init = true; return print('Repositório Git criado. O Git agora acompanha esta pasta.', 'g'); }
    if (!G.init) return print('Erro: esta pasta ainda não é um repositório. Rode git init.', 'r');
    if (sub === 'status') {
      G.ranStatus = true; var s = stagedList(), m = modifiedList(), u = untracked();
      print('Você está no branch ' + G.head);
      if (s.length) { print('Prontos para o commit:'); s.forEach(function (f) { print('    ' + f, 'g'); }); }
      if (m.length) { print('Modificados, ainda não preparados (use git add):'); m.forEach(function (f) { print('    modificado: ' + f, 'r'); }); }
      if (u.length) { print('Arquivos novos que o Git ainda não acompanha (use git add):'); u.forEach(function (f) { print('    ' + f, 'r'); }); }
      if (!s.length && !m.length && !u.length) print('Nada para salvar. Tudo limpo.', 'g');
      return;
    }
    if (sub === 'add') {
      var arg = tk[2]; if (!arg) return print('Diga o que adicionar: git add <arquivo> ou git add .', 'r');
      var list = (arg === '.' || arg === '-A') ? untracked().concat(modifiedList()) : [arg];
      for (var i = 0; i < list.length; i++) if (FILES.indexOf(list[i]) < 0) return print('Erro: o arquivo "' + list[i] + '" não existe.', 'r');
      var added = list.filter(function (f) { return !G.tracked[f] || G.modified[f]; });
      if (!added.length) return print('Nada novo para preparar. Edite um arquivo antes (edit <arquivo>).');
      added.forEach(function (f) { G.staged[f] = true; }); return print('Preparado: ' + added.join(', '), 'g');
    }
    if (sub === 'commit') {
      var mm = cmd.match(/-m\s+["“'](.+?)["”']/) || cmd.match(/-m\s+(\S+)/);
      if (!mm) return print('Falta a mensagem. Use: git commit -m "sua mensagem"', 'r');
      if (!stagedList().length) return print('Nada preparado. Use git add antes do commit.', 'r');
      var n = stagedList().length, id = commit(mm[1]);
      return print('[' + G.head + ' ' + id + '] ' + mm[1] + '\n ' + n + ' arquivo(s) salvo(s) no histórico', 'g');
    }
    if (sub === 'log') {
      var l = log(G.branches[G.head]); if (!l.length) return print('Ainda não há commits.');
      var one = tk.indexOf('--oneline') > -1;
      l.forEach(function (c) { print(one ? c.id + ' ' + c.msg : 'commit ' + c.id + '\n    ' + c.msg + '\n', 'y'); }); return;
    }
    if (sub === 'branch') {
      if (!tk[2]) { var names = Object.keys(G.branches); if (!names.length) names = ['main']; names.forEach(function (b) { print((b === G.head ? '* ' : '  ') + b, b === G.head ? 'g' : 'o'); }); return; }
      if (!G.branches[G.head]) return print('Faça o primeiro commit antes de criar branches.', 'r');
      if (G.branches[tk[2]]) return print('O branch ' + tk[2] + ' já existe.', 'r');
      G.branches[tk[2]] = G.branches[G.head]; return print('Branch ' + tk[2] + ' criado. Use git switch ' + tk[2] + ' para entrar nele.', 'g');
    }
    if (sub === 'switch' || sub === 'checkout') {
      var create = tk[2] === '-c' || tk[2] === '-b', name = create ? tk[3] : tk[2];
      if (!name) return print('Diga o nome do branch.', 'r');
      if (create) {
        if (!G.branches[G.head]) return print('Faça o primeiro commit antes de criar branches.', 'r');
        if (G.branches[name]) return print('O branch ' + name + ' já existe. Para entrar: git switch ' + name, 'r');
        G.branches[name] = G.branches[G.head]; G.head = name; return print("Branch '" + name + "' criado. Você está nele agora.", 'g');
      }
      if (!G.branches[name]) return print("O branch '" + name + "' não existe. Para criar: git switch -c " + name, 'r');
      G.head = name; return print("Agora você está no branch '" + name + "'.", 'g');
    }
    if (sub === 'merge') {
      var b = tk[2], tgt = G.branches[b], cur = G.branches[G.head];
      if (!b || !tgt) return print('Branch não encontrado. Veja os nomes com git branch.', 'r');
      if (b === G.head) return print('Você já está nesse branch. Vá para o main antes: git switch main', 'r');
      if (tgt === cur || isAnc(tgt, cur)) return print('Já está atualizado. Nada novo para juntar.');
      if (!cur || isAnc(cur, tgt)) { G.branches[G.head] = tgt; print('Pronto: as mudanças de ' + b + ' entraram no ' + G.head + '.', 'g'); }
      else { var mid = hash(); G.commits[mid] = { id: mid, msg: "Merge branch '" + b + "'", parent: cur, parent2: tgt }; G.branches[G.head] = mid; print('Merge feito: commit ' + mid, 'g'); }
      if (G.head === 'main' && G.branchCommit) G.merged = true; return;
    }
    print('Este simulador não conhece esse comando. Digite help.', 'r');
  }
  var MISSIONS = [
    ['Ligue o Git na pasta', ['git init'], function () { return G.init; }],
    ['Veja o que o Git enxerga', ['git status'], function () { return G.ranStatus; }],
    ['Prepare tudo e salve a primeira versão', ['git add .', 'git commit -m "Adiciona tópicos iniciais"'], function () { return Object.keys(G.commits).length > 0; }],
    ['Crie um branch de revisão e entre nele', ['git switch -c revisao-tarefa'], function () { return G.head !== 'main' || G.merged; }],
    ['Edite a task e salve no branch', ['edit tarefa-enviar-relatorio.dita', 'git add .', 'git commit -m "Melhora o texto dos passos"'], function () { return G.branchCommit; }],
    ['Volte ao main e junte a revisão', ['git switch main', 'git merge revisao-tarefa'], function () { return G.merged; }],
    ['Confira o histórico', ['git log --oneline'], function () { return G.merged && G.sawLog; }]
  ];
  function renderSide() {
    document.getElementById('missions').innerHTML = MISSIONS.map(function (m) {
      return '<li class="' + (m[2]() ? 'ok' : '') + '"><span>' + esc(m[0]) + '<br>' + m[1].map(function (c) { return '<code data-fill="' + esc(c) + '" role="button" tabindex="0">' + esc(c) + '</code>'; }).join(' ') + '</span></li>';
    }).join('');
    var work = untracked().map(function (f) { return '<div class="new">' + esc(f) + '</div>'; }).concat(modifiedList().map(function (f) { return '<div class="mod">✎ ' + esc(f) + '</div>'; }));
    var stg = stagedList().map(function (f) { return '<div class="stg">' + esc(f) + '</div>'; });
    var cms = G.init ? log(G.branches[G.head]).slice(0, 5).map(function (c) { return '<div class="cm">' + esc(c.id) + ' ' + esc(c.msg) + '</div>'; }) : [];
    document.getElementById('areas').innerHTML =
      '<div class="area"><h4>Pasta</h4>' + (work.join('') || '<div class="new">nada mudou</div>') + '</div>' +
      '<div class="area"><h4>Preparação</h4>' + (stg.join('') || '<div class="new">vazia</div>') + '</div>' +
      '<div class="area"><h4>Histórico · ' + esc(G.head) + '</h4>' + (cms.join('') || '<div class="new">' + (G.init ? 'sem commits' : 'Git desligado') + '</div>') + '</div>';
  }
  function fill(el) { inp.value = el.getAttribute('data-fill'); inp.focus(); }
  var ms = document.getElementById('missions');
  ms.addEventListener('click', function (e) { var c = e.target.closest('[data-fill]'); if (c) fill(c); });
  ms.addEventListener('keydown', function (e) { var c = e.target.closest('[data-fill]'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); fill(c); } });
  document.getElementById('term-form').addEventListener('submit', function (e) {
    e.preventDefault(); var v = inp.value; if (v.trim()) { hist.push(v); hi = hist.length; }
    inp.value = ''; if (/^git\s+log/.test(v.trim())) G.sawLog = true; run(v); renderSide();
  });
  inp.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' && hi > 0) { hi--; inp.value = hist[hi]; e.preventDefault(); }
    if (e.key === 'ArrowDown') { hi = Math.min(hist.length, hi + 1); inp.value = hist[hi] || ''; e.preventDefault(); }
  });
  print('Você está na pasta central-ajuda-despesas, com 3 arquivos.', 'y');
  print('Comece pela primeira missão. Digite help para ver os comandos.');
  renderSide();

  /* ───────── Quiz ───────── */
  $$('.quiz').forEach(function (q) {
    var ans = Number(q.getAttribute('data-answer')), fb = $('.quiz-fb', q), btns = $$('.quiz-opts button', q);
    btns.forEach(function (b, i) {
      b.type = 'button';
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.remove('right', 'wrong'); });
        if (i === ans) { b.classList.add('right'); fb.textContent = 'Certo. ' + q.getAttribute('data-explain'); }
        else { b.classList.add('wrong'); fb.textContent = 'Ainda não. Tente outra opção.'; }
      });
    });
  });

  /* ───────── Checklist ───────── */
  $$('#checklist input').forEach(function (c) {
    c.checked = store(c.id) === '1';
    c.addEventListener('change', function () { store(c.id, c.checked ? '1' : '0'); });
  });


  /* ───────── Extra ABAP: explicador de código ───────── */
  var EXPLAIN = {
    abap1: [
      ['* Mostra o total de um relatório de despesas', 'Comentário. A linha começa com <code>*</code>, então o sistema ignora. É um recado para quem lê o código.'],
      ['REPORT z_total_relatorio.', 'Dá nome ao programa. Começa com Z porque foi criado pela empresa, e não pela SAP. Note o ponto no fim: toda instrução termina assim.'],
      [''],
      ['DATA lv_total  TYPE p DECIMALS 2.', 'Cria uma <strong>variável</strong>: uma caixinha com nome que guarda um valor. <code>lv_</code> indica um valor simples. <code>TYPE p DECIMALS 2</code> quer dizer “número com 2 casas decimais”, bom para dinheiro.'],
      ["DATA lv_limite TYPE p DECIMALS 2 VALUE '450.00'.", 'Outra caixinha, que já começa com o valor 450,00. No código, o separador decimal é o ponto.'],
      [''],
      ['lv_total = 380.', 'Guarda o número 380 dentro de <code>lv_total</code>. Aqui o sinal <code>=</code> quer dizer “recebe”.'],
      [''],
      ["WRITE: / 'Total do relatório:', lv_total.  \" na tela", 'Mostra na tela um texto e o valor. A barra <code>/</code> pula uma linha. O texto entre aspas simples aparece como está. Tudo depois de <code>"</code> é comentário.']
    ],
    abap2: [
      ['LOOP AT lt_despesas INTO ls_despesa.', '<strong>Repetição:</strong> para cada despesa da lista <code>lt_despesas</code> (<code>lt_</code> = tabela), copia a despesa da vez para <code>ls_despesa</code> (<code>ls_</code> = uma linha com vários campos).'],
      ['  IF ls_despesa-recibo IS INITIAL.', '<strong>Decisão:</strong> se o campo recibo dessa despesa estiver vazio. O hífen acessa um campo: <code>ls_despesa-recibo</code> é “o recibo da despesa”. <code>IS INITIAL</code> quer dizer “vazio”.'],
      ['    MESSAGE e002(zdespesas) WITH ls_despesa-id.', 'Mostra a mensagem de <strong>erro</strong> (<code>e</code>) número 002, guardada na classe <code>zdespesas</code>. O id da despesa entra no lugar de <code>&amp;1</code> no texto.'],
      ['  ELSEIF ls_despesa-valor > lv_limite.', '<strong>Senão, se</strong> o valor da despesa for maior que o limite…'],
      ['    MESSAGE w001(zdespesas) WITH lv_limite.', '…mostra o <strong>aviso</strong> (<code>w</code>, de warning) número 001, com o valor do limite no lugar de <code>&amp;1</code>.'],
      ['  ENDIF.', 'Fim da decisão. Todo <code>IF</code> fecha com <code>ENDIF</code>, como uma tag XML fecha com <code>&lt;/tag&gt;</code>.'],
      ['ENDLOOP.', 'Fim da repetição. O sistema volta para a próxima despesa até acabar a lista.']
    ]
  };
  $$('[data-explain]').forEach(function (wrap) {
    var L = EXPLAIN[wrap.getAttribute('data-explain')]; if (!L) return;
    var code = document.createElement('div'); code.className = 'explain-code'; code.setAttribute('role', 'group'); code.setAttribute('aria-label', 'Código ABAP, uma linha por botão');
    var box = document.createElement('div'); box.className = 'explain-box'; box.setAttribute('aria-live', 'polite');
    var n = 0;
    L.forEach(function (row, i) {
      if (!row[0]) { var b0 = document.createElement('div'); b0.className = 'blank'; code.appendChild(b0); n++; return; }
      n++;
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<span class="ln">' + n + '</span>' + esc(row[0]);
      b.addEventListener('click', function () {
        $$('button', code).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        box.innerHTML = '<span class="out-label">Linha ' + b.querySelector('.ln').textContent + '</span><p>' + row[1] + '</p>';
      });
      code.appendChild(b);
    });
    wrap.appendChild(code); wrap.appendChild(box);
    var first = code.querySelector('button'); if (first) first.click();
  });

  /* ───────── Extra ABAP: prática de mensagem ───────── */
  (function () {
    var sIn = document.getElementById('msg-short'), lIn = document.getElementById('msg-long');
    if (!sIn) return;
    var DEF_S = 'Erro: data inválida.', DEF_L = '';
    var SOL_S = 'A despesa de &1 passou do prazo de &2 dias. Peça uma exceção ao gestor.';
    var SOL_L = 'Causa: despesas só podem ser enviadas até 60 dias depois da data da compra.\nO que fazer: peça uma exceção ao seu gestor ou remova a despesa do relatório.';
    sIn.value = store('msg-s') || DEF_S; lIn.value = store('msg-l') || DEF_L;
    function fillVals(t) { return t.replace(/&1/g, '15/06/2026').replace(/&2/g, '60'); }
    function upd() {
      store('msg-s', sIn.value); store('msg-l', lIn.value);
      var t = sIn.value, len = t.length, cnt = document.getElementById('msg-count');
      cnt.textContent = len + ' de 73 caracteres'; cnt.classList.toggle('over', len > 73);
      document.getElementById('msg-prev').textContent = fillVals(t) || '(texto vazio)';
      document.getElementById('msg-long-prev').textContent = fillVals(lIn.value) || 'O texto longo aparece aqui quando a pessoa clica na mensagem.';
      var C = [
        ['Até 73 caracteres', len > 0 && len <= 73],
        ['Usa &1 (a data da despesa)', /&1/.test(t)],
        ['Usa &2 (o prazo em dias)', /&2/.test(t)],
        ['Evita “erro”, “inválido” e “falha”', !/erro|inv[aá]lid|falh/i.test(t)],
        ['Diz o que a pessoa pode fazer', /(peça|solicite|fale|envie|escolha|altere|corrija|confira|verifique|use|anexe|remova|procure|entre em contato)/i.test(t + ' ' + lIn.value)],
        ['Texto longo explica a causa', lIn.value.trim().length > 20]
      ];
      document.getElementById('msg-checks').innerHTML = C.map(function (c) { return '<li class="' + (c[1] ? 'ok' : '') + '">' + esc(c[0]) + '</li>'; }).join('');
    }
    sIn.addEventListener('input', upd); lIn.addEventListener('input', upd);
    document.getElementById('msg-reset').addEventListener('click', function () { sIn.value = DEF_S; lIn.value = DEF_L; upd(); });
    document.getElementById('msg-solve').addEventListener('click', function () { sIn.value = SOL_S; lIn.value = SOL_L; upd(); });
    upd();
  })();


  /* ───────── Extra SAP: ordem de transporte ───────── */
  (function () {
    var el = document.getElementById('transport'); if (!el) return;
    var S = [
      [0, 'Editado', 'Você muda o texto curto da mensagem 003 no sistema de desenvolvimento (DEV).'],
      [0, 'Na ordem DEVK900123', 'Ao salvar, o sistema pede uma ordem de transporte. Você escolhe a ordem da sua tarefa, que tem uma descrição, como a mensagem de um commit.'],
      [0, 'Ordem liberada', 'Quando a tarefa termina, a ordem é liberada. O conteúdo fica congelado e pronto para seguir.'],
      [1, 'Em teste', 'A ordem é importada no sistema de qualidade (QAS). Lá, o texto é testado na tela real e revisado.'],
      [2, 'No ar', 'Aprovada, a ordem é importada em produção (PRD). Agora os usuários veem o texto novo.']
    ];
    var NAMES = [['DEV', 'Desenvolvimento'], ['QAS', 'Qualidade'], ['PRD', 'Produção']], i = 0;
    var sys = $('.tr-systems', el), cap = $('.tr-cap', el), cnt = $('[data-tr-count]', el);
    function draw() {
      sys.innerHTML = NAMES.map(function (n, k) {
        var here = S[i][0] === k;
        return '<div class="tr-sys' + (here ? ' here' : '') + (S[i][0] > k ? ' past' : '') + '"><b>' + n[0] + '</b><span>' + n[1] + '</span>' +
          (here ? '<div class="tr-chip"><code>Mensagem 003</code><em>' + esc(S[i][1]) + '</em></div>' : '<div class="tr-empty"></div>') + '</div>';
      }).join('');
      cap.textContent = S[i][2]; cnt.textContent = (i + 1) + ' de ' + S.length;
      $('[data-tr-prev]', el).disabled = i === 0; $('[data-tr-next]', el).disabled = i === S.length - 1;
    }
    $('[data-tr-prev]', el).addEventListener('click', function () { if (i > 0) { i--; draw(); } });
    $('[data-tr-next]', el).addEventListener('click', function () { if (i < S.length - 1) { i++; draw(); } });
    draw();
  })();

  /* ───────── Extra SAP: rótulos de campo ───────── */
  (function () {
    var F = [['lbl-s', 'Curto', 10], ['lbl-m', 'Médio', 20], ['lbl-l', 'Longo', 40], ['lbl-h', 'Título de coluna', 55]];
    if (!document.getElementById('lbl-s')) return;
    function upd() {
      document.getElementById('lbl-checks').innerHTML = F.map(function (f) {
        var v = document.getElementById(f[0]).value, ok = v.trim().length > 0 && v.length <= f[2];
        return '<li class="' + (ok ? 'ok' : '') + '">' + esc(f[1]) + ': ' + v.length + ' de ' + f[2] + '</li>';
      }).join('');
    }
    F.forEach(function (f) { var e = document.getElementById(f[0]); var sv = store(f[0]); if (sv !== null && sv !== undefined) e.value = sv; e.addEventListener('input', function () { store(f[0], e.value); upd(); }); });
    upd();
  })();

  /* ───────── Perguntas (5-6) ───────── */
  $$('#questions input').forEach(function (c) {
    c.checked = store(c.id) === '1';
    c.addEventListener('change', function () { store(c.id, c.checked ? '1' : '0'); });
  });

  /* ───────── Navegação entre aulas ───────── */
  var MODS = ['Introdução', 'Módulo 1 · XML do zero', 'Módulo 2 · DITA', 'Módulo 3 · Git e GitHub', 'Projeto final', 'Extra · UA no SAP'];
  var lessons = $$('.lesson'), ids = lessons.map(function (l) { return l.dataset.id; });
  var done = {}; try { done = JSON.parse(store('done') || '{}') || {}; } catch (e) { done = {}; }
  var nav = document.getElementById('nav'), side = document.getElementById('side'), scrim = document.getElementById('scrim'), openBtn = document.getElementById('open-nav');

  var html = '';
  MODS.forEach(function (m, mi) {
    var ls = lessons.filter(function (l) { return +l.dataset.mod === mi; });
    html += '<div class="mod"><div class="mod__title">' + esc(m) + '</div><ol>' + ls.map(function (l) {
      return '<li><a href="#l' + l.dataset.id + '" data-go="' + l.dataset.id + '"><span class="n">' + l.dataset.id.replace('-', '.') + '</span><span>' + esc(l.dataset.short) + '</span></a></li>';
    }).join('') + '</ol></div>';
  });
  nav.innerHTML = html;

  lessons.forEach(function (l, i) {
    var pg = document.createElement('div'); pg.className = 'pager';
    var prev = lessons[i - 1], next = lessons[i + 1];
    pg.innerHTML = (prev ? '<button type="button" class="pv-btn" data-go="' + prev.dataset.id + '"><small>← Anterior</small><span>' + esc(prev.dataset.short) + '</span></button>' : '') +
      (next ? '<button type="button" class="nx" data-go="' + next.dataset.id + '" data-complete="' + l.dataset.id + '"><small>Próxima →</small><span>' + esc(next.dataset.short) + '</span></button>'
            : '<button type="button" class="nx" data-complete="' + l.dataset.id + '" data-go="' + l.dataset.id + '"><small>Concluir curso</small><span>Marcar como concluído</span></button>');
    l.appendChild(pg);
  });

  function paint(cur) {
    var n = Object.keys(done).filter(function (k) { return done[k] && ids.indexOf(k) > -1; }).length, pct = Math.round(n / ids.length * 100);
    document.getElementById('bar').style.width = pct + '%';
    document.getElementById('bar-text').textContent = pct + '%';
    document.getElementById('pct-m').textContent = pct + '%';
    $$('a[data-go]', nav).forEach(function (a) {
      a.classList.toggle('is-done', !!done[a.dataset.go]);
      a.classList.toggle('is-current', a.dataset.go === cur);
      if (a.dataset.go === cur) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }
  function closeNav() { side.classList.remove('open'); scrim.hidden = true; openBtn.setAttribute('aria-expanded', 'false'); }
  var show = function (id, fromHash) {
    if (ids.indexOf(id) < 0) id = ids[0];
    lessons.forEach(function (l) { l.hidden = l.dataset.id !== id; });
    var l = lessons[ids.indexOf(id)];
    document.getElementById('where').textContent = MODS[+l.dataset.mod].split(' · ')[0] + ' · ' + l.dataset.short;
    store('last', id); paint(id); closeNav();
    if (!fromHash && location.hash !== '#l' + id) { try { history.replaceState(null, '', '#l' + id); } catch (e) {} }
    window.scrollTo(0, 0);
    var h = $('h1', l); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  };

  document.addEventListener('click', function (e) {
    var g = e.target.closest('[data-go]'); if (!g) return;
    e.preventDefault();
    var c = g.getAttribute('data-complete'); if (c) { done[c] = true; store('done', JSON.stringify(done)); }
    show(g.getAttribute('data-go'));
  });
  window.addEventListener('hashchange', function () { var m = location.hash.match(/^#l(\d-\d+)$/); if (m) show(m[1], true); });
  openBtn.addEventListener('click', function () { side.classList.add('open'); scrim.hidden = false; openBtn.setAttribute('aria-expanded', 'true'); var c = $('a.is-current', nav); if (c) c.focus(); });
  document.getElementById('close-nav').addEventListener('click', closeNav);
  scrim.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && side.classList.contains('open')) { closeNav(); openBtn.focus(); } });

  var cover = document.getElementById('cover');
  function showCover() {
    lessons.forEach(function (l) { l.hidden = true; }); cover.hidden = false;
    document.getElementById('where').textContent = 'Início'; paint(''); closeNav(); window.scrollTo(0, 0);
  }
  var _show = show;
  show = function (id, fromHash) { cover.hidden = true; _show(id, fromHash); };
  document.getElementById('start-btn').addEventListener('click', function () { store('started', '1'); show(ids[0]); });
  var rb = document.getElementById('reset-btn'), rbTimer;
  rb.addEventListener('click', function () {
    if (!rb.classList.contains('armed')) {
      rb.classList.add('armed'); rb.textContent = 'Toque de novo para apagar o progresso';
      clearTimeout(rbTimer); rbTimer = setTimeout(function () { rb.classList.remove('armed'); rb.textContent = 'Recomeçar curso'; }, 4000);
      return;
    }
    try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf(PFX) === 0) localStorage.removeItem(k); }); } catch (e) {}
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    location.reload();
  });
  if (!store('started')) showCover();
  else show((location.hash.match(/^#l(\d-\d+)$/) || [])[1] || store('last') || ids[0], true);
})();
