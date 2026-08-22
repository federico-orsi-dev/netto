---
run_id: RUN-2026-08-22-006
date: 2026-08-22
tool: codex
role: fiscal-researcher
task: fiscal-research-national-tax
status: completed
owner: codex
reviewer: claude
related_rules:
  - RULE-NAT-BASE-2026
  - RULE-NAT-GROSS-IRPEF-2026
  - RULE-NAT-EMPLOYMENT-DEDUCTION-2026
  - RULE-NAT-NET-IRPEF-2026
  - RULE-NAT-CUNEO-SUM-2026
  - RULE-NAT-CUNEO-DEDUCTION-2026
  - RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026
  - RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026
  - RULE-NAT-SPECIAL-PAY-2026
  - RULE-NAT-PERSONAL-RELIEFS-2026
related_adrs:
  - ADR-0002
  - ADR-0003
  - ADR-0004
commit: null
---

# National employment-tax research for 2026

## Objective

Establish candidate national-tax rules for the approved 2026 scenario: one full-year, permanent, non-executive private-sector employee; industrial employer with more than 15 employees in CIGS scope; Milan/Lombardy residence; only ordinary fixed cash RAL; no dependants, other income, personal deductions, special incentives, bonuses, benefits, pension-fund deductions, or exceptional circumstances. The supported RAL envelope is EUR 10,000 through EUR 120,000, in whole euros.

The employer/CIGS refinement does not alter the national income-tax formulas below. It matters upstream when the INPS stream determines mandatory employee contributions, which this stream treats as an input.

## Acceptance criteria

- [x] Reopened authoritative originals for the 2026 IRPEF rate change and consolidated national rules.
- [x] Covered taxable base, gross IRPEF, employment deduction, net-tax order, fiscal-wedge measures, and treatment integrativo.
- [x] Distinguished amounts paid in addition to RAL from deductions against tax.
- [x] Explicitly excluded 2026 substitute-tax regimes that require payment-type or prior-year facts absent from the scenario.
- [x] Recorded complete source and rule schemas with no `verified` status.
- [x] Proposed EUR 1 boundary fixtures and representative values.
- [x] Separated source evidence from engineering interpretation and identified the remaining rounding review question.

## Canonical context consulted

- `AGENTS.md`
- `PROJECT_STATE.md`
- `docs/domain/fiscal-rules-2026.md`
- `docs/domain/source-register-2026.md`
- `docs/ai-engineering/contracts/fiscal-research-and-verification.md`
- `docs/ai-engineering/contracts/run-record.md`

## Proposed source records

### SRC-NAT-TUIR-ART3-2026

- **Issuer:** Italian Republic; official text served by the Ministry of Economy and Finance tax-documentation portal.
- **Title:** Decreto del Presidente della Repubblica 22 dicembre 1986, n. 917 — Testo unico delle imposte sui redditi, article 3, “Base imponibile”.
- **Official URL:** https://def.finanze.it/DocTribFrontend/getAttoNormativoDetail.do?ACTION=getArticolo&codiceOrdinamento=0000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&id=%7B31D694E8-4398-4030-873B-FEAF5A6647F9%7D
- **Document type:** Consolidated primary legislation.
- **Publication date:** 1986-12-31 (G.U. n. 302, S.O. n. 126).
- **Effective date:** Current consolidated provision applicable in 2026.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Access date:** 2026-08-22.
- **Precise location:** Article 3, paragraph 1; paragraph 3(a) is also relevant to excluded substitute-tax income.
- **Supported claim:** Resident individuals are taxed on total income, net of deductible charges under article 10; income subject to substitute taxation does not form ordinary total income.
- **Authority notes:** Official consolidated tax-law text; primary authority.
- **Supersession/conflict notes:** Read with articles 11, 13, and 51 and with L. 199/2025 for the 2026 rate amendment. No conflict identified.

### SRC-NAT-TUIR-ART11-2026

- **Issuer:** Italian Republic; Ministry of Economy and Finance tax-documentation portal.
- **Title:** DPR 917/1986 — article 11, “Determinazione dell'imposta”.
- **Official URL:** https://def.finanze.it/DocTribFrontend/executePrintArticolo.do?articolo=Articolo+11&codiceOrdinamento=0000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&id=%7B31D694E8-4398-4030-873B-FEAF5A6647F9%7D
- **Document type:** Consolidated primary legislation.
- **Publication date:** 1986-12-31.
- **Effective date:** Article 11(1)(b) amended from 2026-01-01 by L. 199/2025, article 1(3).
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Access date:** 2026-08-22.
- **Precise location:** Article 11, paragraphs 1, 3, and 4.
- **Supported claim:** 2026 gross IRPEF uses progressive brackets 23%, 33%, and 43%; tax deductions reduce gross tax only to the amount of gross tax; tax credits are then applied to net tax.
- **Authority notes:** Official consolidated TUIR text; primary authority.
- **Supersession/conflict notes:** The portal notes that L. 199/2025 replaced 35% with 33%. Older 2025 material showing 35% is superseded for 2026.

### SRC-NAT-TUIR-ART13-2026

- **Issuer:** Italian Republic; Ministry of Economy and Finance tax-documentation portal.
- **Title:** DPR 917/1986 — article 13, “Altre detrazioni”.
- **Official URL:** https://def.finanze.it/DocTribFrontend/getAttoNormativoDetail.do?ACTION=getArticolo&codiceOrdinamento=0000000000000130000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&id=%7B31D694E8-4398-4030-873B-FEAF5A6647F9%7D
- **Document type:** Consolidated primary legislation.
- **Publication date:** 1986-12-31.
- **Effective date:** Current employee-deduction text effective from 2025-01-01; still applicable in 2026.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Access date:** 2026-08-22.
- **Precise location:** Article 13, paragraphs 1(a–c), 1.1, 6, and 6-bis.
- **Supported claim:** Employee-income deduction amounts/formulas, the EUR 65 increase for total income above EUR 25,000 through EUR 35,000, four-decimal treatment of formula ratios, and use of total income net of principal-residence income.
- **Authority notes:** Official consolidated TUIR text; primary authority.
- **Supersession/conflict notes:** The EUR 1,955 first-band amount supersedes EUR 1,880 from 2025 onward. No 2026 amendment to article 13 was found.

