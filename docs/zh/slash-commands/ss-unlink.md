---
title: /ss-unlink
description: 移除 spec 依赖
---

# /ss-unlink

移除变更之间的依赖关系。

## 语法

```
/ss-unlink <name> --on <other>
```

## 参数

| 参数 | 说明 |
|------|------|
| `<name>` | 当前变更 |

## 选项

| 选项 | 说明 |
|------|------|
| `--on <other>` | 要移除的依赖变更 |

## 示例

```
/ss-unlink add-user-auth --on setup-database
```

从 `add-user-auth` 的 `proposal.md` 的 `depends_on` 中移除 `setup-database`。
