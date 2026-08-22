import { describe, expect, it } from "vitest";

import {
  decimalFromInteger,
  toPlainDecimalString,
} from "../../money/decimal-money";
import { calculateLocalTaxes } from "./local-tax";

describe("2026 Lombardy and Milan taxes", () => {
  it.each([
    14_999, 15_000, 15_001, 27_999, 28_000, 28_001, 49_999, 50_000, 50_001,
  ] as const)("reconciles progressive Lombardy brackets at base %i", (base) => {
    const result = calculateLocalTaxes(decimalFromInteger(base));
    expect(result.regionalTax.minorUnits).toBe(
      result.lombardyBrackets.reduce((sum, value) => sum + value.minorUnits, 0),
    );
  });

  it.each([
    [22_999, "0", 0],
    [23_000, "0", 0],
    [23_001, "184.008", 18_401],
  ] as const)(
    "applies Milan's inclusive exemption and whole-base cliff at %i",
    (base, exact, minorUnits) => {
      const result = calculateLocalTaxes(decimalFromInteger(base));
      expect(toPlainDecimalString(result.municipalTaxExact)).toBe(exact);
      expect(result.municipalTax.minorUnits).toBe(minorUnits);
    },
  );

  it("calculates regional and municipal taxes as siblings from the unchanged common base", () => {
    const result = calculateLocalTaxes(decimalFromInteger(30_000));
    expect(result.regionalTax.minorUnits).toBe(42_430);
    expect(result.municipalTax.minorUnits).toBe(24_000);
  });
});
