---
title: Fiscal Rule Catalog 2026
fiscal_year: 2026
jurisdiction: Italy / Lombardy / Milan
scenario: standard private-sector employee
status: m1-verified
---

# Fiscal Rule Catalog 2026

This is the canonical owner of fiscal rules for the 2026 calculation. It records evidence-derived rules; it is not executable configuration. Source metadata belongs in [Source Register 2026](source-register-2026.md).

## Correctness envelope

- Whole-euro RAL from EUR 10,000 through EUR 120,000 inclusive.
- Private-sector, non-executive employee; permanent employment; full 2026 fiscal year; article 10 CIGO industrial employer with more than 15 employees, within CIGS scope, and not subject to any mandatory sector solidarity/supplemental fund carrying an employee contribution.
- Resident in Milan, Lombardy; no dependants, other income, personal deductions, incentives, bonuses, benefits, pension-fund deductions, or exceptional circumstances.
- RAL is fixed annual gross cash employment remuneration subject to ordinary employee taxation and employee social-security contributions; TFR is excluded. RAL and legal contributable remuneration remain distinct concepts; their V1 identity is a proposed product assumption, not verified law.
- Annual liability is modeled. Payroll withholding timing, advances, balances, and individual thirteenth/fourteenth-month payslips are not.

## Lifecycle

Allowed states are exactly `candidate`, `verified`, `excluded`, and `blocked`. Codex research may create candidate, excluded, or blocked records. A material rule becomes verified only after authoritative evidence, complete applicability, documented interpretation, independent Claude verification, resolution of material findings, and explicit human approval.

## Required record fields

Each rule owns: stable Rule ID; name; fiscal year; jurisdiction; status; calculation stage/order; applicability; eligibility; exclusions; required inputs; calculation base; formula; rates; brackets; thresholds; rounding behavior; interactions/order; edge cases; Source IDs; evidence summary; engineering interpretation; assumptions; unresolved questions; expected trace representation; and required tests.

## Verified calculation stages

Research must establish, rather than assume, the legally material relationships among:

1. RAL and social-security contribution base.
2. Employee social-security contributions.
3. IRPEF taxable income and gross IRPEF.
4. Employment deductions and automatic relief.
5. Net IRPEF.
6. Lombardy regional additional tax.
7. Milan municipal additional tax.
8. Modeled deductions and estimated annual net.

Independent review assessed the same 24 Rule IDs one-for-one at Checkpoint A, and the targeted re-review later resolved the approved assumption/policy handoffs. Review dispositions were reconciled against authoritative evidence before the human owner approved the bounded M1 fiscal foundation on 2026-08-22. This catalog now contains 15 `verified`, 9 `excluded`, 0 `candidate`, and 0 `blocked` rules. The separate engineering money policy is `approved` outside the fiscal-rule lifecycle.

## Fiscal rules — social security

### RULE-INPS-2026-005 — Complete employee social-security contribution profile

- **Fiscal year / jurisdiction:** 2026; Italy; INPS private-employer schemes.
- **Status:** `verified` for the bounded V1 profile after authoritative research, independent review, reconciliation, and explicit human fiscal approval on 2026-08-22.
- **Calculation stage/order:** derive after contribution base and before IRPEF taxable income; employee-paid pension and wage-support/fund components reduce annual net and the employment-income tax base.
- **Applicability:** canonical private-sector, non-executive, permanent employee working for an article 10 CIGO industrial employer with more than 15 employees, within CIGS scope, and not subject to any mandatory sector solidarity/supplemental fund carrying an employee contribution. General FPLD treatment is the verified pension profile.
- **Eligibility:** the human-approved fixed archetype supplies the article 10 CIGO, headcount, CIGS-scope, and no-employee-funded-sector/supplemental-fund facts required to select the contribution treatment. Independent evidence supports the named component rates and composition; the separately approved contribution-base assumption and annual-estimate money policy make the bounded result deterministic without becoming fiscal law.
- **Exclusions:** FIS only if article 10 CIGO scope is explicit; a sector fund cannot be excluded merely because CIGO/CIGS applies. Executives, apprentices, special pension schemes, employee-specific relief, and employers outside the final fixed archetype remain excluded.
- **Required inputs:** whole-euro RAL only. Article 10 CIGO industrial scope, more-than-15 average workforce/CIGS scope, general FPLD, and no applicable mandatory employee-funded sector solidarity/supplemental fund are fixed disclosed scenario assumptions rather than user inputs.
- **Calculation base:** contribution income; under the product contract, annual RAL maps to this base only as an explicit valid-remuneration estimate assumption.
- **Formula/rates:** general 9.19% employee FPLD pension share, separate 0.30% employee CIGS share for the approved archetype, and a further 1% on the 2026 pension base above EUR 56,224.
- **Brackets/thresholds:** additional 1% threshold of EUR 56,224; approved employer headcount is above 15 and CIGS scope is assumed. The verified 2026 EUR 122,295 pension ceiling is above the supported EUR 120,000 maximum and therefore does not change an in-range result.
- **Rounding behavior:** normalize each public employee contribution component under approved `POLICY-MONEY-2026-001`, then sum those normalized components and use that aggregate downstream. This is not payroll-exact behavior.
- **Interactions/ordering:** total employee contributions precede calculation of employment-income taxable base. Omitting an applicable supplemental component changes contributions, taxable income, tax, and net.
- **Edge cases:** employers covered by CIGS, FIS at different headcounts, sector bilateral funds, conditional FIS reductions, profile changes, multiple employers, or an expanded salary ceiling.
- **Source IDs:** `SRC-INPS-2024-101`, `SRC-INPS-2026-006`, `SRC-INPS-CLASSIFICATION-2025`, `SRC-INPS-2022-637`, `SRC-INPS-2022-076`, `SRC-LEGAL-DLGS148-2015-ART10`, `SRC-LEGAL-DLGS148-2015-ART23`, `SRC-INPS-FIS-CURRENT`, `SRC-INPS-2025-005`, `SRC-INPS-2024-086`, `SRC-INPS-2026-2548`.
- **Evidence summary:** INPS identifies 9.19% as the general FPLD pension share and separately ties other contribution characteristics to employer classification and wage-support coverage. Official evidence supports a 0.30% employee CIGS component for the fixed archetype and a current telecom-sector counterexample in which a 0.15% employee-funded sector contribution coexists with CIGO/CIGS. The previously unresolved amount-producing base/policy handoff is now governed by the approved V1 assumption and product money policy; no new fixed-profile rate was discovered.
- **Engineering interpretation:** model FPLD, additional IVS, and CIGS as separate verified components under the fixed archetype. The no-sector-fund fact is an explicit scenario boundary, not a zero-valued calculated component, and the result must never be described as universal for all private employees.
- **Assumptions:** article 10 CIGO industrial employer; average workforce above 15; employer and worker within CIGS scope; general FPLD employee; no mandatory sector solidarity/supplemental fund carrying an employee contribution; no special relief.
- **Unresolved questions:** none material within the bounded V1 profile; reopen on employer-profile, fund-coverage, contribution-regime, fiscal-year, or supported-range change.
- **Expected trace representation:** once resolved, list the 9.19% pension component, additional 1% when active, and any selected wage-support/fund component separately, with the employer-profile assumption visible.
- **Required tests:** threshold fixtures at RAL EUR 56,223/56,224/56,225; profile-table fixtures for CIGS, FIS headcount variants and bilateral-fund coverage; supported maximum EUR 120,000; exact reconciliation after the approved rounding policy.

