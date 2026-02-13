---
title: 快速开始
description: 5 分钟内开始使用 SuperSpec
---

# 快速开始

本指南将帮助你在 5 分钟内开始使用 SuperSpec 进行规格驱动开发。

## 前置条件

- Node.js >= 18.0.0
- 一个支持的 AI 编码助手（Cursor、Claude Code、Qwen 等）
- Git（可选，但推荐）

## 第一步：安装 SuperSpec

选择你喜欢的包管理器安装：

```bash
# npm
npm install -g @superspec/cli

# pnpm (推荐)
pnpm add -g @superspec/cli

# yarn
yarn global add @superspec/cli
```

验证安装成功：

```bash
superspec --version
```

## 第二步：初始化项目

进入你的项目目录并初始化 SuperSpec：

```bash
cd your-project

# 使用中文模板初始化
superspec init --lang zh

# 或使用英文模板
superspec init --lang en

# 指定 AI 助手类型
superspec init --ai cursor    # Cursor
superspec init --ai claude    # Claude Code
superspec init --ai qwen      # Qwen 通义
superspec init --ai qoder     # Qoder
```

初始化后会创建以下结构：

```
your-project/
├── superspec.config.json    # 配置文件
├── superspec/
│   ├── changes/             # 变更文件夹
│   └── templates/           # 模板文件
└── AGENTS.md                # AI Agent 指令
```

## 第三步：创建第一个变更

在 AI 助手中使用 `/ss-create` 创建变更：

```bash
# 标准模式 - 简单功能
/ss-create add-dark-mode

# 增强模式 - 复杂功能
/ss-create add-auth -b

# 创造模式 - 探索新方案
/ss-create redesign-ui -c
```

CLI 仅创建变更文件夹和 git 分支。AI 按需生成 proposal、checklist 等 artifact。

## 第四步：与 AI 助手协作

打开你的 AI 编码助手，使用 Slash 命令与 SuperSpec 协作：

### 1. 生成任务

```
/ss-tasks
```

AI 会读取 proposal.md 并生成分阶段的任务清单。

### 2. 执行任务

```
/ss-apply
```

AI 会逐个执行任务，每完成一个任务会标记 ✅。

### 3. 恢复上下文（新对话时）

```
/ss-resume
```

如果你开始了新的 AI 对话，使用此命令恢复之前的上下文。

## 第五步：归档完成的变更

当所有任务完成后，归档变更：

```bash
superspec archive add-dark-mode
```

## 完整示例工作流

```
你:   /ss-create addUserAuth
AI:   → 执行 `superspec create addUserAuth`（创建文件夹+分支）
      → 按需生成 proposal.md → checklist ✓
      → 等待你确认

你:   /ss-tasks
AI:   → 读取 proposal.md → 生成分阶段任务

你:   /ss-apply
AI:   → 逐个执行任务，每个完成后标记 ✅

你:   /ss-resume    （新对话 / 中断后继续）
AI:   → 运行 sync → 读取 context.md → 从上次中断处继续
```

## 下一步

- [工作流详解](/zh/guides/workflow) - 深入了解标准模式和增强模式
- [上下文恢复](/zh/guides/in-context-learning) - 学习如何在会话间保持上下文
- [CLI 命令参考](/zh/cli/) - 查看所有可用命令
