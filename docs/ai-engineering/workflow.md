# AI Engineering Workflow

Repository evidence, not conversation memory, controls work. [AGENTS.md](../../AGENTS.md) defines shared behavior; this document owns task flow and durable audit practice.

## Flow

1. Read `PROJECT_STATE.md` and route to the canonical owner of the task's facts.
2. Define a bounded task contract, acceptance criteria, non-goals, authority, and approval gates.
3. Inspect evidence and existing work before writing; plan meaningful changes.
4. Use specialized agents only when context isolation or independent judgment has concrete value.
5. Keep implementation and material validation independent where economically sensible.
6. Verify in proportion to risk and create one concise run record per meaningful task.
7. Distinguish completed work from reviewer acceptance and human approval.
8. Update `PROJECT_STATE.md` only when the operational snapshot changes.

## Canonical ownership

- Scope and UX contracts: `docs/product/product-spec.md`
- Architecture: `docs/architecture/architecture.md` and accepted ADRs
- Fiscal truth: `docs/domain/fiscal-rules-2026.md`
- Fiscal provenance: `docs/domain/source-register-2026.md`
- Testing policy: `docs/testing/test-strategy.md`
- Current operational snapshot: `PROJECT_STATE.md`
- Historical execution: `docs/ai-engineering/runs/`

Normal Markdown and relative links keep GitHub canonical while making the repository usable as an Obsidian vault. No duplicate `/obsidian` tree is maintained.

## Agent authority

Task prompts must state role, bounded objective, authority, permitted writes, verification, escalation conditions, and structured output. Agents provide concise rationale, assumptions, evidence, alternatives/trade-offs where material, and checks performed—never hidden chain-of-thought or transcript dumps.

## Approval transitions

Only humans approve architecture, fiscal truth, and release. After explicit approval, an integration coordinator may persist exactly the corresponding status/metadata transition in a dedicated governance change. It must not bundle unrelated edits.
