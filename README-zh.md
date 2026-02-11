# SuperSpec

面向 AI 编程助手的规格驱动开发 (SDD) 工具。

[English](./README.md)

## 安装

```bash
# 前置要求
node >= 18.0.0
pnpm >= 8

# 克隆并构建
git clone https://github.com/<your-org>/SuperSpec.git
cd SuperSpec
pnpm install
pnpm build

# 全局链接 CLI
cd packages/cli && npm link
```

## 使用

```bash
# 在目标项目中初始化（默认中文模板）
cd your-project
superspec init

# 英文模板
superspec init --lang en

# 创建新变更
superspec new add-dark-mode

# 增强模式（含 checklist 和交叉验证）
superspec new add-auth -b

# 归档已完成的变更
superspec archive add-dark-mode

# 更新模板和 agent 规则
superspec update
```

## Slash Commands

| 命令 | 说明 |
|------|------|
| `/ss:new <name>` | 创建新变更 |
| `/ss:proposal` | 生成提案 |
| `/ss:spec` | 生成规格说明 |
| `/ss:tasks` | 生成任务清单 |
| `/ss:clarify` | 澄清确认 |
| `/ss:apply` | 执行实现 |
| `/ss:ff` | 快速前进 — 一次性生成所有规划文档 |
| `/ss:archive` | 归档变更 |
| `/ss:checklist` | 质量检查 (boost) |
| `/ss:status` | 查看状态 |

## 工作流

```
/ss:new → /ss:proposal → /ss:spec → /ss:tasks → /ss:apply → /ss:archive
                ↕                       ↕
           /ss:clarify             /ss:checklist (-b)
```

## 核心目录结构

```
SuperSpec/
├── package.json                 # monorepo 根配置
├── pnpm-workspace.yaml
├── tsconfig.json
└── packages/
    └── cli/                     # @superspec/cli
        ├── package.json
        ├── tsup.config.ts
        ├── src/
        │   ├── index.ts         # 库导出
        │   ├── cli/             # CLI 入口（commander）
        │   ├── commands/        # init / new / archive / update
        │   ├── core/            # 配置系统 / 模板引擎
        │   ├── prompts/         # Agent rules 安装
        │   ├── ui/              # 终端输出
        │   ├── utils/           # fs / git / date / paths
        │   └── telemetry/       # 遥测（预留）
        ├── templates/
        │   ├── zh/              # 中文模板
        │   └── en/              # 英文模板
        └── prompts/
            ├── cursor-rules.md  # Cursor slash commands
            └── agents.md        # AGENTS.md 模板
```

## 配置

`superspec init` 会在目标项目生成 `superspec.config.json`：

```json
{
  "lang": "zh",
  "specDir": "superspec",
  "branchPrefix": "spec/",
  "branchTemplate": "{prefix}{name}",
  "boost": false,
  "archive": { "dir": "archive", "datePrefix": true }
}
```

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `lang` | 模板语言 `"zh"` / `"en"` | `"zh"` |
| `specDir` | 规格文件夹名称 | `"superspec"` |
| `branchPrefix` | 分支前缀 | `"spec/"` |
| `branchTemplate` | 分支命名模板 | `"{prefix}{name}"` |
| `boost` | 默认启用增强模式 | `false` |
| `archive.dir` | 归档子目录 | `"archive"` |
| `archive.datePrefix` | 归档目录加日期前缀 | `true` |

## 技术栈

- **语言**: TypeScript
- **构建**: tsup
- **包管理**: pnpm (monorepo)
- **运行时**: Node.js >= 18
- **依赖**: commander, chalk

## 开发

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 监听模式开发
pnpm dev

# 类型检查
pnpm --filter @superspec/cli typecheck
```
