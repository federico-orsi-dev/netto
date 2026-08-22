---
run_id: RUN-2026-08-22-013
date: 2026-08-22
tool: human-governance
role: m1-integration-coordinator
task: approve-v1-contribution-base-and-money-policy
status: completed
owner: human
reviewer: codex
related_rules:
  - RULE-INPS-2026-001
  - RULE-INPS-2026-005
  - RULE-INPS-2026-006
  - RULE-INPS-2026-007
  - RULE-LOCAL-2026-001
  - RULE-LOCAL-2026-ROUNDING
  - POLICY-MONEY-2026-001
related_adrs:
  - ADR-0002
  - ADR-0003
  - ADR-0004
commit: null
---

# Approved V1 contribution-base assumption and money policy

## Objective and authority boundary

Persist two explicit human decisions and reassess only the six Rule IDs blocked by the prior reconciliation. The human approval authorizes the exact product-assumption and calculation-policy transitions below; it does not verify fiscal law, approve any Rule ID as `verified`, authorize application code, or expand V1 inputs.

Historical research and reconciliation runs remain unchanged. This dedicated governance step does not bundle unrelated architecture, product, fiscal-rate, or implementation changes.

## Human-approved decisions

### RAL-to-contributable-remuneration V1 assumption

For the supported V1 estimator profile, entered RAL represents lawful ordinary annual remuneration fully subject to employee social-security contributions except where an explicitly modeled fiscal rule states otherwise.

The domain keeps `annualGrossSalary` and `annualContributableRemuneration` distinct. Their equality is a disclosed product/domain assumption within the V1 correctness envelope, not verified fiscal law. V1 does not add CCNL, level, working-hours, payroll-period, or additional employer-classification inputs solely to reproduce payroll-level contributable-remuneration mechanics.

### Component-first money policy

`POLICY-MONEY-2026-001` is approved as deterministic product/calculation policy, not fiscal law:

1. use 40 significant decimal digits internally behind the ADR-0003 adapter; this representation bound is not a fiscal rounding point;
2. apply verified statutory truncation, rounding, scale, and ordering before product normalization;
3. normalize every monetary component exposed as a child of a displayed aggregate to EUR 0.01 using decimal half-up where no more specific verified rule governs; exact pre-normalization trace metadata is not a competing aggregation child;
4. calculate a displayed aggregate only as the exact sum of its normalized displayed children and use that aggregate at downstream monetary handoffs;
5. display public euro amounts at two decimals without feeding formatting back into calculations;
6. require exact cent reconciliation at every public aggregate and at annual net.

This approval does not infer any contribution, national-tax, regional-tax, municipal-tax, payroll, or tax-return rounding rule.

## Six-rule reassessment

| Rule ID | Before approval | Reassessed state | Classification | Reason |
| --- | --- | --- | --- | --- |
| RULE-INPS-2026-001 | blocked | candidate | Resolved by approved product scope | The legal/product distinction remains explicit; the V1 identity is now an accepted assumption, not law. |
| RULE-INPS-2026-005 | blocked | candidate | Resolved by approved assumption and policy | Its independently supported component profile now has deterministic base and monetary handoffs; fiscal approval remains pending. |
| RULE-INPS-2026-006 | blocked | excluded | Resolved by approved product scope | Legal minimum-remuneration mechanics are outside V1 under the lawful-remuneration assumption and are never represented as zero. |
| RULE-INPS-2026-007 | blocked | excluded | Resolved by approved product policy | Exact normative/payroll rounding remains unevidenced and outside V1; the product policy supplies deterministic estimator behavior without claiming law. |
| RULE-LOCAL-2026-001 | blocked | blocked | Genuine fiscal blocker but output-unreachable | The exact 2026 de-minimis predicate remains unavailable. Approved-policy enumeration places all supported results safely above the known lineage. |
| RULE-LOCAL-2026-ROUNDING | blocked | excluded | Resolved by approved product policy | Normative tax-return/payroll rounding is outside V1; component-first normalization is explicitly engineering policy. |

No rule is promoted to `verified`. Canonical counts become 15 `candidate`, 1 `blocked`, 8 `excluded`, and 0 `verified`, plus approved `POLICY-MONEY-2026-001` outside the fiscal-rule count.

## Supported-range invariant after approval

An exact-decimal whole-euro enumeration of RAL EUR 10,000 through EUR 120,000 applied component-first normalization to contribution components, public IRPEF bracket components, public deductions, and net IRPEF. The minimum public net IRPEF is EUR 126.73 at RAL EUR 10,000, with normalized employee contributions EUR 949.00 and taxable income EUR 9,051.00.

