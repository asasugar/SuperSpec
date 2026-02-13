---
title: superspec validate
description: 交叉验证 artifact 一致性
---

# superspec validate

交叉验证 artifact 的一致性，检查 US↔FR↔AC↔tasks 的引用关系。

## 语法

```bash
superspec validate [name] [options]
```

## 参数

| 参数 | 说明 | 必需 |
|------|------|------|
| `[name]` | 变更名称 | 否（默认验证所有） |

## 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `--check-deps` | 同时检查依赖一致性 | `false` |

## 验证内容

`validate` 命令检查以下一致性：

### 1. 交叉引用验证

- 用户故事 (US) 与功能需求 (FR) 的对应
- 功能需求 (FR) 与验收标准 (AC) 的对应
- 验收标准 (AC) 与任务 (tasks) 的对应

### 2. 元数据验证

- frontmatter 格式正确性
- 必需字段存在性
- 日期格式正确性

### 3. 依赖验证（需要 `--check-deps`）

- 依赖的变更是否存在
- 是否有循环依赖
- 依赖状态是否正确

## 示例

### 验证特定变更

```bash
superspec validate add-user-auth
```

### 验证所有活跃变更

```bash
superspec validate
```

### 包含依赖检查

```bash
superspec validate add-user-auth --check-deps
```

## 输出示例

### 全部通过

```
◆ add-user-auth
  ✓ 所有检查通过
✓ 所有验证通过
```

### 有问题

```
◆ add-user-auth
  ✗ [spec] US-1 没有对应的 FR
  ⚠ [tasks] 任务 3 缺少验收标准引用
  ℹ [proposal] 建议添加成功标准
⚠ 3 个问题
```

## 问题级别

| 级别 | 符号 | 说明 |
|------|------|------|
| 错误 | ✗ | 必须修复的问题 |
| 警告 | ⚠ | 建议修复的问题 |
| 信息 | ℹ | 可选的改进建议 |

## 在 CI 中使用

```yaml
# .github/workflows/spec-validate.yml
- name: Validate specs
  run: superspec validate --check-deps
```

## 最佳实践

1. 在 `archive` 前运行 `validate`
2. 定期检查所有活跃变更
3. CI 中启用 `--check-deps`
