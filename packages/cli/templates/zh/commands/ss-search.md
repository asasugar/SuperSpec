---
name: /ss-search
id: ss-search
category: SuperSpec
description: 全文搜索变更
---
<!-- SUPERSPEC:START -->
**输入解析规则**

从用户输入中提取：**搜索关键词**、**可选标志**。

| 提取项 | 规则 | 示例 |
|--------|------|------|
| 搜索关键词 | 移除标志后的剩余文本 | `/ss-search 用户认证` → query=`用户认证` |
| 包含归档 | `--archived`/`归档`/`包含归档`/`all` → 添加 `--archived` | `/ss-search 认证 --archived`; `/ss-search 认证 归档` |
| 过滤类型 | `--artifact <type>`/`类型:<type>` → 添加 `--artifact <type>`; type: `proposal`/`spec`/`tasks`/`clarify`/`checklist` | `/ss-search 认证 --artifact spec`; `/ss-search 认证 类型:proposal` |

**Steps**
1. 解析用户输入 → 提取搜索关键词和标志
2. 运行 `superspec search "<query>" [--archived] [--artifact <type>]`
<!-- SUPERSPEC:END -->
