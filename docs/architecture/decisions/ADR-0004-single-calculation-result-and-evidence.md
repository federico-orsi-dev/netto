---
id: ADR-0004
status: accepted
date: 2026-08-22
approved_by: human
approved_at: 2026-08-22T16:43:01+02:00
---

# ADR-0004 — Calculation result and evidence as the sole UI numeric source

## Context

Annual, monthly, instalment, textual, visual, and explanatory representations can drift if they independently reconstruct fiscal values.

## Decision

One domain calculation produces a serializable result and structured evidence. Every UI representation consumes that output. The UI may format or divide an approved annual net for presentation contracts, but it may not independently derive fiscal amounts.

## Rationale

One numeric source enables exact reconciliation, meaningful tests, and source-linked explanations.

## Alternatives

- UI-specific calculations
- Separate chart and trace models
- Developer-only debug logs

## Trade-offs and reconsideration

The domain output is richer than a minimal calculator response. Reconsider its shape when implementation evidence shows fields are unused or presentation-only.
