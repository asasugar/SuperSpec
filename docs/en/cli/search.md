---
title: superspec search
description: 全文搜索变更内容
---

# superspec search

全文搜索所有变更的内容。

## 语法

```bash
superspec search <query> [options]
```

## 参数

| 参数 | 说明 | 必需 |
|------|------|------|
| `<query>` | 搜索关键词或正则表达式 | 是 |

## 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `--archived` | 包含已归档的变更 | `false` |
| `--artifact <type>` | 按 artifact 类型过滤 | - |
| `--limit <n>` | 最大结果数 | `50` |
| `-E, --regex` | 使用正则表达式匹配 | `false` |

### --artifact 选项

支持的 artifact 类型：
- `proposal`
- `spec`
- `tasks`
- `clarify`
- `checklist`

## 示例

### 基本搜索

```bash
superspec search "authentication"
```

### 包含归档

```bash
superspec search "login" --archived
```

### 按 artifact 类型过滤

```bash
superspec search "JWT" --artifact spec
superspec search "TODO" --artifact tasks
```

### 使用正则表达式

```bash
superspec search "user\d+" -E
superspec search "US-[0-9]+" --regex
```

### 限制结果数量

```bash
superspec search "auth" --limit 10
```

### 组合使用

```bash
superspec search "OAuth" --archived --artifact spec --limit 20
```

## 输出示例

```
◆ 15 条结果，搜索 "authentication"
  add-user-auth/proposal.md:12  实现用户 authentication 功能
  add-user-auth/spec.md:45  US-1: 作为用户，我想要通过 authentication 登录
  add-user-auth/tasks.md:8  任务 2: 实现 authentication 中间件
  fix-auth-bug/proposal.md:5  修复 authentication token 过期问题
  ...
```

## 搜索技巧

### 精确短语

使用引号搜索精确短语：

```bash
superspec search "user authentication"
```

### 正则表达式示例

```bash
# 匹配 US-1, US-2 等
superspec search "US-\d+" -E

# 匹配 TODO 或 FIXME
superspec search "TODO|FIXME" -E

# 匹配以 implement 开头的行
superspec search "^implement" -E
```

### 快速定位

```bash
# 查找所有任务
superspec search "任务" --artifact tasks

# 查找所有用户故事
superspec search "作为用户" --artifact spec
```

## 注意事项

1. **大小写**: 默认不区分大小写
2. **性能**: 大量变更时可用 `--limit` 限制结果
3. **归档**: 默认不搜索归档，需要显式指定 `--archived`
