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
3. Generate tasks.md with phased implementation steps
4. Each task should have: clear description, file paths, dependencies, verification criteria
<!-- SUPERSPEC:END -->
