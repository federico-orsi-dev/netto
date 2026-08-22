---
run_id: RUN-2026-08-22-011
date: 2026-08-22
tool: codex
role: independent-fiscal-verifier
task: m1-independent-fiscal-verification
status: completed
owner: codex
reviewer: human-and-codex-reconciliation
related_rules:
  - RULE-INPS-2026-001..008
  - RULE-NAT-*-2026
  - RULE-LOCAL-2026-*
  - RULE-LOMBARDY-2026-001
  - RULE-MILAN-2026-001
related_adrs:
  - ADR-0002
  - ADR-0003
  - ADR-0004
commit: 661e844a4ea8b8d58f4577dd8e0b8b0e6e8a074d
tree: 58106004374b1de19c60fc3d12ae51e373d40a95
---

# M1 independent fiscal verification

## A. Verification metadata and progression boundary

- **Verifier identity:** Independent Codex fiscal verification pass.
- **Repository:** `C:\Users\feder\Documents\Netto-m1-independent-review`.
- **Branch:** `review/m1-independent-fiscal`.
- **Checkpoint commit:** `661e844a4ea8b8d58f4577dd8e0b8b0e6e8a074d`.
- **Checkpoint tree:** `58106004374b1de19c60fc3d12ae51e373d40a95`.
- **Checkpoint status before research:** clean.
- **Date/access date:** 2026-08-22, Europe/Rome.
- **Scope:** 2026 annual Italian employee gross-to-net foundation for the fixed Milan/Lombardy, article-10 CIGO industrial, more-than-15/CIGS, general-FPLD, no-employee-funded-sector-fund profile; whole-euro RAL EUR 10,000 through EUR 120,000.
- **Authority:** verification and findings only. This record does not edit the catalog, approve a policy, authorize implementation, or move canonical lifecycle states.

Independent findings use `VERIFIED`, `REJECTED`, and `BLOCKED` only as review dispositions. `VERIFIED` here means sufficient evidence for the bounded rule or bounded exclusion; it is not the repository lifecycle transition or human fiscal approval.

## B. Pre-flight and repository evidence inspected

Pre-flight passed exactly: requested root/branch/commit/tree, clean worktree, `PROJECT_STATE.md`, Fiscal Rule Catalog, Source Register, fiscal research records, runs 001-010, and `.claude/agents/fiscal-verifier.md` were present. The catalog contained 15 `candidate`, 3 `blocked`, 6 `excluded`, and 0 `verified` rule records.

The review inspected:

- `AGENTS.md`, `PROJECT_STATE.md`, `README.md`, and the fiscal-verifier instructions.
- `docs/product/product-spec.md`.
- `docs/architecture/architecture.md` and ADR-0001 through ADR-0005.
- `docs/domain/fiscal-rules-2026.md` and `docs/domain/source-register-2026.md`.
- `docs/testing/test-strategy.md` and `docs/delivery/release-checklist.md`.
- `docs/ai-engineering/workflow.md`, the fiscal research/verification contract, and the independent-review contract.
- Runs `RUN-2026-08-22-001` through `RUN-2026-08-22-010`, including the INPS, CIGS-delta, national-tax, local-tax, assumption-escalation, approval, and synthesis records.

Repository artifacts were treated as claims. The verifier first used them to identify the model and the questions requiring reconstruction, then reopened controlling originals and recorded independent conclusions before performing the final claim-by-claim comparison.

## C. External authoritative evidence independently reopened

All sources below were accessed on 2026-08-22. Search-engine results were discovery aids only and are not evidence.

