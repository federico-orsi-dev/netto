import type { MoneyAmount } from "../calculation/contracts";
import { CalculationInvariantError } from "../calculation/errors";
import {
  decimalFromMinorUnits,
  divide,
  normalizeToMinorUnits,
  type ExactDecimal,
} from "./decimal-money";

export function moneyFromMinorUnits(minorUnits: number): MoneyAmount {
  if (!Number.isSafeInteger(minorUnits) || minorUnits < 0) {
    throw new CalculationInvariantError(
      "MoneyAmount requires non-negative safe integer euro cents.",
    );
  }
  return Object.freeze({ currency: "EUR", minorUnits });
}

export function signedMoneyFromMinorUnits(minorUnits: number): MoneyAmount {
  if (!Number.isSafeInteger(minorUnits)) {
    throw new CalculationInvariantError(
      "Signed MoneyAmount requires safe integer euro cents.",
    );
  }
  return Object.freeze({
    currency: "EUR",
    minorUnits: Object.is(minorUnits, -0) ? 0 : minorUnits,
  });
}

export function moneyFromExact(value: ExactDecimal): MoneyAmount {
  return moneyFromMinorUnits(normalizeToMinorUnits(value));
}

export function sumMoney(values: readonly MoneyAmount[]): MoneyAmount {
  const minorUnits = values.reduce(
    (total, value) => total + value.minorUnits,
    0,
  );
  return moneyFromMinorUnits(minorUnits);
}

export function subtractMoney(
  left: MoneyAmount,
  right: MoneyAmount,
): MoneyAmount {
  return moneyFromMinorUnits(left.minorUnits - right.minorUnits);
}

export function divideMoneyHalfUp(
  value: MoneyAmount,
  divisor: number,
): MoneyAmount {
  if (!Number.isSafeInteger(divisor) || divisor <= 0) {
    throw new CalculationInvariantError(
      "Money division requires a positive integer divisor.",
    );
  }
  return moneyFromExact(
    divide(
      decimalFromMinorUnits(value.minorUnits),
      decimalFromMinorUnits(divisor * 100),
    ),
  );
}

export function moneyEquals(left: MoneyAmount, right: MoneyAmount): boolean {
  return (
    left.currency === right.currency && left.minorUnits === right.minorUnits
  );
}
