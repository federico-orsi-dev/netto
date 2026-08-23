import type { FormEvent, RefObject } from "react";

import type { CompensationComparison } from "../../application";
import { INPUT_ERROR_COPY } from "../../content/it";
import type {
  SalaryCalculationResult,
  SalaryPaymentsPerYear,
} from "../../domain";
import {
  formatBasisPoints,
  formatMoney,
  formatMoneyDelta,
  formatSignedMoney,
} from "../../ui/formatters";
import type { SalaryInputIssueCode } from "../calculator/input-parser";
import { ComponentLedger } from "./ComponentLedger";
import styles from "./CompensationExperience.module.css";

interface CompensationExperienceProps {
  readonly currentResult: SalaryCalculationResult;
  readonly comparison: CompensationComparison | null;
  readonly comparisonActive: boolean;
  readonly rawProposedSalary: string;
  readonly proposedIssue: SalaryInputIssueCode | null;
  readonly salaryPayments: SalaryPaymentsPerYear;
  readonly resultHeadingRef: RefObject<HTMLHeadingElement | null>;
  readonly proposedInputRef: RefObject<HTMLInputElement | null>;
  readonly comparisonButtonRef: RefObject<HTMLButtonElement | null>;
  readonly onActivateComparison: () => void;
  readonly onCloseComparison: () => void;
  readonly onRawProposedSalaryChange: (value: string) => void;
  readonly onProposedSalaryBlur: () => void;
  readonly onComparisonSubmit: (event: FormEvent<HTMLFormElement>) => void;
  readonly onSalaryPaymentsChange: (value: SalaryPaymentsPerYear) => void;
}

export function CompensationExperience({
  currentResult,
  comparison,
  comparisonActive,
  rawProposedSalary,
  proposedIssue,
  salaryPayments,
  resultHeadingRef,
  proposedInputRef,
  comparisonButtonRef,
  onActivateComparison,
  onCloseComparison,
  onRawProposedSalaryChange,
  onProposedSalaryBlur,
  onComparisonSubmit,
  onSalaryPaymentsChange,
}: CompensationExperienceProps) {
  return (
    <section className={styles.section} aria-labelledby="result-heading">
      {comparison === null ? (
        <SingleTranslation
          result={currentResult}
          resultHeadingRef={resultHeadingRef}
        />
      ) : (
        <ComparisonTranslation
          comparison={comparison}
          resultHeadingRef={resultHeadingRef}
        />
      )}

      <ComparisonEditor
        active={comparisonActive}
        hasComparison={comparison !== null}
        rawSalary={rawProposedSalary}
        issue={proposedIssue}
        proposedInputRef={proposedInputRef}
        comparisonButtonRef={comparisonButtonRef}
        onActivate={onActivateComparison}
        onClose={onCloseComparison}
        onRawSalaryChange={onRawProposedSalaryChange}
        onSalaryBlur={onProposedSalaryBlur}
        onSubmit={onComparisonSubmit}
      />

      <PaymentPresentation
        result={comparison?.proposed ?? currentResult}
        salaryPayments={salaryPayments}
        onChange={onSalaryPaymentsChange}
      />

      <ComponentLedger
        result={comparison?.proposed ?? currentResult}
        comparison={comparison}
      />
    </section>
  );
}

