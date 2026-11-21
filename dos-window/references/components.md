# DOS Window — componentes

Cada componente tem um guia e HTML de referência. O CSS base é `assets/dos-window.css`. Para listas de seleção abertas no tema, use também `assets/dos-select.js`.

## Desk

A moldura da página inteira: barra de menu em cima, desktop azul pontilhado no meio, barra de status embaixo.

- `body` (ou um wrapper) recebe `dw-desk dw-app`. O grid é `auto / 1fr / auto`.
- O conteúdo vai em `main.dw-view`, que define gaps e paddings; monte as colunas com `grid-template-columns` próprio de cada página.
- Desktop largo: a página não rola, cada janela rola por dentro com `.dw-scroll`. Abaixo de ~700px empilhe as janelas em uma coluna e deixe a página rolar.
- O consumidor fornece: itens de menu, conteúdo das janelas, atalhos da barra de status.

```html
<div class="dw-desk dw-app">
  <nav class="dw-menubar" aria-label="Main">
    <span aria-hidden="true">≡</span>
    <button class="dw-menu-btn" aria-current="page"><span class="dw-k">V</span>iewer</button>
    <button class="dw-menu-btn">The <span class="dw-k">w</span>all</button>
    <button class="dw-menu-btn"><span class="dw-k">O</span>ptions</button>
    <span class="dw-right">SITE NAME · subtitle</span>
    <button class="dw-menu-btn"><span class="dw-k">A</span>bout</button>
  </nav>
  <main class="dw-view" style="grid-template-columns: 200px 1fr; padding-top: 24px">
    <section class="dw-win teal" aria-labelledby="d1"><h2 class="dw-win-title" id="d1">Index</h2>
      <div class="dw-list"><button class="dw-list-item" aria-pressed="true">First item</button><button class="dw-list-item">Second item</button></div>
    </section>
    <section class="dw-win" aria-labelledby="d2"><h2 class="dw-win-title" id="d2">Info</h2><span class="dw-win-close">[<b>■</b>]</span>
      <p class="dw-meta" style="margin:0">October 1990 · desk with windows</p>
    </section>
  </main>
  <footer class="dw-status">
    <span><span class="dw-k">← →</span> Item</span>
    <span class="dw-opt"><span class="dw-k">C</span> Compare</span>
    <span class="dw-right">3 sections · 12 items</span>
  </footer>
</div>
```

## MenuBar

Barra cinza fixa no topo com as views do site, cada uma com uma letra de atalho em vermelho.

- `nav.dw-menubar` > `button.dw-menu-btn`. A view atual leva `aria-current="page"` (fundo verde `menu-on`); um menu aberto leva `aria-expanded="true"` (invertido, hotkey `hotkey-inverse`).
- Marque a letra de atalho com `<span class="dw-k">`; o atalho Alt+letra deve existir de verdade.
- `.dw-right` empurra o título do site para a direita (com reticências se faltar espaço). No celular esconda os itens de view e mostre só ≡.

```html
<div class="dw">
  <nav class="dw-menubar" aria-label="Main">
    <span aria-hidden="true">≡</span>
    <button class="dw-menu-btn" aria-current="page"><span class="dw-k">V</span>iewer</button>
    <button class="dw-menu-btn">The <span class="dw-k">w</span>all</button>
    <button class="dw-menu-btn" aria-expanded="true">V<span class="dw-k">e</span>rsions</button>
    <button class="dw-menu-btn">CRT l<span class="dw-k">a</span>b</button>
    <button class="dw-menu-btn"><span class="dw-k">T</span>heme</button>
    <span class="dw-right">SITE NAME · 13 versions, side by side</span>
    <button class="dw-menu-btn">A<span class="dw-k">b</span>out</button>
  </nav>
</div>
```

## StatusBar

Barra cinza no rodapé que lista os atalhos de teclado da view atual e, à direita, um resumo em números.

- `footer.dw-status`; cada atalho é `<span><span class="dw-k">TECLA</span> Ação</span>`.
- Atalhos menos importantes levam `.dw-opt` e somem em telas estreitas.
- `.dw-right` guarda contagens ("8 editions · 13 modes") ou uma dica (`.dw-hint`, em vermelho) após uma ação, como "Link copied".

