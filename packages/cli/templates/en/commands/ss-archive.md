---
name: /ss-archive
id: ss-archive
category: SuperSpec
description: Archive completed change
---
<!-- SUPERSPEC:START -->
**Guardrails**
- Only archive when all tasks are COMPLETE
- Ensure tests pass before archiving

**Steps**
1. Verify all tasks in tasks.md are marked COMPLETE
2. Run `superspec archive <name>` or `superspec archive --all`
<!-- SUPERSPEC:END -->
