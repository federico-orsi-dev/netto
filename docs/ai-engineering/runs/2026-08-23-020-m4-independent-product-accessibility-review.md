---
run_id: RUN-2026-08-23-020
date: 2026-08-23
tool: codex
role: independent-product-ux-accessibility-reviewer
task: m4-independent-product-accessibility-review
status: completed
owner: codex
reviewer: human
related_rules: []
related_adrs:
  - ADR-0004
  - ADR-0006
commit: null
---

# M4 independent product, UX, and accessibility review

## 1. Baseline

The review was performed against M4 commit `e93243bfa2d67a667267f621664adaf6a714ba8a` and tree `bfe82bfb4dfce55a5239908dda40dac6fc1d38b9` on branch `m1/verified-fiscal-foundation`. The worktree was clean at pre-flight, the M1 catalog remained 15 `verified` and 9 `excluded`, M2 remained closed, and [RUN-019](2026-08-23-019-m4-product-experience.md) was present. The repository contained the intended M4 interface and no release/deployment work.

The product is technically faithful and visually coherent, but five material comprehension, interaction, and reflow issues should be corrected before M5. No fiscal reopening is indicated.

## 2. Review environment

- Windows and PowerShell repository environment with Node/npm.
- In-app browser against the local Vite preview at 1280 x 720, 768 x 900, 360 x 640, and 320 x 568 CSS pixels.
- Initial, EUR 10,000, representative mid-range, EUR 55,240, EUR 120,000, malformed/out-of-range, selected-explanation, and fully expanded disclosure states.
- Automated Playwright coverage in desktop Chromium and mobile WebKit, including axe checks.
- Keyboard, focus, semantic DOM, accessible names, external-link labelling, overflow, wrapping, console, and network behavior were inspected.
- Repository searches covered UI numeric arithmetic, fiscal constants/formulas, Decimal imports, network/storage use, and domain-to-UI import direction.

The browser was used only against `127.0.0.1`. Network access was limited to `npm ci` and the dependency audit. There was no deployment, remote Git mutation, salary transmission, or other external side effect.

## 3. User journey assessment

The landing proposition, RAL entry, validation, result hierarchy, breakdown, methodology, sources, and technical evidence form a credible single-page journey. The initial state is intentional rather than an empty zero-result dashboard. The annual result is visually dominant and monthly/instalment context is subordinate.

A normal Italian user cannot yet be expected to understand every important state without friction:

1. At 1280 x 720, submitting EUR 35,000 moves focus to the result heading around `y=627`, while the first annual and monthly amounts begin below the viewport around `y=749`. The action reveals the question but not the answer.
2. At EUR 10,000, the interface correctly reports annual disposable value above RAL, but it does not explicitly explain that verified State cash benefits—not the employer—create that result.
3. The contextual explanation moves too quickly from a concise label into formulas, code-like parameter names, Rule IDs, and sources.
4. On a 360 x 640 mobile viewport, activating an item around `y=287` updates an explanation panel beginning around `y=639`; the change is almost entirely off-screen and has no sufficiently obvious reveal.

The hiring-evaluator question has a positive answer: methodology, official sources, assumptions, exclusions, Rule IDs, and the deterministic trace provide substantial optional technical depth without changing the main fiscal result.

## 4. Information architecture

The four intended layers are present and ordered correctly: answer, gross-to-net transformation, contextual explanation, then methodology/technical evidence. Assumptions, sources, exclusions, and trace use progressive disclosure and do not dominate the initial journey.

The main structural corrections are bounded:

- Coordinate focus and scroll after successful calculation so at least the primary annual result is in the viewport.
- On mobile, reveal the selected explanation in the user's current reading context, either by moving it next to the active row or scrolling the shared panel into view while preserving sensible focus behavior and reduced-motion preferences.
- Keep formula/Rule ID/source mechanics behind a secondary technical disclosure inside the explanation rather than presenting them as the immediate answer.

