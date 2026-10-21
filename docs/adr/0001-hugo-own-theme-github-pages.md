---
status: accepted
date: 2026-10-21
related: [SPEC-0001, ADR-0002]
---

# ADR-0001: Hugo mit eigenem Theme, Hosting auf GitHub Pages

## Kontext
Die persönliche Homepage soll einen Blog, eine /now-Seite und eine Kontaktseite enthalten. Sie ist rein statisch, hat kaum JavaScript und soll über Jahre mit wenig Pflegeaufwand laufen. Gehostet wird auf GitHub Pages. Die Blog-Übersicht soll aus Karten bestehen (Bild, Kategorie, Titel, Zusammenfassung), angelehnt an Ghost-Themes, aber kein Nachbau.

## Entscheidung
- Static Site Generator ist **Hugo (extended)**. Die Version ist in `mise.toml` festgelegt und wird lokal wie in CI verwendet.
- Das Layout ist ein **eigenes, schlankes Theme** direkt in `layouts/` und `assets/`, ohne externes Theme und ohne Node-Toolchain.
- Deployment per **GitHub Actions** (`.github/workflows/deploy.yml`) auf GitHub Pages bei jedem Push auf `main`.
- Keine Ressourcen von Drittanbietern (Fonts, Skripte, Analytics); Schriften kommen aus dem System-Font-Stack.

## Betrachtete Alternativen
- **Astro:** stark bei interaktiven Komponenten, die hier nicht gebraucht werden; bringt npm-Abhängigkeiten mit, die gepflegt werden müssen.
- **Eleventy:** flexibel, aber ebenfalls Node-basiert; Blog-Funktionen über Plugins.
- **Jekyll:** auf GitHub Pages nativ, aber langsam, Ruby-Toolchain und eingeschränkte Plugins.
- **Hugo + PaperMod:** gutes Blog-Theme, zeigt Beiträge aber als Liste. Ein Karten-Layout wäre ein Override gegen das Theme, der bei jedem Theme-Update gepflegt werden müsste.
- **Hugo + Blowfish:** hat eine Kartenansicht, ist aber Tailwind-basiert, umfangreich und optisch festgelegt.

## Folgen
- Ein Binary, keine Paketabhängigkeiten; Build in unter einer Sekunde.
- Alle Templates und Styles sind im Repo und müssen selbst gepflegt werden; neue Funktionen (z. B. Kommentare) baut niemand für uns.
- Bilder werden von Hugo verarbeitet (Zuschnitt, WebP), deshalb muss die *extended*-Variante verwendet werden.
- Kein Google-Fonts- oder sonstiger Drittanbieter-Aufruf, was die Datenschutzerklärung einfach hält.
