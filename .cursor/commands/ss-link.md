---
name: /ss-link
id: ss-link
category: SuperSpec
description: Add spec dependency
---
<!-- SUPERSPEC:START -->
**Input Parsing Rules**

From user input, extract: **change name**, **dependency target**.

| Extract | Rule | Example |
|---------|------|---------|
| Change name | First argument or text before `--on` | `/ss-link addAuth --on addDB` → name=`addAuth` |
| Dependency target | `--on <other>`/`depends on <other>`/`→ <other>` → extract target name | `/ss-link addAuth --on addDB`; `/ss-link addAuth depends on addDB` |

**Steps**
1. Parse user input → extract change name and dependency target
2. Run `superspec deps add <name> --on <other>`
3. Verify: `superspec deps list <name>`
<!-- SUPERSPEC:END -->
