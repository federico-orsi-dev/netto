import type {
  CalculationComponent,
  CalculationTraceEntry,
  MoneyAmount,
  SalaryCalculationResult,
  SalaryPaymentsPerYear,
  TraceParameter,
  TraceStatus,
} from "../../calculation/contracts";
import { CalculationInvariantError } from "../../calculation/errors";
import {
  decimalFromInteger,
  decimalFromMinorUnits,
  ratioToBasisPointsHalfUp,
  toPlainDecimalString,
  type ExactDecimal,
} from "../../money/decimal-money";
import {
  divideMoneyHalfUp,
  moneyFromMinorUnits,
  signedMoneyFromMinorUnits,
  sumMoney,
} from "../../money/public-money";
import type {
  AssumptionId,
  CalculationAmountId,
  CalculationComponentId,
  ExplanationKey,
  TraceEntryId,
  VerifiedRuleId,
} from "../ids";
import type { SourceId } from "../source-ids";
import type { ContributionStageResult } from "./contributions";
import type { LocalTaxStageResult } from "./local-tax";
import type {
  CashBenefitsResult,
  CuneoDeductionResult,
  EmploymentDeductionResult,
  GrossIrpefStageResult,
  NetIrpefResult,
  TaxableIncomeStageResult,
} from "./national-tax";
import {
  ASSUMPTIONS_2026,
  EXCLUSIONS_2026,
  RULESET_2026,
} from "./ruleset-2026";
import { SOURCE_CATALOG_2026 } from "./sources-2026";

interface ComposeResultInput {
  readonly annualGrossSalaryEuro: number;
  readonly salaryPaymentsPerYear: SalaryPaymentsPerYear;
  readonly contributions: ContributionStageResult;
  readonly taxableIncome: TaxableIncomeStageResult;
  readonly grossIrpef: GrossIrpefStageResult;
  readonly employmentDeduction: EmploymentDeductionResult;
  readonly cuneoDeduction: CuneoDeductionResult;
  readonly netIrpef: NetIrpefResult;
  readonly cashBenefits: CashBenefitsResult;
  readonly localTaxes: LocalTaxStageResult;
}

function sourcesForRules(
  ruleIds: readonly VerifiedRuleId[],
): readonly SourceId[] {
  const sourceIds = new Set<SourceId>();
  for (const ruleId of ruleIds) {
    for (const sourceId of RULESET_2026.ruleMetadata[ruleId].sourceIds) {
      sourceIds.add(sourceId);
    }
  }
  return [...sourceIds];
}

function decimalParameter(
  name: string,
  value: string,
  unit: "rate" | "ratio" | "exact_euro",
): TraceParameter {
  return { name, kind: "decimal", value, unit };
}

function booleanParameter(name: string, value: boolean): TraceParameter {
  return { name, kind: "boolean", value };
}

function configuredDecimal(value: number | string): string {
  return String(value);
}

function traceEntry(input: {
  readonly id: TraceEntryId;
  readonly purposeKey: ExplanationKey;
  readonly status?: TraceStatus;
  readonly ruleIds: readonly VerifiedRuleId[];
  readonly inputAmountIds: readonly CalculationAmountId[];
  readonly dependsOn: readonly TraceEntryId[];
  readonly expression: string;
  readonly parameters?: readonly TraceParameter[];
  readonly exactOutput: ExactDecimal;
  readonly publicOutputAmountId: CalculationAmountId;
  readonly assumptionIds?: readonly AssumptionId[];
}): CalculationTraceEntry {
  return {
    id: input.id,
    purposeKey: input.purposeKey,
    status: input.status ?? "applied",
    ruleIds: input.ruleIds,
    sourceIds: sourcesForRules(input.ruleIds),
    inputAmountIds: input.inputAmountIds,
    dependsOn: input.dependsOn,
    formula: {
      expression: input.expression,
      parameters: input.parameters ?? [],
    },
    exactOutput: toPlainDecimalString(input.exactOutput),
    publicOutputAmountId: input.publicOutputAmountId,
    assumptionIds: input.assumptionIds ?? [],
  };
}

function component(
  input: Omit<CalculationComponent, "explanationKey" | "sourceIds">,
): CalculationComponent {
  return {
    ...input,
    explanationKey: `amount.${input.amountId}`,
    sourceIds: sourcesForRules(input.ruleIds),
  };
}

