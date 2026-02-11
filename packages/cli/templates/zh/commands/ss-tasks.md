---
name: /ss-tasks
id: ss-tasks
category: SuperSpec
description: 从 proposal 生成任务清单
---
<!-- SUPERSPEC:START -->
**Guardrails**
- 首先读取 proposal.md（boost 模式下还要读取 spec.md）
- 任务必须小而可验证，可执行（boost 模式下每个任务 < 1 小时）
- 将同一文件的相关变更归为一个任务
- 每个任务包含验证步骤

**Steps**
1. 读取 `{specDir}/changes/<name>/proposal.md`
2. 如果是 boost 模式，同时读取 `spec.md`
3. 生成 tasks.md，包含分阶段的实现步骤
4. 每个任务应包含：清晰描述、文件路径、依赖关系、验证标准
<!-- SUPERSPEC:END -->
