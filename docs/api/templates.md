---
title: Template Reference
description: Complete reference for SuperSpec template files
---

# Template Reference

SuperSpec uses template files to generate various artifacts. This document covers the structure and usage of all templates.

## Template Location

Template files are located in the `superspec/templates/` directory:

```
superspec/
└── templates/
    ├── proposal.md
    ├── spec.md
    ├── tasks.md
    ├── clarify.md
    ├── checklist.md
    └── design.md
```

## Template Variables

All templates support the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{name}}` | Change name | `add-user-auth` |
| `{{date}}` | Creation date | `20240115` |
| `{{boost}}` | Boost mode enabled | `true` / `false` |
| `{{strategy}}` | Strategy | `follow` / `create` |
| `{{description}}` | Change description | `OAuth2 integration` |

---

## proposal.md

Change proposal template, generated for all changes.

### Structure

```markdown
---
name: {{name}}
date: {{date}}
status: draft
boost: {{boost}}
strategy: {{strategy}}
depends_on: []
---

# Change Proposal: {{name}}

## Overview

{{description}}

## Problem

[Describe the current problem or requirement]

## Solution

[Describe the proposed solution]

## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Trade-offs

### Pros

-

### Cons

-

## Risks

-

## Timeline

-
```

### Frontmatter Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Change name |
| `date` | string | Creation date |
| `status` | string | Status (draft/ready/done) |
| `boost` | boolean | Boost mode enabled |
| `strategy` | string | Strategy |
| `depends_on` | array | Dependency list |

---

## spec.md (Boost Mode)

Detailed specification template with user stories, functional requirements, and acceptance criteria.

### Structure

```markdown
---
name: {{name}}
date: {{date}}
status: draft
---

# Specification: {{name}}

## User Stories (US)

### US-1: [Title]

As a [role],
I want to [feature],
So that [benefit].

### US-2: [Title]

...

## Functional Requirements (FR)

### FR-1: [Title]

**Related US:** US-1

[Detailed description]

### FR-2: [Title]

...

## Acceptance Criteria (AC)

### AC-1: [Title]

**Related FR:** FR-1

- [ ] Condition 1
- [ ] Condition 2

### AC-2: [Title]

...

## Non-Functional Requirements

### Performance

-

### Security

-

### Usability

-
```

---

## tasks.md

Task checklist template.

### Structure

```markdown
---
name: {{name}}
date: {{date}}
status: draft
---

# Task Checklist: {{name}}

## Phase 1: [Phase Name]

### Task 1.1: [Task Title]

**Related:** AC-1

- Description: [Task description]
- Estimate: [Time estimate]
- Status: [ ] Not started

### Task 1.2: [Task Title] [P]

**Note:** [P] marker indicates this task can be executed in parallel with the previous task

...

## Phase 2: [Phase Name]

### Task 2.1: [Task Title]

...

## Verification

- [ ] All tasks complete
- [ ] Passes lint check
- [ ] Passes validate check
```

### Parallel Marker

Use `[P]` to mark tasks that can be executed in parallel:

```markdown
### Task 1.1: Create database model
### Task 1.2: Create API routes [P]
### Task 1.3: Create frontend components [P]
```

---

## clarify.md

Clarification record template.

### Structure

```markdown
---
name: {{name}}
date: {{date}}
---

# Clarification Record: {{name}}

## Question 1: [Question Title]

**Date raised:** [Date]

**Question description:**

[Detailed description]

**Decision:**

[Final decision]

**Reasoning:**

[Decision reasoning]

---

## Question 2: [Question Title]

...
```

---

## checklist.md (Boost Mode)

Quality checklist template.

### Structure

```markdown
---
name: {{name}}
date: {{date}}
status: draft
---

# Quality Checklist: {{name}}

## Code Quality

- [ ] Code follows project coding standards
- [ ] No lint errors
- [ ] No TypeScript type errors
- [ ] Code is properly commented

## Testing

- [ ] Unit tests cover key functionality
- [ ] Integration tests pass
- [ ] Edge cases tested

## Security

- [ ] No hardcoded credentials
- [ ] Input validated and sanitized
- [ ] No SQL injection risk
- [ ] No XSS risk

## Performance

- [ ] No obvious performance issues
- [ ] Database queries optimized
- [ ] No memory leaks

## Documentation

- [ ] API documentation updated
- [ ] README updated (if needed)
- [ ] Changelog updated

## Deployment

- [ ] Environment variables configured
- [ ] Database migration prepared
- [ ] Rollback plan prepared
```

---

## design.md (Boost Mode)

Design document template.

### Structure

```markdown
---
name: {{name}}
date: {{date}}
status: draft
---

# Design Document: {{name}}

## Architecture Overview

[High-level architecture description]

## Component Design

### Component 1: [Name]

**Responsibilities:**

-

**Interface:**

```typescript
interface Component1 {
  // ...
}
```

### Component 2: [Name]

...

## Data Model

### Entity 1: [Name]

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| ... | ... | ... |

## API Design

### [POST] /api/resource

**Request:**

```json
{
  "field": "value"
}
```

**Response:**

```json
{
  "id": "...",
  "field": "value"
}
```

## Technology Choices

| Technology | Choice | Reasoning |
|------------|--------|-----------|
| ... | ... | ... |

## Risks and Mitigation

| Risk | Mitigation |
|------|------------|
| ... | ... |
```

## Custom Templates

You can modify templates in `superspec/templates/` to suit your project needs. After modification, newly created changes will use the updated templates.

### Important Notes

1. Keep frontmatter format correct
2. Retain required variable placeholders
3. Running `superspec update` may overwrite templates
