---
title: Team Workflow
description: Using SuperSpec for team collaboration
---

# Team Workflow

This tutorial covers using SuperSpec for effective team collaboration.

## Collaboration Modes

### Mode 1: Parallel Development

Multiple developers work on different features:

```
Developer A → avatarUpload
Developer B → notificationSystem
Developer C → searchFeature
```

Each developer creates and manages their own changes:

```bash
# Developer A
superspec create avatarUpload

# Developer B
superspec create notificationSystem

# Developer C
superspec create searchFeature
```

### Mode 2: Dependent Development

Features have dependencies:

```
avatarUpload ← userProfile ← dashboard
```

Use dependency management:

```bash
# Create upstream feature
superspec create avatarUpload

# Create dependent feature
superspec create userProfile
superspec deps add userProfile avatarUpload
```

## Workflow

### 1. Spec Review

Review specs before coding:

```bash
# Create change (boost mode)
superspec create newFeature -b

# Write proposal and spec
# ... edit files ...

# Submit for review
git add .superspec/changes/newFeature/
git commit -m "spec: newFeature specification"
git push
```

Team reviews via PR, ensuring:
- Shared understanding
- Feasible approach
- Clear acceptance criteria

### 2. Task Assignment

After spec approval, assign tasks:

```markdown
# Tasks: newFeature

## Task List

- [ ] 1. Database migration @alice
- [ ] 2. Backend API @alice
- [ ] 3. Frontend components @bob
- [ ] 4. Test cases @charlie
```

### 3. Status Sync

Check project status regularly:

```bash
superspec status
```

Output:
```
SuperSpec Status
================

Active Changes:
  newFeature (boost)
    - Total: 4, Done: 1, In Progress: 2

  bugFix123 (standard)
    - Total: 2, Done: 2

Archived: 15
```

### 4. Conflict Handling

When multiple people modify the same change:

```bash
# Pull latest changes
git pull

# If conflicts exist, resolve manually
# tasks.md conflicts are usually status inconsistencies
# Keep the latest task status when merging
```

## Best Practices

### Naming Convention

Use consistent change naming:

```
Features: feature-xxx
Fixes: hotfix-xxx
Refactors: refactor-xxx
```

### Commit Convention

```bash
# Spec documents
git commit -m "spec(newFeature): add specification"

# Task updates
git commit -m "task(newFeature): complete tasks 1-3"

# Archive
git commit -m "archive(newFeature): archive complete"
```

### Branch Strategy

```
main
├── develop
│   ├── feature-<Date>-avatarUpload-<Development>
│   ├── feature-<Date>-notification-<Development>
│   └── hotfix-<Date>-loginBug-<Development>
```

Each change corresponds to a feature branch with specs and code together.

## CI/CD Integration

Add SuperSpec checks in CI:

```yaml
# .github/workflows/superspec.yml
name: SuperSpec Check

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g @superspec/cli
      - run: superspec lint
      - run: superspec validate
```

## Next Steps

- [Complex Feature](/en/tutorials/complex-feature) - Learn Boost mode
- [Configuration](/en/api/configuration) - Team configuration options
