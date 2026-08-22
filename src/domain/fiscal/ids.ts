export const VERIFIED_RULE_IDS_2026 = [
  "RULE-INPS-2026-001",
  "RULE-INPS-2026-002",
  "RULE-INPS-2026-003",
  "RULE-INPS-2026-004",
  "RULE-INPS-2026-005",
  "RULE-NAT-BASE-2026",
  "RULE-NAT-GROSS-IRPEF-2026",
  "RULE-NAT-EMPLOYMENT-DEDUCTION-2026",
  "RULE-NAT-NET-IRPEF-2026",
  "RULE-NAT-CUNEO-SUM-2026",
  "RULE-NAT-CUNEO-DEDUCTION-2026",
  "RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026",
  "RULE-LOMBARDY-2026-001",
  "RULE-MILAN-2026-001",
  "RULE-LOCAL-2026-ORDER",
] as const;

export type VerifiedRuleId = (typeof VERIFIED_RULE_IDS_2026)[number];

export const EXCLUDED_RULE_IDS_2026 = [
  "RULE-INPS-2026-006",
  "RULE-INPS-2026-007",
  "RULE-INPS-2026-008",
  "RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026",
  "RULE-NAT-SPECIAL-PAY-2026",
  "RULE-NAT-PERSONAL-RELIEFS-2026",
  "RULE-LOCAL-2026-001",
  "RULE-LOCAL-2026-ROUNDING",
  "RULE-LOCAL-2026-WITHHOLDING",
] as const;

export type ExcludedRuleId = (typeof EXCLUDED_RULE_IDS_2026)[number];

export const CALCULATION_AMOUNT_IDS = [
  "annualGrossSalary",
  "contributableRemuneration",
  "pensionContributionBase",
  "employeeIvsContribution",
  "additionalIvsContribution",
  "employeeCigsContribution",
  "employeeContributions",
  "taxableIncome",
  "grossIrpefBracket1",
  "grossIrpefBracket2",
  "grossIrpefBracket3",
  "grossIrpef",
  "employmentDeduction",
  "cuneoDeduction",
  "netIrpef",
  "cuneoCashSum",
  "treatmentIntegrativo",
  "lombardyTaxBracket1",
  "lombardyTaxBracket2",
  "lombardyTaxBracket3",
  "lombardyTaxBracket4",
  "regionalTax",
  "municipalTax",
  "localTaxes",
  "totalOutflows",
  "totalCashBenefits",
  "modeledBurden",
  "annualNet",
  "averageMonthlyNet",
  "averageSalaryPayment",
] as const;

export type CalculationAmountId = (typeof CALCULATION_AMOUNT_IDS)[number];

export const CALCULATION_COMPONENT_IDS = [
  "grossSalary",
  "employeeIvs",
  "additionalIvs",
  "employeeCigs",
  "employeeContributions",
  "grossIrpef",
  "employmentDeduction",
  "cuneoDeduction",
  "netIrpef",
  "regionalTax",
  "municipalTax",
  "cuneoCashSum",
  "treatmentIntegrativo",
  "annualNet",
] as const;

export type CalculationComponentId = (typeof CALCULATION_COMPONENT_IDS)[number];

export const ASSUMPTION_IDS_2026 = [
  "ASSUMPTION-RAL-CONTRIBUTION-BASE-V1",
  "ASSUMPTION-FULL-YEAR-ORDINARY-EMPLOYMENT",
  "ASSUMPTION-INDUSTRIAL-CIGS-NO-SECTOR-FUND",
  "ASSUMPTION-MILAN-LOMBARDY-DOMICILE",
  "ASSUMPTION-NO-PERSONAL-OR-SPECIAL-CIRCUMSTANCES",
] as const;

export type AssumptionId = (typeof ASSUMPTION_IDS_2026)[number];

export const TRACE_ENTRY_IDS = [
  "trace:annual-gross-salary",
  "trace:contributable-remuneration",
  "trace:pension-contribution-base",
  "trace:employee-ivs",
  "trace:additional-ivs",
  "trace:employee-cigs",
  "trace:employee-contributions",
  "trace:taxable-income",
  "trace:gross-irpef-bracket-1",
  "trace:gross-irpef-bracket-2",
  "trace:gross-irpef-bracket-3",
  "trace:gross-irpef",
  "trace:employment-deduction",
  "trace:cuneo-deduction",
  "trace:net-irpef",
  "trace:cuneo-cash-sum",
  "trace:treatment-integrativo",
  "trace:lombardy-tax-bracket-1",
  "trace:lombardy-tax-bracket-2",
  "trace:lombardy-tax-bracket-3",
  "trace:lombardy-tax-bracket-4",
  "trace:regional-tax",
  "trace:municipal-tax",
  "trace:local-taxes",
  "trace:total-outflows",
  "trace:total-cash-benefits",
  "trace:modeled-burden",
  "trace:annual-net",
  "trace:average-monthly-net",
  "trace:average-salary-payment",
] as const;

export type TraceEntryId = (typeof TRACE_ENTRY_IDS)[number];

export type ExplanationKey =
  | `amount.${CalculationAmountId}`
  | `trace.${string}`
  | `assumption.${AssumptionId}`
  | `exclusion.${ExcludedRuleId}`;
