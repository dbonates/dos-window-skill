# DOS Window

Uma interface web vestida de aplicativo DOS em modo texto, na linha Turbo Vision / Norton: paleta EGA de 16 cores, fonte bitmap IBM VGA, janelas com borda dupla e sombra dura, barra de menu no topo e barra de atalhos no rodapé. Construído a partir do CSS real de [monkeyisland.pages.dev](https://monkeyisland.pages.dev/) (The Paninos off-line), generalizado para qualquer site. Tem dois temas: **EGA (clássico)** e **Terminal escuro**, o modo alternativo do próprio site.

## Como usar

1. Copie `assets/dos-window.css` e `assets/fonts/` para o projeto e carregue `dos-window.css` (tokens, fonte e componentes num arquivo só).
2. Ponha `data-theme="ega"` (ou `"dark"`) no `<html>`.
3. Monte a página com as classes `dw-*`. O esqueleto de sempre:

```html
<body class="dw-desk dw-app">
  <nav class="dw-menubar">
    <button class="dw-menu-btn" aria-current="page"><span class="dw-k">V</span>iewer</button>
    <button class="dw-menu-btn">The <span class="dw-k">w</span>all</button>
    <span class="dw-right">NOME DO SITE · subtítulo</span>
  </nav>
  <main class="dw-view"> … janelas .dw-win … </main>
  <footer class="dw-status">
    <span><span class="dw-k">← →</span> Versão</span>
    <span class="dw-right">8 itens · 13 modos</span>
  </footer>
</body>
```

`--u` escala tudo (padrão 1; o CSS sobe para 2 em telas ≥3200×1700). Todas as medidas são `calc(Npx * var(--u))`.

## Fonte

**IBM VGA 4:3**: a WebPlus IBM VGA 9x16 de VileR (Ultimate Oldschool PC Font Pack, int10h.org), na versão esticada ×1.35 na vertical para simular os pixels 4:3 de um monitor CRT. Arquivo: `assets/fonts/ibm-vga-4x3.woff2` (16 KB), carregado pelo `dos-window.css` como família `"IBM VGA 4:3"` e exposto em `--font-vga`. Cobre CP437 inteiro (►■▼√ e caixas) mais Latin-1, então acentos em português funcionam.

Licença **CC BY-SA 4.0**: ao publicar um site com ela, credite "IBM VGA font by VileR, int10h.org (CC BY-SA 4.0)" no rodapé ou no About, e mantenha a mesma licença se distribuir a fonte modificada.

- Dois tamanhos e só: **16px** para tudo, **32px** para títulos de conteúdo. Line-height 1.35.
- Peso 400 sempre. Nada de negrito ou itálico: ênfase é cor (heading amarelo, meta ciano).
- `-webkit-font-smoothing: none`. Imagens pixel art com `image-rendering: pixelated`.

## Fundamentos de conteúdo

- Tom de manual de software dos anos 90: curto, técnico, factual. Frases nominais ("12-verb text interface", "Standard EGA palette.").
- Rótulos de menu e botões em Title case, com uma **letra de atalho** marcada com `.dw-k` (vermelho sobre cinza, branco dentro de botão): `<span class="dw-k">C</span>ompare`. Todo atalho exibido precisa funcionar no teclado.
- Cabeçalhos de seção em MAIÚSCULAS 16px (`.dw-h3`). Arquivos de texto têm cara de arquivo: `README.TXT`.
- Diálogos fecham com **OK**. Confirmações e status vão na barra de rodapé, não em modais.
- Glifos CP437 no lugar de ícones: ► ◄ ▲ ▼ ■ • · ←→ ↑↓ e `[■]` para fechar.
- Sem emoji, sem ilustração vetorial moderna.

## Fundamentos visuais

- **Cor:** só as 16 cores EGA (`ega-0`…`ega-15`). Use sempre os tokens semânticos (`win`, `bar`, `heading`, `meta`, `btn`…) e nunca hex solto. Cada superfície tem a sua tinta: `ink` sobre `win` azul, `ink-on-light` sobre cinza/teal/verde.
- **Desktop:** `desk` azul com uma grade de pontos `desk-dot` de 1px a cada 4px (classe `.dw-desk`).
- **Janelas:** borda `double` de `stroke-window` (6px) em `win-border` branco, título centralizado *sobre* a borda superior (`.dw-win-title`), `[■]` à esquerda. Três fundos: azul (`.dw-win`), cinza (`.grey`, diálogos e molduras), teal (`.teal`, listas).
- **Sombra:** sempre dura, sem blur, para a direita e para baixo: `shadow-win` 14×12 em janelas, `shadow-btn` 8×6 em botões, `shadow-chip` 4×3 em alças. No tema escuro todas viram `none`.
- **Cantos:** quadrados. `radius-none` é o único raio.
- **Inversão = seleção:** item selecionado vira preto com texto branco (`select-bg`/`select-ink`) e ganha ► amarelo. Hover só clareia o texto.
- **Botão pressionado** desce 4×3px e a sombra encolhe junto (`:active`).
- **Foco:** contorno amarelo de 2px com offset de 2px (`focus`).
- **Mídia:** sempre em quadro 4:3 (`.dw-screen`, `.dw-thumb`) com borda `frame` de 2px, legenda magenta (`.dw-cap`) em cima.
- **Gradientes, blur, transparência decorativa:** não. O único gradiente é o padrão de pontos do desktop.

## Layout

- Grade fixa: barra de menu (auto) / desktop (1fr) / barra de status (auto), página sem rolagem no desktop; cada janela rola por dentro (`.dw-scroll`).
- Gap entre janelas `space-6` (16px), ×1.85 na horizontal; padding de janela `space-5`/`space-4`; botões afastados por `space-7` para a sombra respirar.
- Abaixo de ~700px as janelas empilham em uma coluna, a página passa a rolar e itens da barra de status marcados `.dw-opt` somem.

## Temas

| | EGA (clássico) | Terminal escuro |
|---|---|---|
| Fundo | azul EGA com pontos | `#0c0c0c` liso |
| Janela | borda dupla branca, título sobre a borda | borda 2px `#303030`, faixa de título cinza à esquerda |
| Botão | bloco verde com sombra | texto entre `[ ]`, ligado em azul `#005faf` |
| Sombra | dura, 82% preto | nenhuma |
| Acento | amarelo / ciano | azul `#5fafff` |

As diferenças de estrutura estão em `[data-theme="dark"]` no `dos-window.css`; as de cor, nos tokens.

## Acessibilidade

- Pares principais passam 4.5:1 (branco sobre azul 8.6:1, preto sobre cinza 9.0:1, preto sobre verde 6.6:1, amarelo e ciano sobre azul).
- Exceção herdada do original: hotkey `ega-4` vermelho sobre cinza fica em ≈2.9:1. Ele só marca uma letra dentro de um rótulo legível; nunca use vermelho para texto inteiro.
- Use `<button>`, `<a href>`, `<select>`, `<input type="range">` reais; `aria-pressed` / `aria-current` para estado; `aria-label` em botões só de glifo (◄ ►).

## Componentes

Desk, MenuBar, StatusBar, Window, Button, List, ScreenFrame, InfoPanel, Field, Dropdown, Timeline, Dialog e Console: cada um com guia e HTML de referência em `references/components.md`. São só CSS.

## Créditos

Linguagem visual de *The Secret of Monkey Island: all 13 versions side by side*, por The Paninos off-line. Fonte IBM VGA por VileR (int10h.org), CC BY-SA 4.0. Este sistema não inclui marcas, logos nem imagens de jogos: só a linguagem de interface.
