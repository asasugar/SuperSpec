<!-- superspec:start -->
# SuperSpec — AI Agent Instructions

## 🚨 Before ANY Task

1. **Read configuration**: `superspec.config.json` → get `lang`, `specDir`, `boost`, `strategy`, `context`
2. **Review project context**:
   - Read `context` files (project rules/conventions)
   - Check project README, architecture docs, CONTRIBUTING.md
   - If no `context` configured, auto-check: `.cursor/rules/`, `AGENTS.md`, `CONTRIBUTING.md`
3. **Inspect current state**:
   - Run `/ss-status` or check `{specDir}/changes/` → know active changes
   - Review related changes via `depends_on` to avoid duplication
4. **Read current change context**:
   - Determine `strategy` by priority: user input `-c` > config default
   - Read frontmatter `input` field → understand original user intent
   - If `strategy: follow` → treat context files as constraints (must follow)
   - If `strategy: create` → treat context files as awareness (may deviate, must justify)
5. **Never create change folders manually** → use `superspec create` CLI or `/ss-create`

---

## 🧭 First Principles

| # | Principle | Rule |
|---|-----------|------|
| I | **Context Economy** | < 300 lines per artifact, 400 hard limit. Exceeds → split. Readable in 10 min. |
| II | **Signal-to-Noise** | Every sentence must inform a decision. If removing it changes nothing → remove it. |
| III | **Intent Over Implementation** | Focus on **why** and **what**. Let **how** emerge during `/ss-apply`. |
| IV | **Progressive Disclosure** | Start minimal. Expand only when clarification demands it. |
| V | **Required Sections** | Metadata header, Problem, Solution, Success Criteria, Trade-offs. |

---

## 🎯 Standard vs Boost

| | Standard (lightweight) | Boost (enhanced) |
|---|---|---|
| **场景** | Simple tasks, bug fixes, small features | Large features, breaking changes, complex designs |
| **Artifacts** | proposal + checklist + tasks | proposal + spec + checklist + tasks (+ design optional) |
| **proposal 定位** | 需求 + 技术方案（自含，可直接拆 task） | 需求背景（Goals, Risks, Impact） |
| **spec 定位** | — | 需求细节 + 交互（US/FR/AC/Edge Cases） |
| **Checklist 时机** | proposal 后自动检查（/ 10） | spec 后自动检查（/ 25） |
| **Task granularity** | Flexible | < 1h per task |
| **Cross-validation** | — | Auto: US↔FR↔AC↔tasks |
| **Edge cases** | Basic | Comprehensive |

**核心流程**：

```
Standard:  /ss-create (proposal → checklist ✓) → /ss-tasks → /ss-apply → [vibe: sync → /ss-resume] → /ss-archive
Boost:     /ss-create -b (proposal → spec → [auto: split? design?] → checklist ✓) → /ss-tasks → /ss-apply → ...
On-demand: /ss-clarify, /ss-checklist, /ss-lint, /ss-validate, /ss-search, /ss-link, /ss-deps
```

---

## 🧩 Strategy: follow vs create

| | `follow` (default) | `create` (`-c` / `--creative`) |
|---|---|---|
| **行为** | Read `context` files → strictly follow project rules/patterns | Aware of `context` but free to deviate with justification |
| **Proposal** | Solution aligns with existing architecture | May propose new architecture/patterns |
| **Spec** | Requirements fit current system design | Requirements may introduce new paradigms |
| **Tasks** | Use existing file structure, naming, dependencies | May create new structures, suggest new dependencies |
| **适用** | 常规功能、bug fix、遵循既有规范 | 架构重构、新模块设计、UX 创新 |

### Context files

Config `context` lists files the AI should read to understand project conventions:

```json
{
  "context": [".cursor/rules/coding-style.mdc", "AGENTS.md", "docs/conventions.md"]
}
```

- **follow**: read these files → treat as constraints (must follow)
- **create**: read these files → treat as awareness (may deviate, must justify)
- No `context` configured? AI auto-checks: `.cursor/rules/`, `AGENTS.md`, `CONTRIBUTING.md`
- Per-change override: add `context: ["src/auth/README.md"]` to frontmatter

---

## ⚠️ Core Rules

| Rule | Details |
|------|---------|
| Language | Follow `lang` config: `"zh"` → Chinese, `"en"` → English. All artifacts and interaction. |
| Read-first | Read existing content before writing. Preserve user edits. |
| Consistency | Boost: `US-1`, `FR-1`, `AC-1.1` must match across all artifacts. |
| Status tracking | 🟡 Draft → 🟢 Ready → ✅ Done. Update after each step. |

---

## 🚫 Don't / Do

