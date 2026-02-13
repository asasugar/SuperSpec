---
name: /ss-resume
id: ss-resume
category: SuperSpec
description: 恢复 spec 上下文（用于 vibe coding）
---
<!-- SUPERSPEC:START -->
**Guardrails**
- 中断后返回工作时使用
- 默认只读 context.md（最小 token），其他文档由用户按需选择

**Steps**
1. 定位当前变更文件夹: `{specDir}/changes/`
2. 运行 `superspec sync <name>` 将最新 git 变更收集到 context.md
3. 读取 `context.md`（单文件，包含：goals、progress、strategy、input、git changes）
4. 根据 context.md 中的 `strategy` 确定行为模式（follow / create）
5. 汇报当前状态：目标、进度、git 变更、受影响文件
6. **询问用户是否需要读取其他文档**，列出变更目录中的可用文件，建议优先级：
   - ✅ `tasks.md`（推荐，了解任务明细和依赖）
   - `proposal.md`（需求和方案回顾）
   - `spec.md`（Boost 模式，需求细节）
   - `design.md`（架构决策）
   - `checklist.md`（质量检查结果）
   - `clarify.md`（历史 Q&A）
7. 根据用户选择读取对应文件
8. 询问用户：需要修复/调整什么？
9. 修复时遵循 `strategy`（follow 遵循规范 / create 可探索新方案）
10. 修复后更新 tasks.md 对应的 checkbox
11. 运行 `superspec sync <name>` 刷新 context.md
<!-- SUPERSPEC:END -->
