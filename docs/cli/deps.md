---
title: superspec deps
description: Manage spec dependencies
---

# superspec deps

Manage dependencies between changes.

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `deps list` | View dependencies |
| `deps add` | Add a dependency |
| `deps remove` | Remove a dependency |

---

## deps list

View change dependencies.

### Syntax

```bash
superspec deps list [name]
```

### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `[name]` | Change name | No (shows all by default) |

### Examples

```bash
# View dependencies for a specific change
superspec deps list add-user-auth

# View all dependencies
superspec deps list
```

### Output Example

```
◆ add-user-auth
  → Depends on: setup-database, create-user-model
  ← Depended on by: add-login-page

◆ Dependency Graph:
setup-database
  └── create-user-model
        └── add-user-auth
              └── add-login-page
```

---

## deps add

Add a dependency between changes.

### Syntax

```bash
superspec deps add <name> --on <other>
```

### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `<name>` | Current change name | Yes |

### Options

| Option | Description | Required |
|--------|-------------|----------|
| `--on <other>` | Dependent change name | Yes |

### Example

```bash
# add-user-auth depends on setup-database
superspec deps add add-user-auth --on setup-database
```

### Effect

This adds to the `add-user-auth` proposal.md frontmatter:

```yaml
---
depends_on:
  - setup-database
---
```

---

## deps remove

Remove a dependency between changes.

### Syntax

```bash
superspec deps remove <name> --on <other>
```

### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `<name>` | Current change name | Yes |

### Options

| Option | Description | Required |
|--------|-------------|----------|
| `--on <other>` | Dependency to remove | Yes |

### Example

```bash
superspec deps remove add-user-auth --on setup-database
```

---

## Dependency Management Best Practices

### 1. Clear Dependency Direction

```
A → B means A depends on B
i.e., A requires B to be completed first
```

### 2. Avoid Circular Dependencies

```
❌ A → B → C → A  (circular dependency)
✓  A → B → C      (one-way dependency)
```

### 3. Minimize Dependencies

Only add truly necessary dependencies to avoid excessive coupling.

### 4. Update Promptly

After completing a dependency, check and update dependency status.

## Integration with Validation

Use `validate --check-deps` to verify dependency consistency:

```bash
superspec validate add-user-auth --check-deps
```

This checks:
- Whether dependent changes exist
- Whether circular dependencies exist
- Status of dependent changes
