# Netto

> Inserisci una RAL e ottieni una stima trasparente del netto italiano, con ogni numero collegato a regole fiscali e fonti autorevoli.

**Status:** M1 — Verified Fiscal Foundation complete. The bounded 2026 fiscal model is approved for implementation planning; no calculator implementation exists yet.

Netto is a production-minded hiring-assignment prototype for an Italian employee or candidate evaluating a compensation package. V1 will estimate annual net salary, average monthly net, and average contractual instalment for fiscal year 2026 under one explicit Milan/Lombardy employee profile.

## Current scope

- Fiscal year: 2026
- Supported RAL: €10,000–€120,000
- Runtime: static, client-only, privacy preserving
- Fidelity: transparent annual estimate, not a payslip simulator
- Evidence policy: only human-approved, independently reviewed rules may enter executable calculations

## Repository guide

- [Product specification](docs/product/product-spec.md)
- [Approved architecture](docs/architecture/architecture.md)
- [2026 Fiscal Rule Catalog](docs/domain/fiscal-rules-2026.md)
- [2026 Source Register](docs/domain/source-register-2026.md)
- [Testing strategy](docs/testing/test-strategy.md)
- [AI engineering workflow](docs/ai-engineering/workflow.md)
- [Current project state](PROJECT_STATE.md)

Application setup, live demo, screenshots, and build commands will be added in their owning milestones. This README intentionally does not duplicate the detailed fiscal or architectural records.
