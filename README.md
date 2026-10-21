# mswientek.de

Personal website and blog of Martin Swientek, built with [Hugo](https://gohugo.io) and hosted on GitHub Pages.

## Development

Hugo (extended) is pinned in `mise.toml`; CI uses the same version.

```sh
mise install          # installs the pinned Hugo version
mise exec -- hugo server   # local preview on http://localhost:1313 (add -D to include drafts)
mise exec -- hugo --gc --minify   # production build into public/
```

## Writing a post

Each post is a page bundle:

```
content/blog/my-post/
  index.md      front matter: title, date, tags, summary; optional featured: true
  cover.jpg     optional cover image (any name matching cover.*, or set `cover:` in front matter)
```

The first tag is shown as the label on the card. `featured: true` shows the cover image across the whole card.

## Layout

The theme lives directly in `layouts/` and `assets/`, without an external theme:

- `layouts/baseof.html`, `_partials/`: page frame, header, footer, card
- `layouts/home.html`, `section.html`, `term.html`: card grids
- `layouts/blog/page.html`: blog post; `layouts/page.html`: plain pages (Now, Contact, …)
- `layouts/search.html`, `home.json`, `assets/js/search.js`: client-side search
- `assets/css/main.css`: all styles

## Documentation

Specs, decisions and backlog are in [`docs/`](docs/README.md).
