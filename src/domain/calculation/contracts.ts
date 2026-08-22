import type {
  AssumptionId,
  CalculationAmountId,
  CalculationComponentId,
  ExcludedRuleId,
  ExplanationKey,
  TraceEntryId,
  VerifiedRuleId,
} from "../fiscal/ids";
import type { SourceId } from "../fiscal/source-ids";

export type SalaryPaymentsPerYear = 12 | 13 | 14;

export interface SalaryCalculationInput {
  readonly annualGrossSalaryEuro: number;
  readonly salaryPaymentsPerYear: SalaryPaymentsPerYear;
}

export interface MoneyAmount {
  readonly currency: "EUR";
  readonly minorUnits: number; // safe integer cents; only modeledBurden may be signed
}

export type DecimalString = string;
export type FiscalProfileId = "it-2026-milan-industrial-cigs-v1";

export type InputIssue =
  | {
      readonly code: "invalid_annual_gross_salary";
      readonly field: "annualGrossSalaryEuro";
      readonly messageKey: "validation.ral.invalid";
    }
  | {
      readonly code: "unsupported_annual_gross_salary";
      readonly field: "annualGrossSalaryEuro";
      readonly messageKey: "validation.ral.unsupported";
      readonly minimumEuro: 10_000;
      readonly maximumEuro: 120_000;
    }
  | {
      readonly code: "invalid_salary_payments_per_year";
      readonly field: "salaryPaymentsPerYear";
      readonly messageKey: "validation.salaryPayments.invalid";
      readonly supportedValues: readonly [12, 13, 14];
    };

export type CalculationOutcome =
  | { readonly ok: true; readonly result: SalaryCalculationResult }
  | { readonly ok: false; readonly issues: readonly InputIssue[] };

export type TraceStatus =
  "applied" | "not_applicable" | "inactive_in_supported_range";

export type TraceParameter =
  | {
      readonly name: string;
      readonly kind: "amount";
      readonly amountId: CalculationAmountId;
    }
  | {
      readonly name: string;
      readonly kind: "decimal";
      readonly value: DecimalString;
      readonly unit: "rate" | "ratio" | "exact_euro";
    }
  | {
      readonly name: string;
      readonly kind: "integer";
      readonly value: number;
    }
  | {
      readonly name: string;
      readonly kind: "boolean";
      readonly value: boolean;
    };

export interface CalculationTraceEntry {
  readonly id: TraceEntryId;
  readonly purposeKey: ExplanationKey;
  readonly status: TraceStatus;
  readonly ruleIds: readonly VerifiedRuleId[];
  readonly sourceIds: readonly SourceId[];
  readonly inputAmountIds: readonly CalculationAmountId[];
  readonly dependsOn: readonly TraceEntryId[];
  readonly formula: {
    readonly expression: string;
    readonly parameters: readonly TraceParameter[];
  };
  readonly exactOutput: DecimalString;
  readonly publicOutputAmountId: CalculationAmountId;
  readonly assumptionIds: readonly AssumptionId[];
}

export type CalculationDirection =
  "start" | "subtract" | "add" | "end" | "informational";

export interface CalculationComponent {
  readonly id: CalculationComponentId;
  readonly amountId: CalculationAmountId;
  readonly direction: CalculationDirection;
  readonly explanationKey: ExplanationKey;
  readonly traceEntryId: TraceEntryId;
  readonly ruleIds: readonly VerifiedRuleId[];
  readonly sourceIds: readonly SourceId[];
  readonly childComponentIds: readonly CalculationComponentId[];
}

export interface AssumptionReference {
  readonly id: AssumptionId;
  readonly explanationKey: ExplanationKey;
}

export interface ExclusionReference {
  readonly ruleId: ExcludedRuleId;
  readonly explanationKey: ExplanationKey;
  readonly reopeningConditionKey: string;
}

export interface SourceReference {
  readonly id: SourceId;
  readonly issuer: string;
  readonly title: string;
  readonly officialUrl: string;
  readonly accessedOn: "2026-08-22";
}

export interface SalaryCalculationResult {
  readonly metadata: {
    readonly fiscalYear: 2026;
    readonly rulesetId: "it-2026-v1";
    readonly profileId: FiscalProfileId;
    readonly moneyPolicyId: "POLICY-MONEY-2026-001";
    readonly evaluatedRuleIds: readonly VerifiedRuleId[];
    readonly appliedRuleIds: readonly VerifiedRuleId[];
  };
  readonly input: {
    readonly annualGrossSalaryAmountId: "annualGrossSalary";
    readonly salaryPaymentsPerYear: SalaryPaymentsPerYear;
  };
  readonly amounts: Readonly<Record<CalculationAmountId, MoneyAmount>>;
  readonly summary: {
    readonly annualNetAmountId: "annualNet";
    readonly averageMonthlyNetAmountId: "averageMonthlyNet";
    readonly averageSalaryPaymentAmountId: "averageSalaryPayment";
    readonly modeledBurdenAmountId: "modeledBurden";
    readonly effectiveBurdenBasisPoints: number;
  };
  readonly components: Readonly<
    Record<CalculationComponentId, CalculationComponent>
  >;
  readonly breakdownOrder: readonly CalculationComponentId[];
  readonly trace: readonly CalculationTraceEntry[];
  readonly assumptions: readonly AssumptionReference[];
  readonly exclusions: readonly ExclusionReference[];
  readonly sources: readonly SourceReference[];
}
