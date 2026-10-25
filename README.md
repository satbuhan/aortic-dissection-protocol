# Interactive Clinical Algorithm Protocols

A growing series of interactive, referenced walkthroughs of clinical
management algorithms. Each one keeps the original, author-drawn flowchart
exactly as authored — every box, decision diamond, drug name and dose
unchanged — and lets a reader select any step to see what it means, why
the protocol calls for it, and the literature behind it, without
cluttering the diagram itself.

**Authors:** Dr. Özgür Karcıoğlu & Dr. Satuk Buğra Han Bozatlı

## The tools

| Tool | Live site | Source |
| --- | --- | --- |
| Acute aortic dissection — initial medical management | [satbuhan.github.io/aortic-dissection-protocol](https://satbuhan.github.io/aortic-dissection-protocol/) | `index.html` + `assets/` |
| Butyrophenone selection — acute agitation & hyperactive delirium (droperidol vs. haloperidol) | [satbuhan.github.io/aortic-dissection-protocol/agitation-delirium](https://satbuhan.github.io/aortic-dissection-protocol/agitation-delirium/) | `agitation-delirium/` |

Each tool is a self-contained subfolder with its own `index.html` and
`assets/{content.js, app.js, style.css}`, sharing one render engine design
(adapted per tool to fit each algorithm's shape) and one GitHub Pages site.
The tools cross-link to each other from their footers.

## Why this exists

A flowchart alone tells a reader *what* to do at each step but not *why*,
and a reader outside the authors' own team cannot easily check the
evidence behind a specific number (a loading dose, a target heart rate, a
cutoff value). These pages keep each original algorithm exactly as
authored, and attach the clinical reasoning and literature to each box
separately from the diagram itself.

## Status

Both tools are working versions, built to be tested on both desktop and
mobile. Each tool's `assets/content.js` flags, via `needsAuthor: true`
and/or a note in its `REFERENCES` entry, any number or citation the
literature search behind that page could not independently verify —
flagged for the author team to confirm, rather than invented. Everything
else is paraphrased from a cited source, listed in the References section
at the bottom of each page.

## Disclaimer

These are academic / educational reference tools, not a substitute for
institutional protocol or bedside clinical judgement. Verify any dose or
threshold against current local protocol before clinical use.

## How it's built

Plain HTML/CSS/JS, no build step and no framework — static pages GitHub
Pages serves directly. Each tool's folder follows the same layout:

```
<tool>/index.html         page structure
<tool>/assets/style.css   design — the "paper" masthead/references,
                          the diagram scope + readout panel
<tool>/assets/content.js  ← single source of truth for every node's text,
                          dosing, and reference list. Edit this file to
                          change what a page says.
<tool>/assets/app.js      rendering + interaction (builds the diagram and
                          connector lines from content.js, handles the
                          click-to-expand panel on desktop and the bottom
                          sheet on mobile)
```

The aortic-dissection tool's files sit at the repo root instead of in a
subfolder (it was built first); every tool added since lives in its own
named subfolder, e.g. `agitation-delirium/`.

### Running it locally

No install needed — serve the whole repo root so the tools' cross-links
between each other work too:

```bash
python3 -m http.server 8000
# aortic dissection:      http://localhost:8000/
# agitation & delirium:   http://localhost:8000/agitation-delirium/
```

### Editing content

Open the tool's `assets/content.js`. Each entry in `NODES` is one box or
decision diamond from that algorithm (`meaning`, `rationale`, optional
`dose` table, and `refs` pointing at numbered entries in `REFERENCES`).
Add or edit a reference in `REFERENCES` and point to it by `id` from any
node. Never change a node's `label`, `sub`, or `dose` text without the
author team's sign-off — those fields are the algorithm itself.

### Adding a new tool

1. Create a new subfolder named for the algorithm.
2. Copy `agitation-delirium/assets/app.js` and `style.css` as a starting
   point and adapt `LAYOUT`/`EDGES` (app.js) and the grid column count
   (style.css) to the new algorithm's shape.
3. Write `content.js` from scratch for the new algorithm's nodes,
   references, and glossary.
4. Add a footer cross-link to and from the other tools, and list the new
   tool in the table above.

## License

Content and code are released under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) —
share and adapt with attribution, non-commercially, under the same license.
