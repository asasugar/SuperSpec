---
name: /ss-archive
id: ss-archive
category: SuperSpec
description: 归档已完成的变更
---
<!-- SUPERSPEC:START -->
**Guardrails**
- 只有所有任务都 COMPLETE 后才能归档
- 归档前确保测试通过

**Steps**
1. 确认 tasks.md 中所有任务都标记为 COMPLETE
2. 运行 `superspec archive <name>` 或 `superspec archive --all`
<!-- SUPERSPEC:END -->
