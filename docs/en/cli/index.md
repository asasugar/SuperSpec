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
| [`init`](/en/cli/init) | Initialize SuperSpec in project |
| [`update`](/en/cli/update) | Refresh agent instructions and templates |

### Core Workflow

| Command | Description |
|---------|-------------|
| [`create`](/en/cli/create) | Create change and generate proposal |
| [`archive`](/en/cli/archive) | Archive completed changes |

### Quality & Validation

| Command | Description |
|---------|-------------|
| [`lint`](/en/cli/lint) | Check artifact line counts |
| [`validate`](/en/cli/validate) | Cross-validate artifact consistency |

### Search & Discovery

| Command | Description |
|---------|-------------|
| [`search`](/en/cli/search) | Full-text search changes |
| [`status`](/en/cli/status) | View all change statuses |

### Dependency Management

| Command | Description |
|---------|-------------|
| [`deps list`](/en/cli/deps) | View dependencies |
| [`deps add`](/en/cli/deps) | Add spec dependency |
| [`deps remove`](/en/cli/deps) | Remove spec dependency |

### Vibe Coding

| Command | Description |
|---------|-------------|
| [`sync`](/en/cli/sync) | Sync git changes to context.md |

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

CLI commands read `superspec.config.json`. See [Configuration Reference](/en/api/configuration).
