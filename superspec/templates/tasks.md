---
name: {{name}}
status: draft
strategy: {{strategy}}
depends_on: []
---

# Task List: {{name}}

> Created: {{date}}

## Phase 1: Infrastructure

- [ ] 1.1 [Task description]
  - File: `path/to/file`
  - Depends: none
- [ ] 1.2 [Task description]
  - File: `path/to/file`
  - Depends: 1.1

## Phase 2: Core Implementation

- [ ] 2.1 [Task description]
  - File: `path/to/file`
  - Depends: Phase 1
- [ ] 2.2 [Task description] `[P]`
  - File: `path/to/file`
  - Depends: 2.1
- [ ] 2.3 [Task description] `[P]`
  - File: `path/to/file`
  - Depends: 2.1

## Phase 3: Integration & Verification

- [ ] 3.1 [Task description]
  - File: `path/to/file`
  - Depends: Phase 2
- [ ] 3.2 [Task description]
  - File: `path/to/file`
  - Depends: 3.1

## Checkpoints

- [ ] Phase 1 complete, foundation ready
- [ ] Phase 2 complete, core features ready
- [ ] Phase 3 complete, integration verified

---

`[P]` = Can be executed in parallel

**Status**: 🟡 Pending
