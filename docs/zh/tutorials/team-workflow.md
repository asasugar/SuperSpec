---
title: 团队协作
description: 学习如何在团队中使用 SuperSpec 进行协作开发
---

# 团队协作

本教程介绍如何在团队中使用 SuperSpec 进行高效协作。

## 团队协作场景

假设你的团队有 3 名开发者，正在开发一个新功能模块。

## 协作模式

### 模式 1：并行开发

多人同时开发不同的功能：

```
开发者 A → avatarUpload
开发者 B → notificationSystem
开发者 C → searchFeature
```

每个开发者独立创建和管理自己的变更：

```bash
# 开发者 A
superspec create avatarUpload

# 开发者 B
superspec create notificationSystem

# 开发者 C
superspec create searchFeature
```

### 模式 2：依赖开发

功能之间有依赖关系：

```
avatarUpload ← userProfile ← dashboard
```

使用依赖管理：

```bash
# 创建上游功能
superspec create avatarUpload

# 创建依赖功能
superspec create userProfile
superspec deps add userProfile avatarUpload
```

## 工作流程

### 1. 规格评审

在开始编码前，团队评审规格文档：

```bash
# 创建变更（增强模式）
superspec create newFeature -b

# 编写 proposal 和 spec
# ... 编辑文件 ...

# 提交规格供评审
git add .superspec/changes/newFeature/
git commit -m "spec: newFeature 规格文档"
git push
```

团队通过 PR 评审规格文档，确保：
- 需求理解一致
- 方案可行
- 验收标准明确

### 2. 任务分配

规格评审通过后，分配任务：

```markdown
# Tasks: newFeature

## 任务清单

- [ ] 1. 数据库迁移 @alice
- [ ] 2. 后端 API @alice
- [ ] 3. 前端组件 @bob
- [ ] 4. 测试用例 @charlie
```

### 3. 状态同步

定期检查项目状态：

```bash
superspec status
```

输出：
```
SuperSpec Status
================

Active Changes:
  newFeature (boost)
    - Total: 4, Done: 1, In Progress: 2

  bugFix123 (standard)
    - Total: 2, Done: 2

Archived: 15
```

### 4. 冲突处理

当多人修改同一个变更时，使用 Git 处理冲突：

```bash
# 拉取最新变更
git pull

# 如果有冲突，手动解决
# tasks.md 冲突通常是任务状态不一致
# 合并时保留最新的任务状态
```

## 最佳实践

### 命名规范

使用一致的变更命名：

```
功能：feature-xxx
修复：hotfix-xxx
重构：refactor-xxx
```

### 提交规范

```bash
# 规格文档
git commit -m "spec(newFeature): 添加规格文档"

# 任务更新
git commit -m "task(newFeature): 完成任务 1-3"

# 归档
git commit -m "archive(newFeature): 归档完成"
```

### 分支策略

```
main
├── develop
│   ├── feature-<Date>-avatarUpload-<Development>
│   ├── feature-<Date>-notification-<Development>
│   └── hotfix-<Date>-loginBug-<Development>
```

每个变更对应一个 feature 分支，规格文档和代码一起提交。

## CI/CD 集成

在 CI 中添加 SuperSpec 检查：

```yaml
# .github/workflows/superspec.yml
name: SuperSpec Check

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g @superspec/cli
      - run: superspec lint
      - run: superspec validate
```

## 沟通模板

### 日站会

```
我昨天：
- 完成了 avatarUpload 的任务 1-3

我今天：
- 继续 avatarUpload 的任务 4-5

阻塞：
- 无
```

### 规格评审

```
变更：avatarUpload
类型：新功能
模式：增强

请评审以下内容：
1. proposal.md - 需求理解
2. spec.md - 技术方案
3. tasks.md - 任务分解

评审截止：明天 18:00
```

## 下一步

- [复杂功能开发](/zh/tutorials/complex-feature) - 学习增强模式
- [配置详解](/zh/api/configuration) - 团队配置选项
