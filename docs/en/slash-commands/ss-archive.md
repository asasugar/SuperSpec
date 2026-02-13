---
title: /ss-archive
description: 归档已完成的变更
---

# /ss-archive

归档已完成的变更。

## 语法

```
/ss-archive [name]
```

## 参数

| 参数 | 说明 |
|------|------|
| `[name]` | 变更名称（可选） |

## 选项

| 选项 | 说明 |
|------|------|
| `--all` | 归档所有变更 |

## 示例

```
/ss-archive add-user-auth
/ss-archive --all
```

## AI 行为

AI 会运行 `superspec archive` 将变更移动到归档目录。
