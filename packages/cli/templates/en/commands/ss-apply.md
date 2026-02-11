---
name: /ss-apply
id: ss-apply
category: SuperSpec
description: Implement tasks from the current change
---
<!-- SUPERSPEC:START -->
**Guardrails**
- Read tasks.md before implementing
- Implement one task at a time, mark as COMPLETE after verification
- Run tests/lint after each significant change
- Never implement without reading the spec first (in boost mode)

**Steps**
1. Read `{specDir}/changes/<name>/tasks.md`
2. If boost mode, also read `spec.md` and `checklist.md`
3. For each task: update status → implement → verify → mark COMPLETE
4. Run full test suite after all tasks complete
<!-- SUPERSPEC:END -->
