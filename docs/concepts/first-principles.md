---
title: First Principles
description: Design principles of SuperSpec
---

# First Principles

SuperSpec is designed around five first principles that guide both the tool's design and user workflow.

## Principle 1: Context Economy

> Keep each artifact within 300 lines, hard limit 400 lines

### Why?

AI context windows are a precious and limited resource. Oversized documents:
- Consume more tokens
- Reduce AI comprehension accuracy
- Increase response time

### Practice

- Use `superspec lint` to check size
- Use `/ss-specs` to split oversized specs
- Prioritize recording decisions over background introductions

---

## Principle 2: Signal-to-Noise Ratio

> Every sentence must provide decision-relevant information

### Why?

Both AI attention and your time are limited. Redundant information:
- Distracts AI attention
- Increases reading burden
- Obscures key information

### Practice

- Remove "obvious" descriptions
- Avoid repeating the same point
- Use lists instead of paragraphs

**Bad example:**
```markdown
User authentication is a very important feature that helps us ensure
only authorized users can access the system. In today's internet
environment, security is becoming increasingly important...
```

**Good example:**
```markdown
## Problem
- Current system has no authentication mechanism
- All APIs can be accessed anonymously

## Solution
- Implement JWT authentication
- Add role-based access control
```

---

## Principle 3: Intent Over Implementation

> Focus on why and what, not how

### Why?

Specification documents should guide AI and developers, not replace code:
- AI excels at implementation details
- Humans excel at defining intent
- Premature implementation details constrain solutions

### Practice

- proposal describes "why it's needed"
- spec describes "what to do"
- Let AI decide "how to do it"

**Bad example:**
```markdown
Create src/auth/middleware.ts file, export an authMiddleware
function, accept a Request object, extract Authorization from header...
```

**Good example:**
```markdown
## Requirements
- API routes need authentication protection
- Support JWT token verification
- Unauthenticated requests return 401
```

---

## Principle 4: Progressive Disclosure

> Start minimal, expand only when needed

### Why?

Not all changes require complete specification documents:
- Simple bug fixes don't need design documents
- Small features don't need user stories
- Only increase documentation as complexity grows

### Practice

- Use Standard mode by default
- Only enable Boost mode (`-b`) when needed
- Add clarifications on demand

**Workflow selection:**
```
Simple fix     → Standard mode
Regular feature → Standard mode
Complex feature → Boost mode
Architecture change → Boost mode + Creative mode
```

---

## Principle 5: Essential Content

> Metadata, problem, solution, success criteria, trade-offs

### Why?

These five elements form a complete decision context:
- **Metadata**: Tracking and management
- **Problem**: Why it needs to be done
- **Solution**: What the plan is
- **Success criteria**: How to know it's done
- **Trade-offs**: What compromises were made

### Practice

Every proposal should contain at least:

```markdown
---
name: xxx
date: xxx
status: draft
---

# Problem
[Why this change is needed]

# Solution
[Proposed solution]

# Success Criteria
- [ ] Measurable goal

# Trade-offs
[Pros and cons of the approach]
```

---

## Summary

| Principle | Core Question | Practice |
|-----------|--------------|----------|
| Context Economy | Is the document too large? | lint, split |
| Signal-to-Noise Ratio | Is every sentence useful? | Trim, use lists |
| Intent Over Implementation | Describing intent or implementation? | Focus on why/what |
| Progressive Disclosure | Is this much really needed? | Expand on demand |
| Essential Content | Are all five elements present? | Checklist |
