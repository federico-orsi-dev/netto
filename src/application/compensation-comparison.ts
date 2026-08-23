import type {
  CalculationAmountId,
  CalculationComponentId,
  MoneyAmount,
  SalaryCalculationResult,
  VerifiedRuleId,
} from "../domain";

export type ComparisonDirection = "increase" | "decrease" | "unchanged";

export interface SignedMoneyAmount {
  readonly currency: "EUR";
  readonly minorUnits: number;
}

export type ComparisonComponentId = Extract<
  CalculationComponentId,
  | "employeeContributions"
  | "netIrpef"
  | "regionalTax"
  | "municipalTax"
  | "cuneoCashSum"
  | "treatmentIntegrativo"
>;

export interface CompensationComponentChange {
  readonly id: ComparisonComponentId;
  readonly amountId: CalculationAmountId;
  readonly direction: "subtract" | "add";
  readonly currentAmount: MoneyAmount;
  readonly proposedAmount: MoneyAmount;
  readonly amountDelta: SignedMoneyAmount;
  readonly annualNetEffect: SignedMoneyAmount;
  readonly ruleIds: readonly VerifiedRuleId[];
}

export interface RuleApplicabilityChange {
  readonly ruleId: VerifiedRuleId;
  readonly change: "activated" | "deactivated";
}

export interface CompensationComparison {
  readonly current: SalaryCalculationResult;
  readonly proposed: SalaryCalculationResult;
  readonly direction: ComparisonDirection;
  readonly netDirection: ComparisonDirection;
  readonly grossRalDelta: SignedMoneyAmount;
  readonly annualNetDelta: SignedMoneyAmount;
  readonly averageMonthlyNetDelta: SignedMoneyAmount;
  /**
   * Annual-net delta divided by gross-RAL delta, rounded half-up to basis
   * points. This is a modeled retained share, not a marginal tax rate.
   */
  readonly modeledNetShareOfGrossChangeBasisPoints: number | null;
  readonly componentChanges: readonly CompensationComponentChange[];
  readonly materialComponentChanges: readonly CompensationComponentChange[];
  readonly ruleApplicabilityChanges: readonly RuleApplicabilityChange[];
}

const COMPONENT_ORDER: readonly ComparisonComponentId[] = [
  "employeeContributions",
  "netIrpef",
  "regionalTax",
  "municipalTax",
  "cuneoCashSum",
  "treatmentIntegrativo",
];

export function compareCompensationResults(
  current: SalaryCalculationResult,
  proposed: SalaryCalculationResult,
): CompensationComparison {
  assertCompatibleResults(current, proposed);

  const grossRalDelta = subtractMoney(
    proposed.amounts.annualGrossSalary,
    current.amounts.annualGrossSalary,
  );
  const annualNetDelta = subtractMoney(
    proposed.amounts.annualNet,
    current.amounts.annualNet,
  );
  const averageMonthlyNetDelta = subtractMoney(
    proposed.amounts.averageMonthlyNet,
    current.amounts.averageMonthlyNet,
  );

  const componentChanges = COMPONENT_ORDER.map((id) => {
    const currentComponent = current.components[id];
    const proposedComponent = proposed.components[id];
    if (
      currentComponent.amountId !== proposedComponent.amountId ||
      currentComponent.direction !== proposedComponent.direction ||
      (proposedComponent.direction !== "add" &&
        proposedComponent.direction !== "subtract")
    ) {
      throw new Error(`Incompatible comparison component: ${id}`);
    }

    const currentAmount = current.amounts[currentComponent.amountId];
    const proposedAmount = proposed.amounts[proposedComponent.amountId];
    const amountDelta = subtractMoney(proposedAmount, currentAmount);
    const annualNetEffect = signedMoney(
      proposedComponent.direction === "add"
        ? amountDelta.minorUnits
        : -amountDelta.minorUnits,
    );

    return {
      id,
      amountId: proposedComponent.amountId,
      direction: proposedComponent.direction,
      currentAmount,
      proposedAmount,
      amountDelta,
      annualNetEffect,
      ruleIds: proposedComponent.ruleIds,
    };
  });

  const componentNetEffect = componentChanges.reduce(
    (total, change) => total + change.annualNetEffect.minorUnits,
    0,
  );
  if (
    grossRalDelta.minorUnits + componentNetEffect !==
    annualNetDelta.minorUnits
  ) {
    throw new Error(
      "Comparison components do not reconcile with the canonical annual-net delta.",
    );
  }

  const currentApplied = new Set(current.metadata.appliedRuleIds);
  const proposedApplied = new Set(proposed.metadata.appliedRuleIds);
  const ruleApplicabilityChanges = current.metadata.evaluatedRuleIds.flatMap(
    (ruleId): readonly RuleApplicabilityChange[] => {
      const wasApplied = currentApplied.has(ruleId);
      const isApplied = proposedApplied.has(ruleId);
      if (wasApplied === isApplied) return [];
      return [
        {
          ruleId,
          change: isApplied ? "activated" : "deactivated",
        },
      ];
    },
  );

  return {
    current,
    proposed,
    direction: directionOf(grossRalDelta.minorUnits),
    netDirection: directionOf(annualNetDelta.minorUnits),
    grossRalDelta,
    annualNetDelta,
    averageMonthlyNetDelta,
    modeledNetShareOfGrossChangeBasisPoints:
      grossRalDelta.minorUnits === 0
        ? null
        : ratioToBasisPointsHalfUp(
            annualNetDelta.minorUnits,
            grossRalDelta.minorUnits,
          ),
    componentChanges,
    materialComponentChanges: componentChanges.filter(
      ({ amountDelta }) => amountDelta.minorUnits !== 0,
    ),
    ruleApplicabilityChanges,
  };
}

function assertCompatibleResults(
  current: SalaryCalculationResult,
  proposed: SalaryCalculationResult,
): void {
  if (
    current.metadata.fiscalYear !== proposed.metadata.fiscalYear ||
    current.metadata.rulesetId !== proposed.metadata.rulesetId ||
    current.metadata.profileId !== proposed.metadata.profileId ||
    current.metadata.moneyPolicyId !== proposed.metadata.moneyPolicyId
  ) {
    throw new Error(
      "Compensation comparison requires the same fiscal year, profile, ruleset, and money policy.",
    );
  }
}

function subtractMoney(
  minuend: MoneyAmount,
  subtrahend: MoneyAmount,
): SignedMoneyAmount {
  return signedMoney(minuend.minorUnits - subtrahend.minorUnits);
}

function signedMoney(minorUnits: number): SignedMoneyAmount {
  if (!Number.isSafeInteger(minorUnits)) {
    throw new Error("Comparison money must use safe integer euro cents.");
  }
  return { currency: "EUR", minorUnits: minorUnits === 0 ? 0 : minorUnits };
}

function directionOf(value: number): ComparisonDirection {
  if (value > 0) return "increase";
  if (value < 0) return "decrease";
  return "unchanged";
}

function ratioToBasisPointsHalfUp(
  numeratorMinorUnits: number,
  denominatorMinorUnits: number,
): number {
  const sign = Math.sign(numeratorMinorUnits * denominatorMinorUnits);
  const absoluteNumerator = Math.abs(numeratorMinorUnits) * 10_000;
  const absoluteDenominator = Math.abs(denominatorMinorUnits);
  const roundedMagnitude = Math.floor(
    (absoluteNumerator + absoluteDenominator / 2) / absoluteDenominator,
  );
  return sign * roundedMagnitude;
}
