import type {
  CalculationOutcome,
  InputIssue,
  SalaryCalculationInput,
  SalaryPaymentsPerYear,
} from "../../calculation/contracts";
import { assertCoreResultInvariants } from "../../calculation/invariants";
import { composeSalaryResult } from "./compose-result";
import { calculateContributions } from "./contributions";
import { calculateLocalTaxes } from "./local-tax";
import {
  calculateCashBenefits,
  calculateCuneoDeduction,
  calculateEmploymentDeduction,
  calculateGrossIrpef,
  calculateNetIrpef,
  calculateTaxableIncome,
} from "./national-tax";
import { RULESET_2026 } from "./ruleset-2026";

const SALARY_PAYMENT_COUNTS = [12, 13, 14] as const;

function isSalaryPaymentsPerYear(
  value: number,
): value is SalaryPaymentsPerYear {
  return SALARY_PAYMENT_COUNTS.some((supported) => supported === value);
}

export function validateSalaryCalculationInput(
  input: SalaryCalculationInput,
): readonly InputIssue[] {
  const issues: InputIssue[] = [];
  const ral = input.annualGrossSalaryEuro;
  if (!Number.isFinite(ral) || !Number.isSafeInteger(ral)) {
    issues.push({
      code: "invalid_annual_gross_salary",
      field: "annualGrossSalaryEuro",
      messageKey: "validation.ral.invalid",
    });
  } else if (
    ral < RULESET_2026.supportedRalEuro.minimum ||
    ral > RULESET_2026.supportedRalEuro.maximum
  ) {
    issues.push({
      code: "unsupported_annual_gross_salary",
      field: "annualGrossSalaryEuro",
      messageKey: "validation.ral.unsupported",
      minimumEuro: RULESET_2026.supportedRalEuro.minimum,
      maximumEuro: RULESET_2026.supportedRalEuro.maximum,
    });
  }

  if (!isSalaryPaymentsPerYear(input.salaryPaymentsPerYear)) {
    issues.push({
      code: "invalid_salary_payments_per_year",
      field: "salaryPaymentsPerYear",
      messageKey: "validation.salaryPayments.invalid",
      supportedValues: SALARY_PAYMENT_COUNTS,
    });
  }
  return issues;
}

export function calculateSalary2026(
  input: SalaryCalculationInput,
): CalculationOutcome {
  const issues = validateSalaryCalculationInput(input);
  if (issues.length > 0) return { ok: false, issues };

  const contributions = calculateContributions(input.annualGrossSalaryEuro);
  const taxableIncome = calculateTaxableIncome(
    input.annualGrossSalaryEuro,
    contributions.employeeContributions,
  );
  const grossIrpef = calculateGrossIrpef(taxableIncome.taxableIncomeExact);
  const employmentDeduction = calculateEmploymentDeduction(
    taxableIncome.taxableIncomeExact,
  );
  const cuneoDeduction = calculateCuneoDeduction(
    taxableIncome.taxableIncomeExact,
  );
  const netIrpef = calculateNetIrpef(
    grossIrpef.grossIrpef,
    employmentDeduction.publicAmount,
    cuneoDeduction.publicAmount,
  );
  const cashBenefits = calculateCashBenefits(
    taxableIncome.taxableIncomeExact,
    grossIrpef.grossIrpef,
    employmentDeduction.publicAmount,
  );
  const localTaxes = calculateLocalTaxes(taxableIncome.taxableIncomeExact);
  const result = composeSalaryResult({
    annualGrossSalaryEuro: input.annualGrossSalaryEuro,
    salaryPaymentsPerYear: input.salaryPaymentsPerYear,
    contributions,
    taxableIncome,
    grossIrpef,
    employmentDeduction,
    cuneoDeduction,
    netIrpef,
    cashBenefits,
    localTaxes,
  });
  assertCoreResultInvariants(result);
  return { ok: true, result };
}
