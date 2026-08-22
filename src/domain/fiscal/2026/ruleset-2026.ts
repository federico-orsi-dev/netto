import type { ExclusionReference } from "../../calculation/contracts";
import {
  ASSUMPTION_IDS_2026,
  EXCLUDED_RULE_IDS_2026,
  VERIFIED_RULE_IDS_2026,
  type AssumptionId,
  type VerifiedRuleId,
} from "../ids";
import type { SourceId } from "../source-ids";

interface FiscalRuleMetadata {
  readonly sourceIds: readonly SourceId[];
  readonly explanationKey: `trace.${string}`;
}

export interface FiscalRuleset2026 {
  readonly fiscalYear: 2026;
  readonly rulesetId: "it-2026-v1";
  readonly profileId: "it-2026-milan-industrial-cigs-v1";
  readonly moneyPolicyId: "POLICY-MONEY-2026-001";
  readonly supportedRalEuro: {
    readonly minimum: 10_000;
    readonly maximum: 120_000;
  };
  readonly contribution: {
    readonly employeeIvsRate: "0.0919";
    readonly employeeCigsRate: "0.003";
    readonly additionalIvsRate: "0.01";
    readonly additionalIvsThresholdEuro: 56_224;
    readonly pensionCeilingEuro: 122_295;
  };
  readonly nationalTax: {
    readonly brackets: readonly [
      { readonly upperBoundEuro: 28_000; readonly rate: "0.23" },
      { readonly upperBoundEuro: 50_000; readonly rate: "0.33" },
      { readonly upperBoundEuro: null; readonly rate: "0.43" },
    ];
    readonly employmentDeduction: {
      readonly lowIncomeMaximumEuro: 15_000;
      readonly middleIncomeMaximumEuro: 28_000;
      readonly upperIncomeMaximumEuro: 50_000;
      readonly lowIncomeAmountEuro: 1_955;
      readonly middleIncomeBaseAmountEuro: 1_910;
      readonly middleIncomeVariableAmountEuro: 1_190;
      readonly adjustmentStartExclusiveEuro: 25_000;
      readonly adjustmentEndInclusiveEuro: 35_000;
      readonly adjustmentAmountEuro: 65;
    };
    readonly cuneoCashSum: {
      readonly firstBandMaximumEuro: 8_500;
      readonly secondBandMaximumEuro: 15_000;
      readonly eligibilityMaximumEuro: 20_000;
      readonly rates: readonly ["0.071", "0.053", "0.048"];
    };
    readonly cuneoDeduction: {
      readonly startExclusiveEuro: 20_000;
      readonly fullAmountEndInclusiveEuro: 32_000;
      readonly phaseOutEndInclusiveEuro: 40_000;
      readonly fullAmountEuro: 1_000;
    };
    readonly treatmentIntegrativo: {
      readonly incomeMaximumEuro: 15_000;
      readonly deductionAdjustmentEuro: 75;
      readonly fullYearAmountEuro: 1_200;
    };
  };
  readonly localTax: {
    readonly lombardyBrackets: readonly [
      { readonly upperBoundEuro: 15_000; readonly rate: "0.0123" },
      { readonly upperBoundEuro: 28_000; readonly rate: "0.0158" },
      { readonly upperBoundEuro: 50_000; readonly rate: "0.0172" },
      { readonly upperBoundEuro: null; readonly rate: "0.0173" },
    ];
    readonly milanRate: "0.008";
    readonly milanExemptionThresholdEuro: 23_000;
  };
  readonly verifiedRuleIds: readonly VerifiedRuleId[];
  readonly excludedRuleIds: typeof EXCLUDED_RULE_IDS_2026;
  readonly assumptionIds: readonly AssumptionId[];
  readonly ruleMetadata: Readonly<Record<VerifiedRuleId, FiscalRuleMetadata>>;
}

const inpsProfileSources = [
  "SRC-INPS-2024-101",
  "SRC-INPS-2026-006",
  "SRC-INPS-CLASSIFICATION-2025",
  "SRC-INPS-2022-637",
  "SRC-INPS-2022-076",
  "SRC-LEGAL-DLGS148-2015-ART10",
  "SRC-LEGAL-DLGS148-2015-ART23",
  "SRC-INPS-FIS-CURRENT",
  "SRC-INPS-2025-005",
  "SRC-INPS-2024-086",
  "SRC-INPS-2026-2548",
] as const satisfies readonly SourceId[];

