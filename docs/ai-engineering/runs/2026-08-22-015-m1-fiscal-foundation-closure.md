---
run_id: RUN-2026-08-22-015
date: 2026-08-22
tool: human-governance
role: m1-integration-coordinator
task: m1-fiscal-foundation-closure
status: completed
owner: human
reviewer: codex
related_rules:
  - RULE-INPS-2026-001
  - RULE-INPS-2026-002
  - RULE-INPS-2026-003
  - RULE-INPS-2026-004
  - RULE-INPS-2026-005
  - RULE-NAT-BASE-2026
  - RULE-NAT-GROSS-IRPEF-2026
  - RULE-NAT-EMPLOYMENT-DEDUCTION-2026
  - RULE-NAT-NET-IRPEF-2026
  - RULE-NAT-CUNEO-SUM-2026
  - RULE-NAT-CUNEO-DEDUCTION-2026
  - RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026
  - RULE-LOCAL-2026-001
  - RULE-LOMBARDY-2026-001
  - RULE-MILAN-2026-001
  - RULE-LOCAL-2026-ORDER
related_adrs:
  - ADR-0002
  - ADR-0003
  - ADR-0004
commit: null
---

# M1 fiscal foundation closure

## Objective and authority boundary

Persist the human owner's explicit approval of the reconciled fiscal foundation for the bounded V1 estimator, including the bounded exclusion of `RULE-LOCAL-2026-001`, and close M1 only if repository validation succeeds.

This governance step does not create fiscal evidence, broaden V1, turn assumptions or product policies into fiscal law, claim payroll/certified-calculator accuracy, implement application code, begin M2, or approve release.

## Independent review import

The targeted review artifact was created in the isolated `review/m1-targeted-policy` worktree against checkpoint commit `29c4232679ff51c3279c8ae5e653fb8037d1052b`, tree `2169ce834d613be69d26c2338a488cd807f41c76`.

Before import, the integration coordinator confirmed that review commit `e1526115ca268a12cf6758d5cf07c71e59979a83`:

- has the exact checkpoint as its parent;
- adds only `RUN-2026-08-22-014`;
- changes no canonical fiscal artifact, application file, architecture/control-plane file, or earlier run record;
- leaves the isolated worktree clean.

The record was imported with a one-commit cherry-pick as primary commit `1555a6faa131f75ec6054be32d0b2b3b2411a732`. RUN-014 reports no blocker, major, or minor finding and concludes `READY FOR HUMAN FISCAL APPROVAL`.

## Human decisions persisted

1. `RULE-LOCAL-2026-001` moves from `blocked` to bounded `excluded`. The exact 2026 IRPEF-due/de-minimis predicate remains unresolved, is not verified, is never encoded as zero, and is excluded only because independent enumeration proves it cannot affect a supported V1 result.
2. The reconciled M1 fiscal foundation is approved for implementation planning within the documented 2026 profile, assumptions, exclusions, sources, and deterministic money policy.
3. The RAL/contributable-remuneration identity remains an approved product assumption, not legal identity.
4. `POLICY-MONEY-2026-001` remains approved deterministic calculation policy outside the fiscal-rule lifecycle.

## Individual fiscal-rule promotions

Each transition below requires the conjunction of registered authoritative evidence, original research, independent reconstruction, primary reconciliation, targeted re-review where applicable, and this explicit human approval. Agreement between agents alone was not treated as evidence.