```html
<div class="dw">
  <footer class="dw-status">
    <span><span class="dw-k">← →</span> Version</span>
    <span><span class="dw-k">↑ ↓</span> Scene</span>
    <span><span class="dw-k">C</span> Compare</span>
    <span class="dw-opt"><span class="dw-k">Z</span> Zoom</span>
    <span class="dw-opt"><span class="dw-k">R</span> CRT</span>
    <span class="dw-right">8 editions · 13 modes · 12 scenes</span>
  </footer>
</div>
```

## Window

A unidade de layout: caixa com borda dupla branca de 6px, título centralizado sobre a borda superior e sombra dura para a direita/baixo.

- `section.dw-win` com `h2.dw-win-title` (o fundo do título herda o da janela e "corta" a borda). Botão de fechar opcional: `<button class="dw-win-close" aria-label="Close">[<b>■</b>]</button>`.
- Variantes: padrão azul (conteúdo, info), `.grey` (diálogos, README, moldura de imagem com `.screenwin`), `.teal` (listas de navegação).
- Deixe pelo menos 16px entre janelas e 14×12px livres à direita/baixo para a sombra.
- Conteúdo longo rola dentro de um `.dw-scroll` com altura definida, não a página.
- No tema escuro a borda vira 2px sólida e o título vira uma faixa cinza alinhada à esquerda, sem mudar o HTML.

```html
<div class="dw-desk" style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px;padding:28px 40px 34px 24px">
  <section class="dw-win" aria-labelledby="w1">
    <h2 class="dw-win-title" id="w1">Version info</h2>
    <span class="dw-win-close">[<b>■</b>]</span>
    <p class="dw-meta" style="margin:0">Blue · default window</p>
    <p class="dw-p" style="margin-top:6px">Body text in white on EGA blue.</p>
  </section>
  <section class="dw-win grey" aria-labelledby="w2">
    <h2 class="dw-win-title" id="w2">README.TXT</h2>
    <span class="dw-win-close">[<b>■</b>]</span>
    <p class="dw-p">Grey · dialogs, files, frames around media.</p>
  </section>
  <section class="dw-win teal" aria-labelledby="w3">
    <h2 class="dw-win-title" id="w3">Scenes</h2>
    <p class="dw-p">Teal · navigation lists.</p>
  </section>
</div>
```

## Button

Bloco verde com texto preto e sombra preta sólida; ao clicar ele "afunda" 4×3px.

- `button.dw-btn`. Agrupe em `.dw-btns` (gap 18px para a sombra não colidir).
- No EGA, `.dw-btn` usa EGA‑2 e `.dw-btn.is-hot` usa EGA‑10. Use a primeira para ações como Atualizar e a segunda para ações principais como Salvar.
- Toggle/segmentado (zoom 1x/2x/4x, CRT on/off): `aria-pressed="true"` deixa verde-claro. Ação principal de um diálogo (OK): `.is-hot`.
- Hotkey opcional com `.dw-k` (branco no botão em repouso, vermelho quando ligado).
- Hover muda só a cor do texto para branco; nada de mudar o fundo.
- Funciona melhor sobre janela cinza; sobre azul, prefira poucos botões.
- Tema escuro: o bloco some e o rótulo fica entre `[ ]`; ligado vira faixa azul.

```html
<div class="dw-win grey" style="margin:22px 34px 30px 20px;box-shadow:none">
  <div class="dw-btns">
    <button class="dw-btn"><span class="dw-k">C</span>ompare</button>
    <button class="dw-btn">Copy <span class="dw-k">l</span>ink</button>
    <button class="dw-btn" aria-pressed="true">1x</button>
    <button class="dw-btn">2x</button>
    <button class="dw-btn is-hot">OK</button>
    <button class="dw-btn" disabled>Reset all</button>
  </div>
</div>
```

## List

Lista de navegação de uma escolha: o item atual fica invertido (preto, texto branco) com ► amarelo à esquerda.

