import type { SalaryCalculationResult } from "../../domain";
import {
  formatBasisPoints,
  formatMoney,
  formatSignedMoney,
} from "../../ui/formatters";
import styles from "./ResultSummary.module.css";

interface ResultSummaryProps {
  readonly result: SalaryCalculationResult;
}

export function ResultSummary({ result }: ResultSummaryProps) {
  const { amounts, summary } = result;
  const modeledBurden = amounts[summary.modeledBurdenAmountId];
  const isNetBenefit = modeledBurden.minorUnits < 0;

  return (
    <section aria-labelledby="result-heading" className={styles.section}>
      <div className={styles.headingRow}>
        <div>
          <p className={styles.eyebrow}>La stima in breve</p>
          <h2 id="result-heading" tabIndex={-1}>
            Quanto mi rimane?
          </h2>
        </div>
        <span className={styles.year}>Profilo fiscale 2026</span>
      </div>

      <div className={styles.heroGrid}>
        <div className={styles.primaryResult}>
          <span>Netto annuale stimato</span>
          <strong>{formatMoney(amounts[summary.annualNetAmountId])}</strong>
          <small>su {formatMoney(amounts.annualGrossSalary)} di RAL</small>
        </div>

        <div className={styles.monthlyResult}>
          <span>Netto mensile medio</span>
          <strong>
            {formatMoney(amounts[summary.averageMonthlyNetAmountId])}
          </strong>
          <small>netto annuale ÷ 12</small>
        </div>
      </div>

      <div className={styles.contextRow}>
        <div>
          <span>Media per {result.input.salaryPaymentsPerYear} mensilità</span>
          <strong>
            {formatMoney(amounts[summary.averageSalaryPaymentAmountId])}
          </strong>
          <small>
            Non simula l'importo esatto di tredicesima o quattordicesima.
          </small>
        </div>
        <div className={isNetBenefit ? styles.benefit : styles.burden}>
          <span>
            {isNetBenefit
              ? "Beneficio netto modellato"
              : "Prelievo complessivo modellato"}
          </span>
          <strong>
            {formatSignedMoney(
              modeledBurden,
              isNetBenefit ? "add" : "subtract",
            )}
          </strong>
          <small>
            {formatBasisPoints(Math.abs(summary.effectiveBurdenBasisPoints))}{" "}
            della RAL, includendo contributi, imposte e benefici modellati.
          </small>
        </div>
      </div>
    </section>
  );
}
