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

**On-demand Artifact Generation**
- CLI `superspec create` **only creates folder + git branch**, no artifact files
- AI reads templates from `{specDir}/templates/` as **structural reference**, then directly generates artifacts with real content
- Only generate files when the current step requires them, never pre-create empty templates

**Strategy Priority** (highest to lowest)
1. `-c`/`--creative`/`creative` flag in user input
2. `strategy` default in `superspec.config.json`

**Standard vs Boost Content Focus**
- **Standard**: proposal.md is self-contained with requirements + technical solution, sufficient to directly split into tasks (no spec.md needed)
- **Boost**: proposal.md focuses on requirements background (Background, Goals, Non-Goals, Impact, Risks); spec.md carries requirement details and interactions (US/FR/AC/Edge Cases); design.md optionally carries architecture decisions

**Steps (Standard mode)**
1. Parse user input → extract feature (camelCase), intent type, developer, lang; **preserve original user input text**
2. Determine strategy (by priority): user input `-c` → config default
3. Run: `superspec create <feature> --intent-type <type> [--lang <lang>] [--user <user>] [-c]` (creates folder + branch)
4. Pre-task review: read project context, check existing changes, understand dependencies
5. Read `{specDir}/templates/proposal.md` as structural reference → **directly generate** proposal.md (with requirements + technical solution, must be concrete enough to split into tasks). Fill frontmatter `input` field with user's original input
6. **Auto-run checklist check** (Standard checks, score / 10): read `{specDir}/templates/checklist.md`, evaluate proposal quality
7. Pass → generate checklist.md, prompt to run /ss-tasks; Fail → fix proposal and re-check

**Steps (Boost mode)**
1. Parse user input → extract feature (camelCase), intent type, developer, lang; **preserve original user input text**
2. Determine strategy (by priority): user input `-c` → config default
3. Run: `superspec create <feature> --intent-type <type> [--lang <lang>] [--user <user>] -b [-c]` (creates folder + branch)
4. Pre-task review: read project context, check existing changes, understand dependencies
5. Read `{specDir}/templates/proposal.md` as structural reference → **directly generate** proposal.md (focused on requirements background). Fill frontmatter `input` field with user's original input
6. Read `{specDir}/templates/spec.md` as structural reference → **directly generate** spec.md (requirement details + interactions)
7. **Auto complexity assessment**: whether to split spec (multi-capability / spec > 300 lines), whether design.md is needed (cross-system / major architecture decisions)
8. If needed → split spec into `specs/<capability>/spec.md`; if needed → read design template and generate design.md
9. **Auto-run checklist check** (Boost checks, score / 25): read `{specDir}/templates/checklist.md`, evaluate all existing artifacts
10. Pass → generate checklist.md, prompt to run /ss-tasks; Fail → fix and re-check
<!-- SUPERSPEC:END -->
