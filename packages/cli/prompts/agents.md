# SuperSpec — AI Agent Instructions

## 🚨 Before ANY Task

1. Read `superspec.config.json` → get `lang`, `specDir`, `boost`
2. Check `{specDir}/changes/` → know current state before acting
3. Never create change folders manually → use `superspec new` CLI

---

## 🧭 First Principles

| # | Principle | Rule |
|---|-----------|------|
| I | **Context Economy** | < 300 lines per artifact, 400 hard limit. Exceeds → split. Readable in 10 min. |
| II | **Signal-to-Noise** | Every sentence must inform a decision. If removing it changes nothing → remove it. |
| III | **Intent Over Implementation** | Focus on **why** and **what**. Let **how** emerge during `/ss:apply`. |
| IV | **Progressive Disclosure** | Start minimal. Expand only when clarification demands it. |
| V | **Required Sections** | Metadata header, Problem, Solution, Success Criteria, Trade-offs. |

---

## ⚠️ Core Rules

| Rule | Details |
|------|---------|
| Language | Follow `lang` config: `"zh"` → Chinese, `"en"` → English. All artifacts and interaction. |
| Read-first | Read existing content before writing. Preserve user edits. |
| Consistency | `US-1`, `FR-1`, `AC-1.1` must match across all artifacts. |
| Status tracking | 🟡 Draft → 🟢 Ready → ✅ Done. Update after each step. |
| Boost mode | `boost: true` or `-b`: + checklist, task < 1h, auto cross-validate. |

---

## 🚫 Don't / Do

| ❌ Don't | ✅ Do |
|----------|------|
| Code without specs | `/ss:proposal` → `/ss:spec` → `/ss:tasks` first |
| Create folders manually | `superspec new <name>` or `/ss:new` |
| Ignore `clarify.md` | Read before generating/updating |
| Overwrite user edits | Merge, don't replace |

---

## 📋 Workflow

```
BEFORE: /ss:status → check config
PLAN:   /ss:proposal → /ss:spec → /ss:tasks → (/ss:clarify as needed)
BOOST:  /ss:checklist → cross-validate → fix gaps
IMPL:   /ss:apply → update task status → checkpoints
AFTER:  /ss:archive
```

---

## 🔧 Commands

| Command | When to Use |
|---------|-------------|
| `/ss:new <name>` | Start a new feature/fix |
| `/ss:proposal` | Define why and what |
| `/ss:spec` | Detail requirements and acceptance criteria |
| `/ss:tasks` | Break into actionable steps |
| `/ss:clarify` | Resolve ambiguity |
| `/ss:apply` | Implement (all planning ready) |
| `/ss:ff` | Generate all planning docs at once |
| `/ss:archive` | Done and verified |
| `/ss:checklist` | Validate quality (boost only) |
| `/ss:status` | View all changes |

---

## 📐 Artifacts

```
{specDir}/changes/<name>/
├── proposal.md    — Why and what
├── spec.md        — Requirements and acceptance criteria
├── tasks.md       — Phased implementation steps
├── clarify.md     — Q&A and decisions
└── checklist.md   — Quality validation (boost only)
```

```
proposal → spec → tasks
             ↕
         clarify ↔ checklist (boost)
```

---

## ⚙️ Config

| Field | Default | Purpose |
|-------|---------|---------|
| `lang` | `"zh"` | Artifact language |
| `specDir` | `"superspec"` | Spec folder |
| `branchPrefix` | `"spec/"` | Git branch prefix |
| `boost` | `false` | Enable boost mode |
