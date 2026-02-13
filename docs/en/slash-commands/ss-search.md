---
title: /ss-search
description: 全文搜索变更内容
---

# /ss-search

全文搜索所有变更的内容。

## 语法

```
/ss-search <query>
```

## 参数

| 参数 | 说明 |
|------|------|
| `<query>` | 搜索关键词 |

## 选项

| 选项 | 说明 |
|------|------|
| `--archived` | 包含归档 |
| `--artifact <type>` | 按类型过滤 |
| `--limit <n>` | 限制结果数 |
| `-E, --regex` | 使用正则 |

## 示例

```
/ss-search authentication
/ss-search "JWT token" --artifact spec
/ss-search "user\d+" -E
```
