---
title: superspec init
description: 初始化 SuperSpec 到当前项目
---

# superspec init

初始化 SuperSpec 到当前项目，创建配置文件和目录结构。

## 语法

```bash
superspec init [options]
```

## 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `--ai <agent>` | AI 助手类型 | `cursor` |
| `--lang <lang>` | 模板语言 | `en` |
| `--force` | 强制覆盖已有配置 | `false` |
| `--no-git` | 跳过 git 初始化 | `false` |

### --ai 选项

支持的 AI 助手类型：
- `cursor` - Cursor（默认）
- `claude` - Claude Code
- `gemini` - Gemini
- `copilot` - GitHub Copilot
- `windsurf` - Windsurf
- `qwen` - Qwen 通义
- `opencode` - OpenCode
- `codex` - Codex
- `codebuddy` - CodeBuddy
- `qoder` - Qoder

### --lang 选项

支持的语言：
- `en` - 英文（默认）
- `zh` - 中文

## 示例

### 基本初始化

```bash
superspec init
```

### 中文模板

```bash
superspec init --lang zh
```

### 指定 AI 助手

```bash
# Cursor
superspec init --ai cursor

# Claude Code
superspec init --ai claude

# Gemini
superspec init --ai gemini

# GitHub Copilot
superspec init --ai copilot

# Windsurf
superspec init --ai windsurf

# Qwen 通义
superspec init --ai qwen

# Qoder
superspec init --ai qoder
```

### 强制覆盖

```bash
superspec init --force
```

### 跳过 git 初始化

```bash
superspec init --no-git
```

### 组合使用

```bash
superspec init --ai claude --lang zh --force
```

## 创建的文件

运行 `init` 后会创建以下文件和目录：

```
your-project/
├── superspec.config.json    # 主配置文件
├── AGENTS.md                # AI Agent 通用指令
├── superspec/
│   ├── changes/             # 变更文件夹
│   └── templates/           # 模板文件
│       ├── proposal.md
│       ├── spec.md
│       ├── tasks.md
│       ├── clarify.md
│       ├── checklist.md
│       └── design.md
└── .cursor/                 # Cursor 专用（如适用）
    └── rules/
        └── superspec.mdc
```

## 输出示例

```
   ███████╗██╗   ██╗██████╗ ███████╗██████╗ ███████╗██████╗ ███████╗ ██████╗
   ██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝
   ███████╗██║   ██║██████╔╝█████╗  ██████╔╝███████╗██████╔╝█████╗  ██║
   ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗╚════██║██╔═══╝ ██╔══╝  ██║
   ███████║╚██████╔╝██║     ███████╗██║  ██║███████║██║     ███████╗╚██████╗
   ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝ ╚═════╝
  Spec-Driven Development Toolkit

◆ 创建配置
──────────────────────────────────────────────────
📄 superspec.config.json

◆ 创建目录结构
──────────────────────────────────────────────────
📁 superspec/changes/
📁 superspec/templates/

◆ 安装模板
──────────────────────────────────────────────────
✓ 6 个模板 (zh)

◆ 安装 AI Agent 文件
──────────────────────────────────────────────────
✓ AGENTS.md

╭────────────────────────────────────────────────╮
│ Config    → superspec.config.json              │
│ Spec dir  → superspec/                         │
│ AI agent  → cursor                             │
│ Language  → zh                                 │
╰────────────────────────────────────────────────╯

✨ SuperSpec 初始化成功！
下一步: superspec create <feature>
```

## 注意事项

1. **已存在配置**: 如果 `superspec.config.json` 已存在，需要使用 `--force` 覆盖
2. **非空目录**: 在非空目录中初始化时会显示警告，模板文件会与现有内容合并
3. **git 仓库**: 如果目录不是 git 仓库，会自动执行 `git init`（除非使用 `--no-git`）
