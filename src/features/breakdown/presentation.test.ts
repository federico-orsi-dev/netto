import { describe, expect, it } from "vitest";

import { calculateSalary2026 } from "../../domain";
import { createWaterfallGeometry, getBreakdownItems } from "./presentation";

function resultAt(ral: number) {
  const outcome = calculateSalary2026({
    annualGrossSalaryEuro: ral,
    salaryPaymentsPerYear: 13,
  });
  if (!outcome.ok) throw new Error("Expected supported fixture.");
  return outcome.result;
}

describe("waterfall presentation model", () => {
  it("preserves canonical component identity, order, and amounts", () => {
    const result = resultAt(35_000);
    const items = getBreakdownItems(result);
    expect(items.map(({ id }) => id)).toEqual(result.breakdownOrder);
    for (const item of items) {
      const component = result.components[item.id];
      expect(item.amount).toBe(result.amounts[component.amountId]);
    }
  });

  it.each([10_000, 35_000])(
    "produces finite geometry without changing canonical values at RAL %i",
    (ral) => {
      const result = resultAt(ral);
      const items = getBreakdownItems(result);
      const bars = createWaterfallGeometry(items);
      expect(bars).toHaveLength(items.length);
      expect(bars.at(-1)?.amount).toBe(result.amounts.annualNet);
      for (const bar of bars) {
        expect([bar.x, bar.y, bar.width, bar.height, bar.connectorY]).toSatisfy(
          (values: number[]) => values.every(Number.isFinite),
        );
      }
    },
  );
});
