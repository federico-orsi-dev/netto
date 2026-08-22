---
run_id: RUN-2026-08-22-007
date: 2026-08-22
tool: codex
role: fiscal-researcher
task: fiscal-research-local-tax
status: completed
owner: codex
reviewer: claude
related_rules:
  - RULE-LOCAL-2026-001
  - RULE-LOMBARDY-2026-001
  - RULE-MILAN-2026-001
  - RULE-LOCAL-2026-ORDER
  - RULE-LOCAL-2026-ROUNDING
  - RULE-LOCAL-2026-WITHHOLDING
related_adrs:
  - ADR-0002
  - ADR-0004
commit: null
---

# 2026 Lombardy and Milan additional-tax research

## Objective

Establish candidate authoritative rules for the 2026 Lombardy regional and Milan municipal IRPEF additional taxes in the canonical employee scenario, including base, applicability, rates, progressive semantics, thresholds, annual-liability ordering, and rounding. Payroll withholding timing, advance, and balance are outside this run.

## Authority and acceptance criteria

- Research authority only: this run cannot verify its own work, change architecture, expand scope, or mark any rule `verified`.
- Use primary law and competent official institutions; use no calculator, search snippet, secondary article, or model memory as canonical evidence.
- Produce full source and rule schemas, distinguish evidence from interpretation, identify cross-stream dependencies, and propose boundary fixtures.
- Write only this run record.

