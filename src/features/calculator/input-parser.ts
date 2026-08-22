export type SalaryInputIssueCode =
  | "required"
  | "invalid_format"
  | "whole_euros_required"
  | "below_supported_range"
  | "above_supported_range";

export type ParsedSalaryInput =
  | { readonly ok: true; readonly value: number }
  | { readonly ok: false; readonly code: SalaryInputIssueCode };

const MINIMUM_RAL = 10_000;
const MAXIMUM_RAL = 120_000;
const INTEGER_PART = /^(?:\d+|\d{1,3}(?:\.\d{3})+)$/;

export function parseItalianSalaryInput(rawValue: string): ParsedSalaryInput {
  const value = rawValue.trim();
  if (value.length === 0) return { ok: false, code: "required" };

  const commaIndex = value.indexOf(",");
  const integerPart = commaIndex >= 0 ? value.slice(0, commaIndex) : value;
  const decimalPart = commaIndex >= 0 ? value.slice(commaIndex + 1) : undefined;

  if (
    !INTEGER_PART.test(integerPart) ||
    value.indexOf(",", commaIndex + 1) >= 0
  ) {
    return { ok: false, code: "invalid_format" };
  }
  if (decimalPart !== undefined && decimalPart !== "00") {
    if (/^\d+$/.test(decimalPart) && decimalPart.length > 0) {
      return { ok: false, code: "whole_euros_required" };
    }
    return { ok: false, code: "invalid_format" };
  }

  const numericValue = Number(integerPart.replaceAll(".", ""));
  if (!Number.isSafeInteger(numericValue)) {
    return { ok: false, code: "invalid_format" };
  }
  if (numericValue < MINIMUM_RAL) {
    return { ok: false, code: "below_supported_range" };
  }
  if (numericValue > MAXIMUM_RAL) {
    return { ok: false, code: "above_supported_range" };
  }
  return { ok: true, value: numericValue };
}

export function formatSalaryInput(value: number): string {
  return new Intl.NumberFormat("it-IT", { maximumFractionDigits: 0 }).format(
    value,
  );
}
