---
name: /ss-validate
id: ss-validate
category: SuperSpec
description: Cross-reference consistency check (boost mode)
---
<!-- SUPERSPEC:START -->
**Input Parsing Rules**

From user input, extract: **change name**, **optional flags**.

| Extract | Rule | Example |
|---------|------|---------|
| Change name | Remaining text after removing flags; if empty, use current active change | `/ss-validate addUserAuth` → name=`addUserAuth` |
| Check deps | `--check-deps`/`check deps`/`dependencies` → add `--check-deps` | `/ss-validate --check-deps`; `/ss-validate check deps` |

**Guardrails**
- Validate US↔FR↔AC↔tasks consistency
- Only applicable in boost mode

**Steps**
1. Parse user input → extract change name and flags
2. Run `superspec validate [name] [--check-deps]`
3. Fix any consistency errors reported
<!-- SUPERSPEC:END -->
