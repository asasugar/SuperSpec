---
name: /ss-archive
id: ss-archive
category: SuperSpec
description: Archive completed change
---
<!-- SUPERSPEC:START -->
**Input Parsing Rules**

From user input, extract: **change name** or **all flag**.

| Extract | Rule | Example |
|---------|------|---------|
| Change name | Remaining text after removing flags; if empty, use current active change | `/ss-archive addUserAuth` → name=`addUserAuth` |
| Archive all | `--all`/`all` → add `--all` | `/ss-archive --all`; `/ss-archive all` |

**Guardrails**
- Only archive when all tasks are COMPLETE
- Ensure tests pass before archiving

**Steps**
1. Parse user input → extract change name or `--all` flag
2. Verify all tasks in tasks.md are marked COMPLETE
3. Run `superspec archive <name>` or `superspec archive --all`
<!-- SUPERSPEC:END -->
