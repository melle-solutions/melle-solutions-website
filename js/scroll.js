// Startet die Scroll-Engine (scrollcraft) für die ganze Seite.
// Fällt die Engine aus, werden alle eingeblendeten Elemente sofort sichtbar gemacht.
(function () {
  function sichtbar() { document.querySelectorAll('[data-sc-in], [data-sc-stagger] > *, .wisch-rahmen, .tm').forEach(function (el) { el.classList.add('sc-in'); }); }
  try {
    if (window.ScrollCraft && window.ScrollCraft.mount) window.ScrollCraft.mount(document.body);
    else sichtbar();
  } catch (e) { sichtbar(); }

  // Wisch-Aufdeckung erst, wenn ein Viertel der Karte sichtbar ist – sonst läuft sie unterhalb des Bildschirms ab.
  var rahmen = document.querySelectorAll('.wisch-rahmen');
  if (!('IntersectionObserver' in window)) { rahmen.forEach(function (r) { r.classList.add('sc-in'); }); return; }
  var io = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('sc-in'); io.unobserve(e.target); } });
  }, { threshold: 0.25 });
  rahmen.forEach(function (r) { io.observe(r); });
})();

// Überschrift im Abschluss-Band: Wörter laufen einmal nacheinander ein (nur ab 768 px, nicht bei reduzierter Bewegung).
(function () {
  var h = document.querySelector('.wort-einlauf');
  if (!h || !('IntersectionObserver' in window)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(min-width: 768px)').matches) return;
  var text = h.textContent;
  h.setAttribute('aria-label', text);
  h.innerHTML = text.split(' ').map(function (w, i) {
    return '<span class="wort" aria-hidden="true" style="transition-delay:' + (i * 40) + 'ms">' + w + '</span>';
  }).join(' ');
  h.classList.add('wort-bereit');
  var band = h.closest('section') || h;
  var io = new IntersectionObserver(function (e) {
    if (e[0].isIntersecting) { h.classList.add('wort-los'); io.disconnect(); }
  }, { threshold: 0.3 });
  io.observe(band);
})();

// Stimmen: Markierung je Empfehlung einmal einzeichnen, sobald die Karte zur Hälfte sichtbar ist.
(function () {
  var karten = document.querySelectorAll('.tm');
  if (!('IntersectionObserver' in window)) { karten.forEach(function (k) { k.classList.add('marker-los'); }); return; }
  var io = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('marker-los'); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  karten.forEach(function (k) { io.observe(k); });
})();

// Zähler „26“: steht bis zum Start auf dem Endwert (nie eine Null als Aussage) und zählt erst,
// wenn die Zahl selbst zu 60 % sichtbar ist. Reduzierte Bewegung: keine Animation.
(function () {
  var z = document.querySelectorAll('.zahl-zaehler[data-ziel]');
  if (!z.length || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function zaehlen(el) {
    var ziel = parseInt(el.getAttribute('data-ziel'), 10), t0 = null, ms = 900;
    function bild(jetzt) {
      if (t0 === null) t0 = jetzt;
      var t = Math.min((jetzt - t0) / ms, 1), e = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(ziel * e));
      if (t < 1) requestAnimationFrame(bild);
    }
    requestAnimationFrame(bild);
  }
  var io = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) { if (e.isIntersecting) { zaehlen(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.6 });
  z.forEach(function (el) { io.observe(el); });
})();
