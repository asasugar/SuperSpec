# SuperSpec

Spec-driven development (SDD) for AI-powered coding assistants.

[中文文档](./README-zh.md)

## Installation

```bash
# Prerequisites
node >= 18.0.0
pnpm >= 8

# Clone and build
git clone https://github.com/<your-org>/SuperSpec.git
cd SuperSpec
pnpm install
pnpm build

# Link CLI globally
cd packages/cli && npm link
```

## Usage

```bash
# Initialize in your project (Chinese templates by default)
cd your-project
superspec init

# English templates
superspec init --lang en

# Create a new change
superspec new add-dark-mode

# Boost mode (with checklist and cross-validation)
superspec new add-auth -b

# Archive a completed change
superspec archive add-dark-mode

# Update templates and agent rules
superspec update
```

## Slash Commands

| Command | Description |
|---------|-------------|
| `/ss:new <name>` | Create a new change |
| `/ss:proposal` | Generate proposal |
| `/ss:spec` | Generate specification |
| `/ss:tasks` | Generate task list |
| `/ss:clarify` | Clarification workflow |
| `/ss:apply` | Execute implementation |
| `/ss:ff` | Fast-forward — generate all planning docs at once |
| `/ss:archive` | Archive change |
| `/ss:checklist` | Quality checklist (boost) |
| `/ss:status` | View status |

## Workflow

```
/ss:new → /ss:proposal → /ss:spec → /ss:tasks → /ss:apply → /ss:archive
                ↕                       ↕
           /ss:clarify             /ss:checklist (-b)
```

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
        │   ├── commands/        # init / new / archive / update
        │   ├── core/            # Config / template engine
        │   ├── prompts/         # Agent rules installer
        │   ├── ui/              # Terminal output
        │   ├── utils/           # fs / git / date / paths
        │   └── telemetry/       # Telemetry (placeholder)
        ├── templates/
        │   ├── zh/              # Chinese templates
        │   └── en/              # English templates
        └── prompts/
            ├── cursor-rules.md  # Cursor slash commands
            └── agents.md        # AGENTS.md template
```

## Configuration

`superspec init` generates `superspec.config.json` in the target project:

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

| Field | Description | Default |
|-------|-------------|---------|
| `lang` | Template language `"zh"` / `"en"` | `"zh"` |
| `specDir` | Spec folder name | `"superspec"` |
| `branchPrefix` | Branch prefix | `"spec/"` |
| `branchTemplate` | Branch naming template | `"{prefix}{name}"` |
| `boost` | Enable boost mode by default | `false` |
| `archive.dir` | Archive subdirectory | `"archive"` |
| `archive.datePrefix` | Prefix archive folder with date | `true` |

## Tech Stack

- **Language**: TypeScript
- **Build**: tsup
- **Package Manager**: pnpm (monorepo)
- **Runtime**: Node.js >= 18
- **Dependencies**: commander, chalk

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Watch mode
pnpm dev

# Type check
pnpm --filter @superspec/cli typecheck
```
