---
title: Configuration Reference
description: Complete reference for superspec.config.json
---

# Configuration Reference

SuperSpec is configured through the `superspec.config.json` file. This document covers all configuration options in detail.

## Configuration File Location

The configuration file is located in the project root:

```
your-project/
└── superspec.config.json
```

## Complete Configuration Example

```json
{
  "lang": "en",
  "aiEditor": "cursor",
  "specDir": "superspec",
  "branchPrefix": "",
  "branchTemplate": "{prefix}{intentType}-{date}-{feature}-{user}",
  "changeNameTemplate": "{prefix}{intentType}-{date}-{feature}-{user}",
  "boost": false,
  "strategy": "follow",
  "context": [
    ".cursor/rules/coding-style.mdc",
    "AGENTS.md",
    "docs/conventions.md"
  ],
  "templates": {
    "spec": "spec.md",
    "proposal": "proposal.md",
    "tasks": "tasks.md",
    "clarify": "clarify.md",
    "checklist": "checklist.md",
    "design": "design.md"
  },
  "archive": {
    "dir": "archive",
    "datePrefix": true
  },
  "limits": {
    "targetLines": 300,
    "hardLines": 400
  },
  "artifacts": ["proposal"],
  "boostArtifacts": ["proposal", "spec", "design", "tasks", "checklist"]
}
```

## Configuration Options

### lang

Language for templates and CLI prompts.

| Value | Description |
|-------|-------------|
| `"en"` | English (default) |
| `"zh"` | Chinese |

```json
{
  "lang": "en"
}
```

### aiEditor

AI editor type, used to install corresponding rules and commands.

| Value | Description |
|-------|-------------|
| `"cursor"` | Cursor (default) |
| `"claude"` | Claude Code |
| `"qwen"` | Qwen |
| `"opencode"` | OpenCode |
| `"codex"` | Codex |
| `"codebuddy"` | CodeBuddy |
| `"qoder"` | Qoder |

```json
{
  "aiEditor": "claude"
}
```

### specDir

Spec directory name.

```json
{
  "specDir": "superspec"
}
```

Directory structure:

```
your-project/
└── superspec/          # specDir
    ├── changes/        # Changes directory
    └── templates/      # Templates directory
```

### branchPrefix

Git branch prefix.

```json
{
  "branchPrefix": ""
}
```

### branchTemplate

Git branch name template.

**Available variables:**
- `{prefix}` - branchPrefix value
- `{intentType}` - Intent type (feature/hotfix/bugfix/refactor/chore)
- `{feature}` - Feature name
- `{date}` - Date (YYYYMMDD)
- `{user}` - Developer identifier

```json
{
  "branchTemplate": "{prefix}{intentType}-{date}-{feature}-{user}"
}
```

**Example output:** `feature-20240115-add-auth-jay`

### changeNameTemplate

Change folder name template. Uses the same variables as `branchTemplate`.

```json
{
  "changeNameTemplate": "{prefix}{intentType}-{date}-{feature}-{user}"
}
```

**Example output:** `feature-20240115-add-auth-jay`

### boost

Whether to enable Boost mode by default.

```json
{
  "boost": false
}
```

### strategy

Default strategy.

| Value | Description |
|-------|-------------|
| `"follow"` | Follow project rules (default) |
| `"create"` | Can propose new approaches |

```json
{
  "strategy": "follow"
}
```

### context

List of project rule files for AI to read.

```json
{
  "context": [
    ".cursor/rules/coding-style.mdc",
    "AGENTS.md",
    "docs/conventions.md"
  ]
}
```

### templates

Template file name mapping.

```json
{
  "templates": {
    "spec": "spec.md",
    "proposal": "proposal.md",
    "tasks": "tasks.md",
    "clarify": "clarify.md",
    "checklist": "checklist.md",
    "design": "design.md"
  }
}
```

### archive

Archive configuration.

| Field | Description | Default |
|-------|-------------|---------|
| `dir` | Archive subdirectory name | `"archive"` |
| `datePrefix` | Whether to add date prefix | `true` |

```json
{
  "archive": {
    "dir": "archive",
    "datePrefix": true
  }
}
```

### limits

Artifact size limits.

| Field | Description | Default |
|-------|-------------|---------|
| `targetLines` | Target maximum line count | `300` |
| `hardLines` | Hard maximum line count | `400` |

```json
{
  "limits": {
    "targetLines": 300,
    "hardLines": 400
  }
}
```

### artifacts

List of artifacts generated in Standard mode.

```json
{
  "artifacts": ["proposal"]
}
```

### boostArtifacts

List of artifacts generated in Boost mode.

```json
{
  "boostArtifacts": ["proposal", "spec", "design", "tasks", "checklist"]
}
```

## Configuration Overrides

Command-line arguments can override configuration file values:

```bash
# Override lang
superspec create add-feature --lang en

# Override boost
superspec create add-feature -b

# Override branchPrefix
superspec create add-feature --branch-prefix hotfix/
```

## Configuration Validation

SuperSpec validates the configuration file at startup:

- Whether JSON format is correct
- Whether field types match
- Whether required fields exist

If the configuration file has issues, a warning is displayed and default values are used.
