---
title: Artifacts
description: Understanding the Artifact system in SuperSpec
---

# Artifacts

Artifacts are the core document units in the SuperSpec workflow. Understanding artifact design philosophy helps you use the tool more effectively.

## What is an Artifact?

An artifact is a structured document generated and managed by SuperSpec. Each artifact serves a specific purpose, together forming a complete specification documentation system.

## Artifact Design Principles

### 1. Single Responsibility

Each artifact does one thing:

| Artifact | Responsibility |
|----------|---------------|
| proposal | Standard: requirements + tech solution; Boost: requirements background |
| spec | Requirement details + interactions (US/FR/AC) |
| design | Technical design (optional) |
| tasks | Executable tasks |
| checklist | Quality gates (both modes: /10 or /25) |
| clarify | Decision records |
| context | Context restoration |

### 2. Self-Contained

Each artifact should be readable and understandable on its own, without frequently jumping to other documents.

### 3. Cross-References

Artifacts are linked through references, forming a traceability chain:

```
proposal → spec → tasks
    └→ US → FR → AC → task
```

### 4. Size Limits

Each artifact is limited to 300-400 lines, optimizing AI context utilization.

## Artifact Lifecycle

```
Create → Edit → Validate → Archive
  │       │       │          │
Draft   Ready   Done     Archived
```

### Status Descriptions

| Status | Description |
|--------|-------------|
| Draft | Initial state, content incomplete |
| Ready | Content complete, pending implementation |
| Done | Implementation complete, validated |
| Archived | Archived |

## Artifact Relationships

```
                proposal.md
                     │
           ┌─────────┼─────────┐
           │         │         │
           ▼         ▼         ▼
       spec.md   design.md  clarify.md
           │         │
           └────┬────┘
                │
                ▼
            tasks.md
                │
                ▼
          checklist.md
                │
                ▼
           context.md (auto)
```

## Validation Mechanisms

### lint

Check artifact size limits:

```bash
superspec lint
```

### validate

Verify cross-reference consistency:

```bash
superspec validate --check-deps
```

## Artifacts vs Code Comments

| Scenario | Use Artifact | Use Code Comment |
|----------|-------------|-----------------|
| Why this feature exists | ✓ proposal | |
| What a function does | | ✓ JSDoc |
| Design decision reasoning | ✓ clarify | |
| Complex algorithm explanation | | ✓ Inline comment |
| Acceptance criteria | ✓ spec | |
| TODO items | | ✓ TODO comment |

## Best Practices

### 1. Keep It Concise

Remove all non-essential content:

```markdown
# ❌ Verbose
User authentication is a very important feature in modern web applications...

# ✓ Concise
## Problem
- APIs have no authentication protection
```

### 2. Use Structured Formats

```markdown
# ❌ Prose
We need to implement a login feature where users can log in with email...

# ✓ Structured
## User Story
As a user, I want to log in with email to access my personal data
```

### 3. Keep Updated

Artifacts should reflect the current state. Outdated artifacts should be updated or deleted.

### 4. Use References

```markdown
## Task 1: Implement Login API
**Related:** AC-1, AC-2

Instead of copying AC content
```
