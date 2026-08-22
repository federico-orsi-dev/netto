import type { CalculationComponentId } from "../../domain";
import { formatSignedMoney } from "../../ui/formatters";
import type { BreakdownItem } from "./presentation";
import styles from "./GrossToNetSection.module.css";

interface BreakdownListProps {
  readonly items: readonly BreakdownItem[];
  readonly selectedId: CalculationComponentId;
  readonly onSelect: (id: CalculationComponentId) => void;
}

export function BreakdownList({
  items,
  selectedId,
  onSelect,
}: BreakdownListProps) {
  return (
    <ol className={styles.breakdownList} aria-label="Voci dal lordo al netto">
      {items.map((item) => {
        const amountDirection =
          item.direction === "add"
            ? "add"
            : item.direction === "subtract"
              ? "subtract"
              : "neutral";
        return (
          <li key={item.id} className={styles[item.direction]}>
            <button
              type="button"
              aria-pressed={selectedId === item.id}
              aria-controls="component-explanation"
              onClick={() => onSelect(item.id)}
            >
              <span className={styles.rowMarker} aria-hidden="true">
                {item.direction === "add"
                  ? "+"
                  : item.direction === "subtract"
                    ? "−"
                    : "="}
              </span>
              <span className={styles.rowLabel}>{item.label}</span>
              <strong>{formatSignedMoney(item.amount, amountDirection)}</strong>
              <span className={styles.explainHint}>Spiega</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
