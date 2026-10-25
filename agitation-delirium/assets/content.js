/* =========================================================================
   Content data for the interactive butyrophenone-selection protocol
   (acute agitation and hyperactive delirium).
   Every clinical claim below is paraphrased from the cited source, not
   copied from it. Reference numbers match REFERENCES below and the
   printed list in index.html.
   ========================================================================= */

const REFERENCES = [
  {
    id: 1,
    kind: "Randomized trial",
    text: "Huf G, Coutinho ESF, Adams CE; TREC Collaborative Group. Rapid tranquillisation in psychiatric emergency settings in Brazil: pragmatic randomised controlled trial of intramuscular haloperidol versus intramuscular haloperidol plus promethazine. BMJ. 2007;335(7625):869.",
    url: "https://doi.org/10.1136/bmj.39339.448819.AE"
  },
  {
    id: 2,
    kind: "Society guideline",
    text: "Devlin JW, Skrobik Y, Gélinas C, et al. Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU. Crit Care Med. 2018;46(9):e825–e873.",
    url: "https://pubmed.ncbi.nlm.nih.gov/30113379/"
  },
  {
    id: 3,
    kind: "Retrospective cohort",
    text: "Cole JB, Lee SC, Martel ML, Smith SW, Biros MH, Miner JR. The Incidence of QT Prolongation and Torsades des Pointes in Patients Receiving Droperidol in an Urban Emergency Department. West J Emerg Med. 2020;21(4):728–736.",
    url: "https://doi.org/10.5811/westjem.2020.4.47036"
  },
  {
    id: 4,
    kind: "Society guideline",
    text: "American Geriatrics Society 2023 Beers Criteria® Update Expert Panel. American Geriatrics Society 2023 updated AGS Beers Criteria® for potentially inappropriate medication use in older adults. J Am Geriatr Soc. 2023;71(7):2052–2081.",
    url: "https://doi.org/10.1111/jgs.18372"
  },
  {
    id: 5,
    kind: "Society guideline",
    text: "American College of Emergency Physicians Clinical Policies Subcommittee. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Out-of-Hospital or Emergency Department Patients Presenting With Severe Agitation. Ann Emerg Med. 2024;83(1):e1–e30.",
    url: "https://doi.org/10.1016/j.annemergmed.2023.09.010"
  },
  {
    id: 6,
    kind: "Validation study",
    text: "Sessler CN, Gosnell MS, Grap MJ, et al. The Richmond Agitation-Sedation Scale: validity and reliability in adult intensive care unit patients. Am J Respir Crit Care Med. 2002;166(10):1338–1344.",
    url: "https://doi.org/10.1164/rccm.2107138"
  },
  {
    id: 7,
    kind: "Validation study",
    text: "Ely EW, Inouye SK, Bernard GR, et al. Delirium in mechanically ventilated patients: validity and reliability of the confusion assessment method for the intensive care unit (CAM-ICU). JAMA. 2001;286(21):2703–2710.",
    url: "https://pubmed.ncbi.nlm.nih.gov/11730446/"
  },
  {
    id: 8,
    kind: "Validation study",
    text: "Bergeron N, Dubois MJ, Dumont M, Dial S, Skrobik Y. Intensive Care Delirium Screening Checklist: evaluation of a new screening tool. Intensive Care Med. 2001;27(5):859–864.",
    url: "https://doi.org/10.1007/s001340100909"
  },
  {
    id: 9,
    kind: "Randomized trial",
    text: "Knott JC, Taylor DM, Castle DJ. Randomized clinical trial comparing intravenous midazolam and droperidol for sedation of the acutely agitated patient in the emergency department. Ann Emerg Med. 2006;47(1):61–67.",
    url: "https://pubmed.ncbi.nlm.nih.gov/16387219/"
  },
  {
    id: 10,
    kind: "Randomized trial",
    text: "Chan EW, Taylor DM, Knott JC, Phillips GA, Castle DJ, Kong DCM. Intravenous droperidol or olanzapine as an adjunct to midazolam for the acutely agitated patient: a multicentre, randomised, double-blind, placebo-controlled trial. Ann Emerg Med. 2013;61(1):72–81.",
    url: "https://pubmed.ncbi.nlm.nih.gov/22981685/"
  },
  {
    id: 11,
    kind: "Observational cohort",
    text: "Isbister GK, Calver LA, Downes MA, Page CB. Ketamine as Rescue Treatment for Difficult-to-Sedate Severe Acute Behavioral Disturbance in the Emergency Department. Ann Emerg Med. 2016;67(5):581–587.",
    url: "https://pubmed.ncbi.nlm.nih.gov/26899459/"
  },
  {
    id: 12,
    kind: "Validation study — author confirmation requested",
    text: "Downes MA, et al. Sedation assessment tool to score acute behavioural disturbance in the emergency department. (Title and PubMed record confirmed; full author list, journal, volume and page numbers could not be independently verified during this page's literature search — flagged for the author team.)",
    url: "https://pubmed.ncbi.nlm.nih.gov/22151672/"
  }
];

