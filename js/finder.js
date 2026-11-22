// Zeitfresser-Finder (#finder): Auswahl und Anzeige laufen über CSS (:checked / :has), also auch ohne Skript.
// Das Skript ergänzt nur: (1) eine Ansage für Screenreader, (2) bei Wahl per Maus/Finger das Ergebnis ins Bild holen,
// (3) nach einem Sprung zur Kundengeschichte den Fokus auf die Karte setzen.
(function () {
  var f = document.getElementById('finder');
  if (!f) return;
  var erg = f.querySelector('.finder-ergebnisse'), status = document.getElementById('finder-status');
  var ruhig = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var perZeiger = false;
  f.addEventListener('pointerdown', function () { perZeiger = true; });
  f.addEventListener('keydown', function () { perZeiger = false; });
  f.addEventListener('change', function (e) {
    if (!e.target.classList.contains('finder-radio')) return;
    var n = e.target.id.replace('zf-', ''), box = f.querySelector('.e' + n);
    if (status && box) { status.textContent = ''; setTimeout(function () { status.textContent = 'Beispiel: ' + box.getAttribute('data-ansage'); }, 60); }
    if (perZeiger) {
      // Am Handy das Ergebnisfeld oben ins Bild holen, damit der Termin-Knopf ohne Suchen erreichbar ist
      var schmal = window.matchMedia('(max-width:760px)').matches, r = erg.getBoundingClientRect();
      if (schmal) setTimeout(function () { erg.scrollIntoView({ behavior: ruhig ? 'auto' : 'smooth', block: 'start' }); }, 60);
      else if (r.bottom > window.innerHeight || r.top < 80) erg.scrollIntoView({ behavior: ruhig ? 'auto' : 'smooth', block: 'nearest' });
    }
  });
  f.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.finder-links a');
    if (!a) return;
    var ziel = document.querySelector(a.getAttribute('href'));
    if (ziel) setTimeout(function () { ziel.focus({ preventScroll: true }); }, ruhig ? 0 : 450);
  });
})();
