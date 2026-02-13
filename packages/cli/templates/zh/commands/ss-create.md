---
name: /ss-create
id: ss-create
category: SuperSpec
description: 创建变更 + 生成 proposal（boost 模式额外生成 spec + design(当你需要) + checklist）
---
<!-- SUPERSPEC:START -->
## 用户输入

```text
$ARGUMENTS
```

你**必须**在继续之前考虑用户输入（如果非空）。

## 概述

用户在 `/ss-create` 后输入的文本**就是**功能描述。除非用户提供了空命令，否则不要要求用户重复输入。

**Guardrails**
- 首先读取 `superspec.config.json` → 获取 `lang`, `specDir`, `boost`, `strategy`, `context`, `branchPrefix`, `branchTemplate`, `changeNameTemplate`
- **执行前置审查**（参考 AGENTS.md "Before ANY Task"）:
  - 读取 `context` 文件、README、架构文档
  - 查看 `{specDir}/changes/` → 通过 `depends_on` 避免重复变更
- 永远不要手动创建变更文件夹 —— 使用 `superspec create <feature>` CLI
- 在提案阶段不要编写任何代码，只创建设计文档

**输入解析规则**

从用户输入中提取：**模式标志**、**功能名称**、**意图类型**、**开发者**、**语言**。

| 提取项 | 规则 | 示例 |
|--------|------|------|
| 模式标志 | 识别 `-b`/`--boost`/`boost`/`增强` → 增强模式; `-c`/`--creative`/`creative`/`创造` → 创造模式; `--no-branch`/`不建分支` → 跳过分支; 可组合使用 | `/ss-create -b 添加认证` → boost; `/ss-create -b -c 重构登录` → boost+creative |
| 功能名称 | 移除标志后剩余文本，转为 camelCase。中文 → 先翻译为英文 | "add user auth" → `addUserAuth`; "添加用户认证" → `addUserAuth` |
| 意图类型 | 语义推断 | add/new/implement/新增/添加 → `feature`; fix/bug/hotfix/修复 → `hotfix`; refactor/optimize/重构 → `refactor`; docs → `docs`; test → `test`; build/deps → `chore`; 默认 → `feature` |
| 开发者 | "@username" 或 "Developer: xxx" → 提取（移除"@"）。回退: git 用户名 | "添加todolist @jay" → user=`jay` |
| 语言 | CJK 字符 → `zh`; 显式 "zh"/"中文" → `zh`; "en"/"English" → `en`; 回退: 配置 `lang` | "添加todolist" → `zh` |

**命名模板**

配置支持使用变量 `{date}`, `{feature}`, `{user}`, `{intentType}`, `{prefix}` 的自定义模板:
- `branchTemplate`（默认: `{intentType}-{date}-{feature}-{user}`）
- `changeNameTemplate`（默认: `{intentType}-{date}-{feature}-{user}`）

```bash
# "添加todolist @jay" → feature=addTodolist, user=jay, intentType=feature, lang=zh
superspec create addTodolist --intent-type feature --lang zh
# 分支: feature-20260212-addTodolist-jay

# "fix login bug" → feature=fixLoginBug, intentType=hotfix, user=<git用户名>
superspec create fixLoginBug --intent-type hotfix
# 分支: hotfix-20260212-fixLoginBug-gitusername
```

如果用户提供自定义 `--branch-prefix`，添加到模板前面。

**CLI 命令结构**
```bash
superspec create <feature> [options]
  -b, --boost                          增强模式（spec（支持拆分子 spec ）+ design + checklist）
  -c, --creative                       创造模式（探索新方案）
  -d, --description <desc>             变更描述
  --no-branch                          跳过 git 分支创建
  --spec-dir <dir>                     自定义 spec 文件夹
  --branch-prefix <prefix>             自定义分支前缀
  --branch-template <template>         覆盖分支名模板
  --change-name-template <template>    覆盖文件夹名模板
  --intent-type <type>                 意图类型（feature, hotfix, bugfix, refactor, chore）
  --feature <feature>                  功能名称
  --user <user>                        开发者标识
  --lang <lang>                        SDD 文档语言（en, zh）
```

