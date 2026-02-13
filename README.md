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

Spec-driven development (SDD) for AI-powered coding assistants.

[Documentation](./README.md) · [中文文档](./README-zh.md)

</div>

## Why SuperSpec?

AI coding assistants are powerful but often produce inconsistent, undocumented code when requirements are vague.

**Supported AI assistants:** [Cursor](https://cursor.com), [Claude Code](https://claude.ai), [Qwen](https://tongyi.aliyun.com) (通义), [OpenCode](https://opencode.com), [Codex](https://codex.ai), [CodeBuddy](https://codebuddy.ai), [Qoder](https://qoder.com). Any editor that reads `AGENTS.md` can use the workflow. Use `superspec init --ai cursor|claude|qwen|opencode|codex|codebuddy|qoder` to install editor-specific rules and slash commands (default: `cursor`).

### OpenSpec Pain Points

| # | OpenSpec Pain Point | SuperSpec Solution |
|---|---|---|
| 1 | No spec size control — specs grow unbounded, eating AI context window | First Principles + `lint` (target 300 / hard 400 lines), auto-split via `/ss-specs` |
| 2 | Validation inconsistency — `validate --strict` passes but `archive` fails | Unified validation pipeline: `lint` → `validate` → `checklist` → `archive` |
| 3 | No implementation↔spec verification — spec drift after coding | `sync` collects git diff into `context.md`, `/ss-resume` cross-references with spec |
| 4 | No vibe coding support — context lost when switching AI conversations | `sync` + `context.md` + `/ss-resume` restores full spec context in new sessions |
| 5 | No dependency management between specs | `depends_on` frontmatter + `deps add`/`deps list`/`deps remove` |
| 6 | No search across specs and archived changes | `search` with `--archived`, `--artifact`, `--regex` filters |
| 7 | No progress tracking or status visibility | `status` shows all changes with per-artifact status (Draft → Ready → Done) |
| 8 | Single mode — same overhead for simple fixes and large features | Standard mode (lightweight) vs Boost mode (full US/FR/AC + checklist) |
| 9 | No project-level configuration for AI context rules | `superspec.config.json` with `strategy`, `context`, `limits`, `branchTemplate` etc. |
| 10 | No cross-reference validation (US↔FR↔AC↔tasks) | `validate --check-deps` ensures full traceability |
| 11 | No i18n — English only | `--lang zh\|en`, full Chinese templates + CLI prompts |
| 12 | No task granularity control | Boost mode: each task < 1 hour, phased with parallel markers `[P]` |
| 13 | No automatic branch creation — inconsistent naming for change branches | `superspec create` auto-creates git branches from `branchTemplate`, with customizable `branchPrefix` / `branchTemplate` / `changeNameTemplate` |

### Spec-Kit Pain Points

| # | Spec-Kit Pain Point | SuperSpec Solution |
|---|---|---|
| 1 | Commands consume a large number of tokens, severely eating into the context window | Slash commands are file-based templates, loaded on-demand (zero idle cost) |
| 2 | Creates "illusion of work" — generates excessive documentation | First Principles: every sentence must inform a decision, signal-over-noise |
| 3 | Can't update/refine existing specs — always creates new branches | In-place spec evolution: edit proposal/spec/tasks directly, `/ss-clarify` for iterations |
| 4 | Ignores existing project structure and conventions | `strategy: follow` reads `context` files as constraints, matches existing patterns |
| 5 | Generates hundreds of unhelpful tests | No auto-test generation — task verification is developer-controlled |
| 6 | Poor for incremental development / small tasks | Standard mode for quick features; Boost only when needed (`-b`) |
| 7 | Python-based install (`uv tool`) — mismatched with JS/TS ecosystem | npm/pnpm/yarn install, native to Node.js ecosystem |
| 8 | No spec dependency management between changes | `depends_on` + `deps add`/`deps list` with dependency graph |
| 9 | No vibe coding / context restoration workflow | `sync` → `context.md` → `/ss-resume` for seamless continuation |
| 10 | Fails when initialized in subfolders | Works anywhere — `superspec.config.json` at project root, `specDir` configurable |
| 11 | No spec archiving with context preservation | `archive` moves completed changes, `search --archived` still finds them |
| 12 | Incompatible with latest AI tool upgrades | Editor-agnostic `AGENTS.md` + per-editor rules via `--ai` flag |
| 13 | Single mode and rigid configuration — no flexible switching between lightweight and Boost modes | SuperSpec lets you freely switch between Standard and Boost modes, with highly customizable `boost`, `strategy`, `branchTemplate` and more in `superspec.config.json` |
| 14 | No creative/exploration mode | `strategy: create` (`-c`) allows proposing new architectures with documented trade-offs |

## Installation

```bash
# npm
npm install -g @superspec/cli

# pnpm
pnpm add -g @superspec/cli

# yarn
yarn global add @superspec/cli
```

> Requires Node.js >= 18.0.0

## Quick Start

```bash
cd your-project

superspec init                  # Default (English templates)
superspec init --lang zh        # Chinese templates
superspec init --ai claude      # Specify AI assistant type (cursor|claude|qwen|opencode|codex|codebuddy|qoder)
superspec init --force          # Force overwrite existing config
superspec init --no-git         # Skip git initialization
```

## Core Workflow

```
Standard:  create → tasks → apply → [vibe: sync → resume] → archive
Boost:     create -b → tasks → apply → [vibe: sync → resume] → archive
```

**Standard mode** generates `proposal.md` + `tasks.md` — enough for simple features and bug fixes.

**Boost mode** adds `spec.md` (US/FR/AC) + `checklist.md` (quality gate) — for large features requiring design review and cross-validation.

**Vibe coding phase**: after `apply`, use `sync` to collect git changes and `/ss-resume` to restore context in new AI conversations.

## Slash Commands (AI Agent)

These are the primary commands you use with AI assistants. Type them directly in your AI chat:

### Main Flow

| Command | Flags | What it does |
|---------|-------|-------------|
| `/ss-create <feature>` | `-b` boost, `-c` creative, `-d <desc>`, `--no-branch`, `--spec-dir <dir>`, `--branch-prefix <prefix>`, `--branch-template <tpl>`, `--change-name-template <tpl>`, `--intent-type <type>`, `--user <user>`, `--lang <lang>` | Create change + generate proposal (boost: + spec + design + checklist) |
| `/ss-tasks` | — | Generate task list from proposal |
| `/ss-apply` | — | Implement tasks one by one |
| `/ss-resume` | — | Restore spec context for vibe coding (runs sync → reads context.md) |
| `/ss-archive [name]` | `--all` | Archive completed change |

### Quality & Discovery

| Command | Mode | Flags | What it does |
|---------|------|-------|-------------|
| `/ss-clarify` | Both | — | Resolve ambiguity, record decisions |
| `/ss-checklist` | Boost | — | Quality gate before apply |
| `/ss-lint [name]` | Both | — | Check artifact sizes |
| `/ss-validate [name]` | Boost | `--check-deps` | Cross-reference consistency check (US↔FR↔AC↔tasks) |
| `/ss-status` | Both | — | View all changes and their status |
| `/ss-search <q>` | Both | `--archived`, `--artifact <type>`, `--limit <n>`, `-E`/`--regex` | Full-text search across changes |
| `/ss-link <name>` | Both | `--on <other>` | Add spec dependency |
| `/ss-deps [name]` | Both | — | View dependency graph |

### Usage Example

```
You:  /ss-create add user authentication @jay
AI:   → runs `superspec create addUserAuth --intent-type feature`
      → generates proposal.md
      → waits for your confirmation

You:  /ss-tasks
AI:   → reads proposal.md → generates phased tasks

You:  /ss-apply
AI:   → implements tasks one by one, marks each ✅

You:  /ss-resume    (new conversation / after a break)
AI:   → runs sync → reads context.md → continues where you left off
```

## CLI Commands

### Setup

#### `superspec init`

Initialize SuperSpec in current project.

```bash
superspec init                  # Default (English templates)
superspec init --lang zh        # Chinese templates
superspec init --ai claude      # Specify AI assistant type (cursor|claude|qwen|opencode|codex|codebuddy|qoder)
superspec init --force          # Force overwrite existing config
superspec init --no-git         # Skip git initialization
```

### Core Workflow

#### `superspec create <feature>`

Create a change folder and generate proposal template.

```bash
superspec create add-dark-mode                              # Standard mode
superspec create add-auth -b                                # Boost mode (spec + design + checklist)
superspec create redesign-ui -c                             # Creative mode (explore new patterns)
superspec create new-arch -b -c --no-branch                 # Boost + creative + skip branch
superspec create add-auth -d "OAuth2 integration"           # With description
superspec create add-auth --spec-dir specs                  # Custom spec folder
superspec create add-auth --branch-prefix feature/          # Custom branch prefix
superspec create add-auth --branch-template "{prefix}{date}-{feature}-{user}"    # Custom branch name template
superspec create add-auth --change-name-template "{date}-{feature}-{user}"       # Custom folder name template
superspec create add-auth --intent-type hotfix              # Intent type (feature|hotfix|bugfix|refactor|chore)
superspec create add-auth --user jay                        # Developer identifier
superspec create add-auth --lang zh                         # SDD document language (en|zh)
```

#### `superspec archive [name]`

Archive completed changes.

```bash
superspec archive add-auth      # Archive a specific change
superspec archive --all         # Archive all completed changes
```

#### `superspec update`

Refresh agent instructions and templates to latest version.

```bash
superspec update
```

### Quality & Validation

#### `superspec lint [name]`

Check artifact sizes against configured limits.

```bash
superspec lint add-auth         # Lint a specific change
superspec lint                  # Lint all active changes
```

#### `superspec validate [name]`

Cross-reference consistency check (US↔FR↔AC↔tasks).

```bash
superspec validate add-auth                 # Validate a specific change
superspec validate add-auth --check-deps    # Validate with dependency check
superspec validate                          # Validate all active changes
```

### Search & Discovery

#### `superspec search <query>`

Full-text search across all changes.

```bash
superspec search "JWT authentication"               # Search active changes
superspec search "login flow" --archived             # Include archived changes
superspec search "refresh token" --artifact tasks    # Filter by artifact type (proposal|spec|tasks|clarify|checklist)
superspec search "auth" --limit 10                   # Limit results count (default: 50)
superspec search "user\d+" -E                        # Use regex pattern matching
```

#### `superspec status`

View all active changes and their artifact statuses.

```bash
superspec status
```

### Dependencies

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
superspec deps list add-auth    # View deps for a specific change
superspec deps list             # View all dependency relationships
```

### Vibe Coding (Post-SDD)

#### `superspec sync [name]`

Generate/refresh `context.md` summary with git diff (zero AI tokens — pure CLI).

```bash
superspec sync add-auth                 # Sync a specific change
superspec sync add-auth --base develop  # Sync with custom base branch
superspec sync add-auth --no-git        # Skip git diff collection
superspec sync                          # Sync all active changes
```

## Strategy: follow vs create

Each change has a `strategy` that controls how the AI agent approaches implementation:

| | `follow` (default) | `create` (`-c`) |
|---|---|---|
| Reads project rules | Yes, as **constraints** | Yes, as **awareness** |
| Architecture | Must align with existing | May propose alternatives |
| File structure | Match existing patterns | May introduce new patterns |
| Use case | Regular features, bug fixes | Refactoring, new modules, UX innovation |

Configure project rule files in `superspec.config.json`:

```json
{
  "context": [".cursor/rules/coding-style.mdc", "AGENTS.md", "docs/conventions.md"]
}
```

## First Principles

| # | Principle | Rule |
|---|-----------|------|
| I | Context Economy | < 300 lines per artifact, 400 hard limit |
| II | Signal-to-Noise | Every sentence must inform a decision |
| III | Intent Over Implementation | Focus on why and what, not how |
| IV | Progressive Disclosure | Start minimal, expand only when needed |
| V | Required Sections | Metadata, Problem, Solution, Success Criteria, Trade-offs |

## Configuration

`superspec init` generates `superspec.config.json`:

| Field | Default | Description |
|-------|---------|-------------|
| `lang` | `"en"` | Template language (`zh` / `en`). Also controls CLI prompt language |
| `specDir` | `"superspec"` | Spec folder name |
| `branchPrefix` | `"spec/"` | Git branch prefix |
| `boost` | `false` | Enable boost mode by default |
| `strategy` | `"follow"` | `follow` = obey project rules, `create` = explore freely |
| `context` | `[]` | Files AI should read for project conventions |
| `limits.targetLines` | `300` | Target max lines per artifact |
| `limits.hardLines` | `400` | Hard max lines per artifact |
| `archive.dir` | `"archive"` | Archive subdirectory |
| `archive.datePrefix` | `true` | Prefix archive folder with date |

## Project Structure

```
SuperSpec/
├── package.json                 # monorepo root
├── pnpm-workspace.yaml
├── tsconfig.json
└── packages/
    └── cli/                     # @superspec/cli
        ├── package.json
        ├── tsup.config.ts
        ├── src/
        │   ├── index.ts         # Library exports
        │   ├── cli/             # CLI entry (commander)
        │   ├── commands/        # create / archive / init / update / lint / validate / search / deps / status / sync
        │   ├── core/            # config / template / frontmatter / lint / validate / context
        │   ├── prompts/         # Agent rules installer
        │   ├── ui/              # Terminal output (chalk)
        │   └── utils/           # fs / git / date / paths / template
        ├── templates/
        │   ├── zh/              # Chinese templates
        │   └── en/              # English templates
        └── prompts/
            ├── rules.md         # Rules.md template
            └── agents.md        # AGENTS.md template
```

## Tech Stack

- **Language**: TypeScript
- **Build**: tsup
- **Package Manager**: pnpm (monorepo)
- **Runtime**: Node.js >= 18
- **Dependencies**: commander, chalk

## Development

```bash
pnpm install          # Install dependencies
pnpm build            # Build all packages
pnpm dev              # Watch mode
pnpm --filter @superspec/cli typecheck   # Type check
```

## License

MIT
