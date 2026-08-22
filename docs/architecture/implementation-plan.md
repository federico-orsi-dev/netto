---
title: Implementation Architecture & Execution Plan
status: implementation-ready
milestone: M2
date: 2026-08-22
baseline_commit: 73c1a0a61fe9c69a07109692da19fff9058f2e5e
---

# Implementation Architecture & Execution Plan

This document is the canonical implementation contract for the bounded Netto V1 estimator. It specializes the approved architecture and frozen M1 fiscal foundation; it does not replace the Product Specification, Fiscal Rule Catalog, Source Register, Test Strategy, or ADRs.

## 1. Executive decision summary

| Decision | Rationale | Alternatives considered | Trade-offs / consequences |
| --- | --- | --- | --- |
| One Vite/React application, not a monorepo | One product and one deployment artifact need no package boundary | Monorepo, separate domain package | Domain separation is enforced by folders/import rules and tests; extract only after a real second consumer exists |
| Pure TypeScript `calculateSalary2026` facade | Prevents React/browser coupling and year mixing | Generic tax service, UI formulas, remote API | A future year adds a sibling facade rather than dynamic rule interpretation |
| Explicit formulas plus typed data | The 15 rules include formulas, predicates, ordering, invariants, and policy; one representation would obscure them | Generic DSL, JSON formulas, code generation | Some repetition is accepted for auditability |
| `decimal.js` internally; integer euro cents publicly | Implements ADR-0003 and makes public reconciliation structural | JavaScript numbers, cents-only internals, public `Decimal` | Exact trace values also need serialized decimal strings |
| Flat canonical amount registry plus semantic references | Summary, chart, explanation, trace, accessibility, and tests reuse identical values | Each view receives copied amounts | Stable IDs add a small amount of typing but eliminate hidden recalculation |
| Local React state | The page has one input, one selector, one result, and local disclosures | Redux/Zustand/XState/context store | Recalculate cheaply on valid submission/selector change; no persistence or URL state |
| Direct React SVG plus semantic HTML | One fixed waterfall needs visual control, not a chart platform | HTML-only, geometry utility, chart library | Own a small tested layout function; simplify if accessibility/correctness suffers |
| Custom validation without a schema dependency | The input contract is one localized whole-euro value and a 12/13/14 union | Zod/Valibot, native number input only | Parser rules must be explicitly unit tested |
| Cloudflare Pages Git integration | Static `dist`, PR previews, and `_headers` satisfy deployment needs | Workers Static Assets, Direct Upload, Vercel | Cloudflare project connection remains a human external action |
| Three coding milestones after M2 | Separates fiscal correctness, product experience, and release risk | One large implementation milestone, many micro-milestones | M3/M4/M5 each has a meaningful independent review boundary |

No backend, database, router, global state library, charting library, runtime validation library, i18n framework, analytics SDK, remote fiscal configuration, dependency-injection framework, or generic rule engine is justified for V1.

## 2. Repository evidence map

| Evidence | Canonical owner | Implementation consequence |
| --- | --- | --- |
| Current phase and gates | [`PROJECT_STATE.md`](../../PROJECT_STATE.md) | M1 is frozen; M2 is documentation-only; M3 needs a new goal |
| User, scope, outputs, privacy | [Product Specification](../product/product-spec.md) | One Italian, local-only, whole-euro RAL flow with annual/monthly/payment outputs and progressive explanation |
| Runtime and boundaries | [Architecture](architecture.md), [ADR-0001](decisions/ADR-0001-client-only-static-runtime.md)–[ADR-0005](decisions/) | Static Vite/React, pure domain engine, decimal adapter, single result, repository audit |
| Fiscal behavior and fixtures | [Fiscal Rule Catalog](../domain/fiscal-rules-2026.md) | Exactly 15 verified rules may calculate; 9 exclusions are boundaries, never implicit zeroes |
| Provenance | [Source Register](../domain/source-register-2026.md) | Runtime metadata carries stable IDs and concise official links, not duplicated research prose |
| Monetary semantics | `POLICY-MONEY-2026-001` in the Fiscal Rule Catalog and [ADR-0003](decisions/ADR-0003-decimal-arithmetic-and-public-boundary.md) | 40-digit internal decimal precision, statutory precedence, component-first cent normalization, exact public reconciliation |
| Test obligations | [Test Strategy](../testing/test-strategy.md) | Rule, boundary, fixture, pipeline, invariant, UI, accessibility, and smoke layers |
| UX/accessibility/performance | Product Specification, Architecture, [Release Checklist](../delivery/release-checklist.md) | “Quanto mi rimane?” hierarchy, responsive semantic transformation, keyboard/non-color support, diagnostic performance checks |
| AI/review practice | [AI Workflow](../ai-engineering/workflow.md), [Independent Review Contract](../ai-engineering/contracts/independent-review.md) | Independent review only at high-risk boundaries; concise run records |
| M1 closure | [RUN-015](../ai-engineering/runs/2026-08-22-015-m1-fiscal-foundation-closure.md) | Lifecycle is 15 verified / 9 excluded / 0 candidate / 0 blocked; local due edge is boundedly excluded |

There is no separate design-system document. The durable technical design contract is currently distributed across Product Specification, Architecture, Test Strategy, and Release Checklist. M2 consolidates only implementation implications; exact brand tokens, typeface, illustrations, and final copy remain safe visual decisions for M4.

## 3. Confirmed V1 implementation scope

### Required for V1

