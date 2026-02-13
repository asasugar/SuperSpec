---
title: /ss-validate
description: 交叉引用一致性检查
---

# /ss-validate

验证 artifact 的交叉引用一致性。

## 语法

```
/ss-validate [name]
```

## 参数

| 参数 | 说明 |
|------|------|
| `[name]` | 变更名称（可选） |

## 选项

| 选项 | 说明 |
|------|------|
| `--check-deps` | 同时检查依赖一致性 |

## AI 行为

AI 会运行 `superspec validate` 检查：

- US ↔ FR 对应关系
- FR ↔ AC 对应关系
- AC ↔ tasks 对应关系
- 依赖关系（如启用）

## 示例

```
/ss-validate
/ss-validate add-user-auth
/ss-validate --check-deps
```
