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

用户在 `/ss-create` 后输入的文本**就是**功能描述。假设你在本次对话中始终可以访问该内容，即使 `$ARGUMENTS` 以字面形式出现。除非用户提供了空命令，否则不要要求用户重复输入。

**Guardrails**
- 首先读取 `superspec.config.json` 获取 `lang`, `specDir`, `boost`, `strategy`, `context`, `branchPrefix`, `branchTemplate`, `changeNameTemplate`
- **执行前置审查**（参考 AGENTS.md "Before ANY Task" 章节）:
  - 审查项目上下文: 读取 `context` 文件、README、架构文档
  - 检查现有状态: 运行 `/ss-status` 或查看 `{specDir}/changes/`
  - 检查依赖关系: 通过 `depends_on` 避免重复变更
- 永远不要手动创建变更文件夹 —— 使用 `superspec create <feature>` CLI
- 在提案阶段不要编写任何代码，只创建设计文档

**变更名称转换规则**:
1. **必须转换为 camelCase**: 将用户输入转换为 camelCase 格式作为 `<feature>` 参数
   - "add user auth" → `addUserAuth`
   - "fix login bug" → `fixLoginBug`
   - "添加用户认证" → `addUserAuth`（先翻译为英文，再转 camelCase）

2. **示例**:
   ```bash
   # 用户输入: "add login feature @jay"
   superspec create addLoginFeature --branch-prefix feature-
   # 生成: 20260212-addLoginFeature-jay

   # 用户输入: "修复登录问题 @jay"
   superspec create fixLoginIssue --branch-prefix hotfix-
   # 生成: 20260212-fixLoginIssue-jay
   ```

3. **转换步骤**:
   - 如果输入是中文，先翻译为英文
   - 按空格、连字符或下划线分割
   - 第一个单词小写，后续单词首字母大写
   - 移除所有分隔符

**智能分支前缀推断**
Agent 应分析用户输入并推断合适的意图类型:
1. 语义分析用户输入
2. 推断意图类型:
   - 新功能/新增 → `feature`
   - Bug 修复/热修复 → `hotfix`
   - 重构/优化 → `refactor`
   - 文档 → `docs`
   - 测试 → `test`
   - 构建/依赖/杂项 → `chore`
   - 默认回退 → `feature`
3. 传递 `--intent-type <推断值>` 给 CLI

语义推断示例:
- `add-login`, `new-auth`, `implement-chat` → `feature`
- `fix-crash`, `bug-memory-leak`, `hotfix-security` → `hotfix`
- `refactor-api`, `optimize-query`, `improve-performance` → `refactor`
- `新增登录`, `添加功能` → `feature`（中文）
- `修复崩溃`, `问题修正` → `hotfix`（中文）

**说明:**
- 默认 `branchPrefix` 为空字符串 (`""`)
- 如果用户提供自定义 `--branch-prefix`，使用它并添加到模板前面
- 意图类型通过 `{intentType}` 变量出现在分支名中

**命名模板**
配置文件支持使用变量的自定义命名模板:
- `branchTemplate`: Git 分支名（默认: `{intentType}-{date}-{feature}-{user}`）
- `changeNameTemplate`: 文件夹名（默认: `{intentType}-{date}-{feature}-{user}`）
- 可用变量: `{date}`, `{feature}`, `{user}`, `{intentType}`, `{prefix}`
- **开发者标识提取**:
  - 从用户输入提取: "@jay", "@username", "Developer: jay"
  - 如未指定，使用 git 用户名
  - 传给 CLI 前移除 "@" 符号

**开发者标识示例**:
```bash
# 用户输入: "添加todolist @jay"
# 提取: feature="addTodolist", user="jay", intentType="feature"
superspec create addTodolist --intent-type feature
# 分支: feature-20260212-addTodolist-jay
# 文件夹: feature-20260212-addTodolist-jay

# 用户输入: "fix login bug"（未指定开发者）
# 使用 git 用户名, intentType="hotfix"
superspec create fixLoginBug --intent-type hotfix
# 分支: hotfix-20260212-fixLoginBug-gitusername
# 文件夹: hotfix-20260212-fixLoginBug-gitusername
```

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
  --feature <feature>                   功能名称
  --user <user>                         开发者标识
```

**何时使用 design.md**（boost 模式可选）:
- 方案跨越多个系统或引入新架构模式
- 重大架构决策且有显著权衡
- 需要在编写 spec 前记录决策理由
- 需要跨团队架构对齐

**Spec 能力域拆分**（推荐用于大型变更）:
当变更涉及多个独立能力时，按能力域拆分 spec:
```
{specDir}/changes/<name>/
├── proposal.md
├── design.md      （可选）
├── specs/
│   ├── auth/      — 认证能力
│   │   └── spec.md
│   ├── api/       — API 层能力
│   │   └── spec.md
│   └── ui/        — UI 组件能力
│       └── spec.md
├── tasks.md
└── checklist.md
```

**拆分指引**:
1. 识别独立能力域（例如: auth, api, ui, data）
2. 每个能力域创建 `specs/<capability>/spec.md`
3. 确保每个 spec.md < 300 行
4. 在 proposal.md 中概述能力域划分
5. tasks.md 按能力域分组任务

**Steps**
1. **提取开发者标识**:
   - 查找 "@username" 模式或 "Developer: username"
   - 如果找到，提取用户名（移除 "@" 符号）
   - 如果未找到，使用 git 用户名
2. **转换功能名为 camelCase**: 应用上述转换规则
3. **推断意图类型**:
   - 语义分析用户输入，确定意图（feature/hotfix/bugfix/refactor/chore）
4. **执行命令**: `superspec create <camelCaseFeature> --intent-type <推断值>`
5. **前置审查**: 读取项目上下文、检查现有变更、理解依赖关系
6. **评估复杂度**: 如果变更涉及多个独立能力域，考虑拆分 spec
7. 读取生成的 proposal.md，理解变更范围，如需 design.md 则明确架构决策
8. 等待用户确认后再继续 /ss-tasks
<!-- SUPERSPEC:END -->