Full candidate source/rule reconstruction and alternatives are retained in [RUN-2026-08-22-002](../ai-engineering/runs/2026-08-22-002-fiscal-research-inps.md) and its [CIGS delta](../ai-engineering/runs/2026-08-22-005-fiscal-research-inps-cigs-delta.md). The final fixed profile was approved by the human owner on 2026-08-22; that approval does not verify any rate, base, formula, ordering, or rounding policy.

### RULE-INPS-2026-001 — Canonical contribution base from RAL

- **Fiscal year / jurisdiction / status:** 2026; Italy / INPS / FPLD; `verified` within the human-approved V1 estimator assumption; the equality itself remains product scope, not fiscal law.
- **Calculation stage/order:** derive the annual contribution base before pension, CIGS, and IRPEF calculations.
- **Applicability / eligibility:** full-year subordinate employment under the cash-only RAL contract; general FPLD profile and lawful ordinary contribution-subject remuneration.
- **Exclusions:** TFR, benefits, bonuses, reimbursements, exceptional pay, multiple employers, relief, and omitted contribution-income components.
- **Required inputs / calculation base:** distinct `annualGrossSalary` and `annualContributableRemuneration` concepts. V1 collects whole-euro RAL and proposes `annualContributableRemuneration = annualGrossSalary` under the fixed profile.
- **Formula:** approved product-domain identity `annualContributableRemuneration = annualGrossSalary` within the correctness envelope; not a statutory formula.
- **Rates / brackets / thresholds:** none; legal minima and the pension ceiling are separate rules.
- **Rounding behavior:** whole-euro RAL maps exactly to the V1 contributable-remuneration concept; normalized employee contribution components and aggregates are owned by `POLICY-MONEY-2026-001`.
- **Interactions/order:** all employee contribution components use this base; their aggregate precedes the employment-income tax base.
- **Edge cases:** under-minimum pay, part-time/part-year work, non-cash pay, or other contribution income invalidate the identity.
- **Source IDs:** `SRC-LEGAL-DLGS314-1997-ART6`, `SRC-INPS-2026-006`.
- **Evidence summary:** law defines contribution income in the reference period and preserves contribution minima; it does not equate user-entered RAL with the legal base. The one-input identity can therefore exist only as a bounded estimator assumption.
- **Engineering interpretation:** keep the two domain concepts separate and derive one from the other only under a visible assumption; do not add CCNL, hours, level, or pay-period inputs to this focused estimator.
- **Assumptions / unresolved questions:** approved: one employer, full year, lawful ordinary cash RAL, fully contribution-subject except where an explicit modeled rule states otherwise, with no omitted contribution income or relief. Independent review confirmed that this is product scope rather than verified legal identity; reopen when the input/profile contract changes.
- **Expected trace representation:** estimated contribution base, identity formula, assumptions, and sources.
- **Required tests:** identity at EUR 10,000, 56,223/56,224/56,225, 119,999, and 120,000; installment-count invariance.

### RULE-INPS-2026-002 — General FPLD employee IVS share

- **Fiscal year / jurisdiction / status:** 2026; Italy / INPS / FPLD; `verified`.
- **Calculation stage/order:** base employee pension contribution after the contribution-base/ceiling stage.
- **Applicability / eligibility:** ordinary general-FPLD non-agricultural employee under the fixed profile.
- **Exclusions:** executives or workers in special funds, apprentices, domestic/agricultural work, sector-specific pension schemes, relief, and waivers.
- **Required inputs / calculation base:** annual pension contribution base and fixed FPLD profile.
- **Formula:** `baseEmployeeIVS = pensionContributionBase × 0.0919`.
- **Rates / brackets / thresholds:** employee 9.19%; total IVS 33%, with employer 23.81% outside product scope; no bracket in this component.
- **Rounding behavior:** calculate the exact formula result, then normalize the public component under `POLICY-MONEY-2026-001`.
- **Interactions/order:** the additional 1% and CIGS are separate components; never label 9.19% as the complete contribution burden.
- **Edge cases:** different pension classifications or relief change the rate.
- **Source IDs:** `SRC-INPS-2024-101`, `SRC-INPS-2026-006`, `SRC-INPS-CLASSIFICATION-2025`.
- **Evidence summary:** INPS states the 9.19% employee share for the generality of FPLD members and separates the additional band contribution.
- **Engineering interpretation:** expose a named IVS pension component, not a generic all-INPS amount.
- **Assumptions / unresolved questions:** general FPLD, no relief, and the approved V1 contribution-base assumption; reopen for a different pension profile or relief.
- **Expected trace representation:** base, 9.19%, multiplication, amount, FPLD assumption, source.
- **Required tests:** exact pre-round amounts: EUR 10,000 → 919; EUR 56,224 → 5,166.9856; EUR 120,000 → 11,028; proportionality below any ceiling.

### RULE-INPS-2026-003 — Additional employee IVS above the first pensionable band

- **Fiscal year / jurisdiction / status:** 2026; Italy / INPS / FPLD; `verified`.
- **Calculation stage/order:** after base IVS and before aggregate employee contributions.
- **Applicability / eligibility:** employee pension rate below 10%, including the fixed 9.19% FPLD profile; positive pension base above EUR 56,224.
- **Exclusions:** no amount at/below the band, regimes with employee pension rate at least 10%, and base beyond an applicable ceiling.
- **Required inputs / calculation base:** annual pension base, pension profile, and ceiling eligibility if future range expands; excess over EUR 56,224.
- **Formula:** in range, `max(0, annualPensionBase - 56224) × 0.01`.
- **Rates / brackets / thresholds:** 1% on the excess; annual band EUR 56,224; payroll monthly reference EUR 4,685.
- **Rounding behavior:** annual post-conguaglio estimate; calculate the exact formula result, then normalize the public component under `POLICY-MONEY-2026-001`; no installment simulation.
- **Interactions/order:** add separately to base IVS and include before the tax base; 12/13/14 selection never changes it.
- **Edge cases:** multiple employers and payroll timing require cumulative facts outside scope.
- **Source IDs:** `SRC-LEGAL-DL384-1992-ART3TER`, `SRC-INPS-2026-006`, `SRC-INPS-2025-156`.
- **Evidence summary:** primary law supplies the extra percentage and INPS supplies the 2026 band and cumulative annual mechanics.
- **Engineering interpretation:** apply an annual excess-base formula and disclose that withholding timing is not simulated.
- **Assumptions / unresolved questions:** one employer/full year and base rate 9.19%; reopen for multiple employment relationships, period simulation, or fiscal-year change.
- **Expected trace representation:** annual base, band, excess, 1%, amount, assumption, source.
- **Required tests:** EUR 56,223 → 0; 56,224 → 0; 56,225 → 0.01; 120,000 → 637.76; installment invariance.

### RULE-INPS-2026-004 — Annual pension contribution-base ceiling

