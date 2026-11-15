// Kundenstimmen (.tm): Marker im Kernsatz und „Ganzes Zitat lesen“ – Startseite und Unterseiten (z. B. KI-Beirat).
// Setzt die Klasse „js“, damit das Kürzen auf vier Zeilen nur mit Skript greift.
document.documentElement.classList.add('js');

// Stimmen: Markierung je Empfehlung einmal einzeichnen, sobald die Karte zur Hälfte sichtbar ist.
(function () {
  var karten = document.querySelectorAll('.tm');
  if (!('IntersectionObserver' in window)) { karten.forEach(function (k) { k.classList.add('marker-los'); }); return; }
  var io = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('marker-los'); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  karten.forEach(function (k) { io.observe(k); });
})();

// Stimmen: „Ganzes Zitat lesen“ nur zeigen, wenn der Text wirklich gekürzt ist; Klick klappt auf und zu.
(function () {
  var karten = document.querySelectorAll('.tm');
  function pruefen() {
    karten.forEach(function (k) {
      var t = k.querySelector('.tm-voll'), b = k.querySelector('.tm-mehr');
      if (!t || !b || k.classList.contains('offen')) return;
      b.hidden = t.scrollHeight <= t.clientHeight + 2;
    });
  }
  karten.forEach(function (k) {
    var b = k.querySelector('.tm-mehr');
    if (!b) return;
    b.addEventListener('click', function () {
      var auf = k.classList.toggle('offen');
      b.setAttribute('aria-expanded', auf ? 'true' : 'false');
      b.textContent = auf ? 'Weniger anzeigen' : 'Ganzes Zitat lesen';
    });
  });
  pruefen();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(pruefen);
  window.addEventListener('resize', pruefen);
})();
