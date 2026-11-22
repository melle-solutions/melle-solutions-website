// Kunden-Wolke (#kunden): alle Namen stehen als Fließtext mit Punkten. Eine Lime-Markierung wandert
// über einzelne Namen (immer drei zugleich), damit der Abschnitt lebt, ohne dass Zeilen umbrechen.
// Ohne Skript oder bei „weniger Bewegung“ bleibt die ruhige Liste ohne Markierung.
// Pausiert außer Sicht und solange die Maus darauf steht.
(function () {
  var sek = document.getElementById('kunden');
  if (!sek) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var liste = sek.querySelector('.kunden-liste');
  var li = Array.prototype.slice.call(liste.querySelectorAll('li'));
  if (li.length < 6) return;
  // Name in ein <span> legen, damit die Markierung nur den Namen trifft, nicht den Punkt danach
  li.forEach(function (x) { var s = document.createElement('span'); s.textContent = x.textContent; x.textContent = ''; x.appendChild(s); });
  liste.classList.add('gedimmt');

  var an = [], sichtbar = false, maus = false, zuletzt = -1;
  function schritt() {
    if (!sichtbar || maus || document.hidden) return;
    if (an.length >= 3) li[an.shift()].classList.remove('hell');
    var k; do { k = Math.floor(Math.random() * li.length); } while (k === zuletzt || an.indexOf(k) >= 0);
    zuletzt = k; an.push(k); li[k].classList.add('hell');
  }
  setInterval(schritt, 1400);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { sichtbar = e[0].isIntersecting; }, { threshold: 0.2 }).observe(liste);
  } else { sichtbar = true; }
  liste.addEventListener('mouseenter', function () { maus = true; });
  liste.addEventListener('mouseleave', function () { maus = false; });
})();
