---
title: Best Practices
description: Tips for using SuperSpec effectively
---

# Best Practices

Tips and recommendations for getting the most out of SuperSpec.

## Proposal Writing

### Be Specific

```markdown
# Bad
Add user feature

# Good
Add user registration with email verification,
supporting Google OAuth as alternative login method.
```

### Include Constraints

```markdown
## Constraints
- Must work offline
- Response time < 200ms
- Mobile responsive
```

### Define Scope

```markdown
## In Scope
- User registration
- Email verification
- Password reset

## Out of Scope
- Social login (future phase)
- Two-factor auth (future phase)
```

## Task Management

### Keep Tasks Atomic

```markdown
# Bad
- [ ] Implement user authentication

# Good
- [ ] Create User model
- [ ] Add registration endpoint
- [ ] Add login endpoint
- [ ] Add JWT middleware
```

### Use Consistent Numbering

```markdown
- [ ] 1. Setup database schema
- [ ] 2. Create models
- [ ] 3. Implement API
- [ ] 4. Add tests
```

### Track Progress

```markdown
## Progress
- Total: 8
- Done: 3
- In Progress: 1
- Blocked: 0
```

## Mode Selection

### Standard Mode Checklist

Use Standard Mode if:
- [ ] Change is well-understood
- [ ] Implementation is straightforward
- [ ] No design decisions needed
- [ ] Single developer
- [ ] Quick turnaround needed

### Boost Mode Checklist

Use Boost Mode if:
- [ ] Complex feature
- [ ] Multiple stakeholders
- [ ] Design review required
- [ ] Clear acceptance criteria needed
- [ ] Quality gates important

## Context Management

### Regular Sync

```bash
# After completing a task
/ss-apply 3
superspec sync

# Before breaks
superspec sync

# End of day
superspec sync
```

### Clean Archives

```bash
# Don't let changes pile up
superspec status

# Archive completed work
superspec archive completedFeature
```

## File Organization

### 300-Line Limit

Keep all files under 300 lines:

```bash
# Check file sizes
superspec lint

# Fix violations
# Split large files
# Remove redundant content
```

### Naming Conventions

```
# Changes
camelCase: userAuth, shoppingCart

# Not
kebab-case: user-auth
snake_case: user_auth
```

## Team Collaboration

### Consistent Naming

```bash
# Agree on prefixes
feature/xxx
fix/xxx
refactor/xxx
```

### PR Integration

```markdown
## PR Description Template

### Change
Link to .superspec/changes/xxx/

### Tasks Completed
- [x] Task 1
- [x] Task 2

### Checklist
- [ ] Tests pass
- [ ] Lint clean
- [ ] Docs updated
```

### Review Process

1. Review `proposal.md` first
2. Then `spec.md` (if boost mode)
3. Finally `tasks.md` breakdown

## Common Pitfalls

### Avoid

1. **Skipping proposal** - Don't jump to tasks
2. **Vague requirements** - Be specific
3. **Large tasks** - Keep atomic
4. **Forgetting to sync** - Context lost
5. **Not archiving** - Clutter builds up

### Do

1. **Proposal first** - Think before coding
2. **Clear acceptance criteria** - Know when done
3. **Regular sync** - Preserve context
4. **Archive completed** - Stay organized
5. **Use boost for complex** - Don't underestimate

## Quick Reference

```bash
# Daily workflow
superspec status          # Check status
/ss-resume               # Restore context
/ss-apply N              # Implement task
superspec sync           # Save context
superspec archive xxx    # Archive done

# Weekly cleanup
superspec status         # Review all changes
superspec archive xxx    # Archive completed
superspec lint           # Check file sizes
```

## Next Steps

- [Workflow Guide](/guides/workflow) - Understanding modes
- [FAQ](/faq) - Common questions
