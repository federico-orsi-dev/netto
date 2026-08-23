import type { FormEvent } from "react";

import { INPUT_ERROR_COPY } from "../../content/it";
import type { SalaryInputIssueCode } from "./input-parser";
import styles from "./SalaryForm.module.css";

interface SalaryFormProps {
  readonly rawSalary: string;
  readonly issue: SalaryInputIssueCode | null;
  readonly hasResult: boolean;
  readonly onRawSalaryChange: (value: string) => void;
  readonly onSalaryBlur: () => void;
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function SalaryForm({
  rawSalary,
  issue,
  hasResult,
  onRawSalaryChange,
  onSalaryBlur,
  onSubmit,
}: SalaryFormProps) {
  const supportingTextId = issue === null ? "ral-help" : "ral-error";

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="annual-gross-salary">
          <span>La tua RAL</span>
          <small>Retribuzione annua lorda</small>
        </label>
        <div className={styles.inputShell}>
          <span aria-hidden="true" className={styles.currency}>
            €
          </span>
          <input
            id="annual-gross-salary"
            name="annualGrossSalary"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="35.000"
            value={rawSalary}
            aria-describedby={supportingTextId}
            aria-invalid={issue !== null}
            onBlur={onSalaryBlur}
            onChange={(event) => onRawSalaryChange(event.target.value)}
          />
          <span aria-hidden="true" className={styles.suffix}>
            lordi / anno
          </span>
        </div>
        {issue === null ? (
          <p className={styles.help} id="ral-help">
            Da 10.000 € a 120.000 €, in euro interi.
          </p>
        ) : (
          <p className={styles.error} id="ral-error" role="alert">
            {INPUT_ERROR_COPY[issue]}
          </p>
        )}
      </div>

      <button className={styles.submit} type="submit">
        {hasResult ? "Aggiorna la traduzione" : "Traduci la RAL"}
        <span aria-hidden="true">→</span>
      </button>

      <p className={styles.privacy}>
        <span aria-hidden="true">●</span> Resta tutto nel tuo browser.
      </p>
    </form>
  );
}
