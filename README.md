# melle.com.de — statische Website

Nachbau der Melle-Solutions-Startseite als **statische Seite** (reines HTML/CSS, kein WordPress,
keine Datenbank). Gedacht für **GitHub Pages**: gratis gehostet, nichts zu patchen, nichts zu hacken.

## Struktur

```
index.html            ← die Startseite (Inhalt + Struktur)
css/style.css         ← das Aussehen (Corporate Design)
js/form.js            ← verschickt das Kontaktformular
assets/               ← Logos, Fotos, Bilder
CNAME                 ← deine Domain (www.melle.com.de) für GitHub Pages
.nojekyll             ← sagt GitHub: Dateien 1:1 ausliefern
server/formular.php   ← Formular-Endpunkt für go.melle.com.de (NICHT nach GitHub, sondern auf Strato)
```

> **Wichtig:** Der Ordner `server/` gehört **nicht** ins GitHub-Repo der Website, sondern auf
> `go.melle.com.de`. Siehe `server/README-deploy.md`.

## Wie ändere ich Inhalte?

- **Text ändern:** in `index.html` den entsprechenden Text bearbeiten (oder Mario sagt Claude/Sebastian, was sich ändern soll).
- **Aussehen ändern:** in `css/style.css`.
- **Bild einfügen:** Datei nach `assets/` legen und in `index.html` mit `<img src="assets/…">` einbinden.
- **Video:** nicht hier ablegen — auf YouTube/Vimeo hochladen und einbetten (hält das Repo klein).

## Veröffentlichen

Siehe `CHECKLISTE-GITHUB.md` — Einrichtung läuft komplett über die GitHub-Weboberfläche, kein lokales Git nötig.
Nach dem ersten Mal gilt: Datei ändern → bei GitHub hochladen/committen → Seite ist in ~1 Minute aktualisiert.

## Stand (13.11.2026)
- Startseite, Geschäftsmodelle, Leadership, Blog-Auswahl, Impressum, Datenschutz als statisches HTML.
- ス-Logo aus dem CD eingebaut (`assets/logo-melle.svg` im Kopf, `assets/logo-melle-white.svg` im Fuß).
- **Bestandsaufnahme aller Subdomains, Seiten, Formulare und Dienste: [`INVENTAR.md`](INVENTAR.md)** — mit Mario entschieden.
- **Jekyll (13.11.2026):** Blog als Markdown in `_posts/` (19 Beiträge, alte Adressen), Übersicht `/posts/`, Feed `/posts/feed.xml`. Anleitung: `BLOG-ANLEITUNG.md`. Statische Seiten (index.html …) ohne Vorspann bleiben unverändert. Vorschau mit Jekyll: Konfiguration „melle-website-jekyll“ (Port 4000).
- Fehlende Seiten nachbauen (vcard, network, lists, KI-Beirat, Termin, Referenzen, AGB, Barcamp, Vermietung, BAFA) – siehe Inventar.
- **Noch nicht umgezogen.** GitHub-Repo kommt unter die neue Organisation, nicht unter `northrider`.
- **Iterationen (ab 13.11.2026):** `iterationen/vergleich.html` zeigt jeden Verbesserungsschritt links im Menü,
  rechts die Seite. Neuen Schritt einfrieren: `iterationen/einfrieren.sh NN-name "Titel" "Was und warum" ["offen"]`.
  Das Skript legt `schritt.json` im Schrittordner an und erneuert `iterationen/schritte.json`; die
  Vergleichsseite liest diese Datei alle 3 Sekunden und ergänzt ihr Menü selbst (neuer Schritt mit „NEU“).
- Archiviert: Leadership und Geschäftsmodelle unter `archiv/20261113-unterseiten-leadership-geschaeftsmodelle/`. Zielrichtung und Feedback: `MEMEX/INBOX/Webseite MS.md`.
- Lokale Vorschau: `python3 -m http.server 8765` in diesem Ordner, dann http://localhost:8765.
