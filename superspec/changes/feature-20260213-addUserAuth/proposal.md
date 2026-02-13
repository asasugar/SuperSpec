---
name: feature-20260213-addUserAuth
status: ready
strategy: follow
depends_on: []
---

# Proposal: Add User Authentication

> Created: 20260213

## Background

The project currently has no user identity or access control. User auth is needed to support identity-aware features (e.g. who made a change, scoped access, or future cloud/sync).

## Goals

- [ ] Introduce user identity (who is making changes / running commands).
- [ ] Support optional authentication for protected operations.
- [ ] Keep local-only usage unchanged (no mandatory login).

## Non-Goals

- Full SSO/OAuth integration (can be a later change).
- Multi-tenant or RBAC (out of scope for this change).

## Solution Overview

- Add a lightweight user identity layer: config or env for local dev, optional auth for protected flows.
- Identity is used in branch/user templates and in context (e.g. sync, resume). No breaking change for existing workflows.

## Impact Scope

- **Modules**: CLI (create/sync), config, possibly a small auth adapter.
- **Files**: config schema, create/sync commands, templates that use `{user}`.
- **Dependencies**: None required for local identity; optional dependency only if adding real auth.

## Risks & Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Config/CLI drift | Medium | Reuse existing `user` in templates; document in README |
| Scope creep | Medium | Limit to identity + optional auth hook; defer SSO |

## Open Questions

1. Auth provider (none / env / file / OAuth) to support in v1?

---

**Status**: 🟢 Ready
