# Shared Agent Operating Contract

## Start here

1. Read `PROJECT_STATE.md` for the active milestone and gates.
2. Read only the canonical documents relevant to the task.
3. Inspect repository and Git state before writing.
4. For meaningful work, state a bounded plan and acceptance criteria before changes.

## Canonical knowledge

- Product scope and user contract: `docs/product/product-spec.md`
- Architecture and boundaries: `docs/architecture/architecture.md`
- Material decisions: `docs/architecture/decisions/`
- Fiscal truth: `docs/domain/fiscal-rules-2026.md`
- Source provenance: `docs/domain/source-register-2026.md`
- Test obligations: `docs/testing/test-strategy.md`
- Agent workflow and contracts: `docs/ai-engineering/`
- Release gate: `docs/delivery/release-checklist.md`
- Current operational state: `PROJECT_STATE.md`

Repository records supersede conversation memory. Link to canonical owners instead of copying their content.

## Fiscal safety

- Never create a fiscal rule from model memory, an opaque calculator, or an unsourced summary.
- Use primary law and competent official institutions; secondary sources are discovery aids only.
- Distinguish source evidence from engineering interpretation.
- Absence, exclusion, candidacy, or blockage is never equivalent to a zero-valued rule.
- Only a human-approved `verified` rule may affect production calculations.
- Researchers cannot verify their own rules. Reviewers must reopen original evidence.

## Scope and architecture

- Current milestone boundaries in `PROJECT_STATE.md` are binding.
- Do not expand product scope or change an accepted ADR without human approval.
- The application is static and client-only: no backend, persistence, telemetry, salary transmission, or external calculation API.
- Executable fiscal logic belongs to a React-independent domain engine, never UI components.
- `decimal.js` is internal behind a domain adapter; library instances never cross public result boundaries.

## Verification and completion

- Run the checks required by the task and test strategy.
- Validate final behavior and meaningful intermediates; do not use arbitrary coverage as an oracle.
- The task owner updates affected canonical documentation and creates a run record for meaningful work.
- Record relevant tools, MCP/network capabilities, and external side effects only when material to task risk.
- `TASK IMPLEMENTATION COMPLETE` does not mean feature, fiscal, or release approval.

## Human gates

Human approval is required for architecture changes, material fiscal verification, scope expansion, new production dependencies, privacy changes, control-plane changes, external/remote mutations, and release approval.

After explicit approval, the integration coordinator may persist only the approved metadata transition in a dedicated governance step.

## Protected control plane

`AGENTS.md`, `CLAUDE.md`, `.claude/`, accepted ADRs, approval/review rules, goal contracts, release gates, and delivery automation are protected. Outside an explicitly approved governance task, propose changes using `CONTROL-PLANE CHANGE PROPOSED`; do not silently rewrite the rules governing the agent.

## Escalation

Stop when evidence is missing or conflicting, requirements contradict, approval authority is insufficient, tests diverge without explanation, or the action would change architecture, scope, privacy, permissions, or external state. Report: Problem, Evidence, Impact, Available options, Recommended decision.

## Git

Agents may manage local task history when authorized. Do not push, merge, force-push, rewrite shared history, publish releases, or change remote settings without explicit approval. Preserve unrelated and user-owned work.
