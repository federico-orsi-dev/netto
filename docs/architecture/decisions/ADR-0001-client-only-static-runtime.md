---
id: ADR-0001
status: accepted
date: 2026-08-22
approved_by: human
approved_at: 2026-08-22T16:43:01+02:00
---

# ADR-0001 — Client-only static runtime

## Context

V1 calculates from public, versioned rules and needs no protected API, account, storage, or remote configuration. Salary input is financially sensitive.

## Decision

Deploy a fully static Vite application. All validation and calculation run locally. Do not introduce a backend, database, authentication, persistence, telemetry, or external calculation API.

## Rationale

This minimizes privacy, security, operational, and deployment surface while satisfying every approved requirement.

## Alternatives

- Backend calculation API
- Server-side rendering or full-stack framework
- Remotely delivered fiscal rules

## Trade-offs and reconsideration

Updating rules requires a new build and deployment. Reconsider only if an approved requirement needs protected secrets, central rule delivery, persistence, or server-side behavior.
