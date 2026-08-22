---
run_id: RUN-2026-08-22-010
date: 2026-08-22
tool: codex
role: integration-coordinator
task: m1-fiscal-research-synthesis
status: completed
owner: codex
reviewer: claude
related_rules:
  - RULE-INPS-2026-001..008
  - RULE-NAT-*-2026
  - RULE-LOCAL-2026-*
  - RULE-LOMBARDY-2026-001
  - RULE-MILAN-2026-001
related_adrs:
  - ADR-0002
  - ADR-0003
  - ADR-0004
commit: null
---

# M1 fiscal research synthesis

## Objective and acceptance criteria

Integrate the completed bounded INPS, national-tax, and local-tax research into the canonical Fiscal Rule Catalog and Source Register without self-verifying any rule. The research checkpoint requires complete schemas and provenance, explicit blocked/excluded states, deterministic threshold fixtures, coherent ordering, and a passed coordinator quality audit.

## Canonical context and research inspected

- `AGENTS.md`, `PROJECT_STATE.md`, ADR-0002 through ADR-0004, product assumptions, and test strategy.
- `RUN-2026-08-22-002` and `RUN-2026-08-22-005` for INPS.
- `RUN-2026-08-22-006` for national tax and automatic relief.
- `RUN-2026-08-22-007` for Lombardy/Milan and cross-rule ordering.
- `RUN-2026-08-22-008` and `RUN-2026-08-22-009` for the final fixed employer-profile authority.

The three researchers also performed read-only post-approval schema audits and supplied integration checklists. Researchers did not edit canonical files or verify their own findings.

## Changes made

- Expanded `docs/domain/fiscal-rules-2026.md` to 24 complete rule records: 15 `candidate`, 3 `blocked`, 6 `excluded`, and 0 `verified`.
- Expanded `docs/domain/source-register-2026.md` to 36 official source records.
- Added contribution, national-income, local-base, rounding, and representative full-engine boundary fixtures.
- Added candidate `POLICY-MONEY-2026-001` as an explicitly non-fiscal engineering policy requiring independent review and human approval.
- Updated `PROJECT_STATE.md` and research front matter to Checkpoint A.

No application code, production fiscal configuration, dependencies, UI, test implementation, architecture, protected agent instruction, or remote state changed.

## Integration decisions

1. The human-approved profile unblocks complete contribution applicability but does not verify the proposed 9.19% IVS, 0.30% CIGS, additional 1%, base, or ordering.
2. Historical research reused `RULE-INPS-2026-007` for annual-estimate rounding and payroll-exact rounding. The canonical catalog preserves ID 007 for its original unresolved annual-estimate responsibility and assigns `RULE-INPS-2026-008` to the excluded payroll-exact behavior. This removes semantic drift without rewriting historical runs.
3. `RULE-LOCAL-2026-001` is `blocked`, rather than merely candidate, because the exact 2026 IRPEF-due/de-minimis predicate can materially switch both local liabilities and must not be inferred from income-year-2025 guidance.
4. Lombardy and Milan rate/base formulas remain candidate conditional calculations. The Milan MEF-register gap is retained as a verification issue rather than treated as zero because official standing regulation and 2026 municipal evidence support continuation.
5. Statutory article-13 ratio precision and public-money rounding remain separate: `trunc4` is a candidate legal interpretation; cent/component reconciliation is a candidate engineering policy.

## Candidate ordering

`RAL → contribution base → IVS/CIGS employee contributions → ordinary employment/IRPEF base → gross IRPEF → employment and cuneo deductions (capacity-capped) → net IRPEF and sourced due gate → parallel Lombardy/Milan liabilities from unchanged common base → annual net`, with non-taxable cuneo sum and qualifying treatment integrativo added separately after liabilities.

This dependency graph is candidate research, not executable logic or a verified conclusion.

## Blocked rules

- `RULE-INPS-2026-007`: public annual contribution rounding/reconciliation policy.
- `RULE-LOCAL-2026-001`: exact 2026 IRPEF-due/de-minimis gate.
- `RULE-LOCAL-2026-ROUNDING`: annual local base/liability precision, scale, tie mode, and sequence.

All blocked items have evidence gaps or policy choices explicitly stated. No absence was converted into zero.

## Coordinator verification performed

- Parsed every canonical rule section and confirmed all 24 contain the required rule-schema concepts.
- Confirmed rule lifecycle counts and zero `verified` rule records.
- Parsed all 36 source records and confirmed the required source-schema fields.
- Compared all Source IDs referenced by the catalog against registered headings: no missing or unreferenced IDs.
- Inspected rates, bases, applicability, effective-period notes, formulas, ordering, exclusions, and unresolved questions for each research group.
- Confirmed all material thresholds have minus/equal/plus fixture proposals or an explicit blocked placeholder.
- Ran `git diff --check` and `git diff --cached --check` successfully.

This is integration self-review only and does not substitute for independent fiscal verification.

## Capabilities and side effects

- Local filesystem read/write and local Git inspection/staging were used.
- Network access used by the bounded researchers was limited to authoritative public fiscal/legal sources and is recorded in their runs.
- Existing bounded subagents were used for independent context isolation and read-only schema checklists, not for rule verification.
- No MCP server, credential, external write, remote Git mutation, deployment, or publication was used.

## Git state

All M1 files are staged on `m1/verified-fiscal-foundation`. A coherent local commit could not be created because repository-local/global Git author name and email are unset; no identity was invented. The repository has no remote and no prior commit.

## Human approval status and next action

The employer-profile assumptions are human-approved. No fiscal rate, base, formula, ordering, interpretation, rounding policy, or rule status is human-approved or verified.

Run the actual Claude Code fiscal verifier using `.claude/agents/fiscal-verifier.md` and the independent-review contract. It must reopen authoritative originals, produce a durable review record with BLOCKER/MAJOR/MINOR/NOTE findings, avoid editing candidate rules, and never mark a rule verified. After that record exists, resume Codex reconciliation under the M1 goal.
