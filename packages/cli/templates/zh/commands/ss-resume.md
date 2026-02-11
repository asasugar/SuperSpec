---
name: /ss-resume
id: ss-resume
category: SuperSpec
description: 恢复 spec 上下文（用于 vibe coding）
---
<!-- SUPERSPEC:START -->
**Guardrails**
- 中断后返回工作时使用
- 优先读取 context.md（如果存在）

**Steps**
1. 运行 `superspec sync` 将 git 变更收集到 context.md
2. 读取 `{specDir}/changes/<name>/context.md`
3. 读取当前的 proposal.md 和 tasks.md 了解状态
4. 识别未完成的任务并继续执行
<!-- SUPERSPEC:END -->
