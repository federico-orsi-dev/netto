import { expect, it } from "vitest";

import {
  CALCULATION_AMOUNT_IDS,
  EXCLUDED_RULE_IDS_2026,
  VERIFIED_RULE_IDS_2026,
} from "../ids";
import { calculateSalary2026 } from "./calculate-salary-2026";

it("validates every whole-euro RAL in the supported 2026 envelope", () => {
  const startedAt = performance.now();
  let minimumNetIrpefMinorUnits = Number.POSITIVE_INFINITY;
  let minimumNetIrpefRal = 0;
  const verified = new Set<string>(VERIFIED_RULE_IDS_2026);
  const excluded = new Set<string>(EXCLUDED_RULE_IDS_2026);

  for (let ral = 10_000; ral <= 120_000; ral += 1) {
    const outcome = calculateSalary2026({
      annualGrossSalaryEuro: ral,
      salaryPaymentsPerYear: 13,
    });
    if (!outcome.ok) throw new Error(`RAL ${String(ral)} did not calculate.`);

    const { result } = outcome;
    const netIrpef = result.amounts.netIrpef.minorUnits;
    if (netIrpef < minimumNetIrpefMinorUnits) {
      minimumNetIrpefMinorUnits = netIrpef;
      minimumNetIrpefRal = ral;
    }

    for (const amountId of CALCULATION_AMOUNT_IDS) {
      const minorUnits = result.amounts[amountId].minorUnits;
      if (!Number.isSafeInteger(minorUnits)) {
        throw new Error(
          `${amountId} is not safe integer cents at RAL ${String(ral)}.`,
        );
      }
      if (amountId !== "modeledBurden" && minorUnits < 0) {
        throw new Error(`${amountId} is negative at RAL ${String(ral)}.`);
      }
    }
    if (
      result.amounts.annualNet.minorUnits !==
      result.amounts.annualGrossSalary.minorUnits -
        result.amounts.modeledBurden.minorUnits
    ) {
      throw new Error(
        `Annual-net reconciliation failed at RAL ${String(ral)}.`,
      );
    }
    if (
      result.amounts.employeeContributions.minorUnits !==
      result.amounts.employeeIvsContribution.minorUnits +
        result.amounts.additionalIvsContribution.minorUnits +
        result.amounts.employeeCigsContribution.minorUnits
    ) {
      throw new Error(
        `Contribution reconciliation failed at RAL ${String(ral)}.`,
      );
    }
    for (const ruleId of result.metadata.appliedRuleIds) {
      if (!verified.has(ruleId) || excluded.has(ruleId)) {
        throw new Error(
          `Invalid applied rule ${ruleId} at RAL ${String(ral)}.`,
        );
      }
    }
  }

  expect(minimumNetIrpefMinorUnits).toBe(12_673);
  expect(minimumNetIrpefRal).toBe(10_000);
  const durationMs = Math.round(performance.now() - startedAt);
  console.info(
    `[exhaustive] 110001 RAL values validated in ${String(durationMs)} ms`,
  );
}, 120_000);
