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

In your AI assistant:

```
/ss-create addUserAuth
```

The CLI creates folder + git branch. AI generates proposal.md (and checklist.md). After checklist passes, proceed to tasks.

### 2. Confirm Proposal

AI generates proposal with requirements + technical solution. Review and confirm.

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
/ss-create → (proposal → checklist ✓) → /ss-tasks → /ss-apply → archive
```

That's it! You've completed your first spec-driven development cycle.

## Next Steps

- [Workflow Guide](/guides/workflow) - Learn about Standard and Boost modes
- [In-Context Learning](/guides/in-context-learning) - Context preservation across sessions
- [CLI Reference](/cli/) - All available commands
