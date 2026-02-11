---
name: /ss-create
id: ss-create
category: SuperSpec
description: 创建变更 + 生成 proposal（boost 模式额外生成 spec + checklist）
---
<!-- SUPERSPEC:START -->
**Guardrails**
- 首先读取 `superspec.config.json` 获取 `lang`, `specDir`, `boost`, `strategy`, `context`
- 检查 `{specDir}/changes/` 中现有变更，避免重复
- 永远不要手动创建变更文件夹 —— 使用 `superspec create <name>` CLI
- 在提案阶段不要编写任何代码，只创建设计文档

**Steps**
1. 运行 `superspec create <name> [-b] [-c] [-d <description>]` 创建变更结构
2. 如果是 boost 模式 (-b)，额外生成 spec.md 和 checklist.md
3. 读取生成的 proposal.md 理解变更范围
4. 等待用户确认后再继续 /ss-tasks
<!-- SUPERSPEC:END -->
