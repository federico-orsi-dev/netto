---
run_id: RUN-2026-08-22-012
date: 2026-08-22
tool: codex
role: primary-m1-reconciliation-agent
task: m1-fiscal-reconciliation
status: blocked
owner: codex
reviewer: human
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
checkpoint_commit: 661e844a4ea8b8d58f4577dd8e0b8b0e6e8a074d
checkpoint_tree: 58106004374b1de19c60fc3d12ae51e373d40a95
independent_review_commit: 632dd0aa76a3183979992ce29c937fb2c35efb87
import_commit: cebcb3db6ba4f749b8a146f25c39568fd32d75bc
commit: null
---

# M1 fiscal reconciliation

## Objective and boundary

Reconcile Checkpoint A's canonical fiscal model, the independent verifier's reconstruction, and reopened authoritative evidence. Establish deterministic rule-count mapping before any lifecycle change, resolve or preserve blockers without treating agent agreement as evidence, and identify the minimum remaining human decisions.

No application code, fiscal implementation, M2 work, remote mutation, or canonical `verified` promotion was authorized or performed. Historical runs were not rewritten.

## Acceptance criteria

- Validate and import the independent review as an isolated review-record-only commit.
- Map all 24 Rule IDs and the separate money policy without count ambiguity.
- Reconcile RAL/contribution base, normative and product rounding, the local due gate, article-13 truncation, Milan currentness, the three original blockers, and all six original exclusions.
- Record every canonical lifecycle change individually with evidence and implementation consequence.
- Update only justified canonical documentation and run repository validations.
- End M1 as verified only if all deterministic implementation and human-approval gates are satisfied.

## Git import and checkpoint validation

The review commit was inspected before reconciliation:

- `632dd0aa76a3183979992ce29c937fb2c35efb87^` is exactly `661e844a4ea8b8d58f4577dd8e0b8b0e6e8a074d`.
- Its tree is `2dd71756c473e3722bf2dd599923661ffaa9c600`.
- Its only diff is one added file: `docs/ai-engineering/runs/2026-08-22-011-m1-independent-fiscal-verification.md`.
- It changes no canonical fiscal file, application file, or prior run record.
- It was imported by the smallest auditable operation, `git cherry-pick`, creating primary commit `cebcb3d`.
- The primary worktree was clean immediately after import. Reconciliation began only after this check.

## Canonical context and evidence inspected

- `AGENTS.md`, `PROJECT_STATE.md`, Product Specification, Architecture and ADR-0002/0003/0004.
- Fiscal Rule Catalog, Source Register, Test Strategy, fiscal research/verification contract, and runs 002, 005, 006, 007, 010, and 011.
- Current official evidence reopened on 2026-08-22: INPS Circular 6/2026; D.Lgs. 314/1997 article 6; TUIR article 13; D.Lgs. 446/1997 article 50; D.Lgs. 360/1998 article 1; D.P.R. 600/1973 article 1; and the Comune di Milano municipal-additional page updated 2026-05-12.
- Material capabilities: local Git/filesystem read-write and public web read access. External effects were limited to reading official public sources; no remote repository, service, or fiscal source was mutated.

## Rule-count mapping — required first result

The representations map one-to-one. The verifier used exactly the same 24 stable Rule IDs as Checkpoint A. No rule was split, merged, or renamed. The independent labels are review dispositions, not replacements for the canonical lifecycle.

