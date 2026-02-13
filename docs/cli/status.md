---
title: superspec status
description: 查看所有变更状态
---

# superspec status

查看所有活跃变更及其 artifact 状态。

## 语法

```bash
superspec status
```

## 相关命令

```bash
# 列出变更名称（用于脚本）
superspec list [options]
```

### list 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `--archived` | 包含已归档的变更 | `false` |

## 示例

### 查看状态

```bash
superspec status
```

### 列出变更名称

```bash
# 只列出活跃变更
superspec list

# 包含归档
superspec list --archived
```

## 输出示例

### status 输出

```
◆ 活跃变更
──────────────────────────────────────────────────

add-user-auth (增强模式)
  proposal.md   ✓ Ready
  spec.md       ✓ Ready
  design.md     ○ Draft
  tasks.md      ✓ Ready
  checklist.md  ○ Draft
  依赖: setup-database

fix-login-bug (标准模式)
  proposal.md   ✓ Ready
  tasks.md      ◐ In Progress

update-dashboard (标准模式)
  proposal.md   ○ Draft

──────────────────────────────────────────────────
3 个活跃变更
```

### list 输出

```
add-user-auth
fix-login-bug
update-dashboard
```

## 状态说明

| 状态 | 符号 | 说明 |
|------|------|------|
| Draft | ○ | 草稿，刚创建或未完成 |
| In Progress | ◐ | 进行中 |
| Ready | ✓ | 就绪，内容已完成 |
| Done | ✓✓ | 完成，已验证 |

## 在脚本中使用

```bash
# 遍历所有变更
for change in $(superspec list); do
  echo "Processing: $change"
  superspec lint "$change"
done

# 检查是否有活跃变更
if [ -n "$(superspec list)" ]; then
  echo "有活跃变更"
fi
```

## 配合其他命令

```bash
# 查看状态后检查质量
superspec status
superspec lint
superspec validate

# 批量归档
superspec list | xargs -I {} superspec archive {}
```
