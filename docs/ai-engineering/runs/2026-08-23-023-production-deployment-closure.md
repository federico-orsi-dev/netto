---
run_id: RUN-2026-08-23-023
date: 2026-08-23
tool: codex
role: principal-release-engineer
task: production-deployment-closure
status: completed
owner: codex
reviewer: human
related_rules: []
related_adrs:
  - ADR-0001
  - ADR-0007
commit: null
---

# Production deployment closure

## Objective and boundary

Verify the public Cloudflare Pages deployment of the reviewed M5 application, correct only stale release-state documentation, push one documentation-only closure commit to `main`, and bind formal V1 release status to the successful GitHub and Cloudflare checks on that commit. Product behavior, fiscal logic, supported scope, dependencies, UI, and deployment architecture remain unchanged.

The exact SHA/tree of the closure commit cannot be embedded in its own contents. Git supplies them after commit creation; the final handoff reports both, and the public GitHub/Cloudflare checks attached to that commit provide the durable deployment association.

## Baseline

- Reviewed M5 application commit: `6554cb237f30ad65982c89c6daaef93172882f47`.
- M5 tree: `72af7dc249f63e556d41d0550e48f7f6e1fe63f4`.
- Production/default branch: `main`.
- Repository: [federico-orsi-dev/netto](https://github.com/federico-orsi-dev/netto), public.
- Production URL: [https://netto-c2o.pages.dev/](https://netto-c2o.pages.dev/).
- Local and `origin/main` both pointed to the M5 baseline before closure; the worktree was clean.

## GitHub and Cloudflare state

The public GitHub API confirmed `main` as the default branch and the Quality workflow completed successfully for the M5 SHA. Its run is [32613015898](https://github.com/federico-orsi-dev/netto/actions/runs/32613015898).

Cloudflare Pages uses Git integration with project name `netto`, repository root, production branch `main`, build command `npm run build`, output directory `dist`, preview deployments for non-production work, and no runtime variables, Pages Functions, or Workers. The initial Cloudflare check completed successfully for the M5 SHA and identifies deployment `a74dc920-af01-45e2-b7c1-ae6fa25965ea`.

Observed build evidence: Node.js `22.23.2`, npm `10.9.8`, clean dependency installation, zero dependency vulnerabilities, Vite `8.2.2`, 50 transformed modules, successful production build, successful `_headers` parsing, static asset upload, and no Wrangler configuration or `/functions` directory.

## Production verification before closure

### Availability and identity

- HTTPS root: `200 OK`, HTML content type, 973-byte production document.
- Hashed CSS and JavaScript: `200 OK`, correct content types, immutable one-year cache policy.
- Production HTML SHA-256 matched local `dist/index.html` exactly.
- Production CSS and JavaScript SHA-256 hashes matched the local reviewed M5 assets exactly.
- Deployed asset names and bundle sizes remained HTML `0.97 kB / 0.48 kB` gzip, CSS `24.27 kB / 5.35 kB` gzip, and JavaScript `299.85 kB / 93.16 kB` gzip.

### Security headers

The live root applied the repository-owned policy, not merely source configuration:

- first-party-only Content Security Policy, including `base-uri 'none'`, `connect-src 'self'`, `frame-ancestors 'none'`, no objects/media/workers, and HTTPS upgrade;
- restrictive Permissions Policy for browsing topics, camera, geolocation, microphone, payment, and USB;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `X-Content-Type-Options: nosniff`;
- `X-Frame-Options: DENY`.

Cloudflare infrastructure headers (`Server`, `CF-RAY`, `NEL`, `Report-To`, and `alt-svc`) were present as expected and are not application analytics or salary telemetry.

### Product smoke and privacy

Targeted production browser checks passed:

- intentional initial page and Italian document metadata;
- RAL EUR 10,000 with annual net EUR 10,492.64, truthful modeled-benefit state, and employer/State explanation;
- ordinary RAL EUR 35,000 with annual/monthly/instalment outputs;
- shared IRPEF explanation with plain-language content and optional Rule ID evidence;
- assumptions, nine exclusions, 34 authoritative-source records, profile `it-2026-v1`, and technical trace;
- RAL EUR 100,000 at mobile width and EUR 120,000 at desktop width without overflow;
- EUR 120,001 rejected with the supported-range alert and no result;
- no material browser console error or CSP violation.

The production HTML, CSS, and JavaScript are byte-identical to the M5 artifact whose automated complete calculator journey observed zero external request. Production load requires only first-party document, hashed assets, and favicon; salary calculation contains no analytics, persistence, remote fiscal request, third-party script, or salary transmission. Official-source navigation remains user-activated.

## Release quality inherited unchanged

- Vitest: 118/118.
- Playwright: 10/10 across desktop Chromium and mobile WebKit.
- Axe: zero violations in covered states.
- Exhaustive domain validation: all 110,001 whole-euro RAL values; minimum modeled net IRPEF EUR 126.73 at RAL EUR 10,000.
- Typecheck, lint, formatting, production build, release artifact validation: passed.
- Production dependency audit: zero vulnerabilities.
- Lighthouse diagnostics: 100 performance, 100 accessibility, 100 best practices, 100 SEO; TBT 0 ms and CLS 0.

These gates were not rerun for the documentation-only closure because README, PROJECT_STATE, and this run record cannot affect compiled application behavior. Documentation/link/secret/path/whitespace validation is rerun before commit.

## Closure change and activation condition

Closure modifies only:

- `README.md`: replaces the obsolete deployment placeholder with the live URL;
- `PROJECT_STATE.md`: records public repository, successful initial deployment, verified production behavior, and the final deployment condition;
- this RUN-023 record.

No domain, UI, fiscal, test, package, lockfile, build, CI, header, or deployment-architecture file changes. The commit is pushed normally to `origin/main` with no force operation. Git-integrated Pages then rebuilds the unchanged application artifact.

Formal release closure is valid only when both the GitHub Quality and Cloudflare Pages checks attached to the commit containing this record complete successfully and the public URL retains HTTP 200, expected security headers, and working application load. Those external checks durably identify the exact closure SHA after Git creates it.

## Intentional limitations and future scope

V1 remains limited to fiscal year 2026, the approved Milan/Lombardy employee/employer profile, whole-euro RAL EUR 10,000–120,000, and estimator-level annual precision. It has no accounts, persistence, analytics, alternate profiles, additional fiscal years, or payroll/filing/CCNL-compliance claim.

EUR 200,000 support remains deferred because contribution-ceiling and high-income behavior require targeted domain revalidation; it is not a V1 release defect.

## Final decision

Netto V1 is publicly usable, runs the unchanged reviewed M3 fiscal engine, preserves approved M4.1 accessibility and browser-local privacy, applies production security headers, remains reproducible from the public repository, and retains the complete M1–M5 audit trail. Production derives from the approved `main` lineage.

**M5 COMPLETE — NETTO V1 RELEASED**
