# Cursor — projectdocs toevoegen
## Methode 1 — Project Rules
Plaats regels in `.cursor/rules/*.md`. Cursor voegt ze automatisch toe aan de context.

## Methode 2 — @Docs
- Maak een publieke URL (bijv. GitHub Gist) voor extra Markdown.
- In Cursor: `@Docs` → Add New Doc → plak URL → naam geven → indexeren.
- Daarna in prompts verwijzen met `@<docnaam>`.

## Methode 3 — Indexing & Symbols
Via Settings → Indexing & Docs beheer je docsets en kun je ze @refereren.
