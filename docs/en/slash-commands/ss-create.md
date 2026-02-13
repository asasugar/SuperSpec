---
title: /ss-create
description: 创建变更并生成 proposal
---

# /ss-create

创建变更文件夹并生成 proposal 模板。

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

1. 运行 `superspec create <feature> [options]`
2. 生成 proposal.md（增强模式还会生成 spec.md 等）
3. 等待你确认 proposal 内容
4. 提示下一步操作

## 后续步骤

创建完成后，继续使用：

```
/ss-tasks    # 生成任务清单
```
