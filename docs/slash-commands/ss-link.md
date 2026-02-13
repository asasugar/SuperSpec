---
title: /ss-link
description: Add spec dependency
---

# /ss-link

Add a dependency between changes.

## Syntax

```
/ss-link <name> --on <other>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<name>` | Current change |

## Options

| Option | Description |
|--------|-------------|
| `--on <other>` | Dependent change |

## Example

```
/ss-link add-user-auth --on setup-database
```

This means `add-user-auth` depends on `setup-database`.
