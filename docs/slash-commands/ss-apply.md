---
title: /ss-apply
description: Execute tasks one by one
---

# /ss-apply

Execute tasks from tasks.md in order.

## Syntax

```
/ss-apply
```

## Arguments

This command has no arguments.

## AI Behavior

After executing this command, AI will:

1. Read tasks.md
2. Find the first incomplete task
3. Execute the task (write code, modify files, etc.)
4. Mark task as complete
5. Continue to the next task
6. Pause and ask when encountering issues

## Execution Process

```
AI: Starting task 1.1: Create database model
AI: [Making code changes]
AI: Task 1.1 complete

AI: Starting task 1.2: Create API routes
AI: [Making code changes]
AI: Task 1.2 complete

AI: Starting task 2.1: Implement authentication logic
...
```

## Interruption Handling

If you need to interrupt:

1. The current task remains in incomplete status
2. Use `/ss-resume` to restore
3. AI will continue from where it left off

## Next Steps

After all tasks are complete:

```
/ss-archive [name]    # Archive the change
```

If you need to continue after interruption:

```
/ss-resume    # Restore context
```
