import {
  AMOUNT_COPY,
  COMPONENT_COPY,
  RULE_CHANGE_COPY,
  TRACE_STATUS_COPY,
} from "../../content/it";
import type {
  CompensationComparison,
  CompensationComponentChange,
  SignedMoneyAmount,
} from "../../application";
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
      <div className={styles.changeStory}>
        <div className={styles.changeHeading}>
          <p>La differenza, riga per riga</p>
          <h2>Come si forma il nuovo netto</h2>
          <span>
            Partiamo dalla variazione di RAL. Ogni riga mostra quanto cambia la
            voce e cosa lascia, in più o in meno, nel netto annuale.
          </span>
        </div>
        <ol
          className={styles.changeEquation}
          aria-label="Come si forma la variazione netta"
        >
          <li className={styles.grossChange}>
            <EquationOperator amount={comparison.grossRalDelta} />
            <div className={styles.changeBody}>
              <div className={styles.changeTitle}>
                <h3>RAL nel contratto</h3>
                <strong>{formatMoneyDelta(comparison.grossRalDelta)}</strong>
              </div>
              <p>
                {formatMoney(comparison.current.amounts.annualGrossSalary)} →{" "}
                {formatMoney(comparison.proposed.amounts.annualGrossSalary)}
              </p>
            </div>
          </li>
          {changes.map((change) => (
            <ComparisonChangeRow
              key={change.id}
              change={change}
              result={comparison.proposed}
            />
          ))}
          <li className={styles.netChange}>
            <span className={styles.equalsOperator} aria-hidden="true">
              =
            </span>
            <div className={styles.changeBody}>
              <div className={styles.changeTitle}>
                <h3>Netto disponibile nell'anno</h3>
                <strong>{formatMoneyDelta(comparison.annualNetDelta)}</strong>
              </div>
              <p>
                {formatMoney(comparison.current.amounts.annualNet)} →{" "}
                {formatMoney(comparison.proposed.amounts.annualNet)}
              </p>
            </div>
          </li>
        </ol>
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
        <p>Dal lordo al netto</p>
        <h2>Cosa passa tra i due numeri</h2>
        <span>
          Ogni voce dice se riduce o aumenta il risultato. Aprila solo se vuoi
          capire il perché o verificare la fonte.
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
                <ComponentInsight result={result} componentId={componentId} />
              </details>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ComparisonChangeRow({
  change,
  result,
}: {
  readonly change: CompensationComponentChange;
  readonly result: SalaryCalculationResult;
}) {
  const effectIsPositive = change.annualNetEffect.minorUnits > 0;
  const componentIncreases = change.amountDelta.minorUnits > 0;
  const copy = COMPONENT_COPY[change.id];

  return (
    <li className={styles.componentChange} data-component-id={change.id}>
      <EquationOperator amount={change.annualNetEffect} />
      <div className={styles.changeBody}>
        <div className={styles.changeTitle}>
          <h3>{AMOUNT_COPY[change.amountId].label}</h3>
          <strong>
            {formatMoneyMagnitude(change.annualNetEffect)}{" "}
            {effectIsPositive ? "in più" : "in meno"}
            <span> nel netto</span>
          </strong>
        </div>
        <p className={styles.amountMovement}>
          {formatMoney(change.currentAmount)} →{" "}
          {formatMoney(change.proposedAmount)}
          <span>
            La voce {componentIncreases ? "aumenta" : "diminuisce"} di{" "}
            {formatMoneyMagnitude(change.amountDelta)}.
          </span>
        </p>
        <p className={styles.changeReason}>{copy.comparisonDriver}</p>
        <details className={styles.whyDetails}>
          <summary>Capire e verificare questa voce</summary>
          <ComponentInsight result={result} componentId={change.id} />
        </details>
      </div>
    </li>
  );
}

function EquationOperator({ amount }: { readonly amount: SignedMoneyAmount }) {
  const isPositive = amount.minorUnits >= 0;
  return (
    <span
      className={isPositive ? styles.addOperator : styles.subtractOperator}
      aria-hidden="true"
    >
      {isPositive ? "+" : "−"}
    </span>
  );
}

function formatMoneyMagnitude(amount: SignedMoneyAmount): string {
  return formatMoney({
    currency: "EUR",
    minorUnits: Math.abs(amount.minorUnits),
  });
}

function ComponentInsight({
  result,
  componentId,
}: {
  readonly result: SalaryCalculationResult;
  readonly componentId: CalculationComponentId;
}) {
  const component = result.components[componentId];
  const copy = COMPONENT_COPY[componentId];
  const trace = result.trace.find(({ id }) => id === component.traceEntryId);
  if (trace === undefined) return null;
  const sources = trace.sourceIds
    .map((sourceId) => result.sources.find(({ id }) => id === sourceId))
    .filter((source) => source !== undefined);

  return (
    <div className={styles.insight}>
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
