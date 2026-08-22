import { describe, expect, it } from "vitest";

import type { SalaryCalculationInput } from "../../calculation/contracts";
import { assertCompleteResultInvariants } from "../../calculation/invariants";
import {
  CALCULATION_AMOUNT_IDS,
  EXCLUDED_RULE_IDS_2026,
  VERIFIED_RULE_IDS_2026,
} from "../ids";
import { calculateSalary2026 } from "./calculate-salary-2026";
import { REFERENCE_SCENARIOS_2026 } from "./fixtures/reference-scenarios";

function calculate(input: SalaryCalculationInput) {
  const outcome = calculateSalary2026(input);
  expect(outcome.ok).toBe(true);
  if (!outcome.ok) throw new Error("Expected a valid salary calculation.");
  return outcome.result;
}

describe("calculateSalary2026", () => {
  it.each(REFERENCE_SCENARIOS_2026)(
    "matches the $ralEuro golden fixture: $rationale",
    ({ ralEuro, expectedMinorUnits }) => {
      const result = calculate({
        annualGrossSalaryEuro: ralEuro,
        salaryPaymentsPerYear: 13,
      });
      for (const [amountId, expected] of Object.entries(expectedMinorUnits)) {
        expect(
          result.amounts[amountId as keyof typeof result.amounts].minorUnits,
        ).toBe(expected);
      }
      assertCompleteResultInvariants(result);
    },
  );

  it("preserves the exact Article 13 trace at RAL 55,240 and zeroes it at 55,241", () => {
    const below = calculate({
      annualGrossSalaryEuro: 55_240,
      salaryPaymentsPerYear: 13,
    });
    const transition = calculate({
      annualGrossSalaryEuro: 55_241,
      salaryPaymentsPerYear: 13,
    });
    const belowTrace = below.trace.find(
      ({ id }) => id === "trace:employment-deduction",
    );
    const transitionTrace = transition.trace.find(
      ({ id }) => id === "trace:employment-deduction",
    );
    expect(belowTrace?.exactOutput).toBe("0.191");
    expect(below.amounts.employmentDeduction.minorUnits).toBe(19);
    expect(transitionTrace?.exactOutput).toBe("0");
    expect(transition.amounts.employmentDeduction.minorUnits).toBe(0);
  });

  it("keeps annual fiscal amounts invariant across 12, 13, and 14 salary payments", () => {
    const results = ([12, 13, 14] as const).map((salaryPaymentsPerYear) =>
      calculate({ annualGrossSalaryEuro: 55_240, salaryPaymentsPerYear }),
    );
    const annualAmountIds = CALCULATION_AMOUNT_IDS.filter(
      (id) => id !== "averageSalaryPayment",
    );
    for (const amountId of annualAmountIds) {
      expect(results[1]?.amounts[amountId]).toEqual(
        results[0]?.amounts[amountId],
      );
      expect(results[2]?.amounts[amountId]).toEqual(
        results[0]?.amounts[amountId],
      );
    }
    expect(
      results.map(({ amounts }) => amounts.averageSalaryPayment.minorUnits),
    ).toEqual([292_754, 270_234, 250_932]);
  });

  it("rejects invalid, non-whole, non-finite, out-of-range, and unsupported payment inputs", () => {
    const invalidInputs = [
      { annualGrossSalaryEuro: Number.NaN, salaryPaymentsPerYear: 13 },
      {
        annualGrossSalaryEuro: Number.POSITIVE_INFINITY,
        salaryPaymentsPerYear: 13,
      },
      { annualGrossSalaryEuro: 10_000.5, salaryPaymentsPerYear: 13 },
      { annualGrossSalaryEuro: 9_999, salaryPaymentsPerYear: 13 },
      { annualGrossSalaryEuro: 120_001, salaryPaymentsPerYear: 13 },
      { annualGrossSalaryEuro: 50_000, salaryPaymentsPerYear: 15 },
    ] as unknown as readonly SalaryCalculationInput[];
    for (const input of invalidInputs)
      expect(calculateSalary2026(input).ok).toBe(false);
  });

  it("keeps excluded rules out of evaluated/applied calculations and returns all nine boundaries", () => {
    const result = calculate({
      annualGrossSalaryEuro: 28_000,
      salaryPaymentsPerYear: 13,
    });
    expect(result.metadata.evaluatedRuleIds).toEqual(VERIFIED_RULE_IDS_2026);
    expect(result.exclusions.map(({ ruleId }) => ruleId)).toEqual(
      EXCLUDED_RULE_IDS_2026,
    );
    for (const excluded of EXCLUDED_RULE_IDS_2026) {
      expect(result.metadata.appliedRuleIds).not.toContain(excluded);
      expect(result.metadata.evaluatedRuleIds).not.toContain(excluded);
    }
  });

  it("returns one serializable numeric source for components, breakdown, and trace", () => {
    const result = calculate({
      annualGrossSalaryEuro: 10_005,
      salaryPaymentsPerYear: 13,
    });
    expect(result.amounts.employeeIvsContribution.minorUnits).toBe(91_946);
    expect(result.amounts.employeeCigsContribution.minorUnits).toBe(3_002);
    expect(result.amounts.employeeContributions.minorUnits).toBe(94_948);
    for (const component of Object.values(result.components)) {
      expect(result.amounts[component.amountId]).toBeDefined();
      expect(result.trace.some(({ id }) => id === component.traceEntryId)).toBe(
        true,
      );
    }
    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it("is deterministic for an identical request", () => {
    const input = {
      annualGrossSalaryEuro: 75_000,
      salaryPaymentsPerYear: 14,
    } as const;
    expect(calculateSalary2026(input)).toEqual(calculateSalary2026(input));
  });
});
