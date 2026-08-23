---
run_id: RUN-2026-08-23-022
date: 2026-08-23
tool: codex
role: principal-release-engineer
task: m5-release-hardening-cloudflare-readiness
status: stopped
owner: codex
reviewer: human
related_rules: []
related_adrs:
  - ADR-0001
  - ADR-0007
commit: null
---

# M5 release hardening and Cloudflare readiness

## Objective and acceptance boundary

Turn the approved M4.1 product into a reproducible, secure, auditable Cloudflare Pages release without changing the product, fiscal engine, supported range/profile, privacy model, or static architecture. Local/repository release work is complete. Production deployment is not: the environment has neither a Git remote nor authenticated GitHub/Cloudflare access, and ADR-0007 requires Git integration rather than Direct Upload.

Baseline inspection confirmed commit `afebf578ffee0fe7093ee9440bb6d3e0e7b21e28`, tree `6e9d6d7f71d1465ccfb41c5156832e5f310b1956`, a clean primary worktree, M4.1 closure, RUN-021, the unchanged exhaustive domain gate, and the frozen 15 verified / 9 excluded fiscal lifecycle.

## Release branch and repository state

No `main` branch existed. The production branch was created directly at the approved M4.1 commit and checked out as `main`; the previous `m1/verified-fiscal-foundation` branch and all independent-review branches remain intact. No commit was squashed, reset, rebased, or discarded.

`git remote -v` returned no remote. GitHub CLI `2.96.0` is installed but not authenticated. No repository URL, visibility, Cloudflare account, Pages project, project name, deployment ID, preview URL, or production URL could therefore be verified or created. Wrangler was not installed because the approved static Git-integration architecture requires neither a repository dependency nor Direct Upload.

## Changes made

- Declared Node.js `22.23.2` in `.node-version` and npm `10.9.8` in package metadata. Node 22 is LTS and satisfies Vite 8's Node `22.12+` requirement; Cloudflare Pages recognizes `.node-version`.
- Added one GitHub Actions quality workflow with read-only repository permissions, dependency caching, a clean install, strict types, lint, formatting, Vitest, the explicit exhaustive gate, production build, artifact validation, production audit, and Chromium/WebKit Playwright/axe smoke tests.
- Changed Playwright's managed web server from the Vite development server to a production build followed by `vite preview`; CI uses one worker for reliability.
- Added `public/_headers` with a first-party-only CSP, `frame-ancestors 'none'`, `X-Frame-Options: DENY` for legacy coverage, MIME sniffing protection, restrictive permissions, referrer policy, and immutable caching for hashed assets.
- Deliberately omitted HSTS because it belongs to the final Cloudflare hostname/domain policy; omitted `_redirects` and a custom 404 because V1 has no history routes; omitted Workers, Pages Functions, Wrangler configuration, runtime secrets, and environment variables.
- Added a small local SVG favicon, intentional document/Open Graph metadata, and a valid `robots.txt`. A canonical URL and social image remain deferred until a real production origin exists.
- Added a dependency-free artifact validator that proves required assets and metadata, rejects source maps/backend/redirect artifacts and accidental local paths, checks local asset references and security-header presence, and reports bundle sizes.
- Reworked the README around product trust, bounded profile, architecture, fiscal provenance, testing, accessibility, privacy, AI-assisted workflow, local commands, and exact Pages configuration. The live-demo field states the external deployment boundary rather than inventing a URL.
- Removed five machine-specific absolute worktree paths from historical run prose while preserving every review identity, commit, result, and audit conclusion. No Git history was rewritten.

## Security and privacy policy

The release artifact contains no application secret, environment file, source map, local endpoint, machine path, Pages Function, or Worker. Credential-pattern scanning of tracked text found no key/token/private-key material. Runtime production dependencies remain React, React DOM, and `decimal.js`; `npm audit --omit=dev` reports zero known vulnerabilities.

Playwright's complete calculator journey observes all requests and reports no request outside `127.0.0.1`. Lighthouse observed four load requests—document, one hashed JavaScript bundle, one hashed stylesheet, and the local favicon—with zero third-party requests. The application retains no analytics, persistence, remote fiscal call, external font, third-party script, or salary transmission. Thirty-seven official source links are inert until user activation and consistently use a new browsing context with `noreferrer`.

## Build and artifact

The exact Node.js `22.23.2` / npm `10.9.8` pair completed `npm ci`, tests, and the production build. The first clean-install attempt encountered a Windows file lock held by an already-running project Vite process; after stopping only those exact project processes, the same command passed. This was an environment residue, not a repository defect.

`dist` contains exactly:

- `index.html`;
- one hashed JavaScript asset;
- one hashed CSS asset;
- `favicon.svg`;
- `robots.txt`;
- `_headers`.

There are zero source maps, redirects, Functions, or Worker files. Vite reports JavaScript `299.85 kB` raw / `93.16 kB` gzip and CSS `24.27 kB` raw / `5.35 kB` gzip, unchanged from M4.1. No test or research payload is bundled.

## Validation performed

- repository-owned Node/npm versions: `22.23.2` / `10.9.8`;
- reproducible `npm ci`: 243 packages, zero audit findings;
- strict TypeScript, ESLint with zero warnings, and Prettier repository check: passed;
- Vitest: 118/118 tests across 10 files;
- explicit exhaustive test: 110,001 whole-euro RAL inputs, minimum modeled public net IRPEF EUR 126.73 at RAL EUR 10,000, approximately 3.56 seconds test time / 3.94 seconds command wall time in the final run;
- production build and artifact validator: passed;
- Playwright: 10/10 production-preview journeys across desktop Chromium and mobile WebKit, including axe, keyboard behavior, 320 CSS-pixel reflow, low-RAL benefit semantics, and zero external requests;
- manual browser QA: initial state, EUR 10,000, EUR 35,000, EUR 55,240, EUR 100,000, EUR 120,000, empty/below-range/above-range/decimal/malformed input, explanations, sources, and technical trace at 1440, 1280, 768, 390, and 320 CSS-pixel widths; no horizontal page overflow or console error;
- official source-link inspection: 37 external links, all user-activated, `_blank`, and `noreferrer`;
- Lighthouse against the production artifact: performance 100, accessibility 100, best practices 100, SEO 100; FCP about 1.35 s, LCP about 1.50 s, TBT 0 ms, CLS 0, and four first-party requests in the diagnostic environment;
- production dependency tree and audit: only the three approved runtime dependencies, zero known vulnerabilities;
- release artifact, credential, absolute-path, relative Markdown-link, fiscal lifecycle, documentation metadata, and Git whitespace checks: passed.

Lighthouse scores are diagnostic observations, not release targets. The Chrome DevTools performance MCP was unavailable, so the audit used an ephemeral Lighthouse CLI and the installed Playwright Chromium without adding a dependency. Its first Windows cleanup emitted a temporary-directory EPERM after successfully writing the report; the clean second run and report both completed.

## Cloudflare Pages configuration and external boundary

Current Cloudflare documentation confirms repository-root `.node-version`, `public/_headers`, Git-connected production/preview deployments, and these project settings:

| Setting | Required value |
| --- | --- |
| Git provider/repository | Human-selected correct Netto GitHub repository |
| Project name | Human-selected; `netto` if available, never assumed |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output | `dist` |
| Root directory | repository root |
| Preview branches | all non-production branches / pull requests |
| Environment variables/secrets | none |
| Functions/Worker | none |

Official references: [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/), [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), [build image and version files](https://developers.cloudflare.com/pages/configuration/build-image/), [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/), and [custom headers](https://developers.cloudflare.com/pages/configuration/headers/).

Minimum human actions are: create/select the intended repository; add it as `origin`; authenticate and push `main`; confirm the GitHub quality workflow passes; connect that repository in Cloudflare Pages with the table above; allow the reviewed `main` commit to deploy; then perform the required HTTPS/header/network/accessibility smoke check and replace the README's honest pending-demo text with the real URL. Do not use Direct Upload as a workaround.

## Automation decisions

Dependabot configuration was not added before a remote ownership/maintenance policy exists. Exact dependency pins, lockfile, CI, and production audit provide the current release controls without creating unattended PR noise. Re-evaluate npm and GitHub Actions update cadence after repository ownership is established.

Repository screenshots were not added before a stable deployed origin exists. This avoids committing stale release media; add at most one desktop and one mobile capture after the reviewed Cloudflare artifact is available.

## Remaining limitations and release decision

Intentional V1 boundaries remain unchanged: Italy/Milan/Lombardy 2026, the approved employee/employer profile, whole-euro RAL EUR 10,000–120,000, estimator rather than payroll/filing/CCNL precision, and no accounts, storage, analytics, sharing, alternative profiles, or fiscal years. EUR 200,000 remains future work requiring targeted domain revalidation.

There is no local technical, product, fiscal, security, accessibility, privacy, or performance blocker. Actual Cloudflare header application, HTTPS smoke behavior, deployment identity, preview/production URL, deployed commit, and live-demo link remain unverifiable until the human-controlled GitHub/Cloudflare connection exists.

**M5 RELEASE-READY — AWAITING EXTERNAL DEPLOYMENT AUTHORIZATION**