/* Each node mirrors one box or decision in the source algorithm.
   type: "process" | "decision" | "terminal"
   refs: array of REFERENCES ids used in meaning/rationale/dose/cautions
   needsAuthor: true marks a number or citation stated in the algorithm
   that the literature search below could not independently source —
   flagged for the author team to confirm or cite, rather than invented. */
const NODES = [
  {
    id: "trigger",
    type: "terminal",
    label: "Agitated or delirious patient: assess ABC, glucose, vital signs; attempt verbal de-escalation; identify medical, toxic or psychiatric cause",
    meaning:
      "The algorithm opens on a differential, not a drug. Agitation and hyperactive delirium are presentations, not diagnoses: hypoglycaemia, hypoxia, sepsis, alcohol or sedative withdrawal, intoxication, a seizure's postictal phase, and primary psychiatric illness can all produce an identical bedside picture of a combative, uncooperative patient. ABC and a point-of-care glucose are checked first because several of these mimics are rapidly reversible with treatment that has nothing to do with sedation, and giving a butyrophenone to a hypoglycaemic or hypoxic patient treats the symptom while leaving the actual emergency untreated.",
    rationale:
      "Listing verbal de-escalation as an explicit, attempted step — not an assumed formality — keeps the algorithm honest about what parenteral sedation actually is: chemical restraint, reserved for when a less invasive approach has already failed, not a default first response to an uncooperative patient.",
    refs: [5]
  },
  {
    id: "danger",
    type: "process",
    tone: "key",
    label: "Danger to self/others persists despite de-escalation → parenteral sedation required",
    meaning:
      "This is the single threshold statement the whole protocol pivots on. Below it, the correct management is everything this page does not show — environmental modification, treating the underlying precipitant, further verbal de-escalation. Only once danger genuinely persists despite that attempt does the algorithm below apply.",
    rationale:
      "Framing parenteral sedation as a safety threshold, rather than a convenience or comfort threshold, is what keeps the choice of agent on the next screen tied to least-invasive, most-reversible practice rather than a single reflexive default drug for every uncooperative patient.",
    refs: [5]
  },
  {
    id: "indication",
    type: "decision",
    label: "Indication?",
    meaning:
      "This is the one branch point in the whole protocol, and it separates two situations that look alike at the bedside — an uncooperative, potentially dangerous patient — but differ sharply in underlying physiology and risk. The left branch is acute, usually reversible agitation in a patient who was ambulatory moments earlier. The right branch is hyperactive delirium layered onto existing critical illness, in a patient who is typically older, more comorbid, and far less tolerant of oversedation.",
    rationale:
      "That difference in baseline vulnerability is why the two branches default to different intensities of treatment: a standard weight-independent IM regimen on the left, against a routine-use avoidance and lowest-effective-dose, as-required approach on the right.",
    refs: [2]
  },
  {
    id: "droperidol_check",
    type: "decision",
    label: "Droperidol available?",
    sub: "Psychotic / undifferentiated agitation — ED, prehospital, psychiatric unit",
    meaning:
      "Droperidol and haloperidol are both butyrophenone antipsychotics with a similar dopamine-D2-blocking mechanism; the question asked here is availability, not comparative efficacy. Droperidol became intermittently hard to obtain in many health systems after the FDA's 2001 boxed warning for QT prolongation, despite the warning predating most of the real-world safety data gathered since.",
    rationale:
      "Randomized comparisons of droperidol against midazolam, and of droperidol as an adjunct to midazolam, support it as at least as effective as the alternatives, and a 2024 ACEP clinical policy argues droperidol is likely the single most effective antipsychotic option for severe agitation when combined with a benzodiazepine — which is why this algorithm treats it as the preferred default and haloperidol as the fallback when stock does not allow it, not the reverse.",
    cautions: [
      "A large retrospective cohort found QT prolongation uncommon and torsades de pointes rare with ED droperidol dosing (1 case in 16,546 patients, 0.006%), and the one case had compounding risk factors (alcohol use disorder, hypomagnesaemia, active vomiting) — the boxed warning's absolute risk at typical agitation doses appears considerably lower than its wording implies, though the cardiac cautions in the final safety box still apply to both drugs."
    ],
    refs: [9, 10, 5, 3]
  },
  {
    id: "droperidol_regimen",
    type: "process",
    label: "Droperidol 5–10 mg IM",
    sub: "5 mg if ≥65 y or frail; repeat after 15–20 min if needed. Add midazolam 5 mg when speed is paramount",
    dose: [
      ["Droperidol", "5–10 mg IM"],
      ["Age ≥65 y or frail", "5 mg IM"],
      ["Repeat interval", "after 15–20 min if needed"],
      ["If speed is paramount", "add midazolam 5 mg"]
    ],
    meaning:
      "The lower dose in older or frail patients reflects reduced lean body mass and slower clearance, and the same higher sensitivity to QT prolongation and post-sedation falls that runs through every age-based adjustment on this page. The 15–20 minute repeat interval exists because IM onset is not instantaneous; judging response before the first dose has had time to act risks re-dosing unnecessarily and drifting the cumulative dose toward the >10 mg ECG-monitoring threshold in the final safety box faster than the clinical picture justifies.",
    rationale:
      "Midazolam is added specifically for speed, not depth: a benzodiazepine's onset can outpace droperidol's, so it is reached for when time-to-safety is the limiting factor, as a co-agent rather than a substitute for the antipsychotic.",
    refs: [9, 5]
  },
  {
    id: "haloperidol_im",
    type: "process",
    label: "Haloperidol 5 mg IM",
    sub: "0.5–2 mg if older — WITH promethazine 25–50 mg IM or a benzodiazepine; avoid monotherapy",
    dose: [
      ["Haloperidol", "5 mg IM"],
      ["If older", "0.5–2 mg IM"],
      ["Co-administer", "promethazine 25–50 mg IM, or a benzodiazepine"]
    ],
    meaning:
      "The \"avoid monotherapy\" instruction is not a generic caution — it is the direct, specific conclusion of the trial cited below. A pragmatic randomized trial of over 300 patients found haloperidol alone both slower to achieve tranquillity by 20 minutes (55% vs 72% with promethazine added) and solely responsible for the dystonia seen in the study (~6% of the haloperidol-alone arm, zero in the combination arm). Promethazine therefore does double duty: sedative synergy, and anticholinergic/antihistaminic cover against the extrapyramidal reaction haloperidol alone produces.",
    rationale:
      "Haloperidol given without promethazine or a benzodiazepine was explicitly judged by that trial's authors as \"not an acceptable way of managing acute aggression\" — an unusually direct trial conclusion, which is why it is written into this algorithm as a hard WITH, not a suggestion.",
    cautions: [
      "Promethazine carries its own anticholinergic load — sedation, dry mouth, urinary retention, and delirium risk in the elderly — so a benzodiazepine is the better co-agent in a frailer or more confused patient where that burden matters more than the dystonia-prevention benefit."
    ],
    refs: [1]
  },
  {
    id: "reassess_agitation",
    type: "process",
    label: "Reassess every 10–15 min",
    sub: "RASS/SAT, SpO₂, BP. Not settled at 20 min → second dose; then consider olanzapine or ketamine (profound agitation) rather than escalating haloperidol",
    meaning:
      "The 10–15 minute cadence is matched to typical IM onset for both agents, avoiding the two failure modes of reassessing at the wrong tempo: stacking a second dose before the first has had time to work, or leaving a genuinely under-treated patient and bystanders at risk for too long. The 20-minute checkpoint lines up with the primary-outcome timepoint used in the haloperidol/promethazine trial above, and with how a rescue-ketamine protocol in the literature below judges a droperidol-first regimen to have failed.",
    rationale:
      "Escalating further doses of the same antipsychotic has a ceiling: each additional dose adds cumulative QT and extrapyramidal burden without reliably improving response once two doses have failed. Olanzapine (a different receptor-binding profile) or ketamine (a dissociative agent acting through NMDA-receptor antagonism, not dopamine blockade) are offered as a genuinely different pharmacologic approach rather than simply more of the same drug.",
    dose: [
      ["Rescue ketamine (literature dose, not this protocol's own)", "4–6 mg/kg IM"]
    ],
    cautions: [
      "In an observational cohort of patients not sedated after a droperidol-first protocol, rescue IM ketamine achieved sedation at a median of 20 minutes, with a 6% adverse-event rate (vomiting, one transient desaturation to 90% responsive to oxygen) and no hypotension — reassuring, but drawn from a single non-comparative study, not a head-to-head trial against escalating haloperidol.",
      "Ketamine's own risk profile — laryngospasm, hypersalivation, emergence phenomena, and a transient rise in heart rate and blood pressure — means it still needs the same monitoring discipline as the antipsychotics it is being offered as an alternative to, not less."
    ],
    refs: [6, 1, 11, 5]
  },
  {
    id: "delirium_care",
    type: "process",
    label: "Optimise non-pharmacological care",
    sub: "Treat precipitants, avoid scheduled antipsychotics — delirium (ICU / ward / palliative)",
    meaning:
      "This reflects the clearest finding in the delirium literature: a large, multicentre, placebo-controlled trial of scheduled haloperidol and ziprasidone in critically ill patients found no reduction in delirium duration, days on the ventilator, length of stay, or mortality from routine antipsychotic use. \"Treat precipitants\" is the alternative this evidence points toward — delirium is a syndrome with an underlying driver (pain, the sedative already in use, sleep disruption, infection, a metabolic derangement), and a scheduled antipsychotic treats none of those.",
    rationale:
      "Avoiding scheduled dosing here is therefore not caution for its own sake; it is the direct clinical translation of a null trial result, carried into practice as a guideline recommendation.",
    refs: [2]
  },
  {
    id: "delirium_meds",
    type: "process",
    label: "Dangerous hyperactive symptoms only",
    sub: "Haloperidol 0.5–2.5 mg IV/IM (older) or 2.5–5 mg (younger), as-required, lowest effective dose, shortest duration. Droperidol 2.5–5 mg IV/IM is a rapid-onset alternative for a single episode (untested by RCT)",
    dose: [
      ["Haloperidol — older", "0.5–2.5 mg IV/IM"],
      ["Haloperidol — younger", "2.5–5 mg IV/IM"],
      ["Droperidol alternative", "2.5–5 mg IV/IM, single episode"]
    ],
    meaning:
      "These doses are deliberately much lower than the agitation-branch doses on the left (5–10 mg), because this population is older, more comorbid, and often already carrying other QT-prolonging exposures from unrelated ICU or ward therapy — the goal here is symptom control for safety, not full sedation. \"As-required\" rather than scheduled is this box's direct operationalisation of the no-routine-use finding in the box above it.",
    rationale:
      "The parenthetical \"untested by RCT\" is an honest evidence caveat, not a hedge: this literature search located randomized trial evidence for droperidol in emergency-department agitation, but no dedicated randomized trial of droperidol specifically for ICU hyperactive delirium — the algorithm's own wording and this independent search agree on that gap.",
    refs: [2, 3]
  },
  {
    id: "reassess_delirium",
    type: "process",
    label: "Reassess daily",
    sub: "CAM-ICU/ICDSC; stop when hyperactive symptoms resolve; do not continue in expectation of shorter delirium or survival benefit",
    meaning:
      "The once-daily cadence (rather than the 10–15 minute checks on the agitation branch) reflects a different treatment goal: this is symptom-triggered dosing for immediate safety, re-assessed on the same cycle as the structured delirium screen already built into ICU and ward rounds, not a dose being titrated to a numeric target.",
    rationale:
      "\"Do not continue in expectation of shorter delirium or survival benefit\" is close to a direct restatement of the placebo-controlled trial result cited above: continuing an antipsychotic on the hope of a benefit that trial did not demonstrate is explicitly what this line warns against.",
    refs: [2, 7, 8]
  },
  {
    id: "safety",
    type: "terminal",
    tone: "key",
    label: "SAFETY FOR BOTH DRUGS",
    sub: "12-lead ECG when feasible for IV use, cumulative dose >10 mg, cardiac disease, electrolyte disturbance or co-prescribed QT-prolonging drugs; correct K+ and Mg2+; continuous monitoring if QTc >500 ms or QT nomogram abnormal. Recognise and treat akathisia/dystonia (do not re-dose). Avoid in dementia-related behaviour unless danger persists (Beers 2023).",
    meaning:
      "Both drugs share the pharmacology behind every caution in this box: as butyrophenones, they block the cardiac hERG potassium channel (IKr), prolonging ventricular repolarisation — measured at the bedside as the QT interval. A large retrospective cohort found the real-world torsades risk at typical ED dosing to be low (0.006%), which is why monitoring here scales with risk — IV route, cumulative dose, cardiac disease, electrolyte disturbance, other QT-prolonging drugs — rather than mandating maximal monitoring for every single low-dose IM injection.",
    rationale:
      "Correcting potassium and magnesium matters because hypokalaemia and hypomagnesaemia lower the arrhythmia threshold, turning a borderline QT into a dangerous one. The QT nomogram is specified alongside a flat QTc cutoff because the usual correction formulas are rate-dependent and can mislead at the extremes of heart rate the nomogram is designed to catch instead. Akathisia (subjective motor restlessness, easily mistaken for worsening agitation and answered with a dangerous re-dose) and dystonia (sustained abnormal muscle contraction) are named separately because each needs to be recognised for what it is, not treated as a reason to give more antipsychotic. The dementia caution follows the 2023 AGS Beers Criteria directly: antipsychotics, haloperidol included, are flagged there for increased risk of stroke, cognitive decline, and mortality in people with dementia, which is why this algorithm's own exception — danger persisting — is written narrowly rather than left open-ended.",
    cautions: [
      "Pregnancy: evidence specific to droperidol and haloperidol in pregnancy is limited; use the lowest effective dose for the shortest duration and involve obstetric/psychiatric specialist input where time allows, rather than defaulting to the standard adult dose.",
      "Other QT-prolonging co-medication is common in exactly the patients most likely to need this algorithm — macrolide or fluoroquinolone antibiotics, methadone, and some antiemetics (e.g. ondansetron) among them — which is part of why the trigger for ECG monitoring here is \"co-prescribed QT-prolonging drugs\" generally, not a fixed drug list to check against."
    ],
    refs: [3, 4]
  }
];

