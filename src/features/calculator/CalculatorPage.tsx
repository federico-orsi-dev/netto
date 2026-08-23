import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  calculateSalary2026,
  type SalaryCalculationResult,
  type SalaryPaymentsPerYear,
} from "../../domain";
import { GrossToNetSection } from "../breakdown/GrossToNetSection";
import { ResultSummary } from "../results/ResultSummary";
import { TransparencySections } from "../transparency/TransparencySections";
import {
  formatSalaryInput,
  parseItalianSalaryInput,
  type SalaryInputIssueCode,
} from "./input-parser";
import styles from "./CalculatorPage.module.css";
import { SalaryForm } from "./SalaryForm";

export function CalculatorPage() {
  const [rawSalary, setRawSalary] = useState("");
  const [salaryPayments, setSalaryPayments] =
    useState<SalaryPaymentsPerYear>(13);
  const [issue, setIssue] = useState<SalaryInputIssueCode | null>(null);
  const [result, setResult] = useState<SalaryCalculationResult | null>(null);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const shouldFocusResultRef = useRef(false);
  const resultRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldFocusResultRef.current || result === null) return;
    const resultRegion = resultRegionRef.current;
    const heading = resultRegion?.querySelector<HTMLElement>("#result-heading");
    const primaryResult = resultRegion?.querySelector<HTMLElement>(
      "[data-primary-result]",
    );
    if (heading === undefined || heading === null) return;

    const primaryBounds = primaryResult?.getBoundingClientRect();
    const primaryIsVisible =
      primaryBounds !== undefined &&
      primaryBounds.top >= 0 &&
      primaryBounds.bottom <= window.innerHeight;
    if (!primaryIsVisible) {
      heading.closest("section")?.scrollIntoView({ block: "start" });
    }
    heading.focus({ preventScroll: true });
    shouldFocusResultRef.current = false;
  }, [result]);

  const runCalculation = (
    annualGrossSalaryEuro: number,
    payments: SalaryPaymentsPerYear,
  ) => {
    try {
      const outcome = calculateSalary2026({
        annualGrossSalaryEuro,
        salaryPaymentsPerYear: payments,
      });
      if (!outcome.ok) {
        const salaryIssue = outcome.issues.find(
          ({ field }) => field === "annualGrossSalaryEuro",
        );
        setIssue(
          salaryIssue?.code === "unsupported_annual_gross_salary"
            ? annualGrossSalaryEuro < 10_000
              ? "below_supported_range"
              : "above_supported_range"
            : "invalid_format",
        );
        setResult(null);
        return;
      }
      setUnexpectedError(false);
      setIssue(null);
      setResult(outcome.result);
    } catch (error) {
      if (import.meta.env.DEV) console.error(error);
      setUnexpectedError(true);
      setResult(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseItalianSalaryInput(rawSalary);
    if (!parsed.ok) {
      setIssue(parsed.code);
      setResult(null);
      return;
    }
    setRawSalary(formatSalaryInput(parsed.value));
    shouldFocusResultRef.current = true;
    runCalculation(parsed.value, salaryPayments);
  };

  const handleRawSalaryChange = (value: string) => {
    setRawSalary(value);
    setIssue(null);
    setUnexpectedError(false);
    setResult(null);
  };

  const handleSalaryBlur = () => {
    if (rawSalary.trim().length === 0) return;
    const parsed = parseItalianSalaryInput(rawSalary);
    if (parsed.ok) {
      setRawSalary(formatSalaryInput(parsed.value));
      setIssue(null);
    }
  };

  const handleSalaryPaymentsChange = (value: SalaryPaymentsPerYear) => {
    setSalaryPayments(value);
    const parsed = parseItalianSalaryInput(rawSalary);
    if (result !== null && parsed.ok) runCalculation(parsed.value, value);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a
          className={styles.brand}
          href="#top"
          aria-label="Netto, torna all'inizio"
        >
          <span aria-hidden="true">N</span>
          Netto
        </a>
        <div className={styles.headerMeta}>
          <span>Italia · 2026</span>
          {result !== null ? <a href="#metodo">Metodo e fonti</a> : null}
        </div>
      </header>

      <main id="top">
        <section className={styles.intro} aria-labelledby="page-title">
          <div className={styles.introCopy}>
            <p className={styles.kicker}>RAL → netto, senza scatole nere</p>
            <h1 id="page-title">
              Quanto vale davvero <span>la tua RAL?</span>
            </h1>
            <p className={styles.lead}>
              Stima il netto 2026 per un dipendente a Milano e scopri, voce per
              voce, come il lordo diventa ciò che ti rimane.
            </p>
            <ul
              className={styles.trustList}
              aria-label="Caratteristiche della stima"
            >
              <li>Calcolo locale</li>
              <li>Fonti ufficiali</li>
              <li>Passaggi verificabili</li>
            </ul>
          </div>

          <SalaryForm
            rawSalary={rawSalary}
            salaryPayments={salaryPayments}
            issue={issue}
            hasResult={result !== null}
            onRawSalaryChange={handleRawSalaryChange}
            onSalaryBlur={handleSalaryBlur}
            onSalaryPaymentsChange={handleSalaryPaymentsChange}
            onSubmit={handleSubmit}
          />
        </section>

        {unexpectedError ? (
          <section className={styles.fatalError} role="alert">
            <h2>Non riusciamo a completare la stima.</h2>
            <p>
              Il calcolo non è stato mostrato perché un controllo interno non è
              andato a buon fine. Ricarica la pagina e riprova.
            </p>
          </section>
        ) : null}

        {result === null ? (
          <section
            className={styles.emptyState}
            aria-label="Come funziona Netto"
          >
            <p>
              Una risposta immediata, con il ragionamento sempre disponibile.
            </p>
            <ol>
              <li>
                <span>01</span>
                Inserisci la RAL
              </li>
              <li>
                <span>02</span>
                Leggi il netto
              </li>
              <li>
                <span>03</span>
                Esplora ogni voce
              </li>
            </ol>
          </section>
        ) : (
          <div className={styles.results} ref={resultRegionRef}>
            <ResultSummary result={result} />
            <GrossToNetSection result={result} />
            <div id="metodo">
              <TransparencySections result={result} />
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <div>
          <strong>Netto</strong>
          <span>Stima trasparente del lordo-netto italiano.</span>
        </div>
        <p>
          Non è una busta paga né una consulenza fiscale. Nessun dato salariale
          lascia il browser.
        </p>
      </footer>
    </div>
  );
}
