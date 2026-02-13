---
title: Complex Feature
description: Building complex features with Boost mode
---

# Complex Feature Development

This tutorial demonstrates building a complex feature using Boost mode.

## Scenario

We're building a **shopping cart** for an e-commerce platform:
- Add/remove items
- Modify quantities
- Apply coupons
- Check inventory
- Calculate prices

## Why Boost Mode?

| Scenario | Standard | Boost |
|----------|----------|-------|
| Simple feature | ✓ | - |
| Complex feature | - | ✓ |
| Needs review | - | ✓ |
| Team collaboration | - | ✓ |
| Many acceptance criteria | - | ✓ |

Shopping cart is complex with many acceptance criteria—perfect for Boost mode.

## Step 1: Create Change + Generate Artifacts

Use `/ss-create -b` to do it all at once: create folder, generate proposal, spec, and auto-run checklist.

```
/ss-create -b add shopping cart @jay
```

AI automatically executes the following flow:

### 1.1 CLI Creates Folder + Branch

```bash
superspec create addShoppingCart -b --intent-type feature --user jay
```

```
╭────────────────────────────────────────────────╮
  Creating change: feature-20260213-addShoppingCart-jay
╰────────────────────────────────────────────────╯

⚡ Boost mode enabled
✓ Branch: feature-20260213-addShoppingCart-jay

✨ Change created successfully!
Path: superspec/changes/feature-20260213-addShoppingCart-jay/
Templates: superspec/templates/
Expected artifacts: proposal, spec, design, tasks, checklist
Next: AI generates artifacts on demand via /ss-create
```

CLI only creates an empty folder and git branch—no files.

### 1.2 AI Generates proposal.md (Requirements Background)

```markdown
---
name: addShoppingCart
status: draft
strategy: follow
depends_on: []
input: "-b add shopping cart @jay"
---

# Proposal: addShoppingCart

> Created: 2026-02-13

## Background
Platform currently lacks cart functionality, users can only buy single items, affecting conversion.

## Goals
- [ ] Users can add items to cart
- [ ] Support quantity modification and item removal
- [ ] Support coupon application
- [ ] Real-time price calculation (with discounts)
- [ ] Inventory validation before checkout

## Non-Goals
- No wishlist feature
- No cross-device sync (future iteration)

## Solution Overview
- Frontend: React + Redux state management
- Backend: RESTful API + Redis cache
- Database: carts + cart_items tables

## Impact Scope
- **Modules**: Cart module (new)
- **Files**: cart.controller, cart.service, coupon.service
- **Dependencies**: New carts, cart_items tables

## Risks & Trade-offs
| Risk | Impact | Mitigation |
|------|--------|------------|
| Overselling under high concurrency | High | Redis distributed lock |
| Complex coupon stacking | Medium | Limit to single coupon |
```

### 1.3 AI Generates spec.md (Requirement Details + Interactions)

```markdown
# Spec: addShoppingCart

## User Stories

### US-1: Add to Cart
As a **buyer**, I want to **add items to cart**, so that **I can checkout later**.

**Acceptance Criteria:**
- [ ] AC-1.1: Click "Add to Cart" adds item
- [ ] AC-1.2: If item exists, increase quantity
- [ ] AC-1.3: Show success notification
- [ ] AC-1.4: Update cart badge count

### US-2: Modify Cart
**Acceptance Criteria:**
- [ ] AC-2.1: Can increase/decrease quantity
- [ ] AC-2.2: Minimum quantity is 1
- [ ] AC-2.3: Can remove items
- [ ] AC-2.4: Price updates in real-time

### US-3: Apply Coupon
**Acceptance Criteria:**
- [ ] AC-3.1: Can enter coupon code
- [ ] AC-3.2: Validate coupon validity
- [ ] AC-3.3: Show discount amount
- [ ] AC-3.4: Show error for invalid coupon

## Functional Requirements

### FR-1: API Design
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/cart | Get cart |
| POST | /api/cart/items | Add item |
| PUT | /api/cart/items/:id | Update quantity |
| DELETE | /api/cart/items/:id | Remove item |
| POST | /api/cart/coupon | Apply coupon |

### FR-2: Business Rules
1. Max quantity per item: 99
2. Max item types in cart: 50
3. Only one coupon allowed

## Non-Functional Requirements
- Cart page load < 1s
- Add item response < 200ms

## Edge Cases
- Handling items that become unavailable
- Price change notifications
- Inventory shortage fallback strategy
```

