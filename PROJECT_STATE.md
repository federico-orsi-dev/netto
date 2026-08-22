# Project State

- **Phase:** M2 — Implementation Architecture & Execution Plan
- **Milestone status:** complete; ready for an explicitly authorized M3
- **Architecture:** approved through M2; Phase 0 closed
- **Fiscal foundation:** 15 verified, 9 excluded, 0 candidate, and 0 blocked rules; bounded assumptions and product money policy approved
- **Current task:** none; M1 is frozen and M2 is closed
- **Next permitted milestone:** M3 deterministic domain engine only after an explicit new goal
- **Pending human gate:** M3 implementation authorization; production dependencies are selected by architecture but installed only in M3; release approval remains separate
- **Release:** not eligible
- **Last meaningful run:** `RUN-2026-08-22-016` — M2 implementation architecture and execution plan
- **Last updated:** 2026-08-22

## M1 closure

Checkpoint A is commit `661e844a4ea8b8d58f4577dd8e0b8b0e6e8a074d`, tree `58106004374b1de19c60fc3d12ae51e373d40a95`. Independent review commit `632dd0aa76a3183979992ce29c937fb2c35efb87` was imported as a review-record-only cherry-pick. Its 18 `VERIFIED`, 6 `BLOCKED`, and 0 `REJECTED` labels are review dispositions, not canonical lifecycle authority.

Reconciliation found a one-to-one mapping across all 24 Rule IDs. The human-approved RAL/contributable-remuneration assumption and component-first money policy resolved the amount-producing policy handoffs without converting assumptions or engineering policy into fiscal law. Targeted review commit `e1526115ca268a12cf6758d5cf07c71e59979a83` was validated as a one-record-only child of checkpoint `29c4232679ff51c3279c8ae5e653fb8037d1052b` and imported into the primary branch as `1555a6faa131f75ec6054be32d0b2b3b2411a732`.

The targeted reviewer reported no blocker, major, or minor finding and returned `READY FOR HUMAN FISCAL APPROVAL`. The human owner then approved the bounded exclusion of `RULE-LOCAL-2026-001` and individually approved every eligible reconciled candidate rule. The final lifecycle is 15 `verified`, 9 `excluded`, 0 `candidate`, and 0 `blocked`.

`RULE-LOCAL-2026-001` is excluded, not verified: the exact income-year-2026 IRPEF-due/de-minimis predicate remains unresolved, is never encoded as zero, and is output-unreachable only inside the current V1 envelope. Exhaustive whole-euro enumeration over RAL EUR 10,000–120,000 produced minimum modeled public net IRPEF of EUR 126.73. Reopen on a lower minimum RAL, changed tax/deduction mechanics or fiscal year, a profile capable of entering the unresolved region, or materially different authoritative evidence.

The minimum safe V1 model remains one RAL input. It retains separate domain concepts for annual gross salary and annual contributable remuneration, deriving the latter from the former under the human-approved V1 estimator assumption. This equality is product scope, not verified fiscal law. V1 remains a compensation estimator, not a CCNL/minimum-remuneration or payslip-compliance validator.

The fixed profile remains: article 10 CIGO industrial employer, more than 15 employees, CIGS, verified general FPLD treatment, and no mandatory sector solidarity/supplemental fund carrying an employee contribution. M1 approval is bounded to this documented profile and does not make Netto payroll software, a certified tax calculator, or universally accurate.

## M2 closure

M2 converts the frozen product, fiscal, architecture, testing, delivery, and AI-engineering evidence into one implementation contract. Major decisions are:

- one Vite/React application with a pure year-bound `calculateSalary2026` domain facade;
- `decimal.js` behind one adapter and public safe-integer euro cents;
- explicit formulas and typed 2026 data rather than a generic rule engine;
- one canonical amount registry referenced by summary, breakdown, waterfall, explanation, trace, accessibility, and tests;
- local React state, custom one-field validation, no router, persistence, URL state, or global store;
- direct React SVG plus semantic HTML waterfall;
- Cloudflare Pages Git integration, no Worker/Pages Function/backend;
- three coding milestones: M3 domain engine, M4 product experience, M5 release hardening.

No implementation code, package manifest, dependency installation, application test, remote mutation, Cloudflare project, or deployment was created in M2. There are no blocking implementation decisions; scaffold-time version selection and visual tokens are explicitly deferrable.

## Canonical orientation

- [Product specification](docs/product/product-spec.md)
- [Architecture](docs/architecture/architecture.md)
- [Implementation plan](docs/architecture/implementation-plan.md)
- [Waterfall decision](docs/architecture/decisions/ADR-0006-direct-svg-and-semantic-html-waterfall.md)
- [Cloudflare deployment decision](docs/architecture/decisions/ADR-0007-cloudflare-pages-static-deployment.md)
- [Fiscal Rule Catalog](docs/domain/fiscal-rules-2026.md)
- [Source Register](docs/domain/source-register-2026.md)
- [AI workflow](docs/ai-engineering/workflow.md)
- [Fiscal verifier contract](docs/ai-engineering/contracts/fiscal-research-and-verification.md)
- [Research synthesis](docs/ai-engineering/runs/2026-08-22-010-m1-fiscal-research-synthesis.md)
- [Independent fiscal verification](docs/ai-engineering/runs/2026-08-22-011-m1-independent-fiscal-verification.md)
- [Fiscal reconciliation](docs/ai-engineering/runs/2026-08-22-012-m1-fiscal-reconciliation.md)
- [Approved assumption and money policy](docs/ai-engineering/runs/2026-08-22-013-m1-approved-assumption-money-policy.md)
- [Targeted independent review](docs/ai-engineering/runs/2026-08-22-014-m1-targeted-independent-review.md)
- [M1 closure](docs/ai-engineering/runs/2026-08-22-015-m1-fiscal-foundation-closure.md)
- [M2 planning run](docs/ai-engineering/runs/2026-08-22-016-m2-implementation-architecture.md)

This file is a snapshot, not a diary. It describes authority recorded in canonical artifacts; it does not create authority.
