# SuperSpec Standard Mode End-to-End Workflow (From init to done)

> Goal: provide a complete view of this requirement's development workflow and deliverables
> Change: `feature-20260324-Flow29149LinkCoupon-jay`
---

## 0. Use the `superpowers` plugin command `/brainstorming` to understand the overall codebase architecture
- Let the Agent understand the overall codebase architecture

## 1. Initialization Stage: `superspec init`

### 1.1 Initialization Goals
- Establish SuperSpec fundamentals in the repository: config, templates, commands, and rules.
- Provide a unified entry point and standard constraints for `/ss-create`, `/ss-tasks`, and `/ss-apply`.

### 1.2 Deliverables (main files)
- `superspec.config.json`
- `superspec/templates/proposal.md`
- `superspec/templates/spec.md`
- `superspec/templates/design.md`
- `superspec/templates/tasks.md`
- `superspec/templates/checklist.md`
- `superspec/templates/clarify.md`
- `.cursor/commands/ss-create.md`
- `.cursor/commands/ss-tasks.md`
- `.cursor/commands/ss-apply.md`
- `.cursor/commands/ss-checklist.md`
- `.cursor/rules/superspec.mdc`
- `AGENTS.md` (SuperSpec workflow guide)

---

## 2. Requirement Creation Stage: `/ss-create`

### 2.1 Input and Parsing
- Input command: `/ss-create ... (for example, requirement links that can be recognized via MCP tools) Flow29149 -d 'Generate a spec from this document, route is /marketing/marketing-configure/link-coupon-config' @jay`
- Parsed result:
  - feature: `Flow29149LinkCoupon`
  - intent type: `feature`
  - user: `jay`
  - target route: `/marketing/marketing-configure/link-coupon-config`

### 2.2 Context Collection
- Read project config and conventions:
  - `superspec.config.json`
  - `AGENTS.md`
  - `README.md`
- Fetch external requirement document content (knowledge-base page) and convert it into actionable requirement points.

### 2.3 Create Change and Branch
- Create change + branch (initial naming).
- Then rename as required:
  - branch: `feature-20260324-Flow29149LinkCoupon-jay`
  - spec directory: `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay`

### 2.4 Generate Spec Documents
- Generate and refine:
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/proposal.md`
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/checklist.md`
- Document highlights include:
  - business background, goals, and non-goals
  - functional requirements and technical solution
  - impact scope, risks, and mitigation strategies
  - route and module mapping

---

## 3. Task Breakdown Stage: `/ss-tasks`

### 3.1 Breakdown Principles
- Break down `proposal.md` into executable tasks.
- Organize tasks by stages: Infrastructure / Core / Integration.
- Each task includes:
  - task description
  - primary files
  - dependencies
  - verification criteria (Verify)

### 3.2 Deliverable
- `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/tasks.md`

---

## 4. Development Implementation Stage: `/ss-apply`

### 4.1 Alignment Before Implementation (read first, then write)
- Review existing implementations in the same domain to ensure alignment with project patterns:
  - list/detail page structure
  - service/type organization
  - route registration approach

### 4.2 Phase 1: Foundation
- Add type definitions:
  - `packages/types/src/services/marketing/linkCouponConfig.d.ts`
  - `packages/types/src/services/marketing/index.d.ts` (add reference)
- Add service-layer APIs:
  - `packages/services/src/marketing/linkCouponConfig.ts`
  - `packages/services/src/marketing/index.ts` (add export)
- Add routes:
  - `packages/femarketing/src/router/marketing.tsx`
    - `marketing-configure/link-coupon-config`
    - `marketing-configure/link-coupon-config/:type/:id?`

### 4.3 Phase 2: Core Features
- Add list page:
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/list/index.tsx`
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/list/config.tsx`
- Add operation-record drawer and snapshot:
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/list/components/index.ts`
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/list/components/record-drawer/index.tsx`
- Add detail page (Formily four modes + validation + CRM backfill):
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/detail/index.tsx`
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/detail/config.tsx`

### 4.4 Phase 3: Integration and Verification
- Complete list/detail linkage (create/edit/copy/read navigation and refresh).
- Run checks and fix issues:
  - scoped diagnostics: `ReadLints` (for changed files)
  - full check: `pnpm lint`
- Update task status:
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/tasks.md` (all items checked as done)

### 4.5 Phase 4: Sync and Status Confirmation

#### 4.5.1 Sync Context
- Execute: `superspec sync feature-20260324-Flow29149LinkCoupon-jay`
- Generated:
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/context.md`

### 4.5.2 Status Confirmation
- Execute: `superspec status`
- Result: proposal/checklist/tasks for the current change are all completed and ready for the next workflow step.

---

## 5. Final Deliverables of This Workflow

- Spec documents:
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/proposal.md`
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/checklist.md`
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/tasks.md`
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/context.md`
- Workflow description document:
  - `superspec/changes/feature-20260324-Flow29149LinkCoupon-jay/full-process.md`
- Business implementation code:
  - `packages/femarketing/src/router/marketing.tsx`
  - `packages/femarketing/src/pages/marketing/marketing-configure/link-coupon-config/**`
  - `packages/services/src/marketing/linkCouponConfig.ts`
  - `packages/services/src/marketing/index.ts`
  - `packages/types/src/services/marketing/linkCouponConfig.d.ts`
  - `packages/types/src/services/marketing/index.d.ts`

---

## 6. Standard Execution Flow (Reusable)

1. `superspec init` (first-time initialization)
2. `/ss-create` (produce proposal + checklist)
3. `/ss-tasks` (produce tasks)
4. `/ss-apply` (implement by tasks and update status)
5. `superspec sync <change-name>` (refresh context)
6. `/ss-checklist` (optional re-check)
7. `/ss-archive` (archive when done)
