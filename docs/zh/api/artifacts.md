---
title: Artifacts 参考
description: SuperSpec Artifacts 详细说明
---

# Artifacts 参考

Artifact 是 SuperSpec 工作流中的核心文档单元。本文档详细介绍每种 artifact 的用途和结构。

## Artifact 概述

| Artifact | 模式 | 用途 |
|----------|------|------|
| proposal.md | 标准/增强 | 变更提案（标准：需求+技术方案；增强：需求背景） |
| spec.md | 增强 | 需求细节 + 交互（US/FR/AC） |
| design.md | 增强 | 设计文档（可选，自动检测） |
| tasks.md | 标准/增强 | 任务清单 |
| checklist.md | 标准/增强 | 质量门（标准：proposal 后 /10；增强：spec 后 /25） |
| clarify.md | 标准/增强 | 澄清记录 |
| context.md | 自动生成 | 上下文恢复 |

## 标准模式 vs 增强模式

CLI `superspec create` 仅创建文件夹和 git 分支。Artifact 由 AI 通过 /ss-create 按需生成。

### 标准模式

```
superspec/changes/<name>/
├── proposal.md     # AI 生成（需求 + 技术方案）
├── checklist.md    # AI 生成（质量门 /10）
├── tasks.md        # AI 通过 /ss-tasks 生成
└── clarify.md      # 按需
```

### 增强模式

```
superspec/changes/<name>/
├── proposal.md     # AI 生成（需求背景）
├── spec.md         # AI 生成（需求细节 + 交互）
├── design.md       # 按需 AI 生成（可选）
├── checklist.md    # AI 生成（质量门 /25）
├── tasks.md        # AI 通过 /ss-tasks 生成
└── clarify.md      # 按需
```

---

## proposal.md

### 用途

**标准模式**：需求 + 技术方案（自含，可直接拆 task）。

**增强模式**：需求背景，描述：
- Goals, Non-Goals
- Impact, Risks
- Solution Overview

### 何时使用

- 开始新功能或修复
- 定义变更范围
- 获取团队认可

### 最佳实践

✅ **应该：**
- 清晰描述问题
- 定义可衡量的成功标准
- 列出关键权衡

❌ **避免：**
- 过多实现细节
- 冗长的背景介绍
- 模糊的成功标准

---

## spec.md（增强模式）

### 用途

需求细节 + 交互，提供：
- 用户故事 (User Stories)
- 功能需求 (Functional Requirements)
- 验收标准 (Acceptance Criteria)

### 结构

```
用户故事 (US)
├── US-1: ...
├── US-2: ...
└── ...

功能需求 (FR)
├── FR-1: ... (关联 US-1)
├── FR-2: ... (关联 US-1, US-2)
└── ...

验收标准 (AC)
├── AC-1: ... (关联 FR-1)
├── AC-2: ... (关联 FR-2)
└── ...
```

### 交叉引用

每个元素都应该有清晰的引用关系：

```
US-1 ←→ FR-1, FR-2 ←→ AC-1, AC-2
```

使用 `validate --check-deps` 验证引用完整性。

---

## design.md（增强模式，可选）

### 用途

技术设计文档（跨系统或重大架构时自动检测生成），包含：
- 架构概述
- 组件设计
- 数据模型
- API 设计
- 技术选型

### 何时使用

- 复杂功能需要设计评审
- 引入新技术或模式
- 跨团队协作

### 最佳实践

✅ **应该：**
- 使用图表说明架构
- 详细定义接口
- 记录技术选型理由

❌ **避免：**
- 复制 spec 内容
- 过于详细的实现代码
- 忽略非功能需求

---

## tasks.md

### 用途

任务清单，将 spec 分解为可执行的任务：
- 分阶段组织
- 每个任务 < 1 小时
- 标记可并行任务

### 任务粒度

每个任务应该：
- 可独立完成
- 有明确的完成条件
- 时间 < 1 小时

### 并行标记

使用 `[P]` 标记可并行任务：

```markdown
### 任务 1: 创建数据库模型
### 任务 2: 创建 API 路由 [P]
### 任务 3: 创建前端组件 [P]
### 任务 4: 集成测试
```

任务 2 和 3 可以与任务 1 并行执行。

---

## checklist.md（两种模式）

### 用途

质量门，确保变更满足质量标准。标准模式：proposal 后 /10。增强模式：spec 后 /25。在 /ss-create 流程中自动调用，也可手动调用。
- 代码质量
- 测试覆盖
- 安全检查
- 性能要求
- 文档完整性

### 何时使用

- 在 `apply` 之前执行 `/ss-checklist`
- 确保所有检查项通过后再归档

---

## clarify.md

### 用途

记录需求澄清和设计决策：
- 提出的问题
- 讨论过程
- 最终决定
- 决策理由

### 何时使用

- 需求不清晰时
- 有多种实现方案时
- 需要记录重要决策时

---

## context.md（自动生成）

### 用途

由 `sync` 命令自动生成，用于上下文恢复：
- 变更概述
- 当前进度
- Git diff
- 未完成任务

### 何时生成

- 运行 `superspec sync`
- 运行 `/ss-resume`（自动触发 sync）

### 不要手动编辑

`context.md` 会在每次 sync 时重新生成，手动修改会被覆盖。

---

## Artifact 状态

每个 artifact 都有状态，在 frontmatter 中定义：

| 状态 | 说明 |
|------|------|
| `draft` | 草稿，尚未完成 |
| `ready` | 就绪，内容已完成 |
| `done` | 完成，已验证 |

```yaml
---
name: add-user-auth
status: ready
---
```

使用 `superspec status` 查看所有 artifact 的状态。

---

## 大小限制

为优化 AI 上下文窗口，每个 artifact 有大小限制：

| 限制 | 默认值 |
|------|--------|
| 目标 | 300 行 |
| 硬限 | 400 行 |

使用 `superspec lint` 检查是否超限。

### 超限处理

1. **精简内容**: 移除非必要信息
2. **拆分变更**: 将大变更拆分为多个小变更
3. **使用引用**: 引用外部文档而非内联