- Italian raw RAL input, clear whole-euro/range validation, explicit calculate action.
- 2026 calculation for the single verified profile and RAL EUR 10,000–120,000 inclusive.
- Estimated annual net and estimated average monthly net (`annualNet / 12`) as separate outputs.
- 12/13/14 salary-payment selector, default 13, with average amount per contractual payment and the payslip limitation.
- Effective modeled burden based on the canonical gross-to-net delta.
- Semantic gross-to-net breakdown and accessible waterfall.
- Contextual explanation for every modeled component, including rule/source links and assumptions.
- Inspectable calculation trace for bases, brackets, formulas, statutory truncation, normalized public amounts, dependencies, and sources.
- Visible scenario assumptions, exclusions, methodology, authoritative sources, and local-calculation privacy statement.
- Responsive desktop/mobile behavior, keyboard operation, non-color semantics, and WCAG 2.2 AA target.

The interactive waterfall plus contextual “explain this number” behavior is a protected V1 differentiator, not an optional extra. It must remain one coherent flow rather than a dashboard of independent widgets.

### Deferred

- Other years, regions, municipalities, employer profiles, and personal circumstances.
- Employer cost, partial-year work, actual payslip timing, filing/CCNL/payroll precision.
- Shareable URL state: the privacy contract now explicitly excludes salary in URLs.
- Persistence, accounts, telemetry, analytics, backend/API, remote rules, and runtime network calls.
- Comparison, marginal-RAL simulator, export, year selector, and internationalization.
- Product name changes, exact visual tokens/typeface, domain name, release tag, and final screenshots until their owning milestone.

## 4. Runtime and source architecture

```text
Italian raw input
  -> UI parser and field feedback
  -> calculateSalary2026(validated request)
       -> fiscalContext2026 + internal decimal adapter
       -> ordered pure calculation stages
       -> invariant checks
       -> serializable CalculationResult
  -> summary / breakdown / explanation / trace / accessibility projections
```

All fiscal execution is synchronous, pure, deterministic, and local. The domain imports no React, DOM, browser, storage, network, visualization, or formatting APIs. The UI receives no formula functions.

### Proposed source tree

```text
package.json
package-lock.json
tsconfig*.json
vite.config.ts
eslint.config.js
index.html
public/
  _headers
src/
  main.tsx
  app/
    App.tsx
    CalculatorPage.tsx
  domain/
    calculation/
      contracts.ts
      errors.ts
      invariants.ts
    money/
      decimal-money.ts
      public-money.ts
    fiscal/
      ids.ts
      metadata.ts
      trace.ts
      2026/
        context-2026.ts
        ruleset-2026.ts
        sources-2026.ts
        calculate-salary-2026.ts
        contributions.ts
        national-tax.ts
        local-tax.ts
        compose-result.ts
        fixtures/
          boundaries.ts
          reference-scenarios.ts
  features/
    calculator/
      SalaryForm.tsx
      parse-ral-input.ts
    results/
      ResultSummary.tsx
      GrossToNetSection.tsx
      WaterfallChart.tsx
      BreakdownList.tsx
      ComponentExplanation.tsx
      CalculationTrace.tsx
    methodology/
      AssumptionsAndMethodology.tsx
      SourcesList.tsx
  content/
    it.ts
  ui/
    MoneyText.tsx
    Disclosure.tsx
    styles/
      tokens.css
      global.css
test/
  setup.ts
  e2e/
    calculator.spec.ts
    accessibility.spec.ts
.github/workflows/
  quality.yml
```

This is a target map, not a requirement to create an empty file for every leaf. Start coarser and split only at the named semantic boundaries. Tests may be colocated beside domain modules; fixtures have one canonical TypeScript owner under `domain/fiscal/2026/fixtures`.

### Import directions

- `domain/**` imports only `domain/**` and `decimal.js` through `domain/money/decimal-money.ts`.
- `features/**` may import public domain contracts and `ui/**`; features do not import each other.
- `app/**` composes features and owns page-level state.
- `ui/**` may consume public serializable domain types for formatting but never imports fiscal configuration or formulas.
- `domain/**` never imports `app`, `features`, `content`, or `ui`.

ESLint restricted-import rules enforce the critical directions; avoid a dependency-injection container or separate package.

## 5. Calculation-engine public contract

The only V1 fiscal entry point is year-bound:

```ts
type SalaryPaymentsPerYear = 12 | 13 | 14;

interface SalaryCalculationInput {
  readonly annualGrossSalaryEuro: number; // finite whole euros
  readonly salaryPaymentsPerYear: SalaryPaymentsPerYear;
}

type CalculationOutcome =
  | { readonly ok: true; readonly result: SalaryCalculationResult }
  | { readonly ok: false; readonly issues: readonly InputIssue[] };

declare function calculateSalary2026(
  input: SalaryCalculationInput,
): CalculationOutcome;
```

`calculateSalary2026` is bound to exactly one `fiscalContext2026`; callers cannot inject rates, year, profile, or rounding. Internal stage functions accept explicit typed stage inputs and the same immutable context. A second year adds a sibling facade after fiscal approval; V1 has no dynamic year registry.

The domain repeats finite/integer/range/payment-count guards even after UI parsing. Unsupported values never enter formula stages.

## 6. Domain data model and result schema

### Public primitive types

```ts
interface MoneyAmount {
  readonly currency: "EUR";
  readonly minorUnits: number; // safe integer cents
}

type DecimalString = string; // canonical plain base-10 serialization
type FiscalYear = 2026;
type FiscalProfileId = "it-2026-milan-industrial-cigs-v1";
```

`MoneyAmount` is the only public monetary representation. No `Decimal` instance, binary-float fiscal amount, localized string, or formatted currency crosses the domain boundary.

### Canonical amount registry