export function composeSalaryResult(
  input: ComposeResultInput,
): SalaryCalculationResult {
  const grossSalary = moneyFromMinorUnits(input.annualGrossSalaryEuro * 100);
  const localTaxes = sumMoney([
    input.localTaxes.regionalTax,
    input.localTaxes.municipalTax,
  ]);
  const totalOutflows = sumMoney([
    input.contributions.employeeContributions,
    input.netIrpef.publicAmount,
    input.localTaxes.regionalTax,
    input.localTaxes.municipalTax,
  ]);
  const totalCashBenefits = sumMoney([
    input.cashBenefits.cuneoCashSum,
    input.cashBenefits.treatmentIntegrativo,
  ]);
  const modeledBurdenMinorUnits =
    totalOutflows.minorUnits - totalCashBenefits.minorUnits;
  const modeledBurden = signedMoneyFromMinorUnits(modeledBurdenMinorUnits);
  const annualNet = moneyFromMinorUnits(
    grossSalary.minorUnits - modeledBurdenMinorUnits,
  );
  const averageMonthlyNet = divideMoneyHalfUp(annualNet, 12);
  const averageSalaryPayment = divideMoneyHalfUp(
    annualNet,
    input.salaryPaymentsPerYear,
  );

  const amounts = {
    annualGrossSalary: grossSalary,
    contributableRemuneration: grossSalary,
    pensionContributionBase: grossSalary,
    employeeIvsContribution: input.contributions.employeeIvs,
    additionalIvsContribution: input.contributions.additionalIvs,
    employeeCigsContribution: input.contributions.employeeCigs,
    employeeContributions: input.contributions.employeeContributions,
    taxableIncome: input.taxableIncome.taxableIncome,
    grossIrpefBracket1: input.grossIrpef.brackets[0],
    grossIrpefBracket2: input.grossIrpef.brackets[1],
    grossIrpefBracket3: input.grossIrpef.brackets[2],
    grossIrpef: input.grossIrpef.grossIrpef,
    employmentDeduction: input.employmentDeduction.publicAmount,
    cuneoDeduction: input.cuneoDeduction.publicAmount,
    netIrpef: input.netIrpef.publicAmount,
    cuneoCashSum: input.cashBenefits.cuneoCashSum,
    treatmentIntegrativo: input.cashBenefits.treatmentIntegrativo,
    lombardyTaxBracket1: input.localTaxes.lombardyBrackets[0],
    lombardyTaxBracket2: input.localTaxes.lombardyBrackets[1],
    lombardyTaxBracket3: input.localTaxes.lombardyBrackets[2],
    lombardyTaxBracket4: input.localTaxes.lombardyBrackets[3],
    regionalTax: input.localTaxes.regionalTax,
    municipalTax: input.localTaxes.municipalTax,
    localTaxes,
    totalOutflows,
    totalCashBenefits,
    modeledBurden,
    annualNet,
    averageMonthlyNet,
    averageSalaryPayment,
  } as const;

  const trace = buildTrace(input, amounts);
  const components = buildComponents();
  const appliedRuleIds = determineAppliedRules(input);
  const breakdownOrder: CalculationComponentId[] = [
    "grossSalary",
    "employeeContributions",
    "netIrpef",
    "regionalTax",
  ];
  if (input.localTaxes.municipalTax.minorUnits > 0)
    breakdownOrder.push("municipalTax");
  if (input.cashBenefits.cuneoCashSum.minorUnits > 0)
    breakdownOrder.push("cuneoCashSum");
  if (input.cashBenefits.treatmentIntegrativo.minorUnits > 0)
    breakdownOrder.push("treatmentIntegrativo");
  breakdownOrder.push("annualNet");

  if (input.netIrpef.publicAmount.minorUnits < 12_673) {
    throw new CalculationInvariantError(
      "The supported-range net IRPEF invariant failed; RULE-LOCAL-2026-001 must be reopened.",
    );
  }

  return {
    metadata: {
      fiscalYear: RULESET_2026.fiscalYear,
      rulesetId: RULESET_2026.rulesetId,
      profileId: RULESET_2026.profileId,
      moneyPolicyId: RULESET_2026.moneyPolicyId,
      evaluatedRuleIds: RULESET_2026.verifiedRuleIds,
      appliedRuleIds,
    },
    input: {
      annualGrossSalaryAmountId: "annualGrossSalary",
      salaryPaymentsPerYear: input.salaryPaymentsPerYear,
    },
    amounts,
    summary: {
      annualNetAmountId: "annualNet",
      averageMonthlyNetAmountId: "averageMonthlyNet",
      averageSalaryPaymentAmountId: "averageSalaryPayment",
      modeledBurdenAmountId: "modeledBurden",
      effectiveBurdenBasisPoints: ratioToBasisPointsHalfUp(
        modeledBurdenMinorUnits,
        grossSalary.minorUnits,
      ),
    },
    components,
    breakdownOrder,
    trace,
    assumptions: ASSUMPTIONS_2026,
    exclusions: EXCLUSIONS_2026,
    sources: SOURCE_CATALOG_2026,
  };
}

