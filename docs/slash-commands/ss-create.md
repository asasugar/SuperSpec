---
title: /ss-create
description: Create a change and generate proposal
---

# /ss-create

Create a change directory and generate a proposal template.

## Syntax

```
/ss-create <feature> [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<feature>` | Feature name / change description |

## Options

| Option | Description |
|--------|-------------|
| `-b` | Boost mode |
| `-c` | Creative mode |
| `-d <desc>` | Change description |
| `--no-branch` | Don't create git branch |
| `--spec-dir <dir>` | Custom spec directory |
| `--branch-prefix <prefix>` | Branch prefix |
| `--branch-template <tpl>` | Branch name template |
| `--change-name-template <tpl>` | Folder name template |
| `--intent-type <type>` | Intent type |
| `--user <user>` or `@user` | Developer identifier |
| `--lang <lang>` | Document language |

## Examples

### Basic Usage

```
/ss-create add-dark-mode
```

### Boost Mode

```
/ss-create add-user-auth -b
```

### With Description

```
/ss-create add-auth -d "OAuth2 login with Google and GitHub"
```

### Specify Developer

```
/ss-create add-feature @jay
```

### Full Example

```
/ss-create add-user-auth -b -d "Implement user authentication" --intent-type feature @jay
```

## AI Behavior

After executing this command, AI will:

1. Run `superspec create <feature> [options]`
2. Generate proposal.md (Boost mode also generates spec.md, etc.)
3. Wait for you to confirm proposal content
4. Suggest next steps

## Next Steps

After creation, continue with:

```
/ss-tasks    # Generate task checklist
```
