---
run_id: RUN-2026-08-22-016
date: 2026-08-22
tool: codex
role: principal-implementation-architect
task: m2-implementation-architecture
status: completed
owner: codex
reviewer: human
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
  - RULE-LOMBARDY-2026-001
  - RULE-MILAN-2026-001
  - RULE-LOCAL-2026-ORDER
related_adrs:
  - ADR-0001
  - ADR-0002
  - ADR-0003
  - ADR-0004
  - ADR-0005
  - ADR-0006
  - ADR-0007
commit: null
---

# M2 implementation architecture

## Objective

Transform the frozen M1 product/fiscal baseline and approved architecture into a minimal implementation-ready technical contract without scaffolding, installing dependencies, writing application/tests, deploying, or reopening fiscal research.

## Acceptance criteria

- Produce a concise repository evidence map and confirmed V1 scope.
- Resolve public engine, money, ruleset, result, trace, state, visualization, validation, testing, dependency, quality, deployment, and review contracts.
- Map all 15 verified rules and all 9 exclusions to implementation responsibilities.
- Sequence the next coding milestones with objective acceptance/review gates.
- Remove speculative layers/dependencies through adversarial review.
- Preserve M1 lifecycle and prove that no application artifact or dependency was created.
- Leave no architectural blocker capable of forcing expensive implementation redesign.

## Canonical context inspected

- `AGENTS.md`, `CLAUDE.md`, `PROJECT_STATE.md`, `README.md`, and complete repository inventory including `.claude/agents`.
- Product Specification, Architecture, ADR-0001–ADR-0005, Fiscal Rule Catalog, Source Register, Test Strategy, Release Checklist, AI Workflow, task/run/review contracts, and M1 closure/review records.
- Git branch/history/status and absence of application/package/toolchain files.

No separate design-system artifact exists; approved UX, responsive, accessibility, and performance constraints are owned by the Product Specification, Architecture, Test Strategy, and Release Checklist. M2 did not invent a duplicate design document.

## External evidence and capabilities

The local Cloudflare platform skill was read in full because M2 required a current Cloudflare deployment decision. Following its retrieval-first instruction, Codex used read-only web access only to current official Cloudflare documentation for Pages Git integration, preview deployments, custom headers, Vite static output, and Workers Static Assets. No plugin, MCP server, package, credential, Cloudflare account, project, Worker, DNS record, repository remote, or deployment was created or changed.

## Decisions

- One Vite/React repository and static artifact; no monorepo or package split.
- Pure `calculateSalary2026` facade bound to a typed 2026 context; no dynamic year registry or fiscal DSL.
- `decimal.js` imported only by one domain adapter; public monetary values are safe integer euro cents and exact trace intermediates are decimal strings.
- One canonical amount registry plus stable component IDs feeds every UI representation.
- Explicit named calculation stages and immutable stage results; no mutable rule dispatcher.
- Local React/page/component state; no global store, URL salary state, persistence, or application-service layer.
- Strict custom Italian whole-euro parser; no runtime schema dependency or silent clamping.
- Direct React SVG visual projection plus semantic HTML accessibility/mobile representation; no charting dependency.
- Cloudflare Pages Git integration with `dist`, previews, and repository-owned `_headers`; no Worker, Pages Function, Wrangler baseline dependency, or deployment script.
- Three coding milestones after M2: M3 domain engine, M4 product experience, M5 release hardening.

## Dependency budget

Runtime is limited to React/React DOM and the already-approved `decimal.js`. Development dependencies are limited to TypeScript/Vite, lint/format tooling, Vitest/jsdom, React Testing Library, Playwright, and `@axe-core/playwright`. Validation, state, routing, charting, property-testing, CSS/component, i18n, analytics, Cloudflare runtime/deploy, and backend dependencies were rejected.

## Files changed

- `PROJECT_STATE.md`
- `README.md`
- `docs/architecture/architecture.md`
- `docs/architecture/implementation-plan.md`
- `docs/architecture/decisions/ADR-0006-direct-svg-and-semantic-html-waterfall.md`
- `docs/architecture/decisions/ADR-0007-cloudflare-pages-static-deployment.md`
- `docs/testing/test-strategy.md`
- `docs/delivery/release-checklist.md`
- `docs/ai-engineering/runs/2026-08-22-016-m2-implementation-architecture.md`

No M1 fiscal catalog, source register, prior run record, control-plane file, or application artifact was modified.

## Adversarial review result

The proposal was challenged for unnecessary packages/layers, second-engine risk, year mixing, money-policy bypass, implicit ordering, exclusion leakage, speculative scale, deployment compute, and documentation duplication. The final plan removes a separate application layer, monorepo/package boundary, DI/rule/plugin framework, global store, router, chart library, schema library, property-test library, CSS/i18n framework, Cloudflare compute/plugin, backend, and remote rules. No unresolved architectural choice remains.

## Validation

- M1 lifecycle integrity: passed; 15 verified, 9 excluded, 0 candidate, 0 blocked, with byte-identical Fiscal Rule Catalog and Source Register relative to M1 closure.
- Evidence/contract coverage: passed; all required M2 deliverables and every verified/excluded Rule ID are present in the implementation plan.
- Markdown relative-link validation: passed with zero missing local targets.
- ADR validation: passed; ADR-0006 and ADR-0007 record decision, rationale, alternatives, trade-offs, and consequences.
- Repository scope: passed; only the nine documented planning/governance files changed or were added.
- No-code/dependency gate: passed; no `src`, package manifest, lockfile, JavaScript/TypeScript application file, installed dependency directory, or build artifact exists.
- Git whitespace validation: passed with `git diff --check` and explicit checks for new files.
- Build/tests: not applicable because M2 intentionally contains no application toolchain or executable code.

## Human/external gates and next action

The human-authored M2 mandate authorized resolution and documentation of the visualization and Cloudflare architecture choices. Cloudflare connection/deployment, production dependencies installation, implementation, and release remain separate actions.

There are no blocking decisions. Deferrable choices are exact compatible package versions, final file splits inside the documented boundaries, CSS token values/typeface, non-fiscal Italian copy polish, Cloudflare project/domain names, screenshots, and release metadata.

The next permitted work is a separately authorized **M3 — Deterministic Domain Engine** goal implementing M3.1–M3.4 from the Implementation Architecture & Execution Plan. Do not begin it automatically.

## Outcome

**M2 COMPLETE — READY FOR IMPLEMENTATION**
