import { describe, expect, it } from "vitest";

import { EXCLUDED_RULE_IDS_2026, VERIFIED_RULE_IDS_2026 } from "../ids";
import { SOURCE_IDS_2026 } from "../source-ids";
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
});