export const RULESET_2026 = {
  fiscalYear: 2026,
  rulesetId: "it-2026-v1",
  profileId: "it-2026-milan-industrial-cigs-v1",
  moneyPolicyId: "POLICY-MONEY-2026-001",
  supportedRalEuro: { minimum: 10_000, maximum: 120_000 },
  contribution: {
    employeeIvsRate: "0.0919",
    employeeCigsRate: "0.003",
    additionalIvsRate: "0.01",
    additionalIvsThresholdEuro: 56_224,
    pensionCeilingEuro: 122_295,
  },
  nationalTax: {
    brackets: [
      { upperBoundEuro: 28_000, rate: "0.23" },
      { upperBoundEuro: 50_000, rate: "0.33" },
      { upperBoundEuro: null, rate: "0.43" },
    ],
    employmentDeduction: {
      lowIncomeMaximumEuro: 15_000,
      middleIncomeMaximumEuro: 28_000,
      upperIncomeMaximumEuro: 50_000,
      lowIncomeAmountEuro: 1_955,
      middleIncomeBaseAmountEuro: 1_910,
      middleIncomeVariableAmountEuro: 1_190,
      adjustmentStartExclusiveEuro: 25_000,
      adjustmentEndInclusiveEuro: 35_000,
      adjustmentAmountEuro: 65,
    },
    cuneoCashSum: {
      firstBandMaximumEuro: 8_500,
      secondBandMaximumEuro: 15_000,
      eligibilityMaximumEuro: 20_000,
      rates: ["0.071", "0.053", "0.048"],
    },
    cuneoDeduction: {
      startExclusiveEuro: 20_000,
      fullAmountEndInclusiveEuro: 32_000,
      phaseOutEndInclusiveEuro: 40_000,
      fullAmountEuro: 1_000,
    },
    treatmentIntegrativo: {
      incomeMaximumEuro: 15_000,
      deductionAdjustmentEuro: 75,
      fullYearAmountEuro: 1_200,
    },
  },
  localTax: {
    lombardyBrackets: [
      { upperBoundEuro: 15_000, rate: "0.0123" },
      { upperBoundEuro: 28_000, rate: "0.0158" },
      { upperBoundEuro: 50_000, rate: "0.0172" },
      { upperBoundEuro: null, rate: "0.0173" },
    ],
    milanRate: "0.008",
    milanExemptionThresholdEuro: 23_000,
  },
  verifiedRuleIds: VERIFIED_RULE_IDS_2026,
  excludedRuleIds: EXCLUDED_RULE_IDS_2026,
  assumptionIds: ASSUMPTION_IDS_2026,
  ruleMetadata: {
    "RULE-INPS-2026-001": {
      sourceIds: ["SRC-LEGAL-DLGS314-1997-ART6", "SRC-INPS-2026-006"],
      explanationKey: "trace.contributableRemuneration",
    },
    "RULE-INPS-2026-002": {
      sourceIds: [
        "SRC-INPS-2024-101",
        "SRC-INPS-2026-006",
        "SRC-INPS-CLASSIFICATION-2025",
      ],
      explanationKey: "trace.employeeIvs",
    },
    "RULE-INPS-2026-003": {
      sourceIds: [
        "SRC-LEGAL-DL384-1992-ART3TER",
        "SRC-INPS-2026-006",
        "SRC-INPS-2025-156",
      ],
      explanationKey: "trace.additionalIvs",
    },
    "RULE-INPS-2026-004": {
      sourceIds: ["SRC-LEGAL-L335-1995-ART2-C18", "SRC-INPS-2026-006"],
      explanationKey: "trace.pensionContributionBase",
    },
    "RULE-INPS-2026-005": {
      sourceIds: inpsProfileSources,
      explanationKey: "trace.employeeContributions",
    },
    "RULE-NAT-BASE-2026": {
      sourceIds: ["SRC-NAT-TUIR-ART3-2026", "SRC-NAT-TUIR-ART51-2026"],
      explanationKey: "trace.taxableIncome",
    },
    "RULE-NAT-GROSS-IRPEF-2026": {
      sourceIds: ["SRC-NAT-TUIR-ART11-2026", "SRC-NAT-L199-ART1-2026"],
      explanationKey: "trace.grossIrpef",
    },
    "RULE-NAT-EMPLOYMENT-DEDUCTION-2026": {
      sourceIds: [
        "SRC-NAT-TUIR-ART13-2026",
        "SRC-NAT-L207-ART1-2-9",
        "SRC-NAT-ADE-CIR4E-2025",
      ],
      explanationKey: "trace.employmentDeduction",
    },
    "RULE-NAT-NET-IRPEF-2026": {
      sourceIds: [
        "SRC-NAT-TUIR-ART11-2026",
        "SRC-NAT-L207-ART1-2-9",
        "SRC-NAT-DL3-ART1-2026",
      ],
      explanationKey: "trace.netIrpef",
    },
    "RULE-NAT-CUNEO-SUM-2026": {
      sourceIds: ["SRC-NAT-L207-ART1-2-9", "SRC-NAT-ADE-CIR4E-2025"],
      explanationKey: "trace.cuneoCashSum",
    },
    "RULE-NAT-CUNEO-DEDUCTION-2026": {
      sourceIds: ["SRC-NAT-L207-ART1-2-9", "SRC-NAT-ADE-CIR4E-2025"],
      explanationKey: "trace.cuneoDeduction",
    },
    "RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026": {
      sourceIds: [
        "SRC-NAT-DL3-ART1-2026",
        "SRC-NAT-L207-ART1-2-9",
        "SRC-NAT-ADE-CIR4E-2025",
      ],
      explanationKey: "trace.treatmentIntegrativo",
    },
    "RULE-LOMBARDY-2026-001": {
      sourceIds: [
        "SRC-LOCAL-2026-001",
        "SRC-LOCAL-2026-002",
        "SRC-LOCAL-2026-003",
        "SRC-LOCAL-2026-004",
        "SRC-LOCAL-2026-005",
      ],
      explanationKey: "trace.regionalTax",
    },
    "RULE-MILAN-2026-001": {
      sourceIds: [
        "SRC-LOCAL-2026-006",
        "SRC-LOCAL-2026-007",
        "SRC-LOCAL-2026-008",
        "SRC-LOCAL-2026-009",
        "SRC-LOCAL-2026-010",
      ],
      explanationKey: "trace.municipalTax",
    },
    "RULE-LOCAL-2026-ORDER": {
      sourceIds: [
        "SRC-LOCAL-2026-001",
        "SRC-LOCAL-2026-003",
        "SRC-LOCAL-2026-006",
        "SRC-LOCAL-2026-007",
        "SRC-LOCAL-2026-011",
      ],
      explanationKey: "trace.annualNet",
    },
  },
} as const satisfies FiscalRuleset2026;

