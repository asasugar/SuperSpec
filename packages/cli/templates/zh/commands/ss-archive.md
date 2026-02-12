---
name: /ss-archive
id: ss-archive
category: SuperSpec
description: 归档已完成的变更
---
<!-- SUPERSPEC:START -->
**输入解析规则**

从用户输入中提取：**变更名称**或**全部标志**。

| 提取项 | 规则 | 示例 |
|--------|------|------|
| 变更名称 | 移除标志后的剩余文本；为空时使用当前活跃变更 | `/ss-archive addUserAuth` → name=`addUserAuth` |
| 归档全部 | `--all`/`全部`/`所有` → 添加 `--all` | `/ss-archive --all`; `/ss-archive 全部` |

**Guardrails**
- 只有所有任务都 COMPLETE 后才能归档
- 归档前确保测试通过

**Steps**
1. 解析用户输入 → 提取变更名称或 `--all` 标志
2. 确认 tasks.md 中所有任务都标记为 COMPLETE
3. 运行 `superspec archive <name>` 或 `superspec archive --all`
<!-- SUPERSPEC:END -->
