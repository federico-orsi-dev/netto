# Product Specification

## Thesis and user

Netto helps an Italian employee or candidate understand: “If my RAL is €X, approximately how much will I receive, and where does the difference go?” The product favors immediate clarity and progressively disclosed, source-backed reasoning.

The hiring team is the evaluation audience, not the product persona.

## V1 scenario

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

It also exposes effective modeled burden, final gross-to-net deduction categories, a semantic breakdown, an accessible waterfall, explanations, calculation trace, assumptions, limitations, methodology, sources, and local-calculation privacy disclosure.

## Experience

Primary flow: enter RAL → calculate → understand the result.

Information hierarchy:

1. “Quanto mi rimane?”
2. “Dove è andato il resto?”
3. How was each value calculated?
4. Which assumptions and authoritative sources support it?

The Italian UI uses employee-friendly terminology. Fiscal detail is progressively disclosed. Desktop presentation is polished; mobile transforms the visualization into an intentional vertical breakdown.

## Fidelity and non-goals

This is a transparent annual estimate, not a payslip simulator, tax filing tool, minimum-remuneration/CCNL compliance validator, or official payroll result. Its contribution estimate applies only to the named industrial-employer/CIGS archetype and is not universal across private employers, sectors, headcounts, or bilateral funds. V1 excludes partial-year work, employer cost, CCNL/level/hours/pay-period inputs, other fiscal years, personal circumstances, persistence, accounts, analytics, sharing URLs, comparisons, marginal simulators, and exports. The contribution-base assumption must be reopened if V1 later accepts part-year work, non-cash or exceptional pay, actual payroll reconciliation, or employment-compliance claims.

## Privacy

Calculation occurs locally in the browser. Salary input is not persisted, transmitted, placed in URLs, or collected as telemetry.
