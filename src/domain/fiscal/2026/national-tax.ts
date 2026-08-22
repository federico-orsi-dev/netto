import type { MoneyAmount } from "../../calculation/contracts";
import {
  add,
  compare,
  decimalFromInteger,
  decimalFromMinorUnits,
  decimalFromString,
  divide,
  maximum,
  minimum,
  multiply,
  subtract,
  toPlainDecimalString,
  truncatePositiveRatio4,
  type ExactDecimal,
} from "../../money/decimal-money";
import {
  moneyFromExact,
  moneyFromMinorUnits,
  sumMoney,
} from "../../money/public-money";
import { RULESET_2026 } from "./ruleset-2026";

const ZERO = decimalFromInteger(0);

export interface TaxableIncomeStageResult {
  readonly taxableIncome: MoneyAmount;
  readonly taxableIncomeExact: ExactDecimal;
}

export interface GrossIrpefStageResult {
  readonly bracketExact: readonly [ExactDecimal, ExactDecimal, ExactDecimal];
  readonly brackets: readonly [MoneyAmount, MoneyAmount, MoneyAmount];
  readonly grossIrpef: MoneyAmount;
  readonly reconciledGrossIrpefExact: ExactDecimal;
}

export interface EmploymentDeductionResult {
  readonly exact: ExactDecimal;
  readonly publicAmount: MoneyAmount;
  readonly rawRatio: ExactDecimal;
  readonly statutoryTruncatedRatio: ExactDecimal;
  readonly includesSixtyFiveEuroAdjustment: boolean;
}

export interface CuneoDeductionResult {
  readonly exact: ExactDecimal;
  readonly publicAmount: MoneyAmount;
  readonly applies: boolean;
}

export interface NetIrpefResult {
  readonly publicAmount: MoneyAmount;
  readonly exactFromPublicHandoffs: ExactDecimal;
}

export interface CashBenefitsResult {
  readonly cuneoCashSumExact: ExactDecimal;
  readonly cuneoCashSum: MoneyAmount;
  readonly treatmentIntegrativoExact: ExactDecimal;
  readonly treatmentIntegrativo: MoneyAmount;
  readonly cuneoCashSumApplies: boolean;
  readonly treatmentIntegrativoApplies: boolean;
}

export function calculateTaxableIncome(
  annualGrossSalaryEuro: number,
  employeeContributions: MoneyAmount,
): TaxableIncomeStageResult {
  const taxableIncome = moneyFromMinorUnits(
    annualGrossSalaryEuro * 100 - employeeContributions.minorUnits,
  );
  return {
    taxableIncome,
    taxableIncomeExact: decimalFromMinorUnits(taxableIncome.minorUnits),
  };
}

export function calculateGrossIrpef(
  taxableIncomeExact: ExactDecimal,
): GrossIrpefStageResult {
  const [firstBracket, secondBracket, thirdBracket] =
    RULESET_2026.nationalTax.brackets;
  const threshold28 = decimalFromInteger(firstBracket.upperBoundEuro);
  const threshold50 = decimalFromInteger(secondBracket.upperBoundEuro);
  const firstSlice = minimum(taxableIncomeExact, threshold28);
  const secondSlice = minimum(
    maximum(subtract(taxableIncomeExact, threshold28), ZERO),
    decimalFromInteger(
      secondBracket.upperBoundEuro - firstBracket.upperBoundEuro,
    ),
  );
  const thirdSlice = maximum(subtract(taxableIncomeExact, threshold50), ZERO);
  const bracketExact = [
    multiply(firstSlice, decimalFromString(firstBracket.rate)),
    multiply(secondSlice, decimalFromString(secondBracket.rate)),
    multiply(thirdSlice, decimalFromString(thirdBracket.rate)),
  ] as const;
  const brackets = [
    moneyFromExact(bracketExact[0]),
    moneyFromExact(bracketExact[1]),
    moneyFromExact(bracketExact[2]),
  ] as const;
  const grossIrpef = sumMoney(brackets);

  return {
    bracketExact,
    brackets,
    grossIrpef,
    reconciledGrossIrpefExact: decimalFromMinorUnits(grossIrpef.minorUnits),
  };
}