- **Fiscal year / jurisdiction / status:** 2026; Italy / eligible contribution-system workers; `verified` and inactive within the supported range.
- **Calculation stage/order:** constrain pension base before base and additional IVS.
- **Applicability / eligibility:** workers first compulsorily insured from 1996 or qualifying optants.
- **Exclusions:** pre-1996 seniority without a qualifying option.
- **Required inputs / calculation base:** contribution base plus insurance-history/option facts; annual pension base.
- **Formula:** eligible `min(annualContributionBase, 122295)`; otherwise no Law 335 ceiling.
- **Rates / brackets / thresholds:** EUR 122,295 for 2026; not monthly apportioned.
- **Rounding behavior:** official whole-euro threshold.
- **Interactions/order:** also caps additional IVS for eligible workers; no supported RAL reaches it.
- **Edge cases:** multiple employers, wrong declarations, option status, or range expansion.
- **Source IDs:** `SRC-LEGAL-L335-1995-ART2-C18`, `SRC-INPS-2026-006`.
- **Evidence summary:** primary law defines eligibility and INPS publishes the 2026 amount.
- **Engineering interpretation:** retain as a versioned no-op in range; unknown insurance history cannot change a result at or below EUR 120,000.
- **Assumptions / unresolved questions:** base does not exceed RAL; none material in range, but eligibility becomes blocking if range exceeds the ceiling.
- **Expected trace representation:** methodology note that the 2026 ceiling is not reached.
- **Required tests:** EUR 120,000 uncapped for both branches; out-of-range configuration fixtures 122,294/122,295/122,296.

### RULE-INPS-2026-006 — Minimum contribution remuneration

- **Fiscal year / jurisdiction / status:** 2026; Italy / INPS; `excluded` from V1 under the human-approved lawful-ordinary-remuneration estimator assumption.
- **Calculation stage/order:** legal payroll base guard before contribution-base derivation; V1 cannot calculate it from RAL alone.
- **Applicability / eligibility:** actual payroll subject to statutory and collective minima.
- **Exclusions:** calculation is excluded under the approved assumption; the legal minimum is never treated as zero and V1 makes no minimum-remuneration compliance claim.
- **Required inputs / calculation base:** if modeled, days, hours, schedule, category, CCNL/level, pay periods and absences; period-specific required minimum.
- **Formula:** not derivable from RAL alone; general 2026 daily floor is EUR 58.13 but collective/part-time rules may differ.
- **Rates / brackets / thresholds:** EUR 58.13 general daily value; category-specific overlays.
- **Rounding behavior:** payroll-period behavior not modeled.
- **Interactions/order:** could uplift a real legal base if remuneration facts were noncompliant or incomplete.
- **Edge cases:** low RAL, part time, unpaid absence, hire/termination, CCNL level.
- **Source IDs:** `SRC-INPS-2026-006`, `SRC-LEGAL-DLGS314-1997-ART6`.
- **Evidence summary:** current INPS instructions retain statutory and higher legal/collective minima.
- **Engineering interpretation:** disclose that V1 is not a payroll-compliance validator and do not collect CCNL/hours/level/pay-period facts solely to reproduce legal-minimum mechanics.
- **Assumptions / unresolved questions:** the human-approved lawful-ordinary-remuneration assumption justifies this bounded exclusion; reopen on any compliance claim or input/scope expansion.
- **Expected trace representation:** limitation, never a zero deduction row.
- **Required tests:** low-RAL limitation copy and no fabricated annual minimum.

### RULE-INPS-2026-007 — Annual-estimate contribution rounding

- **Fiscal year / jurisdiction / status:** 2026; INPS normative/payroll behavior; `excluded` from V1.
- **Calculation stage/order:** none in the V1 product calculation; deterministic estimator normalization is owned by `POLICY-MONEY-2026-001`.
- **Applicability / eligibility:** exact normative/payroll contribution rounding would require actual reporting-period facts and authoritative operational rules.
- **Exclusions:** V1 makes no payroll-exact or statutory annual-rounding claim.
- **Required inputs / calculation base:** exact decimal annual components; payroll-exact inputs are intentionally absent.
- **Formula:** not modeled as fiscal law. Approved `POLICY-MONEY-2026-001` supplies deterministic product behavior.
- **Rates / brackets / thresholds:** none; the product's EUR 0.005 half-tie is engineering policy, not a fiscal threshold.
- **Rounding behavior:** exact normative behavior remains unevidenced and excluded; never infer it from the approved product policy.
- **Interactions/order:** changes aggregate contributions, downstream taxable income, taxes, and visible trace reconciliation.
- **Edge cases:** repeating fund shares, half cents, sum-of-rounded versus rounded-sum differences, negative zero.
- **Source IDs:** `SRC-INPS-1998-245`, `SRC-INPS-2025-156`.
- **Evidence summary:** official reporting rules are period/field-specific and do not establish one exact annual-RAL rounding algorithm.
- **Engineering interpretation:** keep deterministic estimator normalization separate from payroll law and visible in the methodology.
- **Assumptions / unresolved questions:** none for the exclusion; reopen only if the product claims payroll/reporting exactness.
- **Expected trace representation:** exact amount, scale/mode, rounded amount, and no-payslip disclaimer.
- **Required tests:** methodology makes no normative/payroll-exact contribution-rounding claim; product half-cent and reconciliation tests belong to `POLICY-MONEY-2026-001`.

### RULE-INPS-2026-008 — Payroll-exact contribution rounding from annual RAL

- **Fiscal year / jurisdiction / status:** 2026; Italy / INPS payroll mechanics; `excluded`.
- **Calculation stage/order:** would operate per pay/reporting period; excluded from this annual model.
- **Applicability / eligibility:** real payroll with period bases, distribution, prior cumulative values, and conguaglio data.
- **Exclusions:** all individual payslip and 13th/14th-month rounding simulation.
- **Required inputs / calculation base:** actual pay-period contribution bases, dates, distribution, prior employers, reporting-field rules; none are collected.
- **Formula / rates / brackets / thresholds:** no single defensible mapping from annual RAL; not a rate rule.
- **Rounding behavior:** payroll-exact behavior intentionally not modeled.
- **Interactions/order:** payroll rounding/conguaglio may differ from direct annual estimates.
- **Edge cases:** uneven pay, multiple employers, hire/termination, cumulative-IVS corrections.
- **Source IDs:** `SRC-INPS-1998-245`, `SRC-INPS-2025-156`.
- **Evidence summary:** official material establishes period/field and cumulative mechanics rather than a universal annual formula.
- **Engineering interpretation:** keep this exclusion distinct from the unresolved public annual-estimate policy; this new ID resolves semantic drift in earlier research records.
- **Assumptions / unresolved questions:** none for the exclusion.
- **Expected trace representation:** limitation text only.
- **Required tests:** no dependence on installment count and no payroll-exact claim.

## Cross-cutting calculation semantics

### POLICY-MONEY-2026-001 — Annual-estimate cent rounding

