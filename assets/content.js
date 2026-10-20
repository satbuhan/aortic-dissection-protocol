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
  },
  {
    id: 9,
    kind: "Product labeling",
    text: "Cleviprex (clevidipine) injectable emulsion — dosing and administration. Chiesi USA, Inc.",
    url: "https://cleviprex.com/dosing-administration/"
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
      "CT angiography is the standard first-line test: it is fast, widely available, and characterises the dissection flap, its extent, and any branch-vessel involvement in a single study. The Stanford classification that follows — type A involves the ascending aorta; type B begins distal to the left subclavian artery — is the single determinant of all downstream management. Type A is a surgical emergency, since the ascending aorta may rupture into the pericardium or compromise the coronary ostia; type B is managed medically unless it becomes complicated.",
    rationale:
      "Classification by anatomy, rather than by symptom severity, keeps this first decision objective and rapid. This matters because medical therapy (Step 1) begins in parallel with the surgical referral, not after it.",
    refs: [1, 2]
  },
  {
    id: "immediate",
    type: "process",
    label: "Immediate measures",
    sub: "Monitored bed · bilateral BP · IV opioid analgesia · urgent consult",
    meaning:
      "Bilateral blood pressure measurement is not a formality: a dissection flap can occlude or narrow a subclavian origin, producing a falsely low reading in that arm. Treatment decisions should use the higher, more accurate reading. An arterial line is specified “when feasible” because the vasoactive infusions that follow require minute-to-minute titration, which a cuff cannot support. “Anti-impulse therapy” is this protocol's term for the combined heart-rate-and-blood-pressure strategy used from Step 1 onward: the therapeutic target is not blood pressure alone, but the rate of pressure rise in the vessel wall with each heartbeat (dP/dt).",
    rationale:
      "IV opioid analgesia is listed here, before any drug titration, because uncontrolled pain is itself a sympathetic stimulus: it raises heart rate and blood pressure independently of the dissection and can be mistaken for drug-refractory hypertension later in the algorithm (see Step 2). Early analgesia is therefore part of anti-impulse therapy, not a separate comfort measure. Urgent cardiothoracic or vascular surgical consultation is sought for every suspected dissection, type A or B, since a type B dissection can become complicated at any time.",
    dose: [
      ["Morphine", "1–10 mg IV, titrated to effect"],
      ["Ongoing/breakthrough pain", "morphine PCA — 1 mg bolus, 5-min lockout"],
      ["Renal impairment", "substitute fentanyl — 10 µg bolus, 5-min lockout"]
    ],
    cautions: [
      "Morphine is renally cleared, and its active metabolites accumulate in renal impairment; substitute fentanyl rather than simply reducing the morphine dose.",
      "Regular paracetamol alongside the opioid is standard adjunct analgesia here, unless contraindicated; it supplements, but does not replace, adequate opioid dosing in the acute phase."
    ],
    refs: [1, 2, 6]
  },
  {
    id: "d1",
    type: "decision",
    label: "Contraindication to beta-blockade?",
    meaning:
      "This question is assessed before the first drug is given, because the logic of Step 1 — blocking the heart first — assumes the circulation can tolerate a reduction in heart rate and contractility. In a subset of patients it cannot; the adjacent box lists the findings that define that subset.",
    rationale:
      "Performing this check first, rather than discovering intolerance after dosing, allows Step 1 to default to “beta-blocker before vasodilator” without a qualification attached to every box.",
    refs: [1, 2]
  },
  {
    id: "criteria",
    type: "process",
    label: "What counts as a contraindication",
    sub: "SBP <90, shock, tamponade, severe acute AR, HR <60, high-grade AV block, bronchospasm",
    meaning:
      "Each item describes a state in which tachycardia is already performing compensatory work. In tamponade and severe acute aortic regurgitation, a faster heart rate partly sustains forward cardiac output against rising pericardial pressure or a sudden regurgitant volume. In shock or SBP <90 mmHg, no physiological reserve remains to absorb further negative inotropy. HR <60 bpm or high-grade AV block leave little margin to slow conduction further without provoking symptomatic bradycardia or complete heart block. Bronchospasm is included because even a beta-1-selective agent retains some beta-2 cross-reactivity, particularly at higher doses.",
    rationale:
      "These are physiological warning signs, not an exhaustive list of drug interactions. The common principle is that blunting the sympathetic response in these states would remove a compensatory mechanism the circulation is actively relying on.",
    refs: [1, 2]
  },
  {
    id: "withhold",
    type: "branch",
    tone: "alarm",
    label: "If contraindicated: withhold & resuscitate",
    sub: "Immediate surgery/TEVAR as indicated; low-dose esmolol only if rate control is essential",
    meaning:
      "The priority is reversed here. Rather than rate control, the immediate goal is resuscitation and definitive source control — surgery or TEVAR — with pharmacologic rate control reduced to a rescue measure rather than a routine step.",
    rationale:
      "If rate control genuinely cannot wait, esmolol is specified rather than metoprolol or labetalol because its effect resolves within approximately half an hour of stopping the infusion (elimination half-life ≈9 minutes; metabolised by blood esterases rather than the kidney or liver). In a patient already identified as intolerant of beta-blockade, this reversibility is the rationale: if hypotension or decompensation follows the first low dose, the drug is largely cleared from the circulation before the next clinical decision is required.",
    refs: [1, 2, 4]
  },
  {
    id: "step1",
    type: "process",
    tone: "key",
    label: "STEP 1 — IV beta-1-selective blocker before any vasodilator",
    meaning:
      "This is the central sequencing rule of the algorithm: a beta-blocker is started first, and a vasodilator is never the first drug given for a dissection.",
    rationale:
      "A vasodilator given to an unblocked heart lowers afterload, which the baroreflex counters with a rise in heart rate and contractility. The resulting increase in dP/dt — the rate of pressure rise in the vessel with each beat — together with the shortened diastolic interval, adds dynamic load to an already-weakened aortic wall: precisely the stress the protocol aims to reduce. Establishing beta-blockade first blunts this reflex, so any vasodilator added later (Step 2) lowers pressure without a compensatory tachycardia offsetting the benefit.",
    cautions: [
      "Pheochromocytoma or cocaine-intoxication-associated hypertension: giving a pure beta-blocker first leaves peripheral α1-vasoconstriction unopposed and can paradoxically worsen hypertension. If either is suspected, alpha-blockade first — or a combined agent, below — takes priority over the default sequence.",
      "Labetalol, a combined α1/β-blocker, is an accepted single-agent alternative to esmolol or metoprolol, and is often preferred when combined alpha/beta effect is required, or in pregnancy. Dosing: 10 mg IV slow bolus every 2 minutes, to a maximum 200 mg course, with an infusion started alongside the boluses at 15 mg/hr and titrated across approximately 10–60 mg/hr.",
      "Decompensated heart failure or cardiogenic shock is treated as a relative contraindication even when the SBP <90 mmHg threshold above is not met; the withhold pathway and hemodynamic support take priority over rate control in this situation."
    ],
    refs: [1, 2, 5, 6]
  },
  {
    id: "esmolol",
    type: "process",
    label: "Esmolol pathway",
    sub: "Hemodynamic course uncertain",
    meaning:
      "This pathway is for patients whose clinical trajectory may still change. In that setting, an agent whose effect can be stopped within half an hour is preferable to one with a longer or less predictable offset. “Type A awaiting surgery” requires a rate-control drug that will not still be active at anaesthesia induction. “Possible tamponade or AR” follows the same logic as the contraindication criteria above: if either proves more significant than initially assessed, the drug must be reversible, not simply low-dose. “Reactive airways” avoids committing a bronchospasm-prone patient to hours of exposure to a longer-acting beta-1-selective agent. “Renal/hepatic disease” is relevant because esmolol is hydrolysed by red-cell esterases rather than cleared by the kidney or liver, so organ dysfunction does not prolong its action the way it can with metoprolol.",
    dose: [
      ["Loading dose", "500 µg/kg IV"],
      ["Starting infusion", "50 µg/kg/min"],
      ["Titration", "stepwise upward, max 300 µg/kg/min"],
      ["Hypotension risk", "more frequent above ~150 µg/kg/min"],
      ["Offset after stopping", "≈18–30 min"]
    ],
    rationale:
      "Published dosing ranges for esmolol vary by indication and source. General hypertensive-emergency protocols commonly cap the infusion near 200–300 µg/kg/min, while some point-of-care references give a narrower range specific to aortic dissection. The values above fall within the broader range reported for hypertensive emergency and reflect this protocol's own titration ceiling; the half-life (≈9 minutes) and offset within approximately half an hour are well supported in the literature.",
    cautions: [
      "Hypotension and bradycardia are dose-related and the most common reasons to hold or down-titrate the infusion; monitor most closely during the loading dose and the first steps of titration.",
      "The concentrated formulation is hyperosmolar and can irritate a peripheral vein on prolonged infusion; a dedicated or central line is preferable beyond the first hour.",
      "Because clearance depends on blood esterases rather than the kidney or liver, esmolol is often preferred specifically in renal or hepatic impairment, where metoprolol's effect is harder to predict."
    ],
    refs: [1, 2, 4]
  },
  {
    id: "metoprolol",
    type: "process",
    label: "Metoprolol pathway",
    sub: "Hemodynamically stable — e.g. uncomplicated type B",
    meaning:
      "This pathway is for the more predictable trajectory: a stable patient who does not require a drug that can be switched off within minutes, and who is already being transitioned toward the oral beta-blocker they will be discharged on (final box). Dosing in small IV boluses, reassessed before each dose, is simpler to administer than a titrated infusion and bridges directly into that oral regimen.",
    dose: [
      ["Dose", "2.5–5 mg IV"],
      ["Interval", "every 5 min, reassess before each dose"],
      ["Usual maximum", "15 mg"],
      ["Most benefit seen by", "cumulative ≤10 mg — flagged below"]
    ],
    rationale:
      "The 2.5–5 mg stepwise bolus pattern and the ~15 mg ceiling are consistent with how IV metoprolol is dosed for rate control more broadly. The specific claim that most of the benefit is seen by a cumulative dose of 10 mg is this protocol's own clinical teaching point; it could not be independently sourced in the literature search behind this page, and is flagged for the author team to supply a citation or confirm as empirical practice before wider distribution.",
    cautions: [
      "Hepatic metabolism via CYP2D6: clearance slows in significant hepatic impairment, and a genetically slow-metabolizer phenotype can prolong the effect unpredictably — favour esmolol instead if the course may need to stay reversible.",
      "Can blunt the tachycardic warning sign of hypoglycaemia in patients on insulin or sulfonylureas; relevant if diabetes is also being managed acutely.",
      "Relatively contraindicated in decompensated heart failure and significant reactive airway disease; β1-selectivity lowers but does not remove bronchospasm risk (see contraindication criteria above)."
    ],
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
      "These are the numeric endpoints both pathways above are titrated toward, not independent goals. Heart rate is addressed first, as it is both the safer parameter to adjust and the one that directly lowers dP/dt. Blood pressure is then addressed, either by the same beta-blocker if sufficient, or by adding a vasodilator (Step 2) if not.",
    rationale:
      "“Reached within minutes to 1 hour” sets a genuine time constraint: every interval of uncontrolled wall stress is a further opportunity for the dissection to propagate, rupture, or compromise a branch vessel. These targets are therefore an active endpoint for this hour of care, not a background goal.",
    refs: [1, 2, 7]
  },
  {
    id: "d2",
    type: "decision",
    label: "SBP ≥120 mmHg despite HR control?",
    meaning:
      "This determines whether beta-blockade alone has achieved blood pressure control. Most patients who reach the heart-rate target also reach the pressure target on the same drug; this decision identifies the minority who require an additional agent.",
    rationale:
      "This question is asked only after heart-rate control is established, not in parallel. That sequencing is what keeps Step 2 safe: a vasodilator is added only onto a heart in which beta-blockade is already established.",
    refs: [1, 2]
  },
  {
    id: "step2",
    type: "branch",
    label: "STEP 2 — optimise analgesia, then add a short-acting vasodilator",
    sub: "Clevidipine or nicardipine — nitroprusside alternative",
    meaning:
      "“Optimise analgesia (± sedation)” precedes the vasodilator for the same reason opioids appear in the first box: unaddressed pain or agitation can present as blood pressure that will not respond to treatment, and escalating a vasodilator in that setting treats the wrong problem. Once pain is adequately controlled, clevidipine or nicardipine is added on top of the beta-blockade already established in Step 1 — never in place of it.",
    dose: [
      ["Nicardipine — start", "5 mg/hr IV"],
      ["Nicardipine — titration", "+2.5 mg/hr every 10 min"],
      ["Nicardipine — ceiling (this protocol)", "15 mg/hr"],
      ["Nicardipine — maintenance", "2–4 mg/hr once at target"],
      ["Clevidipine — start", "1–2 mg/hr IV, doubled every 90 sec initially"],
      ["Clevidipine — typical effective dose", "4–6 mg/hr"],
      ["Clevidipine — maximum", "32 mg/hr (limited experience above 16 mg/hr)"]
    ],
    rationale:
      "Both agents are short-acting, arterial-selective, and readily titrated within minutes, which suits a target that may shift as heart-rate control and analgesia are adjusted alongside it. They are specified here as alternatives to sodium nitroprusside, whose recognised drawbacks — cyanide/thiocyanate accumulation with prolonged infusion or renal impairment, and the requirement for light-protected delivery — make it a less practical first choice when a comparably fast, titratable alternative is available.",
    cautions: [
      "Clevidipine is delivered in a lipid emulsion (20% soybean oil / egg-yolk phospholipid, as with propofol) — avoid in confirmed egg or soy allergy, defective lipid metabolism, or severe hypertriglyceridemia, and count its fat load toward daily intake if the infusion runs long.",
      "Nicardipine given peripherally carries a genuine phlebitis risk; change the infusion site approximately every 12 hours, or use central access for infusions beyond a few hours. It is hepatically metabolised, so titrate cautiously in significant hepatic impairment.",
      "If sodium nitroprusside is genuinely the only agent on hand, co-infuse thiosulfate and limit the dose/duration in renal impairment rather than using it unmodified — see the cyanide-accumulation point above."
    ],
    refs: [1, 2, 6, 9]
  },
  {
    id: "monitor",
    type: "process",
    label: "Continuous monitoring",
    sub: "Hypotension · bradycardia · urine output · mental status · malperfusion",
    meaning:
      "Each item monitors for a different failure mode of treatment itself. Hypotension and bradycardia indicate overshoot from the drugs just titrated. Urine output and mental status serve as perfusion proxies for the kidneys and brain, respectively, because a dissection flap can progressively compromise a branch ostium at any time, independent of how well blood pressure is controlled. Malperfusion is therefore monitored as an ongoing risk, not assessed once at triage.",
    rationale:
      "“SBP <90 mmHg or hypoperfusion → reduce/stop infusion” relies on the same reversibility logic as the esmolol pathway: because its effect wanes within approximately 30 minutes of stopping, overshoot can usually be corrected quickly, without requiring an antidote.",
    cautions: [
      "Elderly patients or chronic hypertension: the autoregulatory curve is shifted rightward, so a blanket SBP <120 target can underperfuse an already-adapted brain or kidney — individualise the target rather than enforce the number.",
      "Pregnancy: ACE inhibitors and ARBs are contraindicated throughout pregnancy; labetalol is the standard agent for combined rate and pressure control. Beta-blocker/antihypertensive therapy is continued through pregnancy and postpartum, and delivery timing and mode are planned at a center with cardiothoracic surgical support — dissection risk does not end at delivery."
    ],
    refs: [1, 2]
  },
  {
    id: "definitive",
    type: "terminal",
    label: "Definitive care and transition",
    sub: "Type A → surgery · complicated type B → TEVAR · uncomplicated type B → medical therapy",
    meaning:
      "This returns to the classification made in the first box. Type A is managed surgically, because the ascending aorta's proximity to the pericardium and coronary ostia makes medical management alone an unacceptable rupture or tamponade risk. Complicated type B — malperfusion, rupture, or pain/hypertension refractory to the steps above — is managed with TEVAR. Uncomplicated type B continues on medical therapy with imaging surveillance: a randomised comparison of early stent-grafting against medical therapy in stable type B dissection found this to be a reasonable default strategy, with stent-grafting reserved for patients who develop complications.",
    rationale:
      "The long-term plan deliberately mirrors the acute one: transition to an oral beta-blocker (the same drug class started acutely in Step 1), then add an ACE inhibitor/ARB or calcium-channel blocker if blood pressure targets are not yet met. The specific caution against calcium-channel blockers in heritable aortopathy is not a generic precaution: a combined mouse-model and patient-registry study found that calcium-channel blockers accelerated aneurysm growth and rupture in Marfan syndrome, at a blood-pressure-lowering dose comparable to losartan, which did not cause the same harm — indicating a drug-specific signalling effect rather than a blood-pressure effect.",
    refs: [1, 2, 8, 3]
  }
];

