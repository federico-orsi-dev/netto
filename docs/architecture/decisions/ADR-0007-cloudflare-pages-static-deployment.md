---
id: ADR-0007
status: accepted
date: 2026-08-22
decision_authority: human-authorized M2 architecture mandate
recorded_by: codex
supersedes_provider_reference: architecture baseline Vercel target
---

# ADR-0007 — Cloudflare Pages static deployment

## Context

ADR-0001 requires a fully static client-only Vite application. The M2 mandate requires the Cloudflare deployment shape to be resolved. V1 has no server code, API, secrets, persistence, runtime configuration, or client-side routes.

## Decision

Use Cloudflare Pages with Git integration. Configure `npm run build` and the `dist` output directory. Use branch/PR preview deployments and the human-approved production branch for production. Keep static security headers in `public/_headers`. Do not add a Worker, Pages Function, Cloudflare Vite plugin, Wrangler dependency, or repository deployment script in the baseline.

## Rationale

Pages directly hosts the existing static artifact, supplies Git-based preview deployments, and supports repository-owned response headers. Workers Static Assets would add configuration and a compute-shaped deployment surface without runtime code to execute.

## Alternatives considered

- Workers Static Assets: capable, but its Worker/Wrangler configuration solves no V1 requirement.
- Pages Direct Upload: workable, but duplicates CI/upload orchestration and gives up the simplest PR preview flow.
- Vercel: technically valid but superseded by the explicit Cloudflare delivery requirement.

## Trade-offs and consequences

Initial Cloudflare project connection is a human-controlled external action. Git-integrated Pages projects have platform workflow constraints, so the production branch and automatic deployment policy must be reviewed before connection. V1 has no SPA fallback rule because it has no router; add routing configuration only with an approved route requirement.

## Current official references

- [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Cloudflare Pages preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Cloudflare Pages custom headers](https://developers.cloudflare.com/pages/how-to/add-custom-http-headers/)
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
