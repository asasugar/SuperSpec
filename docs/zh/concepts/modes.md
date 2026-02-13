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
| AI 生成的 Artifacts | proposal, checklist, tasks | proposal, spec, design?, checklist, tasks |
| 适用场景 | 简单功能、bug 修复 | 复杂功能、需要评审 |
| 文档量 | 最小 | 完整 |
| 质量控制 | proposal 后 checklist /10 | spec 后 checklist /25 |

## 标准模式

### 适用场景

- Bug 修复
- 简单功能添加
- 配置更改
- 小型重构
- 快速原型

### Artifacts（AI 通过 /ss-create 按需生成）

```
superspec/changes/<name>/
├── proposal.md     # 需求 + 技术方案
├── checklist.md    # 质量门 /10
└── tasks.md        # 由 /ss-tasks 生成
```

CLI `superspec create` 仅创建文件夹和 git 分支。

### 工作流

```
/ss-create <feature>  (proposal → checklist ✓)
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

### Artifacts（AI 通过 /ss-create 按需生成）

```
superspec/changes/<name>/
├── proposal.md     # 需求背景（Goals, Non-Goals, Impact, Risks）
├── spec.md         # 需求细节 + 交互（US/FR/AC）
├── design.md       # 可选，按需自动生成
├── checklist.md    # 质量门 /25
└── tasks.md        # 由 /ss-tasks 生成
```

CLI `superspec create -b` 仅创建文件夹和 git 分支。

### 工作流

```
/ss-create <feature> -b  (proposal → spec → [auto: split? design?] → checklist ✓)
    ↓
/ss-tasks
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

### 实现机制

```
用户 -c → CLI 日志输出 → AI 解析标志 → proposal.md frontmatter strategy: create → 后续命令读 frontmatter → 行为分支
```

strategy 优先级：用户输入 `-c` > config 默认值。持久化在 proposal.md frontmatter 的 `strategy` 和 `input` 字段。

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

如果开发过程中发现需要更多文档，使用 AI 生成额外 artifact：

```bash
# 使用 /ss-clarify 澄清需求
# 使用 /ss-checklist 执行质量检查
# 如需升级到增强模式文档，可请求 AI 生成 spec.md
```

或者使用配置默认启用增强模式：

```json
{
  "boost": true
}
```