`SalaryCalculationResult.amounts` is a readonly record keyed by a closed `CalculationAmountId` union. It owns all public monetary values: gross salary; contributable/pension/tax bases; individual and aggregate contributions; IRPEF bracket components and total; employment/cuneo deductions; net IRPEF; cash benefits; regional bracket components and total; municipal/local totals; outflows; cash benefits; modeled burden; annual net; average monthly net; and selected average salary payment.

Other result sections reference amount IDs instead of copying monetary values:

```ts
interface SalaryCalculationResult {
  readonly metadata: {
    readonly fiscalYear: 2026;
    readonly rulesetId: "it-2026-v1";
    readonly profileId: FiscalProfileId;
    readonly moneyPolicyId: "POLICY-MONEY-2026-001";
    readonly evaluatedRuleIds: readonly VerifiedRuleId[];
    readonly appliedRuleIds: readonly VerifiedRuleId[];
  };
  readonly input: {
    readonly annualGrossSalaryAmountId: "annualGrossSalary";
    readonly salaryPaymentsPerYear: SalaryPaymentsPerYear;
  };
  readonly amounts: Readonly<Record<CalculationAmountId, MoneyAmount>>;
  readonly summary: {
    readonly annualNetAmountId: "annualNet";
    readonly averageMonthlyNetAmountId: "averageMonthlyNet";
    readonly averageSalaryPaymentAmountId: "averageSalaryPayment";
    readonly modeledBurdenAmountId: "modeledBurden";
    readonly effectiveBurdenBasisPoints: number;
  };
  readonly components: Readonly<Record<CalculationComponentId, CalculationComponent>>;
  readonly breakdownOrder: readonly CalculationComponentId[];
  readonly trace: readonly CalculationTraceEntry[];
  readonly assumptions: readonly AssumptionReference[];
  readonly exclusions: readonly ExclusionReference[];
  readonly sources: readonly SourceReference[];
}
```

`effectiveBurdenBasisPoints` is a domain-produced product metric: half-up basis points of `modeledBurden / annualGrossSalary`. The UI formats it but never recomputes it.

### Totals and signs

- `totalOutflows = employeeContributions + netIrpef + regionalTax + municipalTax`.
- `totalCashBenefits = cuneoCashSum + treatmentIntegrativo`.
- `modeledBurden = totalOutflows - totalCashBenefits`.
- `annualNet = annualGrossSalary - modeledBurden`.
- `averageMonthlyNet = normalize(annualNet / 12)`.
- `averageSalaryPayment = normalize(annualNet / salaryPaymentsPerYear)`.

All `MoneyAmount` values are non-negative. Direction (`start`, `subtract`, `add`, `end`, `informational`) lives on semantic components rather than being encoded as negative money.

`evaluatedRuleIds` records verified predicates/stages considered for the request; `appliedRuleIds` records rules that materially produced the result. A verified rule may legitimately evaluate to a zero/not-applicable outcome and still have an eligibility trace. Excluded rules appear only in `exclusions`, never in either rule list or as synthetic zero components. `breakdownOrder` contains only final monetary changes relevant to the current result; zero eligibility outcomes remain inspectable in trace.

## 7. Money implementation

`domain/money/decimal-money.ts` is the sole `decimal.js` import site.

1. Configure 40 significant decimal digits.
2. Construct fiscal numbers only from integer values or canonical decimal strings in the ruleset; never from imprecise computed JavaScript numbers.
3. Apply verified statutory operations first. `truncatePositiveRatio4` is a named operation owned by `RULE-NAT-EMPLOYMENT-DEDUCTION-2026` and truncates, never rounds.
4. Normalize each publicly exposed aggregation child to EUR 0.01 with decimal half-up unless a verified rule says otherwise.
5. Build each displayed aggregate from normalized child cents, then convert that reconciled aggregate back to internal decimal for downstream handoffs.
6. Serialize public money to safe integer cents; serialize useful exact trace values as plain decimal strings.
7. Normalize negative zero to zero.
8. Format only in the UI with `Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" })`; formatting never feeds calculation.

Integer cents alone are rejected for internals because verified percentages and statutory four-decimal truncation require sub-cent/exact decimal intermediates. A custom BigInt/rational implementation would duplicate a decimal library and increase correctness risk.

## 8. Fiscal configuration and versioning

`FiscalRuleset2026` is a readonly TypeScript value with literal year/profile/policy IDs, decimal-string rates, whole-euro thresholds, bracket arrays, rule metadata, verified Rule IDs, excluded Rule IDs, assumption IDs, and source metadata. Use `as const` plus `satisfies FiscalRuleset2026`; freeze in development if useful.

Executable formulas remain named pure functions. Configuration owns values that are naturally data (rates, thresholds, identifiers, bracket widths); code owns conditional formulas, ordering, statutory truncation, capacity rules, and invariants.

Runtime integrity checks/tests assert:

- ruleset year/profile/policy IDs are internally consistent;
- all 15 verified Rule IDs appear in executable metadata;
- all 9 excluded Rule IDs appear only as boundaries/limitations;
- every applied rule references registered Source IDs;
- no rule ID from another year is accepted;
- the local-due bounded-exclusion invariant remains true over the supported range.

Do not add a generic country/year registry, JSON loader, remote configuration, or rule plugin interface before a second approved year demonstrates need.

## 9. Mapping the 15 verified rules to code

