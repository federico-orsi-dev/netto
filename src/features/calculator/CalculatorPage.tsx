import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import { compareCompensationResults } from "../../application";
import {
  calculateSalary2026,
  type SalaryCalculationResult,
  type SalaryPaymentsPerYear,
} from "../../domain";
import { CompensationExperience } from "../translator/CompensationExperience";
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
  const [rawProposedSalary, setRawProposedSalary] = useState("");
  const [salaryPayments, setSalaryPayments] =
    useState<SalaryPaymentsPerYear>(13);
  const [issue, setIssue] = useState<SalaryInputIssueCode | null>(null);
  const [proposedIssue, setProposedIssue] =
    useState<SalaryInputIssueCode | null>(null);
  const [currentResult, setCurrentResult] =
    useState<SalaryCalculationResult | null>(null);
  const [proposedResult, setProposedResult] =
    useState<SalaryCalculationResult | null>(null);
  const [comparisonActive, setComparisonActive] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);

  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const proposedInputRef = useRef<HTMLInputElement>(null);
  const comparisonButtonRef = useRef<HTMLButtonElement>(null);
  const pendingResultFocusRef = useRef(false);
  const pendingProposedFocusRef = useRef(false);
  const pendingComparisonButtonFocusRef = useRef(false);

  const comparison = useMemo(
    () =>
      currentResult === null || proposedResult === null
        ? null
        : compareCompensationResults(currentResult, proposedResult),
    [currentResult, proposedResult],
  );

  useEffect(() => {
    if (!pendingResultFocusRef.current || currentResult === null) return;
    const heading = resultHeadingRef.current;
    if (heading === null) return;
    if (typeof heading.scrollIntoView === "function") {
      heading.scrollIntoView({ block: "start" });
    }
    heading.focus({ preventScroll: true });
    pendingResultFocusRef.current = false;
  }, [currentResult, proposedResult]);

  useEffect(() => {
    if (!pendingProposedFocusRef.current || !comparisonActive) return;
    proposedInputRef.current?.focus();
    pendingProposedFocusRef.current = false;
  }, [comparisonActive]);

  useEffect(() => {
    if (!pendingComparisonButtonFocusRef.current || comparisonActive) return;
    comparisonButtonRef.current?.focus();
    pendingComparisonButtonFocusRef.current = false;
  }, [comparisonActive]);

  const calculateResult = (
    annualGrossSalaryEuro: number,
    payments: SalaryPaymentsPerYear,
  ): SalaryCalculationResult | null => {
    const outcome = calculateSalary2026({
      annualGrossSalaryEuro,
      salaryPaymentsPerYear: payments,
    });
    if (!outcome.ok) return null;
    return outcome.result;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseItalianSalaryInput(rawSalary);
    if (!parsed.ok) {
      setIssue(parsed.code);
      setCurrentResult(null);
      setProposedResult(null);
      return;
    }

    try {
      const nextCurrent = calculateResult(parsed.value, salaryPayments);
      if (nextCurrent === null) {
        setIssue(issueForDomainValue(parsed.value));
        setCurrentResult(null);
        setProposedResult(null);
        return;
      }
      setRawSalary(formatSalaryInput(parsed.value));
      setIssue(null);
      setUnexpectedError(false);
      setCurrentResult(nextCurrent);

      const parsedProposed = parseItalianSalaryInput(rawProposedSalary);
      if (comparisonActive && parsedProposed.ok) {
        setProposedResult(
          calculateResult(parsedProposed.value, salaryPayments),
        );
      } else {
        setProposedResult(null);
      }
      pendingResultFocusRef.current = true;
    } catch (error) {
      handleUnexpectedError(error);
    }
  };

  const handleComparisonSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseItalianSalaryInput(rawProposedSalary);
    if (!parsed.ok) {
      setProposedIssue(parsed.code);
      setProposedResult(null);
      return;
    }
    try {
      const nextProposed = calculateResult(parsed.value, salaryPayments);
      if (nextProposed === null) {
        setProposedIssue(issueForDomainValue(parsed.value));
        setProposedResult(null);
        return;
      }
      setRawProposedSalary(formatSalaryInput(parsed.value));
      setProposedIssue(null);
      setUnexpectedError(false);
      setProposedResult(nextProposed);
      pendingResultFocusRef.current = true;
    } catch (error) {
      handleUnexpectedError(error);
    }
  };

  const handleRawSalaryChange = (value: string) => {
    setRawSalary(value);
    setIssue(null);
    setUnexpectedError(false);
    setCurrentResult(null);
    setProposedResult(null);
  };

  const handleRawProposedSalaryChange = (value: string) => {
    setRawProposedSalary(value);
    setProposedIssue(null);
    setUnexpectedError(false);
    setProposedResult(null);
  };

  const handleSalaryBlur = () => {
    const parsed = parseItalianSalaryInput(rawSalary);
    if (rawSalary.trim().length > 0 && parsed.ok) {
      setRawSalary(formatSalaryInput(parsed.value));
      setIssue(null);
    }
  };

  const handleProposedSalaryBlur = () => {
    const parsed = parseItalianSalaryInput(rawProposedSalary);
    if (rawProposedSalary.trim().length > 0 && parsed.ok) {
      setRawProposedSalary(formatSalaryInput(parsed.value));
      setProposedIssue(null);
    }
  };

  const handleSalaryPaymentsChange = (value: SalaryPaymentsPerYear) => {
    setSalaryPayments(value);
    const parsedCurrent = parseItalianSalaryInput(rawSalary);
    if (!parsedCurrent.ok || currentResult === null) return;
    try {
      setCurrentResult(calculateResult(parsedCurrent.value, value));
      const parsedProposed = parseItalianSalaryInput(rawProposedSalary);
      if (comparisonActive && parsedProposed.ok) {
        setProposedResult(calculateResult(parsedProposed.value, value));
      }
    } catch (error) {
      handleUnexpectedError(error);
    }
  };

  const activateComparison = () => {
    pendingProposedFocusRef.current = true;
    setComparisonActive(true);
  };

  const closeComparison = () => {
    pendingComparisonButtonFocusRef.current = true;
    setComparisonActive(false);
    setRawProposedSalary("");
    setProposedIssue(null);
    setProposedResult(null);
  };

  const handleUnexpectedError = (error: unknown) => {
    if (import.meta.env.DEV) console.error(error);
    setUnexpectedError(true);
    setCurrentResult(null);
    setProposedResult(null);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a
          className={styles.brand}
          href="#top"
          aria-label="Netto, torna all'inizio"
        >
          <span aria-hidden="true">N/</span>
          Netto
        </a>
        <div className={styles.headerMeta}>
          <span>Milano · 2026</span>
          {currentResult === null ? null : (
            <a href="#metodo">Perimetro e metodo</a>
          )}
        </div>
      </header>

      <main id="top">
        <section
          className={`${styles.intro} ${currentResult === null ? "" : styles.introCompact}`}
          aria-labelledby="page-title"
        >
          <p className={styles.kicker}>Dalla RAL al netto</p>
          <h1 id="page-title">
            La RAL è l'inizio. <span>Netto la traduce.</span>
          </h1>
          <p className={styles.lead}>
            Quanto ti rimane davvero — e quanto vale un cambiamento di stipendio
            — nel profilo Milano 2026.
          </p>
          <SalaryForm
            rawSalary={rawSalary}
            issue={issue}
            hasResult={currentResult !== null}
            onRawSalaryChange={handleRawSalaryChange}
            onSalaryBlur={handleSalaryBlur}
            onSubmit={handleSubmit}
          />
          <details className={styles.scopePrimer}>
            <summary>Questa stima è adatta al mio caso?</summary>
            <p>
              È pensata per un dipendente privato a tempo indeterminato, al
              lavoro per tutto il 2026, con domicilio fiscale a Milano e nel
              profilo contributivo industriale descritto nel metodo. Non
              richiede dati personali e non sostituisce una busta paga.
            </p>
          </details>
        </section>

        {unexpectedError ? (
          <section className={styles.fatalError} role="alert">
            <h2>Non riusciamo a completare la traduzione.</h2>
            <p>
              Un controllo interno ha fermato il calcolo. Nessun risultato
              parziale è stato mostrato: ricarica la pagina e riprova.
            </p>
          </section>
        ) : null}

        {currentResult === null ? (
          <p className={styles.initialNote}>
            Un numero chiaro subito. Il perché resta disponibile, voce per voce.
          </p>
        ) : (
          <div className={styles.results}>
            <CompensationExperience
              currentResult={currentResult}
              comparison={comparison}
              comparisonActive={comparisonActive}
              rawProposedSalary={rawProposedSalary}
              proposedIssue={proposedIssue}
              salaryPayments={salaryPayments}
              resultHeadingRef={resultHeadingRef}
              proposedInputRef={proposedInputRef}
              comparisonButtonRef={comparisonButtonRef}
              onActivateComparison={activateComparison}
              onCloseComparison={closeComparison}
              onRawProposedSalaryChange={handleRawProposedSalaryChange}
              onProposedSalaryBlur={handleProposedSalaryBlur}
              onComparisonSubmit={handleComparisonSubmit}
              onSalaryPaymentsChange={handleSalaryPaymentsChange}
            />
            <div id="metodo">
              <TransparencySections
                result={comparison?.proposed ?? currentResult}
                currentResult={comparison === null ? null : currentResult}
              />
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <div>
          <strong>Netto</strong>
          <span>Il lordo, tradotto in ciò che ti rimane.</span>
        </div>
        <p>
          Stima locale e trasparente, non una busta paga o consulenza fiscale.
          Nessun dato salariale lascia il browser.
        </p>
      </footer>
    </div>
  );
}

function issueForDomainValue(value: number): SalaryInputIssueCode {
  if (value < 10_000) return "below_supported_range";
  if (value > 120_000) return "above_supported_range";
  return "invalid_format";
}
