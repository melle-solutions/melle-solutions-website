// Formulare network, lists, BAFA: senden an go.melle.com.de/formular.php (BAFA mit Dateien als multipart).
(function () {
  document.querySelectorAll("form[data-formular]").forEach(function (form) {
    var status = form.querySelector(".status"), knopf = form.querySelector("button[type=submit]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var gruppen = form.querySelectorAll("[data-mindestens-eins]");
      for (var i = 0; i < gruppen.length; i++) {
        if (!gruppen[i].querySelector("input:checked")) { zeige("err", gruppen[i].getAttribute("data-mindestens-eins")); return; }
      }
      var daten = new FormData(form);
      daten.append("formular", form.getAttribute("data-formular"));
      if (!daten.get("name") && (daten.get("vorname") || daten.get("nachname"))) daten.append("name", ((daten.get("vorname") || "") + " " + (daten.get("nachname") || "")).trim());
      if (!daten.get("email") && daten.get("E-Mail")) daten.append("email", daten.get("E-Mail"));
      knopf.disabled = true; var alt = knopf.textContent; knopf.textContent = "Senden …";
      fetch(form.action, { method: "POST", body: daten })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
        .then(function (res) {
          if (res && res.ok) { form.reset(); zeige("ok", form.getAttribute("data-danke")); knopf.textContent = "Gesendet ✓"; }
          else { zeige("err", (res && res.message) || "Das hat nicht geklappt."); knopf.disabled = false; knopf.textContent = alt; }
        })
        .catch(function () { zeige("err", "Das hat leider nicht geklappt. Bitte schreiben Sie an mario@melle.com.de."); knopf.disabled = false; knopf.textContent = alt; });
    });
    function zeige(art, text) { status.className = "status " + art; status.textContent = text; status.scrollIntoView({ block: "nearest" }); }
  });
})();
