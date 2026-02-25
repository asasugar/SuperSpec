---
name: /ss-tasks
id: ss-tasks
category: SuperSpec
description: Generate task list from proposal
---
<!-- SUPERSPEC:START -->
**Guardrails**
- Read proposal.md first (and spec.md in boost mode)
- Tasks must be small, verifiable, and actionable (< 1 hour each in boost mode)
- Group related changes to the same file under one task
- Include verification steps for each task

**Steps**
1. Read `{specDir}/changes/<name>/proposal.md`
2. If boost mode, also read `spec.md`
3. Read `{specDir}/templates/tasks.md` as **structural reference**
4. **Directly generate** tasks.md (with real task content, not template placeholders)
5. Each task should have: clear description, file paths, dependencies, verification criteria
<!-- SUPERSPEC:END -->