## Canonical context consulted

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/domain/fiscal-rules-2026.md`
- `docs/domain/source-register-2026.md`
- `docs/ai-engineering/contracts/fiscal-research-and-verification.md`
- `docs/ai-engineering/contracts/run-record.md`

The fixed scenario is a private-sector, non-executive, permanent, full-year employee of an industrial employer with more than 15 employees and within CIGS scope, resident in Milan, with no dependants, other income, personal deductions, incentives, bonuses, benefits, pension-fund deductions, or exceptional circumstances. The employer refinement does not alter the local-tax rules in this run, but it affects the upstream contribution amount and therefore the common IRPEF/additional-tax base.

## Proposed source records

### SRC-LOCAL-2026-001

- **Issuer:** Italian Republic.
- **Title:** Decreto legislativo 15 dicembre 1997, n. 446, article 50, *Istituzione dell'addizionale regionale all'imposta sul reddito delle persone fisiche*.
- **Official URL:** <https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1997-12-15;446~art50!vig=>
- **Document type:** primary national legislation, consolidated official text.
- **Publication date:** 1997-12-23, G.U. n. 298, ordinary supplement n. 252.
- **Effective date:** standing rule, read as in force for fiscal year 2026.
- **Fiscal year:** structural rule applicable to 2026.
- **Jurisdiction:** Italy / regional IRPEF additions.
- **Access date:** 2026-08-22.
- **Precise location:** article 50(1), (2), and (4).
- **Supported claim:** the regional addition is separate and non-deductible; its base is IRPEF comprehensive income net of deductible charges; it is due only if IRPEF remains due for the same year after the legally specified deductions/credits; territorial attribution follows fiscal domicile at 1 January of the year.
- **Authority notes:** controlling primary law. The independent verifier must reopen the consolidated text at the 2026 effective date.
- **Supersession/conflict notes:** later amendments changed rates, publication mechanics, and domicile wording; only the current consolidated text may be relied on.

### SRC-LOCAL-2026-002

- **Issuer:** Italian Republic.
- **Title:** Decreto legislativo 6 maggio 2011, n. 68, article 6, *Addizionale regionale all'IRPEF*.
- **Official URL:** <https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2011-05-06;68~art6!vig=>
- **Document type:** primary national legislation, consolidated official text.
- **Publication date:** 2011-05-12, G.U. n. 109.
- **Effective date:** standing rule, read as in force for fiscal year 2026.
- **Fiscal year:** structural rule applicable to 2026.
- **Jurisdiction:** Italy / ordinary-statute regions.
- **Access date:** 2026-08-22.
- **Precise location:** article 6(1) and (4), including the rule on differentiated rates and income brackets.
- **Supported claim:** ordinary-statute regions may vary the base regional rate; differentiated rates must preserve progressivity and be linked to legally permitted IRPEF income brackets.
- **Authority notes:** controlling primary law for regional rate-setting. The 2026 MEF register is still required for the year-specific Lombardy values.
- **Supersession/conflict notes:** temporary national coordination provisions permit use of pre-2025 four-bracket structures during the transition; the independent verifier must reconstruct that overlay rather than infer it solely from this article.

### SRC-LOCAL-2026-003

- **Issuer:** Regione Lombardia / Consiglio regionale della Lombardia.
- **Title:** Legge regionale 14 luglio 2003, n. 10, article 72, *Determinazione delle aliquote*.
- **Official URL:** <https://normelombardia.consiglio.regione.lombardia.it/NormeLombardia/Accessibile/main.aspx?iddoc=lr002003071400010&view=showdoc>
- **Document type:** consolidated primary regional legislation in the official regional legal database.
- **Publication date:** 2003-07-18, BURL n. 29, second ordinary supplement.
- **Effective date:** current article 72 rates introduced by L.R. 31 March 2022, n. 5; standing in 2026.
- **Fiscal year:** 2026.
- **Jurisdiction:** Lombardy.
- **Access date:** 2026-08-22.
- **Precise location:** article 72(1), especially letters (a) through (d).
- **Supported claim:** base is comprehensive IRPEF income net of article 10 deductible charges; the brackets/rates are EUR 0–15,000 at 1.23%, over 15,000–28,000 at 1.58%, over 28,000–50,000 at 1.72%, and over 50,000 at 1.73%.
- **Authority notes:** controlling regional law for the rates and base.
- **Supersession/conflict notes:** the article shows the four-bracket structure despite the three-bracket national IRPEF structure; 2026 operation is independently corroborated by `SRC-LOCAL-2026-004` and `SRC-LOCAL-2026-005`.

### SRC-LOCAL-2026-004

- **Issuer:** Ministero dell'Economia e delle Finanze, Dipartimento delle Finanze.
- **Title:** *Addizionale regionale all'IRPEF — Elenco del 2026 in formato CSV*.
- **Official URL:** <https://www1.finanze.gov.it/finanze2/dipartimentopolitichefiscali/fiscalitalocale/addregirpef/download/download.php?anno=2026&tipo=reg>
- **Document type:** official year-specific fiscal-rate dataset.
- **Publication date:** Lombardy entry published 2026-01-28; dataset reports last update 2026-06-19.
- **Effective date:** fiscal year 2026.
- **Fiscal year:** 2026.
- **Jurisdiction:** Lombardy.
- **Access date:** 2026-08-22.
- **Precise location:** rows with `ANNO=2026`, `REGIONE=REGIONE LOMBARDIA`, record number `2179`.
- **Supported claim:** four 2026 Lombardy entries reproduce 1.23% through EUR 15,000, 1.58% over EUR 15,000 through EUR 28,000, 1.72% over EUR 28,000 through EUR 50,000, and 1.73% over EUR 50,000, citing article 72(1) L.R. 10/2003.
- **Authority notes:** competent national publication register and strongest explicit year-specific confirmation located.
- **Supersession/conflict notes:** no conflict found with regional law or the current Regione page.

### SRC-LOCAL-2026-005

- **Issuer:** Regione Lombardia.
- **Title:** *Addizionale regionale all'IRPEF*.
- **Official URL:** <https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef>
- **Document type:** current official institutional guidance.
- **Publication date:** not stated; page last updated 2026-05-05.
- **Effective date:** current as accessed during fiscal year 2026.
- **Fiscal year:** 2026/current standing rule.
- **Jurisdiction:** Lombardy.
- **Access date:** 2026-08-22.
- **Precise location:** sections *Addizionale regionale all'IRPEF*, rate table, and *Riferimenti Normativi*.
- **Supported claim:** tax is owed to the region of fiscal domicile at 1 January; base is IRPEF comprehensive income net of deductible charges; the four listed rates are progressive; employers calculate/pay it for employment income.
- **Authority notes:** competent institution; useful for progressive semantics and territorial applicability.
- **Supersession/conflict notes:** no conflict found with the 2026 MEF dataset. Withholding language is outside this product's annual-liability model.

### SRC-LOCAL-2026-006

- **Issuer:** Italian Republic.
- **Title:** Decreto legislativo 28 settembre 1998, n. 360, article 1, *Istituzione di una addizionale comunale all'IRPEF*.
- **Official URL:** <https://www.comune.milano.it/de/documents/20118/566655/D.lgs%2B28%2Bsettembre%2B1998%2Bn.%2B360.pdf/c1a81e6a-b978-314d-0a6f-0e4591135d1d?download=true&t=1751898796196&version=1.0>
- **Document type:** primary national legislation, current text hosted in the Comune di Milano official legal archive.
- **Publication date:** 1998-10-16, G.U. n. 242.
- **Effective date:** standing rule, read as in force for fiscal year 2026.
- **Fiscal year:** structural rule applicable to 2026.
- **Jurisdiction:** Italy / municipalities.
- **Access date:** 2026-08-22.
- **Precise location:** article 1(3), (3-bis), and (4).
- **Supported claim:** municipalities may set the rate and an income-based exemption threshold; the base is comprehensive IRPEF income net of deductible charges; the municipal addition is due only if IRPEF is due for the same year.
- **Authority notes:** controlling primary law; the official Normattiva consolidated text should be reopened by the independent verifier.
- **Supersession/conflict notes:** the hosted PDF contains amendments; verification must ensure the text is current at the 2026 effective date.

### SRC-LOCAL-2026-007

- **Issuer:** Comune di Milano.
- **Title:** *Regolamento per l'applicazione dell'Addizionale Comunale all'Imposta sul Reddito delle Persone Fisiche*.
- **Official URL:** <https://fareimpresa.comune.milano.it/documents/20126/200621592/Regolamento%2Bper%2Bl%27applicazione%2Bdell%27Addizionale%2BComunale%2Ball%27Imposta%2Bsul%2BReddito%2Bdelle%2BPersone%2BFisiche.pdf/f5423372-46d4-c742-7cbe-4d0959865ec0?t=1613126257286>
- **Document type:** official municipal regulation, amended by Council Resolution n. 46 of 2020-09-28.
- **Publication date:** amendment approved 2020-09-28.
- **Effective date:** threshold from fiscal year 2020; rate automatically confirmed for subsequent years unless timely changed.
- **Fiscal year:** standing rule applicable to 2026, subject to supersession check.
- **Jurisdiction:** Comune di Milano.
- **Access date:** 2026-08-22.
- **Precise location:** articles 3(2)–(4), 4, 5, and 6(2)–(3).
- **Supported claim:** single 0.80% rate; automatic confirmation in following years absent a timely change; Milan fiscal domicile; base is comprehensive IRPEF income net of deductible charges; due only if IRPEF is due; no tax when base is at most EUR 23,000; above EUR 23,000 the 0.80% rate applies to the entire base.
- **Authority notes:** controlling local regulation for the Milan rate and exemption semantics.
- **Supersession/conflict notes:** the MEF municipal register does not display a 2026 row as of access; continuation is corroborated by current Comune materials, but independent verification must search for any later timely amending resolution.

### SRC-LOCAL-2026-008

- **Issuer:** Comune di Milano.
- **Title:** *Addizionale comunale IRPEF*.
- **Official URL:** <https://www.comune.milano.it/aree-tematiche/tributi/addizionale-comunale-irpef>
- **Document type:** current official institutional guidance.
- **Publication date:** not stated; page last updated 2025-11-28.
- **Effective date:** current standing guidance entering fiscal year 2026.
- **Fiscal year:** 2026/current standing rule.
- **Jurisdiction:** Comune di Milano.
- **Access date:** 2026-08-22.
- **Precise location:** *Chi deve pagare*, *Esenzioni*, *Aliquote*, and FAQ items 2–4.
- **Supported claim:** fiscal domicile at 1 January; exemption through EUR 23,000; single 0.80% rate; the exemption is explicitly not a franchise and therefore does not reduce the base once exceeded; employer withholding exists but is not modeled here.
- **Authority notes:** competent institution and clear plain-language interpretation of the local regulation.
- **Supersession/conflict notes:** the page does not label the rule “2026”; it must be read with the regulation's continuation clause and 2026 budget evidence.

### SRC-LOCAL-2026-009

- **Issuer:** Comune di Milano, Consiglio comunale.
- **Title:** *Documento Unico di Programmazione (DUP) e Bilancio di Previsione 2026–2028 — DUP 2026–2028 emendato*.
- **Official URL:** <https://www.comune.milano.it/documents/20118/5500233/01%2B-%2BDUP%2B2026-2028%2BEmendato.pdf/d661d8c6-db14-7672-6eee-0ef35697291b?download=true&t=1768816985622&version=1.0>
- **Document type:** official municipal planning/budget document approved by the Council.
- **Publication date:** Council approval announced 2025-12-19.
- **Effective date:** budget period 2026–2028.
- **Fiscal year:** 2026.
- **Jurisdiction:** Comune di Milano.
- **Access date:** 2026-08-22.
- **Precise location:** revenue discussion headed *Addizionale comunale sull'IRPEF*.
- **Supported claim:** the 2026 planning document treats the current municipal-addition discipline as a single-rate regime and notes that this avoided bracket-alignment action; the 2026 budget forecasts continuing municipal-addition revenue.
- **Authority notes:** year-specific corroboration of continuation, not a substitute for the regulation.
- **Supersession/conflict notes:** does not independently restate every calculation parameter; use with `SRC-LOCAL-2026-007` and `SRC-LOCAL-2026-008`.

### SRC-LOCAL-2026-010

- **Issuer:** Ministero dell'Economia e delle Finanze, Dipartimento delle Finanze.
- **Title:** *Addizionale comunale all'IRPEF — Aliquote applicabili — Milano (F205)*.
- **Official URL:** <https://www1.finanze.gov.it/finanze2/dipartimentopolitichefiscali/fiscalitalocale/nuova_addcomirpef/risultato.htm?anno=9999&cc=F205&pr=MI&r=1>
- **Document type:** official municipal-rate publication register.
- **Publication date:** dynamically generated register; accessed 2026-08-22.
- **Effective date:** annual rows.
- **Fiscal year:** 2020–2026 display.
- **Jurisdiction:** Comune di Milano.
- **Access date:** 2026-08-22.
- **Precise location:** Milano/F205 rows for 2026 and 2025.
- **Supported claim:** the page displays “no data” for 2026; its 2025 row records confirmation of Council Resolution n. 46/2020, a EUR 23,000 exemption, and single 0.80% rate.
- **Authority notes:** competent register. The missing 2026 row is a provenance gap, not evidence that the tax is zero or that the standing rule ceased.
- **Supersession/conflict notes:** not treated as a contradiction because the municipal regulation automatically continues the rate and official 2026 municipal planning assumes the tax continues. Independent review should determine why the 2026 row is absent and confirm no superseding resolution.

### SRC-LOCAL-2026-011

- **Issuer:** Agenzia delle Entrate.
- **Title:** *Quadro RN — Quadro RV — Dichiarazione precompilata, modello REDDITI PF 2026*.
- **Official URL:** <https://infoprecompilata.agenziaentrate.gov.it/portale/quadro-rn-quadro-rv>
- **Document type:** official filing guidance.
- **Publication date:** 2026 filing season.
- **Effective date:** return for income year 2025.
- **Fiscal year:** 2025 income; used only as current structural corroboration, not as 2026 rate evidence.
- **Jurisdiction:** Italy.
- **Access date:** 2026-08-22.
- **Precise location:** *Quadro RV — Addizionale regionale e comunale all'IRPEF*, subsections *Chi è tenuto al pagamento* and *Chi non è tenuto al pagamento*.
- **Supported claim:** regional and municipal additions are calculated only for a taxpayer whose IRPEF remains due after the specified deductions/foreign-tax credits; the instructions also expose a EUR 10.33 non-liability condition for that return year.
- **Authority notes:** competent operational guidance but for income year 2025.
- **Supersession/conflict notes:** do not carry the EUR 10.33 detail into 2026 without current-law reconstruction by the national stream and independent verifier.

## Proposed rule records

### RULE-LOCAL-2026-001 — Common base, territorial nexus, and IRPEF-due condition

- **Fiscal year / jurisdiction:** 2026; Italy / Lombardy / Milan.
- **Status:** `candidate`.
- **Calculation stage/order:** after deductible employee contributions establish the IRPEF/additional-tax base and after the national stream establishes whether IRPEF is legally due; before annual-net composition.
- **Applicability:** canonical full-year employee with fiscal domicile in Milan, Lombardy, at 1 January 2026.
- **Eligibility:** regional and municipal additions are eligible only when IRPEF is due for the same year after the deductions/credits specified by the governing statutes.
- **Exclusions:** taxpayers with no IRPEF due under the legally correct 2026 test; different 1 January fiscal domicile; income under substitute or separate taxation that does not enter comprehensive IRPEF income; excluded scenario attributes.
- **Required inputs:** 2026 comprehensive IRPEF income; deductible charges; 1 January fiscal domicile; authoritative national-stream `irpefIsDue` determination.
- **Calculation base:** `B = comprehensive IRPEF income - deductible charges recognized for IRPEF`. For the canonical single-employment-income scenario, whether `B` equals `RAL - deductible employee contributions` and at which rounding point must be reconciled with the contribution and national streams.
- **Formula:** if `irpefIsDue` is false, both additions are zero; otherwise pass common base `B` independently to the Lombardy and Milan rules.
- **Rates:** none in this common rule.
- **Brackets:** none in this common rule.
- **Thresholds:** the exact 2026 national `irpefIsDue` de-minimis boundary is a cross-stream dependency; do not assume it is a simple `netIrpef > 0` predicate.
- **Rounding behavior:** delegated to blocked `RULE-LOCAL-2026-ROUNDING`.
- **Interactions/order:** contributions can reduce `B`; employment deductions/credits determine national IRPEF and the due condition but do not reduce `B`; local additions use `B`, not net IRPEF. The two local additions are sibling calculations and have no legal dependency on each other.
- **Edge cases:** mid-year domicile changes, nonresident rules, foreign-tax credits, other income, deductible charges, substitute taxation, and an IRPEF amount around the statutory due/non-due boundary.
- **Source IDs:** `SRC-LOCAL-2026-001`, `SRC-LOCAL-2026-006`, `SRC-LOCAL-2026-011`.
- **Evidence summary:** both national statutes define the same IRPEF-derived base and require IRPEF to remain due; territorial rules select Lombardy and Milan from 1 January fiscal domicile.
- **Engineering interpretation:** represent the due condition as an explicit sourced domain fact supplied by the national calculation, not as an accidental consequence of a displayed amount.
- **Assumptions:** only employment income and ordinary employee contributions; Milan domicile at 1 January; no foreign credits or other deductible charges.
- **Unresolved questions:** exact 2026 `irpefIsDue` de-minimis semantics and the base/rounding handoff from the contribution and national streams.
- **Expected trace representation:** common base derivation, domicile date/jurisdictions, IRPEF-due gate with source, and explicit pass/fail before each addition.
- **Required tests:** `irpefIsDue=false` forces both additions to zero regardless of base; `irpefIsDue=true` delegates to each rule; domicile fixtures; reconciliation of `B` with contribution fixtures; national due-threshold minus/equal/plus fixtures once sourced.

### RULE-LOMBARDY-2026-001 — Lombardy regional additional IRPEF

- **Fiscal year / jurisdiction:** 2026; Regione Lombardia.
- **Status:** `candidate`.
- **Calculation stage/order:** apply after `RULE-LOCAL-2026-001` admits liability; calculate in parallel with the Milan addition; subtract in annual-net composition.
- **Applicability:** taxpayer fiscally domiciled in Lombardy at 1 January 2026 and within the common due condition.
- **Eligibility:** positive common base `B` and `irpefIsDue=true`.
- **Exclusions:** different regional domicile; failed common due condition; income outside the comprehensive IRPEF base; special personal regional relief outside the fixed scenario.
- **Required inputs:** common base `B`; Lombardy domicile; common due-condition result.
- **Calculation base:** `B` from `RULE-LOCAL-2026-001`.
- **Formula:** progressive marginal brackets: `min(B, 15000) × 0.0123 + min(max(B - 15000, 0), 13000) × 0.0158 + min(max(B - 28000, 0), 22000) × 0.0172 + max(B - 50000, 0) × 0.0173`, subject to the unresolved annual rounding rule.
- **Rates:** 1.23%, 1.58%, 1.72%, 1.73%.
- **Brackets:** EUR 0–15,000; over EUR 15,000–28,000; over EUR 28,000–50,000; over EUR 50,000.
- **Thresholds:** EUR 15,000; EUR 28,000; EUR 50,000, measured on `B` rather than RAL.
- **Rounding behavior:** exact decimal pre-round amount is retained; final annual-liability/base rounding is blocked by `RULE-LOCAL-2026-ROUNDING`.
- **Interactions/order:** does not reduce its own base, the Milan base, or national IRPEF; it is not calculated as a percentage of net IRPEF.
- **Edge cases:** exact bracket boundaries; common due condition false; `B <= 0`; changes to permitted regional brackets during the national transition.
- **Source IDs:** `SRC-LOCAL-2026-001`, `SRC-LOCAL-2026-002`, `SRC-LOCAL-2026-003`, `SRC-LOCAL-2026-004`, `SRC-LOCAL-2026-005`.
- **Evidence summary:** primary regional law, the 2026 MEF register, and the current Regione page align on the four rates and describe them as progressive.
- **Engineering interpretation:** “progressive” and “per scaglioni” mean each rate applies marginally to the portion of `B` in its bracket, consistent with the displayed formula. This interpretation must be independently reconstructed, not accepted from this run alone.
- **Assumptions:** no applicable special regional deductions/credits under the fixed no-dependants/no-special-circumstances scenario.
- **Unresolved questions:** final rounding and independent confirmation of marginal-bracket semantics under the 2026 transition.
- **Expected trace representation:** one trace row per occupied bracket with bracket bounds, taxable slice, rate, exact component, source, then an exact subtotal and separately identified rounding step.
- **Required tests:** base fixtures at EUR 14,999/15,000/15,001; 27,999/28,000/28,001; 49,999/50,000/50,001; empty higher brackets; due-condition false; arithmetic sum invariant.

### RULE-MILAN-2026-001 — Milan municipal additional IRPEF

- **Fiscal year / jurisdiction:** 2026; Comune di Milano.
- **Status:** `candidate`.
- **Calculation stage/order:** apply after `RULE-LOCAL-2026-001` admits liability; calculate in parallel with the Lombardy addition; subtract in annual-net composition.
- **Applicability:** taxpayer fiscally domiciled in Milano at 1 January 2026 and within the common due condition.
- **Eligibility:** `irpefIsDue=true` and common base `B > EUR 23,000`.
- **Exclusions:** `B <= EUR 23,000`; different municipal domicile; failed common due condition; special cases outside the fixed scenario.
- **Required inputs:** common base `B`; Milan domicile; common due-condition result.
- **Calculation base:** entire common base `B` when `B` exceeds EUR 23,000; this is not `B - EUR 23,000`.
- **Formula:** if `B <= 23000`, zero; otherwise `B × 0.008`, subject to the unresolved annual rounding rule.
- **Rates:** single 0.80% rate.
- **Brackets:** none; proportional single-rate tax after the exemption condition.
- **Thresholds:** EUR 23,000 inclusive exemption threshold. It is a cliff/eligibility threshold, not an allowance or franchise.
- **Rounding behavior:** exact decimal pre-round amount is retained; final annual-liability/base rounding is blocked by `RULE-LOCAL-2026-ROUNDING`.
- **Interactions/order:** does not reduce its own base, the Lombardy base, or national IRPEF; it is not calculated from net IRPEF. Crossing the threshold activates 0.80% on the whole `B`.
- **Edge cases:** `B=23,000`; first amount above threshold; due condition false even above threshold; later 2026 amending resolution; municipal domicile change.
- **Source IDs:** `SRC-LOCAL-2026-006`, `SRC-LOCAL-2026-007`, `SRC-LOCAL-2026-008`, `SRC-LOCAL-2026-009`, `SRC-LOCAL-2026-010`.
- **Evidence summary:** the standing regulation explicitly provides the rate, automatic continuation, base, IRPEF-due condition, inclusive threshold, and whole-base treatment after the threshold. Current Comune guidance restates the rule and 2026 budget material corroborates continuation.
- **Engineering interpretation:** the absence of a 2026 MEF register row is recorded as a verification finding, not converted into a zero or an automatic blocker, because the controlling regulation continues the rate absent a change and official 2026 municipal materials continue to recognize the tax.
- **Assumptions:** no timely 2026 superseding resolution exists; the independent verifier must search the original council register and MEF publication history.
- **Unresolved questions:** why the MEF register lacks a 2026 row; final annual rounding; independent confirmation of no superseding 2026 measure.
- **Expected trace representation:** exemption comparison, explicit “threshold not allowance” explanation, whole base, 0.80% rate, exact amount, source, and separately identified rounding.
- **Required tests:** common-base fixtures EUR 22,999 → 0; EUR 23,000 → 0; EUR 23,001 → exact pre-round EUR 184.008; due-condition false above threshold → 0; whole-base-not-excess invariant.

### RULE-LOCAL-2026-ORDER — Local-tax ordering and annual-net composition

- **Fiscal year / jurisdiction:** 2026; Italy / Lombardy / Milan.
- **Status:** `candidate`.
- **Calculation stage/order:** relational rule spanning the contribution, national IRPEF, local additions, and annual-net stages.
- **Applicability:** canonical scenario only.
- **Eligibility:** all upstream rules have an admissible status and provide their required outputs.
- **Exclusions:** payroll-period withholding order, advance/balance cash timing, other-income composition, or excluded personal circumstances.
- **Required inputs:** RAL; deductible employee contributions; common base `B`; gross IRPEF; employment deductions/credits; legally correct `irpefIsDue`; separate automatic relief if applicable; regional and municipal liabilities.
- **Calculation base:** not a separate tax base; composes values from their owning rules.
- **Formula:** evidence-supported dependency graph: employee contributions reduce employment income before `B`; gross IRPEF is calculated from `B`; employment deductions/credits establish national net IRPEF and the legal due condition; when that condition passes, regional and municipal additions are each calculated from the unchanged `B`; estimated annual net then subtracts employee contributions, national net IRPEF, and both local additions from RAL, with any legally separate automatic relief composed according to the national rule.
- **Rates:** none.
- **Brackets:** owned by the national, Lombardy, and Milan rules.
- **Thresholds:** owned by upstream rules; the local-tax thresholds apply to `B`, not RAL.
- **Rounding behavior:** each owning rule must publish exact and rounded values; composition is blocked until `RULE-LOCAL-2026-ROUNDING` and the cross-stream rounding contract are resolved.
- **Interactions/order:** employment deductions/credits occur before the IRPEF-due gate; they do not reduce local bases. Regional and municipal additions are parallel siblings. A UI waterfall may display them sequentially, but that display must not imply one forms the other's base. Any automatic national relief must be classified as tax reduction or separate positive transfer before annual net is composed.
- **Edge cases:** national net IRPEF at the due boundary; separate relief exceeding national tax; local threshold crossings caused by upstream contribution changes; intermediate rounding changing a threshold comparison.
- **Source IDs:** `SRC-LOCAL-2026-001`, `SRC-LOCAL-2026-003`, `SRC-LOCAL-2026-006`, `SRC-LOCAL-2026-007`, `SRC-LOCAL-2026-011` plus national/contribution sources to be reconciled by the coordinator.
- **Evidence summary:** local statutes establish a common IRPEF-derived base and an IRPEF-due gate; they do not make either local tax a deduction from the other's base or from national tax.
- **Engineering interpretation:** model a dependency graph, not merely the proposed visual sequence `net IRPEF → regional → municipal`. The two local amounts may be displayed in an order while remaining independent calculations from `B`.
- **Assumptions:** contribution and national streams provide authoritative exact values and classify automatic relief correctly.
- **Unresolved questions:** exact national `irpefIsDue` predicate, automatic-relief composition, common intermediate rounding, and whether the annual result is presented before or after any non-tax cash benefit.
- **Expected trace representation:** dependency links from contributions to `B`, from `B` to all three taxes, from national deductions to the due gate, and from all cash components to annual net.
- **Required tests:** changing only a national deduction may change the due gate but not `B`; changing employee contributions changes `B` and all base-dependent taxes; changing regional tax never changes municipal tax; annual-net arithmetic invariant.

### RULE-LOCAL-2026-ROUNDING — Annual local-tax rounding

- **Fiscal year / jurisdiction:** 2026; Italy / Lombardy / Milan.
- **Status:** `blocked`.
- **Calculation stage/order:** after exact base/rate calculation and before public annual liabilities and annual-net composition; potential earlier base-rounding is also unresolved.
- **Applicability:** all in-scope regional and municipal calculations.
- **Eligibility:** cannot activate until authoritative evidence and a human-approved estimate policy resolve the precision points.
- **Exclusions:** payroll-period rounding and individual payslip reconciliation.
- **Required inputs:** exact common base, exact bracket components, exact local liabilities, and the applicable 2026 annual-liability/declaration rules.
- **Calculation base:** unresolved whether annual filing mechanics require whole-euro `B` before calculation or only whole-euro reported liabilities; payroll certificates can retain cents, which is a different model.
- **Formula:** blocked. Do not silently choose cents, truncate, or half-up whole euros.
- **Rates:** not applicable.
- **Brackets:** not applicable.
- **Thresholds:** any EUR 0.50 tie behavior is unapproved; threshold comparisons must occur on the legally prescribed base representation.
- **Rounding behavior:** authoritative filing guidance currently available in 2026 concerns income year 2025 and displays annual return amounts in whole euros, while payroll withholding records use cents. No authoritative source located in this run completely establishes the 2026-income-year sequence and tie-breaking for this annual estimate.
- **Interactions/order:** premature rounding can change local threshold comparisons, progressive bracket slices, the IRPEF-due gate, and annual net. Exact decimal values should be retained until a verified explicit boundary.
- **Edge cases:** `.49`, `.50`, and `.51` at the base, each bracket subtotal, each local liability, and annual-net composition; negative zero; cumulative versus per-bracket rounding.
- **Source IDs:** `SRC-LOCAL-2026-011` is contextual only; the required 2026-income-year liquidation evidence is missing.
- **Evidence summary:** official sources establish annual calculation bases and rates but do not, in the evidence reopened here, fully establish a 2026 income-year annual rounding algorithm suitable for this estimator.
- **Engineering interpretation:** this is a real blocked rule, not permission to default to JavaScript or decimal-library behavior. M2 must not advertise payroll-exact rounding.
- **Assumptions:** none.
- **Unresolved questions:** base precision; component versus subtotal rounding; final liability unit; tie-breaking mode; relationship between annual-return and payroll-certificate precision.
- **Expected trace representation:** exact pre-round value, rule/mode, scale, rounded value, and source ID as a distinct trace step once resolved.
- **Required tests:** table-driven `.49/.50/.51` fixtures at every approved rounding point; no early-rounding invariant; reconciliation against official examples/software once the relevant 2026-income-year material exists.

### RULE-LOCAL-2026-WITHHOLDING — Payroll timing, advance, and balance

- **Fiscal year / jurisdiction:** 2026; Italy / Lombardy / Milan.
- **Status:** `excluded`.
- **Calculation stage/order:** no calculation stage in the annual-liability product.
- **Applicability:** would apply to payroll cash timing, not to this annual estimate.
- **Eligibility:** none in V1.
- **Exclusions:** regional withholding installments; municipal 30% advance and balance; employer conguaglio timing; exact thirteenth/fourteenth payslip effects.
- **Required inputs:** none because excluded.
- **Calculation base:** not modeled.
- **Formula:** not modeled.
- **Rates:** not modeled.
- **Brackets:** not modeled.
- **Thresholds:** not modeled.
- **Rounding behavior:** payroll-period rounding is not imported into the annual estimator by implication.
- **Interactions/order:** exclusion does not remove annual regional or municipal liability; it removes only payment timing and payslip simulation.
- **Edge cases:** employment termination, multiple employers, late conguaglio, municipal advance/saldo, and changed domicile during a payroll year.
- **Source IDs:** `SRC-LOCAL-2026-005`, `SRC-LOCAL-2026-008`.
- **Evidence summary:** official regional and municipal pages describe employer withholding and municipal advance/balance, but the product contract explicitly models annual liability only.
- **Engineering interpretation:** show a limitation that annual modeled liability and average installment are not an exact payslip schedule.
- **Assumptions:** none.
- **Unresolved questions:** none for V1; scope expansion would require new approval and research.
- **Expected trace representation:** no withholding trace; methodology states the exclusion.
- **Required tests:** contract test that no advance/balance or per-payslip outputs appear in the annual domain result.

## Boundary fixtures and expected exact intermediates

These are specifications for later executable tests. `B` is the common local-tax base; it is intentionally not reverse-mapped to RAL until the upstream contribution/base rule is reconciled.

| Rule | Base fixture | Expected exact result before the blocked rounding step |
| --- | ---: | ---: |
| Lombardy | EUR 14,999 | EUR 184.4877 |
| Lombardy | EUR 15,000 | EUR 184.5000 |
| Lombardy | EUR 15,001 | EUR 184.5158 |
| Lombardy | EUR 27,999 | EUR 389.8842 |
| Lombardy | EUR 28,000 | EUR 389.9000 |
| Lombardy | EUR 28,001 | EUR 389.9172 |
| Lombardy | EUR 49,999 | EUR 768.2828 |
| Lombardy | EUR 50,000 | EUR 768.3000 |
| Lombardy | EUR 50,001 | EUR 768.3173 |
| Milan | EUR 22,999 | EUR 0 |
| Milan | EUR 23,000 | EUR 0 |
| Milan | EUR 23,001 | EUR 184.008 |

Additional fixtures:

- For any positive `B`, `irpefIsDue=false` must yield both local additions as zero.
- For `B > EUR 23,000`, Milan must equal `B × 0.008`, not `(B - 23000) × 0.008`.
- Sum of Lombardy bracket components must equal the exact Lombardy subtotal; no bracket component may be rounded independently before an approved rule says so.
- Changing regional-tax output alone must not change municipal-tax output, and vice versa.
- Once rounding is resolved, add `.49`, `.50`, and `.51` fixtures around every approved precision boundary and repeat threshold fixtures using the legally prescribed base representation.

## Cross-stream reconciliation required

1. **Contribution-to-base link:** the INPS stream must establish which employee contributions are deductible from employment income and whether the annual contribution result is rounded before it forms `B`.
2. **IRPEF-due predicate:** the national stream must establish the exact 2026 due/non-due test, including any de-minimis amount, rather than exposing only a displayed `netIrpef` number.
3. **Employment deductions and relief:** employment deductions affect national net IRPEF and therefore the local due gate, but not the local base. Any automatic 2026 relief must be classified as a tax credit/deduction or separate cash component; that classification controls annual-net ordering.
4. **Common rounding contract:** the coordinator must not independently round contribution, taxable base, national tax, local taxes, and annual net without a single reconciled policy backed by evidence or an explicitly approved estimate assumption.

## Verification performed

- Reopened the consolidated Lombardy regional law at article 72 and the current Regione institutional page.
- Retrieved the official MEF 2026 regional CSV directly and filtered the Lombardy rows; confirmed record `2179`, publication date 2026-01-28, and all four rate/band entries.
- Reopened the Comune di Milano regulation and current tax page; checked the whole-base threshold wording and automatic continuation clause.
- Inspected the official MEF Milano/F205 register and preserved its missing 2026 row as an unresolved provenance fact.
- Located official 2026–2028 Comune budget/DUP material as year-specific continuation corroboration.
- Reopened current Agenzia filing guidance only for structural comparison and explicitly limited it to income year 2025.
- Independently recalculated all exact boundary-fixture intermediates from the proposed formulas.
- Checked repository and Git state before writing and confirmed the authorized RUN-007 path did not exist.

This is researcher self-checking, not independent fiscal verification.

## Capabilities and side effects

- **Capabilities used:** read-only official web search/opening; direct HTTPS retrieval of the official MEF CSV in memory; local read-only PowerShell/Git inspection; one repository write through the patch mechanism.
- **MCP/external services:** no MCP server, authenticated account, calculator service, fiscal API, or opaque external computation was used.
- **External side effects:** none. No message, account, remote repository, publication, or official-system mutation occurred.
- **Repository side effects:** this run record only.

## Findings

- Lombardy's 2026 four progressive brackets are supported consistently by primary regional law, the explicit 2026 MEF register, and the current Regione page.
- Milan's standing rule is a single 0.80% rate with an inclusive EUR 23,000 exemption that is not a franchise; once exceeded, the whole base is taxed.
- Both additions share the IRPEF comprehensive-income base net of deductible charges and are contingent on IRPEF being due, but neither is calculated from the amount of net IRPEF.
- The two local additions are parallel calculations. A sequential waterfall is a presentation choice, not a fiscal dependency.
- Exact 2026-income-year annual rounding remains genuinely blocked; available 2026 filing material concerns income year 2025 and cannot silently become the 2026 rule.
- The missing 2026 MEF municipal row is a material verification note. It does not justify zero tax because the standing regulation continues the rate absent change and current Comune 2026 materials continue to recognize the tax.

## Human approval status

No fiscal rule, rate, interpretation, source record, or rounding policy in this run is human-approved or verified. The already approved industrial/CIGS employer archetype only fixes an upstream scenario attribute.

## Unresolved issues

1. Resolve `RULE-LOCAL-2026-ROUNDING` before executable fiscal logic or final fixtures are approved.
2. Independently confirm no timely 2026 Milan amendment and explain/reconcile the absent MEF 2026 municipal row.
3. Reconcile the contribution-to-base handoff, 2026 IRPEF-due predicate, and automatic-relief ordering with the other streams.
4. Have the independent Claude fiscal verifier reopen every original and test the marginal-bracket interpretation.

## Recommended next action

The M1 coordinator should integrate the supported records as `candidate`, retain rounding as `blocked`, reconcile the four cross-stream items, and then submit the complete candidate catalog and originals to the independent Claude fiscal verifier. No local rule may move to `verified` before that review, resolution of material findings, and explicit human approval.
