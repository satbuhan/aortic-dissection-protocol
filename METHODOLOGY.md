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
`pte-thrombolysis-protocol`, `lmwh-nste-acs-protocol`,
`ketamine-head-injury-protocol`, `midazolam-clonazepam-protocol`,
`vasopressor-shock-protocol`, `wbct-trauma-protocol`,
`epinephrine-revisited-protocol`, `ketamine-indications-protocol`
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

This extends to the diagram's own shape, not just its text: if a source
figure draws two visually separate, arrow-connected boxes where a first
read might see one box with an internal split (a header label over its own
content), or draws only some of the arrows a decision's downstream options
might seem to deserve, preserve exactly what is drawn — the number of
boxes and the number and direction of arrows are part of the authored
algorithm too. When in doubt, crop the source image at native resolution
and look again rather than trusting an earlier description (this caught a
real error in `ketamine-head-injury-protocol`: a complication-decision box
was initially described as fanning out to all six downstream boxes, when
the source actually draws only two arrows out of it).

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

### Cross-atlas concept links

Every tool fetches one shared file at runtime —
`https://satbuhan.github.io/clinical-algorithm-atlas/assets/concepts.json`
— which maps a `GLOSSARY` term (lowercased `match` string) to every tool
that independently defines the same term, each with its own `def`, `url`,
and the `id` of the node that term is actually linked from there (for
deep-linking straight to that box via `#node-<id>`, the same hash every
node button's own DOM id already uses). When a term in this tool's own
`GLOSSARY` has other tools listed against it, its click-to-expand
`.term-def` panel grows an extra "Also covered in: <tool> →" line,
rendered by `crossLinksHtml()` in `app.js`. The fetch is best-effort and
non-blocking (`let CONCEPTS = null` until it resolves, `catch(() => {})`
on failure) — the page is byte-identical without it, just missing that one
extra line, so a slow network, an offline reader, or `concepts.json` being
briefly stale never breaks anything.

`concepts.json` itself is generated by hand-reviewing every term that
appears in 2+ tools' `GLOSSARY` arrays, not by blind string matching: the
same string can mean different things in different tools (e.g. "lipid
emulsion" as a drug-formulation vehicle in one tool vs. the LAST-rescue
antidote in another — these were found and deliberately excluded while
building the index the first time), so confirm each candidate pair's `def`
text actually describes the same clinical concept before including it.
Regenerate it with `clinical-algorithm-atlas/tools/gen_concepts.py` and push the
one updated file to the hub repo whenever a new tool's `GLOSSARY` is
likely to overlap with an existing one — every other tool picks up the
change automatically on next load, with no edits needed in their own
repos. Every tool also sets its own `TOOL_SLUG` constant near the top of
`app.js` (its repo name) — used to skip self-links and to build correct
`#node-<id>` URLs when this tool is the one being pointed at.

### Itemized / bulleted box content

Most boxes flatten naturally to one line or to comma-separated prose (see
the aortic tool's "criteria" node for the established default). But when
a source box is genuinely drawn as a bulleted or enumerated list, or packs
in a YES/NO pair the way `ketamine-head-injury-protocol`'s induction box
does — don't force that into flattened prose either. Preserve it as
literal `\n` line breaks inside the `sub` string, one item (or one branch
of the YES/NO) per line, exact leading bullet character included if the
source draws one. This only works if the CSS respects it: add
`white-space: pre-line;` to both `.node__sub` (the diagram box) and
`.readout__sub` (the detail-panel echo) — without it the browser collapses
the `\n` characters back into a single run-on line and the fidelity is
lost downstream of `content.js` even though the data is correct. Check
which pattern a given box actually needs by looking at the source image
directly; don't default to one convention out of habit.

### Non-single-row fan-out groups

`GROUP_COLUMNS` doesn't have to map a group name to a column count — it
can map to an arbitrary string, which `render()` uses to pick a CSS class
named `flow-wrap-<value>` instead of the generic `flow-wrap-2`/`-3`/`-4`.
Use this when a source figure draws a fan-out as something other than one
tidy row — `ketamine-head-injury-protocol`'s six complication boxes are
drawn as two stacked columns of three, so its "complications" group maps
to `"comp"` and `assets/style.css` defines a one-off `.flow-wrap-comp`
rule (`grid-template-columns: repeat(2, 1fr); grid-template-rows:
repeat(3, auto); grid-auto-flow: column;`) rather than forcing the group
into a generic row. No change to `app.js`'s rendering logic is needed
beyond picking the right CSS class name — the wrapping and edge-drawing
code is already shape-agnostic.

### Two independent diagrams on one page

Every tool so far has drawn a single continuous flow. `midazolam-clonazepam-protocol`
is the first exception: its source figure is genuinely two separate
algorithms stacked on one page (Panel A: seizures; Panel B: agitation/
anxiety), sharing no boxes or arrows with each other. Don't force this into
one `LAYOUT`/`EDGES` pair with a fake connecting edge, and don't split it
into two separate tool repos either (it's one figure in one manuscript,
reviewed and dosed as one unit by the authors). Instead: keep `NODES`,
`REFERENCES` and `GLOSSARY` as single combined arrays as usual, but give
each panel its own `LAYOUT` row/group numbering, its own `EDGES_A`/`EDGES_B`
array, and its own `<div class="flow" id="flow-a">`/`#edges-a` pair in
`index.html` (and `-b`). Generalize `render()`/`drawEdges()` in `app.js`
into `renderPanel(flowEl, panelId)`/`drawPanelEdges(flowEl, edgesSvg,
edges)` taking the container and data as parameters, called once per panel,
rather than duplicating the whole rendering engine. A small `PANEL` lookup
object (node id → `"a"`/`"b"`) is enough to filter `NODES` per panel in
`renderPanel()`. The shared `.readout` detail panel and the single
`#referencesList` need no changes — they already operate on `NODES`/
`REFERENCES` globally regardless of which panel a node belongs to. In
`index.html`, wrap both panel `<section>`s in one `.panels` container that
becomes the single left-hand grid item in `.workstation`, so the one
`.readout` on the right still spans both panels rather than needing its own
grid row per panel.

A layout trap specific to this pattern: don't place a non-arrowed or
differently-destined node directly in the vertical path between a decision
and one of its own real targets. `midazolam-clonazepam-protocol`'s first
build put the "Observe" leaf (reached by the decision's "No" edge) directly
above "Repeat the same benzodiazepine..." (reached by the same decision's
"Yes" edge, two rows further down) in the single-column trunk — which put
Observe's box exactly in the path of the "Yes" edge, and since edges render
*under* nodes (`z-index: 0` vs `1`), the "Yes" line vanished invisibly
behind the Observe box instead of curving around it. The fix, confirmed
against the source figure anyway, was to put Observe beside the decision in
a 2-wide group rather than below it — removing it from the "Yes" edge's
path entirely. Check for this whenever a decision has one branch that
terminates immediately and another that continues through more boxes:
don't let the short branch's node sit in the long branch's vertical lane.

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

A second, more serious failure mode is a manuscript citing a paper that
simply does not appear to exist — not a garbled detail, but no trace of
it anywhere (exact title, author combination, DOI/Crossref lookup, and
the reference lists of contemporaneous reviews on the same topic that
would plausibly cite it if real). `ketamine-head-injury-protocol`'s
reference 51 is the first confirmed case of this in the atlas: do not
use such a reference on any flowchart node even if the manuscript's
surrounding prose reads as if it were well-supported — check whether
another, confirmed-real reference already covers the same claim (it did,
here) before removing it from a node's `refs`, and keep the entry in the
bibliography with the finding recorded in `kind` rather than deleting it
outright, so the authors can see exactly what was flagged and why.

A one-off tool-budget failure is different from both of the above and
should not be confused with them: if a verification pass runs out of
web-search budget before reaching a reference, that reference is simply
**unchecked**, not confirmed and not disproven. Say so plainly in `kind`
("not yet independently verified — search budget exhausted") rather than
either marking it verified by default or treating the budget exhaustion
itself as a red flag about that specific paper. Retry in a fresh
session/turn once the budget resets, and prioritize whichever unchecked
references are actually cited on a flowchart node over ones that only
appear in the general bibliography.

When a bibliographic detail cannot be confirmed (an end page, an issue
number), omit that detail rather than guess it — a citation with a missing
end page is honest; a citation with a guessed one is not, even if the
guess turns out to be right.

### Agent (drug) name emphasis

At Dr. Özgür Karcıoğlu's request (2026-11-02, relayed while building
`midazolam-clonazepam-protocol`), every tool now visually emphasises
clinical agent (drug) names — bold, the page's one existing `--accent`
color (already used for emphasis elsewhere: active nodes, edge labels,
so this reads as "the atlas's emphasis," not a second system) — both
inside the diagram boxes and in the readout panel's prose. This is a
rendering-only concern layered on top of existing content; it never
changes `label`/`sub`/`meaning`/`rationale`/`cautions` text itself, so it
does not touch the one-invariant fidelity rule.

Three pieces, same in every tool:

1. **content.js**: a new `AGENTS` array — a flat list of agent-name
   strings, e.g. `["Midazolam", "Clonazepam", "Lorazepam", ...]`. Derive
   this list mechanically, not from memory: grep every NODES field
   (`label`, `sub`, `meaning`, `rationale`, `cautions`) for the specific
   drug names this tool's own algorithm and evidence actually mention,
   rather than assuming a reused list from another tool. Include every
   agent named, not just the one or two headline drugs — a secondary
   agent mentioned once in a `rationale` (e.g. a second-line or rescue
   drug) is still worth the same emphasis. Case doesn't matter for
   matching (see below), so list each name once in natural case.

2. **app.js**: two pieces of rendering logic, both keyed off `AGENTS`:
   - `highlightAgentsHtml(rawText)` — escapes the text, then wraps every
     case-insensitive, whole-word match of any `AGENTS` entry (longest
     name first, so e.g. "Fosphenytoin" is never partially matched by
     "Phenytoin") in a plain, non-interactive `<strong class="agent-name">`.
     Used for `n.label`/`n.sub` wherever they render — inside the node
     `<button>` in `nodeEl()`, and again for the readout panel's title/sub
     — via `.innerHTML`, not `.textContent`. Non-interactive is required
     here specifically: a node's label/sub render inside a `<button>`
     element, and a glossary term's own `<button class="term">` markup
     cannot nest inside another button (invalid HTML, breaks click
     handling), which is exactly why box text never got glossary-term
     auto-linking even before this change.
   - `linkify()` (the existing glossary-term auto-linker used for
     `meaning`/`rationale`/`cautions`) gets a second candidate pool added
     to its single left-to-right match loop: alongside glossary terms
     (matched once per term, deduped via `usedTerms` — a repeated
     clickable button for a common phrase would be noisy), agent names
     are matched on every occurrence, never deduped, since plain emphasis
     repeating through a paragraph is fine and desirable. Each loop
     iteration picks the overall earliest (then longest) match across
     both pools, so a glossary term and an agent name are never
     double-processed or allowed to overlap.

3. **style.css**: one rule,
   `.agent-name { color: var(--accent); font-weight: 700; }` — reuses
   the page's existing accent token, so no new color variable needed in
   any tool that already has one (every tool in this atlas does).

QA this exactly like any other change: `node --check` on both files,
then a Playwright pass confirming `.node .agent-name` and
`.readout .agent-name` both have matches after opening a node, zero
console/page errors, and a visual screenshot review — agent names should
read as clearly emphasised without the diagram looking cluttered.

### External verification (an alternative to in-session WebSearch)

The in-session, Claude-does-every-search approach above works but doesn't
scale cleanly to a manuscript with 90-110+ references: it reliably exhausts
this session's shared web-search budget partway through (this happened
repeatedly building `ketamine-head-injury-protocol`'s 98 references,
needing several follow-up passes across separate turns to finish), and the
verification slog itself consumes a large share of the context budget that
could otherwise go to engineering. By the author's explicit choice,
starting with `midazolam-clonazepam-protocol` (108 references), that
verification step can instead be delegated to a different, separately-
budgeted AI assistant (e.g. a higher-tier Gemini model) running outside
this session, rather than using this session's own WebSearch tool for it.

When doing this: build the tool's `content.js` with every entry in
`REFERENCES` carrying its exact manuscript citation text (title, authors,
journal, year, DOI — copied mechanically from the manuscript's own
reference list, not retyped by hand, to avoid transcription errors) and a
`kind` field that honestly states verification is pending — e.g.
`"Pending independent verification by an external reviewer (not yet
checked against its primary source)."` — for every single entry. Do not
mark any of them verified yourself without having actually checked them;
delegating the check to another reviewer doesn't change the rule that an
unchecked reference must say so in its own `kind` field. Separately,
prepare a verification handoff package: every reference's `id` + exact
citation text, paired with which node(s) cite it (so the external reviewer
knows which specific claim each reference is supporting, not just whether
the paper exists), plus explicit instructions that the reviewer must state
*how* it checked each one (what it searched, what record/DOI it found) —
not just hand back a bare verdict, which is indistinguishable from a model
confidently guessing. When the results come back, apply them to
`content.js` exactly the way earlier tools' in-session verification results
were applied: update each reference's `kind` to reflect what was actually
found (verified / corrected with a real substitute citation / confirmed
fabricated / unverifiable), re-run the data-integrity validation script,
and still personally re-confirm — don't just trust the external pass for —
whichever references are actually cited on a visible diagram node, since
those are the ones a reader will see if something is wrong (this is what
caught `ketamine-head-injury-protocol`'s ref 63: fabricated-as-cited,
but actively used in the diagram, so it mattered more than a bibliography-
only error would have).

## Rendering / SVG edge routing (`app.js`)

`LAYOUT` (`{col, decision?, group?, row?}` per node) and `EDGES`
(`[fromId, toId, label?, variant?]`) drive the diagram. Pick the column
count and widths to match the algorithm's actual shape — two columns for
a genuine two-way fork, three equal columns for three parallel branches,
an asymmetric `1fr 1.6fr 1fr` only when the center lane carries a decision
and the side lane is annotation-only. A box that spans two lanes (e.g. a
second decision that splits a branch the first decision already created)
needs its own grid-column span class (e.g. `.col-center-right { grid-
column: 2 / 4; }`) rather than being forced into one lane. A fan-out that
isn't a tidy single row at all (two stacked columns, say) is its own named
`GROUP_COLUMNS` string value and its own one-off CSS class — see
"Non-single-row fan-out groups" above.

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
