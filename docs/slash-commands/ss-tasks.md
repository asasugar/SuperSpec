---
title: /ss-tasks
description: Generate task checklist from proposal
---

# /ss-tasks

Generate a phased task checklist from the proposal.

## Syntax

```
/ss-tasks
```

## Arguments

This command has no arguments; it automatically detects the current active change.

## AI Behavior

After executing this command, AI will:

1. Read the current change's proposal.md
2. In Boost mode, also read spec.md
3. Analyze requirements and generate a phased task checklist
4. Write to tasks.md
5. Wait for you to confirm the task list

## Generated Task Characteristics

- Each task < 1 hour of work
- Ordered by dependencies
- Parallel tasks marked with `[P]`
- Linked to acceptance criteria (Boost mode)

## Example Output

```markdown
## Phase 1: Infrastructure

### Task 1.1: Create database model
- Create User model
- Add required fields

### Task 1.2: Create API routes [P]
- Create /auth/login route
- Create /auth/register route

## Phase 2: Business Logic

### Task 2.1: Implement authentication logic
...
```

## Next Steps

After tasks are generated, continue with:

```
/ss-apply    # Execute tasks
```