### SRC-NAT-TUIR-ART51-2026

- **Issuer:** Italian Republic; Ministry of Economy and Finance tax-documentation portal.
- **Title:** DPR 917/1986 — article 51, “Determinazione del reddito di lavoro dipendente”.
- **Official URL:** https://def.finanze.it/DocTribFrontend/getAttoNormativoDetail.do?ACTION=getArticolo&articolo=Articolo+51&codiceOrdinamento=0000000000000510000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&id=%7B31D694E8-4398-4030-873B-FEAF5A6647F9%7D
- **Document type:** Consolidated primary legislation.
- **Publication date:** 1986-12-31.
- **Effective date:** Current consolidated article displayed as effective from 2026-05-23; paragraph 2(a) is applicable throughout the modeled year.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Access date:** 2026-08-22.
- **Precise location:** Article 51, paragraphs 1 and 2(a).
- **Supported claim:** Employment income generally includes sums and values received because of employment, while mandatory social-security and welfare contributions paid under law by employer or employee do not form employment income.
- **Authority notes:** Official consolidated TUIR text; primary authority.
- **Supersession/conflict notes:** The 2026 amendments visible in article 51 concern other benefits; no conflict with paragraph 2(a) was identified.

### SRC-NAT-L207-ART1-2-9

- **Issuer:** Italian Republic; Normattiva/IPZS.
- **Title:** Legge 30 dicembre 2024, n. 207 — Bilancio di previsione dello Stato per il 2025 e bilancio pluriennale 2025–2027.
- **Official URL:** https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=24G00229&atto.dataPubblicazioneGazzetta=2024-12-31&bloccoAggiornamentoBreadCrumb=true&dataVigenza=23%2F01%2F2025&generaTabId=true&qId=&tabID=&tipoDettaglio=singolavigenza&title=lbl.dettaglioAtto
- **Document type:** Primary legislation, official consolidated legal database.
- **Publication date:** 2024-12-31.
- **Effective date:** 2025-01-01; paragraphs 2–9 are structural rather than limited to 2025.
- **Fiscal year:** 2026 (continuing provisions).
- **Jurisdiction:** Italy.
- **Access date:** 2026-08-22.
- **Precise location:** Article 1, paragraphs 2–9, especially 4–6 and 9.
- **Supported claim:** Structural three-band IRPEF framework later amended for 2026; EUR 1,955 employee deduction; low-income non-taxable fiscal-wedge sum; additional employee deduction from EUR 20,000 to EUR 40,000; income-definition adjustments and automatic substitute recognition.
- **Authority notes:** Primary legislation on the official legal database.
- **Supersession/conflict notes:** Paragraph 2's 35% second rate is superseded from 2026 by L. 199/2025 article 1(3). Paragraphs 4–9 remain applicable.

### SRC-NAT-DL3-ART1-2026

- **Issuer:** Italian Republic; Ministry of Economy and Finance tax-documentation portal.
- **Title:** Decreto-legge 5 febbraio 2020, n. 3 — article 1, “Trattamento integrativo dei redditi di lavoro dipendente e assimilati”.
- **Official URL:** https://def.finanze.it/DocTribFrontend/getAttoNormativoDetail.do?ACTION=getArticolo&codiceOrdinamento=0000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&id=%7BE6D98FB9-4121-4201-9966-37A2987520BA%7D
- **Document type:** Consolidated primary legislation, converted by L. 21/2020.
- **Publication date:** 2020-02-05.
- **Effective date:** Current article text effective from 2025-01-01 after L. 207/2024.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Access date:** 2026-08-22.
- **Precise location:** Article 1, paragraphs 1–4.
- **Supported claim:** EUR 1,200 full-year treatment integrativo, capacity condition adjusted by EUR 75, normal EUR 15,000 total-income limit, conditional EUR 15,000–28,000 branch, period-of-work proration, and automatic recognition/conguaglio.
- **Authority notes:** Official consolidated legislation; primary authority.
- **Supersession/conflict notes:** Older versions showing a EUR 28,000 ordinary ceiling are superseded. Current first branch ceiling is EUR 15,000.

### SRC-NAT-ADE-CIR4E-2025

- **Issuer:** Agenzia delle Entrate, Direzione Centrale Coordinamento Normativo.
- **Title:** Circolare n. 4/E del 16 maggio 2025 — Novità in materia di IRPEF e tassazione dei redditi di lavoro dipendente.
- **Official URL:** https://def.finanze.it/DocTribFrontend/getContent.do?id=%7B7CC565F8-09C0-4BC6-B725-9E556F578021%7D
- **Document type:** Official administrative circular/guidance.
- **Publication date:** 2025-05-16.
- **Effective date:** Guidance for structural provisions effective from 2025 and continuing in 2026.
- **Fiscal year:** 2026 (continuing rules; illustrations use 2025).
- **Jurisdiction:** Italy.
- **Access date:** 2026-08-22.
- **Precise location:** Sections 1.1 (pp. 3–8) and 1.2 (pp. 8–12), especially PDF lines 219–252 and 258–405 in the retrieved text.
- **Supported claim:** Interpretation of employee deductions, treatment-integrativo capacity test, annualization for the fiscal-wedge percentage, low-income sum rates, additional-deduction phase-out, and relevant income-definition adjustments.
- **Authority notes:** Competent tax authority guidance; interpretive, subordinate to legislation.
- **Supersession/conflict notes:** The circular's 35% second IRPEF rate describes 2025 and is superseded for 2026 by L. 199/2025. Its guidance on unchanged provisions remains useful.

