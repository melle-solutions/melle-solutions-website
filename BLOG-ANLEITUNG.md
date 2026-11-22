# Einen neuen Blogbeitrag schreiben

Ein Beitrag ist **eine Datei** im Ordner `_posts/`. GitHub baut daraus beim Hochladen automatisch die
Beitragsseite, die Übersicht unter `/posts/` und den RSS-Feed (`/posts/feed.xml`).

## 1. Datei anlegen
Name: `_posts/JJJJ-MM-TT-kurzer-titel.md` – zum Beispiel `_posts/2026-11-20-ki-im-einkauf.md`.
Die Adresse legt `permalink:` im Vorspann fest, z. B. `www.melle.com.de/ki-im-einkauf/` – ohne diese Zeile entsteht `/2026/11/20/ki-im-einkauf.html`. Uhrzeit nicht in der Zukunft wählen, sonst baut Jekyll den Beitrag noch nicht.

## 2. Oben den Vorspann, darunter der Text
```markdown
---
title: "KI im Einkauf: drei schnelle Gewinne"
date: 2026-11-20 09:00:00 +0100
permalink: "/ki-im-einkauf/"
image: "/assets/blog/ki-im-einkauf/titelbild.jpg"
excerpt: "Ein Satz, der in der Übersicht und bei Google erscheint."
---

Hier beginnt der Text. Ein Absatz ist einfach Text, dazwischen eine Leerzeile.

## Zwischenüberschrift

**fett**, *kursiv*, [Link](https://beispiel.de), Aufzählung mit `- `.
```
- **Titelbild** (optional): Bild nach `assets/blog/<kurzer-titel>/` legen, Pfad bei `image:` eintragen.
  Ohne `image:` zeigt die Übersicht ein Platzhalter-Symbol.
- **Bild im Text**: `![Beschreibung](../../../../../../assets/blog/<kurzer-titel>/bild.jpg)`
- **Video** (Datei auf go.melle.com.de): `<video controls preload="none" src="https://go.melle.com.de/melle-solutions-website-videos/name.mp4"></video>`

## 3. Veröffentlichen
Datei im GitHub-Repo `melle-solutions/melle-solutions-website` hochladen (oder Claude sagen „veröffentliche den
Beitrag“). Nach etwa einer Minute ist er online.

**Bequemer Weg:** Claude den Text diktieren oder schicken – „mach daraus einen Blogbeitrag“ – dann legt Claude
Datei, Bild und Vorspann an.

## Lokal ansehen
In der Claude-App die Vorschau „melle-website-jekyll“ starten → http://localhost:4000/posts/
(Jekyll 4.4 über Homebrew-Ruby; GitHub Pages nutzt eine ältere Jekyll-Version, darum nur Grundfunktionen verwenden).

## Übernommene Beiträge (13.11.2026)
Alle 19 WordPress-Beiträge (2020–2026) liegen in `_posts/` – **unter ihren alten Adressen** (`permalink:` im
Vorspann), damit Google-Treffer und Links weiter funktionieren. Bilder lokal in `assets/blog/`, verkleinert.
Ein Bild im Beitrag „Die meisten Probleme …“ fehlte schon auf der alten Seite (404). Das eingebettete Bunny-Video
im SEO-Bootcamp-Beitrag ist durch das selbst gehostete Lehrvideo ersetzt.