| Rule ID | Checkpoint A | Independent disposition | Reconciled canonical state | Mapping / interpretation |
| --- | --- | --- | --- | --- |
| RULE-INPS-2026-005 | candidate | BLOCKED | blocked | Same complete-profile rule; component rates agree, amount depends on 001/006/007. |
| RULE-INPS-2026-001 | candidate | BLOCKED | blocked | Same base rule; `RAL = contribution base` is product assumption, not law. |
| RULE-INPS-2026-002 | candidate | VERIFIED | candidate | Same 9.19% IVS component; human fiscal approval absent. |
| RULE-INPS-2026-003 | candidate | VERIFIED | candidate | Same additional 1% component. |
| RULE-INPS-2026-004 | candidate | VERIFIED | candidate | Same in-range-inactive ceiling rule; inactivity depends on base assumption. |
| RULE-INPS-2026-006 | excluded | BLOCKED | blocked | Same minimum-remuneration rule; reclassified because missing inputs do not prove exclusion. |
| RULE-INPS-2026-007 | blocked | BLOCKED | blocked | Same annual-estimate contribution-rounding question. |
| RULE-INPS-2026-008 | excluded | VERIFIED | excluded | Same payroll-exact exclusion. |
| RULE-NAT-BASE-2026 | candidate | VERIFIED | candidate | Same structural national-base rule; numeric handoff depends on contributions. |
| RULE-NAT-GROSS-IRPEF-2026 | candidate | VERIFIED | candidate | Same 23/33/43 rule. |
| RULE-NAT-EMPLOYMENT-DEDUCTION-2026 | candidate | VERIFIED | candidate | Same formula; fixture coverage corrected at effective truncation boundary. |
| RULE-NAT-NET-IRPEF-2026 | candidate | VERIFIED | candidate | Same non-negative net-tax rule. |
| RULE-NAT-CUNEO-SUM-2026 | candidate | VERIFIED | candidate | Same non-taxable cash sum. |
| RULE-NAT-CUNEO-DEDUCTION-2026 | candidate | VERIFIED | candidate | Same tax deduction. |
| RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026 | candidate | VERIFIED | candidate | Same low-income cash benefit and strict capacity test. |
| RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026 | excluded | VERIFIED | excluded | Same profile-specific exclusion, not universal zero. |
| RULE-NAT-SPECIAL-PAY-2026 | excluded | VERIFIED | excluded | Same special-component exclusion. |
| RULE-NAT-PERSONAL-RELIEFS-2026 | excluded | VERIFIED | excluded | Same personal-facts exclusion. |
| RULE-LOCAL-2026-001 | blocked | BLOCKED | blocked | Same common base/due-gate rule; structure proven, exact 2026 de-minimis unresolved. |
| RULE-LOMBARDY-2026-001 | candidate | VERIFIED | candidate | Same marginal regional rule. |
| RULE-MILAN-2026-001 | candidate | VERIFIED | candidate | Same municipal rule; current Comune evidence closes the MEF-row rate/threshold concern. |
| RULE-LOCAL-2026-ORDER | candidate | VERIFIED | candidate | Same dependency/order rule with blocked numeric dependencies. |
| RULE-LOCAL-2026-ROUNDING | blocked | BLOCKED | blocked | Same normative local-rounding question. |
| RULE-LOCAL-2026-WITHHOLDING | excluded | VERIFIED | excluded | Same annual-liability timing exclusion. |

Checkpoint A counts were 15 candidate + 3 blocked + 6 excluded = 24. Reconciled counts are 13 candidate + 6 blocked + 5 excluded + 0 verified = 24. The count changes are exactly candidate-to-blocked for INPS 001 and 005, and excluded-to-blocked for INPS 006. No discrepancy remains.

`POLICY-MONEY-2026-001` is not a Rule ID and is not included in either 24-rule count. It governs deterministic numeric representation and estimator reconciliation where legislation does not prescribe this product's annual internal algorithm. It is therefore an engineering-policy lifecycle item, not a fiscal-law lifecycle item. Its reconciliation state is separately `blocked pending explicit human approval`.

## Fiscal fact versus product assumption — RAL and contribution income

### Fiscal/legal fact

D.Lgs. 314/1997 article 6 defines contribution income by employment income matured in the reference period and preserves contribution-specific inclusions, exclusions, minima, and maxima. INPS Circular 6/2026 publishes a EUR 58.13 daily floor and explains collective, day/hour, part-time, and payroll-period mechanics. Neither source establishes that a user-entered annual RAL is legally identical to contribution income.