/* Glossary — terms inside the readout panel's prose are auto-linked to
   these entries (see linkify() in app.js). Only the first occurrence of
   each term per panel is linked, to keep the prose readable. "match" is
   matched case-sensitively and on word boundaries. */
const GLOSSARY = [
  { match: "ABC", full: "airway, breathing, circulation", def: "The primary-survey check done before anything else: is the airway patent, is the patient breathing adequately, is the circulation intact. Several agitation mimics (hypoxia, shock) surface here before a drug is ever considered." },
  { match: "RASS", full: "Richmond Agitation-Sedation Scale", def: "A 10-point scale (−5, unarousable, to +4, combative) used to document and trend a patient's level of agitation or sedation at the bedside. Validated in adult ICU patients; used here to make \"reassess every 10–15 min\" an objective, reproducible check rather than a subjective impression." },
  { match: "SAT", full: "Sedation Assessment Tool", def: "A structured scale for scoring sedation and agitation level in acute behavioural disturbance, playing the same role as RASS in some regional emergency and prehospital protocols. This page could independently confirm the tool's name and existence but not its full original citation — flagged in the references list for the author team to complete." },
  { match: "CAM-ICU", full: "Confusion Assessment Method for the ICU", def: "A brief, validated bedside tool for detecting delirium in critically ill patients, including those who cannot speak (e.g. ventilated). Scored daily here to decide whether hyperactive symptoms have resolved." },
  { match: "ICDSC", full: "Intensive Care Delirium Screening Checklist", def: "An 8-item checklist, completed from a shift's worth of observation rather than a single bedside test, used alongside or instead of the CAM-ICU to screen ICU patients for delirium." },
  { match: "butyrophenone", def: "A chemical class of antipsychotic drugs — droperidol and haloperidol both belong to it — that act principally by blocking dopamine D2 receptors. The same class shares a mechanism relevant to the safety box on this page: blockade of the cardiac hERG potassium channel, which prolongs the QT interval." },
  { match: "QTc", full: "corrected QT interval", def: "The QT interval (time from the start of ventricular depolarisation to the end of repolarisation) adjusted for heart rate, since the raw QT shortens and lengthens with heart rate on its own. A prolonged QTc is the electrophysiological substrate for torsades de pointes." },
  { match: "torsades de pointes", def: "A polymorphic ventricular tachycardia specifically associated with a prolonged QT interval, named for the twisting appearance of the QRS axis on the rhythm strip. The arrhythmia both butyrophenones carry a boxed warning for, though real-world incidence at typical agitation doses is low." },
  { match: "QT nomogram", def: "A chart plotting heart rate against the raw (uncorrected) QT interval, used because standard rate-correction formulas such as Bazett's become less reliable at the extremes of heart rate. A reading that falls in the nomogram's at-risk zone is treated as abnormal here independently of the calculated QTc number." },
  { match: "akathisia", def: "A subjective, distressing sense of inner restlessness and an inability to stay still — an extrapyramidal side effect of dopamine-blocking drugs that is easily mistaken for the agitation being treated, which can trigger a dangerous cycle of re-dosing the very drug causing it." },
  { match: "dystonia", def: "Sustained, involuntary muscle contraction — of the neck, jaw, or eyes, for instance — another extrapyramidal reaction to dopamine blockade. Treated with an anticholinergic or antihistaminic agent (promethazine serves this purpose above), not with more antipsychotic." },
  { match: "Beers Criteria", full: "American Geriatrics Society Beers Criteria", def: "A periodically updated, explicit list of medications considered potentially inappropriate in older adults, compiled by the American Geriatrics Society. The 2023 update flags antipsychotics, haloperidol included, for increased risk of stroke, cognitive decline, and mortality when used for dementia-related behaviour." },
  { match: "hyperactive delirium", def: "The agitated, restless subtype of delirium — as opposed to hypoactive delirium, which presents as lethargy and withdrawal and is easily missed. Hyperactive delirium is the only subtype this algorithm's right-hand branch addresses with sedating medication." },
  { match: "rapid tranquillisation", def: "The clinical term of art, used in the trial literature cited on this page, for acute parenteral sedation of a dangerously agitated patient — distinct from routine or scheduled antipsychotic dosing." }
];

if (typeof module !== "undefined") {
  module.exports = { NODES, REFERENCES, GLOSSARY };
}
