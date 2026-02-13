---
title: CLI Commands
description: SuperSpec CLI command reference
---

# CLI Commands

SuperSpec CLI provides commands for managing spec-driven development workflow.

## Command Overview

### Initialization & Setup

| Command | Description |
|---------|-------------|
| [`init`](/cli/init) | Initialize SuperSpec in project |
| [`update`](/cli/update) | Refresh agent instructions and templates |

### Core Workflow

| Command | Description |
|---------|-------------|
| [`create`](/cli/create) | Create change and generate proposal |
| [`archive`](/cli/archive) | Archive completed changes |

### Quality & Validation

| Command | Description |
|---------|-------------|
| [`lint`](/cli/lint) | Check artifact line counts |
| [`validate`](/cli/validate) | Cross-validate artifact consistency |

### Search & Discovery

| Command | Description |
|---------|-------------|
| [`search`](/cli/search) | Full-text search changes |
| [`status`](/cli/status) | View all change statuses |

### Dependency Management

| Command | Description |
|---------|-------------|
| [`deps list`](/cli/deps) | View dependencies |
| [`deps add`](/cli/deps) | Add spec dependency |
| [`deps remove`](/cli/deps) | Remove spec dependency |

### Vibe Coding

| Command | Description |
|---------|-------------|
| [`sync`](/cli/sync) | Sync git changes to context.md |

## Global Options

All commands support these options:

```bash
superspec --version    # Show version
superspec --help       # Show help
superspec <command> --help    # Show command-specific help
```

## Commands by Usage Frequency

**Daily use:**
- `create` - Start new change
- `status` - View status
- `sync` - Sync context
- `archive` - Archive change

**Regular use:**
- `lint` - Check size limits
- `validate` - Verify consistency
- `search` - Search content

**Occasional use:**
- `init` - Project initialization
- `update` - Update templates
- `deps` - Dependency management

## Commands by Workflow Stage

**Getting Started:**
1. `init` - Initialize project
2. `create` - Create change

**Development:**
3. `lint` - Check limits
4. `validate` - Verify consistency
5. `sync` - Sync context
6. `deps` - Manage dependencies

**Completion:**
7. `archive` - Archive change

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |

## Configuration

CLI commands read `superspec.config.json`. See [Configuration Reference](/api/configuration).
