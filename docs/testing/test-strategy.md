# Test Strategy

This is the canonical testing policy. M1 defines evidence-backed fixtures; M2 and later milestones implement them.

## Layers

- Domain unit tests cover every rule, bracket, threshold, interaction, and documented rounding step.
- Boundary tests use EUR 1 below, at, and above each whole-euro input threshold, with more precise units where the applicable tax base requires them.
- Invariant/property tests cover determinism, finite non-negative components, reconciliation of totals, serialization, monotonic expectations only where legally valid, and absence of `Decimal` at public boundaries.
- Integration tests prove that the UI consumes the single domain result rather than recalculating values.
- Component tests cover validation, progressive disclosure, keyboard operation, accessible names, and semantic fallback content.
- Playwright smoke tests cover the primary journey and representative viewport/interaction states.

## Fiscal evidence gate

No executable expectation may be justified only by model memory or an external calculator. Each fiscal fixture must reference Rule IDs, which in turn reference admissible Source IDs. Independent reviewer findings and human approval precede production use.

## M1 output

M1 must propose deterministic fixtures for every material threshold and representative full-engine scenarios spanning low income, relief and deduction transitions, national brackets, contribution transitions, local exemptions, middle income, and the upper supported range. M1 does not implement tests.

## Quality workflow once code exists

One GitHub Actions workflow will run formatting, linting, strict type checks, unit/component tests, production build, and proportionate browser smoke tests. Dependency audit and bundle/runtime-network inspection remain deliberate checks, not vanity-score gates.
