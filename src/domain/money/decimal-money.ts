import Decimal from "decimal.js";

import { CalculationInvariantError } from "../calculation/errors";
import type { DecimalString } from "../calculation/contracts";

Decimal.set({
  precision: 40,
  rounding: Decimal.ROUND_HALF_UP,
  toExpNeg: -100,
  toExpPos: 100,
});

declare const exactDecimalBrand: unique symbol;

export type ExactDecimal = {
  readonly [exactDecimalBrand]: "ExactDecimal";
};

const CANONICAL_DECIMAL = /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/;

function wrap(value: Decimal): ExactDecimal {
  return value as unknown as ExactDecimal;
}

function unwrap(value: ExactDecimal): Decimal {
  return value as unknown as Decimal;
}

export function decimalFromInteger(value: number): ExactDecimal {
  if (!Number.isSafeInteger(value)) {
    throw new CalculationInvariantError(
      `Expected a safe integer, received ${String(value)}.`,
    );
  }
  return wrap(new Decimal(value));
}

export function decimalFromString(value: DecimalString): ExactDecimal {
  if (!CANONICAL_DECIMAL.test(value)) {
    throw new CalculationInvariantError(
      `Expected a canonical decimal string, received ${value}.`,
    );
  }
  return wrap(new Decimal(value));
}

export function decimalFromMinorUnits(minorUnits: number): ExactDecimal {
  return divide(decimalFromInteger(minorUnits), decimalFromInteger(100));
}

export function add(...values: readonly ExactDecimal[]): ExactDecimal {
  return wrap(
    values.reduce((total, value) => total.plus(unwrap(value)), new Decimal(0)),
  );
}

export function subtract(
  left: ExactDecimal,
  right: ExactDecimal,
): ExactDecimal {
  return wrap(unwrap(left).minus(unwrap(right)));
}

export function multiply(
  left: ExactDecimal,
  right: ExactDecimal,
): ExactDecimal {
  return wrap(unwrap(left).times(unwrap(right)));
}

export function divide(left: ExactDecimal, right: ExactDecimal): ExactDecimal {
  if (unwrap(right).isZero()) {
    throw new CalculationInvariantError("Decimal division by zero.");
  }
  return wrap(unwrap(left).dividedBy(unwrap(right)));
}

export function minimum(left: ExactDecimal, right: ExactDecimal): ExactDecimal {
  return wrap(Decimal.min(unwrap(left), unwrap(right)));
}

export function maximum(left: ExactDecimal, right: ExactDecimal): ExactDecimal {
  return wrap(Decimal.max(unwrap(left), unwrap(right)));
}

export function compare(left: ExactDecimal, right: ExactDecimal): -1 | 0 | 1 {
  const comparison = unwrap(left).comparedTo(unwrap(right));
  return comparison < 0 ? -1 : comparison > 0 ? 1 : 0;
}

export function isZero(value: ExactDecimal): boolean {
  return unwrap(value).isZero();
}

export function truncatePositiveRatio4(
  numerator: ExactDecimal,
  denominator: ExactDecimal,
): ExactDecimal {
  if (
    compare(numerator, decimalFromInteger(0)) < 0 ||
    compare(denominator, decimalFromInteger(0)) <= 0
  ) {
    throw new CalculationInvariantError(
      "Statutory ratio truncation requires a non-negative numerator and positive denominator.",
    );
  }

  const scale = new Decimal(10_000);
  return wrap(
    unwrap(numerator)
      .dividedBy(unwrap(denominator))
      .times(scale)
      .floor()
      .dividedBy(scale),
  );
}

export function normalizeToMinorUnits(value: ExactDecimal): number {
  const normalized = unwrap(value)
    .times(100)
    .toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
  const minorUnits = normalized.isZero() ? 0 : normalized.toNumber();

  if (!Number.isSafeInteger(minorUnits)) {
    throw new CalculationInvariantError(
      "Public monetary value exceeds safe integer euro cents.",
    );
  }
  if (minorUnits < 0) {
    throw new CalculationInvariantError(
      "Public monetary values must be non-negative.",
    );
  }
  return minorUnits;
}

export function ratioToBasisPointsHalfUp(
  numeratorMinorUnits: number,
  denominatorMinorUnits: number,
): number {
  if (
    !Number.isSafeInteger(numeratorMinorUnits) ||
    !Number.isSafeInteger(denominatorMinorUnits)
  ) {
    throw new CalculationInvariantError(
      "Basis-point inputs must be safe integer minor units.",
    );
  }
  if (denominatorMinorUnits <= 0) {
    throw new CalculationInvariantError(
      "Basis-point ratio requires a positive denominator.",
    );
  }

  return unwrap(
    multiply(
      divide(
        decimalFromInteger(numeratorMinorUnits),
        decimalFromInteger(denominatorMinorUnits),
      ),
      decimalFromInteger(10_000),
    ),
  )
    .toDecimalPlaces(0, Decimal.ROUND_HALF_UP)
    .toNumber();
}

export function toPlainDecimalString(value: ExactDecimal): DecimalString {
  const plain = unwrap(value).toFixed();
  return plain === "-0" ? "0" : plain;
}
