---
run_id: RUN-2026-08-24-030
date: 2026-08-24
tool: codex
role: principal-product-engineer
task: responsive-integrity-audit-and-release
status: completed
owner: codex
reviewer: human
related_rules: []
related_adrs:
  - ADR-0008
commit: b893775eb7ad9057301f3a51e47947d52f4e95b0
---

# Responsive integrity audit and release

## Objective and boundary

Validate Netto as one continuous product from 320 through 1,920 CSS pixels, across intermediate widths, constrained heights, comparison directions, fiscal boundaries, disclosures, keyboard focus, and long technical evidence. Fix only structural responsive defects and preserve the released product thesis, fiscal engine, canonical numeric ownership, accessibility, static privacy model, dependencies, and deployment architecture.

Baseline was documentation closure `2b1b6fbc7e9f8d1f7c2e7cee14b2a8bc98c9d65c`, with product code at `53df1de25bbf43905186ada48a1dced95ef0531c`.

## Audit evidence and root cause

The objective opening-state sweep covered 320, 360, 390, 430, 480, 560, 640, 672, 680, 700, 768, 832, 840, 900, 960, 1,024, 1,100, 1,152, 1,160, 1,280, 1,440, 1,600, and 1,920 CSS pixels. Additional aspect-ratio checks used 667 × 375, 844 × 390, 768 × 1,024, 1,024 × 600, and 1,280 × 600.

One material discontinuity was found:

- at 672px the opening was a coherent vertical composition;
- at 680px it abruptly became a narrow two-column composition;
- from 680px through roughly 1,100px the salary field became too narrow to show `35.000` or `120.000` reliably even though the page itself did not horizontally scroll;
- the separate narrow headline formula also produced an abrupt computed-size change across 672/680px.

The defect came from treating the phone breakpoint as the only structural fit decision. The grid switched to two columns before the headline and salary action could both preserve their minimum useful widths. It was not a padding or isolated control defect.

## Correction

- The opening composes vertically through `72rem`, then returns to the authored two-column relationship only when both regions fit.
- At medium widths the salary action remains constrained to `54rem` and aligned to the inline end, preserving hierarchy rather than becoming an undifferentiated full-width stack.
- One fluid headline scale now spans the viewport continuum; the approved narrow line-height and tracking remain in force without a breakpoint-specific size jump.
- No clipping, overflow hiding, scale transform, duplicate markup, component fork, JavaScript viewport branch, or new dependency was introduced.

Product CSS changed in commit `c65d44de2dc4d49f8c08b6a4449ad3b8ce9c2d48`. Final test ownership is commit `b893775eb7ad9057301f3a51e47947d52f4e95b0`, tree `9086d0106a04dffa11a2dfdbb2e07f5ff4737db4`.

## State and visual QA matrix

The audit exercised:

- initial, validation, calculated, positive comparison, negative comparison, equal comparison, low-RAL benefit, maximum RAL, and 55,240/55,241 Rule-ID transition states;
- 12/13/14 instalment controls;
- component explanations, nested formula/rule/source evidence, assumptions, official sources, and dual comparison traces;
- desktop Chromium and mobile WebKit;
- 320px reflow, portrait mobile, phone landscape, tablet portrait, medium desktop, short laptop, and wide desktop.

Manual rendered-image inspection covered the complete 320px long-evidence page, 700px validation, 840px boundary comparison, 390px WebKit comparison, 667 × 375 opening, 1,024 × 600 comparison, and 1,920px opening. Material clipping, overlap, horizontal page scroll, broken reading order, lost context, and unreadable long identifiers were absent after the correction.

The production browser then reproduced the 700px maximum-RAL state with the full `120.000` value, a 226.99px input, no control overlap, and zero document-width overflow.

## Regression coverage

Two product-level checks were added:

1. a dense opening sweep that asserts input and CTA visibility, page containment, complete field containment, useful input width, and non-overlapping controls across every audited viewport;
2. an intermediate-width state sweep at 700, 840, 1,024, and 1,100 pixels covering calculation, comparison increase/decrease, the Article 13 boundary, supported extremes, instalment switching, component explanation, and source evidence.