- **Status / scope:** `approved` by the human owner on 2026-08-22; deterministic V1 product/calculation policy outside the four-state fiscal-rule lifecycle; not fiscal law.
- **Internal numeric precision:** configure the domain-owned decimal adapter from ADR-0003 for 40 significant decimal digits. This is an engineering representation bound, not a fiscal rounding point. Do not use binary floating point or ad hoc intermediate rounding; public values remain library-independent and serializable.
- **Statutory precedence:** apply every verified rule-specific truncation, rounding, scale, or ordering instruction before this policy. Article-13 `trunc4` is the canonical current example. The product policy never creates or overrides fiscal mechanics.
- **Component normalization:** after its statutory mechanics, normalize every monetary component exposed as a child of a displayed aggregate to EUR 0.01 using decimal half-up unless its owning verified rule requires something more specific. Formula bases, rates, ratios, and non-monetary trace metadata remain exact and are not normalization nodes. An exact pre-normalization amount may appear as trace metadata, but never as a competing displayed aggregation child.
- **Aggregate calculation:** derive each displayed aggregate exclusively as the sum of its normalized public child components, and use that reconciled aggregate at downstream monetary handoffs. Do not separately round an exact aggregate to a competing value.
- **Display precision:** public euro amounts display two decimal places. Formatting never feeds calculations; negative zero serializes/displays as positive zero. Exact pre-normalization values may remain in the inspectable trace where useful.
- **Reconciliation invariant:** at every public aggregation node, `displayedAggregate = sum(displayedComponents)` exactly in canonical cents. The final annual-net node must reconcile from the same displayed contribution, tax, local-tax, and cash-benefit components; monthly and contractual-instalment values derive from annual net and never change annual fiscal components.
- **Rationale / trade-off:** visible components and aggregates reconcile exactly. At RAL EUR 10,005 the approved contribution policy yields EUR 919.46 IVS + EUR 30.02 CIGS = EUR 949.48, rather than the EUR 949.47 produced by aggregate-first rounding. This one-cent difference is disclosed estimator behavior, not a payroll-exact claim.
- **Alternatives considered:** aggregate-first rounding; payroll-period simulation; whole-euro return-style rounding.
- **Approval state:** human-approved product policy. Targeted independent re-review confirmed ownership, precedence, handoffs, and invariants; the policy remains outside the fiscal-rule lifecycle and must never be reinterpreted as law.
- **Trace / tests:** expose exact value, scale, mode and rounded value; test half-cent ties, adjacent values, reconciliation, determinism, and absence of binary-float leakage.

## Fiscal rules — national income tax and automatic relief

### RULE-NAT-BASE-2026 — Ordinary employment income and IRPEF taxable base

- **Fiscal year / jurisdiction / status:** 2026; Italy; `verified`.
- **Calculation stage/order:** after mandatory employee contributions; before gross IRPEF.
- **Applicability / eligibility:** resident full-year employee with only ordinary cash employment income under TUIR article 49.
- **Exclusions:** TFR, benefits, bonuses, substitute-taxed/exempt pay, employer contributions, other income, and personal article 10 deductions.
- **Required inputs / calculation base:** RAL and aggregate mandatory employee contributions; under the scenario employment income, total income and taxable income coincide.
- **Formula:** `employmentIncome = RAL - mandatoryEmployeeContributions`; `nationalIrpefTaxableIncome = employmentIncome`.
- **Rates / brackets / thresholds:** none.
- **Rounding behavior:** use the normalized, reconciled employee-contribution aggregate from `POLICY-MONEY-2026-001`; no new statutory rounding is inferred.
- **Interactions/order:** contributions are excluded under article 51, not applied as a later tax credit; this base feeds national and local rules.
- **Edge cases:** undecomposed exempt/substitute-taxed components invalidate the identity.
- **Source IDs:** `SRC-NAT-TUIR-ART3-2026`, `SRC-NAT-TUIR-ART51-2026`.
- **Evidence summary:** TUIR defines resident taxable income and excludes mandatory employee contributions from employment income.
- **Engineering interpretation:** the identity is valid only inside the fixed no-other-income/no-other-deduction scenario.
- **Assumptions / unresolved questions:** one full-year job and all RAL ordinary; contribution and money handoffs are governed by the approved V1 assumption and policy.
- **Expected trace representation:** RAL, contributions, resulting income, assumptions, sources.
- **Required tests:** identity, non-negative base, source-linked contribution handoff, and rejection/exclusion of undecomposed special pay.

### RULE-NAT-GROSS-IRPEF-2026 — Progressive gross IRPEF

- **Fiscal year / jurisdiction / status:** 2026; Italy; `verified`.
- **Calculation stage/order:** after national taxable base; before deductions and credits.
- **Applicability / eligibility:** resident individual subject to ordinary IRPEF.
- **Exclusions:** substitute-taxed components.
- **Required inputs / calculation base:** national IRPEF taxable income `B`.
- **Formula:** `0.23×min(B,28000) + 0.33×min(max(B-28000,0),22000) + 0.43×max(B-50000,0)`.
- **Rates / brackets / thresholds:** 23% through EUR 28,000; 33% over 28,000 through 50,000; 43% above 50,000.
- **Rounding behavior:** compute each statutory bracket slice exactly, normalize each public bracket-tax component under `POLICY-MONEY-2026-001`, and sum those components to gross IRPEF; no article-11-specific rounding is inferred.
- **Interactions/order:** marginal tranches; gross tax limits available deduction capacity.
- **Edge cases:** exact 28,000 and 50,000 endpoints.
- **Source IDs:** `SRC-NAT-TUIR-ART11-2026`, `SRC-NAT-L199-ART1-2026`.
- **Evidence summary:** L. 199/2025 changes the second rate to 33% from 2026.
- **Engineering interpretation:** apply each rate only to its taxable slice.
- **Assumptions / unresolved questions:** base from `RULE-NAT-BASE-2026`; none material within the 2026 V1 envelope.
- **Expected trace representation:** one row per occupied bracket with bounds, slice, rate, tax, source.
- **Required tests:** taxable-income fixtures 27,999/28,000/28,001 and 49,999/50,000/50,001; continuity and monotonicity.

### RULE-NAT-EMPLOYMENT-DEDUCTION-2026 — Employment-income deduction

- **Fiscal year / jurisdiction / status:** 2026; Italy; `verified`.
- **Calculation stage/order:** after gross IRPEF; before net IRPEF.
- **Applicability / eligibility:** full-year permanent employee income under TUIR articles 49/13; total income at most EUR 50,000.
- **Exclusions:** pensions, fixed-term minimum, and partial-year proration.
- **Required inputs / calculation base:** total income `R`, fixed 365 work days, permanent-contract flag; base is total income net of principal-residence income, equal to employment income here.
- **Formula:** `R<=15000: 1955`; `15000<R<=28000: 1910+1190×trunc4((28000-R)/13000)`; `28000<R<=50000: 1910×trunc4((50000-R)/22000)`; above 50,000: zero; add EUR 65 iff `25000<R<=35000`.
- **Rates / brackets / thresholds:** bands at EUR 15,000, 25,000, 28,000, 35,000 and 50,000; full-year factor 365/365.
- **Rounding behavior:** positive statutory ratios are truncated to their first four decimal digits before multiplication, then the public monetary component is normalized under `POLICY-MONEY-2026-001`. Statutory truncation takes precedence.
- **Interactions/order:** deduction is capacity-capped with other deductions at gross tax and participates in trattamento-integrativo tests.
- **Edge cases:** formula discontinuities above 15,000 and around the EUR 65 band; truncation may yield zero just below 50,000.
- **Source IDs:** `SRC-NAT-TUIR-ART13-2026`, `SRC-NAT-L207-ART1-2-9`, `SRC-NAT-ADE-CIR4E-2025`.
- **Evidence summary:** article 13 supplies formulas/ratio handling; Agenzia confirms the EUR 65 amount is not work-day prorated.
- **Engineering interpretation:** truncate only the statutory ratio; retain exact multiplication until the approved money boundary.
- **Assumptions / unresolved questions:** 365 days, permanent employment, no other income; no material formula ambiguity remains, while public money policy remains separate.
- **Expected trace representation:** band, raw/truncated ratio, base deduction, EUR 65 adjustment, final amount, source.
- **Required tests:** EUR 1 around all five stated thresholds, explicit four-decimal examples, capacity cap, and the effective zero transition at direct income EUR 49,997 / 49,998 / 49,999 (deduction EUR 0.191 / 0 / 0 before public rounding).

### RULE-NAT-NET-IRPEF-2026 — Net ordinary IRPEF