- `.dw-list` > `button.dw-list-item`; o atual leva `aria-pressed="true"` (ou `aria-current="true"`).
- Vive dentro de uma `.dw-win.teal`. Itens longos quebram em duas linhas; não trunque.
- Navegue com ↑ ↓ e anuncie o atalho na StatusBar.
- No celular, transforme em grid `repeat(auto-fill, minmax(150px, 1fr))`.

```html
<div class="dw-desk" style="padding:26px 40px 30px 24px">
  <section class="dw-win teal" aria-labelledby="l1" style="width:240px">
    <h2 class="dw-win-title" id="l1">Scenes</h2>
    <div class="dw-list">
      <button class="dw-list-item">Opening logo</button>
      <button class="dw-list-item" aria-pressed="true">Title screen</button>
      <button class="dw-list-item">The lookout</button>
      <button class="dw-list-item">The docks</button>
      <button class="dw-list-item">Bar, inside</button>
    </div>
  </section>
</div>
```

## ScreenFrame

Moldura para imagem ou vídeo em 4:3: legenda magenta em cima, tela preta com filetes de 2px e barra de botões cinza embaixo.

- `section.dw-win.screenwin` > `.dw-cap` + `.dw-screen` (com `<img class="px">` ou `<canvas>`) + `.dw-foot`.
- A legenda pode carregar etiquetas `.dw-tag` (A amarelo) e `.dw-tag.b` (B rosa) para comparações.
- Pixel art sempre com `image-rendering: pixelated` e escala inteira (1x, 2x, 4x).
- Use `aspect-ratio: 8 / 3` na `.dw-screen` para duas imagens lado a lado.
- O consumidor fornece a mídia e o `alt`.

```html
<div class="dw-desk" style="padding:24px 40px 30px 24px">
  <section class="dw-win screenwin" aria-label="Screen" style="width:400px">
    <div class="dw-cap"><span aria-hidden="true">▪</span><span><span class="dw-tag">A</span> PC 16-color · EGA</span><span aria-hidden="true">▼ ▲</span></div>
    <div class="dw-screen"><div class="ph">[ 320×200 image, pixelated ]</div></div>
    <div class="dw-foot">
      <div class="dw-btns"><button class="dw-btn"><span class="dw-k">C</span>ompare</button><button class="dw-btn">Copy <span class="dw-k">l</span>ink</button></div>
      <div class="dw-btns" style="column-gap:12px"><span>Zoom</span><button class="dw-btn" aria-pressed="true">1x</button><button class="dw-btn">2x</button></div>
    </div>
  </section>
</div>
```

## InfoPanel

Tipografia de conteúdo dentro de uma janela azul: meta em ciano, título de 32px em amarelo, filete ciano, lista com ■ e lista de definições.

- `.dw-meta` (datas, specs), `.dw-h2` (o único texto grande), `hr.dw-rule`, `ul.dw-notes`, `dl.dw-dl`, `.dw-h3` para seções em MAIÚSCULAS, `.dw-p` para parágrafos (máx. 90ch).
- Hierarquia por cor, nunca por peso: amarelo = título/rótulo, ciano = meta, branco = texto.
- Em janela cinza, `dt` passa a azul automaticamente.

```html
<div class="dw-desk" style="padding:24px 40px 30px 24px">
  <section class="dw-win" aria-labelledby="i1" style="width:420px">
    <h2 class="dw-win-title" id="i1">Version info</h2>
    <span class="dw-win-close">[<b>■</b>]</span>
    <p class="dw-meta" style="margin:0">October 1990 · 12-verb text interface</p>
    <h3 class="dw-h2">PC Floppy Disk: 16-Color Version</h3>
    <p class="dw-meta">EGA / VGA / Tandy · 320×200 · 16 colors</p>
    <hr class="dw-rule">
    <ul class="dw-notes">
      <li>Standard EGA palette.</li>
      <li>The baseline artwork for every later port.</li>
    </ul>
    <dl class="dw-dl">
      <dt>Output</dt><dd>1600×1200 per screen</dd>
      <dt>Scaling</dt><dd>Nearest neighbour, 4:3</dd>
    </dl>
  </section>
</div>
```

## Field

Controles nativos vestidos de DOS: select teal com ▼ desenhado, range com trilho teal e alça amarela quadrada com sombra.

