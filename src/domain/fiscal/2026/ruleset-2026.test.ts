import { describe, expect, it } from "vitest";

import { EXCLUDED_RULE_IDS_2026, VERIFIED_RULE_IDS_2026 } from "../ids";
import { SOURCE_IDS_2026 } from "../source-ids";
import { calculateSalary2026 } from "./calculate-salary-2026";
import { EXCLUSIONS_2026, RULESET_2026 } from "./ruleset-2026";
import { SOURCE_CATALOG_2026 } from "./sources-2026";

describe("FiscalRuleset2026 integrity", () => {
  it("is explicitly bound to the approved year, profile, and money policy", () => {
    expect(RULESET_2026.fiscalYear).toBe(2026);
    expect(RULESET_2026.rulesetId).toBe("it-2026-v1");
    expect(RULESET_2026.profileId).toBe("it-2026-milan-industrial-cigs-v1");
    expect(RULESET_2026.moneyPolicyId).toBe("POLICY-MONEY-2026-001");
  });

  it("maps exactly 15 verified rules and 9 excluded boundaries", () => {
    expect(RULESET_2026.verifiedRuleIds).toEqual(VERIFIED_RULE_IDS_2026);
    expect(RULESET_2026.excludedRuleIds).toEqual(EXCLUDED_RULE_IDS_2026);
    expect(Object.keys(RULESET_2026.ruleMetadata)).toHaveLength(15);
    expect(EXCLUSIONS_2026).toHaveLength(9);
  });

  it("resolves every executable source reference to registered runtime metadata", () => {
    expect(SOURCE_CATALOG_2026.map(({ id }) => id)).toEqual(SOURCE_IDS_2026);
    const registered = new Set(SOURCE_IDS_2026);
    for (const metadata of Object.values(RULESET_2026.ruleMetadata)) {
      expect(metadata.sourceIds.length).toBeGreaterThan(0);
      for (const sourceId of metadata.sourceIds)
        expect(registered.has(sourceId)).toBe(true);
    }
  });

  it("binds explanation-facing rates and thresholds to the typed ruleset", () => {
    const outcome = calculateSalary2026({
      annualGrossSalaryEuro: 60_000,
      salaryPaymentsPerYear: 13,
    });
    if (!outcome.ok) throw new Error("Expected a supported trace fixture.");

    const parameterValue = (traceId: string, parameterName: string) => {
      const entry = outcome.result.trace.find(({ id }) => id === traceId);
      const parameter = entry?.formula.parameters.find(
        ({ name }) => name === parameterName,
      );
      return parameter !== undefined && "value" in parameter
        ? parameter.value
        : undefined;
    };

    const expectedParameters = [
      [
        "trace:pension-contribution-base",
        "ceiling",
        String(RULESET_2026.contribution.pensionCeilingEuro),
      ],
      ["trace:employee-ivs", "rate", RULESET_2026.contribution.employeeIvsRate],
      [
        "trace:additional-ivs",
        "threshold",
        String(RULESET_2026.contribution.additionalIvsThresholdEuro),
      ],
      [
        "trace:employee-cigs",
        "rate",
        RULESET_2026.contribution.employeeCigsRate,
      ],
      [
        "trace:municipal-tax",
        "exemptionThreshold",
        String(RULESET_2026.localTax.milanExemptionThresholdEuro),
      ],
      ["trace:municipal-tax", "rate", RULESET_2026.localTax.milanRate],
    ] as const;

    for (const [traceId, parameterName, expectedValue] of expectedParameters) {
      expect(parameterValue(traceId, parameterName)).toBe(expectedValue);
    }

    for (const [
      index,
      bracket,
    ] of RULESET_2026.nationalTax.brackets.entries()) {
      expect(
        parameterValue(
          `trace:gross-irpef-bracket-${String(index + 1)}`,
          "rate",
        ),
      ).toBe(bracket.rate);
    }

    for (const [
      index,
      bracket,
    ] of RULESET_2026.localTax.lombardyBrackets.entries()) {
      expect(
        parameterValue(
          `trace:lombardy-tax-bracket-${String(index + 1)}`,
          "rate",
        ),
      ).toBe(bracket.rate);
    }
  });
});
