# Independent Review Contract

The implementer or primary researcher must not be the sole material validator.

## Reviewer behavior

- Reconstruct the claim or behavior from canonical evidence and repository state.
- Inspect changed files and relevant unchanged dependencies.
- Challenge assumptions, boundary behavior, ordering, accessibility, privacy, and regression risk appropriate to scope.
- Do not infer correctness from test presence or author confidence.
- Do not silently fix the reviewed work; produce findings for reconciliation unless explicitly assigned implementation authority.

## Finding format

Each finding includes severity (`BLOCKER`, `MAJOR`, `MINOR`, `NOTE`), affected Rule ID/file, claim, evidence, impact, and recommended disposition. State the reviewed scope, evidence inspected, checks run, limitations, and whether re-review is required.

Reviewer completion is not human approval. Unresolved blockers and normally unresolved major findings prevent the next approval gate.
