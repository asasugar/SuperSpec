---
name: /ss-create
id: ss-create
category: SuperSpec
description: Create a new change with proposal (boost mode adds spec + checklist)
---
<!-- SUPERSPEC:START -->
**Guardrails**
- Read `superspec.config.json` first to get `lang`, `specDir`, `boost`, `strategy`, `context`
- Check existing changes in `{specDir}/changes/` to avoid duplicates
- Never create change folders manually — use `superspec create <name>` CLI
- Do not write any code during the proposal stage. Only create design documents

**Steps**
1. Run `superspec create <name> [-b] [-c] [-d <description>]` to scaffold the change
2. If boost mode (-b), also generate spec.md and checklist.md
3. Read the generated proposal.md and understand the change scope
4. Wait for user confirmation before proceeding to /ss-tasks
<!-- SUPERSPEC:END -->
