# Run Record Contract

Create one record per meaningful task, not per command, search, or conversation. Filenames use `YYYY-MM-DD-NNN-short-task.md`.

## Minimal metadata

```yaml
---
run_id: RUN-YYYY-MM-DD-NNN
date: YYYY-MM-DD
tool: codex | claude-code | human-governance
role: bounded-role
task: short-task-id
status: completed | stopped | blocked
owner: codex | claude | human
reviewer: claude | codex | human | null
related_rules: []
related_adrs: []
commit: null
---
```

## Body

Record: Objective; Acceptance criteria; Canonical context consulted; Sources/files inspected; Changes made; Verification performed; Findings; Assumptions/decisions affected; Human approval status; Unresolved issues; Recommended next action.

When relevant to risk, include material tools/MCP/external capabilities, network and write capability, and external side effects. Do not include hidden reasoning, full prompts/responses, raw transcripts, token logs, or mechanical capability inventories.
