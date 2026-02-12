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

从用户输入中提取四项：**功能名称**、**意图类型**、**开发者**、**语言**。

| 提取项 | 规则 | 示例 |
|--------|------|------|
| 功能名称 | 转为 camelCase。中文 → 先翻译为英文 | "add user auth" → `addUserAuth`; "添加用户认证" → `addUserAuth` |
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
  -b, --boost                          增强模式（spec + checklist）
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

**Steps**
1. 解析用户输入 → 提取功能名（camelCase）、意图类型、开发者、语言
2. 执行: `superspec create <feature> --intent-type <type> [--lang <lang>] [--user <user>]`
3. 前置审查: 读取项目上下文、检查现有变更、理解依赖关系
4. 评估复杂度: 如涉及多个独立能力域 → 考虑拆分 spec
5. 读取生成的 proposal.md → 理解范围; 如需 design.md → 明确架构决策
6. 等待用户确认后再继续 /ss-tasks
<!-- SUPERSPEC:END -->
