---
run_id: RUN-2026-08-23-017
date: 2026-08-23
tool: codex
role: principal-implementation-engineer
task: m3-deterministic-domain-engine
status: completed
owner: codex
reviewer: pending-independent-domain-review
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

# M3 deterministic domain engine

## Objective and scope

Implement M3 from the accepted [Implementation Architecture & Execution Plan](../../architecture/implementation-plan.md): tooling, money adapter, typed 2026 ruleset, pure ordered salary pipeline, canonical result/amount registry/trace, fiscal fixtures, and exhaustive supported-range validation. The final calculator UI, visualization, Cloudflare configuration, CI, deployment, and M4 work remain out of scope.

## Pre-flight evidence

- Repository root: the primary project worktree.
- Starting branch: `m1/verified-fiscal-foundation`.
- Starting HEAD: `c3c079787bdf5804a4f6d63cb6e248e9421a4a9c`; tree `457678f35939e1ec9b9f6f0edcb3a7a9874eef1a`.
- Worktree: clean; M2 commit reachable because it was the exact starting HEAD.
- M1 lifecycle: 15 verified, 9 excluded, 0 candidate, 0 blocked, 0 rejected.
- M2: complete with no blocking decision.
- No `src`, package manifest, lockfile, installed dependencies, TypeScript/Vite config, or application implementation existed.

## Implementation

- Created the npm/Vite/React/strict-TypeScript scaffold and a deliberately minimal placeholder shell.
- Pinned the approved dependency surface in `package-lock.json`; no router, store, chart, schema, CSS, property-testing, i18n, analytics, backend, or Cloudflare runtime package was added.
- Confined the sole `decimal.js` import to `domain/money/decimal-money.ts`; other domain modules use an opaque exact-decimal adapter type. Public money is serializable safe-integer euro cents and exact trace values are strings.
- Encoded the literal Italy/Milan/Lombardy 2026 profile, rates, thresholds, 15 verified IDs, 9 excluded IDs, assumptions, rule/source mapping, and concise official source links.
- Implemented explicit immutable stages for contribution base/contributions, taxable income, gross IRPEF, employment/cuneo deductions, net IRPEF, cash benefits, local liabilities, and annual composition.
- Implemented the year-bound `calculateSalary2026` facade with finite, safe-whole-euro, EUR 10,000–120,000, and 12/13/14 guards.
- Implemented the canonical amount registry, semantic component registry, final-change breakdown order, deterministic trace, source/assumption/exclusion metadata, input issues, and invariant failures.
- Added rule-level, threshold, component-first, Article 13, golden, serialization, determinism, exclusion, trace, and full-range suites.

## Concrete M2 correction

M2 simultaneously required `modeledBurden = totalOutflows - totalCashBenefits` and declared every `MoneyAmount` non-negative. At supported low RAL, `RULE-NAT-CUNEO-SUM-2026` and `RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026` coexist and can exceed outflows. The RAL EUR 10,000 fixture yields total modeled burden EUR -492.64 and annual net EUR 10,492.64.

The smallest correction preserves the approved formula and registry: only the derived `modeledBurden` amount and effective-burden basis points may be signed; every fiscal component, liability, benefit, base, and net amount remains non-negative. The implementation plan records this correction. No fiscal rule, source, lifecycle state, profile, or ADR changed.

## Dependency selection

Runtime: React 19.2.8, React DOM 19.2.8, and decimal.js 10.6.0.

Development: TypeScript 6.0.3, Vite 8.2.2, React plugin 6.1.0, ESLint 10.9.0 with typescript-eslint 8.67.0 and approved React plugins, Prettier 3.9.6, Vitest 4.1.11/jsdom 30.0.1, React Testing Library packages, Playwright 1.62.1, and `@axe-core/playwright` 4.13.0. TypeScript 7.0.2 was current in the registry but rejected because typescript-eslint declares support below TypeScript 6.1; 6.0.3 is the newest compatible line.

## Evidence fixtures

- Component-first RAL EUR 10,005: IVS EUR 919.46 + CIGS EUR 30.02 + additional IVS EUR 0 = EUR 949.48.
- Article 13 RAL EUR 55,240: contributions EUR 5,242.28; taxable income EUR 49,997.72; statutory exact deduction EUR 0.191; public EUR 0.19.
- Article 13 RAL EUR 55,241: contributions EUR 5,242.37; taxable income EUR 49,998.63; deduction zero.
- Full-engine goldens cover RAL 10,000, 15,000, 20,000, 28,000, 35,000, 40,000, 55,240, 55,241, 56,224, 75,000, and 120,000, each with a documented boundary/semantic purpose.
- Exhaustive pure-domain validation covers all 110,001 whole-euro RAL inputs. Minimum net IRPEF remains EUR 126.73 at RAL EUR 10,000, preserving the bounded exclusion of `RULE-LOCAL-2026-001`.

## Adversarial self-review

- Decimal import: one adapter file only; no Decimal instance crosses the result boundary.
- Fiscal arithmetic: percentage inputs are canonical decimal strings; no binary floating-point rate arithmetic.
- Rounding: statutory Article 13 truncation precedes product normalization; public bracket/contribution children normalize before aggregation; downstream stages use reconciled public cents.
- Boundaries: domain imports no React, DOM, browser, storage, network, or presentation module; ESLint enforces the critical direction.
- Ownership: summary, breakdown, components, trace, and future UI all reference the single amount registry; no visualization math exists.
- Lifecycle: evaluated/applied lists accept verified IDs only; excluded rules remain limitation metadata, never synthetic zero rules.
- Ordering: named stage results feed later stages; local taxes share the unchanged common base; cash benefits remain downstream additions.
- Scope: no final UI, backend, deployment, CI, telemetry, persistence, or speculative framework was introduced.

## Tools, capabilities, and external effects

Codex used the local PowerShell/Git/npm toolchain and read-only npm registry access to inspect current package versions and peer compatibility. `npm install` created local `node_modules` and the committed lockfile; no browser binaries, plugin, MCP server, remote repository mutation, Cloudflare resource, deployment, account, secret, or external message was created. A repository-wide formatter initially touched historical Markdown whitespace; those exact formatter-only changes were immediately restored before canonical M3 documentation edits, and Markdown is now excluded from source formatting commands.

## Validation

- Reproducible dependency install: passed with npm lockfile.
- Production dependency audit: passed with zero known vulnerabilities at implementation time.
- TypeScript strict typecheck: passed.
- ESLint, including domain import restrictions: passed with zero warnings.
- Prettier check over implementation/configuration files: passed.
- Rule/boundary/golden/invariant tests: 90 passed across 6 files.
- Exhaustive supported-range test: 1 passed; all 110,001 values validated in approximately 3.3 seconds.
- Production Vite build: passed; static `dist` generated locally.
- M1 lifecycle and source-reference consistency: unchanged.
- Relative Markdown links and Git whitespace: passed.

## Result and next gate

M3 implementation is complete locally. It is not independently accepted, release approved, deployed, or authorization to start M4. The next permitted action is the independent money/fiscal/pipeline/trace review required by the M2 plan.

**M3 COMPLETE — READY FOR INDEPENDENT DOMAIN REVIEW**