function SingleTranslation({
  result,
  resultHeadingRef,
}: {
  readonly result: SalaryCalculationResult;
  readonly resultHeadingRef: RefObject<HTMLHeadingElement | null>;
}) {
  const modeledBurden = result.amounts[result.summary.modeledBurdenAmountId];
  const isNetBenefit = modeledBurden.minorUnits < 0;

  return (
    <div className={styles.translationSheet} data-primary-result>
      <div className={styles.sheetHeading}>
        <p>Traduzione personale · Milano 2026</p>
        <h2 id="result-heading" ref={resultHeadingRef} tabIndex={-1}>
          La tua RAL, tradotta
        </h2>
      </div>
      <div className={styles.singleStatement}>
        <div className={styles.grossValue}>
          <span>Nel contratto</span>
          <strong>{formatMoney(result.amounts.annualGrossSalary)}</strong>
          <small>RAL lorda all'anno</small>
        </div>
        <div className={styles.passageValue}>
          <span aria-hidden="true">{isNetBenefit ? "+" : "−"}</span>
          <strong>
            {isNetBenefit
              ? formatSignedMoney(modeledBurden, "add")
              : formatMoney(modeledBurden)}
          </strong>
          <small>
            {isNetBenefit
              ? "beneficio netto modellato"
              : "contributi e imposte, al netto dei benefici"}
          </small>
        </div>
        <div className={styles.netValue}>
          <span>Disponibile nell'anno</span>
          <strong>{formatMoney(result.amounts.annualNet)}</strong>
          <p>
            <b>{formatMoney(result.amounts.averageMonthlyNet)}</b>
            <span> netti al mese, in media</span>
          </p>
        </div>
      </div>
      <p className={isNetBenefit ? styles.benefitLine : styles.burdenLine}>
        <span aria-hidden="true">{isNetBenefit ? "+" : "−"}</span>
        <span>
          {isNetBenefit ? (
            <>
              I benefici fiscali monetari superano le uscite modellate: il
              risultato include un beneficio netto di{" "}
              <strong>{formatSignedMoney(modeledBurden, "add")}</strong>. Il
              datore di lavoro non paga oltre la RAL.
            </>
          ) : (
            <>
              Contributi e imposte, al netto dei benefici inclusi, assorbono{" "}
              <strong>{formatMoney(modeledBurden)}</strong>, pari al{" "}
              {formatBasisPoints(result.summary.effectiveBurdenBasisPoints)}{" "}
              della RAL.
            </>
          )}
        </span>
      </p>
    </div>
  );
}

function ComparisonTranslation({
  comparison,
  resultHeadingRef,
}: {
  readonly comparison: CompensationComparison;
  readonly resultHeadingRef: RefObject<HTMLHeadingElement | null>;
}) {
  const ratio = comparison.modeledNetShareOfGrossChangeBasisPoints;

  return (
    <div className={styles.translationSheet} data-primary-result>
      <div className={styles.sheetHeading}>
        <p>Traduzione del cambiamento · Milano 2026</p>
        <h2 id="result-heading" ref={resultHeadingRef} tabIndex={-1}>
          {comparisonHeadline(comparison)}
        </h2>
      </div>

      <p className={styles.monthlyChange}>
        <strong>{formatMoneyDelta(comparison.averageMonthlyNetDelta)}</strong>
        <span> al mese, in media</span>
      </p>

      <dl className={styles.referenceOutcomes}>
        <div>
          <dt>Situazione attuale</dt>
          <dd>{formatMoney(comparison.current.amounts.annualNet)}</dd>
          <dd className={styles.referenceGross}>
            da {formatMoney(comparison.current.amounts.annualGrossSalary)} di
            RAL
          </dd>
        </div>
        <span className={styles.referenceArrow} aria-hidden="true">
          →
        </span>
        <div>
          <dt>RAL proposta</dt>
          <dd>{formatMoney(comparison.proposed.amounts.annualNet)}</dd>
          <dd className={styles.referenceGross}>
            da {formatMoney(comparison.proposed.amounts.annualGrossSalary)} di
            RAL
          </dd>
        </div>
      </dl>

      {ratio === null ? null : (
        <div className={styles.retainedShare}>
          <span>Della variazione lorda, si riflette nel netto</span>
          <strong>{formatBasisPoints(ratio)}</strong>
          <small>Non è un'aliquota marginale.</small>
        </div>
      )}
    </div>
  );
}

