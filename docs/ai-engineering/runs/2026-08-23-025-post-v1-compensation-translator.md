---
run_id: RUN-2026-08-23-025
date: 2026-08-23
tool: codex
role: principal-product-engineer
task: post-v1-compensation-translator
status: in_progress
owner: codex
reviewer: human
related_rules: []
related_adrs:
  - ADR-0004
  - ADR-0008
commit: null
---

# Post-V1 Compensation Translator differentiation release

## Objective and boundary

Replace the released V1 waterfall-led presentation with the human-approved Compensation Translator while preserving the verified EUR 10,000–120,000 fiscal domain, component-first money policy, canonical numeric ownership, client-only privacy model, and small runtime surface. The only product-scope expansion is one optional comparison between a current and proposed RAL under the same canonical fiscal context.

Acceptance requires a complete single-RAL journey, decision-centered comparison, signed edge-case behavior, in-context explanations, concise trust and expert evidence, proportional implementation, local quality gates, normal Git push, Cloudflare Pages deployment, and production verification.

## Implementation

- Added `compareCompensationResults`, an application-level contract over two complete `SalaryCalculationResult` values. It owns signed gross/annual/monthly deltas, a precisely named modeled retained share, canonical component changes, annual-net effects, and applied Rule-ID changes. Safe-integer cents and deterministic half-up basis points are its only numeric operations; it contains no fiscal formula.
- Replaced the marketing hero, result-card layer, direct SVG waterfall, duplicated breakdown, and detached explanation panel with one semantic typographic translation and an in-context component ledger.
- Preserved the complete single-salary path and introduced comparison only after a valid result. Increase, decrease, equal-value, benefit, and threshold-change states share one product model.
- Kept 12/13/14 instalments as post-calculation presentation. Assumptions, exclusions, official sources, and current/proposed traces remain progressively discoverable rather than visually primary.
- Used local React state, native forms/details, CSS Modules, and semantic HTML. No router, store, chart, animation, validation, or design-system dependency was added.
- Superseded the V1-only visualization decision with ADR-0008 while preserving ADR-0006 as historical rationale. No fiscal rule, fixture, calculation stage, public amount contract, deployment architecture, privacy boundary, or runtime dependency changed.

## Product and accessibility verification

- Desktop and mobile journeys cover first calculation, comparison activation, increase/decrease/equal outcomes, proposed-value validation, low-RAL benefit language, explanation evidence, deliberate focus, reduced motion, and 320 CSS-pixel reflow.
- The main comparison reads as gross change → annual/monthly net change; current/proposed absolute outcomes are reference context. The retained share is explicitly not labeled as a marginal tax rate.
- Native component disclosures connect the visible amount or delta directly to plain-language meaning and optional formula/Rule/source evidence using the canonical component ID.
- Automated axe found two initial defects: low-contrast secondary text and invalid definition-list grouping. Both were corrected at their semantic/token owners; the complete 14-journey desktop/mobile suite then passed with zero covered axe violations.
- Targeted browser QA covered the initial, single, comparison, low-benefit, narrow, focus, and long-evidence states. No horizontal overflow or third-party runtime request was observed.

## Complexity audit

| Measure | Released V1 | Compensation Translator | Change |
| --- | ---: | ---: | ---: |
| Authored CSS files | 8 | 7 | -1 |
| Authored CSS lines | 1,576 | 1,506 | -70 |
| Production CSS bytes | 24,363 | 23,560 | -803 |
| Production JavaScript bytes | 299,880 | 305,502 | +5,622 |
| Deployable assets | 6 | 6 | 0 |
| Runtime dependencies | 3 | 3 | 0 |

The largest stylesheet is `CompensationExperience.module.css` at 447 lines. Ledger-only styles live with `ComponentLedger` rather than creating one giant replacement sheet. The small JavaScript increase pays for the tested comparison contract and interaction; CSS, files, and specialized visualization code decrease.

Added product modules: the compensation comparison contract/tests, `CompensationExperience`, and `ComponentLedger`. Removed V1 modules: `ResultSummary`; `GrossToNetSection`; `WaterfallChart`; `BreakdownList`; `ComponentExplanation`; and the waterfall presentation adapter/test, together with their obsolete CSS.

## Validation

- Reproducible `npm ci`: passed after stopping the Windows process that held Vite's native build binding; 243 packages installed, zero audit findings.
- Strict TypeScript, ESLint with zero warnings, and repository Prettier check: passed.
- Vitest: 125/125 passed across 10 files, including five focused comparison-contract tests.
- Exhaustive fiscal gate: passed all 110,001 supported whole-euro RAL values in 3.72 seconds of test execution.
- Playwright/axe: 14/14 journeys passed across Chromium desktop and mobile WebKit.
- Production build and artifact inspection: passed; six static deployable files, 305,502-byte JavaScript and 23,560-byte CSS bundles, zero source maps, Functions, or redirects.
- Production dependency audit: zero vulnerabilities.
- Release artifact, relative Markdown-link, and Git whitespace validation: passed. GitHub CI, Cloudflare Pages, production header/privacy, and public browser checks are pending the remote release gate.

## External capabilities and side effects

Codex local filesystem/shell tools, Playwright browsers, the in-app browser, npm registry access for reproducible installation/audit, GitHub, and the existing Cloudflare Pages Git integration are relevant to this release. So far, salary scenarios were exercised only in local browsers and were not transmitted. No runtime service, analytics, persistence, secret, fiscal API, or dependency was introduced.

## Remaining release gate

Finish canonical-link and release-artifact validation, commit the coherent replacement, push `main`, require GitHub quality and Cloudflare Pages checks to pass, verify the public artifact and security/privacy behavior, then persist the deployment result in this same record and `PROJECT_STATE.md`.

The first remote quality run passed clean install, type/lint/format, all 125 Vitest tests, both exhaustive executions, build, artifact inspection, and audit, but exposed a browser-platform assertion defect in two WebKit smoke journeys: current Linux WebKit groups four-digit Italian currency while the local engines may omit that separator. The application values were correct. The E2E assertions now accept only those two valid Italian grouping forms while preserving exact sign, cents, and currency; no product or fiscal calculation changed.
