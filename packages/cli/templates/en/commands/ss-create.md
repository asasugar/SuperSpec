---
name: /ss-create
id: ss-create
category: SuperSpec
description: Create or update the feature specification from a natural language feature with proposal (boost mode adds spec + design + checklist)
---
<!-- SUPERSPEC:START -->
## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

The text the user typed after `/ss-create` **is** the feature description. Do not ask the user to repeat it unless they provided an empty command.

**Guardrails**
- Read `superspec.config.json` first → get `lang`, `specDir`, `boost`, `strategy`, `context`, `branchPrefix`, `branchTemplate`, `changeNameTemplate`
- **Pre-task review** (refer to AGENTS.md "Before ANY Task"):
  - Read `context` files, README, architecture docs
  - Inspect `{specDir}/changes/` → avoid duplicate changes via `depends_on`
- Never create change folders manually — use `superspec create <feature>` CLI
- Do not write any code during the proposal stage. Only create design documents

**Input Parsing Rules**

From user input, extract: **mode flags**, **feature name**, **intent type**, **developer**, **lang**.

| Extract | Rule | Example |
|---------|------|---------|
| Mode flags | Detect `-b`/`--boost`/`boost` → boost mode; `-c`/`--creative`/`creative` → creative mode; `--no-branch` → skip branch; flags can be combined | `/ss-create -b add auth` → boost; `/ss-create -b -c refactor login` → boost+creative |
| Feature name | Remove flags from input, convert remainder to camelCase. Chinese → translate to English first | "add user auth" → `addUserAuth`; "添加用户认证" → `addUserAuth` |
| Intent type | Semantic inference from input | add/new/implement → `feature`; fix/bug/hotfix → `hotfix`; refactor/optimize → `refactor`; docs → `docs`; test → `test`; build/deps → `chore`; default → `feature` |
| Developer | "@username" or "Developer: xxx" → extract (remove "@"). Fallback: git user name | "添加todolist @jay" → user=`jay` |
| Lang | CJK chars → `zh`; explicit "zh"/"中文" → `zh`; "en"/"English" → `en`; fallback: config `lang` | "添加todolist" → `zh` |

**Naming Templates**

Config supports custom templates with variables `{date}`, `{feature}`, `{user}`, `{intentType}`, `{prefix}`:
- `branchTemplate` (default: `{intentType}-{date}-{feature}-{user}`)
- `changeNameTemplate` (default: `{intentType}-{date}-{feature}-{user}`)

```bash
# "添加todolist @jay" → feature=addTodolist, user=jay, intentType=feature, lang=zh
superspec create addTodolist --intent-type feature --lang zh
# Branch: feature-20260212-addTodolist-jay

# "fix login bug" → feature=fixLoginBug, intentType=hotfix, user=<git username>
superspec create fixLoginBug --intent-type hotfix
# Branch: hotfix-20260212-fixLoginBug-gitusername
```

If user provides custom `--branch-prefix`, prepend to template.

**CLI Command Structure**
```bash
superspec create <feature> [options]
  -b, --boost                          Boost mode (spec + design + checklist)
  -c, --creative                       Creative mode (explore new solutions)
  -d, --description <desc>             Change description
  --no-branch                          Skip git branch creation
  --spec-dir <dir>                     Custom spec folder
  --branch-prefix <prefix>             Custom branch prefix
  --branch-template <template>         Override branch name template
  --change-name-template <template>    Override folder name template
  --intent-type <type>                 Intent type (feature, hotfix, bugfix, refactor, chore)
  --feature <feature>                  Feature name
  --user <user>                        Developer identifier
  --lang <lang>                        SDD Document Language (en, zh)
```

**When to use design.md** (optional, boost mode):
- Solution spans multiple systems or introduces new architectural patterns
- Major architectural decisions with significant trade-offs
- Cross-team architecture alignment needed

**Spec Capability Splitting** (recommended for large changes):
When a change involves multiple independent capabilities, split by domain:
```
{specDir}/changes/<name>/
├── proposal.md
├── design.md      (optional)
├── specs/
│   ├── auth/spec.md
│   ├── api/spec.md
│   └── ui/spec.md
├── tasks.md
└── checklist.md
```
Each spec.md < 300 lines. Outline domains in proposal.md, group tasks by domain in tasks.md.

**Steps**
1. Parse user input → extract feature (camelCase), intent type, developer, lang
2. Run: `superspec create <feature> --intent-type <type> [--lang <lang>] [--user <user>]`
3. Pre-task review: read project context, check existing changes, understand dependencies
4. Assess complexity: if multiple independent capability domains → consider splitting spec
5. Read generated proposal.md → understand scope; if design.md needed → clarify architectural decisions
6. Wait for user confirmation before proceeding to /ss-tasks
<!-- SUPERSPEC:END -->
