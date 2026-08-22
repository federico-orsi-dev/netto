import { AMOUNT_COPY, TRACE_STATUS_COPY } from "../../content/it";
import type { SalaryCalculationResult } from "../../domain";
import { formatMoney } from "../../ui/formatters";
import styles from "./TransparencySections.module.css";

interface CalculationTraceProps {
  readonly result: SalaryCalculationResult;
}

export function CalculationTrace({ result }: CalculationTraceProps) {
  return (
    <details className={styles.traceDisclosure}>
      <summary>
        <span>
          <strong>Traccia di calcolo</strong>
          <small>
            {result.trace.length} passaggi deterministici e verificabili
          </small>
        </span>
        <span aria-hidden="true" className={styles.disclosureIcon}>
          +
        </span>
      </summary>
      <div className={styles.traceIntro}>
        <p>
          Questa è la vista tecnica: mostra ordine, basi, regole e risultati
          pubblici senza ricostruire i calcoli nell'interfaccia.
        </p>
        <dl>
          <div>
            <dt>Ruleset</dt>
            <dd>{result.metadata.rulesetId}</dd>
          </div>
          <div>
            <dt>Profilo</dt>
            <dd>{result.metadata.profileId}</dd>
          </div>
          <div>
            <dt>Politica monetaria</dt>
            <dd>{result.metadata.moneyPolicyId}</dd>
          </div>
        </dl>
      </div>
      <ol className={styles.traceList}>
        {result.trace.map((entry, index) => {
          const publicAmount = result.amounts[entry.publicOutputAmountId];
          return (
            <li key={entry.id}>
              <div className={styles.traceIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className={styles.traceBody}>
                <div className={styles.traceHeading}>
                  <h3>{AMOUNT_COPY[entry.publicOutputAmountId].label}</h3>
                  <span className={styles[entry.status]}>
                    {TRACE_STATUS_COPY[entry.status]}
                  </span>
                </div>
                <p className={styles.traceFormula}>
                  {entry.formula.expression}
                </p>
                <div className={styles.traceValues}>
                  <span>
                    Risultato pubblico{" "}
                    <strong>{formatMoney(publicAmount)}</strong>
                  </span>
                  <span>
                    Valore esatto <code>{entry.exactOutput}</code>
                  </span>
                </div>
                {entry.inputAmountIds.length === 0 ? null : (
                  <p className={styles.traceInputs}>
                    Input:{" "}
                    {entry.inputAmountIds
                      .map((id) => AMOUNT_COPY[id].label)
                      .join(" · ")}
                  </p>
                )}
                {entry.ruleIds.length === 0 ? null : (
                  <p className={styles.traceRules}>
                    {entry.ruleIds.join(" · ")}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </details>
  );
}
