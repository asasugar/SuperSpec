---
name: feature-20260225-createSuperspecSpec-jayHsueh
status: done
strategy: follow
depends_on: []
input: "创建superspec的规格"
---

# Proposal: SuperSpec 产品规格

> Created: 2026-02-25

## Background

SuperSpec 是一个面向 AI 编码助手的规格驱动开发（SDD）工具。当前项目已有完整的 CLI 实现（v1.2.2），支持 10 种 AI 编辑器，但缺少一份正式的产品规格文档，导致：

- 新贡献者难以快速理解 SuperSpec 的完整功能边界
- 功能迭代缺乏明确的需求基线，容易引入范围蔓延
- AI Agent 指令（AGENTS.md）承担了过多职责——既是产品说明又是 AI 行为规范

## Goals

- [ ] 建立 SuperSpec 完整的产品规格文档，覆盖所有 CLI 命令和核心概念
- [ ] 明确功能边界和模块职责划分
- [ ] 为后续功能迭代提供可追溯的需求基线

## Non-Goals

- 不涉及 UI/UX 重设计或新功能开发
- 不改动现有代码实现
- 不替代 AGENTS.md 的 AI 行为指令角色

## Requirements

### 核心概念

1. **两种工作模式**：Standard（轻量：proposal + checklist + tasks）和 Boost（增强：+ spec + design）
2. **两种策略**：`follow`（遵循项目现有规范）和 `create`（自由探索新方案）
3. **Artifact 生命周期**：🟡 Draft → 🟢 Ready → ✅ Done，按需生成、从不预创建空模板
4. **配置驱动**：`superspec.config.json` 控制语言、目录、分支模板、模式、策略、限制

### CLI 命令集

| 命令 | 职责 |
|------|------|
| `init` | 初始化项目：生成配置、安装 AI 编辑器指令和模板 |
| `create` | 创建变更文件夹 + git 分支，AI 按需生成 artifacts |
| `archive` | 归档已完成的变更 |
| `update` | 刷新 agent 指令和模板至最新版本 |
| `lint` | 检查 artifact 行数是否超限（target 300 / hard 400） |
| `validate` | 交叉验证 artifact 一致性（US↔FR↔AC↔tasks） |
| `search` | 全文搜索变更内容，支持正则和类型过滤 |
| `deps` | 管理 spec 间的依赖关系（add/list/remove） |
| `status` | 查看所有变更状态 |
| `list` | 列出变更名称（脚本友好） |
| `sync` | 收集 git diff 到 context.md（零 AI token） |

### 多 AI 编辑器支持

支持 10 种编辑器：cursor, claude, copilot, gemini, windsurf, qwen, opencode, codex, codebuddy, qoder

每种编辑器有不同的命令安装路径和格式适配：
- Gemini：.md → .toml 转换
- Copilot：.agent.md + .prompt.md 双文件
- 其他：直接复制 .md 命令文件

### 模板系统

6 个 artifact 模板：proposal, spec, tasks, checklist, clarify, design
- 模板作为结构参考，AI 生成真实内容
- 支持 YAML frontmatter（name, status, strategy, depends_on, input）
- Boost 模式支持 capability-based 拆分（specs/ 子目录）

### Git 集成

- 分支自动创建，命名模板可配：`{prefix}{intentType}-{date}-{feature}-{user}`
- `sync` 命令收集 git diff 到 context.md 用于对话恢复
- `archive` 移动已完成变更到 archive 目录

## Technical Solution

### 架构概览

```
superspec-monorepo/
├── packages/cli/              # @superspec/cli 核心包
│   ├── src/
│   │   ├── cli/index.ts       # Commander.js 入口
│   │   ├── commands/          # 11 个命令实现
│   │   ├── core/              # 核心模块：config, context, frontmatter, lint, template, validate
│   │   ├── prompts/           # AI 指令安装器（agents.md, rules, commands）
│   │   ├── ui/                # 终端输出、i18n
│   │   └── utils/             # 工具：date, fs, git, paths, template
│   ├── prompts/               # 源 prompt 文件
│   └── templates/             # 多语言命令模板（zh/en）
├── superspec/
│   ├── templates/             # artifact 模板
│   └── changes/               # 活跃变更
├── AGENTS.md                  # AI Agent 行为指令
└── superspec.config.json      # 项目配置
```

### 技术栈

- **运行时**：Node.js >= 18
- **语言**：TypeScript，tsup 构建
- **包管理**：pnpm monorepo
- **CLI 框架**：Commander.js
- **样式**：Chalk 终端着色
- **发布**：@changesets/cli 版本管理
- **代码质量**：Biome lint/format

### 模块职责

| 模块 | 文件 | 职责 |
|------|------|------|
| Config | `core/config.ts` | 加载和合并配置，deepMerge 策略 |
| Context | `core/context.ts` | 生成 context.md（目标/进度/git 变更摘要） |
| Frontmatter | `core/frontmatter.ts` | YAML frontmatter 解析和更新 |
| Lint | `core/lint.ts` | 行数检查（target/hard limit） |
| Template | `core/template.ts` | 模板变量替换 |
| Validate | `core/validate.ts` | 交叉引用一致性检查 |
| Prompts | `prompts/index.ts` | 多编辑器指令安装（rules, agents.md, commands） |
| Git | `utils/git.ts` | 分支操作、diff 收集、用户信息 |

### 数据流

```
用户输入 → /ss-create 解析 → CLI create 创建文件夹+分支
→ AI 读取模板 → 生成 proposal → auto-checklist 质量门禁
→ /ss-tasks 拆分任务 → /ss-apply 执行实现
→ sync 收集 diff → /ss-resume 恢复上下文 → /ss-archive 归档
```

## Impact Scope

- **Modules**：无代码改动，纯文档产出
- **Files**：本变更目录下的 proposal.md, checklist.md, tasks.md
- **Dependencies**：无

## Risks & Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| 规格与实现偏离 | 文档失去参考价值 | 以当前代码为基准编写，标注版本号 v1.2.2 |
| 规格过于细节化 | 维护成本高，与代码重复 | 遵循 Intent Over Implementation 原则，聚焦 what/why |
| 缺少使用场景示例 | 规格难以理解 | 每个核心概念附带简短用例 |

## Open Questions

1. 是否需要为每种 AI 编辑器的适配逻辑单独出规格？（非阻塞）
2. 模板系统是否计划支持用户自定义模板扩展？（非阻塞）

---

**Status**: ✅ Done
