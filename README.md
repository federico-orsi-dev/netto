# Netto

> Inserisci la tua RAL e scopri quanto ti rimane — e dove va il resto.

Netto is a transparent Italian gross-to-net salary estimator built as a production-minded product prototype. It gives an immediate annual and monthly answer, then lets the user inspect every modeled contribution, tax, relief, assumption, and authoritative source.

**Live demo:** awaiting the one-time GitHub and Cloudflare Pages Git-integration step. The reviewed release artifact is reproducible locally from `main`.

## The supported estimate

| Contract | V1 boundary |
| --- | --- |
| Fiscal year | 2026 |
| Employee profile | Approved private-sector industrial/CIGO/CIGS profile |
| Residence | Milan, Lombardy |
| Employment | Ordinary, permanent, full fiscal year |
| RAL | Whole euros from €10,000 through €120,000 |
| Fidelity | Annual estimator; not payroll, filing, or CCNL-compliance software |

The interface is in Italian. Code and engineering documentation are in English.

## Why the result is inspectable

- One pure, year-bound `calculateSalary2026` domain facade owns every fiscal value.
- The UI, waterfall, explanations, accessibility fallback, and technical trace all consume the same canonical amount registry.
- `decimal.js` is contained behind a domain-owned adapter; public money is serialized as safe integer euro cents.
- The engine implements 15 human-approved and independently reviewed fiscal rules. Nine unsupported rules remain explicit exclusions rather than silent zeroes.
- Every applied rule links to stable Rule IDs and a source register grounded in official institutions and legislation.
- The complete 110,001-value whole-euro input range is exercised by an exhaustive deterministic gate.

## Product experience

- Annual net, average monthly net, and average amount across 12/13/14 contractual instalments
- Effective modeled burden or, at low RAL, a truthfully labeled modeled net benefit
- Direct SVG gross-to-net waterfall with a semantic HTML counterpart
- Shared “explain this number” interactions across chart, breakdown, sources, and trace
- Progressive disclosure for assumptions, exclusions, methodology, and technical calculation evidence
- Keyboard-first interactions, visible focus, narrow-screen semantic reflow, reduced-motion support, and automated axe coverage

## Architecture

Netto is a single static React + strict TypeScript + Vite application. The fiscal engine is React-independent and performs no network, browser, storage, or presentation work. There is no backend, database, router, global state library, analytics, remote fiscal API, or salary persistence.

Runtime dependencies are intentionally limited to React, React DOM, and `decimal.js`.

Read the [architecture](docs/architecture/architecture.md), [implementation plan](docs/architecture/implementation-plan.md), and [Cloudflare Pages decision](docs/architecture/decisions/ADR-0007-cloudflare-pages-static-deployment.md) for the rationale and rejected alternatives.

## Correctness and evidence

Fiscal truth lives in the [2026 Fiscal Rule Catalog](docs/domain/fiscal-rules-2026.md); provenance lives in the [2026 Source Register](docs/domain/source-register-2026.md). Sources prioritize INPS, Agenzia delle Entrate, official legislation, Regione Lombardia, Comune di Milano, and MEF.

The test architecture covers rule formulas, statutory boundaries, independently established fixtures, full-pipeline golden results, monetary reconciliation, result/trace identity, UI behavior, accessibility, and the full supported domain. See the [test strategy](docs/testing/test-strategy.md).

Current release baseline:

- 118 Vitest tests
- 10 Playwright journeys across desktop Chromium and mobile WebKit
- zero axe violations in covered states
- all 110,001 supported whole-euro RAL values validated
- zero known production dependency vulnerabilities

## Privacy and release security

Salary input never leaves the browser. Netto has no telemetry, persistence, third-party scripts, remote fonts, or runtime calculation request.

Cloudflare Pages serves repository-owned security headers including a first-party-only Content Security Policy, clickjacking protection, MIME sniffing protection, referrer policy, and a restrictive Permissions Policy. Production assets are hashed and immutable; source maps are not shipped.

## Local development

Requirements: Node.js `22.23.2` and npm `10.9.8` (declared by the repository).

```bash
npm ci
npm run dev
```

High-value checks:

```bash
npm run typecheck
npm run lint
npm run format:check
npm test
npm run test:exhaustive
npx playwright install chromium webkit
npm run test:e2e
npm run build
npm run release:check
npm audit --omit=dev
```

`npm run test:e2e` builds and exercises the production Vite artifact through `vite preview`.

## Continuous integration

One GitHub Actions workflow runs a clean install, strict types, lint, formatting, Vitest, the explicit exhaustive gate, production build/artifact inspection, production dependency audit, and Playwright/axe smoke suite. It uses the repository-owned Node version and read-only repository permissions.

Dependency-update automation is intentionally not enabled before a remote ownership and maintenance policy exists; pinned dependencies, the lockfile, CI, and the production audit remain the release controls.

## Cloudflare Pages configuration

The approved deployment is Git-integrated Cloudflare Pages:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Repository root |
| Preview deployments | Enabled for non-production branches / pull requests |
| Runtime variables or secrets | None |
| Pages Functions / Worker | None |

The root `.node-version` selects the build Node release. `public/_headers` is copied into `dist`; no `_redirects` file is needed because V1 has no history-based client routes. The default `pages.dev` domain is sufficient for the first release.

## AI-assisted engineering

Codex and Claude Code were used as bounded engineering collaborators. Repository-owned instructions, task contracts, independent review roles, human approval gates, and concise durable run records make the work inspectable without publishing conversational transcripts. See the [AI engineering workflow](docs/ai-engineering/workflow.md) and [run records](docs/ai-engineering/runs/).

## Important limitations

Netto is intentionally bounded to the documented V1 profile. It does not model dependants, other income, personal deductions, special tax regimes, bonuses/benefits, TFR, pension choices, alternative employers, regions or municipalities, other fiscal years, or exact individual thirteenth/fourteenth-month payslips. A future €200,000 range would require targeted domain revalidation; it is not a UI-only change.

See the [Product Specification](docs/product/product-spec.md) for the full assumption and exclusion contract, or start from [PROJECT_STATE.md](PROJECT_STATE.md) for the current operational snapshot.
