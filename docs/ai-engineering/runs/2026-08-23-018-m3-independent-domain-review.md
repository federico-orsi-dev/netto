---
run_id: RUN-2026-08-23-018
date: 2026-08-23
tool: codex
role: independent-domain-reviewer
task: m3-independent-domain-review
status: completed
owner: codex
reviewer: human
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
commit: null
---

# M3 independent domain review

## Objective and decision

Independently determine whether M3 faithfully implements the approved M1 fiscal foundation and M2 architecture, and whether M4 can consume the domain result without reproducing or correcting fiscal logic.

**Decision:** `M3 DOMAIN REVIEW PASSED — READY FOR M4`.

The review found no blocker or major defect. All 15 verified rules pass implementation review, all 9 excluded rules remain contained, and the high-risk money, Article 13, local-edge, result-registry, and exhaustive-range contracts reproduce. One minor trace-maintainability finding does not change any current formula, amount, Rule ID, source, ordering dependency, or M4 architecture.

This independent review is not release approval and does not authorize fiscal lifecycle changes.

## Baseline and pre-flight

- Repository root: the isolated M3 review worktree.
- Branch: `m1/verified-fiscal-foundation`.
- Reviewed HEAD: `3af0da8cc3ba7d86d6f74121900f62a04d4ef897`.
- Reviewed tree: `b132d58c4083a037a3b5e4a8d97fecbff546767f`.
- Expected commit/tree: exact match.
- Worktree before review: clean.
- Fiscal lifecycle: 15 verified, 9 excluded, 0 candidate, 0 blocked, 0 rejected.
- M2: closed with no blocking architecture decision.
- M3 record: [RUN-2026-08-23-017](2026-08-23-017-m3-deterministic-domain-engine.md) exists.
- Domain/application implementation: present.
- Product UI: intentionally limited to the M3 placeholder shell; no M4 feature was present or added.

## Scope and evidence inspected

Canonical evidence:

- [Project state](../../../PROJECT_STATE.md)
- [Product specification](../../product/product-spec.md)
- [Architecture](../../architecture/architecture.md)
- [Implementation plan](../../architecture/implementation-plan.md)
- [Fiscal Rule Catalog](../../domain/fiscal-rules-2026.md)
- [Source Register](../../domain/source-register-2026.md)
- [Test strategy](../../testing/test-strategy.md)
- ADR-0001 through ADR-0007
- RUN-015, RUN-016, and RUN-017

Implementation evidence:

- `src/domain/money/decimal-money.ts`
- `src/domain/money/public-money.ts`
- `src/domain/calculation/contracts.ts`
- `src/domain/calculation/errors.ts`
- `src/domain/calculation/invariants.ts`
- `src/domain/fiscal/ids.ts`
- `src/domain/fiscal/source-ids.ts`
- `src/domain/fiscal/2026/ruleset-2026.ts`
- `src/domain/fiscal/2026/sources-2026.ts`
- `src/domain/fiscal/2026/contributions.ts`
- `src/domain/fiscal/2026/national-tax.ts`
- `src/domain/fiscal/2026/local-tax.ts`
- `src/domain/fiscal/2026/compose-result.ts`
- `src/domain/fiscal/2026/calculate-salary-2026.ts`
- all M3 domain tests and reference scenarios
- package, TypeScript, ESLint, Vite, and lockfile configuration

No broad fiscal research or network source reopening was performed. Canonical M1 evidence was reopened only as necessary to compare approved formulas, ordering, boundaries, and lifecycle containment with code.

## Rule-to-code verification matrix

