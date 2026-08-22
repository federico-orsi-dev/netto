---
id: ADR-0006
status: accepted
date: 2026-08-22
decision_authority: human-authorized M2 architecture mandate
recorded_by: codex
---

# ADR-0006 — Direct React SVG and semantic HTML waterfall

## Context

V1 needs one interactive gross-to-net visualization with contextual explanation, responsive transformation, keyboard access, non-color semantics, and exact reuse of canonical calculation components. It does not need general chart authoring or arbitrary datasets.

## Decision

Render the desktop visualization as purpose-built SVG directly in React. Derive geometry only from the result's ordered public breakdown components. Render an HTML ordered breakdown from the same component IDs for keyboard/screen-reader access and as the intentional mobile representation. The SVG may mirror pointer selection but is not the accessibility tree or a fiscal calculator.

## Rationale

Direct SVG provides sufficient visual control for a small deterministic waterfall without a charting dependency. Shared component IDs preserve one numeric source, while semantic HTML avoids fragile interactive-SVG accessibility.

## Alternatives considered

- HTML/CSS only: simplest, but materially weaker for the approved desktop waterfall.
- Lightweight scale/shape utility: useful only if geometry becomes harder than the current fixed sequence; not justified initially.
- General charting library: larger API, bundle, accessibility, and styling surface for one chart.

## Trade-offs and consequences

The team owns a small layout function and responsive QA. Geometry tests cover finite coordinates, order, and final baseline, not pixel snapshots. If implementation threatens correctness or accessibility, simplify the SVG while retaining the semantic list and explanation contract. Reconsider a utility only after measured geometry complexity, not preemptively.