export const ASSUMPTIONS_2026 = ASSUMPTION_IDS_2026.map((id) => ({
  id,
  explanationKey: `assumption.${id}` as const,
}));

export const EXCLUSIONS_2026 = [
  {
    ruleId: "RULE-INPS-2026-006",
    explanationKey: "exclusion.RULE-INPS-2026-006",
    reopeningConditionKey: "reopen.contributionCompliance",
  },
  {
    ruleId: "RULE-INPS-2026-007",
    explanationKey: "exclusion.RULE-INPS-2026-007",
    reopeningConditionKey: "reopen.payrollRounding",
  },
  {
    ruleId: "RULE-INPS-2026-008",
    explanationKey: "exclusion.RULE-INPS-2026-008",
    reopeningConditionKey: "reopen.payslipSimulation",
  },
  {
    ruleId: "RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026",
    explanationKey: "exclusion.RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026",
    reopeningConditionKey: "reopen.personalDeductionInputs",
  },
  {
    ruleId: "RULE-NAT-SPECIAL-PAY-2026",
    explanationKey: "exclusion.RULE-NAT-SPECIAL-PAY-2026",
    reopeningConditionKey: "reopen.specialPayInputs",
  },
  {
    ruleId: "RULE-NAT-PERSONAL-RELIEFS-2026",
    explanationKey: "exclusion.RULE-NAT-PERSONAL-RELIEFS-2026",
    reopeningConditionKey: "reopen.personalCircumstances",
  },
  {
    ruleId: "RULE-LOCAL-2026-001",
    explanationKey: "exclusion.RULE-LOCAL-2026-001",
    reopeningConditionKey: "reopen.localDueEdge",
  },
  {
    ruleId: "RULE-LOCAL-2026-ROUNDING",
    explanationKey: "exclusion.RULE-LOCAL-2026-ROUNDING",
    reopeningConditionKey: "reopen.filingOrPayrollPrecision",
  },
  {
    ruleId: "RULE-LOCAL-2026-WITHHOLDING",
    explanationKey: "exclusion.RULE-LOCAL-2026-WITHHOLDING",
    reopeningConditionKey: "reopen.payrollTiming",
  },
] as const satisfies readonly ExclusionReference[];
