import {
  AMOUNT_COPY,
  COMPONENT_COPY,
  RULE_CHANGE_COPY,
  TRACE_STATUS_COPY,
} from "../../content/it";
import type { CompensationComparison } from "../../application";
import type {
  CalculationComponentId,
  SalaryCalculationResult,
} from "../../domain";
import {
  formatExactEuro,
  formatMoney,
  formatMoneyDelta,
  formatRate,
  formatSignedMoney,
} from "../../ui/formatters";
import styles from "./ComponentLedger.module.css";

interface ComponentLedgerProps {
  readonly result: SalaryCalculationResult;
  readonly comparison: CompensationComparison | null;
}

export function ComponentLedger({ result, comparison }: ComponentLedgerProps) {
  if (comparison !== null) {
    const changes = [...comparison.materialComponentChanges].sort(
      (left, right) =>
        Math.abs(right.annualNetEffect.minorUnits) -
        Math.abs(left.annualNetEffect.minorUnits),
    );
    return (
      <div className={styles.ledgerSection}>
        <div className={styles.ledgerHeading}>
          <p>Perché il netto cambia così</p>
          <h2>Cosa si muove nel calcolo</h2>
          <span>
            Ogni importo confronta la stessa voce tra la RAL attuale e quella
            proposta.
          </span>
        </div>
        {changes.length === 0 ? (
          <p className={styles.noChanges}>Nessuna voce fiscale cambia.</p>
        ) : (
          <ol
            className={styles.ledger}
            aria-label="Voci cambiate nel confronto"
          >
            {changes.map((change) => {
              const netEffectDirection =
                change.annualNetEffect.minorUnits >= 0 ? "add" : "subtract";
              return (
                <li key={change.id} data-component-id={change.id}>
                  <details>
                    <summary>
                      <span
                        className={
                          netEffectDirection === "add"
                            ? styles.addMarker
                            : styles.subtractMarker
                        }
                        aria-hidden="true"
                      >
                        {netEffectDirection === "add" ? "+" : "−"}
                      </span>
                      <span className={styles.ledgerLabel}>
                        {AMOUNT_COPY[change.amountId].label}
                      </span>
                      <strong>
                        {formatMoneyDelta(change.annualNetEffect)}
                      </strong>
                      <span className={styles.openHint}>
                        Effetto sul netto · apri il perché
                      </span>
                    </summary>
                    <ComponentInsight
                      result={comparison.proposed}
                      componentId={change.id}
                      comparison={comparison}
                    />
                  </details>
                </li>
              );
            })}
          </ol>
        )}
        <RuleChanges comparison={comparison} />
      </div>
    );
  }

  const items = result.breakdownOrder.filter(
    (id) => id !== "grossSalary" && id !== "annualNet",
  );
  return (
    <div className={styles.ledgerSection}>
      <div className={styles.ledgerHeading}>
        <p>Dentro la traduzione</p>
        <h2>Dove cambia il lordo</h2>
        <span>
          Apri una voce per capire che cos'è, cosa significa qui e da quale
          regola deriva.
        </span>
      </div>
      <ol className={styles.ledger} aria-label="Voci dal lordo al netto">
        {items.map((componentId) => {
          const component = result.components[componentId];
          const amount = result.amounts[component.amountId];
          const direction = component.direction === "add" ? "add" : "subtract";
          return (
            <li key={componentId} data-component-id={componentId}>
              <details>
                <summary>
                  <span
                    className={
                      direction === "add"
                        ? styles.addMarker
                        : styles.subtractMarker
                    }
                    aria-hidden="true"
                  >
                    {direction === "add" ? "+" : "−"}
                  </span>
                  <span className={styles.ledgerLabel}>
                    {AMOUNT_COPY[component.amountId].label}
                  </span>
                  <strong>{formatSignedMoney(amount, direction)}</strong>
                  <span className={styles.openHint}>Apri il perché</span>
                </summary>
                <ComponentInsight
                  result={result}
                  componentId={componentId}
                  comparison={null}
                />
              </details>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ComponentInsight({
  result,
  componentId,
  comparison,
}: {
  readonly result: SalaryCalculationResult;
  readonly componentId: CalculationComponentId;
  readonly comparison: CompensationComparison | null;
}) {
  const component = result.components[componentId];
  const copy = COMPONENT_COPY[componentId];
  const trace = result.trace.find(({ id }) => id === component.traceEntryId);
  if (trace === undefined) return null;
  const sources = trace.sourceIds
    .map((sourceId) => result.sources.find(({ id }) => id === sourceId))
    .filter((source) => source !== undefined);
  const comparisonChange = comparison?.componentChanges.find(
    ({ id }) => id === componentId,
  );

  return (
    <div className={styles.insight}>
      {comparisonChange === undefined ? null : (
        <p className={styles.comparisonImpact}>
          <span>
            {formatMoney(comparisonChange.currentAmount)} →{" "}
            {formatMoney(comparisonChange.proposedAmount)}
          </span>
          <strong>
            Variazione della voce:{" "}
            {formatMoneyDelta(comparisonChange.amountDelta)}
          </strong>
        </p>
      )}
      <h3>{copy.title}</h3>
      <p>{copy.summary}</p>
      <dl className={styles.conceptList}>
        <div>
          <dt>{copy.institutionLabel}</dt>
          <dd>{copy.institution}</dd>
        </div>
        <div>
          <dt>Cosa significa qui?</dt>
          <dd>{copy.meaning}</dd>
        </div>
      </dl>
      <details className={styles.evidenceDetails}>
        <summary>Verifica formula, regole e fonti</summary>
        <div>
          <p>
            Stato del passaggio:{" "}
            <strong>{TRACE_STATUS_COPY[trace.status]}</strong>
          </p>
          <code>{trace.formula.expression}</code>
          {trace.formula.parameters.length === 0 ? null : (
            <dl>
              {trace.formula.parameters.map((parameter) => (
                <div key={parameter.name}>
                  <dt>{parameter.name}</dt>
                  <dd>{formatTraceParameter(parameter, result)}</dd>
                </div>
              ))}
            </dl>
          )}
          {trace.ruleIds.length === 0 ? null : (
            <p className={styles.ruleIds}>
              Regole: <code>{trace.ruleIds.join(" · ")}</code>
            </p>
          )}
          {sources.length === 0 ? null : (
            <ul className={styles.inlineSources}>
              {sources.map((source) => (
                <li key={source.id}>
                  <a href={source.officialUrl} target="_blank" rel="noreferrer">
                    {source.issuer} — {source.title}
                    <span className="srOnly">
                      {" "}
                      (si apre in una nuova scheda)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </details>
    </div>
  );
}

function RuleChanges({
  comparison,
}: {
  readonly comparison: CompensationComparison;
}) {
  const readableChanges = comparison.ruleApplicabilityChanges.flatMap(
    (change) => {
      const copy = RULE_CHANGE_COPY[change.ruleId];
      return copy === undefined
        ? []
        : [{ ...change, text: copy[change.change] }];
    },
  );
  if (readableChanges.length === 0) return null;
  return (
    <aside className={styles.ruleChanges} aria-labelledby="rule-change-heading">
      <p>Soglia attraversata</p>
      <h3 id="rule-change-heading">Cambia l'applicabilità di una regola</h3>
      <ul>
        {readableChanges.map((change) => (
          <li key={change.ruleId}>
            {change.text} <code>{change.ruleId}</code>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function formatTraceParameter(
  parameter: SalaryCalculationResult["trace"][number]["formula"]["parameters"][number],
  result: SalaryCalculationResult,
): string {
  if (parameter.kind === "amount") {
    return formatMoney(result.amounts[parameter.amountId]);
  }
  if (parameter.kind === "integer") return String(parameter.value);
  if (parameter.kind === "boolean") return parameter.value ? "Sì" : "No";
  if (parameter.unit === "rate") return formatRate(parameter.value);
  if (parameter.unit === "exact_euro") return formatExactEuro(parameter.value);
  return parameter.value.replace(".", ",");
}