| Rule ID | Primary code responsibility | Dependencies | Inputs | Outputs | Required tests |
| --- | --- | --- | --- | --- | --- |
| RULE-INPS-2026-001 | Assumption-bound identity stage | input guard, profile metadata | whole-euro RAL | contributable remuneration | min/max, 56,223/224/225, identity, profile/assumption trace |
| RULE-INPS-2026-002 | Explicit percentage formula | 001, money normalization | pension base, 9.19% | public IVS component | exact/public values at 10k, 56,224, 120k; no aggregate claim |
| RULE-INPS-2026-003 | Threshold predicate and excess formula | 001/004, IVS profile | pension base, EUR 56,224, 1% | additional IVS | 56,223/224/225; upper range; installment invariance |
| RULE-INPS-2026-004 | Typed ceiling configuration and in-range no-op invariant | contribution base, profile metadata | base, EUR 122,295, eligibility | pension base | 120k both eligibility branches; isolated 122,294/295/296 config tests |
| RULE-INPS-2026-005 | Profile guard, ordered component aggregation, downstream handoff | 001–004, CIGS 0.30%, money policy | normalized IVS/additional/CIGS | total contributions | component-first 10,004/005/006; profile identity; exact aggregate reconciliation |
| RULE-NAT-BASE-2026 | Ordinary taxable-income subtraction | 005 | RAL, total contributions | taxable income/common local base | representative RALs; contributions alter every downstream base |
| RULE-NAT-GROSS-IRPEF-2026 | Progressive bracket slicing | national base, bracket config | taxable income | three bracket components, gross IRPEF | 27,999/28,000/28,001 and 49,999/50,000/50,001; component sum |
| RULE-NAT-EMPLOYMENT-DEDUCTION-2026 | Piecewise formula, EUR 65 adjustment, statutory `trunc4` | taxable income, money adapter | income, full-year days | employment deduction | all documented bands; 24,999/25,000/25,001; 34,999/35,000/35,001; 49,997/998/999 |
| RULE-NAT-CUNEO-DEDUCTION-2026 | Eligibility, fixed amount, phase-out, capacity input | taxable/adjusted income | income, gross tax capacity | cuneo deduction | 19,999/20,000/20,001; 31,999/32,000/32,001; 39,999/40,000/40,001 |
| RULE-NAT-NET-IRPEF-2026 | Ordered deduction capacity and zero floor | gross IRPEF, employment/cuneo deductions | normalized tax/deductions | net IRPEF | capacity floor; cash benefits excluded; aggregate reconciliation |
| RULE-NAT-CUNEO-SUM-2026 | Eligibility and three-rate non-taxable cash formula | employment/adjusted income | income, 7.1/5.3/4.8% | cash sum | 8,499/8,500/8,501; 14,999/15,000/15,001; 19,999/20,000/20,001 |
| RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026 | Strict capacity predicate and full-year cash amount | gross employment tax, employment deduction | income, capacity values | treatment integrativo | 8,173/8,174/8,175; strict comparison; coexistence with cuneo sum |
| RULE-LOMBARDY-2026-001 | Four progressive marginal slices | taxable/common base, money policy | base, four rates/bands | regional components/total | 14,999/15,000/15,001; 27,999/28,000/28,001; 49,999/50,000/50,001 |
| RULE-MILAN-2026-001 | Inclusive exemption predicate and whole-base formula | common base, Milan profile | base, EUR 23,000, 0.8% | municipal tax | 22,999/23,000/23,001; whole-base cliff; profile metadata |
| RULE-LOCAL-2026-ORDER | Pipeline ordering and annual-net composition | all prior verified stages, approved local-edge exclusion | normalized components | totals, annual net, breakdown | representative full engine; sibling-base independence; cash signs; annual/component reconciliation |

The table is an implementation index; formulas and evidence remain canonical in the Fiscal Rule Catalog.

## 10. Handling the 9 excluded rules

| Excluded Rule ID | Runtime treatment | Enforcement / reopening signal |
| --- | --- | --- |
| RULE-INPS-2026-006 | No minimum-remuneration formula or zero component; emit limitation and lawful-remuneration assumption | Input/profile contract and methodology test; reopen for CCNL/compliance scope |
| RULE-INPS-2026-007 | No normative rounding function; reference product money policy | Test no payroll-rounding claim; reopen for reporting precision |
| RULE-INPS-2026-008 | No period/payslip inputs or simulation | Input type excludes periods; installment label test |
| RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026 | No universal-zero row; emit excluded-personal-facts limitation | Result exclusions and methodology copy; reopen when deduction/history inputs exist |
| RULE-NAT-SPECIAL-PAY-2026 | Treat RAL as ordinary pay under assumption; do not add special rates | No decomposed-pay fields; reopen on special-pay feature |
| RULE-NAT-PERSONAL-RELIEFS-2026 | No personal deduction inputs/components | Input/schema and methodology tests |
| RULE-LOCAL-2026-001 | Do not implement or fake the unresolved predicate; calculate verified local rules for supported inputs and guard the EUR 126.73 minimum invariant | Exhaustive range test; any failure or scope/year change stops the affected local stage and reopens this rule |
| RULE-LOCAL-2026-ROUNDING | Use product policy only; disclose non-return/non-payroll precision | Trace distinguishes policy from rule; reopen for exact filing/payroll claims |
| RULE-LOCAL-2026-WITHHOLDING | No advance/balance or payslip schedule | Result contains annual liability only; UI limitation test |

Excluded IDs may appear in result limitations and tests. They must not appear in `appliedRuleIds`, execute a formula, or contribute a zero amount that implies calculation.

## 11. Canonical calculation pipeline

