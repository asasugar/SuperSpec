---
name: /ss-lint
id: ss-lint
category: SuperSpec
description: 检查 artifact 大小
---
<!-- SUPERSPEC:START -->
**Guardrails**
- 目标：每个 artifact < 300 行
- 硬限制：400 行

**Steps**
1. 运行 `superspec lint [name]`
2. 如果超出限制，拆分为更小的 artifact
<!-- SUPERSPEC:END -->
