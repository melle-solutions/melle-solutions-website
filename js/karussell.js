// Karussell für Kundenstimmen und die Zeitleiste der Kundengeschichten (dort ohne Weiterlaufen, data-auto="false"): Pfeile, Punkte, Wischen; läuft langsam weiter,
// hält an, sobald jemand mit der Maus darüber ist oder selbst blättert.
(function () {
  document.querySelectorAll(".karussell").forEach(function (k) {
    var spur = k.querySelector(".testimonials, .cases");
    var karten = spur.children;
    var punkte = k.querySelector(".k-dots");
    var ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var auto = k.getAttribute("data-auto") !== "false";
    var pause = false, timer, ziel = 0, laeuft = 0;

    function schritt() { return karten[0].getBoundingClientRect().width + parseFloat(getComputedStyle(spur).columnGap || 22); }
    function sichtbar() { return Math.max(1, Math.round(spur.clientWidth / schritt())); }
    function seiten() { return Math.max(1, karten.length - sichtbar() + 1); }
    function aktuell() { return Date.now() < laeuft ? ziel : Math.round(spur.scrollLeft / schritt()); }
    function gehe(i) { var n = seiten(); i = (i + n) % n; ziel = i; laeuft = Date.now() + 700; spur.scrollTo({ left: i * schritt(), behavior: ruhig ? "auto" : "smooth" }); }

    function punkteBauen() {
      punkte.innerHTML = "";
      for (var i = 0; i < seiten(); i++) punkte.appendChild(document.createElement("span"));
      markieren();
    }
    function markieren() {
      var a = Math.min(Math.round(spur.scrollLeft / schritt()), seiten() - 1);
      punkte.querySelectorAll("span").forEach(function (p, i) { p.classList.toggle("on", i === a); });
    }

    k.querySelector(".k-prev").addEventListener("click", function () { pause = true; gehe(aktuell() - 1); });
    k.querySelector(".k-next").addEventListener("click", function () { pause = true; gehe(aktuell() + 1); });
    spur.addEventListener("scroll", function () { window.requestAnimationFrame(markieren); });
    spur.addEventListener("pointerdown", function () { pause = true; });
    k.addEventListener("mouseenter", function () { pause = true; });
    k.addEventListener("mouseleave", function () { pause = false; });
    spur.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { pause = true; gehe(aktuell() + 1); e.preventDefault(); }
      if (e.key === "ArrowLeft") { pause = true; gehe(aktuell() - 1); e.preventDefault(); }
    });
    window.addEventListener("resize", punkteBauen);

    punkteBauen();
    if (!ruhig && auto) timer = setInterval(function () { if (!pause && !document.hidden) gehe(aktuell() + 1); }, 6000);
  });
})();
