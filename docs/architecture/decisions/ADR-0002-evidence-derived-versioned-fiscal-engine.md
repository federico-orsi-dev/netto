---
id: ADR-0002
status: accepted
date: 2026-08-22
approved_by: human
approved_at: 2026-08-22T16:43:01+02:00
---

# ADR-0002 — Evidence-derived, versioned fiscal engine

## Context

Payroll rules are time-dependent and superficially plausible formulas can be wrong. Fiscal claims must not emerge from model memory or UI code.

## Decision

Human-readable verified research is canonical. Executable fiscal logic is derived from it into one typed `FiscalRuleset2026` and a pure React-independent engine. Stable rule and source IDs connect evidence, implementation, tests, and trace. No generic fiscal DSL is introduced.

## Rationale

The design provides versionability, auditability, and exact testing without building a rule platform before a second ruleset exists.

## Alternatives

- Formulas embedded in UI components
- Untyped JSON configuration
- Remote rules service
- Generic tax DSL or code generation

## Trade-offs and reconsideration

Research and code remain separate artifacts and require disciplined synchronization. Reconsider a DSL or generator only after multiple years or jurisdictions demonstrate repeated structure.
