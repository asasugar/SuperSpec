---
title: Quick Start
description: Get started with SuperSpec in 5 minutes
---

# Quick Start

Get started with SuperSpec in 5 minutes!

## Prerequisites

- Node.js 18.0.0 or higher
- npm, pnpm, or yarn
- An AI coding assistant (Cursor, Claude Code, etc.)

## Installation

```bash
# Using npm
npm install -g @superspec/cli

# Using pnpm (recommended)
pnpm add -g @superspec/cli

# Using yarn
yarn global add @superspec/cli
```

Verify installation:

```bash
superspec --version
```

## Initialize Your Project

Navigate to your project and initialize:

```bash
cd your-project
superspec init
```

This creates:
```
.superspec/
├── AGENTS.md           # AI assistant instructions
├── superspec.config.json   # Configuration file
└── changes/            # Active changes directory
```

## Your First Change

### 1. Create a Change

```bash
superspec create addUserAuth
```

This generates:
```
.superspec/changes/addUserAuth/
├── proposal.md    # Feature proposal
└── tasks.md       # Task checklist
```

### 2. Edit Proposal

Open `proposal.md` and describe your feature:

```markdown
# Proposal: addUserAuth

## Overview
Add user authentication with JWT tokens.

## Goals
1. User registration
2. User login
3. Token-based authentication

## Approach
- Use bcrypt for password hashing
- JWT for session management
- Middleware for protected routes
```

### 3. Generate Tasks

In your AI assistant:

```
/ss-tasks
```

The AI will read your proposal and generate tasks in `tasks.md`.

### 4. Implement Tasks

Execute tasks one by one:

```
/ss-apply 1
```

The AI will implement task 1 and mark it complete.

### 5. Archive When Done

```bash
superspec archive addUserAuth
```

This moves the change to `.superspec/archive/` for future reference.

## Workflow Summary

```
create → edit proposal → /ss-tasks → /ss-apply → archive
```

That's it! You've completed your first spec-driven development cycle.

## Next Steps

- [Workflow Guide](/guides/workflow) - Learn about Standard and Boost modes
- [In-Content Learning](/guides/in-content-learning) - Context preservation across sessions
- [CLI Reference](/cli/) - All available commands
