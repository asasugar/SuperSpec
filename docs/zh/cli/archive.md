---
title: superspec archive
description: 归档已完成的变更
---

# superspec archive

归档已完成的变更，将其移动到 archive 目录。

## 语法

```bash
superspec archive [name] [options]
```

## 参数

| 参数 | 说明 | 必需 |
|------|------|------|
| `[name]` | 变更名称 | 否（与 `--all` 二选一） |

## 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `--all` | 归档所有已完成的变更 | `false` |

## 示例

### 归档特定变更

```bash
superspec archive add-user-auth
```

### 归档所有变更

```bash
superspec archive --all
```

## 归档目录结构

归档后，变更会移动到 `superspec/changes/archive/` 目录：

```
superspec/changes/
├── archive/
│   ├── 20240115-add-user-auth/    # 已归档
│   └── 20240110-fix-login-bug/    # 已归档
├── add-new-feature/               # 活跃变更
└── update-dashboard/              # 活跃变更
```

### 日期前缀

默认情况下，归档的变更会添加日期前缀。可以在配置中关闭：

```json
{
  "archive": {
    "datePrefix": false
  }
}
```

## 输出示例

```
◆ 归档变更: add-user-auth
──────────────────────────────────────────────────
✓ add-user-auth → archive/20240115-add-user-auth
◆ 归档完成！
```

## 注意事项

1. **不可逆操作**: 归档是移动操作，不是复制
2. **搜索归档**: 归档后仍可用 `search --archived` 搜索
3. **日期前缀**: 便于按时间排序和识别
