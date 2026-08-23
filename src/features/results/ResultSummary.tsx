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
        <div className={styles.primaryResult} data-primary-result>
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
              : "Impatto complessivo modellato"}
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

      {isNetBenefit ? (
        <aside
          className={styles.netBenefitExplanation}
          aria-labelledby="net-benefit-explanation-title"
        >
          <div aria-hidden="true" className={styles.benefitMark}>
            +
          </div>
          <div>
            <strong id="net-benefit-explanation-title">
              Perché il risultato supera la RAL?
            </strong>
            <p>
              Il datore di lavoro non paga più della RAL. Questa stima include{" "}
              {formatMoney(amounts.totalCashBenefits)} di benefici fiscali
              monetari previsti dal modello 2026. In questo caso superano
              contributi e imposte modellati: la differenza è mostrata come
              beneficio netto.
            </p>
          </div>
        </aside>
      ) : null}
    </section>
  );
}
