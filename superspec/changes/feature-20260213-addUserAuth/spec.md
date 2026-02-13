---
name: feature-20260213-addUserAuth
status: ready
strategy: follow
depends_on: []
---

# Specification: Add User Authentication

> Created: 20260213

## Overview

Introduce user identity for the SuperSpec CLI and config so that branch/change naming and context can reflect who is making changes; optional auth for protected operations later.

## User Stories

### US-1: Identity in local workflow

**As a** developer, **I want to** have my identity (e.g. username) used in branch names and change metadata, **so that** changes are attributable without logging in.

#### Acceptance Criteria

- [ ] AC-1.1: `{user}` in branch/change templates is resolved (config or git user).
- [ ] AC-1.2: `superspec create` and `sync` use that identity; no prompt for credentials when not using auth.

### US-2: Optional authentication

**As a** developer, **I want to** optionally authenticate for protected operations, **so that** I can use identity-gated features when needed.

#### Acceptance Criteria

- [ ] AC-2.1: Local-only usage works without any auth.
- [ ] AC-2.2: When auth is required, CLI or config can provide credentials (e.g. env, file, or future OAuth).

## Functional Requirements

### FR-1: User identity source

- **Description**: Resolve `user` from config, `--user`, or git config (e.g. `user.name`). Used in templates and context.
- **Priority**: P0
- **Dependencies**: None

### FR-2: No mandatory login

- **Description**: All current commands (create, sync, tasks, etc.) work without authentication.
- **Priority**: P0
- **Dependencies**: FR-1

### FR-3: Auth hook for protected operations

- **Description**: Optional hook or adapter for future protected operations (e.g. cloud sync). Not required for v1.
- **Priority**: P2
- **Dependencies**: FR-1

## Non-Functional Requirements

- **Performance**: No extra network calls for local identity.
- **Security**: No secrets in logs; credentials via env or config only.
- **Compatibility**: Existing configs and workflows remain valid.

## Data Model

- Config: optional `user` string; optional `auth` section (provider, env keys) for future use.
- No new persistent store for v1.

## API Design

- CLI: `--user <user>` on `create` (already present); ensure sync/context include user.
- No new public API until auth provider is chosen.

## Edge Cases

1. Git repo missing or no `user.name` → fallback to config `user` or placeholder.
2. Auth required but not configured → clear error, no silent failure.
3. Config has `user` but `--user` passed → CLI override wins.

---

**Status**: 🟢 Ready