### SRC-NAT-L199-ART1-2026

- **Issuer:** Italian Republic; Normattiva/IPZS.
- **Title:** Legge 30 dicembre 2025, n. 199 — Bilancio di previsione dello Stato per il 2026 e bilancio pluriennale 2026–2028.
- **Official URL:** https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=25G00212&atto.dataPubblicazioneGazzetta=2025-12-30&bloccoAggiornamentoBreadCrumb=true&dataVigenza=11%2F04%2F2026&generaTabId=true&qId=&tabID=&tipoDettaglio=singolavigenza&title=lbl.dettaglioAtto
- **Document type:** Primary legislation, official consolidated legal database.
- **Publication date:** 2025-12-30 (G.U. n. 301, S.O. n. 42).
- **Effective date:** 2026-01-01 for the provisions used here.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Access date:** 2026-08-22.
- **Precise location:** Article 1, paragraphs 3–11 and 18–20.
- **Supported claim:** Second IRPEF rate reduced from 35% to 33%; special substitute taxes for qualifying contractual increases, productivity awards, and night/festive/shift pay; tourism-sector special treatment.
- **Authority notes:** Primary legislation and the controlling 2026 amendment.
- **Supersession/conflict notes:** Paragraph 3 supersedes the 35% second rate in L. 207/2024/TUIR for 2026. Special-pay provisions do not replace ordinary taxation of undifferentiated RAL.

### SRC-NAT-ADE-CIR2E-2026

- **Issuer:** Agenzia delle Entrate, Direzione Centrale Coordinamento Normativo.
- **Title:** Circolare n. 2/E del 24 febbraio 2026 — Tassazione degli incrementi retributivi dei rinnovi contrattuali e delle maggiorazioni/indennità per lavoro notturno, festivo, riposo o turni.
- **Official URL:** https://def.finanze.it/DocTribFrontend/getContent.do?id=%7B304E9E9C-0500-C86A-8E6A-1F390593398F%7D
- **Document type:** Official administrative circular/guidance.
- **Publication date:** 2026-02-24.
- **Effective date:** 2026-01-01 for the discussed measures.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Access date:** 2026-08-22.
- **Precise location:** Section 1, pp. 3–7; section 2, pp. 8–13.
- **Supported claim:** Detailed applicability and interaction of the 5% contract-increase and 15% night/festive/shift substitute taxes, including prior-year-income requirements and exclusion from ordinary total income.
- **Authority notes:** Competent tax authority guidance; used to establish why these measures cannot be derived from RAL alone.
- **Supersession/conflict notes:** Read with Agenzia circular 3/E of 24 June 2026 for later clarifications if a future scope includes these regimes. They are excluded here, so those details are not calculation dependencies.

## Proposed rule records

### RULE-NAT-BASE-2026

- **Name:** Ordinary employment income and national IRPEF taxable base.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Status:** `candidate`.
- **Calculation stage/order:** After mandatory employee social-security contributions; before gross IRPEF.
- **Applicability:** Approved full-year resident employee with only ordinary cash employment remuneration.
- **Eligibility:** Employment income under TUIR article 49; no substitute-taxed or exempt remuneration in the modeled RAL.
- **Exclusions:** Employer contributions, TFR, benefits, bonuses, substitute-taxed pay, other income, and personal article 10 deductions are outside the scenario.
- **Required inputs:** RAL; annual mandatory employee contributions from the independently researched INPS rule.
- **Calculation base:** Ordinary employment income and, under the scenario, total income and IRPEF taxable income are the same amount.
- **Formula:** `employmentIncome = RAL - mandatoryEmployeeContributions`; `nationalIrpefTaxableIncome = employmentIncome` under the no-other-income/no-other-deduction assumptions.
- **Rates:** Not applicable.
- **Brackets:** Not applicable.
- **Thresholds:** Supported RAL EUR 10,000–120,000; no national base threshold introduced by this rule.
- **Rounding behavior:** Preserve exact decimal results from the contribution stage; this rule adds no statutory rounding.
- **Interactions/order:** Mandatory employee contributions are excluded from employment income by article 51(2)(a), not deducted later as an IRPEF tax credit. The resulting income feeds gross IRPEF, employment deductions, fiscal-wedge eligibility, treatment integrativo, and local-tax streams.
- **Edge cases:** If RAL includes any exempt or substitute-taxed component, this identity is invalid; the current input does not decompose such amounts.
- **Source IDs:** SRC-NAT-TUIR-ART3-2026; SRC-NAT-TUIR-ART51-2026.
- **Evidence summary:** Article 51 broadly defines employment income and excludes mandatory statutory contributions; article 3 defines the resident's taxable total income net of applicable deductions.
- **Engineering interpretation:** In the deliberately narrow scenario, RAL less mandatory employee contributions is the only ordinary income and therefore the national taxable base.
- **Assumptions:** One full-year job; all RAL is ordinary taxable cash compensation; no other article 10 deduction.
- **Unresolved questions:** None within the approved scope; any future special-pay component requires a richer input contract.
- **Expected trace representation:** RAL, employee-contribution amount/source, resulting employment income, and statement that no other income/deduction is modeled.
- **Required tests:** Identity from contribution output to taxable base; non-negative base; explicit rejection or exclusion path for undecomposed special pay.

### RULE-NAT-GROSS-IRPEF-2026

