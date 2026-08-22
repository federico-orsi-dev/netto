---
run_id: RUN-2026-08-23-019
date: 2026-08-23
tool: codex
role: principal-implementation-engineer
task: m4-product-ui-and-experience
status: completed
owner: codex
reviewer: pending-independent-product-accessibility-review
related_rules:
  - RULE-INPS-2026-001
  - RULE-INPS-2026-002
  - RULE-INPS-2026-003
  - RULE-INPS-2026-004
  - RULE-INPS-2026-005
  - RULE-NAT-BASE-2026
  - RULE-NAT-GROSS-IRPEF-2026
  - RULE-NAT-EMPLOYMENT-DEDUCTION-2026
  - RULE-NAT-NET-IRPEF-2026
  - RULE-NAT-CUNEO-SUM-2026
  - RULE-NAT-CUNEO-DEDUCTION-2026
  - RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026
  - RULE-LOMBARDY-2026-001
  - RULE-MILAN-2026-001
  - RULE-LOCAL-2026-ORDER
related_adrs:
  - ADR-0001
  - ADR-0002
  - ADR-0003
  - ADR-0004
  - ADR-0006
commit: null
---

# M4 product UI and experience

## Objective and acceptance criteria

Transform the independently accepted M3 engine into the complete local V1 product experience without changing fiscal semantics or creating a second numeric authority. Completion required the Italian salary journey, annual/monthly/instalment result hierarchy, truthful signed burden treatment, direct SVG and semantic HTML gross-to-net representations, explanations, trace, assumptions, methodology, official sources, responsive behavior, accessibility, product tests, browser QA, and a production build. Deployment and M5 release hardening remained out of scope.

## Canonical context consulted

- `PROJECT_STATE.md`, Product Specification, Architecture, M2 Implementation Plan, Test Strategy, and release checklist.
- ADR-0001 through ADR-0004 and ADR-0006, including the direct-SVG/semantic-HTML contract.
- Fiscal Rule Catalog, Source Register, approved assumptions and calculation policy.
- M3 implementation record `RUN-2026-08-23-017` and independent review `RUN-2026-08-23-018`.
- Existing `SalaryCalculationResult`, amount registry, semantic component registry, trace, source, assumption, exclusion, and typed error contracts.

No canonical fiscal conclusion, lifecycle state, source record, accepted ADR, or product scope was reopened.

## Changes made

### User journey and component ownership

- Replaced the placeholder with one focused Italian page: purposeful initial state, RAL form, result summary, gross-to-net explanation, and progressive methodology layer.
- Added semantic product components for the salary form, result summary, waterfall, breakdown list, contextual explanation, assumptions/sources, and calculation trace.
- Kept state local: raw input, 12/13/14 presentation choice, typed validation issue, canonical result, unexpected failure flag, and selected component identity. No router, store, persistence, URL state, or remote request was introduced.
- Centralized Italian copy and display-only EUR/percentage formatting. Locale-formatted strings are never parsed back into the engine.

### Numeric ownership and visualization

- The hero reads `result.amounts`; breakdown and explanation resolve the domain's `breakdownOrder`, `components`, trace IDs, and amount registry.
- A pure presentation adapter maps canonical components into waterfall items and calculates only deterministic SVG geometry. It contains no fiscal rate, base, eligibility, rounding, aggregate, or annual-net formula.
- Desktop uses direct React SVG with text/sign cues; semantic HTML is always present and owns keyboard/screen-reader interaction. At the mobile breakpoint the SVG is removed from presentation and the list becomes the primary vertical experience.
- Positive modeled burden is labelled as a modeled overall burden. A negative signed burden is shown as `Beneficio netto modellato`, with positive benefit magnitude and no negative-tax-rate framing.

### M3 minor resolution

The independent M3 reviewer found correct but duplicated rate/threshold literals in trace metadata. M4 replaced the affected IVS, additional-IVS, CIGS, national-bracket, trattamento-integrativo, Lombardy, Milan, and pension-ceiling captions/parameters with values sourced from typed `RULESET_2026`. A focused config-to-trace test guards the coupling. The change is metadata-only: formulas, outputs, ordering, Rule IDs, sources, and fiscal lifecycle are unchanged.

### Visual foundation and typography

- Implemented product-owned CSS custom properties and CSS Modules for warm neutral surfaces, deep green hierarchy, restrained outflow/benefit states, spacing, radii, borders, shadows, focus, and reduced-motion behavior.
- Chose the native system UI stack (`system-ui`, `-apple-system`, `Segoe UI`, sans-serif) for legibility, platform consistency, zero font payload/network request, and licensing simplicity. Financial results use tabular numerals.
- Avoided gradients, glassmorphism, chart libraries, animation libraries, image payloads, and generic dashboard card grids.