| Stage | Input | Output | Rule/policy | Precision boundary | Downstream |
| --- | --- | --- | --- | --- | --- |
| 0. Validate | raw typed request | validated branded request or issues | supported V1 contract | finite whole-euro checks only | all stages |
| 1. Establish profile/base | RAL, fixed context | contributable remuneration | INPS-001 + approved assumption | exact whole euros | pension/contributions |
| 2. Pension base | contributable remuneration | pension base | INPS-004 | verified whole-euro ceiling; inactive in range | IVS components |
| 3. Contributions | pension/base values | IVS, additional IVS, CIGS, total | INPS-002/003/005 | exact formula -> normalize each public child -> exact sum -> downstream total | tax base, annual net |
| 4. Taxable income | RAL, contribution total | national/local common base | NAT-BASE | subtract reconciled public contribution total | national/local taxes |
| 5. Gross IRPEF | taxable income | bracket children, gross IRPEF | NAT-GROSS | exact slices -> normalize children -> exact sum | deductions/capacity |
| 6. Deductions/net tax | taxable income, gross IRPEF | employment deduction, cuneo deduction, net IRPEF | NAT-EMPLOYMENT-DEDUCTION, NAT-CUNEO-DEDUCTION, NAT-NET-IRPEF | statutory `trunc4` before normalization; capacity and zero floor; normalized handoffs | local invariant, totals |
| 7. Cash benefits | employment/adjusted income, gross tax/deduction capacity | cuneo sum, low-income treatment | NAT-CUNEO-SUM, NAT-TREATMENT-INTEGRATIVO-LOW | exact formulas -> public component normalization | annual net |
| 8. Local liabilities | unchanged common base, fixed domicile | regional bracket total, municipal tax | LOMBARDY-001, MILAN-001; LOCAL-001 excluded | regional children normalized then summed; municipal component normalized | annual net |
| 9. Compose | all public components | outflows, cash total, burden, annual/monthly/payment net | LOCAL-ORDER + POLICY-MONEY | aggregate normalized cents; presentation divisions half-up | public result |
| 10. Verify/serialize | internal stage state | immutable public result and trace | invariants + ADR-0004 | safe integer cents, decimal strings, no `Decimal` leakage | UI |

Each stage returns a new readonly object. No shared mutable accumulator, implicit hooks, or rule dispatch loop is used. Named stage types prevent passing gross IRPEF where taxable income is required.

## 12. Calculation trace and explanation model

```ts
interface CalculationTraceEntry {
  readonly id: TraceEntryId;
  readonly purposeKey: ExplanationKey;
  readonly ruleIds: readonly VerifiedRuleId[];
  readonly sourceIds: readonly SourceId[];
  readonly inputAmountIds: readonly CalculationAmountId[];
  readonly dependsOn: readonly TraceEntryId[];
  readonly formula: {
    readonly expression: string;
    readonly parameters: readonly TraceParameter[];
  };
  readonly exactOutput?: DecimalString;
  readonly publicOutputAmountId?: CalculationAmountId;
  readonly assumptionIds: readonly AssumptionId[];
}
```

Trace entries are authored by named fiscal stages, not reconstructed in React. `expression` is concise and deterministic (for example `base × 9.19%`), not executable code or a symbolic-math language. Parameters are typed money/rate/threshold/boolean values already calculated by the domain.

Eligibility traces distinguish `applied`, `not_applicable`, and `inactive_in_supported_range` for verified rules. They do not use `excluded`, which is reserved for the nine scope boundaries outside calculation.

`CalculationComponent` provides the shared semantic identity used by breakdown, waterfall, detail panel, accessible list, and tests: stable ID, amount ID, direction, label/explanation key, trace-entry ID, Rule IDs, Source IDs, and optional child component IDs. The UI maps keys to Italian prose in `content/it.ts`; it does not own bases, formulas, rates, applicability, or amounts.

The waterfall sequence contains only final take-home changes: starting RAL; aggregate employee contributions; net IRPEF; regional tax; municipal tax; non-taxable cuneo sum; treatment integrativo; ending annual net. Taxable income, gross IRPEF, brackets, employment deductions, and cuneo deduction remain trace/detail nodes so presentation order does not imply a false fiscal base.

## 13. Frontend boundaries and state

### Page/component boundaries

- `CalculatorPage`: page-level raw input, selected payment count, submitted outcome, and selected explanation component.
- `SalaryForm`: controlled Italian input, validation feedback, and calculate action.
- `ResultSummary`: annual/monthly/payment net and effective burden; primary “Quanto mi rimane?” hierarchy.
- `GrossToNetSection`: chart/list/detail coordination for “Dove è andato il resto?”.
- `WaterfallChart`: visual-only SVG projection over canonical signed breakdown components.
- `BreakdownList`: semantic ordered interactive representation and mobile primary view.
- `ComponentExplanation`: selected component metadata, formula trace, assumptions, and source links.
- `CalculationTrace`: progressively disclosed complete trace; separate from waterfall.
- `AssumptionsAndMethodology` / `SourcesList`: fixed scenario, exclusions, precision, privacy, and canonical official links.

Do not split generic card, stack, row, icon, or heading components until repetition is real. CSS custom properties own colors, spacing, type scale, radii, focus styles, and semantic positive/subtractive/neutral tokens; CSS Modules own feature layout. Use a system font stack initially and no network font request.

### State ownership

- Persistent for current page session only: raw RAL text, 12/13/14 selector (default 13), last successful result.
- Derived: parsed input, field issues, result projections, formatted values, selected component metadata.
- Presentation-only: selected component ID and disclosure open states; keep local to the nearest owner.
- On any RAL edit, clear the previous result to prevent stale salary/result mismatch. On payment-count change after a valid result, call the same year-bound domain facade again; annual fiscal components must remain identical.
- No context store, external state library, local/session storage, URL state, query string, or server state.