| ❌ Don't | ✅ Do |
|----------|------|
| Code without planning | `/ss-create` → `/ss-tasks` → `/ss-apply` |
| Overkill simple tasks | Use standard mode. Only boost when complexity demands it. |
| Create folders manually | `superspec create <feature>` or `/ss-create` |
| Ignore `clarify.md` | Read before generating/updating |
| Overwrite user edits | Merge, don't replace |

---

## 🔧 Commands

| Command | Mode | What it does |
|---------|------|-------------|
| `/ss-create <feature>` | Both | Create folder + branch, generate proposal (+ spec in boost), auto-run checklist gate |
| `/ss-tasks` | Both | AI generates task list from proposal (boost: from proposal + spec) |
| `/ss-apply` | Both | Implement tasks |
| `/ss-clarify` | Both | Resolve ambiguity |
| `/ss-archive` | Both | Archive completed change |
| `/ss-checklist` | Both | Quality gate: Standard (/ 10 after proposal) or Boost (/ 25 after spec). Auto-invoked by /ss-create, also callable manually |
| `/ss-status` | Both | View all changes |
| `/ss-lint` | Both | Check artifact sizes |
| `/ss-validate` | Boost | Cross-reference consistency check |
| `/ss-search <q>` | Both | Full-text search across changes |
| `/ss-link` | Both | Add spec dependency (`deps add`) |
| `/ss-deps` | Both | View dependency graph (`deps list`) |
| `/ss-resume` | Both | Restore spec context for vibe coding (runs sync → reads context.md) |
| `superspec sync` | Both | CLI: collect git diff into context.md (zero AI tokens) |

---

## 📐 Artifacts

**On-demand generation**: CLI `superspec create` only creates the folder + git branch. AI reads templates from `{specDir}/templates/` as structural reference, then generates each artifact with real content when needed — never pre-creates empty template files.

| Artifact | Generated by | When |
|----------|-------------|------|
| proposal.md | `/ss-create` | Always (Standard: requirements + tech solution; Boost: requirements background) |
| spec.md | `/ss-create -b` | Boost mode (requirement details + interactions) |
| design.md | `/ss-create -b` | Boost mode, auto-detected when needed |
| checklist.md | `/ss-create` (auto) | Always, after proposal (Standard) or after spec (Boost) |
| tasks.md | `/ss-tasks` | On demand, after checklist passes |
| clarify.md | `/ss-clarify` | On demand |

**Standard:**
```
{specDir}/changes/<name>/
├── proposal.md    — Requirements + technical solution (generated by /ss-create)
├── checklist.md   — Quality gate / 10 (auto-generated by /ss-create)
└── tasks.md       — Actionable steps (generated by /ss-tasks)
```

**Boost:**
```
{specDir}/changes/<name>/
├── proposal.md    — Requirements background (generated by /ss-create -b)
├── spec.md        — Requirement details + interactions (generated by /ss-create -b)
├── design.md      — Architecture decisions (optional, auto-detected by /ss-create -b)
├── checklist.md   — Quality gate / 25 (auto-generated by /ss-create -b)
├── tasks.md       — Phased implementation steps (generated by /ss-tasks)
└── clarify.md     — Q&A and decisions (generated by /ss-clarify)
```

**When to use design.md** (optional in boost mode):
- Solution spans multiple systems or introduces new architectural patterns
- Major architectural decisions with significant trade-offs
- Need to document decision rationale before committing to specs
- Cross-team architectural alignment required

**Spec deltas - Multi-capability structure** (recommended for large changes):
When a change involves multiple distinct capabilities, split specs by capability domain:

```
{specDir}/changes/<name>/
├── proposal.md
├── design.md
├── specs/
│   ├── auth/              — Authentication capability
│   │   └── spec.md
│   ├── api/               — API layer capability
│   │   └── spec.md
│   └── ui/                — UI components capability
│       └── spec.md
├── tasks.md
└── checklist.md
```

**Benefits of capability-based splitting**:
- Each spec.md stays under 300-line target
- Clear separation of concerns
- Easier parallel review and implementation
- Better traceability for cross-references

Each artifact has YAML frontmatter: `name`, `status`, `strategy`, `depends_on: []`, `input` (proposal.md only, records user's original input).

**Strategy priority** (highest to lowest): user input `-c` > `superspec.config.json` default.

---

## ⚙️ Config

| Field | Default | Purpose |
|-------|---------|---------|
| `lang` | `"zh"` | Artifact language |
| `specDir` | `"superspec"` | Spec folder |
| `branchPrefix` | `"spec/"` | Git branch prefix |
| `boost` | `false` | Enable boost mode |
| `strategy` | `"follow"` | `follow` = obey project rules, `create` = explore freely |
| `context` | `[]` | Files AI should read for project conventions |
| `limits.targetLines` | `300` | Target max lines per artifact |
| `limits.hardLines` | `400` | Hard max lines per artifact |

<!-- superspec:end -->