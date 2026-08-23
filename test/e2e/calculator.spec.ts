import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalPageScroll(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(() => {
        const root = globalThis as unknown as {
          document: {
            documentElement: { scrollWidth: number; clientWidth: number };
          };
        };
        return (
          root.document.documentElement.scrollWidth -
          root.document.documentElement.clientWidth
        );
      }),
    )
    .toBeLessThanOrEqual(1);
}

async function calculate(page: Page, ral: string) {
  await page.getByLabel(/La tua RAL/).fill(ral);
  await page.getByRole("button", { name: "Traduci la RAL" }).click();
  await expect(
    page.getByRole("heading", { name: "Cosa diventa la tua RAL" }),
  ).toBeFocused();
}

async function compare(page: Page, proposedRal: string) {
  await page.getByRole("button", { name: /Confronta una nuova RAL/ }).click();
  await expect(page.getByLabel("RAL proposta")).toBeFocused();
  await page.getByLabel("RAL proposta").fill(proposedRal);
  await page.getByRole("button", { name: "Traduci la differenza" }).click();
  await expect(
    page.getByRole("heading", { name: "Cosa diventa questo cambiamento" }),
  ).toBeFocused();
}

test("translates one RAL and one compensation change without external requests", async ({
  page,
}) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.hostname !== "127.0.0.1") externalRequests.push(request.url());
  });

  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "La RAL è l'inizio. Netto la traduce.",
    }),
  ).toBeVisible();
  await calculate(page, "35.000");

  const singleResult = page.getByRole("region", {
    name: "Cosa diventa la tua RAL",
  });
  await expect(singleResult.getByText("25.973,45 €")).toBeVisible();
  await expect(singleResult.getByText(/^2\.?164,45\s*€$/)).toBeVisible();
  await expect(
    page.getByRole("list", { name: "Voci dal lordo al netto" }),
  ).toBeVisible();

  await compare(page, "40.000");
  const comparison = page.getByRole("region", {
    name: "Cosa diventa questo cambiamento",
  });
  await expect(comparison.getByText(/^\+5\.?000,00\s*€$/)).toBeVisible();
  await expect(comparison.getByText(/^\+1\.?934,66\s*€$/)).toBeVisible();
  await expect(
    comparison.getByText("+161,23 €", { exact: true }),
  ).toBeVisible();
  await expect(comparison.getByText("38,69%")).toBeVisible();
  await expect(
    comparison.getByText("Non è un'aliquota marginale."),
  ).toBeVisible();

  const irpefItem = page.locator('[data-component-id="netIrpef"]');
  await irpefItem.locator(":scope > details > summary").click();
  await expect(
    irpefItem.getByRole("heading", { name: "IRPEF dopo le detrazioni" }),
  ).toBeVisible();
  await irpefItem.getByText("Verifica formula, regole e fonti").click();
  await expect(irpefItem.getByText("RULE-NAT-NET-IRPEF-2026")).toBeVisible();

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
  expect(externalRequests).toEqual([]);
});

test("represents low-RAL benefits without implying employer overpayment", async ({
  page,
}) => {
  await page.goto("/");
  await calculate(page, "10.000");
  await expect(page.getByText(/beneficio netto di/)).toContainText("+492,64 €");
  await expect(
    page.getByText(/Il datore di lavoro non paga oltre la RAL/),
  ).toBeVisible();
  await expect(
    page.locator('[data-component-id="cuneoCashSum"] > details > summary'),
  ).toBeVisible();
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("keeps comparison semantics valid for a reduction and equal values", async ({
  page,
}) => {
  await page.goto("/");
  await calculate(page, "40.000");
  await compare(page, "35.000");
  await expect(page.getByText(/^−5\.?000,00\s*€$/)).toBeVisible();
  await expect(page.getByText(/^−1\.?934,66\s*€$/)).toBeVisible();

  await page.getByLabel("RAL proposta").fill("40.000");
  await page.getByRole("button", { name: "Traduci la differenza" }).click();
  await expect(page.getByText(/Le due RAL coincidono/)).toBeVisible();
  await expect(page.getByText("Non è un'aliquota marginale.")).toHaveCount(0);
});

test("maintains deliberate keyboard focus through calculate, compare, and close", async ({
  page,
}) => {
  await page.goto("/");
  const salary = page.getByLabel(/La tua RAL/);
  await salary.focus();
  await salary.fill("35.000");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Cosa diventa la tua RAL" }),
  ).toBeFocused();

  const comparisonButton = page.getByRole("button", {
    name: /Confronta una nuova RAL/,
  });
  await comparisonButton.click();
  await expect(page.getByLabel("RAL proposta")).toBeFocused();
  await page.getByLabel("RAL proposta").fill("40.000");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Cosa diventa questo cambiamento" }),
  ).toBeFocused();

  await page.getByRole("button", { name: "Chiudi confronto" }).click();
  await expect(
    page.getByRole("button", { name: /Confronta una nuova RAL/ }),
  ).toBeFocused();
});

test("validates the proposed RAL without losing the current translation", async ({
  page,
}) => {
  await page.goto("/");
  await calculate(page, "35.000");
  await page.getByRole("button", { name: /Confronta una nuova RAL/ }).click();
  await page.getByLabel("RAL proposta").fill("200.000");
  await page.getByRole("button", { name: "Traduci la differenza" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "La stima supporta RAL fino a 120.000 €.",
  );
  await expect(
    page.getByRole("heading", { name: "Cosa diventa la tua RAL" }),
  ).toBeVisible();
});

test("reflows the full comparison at 320 CSS pixels", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  await expectNoHorizontalPageScroll(page);
  await calculate(page, "35.000");
  await compare(page, "120.000");
  await expectNoHorizontalPageScroll(page);

  const heading = page.getByRole("heading", {
    name: "Cosa diventa questo cambiamento",
  });
  await expect
    .poll(() =>
      heading.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const viewport = globalThis as unknown as { innerHeight: number };
        return bounds.top >= 0 && bounds.top < viewport.innerHeight;
      }),
    )
    .toBe(true);

  const firstChange = page
    .getByRole("list", { name: "Voci cambiate nel confronto" })
    .locator(":scope > li")
    .first();
  await firstChange.locator(":scope > details > summary").click();
  await expect(firstChange.getByRole("heading")).toBeVisible();

  await page.getByText("Ipotesi complete").click();
  await page.getByText("Cosa non include").click();
  await page.getByText("Fonti ufficiali").click();
  await expectNoHorizontalPageScroll(page);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});

test("remains complete for reduced-motion users", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await calculate(page, "35.000");
  await compare(page, "40.000");
  await expect(page.getByText("38,69%")).toBeVisible();
  await expect(
    page.getByRole("list", { name: "Voci cambiate nel confronto" }),
  ).toBeVisible();
});
