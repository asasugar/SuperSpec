---
name: /ss-unlink
id: ss-unlink
category: SuperSpec
description: 移除 spec 依赖
---
<!-- SUPERSPEC:START -->
**输入解析规则**

从用户输入中提取：**变更名称**、**要移除的依赖目标**。

| 提取项 | 规则 | 示例 |
|--------|------|------|
| 变更名称 | 第一个参数或 `--on` 之前的文本 | `/ss-unlink addAuth --on addDB` → name=`addAuth` |
| 依赖目标 | `--on <other>`/`不再依赖 <other>`/`移除 <other>` → 提取目标名 | `/ss-unlink addAuth --on addDB`; `/ss-unlink addAuth 不再依赖 addDB` |

**Steps**
1. 解析用户输入 → 提取变更名称和要移除的依赖目标
2. 运行 `superspec deps remove <name> --on <other>`
3. 验证: `superspec deps list <name>`
<!-- SUPERSPEC:END -->
