---
run_id: RUN-2026-08-22-004
date: 2026-08-22
tool: human-governance
role: integration-coordinator
task: canonical-cigs-profile-approval
status: completed
owner: human
reviewer: null
related_rules:
  - RULE-INPS-2026-005
related_adrs:
  - ADR-0002
  - ADR-0005
commit: null
approved_by: human
approved_at: 2026-08-22T19:53:53+02:00
---

# Canonical CIGS Profile Approval

## Objective

Persist the explicit human decision that resolves the missing employer-archetype blocker without approving any fiscal rate, formula, source interpretation, or rounding policy.

## Approved transition

The canonical employee now works for a private-sector industrial employer with more than 15 employees and within CIGS scope. This is a fixed, visible scenario assumption used to preserve the one-RAL-input product contract.

`RULE-INPS-2026-005` moves from `blocked` to `candidate` because its applicability inputs are now defined. The 9.19% IVS, 0.30% CIGS, additional 1%, bases, thresholds, ordering, and formulas remain unverified candidate research.

## Canonical context consulted

- `AGENTS.md` and `PROJECT_STATE.md`
- Relevant accepted ADRs 0002–0005
- `RUN-2026-08-22-001` through `RUN-2026-08-22-003`
- Fiscal Rule Catalog, Source Register, and product specification
- Explicit human instruction: `APPROVE OPTION 1 — CIGS PROFILE`

## Changes made

- Updated the canonical product scenario and limitation.
- Updated the Fiscal Rule Catalog's scenario and the lifecycle/applicability of `RULE-INPS-2026-005`.
- Updated the operational project state so interrupted research may resume.

No historical record, source claim, formula, architecture decision, application code, or control-plane instruction was changed.

## Verification performed

Confirmed that the transition records only the approved profile; searched the canonical catalog to ensure no fiscal rule is marked `verified`; checked repository scope and Markdown diff integrity.

## Capabilities and side effects

Used local filesystem and Git inspection/write capability only. No network, MCP, external account, remote Git operation, or external side effect was required for this governance transition.

## Human approval status

The employer archetype is approved. Fiscal rates, formulas, derivations, rounding, and the complete fiscal model are not approved or verified.

## Recommended next action

Resume the bounded national and local 2026 research streams, then synthesize and quality-audit the complete candidate catalog before independent Claude verification.
