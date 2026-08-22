import { useState } from "react";

import type {
  CalculationComponentId,
  SalaryCalculationResult,
} from "../../domain";
import { BreakdownList } from "./BreakdownList";
import { ComponentExplanation } from "./ComponentExplanation";
import styles from "./GrossToNetSection.module.css";
import { getBreakdownItems } from "./presentation";
import { WaterfallChart } from "./WaterfallChart";

interface GrossToNetSectionProps {
  readonly result: SalaryCalculationResult;
}

export function GrossToNetSection({ result }: GrossToNetSectionProps) {
  const items = getBreakdownItems(result);
  const initialSelection = result.breakdownOrder.includes(
    "employeeContributions",
  )
    ? "employeeContributions"
    : result.breakdownOrder[0];
  const [selectedId, setSelectedId] = useState<CalculationComponentId>(
    initialSelection ?? "grossSalary",
  );

  return (
    <section aria-labelledby="breakdown-heading" className={styles.section}>
      <div className={styles.heading}>
        <div>
          <p>Dalla RAL al risultato</p>
          <h2 id="breakdown-heading">Dove è andato il resto?</h2>
        </div>
        <p className={styles.headingCopy}>
          Ogni importo viene dal calcolo verificato. Seleziona una voce per
          capire cosa rappresenta e perché si applica.
        </p>
      </div>

      <div className={styles.chartPanel}>
        <div className={styles.legend} aria-hidden="true">
          <span className={styles.legendStart}>Lordo e netto</span>
          <span className={styles.legendSubtract}>Uscite</span>
          <span className={styles.legendAdd}>Benefici</span>
        </div>
        <div className={styles.chartScroller}>
          <WaterfallChart
            items={items}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </div>

      <div className={styles.detailGrid}>
        <BreakdownList
          items={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <ComponentExplanation result={result} selectedId={selectedId} />
      </div>
    </section>
  );
}
