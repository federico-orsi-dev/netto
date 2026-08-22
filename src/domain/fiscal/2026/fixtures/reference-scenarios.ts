import type { CalculationAmountId } from "../../ids";

export interface ReferenceScenario2026 {
  readonly ralEuro: number;
  readonly rationale: string;
  readonly expectedMinorUnits: Readonly<
    Partial<Record<CalculationAmountId, number>>
  >;
}

export const REFERENCE_SCENARIOS_2026 = [
  {
    ralEuro: 10_000,
    rationale:
      "Supported minimum, local-due exclusion invariant, coexisting cash benefits, and signed modeled burden.",
    expectedMinorUnits: {
      employeeContributions: 94_900,
      taxableIncome: 905_100,
      grossIrpef: 208_173,
      employmentDeduction: 195_500,
      netIrpef: 12_673,
      cuneoCashSum: 47_970,
      treatmentIntegrativo: 120_000,
      regionalTax: 11_133,
      municipalTax: 0,
      modeledBurden: -49_264,
      annualNet: 1_049_264,
    },
  },
  {
    ralEuro: 15_000,
    rationale:
      "Low-income relief with treatment integrativo and cuneo cash sum after contribution-base conversion.",
    expectedMinorUnits: {
      employeeContributions: 142_350,
      taxableIncome: 1_357_650,
      netIrpef: 116_760,
      cuneoCashSum: 71_955,
      treatmentIntegrativo: 120_000,
      annualNet: 1_416_146,
    },
  },
  {
    ralEuro: 20_000,
    rationale:
      "Contribution-driven income remains in the cash-sum band while treatment integrativo no longer applies.",
    expectedMinorUnits: {
      taxableIncome: 1_810_200,
      employmentDeduction: 281_595,
      netIrpef: 134_751,
      cuneoCashSum: 86_890,
      treatmentIntegrativo: 0,
      annualNet: 1_738_988,
    },
  },
  {
    ralEuro: 28_000,
    rationale:
      "Cuneo deduction, Milan whole-base surcharge, and national base below the headline RAL threshold.",
    expectedMinorUnits: {
      taxableIncome: 2_534_280,
      cuneoDeduction: 100_000,
      netIrpef: 261_060,
      regionalTax: 34_792,
      municipalTax: 20_274,
      annualNet: 2_218_154,
    },
  },
  {
    ralEuro: 35_000,
    rationale:
      "Middle-income employment and cuneo deductions with both local liabilities active.",
    expectedMinorUnits: {
      grossIrpef: 765_391,
      employmentDeduction: 165_546,
      cuneoDeduction: 100_000,
      netIrpef: 499_845,
      annualNet: 2_597_345,
    },
  },
  {
    ralEuro: 40_000,
    rationale: "Cuneo phase-out is active after contribution-base conversion.",
    expectedMinorUnits: {
      taxableIncome: 3_620_400,
      employmentDeduction: 119_757,
      cuneoDeduction: 47_450,
      netIrpef: 747_525,
      annualNet: 2_790_811,
    },
  },
  {
    ralEuro: 55_240,
    rationale:
      "Verified Article 13 effective transition immediately below zero after component-first contributions.",
    expectedMinorUnits: {
      employeeIvsContribution: 507_656,
      employeeCigsContribution: 16_572,
      employeeContributions: 524_228,
      taxableIncome: 4_999_772,
      grossIrpef: 1_369_925,
      employmentDeduction: 19,
      netIrpef: 1_369_906,
      annualNet: 3_513_042,
    },
  },
  {
    ralEuro: 55_241,
    rationale:
      "Verified Article 13 effective transition at zero after contribution normalization.",
    expectedMinorUnits: {
      employeeIvsContribution: 507_665,
      employeeCigsContribution: 16_572,
      employeeContributions: 524_237,
      taxableIncome: 4_999_863,
      grossIrpef: 1_369_955,
      employmentDeduction: 0,
      netIrpef: 1_369_955,
      annualNet: 3_513_081,
    },
  },
  {
    ralEuro: 56_224,
    rationale:
      "Additional IVS threshold endpoint with the excess component still zero.",
    expectedMinorUnits: {
      employeeContributions: 533_566,
      additionalIvsContribution: 0,
      taxableIncome: 5_088_834,
      annualNet: 3_561_557,
    },
  },
  {
    ralEuro: 75_000,
    rationale:
      "Representative upper-middle salary with additional IVS and third national bracket active.",
    expectedMinorUnits: {
      employeeContributions: 730_526,
      taxableIncome: 6_769_474,
      grossIrpef: 2_130_874,
      regionalTax: 107_442,
      municipalTax: 54_156,
      annualNet: 4_477_002,
    },
  },
  {
    ralEuro: 120_000,
    rationale: "Supported maximum and in-range pension-ceiling no-op.",
    expectedMinorUnits: {
      employeeContributions: 1_202_576,
      taxableIncome: 10_797_424,
      grossIrpef: 3_862_892,
      regionalTax: 177_125,
      municipalTax: 86_379,
      modeledBurden: 5_328_972,
      annualNet: 6_671_028,
    },
  },
] as const satisfies readonly ReferenceScenario2026[];
