---
title: Slash Commands
description: Slash commands for AI assistant interaction
---

# Slash Commands

Slash commands are your primary way to interact with AI assistants. Simply type these commands in AI chat.

## Command Overview

### Main Workflow

| Command | Description |
|---------|-------------|
| [`/ss-create`](/en/slash-commands/ss-create) | Create change + generate proposal |
| [`/ss-tasks`](/en/slash-commands/ss-tasks) | Generate task list from proposal |
| [`/ss-apply`](/en/slash-commands/ss-apply) | Execute tasks one by one |
| [`/ss-resume`](/en/slash-commands/ss-resume) | Restore spec context |
| [`/ss-archive`](/en/slash-commands/ss-archive) | Archive completed change |

### Quality & Discovery

| Command | Mode | Description |
|---------|------|-------------|
| [`/ss-clarify`](/en/slash-commands/ss-clarify) | General | Clarify ambiguity, record decisions |
| [`/ss-checklist`](/en/slash-commands/ss-checklist) | Boost | Quality gates before apply |
| [`/ss-lint`](/en/slash-commands/ss-lint) | General | Check artifact size |
| [`/ss-validate`](/en/slash-commands/ss-validate) | Boost | Cross-reference consistency check |
| [`/ss-status`](/en/slash-commands/ss-status) | General | View all change statuses |
| [`/ss-search`](/en/slash-commands/ss-search) | General | Full-text search |
| [`/ss-link`](/en/slash-commands/ss-link) | General | Add spec dependency |
| [`/ss-deps`](/en/slash-commands/ss-deps) | General | View dependency graph |
| [`/ss-specs`](/en/slash-commands/ss-specs) | General | Auto-split large specs |

## Complete Workflow Examples

### Standard Mode

```
You: /ss-create add-dark-mode
AI: Creating change, generating proposal.md

You: /ss-tasks
AI: Reading proposal, generating task list

You: /ss-apply
AI: Executing tasks one by one, marking complete

You: /ss-archive add-dark-mode
AI: Archiving change
```

### Boost Mode

```
You: /ss-create add-user-auth -b
AI: Creating change with proposal + spec + design + tasks + checklist

You: /ss-tasks
AI: Reading proposal and spec, generating detailed tasks

You: /ss-checklist
AI: Checking quality gates

You: /ss-apply
AI: Executing tasks one by one

You: /ss-archive add-user-auth
AI: Archiving change
```

### Implementing tasks

```
# First session
You: /ss-apply
AI: Executing tasks 1, 2, 3...
# Session ends

# New session
You: /ss-resume
AI: Restoring context, continuing tasks 4, 5...
```

## Command Parameter Format

Slash commands support these parameter formats:

### Positional Parameters

```
/ss-create add-dark-mode
```

### Flag Parameters

```
/ss-create add-auth -b
/ss-create add-auth --boost
```

### Key-Value Parameters

```
/ss-create add-auth -d "OAuth2 integration"
/ss-create add-auth --description "OAuth2 integration"
```

### Combined Usage

```
/ss-create add-auth -b -c -d "OAuth2 with Google" --user jay
```

## Tips & Tricks

### 1. Use Description Parameter

Adding description helps AI understand requirements better:

```
/ss-create add-auth -d "Implement OAuth2 login with Google and GitHub"
```

### 2. Specify Developer

Use `@user` identifier in teams:

```
/ss-create add-feature @jay
```

### 3. Use Intent Type

Clear intent helps generate accurate branch names:

```
/ss-create fix-login --intent-type bugfix
```

### 4. Resume After Interruption

Use `/ss-resume` anytime to restore context:

```
/ss-resume
```