- Para um seletor que abre no tema, associe `label for` a um `select` de seleção única com `id` e `data-dw-select`. Carregue `dos-select.js` com `defer`. O script usa um popover teal, preserva o select original para formulários e mantém o fallback nativo onde Popover não existe. Ao inserir o campo dinamicamente, chame `enhanceDosSelect(select)`; após alterar só `.value` por código, dispare `change` para atualizar o rótulo.
- A classe `.dw-select` é reservada ao campo com popup nativo estilizado apenas quando fechado. Use um dos dois padrões em cada campo.
- Slider: `.dw-range` > `label` + `input[type=range]` + `output` com o valor em ciano.
- Marcação de opção ligada em diálogos: `.dw-chk` com `<b>[√]</b>`.
- Sempre elementos nativos com `label for`; não recrie selects com div.

```html
<div class="dw-desk" style="padding:24px 40px 30px 24px">
  <section class="dw-win" aria-labelledby="f1" style="width:400px">
    <h2 class="dw-win-title" id="f1">Settings</h2>
    <div class="dw-lrow">
      <label for="f-mon">Monitor</label>
      <select id="f-mon" name="monitor" data-dw-select><option>31 kHz VGA</option><option>15 kHz TV</option></select>
    </div>
    <div class="dw-range">
      <label for="f-scan">Scanline strength</label>
      <input id="f-scan" type="range" min="0" max="100" value="60">
      <output for="f-scan">0.60</output>
    </div>
    <p style="margin:10px 0 0"><span class="dw-chk"><b>[√]</b> Nearest-neighbour scaling</span></p>
  </section>
</div>
```

Para itens expansíveis de leitura, use `details` e `summary` dentro de uma
janela. O CSS aplica ► quando fechado e ▼ amarelo sobre seleção invertida
quando aberto.

## Dropdown

Menu suspenso cinza com filete preto interno, colunas de marca/rótulo/atalho e sombra dura.

- `.dw-dropdown[role=menu]` > `button.dw-dd-item[role=menuitem]` com três `span`: marca (√ ou vazio), rótulo com `.dw-k`, atalho (`.ms`). Separador: `.dw-dd-sep`.
- Hover/foco inverte o item (preto/branco) e a hotkey vira vermelho claro. Desabilitado: `aria-disabled="true"`, cinza escuro.
- Abre colado sob o `dw-menu-btn` (com `aria-expanded="true"`), posição `fixed`; Esc fecha; ↑ ↓ navegam.

```html
<div class="dw-desk" style="padding:20px 40px 30px 24px">
  <div class="dw-dropdown" role="menu" aria-label="Options" style="width:260px">
    <button class="dw-dd-item" role="menuitem"><span>√</span><span><span class="dw-k">C</span>RT shader</span><span class="ms">R</span></button>
    <button class="dw-dd-item" role="menuitem"><span></span><span><span class="dw-k">Z</span>oom 2x</span><span class="ms">Z</span></button>
    <div class="dw-dd-sep" role="separator"></div>
    <button class="dw-dd-item" role="menuitem"><span></span><span>Copy <span class="dw-k">l</span>ink</span><span class="ms">L</span></button>
    <button class="dw-dd-item" role="menuitem" aria-disabled="true"><span></span><span><span class="dw-k">E</span>xport</span><span class="ms">E</span></button>
  </div>
</div>
```

## Timeline

Navegador horizontal em ordem: faixas coloridas de grupo/ano, miniaturas rotuladas e um trilho segmentado com alça amarela.

- Faixas: `.dw-band` (+ `.b1` `.b2` `.b3`) ocupando as colunas do grupo.
- Itens: `button.dw-thumb` > `img.th` (4:3, opcional) + `.lab` com `<small>` para a segunda linha. O atual leva `.is-a` (borda amarela, rótulo teal).
- Trilho: `.dw-track` com `.arr` ◄ ► (com `aria-label`), `.seg`/`.seg.alt` proporcionais e `.dw-knob` posicionado por `left`.
- Muitas colunas: envolva em `.dw-scroll` com rolagem horizontal; ← → mudam o item.

