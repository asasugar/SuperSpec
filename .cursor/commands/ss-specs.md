---
name: /ss-specs
id: ss-specs
category: SuperSpec
description: Create multi-capability spec structure for large changes
---
<!-- SUPERSPEC:START -->
**Purpose**
When spec.md may exceed 300 lines due to multiple independent capability domains, split into capability-specific spec files.

**When to Split**
- Change spans multiple system modules (e.g., auth + API + UI)
- Single spec.md expected to exceed 300 lines
- Need parallel development of independent capabilities

**When NOT to Split**
- Single module change or spec.md < 200 lines
- Capabilities are tightly coupled
- Rapid prototyping or experimental changes

**Capability Domain Types**
`auth` (authentication/authorization) · `api` (REST/GraphQL) · `ui` (frontend) · `data` (models/schema) · `workflow` (business processes) · `integration` (external systems) · `infra` (deployment)

**Spec Template**
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
## User Stories
### US-<capability>-1: [Title]
## Functional Requirements
### FR-<capability>-1: [Title]
## Cross-Capability Dependencies
- Depends on `auth/spec.md` FR-auth-2
- Provides API-1 for `ui/spec.md`
## Edge Cases
```

**ID Convention**: `US-<cap>-<n>`, `FR-<cap>-<n>`, `AC-<cap>-<n>.<sub>`

**Steps**
1. Identify 2-5 independent capability domains in proposal.md
2. Create `specs/<capability>/spec.md` for each, using template above
3. Document splitting rationale in design.md
4. Group tasks by capability in tasks.md
5. Validate: clear boundaries, explicit dependencies, each spec < 300 lines, IDs follow convention
<!-- SUPERSPEC:END -->
