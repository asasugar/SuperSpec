---
title: /ss-unlink
description: Remove spec dependency
---

# /ss-unlink

Remove a dependency between changes.

## Syntax

```
/ss-unlink <name> --on <other>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<name>` | Current change |

## Options

| Option | Description |
|--------|-------------|
| `--on <other>` | Dependent change to remove |

## Example

```
/ss-unlink add-user-auth --on setup-database
```

Removes `setup-database` from `depends_on` in `proposal.md` for `add-user-auth`.