function determineAppliedRules(
  input: ComposeResultInput,
): readonly VerifiedRuleId[] {
  const applied: VerifiedRuleId[] = [
    "RULE-INPS-2026-001",
    "RULE-INPS-2026-002",
    "RULE-INPS-2026-005",
    "RULE-NAT-BASE-2026",
    "RULE-NAT-GROSS-IRPEF-2026",
    "RULE-NAT-NET-IRPEF-2026",
    "RULE-LOMBARDY-2026-001",
    "RULE-LOCAL-2026-ORDER",
  ];
  if (input.contributions.additionalIvsApplies)
    applied.push("RULE-INPS-2026-003");
  if (input.employmentDeduction.publicAmount.minorUnits > 0) {
    applied.push("RULE-NAT-EMPLOYMENT-DEDUCTION-2026");
  }
  if (input.cuneoDeduction.applies)
    applied.push("RULE-NAT-CUNEO-DEDUCTION-2026");
  if (input.cashBenefits.cuneoCashSumApplies)
    applied.push("RULE-NAT-CUNEO-SUM-2026");
  if (input.cashBenefits.treatmentIntegrativoApplies) {
    applied.push("RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026");
  }
  if (input.localTaxes.municipalTaxApplies) applied.push("RULE-MILAN-2026-001");
  return applied;
}

function buildComponents(): Readonly<
  Record<CalculationComponentId, CalculationComponent>
