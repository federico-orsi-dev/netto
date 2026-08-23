// @vitest-environment jsdom

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { calculateSalary2026 } from "../domain";
import { formatMoney } from "../ui/formatters";
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
  await user.type(screen.getByLabelText("La tua RAL"), rawSalary);
  await user.click(screen.getByRole("button", { name: "Calcola il netto" }));
  return user;
}

describe("Netto product flow", () => {
  it("starts with a purposeful empty state and no zero result", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Quanto vale davvero la tua RAL?" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Inserisci la RAL")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Quanto mi rimane?" }),
    ).not.toBeInTheDocument();
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
      await user.type(screen.getByLabelText("La tua RAL"), value);
    await user.click(screen.getByRole("button", { name: "Calcola il netto" }));
    expect(screen.getByRole("alert")).toHaveTextContent(message);
    expect(screen.getByLabelText("La tua RAL")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("renders primary values from the canonical result and preserves their semantic owners", async () => {
    await calculate();
    const expected = expectedResult(35_000);
    const section = screen
      .getByRole("heading", { name: "Quanto mi rimane?" })
      .closest("section");
    if (section === null) throw new Error("Missing result section.");
    expect(section.textContent).toContain(
      formatMoney(expected.amounts.annualNet),
    );
    expect(section.textContent).toContain(
      formatMoney(expected.amounts.averageMonthlyNet),
    );
    expect(section.textContent).toContain(
      formatMoney(expected.amounts.averageSalaryPayment),
    );
    expect(document.activeElement).toBe(
      screen.getByRole("heading", { name: "Quanto mi rimane?" }),
    );
  });

  it("keeps fiscal amounts stable while changing the contractual payment presentation", async () => {
    const user = await calculate("55.240");
    const annual = formatMoney(expectedResult(55_240).amounts.annualNet);
    const section = screen
      .getByRole("heading", { name: "Quanto mi rimane?" })
      .closest("section");
    if (section === null) throw new Error("Missing result section.");
    expect(section.textContent).toContain(annual);
    await user.click(screen.getByLabelText("14"));
    const expected = expectedResult(55_240, 14);
    expect(section.textContent).toContain(annual);
    expect(section.textContent).toContain(
      formatMoney(expected.amounts.averageSalaryPayment),
    );
  });

  it("uses the same semantic component for breakdown selection and explanation", async () => {
    const user = await calculate();
    const breakdown = screen.getByRole("list", {
      name: "Voci dal lordo al netto",
    });
    const irpefButton = within(breakdown).getByRole("button", {
      name: /IRPEF netta/,
    });
    await user.click(irpefButton);
    expect(irpefButton).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("heading", { name: "IRPEF dopo le detrazioni" }),
    ).toBeInTheDocument();
    const explanation = screen.getByRole("complementary", {
      name: "IRPEF dopo le detrazioni",
    });
    expect(within(explanation).getByText("Cos'è?")).toBeVisible();
    expect(within(explanation).getByText("A chi va?")).toBeVisible();
    expect(
      within(explanation).getByText(
        "Allo Stato, come entrata fiscale nazionale.",
      ),
    ).toBeVisible();
    expect(
      within(explanation).getByText("RULE-NAT-NET-IRPEF-2026"),
    ).not.toBeVisible();
    await user.click(within(explanation).getByText("Come è stato calcolato?"));
    expect(
      within(explanation).getByText("RULE-NAT-NET-IRPEF-2026"),
    ).toBeVisible();
  });

  it("presents a negative modeled burden as a valid net benefit", async () => {
    await calculate("10.000");
    const expected = expectedResult(10_000);
    expect(screen.getByText("Beneficio netto modellato")).toBeInTheDocument();
    expect(screen.getByText("+492,64 €")).toBeInTheDocument();
    const benefitExplanation = screen.getByRole("complementary", {
      name: "Perché il risultato supera la RAL?",
    });
    expect(benefitExplanation.textContent?.replace(/\s/g, " ")).toContain(
      formatMoney(expected.amounts.totalCashBenefits).replace(/\s/g, " "),
    );
    expect(
      screen.getByText(/Il datore di lavoro non paga più della RAL/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/negative tax rate/i)).not.toBeInTheDocument();
  });

  it("exposes assumptions, methodology, sources, and the technical trace progressively", async () => {
    const user = await calculate();
    expect(
      screen.getByRole("heading", { name: "Come lo abbiamo calcolato?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Calcolo locale" }),
    ).toBeInTheDocument();
    const traceSummary = screen.getByText("Dettagli tecnici del calcolo");
    await user.click(traceSummary);
    expect(screen.getByText("it-2026-v1")).toBeVisible();
    expect(screen.getByText("RULE-INPS-2026-001")).toBeVisible();
  });

  it("clears a previous result as soon as the RAL changes", async () => {
    const user = await calculate();
    await user.type(screen.getByLabelText("La tua RAL"), "0");
    expect(
      screen.queryByRole("heading", { name: "Quanto mi rimane?" }),
    ).not.toBeInTheDocument();
  });
});
