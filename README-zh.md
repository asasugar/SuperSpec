<div align="center">

# SuperSpec

<p align="center">
  <a href="https://www.npmjs.com/package/@superspec/cli"><img src="https://img.shields.io/npm/v/@superspec/cli.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@superspec/cli"><img src="https://img.shields.io/npm/dm/@superspec/cli.svg" alt="npm downloads"></a>
  <a href="https://github.com/asasugar/SuperSpec/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@superspec/cli.svg" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/@superspec/cli.svg" alt="node version"></a>
</p>

AI 编码助手的规格驱动开发 (SDD) 工具。

[English](./README.md) · [中文文档](./README-zh.md)

</div>

## 为什么需要 SuperSpec？

AI 编码助手（Cursor、Claude Code、Copilot）很强大，但需求模糊时容易产出不一致、无文档的代码。常见痛点：

| 痛点 | SuperSpec 如何解决 |
|---|---|
| **AI 不理解项目上下文就开始写代码** | `strategy: follow` 先读项目规则；`strategy: create` 允许创造性探索 |
| **Spec 越写越臃肿** | 第一性原理约束 < 300 行，`lint` 自动检测超限 |
| **需求和任务之间无法追溯** | `validate` 检查 US↔FR↔AC↔tasks 交叉引用 |
| **Spec 之间依赖关系不清** | frontmatter `depends_on` + `link`/`deps` 命令追踪依赖 |
| **找不到历史决策** | `search` 全文搜索活跃和已归档的变更 |
| **简单任务被过度规格化** | 标准模式只需 proposal + tasks，复杂需求才用 boost |
| **无法复用项目既有规范** | `context` 配置指向已有规则文件，不重复、省 token |
| **Vibe coding 时 AI 丢失上下文** | `sync` 收集 git diff 事实 + `context.md` 摘要，~200 token 恢复上下文 |

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

# 组合：增强 + 创造 + 不创建分支
superspec create new-arch -b -c --no-branch
```

## 核心流程

```
标准模式:  create → tasks → apply → [vibe: sync → resume] → archive
增强模式:  create -b → tasks → apply → [vibe: sync → resume] → archive
```

**标准模式** 生成 `proposal.md` + `tasks.md` — 适合简单功能和 bug 修复。

**增强模式** 额外生成 `spec.md`（US/FR/AC）+ `checklist.md`（质量门）— 适合大功能、需要设计评审和交叉验证的场景。

**Vibe coding 阶段**：`apply` 之后，用 `sync` 收集 git 变更，用 `/ss-resume` 在新 AI 对话中恢复上下文。

## CLI 命令

### 初始化

#### `superspec init`

初始化 SuperSpec 到当前项目。

```bash
# 默认（英文模板）
superspec init

# 中文模板
superspec init --lang zh

# 指定 AI 助手类型
superspec init --ai claude

# 强制覆盖已有配置
superspec init --force
```

### 核心流程

#### `superspec create <name>`

创建变更文件夹并生成 proposal 模板。

```bash
# 标准模式（proposal + tasks）
superspec create add-dark-mode

# 增强模式（proposal + spec + tasks + checklist）
superspec create add-auth -b

# 创造模式（自由探索新方案）
superspec create redesign-ui -c

# 增强 + 创造 + 不创建分支
superspec create new-arch -b -c --no-branch

# 自定义 spec 目录和分支前缀
superspec create add-auth --spec-dir specs --branch-prefix feature/
```

#### `superspec archive [name]`

归档已完成的变更。

```bash
# 归档指定变更
superspec archive add-auth

# 归档所有已完成的变更
superspec archive --all
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
# 检查指定变更
superspec lint add-auth

# 检查所有活跃变更
superspec lint
```

#### `superspec validate [name]`

交叉验证 artifact 一致性（US↔FR↔AC↔tasks）。

```bash
# 验证指定变更
superspec validate add-auth

# 同时检查依赖一致性
superspec validate add-auth --check-deps

# 验证所有活跃变更
superspec validate
```

### 搜索与发现

#### `superspec search <query>`

全文搜索所有变更内容。

```bash
# 搜索活跃变更
superspec search "JWT 认证"

# 包含已归档变更
superspec search "登录流程" --archived

# 按 artifact 类型过滤
superspec search "refresh token" --artifact tasks
```

#### `superspec status`

查看所有活跃变更及其 artifact 状态。

```bash
superspec status
# 输出:
# | Change      | Proposal | Spec | Tasks | Checklist | Status      |
# |-------------|----------|------|-------|-----------|-------------|
# | add-auth    | 🟢      | 🟢   | ✅    | 🟡       | in-progress |
# | fix-navbar  | 🟢      | —    | 🟢    | —         | ready       |
```

### 依赖管理

#### `superspec link <name>`

添加 spec 之间的依赖关系。

```bash
superspec link add-auth --depends-on setup-database
```

#### `superspec unlink <name>`

移除依赖关系。

```bash
superspec unlink add-auth --depends-on setup-database
```

#### `superspec deps [name]`

查看依赖关系图。

```bash
# 查看指定变更的依赖
superspec deps add-auth

# 查看所有依赖关系
superspec deps
```

### Vibe Coding（SDD 后阶段）

#### `superspec context [name]`

从 spec artifact 生成/刷新 `context.md` 上下文摘要。

```bash
# 生成指定变更的上下文
superspec context add-auth

# 刷新所有活跃变更
superspec context
```

#### `superspec sync [name]`

收集 git diff 到 `context.md`（零 AI token — 纯 CLI 操作）。

```bash
# 同步指定变更
superspec sync add-auth

# 指定基准分支
superspec sync add-auth --base develop

# 同步所有活跃变更
superspec sync
```

## Slash 命令（AI Agent）

| 命令 | 模式 | 功能 |
|------|------|------|
| `/ss-create <name>` | 通用 | 创建变更 + 生成 proposal（boost: + spec + checklist） |
| `/ss-tasks` | 通用 | 生成任务清单 |
| `/ss-apply` | 通用 | 执行实现 |
| `/ss-resume` | 通用 | 恢复 spec 上下文（运行 sync → 读取 context.md） |
| `/ss-clarify` | 通用 | 澄清歧义、记录决策 |
| `/ss-archive` | 通用 | 归档已完成的变更 |
| `/ss-checklist` | 增强 | apply 前的质量门 |
| `/ss-status` | 通用 | 查看所有变更状态 |
| `/ss-lint` | 通用 | 检查 artifact 大小 |
| `/ss-validate` | 增强 | 交叉引用一致性检查 |
| `/ss-search <q>` | 通用 | 全文搜索 |
| `/ss-link` | 通用 | 添加 spec 依赖 |
| `/ss-deps` | 通用 | 查看依赖图 |

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
        │   ├── commands/        # create / archive / init / update / lint / validate / search / link / status / context / sync
        │   ├── core/            # config / template / frontmatter / lint / validate / context
        │   ├── prompts/         # Agent 规则安装器
        │   ├── ui/              # 终端输出 (chalk)
        │   ├── utils/           # fs / git / date / paths
        │   └── telemetry/       # 遥测（占位）
        ├── templates/
        │   ├── zh/              # 中文模板
        │   └── en/              # 英文模板
        └── prompts/
            ├── cursor-rules.md  # Cursor slash 命令
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
