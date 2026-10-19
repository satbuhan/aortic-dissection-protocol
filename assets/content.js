/* =========================================================================
   Content data for the interactive acute aortic dissection protocol.
   Every clinical claim below is paraphrased from the cited source, not
   copied from it. Reference numbers match REFERENCES below and the
   printed list in index.html.
   ========================================================================= */

const REFERENCES = [
  {
    id: 1,
    kind: "Society guideline",
    text: "Isselbacher EM, et al. 2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease. Circulation. 2022;146(24):e334–e482.",
    url: "https://doi.org/10.1161/CIR.0000000000001106"
  },
  {
    id: 2,
    kind: "Society guideline",
    text: "Erbel R, et al.; ESC Committee for Practice Guidelines. 2014 ESC Guidelines on the diagnosis and treatment of aortic diseases. Eur Heart J. 2014;35(41):2873–2926.",
    url: "https://doi.org/10.1093/eurheartj/ehu281"
  },
  {
    id: 3,
    kind: "Primary research",
    text: "Doyle JJ, Doyle AJ, Wilson NK, et al. A deleterious gene-by-environment interaction imposed by calcium channel blockers in Marfan syndrome. eLife. 2015;4:e08648.",
    url: "https://doi.org/10.7554/eLife.08648"
  },
  {
    id: 4,
    kind: "Point-of-care reference",
    text: "Pevtsov A, Kerndt CC, Ahmed I. Esmolol. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing.",
    url: "https://www.statpearls.com/ArticleLibrary/viewarticle/21323"
  },
  {
    id: 5,
    kind: "Teaching pearl",
    text: "Beta-Blockade in Treating Acute Aortic Dissection. UMEM Educational Pearls, University of Maryland School of Medicine, Dept. of Emergency Medicine.",
    url: "https://em.umaryland.edu/educational_pearls/1174/"
  },
  {
    id: 6,
    kind: "Institutional protocol",
    text: "NHS Lothian, Edinburgh Blood Pressure Clinic / Critical Care. Management of Acute Type B Aortic Dissection (clinical guideline).",
    url: "https://bloodpressureclinic.ed.ac.uk/sites/default/files/2025-05/Management%20of%20Acute%20Type%20B%20Aortic%20Dissections.pdf"
  },
  {
    id: 7,
    kind: "Guideline summary",
    text: "American College of Cardiology. 2022 ACC/AHA Aortic Disease Guideline: Key Perspectives, Part 2 of 2.",
    url: "https://www.acc.org/Latest-in-Cardiology/ten-points-to-remember/2022/11/01/12/21/2022-guideline-on-aortic-disease-2-gl-ad"
  },
  {
    id: 8,
    kind: "Randomized trial",
    text: "Nienaber CA, Rousseau H, Eggebrecht H, et al.; INSTEAD Trial. Randomized comparison of strategies for type B aortic dissection: the INSTEAD trial. Circulation. 2009;120(25):2519–2528.",
    url: "https://doi.org/10.1161/CIRCULATIONAHA.109.886408"
  }
];

/* Each node mirrors one box or decision diamond in the source algorithm.
   type: "process" | "decision" | "branch" | "terminal"
   refs: array of REFERENCES ids used in meaning/rationale/dose
   needsAuthor: true marks a number stated in the algorithm that the
   literature search below could not independently source — flagged
   for the author team to confirm or cite, rather than invented. */
