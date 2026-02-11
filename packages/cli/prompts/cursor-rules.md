---
description: SuperSpec - Spec-driven development slash commands
globs: ["**/*"]
alwaysApply: true
---

# SuperSpec Slash Commands

> Principles, rules, config, workflow are defined in AGENTS.md (already in your context).
> This file only adds slash command execution details. Do not duplicate AGENTS.md content.

---

## /ss-create <name>

**CLI:** `superspec create <name>` (`-b` boost, `-c` creative, `--no-branch` skip branch)

**Standard steps:**
1. Run `superspec create <name>` → creates folder + proposal.md + tasks.md templates
2. Read frontmatter → check `strategy`
3. If `follow`: read `context` files → constrain to project patterns
   If `create`: note `context` as awareness only
4. Collect from user: Background, Goals, Solution overview, Impact scope
5. `follow`: solution must align with existing architecture
   `create`: may propose new architecture, must explain trade-offs
6. Apply First Principles (brevity, intent-focused, required sections)
7. Write `proposal.md` → status 🟢 Ready

**Boost additional steps:**
8. Read `proposal.md` → generate spec:
   - User stories + acceptance criteria (AC-x.x)
   - Functional requirements + priority (P0/P1/P2) + dependencies
   - Non-functional requirements, Data model / API design, Edge cases
9. Validate: every proposal goal → at least one user story
10. Write `spec.md` → status 🟢 Ready
11. Write `checklist.md` skeleton

## /ss-tasks

**Steps:**
1. Read frontmatter → check `strategy`
2. Standard: read `proposal.md` as input
   Boost: read `proposal.md` + `spec.md` as input
3. Read `{specDir}/changes/<name>/tasks.md` template
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
10. Write `tasks.md` → status 🟢 Ready

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
8. After all tasks done: run `superspec context <name>` to refresh context.md

## /ss-resume

**For vibe coding after `/ss-apply`.** Restores spec context in a new conversation.

**Steps:**
1. Locate current change folder in `{specDir}/changes/`
2. Run `superspec sync <name>` to collect latest git changes into context.md
3. Read `context.md` (single file, minimal tokens)
4. Cross-reference: Git Changes vs Progress → infer what's done, what's pending, what's unplanned
5. Report: goals, progress, git changes, affected files
6. Ask user: what needs fixing / adjusting?
7. Fix with spec context in mind, respect `strategy`
8. After fix: update tasks.md checkbox if applicable
9. Run `superspec sync <name>` to refresh context.md

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

**Boost mode only.** Quality gate before `/ss-apply`.

**Steps:**
1. Read ALL artifacts
2. Evaluate: requirements completeness, proposal quality, spec consistency, task executability, cross-validation, implementation readiness
3. ✅ passing / annotate failures
4. Score (X / 25) + recommendations
5. Must pass before `/ss-apply`

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
1. Run `superspec link <name> --depends-on <other>`
2. Verify with `superspec deps <name>`

## /ss-deps

**Steps:**
1. Run `superspec deps [name]` to view dependency graph
2. No name → show all changes and their dependencies
