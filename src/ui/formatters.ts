import type { MoneyAmount } from "../domain";

const euroFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
});

const integerFormatter = new Intl.NumberFormat("it-IT", {
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("it-IT", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

export function formatMoney(amount: MoneyAmount): string {
  return euroFormatter.format(amount.minorUnits / 100);
}

export function formatSignedMoney(
  amount: MoneyAmount,
  direction: "add" | "subtract" | "neutral",
): string {
  const formatted = formatMoney({
    currency: "EUR",
    minorUnits: Math.abs(amount.minorUnits),
  });
  if (amount.minorUnits === 0 || direction === "neutral") return formatted;
  return `${direction === "add" ? "+" : "−"}${formatted}`;
}

export function formatMoneyDelta(amount: MoneyAmount): string {
  if (amount.minorUnits === 0) return formatMoney(amount);
  return `${amount.minorUnits > 0 ? "+" : "−"}${formatMoney({
    currency: "EUR",
    minorUnits: Math.abs(amount.minorUnits),
  })}`;
}

export function formatBasisPoints(basisPoints: number): string {
  return percentFormatter.format(basisPoints / 10_000);
}

export function formatInteger(value: number): string {
  return integerFormatter.format(value);
}

export function formatExactEuro(value: string): string {
  return `${value.replace(".", ",")} €`;
}

export function formatRate(value: string): string {
  return percentFormatter.format(Number(value));
}
