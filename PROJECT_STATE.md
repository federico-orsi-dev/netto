# Project State

- **Phase:** Netto final submission artifact complete
- **Milestone status:** final product and repository redesign validated locally and remotely, deployed through Cloudflare Pages, and accepted for Jet HR submission
- **Architecture:** approved through M2; Phase 0 closed
- **Fiscal foundation:** 15 verified, 9 excluded, 0 candidate, and 0 blocked rules; bounded assumptions and product money policy approved
- **Current task:** none
- **Next permitted milestone:** none; submit the current artifact rather than extend it
- **Pending human gate:** none
- **Release:** the final submission artifact is live at [netto-c2o.pages.dev](https://netto-c2o.pages.dev/); code-bearing commit `53df1de25bbf43905186ada48a1dced95ef0531c` passed GitHub Quality and Cloudflare Pages with byte-identical JavaScript and CSS
- **Last meaningful run:** `RUN-2026-08-24-029` — hero headline typography correction
- **Last updated:** 2026-08-24

## M1 closure

Checkpoint A is commit `661e844a4ea8b8d58f4577dd8e0b8b0e6e8a074d`, tree `58106004374b1de19c60fc3d12ae51e373d40a95`. Independent review commit `632dd0aa76a3183979992ce29c937fb2c35efb87` was imported as a review-record-only cherry-pick. Its 18 `VERIFIED`, 6 `BLOCKED`, and 0 `REJECTED` labels are review dispositions, not canonical lifecycle authority.

Reconciliation found a one-to-one mapping across all 24 Rule IDs. The human-approved RAL/contributable-remuneration assumption and component-first money policy resolved the amount-producing policy handoffs without converting assumptions or engineering policy into fiscal law. Targeted review commit `e1526115ca268a12cf6758d5cf07c71e59979a83` was validated as a one-record-only child of checkpoint `29c4232679ff51c3279c8ae5e653fb8037d1052b` and imported into the primary branch as `1555a6faa131f75ec6054be32d0b2b3b2411a732`.

The targeted reviewer reported no blocker, major, or minor finding and returned `READY FOR HUMAN FISCAL APPROVAL`. The human owner then approved the bounded exclusion of `RULE-LOCAL-2026-001` and individually approved every eligible reconciled candidate rule. The final lifecycle is 15 `verified`, 9 `excluded`, 0 `candidate`, and 0 `blocked`.

`RULE-LOCAL-2026-001` is excluded, not verified: the exact income-year-2026 IRPEF-due/de-minimis predicate remains unresolved, is never encoded as zero, and is output-unreachable only inside the current V1 envelope. Exhaustive whole-euro enumeration over RAL EUR 10,000–120,000 produced minimum modeled public net IRPEF of EUR 126.73. Reopen on a lower minimum RAL, changed tax/deduction mechanics or fiscal year, a profile capable of entering the unresolved region, or materially different authoritative evidence.

The minimum safe V1 model remains one RAL input. It retains separate domain concepts for annual gross salary and annual contributable remuneration, deriving the latter from the former under the human-approved V1 estimator assumption. This equality is product scope, not verified fiscal law. V1 remains a compensation estimator, not a CCNL/minimum-remuneration or payslip-compliance validator.

The fixed profile remains: article 10 CIGO industrial employer, more than 15 employees, CIGS, verified general FPLD treatment, and no mandatory sector solidarity/supplemental fund carrying an employee contribution. M1 approval is bounded to this documented profile and does not make Netto payroll software, a certified tax calculator, or universally accurate.

## M2 closure

M2 converts the frozen product, fiscal, architecture, testing, delivery, and AI-engineering evidence into one implementation contract. Major decisions are:

- one Vite/React application with a pure year-bound `calculateSalary2026` domain facade;
- `decimal.js` behind one adapter and public safe-integer euro cents;
- explicit formulas and typed 2026 data rather than a generic rule engine;
- one canonical amount registry referenced by summary, breakdown, waterfall, explanation, trace, accessibility, and tests;
- local React state, custom one-field validation, no router, persistence, URL state, or global store;
- direct React SVG plus semantic HTML waterfall;
- Cloudflare Pages Git integration, no Worker/Pages Function/backend;
- three coding milestones: M3 domain engine, M4 product experience, M5 release hardening.

No implementation code, package manifest, dependency installation, application test, remote mutation, Cloudflare project, or deployment was created in M2. There are no blocking implementation decisions; scaffold-time version selection and visual tokens are explicitly deferrable.

## M3 implementation closure

M3 implements the strict React/TypeScript/Vite scaffold, the domain-owned `decimal.js` adapter, typed 2026 fiscal context and source metadata, explicit contribution/national/local stages, year-bound `calculateSalary2026` facade, canonical public-cent amount registry, semantic components, deterministic trace, typed errors, exclusions, fixtures, and invariants. The React shell is intentionally only a placeholder; M4 owns the product interface.

All 15 verified Rule IDs are represented in executable metadata and tested responsibilities. All 9 excluded Rule IDs remain limitation metadata and cannot enter evaluated/applied rule lists or calculation components. No fiscal lifecycle state or canonical source conclusion changed.

Implementation exposed one M2 contract inconsistency: verified low-income cash benefits can exceed outflows, making derived modeled burden negative and annual net greater than RAL. The implementation contract now permits only `modeledBurden` to be signed; every fiscal component/base remains non-negative. The RAL EUR 10,000 golden fixture proves the case and preserves the approved annual-net composition.

Validation passes strict typecheck, ESLint import boundaries, Prettier check, 90 rule/boundary/golden/invariant tests, the separate 110,001-value exhaustive range test, and the Vite production build. The exhaustive gate preserves minimum modeled public net IRPEF EUR 126.73 at RAL EUR 10,000. Independent review remains required before M4.

Independent M3 review then passed with 15/15 verified rules and 9/9 exclusions correctly represented, all 110,001 supported inputs validated, and no blocker or major finding. Its one minor trace-maintainability finding is resolved in M4 by sourcing explanation-facing rates and thresholds from the typed `RULESET_2026`, with a focused configuration-to-trace consistency test. Fiscal semantics and lifecycle state remain unchanged.

## M4 implementation closure

M4 replaces the placeholder with the complete Italian V1 journey: purposeful initial state, localized RAL validation, annual/monthly/contractual-instalment result hierarchy, truthful modeled burden or net-benefit context, direct React SVG waterfall, semantic interactive breakdown, contextual explanations, assumptions, exclusions, authoritative sources, and deterministic calculation trace.

Every public financial value resolves from the canonical M3 result and amount registry. Presentation adapters select, order, label, format, and calculate SVG geometry only; frontend modules contain no fiscal formula, tax rate, rounding, or alternative aggregate. React local state owns input and presentation selection only. The application remains static, client-only, without analytics, persistence, backend, remote fiscal API, or salary transmission.

The visual foundation uses a native system UI font stack with tabular numerals, product-owned CSS custom properties/modules, warm neutral surfaces, restrained financial semantics, visible focus, and reduced-motion support. Desktop renders the explanatory SVG and adjacent detail; mobile intentionally replaces the SVG with the same canonical semantic list followed by the selected explanation.

Validation passes the unchanged M3 domain and exhaustive gates plus component/product tests, desktop Chromium and mobile WebKit smoke journeys, automated axe checks, manual keyboard/semantic review, breakpoint visual QA, production build inspection, and production dependency audit. M4 is not deployed and is not release approved; an independent product/accessibility review is the next gate.

## M4.1 review reconciliation closure

Independent M4 review record `RUN-2026-08-23-020` was committed separately as `fee28f62bd7143f0e3ae0734d96d82afa4b5aeaa` and imported into the primary history as `163d1a30be00c1cf1f2fee39043ed163b8c6f982` before implementation changed. The review found 0 blocker, 5 major, 3 minor, and 3 note items while confirming numeric ownership.

M4.1 closes all five major and all three minor findings: successful submission reveals the primary result with deliberate focus; low-RAL results distinguish employer-paid RAL from canonical State fiscal cash benefits; component explanations now progress from amount to plain-language institutional meaning to optional formula/rule/source evidence; narrow-screen selection reveals the shared explanation; 320 CSS-pixel/high-zoom reflow is clean; the trace is explicitly technical and optional; copy is plainer; and the tablet waterfall has no incidental horizontal overflow. Source/exclusion semantics required no change, the visual identity remains intentionally restrained, and a possible EUR 200,000 range remains deferred behind targeted domain revalidation.

Validation preserves 118 Vitest tests, all 110,001 supported whole-euro RAL inputs, 10 Playwright journeys across Chromium desktop and WebKit mobile, zero axe violations in covered states, keyboard and no-external-request behavior, strict type/lint/format checks, reproducible installation, a production build, and zero production dependency vulnerabilities. Runtime dependencies and M3 fiscal behavior are unchanged. M4.1 is ready for M5 release hardening but is not deployed or release approved.

## M5 release-hardening closure

The approved lineage now has a conventional local `main` branch without squashing or rewriting any M1–M4.1 provenance. Node.js `22.23.2` and npm `10.9.8` are repository-owned release intent. One read-only GitHub Actions workflow reproduces strict types, lint, formatting, Vitest, the explicit exhaustive gate, production build/artifact validation, production dependency audit, and Playwright/axe smoke coverage.

The Vite artifact remains static and client-only. Repository-owned Cloudflare Pages headers apply a first-party-only CSP, restrictive Permissions Policy, referrer and MIME protections, clickjacking protection, and immutable caching for hashed assets. No HSTS, redirect, custom 404, Worker, Function, runtime environment variable, telemetry, persistence, or third-party runtime request was added. Release validation confirms six expected deployable files, no source maps, all 110,001 supported inputs, 118 Vitest tests, 10 production-preview Playwright journeys, zero covered axe violations, zero production vulnerabilities, zero third-party load requests, and unchanged JavaScript/CSS bundle sizes. Lighthouse diagnostics against the production artifact returned 100 in performance, accessibility, best practices, and SEO with zero layout shift and zero blocking time.

At local M5 closure no Git remote or authorized Cloudflare project was available. That external boundary was subsequently crossed by connecting the public `federico-orsi-dev/netto` repository to Cloudflare Pages through the approved Git integration; Direct Upload was not used.

## Production deployment closure

The initial production deployment cloned reviewed M5 application commit `6554cb237f30ad65982c89c6daaef93172882f47`, used Node.js `22.23.2` and npm `10.9.8`, passed the Cloudflare build, parsed `_headers`, and published the static Vite artifact at [https://netto-c2o.pages.dev/](https://netto-c2o.pages.dev/). The public GitHub repository uses `main` as its default and production branch; the Quality workflow and Cloudflare Pages checks both completed successfully for that baseline.

Production verification returned HTTPS 200, loaded the expected hashed CSS and JavaScript, applied the repository CSP and companion security headers, and reproduced byte-for-byte the local M5 HTML/CSS/JavaScript. Targeted browser checks passed the initial state, RAL EUR 10,000, EUR 35,000, EUR 100,000, EUR 120,000, out-of-range validation, low-RAL benefit explanation, component evidence, assumptions, exclusions, official sources, and technical trace with no console error or layout overflow. Because the deployed bytes are identical to the locally reviewed artifact whose complete calculator journey observed zero external request, the browser-local salary/privacy invariant remains satisfied.

The documentation-only commit containing RUN-023 advances `main` without changing application code, fiscal logic, configuration, dependencies, or the built application artifact. Netto V1 is formally released only when the Cloudflare Pages check attached to that exact closure commit completes successfully; this makes the final Git/Pages association durable without embedding an impossible self-referential commit SHA inside the commit itself.

## Post-V1 Compensation Translator

The human-approved differentiation scope preserves the complete single-RAL estimator and adds exactly one optional current/proposed RAL comparison under the same verified context. An application-level comparison contract derives signed gross, annual-net, monthly-net, component, and Rule-ID applicability differences exclusively from two canonical `SalaryCalculationResult` values. It contains no fiscal formula and introduces no new runtime dependency.

The product presentation is replacement-oriented: semantic HTML/CSS compensation translation and in-context component disclosures supersede the V1 SVG waterfall, duplicated breakdown, and detached explanation surface. Decision and understanding remain primary; assumptions, sources, Rule IDs, and traces remain progressively discoverable. The supported EUR 10,000–120,000 range, fiscal lifecycle, static client-only privacy model, and all domain arithmetic remain unchanged.

Local and remote validation pass 125 Vitest tests, the explicit 110,001-value exhaustive fiscal gate, 14 Playwright journeys across Chromium desktop and mobile WebKit, covered axe checks, build/artifact validation, and a zero-finding production dependency audit. The first CI attempt exposed only locale-dependent four-digit grouping in WebKit test assertions; the isolated `8cce278` correction accepts both valid Italian renderings without changing the product calculation.

Cloudflare production verification returned HTTPS 200 with the repository-owned CSP, Permissions Policy, referrer, MIME, and frame protections. The deployed HTML, JavaScript, and CSS match the local release artifact byte-for-byte. The public browser reproduced the single and current/proposed journeys without any third-party runtime resource; current and proposed salary values remain browser-local.

## Final submission acceptance

The evaluator-first production pass retained the released product thesis and found two material presentation defects worth correcting: collapsed comparison rows mixed component-change signs with take-home consequences, and programmatic result focus exposed an oversized browser-default outline on a non-interactive heading. Comparison rows now lead with their signed effect on annual net and preserve the component's own change inside the explanation; result focus remains programmatically meaningful without the distracting heading outline.

Three small language/affordance corrections remove internal English, replace an external-link-shaped comparison arrow with an inline progression arrow, and clarify the footer promise. The fiscal engine, calculation result, comparison contract, supported scope, runtime dependencies, privacy boundary, and release architecture are unchanged.

Local validation passes 125 Vitest tests, the explicit 110,001-input exhaustive gate, 14 Chromium/WebKit Playwright and covered axe journeys, strict type/lint/format checks, production build and artifact validation, relative Markdown links, and a zero-finding production dependency audit. GitHub Quality and Cloudflare Pages passed code-bearing commit `f5f3b7173ecd493593239714c5e43a5e4f548cb6`; production returned the expected security headers and byte-identical JavaScript/CSS. The artifact is accepted for submission. Further feature, fiscal-profile, analytics, or visual expansion has lower expected hiring value than shipping.

## Final visual authorship and compensation causality

The last substantial product pass replaces the remaining generic calculator/ledger reading with one product-owned compensation translation. A single result now reads contract RAL, modeled fiscal passage, and disposable annual/monthly outcome as one statement. A comparison reads gross change, each canonical fiscal movement, and final net change as one cent-reconciled sequence.

For every material changed component, the interface keeps distinct: current and proposed component amounts, the component's own magnitude change, its signed consequence for annual net, a concise fiscal driver, and optional rule/source evidence. This closes the earlier cognitive ambiguity without changing comparison arithmetic or creating UI fiscal logic.

The landing composition, ink/paper/cobalt palette, square document-like controls, and asymmetric explanation layout derive from the salary transformation rather than a reusable fintech dashboard. The Italian product remains intentionally paired with a concise English-first hiring README. Fiscal rules, calculation engine, supported scope, dependencies, privacy, and deployment architecture are unchanged.

Local release validation passes 125 Vitest tests, the explicit 110,001-input exhaustive gate, 14 Chromium/WebKit Playwright and covered axe journeys, strict type/lint/format checks, the production build and artifact inspection, and a zero-finding production dependency audit. GitHub Quality and Cloudflare Pages passed code-bearing commit `d60208fad58b64c51031020a48e0b7f042571e3e`; the public JavaScript and CSS are byte-identical to the local release build and the final product journey passed production smoke testing. No submission blocker remains.

## Hero headline typography correction

Code-bearing commit `53df1de25bbf43905186ada48a1dced95ef0531c` corrects the hero headline's only remaining glyph collision without changing its wording, scale, four-line composition, product hierarchy, fiscal behavior, or dependencies. Desktop line-height is `0.98` with `-0.045em` tracking; narrow layouts use `1` line-height with `-0.04em` tracking. A focused Playwright regression enforces the minimum vertical rhythm and tracking bounds in Chromium desktop and WebKit mobile.

All local release gates pass with 125 Vitest tests, the 110,001-input exhaustive fiscal gate, and 16 Playwright journeys. GitHub Quality and Cloudflare Pages passed the exact code-bearing commit. Production serves byte-identical CSS and JavaScript, retains its security headers, and renders the corrected headline without horizontal overflow at 320 CSS pixels.

## Canonical orientation

- [Product specification](docs/product/product-spec.md)
- [Architecture](docs/architecture/architecture.md)
- [Implementation plan](docs/architecture/implementation-plan.md)
- [Compensation Translator decision](docs/architecture/decisions/ADR-0008-compensation-translator-presentation.md)
- [Historical V1 waterfall decision](docs/architecture/decisions/ADR-0006-direct-svg-and-semantic-html-waterfall.md)
- [Cloudflare deployment decision](docs/architecture/decisions/ADR-0007-cloudflare-pages-static-deployment.md)
- [Fiscal Rule Catalog](docs/domain/fiscal-rules-2026.md)
- [Source Register](docs/domain/source-register-2026.md)
- [AI workflow](docs/ai-engineering/workflow.md)
- [Fiscal verifier contract](docs/ai-engineering/contracts/fiscal-research-and-verification.md)
- [Research synthesis](docs/ai-engineering/runs/2026-08-22-010-m1-fiscal-research-synthesis.md)
- [Independent fiscal verification](docs/ai-engineering/runs/2026-08-22-011-m1-independent-fiscal-verification.md)
- [Fiscal reconciliation](docs/ai-engineering/runs/2026-08-22-012-m1-fiscal-reconciliation.md)
- [Approved assumption and money policy](docs/ai-engineering/runs/2026-08-22-013-m1-approved-assumption-money-policy.md)
- [Targeted independent review](docs/ai-engineering/runs/2026-08-22-014-m1-targeted-independent-review.md)
- [M1 closure](docs/ai-engineering/runs/2026-08-22-015-m1-fiscal-foundation-closure.md)
- [M2 planning run](docs/ai-engineering/runs/2026-08-22-016-m2-implementation-architecture.md)
- [M3 implementation run](docs/ai-engineering/runs/2026-08-23-017-m3-deterministic-domain-engine.md)
- [Independent M3 domain review](docs/ai-engineering/runs/2026-08-23-018-m3-independent-domain-review.md)
- [M4 product experience run](docs/ai-engineering/runs/2026-08-23-019-m4-product-experience.md)
- [Independent M4 product/accessibility review](docs/ai-engineering/runs/2026-08-23-020-m4-independent-product-accessibility-review.md)
- [M4.1 polish and reconciliation run](docs/ai-engineering/runs/2026-08-23-021-m4-product-polish-reconciliation.md)
- [M5 release hardening run](docs/ai-engineering/runs/2026-08-23-022-m5-release-hardening.md)
- [Production deployment closure](docs/ai-engineering/runs/2026-08-23-023-production-deployment-closure.md)
- [Post-V1 reviewer presentation](docs/ai-engineering/runs/2026-08-23-024-post-v1-reviewer-presentation.md)
- [Post-V1 Compensation Translator](docs/ai-engineering/runs/2026-08-23-025-post-v1-compensation-translator.md)
- [Final submission acceptance](docs/ai-engineering/runs/2026-08-23-026-final-submission-acceptance.md)
- [Final visual authorship and compensation causality](docs/ai-engineering/runs/2026-08-24-027-final-visual-authorship.md)
- [Final production submission closure](docs/ai-engineering/runs/2026-08-24-028-final-production-submission-closure.md)

This file is a snapshot, not a diary. It describes authority recorded in canonical artifacts; it does not create authority.
