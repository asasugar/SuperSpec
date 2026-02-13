---
title: superspec create
description: Create a change and generate a proposal template
---

# superspec create

Create a change directory and generate a proposal template. This is the first step to start a new feature or fix.

## Syntax

```bash
superspec create <feature> [options]
```

## Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `<feature>` | Change name / feature description | Yes |

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `-b, --boost` | Boost mode | `false` |
| `-c, --creative` | Creative mode | `false` |
| `-d, --description <desc>` | Change description | - |
| `--spec-dir <dir>` | Custom spec directory | Config value |
| `--no-branch` | Don't create git branch | `false` |
| `--intent-type <type>` | Intent type | - |
| `--branch-prefix <prefix>` | Branch prefix | Config value |
| `--branch-template <tpl>` | Branch name template | Config value |
| `--change-name-template <tpl>` | Folder name template | Config value |
| `--user <user>` | Developer identifier | - |
| `--lang <lang>` | SDD document language | - |

### --intent-type Option

Supported intent types:
- `feature` - New feature
- `hotfix` - Hotfix
- `bugfix` - Bug fix
- `refactor` - Refactoring
- `chore` - Chore

### Template Variables

Branch template and folder name template support the following variables:
- `{prefix}` - Branch prefix
- `{intentType}` - Intent type
- `{feature}` - Feature name
- `{date}` - Date (YYYYMMDD)
- `{user}` - Developer identifier

## Examples

### Standard Mode

```bash
superspec create add-dark-mode
```

Generates:
- `proposal.md`

### Boost Mode

```bash
superspec create add-user-auth -b
```

Generates:
- `proposal.md`
- `spec.md`
- `design.md`
- `tasks.md`
- `checklist.md`

### Creative Mode

```bash
superspec create redesign-ui -c
```

### Boost + Creative Mode

```bash
superspec create new-architecture -b -c
```

### With Description

```bash
superspec create add-auth -d "OAuth2 integration with Google and GitHub login"
```

### Without Branch Creation

```bash
superspec create add-feature --no-branch
```

### Custom Branch

```bash
# Custom prefix
superspec create add-auth --branch-prefix feature/

# Custom template
superspec create add-auth --branch-template "{prefix}{date}-{feature}-{user}"

# Specify intent type and user
superspec create add-auth --intent-type feature --user jay
```

### Custom Folder Name

```bash
superspec create add-auth --change-name-template "{date}-{feature}-{user}"
```

## Created Files

### Standard Mode

```
superspec/changes/<name>/
└── proposal.md
```

### Boost Mode

```
superspec/changes/<name>/
├── proposal.md
├── spec.md
├── design.md
├── tasks.md
└── checklist.md
```

## Output Example

```
╭────────────────────────────────────────────────╮
  Creating change: feature-20240115-add-auth-jay
╰────────────────────────────────────────────────╯

Intent type: feature
⚡ Boost mode enabled

◆ Generating Artifacts
──────────────────────────────────────────────────
✓ proposal.md
✓ spec.md
✓ design.md
✓ tasks.md
✓ checklist.md
✓ Branch: feature/feature-20240115-add-auth-jay

✨ Change created successfully!
Path: superspec/changes/feature-20240115-add-auth-jay/
Workflow: /ss-create → /ss-tasks → /ss-apply (boost)
Next step: superspec lint feature-20240115-add-auth-jay
```

## Notes

1. **Change already exists**: If a change with the same name exists, the command shows a warning and exits
2. **Git branch**: A git branch is created by default; use `--no-branch` to skip
3. **Template language**: Use `--lang` to override the language setting in the configuration file
