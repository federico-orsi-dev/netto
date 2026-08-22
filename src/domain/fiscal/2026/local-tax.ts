import type { MoneyAmount } from "../../calculation/contracts";
import {
  compare,
  decimalFromInteger,
  decimalFromMinorUnits,
  decimalFromString,
  maximum,
  minimum,
  multiply,
  subtract,
  type ExactDecimal,
} from "../../money/decimal-money";
import { moneyFromExact, sumMoney } from "../../money/public-money";
import { RULESET_2026 } from "./ruleset-2026";

const ZERO = decimalFromInteger(0);

export interface LocalTaxStageResult {
  readonly lombardyBracketExact: readonly [
    ExactDecimal,
    ExactDecimal,
    ExactDecimal,
    ExactDecimal,
  ];
  readonly lombardyBrackets: readonly [
    MoneyAmount,
    MoneyAmount,
    MoneyAmount,
    MoneyAmount,
  ];
  readonly regionalTax: MoneyAmount;
  readonly reconciledRegionalTaxExact: ExactDecimal;
  readonly municipalTaxExact: ExactDecimal;
  readonly municipalTax: MoneyAmount;
  readonly municipalTaxApplies: boolean;
}

export function calculateLocalTaxes(
  commonBase: ExactDecimal,
): LocalTaxStageResult {
  const [firstBracket, secondBracket, thirdBracket, fourthBracket] =
    RULESET_2026.localTax.lombardyBrackets;
  const threshold15 = decimalFromInteger(firstBracket.upperBoundEuro);
  const threshold28 = decimalFromInteger(secondBracket.upperBoundEuro);
  const threshold50 = decimalFromInteger(thirdBracket.upperBoundEuro);
  const lombardyBracketExact = [
    multiply(
      minimum(commonBase, threshold15),
      decimalFromString(firstBracket.rate),
    ),
    multiply(
      minimum(
        maximum(subtract(commonBase, threshold15), ZERO),
        decimalFromInteger(
          secondBracket.upperBoundEuro - firstBracket.upperBoundEuro,
        ),
      ),
      decimalFromString(secondBracket.rate),
    ),
    multiply(
      minimum(
        maximum(subtract(commonBase, threshold28), ZERO),
        decimalFromInteger(
          thirdBracket.upperBoundEuro - secondBracket.upperBoundEuro,
        ),
      ),
      decimalFromString(thirdBracket.rate),
    ),
    multiply(
      maximum(subtract(commonBase, threshold50), ZERO),
      decimalFromString(fourthBracket.rate),
    ),
  ] as const;
  const lombardyBrackets = [
    moneyFromExact(lombardyBracketExact[0]),
    moneyFromExact(lombardyBracketExact[1]),
    moneyFromExact(lombardyBracketExact[2]),
    moneyFromExact(lombardyBracketExact[3]),
  ] as const;
  const regionalTax = sumMoney(lombardyBrackets);
  const municipalThreshold = decimalFromInteger(
    RULESET_2026.localTax.milanExemptionThresholdEuro,
  );
  const municipalTaxApplies = compare(commonBase, municipalThreshold) > 0;
  const municipalTaxExact =
    // RULE-MILAN-2026-001 — apply 0.8% to the whole base only above EUR 23,000.
    municipalTaxApplies
      ? multiply(commonBase, decimalFromString(RULESET_2026.localTax.milanRate))
      : ZERO;

  return {
    lombardyBracketExact,
    lombardyBrackets,
    regionalTax,
    reconciledRegionalTaxExact: decimalFromMinorUnits(regionalTax.minorUnits),
    municipalTaxExact,
    municipalTax: moneyFromExact(municipalTaxExact),
    municipalTaxApplies,
  };
}
