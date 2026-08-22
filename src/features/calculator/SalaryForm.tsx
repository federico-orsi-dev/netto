import type { FormEvent } from "react";

import { INPUT_ERROR_COPY } from "../../content/it";
import type { SalaryPaymentsPerYear } from "../../domain";
import type { SalaryInputIssueCode } from "./input-parser";
import styles from "./SalaryForm.module.css";

interface SalaryFormProps {
  readonly rawSalary: string;
  readonly salaryPayments: SalaryPaymentsPerYear;
  readonly issue: SalaryInputIssueCode | null;
  readonly hasResult: boolean;
  readonly onRawSalaryChange: (value: string) => void;
  readonly onSalaryBlur: () => void;
  readonly onSalaryPaymentsChange: (value: SalaryPaymentsPerYear) => void;
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function SalaryForm({
  rawSalary,
  salaryPayments,
  issue,
  hasResult,
  onRawSalaryChange,
  onSalaryBlur,
  onSalaryPaymentsChange,
  onSubmit,
}: SalaryFormProps) {
  const supportingTextId = issue === null ? "ral-help" : "ral-error";

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="annual-gross-salary">
          La tua RAL
        </label>
        <div className={styles.inputShell}>
          <span aria-hidden="true" className={styles.currency}>
            €
          </span>
          <input
            id="annual-gross-salary"
            name="annualGrossSalary"
            type="text"
            inputMode="decimal"
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
            Da 10.000 € a 120.000 €. Solo euro interi.
          </p>
        ) : (
          <p className={styles.error} id="ral-error" role="alert">
            {INPUT_ERROR_COPY[issue]}
          </p>
        )}
      </div>

      <fieldset className={styles.paymentFieldset}>
        <legend>Mensilità contrattuali</legend>
        <div className={styles.segmented}>
          {([12, 13, 14] as const).map((count) => (
            <label key={count}>
              <input
                type="radio"
                name="salaryPayments"
                value={count}
                checked={salaryPayments === count}
                onChange={() => onSalaryPaymentsChange(count)}
              />
              <span>{count}</span>
            </label>
          ))}
        </div>
        <p>
          Cambia solo la media per rata contrattuale, non il calcolo annuale.
        </p>
      </fieldset>

      <button className={styles.submit} type="submit">
        {hasResult ? "Ricalcola" : "Calcola il netto"}
        <span aria-hidden="true">→</span>
      </button>

      <p className={styles.privacy}>
        <span aria-hidden="true">●</span> Il calcolo avviene solo nel tuo
        browser.
      </p>
    </form>
  );
}
