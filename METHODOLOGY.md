# How these tools are built — methodology

This file exists so that **any** collaborator — a person, or any AI
assistant (Claude, ChatGPT, Gemini, or otherwise) — can pick up this project
in a new session and build the next tool the same way, without having to
reverse-engineer the conventions from scratch. If you are an AI reading
this because you were asked to build or extend a tool for this atlas, treat
this file as your instructions.

**Authors:** Dr. Özgür Karcıoğlu & Dr. Satuk Buğra Han Bozatlı.
**What this is:** a growing series of interactive, referenced
clinical-algorithm web tools, each converted from the authors' own
hand-drawn flowcharts. Existing tools: `aortic-dissection-protocol`,
`agitation-delirium-protocol` (GitHub account: satbuhan).

## The one rule that overrides everything else

The authored algorithm — every box, every decision diamond, every drug
name, every numeric dose — must stay **byte-for-byte unchanged** from what
the authors drew or specified. You may add supplementary explanatory /
academic content only: what a step means, why the protocol calls for it,
cautions, and citations. Never "fix", paraphrase, round, or standardize a
`label`, `sub`, or `dose` field without the author team's explicit
sign-off — those fields are the algorithm itself, not prose. If you edit
`content.js`, grep the `NODES` array before and after your edit and
confirm every `label`/`sub`/`dose` string is identical.

## Repo structure — one GitHub repo per tool

Each tool is its **own** GitHub repository, with its own independent
GitHub Pages deployment — not a subfolder inside another tool's repo. (An
earlier version of this project put two tools in one repo; the GitHub
Pages deployments list mixed them together in a confusing way and this
was explicitly abandoned in favor of full separation. Don't repeat that.)

Each tool repo looks like this:

```
index.html          page structure, masthead, bilingual (EN/TR) disclaimer,
                     footer with absolute cross-links (target="_blank"
                     rel="noopener") to sister-tool repos' live Pages URLs
assets/style.css     visual design — dark diagram/readout panel, light
                     "paper" masthead/references section
assets/content.js    single source of truth for content: REFERENCES[],
                     NODES[], GLOSSARY[] — schema below
assets/app.js        rendering + interaction: a LAYOUT + EDGES description
                     drives an SVG flowchart; click-to-expand detail panel
                     on desktop, bottom sheet on mobile
README.md            what the tool is, links to sister tools in the atlas,
                     status, disclaimer, how it's built, how to edit it
LICENSE.md           CC BY-NC-SA 4.0, both authors credited
```

No build step, no framework — plain static files that GitHub Pages serves
directly from the `main` branch root. Enabling Pages is a manual step in
the repo's Settings → Pages → "Deploy from branch" → `main` → `/ (root)` →
**Save** — the Save click is easy to miss. Don't assume Pages is live
because the branch/folder was picked; verify with
`gh api repos/<owner>/<repo> --jq '{has_pages}'`.

## `content.js` schema

- `REFERENCES`: array of `{id, kind, text, url}`. `url` can be `null` (or
  omitted) for a source with no stable link — e.g. an unpublished
  manuscript. When rendering references, skip the linked-URL line entirely
  if `url` is falsy; don't link to something that doesn't exist.
- `NODES`: array of `{id, type, label, sub?, meaning, rationale,
  dose?: [[label, value], ...], cautions?: [...], refs: [...], tone?,
  needsAuthor?}`. `needsAuthor: true` flags a number or claim that the
  author team still needs to confirm or source — flag it, never invent a
  plausible-sounding citation or number to fill the gap.
- `GLOSSARY`: array of `{match, full?, def}`.

## Citation verification — do not skip this

Every reference must be **independently verified** against a real primary
source (search for and open the actual paper, check the DOI resolves to
the claim being cited) before it goes in `REFERENCES`. Do not trust a
source list at face value, even one supplied by the authors' own
manuscript — reference lists can and do contain real errors (a wrong DOI
in a manuscript's own bibliography was caught and corrected against the
publisher's website in this project; the manuscript's number was simply
wrong). If the authors' own manuscript is itself the source for an
algorithm and is unpublished, cite it with `url: null` and note "in
preparation" in `text`/`kind` rather than inventing a fake link. Anything
you cannot independently verify gets flagged (`needsAuthor`-style) in the
UI and in `content.js` — it does not get a fabricated citation. This
applies regardless of which AI or person is doing the verification —
confidently-stated but wrong citations are a known failure mode for every
current AI model, this project included, which is why this step exists as
a hard rule rather than a suggestion.

## Rendering / SVG edge routing (`app.js`)

`LAYOUT` (`{col, decision?, group?, row?}` per node) and `EDGES`
(`[fromId, toId, label?, variant?]`) drive the diagram. If two nodes end
up sharing a pixel column with a third node sandwiched between them, an
edge between the outer two can visually cross straight through the middle
box. Diagnose this by sampling points along each rendered SVG path
(`path.getPointAtLength()`) and checking for bounding-rect overlap against
every *other* node's live `getBoundingClientRect()` — don't just eyeball a
screenshot. Fix it with a small per-edge detour table that routes the path
around the obstacle's live bounding rect at draw time, not with hardcoded
pixel offsets (content and viewport size change; live geometry doesn't
break when they do).

## QA — do this yourself, every time, before calling something done

The authors do not want a manual test checklist handed back to them to run
— do the strict checking yourself, and let them catch real-world edge
cases from actual field use afterward:

- Syntax-check JS with a parse-only check (e.g. `node --check app.js`) —
  not by executing it in a bare Node context, which throws on missing
  browser globals and looks like a syntax error but isn't.
- Serve the folder locally and drive it with an automated browser at both
  a desktop width (~1360px) and a mobile width (~412px).
- Grep the content file before and after any edit to prove the authored
  `label`/`sub`/`dose` text is untouched.
- Verify a git push actually landed by checking the remote directly
  (`git ls-remote`, `git ls-tree -r origin/main --name-only`) rather than
  trusting the push command's own output — a brand-new empty repo can
  print a scary-looking but benign protocol warning on push and still
  succeed.

## Tone / working style

Explicit, direct instructions over general guidance; honest, critical
findings over reassurance. If something isn't actually working yet (a
page not deployed, a reference not verifiable), say so plainly rather than
assuming it's probably fine.
