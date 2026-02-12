---
name: /ss-link
id: ss-link
category: SuperSpec
description: 添加 spec 依赖
---
<!-- SUPERSPEC:START -->
**输入解析规则**

从用户输入中提取：**变更名称**、**依赖目标**。

| 提取项 | 规则 | 示例 |
|--------|------|------|
| 变更名称 | 第一个参数或 `--on` 之前的文本 | `/ss-link addAuth --on addDB` → name=`addAuth` |
| 依赖目标 | `--on <other>`/`依赖 <other>`/`→ <other>` → 提取目标名 | `/ss-link addAuth --on addDB`; `/ss-link addAuth 依赖 addDB` |

**Steps**
1. 解析用户输入 → 提取变更名称和依赖目标
2. 运行 `superspec deps add <name> --on <other>`
3. 验证: `superspec deps list <name>`
<!-- SUPERSPEC:END -->