### 1.4 Auto Complexity Assessment

AI evaluates:
- spec < 300 lines, no splitting needed
- No cross-system architecture decisions, no design.md needed

### 1.5 Auto-run Checklist (Boost checks, score / 25)

AI automatically evaluates all artifacts and generates checklist.md:

```markdown
# Quality Checklist: addShoppingCart

## Boost Mode Checks (score / 25)

### Proposal Quality
- [x] Background and motivation clear
- [x] Goals measurable
- [x] Non-goals explicit
- [x] Risks identified with mitigations
- [x] Impact scope assessed

### Requirements Completeness
- [x] Every goal has at least one user story
- [x] User stories properly formatted
- [x] Acceptance criteria testable
- [x] FRs cover all user stories
- [x] Priorities assigned

### Spec Consistency
- [x] US↔FR cross-references consistent
- [x] ACs traceable to FRs
- [x] No missing requirements
- [x] No contradicting requirements
- [x] Edge cases identified

### Technical Feasibility
- [x] API design complete
- [x] Data model defined
- [x] NFRs measurable
- [x] Dependencies clear
- [x] No blocking open questions

### Implementation Readiness
- [x] Requirements granular enough for tasks
- [x] ACs automatable
- [x] No document conflicts
- [x] All open questions closed or non-blocking
- [x] Ready to implement

**Score**: 25 / 25
**Status**: ✅ Pass

> Run `/ss-tasks` to generate task list
```

## Step 2: Generate Tasks

After checklist passes:

```
/ss-tasks
```

AI generates detailed tasks from proposal + spec:

```markdown
# Tasks: addShoppingCart

## Phase 1: Infrastructure
- [ ] 1.1 Database: Create carts table
- [ ] 1.2 Database: Create cart_items table
- [ ] 1.3 Backend: Cart entity and repository

## Phase 2: Core API
- [ ] 2.1 GET /api/cart implementation
- [ ] 2.2 POST /api/cart/items
- [ ] 2.3 PUT /api/cart/items/:id
- [ ] 2.4 DELETE /api/cart/items/:id

## Phase 3: Coupons
- [ ] 3.1 POST /api/cart/coupon
- [ ] 3.2 Coupon validation logic
- [ ] 3.3 Price calculation logic

## Phase 4: Frontend
- [ ] 4.1 CartPage component
- [ ] 4.2 CartItem component
- [ ] 4.3 CartSummary component
- [ ] 4.4 CouponInput component
- [ ] 4.5 State management
- [ ] 4.6 API integration

## Phase 5: Testing
- [ ] 5.1 API unit tests
- [ ] 5.2 Component tests
- [ ] 5.3 E2E tests
```

## Step 3: Execute Tasks

```
/ss-apply
```

AI executes tasks in dependency order, marking each ✅ when complete.

Use `/ss-validate` to verify US/FR/AC cross-reference consistency.

## Step 4: Archive

When all tasks are done:

```bash
superspec archive addShoppingCart
```

## Boost Mode vs Standard Mode

| Aspect | Standard | Boost |
|--------|----------|-------|
| Artifacts | proposal + checklist + tasks | + spec (supports splitting) + design (optional) |
| /ss-create flow | proposal → checklist /10 | proposal → spec → [split? design?] → checklist /25 |
| Task granularity | Flexible | < 1h per task |
| Use case | Simple features | Complex features |
| Cross-validation | — | US↔FR↔AC↔tasks |

## Next Steps

- [Best Practices](/guides/best-practices) - Efficiency tips
- [Configuration](/api/configuration) - Custom configuration
