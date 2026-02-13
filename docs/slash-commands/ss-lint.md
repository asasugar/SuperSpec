---
title: /ss-lint
description: 检查 artifact 大小
---

# /ss-lint

检查 artifact 行数是否超过限制。

## 语法

```
/ss-lint [name]
```

## 参数

| 参数 | 说明 |
|------|------|
| `[name]` | 变更名称（可选） |

## AI 行为

AI 会运行 `superspec lint` 检查 artifact 大小。

## 示例

```
/ss-lint
/ss-lint add-user-auth
```

## 输出示例

```
◆ add-user-auth
  ✓ proposal.md: 45 行
  ⚠ spec.md: 320 行 (超过目标 300 行)
  ✓ tasks.md: 80 行
```