| Institution / authority | Document and effective/current date | Applicable year and finding | Currentness concern |
| --- | --- | --- | --- |
| INPS | [Circular 6 of 30 January 2026](https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.01.circolare-numero-6-del-30-01-2026_15151.html) | 2026; EUR 58.13 daily floor, EUR 56,224 first band, 1% additional contribution, EUR 122,295 ceiling, mensilization and conguaglio context | Current rendered text was reopened; no active rectification notice affecting these values was exposed.
| INPS | [Circular 101 of 29 November 2024](https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2024.11.circolare-numero-101-del-29-11-2024_14714.html) | Standing FPLD statement: 33%, split 23.81% employer / 9.19% worker | Immediate subject is narrower than the V1 profile; the sentence expressly addresses the generality of FPLD members. No 2026 general replacement was found.
| Italian Republic / Normattiva | [D.Lgs. 314/1997 article 6](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1997-09-02;314~art6!vig=) | 2026 standing rule; contribution income comprises employment income matured in the reference period with specific inclusions/exclusions | Current consolidated primary basis; it does not equate a user-entered annual RAL with the legal contribution base.
| Italian Republic / Normattiva | [Law 335/1995 article 2(18)](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1995-08-08;335~art2!vig=) | 2026 standing rule; indexed annual ceiling for workers without pre-1996 compulsory seniority and qualifying optants | Current consolidated eligibility basis; INPS Circular 6 supplies the 2026 amount.
| Italian Republic / Normattiva | [D.Lgs. 148/2015 article 23](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2015-09-14;148~art23!vig=), current through acts published 3 July 2026 | 2026; CIGS 0.90% on previdential contribution income, 0.30% worker share | Current consolidated text, not original 2015 PDF.
| INPS | [Message 637 of 9 February 2022](https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2022.02.messaggio-numero-637-del-09-02-2022_13713.html) | Standing post-2022 CIGS scope and 0.30% worker share; FIS negative-scope test | Expressly temporary 2022 reductions were not reused.
| INPS | [Circular 156 of 30 December 2025](https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2025.12.circolare-numero-156-del-30-12-2025_15125.html) | Standing annual/cumulative conguaglio mechanics for ceiling and additional 1% | Monetary thresholds are 2025-only; mechanics are corroborative pending a 2026 year-end circular.
| Italian Republic / Normattiva | [TUIR article 3](https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1986-12-22;917~art3!vig=) | 2026; resident comprehensive-income base net of article-10 charges and exclusion of substitute-taxed income | Current consolidated text.
| Italian Republic / Normattiva | [TUIR article 11](https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1986-12-22;917~art11!vig=), in force 1 January-31 December 2026 | 2026; 23% / 33% / 43% marginal brackets and deduction capacity | Current consolidated text.
| Italian Republic / Normattiva | [TUIR article 13](https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1986-12-22;917~art13!vig=) | 2026; employment-deduction formulas, inclusivity, EUR 65 band, first-four-decimal rule | Current consolidated text. “First four decimal digits” is truncation, not half-up rounding.
| Italian Republic / Normattiva | [TUIR article 51](https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1986-12-22;917~art51!vig=) | 2026; employment-income base and exclusion of mandatory statutory employee contributions | Current consolidated text.
| Italian Republic / Normattiva | [Law 207/2024 article 1](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2024-12-30;207~art1!vig=) | Structural rules continuing in 2026: non-taxable cuneo sum and additional employee deduction | Its former 35% IRPEF rate is superseded for 2026; paragraphs 4-9 were reopened in the current text.
| Italian Republic / Normattiva | [Law 199/2025 article 1](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2025-12-30;199~art1!vig=) | 2026; second IRPEF rate changed to 33%; separately identified substitute-taxed pay regimes | Current 2026 law.
| Italian Republic / Normattiva | [D.L. 3/2020 article 1](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2020-02-05;3~art1!vig=) | 2026; EUR 1,200 treatment integrativo, strict capacity test, EUR 75 adjustment, ordinary ceiling EUR 15,000 and conditional branch | Current consolidated text.
| Italian Republic / Normattiva | [D.Lgs. 446/1997 article 50](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1997-12-15;446~art50!vig=) | 2026; regional base, 1 January domicile and IRPEF-due gate | Statute does not itself state the EUR 10.33 liquidation threshold.
| Italian Republic / Normattiva | [D.Lgs. 360/1998 article 1](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1998-09-28;360~art1!vig=) | 2026; municipal base, exemption authority, whole-base semantics, domicile and due gate | Statute does not itself state the EUR 10.33 liquidation threshold.
| Italian Republic / Normattiva | [D.P.R. 600/1973 article 1](https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1973-09-29;600~art1!vig=) | Current declaration-exemption text retains the historical lire 20,000 / EUR 10.33 lineage | It is not by itself a complete 2026 local-addition liquidation algorithm.
| Regione Lombardia | [L.R. 10/2003 article 72](https://normelombardia.consiglio.regione.lombardia.it/NormeLombardia/Accessibile/main.aspx?iddoc=lr002003071400010&view=showdoc) | 2026; 1.23%, 1.58%, 1.72%, 1.73% bands | Current consolidated regional law.
| MEF, Dipartimento delle Finanze | [2026 regional-additional CSV](https://www1.finanze.gov.it/finanze2/dipartimentopolitichefiscali/fiscalitalocale/addregirpef/download/download.php?anno=2026&tipo=reg), Lombardy entry dated 28 January 2026 | Explicit 2026 confirmation of the four Lombardy bands | Current year-specific dataset.
| Regione Lombardia | [Current regional-additional guidance](https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef), updated 5 May 2026 | Explicit progressive semantics, base and domicile | Current during fiscal year 2026.
| Comune di Milano | [Current municipal-additional guidance](https://www.comune.milano.it/aree-tematiche/tributi/addizionale-comunale-irpef), updated 12 May 2026 | 2026-current evidence: 0.8%; exemption through EUR 23,000; not a franchise; whole base above threshold | Stronger currentness than the Source Register records.
| MEF, Dipartimento delle Finanze | [Milan municipal-additional register](https://www1.finanze.gov.it/finanze2/dipartimentopolitichefiscali/fiscalitalocale/nuova_addcomirpef/risultato.htm?anno=9999&cc=F205&pr=MI&r=1) | Displays no 2026 row; 2025 confirms Resolution 46/2020, EUR 23,000 and 0.8% | Absence is a publication gap, not a zero rule; the May 2026 Comune page resolves operational continuation of the rate/threshold.
| Agenzia delle Entrate | REDDITI PF 2026 / Quadro RV materials | Filing season 2026 for income year 2025; current evidence of the EUR 10.33 non-due convention and whole-euro return context | Not admissible as exact income-year-2026 liquidation or rounding evidence.

## D. Independent reconstruction methodology

1. Reopened current consolidated primary law at 22 August 2026 and competent-institution pages, preserving the difference between a current page and a year-specific rule.
2. Reconstructed profile applicability, base, rate, thresholds, inclusivity, annual/periodic behavior and interactions independently.
3. Used exact decimal arithmetic to reproduce boundary intermediates; no opaque payroll calculator was used.
4. Compared the independent result with each catalog record only after the relevant original had been reopened.
5. Treated absence, an excluded input, and an engineering approximation as different states. Missing CCNL/pay-period facts and unavailable income-year-2026 liquidation instructions were not converted to zero or guessed policies.

## E. Rule-by-rule independent verification matrix

| Rule ID | Independent finding and authoritative evidence | Status | Confidence | Repository comparison / implementation consequence |
| --- | --- | --- | --- | --- |
| RULE-INPS-2026-005 | The fixed scope supports separate 9.19% IVS, 0.30% CIGS and additional 1% components, but the complete amount still depends on an unresolved legal contribution-base/minimum-remuneration assumption and rounding. INPS 101/2024, D.Lgs. 148 article 23, INPS 6/2026. | **BLOCKED** | High | Rates/composition agree; “complete profile” cannot yet be deterministic from RAL alone. Reconcile with 001/006/007 before implementation.
| RULE-INPS-2026-001 | Contribution income is legally defined and subject to period/collective minima. `annualContributionBase = RAL` is an engineering assumption, not derivable from the approved profile. D.Lgs. 314/1997 article 6 and INPS 6/2026. | **BLOCKED** | High | Material disagreement with candidacy: “lawful RAL” is not an approved V1 scope fact. Human must approve an estimate policy or add the missing employment facts.
| RULE-INPS-2026-002 | General FPLD worker IVS share is 9.19% on pension contribution income; it is not the complete employee burden. INPS 101/2024. | **VERIFIED** | High | Agrees, conditional on a valid pension base. Keep IVS separate from CIGS and additional 1%.
| RULE-INPS-2026-003 | For worker pension rates below 10%, 1% applies to the annual portion above EUR 56,224, with monthly administration and conguaglio. INPS 6/2026 and standing year-end mechanics. | **VERIFIED** | High | Agrees as a post-conguaglio annual estimate, not payslip arithmetic. EUR 56,224 is included in the zero side; EUR 56,225 creates EUR 0.01 exact pre-round.
| RULE-INPS-2026-004 | 2026 pension ceiling is EUR 122,295 for post-1995 entrants/eligible optants and also limits additional IVS. It is inactive at RAL <= EUR 120,000 if base does not exceed RAL. INPS 6/2026 and Law 335/1995 article 2(18). | **VERIFIED** | High | Agrees as an in-range no-op. Its inactivity inherits the base assumption; do not expand range without insurance-history inputs.
| RULE-INPS-2026-006 | The EUR 58.13 daily floor is real, but collective, part-time, day/hour and period facts determine its operation. The approved profile does not prove non-applicability at low RAL. INPS 6/2026. | **BLOCKED** | High | Disagrees with `excluded`: missing inputs are not evidence of exclusion. This is the counterpart blocker to RULE-INPS-2026-001.
| RULE-INPS-2026-007 | Official material establishes period reporting and conguaglio, not a unique annual-RAL component/aggregate rounding algorithm. | **BLOCKED** | High | Agrees. `POLICY-MONEY-2026-001` remains an unapproved estimate policy, not fiscal evidence.
| RULE-INPS-2026-008 | Payroll-exact results require period bases, distribution, dates and cumulative data not collected by V1. | **VERIFIED** | High | Agrees with the bounded exclusion. The UI must not make payslip-exact claims.
| RULE-NAT-BASE-2026 | Mandatory statutory worker contributions do not form employment income; with only ordinary employment income, taxable income equals RAL less the actual deductible worker contributions. TUIR articles 3 and 51. | **VERIFIED** | High | Agrees structurally. The numeric handoff remains dependent on the blocked contribution-base/rounding result.
| RULE-NAT-GROSS-IRPEF-2026 | 2026 marginal brackets are 23% through EUR 28,000, 33% through EUR 50,000 and 43% above. TUIR article 11 current text and Law 199/2025 article 1(3). | **VERIFIED** | High | Agrees. Older 35% material is superseded.
| RULE-NAT-EMPLOYMENT-DEDUCTION-2026 | Full-year formulas, endpoint inclusivity, EUR 65 for `25,000 < R <= 35,000`, and first-four-decimal ratio truncation are supported by TUIR article 13. | **VERIFIED** | High | Formula agrees. Fixture coverage is incomplete at the effective truncation-to-zero transition near EUR 50,000.
| RULE-NAT-NET-IRPEF-2026 | Modeled deductions reduce gross tax only to zero; cash sums remain separate. TUIR article 11(3), Law 207/2024 and D.L. 3/2020. | **VERIFIED** | High | Agrees. Exact public money rounding is a separate unresolved policy.
| RULE-NAT-CUNEO-SUM-2026 | For adjusted total income <= EUR 20,000, the non-taxable sum uses actual employment income and 7.1% / 5.3% / 4.8% according to annualized employment income at inclusive boundaries 8,500 and 15,000. Law 207/2024 article 1(4-5,9). | **VERIFIED** | High | Agrees. It is a positive non-taxable amount and may coexist with treatment integrativo.
| RULE-NAT-CUNEO-DEDUCTION-2026 | Additional deduction is EUR 1,000 for `20,000 < R <= 32,000`, then `1,000*(40,000-R)/8,000` through included EUR 40,000. Law 207/2024 article 1(6-7,9). | **VERIFIED** | High | Agrees. No article-13 four-decimal truncation applies to this separate ratio.
| RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026 | At `R <= 15,000`, full-year amount is EUR 1,200 only if gross employment IRPEF is strictly greater than article-13 deduction minus EUR 75. D.L. 3/2020 article 1 current text. | **VERIFIED** | High | Agrees. Whole-euro direct-income crossover 8,173/8,174/8,175 is correct; it is below the reachable V1 full-engine range.
| RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026 | The 15,000-28,000 branch depends on enumerated deductions and historical expenditure dates absent from the fixed profile. The employment deduction alone does not satisfy the branch in the relevant band. | **VERIFIED** | High | Agrees with the profile-specific exclusion, not with a universal zero.
| RULE-NAT-SPECIAL-PAY-2026 | 2026 substitute regimes attach to identified renewal increases, productivity/profit, or night/festive/shift components and prior-year facts. Undifferentiated ordinary RAL cannot select them. Law 199/2025 article 1(7-11). | **VERIFIED** | High | Agrees with exclusion. Do not encode headline rates into ordinary RAL.
| RULE-NAT-PERSONAL-RELIEFS-2026 | Personal/family/deductible facts are outside the approved profile and cannot be inferred. | **VERIFIED** | High | Agrees with exclusion and visible limitation.
| RULE-LOCAL-2026-001 | Both statutes use the same IRPEF-derived base and require IRPEF to be due after deductions/foreign-tax credits. The exact income-year-2026 EUR 10.33 liquidation predicate is not yet established by year-matching instructions. D.Lgs. 446 article 50; D.Lgs. 360 article 1. | **BLOCKED** | High on structure; medium on de minimis | Agrees with blocker. Independent enumeration shows the gate cannot change an in-range V1 result if upstream formulas hold: minimum pre-round net IRPEF is EUR 126.73 at RAL EUR 10,000, safely above EUR 10.33.
| RULE-LOMBARDY-2026-001 | 2026 rates are progressive marginal 1.23% / 1.58% / 1.72% / 1.73% at EUR 15,000 / 28,000 / 50,000 on the common base. Regional law, MEF 2026 CSV and Regione page agree. | **VERIFIED** | High | Agrees. Compute marginal slices; not a single rate on the whole base.
| RULE-MILAN-2026-001 | Current Comune page updated 12 May 2026 confirms EUR 23,000 inclusive exemption, single 0.8%, and non-franchise whole-base application above the threshold. | **VERIFIED** | High | Agrees. The absent MEF 2026 row is resolved for rate/threshold applicability by stronger current municipal evidence, though the publication gap should remain documented.
| RULE-LOCAL-2026-ORDER | Contributions precede the common tax base; gross IRPEF and deductions establish net IRPEF/due gate; regional and municipal additions are siblings on unchanged base; non-taxable sums are added after liabilities. | **VERIFIED** | High | Agrees structurally. Blocked numeric/rounding dependencies remain explicit.
| RULE-LOCAL-2026-ROUNDING | No reopened source establishes the full income-year-2026 annual-estimator sequence for base precision, per-bracket/subtotal rounding, scale and tie mode. Return whole-euro and payroll-cent contexts are not interchangeable. | **BLOCKED** | High | Agrees. Do not silently adopt return or payroll behavior.
| RULE-LOCAL-2026-WITHHOLDING | Advances, balances and payslip timing are legally distinct from the annual liability and outside approved product scope. | **VERIFIED** | High | Agrees with exclusion; exclusion does not remove annual local liabilities.

**Disposition count across 24 Rule IDs:** 18 VERIFIED, 0 REJECTED, 6 BLOCKED. `POLICY-MONEY-2026-001` is separately **BLOCKED pending explicit human approval** and is not included in the Rule-ID count.

## F. Missing/additional rules and hidden dependencies

No additional employee charge or tax-rate rule was proven for the fixed no-sector-fund profile. The following reconciliation dependencies were independently discovered:

1. **Contribution-base/minimum-remuneration decision:** RULE-INPS-2026-001 and RULE-INPS-2026-006 are two sides of one unresolved gate. Either add schedule/CCNL/pay-period facts, narrow/validate the input contract, or obtain explicit human approval for a named annual contribution-income approximation. Until then RULE-INPS-2026-005 is not complete.
2. **Cross-cutting public-money policy:** the candidate money policy affects national outputs too, not only the two catalog rounding blockers. Reconciliation must explicitly connect national exact amounts, contribution aggregate, taxable-base handoff, local bases and final annual net to one approved policy without presenting it as law.
3. **Article-13 truncation boundary fixture:** the catalog misses the effective whole-euro direct-income transition where the declining deduction becomes zero before EUR 50,000. At direct taxable income EUR 49,997 the ratio truncates to `0.0001` and deduction is EUR 0.191 exact; at EUR 49,998 it truncates to `0.0000` and deduction is zero.

These are not a request to inflate the fiscal rule count. The first two may be represented as explicit prerequisite/policy records; the third is a fixture correction.

## G. Existing blocker assessment

### RULE-INPS-2026-007

Remains **BLOCKED**. Normative evidence establishes monthly/reporting and conguaglio mechanics. It does not establish component-first annual cent half-up, rounded-sum versus sum-rounded, or the downstream use of one artificial annual aggregate. Required resolution: a named human-approved estimate policy plus trace disclosure and non-payslip limitation.

### RULE-LOCAL-2026-001

Remains **BLOCKED** for the exact income-year-2026 de-minimis predicate. The statutes say IRPEF must “result due”; Agenzia return materials use EUR 10.33, but the currently available 2026 filing materials concern income year 2025. Required evidence is the income-year-2026 liquidation instruction/software specification or another current authoritative instrument proving unchanged treatment.

This blocker is not output-material inside the current RAL envelope if the upstream formulas are accepted. Exact enumeration with unrounded candidate contributions found the minimum modeled net IRPEF at RAL EUR 10,000: taxable income EUR 9,051; gross IRPEF EUR 2,081.73; employment deduction EUR 1,955; net IRPEF EUR 126.73. The finding must not be generalized below the supported range.

### RULE-LOCAL-2026-ROUNDING

Remains **BLOCKED**. Required evidence or policy must specify base precision, threshold comparison representation, progressive component/subtotal rounding, liability unit, tie mode and whether annual-return or payroll precision is being approximated.

## H. Rounding and truncation findings

### Normative evidence

- TUIR article 13(6): positive statutory ratios are assumed at their first four decimal digits. This is truncation after the ratio and before multiplication.
- INPS Circular 6/2026: the raw indexed ceiling EUR 122,295.40 is published as the official whole-euro ceiling EUR 122,295.
- INPS Circular 6/2026 and standing conguaglio instructions: additional 1% is administered with mensilization and annual/termination reconciliation.
- No reopened source requires rounding each IRPEF or Lombardy bracket slice before summing.

### Engineering inference, not law

- Preserve exact decimal arithmetic through each verified formula.
- Compare legal thresholds against the exact legally defined base, not formatted display values.
- Expose exact intermediate, policy name, scale/mode and public amount if a money policy is approved.

### Unresolved ambiguity

- Annual contribution component/aggregate rounding and downstream taxable-base handoff.
- National public-money serialization/rounding and how it reconciles with contributions and local liabilities.
- Annual local base/component/subtotal/liability precision and tie mode.
- Whether component-first half-up cents is an acceptable estimate policy. This review does not endorse it.

## I. Independently reconstructed ordering/dependency graph

1. Validate the product input and resolve whether annual RAL is admissible as contribution income; apply any legally applicable minimum-base rule or an approved disclosed approximation.
2. Determine pension contribution base and ceiling branch (ceiling is inactive in the supported range under the RAL-base assumption).
3. Calculate separate exact employee components: base IVS 9.19%, additional IVS 1% above EUR 56,224, and CIGS 0.30%.
4. Apply the approved contribution reconciliation/rounding policy; aggregate actual deductible statutory employee contributions.
5. Derive ordinary employment/total/national/local base: RAL less actual mandatory worker contributions, with all excluded special/personal facts absent.
6. Calculate gross IRPEF marginally at 23% / 33% / 43%.
7. Calculate article-13 employment deduction using the correct band, four-decimal ratio truncation and EUR 65 adjustment.
8. Determine cuneo measure from adjusted total/employment income: non-taxable sum at `R <= 20,000`; otherwise the additional deduction through EUR 40,000.
9. Capacity-cap tax deductions at gross IRPEF; derive non-negative net IRPEF.
10. Independently test treatment-integrativo eligibility. Add the low-income EUR 1,200 only after the strict capacity test; do not include it in taxable income or deduction capacity. It may coexist with the cuneo sum.
11. Determine the sourced local IRPEF-due gate. If true, calculate Lombardy and Milan independently from the unchanged common base; if false, both are zero.
12. Compose annual net: `RAL - worker contributions - net IRPEF - Lombardy - Milan + cuneo non-taxable sum + treatment integrativo`.
13. Derive average monthly/contractual-installment presentation only from the approved annual result; installment count never changes fiscal components.

## J. Fixture and boundary recommendations

Do not approve public expected amounts until the blocked base and money policies are reconciled. Exact pre-round formula tests are admissible for verified rules.

### Contribution and profile

- EUR 56,223 / 56,224 / 56,225 contribution base for additional IVS.
- EUR 119,999 / 120,000 supported maximum, and out-of-envelope configuration 122,294 / 122,295 / 122,296 for both ceiling-eligibility branches.
- Profile-negative fixtures proving that FIS or an employee-funded sector fund cannot reuse the fixed three-component profile.
- Minimum-base decision fixtures must not be invented from RAL: cover missing schedule/CCNL facts and the approved rejection/assumption behavior.
- After policy approval, exact values below/at/above half-cent and rounded-component/aggregate reconciliation.

### National direct-income unit boundaries

- Treatment capacity: 8,173 / 8,174 / 8,175 (unit-rule test; unreachable through the current minimum full-engine RAL).
- Cuneo sum: 8,499 / 8,500 / 8,501; 14,999 / 15,000 / 15,001; 19,999 / 20,000 / 20,001.
- Employment deduction/EUR 65: 24,999 / 25,000 / 25,001 and 34,999 / 35,000 / 35,001.
- IRPEF: 27,999 / 28,000 / 28,001 and 49,999 / 50,000 / 50,001.
- Cuneo deduction: 31,999 / 32,000 / 32,001 and 39,999 / 40,000 / 40,001.
- Add the article-13 truncation endpoint: 49,997 / 49,998 / 49,999, plus property tests for all trunc4 step boundaries.

### Local direct-base boundaries

- Lombardy: 14,999 / 15,000 / 15,001; 27,999 / 28,000 / 28,001; 49,999 / 50,000 / 50,001.
- Milan: 22,999 / 23,000 / 23,001, proving zero / zero / whole-base activation.
- Due gate: the authoritative income-year-2026 threshold minus smallest legal unit / exactly / plus smallest legal unit after the blocker is resolved.

### Derived whole-euro full-engine RAL boundaries

Under the exact but still blocked `contributionBase = RAL` assumption, the following pairs/triples straddle important taxable-base transitions and should be re-derived after money-policy approval:

- Article-13 15,000: RAL 16,572 / 16,573 / 16,574 gives base 14,999.3172 / 15,000.2223 / 15,001.1274.
- Cuneo 20,000: RAL 22,096 / 22,097 / 22,098 gives base 19,999.0896 / 19,999.9947 / 20,000.8998.
- Milan 23,000: RAL 25,411 / 25,412 / 25,413 gives base 22,999.4961 / 23,000.4012 / 23,001.3063.
- EUR 65 start: RAL 27,621 / 27,622 / 27,623 gives base 24,999.7671 / 25,000.6722 / 25,001.5773.
- IRPEF/Lombardy 28,000: RAL 30,935 / 30,936 / 30,937 gives base 27,999.2685 / 28,000.1736 / 28,001.0787.
- Cuneo phase-out: RAL 35,355 / 35,356 / 35,357 gives base 31,999.8105 / 32,000.7156 / 32,001.6207.
- EUR 65 end: RAL 38,669 / 38,670 / 38,671 gives base 34,999.3119 / 35,000.2170 / 35,001.1221.
- Cuneo end: RAL 44,193 / 44,194 / 44,195 gives base 39,999.0843 / 39,999.9894 / 40,000.8945.
- Article-13 effective zero from truncation: RAL 55,240 gives base 49,997.7240 and a EUR 0.191 exact deduction; RAL 55,241 gives base 49,998.6291 and zero.
- IRPEF/Lombardy 50,000: RAL 55,242 / 55,243 straddles base 49,999.5342 / 50,000.4393.

The minimum RAL EUR 10,000 maps to exact candidate base EUR 9,051 before policy rounding; therefore the direct-income 8,174 and 8,500 thresholds are unit-test-only within V1.

## K. Source-quality and currency findings

- **MAJOR:** the Source Register records the current Milan page as last updated 28 November 2025. The live official page showed `Ultimo aggiornamento: 12/05/2026`. Reconciliation should update metadata and use it to close the rate/threshold continuation concern without treating the missing MEF row as zero.
- **MINOR:** RUN-002 says the INPS Circular 6 page notes rectifications are present. The current rendered page exposed no active rectification marker affecting the verified values. Reconciliation should record the actual current page state rather than a generic rectification warning.
- **MAJOR:** REDDITI PF 2026 is a 2026 filing-season artifact for income year 2025. It is not year-matching evidence for income-year-2026 local due-gate or rounding mechanics.
- **NOTE:** TUIR and D.Lgs. 148 were reopened in Normattiva at 22 August 2026; the pages reported latest act updates through 3 July 2026.
- **NOTE:** the 9.19% FPLD statement is from 2024. Its wording is general and no 2026 general rate replacement was found, but reconciliation should retain the negative-currentness check.
- **NOTE:** the MEF Milan row remains absent for 2026. Current Comune evidence resolves operational rate/threshold applicability, not the MEF publication-history gap itself.

## L. Findings and disagreements requiring reconciliation

### BLOCKER — contribution-base identity and minimum remuneration

- **Repository claim:** RAL maps identically to annual contribution base under a lawful-remuneration assumption; minimum remuneration is excluded.
- **Independent finding:** legal contribution income is period-sensitive and can be uplifted by statutory/collective minima. The approved V1 profile does not supply schedule, hours, days, CCNL/level or a human-approved approximation.
- **Evidence:** INPS Circular 6/2026 paragraphs 1 and 4; D.Lgs. 314/1997 article 6.
- **Consequence:** employee contributions, taxable income, every tax and annual net can be wrong, particularly at the EUR 10,000 lower bound.
- **Recommended action:** human-select a visible approximation/input-validation contract or expand inputs; then re-review RULE-INPS-2026-001, 005 and 006.

### BLOCKER — cross-cutting money policy

- **Repository claim:** candidate component-first cent half-up policy could unblock contribution/local rounding after review and approval.
- **Independent finding:** it is deterministic but not derived from fiscal law and can change downstream bases by cents. This review cannot select it.
- **Consequence:** public components and annual-net reconciliation remain non-final.
- **Recommended action:** compare component-first and aggregate-first effects at boundary fixtures, document estimate error semantics, obtain explicit human approval, and re-review.

### MAJOR — income-year-2026 local due gate

- **Repository claim:** exact predicate is blocked because current EUR 10.33 guidance is for income year 2025.
- **Independent finding:** agrees; statutes alone state only “IRPEF is due.” However the unresolved threshold cannot switch an in-range result under current upstream formulas because modeled net IRPEF never approaches it.
- **Consequence:** the rule remains evidentially incomplete but is not presently output-material inside EUR 10,000-120,000.
- **Recommended action:** retain blocker with the bounded non-materiality proof; reopen income-year-2026 instructions when published.

### MAJOR — missing article-13 truncation boundary

- **Repository claim:** fixtures at 49,999 / 50,000 / 50,001 cover the deduction end.
- **Independent finding:** four-decimal truncation makes the full-year deduction zero already at direct whole-euro income EUR 49,998; EUR 49,997 still yields EUR 0.191.
- **Evidence:** TUIR article 13(1)(c) and (6).
- **Consequence:** existing fixtures miss a real legal behavior transition.
- **Recommended action:** add 49,997 / 49,998 / 49,999 and trunc4 property tests.

### MINOR — current-source metadata

- **Repository claim:** Milan institutional page last updated 28 November 2025.
- **Independent finding:** live page updated 12 May 2026.
- **Consequence:** provenance is stale and understates the strength of 2026 applicability evidence.
- **Recommended action:** update Source Register during reconciliation; do not rewrite historical research.

## M. Remaining uncertainties preventing deterministic implementation

1. Whether and how annual RAL is accepted as contribution income despite statutory/collective period minima.
2. Annual contribution component/aggregate rounding, tie mode and taxable-base handoff.
3. Exact income-year-2026 IRPEF-due/de-minimis predicate for local additions.
4. Annual local base/liability rounding sequence and precision.
5. One approved cross-cutting public-money policy for exact national amounts and final annual-net reconciliation.

The absent Milan MEF 2026 row is no longer an uncertainty about the operative 0.8% / EUR 23,000 rule because the Comune page was updated during fiscal year 2026. It remains a source-register note.

## N. Prioritized reconciliation actions

1. Escalate the contribution-base/minimum-remuneration decision to the human owner; do not preserve `excluded` by assumption.
2. Reconcile `POLICY-MONEY-2026-001` across contributions, national tax, local tax and final net; obtain explicit human approval before any lifecycle transition.
3. Preserve the local due-gate blocker, add the in-range non-materiality proof, and schedule a year-matching source refresh.
4. Preserve the local-rounding blocker until the estimate policy and authoritative contexts are cleanly separated.
5. Add the article-13 49,997/49,998/49,999 fixture and derived full-engine RAL boundary fixtures.
6. Refresh Source Register currentness metadata for Milan and the INPS current-page/rectification check.
7. Re-run an independent verifier on every changed blocker/major finding before seeking human fiscal approval.

## O. Final M1 verification assessment

The independent reconstruction supports the substantive 2026 rates, national formulas, relief interactions, Lombardy progression, Milan rate/exemption and structural ordering. It does not support deterministic implementation because six Rule IDs and the cross-cutting money policy remain blocked.

**Progression decision: MAY PROCEED TO RECONCILIATION.**

This decision authorizes only reconciliation of findings and human decisions. It does not authorize implementation, fiscal approval, M1 completion, release, or canonical `verified` lifecycle transitions.
