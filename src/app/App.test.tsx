// @vitest-environment jsdom

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { compareCompensationResults } from "../application";
import { calculateSalary2026 } from "../domain";
import { formatMoney, formatMoneyDelta } from "../ui/formatters";
import { App } from "./App";

function expectedResult(ral: number, salaryPaymentsPerYear = 13) {
  const outcome = calculateSalary2026({
    annualGrossSalaryEuro: ral,
    salaryPaymentsPerYear: salaryPaymentsPerYear as 12 | 13 | 14,
  });
  if (!outcome.ok) throw new Error("Expected a supported UI fixture.");
  return outcome.result;
}

async function calculate(rawSalary = "35.000") {
  const user = userEvent.setup();
  render(<App />);
  await user.type(screen.getByLabelText(/La tua RAL/), rawSalary);
  await user.click(screen.getByRole("button", { name: "Traduci la RAL" }));
  return user;
}

async function compare(user: ReturnType<typeof userEvent.setup>, ral: string) {
  await user.click(
    screen.getByRole("button", { name: /Confronta una nuova RAL/ }),
  );
  const proposed = screen.getByLabelText("RAL proposta");
  await user.type(proposed, ral);
  await user.click(
    screen.getByRole("button", { name: "Traduci la differenza" }),
  );
}

function normalizedText(value: string | null | undefined): string {
  return value?.replace(/\s/g, " ") ?? "";
}

function expectPageToContain(value: string) {
  expect(normalizedText(document.body.textContent)).toContain(
    normalizedText(value),
  );
}

