# Acute Aortic Dissection — Interactive Management Protocol

An interactive, referenced walkthrough of the initial medical management
algorithm for suspected or confirmed acute aortic dissection. Every box and
decision point in the diagram can be selected to reveal, in one place: what
the step means, why the protocol calls for it, the exact dosing as authored,
and the sources behind it.

**Live site:** https://satbuhan.github.io/aortic-dissection-protocol/

**Authors:** Dr. Özgür Karcıoğlu & Dr. Satuk Buğra Han Bozatlı

This tool is part of a growing atlas of tools built the same way:

- [Clinical Algorithm Atlas](https://satbuhan.github.io/clinical-algorithm-atlas/) — the hub page for all of them
- [Butyrophenone selection — acute agitation & hyperactive delirium](https://github.com/satbuhan/agitation-delirium-protocol) ([live site](https://satbuhan.github.io/agitation-delirium-protocol/))
- [Influenza antiviral selection — baloxavir marboxil vs oseltamivir](https://github.com/satbuhan/influenza-antiviral-protocol) ([live site](https://satbuhan.github.io/influenza-antiviral-protocol/))

## Why this exists

A flowchart alone tells a reader *what* to do at each step but not *why*, and
a reader outside the authors' own team cannot easily check the evidence
behind a specific number (a loading dose, a target heart rate, a cutoff for
"complicated"). This page keeps the original algorithm exactly as authored,
and attaches the clinical reasoning and literature to each box without
cluttering the diagram itself.

## Status

This is a first working version, built to be tested on both desktop and
mobile before wider release. One item is explicitly flagged in the UI and
in `assets/content.js` (`needsAuthor: true`) as a number the authors should
confirm or attach a citation to before this page is shared outside the
team — the metoprolol pathway's "benefit observed at cumulative doses
≤10 mg" claim. Everything else is paraphrased from a cited source, listed
in the References section at the bottom of the page.

## Disclaimer

This is an academic / educational reference tool, not a substitute for
institutional protocol or bedside clinical judgement. Verify any dose or
threshold against current local protocol before clinical use.

## How it's built

Plain HTML/CSS/JS, no build step and no framework — a single static site
that GitHub Pages can serve directly.

```
index.html          page structure
assets/style.css     design (the dark "scope" diagram + readout panel,
                      the light "paper" masthead/references)
assets/content.js     ← single source of truth for every node's text,
                      dosing, and reference list. Edit this file to change
                      what the page says.
assets/app.js         rendering + interaction (builds the diagram and the
                      connector lines from content.js, handles the
                      click-to-expand panel on desktop and the bottom
                      sheet on mobile)
```

### Running it locally

No install needed:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

### Editing content

Open `assets/content.js`. Each entry in `NODES` is one box or decision
diamond from the algorithm (`meaning`, `rationale`, optional `dose` table,
and `refs` pointing at numbered entries in `REFERENCES`). Add or edit a
reference in `REFERENCES` and point to it by `id` from any node.

### Building the next tool in this atlas

See [`METHODOLOGY.md`](METHODOLOGY.md) — the full build/verification
process (fidelity rule, content schema, citation verification, QA steps),
written so that any collaborator or AI assistant can pick up this project
in a fresh session and build the next tool the same way.

## License

Content and code are released under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) —
share and adapt with attribution, non-commercially, under the same license.