- **Name:** 2026 progressive gross IRPEF.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Status:** `candidate`.
- **Calculation stage/order:** After RULE-NAT-BASE-2026; before deductions and credits.
- **Applicability:** Ordinary 2026 IRPEF taxable income in the supported envelope.
- **Eligibility:** Resident individual subject to ordinary IRPEF.
- **Exclusions:** Substitute-taxed components are not part of this base.
- **Required inputs:** `nationalIrpefTaxableIncome`.
- **Calculation base:** Total taxable income after allowable deductions, equal to ordinary employment income in this scenario.
- **Formula:** `0.23 * min(B, 28000) + 0.33 * min(max(B - 28000, 0), 22000) + 0.43 * max(B - 50000, 0)`.
- **Rates:** 23%; 33%; 43%.
- **Brackets:** Up to and including EUR 28,000 at 23%; over EUR 28,000 through EUR 50,000 at 33%; excess over EUR 50,000 at 43%.
- **Thresholds:** EUR 28,000 and EUR 50,000 taxable income.
- **Rounding behavior:** No intermediate rounding identified in article 11; use exact decimal arithmetic. Final estimator presentation is addressed under rounding findings below.
- **Interactions/order:** Gross tax is the capacity ceiling for deductions. The 33% rate is the specific 2026 change.
- **Edge cases:** At exactly EUR 28,000 only the first rate applies; at exactly EUR 50,000 the first two rates apply.
- **Source IDs:** SRC-NAT-TUIR-ART11-2026; SRC-NAT-L199-ART1-2026.
- **Evidence summary:** L. 199/2025 article 1(3) changes TUIR article 11(1)(b) from 35% to 33% effective 2026.
- **Engineering interpretation:** Apply marginally by tranche, never a single rate to the entire base.
- **Assumptions:** Base supplied by RULE-NAT-BASE-2026.
- **Unresolved questions:** None material.
- **Expected trace representation:** One trace line per occupied bracket with lower/upper bounds, taxable tranche, rate, tax, and source.
- **Required tests:** EUR 1 boundaries around 28,000 and 50,000; monotonicity; continuity; representative multi-bracket values.

### RULE-NAT-EMPLOYMENT-DEDUCTION-2026

- **Name:** Detrazione per redditi di lavoro dipendente.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Status:** `candidate`.
- **Calculation stage/order:** After gross IRPEF; before net IRPEF.
- **Applicability:** Full-year ordinary employee income under TUIR articles 49/13, excluding pensions.
- **Eligibility:** At least one qualifying employment-income item; total income not above EUR 50,000.
- **Exclusions:** Pension deduction, fixed-term minimum EUR 1,380, and partial-year proration do not apply. The permanent-employment minimum EUR 690 is immaterial for 365 days but remains part of the legal rule.
- **Required inputs:** Total income `R`; qualifying work days (fixed at 365 by scenario); permanent-contract flag (fixed true).
- **Calculation base:** Total income net of principal-residence income; here equal to ordinary employment income.
- **Formula:** For `R <= 15000`, EUR 1,955. For `15000 < R <= 28000`, `1910 + 1190 * trunc4((28000 - R) / 13000)`. For `28000 < R <= 50000`, `1910 * trunc4((50000 - R) / 22000)`. For `R > 50000`, zero. Add EUR 65 when `25000 < R <= 35000`. Full-year factor is 365/365.
- **Rates:** Not applicable; formula amounts and ratios above.
- **Brackets:** `<=15000`; `(15000,28000]`; `(28000,50000]`; `>50000`.
- **Thresholds:** EUR 15,000; EUR 25,000; EUR 28,000; EUR 35,000; EUR 50,000.
- **Rounding behavior:** TUIR article 13(6) requires a positive ratio result to be taken to its first four decimal digits; interpret this as truncation toward zero before multiplication. The EUR 65 increase is not prorated; the whole rule is full-year here.
- **Interactions/order:** Applied against gross IRPEF. It also participates in the treatment-integrativo capacity tests.
- **Edge cases:** The formula jumps upward immediately above EUR 15,000; the EUR 65 addition starts only above EUR 25,000 and ends after EUR 35,000; four-decimal truncation can make the calculated deduction zero just below EUR 50,000.
- **Source IDs:** SRC-NAT-TUIR-ART13-2026; SRC-NAT-L207-ART1-2-9; SRC-NAT-ADE-CIR4E-2025.
- **Evidence summary:** Consolidated article 13 supplies all formulas and ratio handling; Agenzia guidance confirms the EUR 65 amount is not work-day prorated.
- **Engineering interpretation:** Truncate only the statutory ratio to four decimals, retain exact decimal multiplication, then apply any explicitly approved monetary-rounding policy at the result boundary.
- **Assumptions:** 365 qualifying work days; permanent employment; total income contains no other component.
- **Unresolved questions:** Independent verifier should confirm that `trunc4` rather than mathematical rounding is the intended implementation of “prime quattro cifre decimali”.
- **Expected trace representation:** Selected income band, untruncated ratio, four-decimal ratio, base deduction, EUR 65 adjustment if applicable, full-year factor, final deduction, source.
- **Required tests:** EUR 1 fixtures around every threshold; explicit four-decimal examples; no deduction above EUR 50,000; deduction never applied beyond gross tax in the net-tax stage.

### RULE-NAT-NET-IRPEF-2026

