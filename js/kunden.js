// Kunden-Wolke (#kunden): wechselndes Raster aus der Namensliste. Ohne Skript oder bei
// „weniger Bewegung“ bleibt die ruhige Liste stehen. Pausiert außer Sicht und solange die Maus darauf steht.
(function () {
  var sek = document.getElementById('kunden');
  if (!sek) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var raster = sek.querySelector('.kunden-raster');
  var namen = Array.prototype.map.call(sek.querySelectorAll('.kunden-liste li'), function (li) {
    return { n: li.textContent, a: li.classList.contains('a') };
  });
  var felderZahl = window.matchMedia('(max-width:760px)').matches ? 8 : 12;
  if (namen.length <= felderZahl) return;
  // Startbild: A- und übrige Namen abwechselnd, übrige gemischt
  var a = namen.filter(function (x) { return x.a; }), b = namen.filter(function (x) { return !x.a; });
  for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = b[i]; b[i] = b[j]; b[j] = t; }
  var reihe = [];
  while (a.length || b.length) { if (a.length) reihe.push(a.shift()); if (b.length) reihe.push(b.shift()); }
  var sicht = reihe.splice(0, felderZahl), warte = reihe;
  sicht.forEach(function (x) {
    var d = document.createElement('div'); d.className = 'kunden-feld' + (x.a ? ' a' : ''); d.textContent = x.n; raster.appendChild(d);
  });
  sek.classList.add('kunden-an');
  var sichtbar = false, maus = false, zuletzt = -1;
  function tausche() {
    if (!sichtbar || maus || document.hidden) return;
    var k; do { k = Math.floor(Math.random() * felderZahl); } while (k === zuletzt);
    zuletzt = k;
    var feld = raster.children[k];
    feld.classList.add('weg');
    setTimeout(function () {
      warte.push(sicht[k]); sicht[k] = warte.shift();
      feld.textContent = sicht[k].n; feld.style.transitionDelay = '';
      // sc-in behalten: Scrollcraft blendet die Kacheln über diese Klasse ein
      feld.className = 'kunden-feld sc-in' + (sicht[k].a ? ' a' : '');
    }, 500);
  }
  setInterval(tausche, 2000);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { sichtbar = e[0].isIntersecting; }, { threshold: 0.2 }).observe(raster);
  } else { sichtbar = true; }
  raster.addEventListener('mouseenter', function () { maus = true; });
  raster.addEventListener('mouseleave', function () { maus = false; });
})();
