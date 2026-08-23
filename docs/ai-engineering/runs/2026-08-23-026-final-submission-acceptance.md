---
run_id: RUN-2026-08-23-026
date: 2026-08-23
tool: codex
role: principal-product-engineer-release-owner
task: final-submission-acceptance
status: completed
owner: codex
reviewer: human
related_rules: []
related_adrs:
  - ADR-0004
  - ADR-0008
commit: f5f3b7173ecd493593239714c5e43a5e4f548cb6
---

# Final submission acceptance

## Objective and baseline

Judge the public Netto artifact as a time-constrained Jet HR evaluator would, correct only issues likely to reduce interview probability, revalidate the complete released system, and stop. The reviewed baseline was closure commit `0ca0e9f8436bb969ee05a6e12b6913430fd9c060`, code-bearing Compensation Translator commit `8cce278cfa961940efdd5637f21463842806d985`, and production [netto-c2o.pages.dev](https://netto-c2o.pages.dev/).

The evaluation order was production landing page, first calculation, comparison, explanation/evidence, mobile and boundary states, then repository landing material and implementation ownership. Fiscal research, product scope, runtime dependencies, and release architecture were explicitly out of scope unless a concrete contradiction appeared. None did.

## Findings and decisions

| Finding | Hiring impact | Decision |
| --- | --- | --- |
| Collapsed comparison rows displayed the signed change in each component beside a marker describing whether that component adds to or subtracts from net. The mathematics was correct, but a larger tax appeared as a positive number in a subtraction row. | Material comprehension risk in the product's strongest differentiator. | Lead each collapsed row with its signed effect on annual net; expose current-to-proposed amount and the component's own signed change inside the explanation. |
| Programmatic focus after calculate/compare showed a large browser-default blue rectangle around the non-interactive result heading. | Material visual-polish issue in a high-frequency transition. | Preserve focus movement and screen-reader context; suppress only the programmatic heading outline. All interactive controls retain visible focus. |
| The first-viewport kicker used internal English, the comparison CTA used an external-link-shaped arrow, and the footer promise was awkward Italian. | Small but visible authorship/friction cost. | Replace with concise Italian and an inline progression arrow. |
| The warm editorial composition still uses familiar web patterns. | Harmless familiarity, not generic-template loss of authorship. | No redesign. The typographic translation, sparse surfaces, in-context causality, and evidence hierarchy are recognizably Netto. |
| The product remains bounded to one 2026 Milan/Lombardy employee profile and a `pages.dev` URL. | Honest scope and acceptable submission infrastructure, not a defect. | Preserve; no new profile, questionnaire, custom domain, analytics, or backend. |
| Repository history and evidence are extensive. | Depth is useful after interest is earned; README already provides a short evaluator path. | Preserve durable evidence; do not add another documentation layer or rewrite history. |

No domain, fiscal rule, source, calculation, comparison arithmetic, public amount contract, privacy behavior, runtime dependency, CI configuration, or Cloudflare configuration changed.

## Product and browser acceptance

- First minute: the product identity, Milan 2026 scope, local calculation, RAL action, and compensation-change thesis are visible without opening methodology.
- Single result: annual net dominates, monthly net remains immediately legible, contractual instalments remain clearly presentational, and low-RAL cash benefits are described without implying employer overpayment.
- Comparison: ordinary raise, reduction, equal values, low/mid benefit transitions, EUR 55,240 to EUR 55,241, and large supported changes remain coherent. Collapsed component signs now answer “what this does to my net”; expanded content answers “how the component itself changed.”
- Mobile: initial, result, comparison, disclosure, long labels, and EUR 120,000 states retain hierarchy at 320 CSS pixels without clipping or horizontal overflow.
- Accessibility: focus movement remains deliberate; interactive focus remains visible; native disclosure semantics, keyboard operation, reduced motion, non-color signs, screen-reader order, and covered axe checks remain intact.
- Trust: assumptions and methodology remain progressively disclosed, authoritative sources remain discoverable, and the product never presents itself as payroll, filing, or CCNL-compliance software.

## Complexity and artifact delta

| Measure | Before acceptance | Final code-bearing artifact | Change |
| --- | ---: | ---: | ---: |
| Authored CSS files | 7 | 7 | 0 |
| Authored CSS lines | 1,506 | 1,508 | +2 |
| Production CSS bytes | 23,560 | 23,612 | +52 |
| Production JavaScript bytes | 305,502 | 305,560 | +58 |
| Deployable assets | 6 | 6 | 0 |
| Runtime dependencies | 3 | 3 | 0 |

The small delta pays only for explicit component-effect semantics, clearer copy, and the scoped focus correction. No obsolete parallel implementation or new abstraction was introduced.

## Validation

- reproducible `npm ci`: 243 packages installed; zero audit findings;
- strict TypeScript, ESLint with zero warnings, and repository Prettier check: passed;
- Vitest: 125/125 passed across 10 files, including the explicit comparison-row causality assertion;
- exhaustive fiscal gate: all 110,001 whole-euro RAL inputs passed; test execution 3.49 seconds (4.25 seconds command wall time);
- Playwright/axe: 14/14 Chromium desktop and mobile WebKit journeys passed, including focus, reduced motion, 320-pixel reflow, comparison edge states, and no-external-request coverage;
- production build and release inspection: six files, no source maps, Functions, or redirects;
- production dependency audit: zero vulnerabilities;
- relative Markdown links and Git whitespace: passed;
- GitHub Quality: passed for `f5f3b7173ecd493593239714c5e43a5e4f548cb6`;
- Cloudflare Pages: passed for the same commit;
- production HTTPS and security headers: passed;
- production JavaScript and CSS SHA-256 hashes: byte-identical to the locally validated artifact;
- public smoke: EUR 35,000 to EUR 40,000, EUR 20,000 to EUR 25,000 with expanded causality, EUR 55,240 to EUR 55,241, and mobile EUR 120,000 passed.

## External capabilities and side effects

Codex filesystem/shell tools, npm registry access, Playwright browsers, the in-app browser, public GitHub APIs, Git push, and the existing Cloudflare Pages Git integration were material. The code-bearing commit was pushed normally to `main`; GitHub CI and Cloudflare performed their configured external checks/deployment. No third-party runtime service, analytics, persistence, secret, fiscal API, or dependency was introduced. Salary scenarios remained within local or first-party deployed browser execution.

## Hiring simulation and stopping decision

- **60-second screen:** strong product thesis, live proof, authored hierarchy, and visible comparison value; no material rejection trigger.
- **3–5 minute product review:** the compensation delta and in-context causes create decision value beyond a calculator; bounded scope is legible without dominating the experience.
- **Technical review:** canonical fiscal ownership, deterministic comparison, exhaustive validation, source provenance, small dependencies, and shipped static operations are unusually credible.
- **Jet HR product/business review:** the artifact turns payroll-domain complexity into an understandable compensation decision and demonstrates restraint. The main residual limitation is absence of real-user validation or business outcome evidence, which a take-home cannot fully establish.

There is nothing left that merits delaying submission. Another profile/year, employer cost, analytics, a custom domain, additional charts, AI chat, sharing, or broader negotiation tooling may extend a future product but would weaken this hiring pass by adding scope without resolving a current defect.

## Final disposition

Final hiring-weighted assessment: **92/100**, high confidence, approximately the **96th percentile** among credible AI-assisted take-homes, verdict **STRONG INTERVIEW**. The strongest interview reason is the combination of a genuinely useful product decision with auditable fiscal and engineering restraint. The strongest counterargument is that business validation is inferred from product judgment rather than demonstrated with users or usage data.

Netto is ready to submit. The correct next action is shipping the current artifact, not opening another milestone.
