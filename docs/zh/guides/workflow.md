---
title: 工作流详解
description: 深入了解 SuperSpec 的标准模式和增强模式工作流
---

# 工作流详解

SuperSpec 提供两种工作模式来适应不同的开发场景：**标准模式**和**增强模式**。

## 核心流程

```
标准模式:  create (proposal → checklist ✓) → tasks → apply → [vibe: sync → resume] → archive
增强模式:  create -b (proposal → spec → [auto: split? design?] → checklist ✓) → tasks → apply → [vibe: sync → resume] → archive
```

## 标准模式

标准模式适用于简单功能和 bug 修复，生成最少的文档。

### 生成的 Artifacts

- `proposal.md` - 需求 + 技术方案（自含，可直接拆 task）
- `checklist.md` - 质量门 /10
- `tasks.md` - 任务清单

### 使用场景

- 简单的功能添加
- Bug 修复
- 小型重构
- 配置更改

### 工作流示例

```bash
# 1. 在 AI 助手中创建变更（CLI 仅创建文件夹+分支，AI 按需生成 proposal + checklist）
/ss-create fix-login-bug

# 2. 生成任务
/ss-tasks

# 3. 执行任务
/ss-apply

# 4. 归档完成的变更
/ss-archive fix-login-bug
```

## 增强模式 (Boost Mode)

增强模式适用于复杂功能，提供完整的规格文档和质量控制。

### 生成的 Artifacts

- `proposal.md` - 需求背景（Goals, Non-Goals, Impact, Risks, Solution Overview）
- `spec.md` - 需求细节 + 交互（US/FR/AC/Edge Cases）
- `design.md` - 可选，跨系统或重大架构时自动检测生成
- `checklist.md` - 质量门 /25
- `tasks.md` - 任务清单

### 使用场景

- 大型功能开发
- 需要设计评审的变更
- 跨团队协作的功能
- 需要完整文档的项目

### 工作流示例

```bash
# 1. 在 AI 助手中创建变更，使用 -b 标志启用增强模式（CLI 仅创建文件夹+分支，AI 按需生成 proposal → spec → checklist）
/ss-create add-user-auth -b

# 2. 在 AI 助手中生成任务
/ss-tasks

# 3. 执行任务
/ss-apply

# 4. 归档
/ss-archive add-user-auth
```

## 创造模式 (Creative Mode)

创造模式允许 AI 探索新的架构方案，而非严格遵循现有模式。

### 启用方式

```bash
# 创造模式
/ss-create redesign-ui -c

# 增强 + 创造模式
/ss-create new-architecture -b -c
```

### strategy: follow vs create

| 特性 | `follow`（默认） | `create`（`-c`） |
|---|---|---|
| 读取项目规则 | 是，作为**约束** | 是，作为**参考** |
| 架构 | 必须对齐现有架构 | 可以提出替代方案 |
| 文件结构 | 匹配现有模式 | 可以引入新模式 |
| 适用场景 | 常规功能、bug 修复 | 重构、新模块、UX 创新 |

## Artifact 详解

### proposal.md

变更提案文档。标准模式：需求 + 技术方案（自含，可直接拆 task）。增强模式：需求背景（Goals, Non-Goals, Impact, Risks, Solution Overview）。

### spec.md（增强模式）

需求细节 + 交互，包含：
- **用户故事 (US)**: 从用户角度描述功能
- **功能需求 (FR)**: 具体的功能要求
- **验收标准 (AC)**: 功能完成的验收条件

### tasks.md

任务清单文档，包含：
- 分阶段的任务列表
- 每个任务的详细描述
- 并行任务标记 `[P]`

### clarify.md

澄清文档，用于：
- 记录需求澄清
- 记录设计决策
- 记录讨论结论

### checklist.md（两种模式）

质量检查清单，包含：
- 标准模式：proposal 后 /10
- 增强模式：spec 后 /25
- 在 /ss-create 流程中自动调用，也可手动调用

## Artifact 大小限制

为了保持 AI 上下文窗口的高效利用，SuperSpec 对每个 artifact 有大小限制：

| 限制 | 默认值 | 说明 |
|---|---|---|
| 目标行数 | 300 行 | 推荐的最大行数 |
| 硬限制 | 400 行 | 绝对最大行数 |

使用 `lint` 命令检查：

```bash
superspec lint add-user-auth
```

## 下一步

- [上下文恢复](/zh/guides/in-context-learning) - 学习如何在会话间保持上下文
- [最佳实践](/zh/guides/best-practices) - 高效使用 SuperSpec 的技巧
