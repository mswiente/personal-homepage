# Backlog

Konventionen: siehe [Dokumentations-Standard](https://github.com/mswiente/coding-standards/blob/main/standards/documentation.md#backlog). Neueste Einträge oben, Erledigtes wird gelöscht.

## Jetzt

- [ ] Platzhalter in `content/` ersetzen: Einleitung, /now, E-Mail und Profile, Impressum-Adresse, Datenschutz prüfen (`grep -r TODO content`) → SPEC-0001
- [ ] GitHub-Repo anlegen, Pages-Quelle auf „GitHub Actions“ stellen, Custom Domain `mswientek.de` eintragen, HTTPS erzwingen → ADR-0002
- [ ] DNS für `mswientek.de`: A/AAAA-Records auf GitHub Pages, `www` als CNAME, TXT-Record zur Domain-Verifizierung → ADR-0002
- [ ] 301-Weiterleitung `mswientek.com` → `https://mswientek.de` beim Domain-Anbieter einrichten → ADR-0002

## Später

- [ ] Platzhalter-Beiträge (`placeholder: true`) löschen, sobald es echte Beiträge gibt → SPEC-0001
- [ ] Favicon und Standard-Open-Graph-Bild für Seiten ohne Coverbild

## Ideen

- Archivseite nach Jahren
- Webmentions oder Kommentare über ein Fediverse-Konto