| Rule ID | Previous | Final | Authoritative basis | Independent and reconciliation basis | Bounded implementation consequence / residual uncertainty |
| --- | --- | --- | --- | --- | --- |
| RULE-INPS-2026-001 | candidate | verified | `SRC-LEGAL-DLGS314-1997-ART6`, `SRC-INPS-2026-006` | RUN-011 identified the legal/product distinction; RUN-012 proposed the bounded identity; RUN-014 confirmed its classification after human policy approval | Keep gross salary and contributable remuneration distinct; derive equality only under the approved V1 assumption. Reopen on profile/input expansion. |
| RULE-INPS-2026-005 | candidate | verified | INPS/FPLD, CIGS, classification, and sector-fund sources registered on the rule | RUN-011 confirmed rates/composition but blocked handoffs; RUN-012 reconciled them; RUN-014 confirmed deterministic handoffs | Aggregate the separately verified FPLD, additional-IVS, and CIGS components only for the fixed no-sector-fund archetype. |
| RULE-INPS-2026-002 | candidate | verified | `SRC-INPS-2024-101`, `SRC-INPS-2026-006`, `SRC-INPS-CLASSIFICATION-2025` | RUN-011 verified 9.19% as the general FPLD worker share; RUN-012 found no conflict | Implement only for the verified general-FPLD profile; never label it the complete burden. |
| RULE-INPS-2026-003 | candidate | verified | `SRC-LEGAL-DL384-1992-ART3TER`, `SRC-INPS-2026-006`, `SRC-INPS-2025-156` | RUN-011 verified the 1% excess band and annual conguaglio interpretation; reconciliation preserved it | Apply to excess above EUR 56,224 under the annual estimator; no payslip-period simulation. |
| RULE-INPS-2026-004 | candidate | verified | `SRC-LEGAL-L335-1995-ART2-C18`, `SRC-INPS-2026-006` | RUN-011 verified the EUR 122,295 ceiling and in-range inactivity | Retain a versioned in-range no-op; reopen on range expansion or material contribution-base change. |
| RULE-NAT-BASE-2026 | candidate | verified | `SRC-NAT-TUIR-ART3-2026`, `SRC-NAT-TUIR-ART51-2026` | RUN-011 verified the structural base; approved handoffs resolved its numeric dependency | Derive ordinary taxable income from RAL less verified employee contributions inside the fixed no-other-income scenario. |
| RULE-NAT-GROSS-IRPEF-2026 | candidate | verified | `SRC-NAT-TUIR-ART11-2026`, `SRC-NAT-L199-ART1-2026` | RUN-011 independently verified 23% / 33% / 43% and supersession of 35% | Apply marginal slices at EUR 28,000 and EUR 50,000 for fiscal year 2026. |
| RULE-NAT-EMPLOYMENT-DEDUCTION-2026 | candidate | verified | `SRC-NAT-TUIR-ART13-2026`, `SRC-NAT-L207-ART1-2-9`, `SRC-NAT-ADE-CIR4E-2025` | RUN-011 verified formulas/endpoints/truncation; RUN-012 and RUN-014 reproduced the EUR 49,997/49,998 transition | Apply statutory four-decimal ratio truncation before product money normalization. |
| RULE-NAT-NET-IRPEF-2026 | candidate | verified | `SRC-NAT-TUIR-ART11-2026`, `SRC-NAT-L207-ART1-2-9`, `SRC-NAT-DL3-ART1-2026` | RUN-011 verified capacity/order; reconciliation separated cash benefits | Cap modeled deductions at gross IRPEF and keep positive cash benefits downstream. |
| RULE-NAT-CUNEO-SUM-2026 | candidate | verified | `SRC-NAT-L207-ART1-2-9`, `SRC-NAT-ADE-CIR4E-2025` | RUN-011 verified rates, boundaries, and coexistence; RUN-014 confirmed policy handoffs | Add the non-taxable amount after liabilities; never model it as a tax deduction. |
| RULE-NAT-CUNEO-DEDUCTION-2026 | candidate | verified | `SRC-NAT-L207-ART1-2-9`, `SRC-NAT-ADE-CIR4E-2025` | RUN-011 verified amount/bands/phase-out; RUN-014 confirmed money ownership | Apply as a non-refundable deduction; do not import article-13 truncation into its ratio. |
| RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026 | candidate | verified | `SRC-NAT-DL3-ART1-2026`, `SRC-NAT-L207-ART1-2-9`, `SRC-NAT-ADE-CIR4E-2025` | RUN-011 verified the strict capacity test and coexistence; reconciliation preserved separate cash treatment | Apply the bounded full-year low-income branch only; conditional 15k–28k facts remain excluded. |
| RULE-LOMBARDY-2026-001 | candidate | verified | `SRC-LOCAL-2026-001` through `SRC-LOCAL-2026-005` | RUN-011 independently verified the four marginal 2026 bands; RUN-012 found no conflict | Calculate marginal bracket components on the common base; policy owns public cents. |
| RULE-MILAN-2026-001 | candidate | verified | `SRC-LOCAL-2026-006` through `SRC-LOCAL-2026-010` | RUN-011 verified the current 0.8% whole-base rule and EUR 23,000 inclusive exemption; reconciliation closed the former MEF-row concern | Apply zero through EUR 23,000 and 0.8% to the whole base above it for the fixed Milan domicile. |
| RULE-LOCAL-2026-ORDER | candidate | verified | Registered national, contribution, regional, municipal, and ordering sources | RUN-011 verified structural ordering; RUN-012 reconciled money ownership; RUN-014 proved the unresolved due edge output-unreachable | Use verified upstream components and unchanged sibling local-tax base; cash benefits remain downstream additions. |