- **Name:** Net ordinary IRPEF and deduction-cap order.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Status:** `candidate`.
- **Calculation stage/order:** After all modeled tax deductions; before non-taxable cash sums are added to take-home pay.
- **Applicability:** Ordinary IRPEF under the canonical scenario.
- **Eligibility:** Not applicable.
- **Exclusions:** No personal/family deductions or foreign-tax credits are modeled.
- **Required inputs:** Gross IRPEF; employment deduction; fiscal-wedge additional deduction.
- **Calculation base:** Gross IRPEF.
- **Formula:** `netIrpef = max(0, grossIrpef - employmentDeduction - cuneoAdditionalDeduction)`.
- **Rates:** Not applicable.
- **Brackets:** Not applicable.
- **Thresholds:** Inherits component thresholds.
- **Rounding behavior:** Preserve exact decimal values through this stage; no new statutory ratio.
- **Interactions/order:** TUIR article 11 limits deductions to gross tax. The non-taxable cuneo sum and treatment integrativo are cash additions, not deductions inside this formula.
- **Edge cases:** Deduction excess cannot make IRPEF negative or turn into a refundable amount unless a separate statute says so; none does here.
- **Source IDs:** SRC-NAT-TUIR-ART11-2026; SRC-NAT-L207-ART1-2-9; SRC-NAT-DL3-ART1-2026.
- **Evidence summary:** Article 11(3) caps deductions at gross tax; the two cash measures are legislated as sums not forming income.
- **Engineering interpretation:** Keep liability reduction and cash benefits as distinct trace components even when both increase take-home pay.
- **Assumptions:** Only the two modeled tax deductions apply.
- **Unresolved questions:** None material.
- **Expected trace representation:** Gross tax, each deduction, capped deductible total, net tax, and separate downstream cash benefits.
- **Required tests:** Non-negative net tax invariant; component-order test; no accidental addition of cash benefits into deduction capacity.

### RULE-NAT-CUNEO-SUM-2026

- **Name:** Non-taxable sum for employees with total income up to EUR 20,000.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Status:** `candidate`.
- **Calculation stage/order:** Eligibility after employment/total income; cash addition after tax liabilities.
- **Applicability:** Non-pension employee with adjusted total income not above EUR 20,000.
- **Eligibility:** TUIR article 49 employment income other than pension; adjusted total income `<= 20000`.
- **Exclusions:** Pension income; above-limit total income; special impatriate adjustments absent from the scenario.
- **Required inputs:** Employment income `E`; adjusted total income `R`; annualized employment income (equal to `E` for 365-day scenario).
- **Calculation base:** Actual employment income `E`.
- **Formula:** `E * 7.1%` if annualized `E <= 8500`; `E * 5.3%` if `8500 < E <= 15000`; `E * 4.8%` if `E > 15000`, always subject to `R <= 20000`.
- **Rates:** 7.1%; 5.3%; 4.8%.
- **Brackets:** Employment-income thresholds EUR 8,500 and EUR 15,000; separate total-income ceiling EUR 20,000.
- **Thresholds:** EUR 8,500; EUR 15,000; EUR 20,000.
- **Rounding behavior:** No explicit statutory rounding rule was found for the annual amount; retain exact decimal and use only the approved result-boundary monetary policy.
- **Interactions/order:** Does not form taxable income and is not subtracted from IRPEF. It may coexist with treatment integrativo when both tests pass. It is mutually exclusive by income threshold with RULE-NAT-CUNEO-DEDUCTION-2026.
- **Edge cases:** Rate changes create discrete amount changes immediately above EUR 8,500 and EUR 15,000. At exactly EUR 20,000 the sum still applies.
- **Source IDs:** SRC-NAT-L207-ART1-2-9; SRC-NAT-ADE-CIR4E-2025.
- **Evidence summary:** L. 207/2024 article 1(4–5) supplies eligibility, rates, and annualization; paragraph 7 provides automatic recognition and conguaglio.
- **Engineering interpretation:** Add this amount to estimated take-home after liabilities. Do not label it as a tax deduction or subtract it from RAL.
- **Assumptions:** 365 work days, no adjusted-income inclusions beyond ordinary employment income.
- **Unresolved questions:** Final cent/euro presentation policy requires independent review; this is not a rule-status blocker.
- **Expected trace representation:** Eligibility income, annualization (365/365), selected rate, actual income base, amount, “non concorre alla formazione del reddito”, and source.
- **Required tests:** EUR 1 fixtures around 8,500, 15,000, and 20,000; mutual exclusivity with additional deduction; non-inclusion in taxable income.

### RULE-NAT-CUNEO-DEDUCTION-2026

- **Name:** Additional employee deduction for total income over EUR 20,000 through EUR 40,000.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Status:** `candidate`.
- **Calculation stage/order:** After gross IRPEF alongside other deductions; before net IRPEF.
- **Applicability:** Non-pension employee with adjusted total income over EUR 20,000 but not over EUR 40,000.
- **Eligibility:** TUIR article 49 employment income other than pension; full-year work.
- **Exclusions:** `R <= 20000` and `R > 40000`; pensions.
- **Required inputs:** Adjusted total income `R`; work days (365).
- **Calculation base:** Gross IRPEF; amount is determined from adjusted total income.
- **Formula:** EUR 1,000 for `20000 < R <= 32000`; `1000 * (40000 - R) / 8000` for `32000 < R <= 40000`; otherwise zero. Full-year factor 365/365.
- **Rates:** Not applicable.
- **Brackets:** `(20000,32000]`; `(32000,40000]`.
- **Thresholds:** EUR 20,000; EUR 32,000; EUR 40,000.
- **Rounding behavior:** No explicit statutory four-decimal rule attaches to this ratio; retain exact decimal through the liability calculation.
- **Interactions/order:** Deduct from gross IRPEF after/with article 13 deduction, capped by gross tax. Income thresholds make it mutually exclusive with the non-taxable cuneo sum.
- **Edge cases:** At EUR 32,000 the full EUR 1,000 applies; at EUR 40,000 the phase-out formula yields zero even though the endpoint is included.
- **Source IDs:** SRC-NAT-L207-ART1-2-9; SRC-NAT-ADE-CIR4E-2025.
- **Evidence summary:** L. 207/2024 article 1(6) supplies amount, intervals, and phase-out; circular 4/E confirms progressive zeroing at EUR 40,000.
- **Engineering interpretation:** Treat as a non-refundable tax deduction, not an external cash amount.
- **Assumptions:** 365 work days and no adjusted-income modifiers.
- **Unresolved questions:** Final monetary rounding policy requires independent review.
- **Expected trace representation:** Adjusted total income, band, phase-out numerator/denominator if any, full-year factor, deduction, capacity cap, source.
- **Required tests:** EUR 1 fixtures around 20,000, 32,000, and 40,000; monotonic phase-out; cap at gross tax.

