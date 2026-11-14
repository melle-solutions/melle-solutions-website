// Handy-Menü: Burger-Knopf öffnet/schließt das Menü; ein Klick auf einen Eintrag schließt es wieder.
(function () {
  var knopf = document.querySelector(".burger"), menue = document.getElementById("hauptmenue");
  if (!knopf || !menue) return;
  function setzen(auf) { menue.classList.toggle("offen", auf); knopf.setAttribute("aria-expanded", auf); knopf.setAttribute("aria-label", auf ? "Menü schließen" : "Menü öffnen"); }
  knopf.addEventListener("click", function () { setzen(!menue.classList.contains("offen")); });
  menue.addEventListener("click", function (e) { if (e.target.closest("a")) setzen(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setzen(false); });
})();

// Aufklapp-Menü „Leistungen“: Klick/Tippen öffnet und schließt, Klick daneben oder Escape schließt.
(function () {
  document.querySelectorAll(".menu-gruppe").forEach(function (gruppe) {
    var knopf = gruppe.querySelector(".menu-auf");
    function setzen(auf) { gruppe.classList.toggle("offen", auf); knopf.setAttribute("aria-expanded", auf); }
    knopf.addEventListener("click", function (e) { e.stopPropagation(); setzen(!gruppe.classList.contains("offen")); });
    document.addEventListener("click", function (e) { if (!gruppe.contains(e.target)) setzen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setzen(false); } });
  });
})();
