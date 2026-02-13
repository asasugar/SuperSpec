---
title: superspec init
description: Initialize SuperSpec in the current project
---

# superspec init

Initialize SuperSpec in the current project, creating configuration files and directory structure.

## Syntax

```bash
superspec init [options]
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--ai <agent>` | AI assistant type | `cursor` |
| `--lang <lang>` | Template language | `en` |
| `--force` | Force overwrite existing configuration | `false` |
| `--no-git` | Skip git initialization | `false` |

### --ai Option

Supported AI assistant types:
- `cursor` - Cursor (default)
- `claude` - Claude Code
- `qwen` - Qwen
- `opencode` - OpenCode
- `codex` - Codex
- `codebuddy` - CodeBuddy
- `qoder` - Qoder

### --lang Option

Supported languages:
- `en` - English (default)
- `zh` - Chinese

## Examples

### Basic Initialization

```bash
superspec init
```

### Chinese Templates

```bash
superspec init --lang zh
```

### Specify AI Assistant

```bash
# Claude Code
superspec init --ai claude

# Qwen
superspec init --ai qwen

# Qoder
superspec init --ai qoder
```

### Force Overwrite

```bash
superspec init --force
```

### Skip git Initialization

```bash
superspec init --no-git
```

### Combined Usage

```bash
superspec init --ai claude --lang zh --force
```

## Created Files

Running `init` creates the following files and directories:

```
your-project/
├── superspec.config.json    # Main configuration file
├── AGENTS.md                # AI Agent general instructions
├── superspec/
│   ├── changes/             # Changes directory
│   └── templates/           # Template files
│       ├── proposal.md
│       ├── spec.md
│       ├── tasks.md
│       ├── clarify.md
│       ├── checklist.md
│       └── design.md
└── .cursor/                 # Cursor-specific (if applicable)
    └── rules/
        └── superspec.mdc
```

## Output Example

```
   ███████╗██╗   ██╗██████╗ ███████╗██████╗ ███████╗██████╗ ███████╗ ██████╗
   ██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝
   ███████╗██║   ██║██████╔╝█████╗  ██████╔╝███████╗██████╔╝█████╗  ██║
   ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗╚════██║██╔═══╝ ██╔══╝  ██║
   ███████║╚██████╔╝██║     ███████╗██║  ██║███████║██║     ███████╗╚██████╗
   ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝ ╚═════╝
  Spec-Driven Development Toolkit

◆ Creating Configuration
──────────────────────────────────────────────────
📄 superspec.config.json

◆ Creating Directory Structure
──────────────────────────────────────────────────
📁 superspec/changes/
📁 superspec/templates/

◆ Installing Templates
──────────────────────────────────────────────────
✓ 6 templates (en)

◆ Installing AI Agent Files
──────────────────────────────────────────────────
✓ AGENTS.md

╭────────────────────────────────────────────────╮
│ Config    → superspec.config.json              │
│ Spec dir  → superspec/                         │
│ AI agent  → cursor                             │
│ Language  → en                                 │
╰────────────────────────────────────────────────╯

✨ SuperSpec initialized successfully!
Next step: superspec create <feature>
```

## Notes

1. **Existing configuration**: If `superspec.config.json` already exists, use `--force` to overwrite
2. **Non-empty directory**: Initializing in a non-empty directory shows a warning; template files merge with existing content
3. **Git repository**: If the directory is not a git repository, `git init` runs automatically (unless `--no-git` is used)