function ComparisonEditor({
  active,
  hasComparison,
  rawSalary,
  issue,
  proposedInputRef,
  comparisonButtonRef,
  onActivate,
  onClose,
  onRawSalaryChange,
  onSalaryBlur,
  onSubmit,
}: {
  readonly active: boolean;
  readonly hasComparison: boolean;
  readonly rawSalary: string;
  readonly issue: SalaryInputIssueCode | null;
  readonly proposedInputRef: RefObject<HTMLInputElement | null>;
  readonly comparisonButtonRef: RefObject<HTMLButtonElement | null>;
  readonly onActivate: () => void;
  readonly onClose: () => void;
  readonly onRawSalaryChange: (value: string) => void;
  readonly onSalaryBlur: () => void;
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  if (!active) {
    return (
      <div className={styles.comparePrompt}>
        <div>
          <strong>Stai valutando un aumento o una nuova offerta?</strong>
          <span>Scopri quanto vale davvero la differenza.</span>
        </div>
        <button ref={comparisonButtonRef} type="button" onClick={onActivate}>
          Confronta una nuova RAL <span aria-hidden="true">→</span>
        </button>
      </div>
    );
  }

  const helpId = issue === null ? "proposed-ral-help" : "proposed-ral-error";
  return (
    <form className={styles.comparisonForm} onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="proposed-annual-gross-salary">RAL proposta</label>
        <div className={styles.proposedInput}>
          <span aria-hidden="true">€</span>
          <input
            ref={proposedInputRef}
            id="proposed-annual-gross-salary"
            name="proposedAnnualGrossSalary"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="40.000"
            value={rawSalary}
            aria-describedby={helpId}
            aria-invalid={issue !== null}
            onBlur={onSalaryBlur}
            onChange={(event) => onRawSalaryChange(event.target.value)}
          />
        </div>
        {issue === null ? (
          <small id="proposed-ral-help">
            Anche una riduzione è supportata.
          </small>
        ) : (
          <small id="proposed-ral-error" role="alert">
            {INPUT_ERROR_COPY[issue]}
          </small>
        )}
      </div>
      <button className={styles.compareAction} type="submit">
        {hasComparison ? "Aggiorna il confronto" : "Traduci la differenza"}
      </button>
      <button className={styles.cancelAction} type="button" onClick={onClose}>
        Chiudi confronto
      </button>
    </form>
  );
}

function PaymentPresentation({
  result,
  salaryPayments,
  onChange,
}: {
  readonly result: SalaryCalculationResult;
  readonly salaryPayments: SalaryPaymentsPerYear;
  readonly onChange: (value: SalaryPaymentsPerYear) => void;
}) {
  return (
    <div className={styles.paymentPresentation}>
      <div>
        <span>Media per mensilità contrattuale</span>
        <strong>{formatMoney(result.amounts.averageSalaryPayment)}</strong>
        <small>
          Presentazione del netto annuale, non simulazione di tredicesima o
          quattordicesima.
        </small>
      </div>
      <fieldset>
        <legend>Mensilità</legend>
        <div>
          {([12, 13, 14] as const).map((count) => (
            <label key={count}>
              <input
                type="radio"
                name="salaryPayments"
                value={count}
                checked={salaryPayments === count}
                onChange={() => onChange(count)}
              />
              <span>{count}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function comparisonHeadline(comparison: CompensationComparison): string {
  const gross = formatMagnitude(comparison.grossRalDelta);
  const annual = formatMagnitude(comparison.annualNetDelta);
  if (comparison.direction === "unchanged") {
    return "Le due RAL producono lo stesso risultato.";
  }
  if (
    comparison.direction === "increase" &&
    comparison.netDirection === "increase"
  ) {
    return `Un aumento di ${gross} vale ${annual} netti all'anno.`;
  }
  if (
    comparison.direction === "decrease" &&
    comparison.netDirection === "decrease"
  ) {
    return `Una riduzione di ${gross} riduce il netto di ${annual} all'anno.`;
  }
  return `La RAL e il netto si muovono in direzioni diverse: ${formatMoneyDelta(comparison.annualNetDelta)} all'anno.`;
}

function formatMagnitude(amount: {
  readonly currency: "EUR";
  readonly minorUnits: number;
}) {
  return formatMoney({
    currency: "EUR",
    minorUnits: Math.abs(amount.minorUnits),
  });
}
