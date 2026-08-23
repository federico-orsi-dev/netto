---
run_id: RUN-2026-08-22-014
date: 2026-08-22
tool: codex
role: independent-m1-targeted-reviewer
task: m1-targeted-policy-review
status: completed
owner: codex
reviewer: human
related_rules:
  - RULE-INPS-2026-001
  - RULE-INPS-2026-005
  - RULE-INPS-2026-006
  - RULE-INPS-2026-007
  - RULE-LOCAL-2026-001
  - RULE-LOCAL-2026-ROUNDING
  - POLICY-MONEY-2026-001
related_adrs:
  - ADR-0003
  - ADR-0004
checkpoint_commit: 29c4232679ff51c3279c8ae5e653fb8037d1052b
checkpoint_tree: 2169ce834d613be69d26c2338a488cd807f41c76
commit: null
---

# M1 targeted independent review

## Objective and authority boundary

Independently review only the approved V1 RAL assumption, component-first money policy, five lifecycle reclassifications, required policy fixtures, supported-range local-due invariant, and bounded treatment of `RULE-LOCAL-2026-001` defined by `RUN-2026-08-22-013`.

This record does not restart broad fiscal research, verify or promote fiscal rules, perform human fiscal approval, change canonical fiscal artifacts, authorize application code, or expand V1 scope.

## Acceptance criteria

- Confirm the exact repository checkpoint and clean pre-review state.
- Reopen only the canonical context and original evidence required by RUN-013.
- Report a disposition for every RUN-013 review item.
- Independently reproduce RAL EUR 10,005 and 55,240/55,241 with exact decimal arithmetic.
- Enumerate every whole-euro RAL from EUR 10,000 through EUR 120,000 and reproduce the minimum modeled net IRPEF invariant.
- Recommend a bounded treatment for `RULE-LOCAL-2026-001` without calling the unresolved predicate verified.
- Create only this independent review record.

## Strict pre-flight

Pre-flight passed before any write:

- repository location and Git root: isolated targeted-review worktree;
- branch: `review/m1-targeted-policy`;
- HEAD: `29c4232679ff51c3279c8ae5e653fb8037d1052b`;
- HEAD tree: `2169ce834d613be69d26c2338a488cd807f41c76`;
- worktree: clean, including untracked files;
- RUN-013: present;
- canonical lifecycle: 24 unique Rule IDs, comprising 15 `candidate`, 1 `blocked`, 8 `excluded`, and 0 `verified`;
- repository content: Markdown governance/research documentation only; no application code;
- post-checkpoint targeted-review artifact: none. RUN-013 was the latest run and `HEAD..HEAD` contained no path.

## Canonical context and evidence inspected

