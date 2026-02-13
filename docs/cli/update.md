---
title: superspec update
description: Refresh agent instructions and templates to latest version
---

# superspec update

Refresh agent instructions and templates to the latest version while preserving user configuration.

## Syntax

```bash
superspec update
```

## Options

This command has no additional options.

## Features

The `update` command will:
1. Update `AGENTS.md` to the latest version
2. Update AI editor-specific rule files
3. Update slash command templates
4. Preserve user configuration in `superspec.config.json`

## Example

```bash
superspec update
```

## Output Example

```
◆ Updating Agent Files
──────────────────────────────────────────────────
✓ AGENTS.md
✓ .cursor/rules/superspec.mdc
✓ Command templates updated

✨ Update complete!
```

## When to Use

Recommended to run `update` in these situations:
- After upgrading `@superspec/cli` version
- After switching AI assistant type
- When you want the latest template improvements

## Notes

1. **Configuration preserved**: User's `superspec.config.json` will not be overwritten
2. **Template overwrite**: Templates in `superspec/templates/` may be updated
3. **Custom preservation**: If you've modified templates, consider backing up first
