---
title: Workflow
description: Understanding SuperSpec's Standard and Boost modes
---

# Workflow

SuperSpec provides two workflow modes to match different development scenarios.

## Workflow Overview

```
Standard Mode:  create → tasks → apply → [sync → resume] → archive
Boost Mode:     create -b → tasks → apply → [sync → resume] → archive
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
| `proposal.md` | Feature proposal and goals |
| `tasks.md` | Task checklist |

### Usage

```bash
superspec create myFeature
```

### Typical Flow

1. **Create** - Generate change skeleton
2. **Edit Proposal** - Describe the feature
3. **Generate Tasks** - `/ss-tasks`
4. **Implement** - `/ss-apply 1`, `/ss-apply 2`, ...
5. **Archive** - `superspec archive myFeature`

## Boost Mode

Boost mode provides complete specification, suitable for:
- Complex features
- Features requiring review
- Multi-person collaboration
- High-quality requirements

### Artifacts

| File | Description |
|------|-------------|
| `proposal.md` | Feature proposal |
| `spec.md` | Detailed specification (US/FR/AC) |
| `tasks.md` | Task checklist |
| `checklist.md` | Quality gates |

### Usage

```bash
superspec create myFeature -b
# or
superspec create myFeature --boost
```

### Typical Flow

1. **Create** - `superspec create myFeature -b`
2. **Edit Proposal** - High-level description
3. **Clarify Requirements** - `/ss-clarify`
4. **Write Spec** - Detailed US/FR/AC
5. **Generate Checklist** - `/ss-checklist`
6. **Generate Tasks** - `/ss-tasks`
7. **Implement** - `/ss-apply`
8. **Validate** - `/ss-validate`
9. **Archive** - `superspec archive myFeature`

## Mode Comparison

| Aspect | Standard | Boost |
|--------|----------|-------|
| Artifacts | 2 | 4 |
| Time | Short | Longer |
| Complexity | Simple | Complex |
| Review | Optional | Recommended |
| Quality Gates | No | Yes |

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

## In-Contnet Learning

Both modes support Vibe Coding for cross-session context:

```bash
# Before ending session
superspec sync

# Starting new session
/ss-resume
```

## Next Steps

- [In-Contnet Learning](/guides/in-content-learning) - Context preservation
- [Best Practices](/guides/best-practices) - Tips for efficiency
