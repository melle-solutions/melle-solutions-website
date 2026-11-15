// Videos werden erst geladen, wenn jemand auf „abspielen" klickt – vorher geht keine Anfrage hinaus.
// Liegt das Video als MP4 auf go.melle.com.de (Liste EIGENE unten), spielt der Browser es direkt ab;
// sonst wird die alte Bunny-Einbettung (data-video) genutzt.
(function () {
  // Die Videos liegen auf Strato: /go/melle-solutions-website-videos/ (hochladen: server/videos/hochladen.sh).
  var BASIS = "https://go.melle.com.de/melle-solutions-website-videos/";
  // Videos, die als eigene MP4-Datei vorliegen (Rest läuft noch über die alte Bunny-Einbettung):
  var EIGENE = ["vorstellung", "lieferabrufe", "workshop-uebersetzung", "seo-automatisch", "seo-von-hand", "bautagebuch"];

  document.querySelectorAll(".video[data-video]").forEach(function (box) {
    var knopf = box.querySelector(".video-start");
    var name = box.getAttribute("data-name");
    knopf.addEventListener("click", function () {
      var titel = knopf.querySelector(".video-titel").textContent, el;
      if (name && EIGENE.indexOf(name) >= 0) {
        el = document.createElement("video");
        el.src = BASIS + name + ".mp4";
        el.controls = true; el.autoplay = true; el.playsInline = true; el.preload = "metadata";
        el.setAttribute("aria-label", titel);
      } else {
        el = document.createElement("iframe");
        el.src = box.getAttribute("data-video");
        el.title = titel;
        el.allow = "accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen";
        el.allowFullscreen = true;
      }
      box.innerHTML = "";
      box.appendChild(el);
      box.classList.add("laeuft");
    });
  });
})();

// Karte im Kontaktbereich: Sofort sichtbar ist ein selbst gehostetes Kartenbild (OpenStreetMap, keine Datenübertragung).
// Google Maps wird erst geladen, wenn jemand auf das Bild klickt.
(function () {
  var box = document.getElementById("karte"), bild = box && box.querySelector(".karte-bild");
  if (!bild) return;
  bild.addEventListener("click", function () {
    var f = document.createElement("iframe");
    f.src = box.getAttribute("data-src"); f.title = "Karte: August-Bebel-Straße 27b, Jena";
    box.innerHTML = ""; box.appendChild(f); box.classList.add("live");
  });
})();

// Link zum Weitergeben: unter jedem Video ein Knopf „Link kopieren“ (Seitenlink mit Sprungmarke #video-…).
// Wer den Link öffnet, landet direkt beim Video; Karussells blättern automatisch zur richtigen Kachel.
(function () {
  function kopieren(text, knopf) {
    function fertig() { var alt = knopf.textContent; knopf.textContent = "Link kopiert ✓"; knopf.classList.add("ok");
      setTimeout(function () { knopf.textContent = alt; knopf.classList.remove("ok"); }, 2200); }
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(fertig, notfall); }
    else { notfall(); }
    function notfall() { var f = document.createElement("textarea"); f.value = text; f.style.position = "fixed"; f.style.opacity = "0";
      document.body.appendChild(f); f.select(); try { document.execCommand("copy"); fertig(); } catch (e) { window.prompt("Link kopieren:", text); } f.remove(); }
  }
  document.querySelectorAll(".video[id^='video-']").forEach(function (box) {
    var knopf = document.createElement("button");
    knopf.type = "button"; knopf.className = "video-link"; knopf.textContent = "🔗 Link kopieren";
    knopf.setAttribute("aria-label", "Link zu diesem Video kopieren");
    knopf.addEventListener("click", function () {
      var basis = location.origin + location.pathname.replace(/index\.html$/, "");
      kopieren(basis + "#" + box.id, knopf);
    });
    var fig = box.closest("figure.video-mit-copy");
    // Im Video-Rahmen (figure): Knopf ans Ende, unter Erläuterung und ©, damit er beim Video bleibt
    if (fig) { fig.appendChild(knopf); return; }
    var ziel = box;
    // Hinweise direkt unter dem Video (©, „frei erfunden“) bleiben am Video, der Knopf kommt darunter
    while (ziel.nextElementSibling && ziel.nextElementSibling.classList.contains("video-copy")) ziel = ziel.nextElementSibling;
    ziel.insertAdjacentElement("afterend", knopf);
  });
  function anspringen() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id.indexOf("video-") !== 0) return;
    var box = document.getElementById(id); if (!box) return;
    // Karussell (falls vorhanden) direkt zur Kachel blättern, dann Seite zur Stelle springen
    var spur = box.closest(".cases, .testimonials"), karte = box.closest(".case, .tm");
    if (spur && karte) { spur.style.scrollBehavior = "auto"; spur.scrollLeft = karte.offsetLeft - spur.firstElementChild.offsetLeft; spur.style.scrollBehavior = ""; spur.dispatchEvent(new Event("scroll")); }
    var y = box.getBoundingClientRect().top + window.scrollY - (window.innerHeight - box.offsetHeight) / 2;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, Math.max(0, y));
    document.documentElement.style.scrollBehavior = "";
    box.classList.add("angesprungen"); setTimeout(function () { box.classList.remove("angesprungen"); }, 2500);
  }
  window.addEventListener("hashchange", anspringen);
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("load", function () { setTimeout(anspringen, 150); });
})();
