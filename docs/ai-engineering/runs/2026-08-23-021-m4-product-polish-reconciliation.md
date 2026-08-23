---
run_id: RUN-2026-08-23-021
date: 2026-08-23
tool: codex
role: principal-product-implementation-engineer
task: m4-product-polish-review-reconciliation
status: completed
owner: codex
reviewer: human
related_rules: []
related_adrs:
  - ADR-0004
  - ADR-0006
commit: null
---

# M4.1 product polish and review reconciliation

## Objective and boundaries

Close the release-significant findings in [RUN-020](2026-08-23-020-m4-independent-product-accessibility-review.md) without changing the M3 engine, fiscal lifecycle, supported profile/range, architecture, privacy boundary, or dependency set. M5, deployment, fiscal research, visual rebranding, and speculative features remained out of scope.

Acceptance required all five MAJOR findings to close, all three MINOR findings to be fixed or explicitly deferred, numeric ownership to remain intact, responsive/accessibility regressions to pass, and the complete M3/M4 validation baseline to remain green.

## Review provenance and import

The independent review was performed against M4 commit `e93243bfa2d67a667267f621664adaf6a714ba8a`, tree `bfe82bfb4dfce55a5239908dda40dac6fc1d38b9`. RUN-020 was the only change in its review commit:

- review branch: `review/m4-product-accessibility`;
- review worktree: `C:\Users\feder\Documents\Netto-m4-independent-product-review`;
- review commit: `fee28f62bd7143f0e3ae0734d96d82afa4b5aeaa`;
- parent: `e93243bfa2d67a667267f621664adaf6a714ba8a`;
- review tree: `e28bb471d2693e60661eb97aea699f198e69ac28`;
- only committed path: `docs/ai-engineering/runs/2026-08-23-020-m4-independent-product-accessibility-review.md`.

The one-file commit was inspected and imported by cherry-pick as `163d1a30be00c1cf1f2fee39043ed163b8c6f982`. The imported record's blob hash remains identical to the review commit. The primary and review worktrees were clean before implementation began. RUN-020 was not rewritten.

## Finding-by-finding reconciliation

| Finding | Review evidence | Decision | Smallest corrective action | Validation |
| --- | --- | --- | --- | --- |
| MAJOR-1 result below viewport | At 1280 x 720, focus reached the result heading while annual/monthly values remained below the fold | Accepted | Detect whether the canonical primary result is visible; otherwise align the result section before focusing its heading with `preventScroll` | Desktop/browser geometry and Playwright prove the primary block is inside the viewport and the heading is focused |
| MAJOR-2 unexplained net above RAL | EUR 10,000 produced a valid EUR 10,492.64 result without distinguishing employer salary from State benefits | Accepted | Conditionally explain that the employer does not pay above RAL and display canonical `totalCashBenefits` from the result registry | Component and E2E tests assert the employer distinction, canonical benefit value, and valid net-benefit state |
| MAJOR-3 explanation jumps to implementation detail | Formula text, parameter names, Rule IDs, and sources immediately followed the amount | Accepted | Add typed product copy for `Cos'è?`, institutional reference, and estimate meaning; move mechanics into a native optional disclosure | Component/E2E tests prove plain content is visible first and Rule IDs remain available after expansion |
| MAJOR-4 mobile explanation off-screen | A selected row updated a shared panel below the viewport | Accepted | Keep one semantic explanation owner; on user selection at stacked breakpoints, scroll it into view without forcing focus away from the activating control | 360 x 640 browser metrics place the selected panel at the top of the viewport; Chromium/WebKit E2E verify identity and visibility |
| MAJOR-5 320px horizontal reflow | `body { min-width: 20rem }` produced document overflow when scrollbar width reduced the CSS viewport | Accepted | Remove the body minimum and add narrow-layout wrapping for amounts, rows, formulas, and explanation metadata | 320px E2E with high salary and expanded exclusions/sources/trace reports no page overflow and zero axe violations |
| MINOR-1 trace framing | `Traccia di calcolo` did not clearly advertise optional specialist content | Accepted/fixed | Rename to `Dettagli tecnici del calcolo` and describe the 30-step view as optional | Component/E2E disclosure tests and browser semantic inspection |
| MINOR-2 tablet chart overflow | The `42rem` SVG minimum exceeded the scroller by about one pixel at 768px | Accepted/fixed | Reduce the minimum to `40rem`; preserve direct SVG and semantic mobile transformation | At 768 x 900, chart `scrollWidth` equals `clientWidth` and page overflow is zero |
| MINOR-3 technical primary copy | Several ordinary-user labels exposed policy/legal jargon | Accepted/fixed | Use `Impatto complessivo modellato`, `Beneficio fiscale non imponibile`, `Metodo e limiti`, and plainer exclusion copy; retain legal identifiers in deeper detail | Copy/component tests and multi-viewport visual review |
| NOTE-1 source/exclusion blanks | Semantic DOM contained nine exclusions and 34 source entries; the report was serialization-only | Accepted as evidence/no change | Preserve current semantic lists and external-link notices | Manual DOM/accessibility inspection and axe smoke |
| NOTE-2 visual identity | Existing editorial-fintech language was coherent and did not need decorative redesign | Accepted as constraint | Retain system typography, palette, SVG approach, and dependency-free transitions; polish context and hierarchy only | Visual QA across six viewport widths and representative states |
| NOTE-3 EUR 200,000 request | A broader range crosses contribution-ceiling and high-income domain boundaries | Deferred | Record post-V1 targeted revalidation in the Product Specification; keep EUR 10,000–120,000 unchanged | Input/domain tests and exhaustive range remain unchanged |