### Product/domain conclusion

The smallest model accurate for this assignment keeps two concepts: annual gross salary and annual contributable remuneration. V1 may derive the latter from the former only under a named assumption that entered RAL is lawful ordinary full-year cash remuneration, fully contribution-subject for the fixed profile, with no omitted components or relief. V1 explicitly is not a CCNL/minimum-remuneration compliance validator.

Adding CCNL, level, hours, schedule, or payroll-period inputs would materially expand scope while still not make a one-input compensation estimate payroll-exact. That option is rejected for V1 unless the human owner rejects the proposed approximation. The assumption itself remains a human-approval blocker and must never be labelled verified fiscal law.

## Rounding and money-policy reconciliation

### Normatively established

- TUIR article 13(6) truncates each positive covered ratio to its first four decimal digits before multiplication.
- INPS publishes the 2026 whole-euro band/ceiling and operational monthly/conguaglio context.
- Official sources establish bases and rates but do not prescribe one universal annual-RAL component-versus-aggregate rounding, local bracket/subtotal sequence, or public serialization algorithm for this estimator.

### Product policy, not law

The existing Fiscal Rule Catalog remains the canonical owner because this policy directly defines the handoffs among evidenced formulas, public trace components, and annual-net reconciliation. A new document would duplicate the calculation semantics without independent value. ADR-0003 continues to own the arithmetic-library boundary; display formatting belongs to the UI and never feeds calculations.

The reconciled proposal is:

1. exact decimal representation throughout;
2. only statutory operations such as article-13 `trunc4` inside formulas;
3. no generic intermediate or bracket-slice rounding;
4. round public annual-net components once to cents, decimal half-up;
5. for employee contributions, round each exposed component, sum them, and use that reconciled aggregate for the taxable-base handoff;
6. calculate each tax liability from the resulting exact base and round only the public final liability;
7. compose annual net from those same public components;
8. derive monthly/instalment presentation from annual net without feedback into annual fiscal calculations.

At RAL EUR 10,005, component-first contributions produce EUR 919.46 IVS + EUR 30.02 CIGS = EUR 949.48, while aggregate-first rounding produces EUR 949.47. The proposed policy chooses auditable component reconciliation and openly accepts this one-cent estimator difference. Independent review did not approve that trade-off; human approval and targeted re-review remain required.

`RULE-INPS-2026-007` and `RULE-LOCAL-2026-ROUNDING` remain blocked as claims about normative exactness. After the product policy is approved, they may be reclassified through a dedicated governance step as unsupported payroll/return-exact behaviors excluded from V1; the engineering policy must never be promoted as fiscal law.

## Local due gate and supported-range materiality

D.Lgs. 446/1997 article 50 and D.Lgs. 360/1998 article 1 prove the common IRPEF-derived base, domicile, and requirement that IRPEF result due. D.P.R. 600/1973 article 1 and income-year-2025 return material support the EUR 10.33 lineage but do not establish the complete income-year-2026 local-addition algorithm.

Under the still-unapproved exact `contributable remuneration = RAL` assumption, exhaustive whole-euro enumeration from EUR 10,000 through EUR 120,000 finds the minimum modeled pre-round net IRPEF at RAL EUR 10,000: contribution total EUR 949, base EUR 9,051, gross IRPEF EUR 2,081.73, employment deduction EUR 1,955, net IRPEF EUR 126.73. This is safely above the known EUR 10.33 convention.

Conclusion: `RULE-LOCAL-2026-001` remains blocked as a fiscal rule, with a conditional supported-range non-materiality invariant. It is not verified merely because it is currently unreachable. After upstream assumption/policy approval, re-run the invariant; a human may then approve exclusion of the unsupported edge behavior for V1. Reopen it for a lower RAL minimum, personal credits/deductions, partial-year work, other income, or new year-matching evidence.

