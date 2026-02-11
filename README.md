# SuperSpec

Spec-driven development (SDD) for AI-powered coding assistants.

[中文文档](./README-zh.md)

## Why SuperSpec?

AI coding assistants (Cursor, Claude Code, Copilot) are powerful but often produce inconsistent, undocumented code when requirements are vague. Common pain points:

| Pain Point | How SuperSpec Solves It |
|---|---|
| **AI codes without understanding context** | `strategy: follow` reads project rules first; `strategy: create` enables creative exploration |
| **Specs become bloated and unreadable** | First Principles enforce < 300 line target, auto-split detection via `lint` |
| **No traceability between requirements and tasks** | `validate` checks US↔FR↔AC↔tasks cross-references |
| **Specs drift out of sync** | `depends_on` frontmatter + `link`/`deps` commands track inter-spec dependencies |
| **Hard to find past decisions** | `search` across active and archived changes |
| **Simple tasks get over-specified** | Standard mode: just proposal + tasks. Boost only when complexity demands it |
| **Can't reuse project conventions** | `context` config points to existing rule files — no duplication, minimal tokens |
| **AI loses context during vibe coding** | `sync` collects git diff facts + `context.md` summary restores context in ~200 tokens |

## Installation

```bash
# Prerequisites
node >= 18.0.0
pnpm >= 8

# Clone and build
git clone https://github.com/asasugar/SuperSpec.git
cd SuperSpec
pnpm install
pnpm build

# Link CLI globally
cd packages/cli && npm link
```

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

# Combine: boost + creative + no branch
superspec create new-arch -b -c --no-branch
```

## Core Workflow

```
Standard:  create → tasks → apply → [vibe: sync → resume] → archive
Boost:     create -b → tasks → apply → [vibe: sync → resume] → archive
```

**Standard mode** generates `proposal.md` + `tasks.md` — enough for simple features and bug fixes.

**Boost mode** adds `spec.md` (US/FR/AC) + `checklist.md` (quality gate) — for large features requiring design review and cross-validation.

**Vibe coding phase**: after `apply`, use `sync` to collect git changes and `/ss:resume` to restore context in new AI conversations.

## CLI Commands

### Setup

#### `superspec init`

Initialize SuperSpec in current project.

```bash
# Default (English templates)
superspec init

# Chinese templates
superspec init --lang zh

# Specify AI assistant type
superspec init --ai claude

# Force overwrite existing config
superspec init --force
```

### Core Workflow

#### `superspec create <name>`

Create a change folder and generate proposal template.

```bash
# Standard mode (proposal + tasks)
superspec create add-dark-mode

# Boost mode (proposal + spec + tasks + checklist)
superspec create add-auth -b

# Creative mode (explore new patterns freely)
superspec create redesign-ui -c

# Boost + creative + skip branch creation
superspec create new-arch -b -c --no-branch

# Custom spec dir and branch prefix
superspec create add-auth --spec-dir specs --branch-prefix feature/
```

#### `superspec archive [name]`

Archive completed changes.

```bash
# Archive a specific change
superspec archive add-auth

# Archive all completed changes
superspec archive --all
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
# Lint a specific change
superspec lint add-auth

# Lint all active changes
superspec lint
```

#### `superspec validate [name]`

Cross-reference consistency check (US↔FR↔AC↔tasks).

```bash
# Validate a specific change
superspec validate add-auth

# Validate with dependency check
superspec validate add-auth --check-deps

# Validate all active changes
superspec validate
```

### Search & Discovery

#### `superspec search <query>`

Full-text search across all changes.

```bash
# Search active changes
superspec search "JWT authentication"

# Include archived changes
superspec search "login flow" --archived

# Filter by artifact type
superspec search "refresh token" --artifact tasks
```

#### `superspec status`

View all active changes and their artifact statuses.

```bash
superspec status
# Output:
# | Change      | Proposal | Spec | Tasks | Checklist | Status      |
# |-------------|----------|------|-------|-----------|-------------|
# | add-auth    | 🟢      | 🟢   | ✅    | 🟡       | in-progress |
# | fix-navbar  | 🟢      | —    | 🟢    | —         | ready       |
```

### Dependencies

#### `superspec link <name>`

Add a dependency between specs.

```bash
superspec link add-auth --depends-on setup-database
```

#### `superspec unlink <name>`

Remove a dependency.

```bash
superspec unlink add-auth --depends-on setup-database
```

#### `superspec deps [name]`

View dependency graph.

```bash
# View deps for a specific change
superspec deps add-auth

# View all dependency relationships
superspec deps
```

### Vibe Coding (Post-SDD)

#### `superspec context [name]`

Generate/refresh `context.md` summary from spec artifacts.

```bash
# Generate context for a specific change
superspec context add-auth

# Refresh all active changes
superspec context
```

#### `superspec sync [name]`

Collect git diff into `context.md` (zero AI tokens — pure CLI).

```bash
# Sync a specific change
superspec sync add-auth

# Sync with custom base branch
superspec sync add-auth --base develop

# Sync all active changes
superspec sync
```

## Slash Commands (AI Agent)

| Command | Mode | What it does |
|---------|------|-------------|
| `/ss:create <name>` | Both | Create change + generate proposal (boost: + spec + checklist) |
| `/ss:tasks` | Both | Generate task list |
| `/ss:apply` | Both | Implement tasks |
| `/ss:resume` | Both | Restore spec context for vibe coding (runs sync → reads context.md) |
| `/ss:clarify` | Both | Resolve ambiguity, record decisions |
| `/ss:archive` | Both | Archive completed change |
| `/ss:checklist` | Boost | Quality gate before apply |
| `/ss:status` | Both | View all changes and their status |
| `/ss:lint` | Both | Check artifact sizes |
| `/ss:validate` | Boost | Cross-reference consistency check |
| `/ss:search <q>` | Both | Full-text search |
| `/ss:link` | Both | Add spec dependency |
| `/ss:deps` | Both | View dependency graph |

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
        │   ├── commands/        # create / archive / init / update / lint / validate / search / link / status / context / sync
        │   ├── core/            # config / template / frontmatter / lint / validate / context
        │   ├── prompts/         # Agent rules installer
        │   ├── ui/              # Terminal output (chalk)
        │   ├── utils/           # fs / git / date / paths
        │   └── telemetry/       # Telemetry (placeholder)
        ├── templates/
        │   ├── zh/              # Chinese templates
        │   └── en/              # English templates
        └── prompts/
            ├── cursor-rules.md  # Cursor slash commands
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