export function calculateEmploymentDeduction(
  income: ExactDecimal,
): EmploymentDeductionResult {
  const config = RULESET_2026.nationalTax.employmentDeduction;
  const income15 = decimalFromInteger(config.lowIncomeMaximumEuro);
  const income25 = decimalFromInteger(config.adjustmentStartExclusiveEuro);
  const income28 = decimalFromInteger(config.middleIncomeMaximumEuro);
  const income35 = decimalFromInteger(config.adjustmentEndInclusiveEuro);
  const income50 = decimalFromInteger(config.upperIncomeMaximumEuro);
  let rawRatio = ZERO;
  let statutoryTruncatedRatio = ZERO;
  let exact = ZERO;

  if (compare(income, income15) <= 0) {
    exact = decimalFromInteger(config.lowIncomeAmountEuro);
  } else if (compare(income, income28) <= 0) {
    const numerator = subtract(income28, income);
    const ratioDenominator = decimalFromInteger(
      config.middleIncomeMaximumEuro - config.lowIncomeMaximumEuro,
    );
    rawRatio = divide(numerator, ratioDenominator);
    statutoryTruncatedRatio = truncatePositiveRatio4(
      numerator,
      ratioDenominator,
    );
    exact = add(
      decimalFromInteger(config.middleIncomeBaseAmountEuro),
      multiply(
        decimalFromInteger(config.middleIncomeVariableAmountEuro),
        statutoryTruncatedRatio,
      ),
    );
  } else if (compare(income, income50) <= 0) {
    const numerator = subtract(income50, income);
    const ratioDenominator = decimalFromInteger(
      config.upperIncomeMaximumEuro - config.middleIncomeMaximumEuro,
    );
    rawRatio = divide(numerator, ratioDenominator);
    statutoryTruncatedRatio = truncatePositiveRatio4(
      numerator,
      ratioDenominator,
    );
    exact = multiply(
      decimalFromInteger(config.middleIncomeBaseAmountEuro),
      statutoryTruncatedRatio,
    );
  }

  const includesSixtyFiveEuroAdjustment =
    compare(income, income25) > 0 && compare(income, income35) <= 0;
  if (includesSixtyFiveEuroAdjustment) {
    exact = add(exact, decimalFromInteger(config.adjustmentAmountEuro));
  }

  return {
    exact,
    publicAmount: moneyFromExact(exact),
    rawRatio,
    statutoryTruncatedRatio,
    includesSixtyFiveEuroAdjustment,
  };
}

export function calculateCuneoDeduction(
  income: ExactDecimal,
): CuneoDeductionResult {
  const config = RULESET_2026.nationalTax.cuneoDeduction;
  const income20 = decimalFromInteger(config.startExclusiveEuro);
  const income32 = decimalFromInteger(config.fullAmountEndInclusiveEuro);
  const income40 = decimalFromInteger(config.phaseOutEndInclusiveEuro);
  let exact = ZERO;

  if (compare(income, income20) > 0 && compare(income, income32) <= 0) {
    exact = decimalFromInteger(config.fullAmountEuro);
  } else if (compare(income, income32) > 0 && compare(income, income40) <= 0) {
    exact = multiply(
      decimalFromInteger(config.fullAmountEuro),
      divide(
        subtract(income40, income),
        decimalFromInteger(
          config.phaseOutEndInclusiveEuro - config.fullAmountEndInclusiveEuro,
        ),
      ),
    );
  }

  return {
    exact,
    publicAmount: moneyFromExact(exact),
    applies: compare(exact, ZERO) > 0,
  };
}

export function calculateNetIrpef(
  grossIrpef: MoneyAmount,
  employmentDeduction: MoneyAmount,
  cuneoDeduction: MoneyAmount,
): NetIrpefResult {
  const minorUnits = Math.max(
    0,
    grossIrpef.minorUnits -
      employmentDeduction.minorUnits -
      cuneoDeduction.minorUnits,
  );
  const publicAmount = moneyFromMinorUnits(minorUnits);
  return {
    publicAmount,
    exactFromPublicHandoffs: decimalFromMinorUnits(minorUnits),
  };
}

export function calculateCashBenefits(
  income: ExactDecimal,
  grossIrpef: MoneyAmount,
  employmentDeduction: MoneyAmount,
): CashBenefitsResult {
  const cuneoConfig = RULESET_2026.nationalTax.cuneoCashSum;
  const treatmentConfig = RULESET_2026.nationalTax.treatmentIntegrativo;
  const income8_5 = decimalFromInteger(cuneoConfig.firstBandMaximumEuro);
  const income15 = decimalFromInteger(cuneoConfig.secondBandMaximumEuro);
  const income20 = decimalFromInteger(cuneoConfig.eligibilityMaximumEuro);
  let cuneoCashSumExact = ZERO;

  if (compare(income, income20) <= 0) {
    const rate =
      compare(income, income8_5) <= 0
        ? cuneoConfig.rates[0]
        : compare(income, income15) <= 0
          ? cuneoConfig.rates[1]
          : cuneoConfig.rates[2];
    cuneoCashSumExact = multiply(income, decimalFromString(rate));
  }

  const treatmentCapacityThresholdMinorUnits =
    employmentDeduction.minorUnits -
    treatmentConfig.deductionAdjustmentEuro * 100;
  const treatmentIntegrativoApplies =
    compare(income, income15) <= 0 &&
    grossIrpef.minorUnits > treatmentCapacityThresholdMinorUnits;
  const treatmentIntegrativoExact = treatmentIntegrativoApplies
    ? decimalFromInteger(treatmentConfig.fullYearAmountEuro)
    : ZERO;

  return {
    cuneoCashSumExact,
    cuneoCashSum: moneyFromExact(cuneoCashSumExact),
    treatmentIntegrativoExact,
    treatmentIntegrativo: moneyFromExact(treatmentIntegrativoExact),
    cuneoCashSumApplies: compare(cuneoCashSumExact, ZERO) > 0,
    treatmentIntegrativoApplies,
  };
}

export function nationalExactFixture(value: ExactDecimal): string {
  return toPlainDecimalString(value);
}