No separate “application layer” folder is created: `CalculatorPage` performs the only orchestration—parse, call the domain facade, retain the outcome, and compose views. Extract a hook only if this logic becomes difficult to read or test.

## 14. Visualization contract

[ADR-0006](decisions/ADR-0006-direct-svg-and-semantic-html-waterfall.md) resolves the technology choice.

- A pure presentation helper converts ordered public cents and directions into SVG coordinates. It may calculate scales, positions, bar heights, and connector positions only.
- It must not calculate tax, totals, bases, or signs; direction and all amounts arrive from `CalculationComponent`.
- SVG uses a stable `viewBox`, visible labels/values, pattern/icon/text cues in addition to color, and `aria-hidden="true"` because semantic HTML owns accessibility.
- Pointer selection on SVG updates the same selected component ID used by the semantic list. Keyboard selection operates through native HTML buttons/list items.
- Desktop shows SVG, semantic breakdown/legend, and contextual detail. Mobile makes the HTML vertical sequence primary and may omit the SVG entirely with CSS.
- No animation is required. Any short transition must respect `prefers-reduced-motion` and never delay understanding.
- Geometry tests assert finite coordinates, preserved input order, monotonic cumulative baseline transitions, and exact final amount reference. Avoid pixel snapshots.

## 15. Input validation and error model

Use `<input type="text" inputMode="decimal">` rather than `type="number"` so Italian grouping can be handled deliberately without browser-locale inconsistencies.

The pure UI parser accepts trimmed ungrouped digits (`30000`) or valid Italian thousands grouping (`30.000`), with an optional `,00`. It rejects signs, exponents, currency symbols, malformed grouping, non-zero decimals, and mixed separators. Live auto-formatting is avoided to preserve caret behavior; formatted examples and blur behavior may be refined in M4.

Issue codes:

- `required`
- `invalid_format`
- `whole_euros_required`
- `below_supported_range`
- `above_supported_range`
- `unsupported_payment_count`

Do not clamp, coerce partial numbers, or silently remove unsupported decimals. Italian UI copy maps codes to messages and states the EUR 10,000–120,000 range.

Expected user/input problems return the discriminated `CalculationOutcome`; exceptions are not ordinary control flow. One internal `InvariantViolation` error is sufficient for impossible configuration/programmer states (unsafe cents, missing amount ID, year mismatch, reconciliation failure, Decimal leakage). Such failures are caught by tests and may render a generic fatal fallback in production; no large error hierarchy is needed.

## 16. Test architecture

### Domain and rule tests

- One focused suite per verified rule or tightly coupled stage, explicitly naming Rule IDs.
- Test exact pre-normalization values and normalized public cents separately.
- Import M1 fixture values from `domain/fiscal/2026/fixtures`; never transcribe copies into UI tests.

### Boundaries and golden scenarios

- Implement every threshold set in the Fiscal Rule Catalog, including the article-13 49,997/49,998/49,999 and contribution 56,223/224/225 transitions.
- Golden full-engine RAL: 10,000; 15,000; 20,000; 28,000; 35,000; 40,000; 55,240; 55,241; 56,224; 75,000; 120,000.
- Goldens assert every meaningful amount ID, applied Rule IDs, sources, assumptions, exclusions, trace dependency, and annual result—not only net.

### Pipeline invariants

- Deterministic deep equality for repeated identical input.
- Every public money value has `EUR`, safe-integer non-negative cents, and no negative zero.
- Every aggregate equals the exact sum/difference of its declared normalized children.
- Annual net equation and breakdown end balance reconcile exactly.
- Payment-count changes alter only selected average-payment metadata/value.
- No `Decimal` instance exists anywhere in the serialized public result.
- Every applied Rule ID is verified; every source reference exists; excluded rules do not execute or create zero rows.
- Exhaustively enumerate all 110,001 whole-euro RAL inputs: no throw/NaN, finite results, input/output reconciliation, and net IRPEF minimum at least EUR 126.73. This is a normal Vitest loop; no property-testing dependency is needed.
- Do not assert global net-salary monotonicity unless verified around every cliff; the Milan whole-base threshold is a known reason for caution.

### UI/integration tests

- Empty/malformed/out-of-range input and no silent clamping.
- Primary valid flow and all three salary-payment choices.
- Annual result unchanged by payment count.
- Summary, breakdown, explanation, trace, and accessibility list resolve the same amount/component IDs.
- Explain-this-number selection by pointer and keyboard.
- Assumptions, limitations, source links, and local privacy copy are present.
- Prefer behavior assertions; no broad component snapshots.

### Accessibility and browser tests

- React Testing Library checks labels, error associations, headings, disclosure state, and keyboard activation.
- Playwright runs the primary flow in Chromium desktop and WebKit mobile projects.
- `@axe-core/playwright` scans the result state; automated scans supplement, not replace, manual keyboard, focus, contrast, zoom/reflow, reduced-motion, and screen-reader checks.
- Target WCAG 2.2 AA for the supported flow. The chart remains understandable without color, pointer, hover, or SVG accessibility support.

## 17. Source traceability in code

The navigation path is:

```text
named stage/function
  -> verified Rule ID in ruleMetadata2026
  -> Source IDs
  -> sourceCatalog2026 concise metadata
  -> canonical Source Register / official URL
```

`ruleMetadata2026` stores Rule ID, source IDs, explanation key, and trace purpose. `sourceCatalog2026` stores only stable ID, issuer, concise title, official URL, and accessed date needed by the product. Research conclusions, conflict notes, and legal prose remain in Markdown.

