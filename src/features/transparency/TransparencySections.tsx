import { ASSUMPTION_COPY, EXCLUSION_COPY } from "../../content/it";
import type { SalaryCalculationResult } from "../../domain";
import { CalculationTrace } from "./CalculationTrace";
import styles from "./TransparencySections.module.css";

interface TransparencySectionsProps {
  readonly result: SalaryCalculationResult;
}

export function TransparencySections({ result }: TransparencySectionsProps) {
  const sourcesByIssuer = result.sources.reduce((groups, source) => {
    const current = groups.get(source.issuer) ?? [];
    current.push(source);
    groups.set(source.issuer, current);
    return groups;
  }, new Map<string, SalaryCalculationResult["sources"][number][]>());

  return (
    <section aria-labelledby="method-heading" className={styles.section}>
      <div className={styles.heading}>
        <p>Trasparenza, non una scatola nera</p>
        <h2 id="method-heading">Come lo abbiamo calcolato?</h2>
        <span>
          Ipotesi esplicite, regole 2026 versionate e fonti istituzionali
          consultabili.
        </span>
      </div>

      <div className={styles.methodGrid}>
        <article>
          <span className={styles.number}>01</span>
          <h3>Profilo definito</h3>
          <p>
            Dipendente privato nel profilo industriale CIGS approvato, lavoro
            ordinario per tutto il 2026, domicilio fiscale a Milano.
          </p>
        </article>
        <article>
          <span className={styles.number}>02</span>
          <h3>Calcolo locale</h3>
          <p>
            La RAL resta nel browser: nessuna API remota, account, salvataggio,
            URL condiviso o telemetria.
          </p>
        </article>
        <article>
          <span className={styles.number}>03</span>
          <h3>Metodo e limiti</h3>
          <p>
            È una stima annuale riconciliata ai centesimi, non una busta paga,
            una dichiarazione o una verifica CCNL.
          </p>
        </article>
      </div>

      <div className={styles.disclosures}>
        <details open>
          <summary>
            <span>
              <strong>Ipotesi del calcolo</strong>
              <small>
                Le condizioni che rendono deterministica questa stima
              </small>
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
              <small>Nove confini espliciti del profilo V1</small>
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
              <strong>Fonti autorevoli</strong>
              <small>
                {result.sources.length} riferimenti ufficiali versionati
              </small>
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

        <CalculationTrace result={result} />
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
