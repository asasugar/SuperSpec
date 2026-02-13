---
title: Artifacts 概念
description: 理解 SuperSpec 中的 Artifact 体系
---

# Artifacts 概念

Artifact 是 SuperSpec 工作流中的核心文档单元。理解 artifact 的设计理念有助于更好地使用工具。

## 什么是 Artifact？

Artifact（制品）是 SuperSpec 生成和管理的结构化文档。每个 artifact 服务于特定目的，共同构成完整的规格文档体系。

## Artifact 的设计原则

### 1. 单一职责

每个 artifact 只做一件事：

| Artifact | 职责 |
|----------|------|
| proposal | 标准：需求+技术方案；增强：需求背景 |
| spec | 需求细节 + 交互（US/FR/AC） |
| design | 技术设计（可选） |
| tasks | 可执行任务 |
| checklist | 质量门（两种模式：/10 或 /25） |
| clarify | 决策记录 |
| context | 上下文恢复 |

### 2. 可独立理解

每个 artifact 应该能独立阅读和理解，不需要频繁跳转到其他文档。

### 3. 交叉引用

artifact 之间通过引用关联，形成追溯链：

```
proposal → spec → tasks
    └→ US → FR → AC → task
```

### 4. 大小限制

每个 artifact 控制在 300-400 行，优化 AI 上下文利用。

## Artifact 生命周期

```
创建 → 编辑 → 验证 → 归档
 │       │       │       │
Draft  Ready   Done  Archived
```

### 状态说明

| 状态 | 说明 |
|------|------|
| Draft | 初始状态，内容未完成 |
| Ready | 内容已完成，待实现 |
| Done | 实现完成，已验证 |
| Archived | 已归档 |

## Artifact 间关系

```
                proposal.md
                     │
           ┌─────────┼─────────┐
           │         │         │
           ▼         ▼         ▼
       spec.md   design.md  clarify.md
           │         │
           └────┬────┘
                │
                ▼
            tasks.md
                │
                ▼
          checklist.md
                │
                ▼
           context.md (自动)
```

## 验证机制

### lint

检查 artifact 大小限制：

```bash
superspec lint
```

### validate

验证交叉引用一致性：

```bash
superspec validate --check-deps
```

## Artifact vs 代码注释

| 场景 | 使用 Artifact | 使用代码注释 |
|------|---------------|--------------|
| 为什么做这个功能 | ✓ proposal | |
| 函数做什么 | | ✓ JSDoc |
| 设计决策理由 | ✓ clarify | |
| 复杂算法说明 | | ✓ 行内注释 |
| 验收标准 | ✓ spec | |
| TODO 项 | | ✓ TODO 注释 |

## 最佳实践

### 1. 保持简洁

删除所有非必要内容：

```markdown
# ❌ 冗长
用户认证是现代 Web 应用中非常重要的一个功能...

# ✓ 简洁
## 问题
- API 无认证保护
```

### 2. 使用结构化格式

```markdown
# ❌ 散文
我们需要实现登录功能，用户可以用邮箱登录...

# ✓ 结构化
## 用户故事
作为用户，我想要用邮箱登录，以便访问个人数据
```

### 3. 保持更新

artifact 应该反映当前状态，过时的 artifact 应该更新或删除。

### 4. 善用引用

```markdown
## 任务 1: 实现登录 API
**关联:** AC-1, AC-2

而不是复制 AC 的内容
```
