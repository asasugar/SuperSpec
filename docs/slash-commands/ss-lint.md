---
title: /ss-lint
description: Check artifact size
---

# /ss-lint

Check whether artifact line counts exceed limits.

## Syntax

```
/ss-lint [name]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[name]` | Change name (optional) |

## AI Behavior

AI will run `superspec lint` to check artifact sizes.

## Examples

```
/ss-lint
/ss-lint add-user-auth
```

## Output Example

```
◆ add-user-auth
  ✓ proposal.md: 45 lines
  ⚠ spec.md: 320 lines (exceeds target of 300 lines)
  ✓ tasks.md: 80 lines
```
