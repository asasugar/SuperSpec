---
title: Strategy
description: Understanding the difference between follow and create strategies
---

# Strategy

Strategy determines how the AI assistant treats the project's existing rules and architecture.

## Two Strategies

| Strategy | Description | Activation |
|----------|-------------|------------|
| `follow` | Follow project rules | Default |
| `create` | Can explore new approaches | `-c` |

## follow Strategy (Default)

### Behavior

- Reads rule files configured in `context`
- Treats these rules as **constraints**
- Must align with existing architecture
- Matches existing file structure and patterns

### Use Cases

- Regular feature development
- Bug fixes
- Iterative improvements
- Integration with existing code

### Example

```bash
superspec create add-search-feature
```

AI will:
- Reference existing component structure
- Use the project's existing state management approach
- Follow existing naming conventions

## create Strategy

### Behavior

- Reads rule files configured in `context`
- Treats these rules as **references** (not constraints)
- Can propose new architectural approaches
- Can introduce new patterns

### Use Cases

- Major refactoring
- Exploring new architecture
- Introducing new technologies
- Innovative feature design

### Example

```bash
superspec create redesign-state-management -c
```

AI may:
- Suggest migrating from Redux to Zustand
- Propose new file organization structures
- Introduce new design patterns

## Configuring Context Files

Configure project rule files in `superspec.config.json`:

```json
{
  "context": [
    ".cursor/rules/coding-style.mdc",
    "AGENTS.md",
    "docs/architecture.md",
    "docs/conventions.md"
  ]
}
```

These files are read by AI in the following situations:
- `follow` strategy: As mandatory rules to follow
- `create` strategy: As background reference for understanding the project

## Strategy Selection Guide

```
Requirement type?
    │
    ├─ Regular feature/fix ──→ follow
    │
    ├─ Small refactor ──→ follow
    │
    ├─ Major refactor ──→ create
    │
    ├─ New module ──→ Evaluate then choose
    │
    └─ Technical exploration ──→ create
```

### When to Use follow

- You want code consistent with existing style
- Project has strict architectural standards
- Team has clear technology choices
- Change scope is small

### When to Use create

- Existing approach has obvious issues
- Tech stack upgrade needed
- Exploring better implementation approaches
- Redesigning a module

## Strategy and Mode Combinations

```
Standard mode + follow  → Regular development
Standard mode + create  → Lightweight exploration
Boost mode + follow     → Complex feature development
Boost mode + create     → Major architecture changes
```

## Example Scenarios

### Scenario 1: Adding a New Page

Use `follow` to ensure the new page matches existing page structure.

```bash
superspec create add-settings-page
```

### Scenario 2: Refactoring Authentication System

Use `create` to allow exploring better authentication approaches.

```bash
superspec create redesign-auth-system -b -c
```

### Scenario 3: Performance Optimization

Use `follow` to optimize within existing architecture.

```bash
superspec create optimize-list-rendering
```

### Scenario 4: Introducing New State Management

Use `create` to evaluate different approaches.

```bash
superspec create evaluate-state-management -c
```

## How It Works

The `-c` mode has no standalone runtime code. The entire chain passes the strategy value through each step:

```
User -c
  → CLI converts to strategy='create' (log output only, not persisted)
  → AI parses -c flag from user input
  → Writes to proposal.md frontmatter: strategy: create + input: original input
  → Subsequent commands (/ss-tasks, /ss-apply, /ss-resume) read frontmatter
  → Behavior branches: follow (obey conventions) / create (explore freely)
```

**Strategy priority** (highest to lowest):
1. `-c`/`--creative`/`creative` flag in user input
2. `strategy` default in `superspec.config.json`

**Persisted in**: proposal.md frontmatter

```yaml
---
name: redesign-auth
strategy: create
depends_on: []
input: "-c redesign auth system"
---
```

The `input` field records the user's original input, helping subsequent conversations (e.g., `/ss-resume`) restore context and intent.
