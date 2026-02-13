---
title: In-Context Learning
description: 在 AI 会话间无缝保持上下文
---

# In-Context Learning

In-Context Learning 是 SuperSpec 的一个核心功能，让你在切换 AI 对话或中断开发后能够无缝恢复上下文。

## 什么是 Vibe Coding？

在使用 AI 编码助手时，一个常见的问题是：当你开始新的对话或者长时间中断后，AI 会"忘记"之前的上下文。Vibe Coding 解决了这个问题。

## 核心组件

### 1. sync 命令

`sync` 命令收集当前的 git 变更并生成 `context.md` 文件：

```bash
# 同步特定变更
superspec sync add-user-auth

# 同步所有活跃变更
superspec sync

# 指定基准分支
superspec sync add-user-auth --base develop

# 不收集 git diff
superspec sync add-user-auth --no-git
```

### 2. context.md 文件

`context.md` 是自动生成的上下文文件，包含：

- 变更的元数据
- 当前的 git diff
- 相关的 artifact 摘要
- 任务完成状态

### 3. /ss-resume 命令

在 AI 助手中使用 `/ss-resume` 命令恢复上下文：

```
/ss-resume
```

AI 会：
1. 运行 `sync` 更新 `context.md`
2. 读取 `context.md` 和相关 artifacts
3. 从上次中断处继续工作

## 工作流示例

### 场景 1：新对话继续开发

```
# 第一个对话
你: /ss-create add-dark-mode
AI: 创建变更...
你: /ss-tasks
AI: 生成任务...
你: /ss-apply
AI: 完成任务 1, 2...
# 对话结束或超时

# 第二个对话
你: /ss-resume
AI: → 运行 sync
    → 读取 context.md
    → 继续执行任务 3, 4...
```

### 场景 2：中断后继续

```
# 早上开始开发
你: /ss-apply
AI: 完成任务 1, 2, 3...
# 去开会...

# 下午继续
你: /ss-resume
AI: 检测到未完成的任务，继续执行...
```

### 场景 3：跨设备开发

```
# 在办公室（设备 A）
你: /ss-apply
AI: 完成部分任务...
git commit -m "WIP: partial implementation"
git push

# 在家（设备 B）
git pull
你: /ss-resume
AI: 同步 git 变更，继续开发...
```

## sync 命令详解

### 基本用法

```bash
superspec sync [name]
```

### 选项

| 选项 | 说明 | 默认值 |
|---|---|---|
| `--base <branch>` | 指定基准分支 | main/master |
| `--no-git` | 不收集 git diff | false |

### 生成的 context.md 结构

```markdown
---
change: add-user-auth
synced_at: 2026-01-15T10:30:00Z
base_branch: main
---

## 变更概述
...

## Git Diff
```diff
+ new code
- removed code
```

## 任务状态
- [x] 任务 1
- [x] 任务 2
- [ ] 任务 3
- [ ] 任务 4
```

## 最佳实践

### 1. 频繁同步

在完成重要工作后运行 `sync`：

```bash
superspec sync
```

### 2. 提交前同步

在提交代码前确保 context.md 是最新的：

```bash
superspec sync && git add . && git commit -m "..."
```

### 3. 切换变更时同步

在切换到另一个变更前同步当前变更：

```bash
superspec sync current-change
# 切换到其他工作
superspec sync other-change
```

## 与 Git 工作流集成

### 推荐的分支策略

```bash
# 创建变更时自动创建分支
superspec create add-feature --branch-prefix feature/

# 分支名称模板
superspec create add-feature --branch-template "{prefix}{date}-{feature}-{user}"
```

### 使用 git hooks

可以在 pre-commit hook 中运行 sync：

```bash
#!/bin/sh
# .git/hooks/pre-commit
superspec sync
git add superspec/changes/*/context.md
```

## 故障排除

### context.md 不更新

确保你在正确的变更目录下运行命令：

```bash
# 查看当前活跃的变更
superspec status

# 指定变更名称
superspec sync specific-change
```

### git diff 为空

检查是否有未提交的更改：

```bash
git status
git diff
```

### 基准分支错误

指定正确的基准分支：

```bash
superspec sync --base develop
```
