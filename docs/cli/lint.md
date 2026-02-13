---
title: superspec lint
description: Check artifact line counts against limits
---

# superspec lint

Check whether artifact line counts exceed configured limits.

## Syntax

```bash
superspec lint [name]
```

## Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `[name]` | Change name | No (checks all by default) |

## Limit Details

SuperSpec enforces size limits on each artifact to optimize AI context windows:

| Limit Type | Default | Description |
|------------|---------|-------------|
| Target lines | 300 lines | Shows warning when exceeded |
| Hard limit | 400 lines | Shows error when exceeded |

Customizable in `superspec.config.json`:

```json
{
  "limits": {
    "targetLines": 300,
    "hardLines": 400
  }
}
```

## Examples

### Check a Specific Change

```bash
superspec lint add-user-auth
```

### Check All Active Changes

```bash
superspec lint
```

## Output Examples

### All Passed

```
◆ add-user-auth
  ✓ proposal.md: 45 lines
  ✓ spec.md: 120 lines
  ✓ tasks.md: 80 lines
◆ All artifacts are within limits
```

### With Warnings

```
◆ add-complex-feature
  ✓ proposal.md: 45 lines
  ⚠ spec.md: 320 lines (exceeds target of 300 lines)
  ✓ tasks.md: 80 lines
```

### With Errors

```
◆ add-huge-feature
  ✓ proposal.md: 45 lines
  ✗ spec.md: 450 lines (exceeds hard limit of 400 lines)
  ⚠ tasks.md: 350 lines (exceeds target of 300 lines)
```

## Status Descriptions

| Status | Symbol | Meaning |
|--------|--------|---------|
| Pass | ✓ | Line count within target limit |
| Warning | ⚠ | Exceeds target but within hard limit |
| Error | ✗ | Exceeds hard limit |

## Handling Limit Violations

When an artifact exceeds limits:

1. **Trim content**: Remove non-essential information
2. **Split changes**: Break large changes into multiple smaller ones
3. **Use `/ss-specs`**: Let AI auto-split

## Usage in CI

```yaml
# .github/workflows/spec-lint.yml
- name: Lint specs
  run: superspec lint
```
