---
title: /ss-checklist
description: Quality gate check (Boost mode)
---

# /ss-checklist

Execute quality gate checks to ensure changes meet quality standards.

## Syntax

```
/ss-checklist
```

## Applicable Mode

Boost mode only.

## AI Behavior

After executing this command, AI will:

1. Read checklist.md
2. Check code quality item by item
3. Report check results
4. Mark passed/failed items

## Check Categories

- Code quality
- Test coverage
- Security checks
- Performance requirements
- Documentation completeness

## Example Output

```
◆ Quality Check

Code Quality
  ✓ Code follows coding standards
  ✓ No lint errors
  ✓ No type errors

Testing
  ⚠ Unit test coverage 65% (target 80%)
  ✓ Integration tests pass

Security
  ✓ No hardcoded credentials
  ✓ Input validated

Suggestion: Increase unit test coverage
```

## Next Steps

After checks pass:

```
/ss-apply    # Continue executing tasks
```
