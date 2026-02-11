---
description: SuperSpec - Spec-driven development slash commands
globs: ["**/*"]
alwaysApply: true
---

# SuperSpec Slash Commands

> Principles, rules, config, workflow are defined in AGENTS.md (already in your context).
> This file only adds slash command execution details. Do not duplicate AGENTS.md content.

---

## /ss:new <name>

Run CLI: `superspec new <name>` (add `-b` for boost mode).

## /ss:proposal

**Steps:**
1. Locate current change → read `{specDir}/changes/<name>/proposal.md`
2. Collect from user: Background, Goals, Solution overview, Impact scope
3. Apply First Principles (brevity, intent-focused, required sections)
4. Write `proposal.md` → status 🟢 Ready

## /ss:spec

**Steps:**
1. Read `proposal.md` as input
2. Read `{specDir}/changes/<name>/spec.md` template
3. Generate:
   - User stories + acceptance criteria (AC-x.x)
   - Functional requirements + priority (P0/P1/P2) + dependencies
   - Non-functional requirements
   - Data model / API design (if applicable)
   - Edge cases
4. Validate: every proposal goal → at least one user story
5. Write `spec.md` → status 🟢 Ready

## /ss:tasks

**Steps:**
1. Read `proposal.md` + `spec.md` as input
2. Read `{specDir}/changes/<name>/tasks.md` template
3. Break into phased tasks:
   - Phase 1: Infrastructure / setup
   - Phase 2: Core implementation
   - Phase 3: Integration / verification
4. Each task: file paths, dependencies, `[P]` for parallel
5. Granularity: < 2h (standard) / < 1h (boost)
6. Checkpoints per phase
7. Validate: every spec requirement → at least one task
8. Write `tasks.md` → status 🟢 Ready

## /ss:clarify

**Steps:**
1. Read ALL existing artifacts
2. Raise questions: ambiguous reqs, missing edge cases, undefined behaviors, technical constraints, dependencies
3. One question at a time → wait for answer
4. Record in `clarify.md`
5. Propagate answers → update affected artifacts
6. Log which docs updated

## /ss:apply

**Steps:**
1. Read `tasks.md` → parse task list
2. Execute in dependency order, parallelize `[P]` where possible
3. After each task: mark ✅ in `tasks.md`
4. After each phase: checkpoint validation
5. On blockers: pause and report

## /ss:ff

**Steps:**
1. Confirm goals and scope with user
2. Generate: proposal → spec → tasks (+ checklist if boost)
3. Output summary

## /ss:archive

Run CLI: `superspec archive <name>`.

## /ss:checklist

Boost mode only.

**Steps:**
1. Read ALL artifacts
2. Evaluate checklist items: requirements completeness, proposal quality, spec consistency, task executability, cross-validation, implementation readiness
3. ✅ passing / annotate failures
4. Score (X / 25) + recommendations

## /ss:status

**Steps:**
1. List `{specDir}/changes/` (excluding archive)
2. Read status markers per artifact
3. Output:

```
| Change | Proposal | Spec | Tasks | Clarify | Checklist | Status |
|--------|----------|------|-------|---------|-----------|--------|
```

---

## Boost Mode

| Aspect | Standard | Boost |
|--------|----------|-------|
| Artifacts | proposal, spec, tasks | + checklist |
| Task granularity | < 2h | < 1h |
| Cross-validation | Manual | Auto after each artifact |
| `/ss:checklist` | Unavailable | Available |
| Edge cases | Basic | Comprehensive |
