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

| Pain Point | How SuperSpec Solves It |
|---|---|
| AI codes without context | `strategy` + `context` config |
| Specs too long | First Principles + `lint` |
| No requirement↔task traceability | `validate` |
| Spec dependencies unclear | `depends_on` + `deps add`/`deps list` |
| Past decisions hard to find | `search` |
| Over-spec for simple work | Standard vs Boost mode |
| Project rules = token waste | `context` file list |
| Vibe coding loses context | `sync` + `context.md` + `/ss-resume` |
| Code/spec drift | Git Changes in context.md |
| Progress visibility | `status` |
| No project-level tuning | `superspec.config.json` |

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
# Initialize in your project (default: English)
cd your-project
superspec init

# Initialize with Chinese templates
superspec init --lang zh

# Create a change (standard — lightweight)
superspec create add-dark-mode

# Create with boost mode (full SDD)
superspec create add-auth -b

# Creative mode (explore new patterns)
superspec create redesign-ui -c
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

| Command | What it does |
|---------|-------------|
| `/ss-create <feature>` | Create change + generate proposal (boost: + spec + checklist) |
| `/ss-tasks` | Generate task list from proposal |
| `/ss-apply` | Implement tasks one by one |
| `/ss-resume` | Restore spec context for vibe coding (runs sync → reads context.md) |
| `/ss-archive` | Archive completed change |

### Quality & Discovery

| Command | Mode | What it does |
|---------|------|-------------|
| `/ss-clarify` | Both | Resolve ambiguity, record decisions |
| `/ss-checklist` | Boost | Quality gate before apply |
| `/ss-lint` | Both | Check artifact sizes |
| `/ss-validate` | Boost | Cross-reference consistency check (US↔FR↔AC↔tasks) |
| `/ss-status` | Both | View all changes and their status |
| `/ss-search <q>` | Both | Full-text search across changes |
| `/ss-link` | Both | Add spec dependency |
| `/ss-deps` | Both | View dependency graph |

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
superspec init --ai claude      # Specify AI assistant type
superspec init --force          # Force overwrite existing config
```

### Core Workflow

#### `superspec create <feature>`

Create a change folder and generate proposal template.

```bash
superspec create add-dark-mode                              # Standard mode
superspec create add-auth -b                                # Boost mode
superspec create redesign-ui -c                             # Creative mode
superspec create new-arch -b -c --no-branch                 # Boost + creative + skip branch
superspec create add-auth --spec-dir specs --branch-prefix feature/  # Custom options
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
superspec search "refresh token" --artifact tasks    # Filter by artifact type
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

Generate/refresh `context.md` summary with git diff (zero AI tokens — pure CLI). Use `--no-git` to skip git diff collection.

```bash
superspec sync add-auth                 # Sync a specific change
superspec sync add-auth --base develop  # Sync with custom base branch
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
