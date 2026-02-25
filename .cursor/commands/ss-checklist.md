---
name: /ss-checklist
id: ss-checklist
category: SuperSpec
description: Quality gate (Standard: after proposal / Boost: after spec)
---
<!-- SUPERSPEC:START -->
**Guardrails**
- Available in both Standard and Boost modes
- Auto-invoked during `/ss-create` flow; can also be called manually at any time

**Steps**
1. Read all existing artifacts (proposal.md, spec.md, etc.)
2. Read `{specDir}/templates/checklist.md` as **structural reference**
3. Determine mode: Standard → use Standard checks (score / 10); Boost → use Boost checks (score / 25)
4. If checklist.md doesn't exist → **directly generate** it (with real evaluation results)
5. If checklist.md already exists → read and update evaluation results
6. Verify each checklist item, mark pass/fail
7. Fail → report failing items, suggest fixes
8. Pass → prompt to run /ss-tasks (or /ss-apply)
<!-- SUPERSPEC:END -->
