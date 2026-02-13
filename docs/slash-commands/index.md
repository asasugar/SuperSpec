---
title: Slash 命令概览
description: AI Agent 使用的 Slash 命令参考
---

# Slash 命令

Slash 命令是你与 AI 助手交互的主要方式。直接在 AI 对话中输入这些命令即可。

## 命令概览

### 主流程命令

| 命令 | 说明 |
|------|------|
| [`/ss-create`](/slash-commands/ss-create) | 创建变更 + 生成 proposal |
| [`/ss-tasks`](/slash-commands/ss-tasks) | 从 proposal 生成任务清单 |
| [`/ss-apply`](/slash-commands/ss-apply) | 逐个执行任务 |
| [`/ss-resume`](/slash-commands/ss-resume) | 恢复 spec 上下文 |
| [`/ss-archive`](/slash-commands/ss-archive) | 归档已完成的变更 |

### 质量与发现命令

| 命令 | 模式 | 说明 |
|------|------|------|
| [`/ss-clarify`](/slash-commands/ss-clarify) | 通用 | 澄清歧义、记录决策 |
| [`/ss-checklist`](/slash-commands/ss-checklist) | 增强 | apply 前的质量门 |
| [`/ss-lint`](/slash-commands/ss-lint) | 通用 | 检查 artifact 大小 |
| [`/ss-validate`](/slash-commands/ss-validate) | 增强 | 交叉引用一致性检查 |
| [`/ss-status`](/slash-commands/ss-status) | 通用 | 查看所有变更状态 |
| [`/ss-search`](/slash-commands/ss-search) | 通用 | 全文搜索 |
| [`/ss-link`](/slash-commands/ss-link) | 通用 | 添加 spec 依赖 |
| [`/ss-deps`](/slash-commands/ss-deps) | 通用 | 查看依赖图 |
| [`/ss-specs`](/slash-commands/ss-specs) | 通用 | 自动拆分大 spec |

## 完整工作流示例

### 标准模式

```
你: /ss-create add-dark-mode
AI: 创建变更，生成 proposal.md

你: /ss-tasks
AI: 读取 proposal，生成任务清单

你: /ss-apply
AI: 逐个执行任务，标记完成

你: /ss-archive add-dark-mode
AI: 归档变更
```

### 增强模式

```
你: /ss-create add-user-auth -b
AI: 创建变更，生成 proposal + spec + design + tasks + checklist

你: /ss-tasks
AI: 读取 proposal 和 spec，生成详细任务

你: /ss-checklist
AI: 检查质量门

你: /ss-apply
AI: 逐个执行任务

你: /ss-archive add-user-auth
AI: 归档变更
```

### 完成任务

```
# 第一个对话
你: /ss-apply
AI: 执行任务 1, 2, 3...
# 对话结束

# 新对话
你: /ss-resume
AI: 恢复上下文，继续执行任务 4, 5...
```

## 命令参数格式

Slash 命令支持以下参数格式：

### 位置参数

```
/ss-create add-dark-mode
```

### 标志参数

```
/ss-create add-auth -b
/ss-create add-auth --boost
```

### 键值参数

```
/ss-create add-auth -d "OAuth2 集成"
/ss-create add-auth --description "OAuth2 集成"
```

### 组合使用

```
/ss-create add-auth -b -c -d "OAuth2 with Google" --user jay
```

## 提示与技巧

### 1. 使用描述参数

添加描述可以帮助 AI 更好理解需求：

```
/ss-create add-auth -d "实现 OAuth2 登录，支持 Google 和 GitHub"
```

### 2. 指定开发者

在团队中使用 `@user` 标识开发者：

```
/ss-create add-feature @jay
```

### 3. 使用意图类型

明确意图有助于生成更准确的分支名：

```
/ss-create fix-login --intent-type bugfix
```

### 4. 中断后恢复

随时使用 `/ss-resume` 恢复上下文：

```
/ss-resume
```