## Article-13 truncation reconciliation

TUIR article 13(1)(c) gives `1910 × ((50000-R)/22000)` and article 13(6) requires the positive ratio's first four decimal digits. At direct income EUR 49,997, the ratio begins `0.000136...`, truncates to `0.0001`, and the exact deduction is EUR 0.191. At EUR 49,998 the ratio begins `0.000090...`, truncates to `0.0000`, and the deduction is zero; EUR 49,999 remains zero.

The catalog now requires 49,997 / 49,998 / 49,999 fixtures and separates statutory `trunc4` from public-money rounding. Conditional full-engine fixtures RAL 55,240 / 55,241 are recorded for re-derivation after policy approval.

## Milan 2026 source reconciliation

The prior concern was the absent MEF 2026 row and a Source Register page date of 2025-11-28. The live Comune di Milano page was updated 2026-05-12 and confirms the 0.80% rate, inclusive EUR 23,000 exemption, and whole-base application above the threshold. The standing municipal regulation supplies continuation and the 2026 budget corroborates operation.

The current competent municipal source is sufficient authoritative evidence for rate/threshold applicability. The MEF-row absence remains historical provenance, not a blocker and never evidence of zero. The Source Register preserves both the earlier concern and the evidence that resolves it. `RULE-MILAN-2026-001` remains candidate only because canonical human fiscal approval has not occurred.

## Existing blocker reconciliation

| Rule | Previous blocker | Independent finding | Authoritative evidence | Conclusion / status | Residual uncertainty |
| --- | --- | --- | --- | --- | --- |
| RULE-INPS-2026-007 | No exact annual contribution rounding/reconciliation rule | Agreed; monthly/reporting/conguaglio evidence does not select an annual algorithm | INPS 245/1998 and 156/2025 provide limited contexts | Remains `blocked`; estimator behavior belongs to separate human-approved money policy | Component/aggregate trade-off and downstream handoff pending approval |
| RULE-LOCAL-2026-001 | Exact income-year-2026 IRPEF-due/de-minimis predicate | Agreed; condition is structurally proven and conditionally non-material in range | D.Lgs. 446 art. 50; D.Lgs. 360 art. 1; contextual D.P.R. 600 art. 1 | Remains `blocked`; add supported-range invariant, do not call it verified | Re-run after upstream policy; year-matching 2026-income instructions unavailable |
| RULE-LOCAL-2026-ROUNDING | No complete annual local base/liability sequence | Agreed; return whole euros and payroll cents are not interchangeable | Rates/base sources plus contextual REDDITI PF 2026 | Remains `blocked` as normative behavior; product policy is separate | Human policy approval; no claim of return/payroll exactness |

## Canonical lifecycle changes

No rule is promoted to `verified`; agent agreement does not satisfy the explicit human-approval gate.

### RULE-INPS-2026-001

- **Current status at Checkpoint A:** `candidate`.
- **Reconciled status:** `blocked`.
- **Authoritative evidence:** D.Lgs. 314/1997 article 6; INPS Circular 6/2026.
- **Original research conclusion:** identity mapping could be used under a lawful-remuneration envelope.
- **Independent conclusion:** law does not establish the identity and minima require missing facts.
- **Reconciliation conclusion:** retain separate concepts and propose a bounded estimator identity, pending human approval.
- **Applicability to V1:** necessary for one-input calculation.
- **Implementation consequence:** no contribution or downstream tax implementation may proceed until approved and re-reviewed.
- **Remaining uncertainty:** product-policy approval, not an undiscovered fiscal rate.

### RULE-INPS-2026-005

