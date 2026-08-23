import { ASSUMPTION_COPY, EXCLUSION_COPY } from "../../content/it";
import type { SalaryCalculationResult } from "../../domain";
import { CalculationTrace } from "./CalculationTrace";
import styles from "./TransparencySections.module.css";

interface TransparencySectionsProps {
  readonly result: SalaryCalculationResult;
  readonly currentResult: SalaryCalculationResult | null;
}

export function TransparencySections({
  result,
  currentResult,
}: TransparencySectionsProps) {
  const sourcesByIssuer = result.sources.reduce((groups, source) => {
    const current = groups.get(source.issuer) ?? [];
    current.push(source);
    groups.set(source.issuer, current);
    return groups;
  }, new Map<string, SalaryCalculationResult["sources"][number][]>());

  return (
    <section aria-labelledby="method-heading" className={styles.section}>
      <div className={styles.heading}>
        <p>Fiducia prima, verifica quando serve</p>
        <h2 id="method-heading">Il perimetro di questa stima</h2>
        <span>
          Un risultato utile perché dichiara con precisione a chi si applica.
        </span>
      </div>

      <div className={styles.scopeStatement}>
        <strong>In parole semplici</strong>
        <p>
          Netto modella un dipendente privato a tempo indeterminato, al lavoro
          per tutto il 2026 e fiscalmente domiciliato a Milano. La RAL è
          retribuzione ordinaria interamente contributiva, senza altri redditi,
          familiari a carico o agevolazioni personali.
        </p>
        <p>
          È una stima annuale riconciliata ai centesimi: non una busta paga, una
          dichiarazione fiscale o una verifica del tuo CCNL.
        </p>
      </div>

      <div className={styles.disclosures}>
        <details>
          <summary>
            <span>
              <strong>Ipotesi complete</strong>
              <small>{result.assumptions.length} condizioni dichiarate</small>
            </span>
            <span aria-hidden="true" className={styles.disclosureIcon}>
              +
            </span>
          </summary>
          <ul className={styles.assumptionList}>
            {result.assumptions.map(({ id }) => (
              <li key={id}>{ASSUMPTION_COPY[id]}</li>
            ))}
          </ul>
        </details>

        <details>
          <summary>
            <span>
              <strong>Cosa non include</strong>
              <small>Nove confini espliciti del modello</small>
            </span>
            <span aria-hidden="true" className={styles.disclosureIcon}>
              +
            </span>
          </summary>
          <ul className={styles.exclusionList}>
            {result.exclusions.map(({ ruleId }) => (
              <li key={ruleId}>
                <span>{EXCLUSION_COPY[ruleId]}</span>
                <code>{ruleId}</code>
              </li>
            ))}
          </ul>
        </details>

        <details>
          <summary>
            <span>
              <strong>Fonti ufficiali</strong>
              <small>{result.sources.length} riferimenti versionati</small>
            </span>
            <span aria-hidden="true" className={styles.disclosureIcon}>
              +
            </span>
          </summary>
          <div className={styles.sourceGroups}>
            {[...sourcesByIssuer.entries()].map(([issuer, sources]) => (
              <section
                key={issuer}
                aria-labelledby={`source-${slugify(issuer)}`}
              >
                <h3 id={`source-${slugify(issuer)}`}>{issuer}</h3>
                <ul>
                  {sources.map((source) => (
                    <li key={source.id}>
                      <a
                        href={source.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source.title}
                        <span className="srOnly">
                          {" "}
                          (si apre in una nuova scheda)
                        </span>
                      </a>
                      <code>{source.id}</code>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </details>

        {currentResult === null ? (
          <CalculationTrace result={result} />
        ) : (
          <div className={styles.comparisonTraces}>
            <CalculationTrace result={currentResult} label="RAL attuale" />
            <CalculationTrace result={result} label="RAL proposta" />
          </div>
        )}
      </div>
    </section>
  );
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .toLowerCase();
}
