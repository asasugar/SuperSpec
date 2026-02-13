---
name: /ss-resume
id: ss-resume
category: SuperSpec
description: Restore spec context for vibe coding
---
<!-- SUPERSPEC:START -->
**Guardrails**
- Use when returning to a change after a break
- Read context.md first if it exists

**Steps**
1. Run `superspec sync` to collect git diff into context.md
2. Read `{specDir}/changes/<name>/context.md`
3. Read current proposal.md and tasks.md to understand state
4. Identify incomplete tasks and continue implementation
<!-- SUPERSPEC:END -->
