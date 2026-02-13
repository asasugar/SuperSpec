---
description: SuperSpec - Spec-driven development slash commands
globs: ["**/*"]
alwaysApply: true
---

# SuperSpec Slash Commands

> Principles, rules, config, workflow are defined in AGENTS.md (already in your context).
> This file only adds slash command execution details. Do not duplicate AGENTS.md content.

---

## /ss-create <feature>

**CLI:** `superspec create <feature>` (`-b` boost, `-c` creative, `--no-branch` skip branch)

> CLI only creates folder + git branch. AI reads `{specDir}/templates/` as structural reference, then generates artifacts with real content on demand.

**Strategy priority**: user input `-c` > config default

**Standard steps:**
1. Parse user input → extract feature, intent type, developer, lang; **preserve original input text**
2. Determine strategy by priority
3. Run `superspec create <feature> [--intent-type <type>] [-c]` → creates folder + branch
4. If `follow`: read `context` files → constrain to project patterns
   If `create`: note `context` as awareness only
5. Collect from user: Background, Goals, Requirements, Technical Solution, Impact scope
6. `follow`: solution must align with existing architecture
   `create`: may propose new architecture, must explain trade-offs
7. Apply First Principles (brevity, intent-focused, required sections)
8. Directly generate `proposal.md` (requirements + technical solution). Frontmatter `input` = user's original input
9. **Auto-run checklist** (Standard checks, / 10): evaluate proposal quality
10. Pass → generate `checklist.md`, prompt /ss-tasks; Fail → fix proposal, re-check

**Boost steps:**
1. Parse user input → extract feature, intent type, developer, lang; **preserve original input text**
2. Determine strategy by priority
3. Run `superspec create <feature> -b [--intent-type <type>] [-c]` → creates folder + branch
4. Read frontmatter config → check `strategy`, context
5. Directly generate `proposal.md` (focused on requirements background). Frontmatter `input` = user's original input
6. Read `{specDir}/templates/spec.md` as structural reference
7. Generate spec from proposal:
   - User stories + acceptance criteria (AC-x.x)
   - Functional requirements + priority (P0/P1/P2) + dependencies
   - Non-functional requirements, Data model / API design, Edge cases
8. Validate: every proposal goal → at least one user story
9. Directly generate `spec.md` with real content
10. **Auto complexity assessment**: split spec if multi-capability / > 300 lines; generate design.md if cross-system / major architecture decisions
11. **Auto-run checklist** (Boost checks, / 25): evaluate all artifacts
12. Pass → generate `checklist.md`, prompt /ss-tasks; Fail → fix, re-check

## /ss-tasks

**Steps:**
1. Read frontmatter → check `strategy`
2. Standard: read `proposal.md` as input
   Boost: read `proposal.md` + `spec.md` as input
3. Read `{specDir}/templates/tasks.md` as **structural reference**
4. Break into phased tasks:
   - Phase 1: Infrastructure / setup
   - Phase 2: Core implementation
   - Phase 3: Integration / verification
5. Each task: file paths, dependencies, `[P]` for parallel
6. `follow`: use existing file structure, naming, deps
   `create`: may introduce new structures, explicitly note deviations
7. Granularity: flexible (standard) / < 1h (boost)
8. Checkpoints per phase
9. Boost: validate every spec requirement → at least one task
10. Directly generate `tasks.md` with real content → status 🟢 Ready

## /ss-apply

**Steps:**
1. Read frontmatter → check `strategy`
2. If `follow`: read `context` files → implementation must match project conventions
   If `create`: implement as designed, note any new patterns introduced
3. Read `tasks.md` → parse task list
4. Execute in dependency order, parallelize `[P]` where possible
5. After each task: mark ✅ in `tasks.md`
6. After each phase: checkpoint validation
7. On blockers: pause and report
8. After all tasks done: run `superspec sync <name>` to refresh context.md

## /ss-resume

**For vibe coding after `/ss-apply`.** Restores spec context in a new conversation.

**Steps:**
1. Locate current change folder in `{specDir}/changes/`
2. Run `superspec sync <name>` to collect latest git changes into context.md
3. Read `context.md` only (single file, minimal tokens, contains goals/progress/strategy/input/git changes)
4. Determine behavior mode from `strategy` (follow / create)
5. Report: goals, progress, git changes, affected files
6. **Ask user whether to read additional docs**, list available files, suggest priority:
   - ✅ `tasks.md` (recommended) → `proposal.md` → `spec.md` → `design.md` → `checklist.md` → `clarify.md`
7. Read selected files based on user's choice
8. Ask user: what needs fixing / adjusting?
9. Fix respecting `strategy` (follow = obey conventions / create = explore)
10. After fix: update tasks.md checkbox if applicable
11. Run `superspec sync <name>` to refresh context.md

## /ss-clarify

**Steps:**
1. Read ALL existing artifacts
2. Raise questions: ambiguous reqs, missing edge cases, undefined behaviors, technical constraints, dependencies
3. One question at a time → wait for answer
4. Record in `clarify.md`
5. Propagate answers → update affected artifacts
6. Log which docs updated

## /ss-archive

Run CLI: `superspec archive <name>`.

## /ss-checklist

Quality gate for both modes. Auto-invoked by `/ss-create`; also callable manually.

**Steps:**
1. Read ALL existing artifacts
2. Read `{specDir}/templates/checklist.md` as **structural reference**
3. Determine mode: Standard → Standard checks (/ 10); Boost → Boost checks (/ 25)
4. If checklist.md doesn't exist → directly generate with real evaluation results
5. If checklist.md exists → read and update evaluation results
6. ✅ passing / annotate failures
7. Score + recommendations
8. Fail → report failing items, suggest fixes; Pass → prompt next step

## /ss-status

**Steps:**
1. List `{specDir}/changes/` (excluding archive)
2. Read status markers per artifact
3. Output:

```
| Change | Proposal | Spec | Tasks | Checklist | Status |
|--------|----------|------|-------|-----------|--------|
```

## /ss-lint

**Steps:**
1. Run `superspec lint [name]` or check current change
2. Review output: ✓ ok / ⚠ warn (> target) / ✗ error (> hard limit)
3. If error: suggest splitting into sub-specs

## /ss-validate

**Boost mode recommended.** Checks US/FR/AC cross-references (requires spec.md).

**Steps:**
1. Run `superspec validate [name]` (add `--check-deps` for dependency check)
2. Review cross-reference issues
3. Fix reported issues in corresponding artifacts

## /ss-search <query>

**Steps:**
1. Run `superspec search "<query>"` (add `--archived` to include archives)
2. Optionally filter: `--artifact proposal|spec|tasks|clarify|checklist`

## /ss-link

**Steps:**
1. Run `superspec deps add <name> --on <other>`
2. Verify with `superspec deps list <name>`

## /ss-deps

**Steps:**
1. Run `superspec deps list [name]` to view dependency graph
2. No name → show all changes and their dependencies
