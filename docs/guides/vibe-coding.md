---
title: Vibe Coding
description: Maintaining context across AI sessions
---

# Vibe Coding

Vibe Coding is SuperSpec's solution for maintaining context across AI sessions.

## The Problem

AI coding assistants don't remember previous sessions:

```
Session 1: Implemented user authentication
Session 2: AI doesn't know what happened in Session 1
Session 3: Repeat explanations...
```

This leads to:
- Repeated context setup
- Inconsistent decisions
- Wasted time

## The Solution

SuperSpec's `sync` and `resume` commands preserve context:

```bash
# End of session - save context
superspec sync

# Start of new session - restore context
/ss-resume
```

## How It Works

### Sync Command

`superspec sync` creates `context.md` containing:

```markdown
# Context

## Current Change
- Name: userAuth
- Mode: boost
- Status: in_progress

## Git Status
- Modified: src/auth/login.ts
- Added: src/auth/register.ts

## Recent Commits
- feat(auth): add login endpoint
- feat(auth): add user model

## Pending Tasks
- [ ] 4. Add password reset
- [ ] 5. Add email verification
```

### Resume Command

`/ss-resume` tells the AI to read `context.md` and continue where you left off.

## Usage

### Saving Context

Before ending your session:

```bash
superspec sync
```

Or in AI chat:

```
/ss-sync
```

### Restoring Context

Starting a new session:

```
/ss-resume
```

The AI will:
1. Read `context.md`
2. Understand current state
3. Continue with pending tasks

## Best Practices

### Sync Frequently

```bash
# After significant progress
superspec sync

# Before taking a break
superspec sync

# Before switching to another task
superspec sync
```

### Clean Context

Keep context focused:

```bash
# Complete finished changes
superspec archive completedFeature

# Then sync
superspec sync
```

### Verify Resume

After `/ss-resume`, verify the AI understands:

```
/ss-resume

> AI: I see we're working on userAuth.
> We've completed tasks 1-3 and are on task 4 (password reset).
> Should I continue with the implementation?

You: Yes, please continue.
```

## Context.md Structure

```markdown
# Context

## Active Change
Current work focus and status.

## Git Status
Uncommitted changes showing work in progress.

## Recent Activity
What was recently completed.

## Next Steps
What to do next.
```

## Troubleshooting

### Context Too Large

If `context.md` becomes too large:

1. Archive completed changes
2. Commit work in progress
3. Re-run `superspec sync`

### Outdated Context

If context is stale:

```bash
# Regenerate context
superspec sync --force
```

### AI Doesn't Understand

If the AI misinterprets context:

```
The context shows we're working on userAuth,
specifically task 4 about password reset.
Please continue from there.
```

## Next Steps

- [Best Practices](/guides/best-practices) - Efficiency tips
- [CLI Reference](/cli/sync) - sync command details
