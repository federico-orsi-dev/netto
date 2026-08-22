---
run_id: RUN-2026-08-22-005
date: 2026-08-22
tool: codex
role: fiscal-researcher
task: fiscal-research-inps-cigs-delta
status: completed
owner: codex
reviewer: claude
related_rules:
  - RULE-INPS-2026-002
  - RULE-INPS-2026-003
  - RULE-INPS-2026-005
  - RULE-INPS-2026-007
related_adrs:
  - ADR-0002
  - ADR-0003
  - ADR-0004
commit: null
---

# 2026 INPS CIGS profile delta research

## Objective

Resolve only the research delta created by the human-approved employer profile: a private-sector industrial employer with more than 15 employees and within CIGS scope, with general FPLD treatment proposed for a non-executive, permanent, full-year employee. Establish the employee CIGS treatment, determine whether FIS and bilateral-fund contributions are excluded, state the interaction with general FPLD and the additional 1% IVS rule, and propose the smallest defensible rounding policy for an annual estimate that does not simulate payslips.

This record supplements [RUN-2026-08-22-002](2026-08-22-002-fiscal-research-inps.md). It does not repeat or verify that run's general INPS research. All conclusions remain `candidate`, `excluded`, or `blocked`.

## Acceptance criteria

- Reopen authoritative originals for the profile-specific delta.
- Distinguish the human-approved profile facts from rates and formulas that still require independent verification.
- Determine FIS and sector-fund treatment without treating an absence assumption as a zero-valued rule.
- Keep IVS, additional IVS, CIGS, and any sector-fund component separate in evidence and trace semantics.
- Classify annual-estimate rounding accurately as product policy if it is not a statutory payroll rule.
- Propose exact boundary fixtures for the selected profile.
- Write only this run record.

