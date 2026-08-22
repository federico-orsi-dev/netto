import { describe, expect, it } from "vitest";

import { formatSalaryInput, parseItalianSalaryInput } from "./input-parser";

describe("Italian RAL input", () => {
  it.each([
    ["10000", 10_000],
    ["10.000", 10_000],
    ["120.000,00", 120_000],
    [" 35.000 ", 35_000],
  ] as const)("parses %s without changing the amount", (raw, expected) => {
    expect(parseItalianSalaryInput(raw)).toEqual({ ok: true, value: expected });
  });

  it.each([
    ["", "required"],
    ["9.999", "below_supported_range"],
    ["120001", "above_supported_range"],
    ["30.000,50", "whole_euros_required"],
    ["30,000.00", "invalid_format"],
    ["€ 30.000", "invalid_format"],
    ["3e4", "invalid_format"],
  ] as const)("rejects %s as %s", (raw, code) => {
    expect(parseItalianSalaryInput(raw)).toEqual({ ok: false, code });
  });

  it("formats valid values using Italian grouping", () => {
    expect(formatSalaryInput(35_000)).toBe("35.000");
  });
});
