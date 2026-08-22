---
run_id: RUN-2026-08-22-003
date: 2026-08-22
tool: codex
role: integration-coordinator
task: inps-profile-escalation
status: stopped
owner: codex
reviewer: human
related_rules:
  - RULE-INPS-2026-005
  - RULE-INPS-2026-007
related_adrs:
  - ADR-0002
  - ADR-0003
commit: null
---

# M1 INPS Profile Escalation

## Objective

Inspect the bounded INPS research, integrate the established material blocker into canonical state, and stop rather than invent a complete contribution profile.

## Acceptance criteria

The blocker is evidence-backed, canonical, visible in project state, and presented with bounded choices. No fiscal rule is verified, no architecture/scenario change is made, and unrelated research does not continue across the explicit approval boundary.

## Canonical context and sources inspected

- Approved Phase 0 contribution-profile decision and M1 goal contract.
- `AGENTS.md`, `PROJECT_STATE.md`, fiscal research/verification and run-record contracts.
- `RUN-2026-08-22-002`, including official INPS, primary-law, CIGS, FIS, and employer-classification sources.
- Coordinator reopened INPS Circular 6/2026 and official 2026 local/national discovery sources before the blocker was reported; those unrelated findings were not integrated as completed research.

## Changes made

- Added `RULE-INPS-2026-005` as `blocked` to the canonical rule catalog.
- Registered the official sources needed to establish the blocker.
- Updated `PROJECT_STATE.md` to the human-decision gate.
- Interrupted the still-running national and local research streams; they had not written run records or canonical files.

## Verification performed

Confirmed that the INPS researcher wrote only its assigned run, used allowed statuses, did not mark a rule verified, and provided complete evidence/interpretation and fixtures. Reopened the principal 2026 INPS threshold source and inspected repository/Git state. `git diff --check` was clean before the coordinator update; a final check follows this record.

## Findings

The approved phrase “private-sector, non-executive, permanent employee” does not select a complete employee contribution treatment. Official material makes supplemental employee-paid CIGS/FIS/bilateral-fund contributions contingent on absent employer facts. Calling 9.19% complete would violate the evidence contract.

Exact payroll-period rounding is also not derivable from annual RAL alone, but a disclosed annual-estimate rounding policy can be decided after independent review; it does not require payslip simulation.

## Material capabilities and side effects

Used local filesystem/Git writes, official unauthenticated web reads, and the explicitly approved bounded Codex subagent capability. No MCP server, authenticated account, remote mutation, package installation, secret, or production side effect was used. The only external effect was public HTTP retrieval.

## Human approval status

Architecture remains human-approved. No fiscal rule, employer archetype, approximation, or rounding policy is approved. No rule is verified.

## Unresolved issue and options

1. Human-approve a concrete employer archetype, including sector/classification, wage-support scheme, headcount, and any required history assumption.
2. Add employer classification inputs, which expands scope and is not recommended.
3. Explicitly model only the FPLD pension components and exclude supplemental employee-funded wage-support/fund contributions, accepting a named systematic approximation.

Recommendation: option 1, because it preserves the one-input experience and produces a complete, inspectable named profile. The human owner must select the archetype; an agent must not infer it.

## Recommended next action

Obtain the human contribution-profile decision. Then resume the national and local research streams, reconcile the complete candidate catalog, and proceed to independent Claude fiscal verification only after the coordinator quality audit passes.