| Rule ID | Implementation responsibility | Stage and dependencies | Boundary/test evidence | Result |
| --- | --- | --- | --- | --- |
| `RULE-INPS-2026-001` | `establishContributableRemuneration` keeps RAL and contribution remuneration as distinct stage concepts while applying the disclosed V1 identity | Contribution-base stage; validated whole-euro RAL and fixed assumption | Identity at supported bounds; amount/trace retain separate semantic IDs and assumption | PASS |
| `RULE-INPS-2026-002` | Exact pension base times `0.0919`, then public half-up cent normalization | Pension base after the in-range ceiling stage | Exact 56,223/224/225 and 120,000 fixtures; €10,005 independent reproduction | PASS |
| `RULE-INPS-2026-003` | Excess over €56,224 times 1%, normalized as its own component | Pension base; separate from base IVS and CIGS | 56,223/224/225 plus 120,000 exact fixtures | PASS |
| `RULE-INPS-2026-004` | Typed €122,295 ceiling and explicit in-range no-op guard; isolated eligibility helper | Before IVS calculations; supported maximum remains below ceiling | 120,000 in-range and isolated 122,294/295/296 eligible/ineligible fixtures | PASS |
| `RULE-INPS-2026-005` | Fixed industrial CIGS profile, 0.30% component, component-first aggregate, public-cent downstream handoff | Contribution components after base/ceiling | €10,004/005/006; exact component and aggregate reconciliation; profile/assumption metadata | PASS |
| `RULE-NAT-BASE-2026` | RAL public cents minus reconciled public employee contributions | After contribution aggregate, before every national/local base use | Goldens and exhaustive annual reconciliation; no parallel base formula | PASS |
| `RULE-NAT-GROSS-IRPEF-2026` | Three explicit progressive slices at 23%/33%/43%; normalized children summed component-first | Taxable income | Direct 27,999/28,000/28,001 and 49,999/50,000/50,001 fixtures | PASS |
| `RULE-NAT-EMPLOYMENT-DEDUCTION-2026` | Piecewise Article 13 formula, €65 band, positive-ratio `trunc4`, then public normalization | Taxable income and full-year profile | Direct 14,999/15,000/15,001, €65 boundaries, 49,997/998/999; RAL 55,240/55,241 trace fixtures | PASS |
| `RULE-NAT-NET-IRPEF-2026` | Gross public IRPEF less normalized employment and cuneo deductions with zero floor; cash benefits stay downstream | After gross tax and deductions | Explicit capacity-floor test, goldens, exhaustive minimum-net-IRPEF gate | PASS |
| `RULE-NAT-CUNEO-SUM-2026` | Separate non-taxable cash component at 7.1%/5.3%/4.8% bands | Taxable/adjusted income under the fixed no-other-income profile | Direct 8,499/500/501, 14,999/15,000/15,001, 19,999/20,000/20,001 | PASS |
| `RULE-NAT-CUNEO-DEDUCTION-2026` | Fixed €1,000 band and linear 32k–40k phase-out as a non-refundable tax deduction | Taxable/adjusted income, then net-tax capacity | Direct 19,999/20,000/20,001, 31,999/32,000/32,001, 39,999/40,000/40,001 | PASS |
| `RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026` | Strict low-income/capacity predicate and full-year €1,200 cash component | Taxable income, public gross tax and employment deduction | Direct 8,173/174/175 and 14,999/15,000/15,001; coexistence at supported minimum | PASS |
| `RULE-LOMBARDY-2026-001` | Four marginal regional slices from the unchanged common base; normalized children summed | Taxable income; sibling of municipal calculation | All three ±€1 bracket transitions and direct sibling-base fixture | PASS |
| `RULE-MILAN-2026-001` | Inclusive exemption through €23,000 and 0.8% on the whole base above it | Unchanged common base and fixed Milan domicile | Direct 22,999/23,000/23,001 exact/public fixtures | PASS |
| `RULE-LOCAL-2026-ORDER` | Explicit composition of normalized outflows, cash benefits, signed modeled burden, annual net, and presentation averages | All preceding stages; local liabilities remain siblings | Full goldens, installment invariance, amount reconciliation, and exhaustive range | PASS |

All formulas use values from the typed 2026 ruleset. No generic rule interpreter, dynamic year registry, or formula in React was introduced.

## Excluded-rule containment

