import { describe, expect, it } from "vitest";

import {
  decimalFromInteger,
  toPlainDecimalString,
} from "../../money/decimal-money";
import {
  calculateCashBenefits,
  calculateCuneoDeduction,
  calculateEmploymentDeduction,
  calculateGrossIrpef,
  calculateNetIrpef,
} from "./national-tax";

describe("2026 national IRPEF", () => {
  it.each([
    [27_999, 643_977],
    [28_000, 644_000],
    [28_001, 644_033],
    [49_999, 1_369_967],
    [50_000, 1_370_000],
    [50_001, 1_370_043],
  ] as const)(
    "applies the progressive brackets at income %i",
    (income, expectedMinorUnits) => {
      const result = calculateGrossIrpef(decimalFromInteger(income));
      expect(result.grossIrpef.minorUnits).toBe(expectedMinorUnits);
      expect(result.grossIrpef.minorUnits).toBe(
        result.brackets.reduce((sum, value) => sum + value.minorUnits, 0),
      );
    },
  );

  it.each([
    [14_999, "1955", 195_500],
    [15_000, "1955", 195_500],
    [15_001, "3099.881", 309_988],
    [49_997, "0.191", 19],
    [49_998, "0", 0],
    [49_999, "0", 0],
  ] as const)(
    "applies Article 13 at direct income %i",
    (income, exact, publicMinorUnits) => {
      const result = calculateEmploymentDeduction(decimalFromInteger(income));
      expect(toPlainDecimalString(result.exact)).toBe(exact);
      expect(result.publicAmount.minorUnits).toBe(publicMinorUnits);
    },
  );

  it.each([
    [24_999, false],
    [25_000, false],
    [25_001, true],
    [34_999, true],
    [35_000, true],
    [35_001, false],
  ] as const)(
    "applies the EUR 65 Article 13 adjustment at direct income %i",
    (income, expected) => {
      expect(
        calculateEmploymentDeduction(decimalFromInteger(income))
          .includesSixtyFiveEuroAdjustment,
      ).toBe(expected);
    },
  );

  it.each([
    [19_999, 0],
    [20_000, 0],
    [20_001, 100_000],
    [31_999, 100_000],
    [32_000, 100_000],
    [32_001, 99_988],
    [39_999, 13],
    [40_000, 0],
    [40_001, 0],
  ] as const)(
    "applies the cuneo deduction at direct income %i",
    (income, expectedMinorUnits) => {
      expect(
        calculateCuneoDeduction(decimalFromInteger(income)).publicAmount
          .minorUnits,
      ).toBe(expectedMinorUnits);
    },
  );

  it.each([
    [8_499, "603.429"],
    [8_500, "603.5"],
    [8_501, "450.553"],
    [14_999, "794.947"],
    [15_000, "795"],
    [15_001, "720.048"],
    [19_999, "959.952"],
    [20_000, "960"],
    [20_001, "0"],
  ] as const)(
    "applies the non-taxable cuneo sum at direct income %i",
    (income, exact) => {
      const employment = calculateEmploymentDeduction(
        decimalFromInteger(income),
      );
      const gross = calculateGrossIrpef(decimalFromInteger(income));
      const benefits = calculateCashBenefits(
        decimalFromInteger(income),
        gross.grossIrpef,
        employment.publicAmount,
      );
      expect(toPlainDecimalString(benefits.cuneoCashSumExact)).toBe(exact);
    },
  );

  it.each([
    [8_173, false],
    [8_174, true],
    [8_175, true],
    [14_999, true],
    [15_000, true],
    [15_001, false],
  ] as const)(
    "uses the strict trattamento-integrativo capacity test at direct income %i",
    (income, expected) => {
      const employment = calculateEmploymentDeduction(
        decimalFromInteger(income),
      );
      const gross = calculateGrossIrpef(decimalFromInteger(income));
      const benefits = calculateCashBenefits(
        decimalFromInteger(income),
        gross.grossIrpef,
        employment.publicAmount,
      );
      expect(benefits.treatmentIntegrativoApplies).toBe(expected);
      expect(benefits.treatmentIntegrativo.minorUnits).toBe(
        expected ? 120_000 : 0,
      );
    },
  );

  it("caps net IRPEF at zero and keeps cash benefits outside tax deductions", () => {
    expect(
      calculateNetIrpef(
        { currency: "EUR", minorUnits: 100_000 },
        { currency: "EUR", minorUnits: 90_000 },
        { currency: "EUR", minorUnits: 20_000 },
      ).publicAmount.minorUnits,
    ).toBe(0);
  });
});