No new page, router, dashboard layout, or additional product section is warranted.

## 5. Low-RAL net-above-RAL assessment

At RAL EUR 10,000 the UI faithfully renders the canonical result:

- modeled outflows: EUR 1,187.06;
- modeled cash benefits: EUR 1,679.70;
- net modeled benefit: EUR 492.64;
- estimated annual disposable result: EUR 10,492.64.

The signed `Beneficio netto modellato` label and positive 4.93% presentation avoid a false negative-tax-rate state, and the waterfall correctly ends above gross. However, no nearby prose states that the employer still pays the contractual RAL or that the excess arises from the two modeled fiscal cash benefits. A user can reasonably interpret `Netto annuale stimato` as an impossible salary payment.

**Finding: MAJOR.** Add one conditional, concise note in the result area using the canonical `totalCashBenefits` value and existing component identities. Explain that the modeled annual disposable value can exceed contractual RAL when State fiscal cash benefits exceed modeled deductions, and that the employer is not paying above RAL. This is explanatory composition only; it must not add arithmetic or alter the fiscal result.

## 6. Simple-explanation-layer assessment

The shared explanation interaction and source linkage are technically complete, but the user-facing layer is not consistently conceptual. For example, the contributions explanation opens with reconciliation-policy language and then exposes `sum of normalized public contribution components`, raw parameter names, Rule IDs, and authoritative sources. Similar fiscal labels such as `Somma non imponibile sul cuneo fiscale` presume background knowledge.

**Finding: MAJOR.** Extend the existing product-owned component copy—not the domain engine—with a small, typed conceptual view for major items:

- what the item is;
- who receives or provides it;
- its broad purpose, without claiming euro-for-euro earmarking;
- the canonical amount in this result.

Keep formulas, parameters, Rule IDs, and sources under an optional `Dettagli fiscali` or equivalent disclosure. Reuse the current semantic component ID, amount registry, trace, and source records; do not create a second configuration or calculation path.

## 7. Technical-trace assessment

The trace is discoverable only after the main journey, contains 30 deterministic steps, preserves exact/public distinctions, and remains valuable to reviewers. It does not recompute fiscal logic. Its current title, `Traccia di calcolo`, is accurate but does not clearly signal optional, specialist content until after expansion.

**Finding: MINOR.** Frame it as `Dettagli tecnici del calcolo` with a short closed-state subtitle stating that it exposes formulas, rules, and intermediate steps for verification. Preserve all technical content and progressive disclosure.

## 8. Exclusions and source semantic rendering

The reported empty-list hypothesis was not reproduced as a product issue. The semantic DOM contained nine non-empty exclusion entries and 34 non-empty source entries. Source links had meaningful visible text and an accessible notice that they open in a new tab. Content was visible, keyboard reachable, and retained when disclosures were expanded. The apparent blanks came from copied-page serialization rather than missing content.

**Result: PASS.** No correction is required.

## 9. Copy review

Primary copy is generally clear, calm, Italian, and free of marketing exaggeration. `Netto annuale stimato`, `Beneficio netto modellato`, and the 12/13/14 instalment qualification are directionally sound. Official terminology such as `Trattamento integrativo` is appropriate in deeper content.

Several phrases are unnecessarily technical in ordinary-user surfaces: `Somma non imponibile sul cuneo fiscale`, `Precisione dichiarata`, `confini espliciti, mai trattati come importi zero`, and some reconciliation-policy language. `Prelievo complessivo modellato` is also less neutral when the signed value can include benefits.

**Finding: MINOR.** During the simple-layer correction, use plain primary labels and reserve formal terminology for technical detail. Prefer a neutral signed concept such as `Impatto complessivo modellato` where it matches the canonical semantics. Avoid repeating limitations; keep one precise explanation per decision point.

## 10. Visual quality

