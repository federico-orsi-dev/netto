---
run_id: RUN-2026-08-24-027
date: 2026-08-24
tool: codex
role: principal-product-engineer-product-designer
task: final-visual-authorship-and-compensation-causality
status: completed
owner: codex
reviewer: human
related_rules: []
related_adrs:
  - ADR-0004
  - ADR-0008
commit: d60208fad58b64c51031020a48e0b7f042571e3e
---

# Final visual authorship and compensation causality

## Objective and baseline

Strengthen the released Netto artifact where hiring value remained exposed: compensation-change causality, visual authorship, and repository first impression. The reviewed baseline was commit `788ae305ac042e8f5ea4649f6194e5db6bba9579`, tree `d56f1d9f994d49654d66dfa1e9b68ce93c6994b8`, and production [netto-c2o.pages.dev](https://netto-c2o.pages.dev/). Fiscal research, supported scope, architecture, and dependencies were frozen unless a concrete contradiction appeared. None did.

## Diagnosis and decisions

The released comparison was mathematically correct but still made the user combine a signed net effect, component amount movement, and institutional explanation. Its visual hierarchy remained close to a familiar editorial fintech result: oversized marketing heading, isolated monetary values, and a generic delta ledger.

The replacement uses one product-specific compensation statement:

1. contract RAL establishes the starting amount;
2. material fiscal components show canonical before/after amounts;
3. each row states whether that movement leaves more or less annual net;
4. concise Italian copy names the verified fiscal driver;
5. the sequence reconciles to the canonical annual-net change;
6. formulas, Rule IDs, and sources remain optional within the same semantic identity.

The interface uses a paper/ink/cobalt document language, square controls, explicit rules, and an asymmetric explanation/equation composition. It retains system fonts, semantic HTML, CSS modules, local React state, and the existing component boundaries. No chart, animation system, UI framework, or new runtime dependency was introduced.

## Correctness and ownership

- All money remains sourced from `SalaryCalculationResult` or `CompensationComparison`.
- The presentation only orders, labels, signs, and formats canonical amounts; it adds no rate, bracket, allocation, aggregate, or fiscal formula.
- Component amount delta and annual-net effect remain separate signed concepts.
- Fiscal-driver copy describes the verified mechanism without computing eligibility or magnitude.
- The 2026 engine, ruleset, source metadata, exclusions, assumptions, and money adapter are unchanged.
- Explicit Italian grouping was added only to the existing formatter; canonical cents are unchanged.

## README and language strategy

The live product remains Italian because it models Italian compensation and institutional terminology. Code and engineering documentation remain English-first. The README was reduced from a process-heavy reference to an evaluator path: thesis, live demo, memorable `EUR 35,000 → EUR 40,000` case, bounded scope, correctness architecture, five curated evidence links, concise AI-assistance story, and local execution. A new screenshot makes the causal component model visible before a reviewer reads technical evidence.

## Visual and accessibility QA

Browser QA covered initial, EUR 35,000 single result, EUR 35,000 → 40,000 comparison, expanded IRPEF causality, EUR 10,000 net-benefit semantics, reduction/equal behavior through automated journeys, desktop 1280 px, and 320 px mobile reflow. The redesign exposed and fixed one real visual defect: fragmented burden copy was participating as multiple grid children and overlapping. Mobile preserves the same reading order as a vertical sequence rather than duplicating markup.

Keyboard focus, native disclosures, heading hierarchy, non-color signs, reduced motion, no-horizontal-scroll behavior, and covered axe checks remain intact. Salary values remain browser-local and no external request, telemetry, persistence, or runtime service was added.

## Complexity and validation

| Measure | Baseline | Final local artifact | Delta |
| --- | ---: | ---: | ---: |
| Authored CSS files | 7 | 7 | 0 |
| Authored CSS lines | 1,508 | 1,689 | +181 |
| Production CSS bytes | 23,612 | 26,641 | +3,029 |
| Production JavaScript bytes | 305,560 | 308,168 | +2,608 |
| Runtime dependencies | 3 | 3 | 0 |
| UI components added/removed | 0 / 0 | 0 / 0 | 0 |

The largest stylesheet is the existing `CompensationExperience.module.css` at 468 lines; the next is `ComponentLedger.module.css` at 406. The increase replaces rather than layers the core result/comparison layouts and earns its cost through explicit causality and responsive transformation. No parallel V1/V2 component tree remains.

Local checks:

- clean `npm ci`: 243 packages, zero vulnerabilities;
- TypeScript, ESLint, and Prettier: passed;
- Vitest: 125/125 passed across 10 files;
- exhaustive gate: all 110,001 whole-euro RAL values passed in 4.64 seconds wall time;
- Playwright/axe: 14/14 Chromium desktop and mobile WebKit journeys passed;
- production build: six deployable files, no source maps, Functions, or redirects;
- bundles: JavaScript 308,168 bytes raw / 94,020 gzip; CSS 26,641 bytes raw / 5,656 gzip;
- production dependency audit: zero vulnerabilities;
- fiscal lifecycle: unchanged at 15 verified and 9 excluded;
- Git whitespace and relative Markdown links: passed.

## External capabilities and side effects

Codex filesystem/shell tools, npm registry access, Playwright browsers, and the in-app browser were material. Browser screenshots were used for desktop and 320-pixel review and to replace the README product image. No remote repository, Cloudflare, fiscal-source, or third-party product mutation occurred during local implementation. Normal push, GitHub Quality, Cloudflare deployment, and production verification are the remaining release operations.

## Local disposition

The final product is materially clearer and more ownable without expanding scope or architecture. Local quality gates support release. This run does not claim production acceptance; remote deployment closure follows only after the code-bearing commit passes GitHub and Cloudflare checks and the public artifact is verified.
