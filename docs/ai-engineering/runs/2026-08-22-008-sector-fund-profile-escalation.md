---
run_id: RUN-2026-08-22-008
date: 2026-08-22
tool: codex
role: integration-coordinator
task: sector-fund-profile-escalation
status: stopped
owner: codex
reviewer: human
related_rules:
  - RULE-INPS-2026-005
related_adrs:
  - ADR-0002
  - ADR-0004
commit: null
---

# Sector-fund profile escalation

## Objective

Audit the completed CIGS-profile delta and determine whether the human-approved industrial, more-than-15, CIGS archetype is sufficient for a complete employee-contribution candidate model.

## Result

Stopped canonical synthesis at a human approval boundary. The approved profile fixes CIGS applicability but does not prove article 10 CIGO scope or exclude mandatory sector solidarity/supplemental funds that can coexist with CIGO/CIGS and carry an employee contribution. `RULE-INPS-2026-005` is therefore `blocked`; no missing component is represented as zero.

## Evidence inspected

- `RUN-2026-08-22-002` and `RUN-2026-08-22-005`.
- INPS Message 637/2022 and the current FIS scope material.
- D.Lgs. 148/2015 articles 10 and 23.
- INPS Circular 86/2024 and Message 2548/2026 for the telecom-fund counterexample.

The counterexample is material: covered telecom employers may already be within Title I CIGO/CIGS while owing a separate 0.45% fund contribution, one third employee-funded. The example is evidence that the current profile is underdetermined, not a proposal to use telecommunications as the canonical sector.

## Files changed

- `PROJECT_STATE.md`
- `docs/product/product-spec.md`
- `docs/domain/fiscal-rules-2026.md`
- `docs/domain/source-register-2026.md`
- this run record

Completed national and local research records were preserved but not synthesized while this boundary remains open.

## Verification performed

- Confirmed that the canonical rule retains candidate rate/formula language and moves only the complete-profile status to `blocked`.
- Confirmed that the product specification discloses the unresolved applicability fact.
- Registered the official source records supporting the blocker.
- Ran repository whitespace validation after staging.

## Approval required

Choose one:

1. Approve a fixed article 10 CIGO industrial employer with more than 15 employees, within CIGS scope, and not subject to any mandatory sector solidarity/supplemental fund carrying an employee contribution.
2. Name a concrete sector/ATECO/CSC/authorization-code profile for further contribution research.
3. Approve omission as an explicit approximation, weakening the complete-contribution claim.
4. Expand V1 with employer-classification inputs.

Option 1 is recommended because it closes the applicability contract without adding user inputs or knowingly omitting a component.

## Next step

After explicit human approval, persist only the approved profile transition in a dedicated governance run, resume national/local/INPS canonical synthesis, and then hand the candidate model to independent Claude verification. No rule is verified by this escalation.
