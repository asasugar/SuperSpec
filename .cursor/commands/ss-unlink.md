---
name: /ss-unlink
id: ss-unlink
category: SuperSpec
description: Remove spec dependency
---
<!-- SUPERSPEC:START -->
**Input Parsing Rules**

From user input, extract: **change name**, **dependency target to remove**.

| Extract | Rule | Example |
|---------|------|---------|
| Change name | First argument or text before `--on` | `/ss-unlink addAuth --on addDB` → name=`addAuth` |
| Dependency target | `--on <other>`/`no longer depends on <other>`/`remove <other>` → extract target name | `/ss-unlink addAuth --on addDB`; `/ss-unlink addAuth no longer depends on addDB` |

**Steps**
1. Parse user input → extract change name and dependency target to remove
2. Run `superspec deps remove <name> --on <other>`
3. Verify: `superspec deps list <name>`
<!-- SUPERSPEC:END -->