Final disposition: 0 rejected, 0 partially accepted, 8 accepted and fixed findings, 2 accepted evidence/constraint notes requiring no code, and 1 deferred scope note. No MINOR remains deferred.

## Product and implementation changes

### Result reveal

Successful submission still focuses `Quanto mi rimane?` for assistive technology. Before focus, the page checks whether the canonical primary-result block is visible; only an off-screen result is aligned to the viewport. Recalculation does not scroll when the result is already visible. No decorative animation or new state owner was introduced.

### Low-RAL explanation

The signed `modeledBurden` remains the condition for the special state. The explanatory note reads the existing `totalCashBenefits` amount directly from `SalaryCalculationResult`, states that the employer does not pay above contractual RAL, and explains that modeled national cash benefits exceed modeled taxes/contributions in this case. It performs no sum, rate, rounding, or fiscal predicate in the UI.

### Three explanation levels

`COMPONENT_COPY` remains a product-owned, typed map keyed by the canonical component ID. It now owns only conservative Italian explanation content:

1. the selected canonical amount and what happened;
2. what the component is, its institutional reference, and what it means in this estimate;
3. an optional native disclosure containing the existing trace formula, normalized child amounts, Rule IDs, and source links.

The amount registry, component registry, trace, and Source Register-derived runtime references remain the sole numeric/provenance owners. No new source was necessary; institutional wording is deliberately conservative and does not claim that specific tax euros are earmarked to spending.

### Mobile, reflow, and visual polish

- Stacked layouts preserve one explanation DOM node and scroll it into the reading context after each selected component, including repeated selections. Pointer interaction follows platform focus behavior; keyboard activation retains the activating button focus and `aria-pressed`/`aria-controls` relationships.
- Removed the global 20rem body floor. Narrow breakpoints wrap breakdown values, formula parameters, long code/source text, and net-benefit content without shrinking important typography.
- Reduced the SVG minimum width just enough to remove incidental tablet overflow. The chart remains geometry-only and disappears at the approved semantic-mobile breakpoint.
- The selected concept, amount, plain-language cards, and optional technical disclosure now have clearer visual grouping without new imagery, gradients, charting, animation, or style dependencies.

## Accessibility and responsive verification