- **Current status at Checkpoint A:** `candidate`.
- **Reconciled status:** `blocked`.
- **Authoritative evidence:** INPS Circulars 101/2024 and 6/2026; current D.Lgs. 148/2015 article 23; INPS Message 637/2022.
- **Original research conclusion:** fixed human-approved employer archetype selected 9.19% IVS, 0.30% CIGS, additional 1%, and no sector-fund worker charge.
- **Independent conclusion:** component rates/composition agree, but a complete amount depends on base/minimum and rounding.
- **Reconciliation conclusion:** the archetype remains valid; block the amount-producing aggregate on 001/006/007.
- **Applicability to V1:** mandatory complete employee-contribution stage.
- **Implementation consequence:** do not implement a “complete contributions” result from unresolved inputs/policy.
- **Remaining uncertainty:** contribution-base assumption and money policy only; no new fixed-profile rate discovered.

### RULE-INPS-2026-006

- **Current status at Checkpoint A:** `excluded`.
- **Reconciled status:** `blocked`.
- **Authoritative evidence:** INPS Circular 6/2026; D.Lgs. 314/1997 article 6.
- **Original research conclusion:** exclude minimum calculation under a disclosed lawful-RAL assumption.
- **Independent conclusion:** missing schedule/CCNL/pay-period facts do not prove non-applicability, especially at RAL EUR 10,000.
- **Reconciliation conclusion:** exclusion is defensible only after human approval of the named non-compliance-validator assumption.
- **Applicability to V1:** not calculated, but its exclusion boundary is material to input validity.
- **Implementation consequence:** prevent silent zero/minimum bypass; expose the limitation after approval.
- **Remaining uncertainty:** human choice between bounded assumption and expanded inputs.

### POLICY-MONEY-2026-001

- **Current status at Checkpoint A:** `candidate`, outside fiscal-rule count.
- **Reconciled status:** `blocked pending explicit human approval`.
- **Evidence:** no authoritative source selects the estimator policy; ADR-0003 establishes decimal representation boundaries only.
- **Original research conclusion:** component-first cent half-up was proposed for visible reconciliation.
- **Independent conclusion:** deterministic but legally unsupported and capable of changing downstream bases by cents.
- **Reconciliation conclusion:** retain a refined proposal in the Fiscal Rule Catalog as calculation semantics, explicitly non-fiscal.
- **Applicability to V1:** required for deterministic public results and trace reconciliation.
- **Implementation consequence:** no approved public expected amounts or full-engine fixtures yet.
- **Remaining uncertainty:** human trade-off approval, followed by targeted re-review.

## Original exclusions

| Original excluded rule | Reconciliation | Applicability boundary | Reopen when |
| --- | --- | --- | --- |
| RULE-INPS-2026-006 | Changed to blocked | Cannot be excluded without the pending lawful-remuneration assumption | Human approves that boundary or product adds payroll-compliance facts |
| RULE-INPS-2026-008 | Remains excluded | Exact payslip/reporting-period contribution rounding | Payslip simulation, period bases, or cumulative employer data enter scope |
| RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026 | Remains excluded | 15k–28k branch needs enumerated personal/legacy deduction facts | Product collects those deductions/history |
| RULE-NAT-SPECIAL-PAY-2026 | Remains excluded | Renewal/productivity/night/shift regimes need decomposed pay and prior-year facts | Product models those components and eligibility facts |
| RULE-NAT-PERSONAL-RELIEFS-2026 | Remains excluded | Dependants, personal expenses, other income, credits, and out-of-range adjustments | Persona/input contract expands |
| RULE-LOCAL-2026-WITHHOLDING | Remains excluded | Advances, balances, conguaglio timing, individual payslips | Product becomes a payroll cash-timing simulator |

Each retained exclusion is a scope boundary, never a universal zero-valued fiscal rule.

## Agreements, disagreements, and source/fixture changes

### Agreements

- National brackets, deduction/relief formulas, cash-versus-deduction classification, and ordering.
- 9.19% IVS, 0.30% CIGS, 1% threshold, and in-range-inactive pension ceiling for the fixed archetype.
- Lombardy marginal bands, Milan threshold/rate semantics, and local sibling ordering.
- Normative annual rounding remains unsupported; payroll-exact behavior stays excluded.

