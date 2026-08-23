---
id: ADR-0008
status: accepted
date: 2026-08-23
decision_authority: human-authorized post-V1 differentiation mandate
recorded_by: codex
supersedes: ADR-0006
---

# ADR-0008 — Compensation Translator presentation

## Context

The released V1 waterfall made one gross-to-net calculation inspectable, but the approved post-V1 product thesis centers on translating both a salary and one compensation change into disposable consequences. Keeping the waterfall beside a second comparison representation would duplicate concepts and lengthen the page.

## Decision

Replace the SVG waterfall and detached explanation surface with one semantic HTML/CSS compensation translation. Single mode presents `RAL → annual net → average monthly net`. Optional comparison mode presents the signed gross change, annual and monthly net changes, modeled retained share, materially changed canonical components, and verified rule-applicability changes.

The application comparison contract accepts two complete `SalaryCalculationResult` values produced under the same fiscal context. It may subtract canonical public values and compare applied Rule IDs, but it may not reproduce fiscal formulas. In-context native disclosures use the canonical component identity for explanation and evidence.

## Rationale

The new structure answers a real offer/raise question, makes the delta—not two calculators—the subject, and removes a specialized geometry layer. Semantic HTML remains truthful for increases, decreases, equal salaries, and low-RAL benefits while reducing responsive and accessibility risk. No charting, state, or visualization dependency is required.

## Alternatives considered

- Retain the V1 waterfall and append comparison: rejected because it creates competing representations and additive page complexity.
- Two complete result columns: rejected because absolute outcomes would dominate the decision-relevant delta.
- New SVG or chart-library comparison: rejected because geometry adds no necessary meaning and would expand bundle, testing, and accessibility surface.

## Trade-offs and consequences

The product gives up the V1 chart metaphor in favor of authored typography, signs, spatial transformation, and an interactive component ledger. Presentation is less chart-like but more direct. The comparison remains intentionally limited to one current and one proposed RAL; future ranges or profiles still require their own domain approval.
