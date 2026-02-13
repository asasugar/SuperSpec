---
title: 工作模式
description: 标准模式与增强模式的选择
---

# 工作模式

SuperSpec 提供两种工作模式，适应不同的开发场景。

## 模式对比

| 特性 | 标准模式 | 增强模式 |
|------|----------|----------|
| 启用方式 | 默认 | `-b` 或 `--boost` |
| 生成的 Artifacts | proposal, tasks | proposal, spec, design, tasks, checklist |
| 适用场景 | 简单功能、bug 修复 | 复杂功能、需要评审 |
| 文档量 | 最小 | 完整 |
| 质量控制 | 基础 | 完整检查清单 |

## 标准模式

### 适用场景

- Bug 修复
- 简单功能添加
- 配置更改
- 小型重构
- 快速原型

### 生成的 Artifacts

```
superspec/changes/<name>/
├── proposal.md     # 变更提案
└── tasks.md        # 任务清单（由 /ss-tasks 生成）
```

### 工作流

```
/ss-create <feature>
    ↓
/ss-tasks
    ↓
/ss-apply
    ↓
/ss-archive
```

### 示例

```bash
# 创建简单功能
superspec create add-dark-mode

# 修复 bug
superspec create fix-login-error

# 更新配置
superspec create update-eslint-config
```

## 增强模式 (Boost Mode)

### 适用场景

- 复杂功能开发
- 需要设计评审的变更
- 跨团队协作
- 需要完整文档的项目
- 重要的架构变更

### 生成的 Artifacts

```
superspec/changes/<name>/
├── proposal.md     # 变更提案
├── spec.md         # 详细规格（US/FR/AC）
├── design.md       # 技术设计
├── tasks.md        # 任务清单
└── checklist.md    # 质量检查清单
```

### 工作流

```
/ss-create <feature> -b
    ↓
/ss-tasks
    ↓
/ss-checklist      # 增强模式特有
    ↓
/ss-apply
    ↓
/ss-archive
```

### 示例

```bash
# 复杂功能
superspec create add-user-auth -b

# 架构变更
superspec create redesign-data-layer -b

# 新模块
superspec create implement-payment-system -b
```

## 创造模式 (Creative Mode)

创造模式可以与标准或增强模式组合使用，允许 AI 探索新方案。

### 启用方式

```bash
superspec create <feature> -c        # 标准 + 创造
superspec create <feature> -b -c     # 增强 + 创造
```

### 与普通模式的区别

| 特性 | 普通模式 | 创造模式 |
|------|----------|----------|
| 策略 | follow | create |
| 项目规则 | 作为约束 | 作为参考 |
| 架构 | 必须对齐现有 | 可提出替代方案 |
| 适用 | 常规开发 | 重构、创新 |

### 适用场景

- 探索新架构
- 尝试新技术栈
- 重大重构
- 创新功能设计

## 如何选择？

```
                    ┌─────────────────────────────────────┐
                    │         变更复杂度如何？             │
                    └───────────────┬─────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
               简单/快速        中等复杂        高度复杂
                    │               │               │
                    ▼               ▼               ▼
              标准模式          标准模式        增强模式
                                或增强
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
              是否需要探索新方案？
                    │               │
                    ▼               ▼
                   是              否
                    │               │
                    ▼               ▼
              + 创造模式       保持当前模式
```

## 运行时切换

如果开发过程中发现需要更多文档，可以手动创建：

```bash
# 标准模式升级到增强模式
# 手动创建 spec.md 和 checklist.md
touch superspec/changes/add-feature/spec.md
touch superspec/changes/add-feature/checklist.md
```

或者使用配置默认启用增强模式：

```json
{
  "boost": true
}
```
