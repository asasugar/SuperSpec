---
title: /ss-link
description: 添加 spec 依赖
---

# /ss-link

添加变更之间的依赖关系。

## 语法

```
/ss-link <name> --on <other>
```

## 参数

| 参数 | 说明 |
|------|------|
| `<name>` | 当前变更 |

## 选项

| 选项 | 说明 |
|------|------|
| `--on <other>` | 依赖的变更 |

## 示例

```
/ss-link add-user-auth --on setup-database
```

表示 `add-user-auth` 依赖 `setup-database`。
