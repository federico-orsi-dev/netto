import { describe, expect, it } from "vitest";

import { calculateSalary2026, type SalaryCalculationResult } from "../domain";
import { compareCompensationResults } from "./compensation-comparison";

function resultFor(ral: number): SalaryCalculationResult {
  const outcome = calculateSalary2026({
    annualGrossSalaryEuro: ral,
    salaryPaymentsPerYear: 13,
  });
  if (!outcome.ok) throw new Error("Expected a supported comparison fixture.");
  return outcome.result;
}

describe("compareCompensationResults", () => {
  it("derives an increase only from two canonical results", () => {
    const current = resultFor(35_000);
    const proposed = resultFor(40_000);
    const comparison = compareCompensationResults(current, proposed);

    expect(comparison.direction).toBe("increase");
    expect(comparison.grossRalDelta.minorUnits).toBe(500_000);
    expect(comparison.annualNetDelta.minorUnits).toBe(
      proposed.amounts.annualNet.minorUnits -
        current.amounts.annualNet.minorUnits,
    );
    expect(comparison.averageMonthlyNetDelta.minorUnits).toBe(
      proposed.amounts.averageMonthlyNet.minorUnits -
        current.amounts.averageMonthlyNet.minorUnits,
    );
    expect(comparison.modeledNetShareOfGrossChangeBasisPoints).not.toBeNull();
  });

  it("is exactly reversible for a salary reduction", () => {
    const increase = compareCompensationResults(
      resultFor(35_000),
      resultFor(55_241),
    );
    const decrease = compareCompensationResults(
      resultFor(55_241),
      resultFor(35_000),
    );

    expect(decrease.direction).toBe("decrease");
    expect(decrease.grossRalDelta.minorUnits).toBe(
      -increase.grossRalDelta.minorUnits,
    );
    expect(decrease.annualNetDelta.minorUnits).toBe(
      -increase.annualNetDelta.minorUnits,
    );
    expect(decrease.modeledNetShareOfGrossChangeBasisPoints).toBe(
      increase.modeledNetShareOfGrossChangeBasisPoints,
    );
    decrease.componentChanges.forEach((change, index) => {
      const inverse = increase.componentChanges[index];
      expect(inverse?.id).toBe(change.id);
      expect(
        change.amountDelta.minorUnits +
          (inverse?.amountDelta.minorUnits ?? Number.NaN),
      ).toBe(0);
      expect(
        change.annualNetEffect.minorUnits +
          (inverse?.annualNetEffect.minorUnits ?? Number.NaN),
      ).toBe(0);
    });
  });

  it("represents equal salaries without inventing a retained-share ratio", () => {
    const result = resultFor(35_000);
    const comparison = compareCompensationResults(result, result);

    expect(comparison.direction).toBe("unchanged");
    expect(comparison.netDirection).toBe("unchanged");
    expect(comparison.grossRalDelta.minorUnits).toBe(0);
    expect(comparison.annualNetDelta.minorUnits).toBe(0);
    expect(comparison.modeledNetShareOfGrossChangeBasisPoints).toBeNull();
    expect(comparison.materialComponentChanges).toEqual([]);
    expect(comparison.ruleApplicabilityChanges).toEqual([]);
  });

  it("reconciles signed component effects with the annual-net delta", () => {
    const comparison = compareCompensationResults(
      resultFor(20_000),
      resultFor(25_000),
    );
    const componentEffect = comparison.componentChanges.reduce(
      (total, change) => total + change.annualNetEffect.minorUnits,
      0,
    );

    expect(comparison.grossRalDelta.minorUnits + componentEffect).toBe(
      comparison.annualNetDelta.minorUnits,
    );
    expect(
      comparison.componentChanges.find(({ id }) => id === "cuneoCashSum")
        ?.amountDelta.minorUnits,
    ).toBeLessThan(0);
    expect(comparison.ruleApplicabilityChanges.length).toBeGreaterThan(0);
  });

  it("rejects results from incompatible fiscal contexts", () => {
    const current = resultFor(35_000);
    const proposed = {
      ...resultFor(40_000),
      metadata: {
        ...resultFor(40_000).metadata,
        profileId: "different-profile",
      },
    } as unknown as SalaryCalculationResult;

    expect(() => compareCompensationResults(current, proposed)).toThrow(
      /same fiscal year, profile, ruleset, and money policy/,
    );
  });
});