```html
<div class="dw-desk" style="padding:24px 40px 30px 24px">
  <section class="dw-win grey" aria-labelledby="t1">
    <h2 class="dw-win-title" id="t1">Versions, in release order</h2>
    <div class="g" style="margin-bottom:4px">
      <div class="dw-band" style="grid-column:span 2">1990</div><div class="dw-band b1">1991</div><div class="dw-band b2">1992</div>
    </div>
    <div class="g">
      <button class="dw-thumb is-a"><span class="lab">PC 16-col <small>EGA</small></span></button>
      <button class="dw-thumb"><span class="lab">PC 256-c <small>VGA</small></span></button>
      <button class="dw-thumb"><span class="lab">Amiga <small>OCS/ECS</small></span></button>
      <button class="dw-thumb"><span class="lab">PC CD <small>VGA</small></span></button>
    </div>
    <div class="dw-track" style="margin-top:8px">
      <button class="arr" aria-label="Previous">◄</button>
      <span class="seg" style="flex:3">12-verb text interface</span>
      <span class="seg alt">9-verb</span>
      <button class="arr" aria-label="Next">►</button>
      <span class="dw-knob" style="left:22%" aria-hidden="true"></span>
    </div>
  </section>
</div>
```

## Dialog

Janela cinza com cara de arquivo de texto ou caixa de configuração, fechada por um único botão OK centralizado.

- `section.dw-win.grey[role=dialog]` com título em estilo de arquivo (`README.TXT`, `SETUP.CFG`) e `button.dw-win-close`.
- Conteúdo: índice numerado, `.dw-dl`, linhas `.dw-chk`, parágrafos `.dw-p`. OK: `.dw-btn.is-hot` dentro de `.dw-btns` centralizado.
- Em desktop largo os diálogos podem flutuar e ser arrastados pela faixa do título; inativos perdem a borda dupla (vira 2px sólida). Esc fecha.

```html
<div class="dw-desk" style="padding:26px 40px 30px 24px">
  <section class="dw-win grey" role="dialog" aria-labelledby="g1" style="width:440px">
    <h2 class="dw-win-title" id="g1">README.TXT</h2>
    <button class="dw-win-close" aria-label="Close">[<b>■</b>]</button>
    <ol class="toc"><li>Capture settings</li><li>Sources</li><li>Small print</li></ol>
    <dl class="dw-dl" style="margin-top:0">
      <dt>Emulator</dt><dd>ScummVM</dd>
      <dt>Output</dt><dd>1600×1200</dd>
    </dl>
    <p class="dw-p" style="margin-top:8px"><span class="dw-chk"><b>[√]</b> 4:3 aspect correction</span></p>
    <div class="dw-btns" style="justify-content:center;margin-top:12px;padding-bottom:6px"><button class="dw-btn is-hot">OK</button></div>
  </section>
</div>
```

## Leitura e busca de documentos

Quando a tela exibir Markdown, preserve a estrutura de títulos, listas,
tabelas e código. Use os tokens da janela para hierarquia e contraste.
Se houver modo Raw, use um botão `.dw-btn[aria-pressed]` para alternar
entre leitura formatada e fonte original. Renderize a fonte com texto
literal em `pre`; trate Markdown vindo de usuários como conteúdo não confiável.

Para uma busca simples, use `input[type="search"]` com rótulo visível e
`.dw-btn` para o envio. Mantenha a área de resultados na mesma janela e
mostre o estado vazio quando a consulta não retornar itens.

## Console

Saída de texto verde sobre preto (`pre.dw-console`) e um aviso flutuante (`.dw-toast`) para confirmações curtas.

- Console: valores, presets, logs. Mesma fonte e tamanho do resto; sem syntax highlight colorido.
- Toast: centralizado acima da StatusBar, `role="status"`, some sozinho; pode trazer um `input` só leitura (link copiado).

```html
<div class="dw-desk" style="display:grid;grid-template-columns:1fr 1fr;gap:30px;padding:24px 40px 30px 24px;align-items:start">
  <pre class="dw-console">C:\&gt; crt --preset hyllian
scanlines .... 0.60
mask ......... aperture
OK</pre>
  <div class="dw-toast" role="status">
    Link copied
    <input aria-label="Shareable link" value="https://example.com/#v=ega&amp;s=3" readonly>
  </div>
</div>
```
