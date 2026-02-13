---
title: superspec deps
description: 管理 spec 依赖关系
---

# superspec deps

管理变更之间的依赖关系。

## 子命令

| 子命令 | 说明 |
|--------|------|
| `deps list` | 查看依赖关系 |
| `deps add` | 添加依赖 |
| `deps remove` | 移除依赖 |

---

## deps list

查看变更的依赖关系。

### 语法

```bash
superspec deps list [name]
```

### 参数

| 参数 | 说明 | 必需 |
|------|------|------|
| `[name]` | 变更名称 | 否（默认显示所有） |

### 示例

```bash
# 查看特定变更的依赖
superspec deps list add-user-auth

# 查看所有依赖关系
superspec deps list
```

### 输出示例

```
◆ add-user-auth
  → 依赖: setup-database, create-user-model
  ← 被依赖: add-login-page

◆ 依赖图:
setup-database
  └── create-user-model
        └── add-user-auth
              └── add-login-page
```

---

## deps add

添加变更之间的依赖关系。

### 语法

```bash
superspec deps add <name> --on <other>
```

### 参数

| 参数 | 说明 | 必需 |
|------|------|------|
| `<name>` | 当前变更名称 | 是 |

### 选项

| 选项 | 说明 | 必需 |
|------|------|------|
| `--on <other>` | 依赖的变更名称 | 是 |

### 示例

```bash
# add-user-auth 依赖 setup-database
superspec deps add add-user-auth --on setup-database
```

### 效果

这会在 `add-user-auth` 的 proposal.md frontmatter 中添加：

```yaml
---
depends_on:
  - setup-database
---
```

---

## deps remove

移除变更之间的依赖关系。

### 语法

```bash
superspec deps remove <name> --on <other>
```

### 参数

| 参数 | 说明 | 必需 |
|------|------|------|
| `<name>` | 当前变更名称 | 是 |

### 选项

| 选项 | 说明 | 必需 |
|------|------|------|
| `--on <other>` | 要移除的依赖 | 是 |

### 示例

```bash
superspec deps remove add-user-auth --on setup-database
```

---

## 依赖管理最佳实践

### 1. 明确依赖方向

```
A → B 表示 A 依赖 B
即 A 需要 B 先完成
```

### 2. 避免循环依赖

```
❌ A → B → C → A  (循环依赖)
✓  A → B → C      (单向依赖)
```

### 3. 最小化依赖

只添加真正必要的依赖，避免过度耦合。

### 4. 及时更新

完成依赖项后，检查并更新依赖状态。

## 与验证集成

使用 `validate --check-deps` 验证依赖一致性：

```bash
superspec validate add-user-auth --check-deps
```

这会检查：
- 依赖的变更是否存在
- 是否有循环依赖
- 依赖变更的状态
