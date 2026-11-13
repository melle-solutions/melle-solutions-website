// Eigenes Einwilligungs-Banner (ersetzt Usercentrics, 13.11.2026).
// Lädt nichts von Dritten. Die Wahl liegt nur im Browser (localStorage „ms-einwilligung“).
// Skripte mit <script type="text/plain" data-einwilligung="hotjar|leadinfo" src="…"> starten erst nach Zustimmung.
// Wieder öffnen: jedes Element mit [data-einwilligung-oeffnen] (z. B. „Cookie-Einstellungen“ im Fuß).
(function () {
  var SCHLUESSEL = 'ms-einwilligung', VERSION = 1;
  var DIENSTE = [
    { id: 'leadinfo', name: 'Leadinfo', was: 'erkennt, ob ein Besuch von einem Unternehmen kommt (Firmenname, besuchte Seiten).' },
    { id: 'hotjar', name: 'Hotjar', was: 'zeigt mir anonymisiert, wie die Seite genutzt wird, damit ich sie verbessern kann.' }
  ];

  function lesen() {
    try { var w = JSON.parse(localStorage.getItem(SCHLUESSEL)); return w && w.v === VERSION ? w : null; } catch (e) { return null; }
  }
  function speichern(wahl) {
    var alt = lesen(), w = { v: VERSION, zeit: new Date().toISOString() };
    DIENSTE.forEach(function (d) { w[d.id] = !!wahl[d.id]; });
    try { localStorage.setItem(SCHLUESSEL, JSON.stringify(w)); } catch (e) {}
    // Wurde etwas zurückgenommen, das schon lief: neu laden, damit es wirklich aus ist.
    var zurueck = alt && DIENSTE.some(function (d) { return alt[d.id] && !w[d.id]; });
    if (zurueck) { location.reload(); return; }
    starten(w); schliessen();
  }
  function starten(w) {
    document.querySelectorAll('script[type="text/plain"][data-einwilligung]').forEach(function (alt) {
      if (!w[alt.getAttribute('data-einwilligung')] || alt.dataset.gestartet) return;
      alt.dataset.gestartet = '1';
      var s = document.createElement('script'); s.src = alt.getAttribute('src'); s.async = true;
      document.head.appendChild(s);
    });
  }

  var box = null;
  function schliessen() { if (box) { box.remove(); box = null; } }
  function zeigen(mitAuswahl) {
    schliessen();
    var w = lesen() || {};
    box = document.createElement('div');
    box.className = 'einw'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Einwilligung');
    box.innerHTML =
      '<div class="einw-in">' +
      '<p class="einw-titel">Darf ich mitlesen, wer vorbeischaut?</p>' +
      '<p>Mit Ihrer Zustimmung nutze ich <b>Leadinfo</b> (welche Firmen die Seite besuchen) und <b>Hotjar</b> (wie sie genutzt wird). Ohne Zustimmung läuft keiner davon. Ändern können Sie das jederzeit unter „Cookie-Einstellungen“. <a href="/datenschutz.html">Datenschutz</a></p>' +
      '<div class="einw-auswahl"' + (mitAuswahl ? '' : ' hidden') + '>' +
      DIENSTE.map(function (d) {
        return '<label><input type="checkbox" name="' + d.id + '"' + (w[d.id] ? ' checked' : '') + '><span><b>' + d.name + '</b> – ' + d.was + '</span></label>';
      }).join('') + '</div>' +
      '<div class="einw-knoepfe">' +
      '<button type="button" data-a="nein">Ablehnen</button>' +
      '<button type="button" data-a="ja">Zustimmen</button>' +
      '<button type="button" class="einw-link" data-a="' + (mitAuswahl ? 'speichern' : 'auswahl') + '">' + (mitAuswahl ? 'Auswahl speichern' : 'Einzeln auswählen') + '</button>' +
      '</div></div>';
    box.addEventListener('click', function (e) {
      var a = e.target.getAttribute && e.target.getAttribute('data-a'); if (!a) return;
      var alle = {}, keine = {}, gewaehlt = {};
      DIENSTE.forEach(function (d) { alle[d.id] = true; keine[d.id] = false; var c = box.querySelector('input[name="' + d.id + '"]'); gewaehlt[d.id] = c && c.checked; });
      if (a === 'ja') speichern(alle);
      else if (a === 'nein') speichern(keine);
      else if (a === 'speichern') speichern(gewaehlt);
      else if (a === 'auswahl') zeigen(true);
    });
    document.body.appendChild(box);
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-einwilligung-oeffnen]');
    if (t) { e.preventDefault(); zeigen(true); }
  });
  function los() { var w = lesen(); if (w) starten(w); else zeigen(false); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', los); else los();
})();