- `AGENTS.md`, `PROJECT_STATE.md`, Product Specification, Fiscal Rule Catalog, Source Register, and Test Strategy.
- AI Engineering Workflow, Run Record Contract, and Independent Review Contract.
- ADR-0003 and ADR-0004 for decimal ownership and presentation boundaries.
- `RUN-2026-08-22-011`, `RUN-2026-08-22-012`, and `RUN-2026-08-22-013`.
- Current checkpoint diff from parent `cebcb3db6ba4f749b8a146f25c39568fd32d75bc`.
- [D.Lgs. 314/1997 article 6](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1997-09-02;314~art6!vig=), current consolidated primary law.
- [INPS Circular 6/2026](https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.01.circolare-numero-6-del-30-01-2026_15151.html), current 2026 institutional instruction.
- [D.Lgs. 446/1997 article 50](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1997-12-15;446~art50!vig=), current consolidated primary law.
- [D.Lgs. 360/1998 article 1](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1998-09-28;360~art1!vig=), current consolidated primary law.
- [REDDITI PF 2026, Quadro RN/RV](https://infoprecompilata.agenziaentrate.gov.it/portale/quadro-rn-quadro-rv), competent contextual guidance expressly for income year 2025.
- [D.P.R. 600/1973 article 1](https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1973-09-29;600~art1!vig=), current primary contextual lineage.

Public web access was read-only. No repository remote, public source, service, or other external state was mutated.

## Targeted findings

No `BLOCKER`, `MAJOR`, or `MINOR` finding was identified within the bounded contract.

### NOTE 1 - RAL and contributable remuneration classification

- **Affected rules/files:** `RULE-INPS-2026-001`, `RULE-INPS-2026-005`, `RULE-INPS-2026-006`; Product Specification, Fiscal Rule Catalog, Project State, RUN-013.
- **Claim:** annual gross salary and annual contributable remuneration remain separate domain concepts; equality is only a human-approved V1 estimator assumption.
- **Evidence:** D.Lgs. 314/1997 article 6 defines contribution income and retains contribution-specific minima/maxima; INPS Circular 6/2026 retains minimum-remuneration mechanics. Neither establishes legal identity with user-entered RAL. The canonical model keeps the two named concepts distinct, discloses the fixed full-year lawful-ordinary-remuneration scope, and denies CCNL/minimum-remuneration compliance claims.
- **Impact:** the one-input model is bounded product scope, not verified fiscal law. The underlying minimum-remuneration rule is neither zero nor disproved.
- **Recommended disposition:** confirm the assumption classification and the related `candidate`/`excluded` statuses; reopen on the recorded scope triggers.

### NOTE 2 - Component-first money policy

- **Affected policy/files:** `POLICY-MONEY-2026-001`; Fiscal Rule Catalog, Product Specification, Test Strategy, ADR-0003, ADR-0004, RUN-013.
- **Claim:** the policy deterministically owns V1 engineering arithmetic without creating fiscal law.
- **Evidence:** the policy explicitly specifies 40-significant-digit internal decimal precision, verified statutory-operation precedence, half-up cent normalization of public aggregation children, exact sum-of-normalized-children aggregates, downstream use of those aggregates, two-decimal public display without calculation feedback, exact cent reconciliation, annual-net reconciliation, and installment invariance. Article-13 `trunc4` remains statutory and precedes normalization. Normative contribution, local-return, and payroll rounding remain excluded rather than inferred.
- **Impact:** every annual fiscal handoff required by the bounded review has one owner and displayed children cannot disagree with aggregates. Presentation-only division remains subordinate to annual net under ADR-0004 and cannot change a fiscal component.
- **Recommended disposition:** confirm the approved engineering policy as separate from the fiscal-rule lifecycle.

### NOTE 3 - Five lifecycle reclassifications

- **Affected rules:** `RULE-INPS-2026-001`, `RULE-INPS-2026-005`, `RULE-INPS-2026-006`, `RULE-INPS-2026-007`, `RULE-LOCAL-2026-ROUNDING`; unchanged blocker `RULE-LOCAL-2026-001`.
- **Claim:** RUN-013 applied exactly the five authorized transitions and promoted no rule to `verified`.
- **Evidence:** reconciliation states were `blocked` for all five transitioned rules. Current states are INPS-001 `candidate`, INPS-005 `candidate`, INPS-006 `excluded`, INPS-007 `excluded`, and LOCAL-ROUNDING `excluded`. LOCAL-001 remains `blocked`. Independent parsing found 15 candidate, 1 blocked, 8 excluded, and 0 verified across 24 unique Rule IDs.
- **Impact:** assumption/policy gates are resolved while unevidenced fiscal mechanics remain visibly non-verified.
- **Recommended disposition:** confirm all five transitions.

### NOTE 4 - Required fixtures and supported-range invariant

- **Affected rules/policy:** `POLICY-MONEY-2026-001`, `RULE-INPS-2026-002`, `RULE-INPS-2026-005`, `RULE-NAT-BASE-2026`, `RULE-NAT-GROSS-IRPEF-2026`, `RULE-NAT-EMPLOYMENT-DEDUCTION-2026`, `RULE-NAT-CUNEO-DEDUCTION-2026`, `RULE-NAT-NET-IRPEF-2026`.
- **Claim:** the recorded policy fixtures and EUR 126.73 invariant reproduce independently.
- **Evidence:** a validation-only Python `Decimal` enumerator used 40-digit precision, explicit decimal half-up cents, statutory positive-ratio four-decimal truncation, component-first aggregates, and the canonical candidate formulas. Results are recorded below.
- **Impact:** the modeled positive-IRPEF result remains well separated from the contextual de-minimis lineage throughout the supported range.
- **Recommended disposition:** accept the fixtures and invariant as M1 specifications, still subject to the human fiscal approval gate for candidate fiscal rules.

### NOTE 5 - Bounded treatment of RULE-LOCAL-2026-001

- **Affected rule:** `RULE-LOCAL-2026-001`.
- **Claim:** the unresolved income-year-2026 de-minimis/liquidation predicate is suitable for human-approved bounded exclusion from V1, but is not verified.
- **Evidence:** D.Lgs. 446/1997 article 50 and D.Lgs. 360/1998 article 1 support the common IRPEF-derived base, domicile, and IRPEF-due structure. They do not state the exact de-minimis predicate. REDDITI PF 2026 states EUR 10.33 only for income year 2025; D.P.R. 600/1973 supports the historical lineage without supplying a complete 2026 local-addition algorithm. Independent approved-policy enumeration puts every supported result above that edge, with a minimum of EUR 126.73 and a EUR 116.40 margin over EUR 10.33.
- **Impact:** the unresolved edge cannot alter a modeled output in the current V1 correctness envelope on the reopened evidence, but calling it `verified` would be false.
- **Recommended disposition:** at the human fiscal gate, reclassify `RULE-LOCAL-2026-001` to bounded `excluded`, explicitly meaning only that its unresolved de-minimis edge is output-unreachable in V1. Do not mark the predicate or Rule ID `verified`; do not represent the rule as zero or universally inapplicable. Preserve the supported common-base/domicile structure and reopen if minimum RAL falls below EUR 10,000, personal deductions or credits enter scope, partial-year work or other income enters scope, domicile/profile changes, or year-matching evidence changes the predicate.

## Independent fixture reproduction

| RAL | IVS exact / public | CIGS exact / public | Additional IVS | Public contributions | Taxable income | Article-13 exact / public |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| EUR 10,005 | 919.4595 / 919.46 | 30.015 / 30.02 | 0.00 | 949.48 | 9,055.52 | 1,955 / 1,955.00 |
| EUR 55,240 | 5,076.5560 / 5,076.56 | 165.720 / 165.72 | 0.00 | 5,242.28 | 49,997.72 | 0.1910 / 0.19 |
| EUR 55,241 | 5,076.6479 / 5,076.65 | 165.723 / 165.72 | 0.00 | 5,242.37 | 49,998.63 | 0 / 0.00 |

The RAL EUR 10,005 contribution aggregate is the exact sum EUR 919.46 + EUR 30.02 = EUR 949.48. The two article-13 boundary fixtures apply statutory `trunc4` before public normalization.

## Supported-range enumeration

- Inputs enumerated: 110,001 whole-euro values, inclusive EUR 10,000 through EUR 120,000.
- Minimum public net IRPEF: EUR 126.73.
- Minimum occurrence: unique, at RAL EUR 10,000.
- At the minimum: IVS EUR 919.00; CIGS EUR 30.00; additional IVS EUR 0.00; contribution aggregate EUR 949.00; taxable income EUR 9,051.00; public gross IRPEF EUR 2,081.73; public employment deduction EUR 1,955.00; cuneo deduction EUR 0.00; public net IRPEF EUR 126.73.
- Margin above contextual EUR 10.33: EUR 116.40.

## Changes made

- Created only this run record.
- Modified no existing file, prior run, canonical fiscal artifact, application code, architecture record, or control-plane file.

## Validation performed

- Exact checkpoint and clean pre-flight checks passed.
- Catalog lifecycle parser passed: 24 unique Rule IDs; 15 candidate, 1 blocked, 8 excluded, 0 verified; no missing statuses or duplicates.
- Current checkpoint changed-path inspection passed and exposed only the documented M1 governance/reconciliation scope.
- Required source/currentness boundary was independently reopened; no contrary year-matching 2026 predicate was found in the bounded evidence.
- Exact-decimal required fixtures passed.
- Full-range exact-decimal enumeration passed for all 110,001 inputs.
- Record front matter and required sections passed; trailing-whitespace count is zero and the file ends with a newline.
- Repository-relative Markdown-link validation passed with zero missing targets.
- Final Git scope/status passed: only this untracked run record exists; no tracked file is modified or staged.

## Human approval status and outcome

This review is not fiscal approval. The 15 candidate rules remain unapproved as `verified`, and `RULE-LOCAL-2026-001` remains canonically `blocked` until a human performs the dedicated approval/governance transition.

**READY FOR HUMAN FISCAL APPROVAL**

## Recommended next action

The human owner may perform the bounded rule-by-rule fiscal approval and, if accepted, persist the `RULE-LOCAL-2026-001` bounded exclusion in a separate governance step. Do not start M2 or implement fiscal logic before that gate is recorded.
