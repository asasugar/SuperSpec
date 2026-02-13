---
title: 策略 (Strategy)
description: 理解 follow 和 create 策略的区别
---

# 策略 (Strategy)

策略决定了 AI 助手如何对待项目的现有规则和架构。

## 两种策略

| 策略 | 说明 | 启用方式 |
|------|------|----------|
| `follow` | 遵循项目规则 | 默认 |
| `create` | 可以探索新方案 | `-c` |

## follow 策略（默认）

### 行为

- 读取 `context` 中配置的规则文件
- 将这些规则作为**约束**
- 必须对齐现有架构
- 匹配现有文件结构和模式

### 适用场景

- 常规功能开发
- Bug 修复
- 迭代改进
- 与现有代码集成

### 示例

```bash
superspec create add-search-feature
```

AI 会：
- 参考现有的组件结构
- 使用项目已有的状态管理方案
- 遵循现有的命名约定

## create 策略

### 行为

- 读取 `context` 中配置的规则文件
- 将这些规则作为**参考**（而非约束）
- 可以提出新的架构方案
- 可以引入新的模式

### 适用场景

- 重大重构
- 探索新架构
- 引入新技术
- 创新功能设计

### 示例

```bash
superspec create redesign-state-management -c
```

AI 可能会：
- 建议从 Redux 迁移到 Zustand
- 提出新的文件组织结构
- 引入新的设计模式

## 配置 context 文件

在 `superspec.config.json` 中配置项目规则文件：

```json
{
  "context": [
    ".cursor/rules/coding-style.mdc",
    "AGENTS.md",
    "docs/architecture.md",
    "docs/conventions.md"
  ]
}
```

这些文件会在以下情况被 AI 读取：
- `follow` 策略：作为必须遵守的规则
- `create` 策略：作为了解项目背景的参考

## 策略选择指南

```
需求类型？
    │
    ├─ 常规功能/修复 ──→ follow
    │
    ├─ 小型重构 ──→ follow
    │
    ├─ 大型重构 ──→ create
    │
    ├─ 新模块 ──→ 评估后选择
    │
    └─ 技术探索 ──→ create
```

### 何时使用 follow

- 你希望代码与现有风格一致
- 项目有严格的架构规范
- 团队有明确的技术选型
- 变更范围较小

### 何时使用 create

- 现有方案有明显问题
- 需要技术栈升级
- 探索更好的实现方式
- 重新设计某个模块

## 策略与模式的组合

```
标准模式 + follow  → 常规开发
标准模式 + create  → 轻量级探索
增强模式 + follow  → 复杂功能开发
增强模式 + create  → 重大架构变更
```

## 示例场景

### 场景 1: 添加新页面

使用 `follow`，确保新页面与现有页面结构一致。

```bash
superspec create add-settings-page
```

### 场景 2: 重构认证系统

使用 `create`，允许探索更好的认证方案。

```bash
superspec create redesign-auth-system -b -c
```

### 场景 3: 性能优化

使用 `follow`，在现有架构内优化。

```bash
superspec create optimize-list-rendering
```

### 场景 4: 引入新状态管理

使用 `create`，评估不同方案。

```bash
superspec create evaluate-state-management -c
```

## 记录策略选择

在 proposal.md 的 frontmatter 中记录策略：

```yaml
---
name: redesign-auth
strategy: create
---
```

这有助于团队理解变更的性质和预期范围。
