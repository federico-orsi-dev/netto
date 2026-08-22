---
id: ADR-0005
status: accepted
date: 2026-08-22
approved_by: human
approved_at: 2026-08-22T16:43:01+02:00
---

# ADR-0005 — Repository-owned multi-agent control and audit

## Context

Codex, Claude Code, and bounded subagents may work across sessions. Important state cannot depend on private conversation context, and agents must not expand their own authority.

## Decision

Use `AGENTS.md` as the shared operating contract, a thin importing `CLAUDE.md`, canonical repository documentation, protected approval boundaries, explicit owner/reviewer roles, and concise run records. Significant owners do not solely approve their work. Raw transcripts and hidden reasoning are not retained.

## Rationale

Repository-owned evidence makes work reproducible and reviewable while preserving human responsibility.

## Alternatives

- Conversation memory as project state
- Permanent agent organization
- Raw transcript logging
- Unrestricted agent autonomy

## Trade-offs and reconsideration

The process adds maintenance and review cost. Keep records proportional and remove unused agent artifacts. Reconsider only from measured workflow friction, never to bypass fiscal or human gates.
