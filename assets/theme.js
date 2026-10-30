// Aplica o tema salvo antes da página pintar e injeta o botão de tema no curso.
(function () {
  try { var t = localStorage.getItem('estudos-theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) {}
  document.addEventListener('DOMContentLoaded', function () {
    var head = document.querySelector('.side__head');
    if (!head) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'btn-ghost'; b.textContent = 'Alternar tema';
    b.addEventListener('click', function () {
      var r = document.documentElement;
      var cur = r.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      r.dataset.theme = cur === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('estudos-theme', r.dataset.theme); } catch (e) {}
    });
    head.appendChild(b);
  });
})();
