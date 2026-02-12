---
name: /ss-specs
id: ss-specs
category: SuperSpec
description: Create multi-capability spec structure for large changes
---
<!-- SUPERSPEC:START -->
**Purpose**
When a change involves multiple independent capability domains (e.g., auth, api, ui) and spec.md may exceed 300 lines, use this command to split specs into capability-specific files.

**Use Cases**
- Change spans multiple system modules (authentication + API + UI)
- Single spec.md expected to exceed 300 lines
- Need parallel development of independent capabilities
- Require clear separation of concerns

**Directory Structure**
```
{specDir}/changes/<name>/
├── proposal.md
├── design.md          (optional, architecture decisions)
├── specs/
│   ├── auth/          — Authentication capability
│   │   └── spec.md
│   ├── api/           — API layer capability
│   │   └── spec.md
│   └── ui/            — UI components capability
│       └── spec.md
├── tasks.md
└── checklist.md
```

**Capability Domain Identification Guide**
Common capability types:
- **auth**: Authentication, authorization, session management
- **api**: REST/GraphQL APIs, interface definitions
- **ui**: Frontend components, page layouts
- **data**: Data models, database schema
- **workflow**: Business processes, state machines
- **integration**: External system integrations
- **infra**: Infrastructure, deployment configs

**Each spec.md Should Include**
```markdown
---
name: <name>-<capability>
status: draft
strategy: {{strategy}}
depends_on: []
capability: <capability-name>
---

# Spec: <name> - <Capability>

## Capability Scope
<!-- Define boundaries of this capability -->

## User Stories
### US-<capability>-1: [Title]
...

## Functional Requirements
### FR-<capability>-1: [Title]
...

## Cross-Capability Dependencies
<!-- List interaction points with other capabilities -->
- Depends on `auth/spec.md` FR-auth-2
- Provides API-1 for `ui/spec.md`

## Edge Cases
...
```

**Naming Conventions**
- User Story ID: `US-<capability>-<number>` (e.g., US-auth-1, US-api-1)
- Functional Requirement ID: `FR-<capability>-<number>` (e.g., FR-auth-1, FR-ui-2)
- Acceptance Criteria ID: `AC-<capability>-<number>.<sub>` (e.g., AC-auth-1.1)

**Cross-Capability References**
In tasks.md:
```markdown
## Phase 1: Authentication (auth capability)
- [ ] Task 1.1: Implement FR-auth-1 (ref: specs/auth/spec.md)
- [ ] Task 1.2: Integrate FR-api-3 dependency

## Phase 2: API Layer (api capability)
- [ ] Task 2.1: Implement FR-api-1 (ref: specs/api/spec.md)
- [ ] Task 2.2: Depends on US-auth-2 completion
```

**Creation Steps**
1. Identify independent capability domains in proposal.md (recommend 2-5)
2. Create `specs/<capability>/` directory for each domain
3. Create spec.md in each directory using template above
4. Document capability splitting rationale and interactions in design.md
5. Ensure each spec.md < 300 lines
6. Group tasks by capability in tasks.md

**Validation Checklist**
- [ ] Each capability has clear boundaries and responsibilities
- [ ] Dependencies between capabilities are explicit
- [ ] Each spec.md file < 300 lines
- [ ] IDs follow `<type>-<capability>-<number>` format
- [ ] tasks.md correctly references requirements from each capability
- [ ] checklist.md includes checks for all capabilities

**Example: User Authentication System**
```
changes/20260212-add-auth-system/
├── proposal.md                      (Overview: Add complete auth system)
├── design.md                        (Architecture: JWT + OAuth2 + RBAC)
├── specs/
│   ├── auth/                        (Auth capability)
│   │   └── spec.md                  US-auth-1: User login
│   │                                FR-auth-1: JWT generation
│   ├── api/                         (API capability)
│   │   └── spec.md                  US-api-1: Auth middleware
│   │                                FR-api-1: Token validation
│   └── ui/                          (UI capability)
│       └── spec.md                  US-ui-1: Login form
│                                    FR-ui-1: Error display
├── tasks.md                         (Phased by capability)
└── checklist.md                     (Covers all capabilities)
```

**When Not to Split**
- Change affects only a single module
- spec.md expected to be < 200 lines
- Capabilities are tightly coupled and hard to separate
- Rapid prototyping or experimental changes

<!-- SUPERSPEC:END -->