Therefore the unresolved local IRPEF-due/de-minimis edge cannot alter a supported V1 output relative to the known EUR 10.33 lineage. This is a product-range invariant, not verification of the exact income-year-2026 predicate.

Additional policy fixtures:

- RAL 10,005: IVS EUR 919.46 + CIGS EUR 30.02 = displayed contribution aggregate EUR 949.48.
- RAL 55,240: IVS EUR 5,076.56 + CIGS EUR 165.72 = EUR 5,242.28; base EUR 49,997.72; article-13 statutory exact deduction EUR 0.191, public EUR 0.19.
- RAL 55,241: IVS EUR 5,076.65 + CIGS EUR 165.72 = EUR 5,242.37; base EUR 49,998.63; article-13 deduction zero.

## Exact remaining blocker

`RULE-LOCAL-2026-001` is the only blocked Rule ID. Its common base, domicile, and positive-IRPEF due structure are independently supported; only the exact income-year-2026 de-minimis/liquidation predicate remains evidentially incomplete. It is unreachable within the approved V1 range but cannot be called verified law.

The 15 candidate rules also remain behind the explicit human fiscal-approval gate. That is a lifecycle approval gate, not unresolved broad fiscal research.

## Minimal targeted independent re-review contract

### Objective

Review only the change impact of these two human decisions and determine whether the canonical state is ready for final human fiscal approval.

### Required inputs

- Current Product Specification, Fiscal Rule Catalog, Test Strategy, and Project State.
- `RUN-2026-08-22-011`, `RUN-2026-08-22-012`, and this run.
- Only the original evidence directly needed to check the changed boundary: D.Lgs. 314/1997 article 6, INPS Circular 6/2026, D.Lgs. 446/1997 article 50, D.Lgs. 360/1998 article 1, and the registered contextual de-minimis source.

### Required checks

1. Confirm that gross salary and contributable remuneration remain distinct and their equality is labelled only as an approved V1 assumption.
2. Confirm that `POLICY-MONEY-2026-001` fully and deterministically specifies internal precision, statutory precedence, component normalization, aggregate calculation, display precision, downstream handoffs, and reconciliation invariants without creating fiscal law.
3. Confirm the five lifecycle transitions and that no Rule ID was promoted to `verified`.
4. Independently reproduce the RAL 10,005 and 55,240/55,241 policy fixtures and the full-range EUR 126.73 minimum-net-IRPEF invariant.
5. Decide whether `RULE-LOCAL-2026-001` is ready for a human-approved bounded `excluded` classification as an unreachable V1 edge, or identify exact contrary evidence/materiality.
6. Report exactly `READY FOR HUMAN FISCAL APPROVAL` or `TARGETED REVIEW BLOCKED`, with only material findings.

### Explicit non-goals

- Do not reconstruct all national, INPS, Lombardy, or Milan rates/formulas again.
- Do not review unrelated candidate/excluded rules except where a changed handoff creates a concrete contradiction.
- Do not implement code, change architecture, invent fiscal rounding, promote rules, or perform final human approval.

## Files changed by this governance step

- `PROJECT_STATE.md`
- `docs/product/product-spec.md`
- `docs/domain/fiscal-rules-2026.md`
- `docs/testing/test-strategy.md`
- `docs/ai-engineering/runs/2026-08-22-013-m1-approved-assumption-money-policy.md`

## Validation

- Catalog consistency passed: 24 unique Rule IDs; 15 candidate, 1 blocked, 8 excluded, 0 verified; sole blocker `RULE-LOCAL-2026-001`.
- Rule schema smoke validation passed for lifecycle status, Source IDs, evidence summary, engineering interpretation, and required tests.
- Policy-contract validation passed: all six required fields are present—internal numeric precision, statutory precedence, component normalization, aggregate calculation, display precision, and reconciliation invariant.
- Source-reference validation passed: 37 unique registered Source IDs, no duplicates, and no missing catalog references.
- Relative Markdown-link validation passed with zero missing local targets.
- Exact approved-policy enumeration passed across every whole-euro RAL from EUR 10,000 through EUR 120,000: minimum public net IRPEF EUR 126.73 at RAL EUR 10,000/base EUR 9,051.00.
- Policy fixtures passed: RAL 10,005 reconciles to EUR 949.48; RAL 55,240/55,241 reproduce the documented contribution, base, and article-13 boundary values.
- `git diff --check` passed for tracked changes; explicit trailing-whitespace checks passed for new run records. Git scope contains documentation/governance artifacts only, with no staged changes, application code, historical-run edits, or external mutations.

## Next action

Run the bounded independent re-review above. If it confirms the classifications and unreachable local edge, request explicit human fiscal approval and persist any resulting lifecycle transitions in a separate governance step. Do not start M2.
