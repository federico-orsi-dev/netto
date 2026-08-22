---
run_id: RUN-2026-08-22-002
date: 2026-08-22
tool: codex
role: fiscal-researcher
task: fiscal-research-inps-2026
status: completed
owner: codex
reviewer: claude
related_rules:
  - RULE-INPS-2026-001
  - RULE-INPS-2026-002
  - RULE-INPS-2026-003
  - RULE-INPS-2026-004
  - RULE-INPS-2026-005
  - RULE-INPS-2026-006
  - RULE-INPS-2026-007
related_adrs:
  - ADR-0002
  - ADR-0003
  - ADR-0004
commit: null
---

# 2026 INPS fiscal research

## Objective

Establish the candidate 2026 employee social-security profile for the approved annual gross-to-net estimate: a private-sector, non-executive, permanent, full-year employee in Milan, with whole-euro RAL from EUR 10,000 through EUR 120,000. Determine the pension scheme assumption, contribution base, employee rates, additional 1% contribution, first pensionable band, applicable ceiling, classification dependencies, and rounding implications. Escalate any material result that the approved scenario cannot determine.

This run is candidate research only. It does not verify a rule and does not authorize executable fiscal logic.

## Acceptance criteria

- Reopen authoritative originals rather than relying on model memory, search snippets, or calculators.
- Give every proposed source and rule a stable ID and the complete repository-required schema.
- Separate source evidence from the annual-estimate engineering interpretation.
- Cover every INPS threshold within or adjacent to the supported range with boundary fixtures.
- Treat unknown employer or insurance attributes as blockers when they materially change the result.
- Write only this run record.

