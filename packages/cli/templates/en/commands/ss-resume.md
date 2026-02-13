---
name: /ss-resume
id: ss-resume
category: SuperSpec
description: Restore spec context for vibe coding
---
<!-- SUPERSPEC:START -->
**Guardrails**
- Use when returning to a change after a break
- Read only context.md by default (minimal tokens), other docs are user's choice

**Steps**
1. Locate current change folder: `{specDir}/changes/`
2. Run `superspec sync <name>` to collect latest git changes into context.md
3. Read `context.md` (single file, contains: goals, progress, strategy, input, git changes)
4. Determine behavior mode from `strategy` in context.md (follow / create)
5. Report current state: goals, progress, git changes, affected files
6. **Ask user whether to read additional docs**, list available files in change dir, suggest priority:
   - ✅ `tasks.md` (recommended, task details and dependencies)
   - `proposal.md` (requirements and solution review)
   - `spec.md` (Boost mode, requirement details)
   - `design.md` (architecture decisions)
   - `checklist.md` (quality check results)
   - `clarify.md` (historical Q&A)
7. Read selected files based on user's choice
8. Ask user: what needs fixing / adjusting?
9. Fix respecting `strategy` (follow = obey conventions / create = may explore new approaches)
10. After fix: update tasks.md checkbox if applicable
11. Run `superspec sync <name>` to refresh context.md
<!-- SUPERSPEC:END -->