The implementation meets the intended editorial-fintech direction: strong typographic hierarchy, warm neutral surfaces, restrained green/outflow/benefit semantics, legible tabular numbers, and a purposeful waterfall. It does not resemble a generic KPI dashboard and does not depend on decorative gradients, imagery, glassmorphism, or animation. Selection, signs, and text keep the financial meaning independent of color.

The most valuable visual improvement is not decoration: make the newly calculated answer and selected explanation visibly enter the user's current context. No new visual dependency, illustration, animation library, or broad redesign is recommended.

**Result: PASS with the interaction findings recorded elsewhere.**

## 11. Responsive review

- **Desktop 1280 x 720:** layout and waterfall are clear, but successful submission leaves the actual answer below the fold.
- **Tablet 768 x 900:** content reflows without page-level overflow. The SVG scroller shows a small internal horizontal scrollbar because the chart keeps a `42rem` minimum width.
- **Mobile 360 x 640:** hierarchy, input, controls, semantic breakdown, validation, and expanded long content are readable. Selected explanation feedback is off-screen.
- **Small mobile/high zoom 320 x 568:** the document reports `clientWidth=305` and `scrollWidth=320`, producing horizontal page scrolling. The direct cause is `body { min-width: 20rem; }` combined with the classic scrollbar-reduced viewport.

**Finding: MAJOR.** Remove or relax the body minimum width and verify reflow at 320 CSS pixels and an equivalent 400% zoom state.

**Finding: MINOR.** Remove the tablet chart's incidental one-pixel/internal overflow by adjusting the chart minimum width or switching to the semantic representation at the appropriate breakpoint. Do not compromise chart readability merely to remove deliberate overflow where it is genuinely needed.

## 12. Accessibility review

Strengths:

- coherent landmarks and heading order;
- explicitly labelled RAL input with range instructions;
- `aria-invalid`, visible focus, and live `role=alert` validation;
- native radio semantics with approximately 44 px label targets;
- keyboard-operable breakdown buttons with pressed/controlled relationships;
- SVG hidden from assistive technology while an always-semantic ordered representation conveys the same components;
- non-color amount signs and explanatory text;
- native progressive-disclosure controls;
- meaningful external-link labelling;
- reduced-motion styling;
- zero automated axe violations in the tested completed states.

Material gaps:

- **MAJOR:** 320 CSS-pixel/high-zoom horizontal reflow failure.
- **MAJOR:** mobile breakdown activation updates content outside the visible context with insufficient perceivable feedback.
- **MAJOR:** result focus/scroll orchestration does not expose the primary answer at a common laptop viewport.

These are interaction/reflow defects, not evidence of an inaccessible architecture. The smallest fixes should be followed by targeted keyboard, 320-pixel reflow, mobile selection, and axe regression checks.

## 13. Numeric-ownership audit

**Result: PASS; zero BLOCKER findings.**

- Result summary consumes the canonical `SalaryCalculationResult`/amounts.
- Breakdown and explanation use canonical component IDs, registry values, trace IDs, and source IDs.
- The waterfall adapter selects/orders canonical components and performs presentation geometry only.
- UI arithmetic is limited to EUR/percentage formatting, absolute-value presentation, and SVG geometry/running positions.
- No UI tax percentage, contribution rate, bracket formula, deduction formula, fiscal rounding, Decimal construction, alternative aggregate, network calculation, or storage path was found.
- The domain remains React/DOM-independent and the runtime dependency set remains React, React DOM, and decimal.js.

The requested low-RAL explanation must continue to use existing canonical benefit amounts and identities rather than summing or recomputing them in UI code.

## 14. Future EUR 200,000 range assessment

The transparent EUR 120,000 maximum is correct bounded support, not a defect. Extending to EUR 200,000 is a separate product/domain goal requiring targeted fiscal revalidation rather than a UI constant change:

