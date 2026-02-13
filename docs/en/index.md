---
layout: home

hero:
  name: SuperSpec
  text: Spec-Driven Development Tool
  tagline: SDD tool designed for AI coding assistants, helping developers produce consistent, well-documented code
  actions:
    - theme: brand
      text: Quick Start
      link: /en/guides/quickstart
    - theme: alt
      text: GitHub
      link: https://github.com/asasugar/SuperSpec

features:
  - icon: 📦
    title: Context Economy
    details: Each artifact is limited to 300 lines, maximizing AI context window utilization
  - icon: 🔄
    title: Dual-Mode Workflow
    details: Standard mode for quick iteration, Boost mode for complete specifications
  - icon: 🎯
    title: Vibe Coding Support
    details: sync + resume for seamless context restoration across sessions
  - icon: 🤖
    title: Multi-AI Support
    details: Works with Cursor, Claude Code, Qwen, Qoder, and other AI coding assistants
---

## Quick Installation

```bash
# npm
npm install -g @superspec/cli

# pnpm
pnpm add -g @superspec/cli

# yarn
yarn global add @superspec/cli
```

::: tip Requirements
Node.js >= 18.0.0
:::

## Initialize Project

```bash
cd your-project

superspec init                  # Default (English templates)
superspec init --lang zh        # Chinese templates
superspec init --ai claude      # Specify AI assistant type
```

## Core Workflow

```
Standard Mode:  create → tasks → apply → [vibe: sync → resume] → archive
Boost Mode:     create -b → tasks → apply → [vibe: sync → resume] → archive
```

**Standard Mode** generates `proposal.md` + `tasks.md` — for simple features and bug fixes.

**Boost Mode** additionally generates `spec.md` (US/FR/AC) + `checklist.md` (quality gates) — for large features requiring design review and cross-validation.

## Next Steps

- [Quick Start Guide](/en/guides/quickstart) - Detailed getting started tutorial
- [CLI Command Reference](/en/cli/) - All CLI commands explained
- [Slash Commands](/en/slash-commands/) - AI Agent command reference
- [Configuration Guide](/en/api/configuration) - Configuration file documentation
