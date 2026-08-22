import { describe, expect, it } from "vitest";

import {
  decimalFromInteger,
  toPlainDecimalString,
} from "../../money/decimal-money";
import {
  applyPensionCeilingForFixture,
  calculateContributions,
  contributionExactFixture,
  establishContributableRemuneration,
} from "./contributions";

describe("2026 employee contributions", () => {
  it("keeps RAL and contributable remuneration distinct while applying the approved V1 identity", () => {
    expect(
      toPlainDecimalString(establishContributableRemuneration(10_000)),
    ).toBe("10000");
    expect(
      toPlainDecimalString(establishContributableRemuneration(120_000)),
    ).toBe("120000");
  });

  it.each([
    [56_223, "5166.8937", "0", "168.669"],
    [56_224, "5166.9856", "0", "168.672"],
    [56_225, "5167.0775", "0.01", "168.675"],
    [120_000, "11028", "637.76", "360"],
  ] as const)(
    "calculates verified exact components at RAL %i",
    (ral, ivs, additional, cigs) => {
      const exact = contributionExactFixture(calculateContributions(ral));
      expect(exact.employeeIvs).toBe(ivs);
      expect(exact.additionalIvs).toBe(additional);
      expect(exact.employeeCigs).toBe(cigs);
    },
  );

  it.each([
    [10_004, 94_938],
    [10_005, 94_948],
    [10_006, 94_957],
  ] as const)(
    "uses component-first normalization at RAL %i",
    (ral, expectedTotalMinorUnits) => {
      const result = calculateContributions(ral);
      expect(result.employeeContributions.minorUnits).toBe(
        expectedTotalMinorUnits,
      );
      expect(result.employeeContributions.minorUnits).toBe(
        result.employeeIvs.minorUnits +
          result.additionalIvs.minorUnits +
          result.employeeCigs.minorUnits,
      );
    },
  );

  it("preserves the canonical EUR 10,005 component reconciliation", () => {
    const result = calculateContributions(10_005);
    expect(result.employeeIvs.minorUnits).toBe(91_946);
    expect(result.employeeCigs.minorUnits).toBe(3_002);
    expect(result.additionalIvs.minorUnits).toBe(0);
    expect(result.employeeContributions.minorUnits).toBe(94_948);
  });

  it("keeps the 2026 pension ceiling inactive in range and models isolated eligibility correctly", () => {
    expect(
      toPlainDecimalString(
        applyPensionCeilingForFixture(decimalFromInteger(120_000), true),
      ),
    ).toBe("120000");
    expect(
      toPlainDecimalString(
        applyPensionCeilingForFixture(decimalFromInteger(122_294), true),
      ),
    ).toBe("122294");
    expect(
      toPlainDecimalString(
        applyPensionCeilingForFixture(decimalFromInteger(122_295), true),
      ),
    ).toBe("122295");
    expect(
      toPlainDecimalString(
        applyPensionCeilingForFixture(decimalFromInteger(122_296), true),
      ),
    ).toBe("122295");
    expect(
      toPlainDecimalString(
        applyPensionCeilingForFixture(decimalFromInteger(122_296), false),
      ),
    ).toBe("122296");
  });
});
