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

M1 defines deterministic fixtures for every material threshold and representative full-engine scenario spanning low income, relief and deduction transitions, national brackets, contribution transitions, local exemptions, middle income, and the upper supported range. M1 does not implement tests.

Exact formula fixtures are tested before product normalization. Public aggregation fixtures apply the approved component-first money policy and must prove that each displayed aggregate equals the sum of its displayed components. Article 13 requires direct-income fixtures at EUR 49,997 / 49,998 / 49,999: the statutory exact deduction is EUR 0.191 / 0 / 0 and the normalized public component is EUR 0.19 / 0 / 0. Re-enumerate the whole supported RAL range with the approved assumption and policy and assert that the modeled net IRPEF minimum remains at least EUR 126.73. This invariant protects the bounded exclusion of `RULE-LOCAL-2026-001`; any failure must reopen that exclusion rather than invent the unresolved predicate.

## Quality workflow once code exists

One GitHub Actions workflow will run formatting, linting, strict type checks, unit/component tests, production build, and proportionate browser smoke tests. Dependency audit and bundle/runtime-network inspection remain deliberate checks, not vanity-score gates.