describe("Netto compensation translator", () => {
  it("starts with one intentional salary question and no empty result", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        name: "La RAL è l'inizio. Netto la traduce.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Un numero chiaro subito/)).toBeInTheDocument();
    expect(
      screen.queryByText("Cosa diventa la tua RAL"),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("RAL proposta")).not.toBeInTheDocument();
  });

  it.each([
    ["", "Inserisci la tua RAL per continuare."],
    ["9.999", "La stima parte da una RAL di 10.000 €."],
    ["120.001", "La stima supporta RAL fino a 120.000 €."],
    [
      "30.000,50",
      "Per questa stima la RAL deve essere inserita in euro interi.",
    ],
  ] as const)("shows accessible validation for %s", async (value, message) => {
    const user = userEvent.setup();
    render(<App />);
    if (value !== "")
      await user.type(screen.getByLabelText(/La tua RAL/), value);
    await user.click(screen.getByRole("button", { name: "Traduci la RAL" }));
    expect(screen.getByRole("alert")).toHaveTextContent(message);
    expect(screen.getByLabelText(/La tua RAL/)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("renders the single translation from the canonical calculation result", async () => {
    await calculate();
    const expected = expectedResult(35_000);
    const resultHeading = screen.getByRole("heading", {
      name: "Cosa diventa la tua RAL",
    });
    const section = resultHeading.closest("section");
    if (section === null) throw new Error("Missing result section.");

    expect(section.textContent).toContain(
      formatMoney(expected.amounts.annualNet),
    );
    expect(section.textContent).toContain(
      formatMoney(expected.amounts.averageMonthlyNet),
    );
    expect(resultHeading).toHaveFocus();
  });

  it("keeps instalments as a post-calculation presentation control", async () => {
    const user = await calculate("55.240");
    const annual = formatMoney(expectedResult(55_240).amounts.annualNet);
    expectPageToContain(annual);

    await user.click(screen.getByLabelText("14"));
    const expected = expectedResult(55_240, 14);
    expectPageToContain(annual);
    expectPageToContain(formatMoney(expected.amounts.averageSalaryPayment));
  });

  it("keeps explanation attached to the canonical component identity", async () => {
    const user = await calculate();
    const ledger = screen.getByRole("list", {
      name: "Voci dal lordo al netto",
    });
    const item = ledger.querySelector<HTMLElement>(
      '[data-component-id="netIrpef"]',
    );
    const summary = item?.querySelector<HTMLElement>(
      ":scope > details > summary",
    );
    if (item === null || summary === null || summary === undefined) {
      throw new Error("Missing IRPEF ledger item.");
    }
    await user.click(summary);
    expect(item).toHaveAttribute("data-component-id", "netIrpef");
    expect(
      within(ledger).getByRole("heading", { name: "IRPEF dopo le detrazioni" }),
    ).toBeVisible();

    await user.click(
      within(item).getByText("Verifica formula, regole e fonti"),
    );
    expect(within(item).getByText("RULE-NAT-NET-IRPEF-2026")).toBeVisible();
  });

  it("presents low-RAL cash benefits as a valid net benefit", async () => {
    await calculate("10.000");
    const expected = expectedResult(10_000);
    expect(screen.getByText(/beneficio netto di/)).toHaveTextContent(
      "+492,64 €",
    );
    expect(
      screen.getByText(/Il datore di lavoro non paga oltre la RAL/),
    ).toBeVisible();
    expect(
      screen.getAllByText("Beneficio fiscale non imponibile")[0],
    ).toBeVisible();
    expect(document.body.textContent).toContain(
      formatMoney(expected.amounts.totalCashBenefits),
    );
  });

  it("compares an increase through one canonical comparison result", async () => {
    const user = await calculate("35.000");
    await user.click(
      screen.getByRole("button", { name: /Confronta una nuova RAL/ }),
    );
    expect(screen.getByLabelText("RAL proposta")).toHaveFocus();
    await user.type(screen.getByLabelText("RAL proposta"), "40.000");
    await user.click(
      screen.getByRole("button", { name: "Traduci la differenza" }),
    );

    const expected = compareCompensationResults(
      expectedResult(35_000),
      expectedResult(40_000),
    );
    expect(
      screen.getByRole("heading", { name: "Cosa diventa questo cambiamento" }),
    ).toHaveFocus();
    expectPageToContain(formatMoneyDelta(expected.grossRalDelta));
    expectPageToContain(formatMoneyDelta(expected.annualNetDelta));
    expectPageToContain(formatMoneyDelta(expected.averageMonthlyNetDelta));
    expect(screen.getByText("Non è un'aliquota marginale.")).toBeVisible();
  });

  it("keeps signed comparison semantics correct for reductions and equal RAL", async () => {
    const user = await calculate("40.000");
    await compare(user, "35.000");
    const decrease = compareCompensationResults(
      expectedResult(40_000),
      expectedResult(35_000),
    );
    expectPageToContain(formatMoneyDelta(decrease.grossRalDelta));
    expectPageToContain(formatMoneyDelta(decrease.annualNetDelta));

    const proposed = screen.getByLabelText("RAL proposta");
    await user.clear(proposed);
    await user.type(proposed, "40.000");
    await user.click(
      screen.getByRole("button", { name: "Traduci la differenza" }),
    );
    expect(screen.getByText(/Le due RAL coincidono/)).toBeVisible();
    expect(
      screen.queryByText("Non è un'aliquota marginale."),
    ).not.toBeInTheDocument();
  });

  it("shows changed fiscal components and relevant rule applicability", async () => {
    const user = await calculate("20.000");
    await compare(user, "25.000");
    const changedLedger = screen.getByRole("list", {
      name: "Voci cambiate nel confronto",
    });
    const benefitItem = changedLedger.querySelector<HTMLElement>(
      '[data-component-id="cuneoCashSum"]',
    );
    expect(benefitItem).not.toBeNull();
    expect(
      benefitItem?.querySelector(":scope > details > summary"),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Cambia l'applicabilità di una regola",
      }),
    ).toBeVisible();
    const ruleChanges = screen.getByRole("complementary", {
      name: "Cambia l'applicabilità di una regola",
    });
    expect(
      within(ruleChanges).getByText("RULE-NAT-CUNEO-SUM-2026"),
    ).toBeVisible();
  });

  it("validates the proposed RAL without discarding the current result", async () => {
    const user = await calculate();
    await user.click(
      screen.getByRole("button", { name: /Confronta una nuova RAL/ }),
    );
    await user.type(screen.getByLabelText("RAL proposta"), "200.000");
    await user.click(
      screen.getByRole("button", { name: "Traduci la differenza" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "La stima supporta RAL fino a 120.000 €.",
    );
    expect(screen.getByText("Cosa diventa la tua RAL")).toBeVisible();
  });

  it("returns to the single translation and restores focus", async () => {
    const user = await calculate();
    await compare(user, "40.000");
    await user.click(screen.getByRole("button", { name: "Chiudi confronto" }));
    expect(screen.getByText("Cosa diventa la tua RAL")).toBeVisible();
    expect(
      screen.getByRole("button", { name: /Confronta una nuova RAL/ }),
    ).toHaveFocus();
  });

  it("keeps trust concise and expert evidence progressively disclosed", async () => {
    const user = await calculate();
    expect(
      screen.getByRole("heading", { name: "Il perimetro di questa stima" }),
    ).toBeVisible();
    expect(
      screen.getByText(/Netto modella un dipendente privato/),
    ).toBeVisible();
    expect(
      screen.getByText(
        /La RAL inserita rappresenta retribuzione ordinaria annuale/,
      ),
    ).not.toBeVisible();
    await user.click(screen.getByText("Dettagli tecnici del calcolo"));
    expect(screen.getByText("it-2026-v1")).toBeVisible();
    expect(screen.getByText("RULE-INPS-2026-001")).toBeVisible();
  });

  it("clears stale results as soon as the current RAL changes", async () => {
    const user = await calculate();
    await user.type(screen.getByLabelText(/La tua RAL/), "0");
    expect(
      screen.queryByText("Cosa diventa la tua RAL"),
    ).not.toBeInTheDocument();
  });
});