### RULE-NAT-TREATMENT-INTEGRATIVO-LOW-2026

- **Name:** Treatment integrativo for total income not above EUR 15,000.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Status:** `candidate`.
- **Calculation stage/order:** Eligibility uses gross tax and employment deduction; qualifying amount is a downstream cash addition.
- **Applicability:** Full-year employee, non-pension, adjusted total income `<= 15000`.
- **Eligibility:** Gross tax calculated on qualifying employment/assimilated income must be strictly greater than the article 13 employment deduction reduced by EUR 75 for a full year.
- **Exclusions:** Pension; failure of tax-capacity test; total income above EUR 15,000 is handled separately.
- **Required inputs:** Adjusted total income; gross IRPEF on qualifying employment income; article 13 employment deduction; work days (365).
- **Calculation base:** Eligibility comparison only; the benefit is a fixed full-year amount.
- **Formula:** If `R <= 15000` and `grossEmploymentIrpef > employmentDeduction - 75`, amount is `1200 * workDays / 365`; otherwise zero. Here full-year amount is EUR 1,200.
- **Rates:** Not applicable.
- **Brackets:** Adjusted total income up to EUR 15,000.
- **Thresholds:** EUR 15,000 total income; implied full-year capacity crossover at whole-euro qualifying income EUR 8,174 (`23% * 8174 > 1955 - 75`, while EUR 8,173 fails), assuming only first-band employment income.
- **Rounding behavior:** Fixed amount is exact for 365 days; no further statutory ratio applies in this scenario.
- **Interactions/order:** Does not form income and does not reduce IRPEF. It may coexist with RULE-NAT-CUNEO-SUM-2026; neither statute states mutual exclusivity and both are separately recorded by the tax authority.
- **Edge cases:** The comparison is strict (`>`), not `>=`. The implied EUR 8,174 crossover is below the RAL envelope but within/adjacent to the derived taxable-income envelope and is retained as a fixture.
- **Source IDs:** SRC-NAT-DL3-ART1-2026; SRC-NAT-L207-ART1-2-9; SRC-NAT-ADE-CIR4E-2025.
- **Evidence summary:** Current DL 3/2020 article 1 fixes EUR 1,200, the EUR 15,000 ceiling, strict capacity test, EUR 75 adjustment, proration, and automatic recognition.
- **Engineering interpretation:** Add EUR 1,200 to take-home only after independently computing and exposing the capacity test.
- **Assumptions:** 365 work days; only ordinary employee income; no special-pay interaction.
- **Unresolved questions:** Independent verifier should confirm coexistence presentation with the cuneo sum, although no legal non-cumulability was found.
- **Expected trace representation:** Adjusted total income, gross employment tax, employment deduction, EUR 75 adjustment, strict comparison result, work-day factor, benefit amount, source.
- **Required tests:** EUR 8,173/8,174/8,175 capacity fixtures; EUR 14,999/15,000/15,001 income fixtures; cash addition kept outside taxable base.

### RULE-NAT-TREATMENT-INTEGRATIVO-CONDITIONAL-2026

- **Name:** Conditional treatment integrativo for total income over EUR 15,000 through EUR 28,000.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Status:** `excluded`.
- **Calculation stage/order:** Would be evaluated after enumerated deductions; excluded from current result.
- **Applicability:** Statutory branch applies only when specified family/employment/legacy expense deductions exceed gross tax.
- **Eligibility:** `15000 < R <= 28000`, the ordinary gross-tax-versus-employment-deduction capacity condition remains satisfied, and the statutory sum of listed deductions is greater than gross tax.
- **Exclusions:** Approved scenario has no dependants, personal/legacy expense deductions, or other listed relief. With only the article 13 employment deduction, the statutory deduction sum does not exceed gross tax anywhere in this interval.
- **Required inputs:** Total income; gross tax; every listed qualifying deduction and its historical expense/loan date.
- **Calculation base:** Difference between listed deductions and gross tax.
- **Formula:** If eligible, `min(1200, listedDeductionSum - grossIrpef)`; otherwise zero.
- **Rates:** Not applicable.
- **Brackets:** `(15000,28000]`.
- **Thresholds:** EUR 15,000 and EUR 28,000, plus dates/amounts of listed legacy deductions.
- **Rounding behavior:** No modeled amount because eligibility is excluded by scenario.
- **Interactions/order:** The new L. 207/2024 cuneo relief is not among the enumerated deductions in DL 3/2020's conditional test.
- **Edge cases:** A real user with qualifying mortgage, health/building, family, or other legacy deductions may be eligible; RAL alone cannot determine this.
- **Source IDs:** SRC-NAT-DL3-ART1-2026; SRC-NAT-ADE-CIR4E-2025.
- **Evidence summary:** DL 3/2020 enumerates the qualifying deduction categories and defines the capped difference amount.
- **Engineering interpretation:** Exclude rather than silently set a generally applicable rule to zero; show the no-personal-deductions limitation to users.
- **Assumptions:** All enumerated non-employment deductions are absent.
- **Unresolved questions:** None for V1; future personalization would require new inputs and scope approval.
- **Expected trace representation:** Explicit excluded component naming the missing deduction facts and stating that exclusion is scenario-specific.
- **Required tests:** Exclusion metadata appears for income in this band; no accidental EUR 1,200 award based on RAL alone.

### RULE-NAT-SPECIAL-PAY-2026

