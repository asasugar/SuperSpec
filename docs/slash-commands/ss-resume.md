---
title: /ss-resume
description: Restore spec context
---

# /ss-resume

Restore previous spec context for Vibe Coding.

## Syntax

```
/ss-resume
```

## Arguments

This command has no arguments.

## AI Behavior

After executing this command, AI will:

1. Run `superspec sync` to update context.md
2. Read context.md
3. Read related artifacts (proposal, spec, tasks, etc.)
4. Understand current progress and status
5. Continue work from where it left off

## Use Cases

### Continue in New Conversation

```
# First conversation
/ss-apply
AI: Completed tasks 1, 2, 3...
# Conversation ends

# New conversation
/ss-resume
AI: Restoring context, continuing tasks 4, 5...
```

### After Long Interruption

```
# Morning
/ss-apply
AI: Completed some tasks...
# Go to meeting

# Afternoon
/ss-resume
AI: Continuing unfinished tasks...
```

### Cross-Device

```
# Device A
/ss-apply
git commit && git push

# Device B
git pull
/ss-resume
```

## Restored Content

AI will restore the following context:

- Change overview and goals
- Currently completed tasks
- Pending tasks
- Code changes (git diff)
- Related decisions and clarifications

## Notes

- Ensure code is committed or saved
- If there are conflicts, resolve them before resuming
- context.md is automatically updated
