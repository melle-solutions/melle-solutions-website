// Sendet das Kontaktformular per fetch an den go.melle.com.de-Endpunkt
// und zeigt eine Rückmeldung, ohne die Seite neu zu laden.
(function () {
  var form = document.getElementById('kontaktform');
  if (!form) return;
  var status = document.getElementById('status');
  var button = form.querySelector('.submit');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'status';
    status.textContent = '';

    // einfache Prüfung
    if (!form.name.value.trim() || !form.email.value.trim() || !form.nachricht.value.trim()) {
      status.className = 'status err';
      status.textContent = 'Bitte Name, E-Mail und Nachricht ausfüllen.';
      return;
    }

    button.disabled = true;
    button.textContent = 'Senden …';

    var daten = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      telefon: form.telefon ? form.telefon.value.trim() : '',
      nachricht: form.nachricht.value.trim(),
      website: form.website.value // Honigtopf: muss leer sein
    };

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(daten)
    })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (res) {
        if (res && res.ok) {
          form.reset();
          status.className = 'status ok';
          status.textContent = 'Danke! Ihre Nachricht ist angekommen – ich melde mich bald.';
          button.textContent = 'Gesendet ✓';
        } else {
          throw new Error('server');
        }
      })
      .catch(function () {
        status.className = 'status err';
        status.textContent = 'Das hat leider nicht geklappt. Bitte schreiben Sie direkt an mario@melle.com.de.';
        button.disabled = false;
        button.textContent = 'Absenden';
      });
  });
})();