## Canonical context and files inspected

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/domain/fiscal-rules-2026.md`
- `docs/domain/source-register-2026.md`
- `docs/ai-engineering/contracts/fiscal-research-and-verification.md`
- `docs/ai-engineering/contracts/run-record.md`
- `docs/ai-engineering/runs/2026-08-22-002-fiscal-research-inps.md`

Repository and Git state were inspected before writing. Existing staged and user-owned work was not modified.

## Material capabilities and side effects

- Used unauthenticated read-only web search/open against Normattiva, the Ministry of Labour, and INPS official public material.
- Used local read-only PowerShell and Git inspection, plus decimal arithmetic in PowerShell to check proposed fixtures.
- Used repository write capability only to create this authorized run record.
- No MCP server, authenticated account, opaque calculator, external API, package installation, remote Git operation, or external mutation was used.
- External side effects were ordinary unauthenticated HTTP requests to official public websites only.

## Delta disposition

| Question | Result | Status |
| --- | --- | --- |
| Does an industrial employer averaging more than 15 employees and within CIGS scope create an employee CIGS charge? | Yes. The ordinary CIGS contribution is 0.90% of previdential contribution income, split 0.60% employer and 0.30% worker. The special reduction described by INPS applied only in 2022 and has expired. | `candidate` |
| Is FIS also due? | Not if the intended industrial employer is within article 10 CIGO scope: FIS covers employers outside article 10 and outside bilateral-fund protection. CIGS scope alone is insufficient because FIS employers above 15 can also be within CIGS. | `candidate`, conditional on article 10 classification |
| Are bilateral/sector-fund employee contributions excluded? | No conclusion follows from “industrial, >15, CIGS.” An official telecom-sector example covers employers whether or not they already fall under Title I CIGO/CIGS and imposes a separate ordinary contribution. | `blocked` |
| How do FPLD, CIGS, and the additional 1% interact? | They are separate components on the contribution base. Candidate formulas are 9.19% general FPLD IVS, 0.30% CIGS, and 1% additional IVS only on the portion above EUR 56,224. CIGS does not replace or absorb IVS or additional IVS. | `candidate` |
| Is there a statutory annual-RAL rounding rule? | No single payroll-exact rule can be derived without pay-period bases and withholding mechanics. Payroll-exact rounding is excluded from this annual estimator; a disclosed cent-rounding policy can be proposed as product policy. | statutory rule `excluded`; product policy `candidate` |

## Proposed source records

The source records below are new or materially updated for this delta. Reused sources retain the complete records in RUN-002 and the canonical source register.

### SRC-INPS-2022-637

- **Issuer:** Istituto Nazionale della Previdenza Sociale (INPS), Direzione Centrale Entrate
- **Title:** Messaggio numero 637 del 09-02-2022 — Riforma degli ammortizzatori sociali in costanza di rapporto di lavoro; aspetti contributivi
- **Official URL:** https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2022.02.messaggio-numero-637-del-09-02-2022_13713.html
- **Document type:** official administrative message
- **Publication date:** 2022-02-09
- **Effective date:** revised scope from 2022-01-01; ordinary standing rates except provisions expressly limited to 2022
- **Fiscal year:** standing scope/rate mechanics relevant in 2026; temporary 2022 reductions excluded
- **Jurisdiction:** Italy; CIGS, FIS, and relevant private employers/workers
- **Access date:** 2026-08-22
- **Precise location:** paragraphs 3, 3.1, 3.2, 4, and 4.1
- **Supported claim:** industrial employers averaging more than 15 employees remain within CIGS; CIGS ordinary financing is 0.90% of previdential contribution income, split 0.60% employer and 0.30% worker. The message separately states that FIS applies to employers outside article 10 CIGO scope and outside bilateral-fund coverage. It also shows that employers above 15 can be both FIS-covered and CIGS-covered, so CIGS scope alone does not prove FIS exclusion.
- **Authority notes:** competent institution's operational instruction implementing the 2022 reform. It quotes the amended statutory scope and distinguishes permanent ordinary rates from a temporary 2022 reduction.
- **Supersession/conflict notes:** the paragraph 3.2 CIGS reduction was expressly “for the year 2022” and is not a 2026 rate. Use the ordinary 0.90%/0.30% statement, subject to independent confirmation that no later profile-specific measure applies.

### SRC-LEGAL-DLGS148-2015-ART10

- **Issuer:** Italian Republic; official Ministry of Labour and Social Policies publication
- **Title:** Decreto legislativo 14 settembre 2015, n. 148 — article 10, field of application of ordinary wage integration (CIGO)
- **Official URL:** https://www.lavoro.gov.it/sites/default/files/documenti-e-norme/normative/Documents/2015/Decreto_legislativo_14_settembre_2015_n.148.pdf
- **Document type:** primary legislation, official Ministry PDF
- **Publication date:** 2015-09-23
- **Effective date:** 2015-09-24, as subsequently amended
- **Fiscal year:** standing rule relevant in 2026 as amended
- **Jurisdiction:** Italy
- **Access date:** 2026-08-22
- **Precise location:** article 10, especially paragraph 1(a) and the listed industrial categories
- **Supported claim:** article 10 identifies industrial categories within CIGO scope, including industrial manufacturing, transport, extraction, installation, and energy/water/gas activities, with further listed categories.
- **Authority notes:** primary legal basis for the article 10 branch used by the FIS exclusion test.
- **Supersession/conflict notes:** the official PDF is the original text. Current application must be checked with current consolidated law and INPS instructions. The generic product word “industrial” must not be assumed to equal a listed article 10 classification without an explicit profile fact.

### SRC-INPS-FIS-CURRENT — updated claim

- **Issuer:** Istituto Nazionale della Previdenza Sociale (INPS)
- **Title:** Fondo d'Integrazione Salariale (FIS)
- **Official URL:** https://www.inps.it/it/it/dettaglio-scheda.it.schede-servizio-strumento.schede-servizi.50262.fondo-d-integrazione-salariale-fis-.html
- **Document type:** official live institutional service/explanation page
- **Publication date:** 2017-04-03; page last updated 2025-05-14
- **Effective date:** current standing page accessed in 2026
- **Fiscal year:** standing rule relevant in 2026
- **Jurisdiction:** Italy; employers potentially within FIS scope
- **Access date:** 2026-08-22
- **Precise location:** “Cos'è,” first expanded paragraph; contribution paragraphs under “Come funziona”
- **Supported claim:** FIS covers employers with at least one employee who are not within article 10 CIGO scope and are not protected by bilateral funds under articles 26, 27, and 40. FIS ordinary financing is calculated on monthly previdential contribution income and is shared two-thirds employer/one-third worker.
- **Authority notes:** current competent-institution explanation. This delta uses it primarily for the negative scope test, not to select a FIS rate for the approved profile.
- **Supersession/conflict notes:** CIGS can overlay FIS for employers above 15; therefore “within CIGS” does not negate FIS. Conditional FIS reductions are addressed by separate current instructions and are outside the selected profile if article 10 scope is approved.

### SRC-INPS-2024-086

- **Issuer:** Istituto Nazionale della Previdenza Sociale (INPS), Direzione Centrale Ammortizzatori Sociali, Direzione Centrale Entrate, and other central directorates
- **Title:** Circolare numero 86 del 01-08-2024 — Fondo di solidarietà bilaterale per la Filiera delle Telecomunicazioni
- **Official URL:** https://www.inps.it/content/dam/inps-site/it/scorporati/circolari-e-messaggi/2024/08/Circolare_14648/Allegati/15277_Circolare-numero-86-del-01-08-2024.pdf
- **Document type:** official administrative circular
- **Publication date:** 2024-08-01
- **Effective date:** fund discipline applicable from 2024-01-01; fully operational after appointment of its committee in 2024
- **Fiscal year:** standing fund rule relevant in 2026
- **Jurisdiction:** Italy; telecommunications supply-chain employers/workers within the fund decree
- **Access date:** 2026-08-22
- **Precise location:** paragraphs 1, 2.1, 3.2, 4, and 4.5; especially the ordinary contribution paragraph under 3.2
- **Supported claim:** the telecom fund covers all defined telecom-supply-chain enterprises, including enterprises within Title I CIGO/CIGS treatment; it supports or integrates CIGO/CIGS/AIS and imposes a monthly ordinary contribution of 0.45% of previdential contribution income for covered permanent workers, split two-thirds employer and one-third worker (employee share 0.15%).
- **Authority notes:** competent institution's detailed contribution and benefit instruction. This source is not proposed as the canonical employer profile; it is authoritative counterevidence to the claim that CIGS scope automatically excludes every sector-fund contribution.
- **Supersession/conflict notes:** no conflict with general CIGS: the fund can coexist with/integrate Title I protection for covered employers. Current 2026 INPS publication confirms the fund remains operational; the independent verifier should reopen the current message and decree before relying on the example.

### SRC-INPS-2026-2548

- **Issuer:** Istituto Nazionale della Previdenza Sociale (INPS)
- **Title:** Messaggio numero 2548 del 03-08-2026 — Fondo di solidarietà bilaterale per la Filiera delle Telecomunicazioni; principali contenuti e istruzioni contabili
- **Official URL:** https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.08.messaggio-numero-2548-del-03-08-2026_15343.html
- **Document type:** official administrative message
- **Publication date:** 2026-08-03
- **Effective date:** current 2026 instructions
- **Fiscal year:** 2026
- **Jurisdiction:** Italy; telecommunications solidarity fund
- **Access date:** 2026-08-22
- **Precise location:** official message and the INPS publication of 2026-08-04 summarizing its scope; sections on benefits and accounting instructions
- **Supported claim:** the telecom solidarity fund remains operational in 2026 and provides integration/support benefits for the totality of enterprises in its field.
- **Authority notes:** competent institution's current-year confirmation. The rate and employee split remain supported by SRC-INPS-2024-086.
- **Supersession/conflict notes:** this source corroborates current operation; it does not by itself replace the detailed 2024 rate instruction. Independent verification must check the full attachment for any 2026 change.

### Reused source records from RUN-002

- `SRC-INPS-2022-076`: current post-reform CIGS scope and ordinary 0.90%/0.30% financing; temporary 2022 reduction excluded.
- `SRC-LEGAL-DLGS148-2015-ART23`: primary basis for CIGS ordinary 0.90%, including 0.30% worker share.
- `SRC-INPS-2024-101`: general FPLD 9.19% worker IVS share and additional IVS context.
- `SRC-LEGAL-DL384-1992-ART3TER`: primary basis for the additional one percentage point above the first pensionable band when the employee pension rate is below 10%.
- `SRC-INPS-2026-006`: 2026 first pensionable band of EUR 56,224.
- `SRC-INPS-2025-156`: annual/cumulative conguaglio mechanics; only mechanics, not 2025 thresholds, are reused.
- `SRC-INPS-1998-245`: historical reporting-rounding evidence that is insufficient to define annual-estimate payroll rounding.

## Proposed updated rule records

### RULE-INPS-2026-002 — General FPLD employee IVS share

- **Year:** 2026
- **Jurisdiction:** Italy / INPS / FPLD
- **Status:** `candidate`
- **Calculation stage/order:** stage 20a, after annual contribution base and before additional IVS, CIGS, and IRPEF taxable income
- **Applicability:** canonical non-executive permanent private-sector employee only if general FPLD treatment is applicable.
- **Eligibility:** fixed profile assumption of general FPLD; no special pension fund or employee-specific relief.
- **Exclusions:** executives, special pension schemes/funds, apprentices where a different rate applies, employee-side relief, and non-contribution income.
- **Required inputs:** annual contribution base; general-FPLD profile marker.
- **Base:** annual previdential contribution income; candidate annual-estimate mapping from RAL is owned by RULE-INPS-2026-001.
- **Formula:** `baseIVS = contributionBase × 0.0919`.
- **Rates/brackets/thresholds:** 9.19% employee IVS; no bracket within the supported range for this base component.
- **Rounding:** exact decimal intermediate; public rounding follows the separately approved annual-estimate policy, not payroll-period rounding.
- **Interactions:** this is the pension component tested for the additional 1% rule. CIGS and sector-fund contributions are separate wage-support components and must not be folded into the displayed 9.19% IVS rate.
- **Edge cases:** special funds, contribution relief, contribution ceiling outside the supported range, multiple employers, part-year employment.
- **Source IDs:** `SRC-INPS-2024-101`; `SRC-INPS-2026-006`; `SRC-LEGAL-DL384-1992-ART3TER`.
- **Evidence summary:** INPS states 9.19% as the employee share for the generality of FPLD members; current-year material supplies the 2026 additional-band value.
- **Engineering interpretation:** preserve this as a named IVS component, not as “all INPS contributions.”
- **Assumptions:** general FPLD and no employee relief.
- **Unresolved questions:** independent verification of current 2026 applicability and absence of a profile-specific change.
- **Trace representation:** “Contributi pensionistici IVS (FPLD)” with base, 9.19% rate, amount, assumption, and source.
- **Required tests:** exact formula at EUR 10,000, EUR 56,223, EUR 56,224, EUR 56,225, and EUR 120,000; invariant of non-negative linear increase inside the supported range; separate trace identity from CIGS.

### RULE-INPS-2026-003 — Additional employee IVS above the first pensionable band

- **Year:** 2026
- **Jurisdiction:** Italy / INPS / FPLD
- **Status:** `candidate`
- **Calculation stage/order:** stage 20b, after base IVS and contribution base; before CIGS aggregation and IRPEF taxable income
- **Applicability:** general FPLD employee whose employee pension rate is below 10%, for annual pensionable income above the 2026 first band.
- **Eligibility:** canonical general-FPLD assumption; annual contribution base exceeds EUR 56,224.
- **Exclusions:** no amount at or below EUR 56,224; regimes not satisfying the legal rate test; other insurance-history or relief cases outside the canonical profile.
- **Required inputs:** annual pension contribution base; 2026 first pensionable band; qualifying pension-regime marker.
- **Base:** only the portion of annual pensionable contribution income above EUR 56,224.
- **Formula:** `additionalIVS = max(0, pensionContributionBase − 56224) × 0.01`.
- **Rates/brackets/thresholds:** 1%; threshold EUR 56,224 for 2026; first whole-euro RAL input producing an amount is EUR 56,225 under the RAL/base identity assumption.
- **Rounding:** calculate exact annual liability, then apply only the approved annual-estimate policy.
- **Interactions:** the rate test concerns the employee pension regime; CIGS is a separate wage-support charge and does not replace, absorb, or change this formula. Even a mechanical total of 9.19% IVS + 0.30% CIGS remains below 10%, but the trace must not mislabel 9.49% as the pension rate.
- **Edge cases:** cumulative employment with multiple employers; year-end/termination conguaglio; ceiling eligibility outside the supported range; part-year work.
- **Source IDs:** `SRC-LEGAL-DL384-1992-ART3TER`; `SRC-INPS-2026-006`; `SRC-INPS-2024-101`; `SRC-INPS-2025-156`.
- **Evidence summary:** primary law imposes an additional one percentage point above the first pensionable band for qualifying employee pension rates; INPS sets the 2026 band to EUR 56,224 and manages the liability cumulatively.
- **Engineering interpretation:** annualize the legal band exactly once; the 12/13/14 presentation selector must not change this liability.
- **Assumptions:** one full-year employment, one employer, general FPLD, no prior concurrent contribution income.
- **Unresolved questions:** independent verification of source consolidation and candidate annualization.
- **Trace representation:** “Contributo IVS aggiuntivo 1%” with excess base `max(0, base − EUR 56,224)`, rate, amount, assumption, and source.
- **Required tests:** EUR 56,223 → zero; EUR 56,224 → zero; EUR 56,225 → EUR 0.01 exact; EUR 120,000 → EUR 637.76 exact; invariance across installment selection.

### RULE-INPS-2026-005 — Complete employee social-security contribution profile

- **Year:** 2026
- **Jurisdiction:** Italy / INPS private-employer schemes
- **Status:** `blocked`
- **Calculation stage/order:** stage 20c, after contribution base and IVS component derivation; aggregate all employee social-security components before IRPEF taxable income
- **Applicability:** human-approved private-sector industrial employer with more than 15 employees and within CIGS scope; non-executive, permanent, full-year employee; general FPLD proposed.
- **Eligibility:** CIGS 0.30% is supported for the approved CIGS fact. FIS exclusion additionally requires the intended industrial employer to be within article 10 CIGO scope. Complete-profile eligibility additionally requires confirmation that no mandatory sector solidarity fund or other supplemental employee contribution applies.
- **Exclusions:** FIS only if article 10 scope is explicit; sector-fund components cannot be excluded from the complete result merely from CIGS status; executives, special pension schemes, apprentices, employee-specific relief, and exceptional classifications remain outside the canonical profile.
- **Required inputs:** whole-euro RAL plus fixed employer-profile facts: article 10 CIGO scope, more-than-15 average workforce/CIGS scope, general FPLD, and no applicable mandatory sector solidarity/supplemental fund.
- **Base:** annual previdential contribution income; under the candidate product envelope, `contributionBase = RAL`.
- **Formula:** if and only if the missing no-sector-fund fact is human-approved, `employeeContributionsExact = contributionBase × 0.0919 + contributionBase × 0.003 + max(0, contributionBase − 56224) × 0.01`.
- **Rates/brackets/thresholds:** 9.19% general FPLD IVS; 0.30% employee CIGS; 1% additional IVS above EUR 56,224. Below the band, combined selected-profile marginal rate is 9.49%; above it, 10.49%. Those combined figures are summaries only, never the pension rate.
- **Rounding:** exact decimal components; candidate annual-estimate policy is separate. No claim of payroll-exact rounding.
- **Interactions:** CIGS is added to base IVS; additional IVS applies only to excess pensionable base. All included employee social-security components reduce modeled net and precede employment-income taxable-base derivation. FIS is mutually excluded only by article 10 scope, while a sector fund may coexist with Title I CIGO/CIGS.
- **Edge cases:** a telecom-sector employer can be within Title I and also owe a sector-fund contribution; other sector funds may have different bases/rates; FIS employers above 15 can also be in CIGS; classification or fund coverage changes invalidate the fixed profile.
- **Source IDs:** `SRC-INPS-2024-101`; `SRC-INPS-2026-006`; `SRC-INPS-2022-637`; `SRC-INPS-2022-076`; `SRC-LEGAL-DLGS148-2015-ART10`; `SRC-LEGAL-DLGS148-2015-ART23`; `SRC-INPS-FIS-CURRENT`; `SRC-INPS-2024-086`; `SRC-INPS-2026-2548`.
- **Evidence summary:** authoritative evidence establishes the proposed three components for an article 10, CIGS, general-FPLD employer profile. It also supplies a current counterexample showing that a sector fund can cover employers already within CIGO/CIGS and add a worker-funded contribution.
- **Engineering interpretation:** the approved “industrial, >15, CIGS” description resolves the CIGS branch but not complete employee contributions. “No bilateral-fund substitution” is insufficient because some funds supplement or integrate Title I protection rather than substitute for it.
- **Assumptions:** RAL equals annual contribution base; valid ordinary remuneration; one employer/full year; no relief. The no-sector-fund condition is not yet approved and therefore must not be silently assumed.
- **Unresolved questions:** whether the human owner approves an article 10 industrial employer not subject to any mandatory sector solidarity/supplemental fund, or names a concrete sector/CSC/authorization-code profile that proves the same result.
- **Trace representation:** once unblocked, three separate lines: base IVS 9.19%, additional IVS 1% on excess, CIGS 0.30%; visible employer-profile assumption; no zero-valued FIS/fund line unless explicitly modeled as an exclusion with rationale.
- **Required tests:** selected-profile boundary table below; negative profile-classification test proving telecom/sector-fund treatment cannot reuse the three-component profile; FIS exclusion contract tied to article 10; exact trace separation and reconciliation; installment-selector invariance.

### RULE-INPS-2026-007 — Payroll-exact contribution rounding from annual RAL

- **Year:** 2026
- **Jurisdiction:** Italy / INPS payroll mechanics
- **Status:** `excluded`
- **Calculation stage/order:** would be cross-cutting at payroll-period contribution calculation; excluded from the annual-liability model
- **Applicability:** real payroll withholding/reporting with actual pay-period bases and conguaglio data.
- **Eligibility:** requires actual payroll-period remuneration, dates, pay distribution, reporting fields, and cumulative prior-employer values.
- **Exclusions:** excluded from the V1 annual RAL estimator because the required payroll-period facts are intentionally absent; exclusion is not equivalent to zero rounding.
- **Required inputs:** actual monthly/pay-period contribution bases, period distribution, employment changes, prior cumulative bases, reporting field rules, and conguaglio facts.
- **Base:** period-specific previdential contribution bases and reporting elements.
- **Formula:** no single defensible formula maps annual RAL directly to the exact annual sum of payslip-rounded employee contributions.
- **Rates/brackets/thresholds:** not a rate rule; period/field rounding boundaries vary by operative context.
- **Rounding:** payroll-exact behavior intentionally not modeled.
- **Interactions:** period rounding and cumulative conguaglio may create cent/euro differences versus a direct annual estimate; the UI must disclose this limitation.
- **Edge cases:** 13th/14th payslips, uneven remuneration, hire/termination, multiple employers, cumulative additional-IVS correction.
- **Source IDs:** `SRC-INPS-1998-245`; `SRC-INPS-2025-156`.
- **Evidence summary:** official material demonstrates field- and period-specific reporting plus cumulative correction mechanics, not a universal annual-RAL rounding law.
- **Engineering interpretation:** exclude payroll simulation and adopt a separately named product rounding policy for deterministic public estimates.
- **Assumptions:** none; this is an explicit non-goal.
- **Unresolved questions:** none for V1 if product policy is approved; exact payroll reconciliation remains outside scope.
- **Trace representation:** limitation text: “Stima annuale; gli arrotondamenti per periodo paga e i conguagli possono produrre differenze rispetto al cedolino.”
- **Required tests:** content test for the limitation; no dependence on installment count; no claim that annual rounded results reproduce a payslip.

## Proposed non-fiscal product policy

### POLICY-MONEY-2026-001 — Annual-estimate cent rounding

- **Status:** `candidate`; requires independent Claude review and human approval. This is product calculation policy, not an INPS fiscal rule.
- **Scope:** all public annual monetary components derived by the calculator; no individual payslip simulation.
- **Required inputs:** exact decimal annual component amounts.
- **Policy:** retain exact decimal values through each annual formula. Round each public annual component once to EUR 0.01 with decimal round-half-up. Define aggregate employee contributions as the sum of those rounded public components and use that reconciled aggregate in downstream annual taxable-income calculations. Do not re-round a component after aggregation.
- **Rationale:** deterministic, library-independent public values; a visible trace that sums exactly; avoids inventing monthly remuneration distribution.
- **Alternative considered:** round the exact aggregate once while independently rounding displayed children. Rejected as the default because visible component sums can differ from the displayed aggregate by EUR 0.01.
- **Trade-off:** component-first rounding can itself differ by EUR 0.01 from rounding the exact aggregate once. That is an explicit estimate-policy consequence, not a claim about payroll law.
- **Assumptions:** decimal arithmetic behind the domain adapter; public serializable cents; annual liability model.
- **Unresolved questions:** verifier/human selection of this policy versus aggregate-first rounding.
- **Trace representation:** methodology entry “Arrotondamento della stima” naming cent precision, half-up ties, component-first reconciliation, and the no-payslip disclaimer.
- **Required tests:** half-cent tie; values immediately below/above a half cent; component sum equals public aggregate; downstream taxable base uses the reconciled aggregate; repeat calculation determinism; no binary floating-point leakage.

## Selected-profile boundary fixtures

These fixtures assume the still-unapproved fact that the selected article 10 industrial employer has no mandatory sector solidarity/supplemental fund. Exact values are pre-rounding. “Policy total” uses proposed POLICY-MONEY-2026-001.

| RAL / contribution base | Base IVS 9.19% exact | CIGS 0.30% exact | Additional IVS exact | Exact total | Candidate policy total |
| ---: | ---: | ---: | ---: | ---: | ---: |
| EUR 10,000 | EUR 919.0000 | EUR 30.000 | EUR 0.00 | EUR 949.0000 | EUR 949.00 |
| EUR 56,223 | EUR 5,166.8937 | EUR 168.669 | EUR 0.00 | EUR 5,335.5627 | EUR 5,335.56 |
| EUR 56,224 | EUR 5,166.9856 | EUR 168.672 | EUR 0.00 | EUR 5,335.6576 | EUR 5,335.66 |
| EUR 56,225 | EUR 5,167.0775 | EUR 168.675 | EUR 0.01 | EUR 5,335.7625 | EUR 5,335.77 |
| EUR 120,000 | EUR 11,028.0000 | EUR 360.000 | EUR 637.76 | EUR 12,025.7600 | EUR 12,025.76 |

The EUR 56,225 candidate policy total is intentionally EUR 0.01 higher than rounding the exact aggregate once: IVS EUR 5,167.08 + CIGS EUR 168.68 + additional IVS EUR 0.01 = EUR 5,335.77. This is the fixture that distinguishes component-first from aggregate-first policy.

### Rounding tie fixtures

| RAL | IVS exact → policy | CIGS exact → policy | Policy total |
| ---: | ---: | ---: | ---: |
| EUR 10,004 | EUR 919.3676 → EUR 919.37 | EUR 30.012 → EUR 30.01 | EUR 949.38 |
| EUR 10,005 | EUR 919.4595 → EUR 919.46 | EUR 30.015 → EUR 30.02 | EUR 949.48 |
| EUR 10,006 | EUR 919.5514 → EUR 919.55 | EUR 30.018 → EUR 30.02 | EUR 949.57 |

EUR 10,005 produces an exact CIGS half-cent and therefore verifies the proposed half-up tie rule.

## Finding — BLOCKER: sector-fund coexistence is not excluded

- **Problem:** “private-sector industrial employer, more than 15 employees, within CIGS scope” does not determine whether an additional mandatory sector solidarity-fund employee contribution applies.
- **Evidence:** SRC-INPS-2024-086 covers all enterprises in the defined telecom supply chain, including enterprises already within Title I CIGO/CIGS, and imposes an ordinary 0.45% contribution split two-thirds employer/one-third worker. SRC-INPS-2026-2548 confirms that the telecom fund remains operational in 2026. This is an authoritative counterexample to the assumption that CIGS and bilateral/sector funds are always substitutes.
- **Impact:** the proposed three-component formula can understate employee contributions by a sector-specific amount, overstate IRPEF taxable income before tax effects are applied, and overstate net salary. In the telecom example, the ordinary employee fund share is 0.15% of its prescribed base. The complete profile cannot be verified while the sector/fund fact remains unspecified.
- **Available options:**
  1. Human-approve the narrow fixed assumption: an article 10 industrial employer with more than 15 employees, within CIGS scope, and not subject to any mandatory sector solidarity/supplemental fund carrying an employee contribution.
  2. Name a concrete sector/ATECO/CSC/authorization-code employer archetype and research its complete contribution table.
  3. Intentionally omit sector-fund contributions as a disclosed approximation. This weakens the “complete employee contributions” claim and is not recommended.
  4. Add employer classification inputs. This expands V1 product scope and is not recommended.
- **Recommended human decision:** option 1. It is the smallest change that makes the fixed-profile estimator deterministic without adding user inputs. The approval text should explicitly say “article 10 CIGO industrial employer” and “no mandatory sector solidarity or supplemental fund contribution,” not merely “no bilateral-fund substitution.”

## Findings resolved by this delta

1. The approved CIGS fact supports a candidate 0.30% employee CIGS component on previdential contribution income; the temporary lower 2022 rate does not apply in 2026.
2. FIS is excluded only through explicit article 10 CIGO scope, not through CIGS scope alone.
3. FPLD IVS 9.19%, additional IVS 1% over EUR 56,224, and CIGS 0.30% are separate trace/formula components.
4. Exact payslip/statutory rounding is not derivable from one annual RAL input and should be excluded. The proposed deterministic cent policy is a product policy requiring review/approval.

## Verification performed

- Reopened INPS Message 637/2022 and checked the industrial-more-than-15 CIGS statement, ordinary 0.90%/0.30% split, temporary 2022 reduction, FIS scope, and the fact that FIS employers above 15 can also be CIGS-covered.
- Reopened INPS Circular 76/2022 and checked its ordinary CIGS rate/base and scope instructions.
- Reopened the current INPS FIS page and checked the article 10 and bilateral-fund exclusion conditions.
- Reopened the official Ministry text of D.Lgs. 148/2015 for articles 10 and 23.
- Reopened INPS Circular 86/2024 and current 2026 telecom-fund material; confirmed the sector-fund coexistence counterexample and worker-funded ordinary contribution.
- Cross-checked the FPLD and additional-IVS interaction against RUN-002's official sources.
- Calculated exact boundary and half-cent fixtures with decimal arithmetic; no production code or opaque calculator was used.
- Did not verify any rule or persist any canonical status transition.

## Changes made

Created only `docs/ai-engineering/runs/2026-08-22-005-fiscal-research-inps-cigs-delta.md`. No canonical rule/source document, project state, architecture, agent instruction, historical run, package, or application file was changed.

## Assumptions and decisions affected

- The approved profile resolves CIGS applicability but not sector-fund non-applicability.
- The canonical phrase “no FIS or bilateral-fund substitution” is too weak for complete contributions because supplemental funds can coexist with CIGO/CIGS.
- The annual-estimate rounding decision belongs to product/domain calculation policy and must not be presented as statutory payslip rounding.
- The 12/13/14 installment selector remains presentation-only and cannot affect any contribution formula or threshold.

## Human approval status

The human owner approved industrial-employer, more-than-15, CIGS-scope, and general-FPLD profile applicability only. No rate, base, formula, rounding policy, source interpretation, or no-sector-fund assumption is verified or approved by this run. Researcher self-verification is prohibited.

## Unresolved issues

1. Human approval of the explicit article 10 and no-mandatory-sector-fund profile facts, or selection of a concrete sector/CSC for further research.
2. Independent Claude reconstruction of all cited originals and the sector-fund coexistence blocker.
3. Human selection of the annual-estimate rounding policy after independent review.
4. Independent confirmation that no later profile-specific 2026 rule changes the candidate CIGS or FPLD rates.

## Recommended next action

The M1 coordinator should surface the narrow sector-fund approval choice to the human owner before treating RULE-INPS-2026-005 as a complete candidate formula. After that decision, an independent Claude fiscal verifier should reopen the originals, review POLICY-MONEY-2026-001 separately from fiscal law, and report findings. No rule may become `verified` without the repository's full verification and human-approval gate.
