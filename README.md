# Acute Aortic Dissection — Interactive Management Protocol

An interactive, referenced walkthrough of the initial medical management
algorithm for suspected or confirmed acute aortic dissection. Every box and
decision point in the diagram can be selected to reveal, in one place: what
the step means, why the protocol calls for it, the exact dosing as authored,
and the sources behind it.

**Live site:** https://satbuhan.github.io/aortic-dissection-protocol/

**Authors:** Dr. Özgür Karcıoğlu & Dr. Satuk Buğra Han Bozatlı

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.24112518.svg)](https://doi.org/10.5281/zenodo.24112518)

This tool is part of a growing atlas of tools built the same way:

- [Clinical Algorithm Atlas](https://satbuhan.github.io/clinical-algorithm-atlas/) — the hub page for all of them
- [Butyrophenone selection — acute agitation & hyperactive delirium](https://github.com/satbuhan/agitation-delirium-protocol) ([live site](https://satbuhan.github.io/agitation-delirium-protocol/))
- [Influenza antiviral selection — baloxavir marboxil vs oseltamivir](https://github.com/satbuhan/influenza-antiviral-protocol) ([live site](https://satbuhan.github.io/influenza-antiviral-protocol/))
- [Dexketoprofen vs ibuprofen — selecting an NSAID for acute pain](https://github.com/satbuhan/nsaid-pain-protocol) ([live site](https://satbuhan.github.io/nsaid-pain-protocol/))
- [Anticoagulant reversal in gastrointestinal haemorrhage](https://github.com/satbuhan/anticoagulant-reversal-protocol) ([live site](https://satbuhan.github.io/anticoagulant-reversal-protocol/))
- [The adult with obesity in emergency and critical care](https://github.com/satbuhan/obesity-critical-care-protocol) ([live site](https://satbuhan.github.io/obesity-critical-care-protocol/))
- [Dapagliflozin / SGLT2 inhibitor — overdose and acute illness management](https://github.com/satbuhan/dapagliflozin-overdose-protocol) ([live site](https://satbuhan.github.io/dapagliflozin-overdose-protocol/))
- [Lidocaine vs prilocaine — local anaesthesia for laceration repair](https://github.com/satbuhan/lidocaine-prilocaine-protocol) ([live site](https://satbuhan.github.io/lidocaine-prilocaine-protocol/))
- [Reperfusion therapy in acute pulmonary thromboembolism](https://github.com/satbuhan/pte-thrombolysis-protocol) ([live site](https://satbuhan.github.io/pte-thrombolysis-protocol/))
- [LMWH selection & renal dosing in NSTE-ACS](https://github.com/satbuhan/lmwh-nste-acs-protocol) ([live site](https://satbuhan.github.io/lmwh-nste-acs-protocol/))
- [Ketamine in head injury — safety & complication management](https://github.com/satbuhan/ketamine-head-injury-protocol) ([live site](https://satbuhan.github.io/ketamine-head-injury-protocol/))
- [Midazolam versus clonazepam — seizures, acute agitation & anxiety](https://github.com/satbuhan/midazolam-clonazepam-protocol) ([live site](https://satbuhan.github.io/midazolam-clonazepam-protocol/))
- [Vasopressor (aminergic) agent selection in shock states](https://github.com/satbuhan/vasopressor-shock-protocol) ([live site](https://satbuhan.github.io/vasopressor-shock-protocol/))
- [Whole-body CT in traumatic circulatory shock](https://github.com/satbuhan/wbct-trauma-protocol) ([live site](https://satbuhan.github.io/wbct-trauma-protocol/))
- [Epinephrine/Adrenaline revisited — contemporary decision-making algorithm](https://github.com/satbuhan/epinephrine-revisited-protocol) ([live site](https://satbuhan.github.io/epinephrine-revisited-protocol/))
- [Ketamine in emergency and critical care — indication-based decision algorithm](https://github.com/satbuhan/ketamine-indications-protocol) ([live site](https://satbuhan.github.io/ketamine-indications-protocol/))
- [Tenecteplase versus alteplase — fibrinolysis in STEMI](https://github.com/satbuhan/tenecteplase-alteplase-stemi-protocol) ([live site](https://satbuhan.github.io/tenecteplase-alteplase-stemi-protocol/))
- [Blood gas-guided assessment of the chemical warfare agent casualty](https://github.com/satbuhan/cwa-blood-gas-protocol) ([live site](https://satbuhan.github.io/cwa-blood-gas-protocol/))
- [Calcium channel blocker toxicity — phenotype-guided management](https://github.com/satbuhan/ccb-toxicity-protocol) ([live site](https://satbuhan.github.io/ccb-toxicity-protocol/))
- [Choosing an adjunct to haloperidol in hyperactive delirium with severe agitation](https://github.com/satbuhan/haloperidol-adjunct-protocol) ([live site](https://satbuhan.github.io/haloperidol-adjunct-protocol/))
- [Selection of a neuromuscular blocking agent for rapid sequence induction and intubation](https://github.com/satbuhan/succinylcholine-rocuronium-protocol) ([live site](https://satbuhan.github.io/succinylcholine-rocuronium-protocol/))
- [Pharmacological pain management in elderly patients](https://github.com/satbuhan/geriatric-pain-protocol) ([live site](https://satbuhan.github.io/geriatric-pain-protocol/))
- [Metoclopramide versus Ondansetron — Antiemetic Selection by Clinical Setting](https://github.com/satbuhan/metoclopramide-ondansetron-protocol) ([live site](https://satbuhan.github.io/metoclopramide-ondansetron-protocol/))
- [Needle Aspiration versus Tube Thoracostomy — Symptom-Led Management of Spontaneous Pneumothorax](https://github.com/satbuhan/spontaneous-pneumothorax-protocol) ([live site](https://satbuhan.github.io/spontaneous-pneumothorax-protocol/))
- [Suspected or Witnessed Button Battery Exposure in a Child](https://github.com/satbuhan/button-battery-protocol) ([live site](https://satbuhan.github.io/button-battery-protocol/))
- [Beta-Lactam Infusion Strategy in Sepsis and Septic Shock](https://github.com/satbuhan/beta-lactam-infusion-protocol) ([live site](https://satbuhan.github.io/beta-lactam-infusion-protocol/))

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
