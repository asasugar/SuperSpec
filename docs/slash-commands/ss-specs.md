---
title: /ss-specs
description: Auto-split large specs
---

# /ss-specs

Automatically split specs into multiple smaller specs when they become too large.

## Syntax

```
/ss-specs
```

## AI Behavior

After executing this command, AI will:

1. Check current spec size
2. Identify splittable boundaries
3. Suggest a split plan
4. Create multiple sub-changes

## Use Cases

- spec.md exceeds 400 lines
- Feature scope too large
- Need phased delivery

## Example

```
You: /ss-specs

AI: spec.md is currently 450 lines, suggesting split into:
    1. add-user-auth-core (200 lines)
       - Core authentication logic
    2. add-user-auth-oauth (150 lines)
       - OAuth integration
    3. add-user-auth-2fa (100 lines)
       - Two-factor authentication

    Confirm split?
```

## Split Principles

- Each sub-spec < 300 lines
- Maintain functional cohesion
- Clear dependency relationships
- Independently deliverable
