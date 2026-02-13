---
title: /ss-deps
description: 查看依赖图
---

# /ss-deps

查看变更的依赖关系。

## 语法

```
/ss-deps [name]
```

## 参数

| 参数 | 说明 |
|------|------|
| `[name]` | 变更名称（可选） |

## 示例

```
/ss-deps
/ss-deps add-user-auth
```

## 输出示例

```
◆ 依赖图:
setup-database
  └── create-user-model
        └── add-user-auth
              └── add-login-page
```
