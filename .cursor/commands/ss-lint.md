---
name: /ss-lint
id: ss-lint
category: SuperSpec
description: Check artifact line limits
---
<!-- SUPERSPEC:START -->
**Guardrails**
- Target: < 300 lines per artifact
- Hard limit: 400 lines

**Steps**
1. Run `superspec lint [name]`
2. If exceeds limit, split into smaller artifacts
<!-- SUPERSPEC:END -->
