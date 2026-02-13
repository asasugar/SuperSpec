---
title: /ss-archive
description: Archive completed changes
---

# /ss-archive

Archive completed changes.

## Syntax

```
/ss-archive [name]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `[name]` | Change name (optional) |

## Options

| Option | Description |
|--------|-------------|
| `--all` | Archive all changes |

## Examples

```
/ss-archive add-user-auth
/ss-archive --all
```

## AI Behavior

AI will run `superspec archive` to move the change to the archive directory.
