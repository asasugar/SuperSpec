---
title: /ss-create
description: 创建变更并生成 proposal
---

# /ss-create

创建变更文件夹和 git 分支。Artifact（proposal、spec、checklist）由 AI 通过 /ss-create 按需生成。

## 语法

```
/ss-create <feature> [options]
```

## 参数

| 参数 | 说明 |
|------|------|
| `<feature>` | 功能名称/变更描述 |

## 选项

| 选项 | 说明 |
|------|------|
| `-b` | 增强模式 |
| `-c` | 创造模式 |
| `-d <desc>` | 变更描述 |
| `--no-branch` | 不创建 git 分支 |
| `--spec-dir <dir>` | 自定义 spec 目录 |
| `--branch-prefix <prefix>` | 分支前缀 |
| `--branch-template <tpl>` | 分支名模板 |
| `--change-name-template <tpl>` | 文件夹名模板 |
| `--intent-type <type>` | 意图类型 |
| `--user <user>` 或 `@user` | 开发者标识 |
| `--lang <lang>` | 文档语言 |

## 示例

### 基本用法

```
/ss-create add-dark-mode
```

### 增强模式

```
/ss-create add-user-auth -b
```

### 带描述

```
/ss-create add-auth -d "OAuth2 登录，支持 Google 和 GitHub"
```

### 指定开发者

```
/ss-create add-feature @jay
```

### 完整示例

```
/ss-create add-user-auth -b -d "实现用户认证" --intent-type feature @jay
```

## AI 行为

执行此命令后，AI 会：

1. 运行 `superspec create <feature> [options]`（仅创建文件夹和 git 分支）
2. 按需生成 artifact：proposal.md（标准/增强），spec.md（增强），checklist.md（两者皆有）
3. 标准模式：proposal → checklist（/10）→ 提示 /ss-tasks
4. 增强模式：proposal → spec → [自动：拆分？design？] → checklist（/25）→ 提示 /ss-tasks
5. 等待你确认内容，提示下一步操作

## 后续步骤

创建完成且 checklist 通过后：

```
/ss-tasks    # 生成任务清单
```
