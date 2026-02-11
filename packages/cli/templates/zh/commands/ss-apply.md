---
name: /ss-apply
id: ss-apply
category: SuperSpec
description: 执行变更任务
---
<!-- SUPERSPEC:START -->
**Guardrails**
- 执行前先读取 tasks.md
- 一次执行一个任务，验证后标记为 COMPLETE
- 每次重大变更后运行测试/检查
- boost 模式下必须先读取 spec 再执行

**Steps**
1. 读取 `{specDir}/changes/<name>/tasks.md`
2. boost 模式下，同时读取 `spec.md` 和 `checklist.md`
3. 对每个任务：更新状态 → 执行 → 验证 → 标记 COMPLETE
4. 所有任务完成后运行完整测试套件
<!-- SUPERSPEC:END -->
