---
title: /ss-status
description: View all change statuses
---

# /ss-status

View all active changes and their statuses.

## Syntax

```
/ss-status
```

## AI Behavior

AI will run `superspec status` to display the status of all changes.

## Output Example

```
◆ Active Changes

add-user-auth (Boost mode)
  proposal.md   ✓ Ready
  spec.md       ✓ Ready
  tasks.md      ◐ In Progress

fix-login-bug (Standard mode)
  proposal.md   ✓ Ready
  tasks.md      ○ Draft

3 active changes
```
