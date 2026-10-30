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
hand-drawn flowcharts or manuscript figures. Existing tools:
`aortic-dissection-protocol`, `agitation-delirium-protocol`,
`influenza-antiviral-protocol`, `nsaid-pain-protocol`,
`anticoagulant-reversal-protocol`, `obesity-critical-care-protocol`,
`dapagliflozin-overdose-protocol`, `lidocaine-prilocaine-protocol`,
`pte-thrombolysis-protocol`
(GitHub account: satbuhan). Hub page listing all of them:
`clinical-algorithm-atlas`.

## The one rule that overrides everything else

The authored algorithm — every box, every decision diamond, every drug
name, every numeric dose — must stay **byte-for-byte unchanged** from what
the authors drew or specified. You may add supplementary explanatory /
academic content only: what a step means, why the protocol calls for it,
cautions, and citations. Never "fix", paraphrase, round, or standardize a
`label`, `sub`, or `dose` field without the author team's explicit
sign-off — those fields are the algorithm itself, not prose. If you edit
`content.js`, grep the `NODES` array before and after your edit and
confirm every `label`/`sub`/`dose` string is identical. This includes
punctuation: splitting one authored box's text across `label` and `sub`
must not silently drop a semicolon, comma, or parenthesis that was present
in the original — reconstruct `label + " " + sub` and compare it against
the source, not just the words. The same fidelity rule has two directions,
not one: never invent punctuation the source doesn't have, but also never
add punctuation to "fix" a plain line break the source genuinely leaves
unpunctuated — a bare line break can correctly map to no inserted
character, to a preserved literal `\n` (see "Itemized / bulleted box
content" below), but never to a comma or semicolon you supplied yourself.

## Repo structure — one GitHub repo per tool

Each tool is its **own** GitHub repository, with its own independent
GitHub Pages deployment — not a subfolder inside another tool's repo. (An
earlier version of this project put two tools in one repo; the GitHub
Pages deployments list mixed them together in a confusing way and this
was explicitly abandoned in favor of full separation. Don't repeat that.)

Each tool repo looks like this:

```
index.html          page structure, masthead, English-only disclaimer
                     (an earlier version of this project carried a Turkish
                     translation of the disclaimer too; that was dropped
                     project-wide — keep everything on these pages in
                     English, including the disclaimer, not just the
                     algorithm content),
                     footer with absolute cross-links (target="_blank"
                     rel="noopener") to sister-tool repos' live Pages URLs
                     and to the atlas hub
assets/style.css     visual design — shared paper/ink/navy "journal"
                     palette across the atlas; the diagram grid (column
                     count and widths) adapted per tool to match how many
                     parallel branches that algorithm actually has
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

Creating the empty GitHub repository itself is a step only the human
author can do — an AI assistant working from an API-scoped session
typically cannot call a repo-creation endpoint. Ask the author to create
an empty repo (no README/.gitignore/license) via GitHub's web UI, then
clone into it and push.

## `content.js` schema

- `REFERENCES`: array of `{id, kind, text, url}`. `url` can be `null` (or
  omitted) for a source with no stable link — e.g. an unpublished
  manuscript. When rendering references, skip the linked-URL line entirely
  if `url` is falsy; don't link to something that doesn't exist. If a
  trial is multi-arm and only two of its arms are the comparison this tool
  cites, say so directly in `kind` (e.g. `"Randomized trial (multi-arm;
  dexketoprofen and ibuprofen arms extracted for this comparison)"`)
  rather than citing it as if it were a plain two-arm trial — a reader
  checking the primary source should not be surprised to find a third or
  fourth arm the citation didn't mention.
- `NODES`: array of `{id, type, label, sub?, meaning, rationale,
  dose?: [[label, value], ...], cautions?: [...], refs: [...], tone?,
  needsAuthor?}`. `needsAuthor: true` flags a number or claim that the
  author team still needs to confirm or source — flag it, never invent a
  plausible-sounding citation or number to fill the gap. `tone: "key"`
  marks the pivotal action box on a branch; `tone: "alarm"` marks a "do
  not" / contraindication box — use sparingly, only where the algorithm
  itself singles the step out.
