---
title: /ss-deps
description: View dependency graph
---

# /ss-deps

View change dependencies.

## Syntax

```
/ss-deps [name]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[name]` | Change name (optional) |

## Examples

```
/ss-deps
/ss-deps add-user-auth
```

## Output Example

```
◆ Dependency Graph:
setup-database
  └── create-user-model
        └── add-user-auth
              └── add-login-page
```
