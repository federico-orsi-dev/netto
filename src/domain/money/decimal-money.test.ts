import { describe, expect, it } from "vitest";

import {
  decimalFromInteger,
  decimalFromString,
  normalizeToMinorUnits,
  toPlainDecimalString,
  truncatePositiveRatio4,
} from "./decimal-money";
import {
  divideMoneyHalfUp,
  moneyFromExact,
  moneyFromMinorUnits,
  sumMoney,
} from "./public-money";

describe("POLICY-MONEY-2026-001", () => {
  it("normalizes half-cent ties to public cents using decimal half-up", () => {
    expect(normalizeToMinorUnits(decimalFromString("919.4595"))).toBe(91_946);
    expect(normalizeToMinorUnits(decimalFromString("30.015"))).toBe(3_002);
    expect(normalizeToMinorUnits(decimalFromString("0.005"))).toBe(1);
  });

  it("aggregates normalized public components component-first", () => {
    const total = sumMoney([
      moneyFromExact(decimalFromString("919.4595")),
      moneyFromExact(decimalFromString("30.015")),
    ]);
    expect(total.minorUnits).toBe(94_948);
  });

  it("applies statutory four-decimal truncation without rounding", () => {
    expect(
      toPlainDecimalString(
        truncatePositiveRatio4(
          decimalFromInteger(3),
          decimalFromInteger(22_000),
        ),
      ),
    ).toBe("0.0001");
    expect(
      toPlainDecimalString(
        truncatePositiveRatio4(
          decimalFromInteger(2),
          decimalFromInteger(22_000),
        ),
      ),
    ).toBe("0");
  });

  it("derives presentation averages from annual public cents", () => {
    expect(
      divideMoneyHalfUp(moneyFromMinorUnits(1_049_264), 12).minorUnits,
    ).toBe(87_439);
    expect(
      divideMoneyHalfUp(moneyFromMinorUnits(1_049_264), 13).minorUnits,
    ).toBe(80_713);
  });
});