Use one concise Rule-ID comment at non-obvious formula/truncation boundaries. Do not paste legal paragraphs into code. A consistency test compares runtime IDs with an explicit 15-ID verified manifest and fails on orphaned/missing sources.

## 18. Dependency budget

### Runtime

| Dependency | Concrete problem | Why platform code is insufficient | Cost/constraint |
| --- | --- | --- | --- |
| `react`, `react-dom` | Approved component/runtime architecture | Native DOM would discard the approved React baseline and increase bespoke orchestration | Existing architectural choice; no companion framework |
| `decimal.js` | Deterministic exact decimal percentages, truncation, and half-up normalization | Binary floating point risks money-policy violations; custom decimal/rational code is higher risk | Single fiscal runtime dependency; imported only through adapter |

### Development-only

| Dependency group | Purpose | Constraint |
| --- | --- | --- |
| TypeScript, Vite, `@vitejs/plugin-react` | strict compilation and static build | Pin compatible stable versions in lockfile at M3 scaffold |
| ESLint, typescript-eslint, React hooks/refresh plugins | import boundaries and correctness linting | One flat config; avoid style-rule duplication with Prettier |
| Prettier | deterministic formatting | Formatting only |
| Vitest, jsdom | domain/component test runner | One runner for pure and component tests |
| React Testing Library, user-event, jest-dom | semantic UI behavior | No Enzyme or snapshots by default |
| Playwright, `@axe-core/playwright` | primary browser flows and automated accessibility diagnostics | Two small projects; no visual-regression service |

Rejected: Zod/Valibot, Redux/Zustand/XState, React Router, D3/charting libraries, CSS framework/component kit, i18n framework, property-test framework, date library, HTTP client, analytics SDK, Cloudflare Vite plugin, Wrangler baseline dependency, and backend packages.

Exact dependency versions are safely chosen during M3 scaffold from mutually compatible current stable releases and committed in `package-lock.json`; choosing patch versions now provides no architectural value.

## 19. Build and quality baseline

- TypeScript: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `useUnknownInCatchVariables`, and `verbatimModuleSyntax` where tool compatibility permits.
- Scripts: `dev`, `build`, `preview`, `format`, `format:check`, `lint`, `typecheck`, `test`, `test:watch`, and `test:e2e`.
- One GitHub Actions workflow: `npm ci`; formatting; lint; typecheck; Vitest; production build; then bounded Playwright Chromium/WebKit smoke. Cache npm, not generated artifacts as truth.
- Run `npm audit --omit=dev --audit-level=high`; any failure is triaged rather than hidden. Do not add a separate scanner without a demonstrated gap.
- Browser contract: current and previous stable Chrome/Edge/Firefox/Safari and current iOS Safari; CI directly exercises Chromium and WebKit, with Firefox spot-check before release.
- Accessibility target: WCAG 2.2 AA for the primary flow.
- Performance: inspect Vite bundle output and dependencies; verify no runtime network requests, no material layout instability, and imperceptible synchronous calculation. Lighthouse/Web Vitals remain diagnostic, with no vanity byte/score threshold.
- Security/privacy: no secrets or runtime environment variables; restrictive static headers; no salary URL/storage/network/telemetry path; external links use safe new-tab behavior only when product UX chooses a new tab.

## 20. Cloudflare deployment architecture

[ADR-0007](decisions/ADR-0007-cloudflare-pages-static-deployment.md) resolves deployment.

- Artifact: Vite `dist/` static files.
- Pages build command: `npm run build`; dependency install uses the committed npm lockfile (`npm ci` in CI and platform-compatible locked install in Pages).
- Root directory: repository root.
- Runtime environment variables: none. Fiscal rules and source metadata are bundled, versioned code.
- Routing: one root page, no React Router, no SPA rewrite. Add `_redirects` only if a future approved route requires it.
- Headers: `public/_headers` owns CSP, frame protection, content-type sniffing protection, referrer policy, and proportionate permissions policy; verify actual preview responses before release.
- Preview: Cloudflare Pages Git integration creates branch/PR previews. Smoke-test valid/invalid calculation flow, mobile layout, sources, headers, and absence of outbound runtime requests.
- Production: production branch deployment only after the release human gate. Custom domain/DNS remain human-owned P2/release decisions.
- No repository deploy script or Wrangler dependency in V1. A manual CLI upload is an operational fallback only if later approved.

M2 performs no Cloudflare connection, project creation, domain mutation, or deployment.

## 21. Implementation sequence

Three coding milestones contain eight meaningful work packages.

| Milestone / package | Objective and expected modules | Dependencies | Acceptance criteria and checks | Independent review |
| --- | --- | --- | --- | --- |
| M3.1 Toolchain scaffold | package/lockfile, Vite React shell, strict TS, lint/format, Vitest, CI skeleton | M2 plan | clean install; format/lint/typecheck/test/build scripts pass; no product logic | Routine owner review only; dependency-diff inspection |
| M3.2 Money and public contracts | `domain/money`, calculation contracts/errors/invariants | M3.1, ADR-0003/4 | component-first 10,004/005/006; statutory trunc helper; serialization/no-Decimal tests | Required independent review of arithmetic and boundary design |
| M3.3 2026 context and pipeline | ruleset/source metadata and four named calculation stages | M3.2, 15 verified rules | every rule/boundary suite passes; no excluded rule executes; explicit ordering/types | Required independent fiscal-code mapping review against catalog |
| M3.4 Result, trace, and full fixtures | amount registry, components, trace, goldens, exhaustive range | M3.3 | all reference scenarios and 110,001-input invariant pass; result deep-serializes; exact reconciliation | M3 gate: independent money/pipeline/trace review; resolve major findings |
| M4.1 Application vertical slice | `App`, `CalculatorPage`, parser/form, textual summary | M3 accepted | invalid/valid flow; annual/monthly/payment outputs; no duplicate calculations/state | Routine implementation review |
| M4.2 Explainability experience | breakdown, direct SVG, semantic list, contextual detail, trace, methodology/sources | M4.1, ADR-0006 | shared component IDs; accessible pointer/keyboard selection; no chart fiscal math | Independent cross-layer numeric ownership and UX review |
| M4.3 Responsive/accessibility polish | CSS tokens/modules, desktop/mobile hierarchy, focus/contrast/reflow | M4.2 | WCAG-oriented component/Playwright checks; mobile semantic transformation; reduced-motion behavior | Independent accessibility/UI review |
| M5 Release hardening | `_headers`, complete CI/browser smoke, bundle/network/header inspection, README/screenshots/deployment readiness | M4 accepted, ADR-0007 | release checklist evidence complete; preview smoke after separately authorized Cloudflare setup; no unresolved major findings | Independent release readiness review plus human release gate |

