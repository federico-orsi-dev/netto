# Project State

- **Phase:** M1 — Fiscal Reconciliation
- **Milestone status:** targeted independent re-review required
- **Architecture:** approved; Phase 0 closed
- **Fiscal research:** independently reconstructed and reconciled; 15 candidate, 1 blocked, 8 excluded, 0 verified rules; product money policy approved
- **Current task:** targeted independent re-review of the six reassessed blockers and approved calculation-policy boundary
- **Next external gate:** independent review of only the changed blocker classifications and supported-range local-due invariant
- **Pending human gate:** explicit fiscal approval after targeted re-review; no fiscal rule is yet approved as `verified`
- **Release:** not eligible
- **Last meaningful run:** `RUN-2026-08-22-013` — approved M1 assumption and money policy
- **Last updated:** 2026-08-22

## Reconciliation outcome

Checkpoint A is commit `661e844a4ea8b8d58f4577dd8e0b8b0e6e8a074d`, tree `58106004374b1de19c60fc3d12ae51e373d40a95`. Independent review commit `632dd0aa76a3183979992ce29c937fb2c35efb87` was imported as a review-record-only cherry-pick. Its 18 `VERIFIED`, 6 `BLOCKED`, and 0 `REJECTED` labels are review dispositions, not canonical lifecycle authority.

Reconciliation found a one-to-one mapping across all 24 Rule IDs. No rule was split, merged, or renamed. `RULE-INPS-2026-001` and `RULE-INPS-2026-005` move from `candidate` to `blocked`; `RULE-INPS-2026-006` moves from `excluded` to `blocked`. Existing rounding and local-due blockers remain blocked. No rule moves to `verified` without explicit human fiscal approval.

The minimum safe V1 model remains one RAL input. It retains separate domain concepts for annual gross salary and annual contributable remuneration, deriving the latter from the former under the human-approved V1 estimator assumption. This equality is product scope, not verified fiscal law. V1 remains a compensation estimator, not a CCNL/minimum-remuneration or payslip-compliance validator.

On 2026-08-22 the human owner approved:

1. The bounded RAL-to-contributable-remuneration V1 assumption.
2. Component-first monetary reconciliation with statutory mechanics taking precedence.

These decisions resolve the applicability/policy basis of `RULE-INPS-2026-001`, `RULE-INPS-2026-005`, `RULE-INPS-2026-006`, `RULE-INPS-2026-007`, and `RULE-LOCAL-2026-ROUNDING` without verifying fiscal law. `RULE-LOCAL-2026-001` remains blocked because the exact income-year-2026 de-minimis predicate is unavailable; approved-policy enumeration shows it is unreachable within V1. A narrow independent review must confirm these classifications and the invariant before the final human fiscal-approval gate.

The fixed profile remains: article 10 CIGO industrial employer, more than 15 employees, CIGS, general FPLD candidate treatment, and no mandatory sector solidarity/supplemental fund carrying an employee contribution. This profile approval did not approve any fiscal rate, base, formula, ordering, or rounding policy.

## Canonical orientation

- [Product specification](docs/product/product-spec.md)
- [Architecture](docs/architecture/architecture.md)
- [Fiscal Rule Catalog](docs/domain/fiscal-rules-2026.md)
- [Source Register](docs/domain/source-register-2026.md)
- [AI workflow](docs/ai-engineering/workflow.md)
- [Fiscal verifier contract](docs/ai-engineering/contracts/fiscal-research-and-verification.md)
- [Research synthesis](docs/ai-engineering/runs/2026-08-22-010-m1-fiscal-research-synthesis.md)
- [Independent fiscal verification](docs/ai-engineering/runs/2026-08-22-011-m1-independent-fiscal-verification.md)
- [Fiscal reconciliation](docs/ai-engineering/runs/2026-08-22-012-m1-fiscal-reconciliation.md)
- [Approved assumption and money policy](docs/ai-engineering/runs/2026-08-22-013-m1-approved-assumption-money-policy.md)

This file is a snapshot, not a diary. It describes authority recorded in canonical artifacts; it does not create authority.
