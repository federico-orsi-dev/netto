import type { CalculationComponentId } from "../../domain";
import { formatMoney } from "../../ui/formatters";
import { createWaterfallGeometry, type BreakdownItem } from "./presentation";
import styles from "./WaterfallChart.module.css";

interface WaterfallChartProps {
  readonly items: readonly BreakdownItem[];
  readonly selectedId: CalculationComponentId;
  readonly onSelect: (id: CalculationComponentId) => void;
}

const WIDTH = 960;
const HEIGHT = 350;

export function WaterfallChart({
  items,
  selectedId,
  onSelect,
}: WaterfallChartProps) {
  const bars = createWaterfallGeometry(items, WIDTH, HEIGHT);

  return (
    <svg
      className={styles.chart}
      viewBox={`0 0 ${String(WIDTH)} ${String(HEIGHT)}`}
      aria-hidden="true"
      focusable="false"
      data-testid="waterfall-chart"
    >
      <line className={styles.baseline} x1="20" x2="940" y1="278" y2="278" />
      {bars.map((bar, index) => {
        const next = bars[index + 1];
        const sign =
          bar.direction === "add"
            ? "+"
            : bar.direction === "subtract"
              ? "−"
              : "";
        return (
          <g
            key={bar.id}
            className={`${styles.barGroup} ${styles[bar.direction]} ${
              selectedId === bar.id ? styles.selected : ""
            }`}
            onClick={() => onSelect(bar.id)}
          >
            {next === undefined ? null : (
              <line
                className={styles.connector}
                x1={bar.x + bar.width}
                x2={next.x}
                y1={bar.connectorY}
                y2={bar.connectorY}
              />
            )}
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              rx="5"
            />
            <text
              className={styles.amount}
              x={bar.x + bar.width / 2}
              y={Math.max(18, bar.y - 11)}
              textAnchor="middle"
            >
              {sign}
              {formatMoney(bar.amount)}
            </text>
            <text
              className={styles.symbol}
              x={bar.x + bar.width / 2}
              y={bar.y + Math.min(22, Math.max(15, bar.height / 2 + 5))}
              textAnchor="middle"
            >
              {sign}
            </text>
            <text
              className={styles.label}
              x={bar.x + bar.width / 2}
              y="310"
              textAnchor="middle"
            >
              {bar.shortLabel}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
