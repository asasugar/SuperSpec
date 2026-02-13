---
layout: home

hero:
  name: SuperSpec
  text: Spec-Driven Development Tool
  tagline: SDD tool designed for AI coding assistants, helping developers produce consistent, well-documented code
  actions:
    - theme: brand
      text: Quick Start
      link: /guides/quickstart
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
    title: In-Context Learning Support
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
Standard Mode:  create (proposal → checklist ✓) → tasks → apply → [vibe: sync → resume] → archive
Boost Mode:     create -b (proposal → spec → [auto: split? design?] → checklist ✓) → tasks → apply → [vibe: sync → resume] → archive
```

**Standard Mode** — proposal + checklist + tasks. Proposal is requirements + technical solution. Checklist /10 after proposal.

**Boost Mode** — proposal (requirements background) + spec (US/FR/AC) + optional design + checklist /25. For large features requiring design review.

## Next Steps

- [Quick Start Guide](/guides/quickstart) - Detailed getting started tutorial
- [CLI Command Reference](/cli/) - All CLI commands explained
- [Slash Commands](/slash-commands/) - AI Agent command reference
- [Configuration Guide](/api/configuration) - Configuration file documentation
