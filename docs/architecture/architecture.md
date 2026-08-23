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
- Semantic HTML/CSS Compensation Translator with one application-level current/proposed comparison projection
- CSS custom properties and CSS Modules
- npm and committed lockfile
- Vitest, React Testing Library, Playwright, and one GitHub Actions quality workflow
- Repository-owned AI control, provenance, and audit model

## System boundary

Authoritative evidence is interpreted into human-approved fiscal rules. The typed 2026 ruleset and pure-stage contracts produce one canonical calculation result plus structured evidence for annual, monthly, instalment, component, and explanation outputs. The optional comparison capability accepts two complete canonical results under the same context and derives only signed public-value differences and Rule-ID applicability changes.

No presentation component may independently calculate a fiscal value.

## Monetary boundary

`decimal.js` is an internal arithmetic implementation detail. A domain-owned adapter centralizes construction, precision, statutory rounding, comparison, and serialization. Public calculation contracts expose deterministic serializable values independent of the library.

## Rule versioning

V1 exports one typed 2026 ruleset. Rates and thresholds are derived from verified research. Executable formulas remain explicit pure TypeScript rather than a custom DSL. A year registry and UI selector are deferred until a second year exists.

## Performance policy

Inspect production bundles, dependency cost, runtime network activity, layout stability, and interaction latency. Use Lighthouse and Web Vitals diagnostically. Do not reverse-engineer toward arbitrary vanity budgets.

## Product projection policy

The primary presentation translates gross compensation into annual and monthly disposable outcomes. Optional comparison makes the change itself primary: gross delta, net deltas, modeled retained share, changed canonical components, and relevant verified rule-applicability changes. Semantic HTML owns meaning, keyboard access, and responsive reading order; CSS owns composition only. Component disclosures use canonical amount identities and trace evidence without recalculating fiscal values. See [ADR-0008](decisions/ADR-0008-compensation-translator-presentation.md); [ADR-0006](decisions/ADR-0006-direct-svg-and-semantic-html-waterfall.md) remains the historical V1 decision.

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
6. Post-V1 — Compensation Translator differentiation release

M1 and M2 contain documentation/research/planning only. They must not create executable fiscal logic or product UI.
