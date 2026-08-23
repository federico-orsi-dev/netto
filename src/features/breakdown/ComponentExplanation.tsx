import {
  AMOUNT_COPY,
  COMPONENT_COPY,
  TRACE_STATUS_COPY,
} from "../../content/it";
import type { RefObject } from "react";
import type {
  CalculationComponentId,
  SalaryCalculationResult,
} from "../../domain";
import {
  formatExactEuro,
  formatMoney,
  formatRate,
  formatSignedMoney,
} from "../../ui/formatters";
import styles from "./GrossToNetSection.module.css";

interface ComponentExplanationProps {
  readonly result: SalaryCalculationResult;
  readonly selectedId: CalculationComponentId;
  readonly explanationRef: RefObject<HTMLElement | null>;
}

export function ComponentExplanation({
  result,
  selectedId,
  explanationRef,
}: ComponentExplanationProps) {
  const component = result.components[selectedId];
  const copy = COMPONENT_COPY[selectedId];
  const trace = result.trace.find(({ id }) => id === component.traceEntryId);
  if (trace === undefined) return null;
  const amount = result.amounts[component.amountId];
  const direction =
    component.direction === "add"
      ? "add"
      : component.direction === "subtract"
        ? "subtract"
        : "neutral";
  const sources = trace.sourceIds
    .map((sourceId) => result.sources.find(({ id }) => id === sourceId))
    .filter((source) => source !== undefined);

  return (
    <aside
      ref={explanationRef}
      className={styles.explanation}
      id="component-explanation"
      aria-live="polite"
      aria-labelledby="explanation-title"
      data-component-id={selectedId}
    >
      <div className={styles.explanationHeader}>
        <span>Nel tuo calcolo</span>
        <strong>{formatSignedMoney(amount, direction)}</strong>
      </div>
      <h3 id="explanation-title">{copy.title}</h3>
      <div className={styles.conceptGrid}>
        <section>
          <h4>Cos'è?</h4>
          <p>{copy.summary}</p>
        </section>
        <section>
          <h4>{copy.institutionLabel}</h4>
          <p>{copy.institution}</p>
        </section>
        <section>
          <h4>Cosa significa qui?</h4>
          <p>{copy.meaning}</p>
        </section>
      </div>

      <details className={styles.technicalDetails}>
        <summary>
          <span>
            <strong>Come è stato calcolato?</strong>
            <small>Formula, regole e fonti ufficiali</small>
          </span>
          <span aria-hidden="true" className={styles.technicalIcon}>
            +
          </span>
        </summary>
        <div className={styles.technicalBody}>
          <p className={styles.traceStatus}>
            Stato del passaggio:{" "}
            <strong>{TRACE_STATUS_COPY[trace.status]}</strong>
          </p>

          {component.childComponentIds.length === 0 ? null : (
            <dl className={styles.childAmounts}>
              {component.childComponentIds.map((childId) => {
                const child = result.components[childId];
                return (
                  <div key={childId}>
                    <dt>{AMOUNT_COPY[child.amountId].label}</dt>
                    <dd>{formatMoney(result.amounts[child.amountId])}</dd>
                  </div>
                );
              })}
            </dl>
          )}

          <div className={styles.formula}>
            <span>Logica applicata</span>
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
          </div>

          {trace.ruleIds.length === 0 ? null : (
            <p className={styles.ruleIds}>
              Regole: <code>{trace.ruleIds.join(" · ")}</code>
            </p>
          )}

          {sources.length === 0 ? null : (
            <div className={styles.sourcePreview}>
              <span>Fonti principali</span>
              <ul>
                {sources.slice(0, 3).map((source) => (
                  <li key={source.id}>
                    <a
                      href={source.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {source.issuer} — {source.title}
                      <span className="srOnly">
                        {" "}
                        (si apre in una nuova scheda)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              {sources.length > 3 ? (
                <small>
                  Altre {sources.length - 3} fonti nel metodo completo.
                </small>
              ) : null}
            </div>
          )}
        </div>
      </details>
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
