---
name: dos-window
description: Aplica o design system DOS Window (interface de app DOS em modo texto, paleta EGA de 16 cores, fonte bitmap IBM VGA, janelas com borda dupla e sombra dura, menubar e status bar) ao criar ou revisar páginas web, landing pages, sites retrô e protótipos HTML. Use quando o usuário pedir "DOS Window", visual DOS/EGA/Turbo Vision/Norton, ou um site no estilo de monkeyisland.pages.dev.
metadata:
  version: "1.1.1"
---

# DOS Window

Design system de interface DOS em modo texto (linha Turbo Vision / Norton): 16 cores EGA, fonte IBM VGA 9x16 esticada 4:3, janelas com borda dupla branca e título sobre a borda, sombras duras sem blur, cantos quadrados, barra de menu no topo e barra de atalhos no rodapé. Dois temas: `ega` (padrão) e `dark` (terminal escuro).

## Arquivos desta skill

- `assets/dos-window.css` — UM arquivo com tudo: `@font-face`, tokens dos dois temas e os componentes `.dw-*`.
- `assets/fonts/ibm-vga-4x3.woff2` + `FONT-LICENSE.txt` — fonte (CC BY-SA 4.0).
- `assets/dos-select.js` — lista DOS para seletores com `data-dw-select` e fallback nativo.
- `assets/template.html` — esqueleto de página pronto.
- `assets/tokens.json` — tokens em JSON (para ferramentas / Tailwind / apps nativos).
- `references/brand.md` — o guia completo: tom, fundamentos visuais, layout, temas, acessibilidade. Leia antes de desenhar algo novo.
- `references/components.md` — os 13 componentes com regras de uso e HTML de referência. Leia antes de montar a página.

## Como aplicar num projeto

1. Copie `assets/dos-window.css` e a pasta `assets/fonts/` para a pasta de estáticos do projeto (mantendo `fonts/` ao lado do CSS, ou ajuste a `url()` do `@font-face`).
2. Carregue o CSS e ponha `data-theme="ega"` (ou `"dark"`) no `<html>`.
3. Parta de `assets/template.html`: `body.dw-desk.dw-app` > `nav.dw-menubar` + `main.dw-view` + `footer.dw-status`.
4. Monte o conteúdo com os componentes de `references/components.md`. Não invente classes novas quando um componente existe.
5. Em interfaces com seletores, inclua `dos-select.js` com `defer` e marque os campos de seleção única com `data-dw-select`. Confira a lista **aberta**. Para campos inseridos depois, chame `enhanceDosSelect(select)`.

Em frameworks (React, Svelte, Astro…) importe o mesmo CSS global e use as mesmas classes; em Tailwind, mapeie `assets/tokens.json` para `theme.extend.colors` em vez de copiar hex.

## Regras que não se quebram

- **Cor:** só tokens (`var(--win)`, `var(--heading)`, `var(--meta)`, `var(--btn)`…). Nunca hex solto, nunca cores fora da paleta EGA no tema `ega`.
- **Tipo:** só `var(--font-vga)`, dois tamanhos (16px texto, 32px títulos via `.dw-h2`), peso 400. Hierarquia por cor: amarelo = título/rótulo, ciano = meta, branco = texto. Sem negrito, sem itálico.
- **Forma:** cantos quadrados (raio 0). Sombras duras deslocadas para direita/baixo (`--shadow-win`, `--shadow-btn`), nunca blur. Sem gradientes (exceto os pontos do desktop), sem glassmorphism, sem emoji.
- **Janelas:** todo bloco de conteúdo é uma `.dw-win` (azul) / `.grey` (diálogos, mídia) / `.teal` (listas) com `.dw-win-title` sobre a borda. Deixe ≥16px entre janelas para a sombra.
- **Interação:** seleção = inversão (preto/branco + ► amarelo); hover só muda a cor do texto; botão pressionado afunda 4×3px; foco = contorno amarelo 2px.
- **Texto:** tom de manual de software dos anos 90, curto e factual. Rótulos com letra de atalho `<span class="dw-k">`; seções em MAIÚSCULAS; diálogos fecham com OK; arquivos têm cara de arquivo (`README.TXT`).
- **Ícones:** glifos CP437 (► ◄ ▲ ▼ ■ • √ [■]), não bibliotecas de ícones.
- **Mídia:** quadros 4:3 (`.dw-screen`, `.dw-thumb`); pixel art com `image-rendering: pixelated`.
- **Acessibilidade:** elementos nativos (`button`, `a`, `select`, `input`), `aria-pressed`/`aria-current` para estado, `aria-label` em botões só de glifo. Todo atalho exibido na StatusBar precisa existir no teclado.
- **Responsivo:** abaixo de ~700px as janelas empilham em uma coluna e itens `.dw-opt` da StatusBar somem.

## Ao revisar uma página existente

Converta a estrutura, não só as cores: cabeçalho → MenuBar, hero → janela azul com `.dw-h2`, cards → grade de `.dw-win`, listas de navegação → List em janela teal, galeria/vídeo → ScreenFrame, rodapé → StatusBar. Remova animações decorativas, gradientes, raios e sombras suaves. Mantenha o texto original.

## Revisão antes de entregar

- Use CSS, fonte e script da mesma versão desta pasta ao aplicar ou atualizar o tema. Confirme que o final do CSS contém `enhanced select` e `disclosures`.
- Compare as ações normais e primárias no navegador. Ambas usam `.dw-btn`, com sombra, padding e borda iguais. No EGA, a ação normal usa `--btn` (EGA‑2). A principal usa `.is-hot` (EGA‑10), e um toggle ligado usa `aria-pressed="true"`. Em formulários, Atualizar catálogo é normal e Salvar é primária.
- Abra as listas com mouse/toque e teclado. Confira seleção em vídeo inverso com ► amarelo, setas, Enter, Escape, foco de retorno e preservação do valor no formulário. Em telas estreitas, confirme que a lista cabe ou rola localmente.
- Valide texto nas janelas, contraste nos estados, navegação e controles sem transbordo em desktop e celular. Se mostrar atalhos no rodapé, execute cada um. Para conteúdo Markdown, preserve a semântica e marque títulos e ênfases com os tokens de cor da superfície.
