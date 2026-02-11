---
name: /ss-checklist
id: ss-checklist
category: SuperSpec
description: apply 前的质量门（boost 模式）
---
<!-- SUPERSPEC:START -->
**Guardrails**
- 仅在 boost 模式下适用
- 执行前验证所有质量标准

**Steps**
1. 读取 `{specDir}/changes/<name>/checklist.md`
2. 验证每个检查项
3. 在 /ss-apply 前解决所有失败检查
<!-- SUPERSPEC:END -->
