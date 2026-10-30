(function () {
  var $ = function (id) { return document.getElementById(id); };
  var read = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };
  var fmt = function (s) {
    var p = s.split('-').map(Number);
    return new Date(Date.UTC(p[0], p[1] - 1, p[2])).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', timeZone: 'UTC' }).replace('.', '');
  };

  var n = new Date(), today = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
  $('days').textContent = Math.max(0, Math.round((Date.UTC(2027, 0, 15) - today) / 864e5));

  $('themeBtn').addEventListener('click', function () {
    var r = document.documentElement;
    var cur = r.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    r.dataset.theme = cur === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('estudos-theme', r.dataset.theme); } catch (e) {}
  });

  /* Cronograma: resumo gravado pela própria página do cronograma */
  var rota = null;
  try { rota = JSON.parse(read('estudos-hub-rota')); } catch (e) {}
  var list = $('rFocus');
  if (rota) {
    $('rDone').textContent = rota.done + '/' + rota.total;
    $('rBar').style.width = (rota.stepsTotal ? rota.steps / rota.stepsTotal * 100 : 0) + '%';
    if (!rota.now.length) { $('rLbl').textContent = 'Tudo feito'; }
    else {
      list.innerHTML = rota.now.map(function (t) {
        return '<li><span>' + t.t.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span><small>até ' + fmt(t.e) + '</small></li>';
      }).join('');
    }
  } else {
    $('rDone').textContent = '0/37';
    $('rLbl').textContent = 'Primeira vez aqui';
    list.innerHTML = '<li><span>Abra o cronograma e marque as etapas conforme avança.</span></li>';
  }

  /* Curso */
  var ids = window.LESSONS.map(function (l) { return l[0]; });
  var names = {}; window.LESSONS.forEach(function (l) { names[l[0]] = l[1]; });
  var done = {};
  try { done = JSON.parse(read('dita-zero-v2:done') || '{}') || {}; } catch (e) {}
  var count = ids.filter(function (i) { return done[i]; }).length;
  var pct = Math.round(count / ids.length * 100);
  $('cPct').textContent = pct + '%';
  $('cSub').textContent = count + ' de ' + ids.length + ' aulas';
  $('cBar').style.width = pct + '%';
  var started = read('dita-zero-v2:started');
  var next = ids.filter(function (i) { return !done[i]; })[0];
  var last = read('dita-zero-v2:last');
  var go = (last && !done[last]) ? last : next;
  if (!next) { $('cNext').textContent = 'Curso concluído'; $('cCta').textContent = 'Revisar curso'; }
  else {
    $('cNext').textContent = go.replace('-', '.') + ' · ' + names[go];
    if (started) { $('cCta').textContent = 'Continuar'; $('cursoLink').href = 'curso.html#l' + go; }
  }

  requestAnimationFrame(function () { document.body.classList.add('ready'); });
})();