Do not combine M3 fiscal-core ownership and its independent review in one agent role. Routine React components do not require separate governance cycles.

## 22. Risks and mitigations

| Risk | Mitigation / stop condition |
| --- | --- |
| UI becomes a second engine | Amount registry/component IDs; restricted imports; integration tests forbid view-specific fiscal derivation |
| Wrong rounding stage | Single decimal adapter; stage table; exact/public paired fixtures; component aggregate assertions |
| Year/profile mixing | Year-bound facade and literal ruleset/profile metadata; no dynamic registry |
| Exclusion silently becomes zero | Exclusion references/limitations, no zero rows, explicit tests; Local-001 invariant failure reopens only that dependency |
| Trace drifts from calculation | Stages emit trace with their outputs; UI consumes trace IDs; golden assertions include trace |
| Custom waterfall grows | Fixed sequence, visual-only layout helper, semantic HTML primary accessibility path, simplification escape hatch |
| M1 documentation and code diverge | Rule/source consistency tests and change-impact review; fiscal changes require reopening the exact Rule ID |
| Localized input ambiguity | Strict documented parser, no silent coercion/clamping, boundary tests |
| Deployment adds runtime code | Pages-only ADR and no Wrangler/Function dependency; external setup gated |
| Documentation theatre | One implementation owner document plus two material ADRs; no duplicate domain/design vaults |

## 23. Explicit non-goals

- Reopening M1, researching new fiscal scenarios, or changing verified formulas without a specific contradiction.
- Executable implementation, scaffold, dependencies, tests, or deployment during M2.
- General tax/rule platform, plugin architecture, service/API boundary, server rendering, backend, database, or remote configuration.
- Exact payslip, filing, withholding schedule, CCNL compliance, employer cost, or personal tax return.
- Multi-year UI, internationalization, accounts, persistence, analytics, sharing, comparison, export, or simulator features.
- Pixel-perfect visual tokens, marketing site, domain purchase, production deployment, tag, or release.

## 24. Adversarial architecture review

- Unnecessary layers removed: no application-service package, repository/domain package split, DI container, rule engine, global store, router, or backend.
- Unnecessary dependencies removed: validation, charting, state, property-test, CSS, i18n, Cloudflare runtime/deploy libraries.
- Numeric ownership is structural: public cents live once in `amounts`; chart/explanation/trace reference IDs.
- Fiscal-year mixing is prevented by the `calculateSalary2026` facade and literal context.
- Money policy is bypass-resistant because `decimal.js` is imported once and every downstream aggregate uses normalized cents.
- Calculation order is explicit in named typed stages, not hidden in rule iteration.
- Exclusions are visible metadata/limitations with tests and reopening triggers, never zero-valued formulas.
- Domain tests require no React or browser.
- SVG geometry is presentation-only and replaceable without changing domain contracts.
- Cloudflare compute was rejected because no server behavior exists.
- The only deliberate duplication is human-readable fiscal Markdown versus explicit executable formulas, which ADR-0002 requires and traceability tests control.

No unresolved architectural choice can force expensive V1 rework.

## 25. Definition of Ready for implementation

Coding may begin when all statements below remain true:

- M1 lifecycle is exactly 15 verified, 9 excluded, 0 candidate, 0 blocked.
- Product input/output/privacy scope and the nine exclusion boundaries are unchanged.
- ADR-0001–ADR-0007 and this plan are accepted repository state.
- The year-bound calculation API, public cents model, amount registry, pipeline order, trace model, import rules, visualization contract, and deployment shape are the implementation baseline.
- Every verified rule has a named code responsibility and fixture owner.
- Money, fiscal pipeline, cross-layer numeric ownership, accessibility, and release review gates have named independent-review points.
- Runtime and development dependency budgets are explicit; exact compatible versions are the only scaffold-time dependency decision.
- Cloudflare account/project/domain setup is not required to implement or test locally and remains externally gated.
- There is a new explicit M3 implementation goal. M2 completion alone does not authorize coding.

Safe implementation-time decisions that do not block readiness: exact compatible dependency versions, final file splitting inside the documented boundaries, exact CSS token values/typeface, final Italian copy editing that does not alter fiscal meaning, and final Cloudflare project/domain names.

## 26. Expected first implementation milestone

**M3 — Deterministic Domain Engine** implements packages M3.1–M3.4 and stops after the independently reviewed, serializable engine/result/trace passes all verified fixtures and the full-range invariant. It must not optimize visual polish or deploy. Its completion phrase and human gate are defined by the future M3 goal, not by this document.