**何时使用 design.md**（boost 模式可选）:
- 方案跨越多个系统或引入新架构模式
- 重大架构决策且有显著权衡
- 需要跨团队架构对齐

**Spec 能力域拆分**（推荐用于大型变更）:
当变更涉及多个独立能力时，按能力域拆分:
```
{specDir}/changes/<name>/
├── proposal.md
├── design.md      （可选）
├── specs/
│   ├── auth/spec.md
│   ├── api/spec.md
│   └── ui/spec.md
├── tasks.md
└── checklist.md
```
每个 spec.md < 300 行。在 proposal.md 中概述能力域，tasks.md 按能力域分组。

**Artifact 按需生成原则**
- CLI `superspec create` **只创建文件夹 + git 分支**，不生成任何 artifact 文件
- AI 读取 `{specDir}/templates/` 下的模板作为**结构参考**，直接生成包含真实内容的 artifact
- 只在当前步骤需要时才生成对应文件，不预先创建空模板

**Strategy 优先级**（从高到低）
1. 用户输入中的 `-c`/`--creative`/`创造` 标志
2. `superspec.config.json` 中的 `strategy` 默认值

**Standard 与 Boost 内容定位**
- **Standard**: proposal.md 自含需求 + 技术方案，足以直接拆分 task（无需 spec.md）
- **Boost**: proposal.md 聚焦需求背景（Background, Goals, Non-Goals, Impact, Risks）；spec.md 承载需求细节和交互（US/FR/AC/Edge Cases）；design.md 可选承载架构决策

**Steps（Standard 模式）**
1. 解析用户输入 → 提取功能名（camelCase）、意图类型、开发者、语言；**保留用户原始输入文本**
2. 确定 strategy（按优先级）：用户输入 `-c` → config 默认值
3. 执行: `superspec create <feature> --intent-type <type> [--lang <lang>] [--user <user>] [-c]`（只创建文件夹 + 分支）
4. 前置审查: 读取项目上下文、检查现有变更、理解依赖关系
5. 读取 `{specDir}/templates/proposal.md` 作结构参考 → **直接生成** proposal.md（含需求描述 + 技术方案，必须具体到可拆分 task）。frontmatter `input` 字段填入用户原始输入
6. **自动执行 checklist 检查**（Standard 检查项，满分 10）：读取 `{specDir}/templates/checklist.md`，评估 proposal 质量
7. 通过 → 生成 checklist.md，提示可执行 /ss-tasks；不通过 → 修复 proposal 后重新检查

**Steps（Boost 模式）**
1. 解析用户输入 → 提取功能名（camelCase）、意图类型、开发者、语言；**保留用户原始输入文本**
2. 确定 strategy（按优先级）：用户输入 `-c` → config 默认值
3. 执行: `superspec create <feature> --intent-type <type> [--lang <lang>] [--user <user>] -b [-c]`（只创建文件夹 + 分支）
4. 前置审查: 读取项目上下文、检查现有变更、理解依赖关系
5. 读取 `{specDir}/templates/proposal.md` 作结构参考 → **直接生成** proposal.md（聚焦需求背景）。frontmatter `input` 字段填入用户原始输入
6. 读取 `{specDir}/templates/spec.md` 作结构参考 → **直接生成** spec.md（需求细节 + 交互）
7. **自动复杂度评估**：是否需要拆分 spec（多能力域 / spec > 300 行）、是否需要 design.md（跨系统 / 重大架构决策）
8. 如需 → 拆分 spec 到 `specs/<capability>/spec.md`；如需 → 读取 design 模板生成 design.md
9. **自动执行 checklist 检查**（Boost 检查项，满分 25）：读取 `{specDir}/templates/checklist.md`，评估所有已有 artifacts
10. 通过 → 生成 checklist.md，提示可执行 /ss-tasks；不通过 → 修复后重新检查
<!-- SUPERSPEC:END -->