### Disagreements resolved or preserved

- The original contribution-base candidacy and minimum-remuneration exclusion were too strong; both now block on a human product assumption.
- Milan's absent MEF row no longer blocks rate/threshold applicability because a current official Comune source resolves continuation; the historical gap remains documented.
- The independent review's 18 `VERIFIED` results are not promoted because human fiscal approval is absent.

### Source changes

- Updated the Comune di Milano page URL/date to the current 2026 page and recorded its effect on provenance.
- Updated the D.Lgs. 314 article 6 URL and the municipal statute to current Normattiva consolidations.
- Added `SRC-LOCAL-2026-012` for D.P.R. 600/1973 article 1 as contextual de-minimis lineage, explicitly insufficient for the complete 2026 predicate.
- Recorded the current INPS Circular 6 page review without erasing the historical concern.

### Fixture changes

- Added direct-income 49,997 / 49,998 / 49,999 for the article-13 effective zero transition.
- Added conditional full-engine RAL 55,240 / 55,241 for later re-derivation.
- Made contribution and public/full-engine fixtures explicitly conditional on the blocked base and money policies.
- Added a requirement to re-run the supported-range minimum-net-IRPEF invariant after approval.

## Files changed

- `PROJECT_STATE.md`
- `docs/product/product-spec.md`
- `docs/domain/fiscal-rules-2026.md`
- `docs/domain/source-register-2026.md`
- `docs/testing/test-strategy.md`
- `docs/ai-engineering/runs/2026-08-22-012-m1-fiscal-reconciliation.md`

The imported review record is a separate committed artifact and was not rewritten.

## Validation

- `git diff --check`: passed; only Git's informational LF-to-CRLF working-copy warnings were emitted.
- Catalog consistency: passed; exactly 24 unique Rule IDs with 13 candidate, 6 blocked, 5 excluded, and 0 verified.
- Rule schema smoke validation: passed; every Rule ID retains lifecycle status, Source IDs, evidence summary, engineering interpretation, and required tests.
- Source-reference validation: passed; 37 unique Source IDs, no duplicate definitions, and no missing full Source ID referenced by the catalog.
- Relative Markdown-link validation across repository Markdown: passed; zero missing relative targets.
- Exact fiscal checks: passed. Whole-euro candidate enumeration over RAL EUR 10,000–120,000 returned minimum pre-round net IRPEF EUR 126.730000 at RAL EUR 10,000/base EUR 9,051. Article-13 fixtures returned EUR 0.1910 / 0 / 0 at income 49,997 / 49,998 / 49,999; derived RAL 55,240 / 55,241 returned bases 49,997.7240 / 49,998.6291 and deduction EUR 0.1910 / 0. RAL 10,005 reproduced component-first EUR 949.48 versus aggregate-first EUR 949.47.
- Git scope check: passed; only the six documented reconciliation artifacts are changed/untracked. No application code exists or changed, and no historical run was modified.
- Repository-specific application tests: not applicable; M1 contains documentation/research artifacts only and defines no application test runner.

## Human approval status and final M1 assessment

No human has yet approved the RAL-to-contributable-remuneration estimator assumption, the reconciled money policy, or any fiscal Rule ID as `verified`. The existing human approvals cover only the fixed employer/CIGS/no-sector-fund archetype.

Minimum closure path:

1. Human approves or rejects the named contribution-base assumption; rejection requires a product-scope decision on additional inputs.
2. Human approves or rejects the money policy after reviewing the one-cent component/aggregate trade-off.
3. Re-run exact supported-range enumeration and targeted independent verification of INPS 001/005/006/007, local due materiality, local rounding ownership, and public-money handoffs.
4. Human performs explicit rule-by-rule fiscal approval before any `verified` metadata transition.

**M1 REMAINS BLOCKED.**
