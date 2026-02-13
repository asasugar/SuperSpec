---
title: superspec lint
description: 检查 artifact 行数是否超限
---

# superspec lint

检查 artifact 行数是否超过配置的限制。

## 语法

```bash
superspec lint [name]
```

## 参数

| 参数 | 说明 | 必需 |
|------|------|------|
| `[name]` | 变更名称 | 否（默认检查所有） |

## 限制说明

SuperSpec 对每个 artifact 有大小限制以优化 AI 上下文窗口：

| 限制类型 | 默认值 | 说明 |
|----------|--------|------|
| 目标行数 | 300 行 | 超过会显示警告 |
| 硬限制 | 400 行 | 超过会显示错误 |

可以在 `superspec.config.json` 中自定义：

```json
{
  "limits": {
    "targetLines": 300,
    "hardLines": 400
  }
}
```

## 示例

### 检查特定变更

```bash
superspec lint add-user-auth
```

### 检查所有活跃变更

```bash
superspec lint
```

## 输出示例

### 全部通过

```
◆ add-user-auth
  ✓ proposal.md: 45 行
  ✓ spec.md: 120 行
  ✓ tasks.md: 80 行
◆ 所有 artifact 均在限制范围内
```

### 有警告

```
◆ add-complex-feature
  ✓ proposal.md: 45 行
  ⚠ spec.md: 320 行 (超过目标 300 行)
  ✓ tasks.md: 80 行
```

### 有错误

```
◆ add-huge-feature
  ✓ proposal.md: 45 行
  ✗ spec.md: 450 行 (超过硬限 400 行)
  ⚠ tasks.md: 350 行 (超过目标 300 行)
```

## 状态说明

| 状态 | 符号 | 含义 |
|------|------|------|
| 通过 | ✓ | 行数在目标限制内 |
| 警告 | ⚠ | 超过目标但未超过硬限 |
| 错误 | ✗ | 超过硬限 |

## 处理超限

当 artifact 超过限制时：

1. **精简内容**: 移除非必要信息
2. **拆分变更**: 将大变更拆分为多个小变更
3. **使用 `/ss-specs`**: 让 AI 自动拆分

## 在 CI 中使用

```yaml
# .github/workflows/spec-lint.yml
- name: Lint specs
  run: superspec lint
```
