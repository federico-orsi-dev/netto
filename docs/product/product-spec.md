# Product Specification

## Thesis and user

Netto is a focused compensation translator for an Italian employee or candidate. It answers both “What does my RAL become?” and, optionally, “What does this change in RAL become?” The product translates gross compensation into modeled disposable consequences, then progressively exposes the fiscal changes and evidence that materially matter.

The hiring team is the evaluation audience, not the product persona.

## Supported scenario

- Fiscal year 2026
- Private-sector, non-executive, permanent employee working for an article 10 CIGO industrial employer with more than 15 employees, within CIGS scope, and not subject to any mandatory sector solidarity/supplemental fund carrying an employee contribution
- Full fiscal-year employment and residence in Milan, Lombardy
- No dependants, other income, personal deductions, special incentives, bonuses, benefits, pension-fund deductions, TFR in RAL, or exceptional payroll circumstances
- One explicitly researched INPS contribution profile: general FPLD treatment under the approved industrial-employer/CIGS archetype
- Whole-euro RAL from €10,000 through €120,000

RAL means fixed annual gross cash employment remuneration subject to ordinary employee taxation and employee social-security contributions. It is not employer cost or total compensation.

The V1 domain keeps annual gross salary and annual contributable remuneration as distinct concepts. Under the human-approved one-input estimator assumption, entered RAL represents lawful ordinary full-year remuneration fully subject to employee social-security contributions, except where an explicitly modeled rule states otherwise; therefore V1 derives contributable remuneration from RAL. This is a disclosed product/domain assumption, not a statement that Italian law defines RAL as the contribution base.

The fixed employer profile is a disclosed scenario assumption that makes the one-input contribution model deterministic; it is not a claim that the selected contribution treatment is universal across private employers. The profile approval alone did not verify any contribution rate, base, formula, ordering, or rounding policy; those fiscal components subsequently passed the repository evidence, independent-review, reconciliation, and human-approval lifecycle only within this bounded profile.

## Required outputs

The product must expose separately:

1. Estimated annual net.
2. Estimated average monthly net: annual net divided by 12.
3. Estimated average contractual instalment: annual net divided by the selected 12, 13, or 14 instalments.

The instalment value is a presentation estimate and does not simulate individual thirteenth- or fourteenth-month payslips.

It also exposes effective modeled burden, final gross-to-net deduction categories, an interactive semantic component ledger, explanations, calculation trace, assumptions, limitations, methodology, sources, and local-calculation privacy disclosure.

After a valid single calculation, the user may compare exactly one current RAL with one proposed RAL under the same fiscal year, profile, assumptions, and money policy. Comparison owns the signed gross, annual-net, and average-monthly-net changes; the modeled share of the gross change reflected in net; materially changed canonical fiscal components; and relevant verified rule-applicability changes. It is not a marginal tax rate, generic scenario engine, or second fiscal calculator.

## Experience

Primary flow: enter RAL → calculate → understand the result → optionally translate one proposed change.

Information hierarchy:

1. “Quanto mi rimane?”
2. “What does this proposed change become?”
3. Which components explain the result or change?
4. Which assumptions, rules, and authoritative sources support it?

The Italian UI uses employee-friendly terminology. Fiscal detail is progressively disclosed. Desktop and mobile use the same semantic compensation model with intentional responsive composition rather than separate calculation representations.

Explanations use three levels: the canonical amount and what happened; a concise description of what the component is, its institutional reference, and what it means for the estimate; then optional formulas, Rule IDs, sources, and trace evidence. A successful calculation deliberately reveals the primary result while preserving keyboard focus context. On narrow viewports, selecting a breakdown item brings its shared explanation into the current reading context.

The methodology default view surfaces the three assumptions most likely to change applicability: the fixed contribution profile, full-year Milan/Lombardy context, and the ordinary fully contributable RAL/personal-circumstances boundary. Complete assumptions, exclusions, sources, and the technical trace remain available through closed progressive disclosures.

When modeled monetary benefits exceed modeled outflows, the result explicitly distinguishes contractual RAL from State fiscal cash benefits. It explains that the employer is not paying above RAL and that the signed difference is a modeled net benefit; the underlying monetary values remain owned by the canonical calculation result.

## Fidelity and non-goals

This is a transparent annual estimate, not a payslip simulator, tax filing tool, minimum-remuneration/CCNL compliance validator, or official payroll result. Its contribution estimate applies only to the named industrial-employer/CIGS archetype and is not universal across private employers, sectors, headcounts, or bilateral funds. The product excludes partial-year work, employer cost, CCNL/level/hours/pay-period inputs, other fiscal years, personal circumstances, persistence, accounts, analytics, sharing URLs, multi-scenario comparison, negotiation advice, marginal simulators, and exports. The contribution-base assumption must be reopened if the product later accepts part-year work, non-cash or exceptional pay, actual payroll reconciliation, or employment-compliance claims.

## Deferred product scope

Extending the supported RAL maximum from EUR 120,000 toward EUR 200,000 is a post-V1 domain enhancement, not a UI-only change. It requires targeted revalidation of the pension contribution ceiling and additional-contribution interaction, high-income rule and exclusion boundaries, assumptions, fixtures, and exhaustive-range invariants before the input contract or copy may change.

## Privacy

Calculation and comparison occur locally in the browser. Current and proposed salary inputs are not persisted, transmitted, placed in URLs, or collected as telemetry.
