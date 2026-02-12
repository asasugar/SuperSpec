---
name: /ss-validate
id: ss-validate
category: SuperSpec
description: 交叉引用一致性检查（boost 模式）
---
<!-- SUPERSPEC:START -->
**输入解析规则**

从用户输入中提取：**变更名称**、**可选标志**。

| 提取项 | 规则 | 示例 |
|--------|------|------|
| 变更名称 | 移除标志后的剩余文本；为空时使用当前活跃变更 | `/ss-validate addUserAuth` → name=`addUserAuth` |
| 检查依赖 | `--check-deps`/`检查依赖`/`依赖检查` → 添加 `--check-deps` | `/ss-validate --check-deps`; `/ss-validate 检查依赖` |

**Guardrails**
- 验证 US↔FR↔AC↔tasks 一致性
- 仅在 boost 模式下适用

**Steps**
1. 解析用户输入 → 提取变更名称和标志
2. 运行 `superspec validate [name] [--check-deps]`
3. 修复报告的任何一致性错误
<!-- SUPERSPEC:END -->
