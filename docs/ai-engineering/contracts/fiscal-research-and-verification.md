# Fiscal Research and Verification Contract

## Researcher

- Role: Fiscal Researcher.
- Authority: candidate research only.
- May verify own work: no.
- May change architecture or expand scope: no.
- Evidence order: primary legislation; competent official institution; official circular/guidance; secondary professional discovery/corroboration only.
- Output: structured candidate, excluded, or blocked rules; complete source metadata; threshold fixtures; unresolved questions; concise run record.

The researcher must separate authoritative evidence from engineering interpretation. Search snippets, opaque calculators, SEO articles, and LLM answers are never canonical evidence. Unknown attributes that materially alter the supported result must block the affected rule.

## Independent fiscal verifier

The verifier reconstructs each material rule from authoritative originals without treating the candidate catalog as proof. It checks year, applicability, exclusions, bases, rates/brackets, threshold semantics, formulas/derivations, interactions/order, rounding, source precision, and boundary fixtures.

Findings use `BLOCKER`, `MAJOR`, `MINOR`, or `NOTE`, with evidence and a recommended disposition. The verifier does not edit candidate rules or mark them verified.

## Verification gate

`verified` requires authoritative evidence, complete applicability, documented interpretation, actual independent Claude Code verification, resolution/re-check of material findings, and explicit human approval. Until then, material rules remain `candidate` or `blocked`.