- **Name:** 2026 special/substitute taxation of identified pay components.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Status:** `excluded`.
- **Calculation stage/order:** Would remove qualifying components from ordinary IRPEF/additional-tax base and apply substitute tax; excluded before ordinary base construction.
- **Applicability:** Potentially: qualifying CCNL renewal increases at 5%; qualifying productivity awards/profit participation at 1%; qualifying night/festive/rest-day/shift additions at 15%; tourism-sector special treatment at 15%.
- **Eligibility:** Requires component amount/type, CCNL or sector facts, 2025 employment income (EUR 33,000 or EUR 40,000 limits depending on regime), and in some cases employee waiver/request.
- **Exclusions:** Approved scenario defines RAL as ordinary fixed cash compensation and excludes bonuses, benefits, special tax treatment, and exceptional circumstances. It provides none of the required 2025/component facts.
- **Required inputs:** Prior-year employment income; industry/CCNL; separately identified payment amounts/types; waiver/request facts.
- **Calculation base:** Separately identified qualifying pay, never undifferentiated RAL.
- **Formula:** Not modeled. Statutory headline rates/limits are 5% for eligible 2026 renewal increments; 1% up to EUR 5,000 for eligible productivity awards in 2026–2027; 15% up to EUR 1,500 for eligible additions; 15% tourism special treatment for qualifying gross pay through September 2026.
- **Rates:** 5%; 1%; 15% as applicable.
- **Brackets:** Prior-year limits and component caps differ by regime.
- **Thresholds:** 2025 employee income EUR 33,000 or EUR 40,000; component caps EUR 5,000 and EUR 1,500.
- **Rounding behavior:** Not modeled.
- **Interactions/order:** Qualifying substitute-tax income is excluded from ordinary total income/deductions, with special treatment-integrativo interactions described by circular 2/E. This is a material reason not to infer the regime from RAL.
- **Edge cases:** A standard private employee may genuinely receive a qualifying CCNL increase in 2026; the V1 ordinary-RAL assumption can therefore differ from payroll even without an unusual personal circumstance.
- **Source IDs:** SRC-NAT-L199-ART1-2026; SRC-NAT-ADE-CIR2E-2026; SRC-NAT-TUIR-ART3-2026.
- **Evidence summary:** L. 199/2025 creates the regimes; Agenzia guidance demonstrates their dependence on prior-year and pay-component facts.
- **Engineering interpretation:** Exclusion is explicit and user-visible. Applying any special rate to part of RAL without decomposition would be fabricated precision.
- **Assumptions:** No qualifying special-pay component in the modeled RAL.
- **Unresolved questions:** None for V1; product copy must mention that 2026 special pay can make a real payslip differ.
- **Expected trace representation:** One grouped exclusion with named regimes, missing inputs, and authoritative source links.
- **Required tests:** Ordinary result never applies substitute rates; assumptions/methodology surface the exclusion.

### RULE-NAT-PERSONAL-RELIEFS-2026

- **Name:** Personal, family, expense, and high-income deduction adjustments outside the scenario.
- **Fiscal year:** 2026.
- **Jurisdiction:** Italy.
- **Status:** `excluded`.
- **Calculation stage/order:** Would alter taxable base or deductions after gross tax; omitted by approved scenario.
- **Applicability:** Depends on dependants, deductible expenses, tax-credit facts, principal residence, other income, or total income above EUR 200,000.
- **Eligibility:** Fact-specific and not derivable from RAL.
- **Exclusions:** Scenario fixes no dependants, no other income, no personal deductions, no pension-fund deductions, and maximum RAL EUR 120,000.
- **Required inputs:** Personal/family/expense facts not collected by V1.
- **Calculation base:** Various; not modeled.
- **Formula:** Not modeled.
- **Rates:** Not applicable.
- **Brackets:** Not applicable.
- **Thresholds:** Relevant high-income L. 199/2025 reduction starts above EUR 200,000, outside the supported envelope.
- **Rounding behavior:** Not modeled.
- **Interactions/order:** Their absence is an explicit scenario assumption, not a zero-valued universal rule. They can affect the conditional treatment-integrativo branch.
- **Edge cases:** Real results may be higher or lower when any excluded fact exists.
- **Source IDs:** SRC-NAT-TUIR-ART3-2026; SRC-NAT-DL3-ART1-2026; SRC-NAT-L199-ART1-2026.
- **Evidence summary:** Primary sources condition these items on facts not represented by RAL; L. 199/2025's EUR 440 high-income adjustment begins above EUR 200,000.
- **Engineering interpretation:** Do not add speculative personal inputs in V1; disclose the exclusion.
- **Assumptions:** Approved no-special-circumstances persona and envelope.
- **Unresolved questions:** None for V1.
- **Expected trace representation:** Visible exclusions/limitations, not zero-value deduction rows.
- **Required tests:** Exclusion copy and methodology source link; no family/personal inputs in the calculation contract.

## Proposed boundary fixtures

All values in this table are **national taxable/adjusted employment income**, not RAL. The INPS rules determine which RAL produces them. Monetary values shown are exact pre-presentation calculations unless stated otherwise.

