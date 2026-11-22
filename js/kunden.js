// Kunden-Wolke (#kunden): Raster aus einheitlichen Kacheln. Alle 2 s gleitet in einer Kachel ein neuer Name
// von unten herein. A-Kunden sitzen auf festen Plätzen (Schachbrett) und sind nur über die Schrift betont.
// Ohne Skript oder bei „weniger Bewegung“ bleibt die ruhige Namensliste. Pausiert außer Sicht und unter der Maus.
(function () {
  var sek = document.getElementById('kunden');
  if (!sek) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var raster = sek.querySelector('.kunden-raster');
  var namen = Array.prototype.map.call(sek.querySelectorAll('.kunden-liste li'), function (li) {
    return { n: li.textContent, a: li.classList.contains('a') };
  });
  var handy = window.matchMedia('(max-width:760px)').matches;
  var felderZahl = handy ? 8 : 12;
  var aPlaetze = handy ? [0, 3, 4, 7] : [0, 2, 5, 7, 8, 10];
  if (namen.length <= felderZahl) return;

  function mischen(l) {
    for (var i = l.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = l[i]; l[i] = l[j]; l[j] = t; }
    return l;
  }
  var warteA = mischen(namen.filter(function (x) { return x.a; }));
  var warteB = mischen(namen.filter(function (x) { return !x.a; }));
  var istA = [], sicht = [];
  for (var k = 0; k < felderZahl; k++) {
    istA[k] = aPlaetze.indexOf(k) >= 0 && warteA.length > 0;
    sicht[k] = istA[k] ? warteA.shift() : warteB.shift();
    var d = document.createElement('div');
    d.className = 'kunden-feld' + (istA[k] ? ' a' : '');
    var s = document.createElement('span');
    s.textContent = sicht[k].n;
    d.appendChild(s);
    raster.appendChild(d);
  }
  sek.classList.add('kunden-an');

  var sichtbar = false, maus = false, zuletzt = -1;
  function tausche() {
    if (!sichtbar || maus || document.hidden) return;
    var k; do { k = Math.floor(Math.random() * felderZahl); } while (k === zuletzt);
    var warte = istA[k] ? warteA : warteB;
    if (!warte.length) return;
    zuletzt = k;
    var feld = raster.children[k], text = feld.firstChild;
    feld.style.transitionDelay = '';
    feld.classList.add('weg');                       // alter Name gleitet nach oben weg
    setTimeout(function () {
      warte.push(sicht[k]); sicht[k] = warte.shift();
      text.textContent = sicht[k].n;
      feld.classList.remove('weg');
      feld.classList.add('neu');                     // neuer Name steht unten bereit …
      void text.offsetWidth;
      feld.classList.remove('neu');                  // … und gleitet herein
    }, 450);
  }
  setInterval(tausche, 2000);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { sichtbar = e[0].isIntersecting; }, { threshold: 0.2 }).observe(raster);
  } else { sichtbar = true; }
  raster.addEventListener('mouseenter', function () { maus = true; });
  raster.addEventListener('mouseleave', function () { maus = false; });
})();
