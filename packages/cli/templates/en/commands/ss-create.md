---
name: /ss-create
id: ss-create
category: SuperSpec
description: Create or update the feature specification from a natural language feature  with proposal (boost mode adds spec + checklist)
---
<!-- SUPERSPEC:START -->
## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

The text the user typed after `/ss-create` in the triggering message **is** the feature description. Assume you always have it available in this conversation even if `$ARGUMENTS` appears literally below. Do not ask the user to repeat it unless they provided an empty command.

**Guardrails**
- Read `superspec.config.json` first to get `lang`, `specDir`, `boost`, `strategy`, `context`, `branchPrefix`, `branchTemplate`, `changeNameTemplate`
- **Pre-task review** (refer to AGENTS.md "Before ANY Task" section):
  - Review project context: read `context` files, README, architecture docs
  - Check existing status: run `/ss-status` or inspect `{specDir}/changes/`
  - Check dependencies: avoid duplicate changes via `depends_on`
- Never create change folders manually — use `superspec create <feature>` CLI
- Do not write any code during the proposal stage. Only create design documents

**Change Name Transformation Rules**:
1. **MUST convert to camelCase**: Transform user input to camelCase format for `<feature>` parameter
   - "add user auth" → `addUserAuth`
   - "fix login bug" → `fixLoginBug`
   - "添加用户认证" → `addUserAuth` (translate Chinese to English first, then camelCase)

2. **Examples**:
   ```bash
   # User input: "add login feature @jay"
   superspec create addLoginFeature --branch-prefix feature-
   # Generates: 20260212-addLoginFeature-jay

   # User input: "修复登录问题 @jay"
   superspec create fixLoginIssue --branch-prefix hotfix-
   # Generates: 20260212-fixLoginIssue-jay
   ```

3. **Transformation steps**:
   - If input is Chinese, translate to English first
   - Split by spaces, hyphens, or underscores
   - First word lowercase, capitalize first letter of subsequent words
   - Remove all separators

**Smart Branch Prefix Inference**
Agent should analyze user input and infer appropriate intent type:
1. Analyze the user input semantically
2. Infer intent type:
   - New features/additions → `feature`
   - Bug fixes/hotfixes → `hotfix`
   - Refactoring/optimization → `refactor`
   - Documentation → `docs`
   - Testing → `test`
   - Build/dependencies/chores → `chore`
   - Default fallback → `feature`
3. Pass `--intent-type <inferred>` to CLI

Examples of semantic inference:
- `add-login`, `new-auth`, `implement-chat` → `feature`
- `fix-crash`, `bug-memory-leak`, `hotfix-security` → `hotfix`
- `refactor-api`, `optimize-query`, `improve-performance` → `refactor`
- `新增登录`, `添加功能` → `feature` (Chinese)
- `修复崩溃`, `问题修正` → `hotfix` (Chinese)

**Notes:**
- Default `branchPrefix` is empty string (`""`)
- If user provides custom `--branch-prefix`, use it and prepend to template
- Intent type appears in branch name via `{intentType}` variable

**Naming Templates**
Config file supports custom naming templates with variables:
- `branchTemplate`: Git branch name (default: `{intentType}-{date}-{feature}-{user}`)
- `changeNameTemplate`: Folder name (default: `{intentType}-{date}-{feature}-{user}`)
- Available variables: `{date}`, `{feature}`, `{user}`, `{intentType}`, `{prefix}`
- **Developer identifier extraction**:
  - Extract from user input: "@jay", "@username", "Developer: jay"
  - If not specified, use git user name
  - Remove "@" symbol before passing to CLI

**Developer Identifier Examples**:
```bash
# User input: "添加todolist @jay"
# Extracted: feature="addTodolist", user="jay", intentType="feature"
superspec create addTodolist --intent-type feature
# Branch: feature-20260212-addTodolist-jay
# Folder: feature-20260212-addTodolist-jay

# User input: "fix login bug" (no developer specified)
# Use git user name, intentType="hotfix"
superspec create fixLoginBug --intent-type hotfix
# Branch: hotfix-20260212-fixLoginBug-gitusername
# Folder: hotfix-20260212-fixLoginBug-gitusername
```

**CLI Command Structure**
```bash
superspec create <feature> [options]
  -b, --boost                          Boost mode (spec + checklist)
  -c, --creative                       Creative mode (explore new solutions)
  -d, --description <desc>             Change description
  --no-branch                          Skip git branch creation
  --spec-dir <dir>                     Custom spec folder
  --branch-prefix <prefix>             Custom branch prefix
  --branch-template <template>         Override branch name template
  --change-name-template <template>    Override folder name template
  --intent-type <type>                 Intent type (feature, hotfix, bugfix, refactor, chore)
  --feature <feature>                   Feature name
  --user <user>                         Developer identifier
```

**When to use design.md** (optional in boost mode):
- Solution spans multiple systems or introduces new architectural patterns
- Major architectural decisions with significant trade-offs
- Need to document decision rationale before writing spec
- Cross-team architecture alignment needed

**Spec Capability Splitting** (recommended for large changes):
When a change involves multiple independent capabilities, split spec by capability domain:
```
{specDir}/changes/<name>/
├── proposal.md
├── design.md      (optional)
├── specs/
│   ├── auth/      — authentication capability
│   │   └── spec.md
│   ├── api/       — API layer capability
│   │   └── spec.md
│   └── ui/        — UI component capability
│       └── spec.md
├── tasks.md
└── checklist.md
```

**Splitting guidelines**:
1. Identify independent capability domains (e.g.: auth, api, ui, data)
2. Create `specs/<capability>/spec.md` for each domain
3. Ensure each spec.md < 300 lines
4. Outline capability domains in proposal.md
5. Group tasks by capability domain in tasks.md

**Steps**
1. **Extract developer identifier from user input**:
   - Look for "@username" pattern or "Developer: username"
   - If found, extract username (remove "@" symbol)
   - If not found, use git user name
2. **Transform feature name to camelCase**: Apply transformation rules above
3. **Infer intent type**:
   - Analyze user input semantically to determine intent (feature/hotfix/bugfix/refactor/chore)
4. **Run command**: `superspec create <camelCaseFeature> --intent-type <inferred>`
5. **Pre-task review**: Read project context, check existing changes, understand dependencies
6. **Assess complexity**: If change involves multiple independent capability domains, consider splitting spec
7. Read the generated proposal.md and understand the change scope; if design.md is needed, clarify architectural decisions
8. Wait for user confirmation before proceeding to /ss-tasks
<!-- SUPERSPEC:END -->
