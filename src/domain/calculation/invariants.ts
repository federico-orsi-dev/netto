import type { SalaryCalculationResult } from "./contracts";
import { CalculationInvariantError } from "./errors";
import {
  CALCULATION_AMOUNT_IDS,
  CALCULATION_COMPONENT_IDS,
  EXCLUDED_RULE_IDS_2026,
  VERIFIED_RULE_IDS_2026,
} from "../fiscal/ids";
import { SOURCE_IDS_2026 } from "../fiscal/source-ids";
import { divideMoneyHalfUp } from "../money/public-money";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new CalculationInvariantError(message);
}

export function assertCoreResultInvariants(
  result: SalaryCalculationResult,
): void {
  const { amounts } = result;
  const contributionChildren =
    amounts.employeeIvsContribution.minorUnits +
    amounts.additionalIvsContribution.minorUnits +
    amounts.employeeCigsContribution.minorUnits;
  assert(
    amounts.employeeContributions.minorUnits === contributionChildren,
    "Employee contribution aggregate does not reconcile to public components.",
  );

  const grossIrpefChildren =
    amounts.grossIrpefBracket1.minorUnits +
    amounts.grossIrpefBracket2.minorUnits +
    amounts.grossIrpefBracket3.minorUnits;
  assert(
    amounts.grossIrpef.minorUnits === grossIrpefChildren,
    "Gross IRPEF does not reconcile to brackets.",
  );

  const regionalChildren =
    amounts.lombardyTaxBracket1.minorUnits +
    amounts.lombardyTaxBracket2.minorUnits +
    amounts.lombardyTaxBracket3.minorUnits +
    amounts.lombardyTaxBracket4.minorUnits;
  assert(
    amounts.regionalTax.minorUnits === regionalChildren,
    "Regional tax does not reconcile to brackets.",
  );
  assert(
    amounts.localTaxes.minorUnits ===
      amounts.regionalTax.minorUnits + amounts.municipalTax.minorUnits,
    "Local tax aggregate does not reconcile.",
  );

  const outflows =
    amounts.employeeContributions.minorUnits +
    amounts.netIrpef.minorUnits +
    amounts.regionalTax.minorUnits +
    amounts.municipalTax.minorUnits;
  assert(
    amounts.totalOutflows.minorUnits === outflows,
    "Total outflows do not reconcile.",
  );
  const cashBenefits =
    amounts.cuneoCashSum.minorUnits + amounts.treatmentIntegrativo.minorUnits;
  assert(
    amounts.totalCashBenefits.minorUnits === cashBenefits,
    "Cash benefits do not reconcile.",
  );
  assert(
    amounts.modeledBurden.minorUnits === outflows - cashBenefits,
    "Modeled burden does not reconcile to outflows and cash benefits.",
  );
  assert(
    amounts.annualNet.minorUnits ===
      amounts.annualGrossSalary.minorUnits - amounts.modeledBurden.minorUnits,
    "Annual net does not reconcile to gross and modeled burden.",
  );
  assert(
    amounts.averageMonthlyNet.minorUnits ===
      divideMoneyHalfUp(amounts.annualNet, 12).minorUnits,
    "Average monthly net does not reconcile to annual net.",
  );
  assert(
    amounts.averageSalaryPayment.minorUnits ===
      divideMoneyHalfUp(amounts.annualNet, result.input.salaryPaymentsPerYear)
        .minorUnits,
    "Average salary payment does not reconcile to annual net.",
  );
}

export function assertCompleteResultInvariants(
  result: SalaryCalculationResult,
): void {
  assertCoreResultInvariants(result);
  const amountKeys = Object.keys(result.amounts);
  assert(
    amountKeys.length === CALCULATION_AMOUNT_IDS.length,
    "Amount registry has an unexpected size.",
  );
  for (const amountId of CALCULATION_AMOUNT_IDS) {
    const amount = result.amounts[amountId];
    assert(
      amount.currency === "EUR",
      `Amount ${amountId} has an unsupported currency.`,
    );
    assert(
      Number.isSafeInteger(amount.minorUnits),
      `Amount ${amountId} is not safe integer cents.`,
    );
    assert(
      amountId === "modeledBurden" || amount.minorUnits >= 0,
      `Fiscal amount ${amountId} must be non-negative.`,
    );
  }

  assert(
    Object.keys(result.components).length === CALCULATION_COMPONENT_IDS.length,
    "Component registry has an unexpected size.",
  );

  const verifiedIds = new Set<string>(VERIFIED_RULE_IDS_2026);
  const excludedIds = new Set<string>(EXCLUDED_RULE_IDS_2026);
  const sourceIds = new Set<string>(SOURCE_IDS_2026);
  assert(
    new Set(result.metadata.evaluatedRuleIds).size === 15,
    "Evaluated Rule IDs must be unique and complete.",
  );
  for (const ruleId of result.metadata.appliedRuleIds) {
    assert(verifiedIds.has(ruleId), `Applied unknown Rule ID ${ruleId}.`);
    assert(
      !excludedIds.has(ruleId),
      `Excluded Rule ID ${ruleId} cannot be applied.`,
    );
  }

  const traceIds = new Set<string>();
  for (const entry of result.trace) {
    assert(!traceIds.has(entry.id), `Duplicate trace ID ${entry.id}.`);
    traceIds.add(entry.id);
    assert(
      entry.publicOutputAmountId in result.amounts,
      `Trace ${entry.id} references an unknown output amount.`,
    );
    for (const ruleId of entry.ruleIds)
      assert(
        verifiedIds.has(ruleId),
        `Trace ${entry.id} has unknown rule ${ruleId}.`,
      );
    for (const sourceId of entry.sourceIds)
      assert(
        sourceIds.has(sourceId),
        `Trace ${entry.id} has unknown source ${sourceId}.`,
      );
  }

  for (const component of Object.values(result.components)) {
    assert(
      component.amountId in result.amounts,
      `Component ${component.id} references an unknown amount.`,
    );
    assert(
      traceIds.has(component.traceEntryId),
      `Component ${component.id} references an unknown trace entry.`,
    );
  }
  assertNoDecimalInstances(result);
  JSON.stringify(result);
}

function assertNoDecimalInstances(
  value: unknown,
  visited = new Set<object>(),
): void {
  if (value === null || typeof value !== "object") return;
  if (visited.has(value)) return;
  visited.add(value);
  const constructorName = (value as { constructor?: { name?: string } })
    .constructor?.name;
  assert(
    constructorName !== "Decimal",
    "A Decimal instance crossed the public calculation boundary.",
  );
  for (const child of Object.values(value))
    assertNoDecimalInstances(child, visited);
}