const NODES = [
  {
    id: "trigger",
    type: "terminal",
    label: "Suspected or confirmed acute aortic dissection",
    sub: "CT angiography; Stanford type A or B",
    meaning:
      "CT angiography is the entry test: it is fast, widely available, and defines the dissection flap, its extent, and branch-vessel involvement in one pass. The Stanford split that follows — type A involves the ascending aorta, type B begins distal to the left subclavian artery — is the single branch point that decides everything downstream: type A is a surgical emergency because the ascending aorta can rupture into the pericardium or compromise the coronary ostia; type B is managed medically unless it declares itself complicated.",
    rationale:
      "Classifying by anatomy rather than by symptom severity keeps the first decision objective and fast, which matters because the medical therapy in Step 1 starts in parallel with, not after, the surgical referral.",
    refs: [1, 2]
  },
  {
    id: "immediate",
    type: "process",
    label: "Immediate measures",
    sub: "Monitored bed · bilateral BP · IV opioid analgesia · urgent consult",
    meaning:
      "“BP in both arms” is not routine completeness — a dissection flap can occlude or narrow a subclavian origin, so one arm can read a falsely low pressure. Treatment decisions use the higher, truer reading. An arterial line is specified “when feasible” because the vasoactive infusions that follow are titrated minute-to-minute, and a cuff cannot keep up. “Anti-impulse therapy” is this protocol's own shorthand for the combined heart-rate-and-blood-pressure strategy in Step 1 onward: the target is not a blood pressure number alone, but the rate of rise of pressure in the vessel (dP/dt) with every heartbeat.",
    rationale:
      "IV opioid analgesia is listed here, before any drug titration, because uncontrolled pain is itself a sympathetic driver — it raises heart rate and blood pressure independently of the dissection and can masquerade as drug-refractory hypertension later in the algorithm (see Step 2). Treating pain early is part of anti-impulse therapy, not a separate comfort measure. Urgent cardiothoracic/vascular consultation is sought for every suspected dissection, type A or B, because a type B can declare itself complicated at any point.",
    refs: [1, 2]
  },
  {
    id: "d1",
    type: "decision",
    label: "Contraindication to beta-blockade?",
    meaning:
      "This gate is screened before the first drug is given, because Step 1's entire logic — blocking the heart first — assumes the circulation can tolerate a reduction in rate and contractility. In a subset of patients it cannot, and the right-hand box lists exactly which findings define that subset.",
    rationale:
      "Running this check first, rather than discovering intolerance after dosing, is what lets Step 1 default to “beta-blocker before vasodilator” without a caveat attached to every box.",
    refs: [1, 2]
  },
  {
    id: "criteria",
    type: "process",
    label: "What counts as a contraindication",
    sub: "SBP <90, shock, tamponade, severe acute AR, HR <60, high-grade AV block, bronchospasm",
    meaning:
      "Each item describes a state where tachycardia is already doing compensatory work: in tamponade and severe acute aortic regurgitation, a faster heart rate is partly what is maintaining forward cardiac output against rising pericardial pressure or a sudden regurgitant volume; in shock or SBP <90, there is no reserve left to absorb further negative inotropy. HR <60 or high-grade AV block leave little room to blunt conduction further without provoking symptomatic bradycardia or complete block. Bronchospasm is listed because even a beta-1-selective agent retains some beta-2 cross-reactivity, particularly as the dose is pushed upward.",
    rationale:
      "These are physiological red flags, not an exhaustive drug-interaction checklist — the common thread is that blunting the sympathetic response here would remove a compensation the circulation is actively relying on.",
    refs: [1, 2]
  },
  {
    id: "withhold",
    type: "branch",
    tone: "alarm",
    label: "If contraindicated: withhold & resuscitate",
    sub: "Immediate surgery/TEVAR as indicated; low-dose esmolol only if rate control is essential",
    meaning:
      "The priority inverts here: instead of pulse control, the immediate goal is resuscitation and definitive source control (surgery or TEVAR), with pharmacologic rate control reduced to a rescue measure rather than a default step.",
    rationale:
      "If rate control genuinely cannot wait, esmolol is named specifically — not metoprolol or labetalol — because its effect dissipates within roughly half an hour of stopping the infusion (elimination half-life ≈ 9 minutes, metabolized by blood esterases rather than the kidney or liver). In a patient already flagged as intolerant of beta-blockade, that reversibility is the point: if hypotension or decompensation follows the first low dose, the drug is essentially gone from the circulation well before the next clinical decision has to be made.",
    refs: [1, 2, 4]
  },
  {
    id: "step1",
    type: "process",
    tone: "key",
    label: "STEP 1 — IV beta-1-selective blocker before any vasodilator",
    meaning:
      "This is the one sequencing rule the whole algorithm is built around: a beta-blocker is started first, and a vasodilator is never the first drug given to a dissection.",
    rationale:
      "A vasodilator given to an unblocked heart lowers afterload, which the baroreflex answers with a rise in heart rate and contractility. The resulting increase in dP/dt — how fast pressure rises in the vessel with each beat — and the shortened diastolic interval both add dynamic load to an already-weakened wall, which is exactly the stress the protocol is trying to remove. Establishing beta-blockade first blunts that reflex, so any vasodilator added later (Step 2) lowers pressure without a compensatory tachycardia undoing the benefit.",
    refs: [1, 2, 5]
  },
  {
    id: "esmolol",
    type: "process",
    label: "Esmolol pathway",
    sub: "Hemodynamic course uncertain",
    meaning:
      "This column is for patients whose trajectory could still turn — and where that is true, an agent that can be stopped and gone within half an hour is worth more than one with a longer or less predictable offset. “Type A awaiting surgery” needs a rate-control drug that will not still be active at anesthesia induction. “Possible tamponade or AR” mirrors the contraindication logic above — if either turns out to be more significant than first assessed, the drug needs to be reversible, not just low-dose. “Reactive airways” avoids committing a bronchospasm-prone patient to hours of a longer-acting beta-1-selective agent. “Renal/hepatic disease” matters because esmolol is hydrolyzed by red-cell esterases rather than cleared by the kidney or liver, so organ dysfunction does not prolong its action the way it can with metoprolol.",
    dose: [
      ["Loading dose", "500 µg/kg IV"],
      ["Starting infusion", "50 µg/kg/min"],
      ["Titration", "stepwise upward, max 300 µg/kg/min"],
      ["Hypotension risk", "more frequent above ~150 µg/kg/min"],
      ["Offset after stopping", "≈18–30 min"]
    ],
    rationale:
      "Published dosing ranges for esmolol vary by indication and source — general hypertensive-emergency protocols commonly cap the infusion near 200–300 µg/kg/min, while some point-of-care references list a narrower range specifically for aortic dissection. The values here sit within the broader range reported for hypertensive emergency and reflect this protocol's own titration ceiling; the half-life (≈9 min) and offset within roughly half an hour are well supported.",
    refs: [1, 2, 4]
  },
  {
    id: "metoprolol",
    type: "process",
    label: "Metoprolol pathway",
    sub: "Hemodynamically stable — e.g. uncomplicated type B",
    meaning:
      "This column is for the more predictable trajectory — a stable patient who does not need a drug that can be switched off in minutes, and who is already heading toward the oral beta-blocker they will leave hospital on (final box). Dosing in small IV boluses, reassessed before each dose, is simpler to run than a titrated infusion and bridges directly into that oral regimen.",
    dose: [
      ["Dose", "2.5–5 mg IV"],
      ["Interval", "every 5 min, reassess before each dose"],
      ["Usual maximum", "15 mg"],
      ["Most benefit seen by", "cumulative ≤10 mg — flagged below"]
    ],
    rationale:
      "The 2.5–5 mg stepwise bolus pattern and a ~15 mg ceiling are consistent with how IV metoprolol is dosed for rate control more broadly. The specific claim that most of the benefit is already seen by 10 mg is this protocol's own clinical teaching point; the literature search behind this page could not independently source that exact threshold, so it is marked for the author team to attach a citation or confirm as empirical house practice before this page is shared outside the group.",
    refs: [1, 2],
    needsAuthor: true
  },
  {
    id: "targets",
    type: "process",
    tone: "key",
    label: "TARGETS",
    sub: "HR 60–80 bpm (≤60 if tolerated) · SBP <120 mmHg (100–120)",
    meaning:
      "These are the numeric endpoints both pathways above are titrated to, not separate goals — heart rate is brought down first because it is both the safer parameter to adjust and the one that directly lowers dP/dt; blood pressure is then addressed, by the same beta-blocker if sufficient, or by adding a vasodilator (Step 2) if not.",
    rationale:
      "“Reached within minutes to 1 hour” sets real urgency: every interval of uncontrolled wall stress is additional opportunity for the dissection to propagate, rupture, or compromise a branch vessel, so the targets are not a background goal but an active endpoint for this hour of care.",
    refs: [1, 2, 7]
  },
  {
    id: "d2",
    type: "decision",
    label: "SBP ≥120 mmHg despite HR control?",
    meaning:
      "This checks whether beta-blockade alone has closed the gap. Most patients who reach the heart-rate target also reach the pressure target on the same drug; this diamond separates the minority who need something added.",
    rationale:
      "Asking this only after HR control is established — not in parallel — is what keeps Step 2 safe: a vasodilator is only ever added onto an already-blocked heart.",
    refs: [1, 2]
  },
  {
    id: "step2",
    type: "branch",
    label: "STEP 2 — optimise analgesia, then add a short-acting vasodilator",
    sub: "Clevidipine or nicardipine — nitroprusside alternative",
    meaning:
      "“Optimise analgesia (± sedation)” is listed before the vasodilator for the same reason opioids appear in the very first box: unaddressed pain or agitation can present as blood pressure that will not come down, and escalating a vasodilator onto that picture treats the wrong problem. Once pain is genuinely controlled, clevidipine or nicardipine is added on top of the already-established beta-blockade from Step 1 — never in place of it.",
    rationale:
      "Both agents are short-acting, arterial-selective, and easy to titrate up or down within minutes, which suits a target that may need to move as HR control and analgesia are adjusted alongside it. They are named here as alternatives to sodium nitroprusside, whose classical drawbacks — cyanide/thiocyanate accumulation with prolonged infusion or renal impairment, and the need for light-protected delivery — make it a less convenient first choice when a comparably fast, titratable option is available.",
    refs: [1, 2, 6]
  },
  {
    id: "monitor",
    type: "process",
    label: "Continuous monitoring",
    sub: "Hypotension · bradycardia · urine output · mental status · malperfusion",
    meaning:
      "Each item is a window onto a different failure mode of treatment itself. Hypotension and bradycardia flag overshoot from the drugs just titrated. Urine output and mental status are organ-perfusion proxies for the kidneys and brain respectively — chosen because a dissection flap can progressively compromise a branch ostium at any point, independent of how well the blood pressure is controlled, so malperfusion is watched as an ongoing risk, not a one-time assessment made at triage.",
    rationale:
      "“SBP <90 mmHg or hypoperfusion → reduce/stop infusion” leans on the same reversibility logic as the esmolol box: because its effect wanes within about 30 minutes of stopping, overshoot can usually be corrected quickly rather than needing an antidote. “Individualise targets in elderly/AKI” exists because chronic hypertension and age shift the autoregulatory curve rightward — a blanket SBP <120 target can underperfuse an already vulnerable brain or kidney that is used to running at a higher baseline pressure.",
    refs: [1, 2]
  },
  {
    id: "definitive",
    type: "terminal",
    label: "Definitive care and transition",
    sub: "Type A → surgery · complicated type B → TEVAR · uncomplicated type B → medical therapy",
    meaning:
      "This closes the loop back to the first box's classification. Type A goes to surgery because the ascending aorta's proximity to the pericardium and coronary ostia makes medical management alone an unacceptable rupture/tamponade risk. Complicated type B — malperfusion, rupture, or pain/hypertension refractory to the steps above — goes to TEVAR. Uncomplicated type B continues on medical therapy with imaging surveillance, the strategy a randomized comparison of early stent-grafting versus medical therapy in stable type B dissection found to be a reasonable default, with stent-grafting reserved for those who declare complications.",
    rationale:
      "The long-term plan deliberately mirrors the acute one: switch to an oral beta-blocker (the same drug class Step 1 started acutely), then add an ACE inhibitor/ARB or calcium-channel blocker if blood pressure targets are not yet met. The one explicit caution — calcium-channel blockers in heritable aortopathy — is not generic caution: a mouse-model and patient-registry study found that calcium-channel blockers accelerated aneurysm growth and rupture in Marfan syndrome at a blood-pressure-lowering dose comparable to losartan, which did not cause the same harm, pointing to a drug-specific signalling effect rather than a blood-pressure effect.",
    refs: [1, 2, 8, 3]
  }
];

