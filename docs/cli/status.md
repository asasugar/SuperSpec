---
title: superspec status
description: View all change statuses
---

# superspec status

View all active changes and their artifact statuses.

## Syntax

```bash
superspec status
```

## Related Commands

```bash
# List change names (for scripting)
superspec list [options]
```

### list Options

| Option | Description | Default |
|--------|-------------|---------|
| `--archived` | Include archived changes | `false` |

## Examples

### View Status

```bash
superspec status
```

### List Change Names

```bash
# List active changes only
superspec list

# Include archives
superspec list --archived
```

## Output Examples

### status Output

```
◆ Active Changes
──────────────────────────────────────────────────

add-user-auth (Boost mode)
  proposal.md   ✓ Ready
  spec.md       ✓ Ready
  design.md     ○ Draft
  tasks.md      ✓ Ready
  checklist.md  ○ Draft
  Depends on: setup-database

fix-login-bug (Standard mode)
  proposal.md   ✓ Ready
  tasks.md      ◐ In Progress

update-dashboard (Standard mode)
  proposal.md   ○ Draft

──────────────────────────────────────────────────
3 active changes
```

### list Output

```
add-user-auth
fix-login-bug
update-dashboard
```

## Status Descriptions

| Status | Symbol | Description |
|--------|--------|-------------|
| Draft | ○ | Draft, just created or incomplete |
| In Progress | ◐ | In progress |
| Ready | ✓ | Ready, content complete |
| Done | ✓✓ | Done, validated |

## Usage in Scripts

```bash
# Iterate over all changes
for change in $(superspec list); do
  echo "Processing: $change"
  superspec lint "$change"
done

# Check if there are active changes
if [ -n "$(superspec list)" ]; then
  echo "Active changes exist"
fi
```

## Combining with Other Commands

```bash
# Check status then verify quality
superspec status
superspec lint
superspec validate

# Batch archive
superspec list | xargs -I {} superspec archive {}
```