| Excluded Rule ID | Runtime containment | Reopening signal | Result |
| --- | --- | --- | --- |
| `RULE-INPS-2026-006` | No minimum-remuneration or CCNL formula; lawful ordinary remuneration is a visible bounded assumption | Contribution-compliance inputs/scope | PASS |
| `RULE-INPS-2026-007` | No normative annual contribution-rounding rule; deterministic behavior is owned by `POLICY-MONEY-2026-001` | Payroll/normative rounding claim | PASS |
| `RULE-INPS-2026-008` | No pay-period, hours, payslip, or payroll-exact path | Payslip or period simulation | PASS |
| `RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026` | No universal-zero formula and no personal/legacy deduction inputs; returned only as limitation metadata | Required personal deduction/history inputs | PASS |
| `RULE-NAT-SPECIAL-PAY-2026` | No decomposed special-pay inputs or substitute-rate path | Special-pay/CCNL feature | PASS |
| `RULE-NAT-PERSONAL-RELIEFS-2026` | No family, expense, other-income, or personal deduction inputs/components | Personal-circumstance scope | PASS |
| `RULE-LOCAL-2026-001` | Unresolved predicate is not implemented or zeroed; supported result is guarded by public net IRPEF ≥ €126.73 | Lower range, new year/profile, changed mechanics, or contrary evidence | PASS |
| `RULE-LOCAL-2026-ROUNDING` | Local components use product normalization only; no filing/payroll rule is claimed | Filing/payroll precision | PASS |
| `RULE-LOCAL-2026-WITHHOLDING` | Result contains annual liabilities only; installment count affects presentation distribution only | Advance/balance or payslip timing | PASS |

Excluded IDs occur only in the typed exclusion catalog/result limitations and exclusion integrity checks. They do not enter evaluated/applied rule lists, components, calculation dispatch, or synthetic zero rows.

## Money and component-first review

- `decimal.js` is imported only by `decimal-money.ts` and is hidden behind the opaque `ExactDecimal` adapter type.
- Exact fiscal constants originate from safe integers or canonical decimal strings. Repository searches found no native floating-point rate multiplication, `Math.round`, `Math.floor`, `parseFloat`, `toFixed`-based arithmetic, or implicit Decimal coercion in fiscal stages.
- The adapter fixes 40-digit precision and half-up normalization. `truncatePositiveRatio4` performs a positive-ratio floor at four decimal places before monetary normalization.
- Public money is safe integer EUR cents. No `Decimal` instance appears in the public contract, and complete-result tests traverse the result to detect leakage.
- Contributions, gross-IRPEF brackets, and Lombardy brackets normalize their public child components first and sum integer cents. The reconciled aggregate is the only downstream amount.
- Native number operations are limited to exact, range-guarded integer-cent construction, addition/subtraction, comparisons, and counters.

Independent decimal reproduction for RAL €10,005:

| Component | Exact | Public |
| --- | ---: | ---: |
| IVS 9.19% | €919.4595 | €919.46 |
| Additional IVS | €0 | €0.00 |
| CIGS 0.30% | €30.015 | €30.02 |
| Public component-first total | — | **€949.48** |

The implementation, amount registry, aggregate trace, and tests all report the same €949.48. The disallowed aggregate-first €949.47 has no public calculation path.

## Calculation ordering

Code reconstruction matches the M2 pipeline:

1. validate finite safe whole-euro RAL and 12/13/14 selection;
2. establish separate RAL and contribution-remuneration concepts under the V1 assumption;
3. apply the in-range pension-ceiling stage;
4. calculate and normalize IVS/additional-IVS/CIGS children, then aggregate;
5. derive taxable income once from RAL less reconciled contributions;
6. calculate and reconcile gross progressive IRPEF;
7. calculate Article 13 and cuneo deductions, then net IRPEF;
8. calculate cash benefits independently downstream;
9. calculate Lombardy and Milan siblings from the unchanged common base;
10. compose public outflows, benefits, burden, annual net, monthly average, and selected-payment average;
11. enforce core result and local-edge invariants.

Named readonly stage results feed subsequent functions. No mutable fiscal accumulator, double application, UI value handoff, or monthly-to-annual dependency was found.

## Canonical fixture reproductions

Independent decimal arithmetic, separate from production formulas, reproduced:

