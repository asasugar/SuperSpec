---
title: 第一个 Spec
description: 从零开始创建你的第一个 SuperSpec 规格文档
---

# 第一个 Spec

本教程将带你从零开始创建第一个 SuperSpec 规格文档，了解核心工作流程。

## 前置条件

- 已安装 Node.js 18+
- 已安装 SuperSpec CLI

```bash
# 检查安装
superspec --version
```

## 场景设定

假设我们要为一个 Web 应用添加**用户头像上传功能**。

## 步骤 1：初始化项目

如果你的项目还没有初始化 SuperSpec：

```bash
cd your-project
superspec init --lang zh
```

这会创建：
```
.superspec/
├── AGENTS.md           # AI 助手指令
├── superspec.config.json   # 配置文件
└── changes/            # 变更目录
```

## 步骤 2：创建变更

使用 `create` 命令创建新的变更：

```bash
superspec create avatarUpload
```

输出：
```
✓ Created change: avatarUpload
  └── .superspec/changes/avatarUpload/
      ├── proposal.md
      └── tasks.md
```

## 步骤 3：编写 Proposal

打开 `.superspec/changes/avatarUpload/proposal.md`，你会看到模板：

```markdown
# Proposal: avatarUpload

## 概述
<!-- 用一句话描述这个变更 -->

## 背景
<!-- 为什么需要这个变更？ -->

## 目标
<!-- 这个变更要达成什么？ -->

## 方案
<!-- 高层次描述如何实现 -->

## 影响范围
<!-- 会影响哪些模块/文件？ -->
```

填写内容：

```markdown
# Proposal: avatarUpload

## 概述
为用户添加头像上传功能，支持图片裁剪和预览。

## 背景
当前用户没有头像功能，个性化体验较差。产品希望增加用户粘性。

## 目标
1. 用户可以上传图片作为头像
2. 支持上传前裁剪和预览
3. 限制图片大小和格式

## 方案
- 前端：使用 React + react-image-crop 实现裁剪
- 后端：新增 /api/avatar 接口
- 存储：使用 OSS 存储图片

## 影响范围
- 前端：UserProfile 组件
- 后端：user.controller.ts, user.service.ts
- 数据库：users 表新增 avatar_url 字段
```

## 步骤 4：生成任务

使用 AI 助手生成任务：

```
/ss-tasks
```

AI 会读取 proposal.md 并生成 tasks.md：

```markdown
# Tasks: avatarUpload

## 任务清单

- [ ] 1. 数据库迁移：users 表添加 avatar_url 字段
- [ ] 2. 后端：创建 /api/avatar POST 接口
- [ ] 3. 后端：图片验证（大小、格式）
- [ ] 4. 后端：OSS 上传逻辑
- [ ] 5. 前端：AvatarUpload 组件
- [ ] 6. 前端：图片裁剪功能
- [ ] 7. 前端：预览功能
- [ ] 8. 前端：集成到 UserProfile
- [ ] 9. 测试：接口测试
- [ ] 10. 测试：E2E 测试

## 进度
- 总任务：10
- 已完成：0
- 进行中：0
```

## 步骤 5：执行任务

逐个执行任务，使用 `/ss-apply` 让 AI 实现代码：

```
/ss-apply 1
```

AI 会实现第一个任务（数据库迁移），完成后自动更新 tasks.md：

```markdown
- [x] 1. 数据库迁移：users 表添加 avatar_url 字段
```

继续执行其他任务...

## 步骤 6：归档

所有任务完成后，归档变更：

```bash
superspec archive avatarUpload
```

这会将变更移动到 `.superspec/archive/` 目录，并保留完整的历史记录。

## 总结

通过这个教程，你学会了：

1. **初始化** - `superspec init`
2. **创建变更** - `superspec create`
3. **编写规格** - 填写 proposal.md
4. **生成任务** - `/ss-tasks`
5. **执行任务** - `/ss-apply`
6. **归档** - `superspec archive`

## 下一步

- [团队协作](/tutorials/team-workflow) - 学习团队协作流程
- [复杂功能开发](/tutorials/complex-feature) - 使用增强模式
- [CLI 命令参考](/cli/) - 了解更多命令
