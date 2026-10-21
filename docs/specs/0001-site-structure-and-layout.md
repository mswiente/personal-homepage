---
status: draft
created: 2026-10-21
updated: 2026-10-21
related: [ADR-0001, ADR-0002]
---

# SPEC-0001: Seitenstruktur und Layout

## Kontext
Persönliche Website von Martin Swientek mit Blog, /now-Seite und Kontakt, gebaut mit Hugo (ADR-0001), erreichbar unter `https://mswientek.de` (ADR-0002).

## Ziel und Abgrenzung
Ziel: eine schnelle, gut lesbare Seite, auf der Blogbeiträge als Karten präsentiert werden und die ohne Wartungsaufwand läuft.

Nicht dazu gehören: Kommentare, Newsletter-Versand, Analytics, Login, Kontaktformular, Mehrsprachigkeit.

## Anforderungen
- **R1 Sprache:** Alle Inhalte und Bedienelemente sind auf Englisch (`locale = "en"`).
- **R2 Seiten:** `/` (Startseite), `/blog/` (alle Beiträge), `/blog/<slug>/` (Beitrag), `/tags/` und `/tags/<tag>/`, `/now/`, `/contact/`, `/search/`, `/impressum/` (Legal notice), `/privacy/`, `/index.xml` (RSS), `/sitemap.xml`, 404-Seite.
- **R3 Kartenraster:** Startseite, `/blog/` und Tag-Seiten zeigen Beiträge als Karten in einem Raster, neueste zuerst, 12 pro Seite mit Paginierung. Spaltenzahl passt sich der Breite an (bis 4 Spalten bei voller Breite, 1 Spalte auf dem Handy). Eine Karte zeigt: Coverbild (falls vorhanden, 16:10 zugeschnitten), den ersten Tag als Label, Titel, Zusammenfassung (höchstens 220 Zeichen), Fußzeile mit „Read more“ und Datum. Die ganze Karte ist ein Link. Gibt es keine veröffentlichten Beiträge, steht dort „No posts yet.“
- **R4 Hervorgehobene Beiträge:** Bei `featured: true` und vorhandenem Coverbild füllt das Bild die ganze Karte, Tag, Titel und Fußzeile liegen auf einem dunklen Verlauf; die Zusammenfassung entfällt.
- **R5 Beiträge:** Page Bundle `content/blog/<slug>/index.md` mit `title`, `date`, `tags`, `summary`, optional `featured`, `cover` (Dateiname, sonst `cover.*`) und `coverAlt`. Die Beitragsseite zeigt Tags, Titel, Datum, Lesezeit, Coverbild, Inhalt und Links zum neueren/älteren Beitrag.
- **R6 Startseite:** Kurzer Einleitungstext (`content/_index.md`) über dem Kartenraster.
- **R7 Darstellung:** Header mit Name (Link zur Startseite), Navigation Blog / Now / Contact und Such-Icon; Footer mit Copyright, Legal notice, Privacy, RSS. Hell- und Dunkelmodus folgen der Systemeinstellung. Lesbreite für Text ca. 42rem.
- **R8 /now:** Die Seite zeigt „Last updated“ aus dem Front-Matter-Feld `updated`.
- **R9 Kontakt:** E-Mail-Adresse als `mailto:`-Link und Links zu Profilen; kein Formular.
- **R10 Suche:** Clientseitige Suche über einen JSON-Index (`/index.json`) mit Titel, Zusammenfassung und Tags aller Beiträge; alle Suchbegriffe müssen vorkommen. Treffer erscheinen als Karten. `?q=` füllt das Suchfeld vor.
- **R11 Datenschutz:** Keine Cookies, kein Tracking, keine Ressourcen von Drittanbietern.
- **R12 Bilder:** Coverbilder werden von Hugo zugeschnitten und als WebP ausgeliefert (Karte 720×450, Beitrag 1600×800, Open-Graph 1200×630).
- **R13 Metadaten:** Jede Seite hat Title, Description, Canonical-Link, Open-Graph-Tags und einen Verweis auf den RSS-Feed.

## Entwurf
- Templates in `layouts/` (neues Hugo-Template-System): `baseof.html`, `home.html`, `section.html`, `term.html`, `taxonomy.html`, `page.html`, `blog/page.html`, `search.html`, `home.json`, `404.html`; Partials in `layouts/_partials/` (`head`, `header`, `footer`, `card`, `card-grid`, `cover`).
- Styles in `assets/css/main.css` mit CSS-Variablen als Design-Tokens; Akzentfarbe Petrol (`#0f766e`, dunkel `#2dd4bf`).
- Suche in `assets/js/search.js`, gebaut mit `js.Build`, ohne Bibliothek.

## Akzeptanzkriterien
- `hugo --gc --minify` baut ohne Fehler und Warnungen.
- Startseite zeigt Karten in 4 Spalten bei 1440px und in 1 Spalte bei 390px Breite, ohne horizontales Scrollen.
- Ein Beitrag ohne Coverbild erscheint als Karte ohne Bild; ein Beitrag mit `featured: true` als Vollbild-Karte.
- Hell- und Dunkelmodus sind lesbar.
- Die Suche nach mehreren Begriffen liefert nur Beiträge, die alle Begriffe enthalten.

## Offene Fragen
- Einleitungstext, E-Mail-Adresse, Profile und Impressumsangaben stehen noch als Platzhalter in `content/` (mit `TODO` markiert).

## Geplant
- Platzhalter-Beiträge (Front Matter `placeholder: true`, `draft: true`) durch echte Beiträge ersetzen; lokal sichtbar mit `hugo server -D` → Backlog.
