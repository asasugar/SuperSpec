---
title: superspec search
description: Full-text search change content
---

# superspec search

Full-text search across all change content.

## Syntax

```bash
superspec search <query> [options]
```

## Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `<query>` | Search keyword or regular expression | Yes |

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--archived` | Include archived changes | `false` |
| `--artifact <type>` | Filter by artifact type | - |
| `--limit <n>` | Maximum number of results | `50` |
| `-E, --regex` | Use regular expression matching | `false` |

### --artifact Option

Supported artifact types:
- `proposal`
- `spec`
- `tasks`
- `clarify`
- `checklist`

## Examples

### Basic Search

```bash
superspec search "authentication"
```

### Include Archives

```bash
superspec search "login" --archived
```

### Filter by Artifact Type

```bash
superspec search "JWT" --artifact spec
superspec search "TODO" --artifact tasks
```

### Use Regular Expressions

```bash
superspec search "user\d+" -E
superspec search "US-[0-9]+" --regex
```

### Limit Results

```bash
superspec search "auth" --limit 10
```

### Combined Usage

```bash
superspec search "OAuth" --archived --artifact spec --limit 20
```

## Output Example

```
◆ 15 results for "authentication"
  add-user-auth/proposal.md:12  Implement user authentication feature
  add-user-auth/spec.md:45  US-1: As a user, I want to log in via authentication
  add-user-auth/tasks.md:8  Task 2: Implement authentication middleware
  fix-auth-bug/proposal.md:5  Fix authentication token expiration issue
  ...
```

## Search Tips

### Exact Phrase

Use quotes to search for exact phrases:

```bash
superspec search "user authentication"
```

### Regular Expression Examples

```bash
# Match US-1, US-2, etc.
superspec search "US-\d+" -E

# Match TODO or FIXME
superspec search "TODO|FIXME" -E

# Match lines starting with "implement"
superspec search "^implement" -E
```

### Quick Lookup

```bash
# Find all tasks
superspec search "Task" --artifact tasks

# Find all user stories
superspec search "As a" --artifact spec
```

## Notes

1. **Case sensitivity**: Case-insensitive by default
2. **Performance**: Use `--limit` to restrict results for large numbers of changes
3. **Archives**: Archives are not searched by default; use `--archived` explicitly
