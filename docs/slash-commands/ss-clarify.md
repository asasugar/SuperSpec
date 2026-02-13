---
title: /ss-clarify
description: Clarify ambiguity, record decisions
---

# /ss-clarify

Record requirement clarifications and design decisions.

## Syntax

```
/ss-clarify
```

## AI Behavior

After executing this command, AI will:

1. Identify current ambiguities
2. Ask you clarifying questions
3. Record decisions in clarify.md
4. Update related artifacts

## Use Cases

- When requirements are unclear
- When multiple implementation approaches exist
- When important decisions need to be recorded

## Example Interaction

```
You: /ss-clarify

AI: I noticed the following points that need clarification:
    1. How should failed login attempts be handled?
    2. What are the password strength requirements?

    Please answer these questions one by one.

You: 1. Show error message, lock account after 3 failures
    2. At least 8 characters, including upper/lowercase and numbers

AI: Recorded in clarify.md:
    - Login failure handling: Show error, lock after 3 attempts
    - Password requirements: 8+ chars, upper/lowercase + numbers
```
