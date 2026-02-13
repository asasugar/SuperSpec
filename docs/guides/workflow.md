---
title: Workflow
description: Understanding SuperSpec's Standard and Boost modes
---

# Workflow

SuperSpec provides two workflow modes to match different development scenarios.

## Workflow Overview

```
Standard Mode:  create (proposal → checklist ✓) → tasks → apply → [sync → resume] → archive
Boost Mode:     create -b (proposal → spec → [auto: split? design?] → checklist ✓) → tasks → apply → [sync → resume] → archive
```

## Standard Mode

Standard mode is lightweight and fast, suitable for:
- Simple features
- Bug fixes
- Quick prototypes
- Small changes

### Artifacts

| File | Description |
|------|-------------|
| `proposal.md` | Requirements + technical solution (self-contained, ready to split tasks) |
| `checklist.md` | Quality gate /10 |
| `tasks.md` | Task checklist |

### Usage

```bash
/ss-create myFeature
```

CLI `superspec create` only creates folder + git branch. AI generates proposal + checklist via /ss-create.

### Typical Flow

1. **Create** - `/ss-create myFeature` (folder + branch, then proposal → checklist ✓)
2. **Generate Tasks** - `/ss-tasks`
3. **Implement** - `/ss-apply`
4. **Archive** - `/ss-archive myFeature`

## Boost Mode

Boost mode provides complete specification, suitable for:
- Complex features
- Features requiring review
- Multi-person collaboration
- High-quality requirements

### Artifacts

| File | Description |
|------|-------------|
| `proposal.md` | Requirements background (Goals, Non-Goals, Impact, Risks, Solution Overview) |
| `spec.md` | Requirement details + interactions (US/FR/AC/Edge Cases) |
| `design.md` | Optional, auto-generated when cross-system or major architecture |
| `checklist.md` | Quality gate /25 |
| `tasks.md` | Task checklist |

### Usage

```bash
/ss-create myFeature -b
# or
/ss-create myFeature --boost
```

CLI `superspec create -b` only creates folder + git branch. AI generates proposal → spec → [auto: split? design?] → checklist via /ss-create.

### Typical Flow

1. **Create** - `/ss-create myFeature -b` (proposal → spec → [auto: split? design?] → checklist ✓)
2. **Clarify** - `/ss-clarify` (if needed)
3. **Generate Tasks** - `/ss-tasks`
4. **Implement** - `/ss-apply`
5. **Validate** - `/ss-validate`
6. **Archive** - `/ss-archive myFeature`

## Mode Comparison

| Aspect | Standard | Boost |
|--------|----------|-------|
| Artifacts | 3 (proposal, checklist, tasks) | 5 (proposal, spec, design?, checklist, tasks) |
| Time | Short | Longer |
| Complexity | Simple | Complex |
| Review | Optional | Recommended |
| Quality Gates | Yes (/10 after proposal) | Yes (/25 after spec) |

## Choosing a Mode

```
Feature complexity
    │
    ├─ Low ──→ Standard Mode
    │
    ├─ Medium ──→ Standard + manual additions
    │
    └─ High ──→ Boost Mode
```

### Use Standard Mode When:
- Bug fix with clear cause
- Small UI changes
- Adding simple endpoints
- Configuration changes

### Use Boost Mode When:
- New major feature
- Architecture changes
- External API integration
- Features needing design review

## In-Context Learning

Both modes support Vibe Coding for cross-session context:

```bash
# Before ending session
superspec sync

# Starting new session
/ss-resume
```

## Next Steps

- [In-Context Learning](/guides/in-context-learning) - Context preservation
- [Best Practices](/guides/best-practices) - Tips for efficiency
