---
title: 安装指南
description: SuperSpec 的完整安装指南
---

# 安装指南

## 系统要求

- **Node.js**: >= 18.0.0
- **操作系统**: macOS、Linux、Windows
- **Git**: 可选，但推荐用于分支管理

## 包管理器安装

### npm

```bash
npm install -g @superspec/cli
```

### pnpm（推荐）

```bash
pnpm add -g @superspec/cli
```

### yarn

```bash
yarn global add @superspec/cli
```

## 验证安装

安装完成后，运行以下命令验证：

```bash
superspec --version
```

应该会显示类似 `1.1.1` 的版本号。

## 初始化选项

### 基本初始化

```bash
superspec init
```

### 指定语言

```bash
# 中文模板和提示
superspec init --lang zh

# 英文模板和提示
superspec init --lang en
```

### 指定 AI 助手

```bash
superspec init --ai cursor      # Cursor（默认）
superspec init --ai claude      # Claude Code
superspec init --ai qwen        # Qwen 通义
superspec init --ai opencode    # OpenCode
superspec init --ai codex       # Codex
superspec init --ai codebuddy   # CodeBuddy
superspec init --ai qoder       # Qoder
```

### 其他选项

```bash
# 强制覆盖已有配置
superspec init --force

# 跳过 git 初始化
superspec init --no-git
```

## 项目结构

初始化后会创建以下文件和目录：

```
your-project/
├── superspec.config.json        # 主配置文件
├── AGENTS.md                    # AI Agent 通用指令
├── superspec/
│   ├── changes/                 # 变更文件夹（存放所有变更）
│   └── templates/               # 模板文件
│       ├── proposal.md          # 提案模板
│       ├── spec.md              # 规格模板（增强模式）
│       ├── tasks.md             # 任务模板
│       ├── clarify.md           # 澄清模板
│       ├── checklist.md         # 检查清单模板（增强模式）
│       └── design.md            # 设计模板
└── .cursor/                     # Cursor 专用配置（如适用）
    └── rules/
        └── superspec.mdc        # Cursor 规则文件
```

## 更新 SuperSpec

### 更新 CLI

```bash
# npm
npm update -g @superspec/cli

# pnpm
pnpm update -g @superspec/cli

# yarn
yarn global upgrade @superspec/cli
```

### 更新项目模板

```bash
superspec update
```

这会刷新 agent 指令和模板到最新版本，同时保留你的配置。

## 卸载

```bash
# npm
npm uninstall -g @superspec/cli

# pnpm
pnpm remove -g @superspec/cli

# yarn
yarn global remove @superspec/cli
```

## 故障排除

### 命令未找到

如果安装后 `superspec` 命令未找到，请确保全局 npm/pnpm/yarn bin 目录在你的 PATH 中：

```bash
# 查看全局 bin 目录
npm config get prefix

# 将 bin 目录添加到 PATH（以 zsh 为例）
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 权限问题

在 macOS/Linux 上，如果遇到权限问题，可以使用 nvm 管理 Node.js，或者配置 npm 前缀：

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Node.js 版本过低

SuperSpec 需要 Node.js 18.0.0 或更高版本。检查你的版本：

```bash
node --version
```

如果版本过低，请使用 nvm 或 n 升级：

```bash
# 使用 nvm
nvm install 18
nvm use 18

# 使用 n
n 18
```