- RAL €55,240: IVS €5,076.56; CIGS €165.72; total contributions €5,242.28; taxable income €49,997.72; raw Article 13 ratio `2.28 / 22000`; statutory `trunc4 = 0.0001`; exact deduction €0.1910; public deduction €0.19.
- RAL €55,241: IVS €5,076.65; CIGS €165.72; total contributions €5,242.37; taxable income €49,998.63; statutory `trunc4 = 0`; public deduction €0.
- RAL €10,000: taxable income €9,051.00; gross IRPEF €2,081.73; employment deduction €1,955.00; net IRPEF €126.73; Lombardy tax €111.33; cuneo sum €479.70; treatment integrativo €1,200.00; modeled burden €-492.64; annual net €10,492.64.

The executable fixtures and calculation trace match these values.

## Result, amount registry, and trace

The serializable `SalaryCalculationResult` owns all currently approved user-facing numbers: gross salary, distinct contributable/pension bases, contribution children/total, taxable income, IRPEF bracket children/gross/deductions/net, cash benefits, Lombardy bracket children/total, Milan tax, outflows, benefit total, burden, annual/monthly/payment net, and effective burden basis points.

Summary, semantic components, final-change breakdown, and trace reference stable amount IDs rather than carrying parallel monetary copies. Registry keys are a closed typed set and complete-result validation checks count, currency, safe cents, sign constraints, component references, trace references, rule/source validity, serialization, and Decimal absence. Future waterfall and explanation consumers require presentation transforms only; no fiscal recomputation is necessary.

Trace entries are built from the same stage results used to compose the amount registry. Exact statutory values are retained where material, including Article 13 raw/truncated ratios and the €0.191 exact output. Aggregate traces explicitly state component-first public aggregation. Status, dependency, Rule ID, Source ID, assumption, and public amount references are coherent and deterministic.

### MINOR — trace captions duplicate selected configuration literals

- **Affected:** `src/domain/fiscal/2026/compose-result.ts`, principally the trace rate/threshold parameters and expression captions around the IVS, additional IVS, CIGS, IRPEF, Lombardy, and Milan entries.
- **Claim:** numeric calculation correctly reads `RULESET_2026`, but several non-executable trace captions/parameters repeat the same rate or threshold as a literal string.
- **Evidence:** current literals exactly match the typed ruleset and all exact/public outputs; the trace does not recalculate amounts. There is no test binding every displayed trace literal to its ruleset value.
- **Impact:** no current numeric or product-contract error. A later in-year rule amendment could update calculation configuration while leaving explanation metadata stale if change review misses the duplicate literal.
- **Recommended disposition:** when M4 begins consuming trace captions, source numeric trace parameters from the typed ruleset (or add a focused config-to-trace consistency assertion). This is a small maintainability correction, does not require fiscal reopening or architecture redesign, and does not require independent re-review if it remains metadata-only.

## Modeled-burden correction

**PASS.** The signed definition follows the canonical composition: outflows minus independently modeled cash benefits. At the supported minimum, verified benefits exceed outflows, so a negative burden and annual net above RAL are truthful consequences rather than invalid fiscal components. Every base, contribution, tax, deduction, benefit, and net amount remains non-negative; only `modeledBurden` and its derived basis-point metric may be signed.

M4 must present this state as a net modeled fiscal benefit rather than silently clamp it or format a negative value as a conventional positive “burden.” This is an already documented presentation consequence, not a domain defect.

## Input and error review

- €10,000 and €120,000 calculate; €9,999 and €120,001 return `unsupported_annual_gross_salary`.
- non-finite, unsafe, and non-whole values return `invalid_annual_gross_salary`.
- payment counts outside 12/13/14 return a separate typed issue.
- the domain does not parse locale strings, clamp values, or reinterpret malformed numbers.
- expected invalidity uses a discriminated outcome; internal impossible states use one `CalculationInvariantError` and do not expose Decimal-specific errors as contract behavior.

The TypeScript facade accepts the approved whole-euro domain. Raw form strings and locale parsing correctly remain M4 UI responsibilities.

## Exhaustive validation

The independent run executed the pure-domain loop for every inclusive whole-euro value from €10,000 through €120,000:

- count implied and executed by the bounds: 110,001;
- all inputs returned successful outcomes;
- public cents, sign, annual reconciliation, contribution reconciliation, and applied-rule lifecycle checks passed;
- minimum modeled public net IRPEF: €126.73 at RAL €10,000;
- standalone observed test duration: approximately 3.51 seconds (full-suite observation approximately 3.57 seconds).

The test exercises the production facade and high-value cross-result invariants; it is not a loop over production constants or a tautological assertion.

## Golden fixtures and test quality

The 11 full-pipeline goldens cover the supported minimum/maximum, coexisting cash benefits and negative burden, benefit/deduction regimes, Milan activation, middle-income phase-out, the two Article 13 transition RALs, the additional-IVS endpoint, and upper-bracket/additional-IVS behavior. Direct rule tests cover both sides of the 56,224 contribution threshold and every material national/local threshold. No additional golden is necessary before M4.

The 91 tests contain no snapshots and assert exact independent cents/decimal strings at high-risk boundaries. Some reconciliation assertions necessarily mirror contract identities, but they accompany independent golden values and rule boundaries rather than serving as the sole oracle. The suite provides meaningful coverage for all 15 verified rules without adding a property-test dependency.

## Dependency and architecture review

Production dependencies are exactly React, React DOM, and decimal.js. `npm ls --omit=dev --depth=0` confirmed no additional top-level runtime dependency.

The domain imports no React, DOM/browser API, storage, network, SVG, visualization, content, or presentation formatter. ESLint enforces the critical layer direction, and repository searches found no fiscal calculation outside `src/domain`. The only application code is the intentionally minimal React/Vite shell.

No router, state store, validation library, chart library, backend, Cloudflare runtime, analytics, or speculative domain framework was added.

## Findings by severity

- **BLOCKER:** 0.
- **MAJOR:** 0.
- **MINOR:** 1 — trace captions duplicate selected 2026 config literals; current values and calculations are correct.
- **NOTE:** 1 — M4 must truthfully render negative modeled burden as a net benefit; the domain naming and signed contract are internally consistent.

No fiscal Rule ID requires reopening, promotion, demotion, or canonical research change.

## Validation performed

| Check | Result |
| --- | --- |
| `npm.cmd ci` | PASS — 243 packages installed from lockfile; audit completed |
| `npm.cmd run typecheck` | PASS |
| `npm.cmd run lint` | PASS — zero warnings |
| `npm.cmd run format:check` | PASS |
| `npm.cmd test -- --reporter=verbose` | PASS — 7 files, 91 tests |
| `npm.cmd run test:exhaustive` | PASS — 1 test, all 110,001 RAL values, ~3.51 s |
| `npm.cmd run build` | PASS — Vite production build |
| `npm.cmd audit --omit=dev` | PASS — 0 vulnerabilities |
| runtime dependency inspection | PASS — React, React DOM, decimal.js only |
| fiscal lifecycle/source-reference inspection | PASS — 15 verified / 9 excluded; source IDs resolve |
| domain import/adversarial arithmetic search | PASS |
| relative Markdown-link validation | PASS after this record is included |
| `git diff --check` | PASS after this record is included |

PowerShell initially resolved `npm` to a script blocked by the host execution policy. The review used the installed `npm.cmd` executable instead; this is a shell-launch detail, not a repository or reproducibility failure.

## Tools, capabilities, and external effects

The review used local PowerShell, Git, Node/npm, TypeScript, ESLint, Prettier, Vitest, Vite, and read-only package-audit network access. `npm ci` recreated ignored `node_modules`; the build recreated ignored `dist`. No browser session, MCP server, plugin, deployment, Cloudflare resource, remote Git mutation, account action, secret, external message, fiscal lifecycle change, canonical rule edit, or application-code edit occurred.

## Recommended next action

Accept M3 for M4. The M4 implementation owner may address the minor trace-metadata coupling before rendering trace captions, while preserving Rule IDs, sources, formulas, public values, and the single amount registry. No domain-engine reconciliation cycle or fiscal reopening is required.

**M3 DOMAIN REVIEW PASSED — READY FOR M4**