/* Glossary — terms inside the readout panel's prose are auto-linked to
   these entries (see linkify() in app.js). Only the first occurrence of
   each term per panel is linked, to keep the prose readable. "match" is
   matched case-sensitively and on word boundaries. */
const GLOSSARY = [
  { match: "beta-blocker", full: "β-adrenergic receptor blocker", def: "A drug that competitively blocks β-adrenergic receptors. The β1 subtype — concentrated in the SA/AV nodes and ventricular myocardium — mediates the effect this protocol actually wants: negative chronotropy (slower SA-node firing) and negative inotropy (reduced contractile force), which together lower dP/dt directly. β2 blockade (airway and vascular smooth muscle) is the unwanted side effect that β1-selectivity is designed to minimise, not eliminate. Esmolol, metoprolol, and labetalol (a combined α1/β-blocker) are the agents used in this protocol; non-selective or slow-onset agents are not first-line for acute titration here." },
  { match: "beta-blockade", def: "The pharmacologic state of adequate β1 antagonism — judged clinically here by the heart-rate target being met, not by a fixed dose. Establishing this first is what keeps a vasodilator added later (Step 2) from provoking reflex tachycardia." },
  { match: "pheochromocytoma", def: "A catecholamine-secreting adrenal (or extra-adrenal) tumour. If present or suspected as a precipitant of the hypertensive crisis, giving a pure beta-blocker first leaves peripheral α1-vasoconstriction unopposed, which can paradoxically worsen hypertension — alpha-blockade must precede or accompany beta-blockade in that specific scenario." },
  { match: "CYP2D6", full: "cytochrome P450 2D6", def: "The hepatic enzyme chiefly responsible for metabolising metoprolol. Reduced hepatic function — or a genetically slow-metabolizer phenotype — can prolong and intensify its effect unpredictably, which is the pharmacologic reason to favour esmolol when the course needs to stay reversible." },
  { match: "phlebitis", def: "Inflammation of a vein, here typically from a concentrated or irritant infusion running peripherally for too long — the reason to rotate the site or step up to central access for a prolonged vasoactive infusion." },
  { match: "PCA", full: "patient-controlled analgesia", def: "A pump letting the patient self-deliver small, pre-set IV analgesic boluses within a safety lockout interval — used once initial titration has established a safe, effective dose, so ongoing pain does not require re-paging for every top-up." },
  { match: "lipid emulsion", def: "A fat-based IV vehicle (soybean oil and egg-yolk phospholipid — the same base as propofol) used to keep certain poorly water-soluble drugs suspended for infusion. The reason for the egg/soy-allergy and triglyceride cautions on clevidipine above." },
  { match: "thiosulfate", full: "sodium thiosulfate", def: "A sulfur donor that accelerates the body's own conversion of cyanide — released as nitroprusside is metabolised — into thiocyanate, which is renally excreted. Co-infused specifically to blunt nitroprusside's cyanide-accumulation risk." },
  { match: "TEVAR", full: "Thoracic EndoVascular Aortic Repair", def: "A stent-graft placed inside the aorta through a catheter (usually from the femoral artery) to seal off a dissection or aneurysm from the inside, without open chest surgery." },
  { match: "CT angiography", full: "computed tomography angiography", def: "A contrast-enhanced CT scan that outlines the inside of the vessel lumen — fast enough and detailed enough to be the first-line test for suspected dissection." },
  { match: "dP/dt", full: "rate of pressure rise", def: "How fast pressure rises inside the vessel with each heartbeat. Driven by heart rate and contractility together — lowering either one lowers dP/dt, which is the actual therapeutic target of “anti-impulse” therapy, not blood pressure alone." },
  { match: "tamponade", full: "cardiac tamponade", def: "Pericardial pressure rising to meet or exceed diastolic chamber pressures, impairing ventricular filling — in dissection, typically from blood tracking retrograde into the pericardial sac. Produces equalisation of diastolic pressures across chambers and, classically, pulsus paradoxus. It becomes rapidly fatal once compensatory tachycardia can no longer sustain cardiac output against the rising pressure — which is exactly why it is a beta-blockade contraindication above." },
  { match: "AR", full: "aortic regurgitation", def: "Retrograde flow through an incompetent aortic valve — here, from the dissection flap disrupting leaflet coaptation or prolapsing a leaflet. Acute AR is hemodynamically distinct from chronic AR: the non-dilated, non-compliant left ventricle cannot accommodate the sudden regurgitant volume, so left ventricular end-diastolic pressure rises sharply. Tachycardia is a compensatory mechanism maintaining forward output here, which is why blunting it with a beta-blocker is dangerous." },
  { match: "AV block", full: "atrioventricular block", def: "Conduction delay or failure at or below the AV node. First-degree and Mobitz I block carry some safety margin; Mobitz II, 2:1, and third-degree block (\"high-grade\") are the ones that matter here — they leave no AV-nodal reserve to absorb a drug that slows conduction further, risking symptomatic bradycardia or complete heart block." },
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
