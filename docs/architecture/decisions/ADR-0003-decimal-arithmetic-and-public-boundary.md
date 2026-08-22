---
id: ADR-0003
status: accepted
date: 2026-08-22
approved_by: human
approved_at: 2026-08-22T16:43:01+02:00
---

# ADR-0003 — Decimal arithmetic and library-independent boundaries

## Context

Fiscal percentages, progressive brackets, and statutory rounding require deterministic decimal behavior. Uncontrolled binary floating-point and ad hoc rounding are unacceptable.

## Decision

Use `decimal.js` only behind a domain-owned monetary adapter. Centralize precision and rounding there. Decimal instances never cross the public domain-result boundary; public monetary values are deterministic, serializable, and library-independent.

## Rationale

An established decimal implementation is safer and simpler than custom rational arithmetic while the adapter prevents vendor coupling from leaking across the architecture.

## Alternatives

- JavaScript `number`
- Integer cents throughout
- Custom BigInt rational representation
- Expose `Decimal` objects publicly

## Trade-offs and reconsideration

This adds one production dependency and demands explicit serialization. Reconsider only if verified formulas demonstrate that a simpler representation satisfies every rounding boundary without custom complexity.
