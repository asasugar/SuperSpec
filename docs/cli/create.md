---
title: superspec create
description: 创建变更并生成 proposal 模板
---

# superspec create

创建变更文件夹并生成 proposal 模板。这是开始新功能或修复的第一步。

## 语法

```bash
superspec create <feature> [options]
```

## 参数

| 参数 | 说明 | 必需 |
|------|------|------|
| `<feature>` | 变更名称/功能描述 | 是 |

## 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-b, --boost` | 增强模式 | `false` |
| `-c, --creative` | 创造模式 | `false` |
| `-d, --description <desc>` | 变更描述 | - |
| `--spec-dir <dir>` | 自定义 spec 文件夹 | 配置值 |
| `--no-branch` | 不创建 git 分支 | `false` |
| `--intent-type <type>` | 意图类型 | - |
| `--branch-prefix <prefix>` | 分支前缀 | 配置值 |
| `--branch-template <tpl>` | 分支名称模板 | 配置值 |
| `--change-name-template <tpl>` | 文件夹名称模板 | 配置值 |
| `--user <user>` | 开发者标识 | - |
| `--lang <lang>` | SDD 文档语言 | 配置值 |

### --intent-type 选项

支持的意图类型：
- `feature` - 新功能
- `hotfix` - 紧急修复
- `bugfix` - Bug 修复
- `refactor` - 重构
- `chore` - 杂项

### 模板变量

分支模板和文件夹名称模板支持以下变量：
- `{prefix}` - 分支前缀
- `{intentType}` - 意图类型
- `{feature}` - 功能名称
- `{date}` - 日期 (YYYYMMDD)
- `{user}` - 开发者标识

## 示例

### 标准模式

```bash
superspec create add-dark-mode
```

生成：
- `proposal.md`

### 增强模式

```bash
superspec create add-user-auth -b
```

生成：
- `proposal.md`
- `spec.md`
- `design.md`
- `tasks.md`
- `checklist.md`

### 创造模式

```bash
superspec create redesign-ui -c
```

### 增强 + 创造模式

```bash
superspec create new-architecture -b -c
```

### 带描述

```bash
superspec create add-auth -d "OAuth2 集成，支持 Google 和 GitHub 登录"
```

### 不创建分支

```bash
superspec create add-feature --no-branch
```

### 自定义分支

```bash
# 自定义前缀
superspec create add-auth --branch-prefix feature/

# 自定义模板
superspec create add-auth --branch-template "{prefix}{date}-{feature}-{user}"

# 指定意图类型和用户
superspec create add-auth --intent-type feature --user jay
```

### 自定义文件夹名称

```bash
superspec create add-auth --change-name-template "{date}-{feature}-{user}"
```

## 创建的文件

### 标准模式

```
superspec/changes/<name>/
└── proposal.md
```

### 增强模式

```
superspec/changes/<name>/
├── proposal.md
├── spec.md
├── design.md
├── tasks.md
└── checklist.md
```

## 输出示例

```
╭────────────────────────────────────────────────╮
│ 创建变更: feature-20240115-add-auth-jay        │
╰────────────────────────────────────────────────╯

意图类型: feature
⚡ 增强模式已启用

◆ 生成 Artifacts
──────────────────────────────────────────────────
✓ proposal.md
✓ spec.md
✓ design.md
✓ tasks.md
✓ checklist.md
✓ Branch: feature/feature-20240115-add-auth-jay

✨ 变更创建成功！
路径: superspec/changes/feature-20240115-add-auth-jay/
工作流: /ss-create → /ss-tasks → /ss-apply (boost)
下一步: superspec lint feature-20240115-add-auth-jay
```

## 注意事项

1. **变更已存在**: 如果同名变更已存在，命令会显示警告并退出
2. **Git 分支**: 默认会创建 git 分支，使用 `--no-branch` 跳过
3. **模板语言**: 使用 `--lang` 可以覆盖配置文件中的语言设置