- `GLOSSARY`: array of `{match, full?, def}` — terms auto-linked (with a
  click-to-expand definition) inside the readout panel's prose. An
  abbreviation that appears directly inside a diagram box's own
  `label`/`sub` text is not auto-linked there (those fields render as
  plain text, deliberately, so the diagram stays exactly as authored) —
  expand those instead in a short `.abbrev-note` legend printed under the
  diagram, the same way the original flowchart would carry a legend.

### Itemized / bulleted box content

Most boxes flatten naturally to one line or to comma-separated prose (see
the aortic tool's "criteria" node for the established default). But when
a source box is genuinely drawn as a bulleted or enumerated list — the
`nsaid-pain-protocol` tool's two dashed annotation boxes
(`contraindications_info`, `high_risk_info`) and its two route boxes
(`oral_route`, `parenteral_route`) are the first case of this in the
atlas — don't force that into flattened prose either. Preserve it as
literal `\n` line breaks inside the `sub` string, one item per line, exact
leading bullet character included if the source draws one. This only
works if the CSS respects it: add `white-space: pre-line;` to both
`.node__sub` (the diagram box) and `.readout__sub` (the detail-panel
echo) — without it the browser collapses the `\n` characters back into a
single run-on line and the fidelity is lost downstream of `content.js`
even though the data is correct. Check which pattern a given box actually
needs by looking at the source image directly; don't default to one
convention out of habit.

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

A specific failure mode to watch for in yourself: when a source page gives
you everything about a paper (authors, DOI, journal, a description of
what it found) except the literal title text, the temptation is to write
a plausible title from the description. Don't — that is fabrication even
when the surrounding facts are all correct. Go back and re-fetch the same
source asking explicitly for the exact title as printed, word for word, or
find a second source (an index entry, an abstract page) that states it
verbatim. This exact mistake was caught and corrected during the build of
the `nsaid-pain-protocol` tool (a Dönmez 2024 reference's title was
initially invented from the paper's description, then replaced with the
real title after a targeted re-fetch) — it is a realistic failure mode,
not a hypothetical one, and self-review before finalizing a reference
list is what caught it.

When a bibliographic detail cannot be confirmed (an end page, an issue
number), omit that detail rather than guess it — a citation with a missing
end page is honest; a citation with a guessed one is not, even if the
guess turns out to be right.

## Rendering / SVG edge routing (`app.js`)

`LAYOUT` (`{col, decision?, group?, row?}` per node) and `EDGES`
(`[fromId, toId, label?, variant?]`) drive the diagram. Pick the column
count and widths to match the algorithm's actual shape — two columns for
a genuine two-way fork, three equal columns for three parallel branches,
an asymmetric `1fr 1.6fr 1fr` only when the center lane carries a decision
and the side lane is annotation-only. A box that spans two lanes (e.g. a
second decision that splits a branch the first decision already created)
needs its own grid-column span class (e.g. `.col-center-right { grid-
column: 2 / 4; }`) rather than being forced into one lane.

If two nodes end up sharing a pixel column with a third node sandwiched
between them, an edge between the outer two can visually cross straight
through the middle box. Diagnose this by sampling points along each
rendered SVG path (`path.getPointAtLength()`) and checking for
bounding-rect overlap against every *other* node's live
`getBoundingClientRect()` — don't just eyeball a screenshot. Fix it with a
small per-edge detour table that routes the path around the obstacle's
live bounding rect at draw time, not with hardcoded pixel offsets (content
and viewport size change; live geometry doesn't break when they do). When
the layout has no such sandwiching (three independent parallel columns
with nothing to detour around), the detour table is simply empty — don't
add one speculatively.

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
  `label`/`sub`/`dose` text is untouched — and specifically reconstruct
  `label + " " + sub` for every node and diff it against your own
  transcription of the source image, to catch a dropped semicolon, comma,
  or parenthesis that a careless split point can introduce. When a node
  uses the literal-`\n` bulleted pattern, diff line-by-line instead of as
  one flattened string, and visually confirm in the rendered browser that
  each line actually breaks (a missing `white-space: pre-line;` passes a
  pure-string diff but still renders wrong).
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
