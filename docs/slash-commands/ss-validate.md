---
title: /ss-validate
description: Cross-reference consistency check
---

# /ss-validate

Validate cross-reference consistency of artifacts.

## Syntax

```
/ss-validate [name]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[name]` | Change name (optional) |

## Options

| Option | Description |
|--------|-------------|
| `--check-deps` | Also check dependency consistency |

## AI Behavior

AI will run `superspec validate` to check:

- US ↔ FR correspondence
- FR ↔ AC correspondence
- AC ↔ tasks correspondence
- Dependencies (if enabled)

## Examples

```
/ss-validate
/ss-validate add-user-auth
/ss-validate --check-deps
```
