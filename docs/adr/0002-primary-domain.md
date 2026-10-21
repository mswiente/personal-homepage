---
status: accepted
date: 2026-10-21
related: [ADR-0001, SPEC-0001]
---

# ADR-0002: mswientek.de als Hauptdomain

## Kontext
Es gibt zwei Domains, `mswientek.de` und `mswientek.com`. GitHub Pages bedient pro Repository nur eine Custom Domain. Die Seite ist auf Englisch.

## Entscheidung
- `mswientek.de` ist die kanonische Domain (`baseURL` in `hugo.toml`, Custom Domain in GitHub Pages, HTTPS erzwungen).
- `www.mswientek.de` zeigt per CNAME auf `<user>.github.io`; GitHub leitet es auf die Apex-Domain um.
- `mswientek.com` (mit und ohne `www`) leitet per HTTP 301 auf `https://mswientek.de` weiter, über die Weiterleitungsfunktion des Domain-Anbieters.
- Die Domain wird im GitHub-Account verifiziert (TXT-Record), um eine Übernahme durch Dritte zu verhindern.

## Betrachtete Alternativen
- **`mswientek.com` als Hauptdomain:** passt besser zu einer englischsprachigen Seite, `.de` wurde aber bewusst gewählt.
- **Zweites Repo nur für die Weiterleitung:** funktioniert ohne Anbieterfunktion, ist aber ein weiteres Repo zu pflegen und leitet nur per Meta-Refresh weiter, nicht per 301.

## Folgen
- Für die `.com`-Domain hängt die Weiterleitung vom Domain-Anbieter ab; wenn er kein HTTPS für Weiterleitungen anbietet, funktioniert `https://mswientek.com` nicht.
- Alle Links und Feeds verwenden `https://mswientek.de/`.