- **Fiscal year / jurisdiction / status:** 2026; Italy; `verified`.
- **Calculation stage/order:** after modeled deductions; before separate non-taxable cash benefits.
- **Applicability / eligibility:** ordinary IRPEF in the fixed scenario.
- **Exclusions:** personal/family deductions and foreign-tax credits.
- **Required inputs / calculation base:** gross IRPEF, employment deduction, cuneo additional deduction; base is gross tax.
- **Formula:** `max(0, grossIrpef - employmentDeduction - cuneoAdditionalDeduction)`.
- **Rates / brackets / thresholds:** inherits component thresholds.
- **Rounding behavior:** use normalized public gross-tax and deduction components, apply the non-negative cap, and normalize the resulting public net-tax component under `POLICY-MONEY-2026-001`; no new statutory rule is inferred.
- **Interactions/order:** deductions cannot make tax negative; cuneo cash sum and trattamento integrativo remain downstream cash additions.
- **Edge cases:** deduction excess is non-refundable absent a separate rule.
- **Source IDs:** `SRC-NAT-TUIR-ART11-2026`, `SRC-NAT-L207-ART1-2-9`, `SRC-NAT-DL3-ART1-2026`.
- **Evidence summary:** TUIR caps deductions at gross tax and statutes classify the cash measures separately.
- **Engineering interpretation:** separate liability reduction from positive cash benefits in result and trace.
- **Assumptions / unresolved questions:** only modeled deductions apply; the unresolved local de-minimis edge is boundedly excluded under the supported-range invariant.
- **Expected trace representation:** gross tax, each deduction, capacity cap, net tax, separate benefits.
- **Required tests:** non-negative invariant, order, and no cash benefit inside deduction capacity.

### RULE-NAT-CUNEO-SUM-2026 — Non-taxable fiscal-wedge sum

- **Fiscal year / jurisdiction / status:** 2026; Italy; `verified`.
- **Calculation stage/order:** eligibility from income; cash addition after liabilities.
- **Applicability / eligibility:** non-pension employee with adjusted total income `R <= 20000`.
- **Exclusions:** pensions, income above limit, and absent impatriate adjustments.
- **Required inputs / calculation base:** actual employment income `E`, adjusted total income `R`, annualized employment income; base is actual `E`.
- **Formula:** subject to `R<=20000`: `E×7.1%` through annualized E 8,500; `E×5.3%` over 8,500 through 15,000; `E×4.8%` above 15,000.
- **Rates / brackets / thresholds:** 7.1%, 5.3%, 4.8%; E thresholds 8,500/15,000 and R ceiling 20,000.
- **Rounding behavior:** calculate the exact formula result and normalize the public component under `POLICY-MONEY-2026-001`.
- **Interactions/order:** non-taxable cash addition; may coexist with low-income trattamento integrativo; mutually exclusive by income with the cuneo deduction.
- **Edge cases:** discrete amount changes after 8,500 and 15,000; 20,000 remains included.
- **Source IDs:** `SRC-NAT-L207-ART1-2-9`, `SRC-NAT-ADE-CIR4E-2025`.
- **Evidence summary:** law supplies eligibility, rates, annualization and automatic recognition.
- **Engineering interpretation:** add after liabilities; never call it a tax deduction or subtract it from RAL.
- **Assumptions / unresolved questions:** 365 days and no adjusted-income overlays; approved money policy governs public cents and independent review confirmed coexistence with treatment integrativo.
- **Expected trace representation:** eligibility income, annualization, selected rate/base, amount, non-taxability, source.
- **Required tests:** income fixtures 8,499/8,500/8,501; 14,999/15,000/15,001; 19,999/20,000/20,001; non-inclusion in taxable base.

### RULE-NAT-CUNEO-DEDUCTION-2026 — Additional employee deduction

- **Fiscal year / jurisdiction / status:** 2026; Italy; `verified`.
- **Calculation stage/order:** alongside employment deduction after gross tax; before net IRPEF.
- **Applicability / eligibility:** non-pension employee with `20000<R<=40000` and full-year work.
- **Exclusions:** income at/below 20,000 or above 40,000 and pensions.
- **Required inputs / calculation base:** adjusted total income `R`, 365 days; applied against gross tax.
- **Formula:** EUR 1,000 for `20000<R<=32000`; `1000×(40000-R)/8000` for `32000<R<=40000`; otherwise zero.
- **Rates / brackets / thresholds:** bands at EUR 20,000, 32,000 and 40,000.
- **Rounding behavior:** calculate the exact formula result and normalize the public component under `POLICY-MONEY-2026-001`; no statutory four-decimal rule is attached.
- **Interactions/order:** capacity-capped with employment deduction; mutually exclusive with cuneo cash sum.
- **Edge cases:** full EUR 1,000 at 32,000 and zero at included endpoint 40,000.
- **Source IDs:** `SRC-NAT-L207-ART1-2-9`, `SRC-NAT-ADE-CIR4E-2025`.
- **Evidence summary:** law supplies amount, bands and phase-out; Agenzia confirms zeroing at 40,000.
- **Engineering interpretation:** model as non-refundable tax deduction.
- **Assumptions / unresolved questions:** 365 days and no income modifiers; approved policy governs the public monetary handoff.
- **Expected trace representation:** band, phase-out terms, deduction, capacity cap, source.
- **Required tests:** 19,999/20,000/20,001; 31,999/32,000/32,001; 39,999/40,000/40,001; cap invariant.

### RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026 — Low-income treatment integrativo

- **Fiscal year / jurisdiction / status:** 2026; Italy; `verified`.
- **Calculation stage/order:** eligibility after gross tax and employment deduction; downstream cash addition.
- **Applicability / eligibility:** full-year non-pension employee with `R<=15000` and strict capacity test `grossEmploymentIrpef > employmentDeduction - 75`.
- **Exclusions:** pension, failed capacity, or income above 15,000.
- **Required inputs / calculation base:** adjusted total income, qualifying gross tax, article-13 deduction, days; fixed benefit after eligibility.
- **Formula:** if eligible, `1200×workDays/365`; EUR 1,200 for this scenario.
- **Rates / brackets / thresholds:** income ceiling EUR 15,000; derived whole-euro capacity crossover 8,174 under first-band/full-year assumptions.
- **Rounding behavior:** fixed exact full-year amount; public normalization under `POLICY-MONEY-2026-001` is a no-op at EUR 1,200.00.
- **Interactions/order:** non-taxable cash addition; may coexist with cuneo sum; strict `>` rather than `>=`.
- **Edge cases:** capacity crossover 8,173/8,174 and end of income band.
- **Source IDs:** `SRC-NAT-DL3-ART1-2026`, `SRC-NAT-L207-ART1-2-9`, `SRC-NAT-ADE-CIR4E-2025`.
- **Evidence summary:** current law fixes amount, ceiling, EUR 75 adjustment, strict test, proration and recognition.
- **Engineering interpretation:** add only after exposing the independent capacity comparison.
- **Assumptions / unresolved questions:** 365 days and ordinary income only; independent verification confirmed coexistence with the cuneo sum.
- **Expected trace representation:** income, gross tax, deduction, EUR 75 adjustment, strict result, days, amount, source.
- **Required tests:** 8,173/8,174/8,175; 14,999/15,000/15,001; benefit remains outside taxable base.

### RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026 — Conditional 15k–28k branch

