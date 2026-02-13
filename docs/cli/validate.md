---
title: superspec validate
description: Cross-validate artifact consistency
---

# superspec validate

Cross-validate artifact consistency, checking US↔FR↔AC↔tasks reference relationships.

## Syntax

```bash
superspec validate [name] [options]
```

## Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `[name]` | Change name | No (validates all by default) |

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--check-deps` | Also check dependency consistency | `false` |

## Validation Content

The `validate` command checks the following consistency:

### 1. Cross-Reference Validation

- User Stories (US) to Functional Requirements (FR) mapping
- Functional Requirements (FR) to Acceptance Criteria (AC) mapping
- Acceptance Criteria (AC) to Tasks mapping

### 2. Metadata Validation

- Frontmatter format correctness
- Required field presence
- Date format correctness

### 3. Dependency Validation (requires `--check-deps`)

- Whether dependent changes exist
- Whether circular dependencies exist
- Whether dependency statuses are correct

## Examples

### Validate a Specific Change

```bash
superspec validate add-user-auth
```

### Validate All Active Changes

```bash
superspec validate
```

### Include Dependency Check

```bash
superspec validate add-user-auth --check-deps
```

## Output Examples

### All Passed

```
◆ add-user-auth
  ✓ All checks passed
✓ All validations passed
```

### Issues Found

```
◆ add-user-auth
  ✗ [spec] US-1 has no corresponding FR
  ⚠ [tasks] Task 3 missing acceptance criteria reference
  ℹ [proposal] Consider adding success criteria
⚠ 3 issues found
```

## Issue Levels

| Level | Symbol | Description |
|-------|--------|-------------|
| Error | ✗ | Must be fixed |
| Warning | ⚠ | Recommended to fix |
| Info | ℹ | Optional improvement suggestion |

## Usage in CI

```yaml
# .github/workflows/spec-validate.yml
- name: Validate specs
  run: superspec validate --check-deps
```

## Best Practices

1. Run `validate` before `archive`
2. Regularly check all active changes
3. Enable `--check-deps` in CI
