<div align="center">

# SuperSpec

<p align="center">
  <a href="https://www.npmjs.com/package/@superspec/cli"><img src="https://img.shields.io/npm/v/@superspec/cli.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@superspec/cli"><img src="https://img.shields.io/npm/dm/@superspec/cli.svg" alt="npm downloads"></a>
  <a href="https://github.com/asasugar/SuperSpec/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg" alt="node version"></a>
</p>

<p align="center">
  <img src="./assets/logo.svg" alt="SuperSpec" width="320" />
</p>

AI 编码助手的规格驱动开发 (SDD) 工具。

[English](./README.md) · [中文文档](./README-zh.md)

</div>

## 为什么需要 SuperSpec？

AI 编码助手很强大，但需求模糊时容易产出不一致、无文档的代码。

**当前支持的 AI 助手：** [Cursor](https://cursor.com)、[Claude Code](https://claude.ai)、[Qwen 通义](https://tongyi.aliyun.com)、[OpenCode](https://opencode.com)、[Codex](https://codex.ai)、[CodeBuddy](https://codebuddy.ai)、[Qoder](https://qoder.com)。任何能读取 `AGENTS.md` 的编辑器均可使用本工作流。使用 `superspec init --ai cursor|claude|qwen|opencode|codex|codebuddy|qoder` 可安装对应编辑器的规则与斜杠命令（默认：`cursor`）。

| 痛点 | SuperSpec 如何解决 |
|---|---|
| AI 写代码不看上下文 | `strategy` + `context` 配置 |
| Spec 过长 | 第一性原理 + `lint` |
| 需求与任务无法追溯 | `validate` |
| Spec 依赖不清 | `depends_on` + `deps add`/`deps list` |
| 历史决策难查 | `search` |
| 简单工作被过度规格化 | 标准 vs 增强模式 |
| 项目规则 = token 浪费 | `context` 文件列表 |
| Vibe coding 丢上下文 | `sync` + `context.md` + `/ss-resume` |
| 代码与 spec 漂移 | context.md 中的 Git Changes |
| 进度不直观 | `status` |
| 无法按项目自定义 | `superspec.config.json` |

## 安装

```bash
# npm
npm install -g @superspec/cli

# pnpm
pnpm add -g @superspec/cli

# yarn
yarn global add @superspec/cli
```

> 需要 Node.js >= 18.0.0

## 快速开始

```bash
# 在项目中初始化（默认英文模板）
cd your-project
superspec init

# 中文模板
superspec init --lang zh

# 创建变更（标准 — 轻量）
superspec create add-dark-mode

# 增强模式（完整 SDD）
superspec create add-auth -b

# 创造模式（探索新方案）
superspec create redesign-ui -c
```

## 核心流程

```
标准模式:  create → tasks → apply → [vibe: sync → resume] → archive
增强模式:  create -b → tasks → apply → [vibe: sync → resume] → archive
```

**标准模式** 生成 `proposal.md` + `tasks.md` — 适合简单功能和 bug 修复。

**增强模式** 额外生成 `spec.md`（US/FR/AC）+ `checklist.md`（质量门）— 适合大功能、需要设计评审和交叉验证的场景。

**Vibe coding 阶段**：`apply` 之后，用 `sync` 收集 git 变更，用 `/ss-resume` 在新 AI 对话中恢复上下文。

## Slash 命令（AI Agent）

这些是你与 AI 助手交互的主要命令，直接在 AI 对话中输入即可：

### 主流程

| 命令 | 功能 |
|------|------|
| `/ss-create <feature>` | 创建变更 + 生成 proposal（boost: + spec + checklist） |
| `/ss-tasks` | 从 proposal 生成任务清单 |
| `/ss-apply` | 逐个执行任务 |
| `/ss-resume` | 恢复 spec 上下文（运行 sync → 读取 context.md） |
| `/ss-archive` | 归档已完成的变更 |

### 质量与发现

| 命令 | 模式 | 功能 |
|------|------|------|
| `/ss-clarify` | 通用 | 澄清歧义、记录决策 |
| `/ss-checklist` | 增强 | apply 前的质量门 |
| `/ss-lint` | 通用 | 检查 artifact 大小 |
| `/ss-validate` | 增强 | 交叉引用一致性检查（US↔FR↔AC↔tasks） |
| `/ss-status` | 通用 | 查看所有变更状态 |
| `/ss-search <q>` | 通用 | 全文搜索 |
| `/ss-link` | 通用 | 添加 spec 依赖 |
| `/ss-deps` | 通用 | 查看依赖图 |

### 使用示例

```
你:   /ss-create 添加用户认证 @jay
AI:   → 执行 `superspec create addUserAuth --intent-type feature`
      → 生成 proposal.md
      → 等待你确认

你:   /ss-tasks
AI:   → 读取 proposal.md → 生成分阶段任务

你:   /ss-apply
AI:   → 逐个执行任务，每个完成后标记 ✅

你:   /ss-resume    （新对话 / 中断后继续）
AI:   → 运行 sync → 读取 context.md → 从上次中断处继续
```

## CLI 命令

### 初始化

#### `superspec init`

初始化 SuperSpec 到当前项目。

```bash
superspec init                  # 默认（英文模板）
superspec init --lang zh        # 中文模板
superspec init --ai claude      # 指定 AI 助手类型
superspec init --force          # 强制覆盖已有配置
```

### 核心流程

#### `superspec create <feature>`

创建变更文件夹并生成 proposal 模板。

```bash
superspec create add-dark-mode                              # 标准模式
superspec create add-auth -b                                # 增强模式
superspec create redesign-ui -c                             # 创造模式
superspec create new-arch -b -c --no-branch                 # 增强 + 创造 + 不创建分支
superspec create add-auth --spec-dir specs --branch-prefix feature/  # 自定义选项
```

#### `superspec archive [name]`

归档已完成的变更。

```bash
superspec archive add-auth      # 归档指定变更
superspec archive --all         # 归档所有已完成的变更
```

#### `superspec update`

刷新 agent 指令和模板到最新版本。

```bash
superspec update
```

### 质量与验证

#### `superspec lint [name]`

检查 artifact 行数是否超限。

```bash
superspec lint add-auth         # 检查指定变更
superspec lint                  # 检查所有活跃变更
```

#### `superspec validate [name]`

交叉验证 artifact 一致性（US↔FR↔AC↔tasks）。

```bash
superspec validate add-auth                 # 验证指定变更
superspec validate add-auth --check-deps    # 同时检查依赖一致性
superspec validate                          # 验证所有活跃变更
```

### 搜索与发现

#### `superspec search <query>`

全文搜索所有变更内容。

```bash
superspec search "JWT 认证"                          # 搜索活跃变更
superspec search "登录流程" --archived                # 包含已归档变更
superspec search "refresh token" --artifact tasks    # 按 artifact 类型过滤
```

#### `superspec status`

查看所有活跃变更及其 artifact 状态。

```bash
superspec status
```

### 依赖管理

#### `superspec deps add <name>`

```bash
superspec deps add add-auth --on setup-database
```

#### `superspec deps remove <name>`

```bash
superspec deps remove add-auth --on setup-database
```

#### `superspec deps list [name]`

```bash
superspec deps list add-auth    # 查看指定变更的依赖
superspec deps list             # 查看所有依赖关系
```

### Vibe Coding（SDD 后阶段）

#### `superspec sync [name]`

生成/刷新 `context.md`，包含 git diff 信息（零 AI token — 纯 CLI 操作）。使用 `--no-git` 跳过 git diff 收集。

```bash
superspec sync add-auth                 # 同步指定变更
superspec sync add-auth --base develop  # 指定基准分支
superspec sync                          # 同步所有活跃变更
```

## 策略：follow vs create

每个变更有 `strategy` 字段控制 AI 的实现方式：

| | `follow`（默认） | `create`（`-c`） |
|---|---|---|
| 读取项目规则 | 是，作为**约束** | 是，作为**参考** |
| 架构 | 必须对齐现有架构 | 可以提出替代方案 |
| 文件结构 | 匹配现有模式 | 可以引入新模式 |
| 适用场景 | 常规功能、bug 修复 | 重构、新模块、UX 创新 |

在 `superspec.config.json` 中配置项目规则文件：

```json
{
  "context": [".cursor/rules/coding-style.mdc", "AGENTS.md", "docs/conventions.md"]
}
```

## 第一性原理

| # | 原则 | 规则 |
|---|------|------|
| I | 上下文经济 | 每个 artifact < 300 行，硬限 400 行 |
| II | 信噪比 | 每个句子必须提供决策信息 |
| III | 意图优于实现 | 关注为什么和什么，不关注怎么做 |
| IV | 渐进式披露 | 从最小开始，仅在需要时扩展 |
| V | 必备内容 | 元数据、问题、方案、成功标准、权衡 |

## 配置

`superspec init` 生成 `superspec.config.json`：

| 字段 | 默认值 | 说明 |
|------|--------|------|
| `lang` | `"en"` | 模板语言（`zh` / `en`），同时控制 CLI 提示语言 |
| `specDir` | `"superspec"` | Spec 文件夹名 |
| `branchPrefix` | `"spec/"` | Git 分支前缀 |
| `boost` | `false` | 默认启用增强模式 |
| `strategy` | `"follow"` | `follow` = 遵循项目规则，`create` = 自由探索 |
| `context` | `[]` | AI 需要读取的项目规则文件 |
| `limits.targetLines` | `300` | 目标最大行数 |
| `limits.hardLines` | `400` | 硬限最大行数 |
| `archive.dir` | `"archive"` | 归档子目录 |
| `archive.datePrefix` | `true` | 归档文件夹加日期前缀 |

## 项目结构

```
SuperSpec/
├── package.json                 # monorepo 根
├── pnpm-workspace.yaml
├── tsconfig.json
└── packages/
    └── cli/                     # @superspec/cli
        ├── package.json
        ├── tsup.config.ts
        ├── src/
        │   ├── index.ts         # 库导出
        │   ├── cli/             # CLI 入口 (commander)
        │   ├── commands/        # create / archive / init / update / lint / validate / search / deps / status / sync
        │   ├── core/            # config / template / frontmatter / lint / validate / context
        │   ├── prompts/         # Agent 规则安装器
        │   ├── ui/              # 终端输出 (chalk)
        │   └── utils/           # fs / git / date / paths / template
        ├── templates/
        │   ├── zh/              # 中文模板
        │   └── en/              # 英文模板
        └── prompts/
            ├── rules.md         # Rules.md 模板
            └── agents.md        # AGENTS.md 模板
```

## 技术栈

- **语言**: TypeScript
- **构建**: tsup
- **包管理**: pnpm (monorepo)
- **运行时**: Node.js >= 18
- **依赖**: commander, chalk

## 开发

```bash
pnpm install          # 安装依赖
pnpm build            # 构建
pnpm dev              # 监听模式
pnpm --filter @superspec/cli typecheck   # 类型检查
```

## License

MIT
