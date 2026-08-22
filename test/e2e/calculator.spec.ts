import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("completes the transparent salary journey without critical accessibility violations", async ({
  page,
}) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.hostname !== "127.0.0.1") externalRequests.push(request.url());
  });

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Quanto vale davvero la tua RAL?" }),
  ).toBeVisible();

  await page.getByLabel("La tua RAL", { exact: true }).fill("35.000");
  await page.getByRole("button", { name: "Calcola il netto" }).click();

  await expect(
    page.getByRole("heading", { name: "Quanto mi rimane?" }),
  ).toBeFocused();
  const resultSummary = page.getByRole("region", { name: "Quanto mi rimane?" });
  await expect(
    resultSummary.getByText("Netto annuale stimato", { exact: true }),
  ).toBeVisible();
  await expect(
    resultSummary.getByText("Netto mensile medio", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Dove è andato il resto?" }),
  ).toBeVisible();

  await page
    .getByRole("list", { name: "Voci dal lordo al netto" })
    .getByRole("button", { name: /IRPEF netta/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "IRPEF effettivamente modellata" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Come lo abbiamo calcolato?" }),
  ).toBeVisible();
  await page.getByText("Traccia di calcolo").click();
  await expect(page.getByText("it-2026-v1")).toBeVisible();

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
  expect(externalRequests).toEqual([]);
});

test("renders the low-RAL net-benefit state without treating it as an error", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("La tua RAL", { exact: true }).fill("10.000");
  await page.getByRole("button", { name: "Calcola il netto" }).click();
  await expect(page.getByText("Beneficio netto modellato")).toBeVisible();
  await expect(page.getByText("+492,64 €")).toBeVisible();
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("supports the core journey and explanation selection from the keyboard", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Metodo e fonti" })).toHaveCount(
    0,
  );

  const salary = page.getByLabel("La tua RAL", { exact: true });
  await salary.focus();
  await salary.fill("35.000");
  await page.keyboard.press("Enter");

  await expect(
    page.getByRole("heading", { name: "Quanto mi rimane?" }),
  ).toBeFocused();
  await expect(
    page.getByRole("link", { name: "Metodo e fonti" }),
  ).toBeVisible();

  await page.keyboard.press("Tab");
  const grossButton = page
    .getByRole("list", { name: "Voci dal lordo al netto" })
    .getByRole("button", { name: /RAL annuale/ });
  await expect(grossButton).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Contributi a tuo carico" }),
  ).toBeVisible();
});
