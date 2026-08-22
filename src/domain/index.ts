export {
  calculateSalary2026,
  validateSalaryCalculationInput,
} from "./fiscal/2026/calculate-salary-2026";
export type {
  CalculationComponent,
  CalculationTraceEntry,
  CalculationOutcome,
  InputIssue,
  MoneyAmount,
  SalaryCalculationInput,
  SalaryCalculationResult,
  SalaryPaymentsPerYear,
} from "./calculation/contracts";
export type {
  AssumptionId,
  CalculationAmountId,
  CalculationComponentId,
  ExcludedRuleId,
  ExplanationKey,
  TraceEntryId,
  VerifiedRuleId,
} from "./fiscal/ids";
