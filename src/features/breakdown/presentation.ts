import { AMOUNT_COPY } from "../../content/it";
import type {
  CalculationComponentId,
  MoneyAmount,
  SalaryCalculationResult,
} from "../../domain";

export interface BreakdownItem {
  readonly id: CalculationComponentId;
  readonly amount: MoneyAmount;
  readonly direction: "start" | "subtract" | "add" | "end";
  readonly label: string;
  readonly shortLabel: string;
}

export interface WaterfallBar extends BreakdownItem {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly connectorY: number;
}

export function getBreakdownItems(
  result: SalaryCalculationResult,
): readonly BreakdownItem[] {
  return result.breakdownOrder.map((componentId) => {
    const component = result.components[componentId];
    const copy = AMOUNT_COPY[component.amountId];
    if (component.direction === "informational") {
      throw new Error(
        "The final breakdown cannot contain informational items.",
      );
    }
    return {
      id: componentId,
      amount: result.amounts[component.amountId],
      direction: component.direction,
      label: copy.label,
      shortLabel: copy.shortLabel,
    };
  });
}

export function createWaterfallGeometry(
  items: readonly BreakdownItem[],
  width = 960,
  height = 350,
): readonly WaterfallBar[] {
  if (items.length < 2) return [];
  const horizontalPadding = 32;
  const topPadding = 42;
  const bottomPadding = 72;
  const baselineY = height - bottomPadding;
  const plotHeight = baselineY - topPadding;
  const slot = (width - horizontalPadding * 2) / items.length;
  const barWidth = Math.min(72, slot * 0.62);

  let running = items[0]?.amount.minorUnits ?? 0;
  const transitions = items.map((item) => {
    const before = running;
    if (item.direction === "start" || item.direction === "end") {
      running = item.amount.minorUnits;
    } else if (item.direction === "subtract") {
      running -= item.amount.minorUnits;
    } else {
      running += item.amount.minorUnits;
    }
    return { before, after: running };
  });

  const maximum = Math.max(
    1,
    ...transitions.flatMap(({ before, after }) => [before, after]),
  );
  const yFor = (value: number) => baselineY - (value / maximum) * plotHeight;

  return items.map((item, index) => {
    const transition = transitions[index];
    if (transition === undefined) {
      throw new Error("Missing waterfall transition.");
    }
    const x = horizontalPadding + index * slot + (slot - barWidth) / 2;
    if (item.direction === "start" || item.direction === "end") {
      const y = yFor(item.amount.minorUnits);
      return {
        ...item,
        x,
        y,
        width: barWidth,
        height: baselineY - y,
        connectorY: y,
      };
    }
    const beforeY = yFor(transition.before);
    const afterY = yFor(transition.after);
    return {
      ...item,
      x,
      y: Math.min(beforeY, afterY),
      width: barWidth,
      height: Math.max(2, Math.abs(afterY - beforeY)),
      connectorY: afterY,
    };
  });
}