- Landmarks, headings, form instructions, validation alert, native radios/details, source-link notices, non-color signs, semantic breakdown, reduced-motion behavior, and the SVG alternative remain intact.
- Result focus and viewport alignment were checked at laptop/desktop sizes.
- Mobile explanation identity and destination were checked at 360 x 640.
- 320 x 700 covered the EUR 120,000 result plus expanded assumptions, exclusions, 34 sources, and the 30-step trace with zero document overflow.
- Tablet 768 x 900 showed zero document/chart-scroller overflow.
- Manual visual QA also covered 1440 x 900, 1280 x 720, 390 x 844, low-RAL benefit, EUR 35,000, EUR 55,240, EUR 100,000, invalid input, selected explanation, and long expanded content.
- Automated axe scans remain zero-violation in the completed desktop/mobile state and the 320px expanded state. Keyboard submission and explanation activation continue to pass.

## Numeric ownership and adversarial review

Frontend searches found no Decimal construction, fiscal rate/threshold, tax/contribution formula, monetary rounding, network/storage path, or alternative effective-burden calculation. The only frontend monetary arithmetic remains EUR formatting (`minorUnits / 100`) and approved SVG running geometry. New low-RAL and explanation content reads canonical IDs/amounts; it does not derive them.

Runtime dependencies remain exactly React, React DOM, and decimal.js. `package.json` and `package-lock.json` blob hashes are unchanged from the imported RUN-020 baseline. No external asset, analytics, storage, backend, salary transmission, or remote calculation was introduced.

## Validation performed

- Reproducible `npm ci`: 243 packages installed; zero audit findings.
- Strict TypeScript: passed.
- ESLint with zero warnings: passed.
- Prettier repository check: passed.
- Vitest: 118/118 tests passed across 10 files, including unchanged rule/boundary/golden/product obligations.
- Dedicated exhaustive validation: all 110,001 whole-euro inputs from EUR 10,000 through EUR 120,000 passed; minimum modeled net IRPEF remains EUR 126.73 at EUR 10,000; approximately 3.73 seconds test time / 4.51 seconds command wall time.
- Playwright: 10/10 journeys passed across Chromium desktop and WebKit mobile, including result reveal, low-RAL explanation, keyboard flow, mobile reveal, 320px reflow, axe, and zero-external-request checks.
- Production build: passed. HTML 0.58 kB / 0.35 kB gzip, CSS 24.27 kB / 5.35 kB gzip, JavaScript 299.85 kB / 93.16 kB gzip. The small increase reflects product copy/styles/tests and introduces no runtime dependency concern.
- Production dependency audit: zero known vulnerabilities.
- Relative Markdown links, run-record metadata, fiscal lifecycle consistency, no-application-domain mutation, and Git whitespace: passed after canonical records were updated.

## Files and durable ownership

- Product behavior/copy: `src/content/it.ts`, result, breakdown/explanation, calculator, transparency, and owned CSS modules.
- Regression evidence: `src/app/App.test.tsx` and `test/e2e/calculator.spec.ts`.
- Canonical product behavior and deferred range: [Product Specification](../../product/product-spec.md).
- Current milestone status: [`PROJECT_STATE.md`](../../../PROJECT_STATE.md).
- Independent evidence: unchanged [RUN-020](2026-08-23-020-m4-independent-product-accessibility-review.md).

No M1–M4 historical run, accepted ADR, fiscal rule, source record, domain module, package manifest, lockfile, deployment artifact, or control-plane file was changed.

## Tools, capabilities, and external effects

Codex used local Git, PowerShell, npm, TypeScript, ESLint, Prettier, Vitest, Vite, Playwright, and the in-app browser against `127.0.0.1`. The browser capability materially supported visual, responsive, semantic, focus, and overflow verification. Network access was limited to `npm ci`/audit; the application journey made no external request. No deployment, Cloudflare resource, remote Git mutation, external message, account action, secret, or production side effect occurred.

## Remaining limitations and next action

Intentional V1 boundaries remain: bounded Italy/Milan/Lombardy 2026 profile, EUR 10,000–120,000 whole-euro RAL, annual estimator rather than payroll/filing/CCNL precision, and no accounts, storage, analytics, sharing, alternate profiles, or fiscal years. The EUR 200,000 enhancement requires a future product/domain goal.

All RUN-020 blocker/major/minor release-significant findings are closed. M5 release hardening is the next permitted milestone but is not started or authorized by this record.

**M4 POLISH COMPLETE — READY FOR M5**
