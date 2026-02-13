---
title: superspec archive
description: Archive completed changes
---

# superspec archive

Archive completed changes by moving them to the archive directory.

## Syntax

```bash
superspec archive [name] [options]
```

## Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `[name]` | Change name | No (use `--all` alternatively) |

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--all` | Archive all completed changes | `false` |

## Examples

### Archive a Specific Change

```bash
superspec archive add-user-auth
```

### Archive All Changes

```bash
superspec archive --all
```

## Archive Directory Structure

After archiving, changes are moved to the `superspec/changes/archive/` directory:

```
superspec/changes/
├── archive/
│   ├── 20240115-add-user-auth/    # Archived
│   └── 20240110-fix-login-bug/    # Archived
├── add-new-feature/               # Active change
└── update-dashboard/              # Active change
```

### Date Prefix

By default, archived changes get a date prefix. This can be disabled in configuration:

```json
{
  "archive": {
    "datePrefix": false
  }
}
```

## Output Example

```
◆ Archiving change: add-user-auth
──────────────────────────────────────────────────
✓ add-user-auth → archive/20240115-add-user-auth
◆ Archive complete!
```

## Notes

1. **Irreversible operation**: Archive is a move operation, not a copy
2. **Searching archives**: Archived changes can still be searched with `search --archived`
3. **Date prefix**: Helps with chronological sorting and identification