/* Glossary — terms inside the readout panel's prose are auto-linked to
   these entries (see linkify() in app.js). Only the first occurrence of
   each term per panel is linked, to keep the prose readable. "match" is
   matched case-sensitively and on word boundaries. */
const GLOSSARY = [
  { match: "TEVAR", full: "Thoracic EndoVascular Aortic Repair", def: "A stent-graft placed inside the aorta through a catheter (usually from the femoral artery) to seal off a dissection or aneurysm from the inside, without open chest surgery." },
  { match: "CT angiography", full: "computed tomography angiography", def: "A contrast-enhanced CT scan that outlines the inside of the vessel lumen — fast enough and detailed enough to be the first-line test for suspected dissection." },
  { match: "dP/dt", full: "rate of pressure rise", def: "How fast pressure rises inside the vessel with each heartbeat. Driven by heart rate and contractility together — lowering either one lowers dP/dt, which is the real target of “anti-impulse” therapy, not blood pressure alone." },
  { match: "tamponade", full: "cardiac tamponade", def: "Blood or fluid collecting in the sac around the heart under enough pressure to compress it and limit filling between beats — can be rapidly fatal if the pressure keeps rising." },
  { match: "AR", full: "aortic regurgitation", def: "Blood leaking backward through the aortic valve into the left ventricle. When a dissection causes this acutely, the ventricle has had no time to adapt to the extra volume." },
  { match: "AV block", full: "atrioventricular block", def: "A delay or interruption in the heart's own electrical signal between the atria and ventricles. High-grade block leaves little safety margin for a drug that slows conduction further." },
  { match: "bronchospasm", def: "Sudden narrowing of the airway's smooth muscle. A risk with any beta-blocker, since even a “beta-1-selective” agent keeps some beta-2 cross-reactivity, more so at higher doses." },
  { match: "beta-1-selective", def: "Preferentially blocks β1 receptors (concentrated in the heart) over β2 receptors (airway and blood-vessel smooth muscle) — the selectivity is relative, not absolute." },
  { match: "contractility", def: "How forcefully the heart muscle contracts for a given fill volume — together with heart rate, one of the two drivers of dP/dt." },
  { match: "malperfusion", def: "Inadequate blood flow to an organ or limb because the dissection flap has narrowed or blocked the vessel supplying it. Can appear or worsen at any point, not only at diagnosis." },
  { match: "branch vessel", def: "A side artery — renal, mesenteric, iliac, and so on — that originates from the aorta and can be cut off if the dissection flap crosses its origin." },
  { match: "ostium", def: "The mouth of a branch vessel where it opens off the aorta — the point a dissection flap most often compromises flow to that organ." },
  { match: "esterases", full: "red-cell (blood) esterases", def: "Enzymes that break a drug down chemically within the bloodstream itself, rather than relying on the kidney or liver. This is why esmolol's action does not lengthen in kidney or liver disease." },
  { match: "afterload", def: "The pressure the left ventricle must pump against to eject blood. A vasodilator lowers it directly; an unblocked heart's reflex response can offset that benefit by raising heart rate instead." },
  { match: "baroreflex", def: "The body's fast, automatic reflex that adjusts heart rate and vessel tone to counteract a change in blood pressure — it is this reflex, not the drug itself, that raises heart rate when a vasodilator drops afterload suddenly." },
  { match: "AKI", full: "acute kidney injury", def: "A sudden drop in kidney function. Here, a reason to individualise rather than enforce the SBP <120 target by default, since the kidney may already be under-perfused." },
  { match: "autoregulatory curve", full: "autoregulation", def: "The range over which an organ (brain, kidney) keeps its own blood flow roughly constant despite swings in systemic pressure. Chronic hypertension shifts this range upward, so a “normal” pressure can under-perfuse it." }
];

if (typeof module !== "undefined") {
  module.exports = { NODES, REFERENCES, GLOSSARY };
}