No assumption, engineering policy, or excluded rule was promoted as fiscal law.

## Exclusions and reopening conditions

| Excluded rule | Bounded reason | Reopen when |
| --- | --- | --- |
| RULE-INPS-2026-006 | Minimum-remuneration compliance mechanics require CCNL/schedule/period facts intentionally absent under the lawful-remuneration assumption | Compliance claims or contribution-base/profile inputs expand |
| RULE-INPS-2026-007 | Normative/payroll annual rounding is not established for this estimator | Payroll/reporting exactness is claimed |
| RULE-INPS-2026-008 | Payslip-exact contribution rounding needs period/cumulative facts | Payslip simulation enters scope |
| RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026 | The 15k–28k branch needs excluded deduction/history facts | Those facts become supported inputs |
| RULE-NAT-SPECIAL-PAY-2026 | Special-pay regimes need decomposed pay and prior-year eligibility facts | Product models those components |
| RULE-NAT-PERSONAL-RELIEFS-2026 | Personal/family/other-income facts are outside the fixed persona | Persona or inputs expand |
| RULE-LOCAL-2026-001 | Exact 2026 de-minimis predicate unresolved but output-unreachable across current supported range | Minimum RAL drops; tax/deduction mechanics or fiscal year change; another profile reaches the edge; or materially different authoritative evidence appears |
| RULE-LOCAL-2026-ROUNDING | Normative return/payroll rounding is outside the annual estimator | Tax-return, withholding, or payroll exactness is claimed |
| RULE-LOCAL-2026-WITHHOLDING | Advance/balance and individual payslip timing are outside annual liability | Payroll cash-timing simulation enters scope |

An exclusion is never a universal zero, a finding that law does not exist, or permission to erase the limitation from product methodology.

## Final lifecycle and non-blocking limitations

- `verified`: 15
- `excluded`: 9
- `candidate`: 0
- `blocked`: 0

Remaining limitations are deliberate scope boundaries rather than M1 blockers: one full-year ordinary-employment profile; one industrial CIGS/no-sector-fund archetype; Milan/Lombardy; RAL EUR 10,000–120,000; no personal facts or special pay; annual estimate rather than payslip, filing, CCNL, or payroll-compliance result; and deterministic product cents rather than claimed statutory payroll/return rounding.

## Files changed by closure governance

- `PROJECT_STATE.md`
- `README.md`
- `docs/product/product-spec.md`
- `docs/domain/fiscal-rules-2026.md`
- `docs/domain/source-register-2026.md`
- `docs/testing/test-strategy.md`
- `docs/ai-engineering/runs/2026-08-22-015-m1-fiscal-foundation-closure.md`

RUN-014 was imported in its own review-only commit before this governance transition. Historical runs were not rewritten.

## Validation

- Catalog lifecycle/schema validation: passed; 24 unique Rule IDs, 15 verified, 9 excluded, 0 candidate, and 0 blocked.
- Individual promotion audit: passed; the 15 verified IDs exactly equal the prior candidate set and each has registered authoritative sources plus independent/reconciliation evidence.
- Exclusion audit: passed; all 9 excluded rules retain a bounded reason and reopening condition.
- Source-reference validation: passed; all catalog Source IDs resolve uniquely in the Source Register.
- Relative Markdown-link validation: passed with zero missing local targets.
- Money-policy contract and exact fixtures: passed; required ownership fields, RAL EUR 10,005 and 55,240/55,241 fixtures, and component reconciliation remain intact.
- Supported-range invariant: passed across all 110,001 whole-euro RAL inputs from EUR 10,000 through EUR 120,000; minimum public net IRPEF is EUR 126.73 at RAL EUR 10,000.
- Git scope and whitespace validation: passed; closure changes documentation/governance artifacts only, `git diff --check` passes, no application code exists or changed, and no historical run was modified.
- Application tests: not applicable; M1 contains no application code or test runner.

## Final assessment

**M1 VERIFIED — READY FOR IMPLEMENTATION PLANNING**

Do not begin M2 or implementation without a new explicit goal.