- **Fiscal year / jurisdiction / status:** 2026; Italy; `excluded`.
- **Calculation stage/order:** would follow enumeration of personal/legacy deductions; excluded from result.
- **Applicability / eligibility:** `15000<R<=28000` plus statutory listed deductions exceeding gross tax and the ordinary capacity condition.
- **Exclusions:** scenario has none of the required personal, family, mortgage, health/building, or legacy expense facts.
- **Required inputs / calculation base:** total income, gross tax, each enumerated deduction and historical dates; difference between their sum and gross tax.
- **Formula:** if eligible `min(1200, listedDeductionSum-grossIrpef)`; not modeled here.
- **Rates / brackets / thresholds:** EUR 15,000/28,000 plus fact-specific dates and amounts.
- **Rounding behavior:** no modeled amount.
- **Interactions/order:** new cuneo relief is not among the enumerated deductions for this test.
- **Edge cases:** real users with qualifying facts may receive it.
- **Source IDs:** `SRC-NAT-DL3-ART1-2026`, `SRC-NAT-ADE-CIR4E-2025`.
- **Evidence summary:** statute enumerates required categories and caps the difference.
- **Engineering interpretation:** exclude rather than encode a universal zero.
- **Assumptions / unresolved questions:** all enumerated non-employment deductions absent; none for V1.
- **Expected trace representation:** visible scenario-specific exclusion and missing facts.
- **Required tests:** no award from RAL alone; exclusion metadata visible in band.

### RULE-NAT-SPECIAL-PAY-2026 — Special/substitute-taxed pay

- **Fiscal year / jurisdiction / status:** 2026; Italy; `excluded`.
- **Calculation stage/order:** qualifying components would be separated before the ordinary base.
- **Applicability / eligibility:** renewal increases, productivity/profit awards, night/festive/shift additions, and tourism measures requiring component, CCNL/sector, prior-year income, and sometimes waiver/request facts.
- **Exclusions:** fixed ordinary RAL contains no identified special component and supplies none of the required facts.
- **Required inputs / calculation base:** prior-year income, CCNL/sector, component types/amounts, waiver/request; separately identified qualifying pay.
- **Formula / rates / thresholds:** not modeled; statutory headline regimes include 5%, 1% up to EUR 5,000, and 15% up to EUR 1,500, with prior-year limits EUR 33,000/40,000 as applicable.
- **Brackets / rounding behavior:** regime-specific; excluded.
- **Interactions/order:** qualifying amounts leave ordinary IRPEF/local bases and can affect treatment-integrativo tests.
- **Edge cases:** an otherwise standard employee may receive qualifying 2026 pay.
- **Source IDs:** `SRC-NAT-L199-ART1-2026`, `SRC-NAT-ADE-CIR2E-2026`, `SRC-NAT-TUIR-ART3-2026`.
- **Evidence summary:** current law/guidance show dependence on prior-year and component facts.
- **Engineering interpretation:** visible exclusion; never apply special rates to undifferentiated RAL.
- **Assumptions / unresolved questions:** no qualifying component; none for V1.
- **Expected trace representation:** grouped exclusion with missing inputs and sources.
- **Required tests:** no substitute rate in ordinary result and visible methodology limitation.

### RULE-NAT-PERSONAL-RELIEFS-2026 — Personal/family relief outside scenario

- **Fiscal year / jurisdiction / status:** 2026; Italy; `excluded`.
- **Calculation stage/order:** would alter taxable base or post-gross-tax deductions.
- **Applicability / eligibility:** fact-specific dependants, expenses, credits, residence, other income, pension deductions, or income above EUR 200,000.
- **Exclusions:** all are outside the approved persona/range.
- **Required inputs / calculation base / formula:** uncollected personal facts; various bases; not modeled.
- **Rates / brackets / thresholds:** relevant L. 199 high-income adjustment starts above EUR 200,000, outside range.
- **Rounding behavior:** not modeled.
- **Interactions/order:** absence is a scenario assumption, not universal zero; some facts affect conditional treatment integrativo.
- **Edge cases:** real net may be higher or lower when excluded facts exist.
- **Source IDs:** `SRC-NAT-TUIR-ART3-2026`, `SRC-NAT-DL3-ART1-2026`, `SRC-NAT-L199-ART1-2026`.
- **Evidence summary:** primary sources condition relief on facts not derivable from RAL.
- **Engineering interpretation:** preserve one-input V1 and disclose exclusions.
- **Assumptions / unresolved questions:** fixed no-special-circumstances scenario; none for V1.
- **Expected trace representation:** visible limitation, never zero-value rows.
- **Required tests:** no personal inputs or deductions and methodology source link.

## Fiscal rules — Lombardy and Milan additions

### RULE-LOCAL-2026-001 — Common base, domicile, and IRPEF-due gate

- **Fiscal year / jurisdiction / status:** 2026; Italy / Lombardy / Milan; `excluded` from the bounded V1 calculation because the unresolved de-minimis edge is output-unreachable throughout the supported envelope; the predicate is not verified.
- **Calculation stage/order:** after deductible employee contributions and the national due determination; before both local liabilities.
- **Applicability / eligibility:** fiscal domicile in Milan, Lombardy, at 1 January 2026; additions apply only if IRPEF is legally due for the year.
- **Exclusions:** failed due gate, different domicile, substitute/separate-tax income, and excluded personal facts.
- **Required inputs / calculation base:** comprehensive IRPEF income, recognized deductible charges, domicile, and sourced `irpefIsDue`; `B = comprehensiveIncome - deductibleCharges`.
- **Formula:** the unresolved de-minimis predicate is not implemented. Verified upstream rules and exhaustive approved-policy enumeration establish public net IRPEF of at least EUR 126.73 for every supported whole-euro RAL, so V1 passes the sourced common base `B` to each local rule without fabricating an edge predicate.
- **Rates / brackets / thresholds:** none; exact national due/de-minimis boundary remains a review dependency.
- **Rounding behavior:** deterministic public normalization is owned by approved `POLICY-MONEY-2026-001`; exact normative local-tax rounding remains excluded by `RULE-LOCAL-2026-ROUNDING`.
- **Interactions/order:** contributions can reduce `B`; employment deductions affect the due gate but not `B`; the local taxes are sibling calculations.
- **Edge cases:** due boundary, other income/deductions, domicile changes, substitute taxation, intermediate rounding.
- **Source IDs:** `SRC-LOCAL-2026-001`, `SRC-LOCAL-2026-006`, `SRC-LOCAL-2026-011`, `SRC-LOCAL-2026-012`.
- **Evidence summary:** governing statutes establish a common IRPEF-derived base, 1 January domicile, and an IRPEF-due condition.
- **Engineering interpretation:** treat the due predicate as an explicit sourced domain fact, not an accidental displayed-value comparison; do not unblock it by importing income-year-2025 filing instructions. Under the approved contribution-base assumption and money policy, exhaustive supported-range enumeration finds the minimum modeled net IRPEF at RAL EUR 10,000: EUR 126.73. This makes the known EUR 10.33 convention output-unreachable in V1, but does not verify the unknown 2026 predicate.
- **Assumptions / unresolved questions:** only employment income, ordinary contributions, Milan domicile. The exact income-year-2026 de-minimis predicate remains fiscally unresolved and is neither zero nor universally inapplicable. Reopen if the RAL minimum falls below EUR 10,000; tax, deduction, or fiscal-year mechanics change; personal credits/deductions, partial-year work, other income, domicile, or another profile enters scope; or authoritative evidence establishes materially different applicability.
- **Expected trace representation:** base derivation, domicile, due-gate source/result, then each addition.
- **Required tests:** false gate forces both zero; true gate delegates; domicile fixtures; approved-policy enumeration across every whole-euro RAL from 10,000 through 120,000 proves minimum net IRPEF 126.73; direct due-boundary fixtures only if later reconstructed.