> {
  return {
    grossSalary: component({
      id: "grossSalary",
      amountId: "annualGrossSalary",
      direction: "start",
      traceEntryId: "trace:annual-gross-salary",
      ruleIds: [],
      childComponentIds: [],
    }),
    employeeIvs: component({
      id: "employeeIvs",
      amountId: "employeeIvsContribution",
      direction: "subtract",
      traceEntryId: "trace:employee-ivs",
      ruleIds: ["RULE-INPS-2026-002"],
      childComponentIds: [],
    }),
    additionalIvs: component({
      id: "additionalIvs",
      amountId: "additionalIvsContribution",
      direction: "subtract",
      traceEntryId: "trace:additional-ivs",
      ruleIds: ["RULE-INPS-2026-003"],
      childComponentIds: [],
    }),
    employeeCigs: component({
      id: "employeeCigs",
      amountId: "employeeCigsContribution",
      direction: "subtract",
      traceEntryId: "trace:employee-cigs",
      ruleIds: ["RULE-INPS-2026-005"],
      childComponentIds: [],
    }),
    employeeContributions: component({
      id: "employeeContributions",
      amountId: "employeeContributions",
      direction: "subtract",
      traceEntryId: "trace:employee-contributions",
      ruleIds: ["RULE-INPS-2026-005"],
      childComponentIds: ["employeeIvs", "additionalIvs", "employeeCigs"],
    }),
    grossIrpef: component({
      id: "grossIrpef",
      amountId: "grossIrpef",
      direction: "informational",
      traceEntryId: "trace:gross-irpef",
      ruleIds: ["RULE-NAT-GROSS-IRPEF-2026"],
      childComponentIds: [],
    }),
    employmentDeduction: component({
      id: "employmentDeduction",
      amountId: "employmentDeduction",
      direction: "informational",
      traceEntryId: "trace:employment-deduction",
      ruleIds: ["RULE-NAT-EMPLOYMENT-DEDUCTION-2026"],
      childComponentIds: [],
    }),
    cuneoDeduction: component({
      id: "cuneoDeduction",
      amountId: "cuneoDeduction",
      direction: "informational",
      traceEntryId: "trace:cuneo-deduction",
      ruleIds: ["RULE-NAT-CUNEO-DEDUCTION-2026"],
      childComponentIds: [],
    }),
    netIrpef: component({
      id: "netIrpef",
      amountId: "netIrpef",
      direction: "subtract",
      traceEntryId: "trace:net-irpef",
      ruleIds: ["RULE-NAT-NET-IRPEF-2026"],
      childComponentIds: [],
    }),
    regionalTax: component({
      id: "regionalTax",
      amountId: "regionalTax",
      direction: "subtract",
      traceEntryId: "trace:regional-tax",
      ruleIds: ["RULE-LOMBARDY-2026-001"],
      childComponentIds: [],
    }),
    municipalTax: component({
      id: "municipalTax",
      amountId: "municipalTax",
      direction: "subtract",
      traceEntryId: "trace:municipal-tax",
      ruleIds: ["RULE-MILAN-2026-001"],
      childComponentIds: [],
    }),
    cuneoCashSum: component({
      id: "cuneoCashSum",
      amountId: "cuneoCashSum",
      direction: "add",
      traceEntryId: "trace:cuneo-cash-sum",
      ruleIds: ["RULE-NAT-CUNEO-SUM-2026"],
      childComponentIds: [],
    }),
    treatmentIntegrativo: component({
      id: "treatmentIntegrativo",
      amountId: "treatmentIntegrativo",
      direction: "add",
      traceEntryId: "trace:treatment-integrativo",
      ruleIds: ["RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026"],
      childComponentIds: [],
    }),
    annualNet: component({
      id: "annualNet",
      amountId: "annualNet",
      direction: "end",
      traceEntryId: "trace:annual-net",
      ruleIds: ["RULE-LOCAL-2026-ORDER"],
      childComponentIds: [],
    }),
  };
}

