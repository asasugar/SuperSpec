---
title: Your First Spec
description: Create your first SuperSpec specification from scratch
---

# Your First Spec

This tutorial will guide you through creating your first specification document.

## Prerequisites

- Node.js 18+ installed
- SuperSpec CLI installed

```bash
# Verify installation
superspec --version
```

## Scenario

Let's add an **avatar upload feature** to a web application.

## Step 1: Initialize Project

If your project hasn't been initialized with SuperSpec:

```bash
cd your-project
superspec init
```

This creates:
```
.superspec/
├── AGENTS.md           # AI assistant instructions
├── superspec.config.json   # Configuration
└── changes/            # Changes directory
```

## Step 2: Create Change

Use `create` command:

```bash
superspec create avatarUpload
```

Output:
```
✓ Created change: avatarUpload
  └── .superspec/changes/avatarUpload/
      ├── proposal.md
      └── tasks.md
```

## Step 3: Write Proposal

Open `.superspec/changes/avatarUpload/proposal.md`:

```markdown
# Proposal: avatarUpload

## Overview
<!-- Describe this change in one sentence -->

## Background
<!-- Why is this change needed? -->

## Goals
<!-- What should this change achieve? -->

## Approach
<!-- High-level implementation approach -->

## Scope
<!-- What modules/files will be affected? -->
```

Fill in the content:

```markdown
# Proposal: avatarUpload

## Overview
Add avatar upload functionality with cropping and preview.

## Background
Users currently have no avatar feature. Product wants to
increase user engagement and personalization.

## Goals
1. Users can upload images as avatars
2. Support cropping and preview before upload
3. Limit image size and format

## Approach
- Frontend: React + react-image-crop
- Backend: New /api/avatar endpoint
- Storage: Cloud storage (S3/OSS)

## Scope
- Frontend: UserProfile component
- Backend: user.controller.ts, user.service.ts
- Database: Add avatar_url to users table
```

## Step 4: Generate Tasks

Use AI assistant to generate tasks:

```
/ss-tasks
```

AI reads proposal.md and generates tasks.md:

```markdown
# Tasks: avatarUpload

## Task List

- [ ] 1. Database: Add avatar_url column to users table
- [ ] 2. Backend: Create POST /api/avatar endpoint
- [ ] 3. Backend: Image validation (size, format)
- [ ] 4. Backend: Cloud storage upload logic
- [ ] 5. Frontend: AvatarUpload component
- [ ] 6. Frontend: Image cropping functionality
- [ ] 7. Frontend: Preview functionality
- [ ] 8. Frontend: Integrate into UserProfile
- [ ] 9. Testing: API tests
- [ ] 10. Testing: E2E tests

## Progress
- Total: 10
- Done: 0
- In Progress: 0
```

## Step 5: Execute Tasks

Implement tasks one by one using `/ss-apply`:

```
/ss-apply 1
```

AI implements task 1 (database migration) and updates tasks.md:

```markdown
- [x] 1. Database: Add avatar_url column to users table
```

Continue with other tasks...

## Step 6: Archive

When all tasks are complete, archive the change:

```bash
superspec archive avatarUpload
```

This moves the change to `.superspec/archive/` preserving complete history.

## Summary

Through this tutorial, you learned:

1. **Initialize** - `superspec init`
2. **Create** - `superspec create`
3. **Write spec** - Fill in proposal.md
4. **Generate tasks** - `/ss-tasks`
5. **Execute** - `/ss-apply`
6. **Archive** - `superspec archive`

## Next Steps

- [Team Workflow](/en/tutorials/team-workflow) - Team collaboration
- [Complex Feature](/en/tutorials/complex-feature) - Using Boost mode
- [CLI Reference](/en/cli/) - All commands