### RULE-LOMBARDY-2026-001 — Lombardy regional additional IRPEF

- **Fiscal year / jurisdiction / status:** 2026; Regione Lombardia; `verified`.
- **Calculation stage/order:** after common admission; parallel with Milan; subtracted in annual-net composition.
- **Applicability / eligibility:** Lombardy domicile at 1 January, positive `B`, and true due gate.
- **Exclusions:** other domicile, failed gate, income outside comprehensive base, or unmodeled special relief.
- **Required inputs / calculation base:** common base `B`, domicile, due result.
- **Formula:** `min(B,15000)×0.0123 + min(max(B-15000,0),13000)×0.0158 + min(max(B-28000,0),22000)×0.0172 + max(B-50000,0)×0.0173`.
- **Rates / brackets / thresholds:** marginal 1.23% through 15,000; 1.58% to 28,000; 1.72% to 50,000; 1.73% above 50,000.
- **Rounding behavior:** calculate each bracket tax exactly, normalize each public bracket component under `POLICY-MONEY-2026-001`, and sum those normalized components; no normative local rounding is inferred.
- **Interactions/order:** not a percentage of net IRPEF and does not change Milan/national bases.
- **Edge cases:** exact bracket endpoints, false gate, non-positive base, transitional authority.
- **Source IDs:** `SRC-LOCAL-2026-001`, `SRC-LOCAL-2026-002`, `SRC-LOCAL-2026-003`, `SRC-LOCAL-2026-004`, `SRC-LOCAL-2026-005`.
- **Evidence summary:** regional law, explicit 2026 MEF data and current Regione guidance align on four progressive bands.
- **Engineering interpretation:** apply each rate marginally to its slice; the transition was independently reconstructed from the registered official evidence.
- **Assumptions / unresolved questions:** no special regional relief; approved product policy governs public monetary handoffs.
- **Expected trace representation:** occupied bracket rows, exact subtotal, separate rounding step, sources.
- **Required tests:** B 14,999/15,000/15,001; 27,999/28,000/28,001; 49,999/50,000/50,001; false gate and sum invariant.

### RULE-MILAN-2026-001 — Milan municipal additional IRPEF

- **Fiscal year / jurisdiction / status:** 2026; Comune di Milano; `verified`.
- **Calculation stage/order:** after common admission; parallel with Lombardy; subtracted in annual-net composition.
- **Applicability / eligibility:** Milan domicile at 1 January, true due gate, and `B > 23000`.
- **Exclusions:** `B <= 23000`, other domicile, failed gate, and unmodeled special cases.
- **Required inputs / calculation base:** common base `B`, domicile, due result; entire `B` above the threshold, not excess.
- **Formula:** `B<=23000 ? 0 : B×0.008`.
- **Rates / brackets / thresholds:** 0.80%; inclusive EUR 23,000 exemption threshold; cliff, not allowance/franchise.
- **Rounding behavior:** calculate the exact whole-base tax and normalize the public component under `POLICY-MONEY-2026-001`; no normative local rounding is inferred.
- **Interactions/order:** independent of Lombardy and national net tax; crossing threshold activates rate on whole base.
- **Edge cases:** exact threshold, first value above, false due gate, superseding resolution, domicile change.
- **Source IDs:** `SRC-LOCAL-2026-006`, `SRC-LOCAL-2026-007`, `SRC-LOCAL-2026-008`, `SRC-LOCAL-2026-009`, `SRC-LOCAL-2026-010`.
- **Evidence summary:** standing regulation establishes rate/base/gate/threshold/continuation; the Comune page updated 2026-05-12 confirms the operative 0.80%, inclusive EUR 23,000 exemption, and whole-base semantics during fiscal year 2026. The 2026 budget materials corroborate continuation.
- **Engineering interpretation:** the current competent municipal source is sufficient for rate/threshold applicability. The absent 2026 MEF row remains a publication-history note, never zero and no longer a blocker for this rule.
- **Assumptions / unresolved questions:** no timely superseding 2026 measure; public normalization is governed by approved `POLICY-MONEY-2026-001`.
- **Expected trace representation:** exemption comparison, whole-base explanation, rate, exact amount, source, rounding.
- **Required tests:** B 22,999 → 0; 23,000 → 0; 23,001 → 184.008 exact; false gate above threshold → 0.

### RULE-LOCAL-2026-ORDER — Local-tax ordering and annual-net composition

- **Fiscal year / jurisdiction / status:** 2026; Italy / Lombardy / Milan; `verified` within the bounded V1 envelope; the unresolved `RULE-LOCAL-2026-001` edge is explicitly excluded rather than treated as verified.
- **Calculation stage/order:** relational rule across contributions, national tax, local additions, cash benefits, and annual net.
- **Applicability / eligibility:** fixed scenario once all upstream values have admissible statuses.
- **Exclusions:** withholding timing, advance/balance, other-income composition, and personal circumstances.
- **Required inputs / calculation base:** RAL, contributions, `B`, gross/net IRPEF, deductions, due gate, cash benefits, and local liabilities; no independent base.
- **Formula:** contributions reduce income before `B`; gross IRPEF derives from `B`; deductions establish national net/due gate; local additions independently use unchanged `B`; `annualNet = RAL - contributions - netIrpef - regional - municipal + nonTaxableCuneoSum + treatmentIntegrativo`.
- **Rates / brackets / thresholds:** owned by component rules; local thresholds test `B`, not RAL.
- **Rounding behavior:** compose from normalized public components under approved `POLICY-MONEY-2026-001`; excluded normative rounding rules do not supply product arithmetic.
- **Interactions/order:** cash benefits are additions, not negative deductions; local siblings never affect one another despite display order.
- **Edge cases:** due boundary, benefits exceeding tax, contribution-driven threshold crossings, and early rounding.
- **Source IDs:** `SRC-LOCAL-2026-001`, `SRC-LOCAL-2026-003`, `SRC-LOCAL-2026-006`, `SRC-LOCAL-2026-007`, `SRC-LOCAL-2026-011`, plus the Source IDs owned by the upstream national and INPS rules.
- **Evidence summary:** statutes establish common base/due gate and no cross-base dependency between local additions.
- **Engineering interpretation:** model a dependency graph; the waterfall may be sequential only as presentation.
- **Assumptions / unresolved questions:** upstream verified values and approved product rounding apply; reopen the excluded due edge on any recorded scope or evidence trigger.
- **Expected trace representation:** dependency links from RAL/contributions to base/taxes and from cash components to annual net.
- **Required tests:** deductions may change gate not base; contributions change all base-derived taxes; regional never changes municipal; annual reconciliation.

### RULE-LOCAL-2026-ROUNDING — Annual local-tax rounding