- reopen the supported input facade, range copy, golden/boundary fixtures, and exhaustive enumeration;
- make the EUR 122,295 pension contribution ceiling, currently outside the supported range, active and verify its interaction with the additional 1% contribution and downstream taxable bases;
- reassess rule applicability, assumptions, exclusions, and bounded local-tax invariants across the larger envelope;
- assess the exact boundary for high-income personal-relief adjustments if support reaches or exceeds EUR 200,000;
- revalidate result/trace/UI behavior after the domain extension.

Recommendation: evaluate post-V1 only if the broader persona coverage justifies this additional fiscal boundary work.

## 15. Findings by severity

### BLOCKER — 0

No fiscal, result-consistency, privacy, dependency, or numeric-ownership defect was found.

### MAJOR — 5

1. Successful calculation does not bring the primary annual/monthly answer into the visible viewport at a common laptop size.
2. The valid low-RAL result above RAL lacks an explicit causal explanation and employer-versus-State-benefit distinction.
3. The normal-user explanation layer jumps too quickly into formulas, Rule IDs, and implementation-oriented terminology.
4. Mobile `Spiega` interaction updates an explanation almost entirely off-screen.
5. The 20rem body minimum width causes horizontal reflow failure at 320 CSS pixels/high zoom.

### MINOR — 3

1. The technical trace needs clearer optional/specialist framing.
2. The tablet SVG container has incidental internal horizontal overflow near the breakpoint.
3. Several primary/simple-layer terms should be made more neutral and user-oriented while preserving official terminology deeper in the experience.

### NOTE — 3

1. Apparently empty exclusions/source items were a copy-serialization artifact; semantic content is complete.
2. The present visual language is already coherent and should not be replaced with decorative polish or another dependency.
3. A future EUR 200,000 range is a domain-scope change requiring targeted fiscal revalidation.

## 16. Recommended minimal polish scope

One bounded M4 correction pass should:

1. make successful submission reveal the primary result while preserving correct focus announcement;
2. add the conditional low-RAL benefit explanation from canonical values;
3. add concise conceptual component copy and subordinate technical mechanics;
4. make mobile explanation activation visibly reveal the explanation;
5. fix 320-pixel/high-zoom reflow;
6. apply the three cheap copy/trace/tablet refinements where they do not expand scope;
7. add focused component/E2E regressions for these states and rerun the existing M3/M4 gates.

This work requires no fiscal-rule change, production dependency, new state system, architecture redesign, or independent fiscal review. M5 should wait until these product issues are reconciled and rechecked.

## 17. Validation performed

- Strict baseline commit/tree, branch, lifecycle, M2/M4 state, implementation presence, run-record presence, and clean-status pre-flight: passed.
- `npm ci`: passed with 243 packages and zero reported vulnerabilities. An initial attempt encountered a Windows file lock from the local preview process; after stopping the process, the clean install succeeded.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run format:check`: passed.
- Vitest: 118/118 passed across 10 files.
- Exhaustive domain validation: all 110,001 whole-euro RAL inputs passed in approximately 4.2 seconds; minimum modeled net IRPEF remained EUR 126.73 at RAL EUR 10,000.
- Playwright: 6/6 passed across desktop Chromium and mobile WebKit; automated main-state axe checks reported zero violations and runtime journey requests remained local.
- Production build: passed; CSS 21.88 kB / 5.00 kB gzip and JavaScript 296.15 kB / 92.25 kB gzip.
- Production dependency audit: zero known vulnerabilities.
- Manual browser/semantic/responsive/keyboard review: completed for the states and viewport sizes recorded above.
- Console review: no application warning or error observed.
- Documentation links and `git diff --check`: run after this record was added.

## 18. Final progression decision

Netto preserves the M3 fiscal and numeric contract, provides strong evaluator-facing transparency, and has a coherent product foundation. The five MAJOR issues are bounded and do not justify redesign, but they materially affect the core answer, the low-income trust case, mobile explanation discoverability, and WCAG-oriented reflow. They should be corrected before release hardening.

**M4 PRODUCT REVIEW REQUIRES POLISH**
