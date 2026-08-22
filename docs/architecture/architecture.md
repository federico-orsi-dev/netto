---
status: accepted
approved_by: human
approved_at: 2026-08-22T16:43:01+02:00
phase_0: closed
---

# Architecture

## Approved baseline

- React, strict TypeScript, and Vite
- Static client-only runtime deployed to Cloudflare Pages through Git integration
- No backend, database, authentication, telemetry, salary persistence, or salary transmission
- Pure React-independent fiscal/domain engine
- `decimal.js` behind a domain-owned adapter
- Library-independent serializable public monetary values; no `Decimal` instances across public boundaries
- Typed `FiscalRuleset2026`; no generic fiscal DSL
- Local React state and no router
- Direct React SVG waterfall for desktop plus an always-available semantic HTML representation and intentional mobile transformation
- CSS custom properties and CSS Modules
- npm and committed lockfile
- Vitest, React Testing Library, Playwright, and one GitHub Actions quality workflow
- Repository-owned AI control, provenance, and audit model

## System boundary

Authoritative evidence is interpreted into human-approved fiscal rules. M2 defines the typed 2026 ruleset and pure-stage contracts; M3 will implement them. One calculation result plus structured evidence will feed annual, monthly, instalment, breakdown, visualization, and explanation outputs.

No presentation component may independently calculate a fiscal value.

## Monetary boundary

`decimal.js` is an internal arithmetic implementation detail. A domain-owned adapter centralizes construction, precision, statutory rounding, comparison, and serialization. Public calculation contracts expose deterministic serializable values independent of the library.

## Rule versioning

V1 exports one typed 2026 ruleset. Rates and thresholds are derived from verified research. Executable formulas remain explicit pure TypeScript rather than a custom DSL. A year registry and UI selector are deferred until a second year exists.

## Performance policy

Inspect production bundles, dependency cost, runtime network activity, layout stability, and interaction latency. Use Lighthouse and Web Vitals diagnostically. Do not reverse-engineer toward arbitrary vanity budgets.

## Visualization policy

The primary waterfall represents final amounts that change take-home pay. Intermediate bases, gross taxes, deductions, and relief belong to the trace. The SVG is a presentation projection over canonical result component IDs and never calculates fiscal values. Semantic HTML owns keyboard/screen-reader access and the mobile vertical form. If custom visualization complexity threatens correctness, accessibility, or release time, simplify it without sacrificing the semantic breakdown or explanation contract. See [ADR-0006](decisions/ADR-0006-direct-svg-and-semantic-html-waterfall.md).

## Deployment policy

Cloudflare Pages Git integration builds the repository with `npm run build` and publishes Vite's `dist` output. Preview deployments are branch/PR scoped; production follows the human-approved production branch. No Worker, Pages Function, runtime environment variable, deployment SDK, or backend is part of V1. Static security headers are repository-owned. See [ADR-0007](decisions/ADR-0007-cloudflare-pages-static-deployment.md).

## Implementation contract

[Implementation Architecture & Execution Plan](implementation-plan.md) owns the M2 source tree, public domain contracts, calculation pipeline, trace model, dependency budget, execution sequence, and Definition of Ready. It specializes this architecture without changing M1 fiscal truth.

## Governance

Accepted decisions are recorded in [ADRs](decisions/). Changes to architecture, control plane, privacy, dependencies, or release policy require human approval. Phase 0 is approved and closed.

## Milestones

1. M1 — Verified Fiscal Foundation
2. M2 — Implementation Architecture & Execution Plan
3. M3 — Deterministic Domain Engine
4. M4 — Product Experience and Explainability
5. M5 — Release Hardening and Submission

M1 and M2 contain documentation/research/planning only. They must not create executable fiscal logic or product UI.