An initial generic scan of every visible DOM node produced a CI-only smoke-step failure despite both local parallel and one-worker CI-mode passes. That broad assertion was removed because font-engine glyph overhang can make it cross-platform-sensitive and it was not the owner of the defect. The specific field-overflow, control-overlap, and page-containment assertions that found the real regression remain. The second GitHub run passed.

## Accessibility and interaction

Existing focus transfer after calculation/comparison, keyboard-only journeys, disclosure semantics, reduced-motion coverage, and covered axe checks remain green. The structural change is CSS-only and does not alter DOM order, accessible names, landmarks, or source-of-truth identity. The 320px and phone-landscape checks provide the reflow equivalent required for magnified narrow layouts without adding a separate zoom-specific implementation path.

## Complexity and artifact delta

| Measure | Before | After | Delta |
| --- | ---: | ---: | ---: |
| Authored CSS files | 7 | 7 | 0 |
| Authored CSS lines | 1,690 | 1,698 | +8 |
| Media-query groups | 12 | 13 | +1 |
| Production components | 8 | 8 | 0 |
| Runtime dependencies | 3 | 3 | 0 |
| CSS raw | 26,661 B | 26,754 B | +93 B |
| CSS gzip | 5,656 B | 5,670 B | +14 B |
| JavaScript raw | 308,168 B | 308,168 B | 0 B |
| JavaScript gzip | 94,020 B | 94,021 B | +1 B |

There is no duplicate desktop/mobile component, new styling layer, breakpoint-specific JavaScript, or authored fiscal arithmetic. The one additional structural breakpoint has a concrete fit responsibility.

## Validation

- `npm ci`: passed; 244 packages audited, zero vulnerabilities.
- `npm run typecheck`: passed.
- `npm run lint`: passed with zero warnings.
- `npm run format:check`: passed.
- `npm test`: 125/125 passed; 10 test files.
- `npm run test:exhaustive`: all 110,001 supported whole-euro RAL values passed in 3.62 seconds in the explicit gate.
- `npm run test:e2e`: 20/20 passed across Chromium desktop and WebKit mobile; a second one-worker `CI=true` run also passed 20/20.
- Covered axe, keyboard, reduced-motion, no-external-request, 320px, and responsive-continuum checks passed.
- `npm run build`: passed; 47 modules transformed.
- `npm run release:check`: six expected static files, zero source maps, Functions, or redirects.
- `npm audit --omit=dev --audit-level=high`: zero vulnerabilities.
- Relative Markdown-link validation and `git diff --check`: passed.

## Release verification

- Product CSS/test commit: `c65d44de2dc4d49f8c08b6a4449ad3b8ce9c2d48`.
- Cross-platform test-reliability commit: `b893775eb7ad9057301f3a51e47947d52f4e95b0`.
- GitHub Quality: passed ([run 32686260620](https://github.com/federico-orsi-dev/netto/actions/runs/32686260620)).
- Cloudflare Pages: passed for `b893775eb7ad9057301f3a51e47947d52f4e95b0`.
- Production: [https://netto-c2o.pages.dev/](https://netto-c2o.pages.dev/) returned HTTPS 200.
- Production CSS `assets/index-DbwAt6uS.css`: SHA-256 `5869E335A99254085F42852D1EBE5DBC87038DEDCEC88A76771CF13B08D40951`, byte-identical to local `dist`.
- Production JavaScript `assets/index-CRSnEWS3.js`: SHA-256 `C7075108D5B886DF102489180C39071178C50F6E009318AFCDBDDFF27D4F7DEE`, byte-identical to local `dist`.
- Repository CSP, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin` remain active.

## Capabilities and external effects

Playwright was used for Chromium/WebKit state, accessibility, geometry, and rendered-image inspection. The in-app browser was used for the public 700px product smoke and geometry verification. GitHub's public checks API and the existing Git-integrated Cloudflare Pages pipeline verified the explicitly authorized pushes and deployments. No new MCP server, external service, credential, runtime request, package, production setting, or control-plane change was introduced.

## Final assessment

No responsive blocker remains in the audited product states or viewport continuum. Remaining browser-specific subpixel glyph and line-wrap variation is expected platform behavior and is contained by structural layout rather than hard-coded pixel compensation. The final architecture remains one semantic product tree with CSS-owned transformations.
