# Netto

> Inserisci una RAL e ottieni una stima trasparente del netto italiano, con ogni numero collegato a regole fiscali e fonti autorevoli.

**Status:** M4 product experience implemented and locally validated; awaiting independent product/accessibility review before release hardening.

Netto is a production-minded hiring-assignment prototype for an Italian employee or candidate evaluating a compensation package. V1 will estimate annual net salary, average monthly net, and average contractual instalment for fiscal year 2026 under one explicit Milan/Lombardy employee profile.

The repository contains a strict TypeScript, React, and Vite application plus the pure `calculateSalary2026` domain facade. The complete Italian V1 interface renders annual and monthly net, a gross-to-net waterfall, semantic breakdown, contextual explanations, assumptions, official sources, and an inspectable calculation trace without reproducing fiscal logic in the UI.

The fiscal engine implements the 15 verified rules, preserves all 9 exclusions as explicit boundaries, uses `decimal.js` only behind a monetary adapter, and validates the complete EUR 10,000–120,000 whole-euro input range.

## Current scope

- Fiscal year: 2026
- Supported RAL: €10,000–€120,000
- Runtime: static, client-only, privacy preserving
- Fidelity: transparent annual estimate, not a payslip simulator
- Evidence policy: only human-approved, independently reviewed rules may enter executable calculations

## Run locally

```bash
npm ci
npm run dev
```

Quality gates:

```bash
npm run typecheck
npm run lint
npm run format:check
npm test
npx playwright install chromium webkit
npm run test:e2e
npm run build
```

## Repository guide

- [Product specification](docs/product/product-spec.md)
- [Approved architecture](docs/architecture/architecture.md)
- [Implementation architecture and execution plan](docs/architecture/implementation-plan.md)
- [2026 Fiscal Rule Catalog](docs/domain/fiscal-rules-2026.md)
- [2026 Source Register](docs/domain/source-register-2026.md)
- [Testing strategy](docs/testing/test-strategy.md)
- [AI engineering workflow](docs/ai-engineering/workflow.md)
- [Current project state](PROJECT_STATE.md)

Cloudflare configuration, a live demo, final screenshots, security headers, and release approval remain M5 responsibilities. This README intentionally links to, rather than duplicates, the detailed fiscal and architectural records.
