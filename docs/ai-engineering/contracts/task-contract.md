# Meaningful Task Contract

Use this contract for work that changes canonical facts, product behavior, architecture, fiscal logic, release state, or multiple files.

## Required fields

- Objective and user-visible outcome
- Canonical context and evidence to inspect
- In-scope work and explicit non-goals
- Authority and permitted writes/side effects
- Acceptance criteria
- Verification required
- Protected decisions or files
- Human/external gates
- Escalation conditions
- Required run record and next owner

## Fail-fast rules

Stop and escalate when evidence is insufficient, repository state conflicts materially with the task, a protected decision must change, requested authority is missing, or correctness would require an undocumented approximation. Use: Problem, Evidence, Impact, Available options, Recommended decision.
