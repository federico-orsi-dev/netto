---
run_id: RUN-2026-08-23-024
date: 2026-08-23
tool: codex
role: product-presentation-engineer
task: post-v1-reviewer-presentation
status: completed
owner: codex
reviewer: human
related_rules: []
related_adrs: []
commit: null
---

# Post-V1 reviewer presentation

## Objective and boundary

Apply the low-risk presentation recommendations from an external hiring assessment without changing fiscal logic, the supported profile/range, architecture, dependencies, privacy, or deployed production state. A marginal-raise comparison was not implemented because comparisons and marginal simulators are explicit V1 non-goals and require a separately approved product goal.

Acceptance required a visual README summary, a three-minute evaluator path, one evidence-linked AI correction case study, three decisive assumptions in the methodology default view, an explained EUR 120,000 boundary, regression coverage, and no remote side effect.

## Changes

- Added one locally generated product-result screenshot and placed it beside the live demo at the top of the README.
- Added a three-minute review path through the normal result, inspectable IRPEF component, and low-RAL State-benefit state.
- Added a concise case study linking the separately preserved RUN-020 findings to the RUN-021 correction loop. The attachment's claimed invalid-verification incident was not repeated because it could not be substantiated in canonical repository records.
- Changed the methodology default view to the three assumptions most likely to affect applicability and closed the complete assumption disclosure by default. Exclusions, official sources, and the technical trace remain available and unchanged.
- Explained beside the RAL input that the maximum preserves the verified V1 envelope and that widening it requires contribution-boundary validation.
- Updated the Product Specification to own the revised disclosure behavior and added a focused component assertion.

## Verification

- Strict TypeScript: passed.
- ESLint with zero warnings: passed.
- Prettier repository check: passed.
- Vitest: 118/118 passed across 10 files.
- Playwright: 10/10 passed across Chromium desktop and mobile WebKit, including 320-pixel reflow and covered axe checks.
- Production build and artifact validation: passed; six expected static files, zero source maps, Functions, or redirects.
- README screenshot inspected at original resolution; Git whitespace check passed.

The exhaustive fiscal range test was not rerun because no domain, fiscal data, amount, range, or calculation contract changed. No dependency installation, network research, Git remote mutation, deployment, salary transmission, or other external side effect occurred.

## Handoff

The presentation improvements are complete in the local working tree. Production remains the previously released RUN-023 artifact until a separately authorized commit/push/deployment step occurs.

