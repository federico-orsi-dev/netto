export class CalculationInvariantError extends Error {
  public readonly code = "calculation_invariant_failure" as const;

  public constructor(message: string) {
    super(message);
    this.name = "CalculationInvariantError";
  }
}
