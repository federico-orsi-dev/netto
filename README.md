# Netto

> Inserisci una RAL e ottieni una stima trasparente del netto italiano, con ogni numero collegato a regole fiscali e fonti autorevoli.

**Status:** M3 deterministic domain engine implemented and validated; awaiting independent domain review before M4 product UI work.

Netto is a production-minded hiring-assignment prototype for an Italian employee or candidate evaluating a compensation package. V1 will estimate annual net salary, average monthly net, and average contractual instalment for fiscal year 2026 under one explicit Milan/Lombardy employee profile.

The repository now contains a strict TypeScript, React, and Vite scaffold plus the pure `calculateSalary2026` domain facade. The fiscal engine implements the 15 verified rules, preserves all 9 exclusions as explicit boundaries, uses `decimal.js` only behind a monetary adapter, and validates the complete EUR 10,000–120,000 whole-euro input range. The final product interface remains an M4 deliverable.

## Current scope

- Fiscal year: 2026
- Supported RAL: €10,000–€120,000
- Runtime: static, client-only, privacy preserving
- Fidelity: transparent annual estimate, not a payslip simulator
- Evidence policy: only human-approved, independently reviewed rules may enter executable calculations

## Repository guide

- [Product specification](docs/product/product-spec.md)
- [Approved architecture](docs/architecture/architecture.md)
- [Implementation architecture and execution plan](docs/architecture/implementation-plan.md)
- [2026 Fiscal Rule Catalog](docs/domain/fiscal-rules-2026.md)
- [2026 Source Register](docs/domain/source-register-2026.md)
- [Testing strategy](docs/testing/test-strategy.md)
- [AI engineering workflow](docs/ai-engineering/workflow.md)
- [Current project state](PROJECT_STATE.md)

Application setup, live demo, screenshots, and build commands will be added in their owning milestones. This README intentionally does not duplicate the detailed fiscal or architectural records.
