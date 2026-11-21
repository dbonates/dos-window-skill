# Changelog

## 1.1.1 — 2026-11-21

- Removidas do CSS regras de outro projeto (`#wiki-search-form`, `.wiki-search-row`).
- Estilos do seletor no tema não dependem mais de `.dw-app`: funcionam dentro de `.dw`, `.dw-desk` ou `.dw-app`.
- `dos-select.js` fecha a lista quando a página rola ou a janela muda de tamanho (a lista é posicionada só ao abrir).
- `install.sh` fica na raiz do repositório e instala a pasta `dos-window/`.
- Repositório com README ilustrado, galeria viva (`examples/gallery.html`) e licenças.

## 1.1.0

- Seletor no tema: `select[data-dw-select]` + `dos-select.js` (popover teal, teclado completo, fallback nativo).
- Disclosure: `details`/`summary` dentro de janelas, com ► e ▼.
- Reset de botões com `:where()` (especificidade zero).
- Regras de botão normal (EGA‑2) vs. primário (`.is-hot`, EGA‑10).
- Checklist de revisão antes de entregar; orientações para Markdown e busca.
- Backups do instalador em `skill-backups/`, fora da pasta `skills/`.

## 1.0.0

- Primeira versão: tokens EGA e tema escuro, fonte IBM VGA 4:3, 13 componentes, skill para Claude Code e Codex.