| Fixture group | Inputs (EUR) | Required assertion |
| --- | --- | --- |
| Treatment capacity | 8,173 / 8,174 / 8,175 | With a full-year EUR 1,955 deduction and 23% gross tax, strict capacity fails at 8,173 and passes from 8,174; benefit then EUR 1,200 if total income <=15,000. |
| Cuneo rate 7.1→5.3 | 8,499 / 8,500 / 8,501 | Select 7.1% through 8,500 and 5.3% from 8,501; amounts 603.429 / 603.500 / 450.553. |
| EUR 15k combined boundary | 14,999 / 15,000 / 15,001 | Article 13 deduction 1,955 through 15,000; at 15,001 ratio `12999/13000` truncates to 0.9999 and deduction is 3,099.881. Cuneo rate changes 5.3→4.8; ordinary treatment integrativo ends after 15,000. |
| Cuneo sum→deduction | 19,999 / 20,000 / 20,001 | Sum is 959.952 / 960.000 / 0; additional deduction is 0 / 0 / 1,000. The components must never both apply at one value. |
| EUR 25k +65 start | 24,999 / 25,000 / 25,001 | EUR 65 employment-deduction adjustment absent through 25,000 and present from 25,001. |
| IRPEF 23→33 | 27,999 / 28,000 / 28,001 | Gross IRPEF 6,439.77 / 6,440.00 / 6,440.33. Employment-deduction formula switches after 28,000 without switching the EUR 65 flag. |
| Cuneo deduction phase-out start | 31,999 / 32,000 / 32,001 | Additional deduction 1,000 / 1,000 / 999.875 before result-boundary rounding. |
| EUR 35k +65 end | 34,999 / 35,000 / 35,001 | EUR 65 adjustment present through 35,000 and absent from 35,001; trace the discontinuity explicitly. |
| Cuneo deduction end | 39,999 / 40,000 / 40,001 | Additional deduction 0.125 / 0 / 0 before result-boundary rounding. |
| IRPEF 33→43 and employee-deduction end | 49,999 / 50,000 / 50,001 | Gross IRPEF 13,699.67 / 13,700.00 / 13,700.43. Four-decimal ratio truncation produces zero employment deduction at 49,999 and 50,000; above 50,000 no deduction. |
| Supported RAL envelope | 10,000 / 120,000 | Base equals RAL less candidate mandatory employee contributions; all national results remain deterministic and non-negative. Exact values wait for the independently sourced INPS rule. |

Representative non-boundary taxable-income fixtures: EUR 12,000 (first IRPEF/deduction band plus both qualifying cash sums if capacity passes), EUR 22,000 (23% IRPEF, second employment-deduction formula, full EUR 1,000 cuneo deduction), EUR 45,000 (23%+33%, no cuneo relief, declining employment deduction), EUR 75,000 and EUR 110,000 (all three IRPEF brackets, no employment/cuneo deduction). For each, M2 tests should assert every intermediate trace component, not only annual net.

## Rounding findings

Authoritative evidence establishes one calculation-specific rounding operation: article 13(6) says positive formula ratios are taken to the first four decimal digits. Candidate interpretation is truncation, because “prime” means retaining the leading four digits rather than rounding to four places.

No primary provision inspected establishes a special cent-rounding step for the annual estimator's gross tax, cuneo amounts, or net tax. Tax-return forms commonly expose whole euros, but V1 is an estimate, not a 2027 return, and the 2027 filing/liquidation instructions for 2026 income are not yet available on the 2026-08-22 access date. Recommended M2 policy, subject to independent fiscal verification, is:

1. perform decimal calculations exactly;
2. apply the article 13 four-digit truncation exactly where required;
3. avoid intermediate monetary rounding elsewhere;
4. round public money outputs once to cents using the domain-owned monetary adapter;
5. label the result an estimate and do not claim tax-return or payslip rounding equivalence.

This is an engineering/output policy, not a claimed fiscal rule. A reviewer finding authoritative payroll-specific annual rounding that changes results must reopen the affected candidate records before approval.

## Verification performed

- Reopened the consolidated Normattiva text of L. 207/2024 and L. 199/2025; did not rely on snippets as evidence.
- Reopened official MEF/DEF consolidated articles 3, 11, 13, and 51 of the TUIR and current article 1 of DL 3/2020.
- Reopened the official PDFs of Agenzia circular 4/E/2025 (52 pages) and circular 2/E/2026 (14 pages), including the precise sections cited above.
- Cross-checked the 2026 second-rate change in consolidated article 11 against L. 199/2025 article 1(3).
- Cross-checked the statutory fiscal-wedge formulas against Agenzia examples/interpretation.
- Manually recomputed the listed boundary amounts using exact decimal arithmetic and the explicit four-decimal ratio rule where applicable.
- Searched L. 199/2025 for later changes to the structural fiscal-wedge measures; found none.
- Audited every proposed rule against the repository's required record fields and used only `candidate` or `excluded` states.

## Findings and change impact

1. The 2026 second IRPEF rate is 33%, not the 35% shown in 2025 guidance. Any reuse of 2025 tables must be rejected unless that rate is replaced from primary 2026 law.
2. The annual net formula must distinguish tax deductions from non-taxable cash benefits. The cuneo sum and treatment integrativo increase take-home beyond `RAL - contributions - taxes`; the additional cuneo deduction instead reduces IRPEF.
3. The approved “ordinary RAL” assumption materially excludes genuine 2026 substitute-tax regimes. This is acceptable only as a visible limitation, because a real standard employee can receive a qualifying CCNL renewal increase.
4. The treatment-integrativo branch above EUR 15,000 is excluded because personal/legacy deduction facts are absent; it must not be universally documented as zero.
5. Threshold discontinuities are legally material and should be explained rather than smoothed.

## Capabilities and side effects

- **Capabilities used:** Read-only local filesystem/Git inspection; official-web search and retrieval; local write capability restricted to this run record.
- **MCP/external services:** Official public web retrieval only; no authenticated MCP server, external account, calculator API, or opaque payroll service.
- **Network/write risk:** Network access was read-only. The only filesystem mutation is this Markdown run record.
- **External side effects:** None. No remote repository, message, publication, dependency, or production system was changed.

## Human approval status

All records are research output only. No rule is verified. Independent Claude fiscal verification and explicit human approval remain mandatory before any candidate rule may become `verified` or influence production calculations.

## Unresolved issues

- Independent verifier must confirm the four-decimal truncation interpretation and the recommended single final cent-rounding policy.
- Independent verifier should explicitly confirm cumulative presentation of the low-income cuneo sum and treatment integrativo when both eligibility tests pass.
- The eventual coordinator synthesis must link, not duplicate, the independently researched INPS contribution rule that supplies the national taxable base.

## Recommended next action

Coordinator integrates these structured records into the canonical fiscal catalog/source register as `candidate`/`excluded`, reconciles IDs with the other streams, and hands the originals plus boundary fixtures to the independent Claude fiscal verifier.