## Responsive and accessibility implementation

- Desktop: side-by-side input/intro, dominant annual result with secondary monthly result, SVG waterfall, semantic list, and adjacent sticky explanation.
- Tablet: reflowed content and long progressive disclosures without horizontal overflow.
- Mobile: vertical hero and result hierarchy, touch-sized controls, SVG omitted, semantic list retained, and explanation placed directly after the selected breakdown.
- Added landmarks, heading order, labels/instructions, `aria-invalid`/live alert validation, focus transfer to results, visible focus, radio semantics, button-based breakdown selection, `aria-pressed`/`aria-controls`, accessible names, external-link notices, and non-color sign cues.
- Automated axe checks run on the completed main state in Chromium desktop and WebKit mobile; manual browser inspection covered keyboard focus, semantics, responsive transformation, and long content.

## Tests and visual QA

- Component/product tests cover empty state, invalid formats/ranges, canonical result rendering, 12/13/14 presentation changes, shared explanation identity, low-RAL net benefit, progressive trace, and stale-result removal.
- Presentation tests prove canonical component order/identity and finite geometry without fiscal math.
- E2E smoke covers the complete valid journey, explanation/source/trace access, axe diagnostics, low-RAL benefit state, and keyboard-only result/explanation interaction in desktop Chromium and mobile WebKit.
- Browser visual QA inspected: initial state; RAL EUR 35,000; RAL EUR 10,000 net-benefit state; RAL EUR 55,240; below-range validation; desktop 1280 px; tablet 768 px; mobile 390 px; explanation selection; 34-source and 30-step disclosures. No horizontal overflow, clipping, console warning/error, semantic dead end, or misleading burden treatment remained.

## Architecture and privacy self-review

- Frontend search found no fiscal percentage, bracket, contribution, deduction, rounding, or annual-net formula. Numeric arithmetic outside the domain is limited to locale formatting and SVG geometry.
- No Decimal import or instance crosses the domain adapter/result boundary.
- Summary, waterfall, semantic breakdown, explanation, accessibility representation, and trace share canonical IDs and values; the trace is rendered, not recomputed.
- No salary value is transmitted. There is no fetch, analytics, storage, backend, external fiscal API, secret, runtime environment configuration, or new runtime dependency.
- Runtime dependencies remain React, React DOM, and decimal.js. No CSS, chart, state, validation, animation, routing, or i18n package was added.

## Validation performed

- Reproducible `npm ci`: passed.
- Strict TypeScript, ESLint, and Prettier check: passed.
- Vitest rule/domain/component/product suite: 118 tests passed across 10 files.
- Exhaustive pure-domain gate: all 110,001 whole-euro RAL inputs passed in approximately 3.4 seconds; minimum modeled net IRPEF remains EUR 126.73 at RAL EUR 10,000.
- Playwright smoke: 6 tests passed across Chromium desktop and WebKit mobile; both main-state axe scans reported zero violations and the completed journey emitted no external runtime request.
- Production Vite build: passed; the single application JavaScript asset is 296.15 kB (92.25 kB gzip) and CSS is 21.88 kB (5.00 kB gzip), with no image/font/chart payload or material dependency concern.
- Production dependency audit: zero known vulnerabilities.
- Documentation ownership/link checks and `git diff --check`: passed.

## Deviations, approvals, and unresolved issues

No M2 architecture, fiscal rule, source conclusion, profile, privacy boundary, production dependency, or approved V1 scope changed. Typeface and exact visual tokens were M4-owned deferrable choices and required no new architecture approval. The trace-caption fix was explicitly authorized by the M4 goal and changes metadata ownership only.

Non-blocking limitations remain intentional: the result is an annual estimator, not payroll/filing/CCNL software; exact thirteenth/fourteenth payslips are not simulated; external authoritative links require network access only when a user chooses to open them; screenshots, Cloudflare configuration, security headers, deployment, and release verification remain M5 work.

## Tools, capabilities, and external effects

Codex used local PowerShell, Git, npm, TypeScript, ESLint, Prettier, Vitest, Vite, and Playwright. The in-app browser capability was used only against `127.0.0.1` for responsive/semantic visual QA. Network access was limited to reproducible npm installation/audit and Playwright browser installation; all application calculation and testing remained local. No deployment, Cloudflare resource, remote Git mutation, analytics event, salary transmission, account action, secret, external message, or production side effect occurred.

## Result and next action

M4 is complete locally and ready for an independent product/accessibility/numeric-ownership review. M5 and deployment are not authorized to start automatically.

**M4 COMPLETE — READY FOR PRODUCT / ACCESSIBILITY REVIEW**
