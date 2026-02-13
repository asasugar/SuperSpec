---
title: superspec sync
description: 同步 git 变更到 context.md
---

# superspec sync

同步 git 变更到 `context.md`，用于 Vibe Coding 的上下文恢复。

## 语法

```bash
superspec sync [name] [options]
```

## 参数

| 参数 | 说明 | 必需 |
|------|------|------|
| `[name]` | 变更名称 | 否（默认同步所有） |

## 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `--base <branch>` | 基准分支 | `main` 或 `master` |
| `--no-git` | 不收集 git diff | `false` |

## 功能

`sync` 命令会：
1. 收集当前分支相对于基准分支的 git diff
2. 读取相关 artifact 的摘要
3. 生成 `context.md` 文件

## 示例

### 同步特定变更

```bash
superspec sync add-user-auth
```

### 同步所有活跃变更

```bash
superspec sync
```

### 指定基准分支

```bash
superspec sync add-user-auth --base develop
```

### 不收集 git diff

```bash
superspec sync add-user-auth --no-git
```

## 生成的 context.md

```markdown
---
change: add-user-auth
synced_at: 2026-01-15T10:30:00Z
base_branch: main
---

## 变更概述

本变更实现用户认证功能...

## 当前状态

- proposal.md: Ready
- spec.md: Ready
- tasks.md: In Progress (3/5 完成)

## Git 变更

### 新增文件
- src/auth/middleware.ts
- src/auth/jwt.ts

### 修改文件
- src/routes/index.ts
- src/config/index.ts

### Git Diff

```diff
diff --git a/src/auth/middleware.ts b/src/auth/middleware.ts
new file mode 100644
...
```

## 未完成任务

- [ ] 任务 4: 实现 token 刷新
- [ ] 任务 5: 添加测试
```

## 与 /ss-resume 配合

`sync` 生成的 `context.md` 用于 AI 助手的上下文恢复：

```
你: /ss-resume
AI: → 运行 superspec sync
    → 读取 context.md
    → 理解当前进度
    → 继续未完成的工作
```

## 工作流建议

### 开发中

```bash
# 完成一些工作后同步
superspec sync
```

### 提交前

```bash
# 确保 context.md 最新
superspec sync
git add .
git commit -m "WIP: partial implementation"
```

### 切换任务

```bash
# 同步当前变更
superspec sync current-change

# 切换到其他变更
git checkout other-branch
superspec sync other-change
```

## 注意事项

1. **Git 仓库**: 需要在 git 仓库中运行
2. **基准分支**: 确保基准分支存在
3. **自动检测**: 如果未指定，会自动检测 main 或 master
4. **零 AI token**: 这是纯 CLI 操作，不消耗 AI token