## Canonical context consulted

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/domain/fiscal-rules-2026.md`
- `docs/domain/source-register-2026.md`
- `docs/ai-engineering/contracts/fiscal-research-and-verification.md`
- `docs/ai-engineering/contracts/run-record.md`

Repository and Git state were inspected before writing. The branch was `m1/verified-fiscal-foundation`, with the M1 bootstrap files staged and no existing run record at this path.

## Material capabilities and side effects

- Used read-only web search/open against official legal and institutional sources, plus local read-only PowerShell/Git inspection.
- Used the repository write capability only to create this authorized run record.
- No MCP server, authenticated account, opaque calculator, external API, package installation, remote Git operation, or external mutation was used.
- External side effects: ordinary unauthenticated HTTP requests to public official websites only.

## Proposed source records

### SRC-INPS-2026-006

- **Issuer:** Istituto Nazionale della Previdenza Sociale (INPS), Direzione Centrale Entrate
- **Title:** Circolare numero 6 del 30-01-2026 — Determinazione per l'anno 2026 del limite minimo di retribuzione giornaliera e aggiornamento degli altri valori per il calcolo di tutte le contribuzioni dovute in materia di previdenza e assistenza sociale per la generalità dei lavoratori dipendenti
- **Official URL:** https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.01.circolare-numero-6-del-30-01-2026_15151.html
- **Document type:** official administrative circular
- **Publication date:** 2026-01-30
- **Effective date:** values applicable from 2026-01-01
- **Fiscal year:** 2026
- **Jurisdiction:** Italy; INPS private and public employee schemes as specified
- **Access date:** 2026-08-22
- **Precise location:** paragraphs 1, 5, and 6; in particular “Minimali di retribuzione giornaliera,” “Quota di retribuzione soggetta all'aliquota aggiuntiva dell'1%,” and “Massimale annuo della base contributiva e pensionabile”
- **Supported claim:** the general 2026 daily minimum is EUR 58.13; the first annual pensionable band is EUR 56,224 and its monthly reference is EUR 4,685; the additional employee contribution is 1% on the portion above that band where the employee pension rate is below 10%; the 2026 annual ceiling is EUR 122,295 for workers first enrolled in compulsory pension insurance from 1996 or who opt into the contribution system.
- **Authority notes:** competent institution's year-specific operational instruction; it expressly cites article 3-ter of Decree-Law 384/1992 and article 2(18) of Law 335/1995.
- **Supersession/conflict notes:** year-specific values supersede 2025 thresholds. The page notes rectifications are present; the independent verifier must confirm the downloaded current attachment/rettifica and not rely on cached text.

### SRC-LEGAL-DL384-1992-ART3TER

- **Issuer:** Italian Republic; official Ministry of Economy and Finance legal database
- **Title:** Decreto-legge 19 settembre 1992, n. 384, articolo 3-ter — Aliquota contributiva aggiuntiva, as converted by Legge 14 novembre 1992, n. 438
- **Official URL:** https://def.finanze.it/DocTribFrontend/getAttoNormativoDetail.do?ACTION=getArticolo&articolo=Articolo+3+ter&codiceOrdinamento=200000300000300&id=%7B2E278145-81A8-4B7C-9ED2-7A9CAF61DA6C%7D
- **Document type:** primary legislation, official consolidated article display
- **Publication date:** Decree-Law published 1992-09-19; conversion law 1992-11-14
- **Effective date:** additional contribution from 1993-01-01
- **Fiscal year:** standing rule, applied with the 2026 threshold in SRC-INPS-2026-006
- **Jurisdiction:** Italy
- **Access date:** 2026-08-22
- **Precise location:** article 3-ter, first sentence
- **Supported claim:** employee pension regimes with an employee rate below 10% impose an additional one percentage point on remuneration exceeding the first pensionable band.
- **Authority notes:** primary legal rule. The year-specific monetary band is supplied by INPS.
- **Supersession/conflict notes:** no conflict identified; independent verification must confirm current consolidation.

### SRC-LEGAL-L335-1995-ART2-C18

- **Issuer:** Italian Republic; Normattiva
- **Title:** Legge 8 agosto 1995, n. 335 — Riforma del sistema pensionistico obbligatorio e complementare
- **Official URL:** https://www.normattiva.it/eli/id/1995/08/16/095G0382/CONSOLIDATED/20230608
- **Document type:** primary legislation, consolidated text
- **Publication date:** 1995-08-16
- **Effective date:** article 2(18) applies to workers first enrolled from 1996-01-01 and eligible optants
- **Fiscal year:** standing rule, applied with the 2026 ceiling in SRC-INPS-2026-006
- **Jurisdiction:** Italy
- **Access date:** 2026-08-22
- **Precise location:** article 2, paragraph 18, second sentence
- **Supported claim:** an annual contribution and pension base ceiling applies to workers without compulsory pension seniority before 1996 and to eligible workers opting into the contribution system; the ceiling is indexed.
- **Authority notes:** primary legal basis.
- **Supersession/conflict notes:** later interpretive and administrative instructions refine eligibility; current year amount comes from SRC-INPS-2026-006. The insurance-history test must be independently reopened.

### SRC-LEGAL-DLGS314-1997-ART6

- **Issuer:** Italian Republic; Normattiva
- **Title:** Decreto legislativo 2 settembre 1997, n. 314 — Determinazione del reddito da lavoro dipendente ai fini contributivi
- **Official URL:** https://www.normattiva.it/uri-res/N2Ls?urn%3Anir%3A%3A%3A1997%3B314~art6=
- **Document type:** primary legislation
- **Publication date:** 1997-09-19
- **Effective date:** 1998-01-01
- **Fiscal year:** standing rule, applicable in 2026
- **Jurisdiction:** Italy
- **Access date:** 2026-08-22
- **Precise location:** article 6, replacing article 12 of Law 153/1969; especially substituted article 12 paragraphs 1–4
- **Supported claim:** contribution income is employment income matured in the reference period, broadly aligned with the TUIR employment-income base but subject to enumerated contribution-specific inclusions, exclusions, and minimum/maximum rules.
- **Authority notes:** primary legal basis for the contribution base; it does not state that a user-entered “RAL” is automatically identical to the legal base.
- **Supersession/conflict notes:** cross-references use historical TUIR article numbering; independent verification should read the current consolidated cross-references.

### SRC-INPS-2024-101

- **Issuer:** INPS, Direzione Centrale Entrate and other central directorates
- **Title:** Circolare numero 101 del 29-11-2024
- **Official URL:** https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2024.11.circolare-numero-101-del-29-11-2024_14714.html
- **Document type:** official administrative circular
- **Publication date:** 2024-11-29
- **Effective date:** standing FPLD rate statement, applicable until changed
- **Fiscal year:** standing rule corroborated for 2026 by SRC-INPS-2026-006 and absence of a 2026 general rate change
- **Jurisdiction:** Italy; FPLD
- **Access date:** 2026-08-22
- **Precise location:** paragraph 1, final two paragraphs before “Istruzioni operative”
- **Supported claim:** for the generality of FPLD members, IVS is 33% of contribution income: 23.81% employer and 9.19% employee; the additional employee 1% also applies above the first pensionable band.
- **Authority notes:** competent institution. The circular's immediate subject is magistrates joining FPLD, but the cited sentence expressly states the rate for the generality of FPLD members.
- **Supersession/conflict notes:** no 2026 source changing the general 9.19% employee FPLD share was found. Independent verifier must confirm this negative check.

### SRC-INPS-CLASSIFICATION-2025

- **Issuer:** INPS
- **Title:** Messaggio numero 3206 del 27-10-2025 — Manuale di classificazione previdenziale ATECO 2025
- **Official URL:** https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2025.10.messaggio-numero-3206-del-27-10-2025_15058.html
- **Document type:** official administrative message
- **Publication date:** 2025-10-27
- **Effective date:** ATECO 2025 classification operational from 2025-04-01
- **Fiscal year:** applicable in 2026
- **Jurisdiction:** Italy; private employers registered with INPS
- **Access date:** 2026-08-22
- **Precise location:** paragraphs describing ATECO 2025, Codice Statistico Contributivo (CSC), and classification of employer positions
- **Supported claim:** employer activity and the resulting CSC are required to classify the employer for contribution purposes; contribution characteristics can also depend on authorization codes.
- **Authority notes:** competent institution's current classification instructions.
- **Supersession/conflict notes:** supersedes the ATECO 2007 classification manual for current classifications.

### SRC-LEGAL-DLGS148-2015-ART23

- **Issuer:** Italian Republic; Ministry of Labour and Social Policies
- **Title:** Decreto legislativo 14 settembre 2015, n. 148 — Disposizioni per il riordino della normativa in materia di ammortizzatori sociali
- **Official URL:** https://www.lavoro.gov.it/sites/default/files/documenti-e-norme/normative/Documents/2015/Decreto_legislativo_14_settembre_2015_n.148.pdf
- **Document type:** primary legislation, official Ministry PDF
- **Publication date:** 2015-09-23
- **Effective date:** 2015-09-24, as subsequently amended
- **Fiscal year:** standing rule, applicable in 2026 as amended
- **Jurisdiction:** Italy
- **Access date:** 2026-08-22
- **Precise location:** article 23(1); scope must be read with current articles 20 and 20(3-bis)
- **Supported claim:** employers/workers within CIGS scope owe 0.90% of contribution income, split 0.60% employer and 0.30% employee.
- **Authority notes:** primary source; official PDF is the original 2015 text, so current scope must be checked in consolidated law and current INPS instructions.
- **Supersession/conflict notes:** scope was expanded from 2022. Use with SRC-INPS-2022-076; do not treat the original PDF alone as current scope proof.

### SRC-INPS-2022-076

- **Issuer:** INPS, Direzione Centrale Entrate and Direzione Centrale Ammortizzatori Sociali
- **Title:** Circolare numero 76 del 30-06-2022 — Riordino della normativa in materia di ammortizzatori sociali
- **Official URL:** https://www.inps.it/content/dam/inps-site/it/scorporati/circolari-e-messaggi/2022/06/Circolare_13870/Allegati/15008_Circolare-numero-76-del-30-06-2022.pdf
- **Document type:** official administrative circular
- **Publication date:** 2022-06-30
- **Effective date:** revised scope from 2022-01-01; temporary 2022 rate reductions have expired
- **Fiscal year:** standing scope and ordinary rates applicable in 2026, excluding expressly temporary 2022 reductions
- **Jurisdiction:** Italy
- **Access date:** 2026-08-22
- **Precise location:** paragraphs 4, 4.1, and 5; PDF pages 7–12
- **Supported claim:** CIGS scope depends on sector/fund coverage and, for general extended scope, an average of more than 15 employees; ordinary CIGS financing is 0.90%, including 0.30% employee. FIS scope and contributions depend on whether other wage-support schemes/funds cover the employer and on headcount.
- **Authority notes:** competent operational interpretation following Law 234/2021.
- **Supersession/conflict notes:** the special 2022 reductions in paragraphs 4.2 and 5.2 expired on 2022-12-31 and must not be used for 2026.

### SRC-INPS-FIS-CURRENT

- **Issuer:** INPS
- **Title:** Fondo d'Integrazione Salariale (FIS)
- **Official URL:** https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.50262.fondo-d-integrazione-salariale-fis-.html
- **Document type:** official institutional service/explanation page
- **Publication date:** not stated; live page accessed 2026-08-22
- **Effective date:** current page
- **Fiscal year:** standing rule relevant in 2026
- **Jurisdiction:** Italy; employers within FIS scope
- **Access date:** 2026-08-22
- **Precise location:** “Quanto spetta / Come funziona,” contribution paragraphs
- **Supported claim:** FIS is funded on monthly contribution income; two thirds are employer-paid and one third employee-paid. The ordinary total rate shown is 0.50% for employers averaging up to five employees and 0.80% for employers above five.
- **Authority notes:** competent institution; primary administrative explanation.
- **Supersession/conflict notes:** the page does not expose the conditional reduction effective from 2025 for eligible up-to-five employers; use SRC-INPS-2025-005 for that overlay.

### SRC-INPS-2025-005

- **Issuer:** INPS, Direzione Centrale Entrate and Direzione Centrale Ammortizzatori Sociali
- **Title:** Circolare numero 5 del 20-01-2025 — Modifiche alla disciplina contributiva in materia di integrazione salariale e fondi di solidarietà
- **Official URL:** https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2025.01.circolare-numero-5-del-20-01-2025_14781.html
- **Document type:** official administrative circular
- **Publication date:** 2025-01-20
- **Effective date:** 2025-01-01
- **Fiscal year:** standing rule relevant in 2026
- **Jurisdiction:** Italy; FIS and specified bilateral funds
- **Access date:** 2026-08-22
- **Precise location:** paragraphs 1 and 2.1
- **Supported claim:** qualifying employers averaging up to five employees receive a 40% reduction of the 0.50% FIS ordinary rate, to 0.30%, after at least 24 months without an integration-wage application measured from the end of prior use; the ordinary contribution remains split two thirds/one third.
- **Authority notes:** competent year-of-implementation instruction.
- **Supersession/conflict notes:** no sunset was identified. Independent verification must confirm continued operation and eligibility in 2026.

### SRC-INPS-1998-245

- **Issuer:** INPS, Consiglio di Amministrazione / Direzione Centrale
- **Title:** Circolare numero 245 del 07-12-1998, including Deliberazione n. 1123 del 17-11-1998
- **Official URL:** https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.1998.12.circolare-numero-245-del-7-12-1998_4670.html
- **Document type:** official administrative circular and attached institutional resolution
- **Publication date:** 1998-12-07; resolution 1998-11-17
- **Effective date:** euro reporting regime
- **Fiscal year:** standing reporting rule requiring current operational confirmation
- **Jurisdiction:** Italy; INPS employer declarations except domestic work as specified
- **Access date:** 2026-08-22
- **Precise location:** object and attached Deliberazione n. 1123 operative paragraph
- **Supported claim:** contribution-remuneration and contribution/debit/credit amounts exposed in periodic employer declarations are rounded to whole euros, down below EUR 0.50 and up from EUR 0.50.
- **Authority notes:** institutional reporting rule, not by itself a complete rule for the employee deduction shown on an individual payslip or for an annual RAL estimator.
- **Supersession/conflict notes:** modern UniEmens technical elements may accept cents in some fields. Independent verifier must establish the current field-level rule before using this as a calculation rounding rule.

### SRC-INPS-2025-156

- **Issuer:** INPS, Direzione Centrale Entrate
- **Title:** Circolare numero 156 del 30-12-2025 — Conguaglio contributivo di fine anno 2025
- **Official URL:** https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2025.12.circolare-numero-156-del-30-12-2025_15125.html
- **Document type:** official administrative circular
- **Publication date:** 2025-12-30
- **Effective date:** 2025 year-end operations; evidences standing annual-conguaglio mechanics
- **Fiscal year:** mechanics applicable as standing guidance; numerical threshold is 2025 only
- **Jurisdiction:** Italy; private-sector employee reporting
- **Access date:** 2026-08-22
- **Precise location:** paragraphs 4, 4.1, 5, and 5.1
- **Supported claim:** the 1% contribution and eligible annual ceiling are managed cumulatively across the civil year and corrected at year-end/termination, including multiple sequential employers; the 1% is an annual-band liability despite monthly withholding mechanics.
- **Authority notes:** competent institution. Only mechanics, not its 2025 monetary values, are proposed for reuse.
- **Supersession/conflict notes:** a 2026 year-end circular may later refine reporting mechanics. The annual estimator can use annual liability only if it clearly disclaims payslip timing.

## Proposed rule records

### RULE-INPS-2026-001 — Canonical contribution base from RAL

- **Year:** 2026
- **Jurisdiction:** Italy / INPS / FPLD
- **Status:** `candidate`
- **Calculation stage/order:** 10 — derive annual contribution base before employee contributions and IRPEF taxable income
- **Applicability:** approved cash-only annual scenario in which RAL is fixed gross employment remuneration, all included cash is ordinarily subject to employee social-security contributions, and TFR/benefits/bonuses/exempt items are absent.
- **Eligibility:** full-year subordinate employment; canonical profile must be confirmed as FPLD and not a special pension fund.
- **Exclusions:** TFR, employer-paid contributions, benefits in kind, expense reimbursements, excluded welfare, exceptional pay, multiple employers, contribution relief, and contribution-base components not represented by RAL.
- **Required inputs:** whole-euro RAL; canonical profile marker; confirmation that entered RAL is valid ordinary contribution-subject cash remuneration.
- **Calculation base:** `annualContributionBase = RAL` for this product envelope.
- **Formula:** identity mapping under the approved product assumption. This is an engineering interpretation of the product input, not a verbatim legal formula.
- **Rates/brackets/thresholds:** none; separate minimum and maximum rules may constrain the legal base.
- **Rounding:** input is already restricted to whole euros; no additional base rounding in the annual model. Exact payroll-period rounding is governed by RULE-INPS-2026-007.
- **Interactions/order:** employee IVS and applicable supplemental employee contributions use this base; total deductible employee contributions reduce the later IRPEF employment-income base.
- **Edge cases:** unlawful/under-minimum pay, part-time hours, mid-year work, non-cash benefits, or other contribution income invalidate the identity assumption.
- **Source IDs:** SRC-LEGAL-DLGS314-1997-ART6; SRC-INPS-2026-006
- **Evidence summary:** law defines a broad employment contribution-income base with specific derogations and minima; it does not define user-entered RAL. The approved product envelope removes the common deviations.
- **Engineering interpretation:** use RAL as the annual contribution base only because the product explicitly defines it as ordinary contribution-subject cash pay and disclaims payroll-like simulation.
- **Assumptions:** one employer; full civil year; no omitted contribution income; valid contractual remuneration; no special relief.
- **Unresolved questions:** human/independent reviewer must confirm that the product's RAL contract is sufficient to exclude minimum-base uplift at low RAL.
- **Expected trace representation:** “Imponibile contributivo stimato” with input RAL, the cash-only assumption, identity formula, and links to the base-law and scope statement.
- **Required tests/boundary fixtures:** EUR 10,000, EUR 10,001, EUR 56,223, EUR 56,224, EUR 56,225, EUR 119,999, and EUR 120,000 all map identically; installment selector never changes the annual base; invalid outside-range values are rejected outside the fiscal engine.

### RULE-INPS-2026-002 — General FPLD employee IVS share

- **Year:** 2026
- **Jurisdiction:** Italy / INPS / FPLD
- **Status:** `candidate`
- **Calculation stage/order:** 20 — base employee pension contribution
- **Applicability:** non-agricultural ordinary worker enrolled in the general FPLD, not an apprentice and not in a substitute/exclusive/special fund.
- **Eligibility:** the canonical employment profile must explicitly adopt general FPLD treatment.
- **Exclusions:** executives where a different fund/rate applies; agricultural, domestic, apprenticeship, entertainment/sport special funds, sector-specific pension funds, contribution relief, and pension-accrual waiver incentives.
- **Required inputs:** annual contribution base; FPLD profile.
- **Calculation base:** annual pension contribution base after any applicable ceiling.
- **Formula:** `baseEmployeeIVS = pensionContributionBase × 0.0919`.
- **Rates/brackets/thresholds:** 9.19% employee share; the total IVS rate is 33%, with 23.81% employer share outside product scope.
- **Rounding:** unresolved annual-estimate policy in RULE-INPS-2026-007; retain exact decimal internally until that policy is approved.
- **Interactions/order:** additional 1% is separate, not included in 9.19%; CIGS/FIS/bilateral-fund employee amounts are separate under RULE-INPS-2026-005.
- **Edge cases:** the general rate is not the complete employee contribution burden for every private employer; profile classification can add employee-paid wage-support contributions.
- **Source IDs:** SRC-INPS-2024-101; SRC-INPS-2026-006; SRC-INPS-CLASSIFICATION-2025
- **Evidence summary:** INPS expressly identifies 9.19% as the employee share for the generality of FPLD members and separately identifies the 1% band contribution.
- **Engineering interpretation:** model 9.19% as the FPLD pension component, never label it “all employee INPS contributions” unless RULE-INPS-2026-005 is resolved.
- **Assumptions:** no employee-specific relief or waiver; pension base equals annual contribution base within the supported range.
- **Unresolved questions:** no rate issue for the FPLD component itself; the unresolved complete-profile issue is isolated in RULE-INPS-2026-005.
- **Expected trace representation:** component “Contributi pensionistici IVS (quota lavoratore)” with base, 9.19%, multiplication, amount, FPLD assumption, and source.
- **Required tests/boundary fixtures:** raw exact amounts before display rounding: EUR 10,000 → EUR 919; EUR 56,224 → EUR 5,166.9856; EUR 120,000 → EUR 11,028. Monotonicity and exact proportionality hold until any ceiling.

### RULE-INPS-2026-003 — Additional employee IVS contribution above first pensionable band

- **Year:** 2026
- **Jurisdiction:** Italy / INPS / FPLD
- **Status:** `candidate`
- **Calculation stage/order:** 30 — after base IVS, before total deductible employee contributions
- **Applicability:** employee pension schemes whose employee rate is below 10%; applies to the general 9.19% FPLD profile.
- **Eligibility:** annual pensionable remuneration above EUR 56,224.
- **Exclusions:** no amount at or below EUR 56,224; a regime whose employee pension rate is not below 10%; amount above an applicable pension-base ceiling.
- **Required inputs:** annual pension contribution base; employee pension rate/profile; ceiling eligibility if the engine ever supports income above its present range.
- **Calculation base:** pensionable remuneration above EUR 56,224; capped at EUR 122,295 only for workers eligible for that annual ceiling.
- **Formula:** within the approved RAL range, `additionalIVS = max(0, annualPensionBase - 56_224) × 0.01`. Generalized: `max(0, min(annualPensionBase, applicableCeilingOrInfinity) - 56_224) × 0.01`.
- **Rates/brackets/thresholds:** 1%; first pensionable band EUR 56,224 annually; operational monthly reference EUR 4,685.
- **Rounding:** monthly payroll withholding uses a monthly reference and year-end conguaglio; the annual estimator should calculate final annual liability, not simulate installments. Final rounding remains governed by RULE-INPS-2026-007.
- **Interactions/order:** add to base IVS; include in employee social-security deduction before IRPEF taxable income. A 12/13/14 display selector must never alter it.
- **Edge cases:** sequential or simultaneous employers require cumulative information and conguaglio; out of scope. Irregular monthly pay can change withholding timing but not the final annual band basis after conguaglio.
- **Source IDs:** SRC-LEGAL-DL384-1992-ART3TER; SRC-INPS-2026-006; SRC-INPS-2025-156
- **Evidence summary:** primary law supplies the 1% and eligibility test; INPS supplies the 2026 band and confirms annual/monthly-conguaglio operation.
- **Engineering interpretation:** use the annual post-conguaglio formula, visibly described as an annual estimate. Do not divide the band by 12, 13, or 14 in the domain result.
- **Assumptions:** one employer; full year; base rate 9.19%; annual contribution base is RAL.
- **Unresolved questions:** exact display rounding only.
- **Expected trace representation:** “Contributo IVS aggiuntivo 1%” with annual base, exempt band, excess portion, 1%, result, single-employer assumption, and source.
- **Required tests/boundary fixtures:** EUR 56,223 → zero; EUR 56,224 → zero; EUR 56,225 → EUR 0.01; EUR 120,000 → EUR 637.76. Also prove installment-count invariance and non-negativity.

### RULE-INPS-2026-004 — Annual pension contribution-base ceiling

- **Year:** 2026
- **Jurisdiction:** Italy / INPS / eligible contribution-system workers
- **Status:** `candidate`
- **Calculation stage/order:** 15 — constrain pension contribution base before RULE-INPS-2026-002 and RULE-INPS-2026-003
- **Applicability:** workers first enrolled in compulsory pension insurance on/after 1996-01-01 without pre-1996 seniority, plus qualifying workers who validly opt into the contribution calculation system.
- **Eligibility:** insurance-history or election status.
- **Exclusions:** workers with pre-1996 compulsory pension seniority who have not made a qualifying option.
- **Required inputs:** annual contribution base; first compulsory pension enrollment/seniority; valid contribution-system option.
- **Calculation base:** annual pension contribution base.
- **Formula:** eligible profile: `pensionContributionBase = min(annualContributionBase, 122_295)`; ineligible profile: no Law 335/1995 ceiling.
- **Rates/brackets/thresholds:** 2026 ceiling EUR 122,295; not monthly apportionable.
- **Rounding:** threshold is a whole-euro official value.
- **Interactions/order:** also caps the base of the additional 1% pension contribution for eligible workers; “minor” contributions can have different treatment above the pension ceiling and cannot be inferred from this rule.
- **Edge cases:** multiple concurrent employers; incorrect first-enrollment declaration; option status; salary above the product maximum.
- **Source IDs:** SRC-LEGAL-L335-1995-ART2-C18; SRC-INPS-2026-006
- **Evidence summary:** law defines eligibility and INPS publishes EUR 122,295 for 2026.
- **Engineering interpretation:** preserve the rule in the versioned ruleset, but it is a no-op for every supported RAL because EUR 120,000 is below EUR 122,295. Therefore unknown insurance history does not change any supported output.
- **Assumptions:** annual contribution base does not exceed RAL within scope.
- **Unresolved questions:** none material within the approved range; insurance history becomes blocking if the maximum RAL expands beyond EUR 122,295.
- **Expected trace representation:** normally an assumption/methodology note (“Massimale 2026 non raggiunto”); expose an active cap step only when a future supported input reaches it.
- **Required tests/boundary fixtures:** supported maximum EUR 120,000 remains uncapped for either insurance-history branch. Configuration tests adjacent to the legal threshold, outside the present input envelope: EUR 122,294, EUR 122,295, EUR 122,296. The third must cap only for an eligible profile.

### RULE-INPS-2026-005 — Employee-paid CIGS/FIS/bilateral-fund contribution

- **Year:** 2026
- **Jurisdiction:** Italy / INPS / private-employer wage-support schemes
- **Status:** `blocked`
- **Calculation stage/order:** 40 — after base/additional IVS, before total employee social-security deduction
- **Applicability:** varies by employer sector, INPS classification, fund coverage, average employee count, and sometimes fund-use history.
- **Eligibility:** cannot be resolved from “private-sector, non-executive, permanent employee.”
- **Exclusions:** no universal exclusion is defensible from the approved scenario.
- **Required inputs:** employer actual activity/ATECO 2025; CSC; authorization codes; CIGO/CIGS scope; bilateral-fund coverage; average employee count in the relevant prior semester; for the reduced small-employer FIS rate, qualifying absence of FIS applications for at least 24 months; worker qualification where a fund excludes/includes it.
- **Calculation base:** monthly contribution income, annualized only under an explicit estimate policy.
- **Formula/rate variants evidenced:**
  - CIGS: contribution total 0.90%, of which employee 0.30%, for workers/employers in scope.
  - FIS up to five employees: total 0.50%, employee one third; qualifying reduction from 2025 lowers total to 0.30%, employee one third.
  - FIS above five employees: total 0.80%, employee one third.
  - Employers above 15 can be subject to CIGS in addition to FIS when they are not covered by a bilateral fund and fall within the extended CIGS scope.
  - Bilateral-fund ordinary rates and coverage differ by sector and fund; no single rate was derived.
- **Rates/brackets/thresholds:** employer-count thresholds of up to/above 5 and above 15; 24-month no-application condition for the small-employer FIS reduction. Operational rounded percentage displays (for example 0.17%/0.27%) must not replace the exact legal one-third split without verifier confirmation.
- **Rounding:** scheme contributions are payroll-period based; blocked together with RULE-INPS-2026-007 for annual exactness.
- **Interactions/order:** these are employee deductions and reduce estimated net and the later IRPEF taxable base. They are separate from the 9.19% IVS component and the additional 1% IVS.
- **Edge cases:** a single employer can change headcount band; a new or used FIS position can lose/gain the reduction; special funds replace FIS; some CIGS scopes ignore or use different headcount rules.
- **Source IDs:** SRC-INPS-CLASSIFICATION-2025; SRC-LEGAL-DLGS148-2015-ART23; SRC-INPS-2022-076; SRC-INPS-FIS-CURRENT; SRC-INPS-2025-005
- **Evidence summary:** INPS explicitly ties contribution characteristics to employer classification; current wage-support rules impose materially different employee shares based on data not present in the product scenario.
- **Engineering interpretation:** 9.19% is a valid FPLD pension component but is not a defensible complete employee contribution rate. The product cannot claim a complete canonical INPS result until a specific employer archetype is human-approved.
- **Assumptions:** none substituted for the missing employer profile.
- **Unresolved questions:** which employer archetype is canonical; whether the baseline includes CIGS, FIS, or neither; headcount; sector fund coverage; whether a conditional FIS reduction should be assumed.
- **Expected trace representation:** once resolved, show a separate named wage-support/fund contribution with employer-profile assumption and source; never hide it inside “9.19% INPS.”
- **Required tests/boundary fixtures:** profile-table tests for (a) CIGO-covered industrial employer not in CIGS scope, (b) CIGS-covered employer, (c) FIS ≤5 with and without the reduction, (d) FIS >5 to 15, (e) FIS >15 with CIGS overlay, and (f) bilateral-fund employer. Headcount fixtures: 5, immediately above 5 under the statutory average representation, 15, and immediately above 15. Verify the selected canonical profile only after human approval.

### RULE-INPS-2026-006 — Minimum contribution remuneration

- **Year:** 2026
- **Jurisdiction:** Italy / INPS
- **Status:** `excluded`
- **Calculation stage/order:** legal base guard before stage 10, excluded from the approved RAL-only annual estimate
- **Applicability:** actual payroll must respect applicable statutory and collective-agreement contribution minima.
- **Eligibility:** all relevant employees, with category/contract/hour-specific mechanics.
- **Exclusions:** excluded from calculation only under the product contract that the entered RAL is lawful, ordinary contribution-subject remuneration; this is not a claim that the legal minimum is zero or irrelevant to payroll.
- **Required inputs if modeled:** days, hours, full-/part-time schedule, employee category, applicable CCNL and level, pay periods, absences, start/end dates.
- **Calculation base:** the legally/contractually required minimum applicable to each pay period compared with actual contribution remuneration.
- **Formula:** not derivable from annual RAL alone. The general 2026 daily statutory floor published by INPS is EUR 58.13, but the applicable collective minimum may be higher and part-time mechanics require hours.
- **Rates/brackets/thresholds:** EUR 58.13 general daily statutory value, subject to category-specific and collective rules.
- **Rounding:** payroll-period rules; not modeled.
- **Interactions/order:** could increase the legal contribution base relative to cash stated as RAL if the underlying employment terms are noncompliant or incompletely represented.
- **Edge cases:** low RAL, part-time, unpaid absences, hires/terminations, different CCNL levels.
- **Source IDs:** SRC-INPS-2026-006; SRC-LEGAL-DLGS314-1997-ART6
- **Evidence summary:** current INPS instructions publish the statutory floor and retain higher legal/contractual minima.
- **Engineering interpretation:** do not attempt to infer workdays/hours or a CCNL from RAL. State that the calculator assumes a valid RAL and is not a payroll-compliance validator.
- **Assumptions:** entered remuneration is legally valid for the actual contract.
- **Unresolved questions:** independent/human review should confirm this exclusion is sufficiently visible, especially because the supported range starts at EUR 10,000.
- **Expected trace representation:** assumptions/limitations note, not a zero-valued deduction step.
- **Required tests/boundary fixtures:** a content/contract test that low RAL does not silently claim compliance; no fabricated annual threshold; unchanged contribution-base identity at EUR 10,000 under the explicit valid-RAL assumption.

### RULE-INPS-2026-007 — Contribution rounding for an annual RAL estimate

- **Year:** 2026
- **Jurisdiction:** Italy / INPS and product calculation policy
- **Status:** `blocked`
- **Calculation stage/order:** cross-cutting after each contribution component and at the public result boundary
- **Applicability:** every monetary contribution result.
- **Eligibility:** not applicable as a fiscal benefit; this rule selects the fidelity policy.
- **Exclusions:** no claim of exact payslip reproduction is permitted without payroll-period inputs and current field-level UniEmens rules.
- **Required inputs:** pay-period contribution bases and distribution across 12/13/14 actual payslips for payroll-exact calculation; those are intentionally absent from V1.
- **Calculation base:** exact decimal intermediate amounts in the annual model.
- **Formula:** authoritative sources show whole-euro rounding for specified employer-declaration bases/sums and modern cents-capable elements, but the research did not establish a single current rule that converts annual RAL directly into the exact annual employee deduction. Proposed product policy for approval: preserve exact decimal intermediates, calculate annual liability, and round public monetary components to EUR 0.01 using an explicitly named half-up policy; disclose that payroll-period rounding can differ.
- **Rates/brackets/thresholds:** EUR 0.50 boundary for the historical whole-euro declaration rule; EUR 0.005 boundary for the proposed public cent policy.
- **Rounding:** blocked pending independent verification and human selection of the estimate policy.
- **Interactions/order:** premature per-component rounding can change total contributions, IRPEF taxable income, and net; the domain engine must define and test one order.
- **Edge cases:** repeating one-third fund shares; monthly/annual conguaglio; half-cent results; sum-of-rounded versus rounded-sum differences.
- **Source IDs:** SRC-INPS-1998-245; SRC-INPS-2025-156
- **Evidence summary:** INPS reporting rules are period/field-specific. The product lacks payroll period inputs and is explicitly an annual estimate, so exact payroll rounding cannot be reconstructed from RAL alone.
- **Engineering interpretation:** use decimal arithmetic and a documented annual rounding policy, never silently call it statutory payslip rounding.
- **Assumptions:** annual liability model; public cents; no individual payslip simulation.
- **Unresolved questions:** current field-level rounding for employee IVS and wage-support contributions; whether public components or only the final annual net are rounded; tie-breaking mode.
- **Expected trace representation:** methodology entry “Arrotondamento della stima” naming the approved policy and warning that actual payroll-period cents can differ.
- **Required tests/boundary fixtures:** values immediately below/at/above a half-cent; sum-of-components reconciliation; no binary floating-point; invariant that trace rounded amounts reconcile under the selected policy; comparison with at least one independently calculated payroll-style reference after policy approval.

## Range behavior and boundary fixture table

All amounts below are exact pre-rounding pension-component calculations and deliberately exclude the blocked supplemental contribution.

| Annual contribution base | Base IVS at 9.19% | Additional 1% | Ceiling effect in supported envelope | Status note |
| ---: | ---: | ---: | ---: | --- |
| EUR 10,000 | EUR 919 | EUR 0 | none | minimum-base compliance assumed, not validated |
| EUR 56,223 | EUR 5,166.8937 | EUR 0 | none | below first band |
| EUR 56,224 | EUR 5,166.9856 | EUR 0 | none | exactly at first band |
| EUR 56,225 | EUR 5,167.0775 | EUR 0.01 | none | first whole-euro input producing additional IVS |
| EUR 120,000 | EUR 11,028 | EUR 637.76 | none | supported maximum remains EUR 2,295 below 2026 ceiling |

Outside-envelope configuration fixtures for the ceiling are EUR 122,294, EUR 122,295, and EUR 122,296. They do not expand public input scope.

## Completeness audit

| Required concern | Disposition | Evidence/result |
| --- | --- | --- |
| Applicable pension scheme | candidate assumption | general FPLD must be made explicit; special schemes excluded |
| Contribution base | candidate | RAL identity is a product-envelope interpretation, not a universal payroll rule |
| General employee pension rate | candidate | 9.19% for general FPLD |
| Additional employee rate | candidate | 1% above EUR 56,224 because 9.19% is below 10% |
| First pensionable band | candidate | EUR 56,224 for 2026 |
| Pension contribution ceiling | candidate/no-op | EUR 122,295; insurance-history distinction cannot affect RAL ≤ EUR 120,000 |
| CIGS/FIS/bilateral employee share | blocked | employer classification/headcount/fund history missing |
| Minimum contribution remuneration | excluded with explicit assumption | cannot be derived from annual RAL; calculator is not a compliance validator |
| Statutory/payroll rounding | blocked | annual RAL lacks pay-period distribution and current field-level rule is not singular |
| Contribution relief/incentives | excluded by approved scenario | no special circumstances; do not implement a zero placeholder |

## Findings

### BLOCKER — “private-sector employee” does not determine complete employee contributions

- **Problem:** the approved scenario does not identify employer sector/classification, wage-support fund coverage, headcount, or relevant fund-use history.
- **Evidence:** SRC-INPS-CLASSIFICATION-2025 makes CSC/authorization characteristics determinative; SRC-LEGAL-DLGS148-2015-ART23 and SRC-INPS-2022-076 establish a 0.30% employee CIGS amount for in-scope workers; SRC-INPS-FIS-CURRENT and SRC-INPS-2025-005 establish different employee FIS shares based on headcount and claim history.
- **Impact:** using only 9.19% can understate employee deductions and overstate both IRPEF taxable income effects and estimated net. Calling 9.19% the complete INPS burden would be misleading.
- **Available options:**
  1. Human-approve a concrete canonical employer archetype, including sector, wage-support scheme, and headcount/history assumptions.
  2. Add employer classification inputs to the product, which is a scope expansion and not recommended for this assignment.
  3. Model only the 9.19% pension component and explicitly exclude wage-support/fund employee contributions, accepting a documented systematic approximation.
- **Recommended decision:** choose option 1. Prefer one common, legible archetype and keep it a visible assumption. A possible decision set for human review is an ordinary non-agricultural FPLD employee of an industrial employer either (a) not in CIGS scope, yielding the 9.19% pension component plus the 1% band rule, or (b) in CIGS scope, adding 0.30%. The researcher does not select between them.

### MAJOR — annual estimate cannot reproduce payroll rounding from RAL alone

- **Problem:** INPS contribution reporting and withholding operate by pay period and field; the product has only annual RAL and a presentation-only installment count.
- **Evidence:** SRC-INPS-1998-245 gives reporting-rounding rules; SRC-INPS-2025-156 shows monthly/cumulative/year-end mechanics.
- **Impact:** an annual direct formula can differ by cents or small euro amounts from actual payroll even after the correct rate profile is chosen.
- **Available options:** (a) adopt and disclose an annual cent-rounding policy; (b) simulate pay periods, contradicting the approved product boundary and requiring assumptions about pay distribution; (c) leave rounding implicit, which is unacceptable.
- **Recommended decision:** option (a), after independent review confirms the source interpretation. Keep full decimal precision internally, round at explicitly defined public boundaries, and label the result an annual estimate.

### NOTE — insurance history is not a current-range blocker

The Law 335/1995 ceiling depends on pre-/post-1996 insurance history, which the scenario omits. The 2026 ceiling is EUR 122,295 and the product maximum is EUR 120,000, so both eligibility branches produce the same result everywhere in the approved range. The missing attribute becomes blocking only if scope expands above the ceiling or if another contribution rule introduces a lower cap.

## Verification performed

- Reopened the official 2026 INPS circular page and checked the year, first pensionable band, monthly reference, additional rate, ceiling, eligibility statement, and daily minimum.
- Cross-checked the 1% rule against the primary legal article and year-end INPS conguaglio instructions.
- Cross-checked the 9.19% general FPLD employee share against an INPS statement expressly referring to the generality of FPLD members.
- Reopened current INPS employer-classification material and verified that employer CSC/authorization characteristics affect contribution treatment.
- Reopened primary/current official CIGS and FIS sources and confirmed that employee-paid contributions vary with scope, headcount, fund coverage, and potentially claim history.
- Checked the supported RAL maximum against the 2026 pension ceiling: EUR 120,000 < EUR 122,295.
- Calculated exact, unrounded boundary examples for the 9.19% and 1% pension components; no executable code or calculator was used.
- Searched for a general 2026 employee IVS reduction and found only profile-specific worker waivers/reliefs or employer-side hiring incentives. This negative finding is not treated as proof and must be independently rechecked.
- Did not verify any rule; status remains candidate, blocked, or excluded.

## Changes made

Created only `docs/ai-engineering/runs/2026-08-22-002-fiscal-research-inps.md`. No canonical rule/source file, project state, architecture, agent instruction, package, or application file was changed.

## Assumptions and decisions affected

- The approved general product scenario is insufficient to determine the complete employee social-security deduction. A human-approved canonical employer archetype is required before verification can finish.
- The RAL-to-contribution-base identity remains defensible only as a visible annual-estimate assumption, especially at the EUR 10,000 lower bound.
- The 12/13/14 selector must remain presentation-only; neither the additional 1% threshold nor contributions may vary with it.
- ADR-0003's decimal boundary is appropriate, but fiscal rounding still requires an explicit approved domain policy.

## Human approval status

No fiscal rule or employer archetype has human approval. No rule is verified. The blocked findings require coordinator synthesis, independent Claude review of the original sources, and human decision/approval under the repository governance contract.

## Unresolved issues

1. Select a concrete canonical employer classification/archetype or explicitly approve omission of supplemental employee-paid wage-support/fund contributions.
2. Approve an annual-estimate rounding policy after independent review; do not describe it as exact payroll rounding.
3. Confirm that the valid-RAL assumption is an acceptable basis for excluding contribution-minimum validation throughout EUR 10,000–120,000.
4. Independently recheck that no general 2026 employee-side IVS relief changes the ordinary profile.
5. Confirm the current attachment/rectification state of INPS Circular 6/2026 and current consolidation of the cited primary laws.

## Recommended next action

The M1 coordinator should reopen the cited originals, integrate the candidate/blocked/excluded records into the canonical fiscal catalog and source register without promoting them to `verified`, and surface RULE-INPS-2026-005 as a human decision required before a complete canonical calculation profile can be approved. The independent Claude fiscal verifier must reconstruct these rules from the original sources, with particular attention to complete contribution classification and rounding.
