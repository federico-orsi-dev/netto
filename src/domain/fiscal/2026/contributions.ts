import type { MoneyAmount } from "../../calculation/contracts";
import { CalculationInvariantError } from "../../calculation/errors";
import {
  add,
  compare,
  decimalFromInteger,
  decimalFromMinorUnits,
  decimalFromString,
  maximum,
  minimum,
  multiply,
  subtract,
  toPlainDecimalString,
  type ExactDecimal,
} from "../../money/decimal-money";
import { moneyFromExact, sumMoney } from "../../money/public-money";
import { RULESET_2026 } from "./ruleset-2026";

export interface ContributionStageResult {
  readonly contributableRemunerationExact: ExactDecimal;
  readonly pensionContributionBaseExact: ExactDecimal;
  readonly employeeIvsExact: ExactDecimal;
  readonly additionalIvsExact: ExactDecimal;
  readonly employeeCigsExact: ExactDecimal;
  readonly employeeIvs: MoneyAmount;
  readonly additionalIvs: MoneyAmount;
  readonly employeeCigs: MoneyAmount;
  readonly employeeContributions: MoneyAmount;
  readonly reconciledEmployeeContributionsExact: ExactDecimal;
  readonly additionalIvsApplies: boolean;
}

export function establishContributableRemuneration(
  annualGrossSalaryEuro: number,
): ExactDecimal {
  return decimalFromInteger(annualGrossSalaryEuro);
}

export function applyPensionCeilingForFixture(
  contributionBase: ExactDecimal,
  ceilingEligible: boolean,
): ExactDecimal {
  if (!ceilingEligible) {
    return contributionBase;
  }
  return minimum(
    contributionBase,
    decimalFromInteger(RULESET_2026.contribution.pensionCeilingEuro),
  );
}

export function calculateContributions(
  annualGrossSalaryEuro: number,
): ContributionStageResult {
  const contributableRemunerationExact = establishContributableRemuneration(
    annualGrossSalaryEuro,
  );
  const ceiling = decimalFromInteger(
    RULESET_2026.contribution.pensionCeilingEuro,
  );

  if (compare(contributableRemunerationExact, ceiling) >= 0) {
    throw new CalculationInvariantError(
      "The supported V1 range must remain below the 2026 pension ceiling so eligibility cannot affect a result.",
    );
  }

  const pensionContributionBaseExact = contributableRemunerationExact;
  const employeeIvsExact = multiply(
    pensionContributionBaseExact,
    decimalFromString(RULESET_2026.contribution.employeeIvsRate),
  );
  const threshold = decimalFromInteger(
    RULESET_2026.contribution.additionalIvsThresholdEuro,
  );
  const excess = maximum(
    decimalFromInteger(0),
    subtract(pensionContributionBaseExact, threshold),
  );
  const additionalIvsExact = multiply(
    excess,
    decimalFromString(RULESET_2026.contribution.additionalIvsRate),
  );
  const employeeCigsExact = multiply(
    contributableRemunerationExact,
    decimalFromString(RULESET_2026.contribution.employeeCigsRate),
  );

  const employeeIvs = moneyFromExact(employeeIvsExact);
  const additionalIvs = moneyFromExact(additionalIvsExact);
  const employeeCigs = moneyFromExact(employeeCigsExact);
  const employeeContributions = sumMoney([
    employeeIvs,
    additionalIvs,
    employeeCigs,
  ]);

  return {
    contributableRemunerationExact,
    pensionContributionBaseExact,
    employeeIvsExact,
    additionalIvsExact,
    employeeCigsExact,
    employeeIvs,
    additionalIvs,
    employeeCigs,
    employeeContributions,
    reconciledEmployeeContributionsExact: decimalFromMinorUnits(
      employeeContributions.minorUnits,
    ),
    additionalIvsApplies: compare(excess, decimalFromInteger(0)) > 0,
  };
}

export function contributionExactFixture(result: ContributionStageResult) {
  return {
    employeeIvs: toPlainDecimalString(result.employeeIvsExact),
    additionalIvs: toPlainDecimalString(result.additionalIvsExact),
    employeeCigs: toPlainDecimalString(result.employeeCigsExact),
    exactTotal: toPlainDecimalString(
      add(
        result.employeeIvsExact,
        result.additionalIvsExact,
        result.employeeCigsExact,
      ),
    ),
  } as const;
}