function buildTrace(
  input: ComposeResultInput,
  amounts: Readonly<Record<CalculationAmountId, MoneyAmount>>,
): readonly CalculationTraceEntry[] {
  const publicExact = (amountId: CalculationAmountId) =>
    decimalFromMinorUnits(amounts[amountId].minorUnits);
  const inps001 = ["RULE-INPS-2026-001"] as const;
  const inps002 = ["RULE-INPS-2026-002"] as const;
  const inps003 = ["RULE-INPS-2026-003"] as const;
  const inps004 = ["RULE-INPS-2026-004"] as const;
  const inps005 = ["RULE-INPS-2026-005"] as const;
  const natBase = ["RULE-NAT-BASE-2026"] as const;
  const natGross = ["RULE-NAT-GROSS-IRPEF-2026"] as const;
  const natEmployment = ["RULE-NAT-EMPLOYMENT-DEDUCTION-2026"] as const;
  const natCuneoDeduction = ["RULE-NAT-CUNEO-DEDUCTION-2026"] as const;
  const natNet = ["RULE-NAT-NET-IRPEF-2026"] as const;
  const natCuneoSum = ["RULE-NAT-CUNEO-SUM-2026"] as const;
  const natTreatment = ["RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026"] as const;
  const lombardy = ["RULE-LOMBARDY-2026-001"] as const;
  const milan = ["RULE-MILAN-2026-001"] as const;
  const localOrder = ["RULE-LOCAL-2026-ORDER"] as const;

  const traces: CalculationTraceEntry[] = [
    traceEntry({
      id: "trace:annual-gross-salary",
      purposeKey: "trace.annualGrossSalary",
      ruleIds: [],
      inputAmountIds: [],
      dependsOn: [],
      expression: "validated whole-euro RAL",
      exactOutput: decimalFromInteger(input.annualGrossSalaryEuro),
      publicOutputAmountId: "annualGrossSalary",
    }),
    traceEntry({
      id: "trace:contributable-remuneration",
      purposeKey: "trace.contributableRemuneration",
      ruleIds: inps001,
      inputAmountIds: ["annualGrossSalary"],
      dependsOn: ["trace:annual-gross-salary"],
      expression: "RAL = contributable remuneration under V1 assumption",
      exactOutput: input.contributions.contributableRemunerationExact,
      publicOutputAmountId: "contributableRemuneration",
      assumptionIds: ["ASSUMPTION-RAL-CONTRIBUTION-BASE-V1"],
    }),
    traceEntry({
      id: "trace:pension-contribution-base",
      purposeKey: "trace.pensionContributionBase",
      status: "inactive_in_supported_range",
      ruleIds: inps004,
      inputAmountIds: ["contributableRemuneration"],
      dependsOn: ["trace:contributable-remuneration"],
      expression: "base remains below 2026 ceiling",
      parameters: [
        decimalParameter(
          "ceiling",
          configuredDecimal(RULESET_2026.contribution.pensionCeilingEuro),
          "exact_euro",
        ),
      ],
      exactOutput: input.contributions.pensionContributionBaseExact,
      publicOutputAmountId: "pensionContributionBase",
    }),
    traceEntry({
      id: "trace:employee-ivs",
      purposeKey: "trace.employeeIvs",
      ruleIds: inps002,
      inputAmountIds: ["pensionContributionBase"],
      dependsOn: ["trace:pension-contribution-base"],
      expression: "pension base × rate",
      parameters: [
        decimalParameter(
          "rate",
          RULESET_2026.contribution.employeeIvsRate,
          "rate",
        ),
      ],
      exactOutput: input.contributions.employeeIvsExact,
      publicOutputAmountId: "employeeIvsContribution",
    }),
    traceEntry({
      id: "trace:additional-ivs",
      purposeKey: "trace.additionalIvs",
      status: input.contributions.additionalIvsApplies
        ? "applied"
        : "not_applicable",
      ruleIds: inps003,
      inputAmountIds: ["pensionContributionBase"],
      dependsOn: ["trace:pension-contribution-base"],
      expression: "max(0, pension base − threshold) × rate",
      parameters: [
        decimalParameter(
          "threshold",
          configuredDecimal(
            RULESET_2026.contribution.additionalIvsThresholdEuro,
          ),
          "exact_euro",
        ),
        decimalParameter(
          "rate",
          RULESET_2026.contribution.additionalIvsRate,
          "rate",
        ),
      ],
      exactOutput: input.contributions.additionalIvsExact,
      publicOutputAmountId: "additionalIvsContribution",
    }),
    traceEntry({
      id: "trace:employee-cigs",
      purposeKey: "trace.employeeCigs",
      ruleIds: inps005,
      inputAmountIds: ["contributableRemuneration"],
      dependsOn: ["trace:contributable-remuneration"],
      expression: "contributable remuneration × rate",
      parameters: [
        decimalParameter(
          "rate",
          RULESET_2026.contribution.employeeCigsRate,
          "rate",
        ),
      ],
      exactOutput: input.contributions.employeeCigsExact,
      publicOutputAmountId: "employeeCigsContribution",
      assumptionIds: ["ASSUMPTION-INDUSTRIAL-CIGS-NO-SECTOR-FUND"],
    }),
    traceEntry({
      id: "trace:employee-contributions",
      purposeKey: "trace.employeeContributions",
      ruleIds: inps005,
      inputAmountIds: [
        "employeeIvsContribution",
        "additionalIvsContribution",
        "employeeCigsContribution",
      ],
      dependsOn: [
        "trace:employee-ivs",
        "trace:additional-ivs",
        "trace:employee-cigs",
      ],
      expression: "sum of normalized public contribution components",
      exactOutput: input.contributions.reconciledEmployeeContributionsExact,
      publicOutputAmountId: "employeeContributions",
    }),
    traceEntry({
      id: "trace:taxable-income",
      purposeKey: "trace.taxableIncome",
      ruleIds: natBase,
      inputAmountIds: ["annualGrossSalary", "employeeContributions"],
      dependsOn: ["trace:annual-gross-salary", "trace:employee-contributions"],
      expression: "RAL − employee contributions",
      exactOutput: input.taxableIncome.taxableIncomeExact,
      publicOutputAmountId: "taxableIncome",
    }),
  ];

  const grossBracketIds = [
    "grossIrpefBracket1",
    "grossIrpefBracket2",
    "grossIrpefBracket3",
  ] as const;
  const grossTraceIds = [
    "trace:gross-irpef-bracket-1",
    "trace:gross-irpef-bracket-2",
    "trace:gross-irpef-bracket-3",
  ] as const;
  const grossExpressions = [
    "first progressive income slice × rate",
    "second progressive income slice × rate",
    "remaining progressive income slice × rate",
  ] as const;
  for (let index = 0; index < grossBracketIds.length; index += 1) {
    const amountId = grossBracketIds[index];
    const id = grossTraceIds[index];
    const exact = input.grossIrpef.bracketExact[index];
    if (amountId === undefined || id === undefined || exact === undefined)
      throw new CalculationInvariantError(
        "Invalid gross IRPEF bracket metadata.",
      );
    traces.push(
      traceEntry({
        id,
        purposeKey: `trace.grossIrpefBracket${String(index + 1)}`,
        status: amounts[amountId].minorUnits > 0 ? "applied" : "not_applicable",
        ruleIds: natGross,
        inputAmountIds: ["taxableIncome"],
        dependsOn: ["trace:taxable-income"],
        expression: grossExpressions[index] ?? "invalid",
        parameters: [
          decimalParameter(
            "rate",
            RULESET_2026.nationalTax.brackets[index]?.rate ?? "0",
            "rate",
          ),
        ],
        exactOutput: exact,
        publicOutputAmountId: amountId,
      }),
    );
  }

  traces.push(
    traceEntry({
      id: "trace:gross-irpef",
      purposeKey: "trace.grossIrpef",
      ruleIds: natGross,
      inputAmountIds: [...grossBracketIds],
      dependsOn: [...grossTraceIds],
      expression: "sum of normalized public IRPEF bracket components",
      exactOutput: input.grossIrpef.reconciledGrossIrpefExact,
      publicOutputAmountId: "grossIrpef",
    }),
    traceEntry({
      id: "trace:employment-deduction",
      purposeKey: "trace.employmentDeduction",
      status:
        input.employmentDeduction.publicAmount.minorUnits > 0
          ? "applied"
          : "not_applicable",
      ruleIds: natEmployment,
      inputAmountIds: ["taxableIncome", "grossIrpef"],
      dependsOn: ["trace:taxable-income", "trace:gross-irpef"],
      expression: "Article 13 band formula with statutory ratio truncation",
      parameters: [
        decimalParameter(
          "rawRatio",
          toPlainDecimalString(input.employmentDeduction.rawRatio),
          "ratio",
        ),
        decimalParameter(
          "truncatedRatio",
          toPlainDecimalString(
            input.employmentDeduction.statutoryTruncatedRatio,
          ),
          "ratio",
        ),
        booleanParameter(
          "includes65EuroAdjustment",
          input.employmentDeduction.includesSixtyFiveEuroAdjustment,
        ),
      ],
      exactOutput: input.employmentDeduction.exact,
      publicOutputAmountId: "employmentDeduction",
    }),
    traceEntry({
      id: "trace:cuneo-deduction",
      purposeKey: "trace.cuneoDeduction",
      status: input.cuneoDeduction.applies ? "applied" : "not_applicable",
      ruleIds: natCuneoDeduction,
      inputAmountIds: ["taxableIncome", "grossIrpef"],
      dependsOn: ["trace:taxable-income", "trace:gross-irpef"],
      expression: "income-band cuneo deduction",
      exactOutput: input.cuneoDeduction.exact,
      publicOutputAmountId: "cuneoDeduction",
    }),
    traceEntry({
      id: "trace:net-irpef",
      purposeKey: "trace.netIrpef",
      ruleIds: natNet,
      inputAmountIds: ["grossIrpef", "employmentDeduction", "cuneoDeduction"],
      dependsOn: [
        "trace:gross-irpef",
        "trace:employment-deduction",
        "trace:cuneo-deduction",
      ],
      expression: "max(0, gross IRPEF − deductions)",
      exactOutput: input.netIrpef.exactFromPublicHandoffs,
      publicOutputAmountId: "netIrpef",
    }),
    traceEntry({
      id: "trace:cuneo-cash-sum",
      purposeKey: "trace.cuneoCashSum",
      status: input.cashBenefits.cuneoCashSumApplies
        ? "applied"
        : "not_applicable",
      ruleIds: natCuneoSum,
      inputAmountIds: ["taxableIncome"],
      dependsOn: ["trace:taxable-income"],
      expression: "employment income × eligible cuneo rate",
      exactOutput: input.cashBenefits.cuneoCashSumExact,
      publicOutputAmountId: "cuneoCashSum",
    }),
    traceEntry({
      id: "trace:treatment-integrativo",
      purposeKey: "trace.treatmentIntegrativo",
      status: input.cashBenefits.treatmentIntegrativoApplies
        ? "applied"
        : "not_applicable",
      ruleIds: natTreatment,
      inputAmountIds: ["taxableIncome", "grossIrpef", "employmentDeduction"],
      dependsOn: ["trace:gross-irpef", "trace:employment-deduction"],
      expression:
        "income ≤ eligibility maximum and gross IRPEF > employment deduction − adjustment",
      parameters: [
        decimalParameter(
          "eligibilityMaximum",
          configuredDecimal(
            RULESET_2026.nationalTax.treatmentIntegrativo.incomeMaximumEuro,
          ),
          "exact_euro",
        ),
        decimalParameter(
          "deductionAdjustment",
          configuredDecimal(
            RULESET_2026.nationalTax.treatmentIntegrativo
              .deductionAdjustmentEuro,
          ),
          "exact_euro",
        ),
        booleanParameter(
          "eligible",
          input.cashBenefits.treatmentIntegrativoApplies,
        ),
      ],
      exactOutput: input.cashBenefits.treatmentIntegrativoExact,
      publicOutputAmountId: "treatmentIntegrativo",
    }),
  );

  const regionalAmountIds = [
    "lombardyTaxBracket1",
    "lombardyTaxBracket2",
    "lombardyTaxBracket3",
    "lombardyTaxBracket4",
  ] as const;
  const regionalTraceIds = [
    "trace:lombardy-tax-bracket-1",
    "trace:lombardy-tax-bracket-2",
    "trace:lombardy-tax-bracket-3",
    "trace:lombardy-tax-bracket-4",
  ] as const;
  const regionalExpressions = [
    "first progressive regional slice × rate",
    "second progressive regional slice × rate",
    "third progressive regional slice × rate",
    "remaining progressive regional slice × rate",
  ] as const;
  for (let index = 0; index < regionalAmountIds.length; index += 1) {
    const amountId = regionalAmountIds[index];
    const id = regionalTraceIds[index];
    const exact = input.localTaxes.lombardyBracketExact[index];
    if (amountId === undefined || id === undefined || exact === undefined)
      throw new CalculationInvariantError("Invalid regional bracket metadata.");
    traces.push(
      traceEntry({
        id,
        purposeKey: `trace.lombardyTaxBracket${String(index + 1)}`,
        status: amounts[amountId].minorUnits > 0 ? "applied" : "not_applicable",
        ruleIds: lombardy,
        inputAmountIds: ["taxableIncome"],
        dependsOn: ["trace:taxable-income"],
        expression: regionalExpressions[index] ?? "invalid",
        parameters: [
          decimalParameter(
            "rate",
            RULESET_2026.localTax.lombardyBrackets[index]?.rate ?? "0",
            "rate",
          ),
        ],
        exactOutput: exact,
        publicOutputAmountId: amountId,
        assumptionIds: ["ASSUMPTION-MILAN-LOMBARDY-DOMICILE"],
      }),
    );
  }

  traces.push(
    traceEntry({
      id: "trace:regional-tax",
      purposeKey: "trace.regionalTax",
      ruleIds: lombardy,
      inputAmountIds: [...regionalAmountIds],
      dependsOn: [...regionalTraceIds],
      expression: "sum of normalized public Lombardy bracket components",
      exactOutput: input.localTaxes.reconciledRegionalTaxExact,
      publicOutputAmountId: "regionalTax",
      assumptionIds: ["ASSUMPTION-MILAN-LOMBARDY-DOMICILE"],
    }),
    traceEntry({
      id: "trace:municipal-tax",
      purposeKey: "trace.municipalTax",
      status: input.localTaxes.municipalTaxApplies
        ? "applied"
        : "not_applicable",
      ruleIds: milan,
      inputAmountIds: ["taxableIncome"],
      dependsOn: ["trace:taxable-income"],
      expression: "base > exemption threshold ? base × rate : 0",
      parameters: [
        decimalParameter(
          "exemptionThreshold",
          configuredDecimal(RULESET_2026.localTax.milanExemptionThresholdEuro),
          "exact_euro",
        ),
        decimalParameter("rate", RULESET_2026.localTax.milanRate, "rate"),
        booleanParameter(
          "aboveInclusiveExemption",
          input.localTaxes.municipalTaxApplies,
        ),
      ],
      exactOutput: input.localTaxes.municipalTaxExact,
      publicOutputAmountId: "municipalTax",
      assumptionIds: ["ASSUMPTION-MILAN-LOMBARDY-DOMICILE"],
    }),
    traceEntry({
      id: "trace:local-taxes",
      purposeKey: "trace.localTaxes",
      ruleIds: localOrder,
      inputAmountIds: ["regionalTax", "municipalTax"],
      dependsOn: ["trace:regional-tax", "trace:municipal-tax"],
      expression: "regional tax + municipal tax",
      exactOutput: publicExact("localTaxes"),
      publicOutputAmountId: "localTaxes",
    }),
    traceEntry({
      id: "trace:total-outflows",
      purposeKey: "trace.totalOutflows",
      ruleIds: localOrder,
      inputAmountIds: [
        "employeeContributions",
        "netIrpef",
        "regionalTax",
        "municipalTax",
      ],
      dependsOn: [
        "trace:employee-contributions",
        "trace:net-irpef",
        "trace:regional-tax",
        "trace:municipal-tax",
      ],
      expression: "contributions + net IRPEF + local taxes",
      exactOutput: publicExact("totalOutflows"),
      publicOutputAmountId: "totalOutflows",
    }),
    traceEntry({
      id: "trace:total-cash-benefits",
      purposeKey: "trace.totalCashBenefits",
      ruleIds: localOrder,
      inputAmountIds: ["cuneoCashSum", "treatmentIntegrativo"],
      dependsOn: ["trace:cuneo-cash-sum", "trace:treatment-integrativo"],
      expression: "cuneo cash sum + treatment integrativo",
      exactOutput: publicExact("totalCashBenefits"),
      publicOutputAmountId: "totalCashBenefits",
    }),
    traceEntry({
      id: "trace:modeled-burden",
      purposeKey: "trace.modeledBurden",
      ruleIds: localOrder,
      inputAmountIds: ["totalOutflows", "totalCashBenefits"],
      dependsOn: ["trace:total-outflows", "trace:total-cash-benefits"],
      expression: "total outflows − cash benefits",
      exactOutput: publicExact("modeledBurden"),
      publicOutputAmountId: "modeledBurden",
    }),
    traceEntry({
      id: "trace:annual-net",
      purposeKey: "trace.annualNet",
      ruleIds: localOrder,
      inputAmountIds: ["annualGrossSalary", "modeledBurden"],
      dependsOn: ["trace:annual-gross-salary", "trace:modeled-burden"],
      expression: "RAL − modeled burden",
      exactOutput: publicExact("annualNet"),
      publicOutputAmountId: "annualNet",
    }),
    traceEntry({
      id: "trace:average-monthly-net",
      purposeKey: "trace.averageMonthlyNet",
      ruleIds: localOrder,
      inputAmountIds: ["annualNet"],
      dependsOn: ["trace:annual-net"],
      expression: "annual net ÷ 12",
      exactOutput: publicExact("averageMonthlyNet"),
      publicOutputAmountId: "averageMonthlyNet",
    }),
    traceEntry({
      id: "trace:average-salary-payment",
      purposeKey: "trace.averageSalaryPayment",
      ruleIds: localOrder,
      inputAmountIds: ["annualNet"],
      dependsOn: ["trace:annual-net"],
      expression: "annual net ÷ selected salary payments",
      parameters: [
        {
          name: "salaryPaymentsPerYear",
          kind: "integer",
          value: input.salaryPaymentsPerYear,
        },
      ],
      exactOutput: publicExact("averageSalaryPayment"),
      publicOutputAmountId: "averageSalaryPayment",
    }),
  );

  return traces;
}