- **Fiscal year / jurisdiction / status:** 2026; Italy / Lombardy / Milan normative/payroll/return behavior; `excluded` from V1.
- **Calculation stage/order:** none in the V1 product calculation; deterministic component normalization is owned by `POLICY-MONEY-2026-001`.
- **Applicability / eligibility:** exact statutory-return or payroll reproduction would require year-matching instructions and contexts V1 does not model.
- **Exclusions:** normative annual-return rounding, payroll-period rounding, and individual payslip reconciliation.
- **Required inputs / calculation base:** exact base, bracket components/liabilities, and applicable annual-liability instructions.
- **Formula / rates / brackets / thresholds:** no fiscal formula is inferred; product half-tie behavior belongs only to `POLICY-MONEY-2026-001`.
- **Rounding behavior:** available return material concerns 2025 income and whole euros, while payroll records may use cents; no source reopened establishes the complete 2026-income-year sequence for this estimator.
- **Interactions/order:** early rounding can change thresholds, bracket slices, due gate, and annual net.
- **Edge cases:** half ties at base/components/subtotals, negative zero, cumulative versus per-bracket rounding.
- **Source IDs:** `SRC-LOCAL-2026-011` is contextual only; required 2026-income-year liquidation evidence is missing.
- **Evidence summary:** official sources establish rates/bases but not the full annual estimator rounding algorithm.
- **Engineering interpretation:** deterministic estimator behavior belongs to approved `POLICY-MONEY-2026-001`, not to a fabricated local fiscal rule. The exclusion preserves the lack of normative evidence.
- **Assumptions / unresolved questions:** none for V1 exclusion; reopen if the product claims tax-return, withholding, or payroll exactness.
- **Expected trace representation:** exact value, source/policy, scale/mode, rounded value.
- **Required tests:** methodology makes no normative return/payroll-rounding claim; policy half-tie and aggregate-reconciliation tests belong to `POLICY-MONEY-2026-001`.

### RULE-LOCAL-2026-WITHHOLDING — Payroll timing, advance, and balance

- **Fiscal year / jurisdiction / status:** 2026; Italy / Lombardy / Milan; `excluded`.
- **Calculation stage/order:** none in annual-liability model.
- **Applicability / eligibility:** real payroll cash timing only.
- **Exclusions:** regional installments, municipal 30% advance/balance, conguaglio timing, and exact 13th/14th payslips.
- **Required inputs / calculation base / formula / rates / brackets / thresholds:** none; not modeled.
- **Rounding behavior:** payroll rounding is not imported by implication.
- **Interactions/order:** exclusion removes timing, not annual liabilities.
- **Edge cases:** termination, multiple employers, late conguaglio, domicile changes.
- **Source IDs:** `SRC-LOCAL-2026-005`, `SRC-LOCAL-2026-008`.
- **Evidence summary:** official pages describe withholding while the product explicitly models annual liability.
- **Engineering interpretation:** disclose that annual liability and average installment are not payslip schedules.
- **Assumptions / unresolved questions:** none; scope expansion requires approval.
- **Expected trace representation:** limitation only, no withholding component.
- **Required tests:** no advance/balance or per-payslip output in domain contract.

## Boundary-fixture convention

For each threshold within or adjacent to the supported envelope, propose `threshold - EUR 1`, `threshold`, and `threshold + EUR 1`, unless the legal calculation base requires a different smallest meaningful unit. Fixtures are specifications for M2; this document contains no executable tests.

### Contribution-base fixtures

These exact values use the approved RAL-to-contributable-remuneration assumption and specify formula results before approved component normalization. Public fixtures must additionally assert normalized components and their exact-sum aggregate.

| Input/base (EUR) | Required exact assertion before public rounding |
| ---: | --- |
| 10,000 | IVS 919; CIGS 30; additional IVS 0; total 949 |
| 56,223 | IVS 5,166.8937; CIGS 168.669; additional 0; total 5,335.5627 |
| 56,224 | IVS 5,166.9856; CIGS 168.672; additional 0; total 5,335.6576 |
| 56,225 | IVS 5,167.0775; CIGS 168.675; additional 0.01; total 5,335.7625 |
| 120,000 | IVS 11,028; CIGS 360; additional 637.76; total 12,025.76 |

The out-of-envelope configuration fixtures 122,294/122,295/122,296 exercise ceiling eligibility without expanding the supported input contract. Approved money-policy fixtures 10,004/10,005/10,006 distinguish values below/at/above a half-cent; at 10,005, IVS 919.4595 normalizes to 919.46, CIGS 30.015 to 30.02, and the displayed aggregate is their exact sum 949.48.

### National taxable-income fixtures

These inputs are taxable/adjusted employment income, not RAL. The contribution stage owns the RAL-to-income mapping.

| Boundary | Inputs (EUR) | Required assertion |
| --- | --- | --- |
| Treatment capacity | 8,173 / 8,174 / 8,175 | Strict capacity fails/passes/passes; qualifying full-year benefit is 1,200 |
| Cuneo 7.1→5.3 | 8,499 / 8,500 / 8,501 | Amounts 603.429 / 603.500 / 450.553 |
| 15k combined | 14,999 / 15,000 / 15,001 | Article-13 1,955 through 15k; at 15,001 ratio truncates to .9999 and deduction is 3,099.881; cuneo rate and treatment-integrativo branch change |
| Cuneo sum→deduction | 19,999 / 20,000 / 20,001 | Sum 959.952 / 960 / 0; deduction 0 / 0 / 1,000; never simultaneous |
| EUR 65 start | 24,999 / 25,000 / 25,001 | Adjustment absent / absent / present |
| IRPEF 23→33 | 27,999 / 28,000 / 28,001 | Gross IRPEF 6,439.77 / 6,440 / 6,440.33 |
| Cuneo phase-out start | 31,999 / 32,000 / 32,001 | Deduction 1,000 / 1,000 / 999.875 |
| EUR 65 end | 34,999 / 35,000 / 35,001 | Adjustment present / present / absent |
| Cuneo deduction end | 39,999 / 40,000 / 40,001 | Deduction .125 / 0 / 0 |
| Article-13 effective zero | 49,997 / 49,998 / 49,999 | Truncated ratio .0001 / .0000 / .0000; employment deduction .191 / 0 / 0 statutory exact, then .19 / 0 / 0 public |
| IRPEF 33→43 | 49,999 / 50,000 / 50,001 | Gross IRPEF 13,699.67 / 13,700 / 13,700.43; employment deduction already zero |

### Local common-base fixtures

| Rule boundary | Inputs `B` (EUR) | Required exact assertion |
| --- | --- | --- |
| Lombardy 15k | 14,999 / 15,000 / 15,001 | Marginal slice changes only above 15,000 |
| Milan exemption | 22,999 / 23,000 / 23,001 | 0 / 0 / 184.008 before rounding; whole-base activation |
| Lombardy 28k | 27,999 / 28,000 / 28,001 | Third marginal rate starts only above 28,000 |
| Lombardy 50k | 49,999 / 50,000 / 50,001 | Fourth marginal rate starts only above 50,000 |
| IRPEF-due/de-minimis edge | no direct threshold fixture in V1 | Exact 2026 predicate remains unresolved and excluded; exhaustive whole-euro RAL enumeration must continue to prove minimum public net IRPEF of at least EUR 126.73. Reopen rather than infer behavior if the envelope changes. |

### Representative full-engine RAL fixtures

M2 must include RAL 10,000; 15,000; 20,000; 28,000; 35,000; 40,000; 56,224; 75,000; and 120,000, plus any RAL values discovered during implementation that map exactly across a taxable-base threshold. Under the approved assumption/policy, RAL 55,240 produces normalized contributions 5,076.56 IVS + 165.72 CIGS = 5,242.28, base 49,997.72, statutory exact employment deduction .191 and public .19; RAL 55,241 produces contributions 5,076.65 + 165.72 = 5,242.37, base 49,998.63 and zero deduction. Each assertion must cover every intermediate and the trace, not only annual net. Installment selection must leave all annual fiscal components unchanged.
